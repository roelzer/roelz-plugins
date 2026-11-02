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
KONTEXT = os.path.join(PLUGIN, "scripts", "kontext.sh")
SITZUNGSSTART = os.path.join(PLUGIN, "scripts", "sitzungsstart.sh")


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


def usage_zeile(tokens, sidechain=False, modell="claude-opus-5-5"):
    """Eine Assistenten-Zeile wie im Sitzungsprotokoll von Claude Code."""
    return json.dumps({"type": "assistant", "isSidechain": sidechain, "message": {"role": "assistant", "model": modell, "usage": {
        "input_tokens": 2, "cache_creation_input_tokens": 1000, "cache_read_input_tokens": tokens - 1002,
        "output_tokens": 50, "server_tool_use": {"web_search_requests": 0}}}}) + "\n"


class TestKontext(unittest.TestCase):
    def setUp(self):
        self.p = tempfile.mkdtemp(prefix="kontext-")
        os.makedirs(os.path.join(self.p, "docs"))
        os.makedirs(os.path.join(self.p, ".dev-team"))
        self.protokoll = os.path.join(self.p, "sitzung.jsonl")
        self.env = dict(os.environ, CLAUDE_PROJECT_DIR=self.p)
        self.env.pop("DEV_TEAM_KONTEXT_GRENZE", None)

    def tearDown(self):
        shutil.rmtree(self.p, ignore_errors=True)

    def schreibe(self, *zeilen, datei=None):
        with open(datei or self.protokoll, "a") as f:
            f.write("".join(zeilen))

    def lauf(self, modus, **felder):
        eingabe = {"session_id": "s1", "transcript_path": self.protokoll, "hook_event_name": "PostToolUse",
                   "tool_name": "Agent"}
        eingabe.update(felder)
        r = subprocess.run(["bash", KONTEXT, modus], input=json.dumps(eingabe), text=True, capture_output=True,
                           env=self.env)
        self.assertEqual(r.returncode, 0, r.stderr)
        return r.stdout.strip()

    def hinweis(self, **felder):
        aus = self.lauf("hinweis", **felder)
        return json.loads(aus)["hookSpecificOutput"]["additionalContext"] if aus else None

    def test_stufen_projektleiter(self):
        self.schreibe(usage_zeile(50000))
        self.assertEqual(self.lauf("stufe"), "0")
        self.schreibe(usage_zeile(300000))          # ab 70 % von 400000
        self.assertEqual(self.lauf("stufe"), "1")
        self.schreibe(usage_zeile(350000))          # ab 85 %: Übergabe vor dem Zusammenfassen
        self.assertEqual(self.lauf("stufe"), "2")

    def test_grenze_aus_einstellungen_und_projekt(self):
        os.makedirs(os.path.join(self.p, ".claude"))
        with open(os.path.join(self.p, ".claude", "settings.json"), "w") as f:
            json.dump({"autoCompactWindow": 200000}, f)
        self.schreibe(usage_zeile(175000))
        self.assertEqual(self.lauf("stufe"), "2")
        with open(os.path.join(self.p, ".claude", "dev-team.json"), "w") as f:
            json.dump({"kontext_grenze": 600000}, f)
        self.assertEqual(self.lauf("stufe"), "0")

    def test_modell_mit_200k_fenster(self):
        self.schreibe(usage_zeile(165000, modell="claude-sonnet-4-5-20250929"))
        self.assertEqual(self.lauf("stufe"), "2")       # 85 % von 190000, vor dem Zusammenfassen bei rund 190000
        self.schreibe(usage_zeile(165000, modell="claude-opus-5-5"))
        self.assertEqual(self.lauf("stufe"), "0")

    def test_werkzeugergebnis_mit_fremder_abrechnung_zaehlt_nicht(self):
        self.schreibe(usage_zeile(50000))
        self.schreibe(json.dumps({"type": "user", "toolUseResult": {"usage": {"input_tokens": 390000}}}) + "\n")
        self.assertEqual(self.lauf("stufe"), "0")

    def test_agenten_schritte_im_sitzungsprotokoll_zaehlen_nicht(self):
        self.schreibe(usage_zeile(60000), usage_zeile(390000, sidechain=True))
        self.assertEqual(self.lauf("stufe"), "0")

    def test_hinweis_einmal_je_stufe_und_zuruecksetzen(self):
        self.schreibe(usage_zeile(300000))
        self.assertIn("STATUS.md", self.hinweis())
        self.assertIsNone(self.hinweis())
        self.schreibe(usage_zeile(350000))
        text = self.hinweis()
        self.assertIn("SITZUNGSUEBERGABE.md", text)
        self.assertIn("vorlagen/sitzungsuebergabe.md", text)
        self.assertIn("nicht anhalten", text)
        self.assertIsNone(self.hinweis())
        self.schreibe(usage_zeile(30000))      # nach dem Zusammenfassen
        self.assertIsNone(self.hinweis())
        self.schreibe(usage_zeile(300000))
        self.assertIsNotNone(self.hinweis())

    def test_nachricht_von_simon(self):
        self.schreibe(usage_zeile(350000))
        aus = json.loads(self.lauf("hinweis", hook_event_name="UserPromptSubmit", tool_name=""))
        self.assertEqual(aus["hookSpecificOutput"]["hookEventName"], "UserPromptSubmit")

    def test_agent_eigenes_protokoll_und_eigene_grenze(self):
        self.schreibe(usage_zeile(40000))
        ordner = os.path.join(self.p, "sitzung", "subagents")
        os.makedirs(ordner)
        agent = os.path.join(ordner, "agent-a1.jsonl")
        self.schreibe(usage_zeile(170000, sidechain=True), datei=agent)
        self.assertIn("baldigen Abschluss", self.hinweis(agent_type="dev-team:entwickler", agent_id="a1"))
        self.schreibe(usage_zeile(205000, sidechain=True), datei=agent)
        text = self.hinweis(agent_type="dev-team:entwickler", agent_id="a1")
        self.assertIn("BLOCKIERT", text)
        self.assertIn("Kontext voll", text)
        self.assertIsNone(self.hinweis())     # Projektleiter selbst ist frei

    def test_ohne_dev_team_projekt_still(self):
        shutil.rmtree(os.path.join(self.p, "docs"))
        self.schreibe(usage_zeile(390000))
        self.assertEqual(self.lauf("hinweis"), "")
        self.assertEqual(self.lauf("stufe"), "0")

    def test_voller_kontext_ist_kein_stopp(self):
        with open(os.path.join(self.p, ".dev-team", "durchlauf"), "w") as f:
            f.write("an\n")
        self.schreibe(usage_zeile(390000))
        r = subprocess.run(["bash", DURCHLAUF], input=json.dumps({"stop_hook_active": False, "session_id": "s1",
                           "transcript_path": self.protokoll}), text=True, capture_output=True, env=self.env)
        antwort = json.loads(r.stdout)
        self.assertEqual(antwort["decision"], "block")
        self.assertIn("kein Stopp", antwort["reason"])

    def sitzungsstart(self, quelle):
        r = subprocess.run(["bash", SITZUNGSSTART], input=json.dumps({"source": quelle}), text=True,
                           capture_output=True, env=dict(self.env, CLAUDE_PLUGIN_ROOT=PLUGIN, HOME=self.p))
        self.assertEqual(r.returncode, 0, r.stderr)
        return r.stdout

    def test_sitzungsstart_zeigt_uebergabe(self):
        with open(os.path.join(self.p, "docs", "SITZUNGSUEBERGABE.md"), "w") as f:
            f.write("# Sitzungsübergabe\n\n## Nächster Schritt\nP4 an einen entwickler geben.\n")
        aus = self.sitzungsstart("compact")
        self.assertIn("automatisch zusammengefasst", aus)
        self.assertIn("P4 an einen entwickler geben.", aus)
        aus = self.sitzungsstart("startup")
        self.assertIn("Durchlauf wieder einschalten", aus)
        self.assertNotIn("automatisch zusammengefasst", aus)


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
