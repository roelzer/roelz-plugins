"""Tests für den Durchlauf-Wächter (durchlauf.sh) und die Sicherung der verdeckten Tests (verdeckt_sichern.py).
Ausführen:
    python3 -m unittest discover -s plugins/dev-team/tests -v
"""

import json
import os
import shutil
import subprocess
import sys
import tempfile
import time
import unittest

PLUGIN = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
DURCHLAUF = os.path.join(PLUGIN, "scripts", "durchlauf.sh")
SICHERN = os.path.join(PLUGIN, "scripts", "verdeckt_sichern.py")
PRUEFSUMMEN = os.path.join(PLUGIN, "scripts", "abnahme_pruefsummen.py")


def git(cwd, *args):
    return subprocess.run(["git", "-c", "user.email=t@t", "-c", "user.name=t", *args], cwd=cwd, check=True,
                          capture_output=True, text=True).stdout


class TestDurchlauf(unittest.TestCase):
    def setUp(self):
        self.p = tempfile.mkdtemp(prefix="durchlauf-")
        os.makedirs(os.path.join(self.p, ".dev-team"))

    def tearDown(self):
        shutil.rmtree(self.p, ignore_errors=True)

    def stop(self, aktiv=False):
        r = subprocess.run(["bash", DURCHLAUF], input=json.dumps({"stop_hook_active": aktiv}), text=True,
                           capture_output=True, env=dict(os.environ, CLAUDE_PROJECT_DIR=self.p))
        self.assertEqual(r.returncode, 0, r.stderr)
        return json.loads(r.stdout) if r.stdout.strip() else None

    def an(self):
        with open(os.path.join(self.p, ".dev-team", "durchlauf"), "w") as f:
            f.write("an\n")

    def kennzahl(self, ereignis):
        with open(os.path.join(self.p, ".dev-team", "kennzahlen.jsonl"), "a") as f:
            f.write('{"ereignis":"%s","ts":%d,"agent":"entwickler"}\n' % (ereignis, int(time.time()) + 1))

    def test_ohne_marke_frei(self):
        self.assertIsNone(self.stop())

    def test_mit_marke_zurueck_an_die_arbeit(self):
        self.an()
        antwort = self.stop()
        self.assertEqual(antwort["decision"], "block")
        self.assertIn("mach weiter", antwort["reason"])
        self.assertIsNone(self.stop(aktiv=True))  # nie eine Endlosschleife

    def test_laufender_agent_darf_warten(self):
        self.an()
        self.kennzahl("start")
        self.assertIsNone(self.stop())
        self.kennzahl("ende")
        self.assertEqual(self.stop()["decision"], "block")


class TestVerdecktSichern(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.mkdtemp(prefix="verdeckt-")
        self.fern = os.path.join(self.tmp, "fern.git")
        self.p = os.path.join(self.tmp, "projekt")
        git(self.tmp, "init", "-q", "--bare", self.fern)
        os.makedirs(os.path.join(self.p, "docs"))
        os.makedirs(os.path.join(self.p, ".dev-team", "verdeckt"))
        with open(os.path.join(self.p, ".gitignore"), "w") as f:
            f.write(".dev-team/\n")
        with open(os.path.join(self.p, ".dev-team", "verdeckt", "a1.test.ts"), "w") as f:
            f.write("test('A1', () => {})\n")
        git(self.p, "init", "-q")
        git(self.p, "remote", "add", "origin", self.fern)
        subprocess.run([sys.executable, PRUEFSUMMEN, "--schreiben"], cwd=self.p, check=True, capture_output=True)
        git(self.p, "add", "-A")
        git(self.p, "commit", "-qm", "Plan freigegeben")

    def tearDown(self):
        shutil.rmtree(self.tmp, ignore_errors=True)

    def skript(self, arg, ordner=None):
        r = subprocess.run([sys.executable, SICHERN, arg], cwd=ordner or self.p, capture_output=True, text=True)
        return r.returncode, r.stdout + r.stderr

    def test_sichern_und_in_neuer_sitzung_holen(self):
        stand = git(self.p, "status", "--porcelain")
        code, aus = self.skript("--sichern")
        self.assertEqual(code, 0, aus)
        self.assertIn("GESICHERT", aus)
        self.assertEqual(git(self.p, "status", "--porcelain"), stand)   # Arbeitsordner und Index unberührt
        self.assertEqual(self.skript("--sichern")[0], 0)               # zweimal: kein neuer Commit nötig
        self.assertEqual(git(self.fern, "rev-list", "--count", "dev-team-verdeckt").strip(), "1")
        # Neue Sitzung = frischer Klon ohne .dev-team/
        neu = os.path.join(self.tmp, "neu")
        git(self.tmp, "clone", "-q", self.fern, neu)
        git(neu, "fetch", "-q", self.p, "HEAD")
        git(neu, "checkout", "-q", "FETCH_HEAD")
        code, aus = self.skript("--holen", neu)
        self.assertEqual(code, 0, aus)
        self.assertIn("Prüfsummen stimmen", aus)
        with open(os.path.join(neu, ".dev-team", "verdeckt", "a1.test.ts")) as f:
            self.assertIn("A1", f.read())
        self.assertIn("NICHTS ZU HOLEN", self.skript("--holen", neu)[1])

    def test_ohne_remote_nur_lokal(self):
        git(self.p, "remote", "remove", "origin")
        code, aus = self.skript("--sichern")
        self.assertEqual(code, 1, aus)
        self.assertIn("NUR LOKAL", aus)


if __name__ == "__main__":
    unittest.main()
