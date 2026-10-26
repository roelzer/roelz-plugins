#!/usr/bin/env bash
# Startet scripts/pruefe_tests.py mit einem echten Python 3. Alle Argumente werden durchgereicht.
hier="$(cd "$(dirname "$0")" && pwd)"
for py in python3 python py; do
  if command -v "$py" >/dev/null 2>&1 && "$py" -c 'import sys; sys.exit(0 if sys.version_info >= (3, 8) else 1)' >/dev/null 2>&1; then
    exec "$py" -X utf8 "$hier/pruefe_tests.py" "$@"
  fi
done
echo "FEHLER: Python 3 nicht gefunden – Schranke nicht geprüft. Simon: Python 3 installieren (python.org, 'Add to PATH')."
exit 1
