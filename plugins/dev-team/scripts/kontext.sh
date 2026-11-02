#!/usr/bin/env bash
# Kontext-Wächter: sorgt dafür, dass ein voller Kontext nie Wissen kostet – vollautomatisch, ohne neue Sitzung.
#
# Hintergrund: Claude Code fasst das Gespräch automatisch zusammen, wenn das Kontextfenster voll ist. Das
# Dev-Team zieht diesen Zeitpunkt vor (Einstellung "autoCompactWindow" in .claude/settings.json, Standard
# 400000 Tokens statt rund 967000 bei 1-Mio-Modellen): lange Kontexte kosten bei jedem Schritt mehr und die
# Qualität sinkt. Dieser Wächter sorgt dafür, dass vor dem Zusammenfassen alles in Dateien steht
# (docs/SITZUNGSUEBERGABE.md, docs/STATUS.md); nach dem Zusammenfassen lädt der Sitzungsstart (SessionStart,
# Quelle "compact") Grundgesetz und Übergabe wieder. Der Lauf geht ohne Simon weiter.
#
# Agenten haben eine eigene, kleinere Grenze (Standard 200000): Wer so viel Kontext braucht, hat ein zu großes
# Paket. Er schließt sauber ab (BLOCKIERT „Kontext voll“), ein frischer Agent macht weiter.
#
# Gemessen wird die echte Größe: letzte Token-Abrechnung im Sitzungsprotokoll (JSONL),
# input + cache_creation + cache_read = was das Modell bei der letzten Antwort gesehen hat.
#
# Aufrufe:
#   kontext.sh hinweis   Hook PostToolUse / UserPromptSubmit: höchstens ein Hinweis je Stufe (additionalContext).
#   kontext.sh stufe     gibt 0 (frei), 1 (Hinweis) oder 2 (Übergabe/Abschluss) aus.
#
# Grenzen: Projektleiter = "kontext_grenze" in .claude/dev-team.json, sonst "autoCompactWindow" aus
# .claude/settings.json, sonst 400000. Agenten = "kontext_grenze_agent", sonst 200000. Umgebung:
# DEV_TEAM_KONTEXT_GRENZE / DEV_TEAM_KONTEXT_GRENZE_AGENT. Projektleiter: Stufe 1 ab 70 %, Stufe 2 ab 85 %
# (vor dem automatischen Zusammenfassen). Agenten: Stufe 1 ab 80 %, Stufe 2 ab 100 %.
# Nur Bash-Bordmittel plus tail/grep; sperrt nie (immer Exit 0).

modus="${1:-hinweis}"
IFS= read -r -d '' eingabe || true
projekt="${CLAUDE_PROJECT_DIR:-$PWD}"

ende() { [ "$modus" = "stufe" ] && echo 0; exit 0; }
# Nur in Dev-Team-Projekten (erkennbar am Ordner docs/).
[ -d "$projekt/docs" ] || ende

feld() {
  if [[ "$eingabe" =~ \"$1\"[[:space:]]*:[[:space:]]*\"([^\"]*)\" ]]; then printf '%s' "${BASH_REMATCH[1]}"; fi
}
pfad_norm() { local p="${1//\\\\//}"; printf '%s' "${p//\\//}"; }
lies() { local x=""; [ -f "$1" ] && { IFS= read -r -d '' x < "$1" || true; }; printf '%s' "$x"; }
zahl_aus() { if [[ "$1" =~ \"$2\"[[:space:]]*:[[:space:]]*([0-9]+) ]]; then printf '%s' "${BASH_REMATCH[1]}"; fi; }

agent_typ="$(feld agent_type)"
agent_id="$(feld agent_id)"
sitzung="$(feld session_id)"
werkzeug="$(feld tool_name)"

# Messen kostet ein paar Millisekunden: bei jeder Nachricht von Simon, nach jedem Agenten-Aufruf und bei
# etwa jedem vierten anderen Werkzeugaufruf (der Kontext wächst gleichmäßig, das reicht).
if [ "$modus" = "hinweis" ] && [ -n "$werkzeug" ]; then
  case "$werkzeug" in
    Agent|Task|TaskOutput) ;;
    *) (( RANDOM % 4 == 0 )) || exit 0 ;;
  esac
fi

if [ -n "$agent_typ" ]; then
  # Agent: eigenes Protokoll unter <sitzung>/subagents/agent-<id>.jsonl (laut Doku von Claude Code).
  datei="$(pfad_norm "$(feld agent_transcript_path)")"
  if [ -z "$datei" ] || [ ! -f "$datei" ]; then
    haupt="$(pfad_norm "$(feld transcript_path)")"
    datei="${haupt%.jsonl}/subagents/agent-${agent_id}.jsonl"
  fi
  [ -n "$agent_id" ] && [ -f "$datei" ] || ende
  roh="$(tail -c 400000 "$datei" 2>/dev/null | grep -o '"usage":[[:space:]]*{[^}]*' | tail -n 1)"
else
  datei="$(pfad_norm "$(feld transcript_path)")"
  [ -n "$datei" ] && [ -f "$datei" ] || ende
  # Ältere Versionen schreiben Agenten-Schritte mit ins Sitzungsprotokoll (isSidechain) – die zählen nicht.
  roh="$(tail -c 400000 "$datei" 2>/dev/null | grep -v '"isSidechain":[[:space:]]*true' | grep -o '"usage":[[:space:]]*{[^}]*' | tail -n 1)"
fi
[ -n "$roh" ] || ende

zahl() { local z; z="$(zahl_aus "$roh" "$1")"; echo "${z:-0}"; }
tokens=$(( $(zahl input_tokens) + $(zahl cache_creation_input_tokens) + $(zahl cache_read_input_tokens) ))

cfg="$(lies "$projekt/.claude/dev-team.json")"
if [ -n "$agent_typ" ]; then
  grenze="${DEV_TEAM_KONTEXT_GRENZE_AGENT:-$(zahl_aus "$cfg" kontext_grenze_agent)}"
  [[ "$grenze" =~ ^[0-9]+$ ]] && (( grenze >= 50000 )) || grenze=200000
  stufe1=$(( grenze * 8 / 10 )); stufe2=$grenze
else
  grenze="${DEV_TEAM_KONTEXT_GRENZE:-$(zahl_aus "$cfg" kontext_grenze)}"
  [ -n "$grenze" ] || grenze="$(zahl_aus "$(lies "$projekt/.claude/settings.json")" autoCompactWindow)"
  [[ "$grenze" =~ ^[0-9]+$ ]] && (( grenze >= 50000 )) || grenze=400000
  stufe1=$(( grenze * 7 / 10 )); stufe2=$(( grenze * 85 / 100 ))
fi

stufe=0
(( tokens >= stufe1 )) && stufe=1
(( tokens >= stufe2 )) && stufe=2

if [ "$modus" = "stufe" ]; then echo "$stufe"; exit 0; fi

# Jeder Hinweis einmal je Sitzung bzw. Agent und Stufe. Sinkt der Kontext (nach dem Zusammenfassen), zurücksetzen.
wer="${agent_id:-$sitzung}"
wer="${wer//[^A-Za-z0-9_-]/}"
[ -n "$wer" ] || wer="unbekannt"
marken="$projekt/.dev-team/kontext"
if (( stufe == 0 )); then
  [ -e "$marken/$wer-1" ] && rm -f "$marken/$wer-1" "$marken/$wer-2" 2>/dev/null
  exit 0
fi
[ -f "$marken/$wer-$stufe" ] && exit 0
mkdir -p "$marken" 2>/dev/null && : > "$marken/$wer-$stufe" 2>/dev/null

k=$(( tokens / 1000 ))
g=$(( grenze / 1000 ))
plugin="$(pfad_norm "${CLAUDE_PLUGIN_ROOT:-$(cd "$(dirname "$0")/.." 2>/dev/null && pwd)}")"

if [ -n "$agent_typ" ]; then
  if (( stufe == 2 )); then
    text="Kontext-Wächter: Dein Kontext ist mit rund ${k} Tausend Tokens voll (Grenze für Agenten ${g} Tausend). Schließe jetzt sauber ab, statt weiterzumachen: Angefangenes in einen lauffähigen Zustand bringen oder verwerfen, Zwischenstand committen (wenn deine Rolle committet), dann Bericht mit Status BLOCKIERT, Grund „Kontext voll“: was fertig ist (mit Commit), was fehlt, der genaue nächste Schritt und welche Dateien dafür wichtig sind. Prüfende Rollen: was geprüft ist, was ungeprüft blieb. Ein frischer Agent macht dort weiter."
  else
    text="Kontext-Wächter: Dein Kontext liegt bei rund ${k} Tausend Tokens (Abschluss ab ${g} Tausend). Lies nur noch, was du wirklich brauchst (gezielt suchen statt ganze Dateien, lange Ausgaben kürzen), und arbeite auf einen baldigen Abschluss hin."
  fi
else
  if (( stufe == 2 )); then
    text="Kontext-Wächter: Diese Sitzung hat rund ${k} Tausend Tokens Kontext; bei ${g} Tausend fasst Claude Code automatisch zusammen. Schreib jetzt, im nächsten Schritt, docs/SITZUNGSUEBERGABE.md nach ${plugin}/vorlagen/sitzungsuebergabe.md (überschreiben, falls vorhanden) und bring docs/STATUS.md auf den Stand; committe beides mit ausdrücklichen Pfaden. Danach normal weiterarbeiten, nicht anhalten und Simon nicht fragen: Nach dem Zusammenfassen lädt der Sitzungsstart die Übergabe automatisch wieder."
  else
    text="Kontext-Wächter: Diese Sitzung hat rund ${k} Tausend Tokens Kontext (automatisches Zusammenfassen bei ${g} Tausend). Halte docs/STATUS.md ab jetzt nach jedem Schritt aktuell und schreib Entscheidungen sofort in die Dateien. Lange Ausgaben nicht mehr komplett lesen."
  fi
fi

ereignis="$(feld hook_event_name)"
[ -n "$ereignis" ] || ereignis="PostToolUse"
printf '{"hookSpecificOutput":{"hookEventName":"%s","additionalContext":"%s"}}\n' "$ereignis" "$text"
exit 0
