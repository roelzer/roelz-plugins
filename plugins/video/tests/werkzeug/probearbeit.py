#!/usr/bin/env python3
"""Probearbeit ohne OS-Sandbox: führt Testfälle aus evals/ mit `claude -p` aus – mit Plugin, ohne Plugin und
optional mit den reinen HyperFrames-Skills – und bewertet sie mit denselben graders/*.md wie `claude plugin eval`.

Warum: `claude plugin eval` versiegelt das Dateisystem schreibgeschützt, wenn es als root läuft (Cloud-Container).
Fälle, die Videos oder Dateien schreiben, laufen deshalb hier in frischen Arbeitsordnern. Fälle, die Daten nach
außen schicken könnten (Upload, Bezahldienste), gehören in `claude plugin eval` (Sandbox ohne Netz) – nicht hierher.

Aufruf (Repo-Hauptordner):
  python3 plugins/video/tests/werkzeug/probearbeit.py --faelle q1-erklaervideo,v4-druck-original --runs 3 \
      --arme mit,ohne,hf --parallel 4 --ziel /tmp/probearbeit
Ergebnis: <ziel>/ergebnis.json, <ziel>/zusammenfassung.md, je Lauf Arbeitsordner, Protokoll und (bei Videos) Messung
und Prüfbilder. Braucht die Testumgebung (tests/werkzeug/testumgebung.sh).
"""

import argparse
import concurrent.futures as cf
import glob
import json
import os
import re
import shutil
import subprocess
import sys
import time

PLUGIN = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", ".."))
WERKZEUGE = ["Read", "Write", "Edit", "Bash", "Glob", "Grep", "Skill", "Agent"]


def frontmatter(text):
    if not text.startswith("---"):
        return {}, text
    teile = text.split("\n")
    ende = teile[1:].index("---") + 1
    felder = {}
    for z in teile[1:ende]:
        m = re.match(r"^([A-Za-z_][\w-]*):\s?(.*)$", z)
        if m:
            felder[m.group(1)] = m.group(2).strip()
    return felder, "\n".join(teile[ende + 1:]).strip()


def wert(v):
    v = (v or "").strip()
    if len(v) >= 2 and v[0] == v[-1] and v[0] in "'\"":
        v = v[1:-1]
    return v


def hf_basisplugin(ziel):
    """Vergleichsbasis: Claude + reine HyperFrames-Skills (feste Version), ohne unsere Schicht."""
    skills = subprocess.run(["node", os.path.join(PLUGIN, "scripts", "hf.mjs"), "skills-pfad"],
                            capture_output=True, text=True).stdout.strip()
    os.makedirs(os.path.join(ziel, ".claude-plugin"), exist_ok=True)
    with open(os.path.join(ziel, ".claude-plugin", "plugin.json"), "w") as d:
        json.dump({"name": "hyperframes", "version": "0.9.65", "description": "HyperFrames-Skills (Vergleichsbasis)"}, d)
    for name in ("hyperframes", "hyperframes-cli", "media-use"):
        ziel_skill = os.path.join(ziel, "skills", name)
        if not os.path.exists(ziel_skill):
            shutil.copytree(os.path.join(skills, name), ziel_skill)
    return ziel


def bewerte(fall_ordner, ws, vorher, protokoll, letzte):
    ergebnisse = []
    werkzeugaufrufe = []
    for zeile in protokoll:
        if zeile.get("type") == "assistant":
            for c in zeile.get("message", {}).get("content", []):
                if c.get("type") == "tool_use":
                    werkzeugaufrufe.append((c.get("name"), json.dumps(c.get("input", {}), ensure_ascii=False)))
    neu = {os.path.relpath(p, ws) for p in glob.glob(os.path.join(ws, "**", "*"), recursive=True)
           if os.path.isfile(p)} - vorher
    for g in sorted(glob.glob(os.path.join(fall_ordner, "graders", "*.md"))):
        f, rumpf = frontmatter(open(g, encoding="utf-8").read())
        typ, gewicht = wert(f.get("type")), float(wert(f.get("weight")) or 1)
        name = os.path.basename(g)[:-3]
        ok, info = False, ""
        if typ == "file_exists":
            muster, soll = wert(f.get("path")), wert(f.get("exists") or "true") != "false"
            treffer = [p for p in neu if glob.fnmatch.fnmatch(p, muster) or glob.fnmatch.fnmatch(p, muster.replace("**/", ""))]
            ok = bool(treffer) == soll
            info = "%d neue Datei(en) passen auf %s" % (len(treffer), muster)
        elif typ == "regex":
            flags = re.I if "i" in wert(f.get("flags")) else 0
            ziel = f.get("target", "")
            text = letzte
            m = re.search(r"path:\s*([^\s}]+)", ziel)
            if m:
                p = os.path.join(ws, m.group(1))
                text = open(p, encoding="utf-8", errors="replace").read() if os.path.exists(p) else ""
            gefunden = re.search(wert(f.get("pattern")), text, flags) is not None
            ok = (not gefunden) if wert(f.get("match")) == "not_contains" else gefunden
            info = "gefunden" if gefunden else "nicht gefunden"
        elif typ == "tool_used":
            werkzeug, muster = wert(f.get("tool")), wert(f.get("input_match")) or "."
            n = sum(1 for w, e in werkzeugaufrufe if w == werkzeug and re.search(muster, e))
            mn = int(wert(f.get("min")) or 1)
            mx = int(wert(f.get("max"))) if wert(f.get("max")) else 10 ** 9
            ok = mn <= n <= mx
            info = "%s %d× (erlaubt %d..%s)" % (werkzeug, n, mn, "∞" if mx == 10 ** 9 else mx)
        else:
            info = "Typ %s hier nicht bewertbar" % typ
            continue
        ergebnisse.append({"name": name, "typ": typ, "ok": ok, "gewicht": gewicht, "info": info})
    gesamt = sum(e["gewicht"] for e in ergebnisse) or 1
    return round(sum(e["gewicht"] for e in ergebnisse if e["ok"]) / gesamt, 3), ergebnisse


def ein_lauf(fall, arm, nr, ziel, hf_plugin):
    fall_ordner = os.path.join(PLUGIN, "evals", fall)
    f, prompt = frontmatter(open(os.path.join(fall_ordner, "prompt.md"), encoding="utf-8").read())
    lauf = os.path.join(ziel, fall, "%s-%d" % (arm, nr))
    ws, heim = os.path.join(lauf, "ws"), os.path.join(lauf, "heim")
    shutil.rmtree(lauf, ignore_errors=True)
    os.makedirs(ws)
    os.makedirs(heim)
    vorb = os.path.join(fall_ordner, "vorbereiten.sh")
    if os.path.exists(vorb):
        env = dict(os.environ, HOME=heim)
        subprocess.run(["bash", vorb], cwd=ws, env=env, capture_output=True)
        shutil.rmtree(os.path.join(heim, ".roelz-video"), ignore_errors=True)   # Plugin nutzt das echte Home
        shutil.rmtree(os.path.join(heim, ".cache"), ignore_errors=True)
    vorher = {os.path.relpath(p, ws) for p in glob.glob(os.path.join(ws, "**", "*"), recursive=True) if os.path.isfile(p)}
    befehl = ["claude", "-p", prompt, "--output-format", "stream-json", "--verbose",
              "--max-turns", wert(f.get("max_turns")) or "50", "--allowedTools"] + WERKZEUGE
    if arm == "mit":
        befehl += ["--plugin-dir", PLUGIN]
    elif arm == "hf":
        befehl += ["--plugin-dir", hf_plugin]
    env = dict(os.environ, DO_NOT_TRACK="1", HYPERFRAMES_NO_TELEMETRY="1", HYPERFRAMES_NO_UPDATE_CHECK="1")
    for k in ("GEMINI_API_KEY", "GOOGLE_API_KEY", "OPENROUTER_API_KEY"):
        env.pop(k, None)
    start = time.time()
    try:
        p = subprocess.run(befehl, cwd=ws, env=env, capture_output=True, text=True,
                           timeout=int(wert(f.get("timeout_seconds")) or 1800))
        roh, fehler = p.stdout, None
    except subprocess.TimeoutExpired as e:
        roh, fehler = (e.stdout or b"").decode() if isinstance(e.stdout, bytes) else (e.stdout or ""), "Zeitüberschreitung"
    with open(os.path.join(lauf, "protokoll.jsonl"), "w", encoding="utf-8") as d:
        d.write(roh)
    protokoll = []
    for z in roh.splitlines():
        try:
            protokoll.append(json.loads(z))
        except ValueError:
            pass
    ende = next((z for z in reversed(protokoll) if z.get("type") == "result"), {})
    letzte = ende.get("result") or ""
    with open(os.path.join(lauf, "letzte_nachricht.md"), "w", encoding="utf-8") as d:
        d.write(letzte)
    score, ergebnisse = bewerte(fall_ordner, ws, vorher, protokoll, letzte)
    messung = None
    video = os.path.join(ws, "ausgabe", "video.mp4")
    if os.path.exists(video):
        aus = os.path.join(lauf, "messung.json")
        subprocess.run([sys.executable, os.path.join(PLUGIN, "scripts", "messen.py"), video, "--json", aus],
                       capture_output=True, text=True)
        subprocess.run([sys.executable, os.path.join(PLUGIN, "scripts", "boegen.py"), video, os.path.join(lauf, "bilder")],
                       capture_output=True, text=True)
        if os.path.exists(aus):
            messung = json.load(open(aus, encoding="utf-8"))
    # Aufräumen: Zwischendateien (node_modules, Einzelbilder, große Zwischenstände) – Ergebnis und Texte bleiben
    for wurzel, ordner, dateien in os.walk(ws, topdown=True):
        for o in list(ordner):
            if o in ("node_modules", ".hyperframes", "frames", ".cache"):
                shutil.rmtree(os.path.join(wurzel, o), ignore_errors=True)
                ordner.remove(o)
        for dname in dateien:
            p = os.path.join(wurzel, dname)
            if os.path.relpath(p, ws).startswith(("ausgabe", "material")):
                continue
            try:
                if os.path.getsize(p) > 5_000_000:
                    os.remove(p)
            except OSError:
                pass
    return {"fall": fall, "arm": arm, "nr": nr, "score": score, "graders": ergebnisse, "fehler": fehler,
            "kosten_usd": ende.get("total_cost_usd"), "dauer_s": round(time.time() - start), "zuege": ende.get("num_turns"),
            "p0": (messung or {}).get("p0"), "ordner": lauf}


def main():
    a = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    a.add_argument("--faelle", required=True)
    a.add_argument("--runs", type=int, default=3)
    a.add_argument("--arme", default="mit,ohne")
    a.add_argument("--parallel", type=int, default=3)
    a.add_argument("--ziel", required=True)
    arg = a.parse_args()
    os.makedirs(arg.ziel, exist_ok=True)
    arme = arg.arme.split(",")
    hf_plugin = hf_basisplugin(os.path.join(arg.ziel, "_hf-basis")) if "hf" in arme else None
    auftraege = [(fall, arm, nr) for fall in arg.faelle.split(",") for nr in range(1, arg.runs + 1) for arm in arme]
    ergebnisse = []
    with cf.ThreadPoolExecutor(arg.parallel) as pool:
        for r in pool.map(lambda t: ein_lauf(*t, arg.ziel, hf_plugin), auftraege):
            ergebnisse.append(r)
            print("%-26s %-5s #%d  Score %.2f  P0 %s  %ss  %s$" % (r["fall"], r["arm"], r["nr"], r["score"],
                  len(r["p0"]) if r["p0"] is not None else "-", r["dauer_s"], r["kosten_usd"]), flush=True)
    with open(os.path.join(arg.ziel, "ergebnis.json"), "w", encoding="utf-8") as d:
        json.dump(ergebnisse, d, ensure_ascii=False, indent=1)
    zeilen = ["| Fall | " + " | ".join(arme) + " |", "|---|" + "---|" * len(arme)]
    for fall in arg.faelle.split(","):
        werte = []
        for arm in arme:
            rs = [r for r in ergebnisse if r["fall"] == fall and r["arm"] == arm]
            mittel = sum(r["score"] for r in rs) / len(rs) if rs else 0
            p0 = [len(r["p0"]) for r in rs if r["p0"] is not None]
            werte.append("%.2f%s" % (mittel, " (P0 %s)" % "/".join(map(str, p0)) if p0 else ""))
        zeilen.append("| %s | %s |" % (fall, " | ".join(werte)))
    kosten = sum(r["kosten_usd"] or 0 for r in ergebnisse)
    zeilen.append("\nKosten gesamt (Listenpreis): %.2f $" % kosten)
    with open(os.path.join(arg.ziel, "zusammenfassung.md"), "w", encoding="utf-8") as d:
        d.write("\n".join(zeilen) + "\n")
    print("\n".join(zeilen))
    return 0


if __name__ == "__main__":
    sys.exit(main())
