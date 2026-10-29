#!/usr/bin/env bash
# Startet den Wächter (waechter.py) mit einem echten Python 3 – so schnell wie möglich, denn er läuft vor JEDEM
# Werkzeugaufruf. Unter Windows (Git Bash) kostet jeder Prozessstart spürbar Zeit, bei Last Sekunden.
# - Das zuletzt bewährte Python steht in ~/.claude/dev-team/python-pfad und wird direkt benutzt
#   (ein Prozessstart statt bisher bis zu sechs). Nur wenn es fehlt oder versagt, wird gesucht.
# - Beleg (Einmal-Code): Nur wenn wirklich waechter.py gelaufen ist, gilt der Lauf. Ein falsches "python",
#   das einfach 0 zurückgibt, fällt so auf – auch ein manipulierter Eintrag in python-pfad.
# - Ist der Wächter als verwaltete Einstellung eingerichtet (managed settings), tritt dieser Aufruf zurück.
# - Ohne Python wird in Dev-Team-Projekten blockiert (im Zweifel sicher).
# Bewusst nur Bash-Bordmittel (kein cat/grep/date), damit keine zusätzlichen Prozesse starten.

start_ms="${EPOCHREALTIME:-}"
plugin="${CLAUDE_PLUGIN_ROOT:-$(cd "$(dirname "$0")/.." && pwd)}"
IFS= read -r -d '' eingabe || true
projekt="${CLAUDE_PROJECT_DIR:-$PWD}"
dev_team_projekt() { [ -f "$projekt/.claude/dev-team.json" ] || { [ -f "$projekt/docs/STATUS.md" ] && [ -f "$projekt/docs/lastenheft.md" ]; }; }

if [ "${1:-}" != "--verwaltet" ]; then
  for m in "/etc/claude-code/managed-settings.json" "/Library/Application Support/ClaudeCode/managed-settings.json" \
           "/c/Program Files/ClaudeCode/managed-settings.json" "C:/Program Files/ClaudeCode/managed-settings.json"; do
    if [ -f "$m" ]; then
      inhalt=""; IFS= read -r -d '' inhalt < "$m" || true
      [[ "$inhalt" == *dev-team-verwaltet* ]] && exit 0
    fi
  done
fi

merk_datei="${HOME}/.claude/dev-team/python-pfad"
nonce="${EPOCHSECONDS:-0}$$${RANDOM}${RANDOM}"

# Führt den Wächter mit $1 aus. Rückgabe: 0 = Beleg da und erlaubt, 2 = blockiert (Ausgabe weitergereicht),
# 1 = dieses Python taugt nicht (kein Beleg, Absturz, zu alt).
wache() {
  local py="$1" aus code
  aus="$(printf '%s' "$eingabe" | DEV_TEAM_WAECHTER_NONCE="$nonce" DEV_TEAM_HOOK_START="$start_ms" \
         "$py" -X utf8 "$plugin/scripts/waechter.py" "$plugin")"
  code=$?
  if [ $code -eq 0 ] && [[ "$aus" == *"WAECHTER-OK-$nonce"* ]]; then
    aus="${aus//WAECHTER-OK-$nonce/}"
    aus="${aus%$'\n'}"
    [ -n "$aus" ] && printf '%s\n' "$aus"
    return 0
  fi
  if [ $code -eq 2 ]; then
    printf '%s' "$aus"
    return 2
  fi
  return 1
}

# 1. Schneller Weg: gemerktes Python
if [ -f "$merk_datei" ]; then
  gemerkt=""; IFS= read -r gemerkt < "$merk_datei" || true
  if [ -n "$gemerkt" ] && [ -x "$gemerkt" ]; then
    wache "$gemerkt"; r=$?
    [ $r -ne 1 ] && exit $r
  fi
fi

# 2. Suchen: feste Pfade vor dem Suchpfad (PATH könnte umgelenkt sein), python.exe vor dem Starter py.exe
kandidaten=()
for p in /usr/bin/python3 /usr/local/bin/python3 /opt/homebrew/bin/python3 \
         "/c/Program Files/Python3"*/python.exe "/c/Users/${USERNAME:-${USER:-x}}/AppData/Local/Programs/Python/Python3"*/python.exe \
         "${LOCALAPPDATA:-/nicht-da}/Programs/Python/Python3"*/python.exe; do
  [ -x "$p" ] && kandidaten+=("$p")
done
for py in python3 python; do
  w="$(type -P "$py" 2>/dev/null)" && [ -n "$w" ] && kandidaten+=("$w")
done
[ -x "/c/Windows/py.exe" ] && kandidaten+=("/c/Windows/py.exe")
w="$(type -P py 2>/dev/null)" && [ -n "$w" ] && kandidaten+=("$w")

for py in "${kandidaten[@]}"; do
  [[ "$py" == *WindowsApps* ]] && continue  # Microsoft-Store-Platzhalter öffnet nur den Store
  wache "$py"; r=$?
  if [ $r -ne 1 ]; then
    if [ $r -eq 0 ] || [ $r -eq 2 ]; then
      mkdir -p "${merk_datei%/*}" 2>/dev/null && printf '%s\n' "$py" > "$merk_datei" 2>/dev/null
    fi
    exit $r
  fi
done

if dev_team_projekt; then
  echo "⛔ Dev-Team-Wächter: Kein funktionierendes Python 3 gefunden (oder es hat den Wächter nicht wirklich ausgeführt). Ohne Wächter arbeitet das Dev-Team nicht. Simon: Python 3 installieren (python.org, Haken bei 'Add to PATH') und Claude Code neu starten." >&2
  exit 2
fi
exit 0
