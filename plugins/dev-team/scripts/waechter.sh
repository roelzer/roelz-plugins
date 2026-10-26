#!/usr/bin/env bash
# Startet den Wächter (waechter.py) mit einem echten Python 3.
# - Bevorzugt feste Python-Pfade vor dem Suchpfad (PATH könnte umgelenkt sein).
# - Verlangt einen Beleg (Einmal-Code), dass wirklich waechter.py gelaufen ist; ein falsches
#   "python", das einfach 0 zurückgibt, wird so erkannt.
# - Ist der Wächter als verwaltete Einstellung eingerichtet (managed settings), übernimmt der;
#   dieser Plugin-Aufruf tritt dann zurück (sonst liefe alles doppelt).
# Gibt es kein Python, wird in Dev-Team-Projekten blockiert (im Zweifel sicher).

plugin="${CLAUDE_PLUGIN_ROOT:-$(cd "$(dirname "$0")/.." && pwd)}"
eingabe="$(cat)"
projekt="${CLAUDE_PROJECT_DIR:-$PWD}"
dev_team_projekt() { [ -f "$projekt/.claude/dev-team.json" ] || { [ -f "$projekt/docs/STATUS.md" ] && [ -f "$projekt/docs/lastenheft.md" ]; }; }

if [ "${1:-}" != "--verwaltet" ]; then
  for m in "/etc/claude-code/managed-settings.json" "/Library/Application Support/ClaudeCode/managed-settings.json" \
           "/c/Program Files/ClaudeCode/managed-settings.json" "C:/Program Files/ClaudeCode/managed-settings.json"; do
    if [ -f "$m" ] && grep -q 'dev-team-verwaltet' "$m" 2>/dev/null; then exit 0; fi
  done
fi

kandidaten=""
for p in /usr/bin/python3 /usr/local/bin/python3 /opt/homebrew/bin/python3 \
         "/c/Windows/py.exe" "/c/Program Files/Python313/python.exe" "/c/Program Files/Python312/python.exe" \
         "/c/Program Files/Python311/python.exe"; do
  [ -x "$p" ] && kandidaten="$kandidaten
$p"
done
for py in python3 python py; do
  w="$(command -v "$py" 2>/dev/null)" && kandidaten="$kandidaten
$w"
done

nonce="$(date +%s)$$${RANDOM}${RANDOM}"
while IFS= read -r py; do
  [ -n "$py" ] || continue
  "$py" -c 'import sys; sys.exit(0 if sys.version_info >= (3, 8) else 1)' >/dev/null 2>&1 || continue
  aus="$(printf "%s" "$eingabe" | DEV_TEAM_WAECHTER_NONCE="$nonce" "$py" -X utf8 "$plugin/scripts/waechter.py" "$plugin")"
  code=$?
  if [ $code -eq 0 ]; then
    if printf '%s' "$aus" | grep -q "WAECHTER-OK-$nonce"; then
      printf '%s' "$aus" | grep -v "WAECHTER-OK-$nonce"
      exit 0
    fi
    if dev_team_projekt; then
      echo "⛔ Dev-Team-Wächter: Das gefundene Python ($py) hat den Wächter nicht wirklich ausgeführt (Beleg fehlt). Möglicherweise ist der Suchpfad umgelenkt. Im Zweifel blockiert – Simon Bescheid geben." >&2
      exit 2
    fi
    exit 0
  fi
  printf '%s' "$aus"
  exit $code
done <<< "$kandidaten"

if dev_team_projekt; then
  echo "⛔ Dev-Team-Wächter: Python 3 wurde nicht gefunden. Ohne Wächter arbeitet das Dev-Team nicht. Simon: Python 3 installieren (python.org, Haken bei 'Add to PATH') und Claude Code neu starten." >&2
  exit 2
fi
exit 0
