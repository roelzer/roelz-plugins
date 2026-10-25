"""Tests für scripts/settings_zusammenfuehren.py und die Vorlagen."""

import json
import os
import subprocess
import sys
import tempfile
import unittest

PLUGIN = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SKRIPT = os.path.join(PLUGIN, "scripts", "settings_zusammenfuehren.py")
VORLAGE = os.path.join(PLUGIN, "vorlagen", "projekt-settings.json")


class Einstellungen(unittest.TestCase):
    def lauf(self, alt, schreiben=True):
        d = tempfile.mkdtemp()
        ziel = os.path.join(d, ".claude", "settings.json")
        if alt is not None:
            os.makedirs(os.path.dirname(ziel))
            with open(ziel, "w") as f:
                f.write(alt if isinstance(alt, str) else json.dumps(alt))
        befehl = [sys.executable, SKRIPT, "--vorlage", VORLAGE, "--ziel", ziel] + (["--schreiben"] if schreiben else [])
        r = subprocess.run(befehl, capture_output=True, text=True)
        neu = None
        if os.path.exists(ziel):
            try:
                with open(ziel) as f:
                    neu = json.load(f)
            except ValueError:
                neu = None
        return r.returncode, r.stdout, neu

    def test_fremdes_bleibt_dev_team_kommt_dazu(self):
        alt = {"permissions": {"deny": ["Read(./geheim/**)"], "allow": ["Bash(npm test)"]},
               "hooks": {"PreToolUse": [{"matcher": "Bash", "hooks": [{"type": "command", "command": "eigener.sh"}]},
                                        {"matcher": "Agent|Task", "hooks": [{"type": "command", "command": "bash .claude/dev-team-start.sh log-start"}]}]},
               "disableAllHooks": True, "env": {"MEIN": "1"}}
        code, aus, neu = self.lauf(alt)
        self.assertEqual(code, 0, aus)
        self.assertIn("Read(./geheim/**)", neu["permissions"]["deny"])
        self.assertIn("Agent(Explore)", neu["permissions"]["deny"])
        self.assertEqual(neu["permissions"]["allow"], ["Bash(npm test)"])
        self.assertFalse(neu["disableAllHooks"])
        self.assertEqual(neu["worktree"]["baseRef"], "head")
        self.assertEqual(neu["env"]["MEIN"], "1")
        self.assertEqual(neu["env"]["CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH"], "1")
        befehle = [h["command"] for e in neu["hooks"]["PreToolUse"] for h in e["hooks"]]
        self.assertIn("eigener.sh", befehle)
        self.assertNotIn("bash .claude/dev-team-start.sh log-start", befehle)
        self.assertEqual(sum("waechter" in b for b in befehle), 1)

    def test_ohne_schreiben_bleibt_datei_gleich(self):
        code, aus, neu = self.lauf({"env": {}}, schreiben=False)
        self.assertIn("Noch nichts geschrieben", aus)
        self.assertEqual(neu, {"env": {}})

    def test_kaputtes_json_wird_nicht_ueberschrieben(self):
        code, aus, neu = self.lauf("{kaputt", schreiben=True)
        self.assertEqual(code, 1)
        self.assertIsNone(neu)

    def test_zweimal_ist_stabil(self):
        d = tempfile.mkdtemp()
        ziel = os.path.join(d, "s.json")
        for _ in range(2):
            subprocess.run([sys.executable, SKRIPT, "--vorlage", VORLAGE, "--ziel", ziel, "--schreiben"], capture_output=True)
        r = subprocess.run([sys.executable, SKRIPT, "--vorlage", VORLAGE, "--ziel", ziel], capture_output=True, text=True)
        self.assertIn("schon aktuell", r.stdout)


class Vorlagen(unittest.TestCase):
    def test_json_vorlagen_gueltig(self):
        for n in ("projekt-settings.json", "dev-team.json"):
            with open(os.path.join(PLUGIN, "vorlagen", n), encoding="utf-8") as f:
                json.load(f)

    def test_settings_sperrt_alle_eingebauten_helfer(self):
        with open(VORLAGE) as f:
            s = json.load(f)
        for name in ("Explore", "Plan", "general-purpose"):
            self.assertIn("Agent(%s)" % name, s["permissions"]["deny"])
        self.assertEqual(s["worktree"]["baseRef"], "head")

    def test_gitignore_schuetzt_verdeckte_tests(self):
        with open(os.path.join(PLUGIN, "vorlagen", "gitignore.txt")) as f:
            zeilen = f.read().splitlines()
        self.assertIn(".dev-team/", zeilen)
        self.assertIn(".claude/worktrees/", zeilen)

    def test_hooks_plugin_und_vorlage_decken_dieselben_werkzeuge(self):
        with open(os.path.join(PLUGIN, "hooks", "hooks.json")) as f:
            p = json.load(f)
        with open(VORLAGE) as f:
            v = json.load(f)
        self.assertEqual(p["hooks"]["PreToolUse"][0]["matcher"], v["hooks"]["PreToolUse"][0]["matcher"])


class Agenten(unittest.TestCase):
    def test_steckbrief_und_keine_agent_rechte(self):
        ordner = os.path.join(PLUGIN, "agents")
        for n in os.listdir(ordner):
            with open(os.path.join(ordner, n), encoding="utf-8") as f:
                t = f.read()
            kopf = t.split("---")[1]
            werkzeuge = [z for z in kopf.splitlines() if z.startswith("tools:")][0]
            self.assertNotIn("Agent", werkzeuge, n)
            self.assertNotIn("Task", werkzeuge, n)
            self.assertIn("disallowedTools: Agent", kopf, n)
            for abschnitt in ("## Steckbrief", "## Pflichtfragen", "## Ausgabe", "## Fertig, wenn", "## Dev-Team-Kontext"):
                self.assertIn(abschnitt, t, "%s: %s fehlt" % (n, abschnitt))

    def test_entwickler_im_worktree(self):
        with open(os.path.join(PLUGIN, "agents", "entwickler.md"), encoding="utf-8") as f:
            self.assertIn("isolation: worktree", f.read().split("---")[1])


if __name__ == "__main__":
    unittest.main()
