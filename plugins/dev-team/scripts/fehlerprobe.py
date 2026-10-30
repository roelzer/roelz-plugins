#!/usr/bin/env python3
"""Fehlerprobe für Prüfer und Entwickler: Finden die Tests einen absichtlich eingebauten Fehler?

Baut den aktuellen Stand (Arbeitsordner, ohne verdeckte Tests) in einem Temp-Ordner nach, ersetzt in
EINER Datei einen Textabschnitt (z. B. "<=" durch "<") und führt den Testbefehl aus. Das Projekt
selbst bleibt unverändert. So lässt sich belegen, ob eine Stelle durch Tests abgesichert ist – ohne
selbst Code zu schreiben.

  python3 fehlerprobe.py --datei src/x.py --alt "a <= b" --neu "a < b" [--vorkommen 1]
                         [--befehl "npx vitest run tests/x.test.ts"]   # schneller: nur passende Tests

Ablauf: Abhängigkeitsordner (node_modules) werden aus dem Worktree bzw. Hauptordner verknüpft, nicht
kopiert. Zuerst läuft der Testbefehl ohne Ersetzung (Leerlauf, muss grün sein), dann mit Ersetzung.
Rote Tests nur wegen fehlender Module oder Syntaxfehler zählen nicht als Treffer.

Ergebnis (erste Zeile): „ERKANNT“ (Tests rot – gut, Exit 0), „NICHT ERKANNT“ (Tests grün – hier fehlt
ein Test, Exit 1) oder „UNGÜLTIG: …“ / „FEHLER: …“ (keine Aussage möglich, Exit 2).
"""

import argparse
import json
import os
import re
import shutil
import subprocess
import sys
import tempfile

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from worktree_vorbereiten import verknuepfen, trennen, ist_verknuepfung  # noqa: E402

# Ordner, die nicht im Git liegen, aber zum Testen gebraucht werden. Ohne sie scheitert jeder Lauf am
# Import – früher wurde das fälschlich als „ERKANNT“ gemeldet.
ABHAENGIGKEITEN = ("node_modules",)

# Rot aus dem falschen Grund: Modul fehlt, Syntax kaputt, keine Tests gefunden.
LADEFEHLER = re.compile(r"Cannot find module|Failed to resolve|Failed to load|Transform failed|SyntaxError|"
                        r"ModuleNotFoundError|ImportError|No test files found|ERR_MODULE_NOT_FOUND")
# Rot aus dem richtigen Grund: eine Prüfung im Test schlägt fehl.
PRUEFFEHLER = re.compile(r"AssertionError|AssertError|expected .* (to|but)|Expected|FAIL .*(>|›)|FAILED .*::|"
                         r"^FAIL:|assert ", re.MULTILINE)


def laufen(befehl, ordner, umg):
    try:
        if os.name == "nt" and shutil.which("bash"):
            r = subprocess.run([shutil.which("bash"), "-c", befehl], cwd=ordner, capture_output=True, text=True,
                               encoding="utf-8", errors="replace", env=umg, timeout=1800)
        else:
            r = subprocess.run(befehl, shell=True, cwd=ordner, capture_output=True, text=True, encoding="utf-8",
                               errors="replace", env=umg, timeout=1800)
    except subprocess.TimeoutExpired:
        return None, "Zeitgrenze 30 min überschritten"
    return r.returncode, (r.stdout or "") + (r.stderr or "")


def letzte(ausgabe, n=3):
    return ["  " + z[:160] for z in ausgabe.splitlines() if z.strip()][-n:]


def main():
    a = argparse.ArgumentParser()
    a.add_argument("--datei", required=True)
    a.add_argument("--alt", required=True)
    a.add_argument("--neu", required=True)
    a.add_argument("--vorkommen", type=int, default=1, help="welches Vorkommen ersetzen (1 = erstes)")
    a.add_argument("--befehl", help="Testbefehl statt 'testbefehl' aus .claude/dev-team.json (z. B. nur eine Datei)")
    arg = a.parse_args()
    if arg.alt == arg.neu:
        print("FEHLER: --alt und --neu sind gleich.")
        sys.exit(2)
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
    befehl = arg.befehl or (konfig or {}).get("testbefehl")
    if not befehl:
        print("FEHLER: kein Testbefehl in .claude/dev-team.json (oder --befehl angeben).")
        sys.exit(2)
    rel = os.path.relpath(os.path.abspath(os.path.join(wurzel, arg.datei)), wurzel).replace("\\", "/")
    if rel.startswith("../") or rel.startswith(".dev-team/") or rel.startswith(".claude/"):
        print("FEHLER: Datei muss im Projekt liegen (nicht .claude/ oder .dev-team/).")
        sys.exit(2)
    tmp = tempfile.mkdtemp(prefix="fehlerprobe-")
    links = []
    try:
        dateien = subprocess.run(["git", "ls-files", "-co", "--exclude-standard"], cwd=wurzel, capture_output=True,
                                 text=True).stdout.splitlines()
        for d in dateien:
            if d.startswith((".claude/worktrees/", ".dev-team/")) or d.split("/")[0] in ABHAENGIGKEITEN:
                continue
            q = os.path.join(wurzel, d)
            if os.path.isfile(q):
                z = os.path.join(tmp, d)
                os.makedirs(os.path.dirname(z), exist_ok=True)
                shutil.copy2(q, z)
        for name in ABHAENGIGKEITEN:
            for ordner in (wurzel, haupt):
                quelle = os.path.join(ordner, name)
                if os.path.isdir(quelle):
                    ziel = os.path.join(tmp, name)
                    verknuepfen(os.path.realpath(quelle), ziel)
                    links.append(ziel)
                    break
        ziel = os.path.join(tmp, rel)
        if not os.path.isfile(ziel):
            print("FEHLER: Datei %s nicht gefunden (nicht im Git und nicht neu angelegt?)." % rel)
            sys.exit(2)
        with open(ziel, encoding="utf-8", newline="") as f:
            text = f.read()
        teile = text.split(arg.alt)
        if len(teile) <= arg.vorkommen:
            print("FEHLER: '%s' kommt in %s nicht %d-mal vor." % (arg.alt, rel, arg.vorkommen))
            sys.exit(2)
        neu = arg.alt.join(teile[:arg.vorkommen]) + arg.neu + arg.alt.join(teile[arg.vorkommen:])
        zeile = arg.alt.join(teile[:arg.vorkommen]).count("\n") + 1
        stelle = "%s:%d, '%s' → '%s'" % (rel, zeile, arg.alt, arg.neu)
        umg = dict(os.environ, PYTHONDONTWRITEBYTECODE="1")

        code, aus = laufen(befehl, tmp, umg)
        if code != 0:
            print("UNGÜLTIG: Schon ohne eingebauten Fehler sind die Tests rot oder laufen nicht (%s) – keine Aussage "
                  "möglich." % (aus if code is None else "Leerlauf"))
            for z in letzte(aus, 8):
                print(z)
            sys.exit(2)

        with open(ziel, "w", encoding="utf-8", newline="") as f:
            f.write(neu)
        code, aus = laufen(befehl, tmp, umg)
        if code is None:
            print("UNGÜLTIG: Mit dem eingebauten Fehler (%s) hängt der Testlauf (%s)." % (stelle, aus))
            sys.exit(2)
        if code == 0:
            print("NICHT ERKANNT: Mit dem eingebauten Fehler (%s) bleiben alle Tests grün – hier fehlt ein Test."
                  % stelle)
            sys.exit(1)
        if LADEFEHLER.search(aus) and not PRUEFFEHLER.search(aus):
            print("UNGÜLTIG: Mit dem eingebauten Fehler (%s) sind die Tests nur wegen eines Lade- oder Syntaxfehlers "
                  "rot, nicht wegen einer Prüfung. Ersetzung so wählen, dass der Code gültig bleibt." % stelle)
            for z in letzte(aus, 5):
                print(z)
            sys.exit(2)
        print("ERKANNT: Mit dem eingebauten Fehler (%s) sind die Tests rot." % stelle)
        for z in letzte(aus):
            print(z)
        sys.exit(0)
    finally:
        # Verknüpfungen zuerst lösen, damit das Aufräumen nie in den echten node_modules löscht.
        for link in links:
            try:
                if ist_verknuepfung(link):
                    trennen(link)
            except OSError:
                pass
        shutil.rmtree(tmp, ignore_errors=True)


if __name__ == "__main__":
    main()
