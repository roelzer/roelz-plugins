#!/usr/bin/env bash
# Kontext-Wächter: erkennt, wann das Kontextfenster einer Sitzung (Projektleiter) oder eines Agenten so voll ist,
# dass ein sauberer Wechsel besser ist als Weiterarbeiten.
#
# Anlass: Lange Läufe füllen das Kontextfenster. Dann sinkt die Qualität, und kurz vor dem Rand fasst Claude Code
# das Gespräch automatisch zusammen – dabei gehen Einzelheiten verloren, die nirgends in Dateien stehen. Besser:
# rechtzeitig selbst übergeben (docs/SITZUNGSUEBERGABE.md) und in einer frischen Sitzung weitermachen.
#
# Gemessen wird die echte Größe: Aus dem Sitzungsprotokoll (JSONL) wird die letzte Token-Abrechnung gelesen
# (input + cache_creation + cache_read = was das Modell bei der letzten Antwort gesehen hat).
#
# Aufrufe:
#   kontext.sh hinweis   Hook PostToolUse / UserPromptSubmit: gibt höchstens einmal je Stufe einen Hinweis als
#                        additionalContext aus (Projektleiter oder Agent, je nachdem, wer gerade arbeitet).
#   kontext.sh stufe     gibt 0 (frei), 1 (Hinweis) oder 2 (Wechsel) aus, für den Durchlauf-Wächter.
#
# Grenze: DEV_TEAM_KONTEXT_GRENZE (Umgebung) oder "kontext_grenze" in .claude/dev-team.json, sonst 150000 Tokens.
# Hinweis ab 80 % der Grenze. Nur Bash-Bordmittel plus tail/grep; darf nie blockieren (immer Exit 0).

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

agent_typ="$(feld agent_type)"
agent_id="$(feld agent_id)"
sitzung="$(feld session_id)"
werkzeug="$(feld tool_name)"

# Messen kostet ein paar Millisekunden. Beim Projektleiter nach jedem Agenten-Aufruf, jeder Nachricht von Simon
# und jedem Stopp; sonst bei etwa jedem vierten Werkzeugaufruf (Kontext wächst gleichmäßig, das reicht).
if [ "$modus" = "hinweis" ] && [ -n "$werkzeug" ]; then
  case "$werkzeug" in
    Agent|Task|TaskOutput) ;;
    *) (( RANDOM % 4 == 0 )) || exit 0 ;;
  esac
fi

if [ -n "$agent_typ" ]; then
  # Agent: eigenes Protokoll (liegt neben dem der Sitzung unter <sitzung>/subagents/agent-<id>.jsonl).
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

zahl() { if [[ "$roh" =~ \"$1\":[[:space:]]*([0-9]+) ]]; then echo "${BASH_REMATCH[1]}"; else echo 0; fi; }
tokens=$(( $(zahl input_tokens) + $(zahl cache_creation_input_tokens) + $(zahl cache_read_input_tokens) ))

grenze="${DEV_TEAM_KONTEXT_GRENZE:-}"
if [ -z "$grenze" ] && [ -f "$projekt/.claude/dev-team.json" ]; then
  _cfg=""; IFS= read -r -d '' _cfg < "$projekt/.claude/dev-team.json" || true
  [[ "$_cfg" =~ \"kontext_grenze\"[[:space:]]*:[[:space:]]*([0-9]+) ]] && grenze="${BASH_REMATCH[1]}"
fi
[[ "$grenze" =~ ^[0-9]+$ ]] && (( grenze >= 10000 )) || grenze=150000
hinweis_ab=$(( grenze * 4 / 5 ))

stufe=0
(( tokens >= hinweis_ab )) && stufe=1
(( tokens >= grenze )) && stufe=2

if [ "$modus" = "stufe" ]; then echo "$stufe"; exit 0; fi

# Jeder Hinweis einmal je Sitzung bzw. Agent und Stufe. Sinkt der Kontext (nach /compact), wird zurückgesetzt.
wer="${agent_id:-$sitzung}"
wer="${wer//[^A-Za-z0-9_-]/}"
[ -n "$wer" ] || wer="unbekannt"
marken="$projekt/.dev-team/kontext"
if (( stufe == 0 )); then
  rm -f "$marken/$wer-1" "$marken/$wer-2" 2>/dev/null
  exit 0
fi
[ -f "$marken/$wer-$stufe" ] && exit 0
mkdir -p "$marken" 2>/dev/null && : > "$marken/$wer-$stufe" 2>/dev/null

k=$(( tokens / 1000 ))
g=$(( grenze / 1000 ))
plugin="$(pfad_norm "${CLAUDE_PLUGIN_ROOT:-$(cd "$(dirname "$0")/.." 2>/dev/null && pwd)}")"

if [ -n "$agent_typ" ]; then
  if (( stufe == 2 )); then
    text="Kontext-Wächter: Dein Kontext ist mit rund ${k} Tausend Tokens voll (Grenze ${g} Tausend), ab hier sinkt die Qualität. Schließe jetzt sauber ab, statt weiterzumachen: Angefangenes in einen lauffähigen Zustand bringen oder verwerfen, Zwischenstand committen (wenn deine Rolle committet), dann Bericht mit Status BLOCKIERT, Grund „Kontext voll“: was fertig ist (mit Commit), was fehlt, der genaue nächste Schritt und welche Dateien dafür wichtig sind. Prüfende Rollen: was geprüft ist, was ungeprüft blieb. Ein frischer Agent macht dort weiter."
  else
    text="Kontext-Wächter: Dein Kontext liegt bei rund ${k} Tausend Tokens (Wechsel ab ${g} Tausend). Lies nur noch, was du wirklich brauchst (gezielt suchen statt ganze Dateien, lange Ausgaben kürzen), und arbeite auf einen baldigen Abschluss hin."
  fi
else
  if (( stufe == 2 )); then
    text="Kontext-Wächter: Diese Sitzung hat rund ${k} Tausend Tokens Kontext (Grenze ${g} Tausend). Zeit für einen Sitzungswechsel, bevor automatisch zusammengefasst wird und Einzelheiten verloren gehen. Ab jetzt keine neuen Agenten starten; laufende zu Ende kommen lassen und ihre Ergebnisse einarbeiten. Dann übergeben (Grundgesetz „Sitzungswechsel“): docs/SITZUNGSUEBERGABE.md nach ${plugin}/vorlagen/sitzungsuebergabe.md schreiben, docs/STATUS.md aktualisieren, committen (Cloud: Arbeitsbranch pushen), .dev-team/durchlauf löschen und Simon in einer Zeile bitten, eine neue Sitzung zu starten und dort „weiter“ zu schreiben. Eine offene Frage von Simon vorher kurz beantworten."
  else
    text="Kontext-Wächter: Diese Sitzung hat rund ${k} Tausend Tokens Kontext (Sitzungswechsel ab ${g} Tausend). Halte docs/STATUS.md ab jetzt nach jedem Schritt aktuell und schreib Entscheidungen sofort in die Dateien, damit ein Wechsel jederzeit ohne Verlust geht. Lange Ausgaben nicht mehr komplett lesen."
  fi
fi

ereignis="$(feld hook_event_name)"
[ -n "$ereignis" ] || ereignis="PostToolUse"
printf '{"hookSpecificOutput":{"hookEventName":"%s","additionalContext":"%s"}}\n' "$ereignis" "$text"
exit 0
