#!/usr/bin/env bash
# Baut die Testumgebung für die Probearbeit des Video-Plugins auf (Linux, mit Netz). Einmal ausführen vor
# `claude plugin eval plugins/video …`. Legt alles unter ~/.roelz-video/ ab, nichts im Repo.
# Braucht: node 22, ffmpeg, python3 mit pip (piper-tts, faster-whisper, numpy).
set -euo pipefail
HIER="$(cd "$(dirname "$0")" && pwd)"
PLUGIN="$(cd "$HIER/../.." && pwd)"
M="$HOME/.roelz-video/testmaterial"
mkdir -p "$M/musik" "$M/stimmen"

node "$PLUGIN/scripts/hf.mjs" skills-pfad >/dev/null                     # HyperFrames in fester Version
pip install -q piper-tts faster-whisper numpy >/dev/null 2>&1 || true
python3 -c "from faster_whisper import WhisperModel as W; W('small', device='cpu', compute_type='int8')"  # Modell vorladen

# Material: Sintel-Trailer (Blender Foundation, CC BY 3.0), Demo-App aus dem Repo
[ -f "$M/sintel.mp4" ] || curl -sSL -o "$M/sintel.mp4" https://download.blender.org/durian/trailer/sintel_trailer-1080p.mp4
cp "$PLUGIN/../../docs/personal/video-editor/material/demo-app.html" "$M/demo-app.html"

# Musik: CC0 von OpenGameArt (Lizenz je Quellseite geprüft am 18.11.2026)
lade() { [ -f "$M/musik/$1" ] || curl -sSL -o "$M/musik/$1" "$2"; }
lade ruhig-klavier.mp3   "https://opengameart.org/sites/default/files/003_Vaporware_2.mp3"
lade positiv-beats.mp3   "https://opengameart.org/sites/default/files/happy-wireframes.mp3"
lade trailer-drama.mp3   "https://opengameart.org/sites/default/files/Generic%20Trailer%20Music_0.mp3"
lade warm-gitarre.wav    "https://opengameart.org/sites/default/files/a_small_fire_will_do.wav"
lade dezent-flaeche.ogg  "https://opengameart.org/sites/default/files/Heavenly%20Loop_0.ogg"
cat > "$M/musik/LIZENZEN.md" <<'LIZ'
# Musik (alle CC0 – gemeinfrei, keine Namensnennung nötig, kommerziell frei)
| Datei | Titel | Urheber | Quelle |
|---|---|---|---|
| ruhig-klavier.mp3 | Calm Piano 1 (Vaporware) | cynicmusic | https://opengameart.org/content/calm-piano-1-vaporware |
| positiv-beats.mp3 | Happy Wireframes | Bobjt | https://opengameart.org/content/happy-wireframes |
| trailer-drama.mp3 | Generic trailer music | Emma_MA | https://opengameart.org/content/generic-trailer-music |
| warm-gitarre.wav | A Small Fire Will Do (Calming Loop) | Trex0n | https://opengameart.org/content/a-small-fire-will-do-calming-loop |
| dezent-flaeche.ogg | Heavenly Loop | isaiah658 | https://opengameart.org/content/heavenly-loop |
LIZ

# Testinterview mit „ähm“ und Pausen (Piper-Stimme thorsten, CC0 – nur Testmaterial)
for f in de_DE-thorsten-medium.onnx de_DE-thorsten-medium.onnx.json; do
  [ -f "$M/stimmen/$f" ] || curl -sSL -o "$M/stimmen/$f" "https://huggingface.co/rhasspy/piper-voices/resolve/main/de/de_DE/thorsten/medium/$f"
done
T="$(mktemp -d)"; i=0
while IFS= read -r z; do i=$((i+1)); echo "$z" | python3 -m piper -m "$M/stimmen/de_DE-thorsten-medium.onnx" -f "$T/s$i.wav" >/dev/null 2>&1; done <<'TXT'
Ähm, also, wir planen seit gut zehn Jahren Heizungen für Einfamilienhäuser.
Und, ähm, das Schwierigste ist eigentlich immer die Rohrdimensionierung.
Früher haben wir das alles in Excel gerechnet. Ähm. Das war ziemlich fehleranfällig.
Ein falscher Zellbezug, und, äh, das Rohr ist zu klein.
Heute dauert eine Berechnung bei uns nur noch ein paar Minuten.
Und, ähm, die Kunden merken das am Ende an einer ruhigen, gleichmäßig warmen Wohnung.
TXT
ffmpeg -v error -y -f lavfi -i anullsrc=r=22050:cl=mono -t 1.8 "$T/pause.wav"
: > "$T/l.txt"; for k in 1 2 3 4 5 6; do printf "file 's%s.wav'\nfile 'pause.wav'\n" "$k" >> "$T/l.txt"; done
ffmpeg -v error -y -f concat -safe 0 -i "$T/l.txt" -ar 48000 -ac 1 "$M/interview.wav"
ffmpeg -v error -y -f lavfi -i "gradients=s=1920x1080:c0=0x6b5b4a:c1=0x2e2a26:speed=0.002,format=yuv420p" -i "$M/interview.wav" \
  -shortest -r 25 -c:v libx264 -crf 23 -c:a aac -b:a 128k "$M/interview.mp4"

# Grenzfall: zu kleine Auflösung; kaputt: wechselnde Bildrate ohne Ton
ffmpeg -v error -y -ss 20 -i "$M/sintel.mp4" -t 12 -vf scale=640:360 -c:v libx264 -crf 26 -c:a aac "$M/lowres.mp4"
for r in 30 12 50; do ffmpeg -v error -y -f lavfi -i "testsrc2=s=1280x720:r=$r" -t 3 -c:v libx264 -video_track_timescale 90000 "$T/t$r.mp4"; done
printf "file '%s/t30.mp4'\nfile '%s/t12.mp4'\nfile '%s/t50.mp4'\n" "$T" "$T" "$T" > "$T/v.txt"
ffmpeg -v error -y -f concat -safe 0 -i "$T/v.txt" -c copy "$M/vfr_ohne_ton.mp4"
rm -rf "$T"
echo "Testumgebung bereit: $M"
