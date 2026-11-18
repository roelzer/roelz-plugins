#!/usr/bin/env python3
"""Misst ein fertiges Video ohne KI: Technik, erstes Bild, Stillstand, neue Information, Lautheit, Untertitel.

Aufruf:  python3 messen.py <video.mp4> [--format 16:9|9:16] [--dauer SEK] [--srt untertitel.srt]
                           [--json ausgabe.json] [--hf-check check.json]
Ausgabe: lesbarer Bericht + JSON mit Messwerten und P0-Liste. Exit 0 = kein P0, 1 = P0 gefunden, 2 = Aufruf/Datei kaputt.
Braucht ffmpeg/ffprobe im PATH und numpy. Verändert nichts.

Schwellen (Herkunft: docs/personal/video-editor/recherche.md; Eichung an den Probelauf-Videos B1–B4):
- Neue Information: Bild verglichen mit dem Bild 1 s davor, 32×18 Graustufen, Änderung > 12 auf mindestens 6 % der
  Fläche. Dünne Deko-Bewegung (laufende Linien) zählt so nicht als Information.
- Längste Strecke ohne neue Information: Mitte ≤ 3 s (sonst Lesepause begründen), Schluss ≤ 2 s; > 4 s ist P0 (F1).
- Bild 0 und Bild bei 1,0 s: Helligkeitsspanne ≥ 30 (sonst einfarbig/leer, P0 F4).
- Lautheit −16…−14 LUFS integriert, True Peak ≤ −1 dBTP; Film > 15 s ohne Ton ist P0 (F5).
- Untertitel: ≤ 20 Zeichen/s, ≤ 2 Zeilen, ≤ 42 Zeichen je Zeile, Standzeit ≥ 0,8 s (Netflix/BBC).
"""

import argparse
import json
import os
import re
import subprocess
import sys

NEU_DIFF, NEU_FLAECHE, W, H, FPS = 12, 0.06, 32, 18, 4


def lauf(befehl):
    return subprocess.run(befehl, capture_output=True, text=True)


def probe(video):
    r = lauf(["ffprobe", "-v", "error", "-show_entries",
              "format=duration:stream=codec_type,width,height,avg_frame_rate,r_frame_rate",
              "-of", "json", video])
    if r.returncode != 0:
        raise SystemExit("ffprobe konnte die Datei nicht lesen: %s" % r.stderr.strip())
    d = json.loads(r.stdout)
    v = next((s for s in d.get("streams", []) if s.get("codec_type") == "video"), None)
    a = any(s.get("codec_type") == "audio" for s in d.get("streams", []))
    if v is None:
        raise SystemExit("keine Videospur")

    def bruch(x):
        z, n = (x or "0/1").split("/")
        return float(z) / float(n) if float(n) else 0.0
    return {"dauer": float(d["format"]["duration"]), "breite": v["width"], "hoehe": v["height"],
            "fps": round(bruch(v.get("avg_frame_rate")), 3), "fps_nominal": round(bruch(v.get("r_frame_rate")), 3),
            "ton": a}


def graubilder(video, fps, w, h, start=None, anzahl=None):
    import numpy as np
    befehl = ["ffmpeg", "-v", "error"]
    if start is not None:
        befehl += ["-ss", str(start)]
    befehl += ["-i", video, "-vf", "fps=%s,scale=%d:%d:flags=area,format=gray" % (fps, w, h)]
    if anzahl:
        befehl += ["-frames:v", str(anzahl)]
    befehl += ["-f", "rawvideo", "-"]
    p = subprocess.run(befehl, capture_output=True)
    return np.frombuffer(p.stdout, np.uint8).reshape(-1, h, w).astype(np.int16)


def bild_spanne(video, zeit):
    a = graubilder(video, 1, 160, 90, start=zeit, anzahl=1)
    if len(a) == 0:
        return None
    return int(a[0].max() - a[0].min())


def neue_information(video, dauer):
    import numpy as np
    a = graubilder(video, FPS, W, H)
    neu = [((np.abs(a[i] - a[i - FPS]) > NEU_DIFF).mean() > NEU_FLAECHE) for i in range(FPS, len(a))]
    strecken, cur = [], 0
    for i, n in enumerate(neu):
        if n:
            if cur:
                strecken.append(((i - cur + FPS) / FPS, cur / FPS))
            cur = 0
        else:
            cur += 1
    if cur:
        strecken.append(((len(neu) - cur + FPS) / FPS, cur / FPS))
    laengste = max(strecken, key=lambda s: s[1], default=(0.0, 0.0))
    schluss = next((s for s in strecken if abs(s[0] + s[1] - dauer) < 0.6), (dauer, 0.0))
    return {"anteil_sekunden_mit_neuer_info": round(float(np.mean(neu)) if neu else 0.0, 2),
            "laengste_strecke_s": round(laengste[1], 2), "laengste_ab_s": round(laengste[0], 2),
            "schluss_halten_s": round(schluss[1], 2),
            "strecken_ueber_3s": [[round(s, 1), round(l, 1)] for s, l in strecken if l > 3]}


def stillstand(video):
    r = lauf(["ffmpeg", "-hide_banner", "-i", video, "-vf", "freezedetect=n=-40dB:d=0.7", "-map", "0:v", "-f", "null", "-"])
    starts = [float(x) for x in re.findall(r"freeze_start: ([0-9.]+)", r.stderr)]
    dauern = [float(x) for x in re.findall(r"freeze_duration: ([0-9.]+)", r.stderr)]
    return [[round(s, 2), round(d, 2)] for s, d in zip(starts, dauern)]


def lautheit(video):
    r = lauf(["ffmpeg", "-hide_banner", "-i", video, "-map", "0:a:0", "-af", "ebur128=peak=true", "-f", "null", "-"])
    i = re.findall(r"I:\s+(-?[0-9.]+|-inf) LUFS", r.stderr)
    p = re.findall(r"Peak:\s+(-?[0-9.]+|-inf) dBFS", r.stderr)
    zahl = lambda x: None if x in (None, "-inf") else float(x)
    return {"lufs": zahl(i[-1]) if i else None, "true_peak_dbtp": zahl(p[-1]) if p else None}


def untertitel(srt):
    zeit = r"(\d+):(\d+):(\d+)[,.](\d+)"
    sek = lambda m: int(m[0]) * 3600 + int(m[1]) * 60 + int(m[2]) + int(m[3]) / 1000
    bloecke = re.split(r"\n\s*\n", open(srt, encoding="utf-8-sig").read().strip())
    befunde, n = [], 0
    for b in bloecke:
        zeilen = [z for z in b.strip().split("\n") if z.strip()]
        zz = next((i for i, z in enumerate(zeilen) if "-->" in z), None)
        if zz is None:
            continue
        m = re.findall(zeit, zeilen[zz])
        if len(m) < 2:
            continue
        n += 1
        text = [re.sub(r"<[^>]+>|\{[^}]+\}", "", z) for z in zeilen[zz + 1:]]
        dauer = sek(m[1]) - sek(m[0])
        zeichen = sum(len(z) for z in text)
        if dauer < 0.8:
            befunde.append("Block %d steht nur %.2f s (< 0,8 s)" % (n, dauer))
        if dauer > 0 and zeichen / dauer > 20:
            befunde.append("Block %d: %.1f Zeichen/s (> 20)" % (n, zeichen / dauer))
        if len(text) > 2:
            befunde.append("Block %d: %d Zeilen (> 2)" % (n, len(text)))
        for z in text:
            if len(z) > 42:
                befunde.append("Block %d: Zeile mit %d Zeichen (> 42)" % (n, len(z)))
    return {"bloecke": n, "befunde": befunde}


def main():
    a = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    a.add_argument("video")
    a.add_argument("--format", choices=["16:9", "9:16", "1:1"])
    a.add_argument("--dauer", type=float, help="Soll-Dauer in s (Toleranz ±0,5 s)")
    a.add_argument("--srt")
    a.add_argument("--json")
    a.add_argument("--hf-check", help="JSON-Ausgabe von `hyperframes check --json` zum Einrechnen")
    a.add_argument("--art", choices=["komposition", "schnitt"], default="komposition",
                   help="schnitt = Bild stammt aus vorhandenem Material (z. B. Interview vor ruhigem Hintergrund): "
                        "lange Strecken ohne neue Bildinformation sind dann nur ein Hinweis, kein P0")
    arg = a.parse_args()
    if not os.path.exists(arg.video):
        print("Datei nicht gefunden: %s" % arg.video)
        return 2
    try:
        import numpy  # noqa: F401
    except ImportError:
        print("numpy fehlt: pip install numpy")
        return 2

    m = {"datei": os.path.basename(arg.video)}
    m.update(probe(arg.video))
    p0, hinweise = [], []
    if arg.format:
        bw, bh = {"16:9": (16, 9), "9:16": (9, 16), "1:1": (1, 1)}[arg.format]
        if abs(m["breite"] / m["hoehe"] - bw / bh) > 0.01:
            p0.append("Format %dx%d passt nicht zu %s" % (m["breite"], m["hoehe"], arg.format))
    if arg.dauer and abs(m["dauer"] - arg.dauer) > 0.5:
        p0.append("Dauer %.2f s statt %.1f s (±0,5)" % (m["dauer"], arg.dauer))
    if abs(m["fps"] - m["fps_nominal"]) > 0.05:
        hinweise.append("Bildrate schwankt (avg %.3f, nominal %.3f) – konstante Bildrate erzwingen" % (m["fps"], m["fps_nominal"]))

    m["bild0_spanne"] = bild_spanne(arg.video, 0)
    m["bild1s_spanne"] = bild_spanne(arg.video, 1.0) if m["dauer"] > 1.2 else None
    if m["bild0_spanne"] is not None and m["bild0_spanne"] < 30:
        p0.append("F4: Bild 0 ist einfarbig/leer (Spanne %d)" % m["bild0_spanne"])
    if m["bild1s_spanne"] is not None and m["bild1s_spanne"] < 30:
        p0.append("F4: Bild bei 1,0 s ist einfarbig/leer (Spanne %d)" % m["bild1s_spanne"])

    m["neue_information"] = neue_information(arg.video, m["dauer"])
    ni = m["neue_information"]
    if ni["laengste_strecke_s"] > 4 and arg.art == "komposition":
        p0.append("F1: %.1f s ohne neue Information ab %.1f s" % (ni["laengste_strecke_s"], ni["laengste_ab_s"]))
    elif ni["laengste_strecke_s"] > 4:
        hinweise.append("F1: %.1f s ohne neue Bildinformation ab %.1f s – bei Material-Schnitt prüfen, ob B-Roll, "
                        "Ausschnittwechsel oder Texteinblendung fehlen" % (ni["laengste_strecke_s"], ni["laengste_ab_s"]))
    elif ni["strecken_ueber_3s"]:
        hinweise.append("F1: Strecken > 3 s ohne neue Information %s – nur als begründete Lesepause" % ni["strecken_ueber_3s"])
    if ni["schluss_halten_s"] > 2:
        hinweise.append("F1: Schlussbild hält %.1f s (Ziel ≤ 2 s)" % ni["schluss_halten_s"])
    m["stillstand_freezedetect"] = stillstand(arg.video)

    if m["ton"]:
        m.update(lautheit(arg.video))
        if m["lufs"] is None or m["lufs"] < -40:
            if m["dauer"] > 15:
                p0.append("F5: Tonspur praktisch stumm (%s LUFS) bei Film über 15 s" % m["lufs"])
            else:
                hinweise.append("Tonspur stumm – nur in Ordnung, wenn bewusst für stummes Abspielen gebaut")
        else:
            if not -16.5 <= m["lufs"] <= -13.5:
                p0.append("F5: Lautheit %.1f LUFS (Ziel −16…−14)" % m["lufs"])
            if m["true_peak_dbtp"] is not None and m["true_peak_dbtp"] > -1.0:
                p0.append("F5: True Peak %.1f dBTP (> −1)" % m["true_peak_dbtp"])
    elif m["dauer"] > 15:
        p0.append("F5: keine Tonspur bei Film über 15 s")
    else:
        hinweise.append("keine Tonspur – nur in Ordnung, wenn bewusst stumm")

    if arg.srt:
        m["untertitel"] = untertitel(arg.srt)
        p0 += ["F3: " + b for b in m["untertitel"]["befunde"]]
    if arg.hf_check and os.path.exists(arg.hf_check):
        roh = open(arg.hf_check, encoding="utf-8").read()
        for kennung in ("text_below_floor", "line_unread", "first_frame_empty", "dead_stretch", "film_silent"):
            if kennung in roh:
                p0.append("hyperframes check meldet %s" % kennung)

    m["p0"], m["hinweise"] = p0, hinweise
    print("Messung %s: %dx%d, %.2f s, %.2f fps, Ton %s" % (m["datei"], m["breite"], m["hoehe"], m["dauer"], m["fps"],
                                                           "ja" if m["ton"] else "nein"))
    if m.get("lufs") is not None:
        print("  Lautheit %.1f LUFS, True Peak %s dBTP" % (m["lufs"], m.get("true_peak_dbtp")))
    print("  Bild 0 Spanne %s, Bild 1 s Spanne %s" % (m["bild0_spanne"], m["bild1s_spanne"]))
    print("  Neue Information in %d %% der Sekunden; längste Strecke ohne: %.1f s ab %.1f s; Schlussbild %.1f s"
          % (ni["anteil_sekunden_mit_neuer_info"] * 100, ni["laengste_strecke_s"], ni["laengste_ab_s"], ni["schluss_halten_s"]))
    for t in p0:
        print("P0: " + t)
    for t in hinweise:
        print("HINWEIS: " + t)
    print("ERGEBNIS: %s" % ("kein P0" if not p0 else "%d P0" % len(p0)))
    if arg.json:
        with open(arg.json, "w", encoding="utf-8") as d:
            json.dump(m, d, ensure_ascii=False, indent=2)
    return 1 if p0 else 0


if __name__ == "__main__":
    sys.exit(main())
