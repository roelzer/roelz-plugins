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
        self.schreibe(".gitignore", ".dev-team/\n__pycache__/\n.claude/worktrees/\n")
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
        code, aus = self.lauf("--freigabe", "Simon hat zugestimmt")
        self.assertEqual(code, 1, aus)
        self.assertIn("steht nicht in .claude/freigaben.md", aus)
        self.schreibe(".claude/freigaben.md", "# Freigaben\n2026-10-26 | tabelle-korr | Rohrtabelle korrigiert\n")
        code, aus = self.lauf("--freigabe", "tabelle-korr")
        self.assertEqual(code, 1, aus)  # ohne Geltung ungültig
        self.assertIn("keine Geltung", aus)
        self.schreibe(".claude/freigaben.md", "# Freigaben\n2026-10-26 | tabelle-korr | tests/referenz/andere.json"
                      " | falscher Pfad\n")
        code, aus = self.lauf("--freigabe", "tabelle-korr")
        self.assertEqual(code, 1, aus)  # Geltung deckt den Pfad nicht
        self.schreibe(".claude/freigaben.md", "# Freigaben\n2026-10-26 | tabelle-korr | tests/referenz/fall1.json"
                      " | Rohrtabelle korrigiert\n")
        code, aus = self.lauf("--freigabe", "tabelle")
        self.assertEqual(code, 1, aus)  # Teilwort reicht nicht
        code, aus = self.lauf("--freigabe", "tabelle-korr")
        self.assertEqual(code, 0, aus)
        self.assertIn("Freigabe verwendet", aus)

    def test_mehrere_freigaben(self):
        # Ein Meilenstein hat oft mehrere Freigaben; früher nahm die Schranke nur ein Stichwort (Pilot M5).
        self.schreibe("tests/referenz/fall2.json", '{"ein": [2,2], "aus": 4}')
        git(self.p, "add", "-A")
        git(self.p, "commit", "-qm", "fall2")
        self.basis = git(self.p, "rev-parse", "HEAD").strip()
        self.schreibe("tests/referenz/fall1.json", '{"ein": [1,2], "aus": 4}')
        self.schreibe("tests/referenz/fall2.json", '{"ein": [2,2], "aus": 5}')
        self.schreibe(".claude/freigaben.md", "# Freigaben\n2026-10-30 | eins | tests/referenz/fall1.json | a\n"
                      "2026-10-30 | zwei | tests/referenz/fall2.json | b\n")
        self.assertEqual(self.lauf("--freigabe", "eins")[0], 1)
        code, aus = self.lauf("--freigabe", "eins", "--freigabe", "zwei")
        self.assertEqual(code, 0, aus)
        self.assertEqual(self.lauf("--freigabe", "eins,zwei")[0], 0)
        code, aus = self.lauf("--freigabe", "eins,fehlt")
        self.assertEqual(code, 1, aus)
        self.assertIn("'fehlt' steht nicht", aus)

    def merge_paket(self, dateien, nachricht="P1"):
        git(self.p, "checkout", "-qb", "paket-" + nachricht)
        for rel, inhalt in dateien.items():
            self.schreibe(rel, inhalt)
        git(self.p, "add", "-A")
        git(self.p, "commit", "-qm", nachricht)
        git(self.p, "checkout", "-q", "-")
        git(self.p, "merge", "-q", "--no-ff", "paket-" + nachricht, "-m", nachricht)

    def test_merge_rolle_erlaubt_prozessdateien(self):
        self.merge_paket({"docs/STATUS.md": "# Status\nP1 gemergt\n", "src/rabatt.py": "def rabatt(x):\n    return x\n"})
        self.assertEqual(self.lauf("--rolle", "entwickler")[0], 1)  # Entwickler darf docs nicht
        code, aus = self.lauf("--rolle", "merge")
        self.assertEqual(code, 0, aus)

    def test_merge_ohne_merge_commit_rot(self):
        self.schreibe("src/rabatt.py", "def rabatt(x):\n    return x\n")
        git(self.p, "add", "-A")
        git(self.p, "commit", "-qm", "ff")
        code, aus = self.lauf("--rolle", "merge")
        self.assertEqual(code, 1, aus)
        self.assertIn("kein Merge-Commit", aus)

    def test_merge_rolle_sperrt_bestehende_tests(self):
        self.schreibe("tests/test_rechnung.py", TEST_GRUEN + "\n# still geändert\n")
        self.assertEqual(self.lauf("--rolle", "merge")[0], 1)

    def test_testkonfig_durch_entwickler_rot(self):
        self.schreibe("conftest.py", "# neu\n")
        git(self.p, "add", "-A")
        git(self.p, "commit", "-qm", "conf")
        self.basis = git(self.p, "rev-parse", "HEAD").strip()
        self.schreibe("conftest.py", "import pytest\n")
        code, aus = self.lauf("--rolle", "entwickler")
        self.assertEqual(code, 1, aus)

    def test_worktree_basis_muss_abzweigpunkt_sein(self):
        wt = os.path.join(self.p, ".claude", "worktrees", "p1")
        git(self.p, "worktree", "add", "-q", wt, "-b", "p1")
        self.schreibe("src/rabatt.py", "def rabatt(x):\n    return x\n", ordner=wt)
        git(wt, "add", "-A")
        git(wt, "commit", "-qm", "a")
        zwischen = git(wt, "rev-parse", "HEAD").strip()
        self.schreibe("src/rabatt2.py", "def r2(x):\n    return x\n", ordner=wt)
        git(wt, "add", "-A")
        git(wt, "commit", "-qm", "b")
        r = subprocess.run(["bash", TESTS_SKRIPT, "--basis", zwischen, "--rolle", "entwickler"],
                           cwd=wt, capture_output=True, text=True)
        self.assertEqual(r.returncode, 1, r.stdout)
        self.assertIn("Abzweigpunkt", r.stdout)
        r = subprocess.run(["bash", TESTS_SKRIPT, "--basis", self.basis, "--rolle", "entwickler"],
                           cwd=wt, capture_output=True, text=True)
        self.assertEqual(r.returncode, 0, r.stdout)
        kopf = git(wt, "rev-parse", "HEAD").strip()
        self.assertTrue(os.path.isfile(os.path.join(self.p, ".dev-team", "schranke-ok", kopf)))

    def test_leere_tests_erkannt(self):
        for inhalt in ("import unittest\nclass N(unittest.TestCase):\n    def test_n(self):\n        self.assertTrue(True)\n",
                       "def test_n():\n    assert True\n",
                       "from src.rechnung import summe\ndef test_n():\n    return\n    assert summe([1]) == 1\n"):
            self.schreibe("tests/test_neu.py", inhalt)
            code, aus = self.lauf("--rolle", "tester")
            self.assertEqual(code, 1, inhalt)
            self.assertIn("ohne echte Prüfung", aus)
        self.schreibe("tests/test_neu.py", "from src.rechnung import summe\ndef test_n():\n    assert summe([2]) == 2\n")
        self.assertEqual(self.lauf("--rolle", "tester")[0], 0)

    def test_js_immer_wahr(self):
        self.schreibe("tests/ui.test.js", "test('x', () => { expect(true).toBe(true); });\n")
        code, aus = self.lauf("--ohne-lauf")
        self.assertEqual(code, 1)
        self.assertIn("immer stimmt", aus)

    def test_neue_testkonfig_durch_entwickler_rot(self):
        self.schreibe("conftest.py", "collect_ignore = ['tests']\n")
        self.assertEqual(self.lauf("--rolle", "entwickler")[0], 1)

    def test_testwerkzeug_eingriffe(self):
        for inhalt in ("import unittest\nunittest.TestCase.assertEqual = lambda *a: None\n",
                       "from src.rechnung import summe\ndef test_n():\n    try:\n        assert summe([1]) == 9\n"
                       "    except AssertionError:\n        pass\n",
                       "import os\nos._exit(0)\n"):
            self.schreibe("tests/test_aaa.py", inhalt)
            code, aus = self.lauf("--rolle", "tester", "--ohne-lauf")
            self.assertEqual(code, 1, inhalt)
            self.assertIn("Eingriff in das Testwerkzeug", aus)

    def test_pyproject_testauswahl_durch_entwickler(self):
        self.schreibe("pyproject.toml", "[project]\nname='x'\n")
        git(self.p, "add", "-A")
        git(self.p, "commit", "-qm", "pp")
        self.basis = git(self.p, "rev-parse", "HEAD").strip()
        self.schreibe("pyproject.toml", "[project]\nname='x'\n[tool.pytest.ini_options]\naddopts='--deselect x'\n")
        code, aus = self.lauf("--rolle", "entwickler", "--ohne-lauf")
        self.assertEqual(code, 1, aus)
        self.assertIn("Testeinstellungen", aus)

    def test_merge_basis_vor_merge_ignoriert_testeranteil(self):
        # Tester-Änderung im Meilenstein, danach sauberer Merge eines Pakets: mit HEAD^1 grün
        self.schreibe("tests/test_rechnung.py", TEST_GRUEN + "\n# Tester ergänzt\n")
        git(self.p, "add", "-A")
        git(self.p, "commit", "-qm", "tester")
        git(self.p, "checkout", "-qb", "p1")
        self.schreibe("src/rabatt.py", "def rabatt(x):\n    return x\n")
        git(self.p, "add", "-A")
        git(self.p, "commit", "-qm", "p1")
        git(self.p, "checkout", "-q", "-")
        git(self.p, "merge", "-q", "--no-ff", "p1", "-m", "P1")
        self.assertEqual(self.lauf("--rolle", "merge")[0], 1)  # gegen Meilenstein-Basis: Tester-Anteil rot
        r = subprocess.run(["bash", TESTS_SKRIPT, "--basis", "HEAD^1", "--rolle", "merge"], cwd=self.p,
                           capture_output=True, text=True)
        self.assertEqual(r.returncode, 0, r.stdout)

    def test_abhaengigkeiten_laufen_automatisch(self):
        self.schreibe(".npmrc", "registry=https://boese.example/\n")
        code, aus = self.lauf("--rolle", "tester", "--ohne-lauf")
        self.assertEqual(code, 1, aus)
        self.assertIn("Abhängigkeits-Schranke", aus)

    def skript(self, name, *args, ordner=None, env=None):
        r = subprocess.run([sys.executable, os.path.join(PLUGIN, "scripts", name), *args], cwd=ordner or self.p,
                           capture_output=True, text=True, env=dict(os.environ, **(env or {})))
        return r.returncode, r.stdout + r.stderr

    def test_pruefsummen_abnahmetests(self):
        self.schreibe(".dev-team/verdeckt/test_abnahme.py.verdeckt", "def test_a1():\n    assert 1 + 1 == 2\n")
        code, aus = self.skript("abnahme_pruefsummen.py", "--schreiben")
        self.assertEqual(code, 0, aus)
        self.assertEqual(self.lauf("--rolle", "tester", "--ohne-lauf")[0], 0)
        # Tester deckt verändert auf → rot
        self.schreibe("tests/abnahme/test_abnahme.py", "def test_a1():\n    assert True\n")
        code, aus = self.lauf("--rolle", "tester", "--ohne-lauf")
        self.assertEqual(code, 1, aus)
        self.assertIn("weicht von der festgehaltenen Fassung ab", aus)
        # unverändert aufgedeckt → grün
        self.schreibe("tests/abnahme/test_abnahme.py", "def test_a1():\n    assert 1 + 1 == 2\n")
        self.assertEqual(self.lauf("--rolle", "tester", "--ohne-lauf")[0], 0)
        # Überschreiben der Liste ohne Freigabe verweigert
        self.schreibe(".dev-team/verdeckt/test_abnahme.py.verdeckt", "def test_a1():\n    assert 2 == 2\n")
        code, aus = self.skript("abnahme_pruefsummen.py", "--schreiben")
        self.assertEqual(code, 1, aus)

    def test_pruefsummen_naechster_meilenstein_ohne_freigabe(self):
        # M1-Test ist aufgedeckt (nicht mehr verdeckt), M2 bringt neue verdeckte Tests: Ergänzen geht ohne
        # Freigabe, der M1-Eintrag bleibt stehen und schützt den aufgedeckten Test weiter (Pilot: jedes Mal Freigabe).
        self.schreibe(".dev-team/verdeckt/test_m1.py", "def test_a1():\n    assert 1 + 1 == 2\n")
        self.assertEqual(self.skript("abnahme_pruefsummen.py", "--schreiben")[0], 0)
        os.makedirs(os.path.join(self.p, "tests", "abnahme"), exist_ok=True)
        shutil.move(os.path.join(self.p, ".dev-team", "verdeckt", "test_m1.py"),
                    os.path.join(self.p, "tests", "abnahme", "test_m1.py"))
        self.schreibe(".dev-team/verdeckt/test_m2.py", "def test_a2():\n    assert 2 * 2 == 4\n")
        code, aus = self.skript("abnahme_pruefsummen.py", "--schreiben")
        self.assertEqual(code, 0, aus)
        self.assertIn("1 neu, 1 schon festgehalten", aus)
        liste = open(os.path.join(self.p, "docs", "ABNAHME_PRUEFSUMMEN.txt"), encoding="utf-8").read()
        self.assertIn("test_m1.py", liste)
        self.assertIn("test_m2.py", liste)
        self.schreibe("tests/abnahme/test_m1.py", "def test_a1():\n    assert True\n")   # abgeschwächt → rot
        code, aus = self.lauf("--rolle", "tester", "--ohne-lauf")
        self.assertEqual(code, 1, aus)
        self.assertIn("weicht von der festgehaltenen Fassung ab", aus)

    def test_pruefsummen_ohne_endung_verdeckt(self):
        self.schreibe(".dev-team/verdeckt/test_abnahme_a1.py", "def test_a1():\n    assert 1 + 1 == 2\n")
        self.schreibe(".dev-team/verdeckt/README.md", "Erklärung\n")
        code, aus = self.skript("abnahme_pruefsummen.py", "--schreiben")
        self.assertEqual(code, 0, aus)
        self.assertIn("1 Abnahmetests", aus)
        self.schreibe("tests/abnahme/test_abnahme_a1.py", "def test_a1():\n    assert True\n")
        self.assertEqual(self.lauf("--rolle", "tester", "--ohne-lauf")[0], 1)

    def test_abdeckung_am_meilenstein(self):
        self.schreibe("docs/lastenheft.md", "# L\n- A1: Summe\n- A2: Leere Liste\n")
        code, aus = self.lauf("--rolle", "projektleiter")
        self.assertEqual(code, 1, aus)
        self.assertIn("A1, A2", aus)
        self.schreibe("tests/test_rechnung.py", TEST_GRUEN.replace("test_summe", "test_a1_summe")
                      .replace("test_leer", "test_a2_leer"))
        code, aus = self.lauf("--rolle", "tester")
        self.assertEqual(code, 0, aus)
        code, aus = self.lauf("--rolle", "projektleiter")
        self.assertNotIn("Anforderungen ohne Test", aus)

    def test_fachsoftware_braucht_mutationstest(self):
        k = json.load(open(os.path.join(self.p, ".claude", "dev-team.json")))
        k["profil"] = "fachsoftware"
        self.konfig(k)
        git(self.p, "add", "-A")
        git(self.p, "commit", "-qm", "profil")
        self.basis = git(self.p, "rev-parse", "HEAD").strip()
        code, aus = self.lauf("--rolle", "projektleiter")
        self.assertEqual(code, 1, aus)
        self.assertIn("Mutationstest", aus)
        k["meilensteinbefehle"] = ["%s ${DEV_TEAM_PLUGIN}/scripts/mutationstest.py --dateien src/rechnung.py "
                                   "--schwelle 50" % sys.executable]
        self.konfig(k)
        git(self.p, "add", "-A")
        git(self.p, "commit", "-qm", "mutation")
        self.basis = git(self.p, "rev-parse", "HEAD").strip()
        code, aus = self.lauf("--rolle", "projektleiter")
        self.assertEqual(code, 0, aus)
        self.assertIn("mutationstest.py", aus)

    def test_mutationstest_findet_schwache_tests(self):
        self.schreibe("src/rabatt.py", "def rabatt(x):\n    if x > 100:\n        return x * 0.9\n    return x\n")
        self.schreibe("tests/test_rabatt.py", "import unittest\nfrom src.rabatt import rabatt\n"
                      "class R(unittest.TestCase):\n    def test_r(self):\n        self.assertTrue(rabatt(10) > 0)\n")
        code, aus = self.skript("mutationstest.py", "--dateien", "src/rabatt.py", "--schwelle", "80")
        self.assertEqual(code, 1, aus)
        self.assertIn("überlebt", aus)
        self.schreibe("tests/test_rabatt.py", "import unittest\nfrom src.rabatt import rabatt\n"
                      "class R(unittest.TestCase):\n    def test_r(self):\n        self.assertEqual(rabatt(10), 10)\n"
                      "        self.assertEqual(rabatt(100), 100)\n        self.assertAlmostEqual(rabatt(200), 180)\n"
                      "        self.assertAlmostEqual(rabatt(101), 90.9)\n")
        code, aus = self.skript("mutationstest.py", "--dateien", "src/rabatt.py", "--schwelle", "80")
        self.assertEqual(code, 0, aus)

    def test_verdeckt_blind_meldet_nur_nummern(self):
        self.schreibe(".dev-team/verdeckt/test_abn.py.verdeckt",
                      "import unittest\nfrom src.rechnung import summe\nclass A(unittest.TestCase):\n"
                      "    def test_a7_geheimer_wert_4711(self):\n        self.assertEqual(summe([4711]), 4712)\n")
        code, aus = self.skript("verdeckt_blind.py")
        self.assertEqual(code, 1, aus)
        self.assertIn("A7", aus)
        self.assertNotIn("4711", aus)
        self.assertNotIn("geheimer", aus)
        self.schreibe(".dev-team/verdeckt/test_abn.py.verdeckt",
                      "import unittest\nfrom src.rechnung import summe\nclass A(unittest.TestCase):\n"
                      "    def test_a7_wert(self):\n        self.assertEqual(summe([4711]), 4711)\n")
        code, aus = self.skript("verdeckt_blind.py")
        self.assertEqual(code, 0, aus)
        self.assertIn("GRÜN", aus)

    def test_geschuetzt_schreiben(self):
        quelle = os.path.join(self.tmp, "fall2.json")
        with open(quelle, "w") as f:
            f.write('{"ein": [2], "aus": 2}')
        code, aus = self.skript("geschuetzt_schreiben.py", "--quelle", quelle, "--ziel", "tests/referenz/fall2.json",
                                "--freigabe", "neu-fall2")
        self.assertEqual(code, 1, aus)
        self.assertFalse(os.path.exists(os.path.join(self.p, "tests", "referenz", "fall2.json")))
        self.schreibe(".claude/freigaben.md", "2026-10-26 | neu-fall2 | tests/referenz/fall2.json | Simon liefert Fall 2\n")
        code, aus = self.skript("geschuetzt_schreiben.py", "--quelle", quelle, "--ziel", "src/hack.py",
                                "--freigabe", "neu-fall2")
        self.assertEqual(code, 1, aus)
        code, aus = self.skript("geschuetzt_schreiben.py", "--quelle", quelle, "--ziel", "tests/referenz/fall2.json",
                                "--freigabe", "neu-fall2")
        self.assertEqual(code, 0, aus)
        self.assertTrue(os.path.exists(os.path.join(self.p, "tests", "referenz", "fall2.json")))
        self.assertIn("fall2.json", open(os.path.join(self.p, "docs", "FREIGABEN_LOG.md"), encoding="utf-8").read())

    def test_mutationstest_gleich_grosse_mutanten(self):
        # drei gleiche Funktionen, nur f ist getestet: höchstens ein Drittel darf als erkannt gelten
        self.schreibe("src/drei.py", "def f(x):\n    return x + 1\n\n\ndef g(x):\n    return x + 1\n\n\n"
                      "def h(x):\n    return x + 1\n")
        self.schreibe("tests/test_drei.py", "import unittest\nfrom src.drei import f\n"
                      "class D(unittest.TestCase):\n    def test_f(self):\n        self.assertEqual(f(1), 2)\n")
        code, aus = self.skript("mutationstest.py", "--dateien", "src/drei.py", "--schwelle", "60")
        self.assertEqual(code, 1, aus)
        self.assertIn("überlebt", aus)

    def test_pruefsummen_umbenennen_loeschen_liste(self):
        self.schreibe(".dev-team/verdeckt/test_abn_a1.py", "def test_a1():\n    assert 1 + 1 == 2\n")
        self.assertEqual(self.skript("abnahme_pruefsummen.py", "--schreiben")[0], 0)
        git(self.p, "add", "-f", "docs/ABNAHME_PRUEFSUMMEN.txt")
        git(self.p, "commit", "-qm", "plan")
        self.basis = git(self.p, "rev-parse", "HEAD").strip()
        # abgeschwächt unter anderem Namen aufgedeckt, Original fehlt → am Meilenstein rot
        self.schreibe("tests/abnahme/test_anders.py", "def test_a1():\n    assert True\n")
        os.remove(os.path.join(self.p, ".dev-team", "verdeckt", "test_abn_a1.py"))
        code, aus = self.lauf("--rolle", "projektleiter", "--ohne-lauf")
        self.assertEqual(code, 1, aus)
        self.assertIn("gelöscht", aus)
        # Eintrag aus der Liste gestrichen → rot
        self.schreibe("docs/ABNAHME_PRUEFSUMMEN.txt", "# leer\n")
        code, aus = self.lauf("--rolle", "tester", "--ohne-lauf")
        self.assertEqual(code, 1, aus)
        self.assertIn("geändert oder gestrichen (test_abn_a1.py)", aus)

    def test_pruefsummen_ergaenzt_ohne_dauerfreigabe(self):
        # Pilot: nach jedem neuen Meilenstein wich die Liste von ihrer ersten Fassung ab, und jede Schranke
        # brauchte ein Freigabe-Stichwort. Ergänzen ist erlaubt, Ändern eines je festgehaltenen Eintrags nicht.
        self.schreibe(".dev-team/verdeckt/test_m1.py", "def test_a1():\n    assert 1 + 1 == 2\n")
        self.assertEqual(self.skript("abnahme_pruefsummen.py", "--schreiben")[0], 0)
        git(self.p, "add", "-f", "docs/ABNAHME_PRUEFSUMMEN.txt")
        git(self.p, "commit", "-qm", "M1")
        self.schreibe(".dev-team/verdeckt/test_m2.py", "def test_a2():\n    assert 2 * 2 == 4\n")
        self.assertEqual(self.skript("abnahme_pruefsummen.py", "--schreiben")[0], 0)
        git(self.p, "add", "-f", "docs/ABNAHME_PRUEFSUMMEN.txt")
        git(self.p, "commit", "-qm", "M2")
        self.basis = git(self.p, "rev-parse", "HEAD").strip()
        code, aus = self.lauf("--rolle", "tester", "--ohne-lauf")
        self.assertEqual(code, 0, aus)
        # M2-Eintrag nachträglich geändert (auch ein später ergänzter Eintrag ist geschützt) → rot
        liste = open(os.path.join(self.p, "docs", "ABNAHME_PRUEFSUMMEN.txt"), encoding="utf-8").read()
        zeile = [z for z in liste.splitlines() if z.endswith("test_m2.py")][0]
        self.schreibe("docs/ABNAHME_PRUEFSUMMEN.txt", liste.replace(zeile, "0" * 64 + "  test_m2.py"))
        code, aus = self.lauf("--rolle", "tester", "--ohne-lauf")
        self.assertEqual(code, 1, aus)
        self.assertIn("test_m2.py", aus)

    def test_pruefsummen_gestrichen_aber_unveraendert_aufgedeckt(self):
        # Liste beim nächsten Meilenstein ersetzt (alte Fassung): Der gestrichene Eintrag zählt nicht, solange sein
        # Test unverändert aufgedeckt vorliegt; wird der aufgedeckte Test später abgeschwächt, ist es wieder rot.
        self.schreibe(".dev-team/verdeckt/test_m1.py", "def test_a1():\n    assert 1 + 1 == 2\n")
        self.assertEqual(self.skript("abnahme_pruefsummen.py", "--schreiben")[0], 0)
        git(self.p, "add", "-f", "docs/ABNAHME_PRUEFSUMMEN.txt")
        git(self.p, "commit", "-qm", "M1")
        self.schreibe("tests/abnahme/test_m1.py", "def test_a1():\n    assert 1 + 1 == 2\n")
        os.remove(os.path.join(self.p, ".dev-team", "verdeckt", "test_m1.py"))
        self.schreibe("docs/ABNAHME_PRUEFSUMMEN.txt", "# ersetzt\n")
        self.schreibe(".dev-team/verdeckt/test_m2.py", "def test_a2():\n    assert 2 * 2 == 4\n")
        code, aus = self.lauf("--rolle", "tester", "--ohne-lauf")
        self.assertNotIn("geändert oder gestrichen", aus)
        self.schreibe("tests/abnahme/test_m1.py", "def test_a1():\n    assert True\n")
        code, aus = self.lauf("--rolle", "tester", "--ohne-lauf")
        self.assertIn("geändert oder gestrichen (test_m1.py)", aus)

    def test_verdeckt_ohne_liste_rot_beim_merge(self):
        self.schreibe(".dev-team/verdeckt/test_abn_a1.py", "def test_a1():\n    assert 1 + 1 == 2\n")
        code, aus = self.lauf("--rolle", "projektleiter", "--ohne-lauf")
        self.assertEqual(code, 1, aus)
        self.assertIn("keine festgehaltenen Prüfsummen", aus)

    def test_abdeckung_nur_ueber_testnamen(self):
        self.schreibe("docs/lastenheft.md", "# L\n## A1 Summe\n## A2 Leer\n")
        self.schreibe("tests/test_trick.py", "a1, a2 = 1, 2\ndef test_x():\n    assert a1 + a2 == 3\n")
        code, aus = self.lauf("--rolle", "projektleiter")
        self.assertEqual(code, 1, aus)
        self.assertIn("A1, A2", aus)

    def test_fachregeln_mit_f_nummern(self):
        k = json.load(open(os.path.join(self.p, ".claude", "dev-team.json")))
        k["profil"] = "fachsoftware"
        k["meilensteinbefehle"] = ["echo mutation"]
        self.konfig(k)
        self.schreibe("fachwissen/regeln.md", "# Fachregeln\n## Bestätigt\n| Nr. | Regel | Quelle |\n|---|---|---|\n"
                      "| F1 | DN wird nie größer | Simon |\n| F2 | v <= 2 m/s | Simon |\n## Offen\n| F3 | x | |\n")
        git(self.p, "add", "-A")
        git(self.p, "commit", "-qm", "f")
        self.basis = git(self.p, "rev-parse", "HEAD").strip()
        code, aus = self.lauf("--rolle", "projektleiter")
        self.assertEqual(code, 1, aus)
        self.assertIn("F1, F2", aus)
        self.assertNotIn("F3", aus.split("Fachregeln ohne")[1].split("\n")[0])
        self.assertIn("ohne Mutationstest", aus)  # 'echo mutation' zählt nicht

    def test_vorgeschlagene_fachregeln_zaehlen_nicht(self):
        # „Vorgeschlagen (… noch nicht bestätigt)“ enthält das Wort „bestätigt“ – früher Fehlalarm.
        k = json.load(open(os.path.join(self.p, ".claude", "dev-team.json")))
        k["profil"] = "fachsoftware"
        self.konfig(k)
        self.schreibe("fachwissen/regeln.md", "# Fachregeln\n## Bestätigt\n| Nr. | Regel | Quelle |\n|---|---|---|\n"
                      "| F2 | v <= 2 m/s | Simon |\n## Offen (Regel klar, Werte fehlen noch)\n| F3 | x | |\n"
                      "## Vorgeschlagen (aus Recherche oder Fachprüfer, noch nicht bestätigt)\n"
                      "| Nr. | Regel | Sicherheit |\n|---|---|---|\n| F1 | Kostenbetrag | Annahme |\n"
                      "| F4 | Frist am Stichtag | mittel |\n")
        git(self.p, "add", "-A")
        git(self.p, "commit", "-qm", "f")
        self.basis = git(self.p, "rev-parse", "HEAD").strip()
        code, aus = self.lauf("--rolle", "projektleiter")
        zeile = aus.split("Fachregeln ohne")[1].split("\n")[0]
        self.assertIn("F2", zeile)
        for nr in ("F1", "F3", "F4"):
            self.assertNotIn(nr, zeile)

    def test_blind_merkt_nicht_mitgelaufen(self):
        k = json.load(open(os.path.join(self.p, ".claude", "dev-team.json")))
        k["testbefehl"] = "%s -m unittest discover -s tests -t . -p 'test_rechnung.py' -v" % sys.executable
        self.konfig(k)
        self.schreibe(".dev-team/verdeckt/test_abn_a7.py",
                      "import unittest\nclass A(unittest.TestCase):\n    def test_a7(self):\n        self.assertTrue(False)\n")
        code, aus = self.skript("verdeckt_blind.py")
        self.assertEqual(code, 1, aus)
        self.assertIn("NICHT MITGELAUFEN", aus)

    def test_fehlerprobe(self):
        code, aus = self.skript("fehlerprobe.py", "--datei", "src/rechnung.py", "--alt", "sum(w)", "--neu", "sum(w) + 1")
        self.assertEqual(code, 0, aus)
        self.assertIn("ERKANNT", aus)
        self.schreibe("src/extra.py", "def g(x):\n    return x * 2\n")
        code, aus = self.skript("fehlerprobe.py", "--datei", "src/extra.py", "--alt", "x * 2", "--neu", "x * 3")
        self.assertEqual(code, 1, aus)
        self.assertIn("NICHT ERKANNT", aus)
        self.assertEqual(open(os.path.join(self.p, "src", "extra.py")).read(), "def g(x):\n    return x * 2\n")

    def test_gruen_nachweis_im_hauptordner(self):
        self.assertEqual(self.lauf("--rolle", "tester")[0], 0)
        kopf = git(self.p, "rev-parse", "HEAD").strip()
        self.assertTrue(os.path.isfile(os.path.join(self.p, ".dev-team", "gruen", kopf)))
        # Uncommittete Codeänderung: geprüft wurde nicht der Commit → kein Nachweis
        shutil.rmtree(os.path.join(self.p, ".dev-team", "gruen"))
        self.schreibe("tests/hilfsdaten.txt", "neu\n")
        self.assertEqual(self.lauf("--rolle", "tester")[0], 0)
        self.assertFalse(os.path.exists(os.path.join(self.p, ".dev-team", "gruen", kopf)))

    def test_fehlerprobe_nutzt_node_modules(self):
        # node_modules ist ignoriert und wird nicht kopiert; ohne Verknüpfung scheiterte jeder Lauf am Import
        # und wurde fälschlich als ERKANNT gemeldet (Pilot 2026-10).
        self.schreibe("node_modules/hilfe/__init__.py", "def doppelt(x):\n    return x * 2\n")
        self.schreibe(".gitignore", ".dev-team/\n__pycache__/\n.claude/worktrees/\nnode_modules/\n")
        self.schreibe("src/extra.py", "def g(x):\n    return x + 1\n")
        befehl = "test -f node_modules/hilfe/__init__.py && %s -m unittest discover -s tests -t . -v" % sys.executable
        code, aus = self.skript("fehlerprobe.py", "--datei", "src/extra.py", "--alt", "x + 1", "--neu", "x + 2",
                                "--befehl", befehl)
        self.assertEqual(code, 1, aus)
        self.assertIn("NICHT ERKANNT", aus)
        self.assertTrue(os.path.isfile(os.path.join(self.p, "node_modules", "hilfe", "__init__.py")))

    def test_fehlerprobe_leerlauf_rot_ist_ungueltig(self):
        self.schreibe("src/rechnung.py", "def summe(w):\n    return 0\n")
        code, aus = self.skript("fehlerprobe.py", "--datei", "src/rechnung.py", "--alt", "0", "--neu", "1")
        self.assertEqual(code, 2, aus)
        self.assertIn("UNGÜLTIG", aus)
        self.assertNotIn("ERKANNT", aus)

    def test_fehlerprobe_ladefehler_ist_kein_treffer(self):
        code, aus = self.skript("fehlerprobe.py", "--datei", "src/rechnung.py", "--alt", "def summe(w):",
                                "--neu", "def summe(w)")
        self.assertEqual(code, 2, aus)
        self.assertIn("UNGÜLTIG", aus)
        self.assertIn("Lade- oder Syntaxfehler", aus)
        self.assertIn("Ladefehler: ", aus)   # nennt die Ursache, damit sie sich nachstellen lässt

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

    def test_testzahl_paralleles_paket_nicht_blockiert(self):
        # Paket B startet auf dem alten Stand; Paket A wird mit einem zusätzlichen Test gemergt. B hat diesen
        # Test noch nicht – das ist kein Testverlust (Pilot: M3-1 blockierte M3-2).
        wt = os.path.join(self.tmp, "wt-b")
        git(self.p, "worktree", "add", "-q", "-b", "paket-b", wt)
        self.schreibe("tests/test_extra.py", "import unittest\nfrom src.rechnung import summe\nclass E(unittest.TestCase):\n"
                      "    def test_e(self):\n        self.assertEqual(summe([4, 5]), 9)\n")
        git(self.p, "add", "-A")
        git(self.p, "commit", "-qm", "Paket A gemergt")
        self.assertEqual(self.lauf("--rolle", "tester")[0], 0)   # merkt sich 3 für den neuen Stand
        code, aus = self.lauf("--rolle", "entwickler", ordner=wt)
        self.assertNotIn("Weniger bestandene Tests", aus)

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

    def test_skip_varianten_aus_dem_audit(self):
        faelle = ["from unittest import skip as nicht_jetzt\n", "it.skip.each([1])('x', () => {})\n",
                  "it.skipIf(true)('x', () => {})\n", "describe.only.each([1])('x', () => {})\n",
                  "test.concurrent.skip('x', async () => {})\n", "test('x', { skip: true }, () => {})\n",
                  "    raise unittest.SkipTest('x')\n"]
        for zeile in faelle:
            self.schreibe("tests/test_neu.py", zeile + "def test_a():\n    assert 1\n")
            code, aus = self.lauf("--ohne-lauf", "--rolle", "entwickler")
            self.assertEqual(code, 1, zeile)

    def test_uebersprungene_im_testlauf(self):
        self.schreibe("tests/test_neu.py", "import unittest\nclass N(unittest.TestCase):\n"
                      "    def test_n(self):\n        self.skipTest('x')\n")
        code, aus = self.lauf("--rolle", "tester")
        self.assertEqual(code, 1)
        self.assertIn("übersprungen", aus)

    def test_test_ohne_pruefung(self):
        self.schreibe("tests/test_leer.py", "def test_nichts():\n    pass\n")
        code, aus = self.lauf("--ohne-lauf", "--rolle", "entwickler")
        self.assertEqual(code, 1)
        self.assertIn("ohne eine einzige Prüfung", aus)

    def test_teamkonfig_aenderung_braucht_freigabe(self):
        self.konfig({"testbefehl": "true", "testzahl_muster": "x"})
        code, aus = self.lauf("--ohne-lauf")
        self.assertEqual(code, 1)
        self.assertIn("dev-team.json", aus)

    def test_nachweis_fuer_fertig_pruefung(self):
        wt = os.path.join(self.tmp, "wt2")
        git(self.p, "worktree", "add", "-q", wt, "-b", "paket2")
        self.schreibe("src/neu.py", "def f():\n    return 1\n", ordner=wt)
        self.schreibe("tests/test_neu.py", "import unittest\nfrom src.neu import f\nclass N(unittest.TestCase):\n"
                      "    def test_f(self):\n        self.assertEqual(f(), 1)\n", ordner=wt)
        code, aus = self.lauf("--rolle", "entwickler", ordner=wt)
        self.assertEqual(code, 0, aus)
        self.assertIn("erst committen", aus)
        git(wt, "add", "-A")
        git(wt, "commit", "-qm", "P2")
        code, aus = self.lauf("--rolle", "entwickler", ordner=wt)
        self.assertEqual(code, 0, aus)
        kopf = git(wt, "rev-parse", "HEAD").strip()
        self.assertTrue(os.path.isfile(os.path.join(self.p, ".dev-team", "schranke-ok", kopf)))

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

    def test_nicht_utf8_dateien(self):
        # Früher Absturz mit UnicodeDecodeError, die Schranke lief gar nicht (Pilot 2026-10).
        with open(os.path.join(self.p, "requirements.txt"), "wb") as f:
            f.write("requests==2.32.3\nhuggingface-magic-tools==1.0\n".encode("utf-16"))   # PowerShell-Umleitung
        with open(os.path.join(self.p, "package.json"), "wb") as f:
            f.write(json.dumps({"description": "Größe", "dependencies": {"react": "18.3.1"}}).encode("cp1252"))
        code, aus = self.lauf({})
        self.assertEqual(code, 1, aus)
        self.assertIn("huggingface-magic-tools", aus)
        self.assertIn("existiert nicht", aus)
        self.assertNotIn("requests", aus.split("existiert nicht")[0].splitlines()[-1])

    def test_pypi_erfunden_und_ungepinnt(self):
        self.schreibe("requirements.txt", "requests==2.32.3\nhuggingface-magic-tools\n")
        code, aus = self.lauf({})
        self.assertEqual(code, 1)
        self.assertIn("existiert nicht", aus)
        self.assertIn("ohne feste Version", aus)

    def test_direkte_quellen_python(self):
        self.schreibe("requirements.txt", "requests==2.32.3\ngit+https://github.com/angreifer/boese.git\n"
                      "paket @ https://example.com/p.whl\n")
        code, aus = self.lauf({})
        self.assertEqual(code, 1)
        self.assertEqual(aus.count("direkte Quelle"), 2)

    def test_pyproject_mit_extras_und_optional(self):
        self.schreibe("pyproject.toml", '[project]\nname="x"\ndependencies = ["requests[socks]==2.31.0", "erfunden-xyz==1.0"]\n'
                      '[project.optional-dependencies]\ndev = ["auch-erfunden-abc"]\n')
        code, aus = self.lauf({"pypi.org/pypi/requests": {"releases": {"1": [{"upload_time_iso_8601": "2015-01-01T00:00:00Z"}],
                                                                         "2": [{}], "3": [{}]}}})
        self.assertEqual(code, 1)
        self.assertIn("erfunden-xyz", aus)
        self.assertIn("auch-erfunden-abc", aus)

    def test_npm_alias_und_github(self):
        self.schreibe("package.json", json.dumps({"dependencies": {"react": "18.3.1", "lodash": "npm:boeses-paket@1.0.0",
                                                                    "helfer": "github:angreifer/helfer"}}))
        self.schreibe("package-lock.json", '{"x":2}')
        code, aus = self.lauf({})
        self.assertEqual(code, 1)
        self.assertIn("boeses-paket", aus)
        self.assertIn("direkter Quelle", aus)

    def test_nuget(self):
        self.schreibe("App.csproj", '<Project><ItemGroup><PackageReference Include="Erfunden.Paket" Version="1.0" />'
                      '<PackageReference Include="Newtonsoft.Json" Version="13.0.3" /></ItemGroup></Project>')
        code, aus = self.lauf({"newtonsoft.json/index.json": {"versions": ["1", "2", "13.0.3"]}})
        self.assertEqual(code, 1)
        self.assertIn("erfunden.paket", aus)
        self.assertIn("NuGet 'newtonsoft.json'", aus)

    def test_andere_paketsysteme_warnung(self):
        self.schreibe("Cargo.toml", "[dependencies]\nserde = '1'\n")
        code, aus = self.lauf({})
        self.assertIn("prüft die Schranke nicht", aus)

    def test_paketquelle_umgelenkt(self):
        self.schreibe(".npmrc", "registry=https://boese.example/\n")
        code, aus = self.lauf({})
        self.assertEqual(code, 1, aus)
        self.assertIn(".npmrc", aus)

    def test_uv_index_in_pyproject(self):
        self.schreibe("pyproject.toml", "[project]\nname='x'\ndependencies=[]\n\n[[tool.uv.index]]\n"
                      "url='https://boese.example/simple'\n")
        code, aus = self.lauf({})
        self.assertEqual(code, 1, aus)
        self.assertIn("Paketquelle", aus)

    def test_typosquatting(self):
        abh = lade_abh()
        self.assertEqual(abh.aehnlich_bekannt("reqeusts", "pypi"), "requests")
        self.assertEqual(abh.aehnlich_bekannt("lodahs", "npm"), "lodash")
        self.assertIsNone(abh.aehnlich_bekannt("requests", "pypi"))
        self.assertIsNone(abh.aehnlich_bekannt("nest", "npm"))

    def test_overrides_und_lockfile(self):
        abh = lade_abh()
        self.assertEqual(abh.npm_namen('{"overrides": {"lodash": "github:evil/lodash"}}'), {"lodash": "github:evil/lodash"})
        self.assertEqual(abh.fremde_lock_quellen("package-lock.json", '{"resolved": "https://evil.example/x.tgz"}'),
                         {"https://evil.example/x.tgz"})
        self.assertEqual(abh.fremde_lock_quellen("package-lock.json",
                                                 '{"resolved": "https://registry.npmjs.org/a/-/a-1.tgz"}'), set())

    def test_pypi_echt(self):
        self.schreibe("requirements.txt", "requests==2.32.3\nhttpx==0.27.0\n")
        rel = {"upload_time_iso_8601": "2019-01-01T00:00:00Z"}
        code, aus = self.lauf({"pypi.org/pypi/httpx": {"releases": {"0.1": [rel], "0.2": [rel], "0.27.0": [rel]}}})
        self.assertEqual(code, 0, aus)



class FertigPruefung(unittest.TestCase):
    SKRIPT = os.path.join(PLUGIN, "scripts", "fertig_pruefung.py")

    def setUp(self):
        self.p = tempfile.mkdtemp(prefix="fertig-")
        os.makedirs(os.path.join(self.p, ".claude"))
        os.makedirs(os.path.join(self.p, "docs"))
        open(os.path.join(self.p, ".claude", "dev-team.json"), "w").write("{}")
        open(os.path.join(self.p, ".gitignore"), "w").write(".dev-team/\n.claude/worktrees/\ndocs/\n")
        git(self.p, "init", "-q")
        git(self.p, "add", "-A")
        git(self.p, "commit", "-qm", "start")
        self.wt = os.path.join(self.p, ".claude", "worktrees", "p1")
        git(self.p, "worktree", "add", "-q", self.wt, "-b", "p1")
        open(os.path.join(self.wt, "a.txt"), "w").write("1")
        git(self.wt, "add", "-A")
        git(self.wt, "commit", "-qm", "p1")
        self.kopf = git(self.wt, "rev-parse", "HEAD").strip()

    def tearDown(self):
        shutil.rmtree(self.p, ignore_errors=True)

    def lauf(self, nachricht, aktiv=False, agent="dev-team:entwickler"):
        e = {"agent_type": agent, "last_assistant_message": nachricht, "stop_hook_active": aktiv, "cwd": self.p,
             "agent_id": "x1"}
        r = subprocess.run([sys.executable, self.SKRIPT], input=json.dumps(e), capture_output=True, text=True,
                           env=dict(os.environ, CLAUDE_PROJECT_DIR=self.p))
        return r.stdout

    def marker(self, kopf):
        os.makedirs(os.path.join(self.p, ".dev-team", "schranke-ok"), exist_ok=True)
        open(os.path.join(self.p, ".dev-team", "schranke-ok", kopf), "w").close()

    def test_fertig_ohne_nachweis_wird_zurueckgewiesen(self):
        aus = self.lauf("**Status:** FERTIG 🟢\nWorktree %s\nCommit %s" % (self.wt, self.kopf))
        self.assertIn('"decision": "block"', aus)

    def test_fertig_mit_nachweis(self):
        self.marker(self.kopf)
        self.assertEqual(self.lauf("Status: FERTIG\nWorktree %s\nCommit %s" % (self.wt, self.kopf)).strip(), "")

    def test_kleingeschrieben_und_ohne_worktree(self):
        self.marker(self.kopf)
        self.assertIn('"decision": "block"', self.lauf("status: fertig\nCommit " + self.kopf))

    def test_fremder_marker_reicht_nicht(self):
        self.marker("b" * 40)
        aus = self.lauf("Status: FERTIG\nWorktree %s\nCommit %s" % (self.wt, "b" * 40))
        self.assertIn('"decision": "block"', aus)

    def test_nicht_committet_reicht_nicht(self):
        self.marker(self.kopf)
        open(os.path.join(self.wt, "b.txt"), "w").write("offen")
        aus = self.lauf("Status: FERTIG\nWorktree %s\nCommit %s" % (self.wt, self.kopf))
        self.assertIn("nicht committete", aus)

    def test_hoechstens_zwei_zurueckweisungen(self):
        for _ in range(2):
            self.assertIn('"decision": "block"', self.lauf("Status: FERTIG 🟢"))
        self.assertEqual(self.lauf("Status: FERTIG 🟢").strip(), "")
        with open(os.path.join(self.p, "docs", "AGENTEN_LOG.md"), encoding="utf-8") as f:
            self.assertIn("NICHT belegt", f.read())

    def test_satzzeichen_und_eigener_worktree(self):
        self.marker(self.kopf)
        self.assertEqual(self.lauf("Status: FERTIG\nWorktree %s, Commit %s." % (self.wt, self.kopf)).strip(), "")
        self.assertEqual(self.lauf("Status: FERTIG\nWorktree `%s`.\nCommit %s" % (self.wt, self.kopf)).strip(), "")

    def test_ehrlich_blockiert_wird_nie_aufgehalten(self):
        self.assertEqual(self.lauf("Status: BLOCKIERT 🔴 – Ausgangslage rot").strip(), "")

    def test_zweiter_versuch_wird_protokolliert(self):
        self.assertEqual(self.lauf("Status: FERTIG 🟢", aktiv=True).strip(), "")
        with open(os.path.join(self.p, "docs", "AGENTEN_LOG.md"), encoding="utf-8") as f:
            self.assertIn("NICHT belegt", f.read())

    def test_andere_agenten_unberuehrt(self):
        self.assertEqual(self.lauf("🟢 alles gut", agent="dev-team:reviewer").strip(), "")

if __name__ == "__main__":
    unittest.main()
