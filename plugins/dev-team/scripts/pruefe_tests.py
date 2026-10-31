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
import ast
import shutil
import importlib.util
import json
import os
import re
import subprocess
import sys
from datetime import datetime

HIER = os.path.dirname(os.path.abspath(__file__))
PLUGIN = os.path.dirname(HIER)

_spec = importlib.util.spec_from_file_location("bereiche", os.path.join(HIER, "bereiche.py"))
bereiche = importlib.util.module_from_spec(_spec)
_spec.loader.exec_module(bereiche)

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
    if isinstance(befehl, str) and os.name == "nt" and shutil.which("bash"):
        befehl = [shutil.which("bash"), "-c", befehl]  # Windows: Testbefehle wie in Git Bash, nicht cmd.exe
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


def git_datei_text(wurzel, commit, pfad):
    r = sh(["git", "show", "%s:%s" % (commit, pfad)], wurzel)
    return r.stdout if r.returncode == 0 else None


def datei_text(wurzel, pfad):
    try:
        with open(os.path.join(wurzel, pfad), encoding="utf-8", errors="replace") as f:
            return f.read()
    except OSError:
        return None


MANIFESTE = re.compile(r"(^|/)(package\.json|package-lock\.json|npm-shrinkwrap\.json|yarn\.lock|pnpm-lock\.yaml|"
                       r"bun\.lockb?|requirements[^/]*\.txt|pyproject\.toml|uv\.lock|poetry\.lock|Pipfile(\.lock)?|"
                       r"[^/]+\.(csproj|fsproj|vbproj)|Directory\.Packages\.props|\.npmrc|\.yarnrc(\.yml)?|"
                       r"pip\.conf|pip\.ini|uv\.toml|nuget\.config|Cargo\.toml|go\.mod)$", re.IGNORECASE)


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


LEERE_PRUEFUNG_JS = re.compile(
    r"expect\(\s*(true|1|['\"][^'\"]*['\"])\s*\)\.(toBe|toEqual|toBeTruthy|toStrictEqual)\(\s*(true|1|['\"][^'\"]*['\"])?\s*\)|"
    r"assert(\.ok)?\(\s*true\s*\)|assert\.(strictEqual|equal|deepEqual)\(\s*(\w+|['\"][^'\"]*['\"])\s*,\s*\6\s*\)|"
    r"Assert\.(True|IsTrue)\(\s*true\s*\)")


def _ist_konstant_wahr(knoten):
    try:
        return bool(ast.literal_eval(knoten))
    except (ValueError, TypeError, SyntaxError, MemoryError, RecursionError):
        return False


def _ist_pruefung(knoten):
    if isinstance(knoten, ast.Assert):
        return True
    for k in ast.walk(knoten):
        if isinstance(k, ast.Call):
            f = k.func
            name = f.attr if isinstance(f, ast.Attribute) else (f.id if isinstance(f, ast.Name) else "")
            if name.startswith(("assert", "fail")) or name in ("raises", "approx", "expect"):
                return True
        if isinstance(k, (ast.With, ast.AsyncWith)):
            for item in k.items:
                c = item.context_expr
                if isinstance(c, ast.Call):
                    f = c.func
                    name = f.attr if isinstance(f, ast.Attribute) else (f.id if isinstance(f, ast.Name) else "")
                    if name in ("raises", "assertRaises", "assertRaisesRegex", "warns", "assertWarns"):
                        return True
    return False


def leere_python_tests(inhalt):
    """Findet Testfunktionen, die nichts prüfen können: nur konstant wahre Prüfungen,
    oder ein return/pass vor der ersten Prüfung."""
    try:
        baum = ast.parse(inhalt)
    except (SyntaxError, ValueError):
        return []
    befunde = []
    for k in ast.walk(baum):
        if not isinstance(k, (ast.FunctionDef, ast.AsyncFunctionDef)) or not k.name.startswith("test"):
            continue
        pruefungen, frueh = [], False
        for anweisung in k.body:
            if isinstance(anweisung, ast.Return) and not any(_ist_pruefung(a) for a in pruefungen):
                frueh = True
                break
            if _ist_pruefung(anweisung):
                pruefungen.append(anweisung)
        if frueh:
            befunde.append("%s (return vor der ersten Prüfung)" % k.name)
            continue
        asserts = [a for a in ast.walk(k) if isinstance(a, ast.Assert)]
        aufrufe = [a for a in ast.walk(k) if isinstance(a, ast.Call) and isinstance(a.func, ast.Attribute)
                   and a.func.attr.startswith("assert")]
        alle = len(asserts) + len(aufrufe)
        konstant = sum(1 for a in asserts if _ist_konstant_wahr(a.test))
        konstant += sum(1 for a in aufrufe if a.args and all(_ist_konstant_wahr(x) for x in a.args)
                        and a.func.attr in ("assertTrue", "assertEqual", "assertIs", "assertIsNotNone"))
        if alle and konstant == alle and not any(_ist_pruefung(a) for a in ast.walk(k)
                                                 if isinstance(a, (ast.With, ast.AsyncWith))):
            befunde.append("%s (prüft nur Konstanten, z. B. assert True)" % k.name)
    return befunde


TESTWERKZEUG_NAMEN = {"unittest", "pytest", "TestCase", "nose", "hypothesis", "doctest", "builtins", "sys", "os"}


def _wurzelname(knoten):
    while isinstance(knoten, (ast.Attribute, ast.Subscript, ast.Call)):
        knoten = knoten.value if not isinstance(knoten, ast.Call) else knoten.func
    return knoten.id if isinstance(knoten, ast.Name) else ""


def testwerkzeug_eingriffe(inhalt):
    """Eingriffe in das Testwerkzeug selbst: assert-Methoden überschreiben, AssertionError schlucken,
    Testlauf vorzeitig beenden, Tests per Code abschalten."""
    try:
        baum = ast.parse(inhalt)
    except (SyntaxError, ValueError):
        return []
    befunde = []
    for k in ast.walk(baum):
        if isinstance(k, (ast.Assign, ast.AugAssign, ast.AnnAssign)):
            ziele = k.targets if isinstance(k, ast.Assign) else [k.target]
            for z in ziele:
                if isinstance(z, ast.Attribute) and (z.attr.startswith(("assert", "fail", "skip", "run"))
                                                     or _wurzelname(z) in TESTWERKZEUG_NAMEN):
                    befunde.append("Zuweisung an %s (Testwerkzeug verändert)" % ast.unparse(z)[:60])
        if isinstance(k, ast.Call):
            name = ast.unparse(k.func)[:60] if hasattr(ast, "unparse") else ""
            if name in ("setattr", "delattr") and k.args and (_wurzelname(k.args[0]) in TESTWERKZEUG_NAMEN):
                befunde.append("%s auf das Testwerkzeug" % name)
            if name in ("os._exit", "sys.exit", "exit", "quit", "os.kill", "os.abort"):
                befunde.append("%s im Test (beendet den Testlauf vorzeitig)" % name)
            if name.endswith(("monkeypatch.setattr", "mock.patch", "patch.object")) and k.args and \
                    any(w in ast.unparse(k.args[0]) for w in ("unittest", "pytest", "TestCase", "assert")):
                befunde.append("%s auf das Testwerkzeug" % name)
        if isinstance(k, ast.ExceptHandler):
            typ = ast.unparse(k.type) if k.type is not None else ""
            if k.type is None or any(t in typ for t in ("AssertionError", "BaseException")):
                befunde.append("except %s schluckt fehlgeschlagene Prüfungen" % (typ or "(ohne Typ)"))
            elif "Exception" in typ and any(isinstance(x, ast.Assert) for x in ast.walk(k)) is False:
                pass
    return befunde


TESTWERKZEUG_JS = re.compile(r"\b(expect|assert|it|test|describe)\s*=[^=]|process\.exit\s*\(|"
                             r"catch\s*\(\s*\w*\s*\)\s*\{\s*\}|\.mockImplementation\(\s*\(\)\s*=>\s*\{\s*\}\s*\)")


def testkonfig_teile(pfad, text):
    """Die Teile von pyproject.toml / package.json, die bestimmen, welche Tests laufen."""
    if not text:
        return None
    try:
        if pfad.endswith("pyproject.toml"):
            import tomllib
            d = tomllib.loads(text)
            tool = d.get("tool") or {}
            return json.dumps({k: tool.get(k) for k in ("pytest", "coverage", "unittest", "nose2", "hatch")
                               if tool.get(k) is not None}, sort_keys=True)
        if pfad.endswith("package.json"):
            d = json.loads(text)
            skripte = {k: v for k, v in (d.get("scripts") or {}).items()
                       if re.search(r"test|spec|e2e|check|lint|build|verify|mutat", k)}
            return json.dumps({"scripts": skripte, "jest": d.get("jest"), "vitest": d.get("vitest"),
                               "mocha": d.get("mocha"), "ava": d.get("ava"), "c8": d.get("c8"),
                               "nyc": d.get("nyc")}, sort_keys=True)
    except Exception:
        return "unlesbar"
    return None


def pruefsummen_pruefen(e, hauptordner, wurzel, fg, rolle="projektleiter"):
    spec = importlib.util.spec_from_file_location("abnahme_pruefsummen",
                                                  os.path.join(PLUGIN, "scripts", "abnahme_pruefsummen.py"))
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    liste_pfad = os.path.join(hauptordner, mod.DATEI)
    verdeckt_da = bool(mod.verdeckte(hauptordner))
    if not os.path.isfile(liste_pfad):
        if verdeckt_da and rolle in ("merge", "projektleiter"):
            e.f("Verdeckte Abnahmetests vorhanden, aber keine festgehaltenen Prüfsummen (%s). Erst "
                "abnahme_pruefsummen.py --schreiben und committen." % mod.DATEI)
        return
    # Neue Einträge (nächster Meilenstein) sind erlaubt; früher galt schon das Ergänzen als Abweichung von der
    # ersten Fassung, und jede Schranke brauchte danach eine Freigabe (Pilot).
    veraendert = mod.veraenderte_eintraege(hauptordner, wurzel)
    if veraendert and not fg.deckt("docs/ABNAHME_PRUEFSUMMEN.txt"):
        e.f("Festgehaltene Prüfsummen wurden geändert oder gestrichen (%s) – Abnahmetests werden nie nachträglich "
            "angepasst (nur mit Simons Freigabe)." % ", ".join(veraendert[:5]))
    funde = mod.pruefen(hauptordner, wurzel, vollstaendig=(rolle == "projektleiter"))
    for t in funde:
        (e.w if fg.deckt("docs/ABNAHME_PRUEFSUMMEN.txt") else e.f)(t + (fg.text("docs/ABNAHME_PRUEFSUMMEN.txt") or
                                                                         " Abnahmetests werden nie passend gemacht."))
    if not funde:
        e.o("Abnahmetests stimmen mit den festgehaltenen Prüfsummen überein.")


TESTNAME_JS = re.compile(r"\b(?:it|test|describe|context|specify)(?:\.\w+)*\s*\(\s*(['\"`])(.*?)\1")


def _testnamen(wurzel, hauptordner):
    """Nur Namen von Tests (Funktionen/Klassen test*, Titel von it()/test()) – keine beliebigen Wörter."""
    namen = []
    for basis, unter in ((wurzel, "tests"), (wurzel, "test"), (wurzel, "e2e"), (hauptordner, ".dev-team/verdeckt")):
        for ordner, unterordner, dateien in os.walk(os.path.join(basis, unter)):
            unterordner[:] = [u for u in unterordner if u != "__pycache__"]
            for d in dateien:
                inhalt = datei_text(ordner, d) or ""
                if d.endswith((".py", ".py.verdeckt")):
                    try:
                        baum = ast.parse(inhalt)
                    except (SyntaxError, ValueError):
                        continue
                    for k in ast.walk(baum):
                        if isinstance(k, (ast.FunctionDef, ast.AsyncFunctionDef)) and k.name.lower().startswith("test"):
                            namen.append(k.name)
                            doc = ast.get_docstring(k) or ""
                            namen.append(doc.split("\n")[0])
                        elif isinstance(k, ast.ClassDef) and "test" in k.name.lower():
                            namen.append(k.name)
                else:
                    namen += [m.group(2) for m in TESTNAME_JS.finditer(inhalt)]
    return "\n".join(namen)


def abdeckung_pruefen(e, wurzel, hauptordner, konfig, fg):
    """Jede Anforderung (A1 …) im Lastenheft und bei Fachsoftware jede bestätigte Fachregel (R1 …) braucht
    mindestens einen Test, der die Nummer im Namen oder Kommentar trägt."""
    texte = None
    lh = datei_text(wurzel, "docs/lastenheft.md") or ""
    anf = sorted(set(re.findall(r"^\s*(?:#{1,6}\s*|[-*|]\s*)?\**(A\d+)\**\s*[:.)|\s–-]", lh, re.M)),
                 key=lambda x: int(x[1:]))
    regeln_text = datei_text(wurzel, "fachwissen/regeln.md") or ""
    regeln = []
    if (konfig or {}).get("profil") == "fachsoftware":
        abschnitt = ""
        for zeile in regeln_text.splitlines():
            if zeile.startswith("#"):
                # Nur ein Abschnitt, der mit „Bestätigt“ beginnt, zählt – „Vorgeschlagen (… noch nicht
                # bestätigt)“ enthält das Wort auch und wurde früher fälschlich mitgezählt.
                titel = zeile.lstrip("#").strip().lower()
                abschnitt = titel if re.match(r"(bestätigt|bestaetigt)\b", titel) and "nicht" not in titel else ""
                continue
            m = re.match(r"^\s*\|?\s*([FR]\d+)\s*\|", zeile)
            if not m:
                continue
            spalten = [c.strip().lower() for c in zeile.strip().strip("|").split("|")]
            leer = len([c for c in spalten[1:2] if c]) == 0  # Vorlagenzeile ohne Regeltext
            if not leer and (abschnitt or any(c in ("bestätigt", "bestaetigt") for c in spalten)):
                regeln.append(m.group(1))
    if not anf and not regeln:
        return
    texte = _testnamen(wurzel, hauptordner)
    def vorhanden(nr):
        return re.search(r"(?<![A-Za-z0-9])%s%s(?![0-9])" % (nr[0], nr[1:]), texte, re.I) is not None
    fehlt_a = [a for a in anf if not vorhanden(a)]
    fehlt_r = [r for r in regeln if not vorhanden(r)]
    if fehlt_a:
        (e.w if fg.deckt("abdeckung") else e.f)("Anforderungen ohne Test (Nummer im Testnamen oder Kommentar): %s"
                                                % ", ".join(fehlt_a))
    else:
        e.o("Jede Anforderung (%d) hat mindestens einen Test." % len(anf))
    if fehlt_r:
        (e.w if fg.deckt("abdeckung") else e.f)("Bestätigte Fachregeln ohne automatische Prüfung: %s" % ", ".join(fehlt_r))
    elif regeln:
        e.o("Jede bestätigte Fachregel (%d) hat eine automatische Prüfung." % len(regeln))


def ist_testdatei(bereich):
    return bereich in ("tests", "abnahme", "architektur", "referenz", "testkonfig")


class Freigabe:
    """Eine Freigabe aus .claude/freigaben.md: gilt nur für die genannten Pfade bzw. Prüfungen."""

    def __init__(self, zeile="", geltung=()):
        self.zeile = zeile
        self.geltung = [g for g in geltung if g]

    def deckt(self, ziel):
        if not self.zeile:
            return False
        z = bereiche.norm(ziel)
        return any(g.lower() == z.lower() or bereiche.passt(z, [g]) for g in self.geltung)

    def text(self, ziel):
        return " – Freigabe: " + self.zeile if self.deckt(ziel) else ""


def pruefe_diff(e, wurzel, basis, rolle, team, fg):
    """fg: Freigabe (gilt nur für ihre Pfade/Prüfungen). Rolle 'merge' = Entwickler-Regeln
    für den zusammengeführten Stand im Hauptordner, ohne die Unterlagen des Projektleiters."""
    entwicklerregeln = rolle in ("entwickler", "merge")
    liste = aenderungen(wurzel, basis)
    if not liste:
        e.o("Keine Dateiänderungen gegenüber %s." % basis[:10])
    for status, pfad in liste:
        p = bereiche.norm(pfad)
        bereich = bereiche.bereich_von(p, team)
        if p.startswith(".dev-team/"):
            continue
        if bereich in ("nachweis",) or (rolle == "merge" and bereich == "prozess"):
            continue
        if bereich == "referenz" and status in "MD":
            (e.w if fg.deckt(p) else e.f)("Referenzfall %s %s%s" % (
                p, "geändert" if status == "M" else "gelöscht",
                fg.text(p) or " (nur mit Simons Freigabe für genau diesen Pfad)"))
        if ist_testdatei(bereich) and status == "D" and bereich != "referenz":
            (e.w if fg.deckt(p) else e.f)("Testdatei gelöscht: %s%s" % (p, fg.text(p)))
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
        if ist_testdatei(bereich) and status in "AM" and bereich != "referenz":
            try:
                with open(os.path.join(wurzel, p), encoding="utf-8", errors="replace") as f:
                    inhalt = f.read()
            except OSError:
                inhalt = ""
            if p.endswith(".py"):
                for b in leere_python_tests(inhalt):
                    e.f("Test ohne echte Prüfung in %s: %s" % (p, b))
                for b in testwerkzeug_eingriffe(inhalt):
                    e.f("Eingriff in das Testwerkzeug in %s: %s" % (p, b))
            elif re.search(r"\.(m?[jt]sx?|cjs)$", p):
                for zeile in neue_zeilen(wurzel, basis, p):
                    if TESTWERKZEUG_JS.search(zeile):
                        e.f("Eingriff in das Testwerkzeug in %s: %s" % (p, zeile.strip()[:120]))
            for zeile in neue_zeilen(wurzel, basis, p):
                if LEERE_PRUEFUNG_JS.search(zeile):
                    e.f("Prüfung, die immer stimmt, in %s: %s" % (p, zeile.strip()[:120]))
        if bereich == "teamkonfig" and status in "AMD":
            (e.w if fg.deckt(".claude/dev-team.json") else e.f)(
                "Dev-Team-Einstellungen (.claude/dev-team.json) geändert%s." % (
                    fg.text(".claude/dev-team.json") or
                    " – Testbefehl und Prüfregeln dürfen sich nur mit Simons Freigabe ändern"))
        if TESTKONFIG.search(p) and status in "AMD":
            e.w("Testkonfiguration geändert (%s): Reviewer prüft, dass keine Tests ausgeschlossen werden." % p)
        if entwicklerregeln and status in "AM" and (p.endswith("pyproject.toml") or p.endswith("package.json")):
            vorher = testkonfig_teile(p, git_datei_text(wurzel, basis, p))
            jetzt = testkonfig_teile(p, datei_text(wurzel, p))
            if status == "M" and vorher != jetzt and not fg.deckt(p):
                e.f("Testeinstellungen in %s geändert (Testauswahl, Testskripte). Das darf nur der Tester." % p)
            elif status == "A" and jetzt and re.search(r"deselect|ignore|addopts|testpaths|-k |testPathIgnore|"
                                                        r"exclude|--grep|only|skip", jetzt):
                e.w("Neue %s mit Testauswahl-Einstellungen: Reviewer prüft, dass keine Tests ausgeschlossen werden." % p)
        if entwicklerregeln and bereich == "testkonfig" and status in "AMD":
            e.f("Testkonfiguration %s %s (Testkonfiguration legt und ändert nur der Tester an)." % (
                p, {"A": "angelegt", "M": "geändert"}.get(status, "gelöscht")))
        if entwicklerregeln:
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
    """Freigaben zählen nur, wenn Simon sie von Hand in .claude/freigaben.md eingetragen hat.
    Zeilenformat: Datum | Stichwort | Geltung (Pfade/Muster oder testzahl, uebersprungen, durch Komma) | Grund
    Das Stichwort muss genau der zweiten Spalte entsprechen."""
    datei = os.path.join(hauptordner, ".claude", "freigaben.md")
    try:
        with open(datei, encoding="utf-8") as f:
            zeilen = [z.strip() for z in f if z.strip() and not z.lstrip().startswith("#")]
    except OSError:
        zeilen = []
    for z in zeilen:
        teile = [t.strip() for t in z.strip("|").split("|")]
        if len(teile) >= 2 and teile[1].lower() == stichwort.strip().lower():
            if len(teile) < 4 or not teile[2]:
                e.f("Freigabe '%s' hat keine Geltung (Spalte 3: welche Pfade oder Prüfungen)." % stichwort)
                return Freigabe()
            geltung = [g.strip() for g in teile[2].split(",")]
            e.w("Freigabe verwendet: %s (gilt für: %s)" % (z, ", ".join(geltung)))
            return Freigabe(z, geltung)
    e.f("Freigabe '%s' steht nicht in .claude/freigaben.md. Freigaben trägt nur Simon von Hand ein "
        "(Datum | Stichwort | Geltung | Grund)." % stichwort)
    return Freigabe()


def letzter_lauf_pfad(hauptordner):
    return os.path.join(hauptordner, ".dev-team", "letzter-gruener-lauf.json")


def lauf(e, wurzel, hauptordner, konfig, ist_worktree, fg, rolle):
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
                    gemerkt = json.load(f)
                vorher = gemerkt.get("bestanden")
                # Nur gegen einen Vorgänger des geprüften Stands vergleichen. Ein paralleles Paket, das auf einem
                # älteren Stand gestartet ist, hat die Tests des inzwischen gemergten Nachbarn noch nicht – das
                # ist kein Testverlust (im Pilot blockierte so M3-1 das Paket M3-2).
                stand = str(gemerkt.get("commit") or "")
                if stand and sh(["git", "merge-base", "--is-ancestor", stand, "HEAD"], wurzel).returncode != 0:
                    vorher = None
                if vorher is not None and zahl < vorher:
                    (e.w if fg.deckt("testzahl") else e.f)(
                        "Weniger bestandene Tests als beim letzten grünen Lauf (%d statt %d)%s." % (
                            zahl, vorher, fg.text("testzahl")))
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
        (e.w if fg.deckt("uebersprungen") else e.f)("Der Testlauf meldet %d übersprungene/offene Tests%s." % (
            uebersprungen, fg.text("uebersprungen") or " (übersprungene Tests sind nicht grün)"))
    befehle = list((konfig or {}).get("zusatzbefehle", []))
    if rolle == "projektleiter":
        befehle += list((konfig or {}).get("meilensteinbefehle", []))
    for zusatz in befehle:
        zusatz = str(zusatz).replace("${DEV_TEAM_PLUGIN}", PLUGIN).replace("$DEV_TEAM_PLUGIN", PLUGIN)
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
                   choices=["entwickler", "merge", "tester", "reviewer", "projektleiter", "architekt"])
    a.add_argument("--ohne-lauf", action="store_true")
    a.add_argument("--freigabe", action="append", default=[],
                   help="Stichwort aus .claude/freigaben.md; mehrere: wiederholen oder mit Komma trennen")
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
    fg = Freigabe()
    # Mehrere Freigaben eines Meilensteins zusammen (früher nur ein Stichwort je Lauf, Pilot M5).
    stichworte = [w.strip() for f in arg.freigabe for w in f.split(",") if w.strip()]
    if stichworte:
        einzeln = [pruefe_freigabe(e, hauptordner, w) for w in stichworte]
        gueltig = [f for f in einzeln if f.zeile]
        if gueltig:
            fg = Freigabe(" + ".join(f.zeile for f in gueltig), [g for f in gueltig for g in f.geltung])
    freigabe = fg.zeile
    if ist_worktree and arg.rolle == "entwickler":
        haupt_kopf = git(hauptordner, "rev-parse", "HEAD").strip()
        abzweig = sh(["git", "merge-base", "HEAD", haupt_kopf], wurzel).stdout.strip()
        if abzweig and basis != abzweig:
            e.f("Basis %s ist nicht der Abzweigpunkt dieses Pakets (%s). Die Schranke prüft immer das "
                "ganze Paket ab dem Abzweigpunkt." % (basis[:10], abzweig[:10]))
    if konfig is None:
        e.f("Keine .claude/dev-team.json gefunden (Projekt nicht im Dev-Team aufgenommen).")

    liste = pruefe_diff(e, wurzel, basis, arg.rolle, team, fg)
    if any(MANIFESTE.search(bereiche.norm(p)) for _, p in liste or []):
        abh = sh([sys.executable, "-X", "utf8", os.path.join(PLUGIN, "scripts", "pruefe_abhaengigkeiten.py"),
                  "--basis", basis], wurzel)
        letzte = "\n".join(((abh.stdout or "") + (abh.stderr or "")).strip().splitlines()[-12:])
        if abh.returncode != 0:
            e.f("Abhängigkeits-Schranke (automatisch, weil Manifest/Lockfile geändert):\n%s" % letzte)
        else:
            e.o("Abhängigkeits-Schranke grün (automatisch).")
    if basis == git(wurzel, "rev-parse", "HEAD").strip() and arg.rolle in ("projektleiter", "merge", "reviewer"):
        e.w("Basis = aktueller Stand: Es werden keine Änderungen geprüft, nur der Testlauf.")
    if (konfig or {}).get("profil") == "fachsoftware" and arg.rolle == "projektleiter" and not any(
            re.search(r"(^|[\s/\\])(mutationstest\.py|mutmut|stryker|cosmic-ray|pitest|mutpy)(\s|$)", str(z), re.I)
            for z in list((konfig or {}).get("zusatzbefehle") or []) + list((konfig or {}).get("meilensteinbefehle") or [])):
        (e.w if fg.deckt("mutation") else e.f)(
            "Profil fachsoftware ohne Mutationstest in 'meilensteinbefehle': Die Testqualität des Berechnungskerns "
            "wird nicht gemessen. Eintragen (z. B. python3 ${DEV_TEAM_PLUGIN}/scripts/mutationstest.py --dateien "
            "<Kern> --schwelle 70) – über scripts/geschuetzt_schreiben.py mit Simons Freigabe.%s" % fg.text("mutation"))
    if arg.rolle == "merge":
        eltern = git(wurzel, "rev-list", "--parents", "-n", "1", "HEAD").split()
        if len(eltern) < 3:
            e.f("HEAD ist kein Merge-Commit. Zusammenführen nur mit 'git merge --no-ff', sonst prüft --basis HEAD^1 "
                "nur den letzten Commit des Pakets.")
    pruefsummen_pruefen(e, hauptordner, wurzel, fg, arg.rolle)
    if arg.rolle == "projektleiter":
        abdeckung_pruefen(e, wurzel, hauptordner, konfig, fg)
    wt_ordner = os.path.join(wurzel, ".claude", "worktrees")
    if not ist_worktree and os.path.isdir(wt_ordner) and os.listdir(wt_ordner):
        e.w("Im Hauptordner liegen Entwickler-Worktrees (.claude/worktrees/). Der Testbefehl darf sie "
            "nicht mit erfassen, sonst laufen fremde oder doppelte Tests (z. B. Testpfad auf tests/ begrenzen).")
    zahl = None
    if arg.ohne_lauf:
        e.w("Tests wurden in diesem Aufruf NICHT ausgeführt (--ohne-lauf) – kein Grün-Nachweis.")
    else:
        zahl = lauf(e, wurzel, hauptordner, konfig, ist_worktree, fg, arg.rolle)

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

    if gruen and not ist_worktree:
        # Grün-Nachweis für den Stand im Hauptordner (z. B. nach einem Merge). Der nächste Entwickler-Worktree
        # startet genau hier und spart sich dann den vollen Ausgangslauf (worktree_vorbereiten.py). Nur wenn
        # außer Prozessdateien unter docs/ nichts uncommittet ist – sonst wurde nicht der Commit geprüft.
        offen = [z[3:] for z in git(wurzel, "status", "--porcelain").splitlines() if z.strip()]
        if all(o.startswith("docs/") for o in offen):
            try:
                ordner = os.path.join(hauptordner, ".dev-team", "gruen")
                os.makedirs(ordner, exist_ok=True)
                voll = git(wurzel, "rev-parse", "HEAD").strip()
                with open(os.path.join(ordner, voll), "w", encoding="utf-8") as f:
                    f.write("%s rolle=%s bestanden=%s\n" % (datetime.now().isoformat(timespec="minutes"), arg.rolle,
                                                            zahl if zahl is not None else "?"))
            except OSError:
                pass

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
