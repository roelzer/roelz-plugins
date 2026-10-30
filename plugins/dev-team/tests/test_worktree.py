"""Tests für scripts/worktree_vorbereiten.py (node_modules wiederverwenden statt npm ci je Paket)."""

import json
import os
import shutil
import subprocess
import sys
import tempfile
import unittest

PLUGIN = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SKRIPT = os.path.join(PLUGIN, "scripts", "worktree_vorbereiten.py")


def git(cwd, *args):
    subprocess.run(["git", *args], cwd=cwd, check=True, capture_output=True)


class WorktreeVorbereiten(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.mkdtemp(prefix="wt-")
        self.haupt = os.path.join(self.tmp, "projekt")
        os.makedirs(os.path.join(self.haupt, ".claude"))
        self.schreibe(self.haupt, "package-lock.json", '{"lockfileVersion": 3}')
        self.schreibe(self.haupt, ".gitignore", "node_modules/\n")
        self.schreibe(self.haupt, ".claude/dev-team.json", json.dumps({"setup": "echo lief > setup-lief.txt"}))
        git(self.haupt, "init", "-q")
        git(self.haupt, "add", "-A")
        git(self.haupt, "-c", "user.email=t@t", "-c", "user.name=t", "commit", "-qm", "start")
        os.makedirs(os.path.join(self.haupt, "node_modules", "three"))
        self.wt = os.path.join(self.haupt, ".claude", "worktrees", "p1")
        git(self.haupt, "worktree", "add", "-q", "-b", "p1", self.wt)

    def tearDown(self):
        shutil.rmtree(self.tmp, ignore_errors=True)

    def schreibe(self, ordner, rel, inhalt):
        pfad = os.path.join(ordner, rel)
        os.makedirs(os.path.dirname(pfad), exist_ok=True)
        with open(pfad, "w") as f:
            f.write(inhalt)

    def lauf(self, *args):
        r = subprocess.run([sys.executable, SKRIPT, *args], cwd=self.wt, capture_output=True, text=True)
        return r.returncode, r.stdout

    def test_gleiche_lockdatei_verknuepft(self):
        code, aus = self.lauf()
        self.assertEqual(code, 0, aus)
        self.assertIn("übernommen", aus)
        self.assertTrue(os.path.isdir(os.path.join(self.wt, "node_modules", "three")))
        self.assertFalse(os.path.exists(os.path.join(self.wt, "setup-lief.txt")))
        self.assertEqual(self.lauf()[0], 0)  # zweiter Lauf: nichts zu tun
        # Verknüpfung landet nicht im Commit
        r = subprocess.run(["git", "status", "--porcelain"], cwd=self.wt, capture_output=True, text=True)
        self.assertNotIn("node_modules", r.stdout)

    def test_ausgangslage_belegt_gruen(self):
        # Wurde der Startpunkt nach dem Merge im Hauptordner grün geprüft, entfällt der zweite volle Lauf.
        self.assertNotIn("BELEGT GRÜN", self.lauf()[1])
        kopf = subprocess.run(["git", "rev-parse", "HEAD"], cwd=self.wt, capture_output=True, text=True).stdout.strip()
        self.schreibe(self.haupt, ".dev-team/gruen/" + kopf, "2026-10-30T10:00 rolle=merge bestanden=12")
        code, aus = self.lauf()
        self.assertEqual(code, 0, aus)
        self.assertIn("AUSGANGSLAGE BELEGT GRÜN", aus)
        self.schreibe(self.wt, "neu.txt", "x")  # nicht sauber → kein Beleg
        self.assertNotIn("BELEGT GRÜN", self.lauf()[1])

    def test_andere_lockdatei_fuehrt_setup_aus(self):
        self.schreibe(self.wt, "package-lock.json", '{"lockfileVersion": 3, "x": 1}')
        code, aus = self.lauf()
        self.assertEqual(code, 0, aus)
        self.assertIn("weicht", aus)
        self.assertTrue(os.path.exists(os.path.join(self.wt, "setup-lief.txt")))

    def test_trennen_loescht_nie_den_inhalt_im_hauptordner(self):
        self.lauf()
        code, aus = self.lauf("--trennen")
        self.assertEqual(code, 0, aus)
        self.assertFalse(os.path.islink(os.path.join(self.wt, "node_modules")))
        self.assertTrue(os.path.isdir(os.path.join(self.haupt, "node_modules", "three")))
        self.assertTrue(os.path.exists(os.path.join(self.wt, "setup-lief.txt")))

    def test_ohne_gitignore_keine_verknuepfung(self):
        with open(os.path.join(self.wt, ".gitignore"), "w") as f:
            f.write("")
        code, aus = self.lauf()
        self.assertEqual(code, 0, aus)
        self.assertIn(".gitignore", aus)
        self.assertFalse(os.path.islink(os.path.join(self.wt, "node_modules")))


if __name__ == "__main__":
    unittest.main()
