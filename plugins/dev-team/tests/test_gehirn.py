"""Tests für scripts/gehirn.py (Schreiben ins Obsidian-Gehirn)."""
import os
import subprocess
import sys
import tempfile
import unittest

PLUGIN = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SKRIPT = os.path.join(PLUGIN, "scripts", "gehirn.py")


def git(w, *a):
    return subprocess.run(["git", *a], cwd=w, capture_output=True, text=True)


class Gehirn(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.TemporaryDirectory()
        self.w = os.path.join(self.tmp.name, "brain")
        os.makedirs(os.path.join(self.w, "01 Projekte"))
        os.makedirs(os.path.join(self.w, "05 Lektionen"))
        os.makedirs(os.path.join(self.w, "04 Entscheidungen"))
        dateien = {
            "00 Start.md": "---\ntyp: start\nstand: 2026-01-01\n---\n# Start\n\n## Wissen\n- [[Alt]]\n",
            "01 Projekte/Projektübersicht.md": "---\ntyp: übersicht\nstand: 2026-01-01\n---\n# Projekte\n\n| Projekt | Status | Fachgebiet | Ort |\n|---|---|---|---|\n| [[Alt]] | aktiv | x | y |\n",
            "05 Lektionen/Lektionen.md": "---\ntyp: übersicht\nstand: 2026-01-01\n---\n# Lektionen\n\n## Wo was steht\n- alt\n",
            "04 Entscheidungen/Entscheidungslog.md": "---\ntyp: log\nstand: 2026-01-01\n---\n# Log\n\n- 2026-01-01 – A – B\n",
            "Sperrwörter.md": "# Sperrwörter\n\n- Geheimfirma\n",
        }
        for n, t in dateien.items():
            with open(os.path.join(self.w, n), "w", encoding="utf-8") as f:
                f.write(t)
        git(self.w, "init", "-q")
        git(self.w, "-c", "user.name=t", "-c", "user.email=t@t", "add", "-A")
        git(self.w, "-c", "user.name=t", "-c", "user.email=t@t", "commit", "-q", "-m", "start")
        self.env = dict(os.environ, DEV_TEAM_GEHIRN_TEST=self.w)

    def tearDown(self):
        self.tmp.cleanup()

    def lauf(self, *a):
        return subprocess.run([sys.executable, SKRIPT, *a], capture_output=True, text=True, env=self.env)

    def datei(self, n):
        with open(os.path.join(self.w, n), encoding="utf-8") as f:
            return f.read()

    def schreib(self, n, t):
        p = os.path.join(self.tmp.name, n)
        with open(p, "w", encoding="utf-8") as f:
            f.write(t)
        return p

    def test_projekt_anlegen_und_aktualisieren(self):
        s = self.schreib("s.md", "Alle 10 Tests grün.")
        r = self.lauf("projekt", "--name", "Neu", "--status", "aktiv", "--stand-datei", s, "--fachgebiet", "Netz")
        self.assertEqual(r.returncode, 0, r.stdout + r.stderr)
        notiz = self.datei("01 Projekte/Neu.md")
        self.assertIn("status: aktiv", notiz)
        self.assertIn("Alle 10 Tests grün.", notiz)
        self.assertIn("[[Neu]]", self.datei("01 Projekte/Projektübersicht.md"))
        # Handnotiz außerhalb des Blocks bleibt beim Aktualisieren erhalten.
        with open(os.path.join(self.w, "01 Projekte/Neu.md"), "a", encoding="utf-8") as f:
            f.write("\nMeine Notiz von Hand.\n")
        s2 = self.schreib("s2.md", "Fertig, 12 Tests grün.")
        r = self.lauf("projekt", "--name", "Neu", "--status", "fertig", "--stand-datei", s2)
        self.assertEqual(r.returncode, 0, r.stdout)
        notiz = self.datei("01 Projekte/Neu.md")
        self.assertIn("Meine Notiz von Hand.", notiz)
        self.assertIn("Fertig, 12 Tests grün.", notiz)
        self.assertNotIn("Alle 10 Tests grün.", notiz)
        self.assertIn("status: fertig", notiz)
        self.assertIn("| [[Neu]] | fertig |", self.datei("01 Projekte/Projektübersicht.md"))
        self.assertIn("Dev-Team: Projektstand Neu", git(self.w, "log", "--oneline").stdout)

    def test_lektion_vorschlag_bestaetigt_und_doppelt(self):
        self.assertEqual(self.lauf("lektion", "--text", "[A] Regel eins. (X, 2026)").returncode, 0)
        self.assertEqual(self.lauf("lektion", "--text", "[A] Regel zwei. (X, 2026)", "--bestaetigt").returncode, 0)
        r = self.lauf("lektion", "--text", "[A] Regel zwei. (X, 2026)", "--bestaetigt")
        self.assertIn("Steht schon", r.stdout)
        t = self.datei("05 Lektionen/Dev-Team-Lektionen.md")
        teil_bestaetigt = t.split("## Vorgeschlagen")[0]
        self.assertIn("Regel zwei", teil_bestaetigt)
        self.assertNotIn("Regel eins", teil_bestaetigt)
        self.assertEqual(t.count("Regel zwei"), 1)
        self.assertIn("[[Dev-Team-Lektionen]]", self.datei("05 Lektionen/Lektionen.md"))

    def test_entscheidung_wird_angehaengt(self):
        r = self.lauf("entscheidung", "--text", "Wir nehmen X", "--grund", "weil Y", "--betrifft", "Neu")
        self.assertEqual(r.returncode, 0)
        log = self.datei("04 Entscheidungen/Entscheidungslog.md")
        self.assertIn("- 2026-01-01 – A – B", log)
        self.assertIn("Wir nehmen X – weil Y Betrifft: [[Neu]]", log)

    def test_wissen_anlegen_und_nichts_streichen(self):
        w = self.schreib("w.md", "Zeile eins\nZeile zwei\n")
        self.assertEqual(self.lauf("wissen", "--titel", "Rohre", "--datei", w).returncode, 0)
        self.assertIn("[[Rohre]]", self.datei("00 Start.md"))
        w2 = self.schreib("w2.md", "Zeile eins\n")
        r = self.lauf("wissen", "--titel", "Rohre", "--datei", w2)
        self.assertEqual(r.returncode, 1)
        self.assertIn("Zeile zwei", self.datei("02 Wissen/Rohre.md"))
        w3 = self.schreib("w3.md", self.datei("02 Wissen/Rohre.md") + "Zeile drei\n")
        self.assertEqual(self.lauf("wissen", "--titel", "Rohre", "--datei", w3).returncode, 0)
        self.assertIn("Zeile drei", self.datei("02 Wissen/Rohre.md"))

    def test_wissen_ohne_doppelte_ueberschrift(self):
        w = self.schreib("u.md", "# Mein Thema\n\nText\n")
        self.assertEqual(self.lauf("wissen", "--titel", "Mein Thema", "--datei", w).returncode, 0)
        self.assertEqual(self.datei("02 Wissen/Mein Thema.md").count("# Mein Thema"), 1)

    def test_zugangsdaten_und_sperrwoerter_werden_geblockt(self):
        vorher = git(self.w, "rev-parse", "HEAD").stdout
        for text in ("token: ghp_abcdefghijklmnopqrstuvwxyz0123", "passwort = Geheim12345",
                     "-----BEGIN RSA PRIVATE KEY-----", "Bei der Geheimfirma gilt X"):
            r = self.lauf("lektion", "--text", text)
            self.assertEqual(r.returncode, 1, text)
        self.assertEqual(git(self.w, "rev-parse", "HEAD").stdout, vorher)
        self.assertFalse(os.path.exists(os.path.join(self.w, "05 Lektionen/Dev-Team-Lektionen.md")))

    def test_ohne_gehirn_hinweis(self):
        env = dict(self.env, DEV_TEAM_GEHIRN_TEST=os.path.join(self.tmp.name, "fehlt"))
        r = subprocess.run([sys.executable, SKRIPT, "lektion", "--text", "x"], capture_output=True, text=True, env=env)
        self.assertEqual(r.returncode, 3)
        self.assertIn("GEHIRN_NACHTRAG", r.stdout)

    def test_einrichten_traegt_gehirn_ein(self):
        heim = os.path.join(self.tmp.name, "heim")
        os.makedirs(heim)
        env = dict(os.environ, HOME=heim, USERPROFILE=heim)
        block = os.path.join(PLUGIN, "scripts", "claude_md_block.py")
        lessons = os.path.join(PLUGIN, "wissen", "lessons.md")
        r = subprocess.run([sys.executable, block, "--modus", "privat", "--lessons", lessons, "--gehirn",
                            self.tmp.name, "--schreiben"], capture_output=True, text=True, env=env)
        self.assertEqual(r.returncode, 1, "Ordner ohne 00 Start.md darf nicht als Gehirn gelten")
        r = subprocess.run([sys.executable, block, "--modus", "privat", "--lessons", lessons, "--gehirn", self.w,
                            "--schreiben"], capture_output=True, text=True, env=env)
        self.assertEqual(r.returncode, 0, r.stdout)
        with open(os.path.join(heim, ".claude", "CLAUDE.md"), encoding="utf-8") as f:
            self.assertIn("Gehirn: " + self.w.replace("\\", "/"), f.read())


class GehirnAbgleich(unittest.TestCase):
    """Sitzungsstart holt Lektionen, die auf dem anderen Laptop geschrieben wurden."""

    def test_zweiter_laptop_bekommt_neue_lektion(self):
        with tempfile.TemporaryDirectory() as t:
            quelle = os.path.join(t, "start")
            os.makedirs(os.path.join(quelle, "05 Lektionen"))
            with open(os.path.join(quelle, "00 Start.md"), "w", encoding="utf-8") as f:
                f.write("# Start\n")
            git(quelle, "init", "-q")
            git(quelle, "-c", "user.name=t", "-c", "user.email=t@t", "add", "-A")
            git(quelle, "-c", "user.name=t", "-c", "user.email=t@t", "commit", "-q", "-m", "start")
            remote = os.path.join(t, "remote.git")
            subprocess.run(["git", "clone", "-q", "--bare", quelle, remote], check=True)
            a, b = os.path.join(t, "a"), os.path.join(t, "b")
            subprocess.run(["git", "clone", "-q", remote, a], check=True)
            subprocess.run(["git", "clone", "-q", remote, b], check=True)
            r = subprocess.run([sys.executable, SKRIPT, "lektion", "--text", "[T] Regel von A. (T, 2026)", "--bestaetigt"],
                               capture_output=True, text=True, env=dict(os.environ, DEV_TEAM_GEHIRN_TEST=a))
            self.assertEqual(r.returncode, 0, r.stdout)
            heim = os.path.join(t, "heim", ".claude")
            os.makedirs(heim)
            with open(os.path.join(heim, "CLAUDE.md"), "w", encoding="utf-8") as f:
                f.write("<!-- dev-team START -->\nGehirn: %s\n@x/wissen/grundgesetz.md\n<!-- dev-team END -->\n"
                        % b.replace("\\", "/"))
            env = dict(os.environ, HOME=os.path.dirname(heim), CLAUDE_PLUGIN_ROOT=PLUGIN, CLAUDE_PROJECT_DIR=t)
            aus = subprocess.run(["bash", os.path.join(PLUGIN, "scripts", "sitzungsstart.sh")], input="{}",
                                 capture_output=True, text=True, env=env).stdout
            self.assertIn("abgeglichen mit GitHub", aus)
            self.assertIn("Regel von A", aus)


if __name__ == "__main__":
    unittest.main()
