#!/usr/bin/env bash
# Zerlegt ein Video in Einzelbilder und legt sie als Kontaktbögen (4x4 Raster) ab, damit Claude es "ansehen" kann.
# Aufruf: kontaktbogen.sh <video> [bilder_pro_sekunde=4] [zielordner=<temp>]
# Ausgabe: Pfade der Kontaktbögen (bogen_01.png …) und Dauer/Auflösung.
set -euo pipefail
video="${1:?Aufruf: kontaktbogen.sh <video> [bilder_pro_sekunde] [zielordner]}"
fps="${2:-4}"
ziel="${3:-$(mktemp -d)}"
command -v ffmpeg >/dev/null || { echo "FEHLER: ffmpeg fehlt"; exit 1; }
mkdir -p "$ziel"
ffprobe -v error -show_entries format=duration:stream=width,height,r_frame_rate -of default=nw=1 "$video" | sort -u
ffmpeg -v error -y -i "$video" -vf "fps=${fps},scale=480:-2,drawtext=text='%{pts\:hms}':x=8:y=8:fontsize=18:fontcolor=white:box=1:boxcolor=black@0.6,tile=4x4" "$ziel/bogen_%02d.png" 2>/dev/null \
  || ffmpeg -v error -y -i "$video" -vf "fps=${fps},scale=480:-2,tile=4x4" "$ziel/bogen_%02d.png"
ls -1 "$ziel"/bogen_*.png
