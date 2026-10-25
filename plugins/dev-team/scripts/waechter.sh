#!/usr/bin/env bash
# Startet den Wächter (waechter.py) mit einem echten Python 3.
# Gibt es kein Python, wird in Dev-Team-Projekten blockiert (im Zweifel sicher),
# außerhalb davon durchgelassen.

plugin="${CLAUDE_PLUGIN_ROOT:-$(cd "$(dirname "$0")/.." && pwd)}"
eingabe="$(cat)"

for py in python3 python py; do
  if command -v "$py" >/dev/null 2>&1 && "$py" -c 'import sys; sys.exit(0 if sys.version_info >= (3, 8) else 1)' >/dev/null 2>&1; then
    printf '%s' "$eingabe" | "$py" "$plugin/scripts/waechter.py" "$plugin"
    exit $?
  fi
done

projekt="${CLAUDE_PROJECT_DIR:-$PWD}"
if [ -f "$projekt/.claude/dev-team.json" ] || { [ -f "$projekt/docs/STATUS.md" ] && [ -f "$projekt/docs/lastenheft.md" ]; }; then
  echo "⛔ Dev-Team-Wächter: Python 3 wurde nicht gefunden. Ohne Wächter arbeitet das Dev-Team nicht. Simon: Python 3 installieren (python.org, Haken bei 'Add to PATH') und Claude Code neu starten." >&2
  exit 2
fi
exit 0
