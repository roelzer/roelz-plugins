#!/usr/bin/env python3
"""Erzeugt Prüfbilder für den Kritiker: Kontaktbogen, Bildstreifen um jeden Schnitt, Handy-Bogen, Einzelbilder.

Aufruf:  python3 boegen.py <video.mp4> <zielordner> [--alle-sek 0.5]
Ergebnis im Zielordner:
  bogen.png        Kontaktbogen (ein Bild je --alle-sek Sekunden, mit Zeitstempel)
  handy.png        derselbe Bogen auf 360 px Breite je Bild (Lesbarkeit am Handy)
  schnitt_XX.png   je Schnitt ein Streifen mit 8 Bildern von −0,2 s bis +0,2 s (Bewegung über den Schnitt)
  bild_0.png, bild_1s.png, bild_ende.png   Einzelbilder in voller Auflösung
  schnitte.txt     erkannte Schnittzeitpunkte
Braucht ffmpeg im PATH. Verändert das Video nicht. Bewegung beurteilt man nie an einem einzelnen Bogen allein
(Bildmodelle sind bei Zeitabfolgen schwach) – deshalb die Streifen über die Schnitte.
"""

import argparse
import json
import os
import re
import subprocess
import sys


def ff(*args):
    return subprocess.run(["ffmpeg", "-v", "error", "-y"] + list(args), capture_output=True, text=True)


def dauer_und_groesse(video):
    r = subprocess.run(["ffprobe", "-v", "error", "-show_entries", "format=duration:stream=width,height",
                        "-select_streams", "v:0", "-of", "json", video], capture_output=True, text=True)
    d = json.loads(r.stdout)
    return float(d["format"]["duration"]), d["streams"][0]["width"], d["streams"][0]["height"]


def schnitte(video, schwelle=0.3):
    r = subprocess.run(["ffmpeg", "-hide_banner", "-i", video, "-vf", "select='gt(scene,%s)',showinfo" % schwelle,
                        "-an", "-f", "null", "-"], capture_output=True, text=True)
    return [round(float(t), 2) for t in re.findall(r"pts_time:([0-9.]+)", r.stderr)]


def main():
    a = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    a.add_argument("video")
    a.add_argument("ziel")
    a.add_argument("--alle-sek", type=float, default=0.5)
    arg = a.parse_args()
    os.makedirs(arg.ziel, exist_ok=True)
    dauer, w, h = dauer_und_groesse(arg.video)
    hoch = h > w
    anzahl = int(dauer / arg.alle_sek) + 1
    spalten = 6 if hoch else 4
    zeilen = (anzahl + spalten - 1) // spalten
    stempel = "drawtext=text='%{pts\\:hms}':x=8:y=8:fontsize=28:fontcolor=white:box=1:boxcolor=black@0.6"
    breite_kachel = 300 if hoch else 480
    ff("-i", arg.video, "-vf", "fps=1/%s,scale=%d:-1,%s,tile=%dx%d:padding=4:color=gray"
       % (arg.alle_sek, breite_kachel, stempel, spalten, zeilen), "-frames:v", "1",
       os.path.join(arg.ziel, "bogen.png"))
    ff("-i", arg.video, "-vf", "fps=1/%s,scale=360:-1,tile=%dx%d:padding=4:color=gray"
       % (max(arg.alle_sek, 1.0), spalten, (int(dauer) // spalten) + 1), "-frames:v", "1",
       os.path.join(arg.ziel, "handy.png"))
    for name, t in (("bild_0.png", 0), ("bild_1s.png", min(1.0, dauer / 2)), ("bild_ende.png", max(0, dauer - 0.05))):
        ff("-ss", str(t), "-i", arg.video, "-frames:v", "1", os.path.join(arg.ziel, name))
    cuts = schnitte(arg.video)
    with open(os.path.join(arg.ziel, "schnitte.txt"), "w", encoding="utf-8") as d:
        d.write("\n".join("%.2f" % c for c in cuts) + "\n")
    for i, c in enumerate(cuts[:30], 1):
        start = max(0, c - 0.2)
        stempel_abs = stempel.replace("%{pts\\:hms}", "%%{pts\\:hms\\:%.3f}" % start)
        ff("-ss", "%.3f" % start, "-i", arg.video, "-vf",
           "fps=20,scale=%d:-1,%s,tile=8x1:padding=2" % (220 if hoch else 320, stempel_abs), "-frames:v", "1",
           os.path.join(arg.ziel, "schnitt_%02d.png" % i))
    print("Prüfbilder in %s: bogen.png, handy.png, %d Schnittstreifen, 3 Einzelbilder (Dauer %.1f s)"
          % (arg.ziel, min(len(cuts), 30), dauer))
    return 0


if __name__ == "__main__":
    sys.exit(main())
