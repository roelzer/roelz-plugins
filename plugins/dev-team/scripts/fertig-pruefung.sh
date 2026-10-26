#!/usr/bin/env bash
# SubagentStop: prüft, ob die Fertigmeldung eines Entwicklers belegt ist (scripts/fertig_pruefung.py).
hier="$(cd "$(dirname "$0")" && pwd)"
eingabe="$(cat)"
for py in python3 python py; do
  if command -v "$py" >/dev/null 2>&1 && "$py" -c 'import sys; sys.exit(0 if sys.version_info >= (3, 8) else 1)' >/dev/null 2>&1; then
    printf "%s" "$eingabe" | "$py" -X utf8 "$hier/fertig_pruefung.py"
    exit 0
  fi
done
exit 0
