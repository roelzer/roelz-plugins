"""Tests für die Sicherheits-Schranke (pruefe_sicherheit.py) und ihre Einbindung in die Test-Schranke.
Ausführen:
    python3 -m unittest discover -s plugins/dev-team/tests -v
"""

import json
import os
import shutil
import subprocess
import sys
import tempfile
import unittest

PLUGIN = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SKRIPT = os.path.join(PLUGIN, "scripts", "pruefe_sicherheit.py")
SCHRANKE = os.path.join(PLUGIN, "scripts", "pruefe-tests.sh")
# Testwerte werden zusammengesetzt, damit dieses Repo selbst keinen „Schlüssel“ enthält.
AWS = "AKIA" + "Q3EXAMPLEKEY7Z2B"
GITHUB = "ghp_" + "a1B2c3D4e5F6g7H8i9J0k1L2m3N4o5P6q7R8"


def git(cwd, *args):
    return subprocess.run(["git", "-c", "user.email=t@t", "-c", "user.name=t", *args], cwd=cwd, check=True,
                          capture_output=True, text=True).stdout


class TestSicherheit(unittest.TestCase):
    def setUp(self):
        self.p = tempfile.mkdtemp(prefix="sicherheit-")
        self.schreibe("src/app.ts", "export const a = 1\n")
        self.schreibe(".gitignore", ".dev-team/\n.env\n")
        git(self.p, "init", "-q")
        git(self.p, "add", "-A")
        git(self.p, "commit", "-qm", "start")
        self.basis = git(self.p, "rev-parse", "HEAD").strip()

    def tearDown(self):
        shutil.rmtree(self.p, ignore_errors=True)

    def schreibe(self, rel, inhalt):
        pfad = os.path.join(self.p, rel)
        os.makedirs(os.path.dirname(pfad), exist_ok=True)
        with open(pfad, "w", encoding="utf-8") as f:
            f.write(inhalt)

    def lauf(self, *args):
        r = subprocess.run([sys.executable, SKRIPT, *args], cwd=self.p, capture_output=True, text=True)
        return r.returncode, r.stdout

    def basislauf(self):
        return self.lauf("--basis", self.basis)

    def test_schluessel_bekannter_anbieter_ohne_ausnahme(self):
        for wert in (AWS, GITHUB):
            self.schreibe("src/app.ts", 'const k = "%s" // dev-team: sicher – nur ein Test\n' % wert)
            code, aus = self.basislauf()
            self.assertEqual(code, 1, aus)
            self.assertNotIn(wert, aus)                  # nie den Wert ausgeben
            self.assertIn("neu erzeugen", aus)

    def test_fester_wert_und_platzhalter(self):
        self.schreibe("src/app.ts", 'const apiKey = "a8f9c2e1b7d64f0a9c3e"\n')
        self.assertEqual(self.basislauf()[0], 1)
        self.schreibe("src/app.ts", 'const apiKey = process.env.API_KEY\nconst password = "changeme-bitte"\n')
        self.assertEqual(self.basislauf()[0], 0)

    def test_browser_variablen(self):
        self.schreibe("src/app.ts", "const k = import.meta.env.VITE_OPENAI_API_KEY\n")
        code, aus = self.basislauf()
        self.assertEqual(code, 1, aus)
        self.assertIn("ausgelieferten Code", aus)
        self.schreibe("src/app.ts", "const k = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY\n"
                                    "const s = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY\n")
        self.assertEqual(self.basislauf()[0], 0)
        self.schreibe(".env.example", "NEXT_PUBLIC_DB_PASSWORD=\n")
        self.assertEqual(self.basislauf()[0], 1)

    def test_gefaehrliche_muster_und_begruendete_ausnahme(self):
        faelle = ["el.innerHTML = nutzer.name", 'db.query("SELECT * FROM k WHERE id = " + id)',
                  "res.sendFile(req.query.datei)", "await fetch(req.body.url)", "res.redirect(req.query.ziel)",
                  "await Kunde.create(req.body)", "res.status(500).send(err)", "try { x() } catch (e) {}",
                  'localStorage.setItem("authToken", t)', 'app.use(cors({ origin: "*" }))',
                  "const token = Math.random().toString(36)"]
        for zeile in faelle:
            self.schreibe("src/app.ts", zeile + "\n")
            self.assertEqual(self.basislauf()[0], 1, zeile)
        self.schreibe("src/app.ts", 'el.innerHTML = "<b>Hallo</b>" // dev-team: sicher – fester Text\n')
        code, aus = self.basislauf()
        self.assertEqual(code, 0, aus)
        self.assertIn("als geprüft markiert", aus)

    def test_python_muster(self):
        for zeile in ("cur.execute(f\"SELECT * FROM t WHERE n = '{name}'\")", "subprocess.run(c, shell=True)",
                      "requests.get(u, verify=False)", "daten = pickle.loads(roh)", "try:\n    x()\nexcept Exception:\n    pass"):
            self.schreibe("src/job.py", zeile + "\n")
            self.assertEqual(self.basislauf()[0], 1, zeile)
        self.schreibe("src/job.py", 'cur.execute("SELECT * FROM t WHERE n = %s", (name,))\nlabel = "Delete " + name\n')
        self.assertEqual(self.basislauf()[0], 0)

    def test_tests_und_unterlagen(self):
        self.schreibe("tests/app.test.ts", 'const password = "geheim12345"\nel.innerHTML = x\n')
        self.schreibe("docs/entwurf.html", "<script>el.innerHTML = daten</script>\n")
        code, aus = self.basislauf()
        self.assertEqual(code, 0, aus)                    # Testwerte nur Warnung, Entwürfe ohne Musterprüfung
        self.schreibe("docs/notiz.md", "Schlüssel: %s\n" % AWS)
        self.assertEqual(self.basislauf()[0], 1)          # Geheimnisse überall

    def test_versionierte_env_datei(self):
        self.schreibe(".env.local", "X=1\n")
        git(self.p, "add", "-f", ".env.local")
        self.assertEqual(self.basislauf()[0], 1)
        self.assertEqual(self.lauf("--alles")[0], 1)

    def test_build_enthaelt_server_geheimnis(self):
        self.schreibe(".env", "DB_PASSWORD=supergeheim123456\nVITE_TITEL=Mein-Titel-lang-genug\n")
        self.schreibe("dist/assets/app.js", 'var t="Mein-Titel-lang-genug";\n')
        self.assertEqual(self.lauf("--build")[0], 0)
        self.schreibe("dist/assets/app.js", 'var p="supergeheim123456";\n')
        code, aus = self.lauf("--build")
        self.assertEqual(code, 1, aus)
        self.assertIn("DB_PASSWORD", aus)
        self.assertNotIn("supergeheim", aus)

    def test_historie(self):
        self.schreibe("src/alt.ts", 'const k = "%s"\n' % GITHUB)
        git(self.p, "add", "-A")
        git(self.p, "commit", "-qm", "versehentlich")
        os.remove(os.path.join(self.p, "src", "alt.ts"))
        git(self.p, "commit", "-qam", "entfernt")
        code, aus = self.lauf("--historie")
        self.assertEqual(code, 1, aus)
        self.assertIn("Historie", aus)

    def test_schranke_sperrt_jede_rolle(self):
        self.schreibe(".claude/dev-team.json", json.dumps({"testbefehl": "true"}))
        git(self.p, "add", "-A")
        git(self.p, "commit", "-qm", "konfig")
        self.basis = git(self.p, "rev-parse", "HEAD").strip()
        self.schreibe("src/app.ts", "el.innerHTML = nutzer.name\n")
        for rolle in ("entwickler", "tester", "projektleiter"):
            r = subprocess.run(["bash", SCHRANKE, "--basis", self.basis, "--rolle", rolle, "--ohne-lauf"], cwd=self.p,
                               capture_output=True, text=True)
            self.assertEqual(r.returncode, 1, rolle + r.stdout)
            self.assertIn("Sicherheit: HTML aus Daten", r.stdout)


if __name__ == "__main__":
    unittest.main()
