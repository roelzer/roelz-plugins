#!/usr/bin/env bash
# Vorbereitung eines Testfalls (läuft im Arbeitsordner des Falls).
# Aufruf: bash "$(dirname "$0")/../../tests/werkzeug/eval_vorbereiten.sh" [gleich-online] [ruckelt]
set -euo pipefail
HIER="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
for a in "$@"; do
  case "$a" in
    gleich-online)
      mkdir -p spiele/fangen && cp "$HIER/vorlagen/gut/index.html" spiele/fangen/index.html
      printf '# Credits\n\nAlles selbst erzeugt (Canvas-Zeichnung, keine fremden Dateien).\n' > spiele/fangen/CREDITS.md
      printf '{\n  "name": "fangen-testdorf",\n  "compatibility_date": "2026-11-01",\n  "assets": { "directory": "./spiele/fangen" }\n}\n' > wrangler.jsonc ;;
    ruckelt)
      mkdir -p spiele/funken && cp "$HIER/vorlagen/ruckelt/index.html" spiele/funken/index.html ;;
  esac
done
