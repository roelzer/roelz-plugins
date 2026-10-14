#!/usr/bin/env bash
# Schreibt jeden Agenten-Start und jedes Agenten-Ende in docs/AGENTEN_LOG.md des Projekts.
# Läuft als Hook (PreToolUse für das Agent-Werkzeug, SubagentStop). Darf nie die Arbeit blockieren:
# bei jedem Fehler still beenden.

ereignis="$1"   # "start" oder "ende"
eingabe="$(cat 2>/dev/null)" || exit 0

projekt="${CLAUDE_PROJECT_DIR:-}"
[ -n "$projekt" ] || exit 0
# Nur in Dev-Team-Projekten protokollieren (erkennbar am Ordner docs/).
[ -d "$projekt/docs" ] || exit 0
log="$projekt/docs/AGENTEN_LOG.md"

# JSON-Felder auslesen: zuerst mit Python oder Node, sonst einfache Notlösung.
feld() {
  local name="$1" wert=""
  for py in python3 python; do
    if command -v "$py" >/dev/null 2>&1; then
      wert="$(printf '%s' "$eingabe" | "$py" -c "
import sys, json
try:
    d = json.load(sys.stdin)
except Exception:
    sys.exit(0)
v = d
for k in '$name'.split('.'):
    v = v.get(k, '') if isinstance(v, dict) else ''
print(str(v))
" 2>/dev/null)" && { printf '%s' "$wert"; return; }
    fi
  done
  if command -v node >/dev/null 2>&1; then
    wert="$(printf '%s' "$eingabe" | node -e "
let s='';process.stdin.on('data',c=>s+=c).on('end',()=>{try{let v=JSON.parse(s);for(const k of '$name'.split('.'))v=(v&&typeof v==='object')?(v[k]??''):'';process.stdout.write(String(v))}catch(e){}})
" 2>/dev/null)" && { printf '%s' "$wert"; return; }
  fi
  # Notlösung ohne Python/Node: nur einfache Felder
  local kurz="${name##*.}"
  printf '%s' "$eingabe" | sed -n "s/.*\"$kurz\"[[:space:]]*:[[:space:]]*\"\([^\"]*\)\".*/\1/p" | head -n 1
}

zeit="$(date '+%Y-%m-%d %H:%M')"

if [ ! -f "$log" ]; then
  {
    echo "# Agenten-Protokoll"
    echo
    echo "Wird automatisch geschrieben. Jede Zeile: Zeit, Agent, was er bekommen bzw. gemeldet hat."
    echo
    echo "| Zeit | | Agent | Auftrag / Ergebnis |"
    echo "|---|---|---|---|"
  } > "$log" 2>/dev/null || exit 0
fi

saeubern() { tr '\n\r|' '   ' | sed 's/[[:space:]]\+/ /g; s/^ //' | cut -c1-160; }

if [ "$ereignis" = "start" ]; then
  agent="$(feld tool_input.subagent_type)"
  [ -n "$agent" ] || agent="general-purpose"
  auftrag="$(feld tool_input.description | saeubern)"
  echo "| $zeit | ▶ | $agent | $auftrag |" >> "$log" 2>/dev/null
else
  agent="$(feld agent_type)"
  [ -n "$agent" ] || agent="?"
  nachricht="$(feld last_assistant_message)"
  ampel=""
  case "$nachricht" in
    *🔴*) ampel="🔴" ;;
    *🟡*) ampel="🟡" ;;
    *🟢*) ampel="🟢" ;;
  esac
  # Fallback: Agent hat das Wort statt des Symbols geschrieben (z. B. "Ampel: Rot").
  if [ -z "$ampel" ]; then
    wort="$(printf '%s' "$nachricht" | tr '[:upper:]' '[:lower:]' | grep -oE 'ampel[^a-zäöü]{0,6}(rot|gelb|grün|gruen)' | head -n 1)"
    case "$wort" in
      *rot) ampel="🔴" ;;
      *gelb) ampel="🟡" ;;
      *grün|*gruen) ampel="🟢" ;;
    esac
    [ -n "$ampel" ] || case "$(printf '%s' "$nachricht" | head -c 12 | tr '[:upper:]' '[:lower:]')" in
      rot*) ampel="🔴" ;; gelb*) ampel="🟡" ;; grün*|gruen*) ampel="🟢" ;;
    esac
  fi
  # Bevorzugt die Zeile mit der Ampel, sonst die erste Zeile, die keine Überschrift ist.
  erste="$(printf '%s\n' "$nachricht" | grep -m 1 -e '🔴' -e '🟡' -e '🟢' | saeubern)"
  [ -n "$erste" ] || erste="$(printf '%s\n' "$nachricht" | grep -v -e '^[[:space:]]*$' -e '^[[:space:]]*#' | head -n 1 | saeubern)"
  echo "| $zeit | ■ $ampel | $agent | $erste |" >> "$log" 2>/dev/null
fi
exit 0
