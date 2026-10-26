#!/usr/bin/env bash
# ConfigChange: blockiert Einstellungen, die den Dev-Team-Schutz abschalten (scripts/einstellungs_schutz.py).
hier="$(cd "$(dirname "$0")" && pwd)"
eingabe="$(cat)"
for py in python3 python py; do
  if command -v "$py" >/dev/null 2>&1 && "$py" -c 'import sys; sys.exit(0 if sys.version_info >= (3, 8) else 1)' >/dev/null 2>&1; then
    printf "%s" "$eingabe" | "$py" -X utf8 "$hier/einstellungs_schutz.py"
    exit $?
  fi
done
echo "⛔ Dev-Team-Einstellungsschutz: Python fehlt – Einstellungsänderung im Zweifel blockiert." >&2
exit 2
