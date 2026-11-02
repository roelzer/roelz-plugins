#!/usr/bin/env python3
"""Prüfsummen der verdeckten Abnahmetests – Beleg, dass sie vor dem Bauen fertig waren und danach
unverändert aufgedeckt werden.

  python3 abnahme_pruefsummen.py --schreiben [--freigabe <stichwort>]   (Projektleiter, nach dem Tester)
  python3 abnahme_pruefsummen.py --pruefen                               (macht die Test-Schranke selbst)

Liste: docs/ABNAHME_PRUEFSUMMEN.txt (Nachweis-Bereich, wird mit dem Commit „Plan freigegeben“ bzw. den
Abnahmetests des nächsten Meilensteins versioniert). Die Liste wird nur ergänzt: Neue Abnahmetests (nächster
Meilenstein) kommen ohne Freigabe dazu. Ein einmal versionierter Eintrag ändert sich nie und verschwindet nie –
außer mit Simons Freigabe (Geltung „docs/ABNAHME_PRUEFSUMMEN.txt“); die Änderung wird dann in der Liste vermerkt
(„# freigegeben: <test> <summe> <stichwort>“), damit spätere Schranken sie ohne erneute Freigabe anerkennen.
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


def ist_testdatei(name):
    """Verdeckte Testdateien: alles außer Erklärtexten und Cache (Endung .verdeckt ist üblich, nicht Pflicht)."""
    return not (name.upper().startswith(("README", "LIESMICH")) or name.endswith((".pyc", ".pyo")) or name.startswith("."))


def verdeckte(hauptordner):
    wurzel = os.path.join(hauptordner, VERDECKT)
    aus = {}
    for ordner, unter, dateien in os.walk(wurzel):
        unter[:] = [u for u in unter if u != "__pycache__"]
        for d in sorted(dateien):
            if not ist_testdatei(d):
                continue
            voll = os.path.join(ordner, d)
            rel = os.path.relpath(voll, wurzel).replace("\\", "/")
            if rel.endswith(".verdeckt"):
                rel = rel[:-len(".verdeckt")]
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


VERMERK = "# freigegeben: "


def _parse(text):
    liste, vermerke = {}, set()
    for zeile in (text or "").splitlines():
        if zeile.startswith(VERMERK):
            teile = zeile[len(VERMERK):].split()
            if len(teile) >= 3:
                vermerke.add((teile[0], teile[1], teile[2]))
            continue
        teile = zeile.strip().split("  ", 1)
        if len(teile) == 2 and len(teile[0]) == 64 and not zeile.startswith("#"):
            liste[teile[1].strip()] = teile[0]
    return liste, vermerke


def _git(hauptordner, *args):
    r = subprocess.run(["git", *args], cwd=hauptordner, capture_output=True, text=True, encoding="utf-8",
                       errors="replace")
    return r.stdout if r.returncode == 0 else ""


def historie(hauptordner):
    """-> (erste, letzte): je Eintrag die Prüfsumme aus der ältesten und der neuesten versionierten Fassung."""
    erste, letzte = {}, {}
    for commit in _git(hauptordner, "log", "--reverse", "--format=%H", "--", DATEI.replace("\\", "/")).split():
        liste, _ = _parse(_git(hauptordner, "show", "%s:%s" % (commit, DATEI.replace("\\", "/"))))
        for rel, h in liste.items():
            erste.setdefault(rel, h)
            letzte[rel] = h
    return erste, letzte


def erste_summen(hauptordner):
    """Für jeden Eintrag die Prüfsumme aus der ältesten versionierten Fassung, in der er vorkommt."""
    return historie(hauptordner)[0]


def freigabe_gueltig(hauptordner, stichwort):
    """Steht das Stichwort in .claude/freigaben.md (von Simon eingetragen) mit Geltung für die Prüfsummen-Liste?"""
    try:
        with open(os.path.join(hauptordner, ".claude", "freigaben.md"), encoding="utf-8") as f:
            for zeile in f:
                teile = [t.strip() for t in zeile.strip().strip("|").split("|")]
                if (not zeile.lstrip().startswith("#") and len(teile) >= 4 and teile[1].lower() == stichwort.lower()
                        and "abnahme_pruefsummen" in teile[2].lower()):
                    return True
    except OSError:
        pass
    return False


def liste_pruefen(hauptordner, wurzel=None):
    """-> Fehlertexte, wenn ein versionierter Eintrag geändert oder entfernt wurde (ohne gültigen Vermerk).
    Fehlen darf nur der Eintrag eines schon aufgedeckten Tests (liegt unter tests/abnahme/): Dev-Team-Versionen
    vor 3.13 haben die Liste je Meilenstein neu geschrieben; aufgedeckte Tests schützt danach die Test-Schranke."""
    wurzel = wurzel or hauptordner
    pfad = os.path.join(hauptordner, DATEI)
    if not os.path.isfile(pfad):
        return []
    with open(pfad, encoding="utf-8") as f:
        jetzt, vermerke = _parse(f.read())
    fehler = []
    for rel, h0 in erste_summen(hauptordner).items():
        if rel not in jetzt and not aufgedeckt_finden(wurzel, rel):
            fehler.append("Prüfsummen-Liste: Eintrag %s wurde entfernt – die Liste wird nur ergänzt." % rel)
        elif rel in jetzt and jetzt[rel] != h0 and not any(r == rel and h == jetzt[rel] and freigabe_gueltig(hauptordner, w)
                                          for r, h, w in vermerke):
            fehler.append("Prüfsummen-Liste: Eintrag %s wurde nachträglich geändert – Abnahmetests werden nie "
                          "angepasst (nur mit Simons Freigabe, Geltung docs/ABNAHME_PRUEFSUMMEN.txt)." % rel)
    return fehler


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


def aufgedeckt_mit_summe(wurzel):
    summen = {}
    for ordner, unter, dateien in os.walk(os.path.join(wurzel, "tests", "abnahme")):
        unter[:] = [u for u in unter if u != "__pycache__"]
        for d in dateien:
            if ist_testdatei(d):
                summen.setdefault(summe(os.path.join(ordner, d)), []).append(os.path.join(ordner, d))
    return summen


def pruefen(hauptordner, wurzel=None, vollstaendig=False):
    """-> Liste von Fehlertexten (leer = alles unverändert).
    vollstaendig=True (Meilenstein): jeder festgehaltene Abnahmetest muss unverändert aufgedeckt vorliegen –
    egal unter welchem Namen; umbenannt-und-abgeschwächt oder gelöscht ist rot."""
    wurzel = wurzel or hauptordner
    liste = lies_liste(hauptordner)
    fehler = []
    jetzt = verdeckte(hauptordner)
    aufgedeckt = aufgedeckt_mit_summe(wurzel)
    for rel, soll in liste.items():
        if rel in jetzt and jetzt[rel] != soll:
            fehler.append("Verdeckter Abnahmetest %s wurde nach dem Festhalten geändert." % rel)
        if rel not in jetzt and soll not in aufgedeckt:
            fehler.append("Verdeckter Abnahmetest %s wurde gelöscht und liegt auch nicht aufgedeckt vor." % rel)
        for f in aufgedeckt_finden(wurzel, rel):
            if summe(f) != soll:
                fehler.append("Aufgedeckter Abnahmetest %s weicht von der festgehaltenen Fassung ab."
                              % os.path.relpath(f, wurzel).replace("\\", "/"))
        if vollstaendig and os.path.isdir(os.path.join(wurzel, "tests", "abnahme")) and soll not in aufgedeckt:
            fehler.append("Abnahmetest %s liegt nicht unverändert unter tests/abnahme/ vor (aufgedeckt wird "
                          "immer die festgehaltene Fassung, Inhalt unverändert)." % rel)
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
    pfad = os.path.join(hauptordner, DATEI)
    alt_text = ""
    if os.path.isfile(pfad):
        with open(pfad, encoding="utf-8") as f:
            alt_text = f.read()
    alt, vermerke = _parse(alt_text)
    if not jetzt and not alt:
        print("FEHLER: Keine verdeckten Tests unter %s gefunden. Nichts geschrieben." % VERDECKT)
        sys.exit(1)
    erste = erste_summen(hauptordner)
    neu = dict(alt)
    geaendert = sorted(rel for rel, h in jetzt.items() if rel in alt and alt[rel] != h)
    neu.update(jetzt)
    # Jede Abweichung von der ersten versionierten Fassung braucht einen Vermerk mit gültiger Freigabe.
    ohne_vermerk = sorted(rel for rel, h in neu.items() if rel in erste and erste[rel] != h
                          and not any(r == rel and x == h and freigabe_gueltig(hauptordner, w) for r, x, w in vermerke))
    ohne_vermerk = sorted(set(ohne_vermerk) | set(geaendert))
    if ohne_vermerk:
        stichwort = arg.freigabe.strip()
        if not stichwort or not freigabe_gueltig(hauptordner, stichwort):
            print("FEHLER: Schon festgehaltene Abnahmetests weichen ab (%s). Das braucht Simons Freigabe in "
                  ".claude/freigaben.md (Geltung: docs/ABNAHME_PRUEFSUMMEN.txt), dann --freigabe <stichwort>. "
                  "Neue Abnahmetests (neue Dateien) kommen ohne Freigabe dazu. Nichts geschrieben."
                  % ", ".join(ohne_vermerk))
            sys.exit(1)
        for rel in ohne_vermerk:
            vermerke.add((rel, neu[rel], stichwort))
    dazu = sorted(set(jetzt) - set(alt))
    if neu == alt and not ohne_vermerk:
        print("UNVERÄNDERT: %s (%d Abnahmetests, nichts Neues)." % (DATEI, len(neu)))
        sys.exit(0)
    os.makedirs(os.path.dirname(pfad), exist_ok=True)
    with open(pfad, "w", encoding="utf-8", newline="\n") as f:
        f.write("# Prüfsummen der verdeckten Abnahmetests (sha256, Zeilenenden vereinheitlicht)\n")
        f.write("# Automatisch geschrieben von abnahme_pruefsummen.py – nicht von Hand ändern. Wird nur ergänzt.\n")
        for rel in sorted(neu):
            f.write("%s  %s\n" % (neu[rel], rel))
        for rel, h, w in sorted(vermerke):
            f.write("%s%s %s %s\n" % (VERMERK, rel, h, w))
    jetzt = neu
    if dazu:
        print("NEU: %s" % ", ".join(dazu))
    print("GESCHRIEBEN: %s (%d Abnahmetests). Jetzt committen (mit „Plan freigegeben“ bzw. den Abnahmetests des Meilensteins)." % (DATEI, len(jetzt)))


if __name__ == "__main__":
    main()
