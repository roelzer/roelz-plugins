#!/usr/bin/env bash
# Vorbereitung eines Testfalls (scaffold_script, läuft vor dem Fall außerhalb der Sandbox, im Arbeitsordner des Falls).
# Die Sandbox hat kein Netz und ein leeres Home: HyperFrames, Whisper-Modell und Material werden hineinkopiert.
# Aufruf aus einem Fall:  bash "$(dirname "$0")/../../tests/werkzeug/eval_vorbereiten.sh" <material ...>
set -euo pipefail
ECHT="$(getent passwd "$(id -un)" | cut -d: -f6)"
Q="$ECHT/.roelz-video"
[ -d "$Q/hyperframes-0.9.65" ] || { echo "Testumgebung fehlt – tests/werkzeug/testumgebung.sh ausführen"; exit 1; }
mkdir -p "$HOME/.roelz-video" "$HOME/.cache/huggingface/hub" material
cp -a "$Q/hyperframes-0.9.65" "$HOME/.roelz-video/"
[ -d "$ECHT/.cache/huggingface/hub/models--Systran--faster-whisper-small" ] && \
  cp -aL "$ECHT/.cache/huggingface/hub/models--Systran--faster-whisper-small" "$HOME/.cache/huggingface/hub/"
for m in "$@"; do cp -a "$Q/testmaterial/$m" material/; done
# Prüfsummen der Originale außerhalb des Arbeitsordners (für die Nachkontrolle nach dem Lauf)
( cd material && sha256sum $(find . -type f) > "$HOME/.originale.sha256" ) || true
