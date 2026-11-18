#!/usr/bin/env python3
"""Probearbeit des Website-Bauers ohne OS-Sandbox: führt Testfälle aus evals/ mit `claude -p` aus – mit und ohne
Plugin – und bewertet sie mit denselben graders/*.md wie `claude plugin eval`. Nach jedem Lauf misst
scripts/pruefen.mjs die gebaute Seite (website/*/site), damit beide Arme mit demselben Skript verglichen werden.

Warum: `claude plugin eval` versiegelt das Dateisystem schreibgeschützt, wenn es als root läuft (Cloud-Container),
und Website-Fälle brauchen Netz (Vorbilder, freie Bilder).
Jeder Versuch einer verbotenen Handlung zählt als Fehlschlag, auch wenn die Sperre ihn blockt (tool_used max 0).

Aufruf (Repo-Hauptordner):
  python3 plugins/website/tests/werkzeug/probearbeit.py --faelle q1-firma,d1-gleich-online --runs 2 \
      --arme mit,ohne --parallel 4 --ziel /tmp/probearbeit-website
Erweiterungen der Prüfpunkte gegenüber `claude plugin eval` (nur in diesem Läufer):
  file_exists: path_regex statt path · regex: target {source: files, path_regex: …} liest alle passenden Dateien
  evals/<fall>/pruefung.md mit „ohne: W8,W9“ → das Prüfskript darf für diese Fehler keinen P0 melden (braucht eine gebaute Seite)
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
WERKZEUGE = ["Read", "Write", "Edit", "Bash", "Glob", "Grep", "Skill", "Agent", "WebFetch", "WebSearch"]


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


def bewerte(fall_ordner, ws, vorher, protokoll, letzte, pruefung=None):
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
        alle = {os.path.relpath(p, ws).replace(os.sep, "/") for p in glob.glob(os.path.join(ws, "**", "*"), recursive=True) if os.path.isfile(p)}
        if typ == "file_exists":
            soll = wert(f.get("exists") or "true") != "false"
            if f.get("path_regex"):
                muster = wert(f.get("path_regex"))
                treffer = [p for p in alle if re.search(muster, p)]
            else:
                muster = wert(f.get("path"))
                treffer = [p for p in neu if glob.fnmatch.fnmatch(p, muster) or glob.fnmatch.fnmatch(p, muster.replace("**/", ""))]
            ok = bool(treffer) == soll
            info = "%d Datei(en) passen auf %s" % (len(treffer), muster)
        elif typ == "pruefung":
            verboten = [x.strip() for x in wert(f.get("ohne")).split(",") if x.strip()]
            if pruefung is None:
                ok, info = False, "keine gebaute Seite zum Prüfen"
            else:
                harte = [b for b in pruefung.get("befunde", []) if b["schwere"] == "P0" and (not verboten or b["fehler"] in verboten)]
                ok = not harte
                info = "P0: " + ("; ".join("%s %s" % (b["fehler"], b["text"]) for b in harte[:4]) or "keine")
        elif typ == "regex":
            flags = re.I if "i" in wert(f.get("flags")) else 0
            ziel = f.get("target", "")
            text = letzte
            m = re.search(r"path:\s*([^\s}]+)", ziel)
            mr = re.search(r"path_regex:\s*['\"]?([^'\"}]+)", ziel)
            if mr:
                text = "\n".join(open(os.path.join(ws, p), encoding="utf-8", errors="replace").read()
                                 for p in sorted(alle) if re.search(mr.group(1).strip(), p) and os.path.getsize(os.path.join(ws, p)) < 3_000_000)
            elif m:
                p = os.path.join(ws, m.group(1))
                text = open(p, encoding="utf-8", errors="replace").read() if os.path.exists(p) else ""
            gefunden = re.search(wert(f.get("pattern")), text, flags) is not None
            ok = (not gefunden) if wert(f.get("match")) == "not_contains" else gefunden
            info = "gefunden" if gefunden else "nicht gefunden"
        elif typ == "tool_used":
            werkzeug, muster = wert(f.get("tool")), wert(f.get("input_match")) or "."
            n = sum(1 for w, e in werkzeugaufrufe if re.fullmatch(werkzeug, w or "") and re.search(muster, e))
            mn = int(wert(f.get("min")) or 1)
            mx = int(wert(f.get("max"))) if wert(f.get("max")) else 10 ** 9
            ok = mn <= n <= mx
            info = "%s %d× (erlaubt %d..%s)" % (werkzeug, n, mn, "∞" if mx == 10 ** 9 else mx)
        else:
            info = "Typ %s hier nicht bewertbar" % typ
            continue
        ergebnisse.append({"name": name, "typ": typ, "ok": ok, "gewicht": gewicht, "info": info})
    # Messung durch das Prüfskript (nur in diesem Läufer): evals/<fall>/pruefung.md mit „ohne: W1,W9“
    pm = os.path.join(fall_ordner, "pruefung.md")
    if os.path.exists(pm):
        f, _ = frontmatter(open(pm, encoding="utf-8").read())
        verboten = [x.strip() for x in wert(f.get("ohne")).split(",") if x.strip()]
        if pruefung is None:
            ok, info = False, "keine gebaute Seite zum Prüfen"
        else:
            harte = [b for b in pruefung.get("befunde", []) if b["schwere"] == "P0" and (not verboten or b["fehler"] in verboten)]
            ok, info = not harte, "P0: " + ("; ".join("%s %s" % (b["fehler"], b["text"]) for b in harte[:4]) or "keine")
        ergebnisse.append({"name": "pruefung", "typ": "pruefung", "ok": ok, "gewicht": 1.0, "info": info})
    gesamt = sum(e["gewicht"] for e in ergebnisse) or 1
    return round(sum(e["gewicht"] for e in ergebnisse if e["ok"]) / gesamt, 3), ergebnisse


def ein_lauf(fall, arm, nr, ziel):
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
    vorher = {os.path.relpath(p, ws) for p in glob.glob(os.path.join(ws, "**", "*"), recursive=True) if os.path.isfile(p)}
    befehl = ["claude", "-p", prompt, "--output-format", "stream-json", "--verbose",
              "--max-turns", wert(f.get("max_turns")) or "50", "--allowedTools"] + WERKZEUGE
    if arm == "mit":
        befehl += ["--plugin-dir", PLUGIN]
    env = dict(os.environ, DO_NOT_TRACK="1")
    for k in ("GEMINI_API_KEY", "GOOGLE_API_KEY", "OPENROUTER_API_KEY", "OPENAI_API_KEY"):
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
    pruefung = None
    seiten = sorted(glob.glob(os.path.join(ws, "website", "*", "site", "index.html")))
    if seiten:
        aus = os.path.join(lauf, "pruefung")
        subprocess.run(["node", os.path.join(PLUGIN, "scripts", "pruefen.mjs"), os.path.dirname(seiten[0]), "--aus", aus, "--schnell"],
                       capture_output=True, text=True, timeout=1200)
        j = os.path.join(aus, "pruefung.json")
        if os.path.exists(j):
            pruefung = json.load(open(j, encoding="utf-8"))
    score, ergebnisse = bewerte(fall_ordner, ws, vorher, protokoll, letzte, pruefung)
    # Aufräumen: Zwischendateien (node_modules, Einzelbilder, große Zwischenstände) – Ergebnis und Texte bleiben
    for wurzel, ordner, dateien in os.walk(ws, topdown=True):
        for o in list(ordner):
            if o in ("node_modules", ".cache", ".astro"):
                shutil.rmtree(os.path.join(wurzel, o), ignore_errors=True)
                ordner.remove(o)
        for dname in dateien:
            p = os.path.join(wurzel, dname)
            if "/site/" in os.path.relpath(p, ws).replace(os.sep, "/"):
                continue
            try:
                if os.path.getsize(p) > 5_000_000:
                    os.remove(p)
            except OSError:
                pass
    return {"fall": fall, "arm": arm, "nr": nr, "score": score, "graders": ergebnisse, "fehler": fehler,
            "kosten_usd": ende.get("total_cost_usd"), "dauer_s": round(time.time() - start), "zuege": ende.get("num_turns"),
            "p0": [b for b in (pruefung or {}).get("befunde", []) if b["schwere"] == "P0"] if pruefung else None, "ordner": lauf}


def main():
    a = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    a.add_argument("--faelle", required=True)
    a.add_argument("--runs", type=int, default=2)
    a.add_argument("--arme", default="mit,ohne")
    a.add_argument("--parallel", type=int, default=3)
    a.add_argument("--ziel", required=True)
    arg = a.parse_args()
    os.makedirs(arg.ziel, exist_ok=True)
    arme = arg.arme.split(",")
    auftraege = [(fall, arm, nr) for fall in arg.faelle.split(",") for nr in range(1, arg.runs + 1) for arm in arme]
    ergebnisse = []
    with cf.ThreadPoolExecutor(arg.parallel) as pool:
        for r in pool.map(lambda t: ein_lauf(*t, arg.ziel), auftraege):
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
