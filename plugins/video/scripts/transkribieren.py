#!/usr/bin/env python3
"""Transkribiert Sprache lokal (faster-whisper) mit Wortzeiten – für Untertitel und Pausen-/„ähm“-Schnitt.

Aufruf:  python3 transkribieren.py <audio-oder-video> <zielordner> [--modell small] [--sprache de]
Ergebnis: <ziel>/woerter.json (jedes Wort mit Start/Ende), <ziel>/untertitel.srt (≤ 42 Zeichen je Zeile, ≤ 2 Zeilen,
          ≤ 20 Zeichen/s soweit möglich), <ziel>/pausen.json (Lücken > 0,4 s und Füllwörter mit Zeiten).
Den Ton liest ffmpeg ein (robuster als PyAV, auch unter Windows). Nie ein „.en“-Modell für Deutsch verwenden:
es übersetzt statt zu transkribieren. Läuft komplett lokal; das Modell wird beim ersten Mal geladen.
Installation: pip install faster-whisper numpy
"""

import argparse
import json
import os
import re
import subprocess
import sys

FUELLWOERTER = re.compile(r"^(äh+m*|ähm+|öh+m*|hm+|mhm|ehm+|em+)[.,!?]*$", re.I)


def lade_audio(pfad):
    import numpy as np
    roh = subprocess.run(["ffmpeg", "-v", "error", "-i", pfad, "-ac", "1", "-ar", "16000", "-f", "f32le", "-"],
                         capture_output=True).stdout
    return np.frombuffer(roh, np.float32)


def zeit(t):
    h, rest = divmod(max(t, 0), 3600)
    m, s = divmod(rest, 60)
    return ("%02d:%02d:%06.3f" % (h, m, s)).replace(".", ",")


def bloecke(woerter, max_zeile=42, max_zeilen=2, max_dauer=6.0):
    """Fasst Wörter zu Untertitel-Blöcken zusammen (Lesbarkeit nach Netflix/BBC)."""
    alle, akt = [], []
    for w in woerter:
        text = " ".join(x["wort"] for x in akt + [w])
        zu_lang = len(text) > max_zeile * max_zeilen
        zu_lange_dauer = akt and (w["ende"] - akt[0]["start"]) > max_dauer
        luecke = akt and (w["start"] - akt[-1]["ende"]) > 0.7
        if akt and (zu_lang or zu_lange_dauer or luecke):
            alle.append(akt)
            akt = []
        akt.append(w)
        if w["wort"].endswith((".", "?", "!")) and len(" ".join(x["wort"] for x in akt)) > 18:
            alle.append(akt)
            akt = []
    if akt:
        alle.append(akt)
    return alle


def umbrechen(text, max_zeile=42):
    if len(text) <= max_zeile:
        return [text]
    mitte = len(text) // 2
    luecken = [i for i, c in enumerate(text) if c == " "]
    i = min(luecken, key=lambda x: abs(x - mitte)) if luecken else mitte
    return [text[:i].strip(), text[i:].strip()]


def main():
    a = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    a.add_argument("eingabe")
    a.add_argument("ziel")
    a.add_argument("--modell", default="small")
    a.add_argument("--sprache", default="de")
    arg = a.parse_args()
    if arg.modell.endswith(".en") and arg.sprache != "en":
        print("Ein .en-Modell übersetzt ins Englische – für Deutsch z. B. „small“ oder „large-v3-turbo“ nehmen.")
        return 2
    try:
        from faster_whisper import WhisperModel
    except ImportError:
        print("faster-whisper fehlt: pip install faster-whisper numpy")
        return 2
    os.makedirs(arg.ziel, exist_ok=True)
    audio = lade_audio(arg.eingabe)
    if len(audio) == 0:
        print("Keine Tonspur gefunden oder ffmpeg fehlt.")
        return 2
    modell = WhisperModel(arg.modell, device="cpu", compute_type="int8")
    segmente, info = modell.transcribe(audio, language=arg.sprache, word_timestamps=True, vad_filter=False)
    woerter = []
    for s in segmente:
        for w in s.words or []:
            woerter.append({"wort": w.word.strip(), "start": round(w.start, 3), "ende": round(w.end, 3),
                            "sicher": round(w.probability, 3)})
    pausen = []
    for i in range(1, len(woerter)):
        luecke = woerter[i]["start"] - woerter[i - 1]["ende"]
        if luecke > 0.4:
            pausen.append({"art": "pause", "start": woerter[i - 1]["ende"], "ende": woerter[i]["start"],
                           "dauer": round(luecke, 3)})
    for w in woerter:
        if FUELLWOERTER.match(w["wort"]):
            pausen.append({"art": "fuellwort", "wort": w["wort"], "start": w["start"], "ende": w["ende"]})
    sprechwoerter = [w for w in woerter if not FUELLWOERTER.match(w["wort"])]
    zeilen = []
    for n, b in enumerate(bloecke(sprechwoerter), 1):
        text = " ".join(x["wort"] for x in b)
        start, ende = b[0]["start"], max(b[-1]["ende"], b[0]["start"] + 0.8)
        zeilen.append("%d\n%s --> %s\n%s\n" % (n, zeit(start), zeit(ende), "\n".join(umbrechen(text))))
    with open(os.path.join(arg.ziel, "woerter.json"), "w", encoding="utf-8") as d:
        json.dump(woerter, d, ensure_ascii=False, indent=1)
    with open(os.path.join(arg.ziel, "pausen.json"), "w", encoding="utf-8") as d:
        json.dump(sorted(pausen, key=lambda p: p["start"]), d, ensure_ascii=False, indent=1)
    with open(os.path.join(arg.ziel, "untertitel.srt"), "w", encoding="utf-8") as d:
        d.write("\n".join(zeilen))
    print("%d Wörter, %d Pausen/Füllwörter, %d Untertitel-Blöcke → %s" % (len(woerter), len(pausen), len(zeilen), arg.ziel))
    print("Hinweis: Zeiten der Untertitel gelten für das Original. Nach dem Schneiden neu transkribieren oder verschieben.")
    return 0


if __name__ == "__main__":
    sys.exit(main())
