#!/usr/bin/env bash
# Vorbereitung eines Testfalls (läuft im Arbeitsordner des Falls).
# Aufruf: bash "$(dirname "$0")/../../tests/werkzeug/eval_vorbereiten.sh" [verein-alt] [wrangler] [wappen]
set -euo pipefail
HIER="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
for a in "$@"; do
  case "$a" in
    verein-alt) mkdir -p website/verein && cp -r "$HIER/vorlagen/verein-alt" website/verein/site ;;
    wrangler) printf '{\n  "name": "sv-testdorf",\n  "compatibility_date": "2026-11-01",\n  "assets": { "directory": "./website/verein/site" }\n}\n' > wrangler.jsonc ;;
    wappen) mkdir -p material && cat > material/wappen.svg <<'SVG'
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 240"><path d="M10 10h180v120c0 60-45 90-90 100C55 220 10 190 10 130z" fill="#7a1f2b"/><path d="M30 30h140v95c0 45-35 70-70 78-35-8-70-33-70-78z" fill="#f2c230"/><circle cx="100" cy="110" r="38" fill="#7a1f2b"/><text x="100" y="122" font-family="Georgia" font-size="34" text-anchor="middle" fill="#f2c230">JFG</text></svg>
SVG
    ;;
  esac
done
