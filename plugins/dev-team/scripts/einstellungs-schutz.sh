#!/usr/bin/env bash
# ConfigChange: blockiert Einstellungen, die den Dev-Team-Schutz abschalten (scripts/einstellungs_schutz.py).
# Bevorzugt feste Python-Pfade (der Suchpfad könnte über env.PATH umgelenkt sein).
hier="$(cd "$(dirname "$0")" && pwd)"
eingabe="$(cat)"
if [ "${1:-}" != "--verwaltet" ]; then
  for m in "/etc/claude-code/managed-settings.json" "/Library/Application Support/ClaudeCode/managed-settings.json" \
           "/c/Program Files/ClaudeCode/managed-settings.json" "C:/Program Files/ClaudeCode/managed-settings.json"; do
    if [ -f "$m" ] && grep -q 'dev-team-verwaltet' "$m" 2>/dev/null; then exit 0; fi
  done
fi
for py in /usr/bin/python3 /usr/local/bin/python3 /opt/homebrew/bin/python3 "/c/Windows/py.exe" \
          "$(command -v python3 2>/dev/null)" "$(command -v python 2>/dev/null)" "$(command -v py 2>/dev/null)"; do
  [ -n "$py" ] && [ -x "$py" ] || continue
  if "$py" -c 'import sys; sys.exit(0 if sys.version_info >= (3, 8) else 1)' >/dev/null 2>&1; then
    printf "%s" "$eingabe" | "$py" -X utf8 "$hier/einstellungs_schutz.py"
    exit $?
  fi
done
echo "⛔ Dev-Team-Einstellungsschutz: Python fehlt – Einstellungsänderung im Zweifel blockiert." >&2
exit 2
