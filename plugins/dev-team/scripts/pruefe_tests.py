#!/usr/bin/env python3
"""Test-Schranke des Dev-Teams: „Alle Tests grün“ mechanisch nachweisen.

Prüft gegen einen Basis-Commit:
  1. Kein Test wurde übersprungen oder exklusiv gestellt (skip/only/xit/...) – in neu
     hinzugefügten Zeilen von Testdateien.
  2. Keine Referenzfälle geändert oder gelöscht (ohne ausdrückliche Freigabe).
  3. Keine Testdateien gelöscht (ohne Freigabe).
  4. Rolle entwickler: keine bestehenden Tests, Architekturtests, Abnahmetests,
     Fachregeln, Lastenheft oder Projektunterlagen geändert.
  5. Rolle tester: kein Programmcode geändert.
  6. Testbefehl aus .claude/dev-team.json läuft mit Exit 0, es wurden Tests gefunden,
     und (falls ein Zählmuster hinterlegt ist) sind es nicht weniger als beim letzten
     grünen Lauf.
  7. Zusatzbefehle (Lint, Build, Architekturtests …) laufen mit Exit 0.

Aufruf (im Projekt- oder Worktree-Ordner):
  python3 pruefe_tests.py --basis <commit> [--rolle entwickler|tester|reviewer|projektleiter]
                          [--ohne-lauf] [--freigabe "Grund, von Simon bestätigt"]
Exit 0 = OK, Exit 1 = mindestens ein FEHLER. Ändert keine Projektdateien (außer dem
Nachweis docs/TESTNACHWEIS.md und .dev-team/letzter-gruener-lauf.json im Hauptordner).
"""

import argparse
import importlib.util
import json
import os
import re
import subprocess
import sys
from datetime import datetime

HIER = os.path.dirname(os.path.abspath(__file__))
PLUGIN = os.path.dirname(HIER)

_spec = importlib.util.spec_from_file_location("waechter", os.path.join(HIER, "waechter.py"))
waechter = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(waechter)

SKIP_MUSTER = [
    # JavaScript/TypeScript (Jest, Vitest, Mocha, Playwright, node:test) inkl. Ketten wie it.skip.each
    r"\b(?:it|test|describe|context|suite|bench|specify)(?:\.\w+)*\.(?:skip|only|todo|fixme|skipIf|runIf|failing)\b",
    r"\b(?:xit|xdescribe|xtest|xcontext|xspecify|fit|fdescribe)\s*\(",
    r"\{\s*(?:skip|todo|only)\s*:\s*(?:true|['\"])",          # node:test Optionen
    # Python
    r"@pytest\.mark\.(?:skip|skipif|xfail)\b", r"\bpytest\.(?:skip|xfail|importorskip)\s*\(",
    r"@unittest\.(?:skip|skipIf|skipUnless|expectedFailure)\b", r"\bself\.skipTest\s*\(",
    r"\braise\s+(?:unittest\.)?SkipTest\b", r"\b__test__\s*=\s*False",
    r"from\s+(?:unittest|pytest)(?:\.\w+)*\s+import[^\n]*\b(?:skip\w*|xfail|SkipTest|expectedFailure)\b",
    # .NET, Java, Go
    r"\[(?:Ignore|Skip)\b", r"Skip\s*=\s*\"", r"@(?:Disabled|Ignore)\b", r"\bt\.Skip(?:Now|f)?\s*\(",
]
PRUEF_WORTE = re.compile(
    r"\bassert|\bexpect\s*\(|\.should\b|\bAssert\.|assertThat|\bt\.(?:Error|Fatal|Fail)|\brequire\.|"
    r"\bcheck\s*\(|toBe|toEqual|toThrow|\braises\s*\(", re.IGNORECASE)
TEST_FUNKTION = re.compile(r"\bdef\s+test_|\b(?:it|test)\s*\(|\[(?:Test|Fact|TestMethod)\]|@Test\b|func\s+Test")
UEBERSPRUNGEN_STANDARD = [r"(\d+)\s+skipped", r"#\s*skipped\s+(\d+)", r"skipped[=:]\s*(\d+)",
                          r"(\d+)\s+(?:todo|pending)\b", r"#\s*todo\s+(\d+)", r"(\d+)\s+xfailed"]
TESTKONFIG = re.compile(
    r"(^|/)(vitest|jest|playwright|karma|cypress|mocha|ava)\.config\.[a-z]+$|(^|/)\.mocharc|"
    r"(^|/)(pytest\.ini|tox\.ini|setup\.cfg|conftest\.py|pyproject\.toml|package\.json|\.github/workflows/.*)$",
    re.IGNORECASE)


def sh(befehl, cwd, check=False):
    r = subprocess.run(befehl, cwd=cwd, shell=isinstance(befehl, str), capture_output=True,
                       text=True, encoding="utf-8", errors="replace")
    if check and r.returncode != 0:
        raise RuntimeError("%s: %s" % (befehl, r.stderr.strip()))
    return r


def git(cwd, *args):
    return sh(["git", *args], cwd, check=True).stdout


class Ergebnis:
    def __init__(self):
        self.fehler, self.warnungen, self.ok = [], [], []

    def f(self, t): self.fehler.append(t)
    def w(self, t): self.warnungen.append(t)
    def o(self, t): self.ok.append(t)


def lade_team():
    with open(os.path.join(PLUGIN, "team.json"), encoding="utf-8") as f:
        return json.load(f)


def lade_konfig(wurzel, hauptordner):
    for ordner in (wurzel, hauptordner):
        pfad = os.path.join(ordner, ".claude", "dev-team.json")
        if os.path.isfile(pfad):
            with open(pfad, encoding="utf-8") as f:
                return json.load(f), pfad
    return None, None


def aenderungen(wurzel, basis):
    """Liste (status, pfad) gegenüber basis inkl. nicht committeter und neuer Dateien."""
    liste = []
    for zeile in git(wurzel, "diff", "--name-status", "--no-renames", basis).splitlines():
        teile = zeile.split("\t")
        if len(teile) >= 2:
            liste.append((teile[0][0], teile[-1]))
    for pfad in git(wurzel, "ls-files", "--others", "--exclude-standard").splitlines():
        if pfad.strip():
            liste.append(("A", pfad.strip()))
    return liste


def neue_zeilen(wurzel, basis, pfad):
    if not os.path.exists(os.path.join(wurzel, pfad)):
        return []
    r = sh(["git", "diff", "--no-color", "-U0", basis, "--", pfad], wurzel)
    zeilen = [z[1:] for z in r.stdout.splitlines() if z.startswith("+") and not z.startswith("+++")]
    if not zeilen:  # unversionierte neue Datei
        status = sh(["git", "ls-files", "--error-unmatch", pfad], wurzel)
        if status.returncode != 0:
            with open(os.path.join(wurzel, pfad), encoding="utf-8", errors="replace") as f:
                zeilen = f.read().splitlines()
    return zeilen


def ist_testdatei(bereich):
    return bereich in ("tests", "abnahme", "architektur", "referenz")


def pruefe_diff(e, wurzel, basis, rolle, team, freigabe):
    """freigabe: geprüfter Freigabetext oder ''."""
    liste = aenderungen(wurzel, basis)
    if not liste:
        e.o("Keine Dateiänderungen gegenüber %s." % basis[:10])
    for status, pfad in liste:
        p = waechter.norm(pfad)
        bereich = waechter.bereich_von(p, team)
        if p.startswith(".dev-team/"):
            continue
        if bereich == "referenz" and status in "MD":
            (e.w if freigabe else e.f)("Referenzfall %s %s%s" % (
                p, "geändert" if status == "M" else "gelöscht",
                " – Freigabe: " + freigabe if freigabe else " (nur mit Simons Freigabe, --freigabe)"))
        if ist_testdatei(bereich) and status == "D" and bereich != "referenz":
            (e.w if freigabe else e.f)("Testdatei gelöscht: %s%s" % (
                p, " – Freigabe: " + freigabe if freigabe else ""))
        if ist_testdatei(bereich) and status in "AM":
            for zeile in neue_zeilen(wurzel, basis, p):
                for muster in SKIP_MUSTER:
                    if re.search(muster, zeile):
                        e.f("Test übersprungen/exklusiv in %s: %s" % (p, zeile.strip()[:120]))
                        break
        if ist_testdatei(bereich) and status == "A" and bereich != "referenz":
            pfad_abs = os.path.join(wurzel, p)
            try:
                with open(pfad_abs, encoding="utf-8", errors="replace") as f:
                    inhalt = f.read()
            except OSError:
                inhalt = ""
            if TEST_FUNKTION.search(inhalt) and not PRUEF_WORTE.search(inhalt):
                e.f("Neue Testdatei ohne eine einzige Prüfung (assert/expect …): %s" % p)
        if bereich == "teamkonfig" and status in "AMD":
            (e.w if freigabe else e.f)("Dev-Team-Einstellungen (.claude/dev-team.json) geändert%s." % (
                " – Freigabe: " + freigabe if freigabe else
                " – Testbefehl und Prüfregeln dürfen sich nur mit Simons Freigabe ändern (--freigabe)"))
        if TESTKONFIG.search(p) and status in "AMD":
            e.w("Testkonfiguration geändert (%s): Reviewer prüft, dass keine Tests ausgeschlossen werden." % p)
        if rolle == "entwickler":
            if ist_testdatei(bereich) and status in "MD":
                e.f("Entwickler hat bestehende Testdatei %s %s." % (p, "geändert" if status == "M" else "gelöscht"))
            if bereich in ("architektur", "abnahme", "referenz") and status == "A":
                e.f("Entwickler hat %s angelegt (Bereich %s gehört ihm nicht)." % (p, bereich))
            if bereich in ("regeln", "lastenheft", "prozess", "konfig", "gesperrt"):
                e.f("Entwickler hat %s geändert (Bereich %s gehört ihm nicht)." % (p, bereich))
        if rolle == "tester" and bereich == "code":
            e.f("Tester hat Programmcode geändert: %s" % p)
    return liste


def pruefe_freigabe(e, hauptordner, stichwort):
    """Eine Freigabe zählt nur, wenn Simon sie von Hand in .claude/freigaben.md eingetragen hat."""
    datei = os.path.join(hauptordner, ".claude", "freigaben.md")
    try:
        with open(datei, encoding="utf-8") as f:
            zeilen = [z.strip() for z in f if z.strip() and not z.lstrip().startswith("#")]
    except OSError:
        zeilen = []
    for z in zeilen:
        if stichwort.strip() and stichwort.strip().lower() in z.lower():
            e.w("Freigabe verwendet: %s" % z)
            return z
    e.f("Freigabe '%s' steht nicht in .claude/freigaben.md. Freigaben trägt nur Simon von Hand ein "
        "(eine Zeile: Datum | Stichwort | Grund)." % stichwort)
    return ""


def letzter_lauf_pfad(hauptordner):
    return os.path.join(hauptordner, ".dev-team", "letzter-gruener-lauf.json")


def lauf(e, wurzel, hauptordner, konfig, ist_worktree, freigabe, rolle):
    befehl = (konfig or {}).get("testbefehl")
    if not befehl:
        e.f("Kein Testbefehl in .claude/dev-team.json (Feld 'testbefehl'). Ohne Tests ist nichts grün.")
        return None
    print("→ Testbefehl: %s" % befehl, flush=True)
    r = sh(befehl, wurzel)
    ausgabe = (r.stdout or "") + "\n" + (r.stderr or "")
    ende = "\n".join(ausgabe.strip().splitlines()[-15:])
    if r.returncode != 0:
        e.f("Testbefehl fehlgeschlagen (Exit %d). Letzte Zeilen:\n%s" % (r.returncode, ende))
    else:
        e.o("Testbefehl grün (Exit 0).")
    zahl = None
    muster = (konfig or {}).get("testzahl_muster")
    if muster:
        treffer = re.findall(muster, ausgabe)
        if treffer:
            letzter = treffer[-1]
            zahl = int(letzter[0] if isinstance(letzter, tuple) else letzter)
            e.o("Bestandene Tests: %d" % zahl)
            if zahl == 0:
                e.f("Es wurden 0 Tests ausgeführt. Ein leerer Testlauf ist nicht grün.")
            try:
                with open(letzter_lauf_pfad(hauptordner), encoding="utf-8") as f:
                    vorher = json.load(f).get("bestanden")
                if vorher is not None and zahl < vorher:
                    (e.w if freigabe else e.f)(
                        "Weniger bestandene Tests als beim letzten grünen Lauf (%d statt %d)%s." % (
                            zahl, vorher, " – Freigabe: " + freigabe if freigabe else ""))
            except (OSError, ValueError):
                pass
        else:
            e.f("Zählmuster '%s' passt nicht auf die Testausgabe – Anzahl unbekannt." % muster)
    else:
        e.w("Kein 'testzahl_muster' in .claude/dev-team.json: Es wird nicht geprüft, ob Tests verschwunden sind.")
    uebersprungen = 0
    for m in [(konfig or {}).get("uebersprungen_muster")] + UEBERSPRUNGEN_STANDARD:
        if not m:
            continue
        for wert in re.findall(m, ausgabe, re.IGNORECASE):
            try:
                uebersprungen = max(uebersprungen, int(wert[0] if isinstance(wert, tuple) else wert))
            except ValueError:
                pass
    if uebersprungen:
        (e.w if freigabe else e.f)("Der Testlauf meldet %d übersprungene/offene Tests%s." % (
            uebersprungen, " – Freigabe: " + freigabe if freigabe else " (übersprungene Tests sind nicht grün)"))
    for zusatz in (konfig or {}).get("zusatzbefehle", []):
        print("→ Zusatzbefehl: %s" % zusatz, flush=True)
        z = sh(zusatz, wurzel)
        if z.returncode != 0:
            letzte = "\n".join(((z.stdout or "") + (z.stderr or "")).strip().splitlines()[-10:])
            e.f("Zusatzbefehl '%s' fehlgeschlagen (Exit %d):\n%s" % (zusatz, z.returncode, letzte))
        else:
            e.o("Zusatzbefehl '%s' grün." % zusatz)
    return zahl


def main():
    a = argparse.ArgumentParser()
    a.add_argument("--basis", required=True)
    a.add_argument("--rolle", default="projektleiter",
                   choices=["entwickler", "tester", "reviewer", "projektleiter", "architekt"])
    a.add_argument("--ohne-lauf", action="store_true")
    a.add_argument("--freigabe", default="")
    arg = a.parse_args()

    e = Ergebnis()
    try:
        wurzel = git(os.getcwd(), "rev-parse", "--show-toplevel").strip()
        gemeinsam = git(wurzel, "rev-parse", "--path-format=absolute", "--git-common-dir").strip()
        eigen = git(wurzel, "rev-parse", "--path-format=absolute", "--git-dir").strip()
        hauptordner = os.path.dirname(gemeinsam.rstrip("/\\"))
        ist_worktree = os.path.normcase(gemeinsam) != os.path.normcase(eigen)
        basis = git(wurzel, "rev-parse", "--verify", arg.basis + "^{commit}").strip()
    except RuntimeError as fehler:
        print("FEHLER: Git-Prüfung nicht möglich: %s" % fehler)
        sys.exit(1)

    team = lade_team()
    konfig, _ = lade_konfig(wurzel, hauptordner)
    freigabe = ""
    if arg.freigabe:
        freigabe = pruefe_freigabe(e, hauptordner, arg.freigabe)
    if konfig is None:
        e.f("Keine .claude/dev-team.json gefunden (Projekt nicht im Dev-Team aufgenommen).")

    pruefe_diff(e, wurzel, basis, arg.rolle, team, freigabe)
    wt_ordner = os.path.join(wurzel, ".claude", "worktrees")
    if not ist_worktree and os.path.isdir(wt_ordner) and os.listdir(wt_ordner):
        e.w("Im Hauptordner liegen Entwickler-Worktrees (.claude/worktrees/). Der Testbefehl darf sie "
            "nicht mit erfassen, sonst laufen fremde oder doppelte Tests (z. B. Testpfad auf tests/ begrenzen).")
    zahl = None
    if arg.ohne_lauf:
        e.w("Tests wurden in diesem Aufruf NICHT ausgeführt (--ohne-lauf) – kein Grün-Nachweis.")
    else:
        zahl = lauf(e, wurzel, hauptordner, konfig, ist_worktree, freigabe, arg.rolle)

    commit = git(wurzel, "rev-parse", "--short", "HEAD").strip()
    for t in e.ok:
        print("OK:      " + t)
    for t in e.warnungen:
        print("WARNUNG: " + t)
    for t in e.fehler:
        print("FEHLER:  " + t)
    gruen = not e.fehler and not arg.ohne_lauf
    print("\nERGEBNIS: %s (Rolle %s, Basis %s, Stand %s%s)" % (
        "OK – alles grün" if gruen else ("OK – Diff-Prüfung ohne Testlauf" if not e.fehler else "NICHT OK"),
        arg.rolle, basis[:10], commit, ", Worktree" if ist_worktree else ""))

    if gruen and ist_worktree and arg.rolle == "entwickler":
        sauber = not git(wurzel, "status", "--porcelain").strip()
        if sauber:
            try:
                ordner = os.path.join(hauptordner, ".dev-team", "schranke-ok")
                os.makedirs(ordner, exist_ok=True)
                voll = git(wurzel, "rev-parse", "HEAD").strip()
                with open(os.path.join(ordner, voll), "w", encoding="utf-8") as f:
                    f.write("%s basis=%s\n" % (datetime.now().isoformat(timespec="minutes"), basis))
                print("Nachweis für Commit %s hinterlegt." % voll[:10])
            except OSError:
                pass
        else:
            print("Hinweis: Worktree hat nicht committete Änderungen – erst committen, dann Schranke erneut, "
                  "sonst gilt das Paket nicht als fertig.")

    if not ist_worktree and not arg.ohne_lauf:
        try:
            docs = os.path.join(hauptordner, "docs")
            if os.path.isdir(docs):
                nachweis = os.path.join(docs, "TESTNACHWEIS.md")
                neu = not os.path.exists(nachweis)
                with open(nachweis, "a", encoding="utf-8") as f:
                    if neu:
                        f.write("# Testnachweis\n\nAutomatisch von der Test-Schranke geschrieben.\n\n"
                                "| Zeit | Stand | Rolle | Ergebnis | bestanden | Fehler | Freigabe |\n|---|---|---|---|---|---|---|\n")
                    f.write("| %s | %s | %s | %s | %s | %d | %s |\n" % (
                        datetime.now().strftime("%Y-%m-%d %H:%M"), commit, arg.rolle,
                        "🟢" if gruen else "🔴", zahl if zahl is not None else "?", len(e.fehler),
                        freigabe.replace("|", "/")[:80] if freigabe else "–"))
            if gruen and zahl is not None:
                os.makedirs(os.path.dirname(letzter_lauf_pfad(hauptordner)), exist_ok=True)
                with open(letzter_lauf_pfad(hauptordner), "w", encoding="utf-8") as f:
                    json.dump({"bestanden": zahl, "commit": commit,
                               "zeit": datetime.now().isoformat(timespec="minutes")}, f)
        except OSError:
            pass
    sys.exit(1 if e.fehler else 0)


if __name__ == "__main__":
    main()
