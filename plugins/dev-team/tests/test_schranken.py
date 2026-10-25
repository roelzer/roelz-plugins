"""Tests für die Test-Schranke (pruefe_tests.py) und die Abhängigkeits-Schranke
(pruefe_abhaengigkeiten.py). Ausführen:
    python3 -m unittest discover -s plugins/dev-team/tests -v
"""

import contextlib
import importlib.util
import io
import json
import os
import shutil
import subprocess
import sys
import tempfile
import unittest
import urllib.error
from unittest import mock

PLUGIN = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
TESTS_SKRIPT = os.path.join(PLUGIN, "scripts", "pruefe-tests.sh")
ABH_PY = os.path.join(PLUGIN, "scripts", "pruefe_abhaengigkeiten.py")


def git(cwd, *args):
    return subprocess.run(["git", "-c", "user.email=t@t", "-c", "user.name=t", *args], cwd=cwd,
                          check=True, capture_output=True, text=True).stdout


TEST_GRUEN = """import unittest
from src.rechnung import summe

class T(unittest.TestCase):
    def test_summe(self):
        self.assertEqual(summe([1, 2]), 3)
    def test_leer(self):
        self.assertEqual(summe([]), 0)
"""


class TestSchranke(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.mkdtemp(prefix="schranke-")
        self.p = os.path.join(self.tmp, "projekt")
        for d in ("src", "tests/referenz", "docs", ".claude", "fachwissen"):
            os.makedirs(os.path.join(self.p, d))
        self.schreibe("src/__init__.py", "")
        self.schreibe("src/rechnung.py", "def summe(w):\n    return sum(w)\n")
        self.schreibe("tests/__init__.py", "")
        self.schreibe("tests/test_rechnung.py", TEST_GRUEN)
        self.schreibe("tests/referenz/fall1.json", '{"ein": [1,2], "aus": 3}')
        self.schreibe("fachwissen/regeln.md", "# Regeln\n")
        self.schreibe(".gitignore", ".dev-team/\n")
        self.konfig({"testbefehl": "%s -m unittest discover -s tests -t . -v" % sys.executable,
                     "testzahl_muster": r"Ran (\d+) tests?"})
        git(self.p, "init", "-q")
        git(self.p, "add", "-A")
        git(self.p, "commit", "-qm", "start")
        self.basis = git(self.p, "rev-parse", "HEAD").strip()

    def tearDown(self):
        shutil.rmtree(self.tmp, ignore_errors=True)

    def schreibe(self, rel, inhalt, ordner=None):
        pfad = os.path.join(ordner or self.p, rel)
        os.makedirs(os.path.dirname(pfad), exist_ok=True)
        with open(pfad, "w", encoding="utf-8") as f:
            f.write(inhalt)

    def konfig(self, d):
        self.schreibe(".claude/dev-team.json", json.dumps(d))

    def lauf(self, *args, ordner=None):
        r = subprocess.run(["bash", TESTS_SKRIPT, "--basis", self.basis, *args],
                           cwd=ordner or self.p, capture_output=True, text=True)
        return r.returncode, r.stdout

    def test_gruen_ohne_aenderung(self):
        code, aus = self.lauf()
        self.assertEqual(code, 0, aus)
        self.assertIn("alles grün", aus)
        self.assertIn("Bestandene Tests: 2", aus)

    def test_entwickler_neuer_test_und_code_ok(self):
        self.schreibe("src/rabatt.py", "def rabatt(x):\n    return x * 0.9\n")
        self.schreibe("tests/test_rabatt.py", "import unittest\nfrom src.rabatt import rabatt\n"
                      "class R(unittest.TestCase):\n    def test_r(self):\n        self.assertAlmostEqual(rabatt(10), 9)\n")
        code, aus = self.lauf("--rolle", "entwickler")
        self.assertEqual(code, 0, aus)

    def test_entwickler_aendert_bestehenden_test(self):
        self.schreibe("tests/test_rechnung.py", TEST_GRUEN.replace("3)", "3)  # angepasst"))
        code, aus = self.lauf("--rolle", "entwickler")
        self.assertEqual(code, 1)
        self.assertIn("bestehende Testdatei", aus)

    def test_tester_darf_test_aendern(self):
        self.schreibe("tests/test_rechnung.py", TEST_GRUEN + "\n# Kommentar\n")
        self.assertEqual(self.lauf("--rolle", "tester")[0], 0)

    def test_skip_wird_erkannt(self):
        for zeile in ("    @unittest.skip('später')\n", "    @pytest.mark.skip\n"):
            self.schreibe("tests/test_neu.py", "import unittest\nclass N(unittest.TestCase):\n" + zeile +
                          "    def test_n(self):\n        self.assertTrue(False)\n")
            code, aus = self.lauf("--rolle", "tester")
            self.assertEqual(code, 1, zeile)
            self.assertIn("übersprungen", aus)

    def test_only_in_js_wird_erkannt(self):
        self.schreibe("tests/ui.test.js", "test.only('x', () => {});\nit.skip('y', () => {});\n")
        code, aus = self.lauf("--ohne-lauf")
        self.assertEqual(code, 1)
        self.assertEqual(aus.count("übersprungen/exklusiv"), 2)

    def test_referenz_geaendert(self):
        self.schreibe("tests/referenz/fall1.json", '{"ein": [1,2], "aus": 4}')
        code, aus = self.lauf()
        self.assertEqual(code, 1)
        self.assertIn("Referenzfall", aus)
        code, aus = self.lauf("--freigabe", "Simon 2026-10-26: Tabelle korrigiert")
        self.assertEqual(code, 0, aus)
        self.assertIn("WARNUNG", aus)

    def test_rote_tests(self):
        self.schreibe("src/rechnung.py", "def summe(w):\n    return 0\n")
        code, aus = self.lauf()
        self.assertEqual(code, 1)
        self.assertIn("Testbefehl fehlgeschlagen", aus)

    def test_testzahl_sinkt(self):
        self.assertEqual(self.lauf()[0], 0)          # merkt sich 2
        self.schreibe("tests/test_rechnung.py", TEST_GRUEN.split("    def test_leer")[0])
        code, aus = self.lauf("--rolle", "tester")
        self.assertEqual(code, 1)
        self.assertIn("Weniger bestandene Tests", aus)

    def test_null_tests(self):
        self.konfig({"testbefehl": "%s -m unittest discover -s src -v" % sys.executable,
                     "testzahl_muster": r"Ran (\d+) tests?"})
        code, aus = self.lauf()
        self.assertEqual(code, 1)
        self.assertIn("0 Tests", aus)

    def test_ohne_testbefehl(self):
        self.konfig({})
        code, aus = self.lauf()
        self.assertEqual(code, 1)
        self.assertIn("Kein Testbefehl", aus)

    def test_testdatei_geloescht(self):
        os.remove(os.path.join(self.p, "tests/test_rechnung.py"))
        code, aus = self.lauf("--ohne-lauf")
        self.assertEqual(code, 1)
        self.assertIn("Testdatei gelöscht", aus)

    def test_tester_aendert_code(self):
        self.schreibe("src/rechnung.py", "def summe(w):\n    return sum(w) + 0\n")
        code, aus = self.lauf("--rolle", "tester")
        self.assertEqual(code, 1)
        self.assertIn("Tester hat Programmcode", aus)

    def test_entwickler_aendert_fachregeln(self):
        self.schreibe("fachwissen/regeln.md", "# Regeln\nneu\n")
        code, aus = self.lauf("--rolle", "entwickler", "--ohne-lauf")
        self.assertEqual(code, 1)

    def test_zusatzbefehl_rot(self):
        self.konfig({"testbefehl": "%s -m unittest discover -s tests -t . -v" % sys.executable,
                     "testzahl_muster": r"Ran (\d+) tests?", "zusatzbefehle": ["exit 3"]})
        git(self.p, "commit", "-qam", "konfig")
        self.basis = git(self.p, "rev-parse", "HEAD").strip()
        code, aus = self.lauf()
        self.assertEqual(code, 1)
        self.assertIn("Zusatzbefehl", aus)

    def test_testkonfig_warnung(self):
        self.schreibe("pytest.ini", "[pytest]\naddopts = --ignore=tests\n")
        code, aus = self.lauf()
        self.assertIn("Testkonfiguration geändert", aus)

    def test_warnung_bei_worktrees_im_hauptordner(self):
        os.makedirs(os.path.join(self.p, ".claude", "worktrees", "agent-1"))
        code, aus = self.lauf()
        self.assertEqual(code, 0, aus)
        self.assertIn("Entwickler-Worktrees", aus)

    def test_worktree_nachweis_nur_im_hauptordner(self):
        wt = os.path.join(self.tmp, "wt")
        git(self.p, "worktree", "add", "-q", wt, "-b", "paket")
        code, aus = self.lauf("--rolle", "entwickler", ordner=wt)
        self.assertEqual(code, 0, aus)
        self.assertIn("Worktree", aus)
        self.assertFalse(os.path.exists(os.path.join(wt, "docs", "TESTNACHWEIS.md")))
        self.lauf()
        self.assertTrue(os.path.exists(os.path.join(self.p, "docs", "TESTNACHWEIS.md")))


def lade_abh():
    spec = importlib.util.spec_from_file_location("abh", ABH_PY)
    m = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(m)
    return m


class TestAbhaengigkeiten(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.mkdtemp(prefix="abh-")
        self.p = self.tmp
        self.schreibe("package.json", json.dumps({"dependencies": {"react": "18.3.1"}}))
        self.schreibe("package-lock.json", "{}")
        self.schreibe("requirements.txt", "requests==2.32.3\n")
        git(self.p, "init", "-q")
        git(self.p, "add", "-A")
        git(self.p, "commit", "-qm", "start")
        self.basis = git(self.p, "rev-parse", "HEAD").strip()
        self.m = lade_abh()

    def tearDown(self):
        shutil.rmtree(self.tmp, ignore_errors=True)

    def schreibe(self, rel, inhalt):
        with open(os.path.join(self.p, rel), "w", encoding="utf-8") as f:
            f.write(inhalt)

    def lauf(self, antworten):
        def falsch(url):
            for teil, wert in antworten.items():
                if teil in url:
                    if isinstance(wert, Exception):
                        raise wert
                    return wert
            raise urllib.error.HTTPError(url, 404, "nf", {}, None)
        aus = io.StringIO()
        alt = os.getcwd()
        os.chdir(self.p)
        try:
            with mock.patch.object(self.m, "hole_json", side_effect=falsch), \
                    mock.patch.object(sys, "argv", ["x", "--basis", self.basis]), \
                    contextlib.redirect_stdout(aus):
                try:
                    self.m.main()
                    code = 0
                except SystemExit as e:
                    code = e.code
        finally:
            os.chdir(alt)
        return code, aus.getvalue()

    def test_keine_neuen(self):
        code, aus = self.lauf({})
        self.assertEqual(code, 0, aus)

    def test_erfundenes_npm_paket(self):
        self.schreibe("package.json", json.dumps({"dependencies": {"react": "18.3.1", "react-magic-utils": "1.0.0"}}))
        self.schreibe("package-lock.json", '{"x":1}')
        code, aus = self.lauf({})
        self.assertEqual(code, 1)
        self.assertIn("existiert nicht", aus)

    def test_echtes_npm_paket(self):
        self.schreibe("package.json", json.dumps({"dependencies": {"react": "18.3.1", "zod": "3.23.8"}}))
        self.schreibe("package-lock.json", '{"x":1}')
        code, aus = self.lauf({"registry.npmjs.org/zod": {"time": {"created": "2020-03-07T00:00:00Z"}},
                               "downloads/point/last-week/zod": {"downloads": 9000000}})
        self.assertEqual(code, 0, aus)

    def test_frisches_npm_paket(self):
        from datetime import datetime, timedelta, timezone
        neu = (datetime.now(timezone.utc) - timedelta(days=5)).isoformat()
        self.schreibe("package.json", json.dumps({"dependencies": {"react": "18.3.1", "zod2": "1.0.0"}}))
        self.schreibe("package-lock.json", '{"x":1}')
        code, aus = self.lauf({"registry.npmjs.org/zod2": {"time": {"created": neu}},
                               "downloads/point/last-week/zod2": {"downloads": 12}})
        self.assertEqual(code, 1)
        self.assertIn("Tage alt", aus)
        self.assertIn("Downloads", aus)

    def test_lockfile_nicht_aktualisiert(self):
        self.schreibe("package.json", json.dumps({"dependencies": {"react": "18.3.1", "zod": "3.23.8"}}))
        code, aus = self.lauf({"registry.npmjs.org/zod": {"time": {"created": "2020-03-07T00:00:00Z"}},
                               "downloads/point/last-week/zod": {"downloads": 9000000}})
        self.assertEqual(code, 1)
        self.assertIn("Lockfile", aus)

    def test_offline_gilt_als_nicht_bestanden(self):
        self.schreibe("requirements.txt", "requests==2.32.3\nhttpx==0.27.0\n")
        code, aus = self.lauf({"pypi.org": urllib.error.URLError("offline")})
        self.assertEqual(code, 1)
        self.assertIn("nicht erreichbar", aus)

    def test_pypi_erfunden_und_ungepinnt(self):
        self.schreibe("requirements.txt", "requests==2.32.3\nhuggingface-magic-tools\n")
        code, aus = self.lauf({})
        self.assertEqual(code, 1)
        self.assertIn("existiert nicht", aus)
        self.assertIn("ohne feste Version", aus)

    def test_pypi_echt(self):
        self.schreibe("requirements.txt", "requests==2.32.3\nhttpx==0.27.0\n")
        rel = {"upload_time_iso_8601": "2019-01-01T00:00:00Z"}
        code, aus = self.lauf({"pypi.org/pypi/httpx": {"releases": {"0.1": [rel], "0.2": [rel], "0.27.0": [rel]}}})
        self.assertEqual(code, 0, aus)


if __name__ == "__main__":
    unittest.main()
