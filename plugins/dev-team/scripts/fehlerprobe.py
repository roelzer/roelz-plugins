#!/usr/bin/env python3
"""Fehlerprobe für Prüfer: Finden die Tests einen absichtlich eingebauten Fehler?

Baut den aktuellen Stand (Arbeitsordner, ohne verdeckte Tests) in einem Temp-Ordner nach, ersetzt in
EINER Datei einen Textabschnitt (z. B. "<=" durch "<") und führt den Testbefehl aus. Das Projekt
selbst bleibt unverändert. So können Reviewer, Fachprüfer und Tester belegen, ob eine Stelle durch
Tests abgesichert ist – ohne selbst Code zu schreiben.

  python3 fehlerprobe.py --datei src/x.py --alt "a <= b" --neu "a < b" [--vorkommen 1]

Ergebnis: „ERKANNT“ (Tests rot – gut) oder „NICHT ERKANNT“ (Tests grün – hier fehlt ein Test).
"""

import argparse
import json
import os
import shutil
import subprocess
import sys
import tempfile


def main():
    a = argparse.ArgumentParser()
    a.add_argument("--datei", required=True)
    a.add_argument("--alt", required=True)
    a.add_argument("--neu", required=True)
    a.add_argument("--vorkommen", type=int, default=1, help="welches Vorkommen ersetzen (1 = erstes)")
    arg = a.parse_args()
    wurzel = subprocess.run(["git", "rev-parse", "--show-toplevel"], capture_output=True, text=True).stdout.strip()
    if not wurzel:
        print("FEHLER: kein Git-Repo.")
        sys.exit(2)
    gemeinsam = subprocess.run(["git", "rev-parse", "--path-format=absolute", "--git-common-dir"], cwd=wurzel,
                               capture_output=True, text=True).stdout.strip()
    haupt = os.path.dirname(gemeinsam.rstrip("/\\"))
    konfig = None
    for ordner in (wurzel, haupt):
        try:
            with open(os.path.join(ordner, ".claude", "dev-team.json"), encoding="utf-8") as f:
                konfig = json.load(f)
                break
        except (OSError, ValueError):
            continue
    befehl = (konfig or {}).get("testbefehl")
    if not befehl:
        print("FEHLER: kein Testbefehl in .claude/dev-team.json.")
        sys.exit(2)
    rel = os.path.relpath(os.path.abspath(os.path.join(wurzel, arg.datei)), wurzel).replace("\\", "/")
    if rel.startswith("../") or rel.startswith(".dev-team/") or rel.startswith(".claude/"):
        print("FEHLER: Datei muss im Projekt liegen (nicht .claude/ oder .dev-team/).")
        sys.exit(2)
    tmp = tempfile.mkdtemp(prefix="fehlerprobe-")
    try:
        dateien = subprocess.run(["git", "ls-files", "-co", "--exclude-standard"], cwd=wurzel, capture_output=True,
                                 text=True).stdout.splitlines()
        for d in dateien:
            if d.startswith((".claude/worktrees/", ".dev-team/")):
                continue
            q = os.path.join(wurzel, d)
            if os.path.isfile(q):
                z = os.path.join(tmp, d)
                os.makedirs(os.path.dirname(z), exist_ok=True)
                shutil.copy2(q, z)
        ziel = os.path.join(tmp, rel)
        with open(ziel, encoding="utf-8") as f:
            text = f.read()
        teile = text.split(arg.alt)
        if len(teile) <= arg.vorkommen:
            print("FEHLER: '%s' kommt in %s nicht %d-mal vor." % (arg.alt, rel, arg.vorkommen))
            sys.exit(2)
        neu = arg.alt.join(teile[:arg.vorkommen]) + arg.neu + arg.alt.join(teile[arg.vorkommen:])
        with open(ziel, "w", encoding="utf-8") as f:
            f.write(neu)
        umg = dict(os.environ, PYTHONDONTWRITEBYTECODE="1")
        if os.name == "nt" and shutil.which("bash"):
            r = subprocess.run([shutil.which("bash"), "-c", befehl], cwd=tmp, capture_output=True, text=True, env=umg,
                               timeout=1800)
        else:
            r = subprocess.run(befehl, shell=True, cwd=tmp, capture_output=True, text=True, env=umg, timeout=1800)
        zeile = (text[:text.find(arg.alt)].count("\n") + 1) if arg.alt in text else 0
        if r.returncode != 0:
            print("ERKANNT: Mit dem eingebauten Fehler (%s:%d, '%s' → '%s') sind die Tests rot." % (rel, zeile, arg.alt,
                                                                                                  arg.neu))
            letzte = [z for z in ((r.stdout or "") + (r.stderr or "")).splitlines() if z.strip()][-3:]
            for z in letzte:
                print("  " + z[:160])
            sys.exit(0)
        print("NICHT ERKANNT: Mit dem eingebauten Fehler (%s:%d, '%s' → '%s') bleiben alle Tests grün – hier fehlt "
              "ein Test." % (rel, zeile, arg.alt, arg.neu))
        sys.exit(1)
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


if __name__ == "__main__":
    main()
