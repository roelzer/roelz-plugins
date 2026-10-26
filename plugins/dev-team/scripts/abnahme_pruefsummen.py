#!/usr/bin/env python3
"""Prüfsummen der verdeckten Abnahmetests – Beleg, dass sie vor dem Bauen fertig waren und danach
unverändert aufgedeckt werden.

  python3 abnahme_pruefsummen.py --schreiben [--freigabe <stichwort>]   (Projektleiter, nach dem Tester)
  python3 abnahme_pruefsummen.py --pruefen                               (macht die Test-Schranke selbst)

Liste: docs/ABNAHME_PRUEFSUMMEN.txt (Nachweis-Bereich, kein Agent kann sie schreiben; wird mit dem
Commit „Plan freigegeben“ versioniert). Ist sie schon da und würde sich ändern, braucht es eine
Freigabe von Simon, deren Geltung „docs/ABNAHME_PRUEFSUMMEN.txt“ nennt.
"""

import argparse
import hashlib
import os
import subprocess
import sys

DATEI = os.path.join("docs", "ABNAHME_PRUEFSUMMEN.txt")
VERDECKT = os.path.join(".dev-team", "verdeckt")


def summe(pfad):
    with open(pfad, "rb") as f:
        inhalt = f.read().replace(b"\r\n", b"\n")
    return hashlib.sha256(inhalt).hexdigest()


def verdeckte(hauptordner):
    wurzel = os.path.join(hauptordner, VERDECKT)
    aus = {}
    for ordner, _, dateien in os.walk(wurzel):
        for d in sorted(dateien):
            if d.endswith(".verdeckt"):
                voll = os.path.join(ordner, d)
                rel = os.path.relpath(voll, wurzel).replace("\\", "/")[:-len(".verdeckt")]
                aus[rel] = summe(voll)
    return aus


def lies_liste(hauptordner):
    pfad = os.path.join(hauptordner, DATEI)
    liste = {}
    if os.path.isfile(pfad):
        with open(pfad, encoding="utf-8") as f:
            for zeile in f:
                teile = zeile.strip().split("  ", 1)
                if len(teile) == 2 and len(teile[0]) == 64 and not zeile.startswith("#"):
                    liste[teile[1].strip()] = teile[0]
    return liste


def aufgedeckt_finden(wurzel, rel):
    """Aufgedeckte Fassung: tests/abnahme/<rel> oder eine gleichnamige Datei unter tests/abnahme/."""
    direkt = os.path.join(wurzel, "tests", "abnahme", rel)
    if os.path.isfile(direkt):
        return [direkt]
    name = os.path.basename(rel)
    funde = []
    for ordner, _, dateien in os.walk(os.path.join(wurzel, "tests", "abnahme")):
        if name in dateien:
            funde.append(os.path.join(ordner, name))
    return funde


def pruefen(hauptordner, wurzel=None):
    """-> Liste von Fehlertexten (leer = alles unverändert)."""
    wurzel = wurzel or hauptordner
    liste = lies_liste(hauptordner)
    fehler = []
    jetzt = verdeckte(hauptordner)
    for rel, soll in liste.items():
        if rel in jetzt and jetzt[rel] != soll:
            fehler.append("Verdeckter Abnahmetest %s wurde nach dem Festhalten geändert." % rel)
        for f in aufgedeckt_finden(wurzel, rel):
            if summe(f) != soll:
                fehler.append("Aufgedeckter Abnahmetest %s weicht von der festgehaltenen Fassung ab."
                              % os.path.relpath(f, wurzel).replace("\\", "/"))
    return fehler


def main():
    a = argparse.ArgumentParser()
    a.add_argument("--schreiben", action="store_true")
    a.add_argument("--pruefen", action="store_true")
    a.add_argument("--freigabe", default="")
    arg = a.parse_args()
    haupt = subprocess.run(["git", "rev-parse", "--path-format=absolute", "--git-common-dir"], capture_output=True,
                           text=True).stdout.strip()
    hauptordner = os.path.dirname(haupt.rstrip("/\\")) if haupt else os.getcwd()
    if arg.pruefen:
        fehler = pruefen(hauptordner, subprocess.run(["git", "rev-parse", "--show-toplevel"], capture_output=True,
                                                    text=True).stdout.strip() or hauptordner)
        for t in fehler:
            print("FEHLER: " + t)
        print("OK: Abnahmetests unverändert." if not fehler else "ERGEBNIS: NICHT OK")
        sys.exit(1 if fehler else 0)
    if not arg.schreiben:
        a.error("--schreiben oder --pruefen angeben")
    jetzt = verdeckte(hauptordner)
    if not jetzt:
        print("FEHLER: Keine verdeckten Tests (*.verdeckt) unter %s gefunden. Nichts geschrieben." % VERDECKT)
        sys.exit(1)
    alt = lies_liste(hauptordner)
    if alt and alt != jetzt:
        sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
        import pruefe_tests
        e = pruefe_tests.Ergebnis()
        fg = pruefe_tests.pruefe_freigabe(e, hauptordner, arg.freigabe) if arg.freigabe else pruefe_tests.Freigabe()
        if not fg.deckt("docs/ABNAHME_PRUEFSUMMEN.txt"):
            print("FEHLER: Die Prüfsummen sind schon festgehalten und würden sich ändern. Das braucht Simons "
                  "Freigabe (Geltung: docs/ABNAHME_PRUEFSUMMEN.txt). Nichts geschrieben.")
            for t in e.fehler:
                print("FEHLER: " + t)
            sys.exit(1)
    pfad = os.path.join(hauptordner, DATEI)
    os.makedirs(os.path.dirname(pfad), exist_ok=True)
    with open(pfad, "w", encoding="utf-8", newline="\n") as f:
        f.write("# Prüfsummen der verdeckten Abnahmetests (sha256, Zeilenenden vereinheitlicht)\n")
        f.write("# Automatisch geschrieben von abnahme_pruefsummen.py – nicht von Hand ändern.\n")
        for rel in sorted(jetzt):
            f.write("%s  %s\n" % (jetzt[rel], rel))
    print("GESCHRIEBEN: %s (%d Abnahmetests). Jetzt mit dem Commit „Plan freigegeben“ versionieren." % (DATEI, len(jetzt)))


if __name__ == "__main__":
    main()
