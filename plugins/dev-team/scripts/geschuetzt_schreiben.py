#!/usr/bin/env python3
"""Schreibt eine geschützte Datei (Referenzfall oder .claude/dev-team.json) – nur mit Simons Freigabe.

Der Projektleiter darf Referenzfälle und die Dev-Team-Einstellungen nicht selbst ändern. Liefert Simon
neue Referenzdaten oder einen geänderten Testbefehl, trägt er in .claude/freigaben.md eine Zeile ein:

    Datum | Stichwort | Geltung (Zielpfad, z. B. tests/referenz/fall5.json) | Grund

Dann:  python3 geschuetzt_schreiben.py --quelle <datei> --ziel <pfad im Projekt> --freigabe <stichwort>

Das Skript prüft die Freigabe (Stichwort genau, Geltung deckt den Zielpfad), kopiert die Datei, und
schreibt eine Zeile mit Prüfsumme nach docs/FREIGABEN_LOG.md.
"""

import argparse
import hashlib
import os
import shutil
import subprocess
import sys
from datetime import datetime

HIER = os.path.dirname(os.path.abspath(__file__))
sys.path.insert(0, HIER)
import pruefe_tests  # noqa: E402  (Freigabe-Prüfung wiederverwenden)
import bereiche  # noqa: E402

ERLAUBT = ("tests/referenz/", ".claude/dev-team.json")


def main():
    a = argparse.ArgumentParser()
    a.add_argument("--quelle", required=True)
    a.add_argument("--ziel", required=True)
    a.add_argument("--freigabe", required=True)
    arg = a.parse_args()
    wurzel = subprocess.run(["git", "rev-parse", "--show-toplevel"], capture_output=True, text=True).stdout.strip()
    if not wurzel or not os.path.isfile(os.path.join(wurzel, ".claude", "dev-team.json")):
        print("FEHLER: Nicht in einem Dev-Team-Projekt (Hauptordner) aufgerufen. Nichts geändert.")
        sys.exit(1)
    ziel = os.path.abspath(os.path.join(wurzel, arg.ziel))
    rel = bereiche.norm(os.path.relpath(ziel, wurzel))
    if rel.startswith("../") or not (rel.startswith(ERLAUBT[0]) or rel == ERLAUBT[1]):
        print("FEHLER: Ziel nur tests/referenz/… oder .claude/dev-team.json. Nichts geändert.")
        sys.exit(1)
    if not os.path.isfile(arg.quelle):
        print("FEHLER: Quelle %s fehlt. Nichts geändert." % arg.quelle)
        sys.exit(1)
    e = pruefe_tests.Ergebnis()
    fg = pruefe_tests.pruefe_freigabe(e, wurzel, arg.freigabe)
    if e.fehler or not fg.deckt(rel):
        for t in e.fehler:
            print("FEHLER: " + t)
        if not e.fehler:
            print("FEHLER: Die Freigabe '%s' deckt %s nicht (Spalte Geltung)." % (arg.freigabe, rel))
        print("Nichts geändert.")
        sys.exit(1)
    if rel == ".claude/dev-team.json":
        import json
        try:
            with open(arg.quelle, encoding="utf-8") as f:
                json.load(f)
        except ValueError as fehler:
            print("FEHLER: Quelle ist kein gültiges JSON (%s). Nichts geändert." % fehler)
            sys.exit(1)
    os.makedirs(os.path.dirname(ziel), exist_ok=True)
    shutil.copyfile(arg.quelle, ziel)
    with open(ziel, "rb") as f:
        summe = hashlib.sha256(f.read()).hexdigest()
    log = os.path.join(wurzel, "docs", "FREIGABEN_LOG.md")
    neu = not os.path.exists(log)
    os.makedirs(os.path.dirname(log), exist_ok=True)
    with open(log, "a", encoding="utf-8") as f:
        if neu:
            f.write("# Freigaben-Log\n\nAutomatisch geschrieben. Jede Zeile: Zeit | Datei | Prüfsumme | Freigabe.\n\n")
        f.write("| %s | %s | %s | %s |\n" % (datetime.now().strftime("%Y-%m-%d %H:%M"), rel, summe[:16], fg.zeile))
    print("GESCHRIEBEN: %s (Prüfsumme %s), Freigabe: %s" % (rel, summe[:16], fg.zeile))


if __name__ == "__main__":
    main()
