"""Tests für den minimalen Wächter (scripts/waechter.sh, seit 3.11).

Er prüft nur: Entwickler und Tester reden nicht miteinander (keine Agenten, keine Nachrichten), und der Entwickler
ändert keine bestehenden Tests/Testkonfiguration/Referenzwerte und rührt die verdeckten Tests unter .dev-team/
nicht an. Alles andere muss durchgehen.

Ausführen aus dem Repo-Hauptordner:
    python3 -m unittest discover -s plugins/dev-team/tests -v
"""

import json
import os
import shutil
import subprocess
import tempfile
import time
import unittest

PLUGIN = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
WAECHTER_SH = os.path.join(PLUGIN, "scripts", "waechter.sh")


def git(cwd, *args):
    subprocess.run(["git", *args], cwd=cwd, check=True, capture_output=True)


class Basis(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.mkdtemp(prefix="waechter-")
        self.projekt = os.path.join(self.tmp, "projekt")
        for datei in ("src/rechnung.js", "tests/rechnung.test.js", "tests/referenz/fall1.json", "vitest.config.ts",
                      "docs/STATUS.md", "docs/lastenheft.md", ".claude/dev-team.json"):
            pfad = os.path.join(self.projekt, datei)
            os.makedirs(os.path.dirname(pfad), exist_ok=True)
            with open(pfad, "w") as f:
                f.write("x")
        git(self.projekt, "init", "-q")
        git(self.projekt, "add", "-A")
        git(self.projekt, "-c", "user.email=t@t", "-c", "user.name=t", "commit", "-qm", "start")
        self.wt = os.path.join(self.projekt, ".claude", "worktrees", "p1")
        git(self.projekt, "worktree", "add", "-q", "-b", "p1", self.wt)

    def tearDown(self):
        shutil.rmtree(self.tmp, ignore_errors=True)

    def lauf(self, eingabe, env_zusatz=None):
        eingabe.setdefault("cwd", self.projekt)
        env = dict(os.environ, CLAUDE_PROJECT_DIR=self.projekt, CLAUDE_PLUGIN_ROOT=PLUGIN)
        env.update(env_zusatz or {})
        r = subprocess.run(["bash", WAECHTER_SH], input=json.dumps(eingabe), capture_output=True, text=True,
                           env=env, cwd=self.projekt)
        return r.returncode, r.stderr

    def aufruf(self, werkzeug, rolle=None, cwd=None, **ti):
        e = {"tool_name": werkzeug, "tool_input": ti}
        if rolle and rolle != "projektleiter":
            e["agent_type"] = "dev-team:" + rolle
            e["agent_id"] = "a-" + rolle
        if cwd:
            e["cwd"] = cwd
        return e

    def agent(self, typ=None, **extra):
        ti = {"description": "Test", "prompt": "x"}
        if typ is not None:
            ti["subagent_type"] = typ
        ti.update(extra)
        return {"tool_name": "Agent", "tool_input": ti}

    def schreiben(self, pfad, rolle=None, werkzeug="Write"):
        e = self.aufruf(werkzeug, rolle, file_path=pfad, content="y")
        if rolle == "entwickler":
            e["cwd"] = self.wt
        return e


class Kommunikation(Basis):
    def test_entwickler_und_tester_reden_nicht(self):
        for rolle in ("entwickler", "tester"):
            for w in ("Agent", "Task", "SendMessage"):
                self.assertEqual(self.lauf(self.aufruf(w, rolle, to="tester", subagent_type="dev-team:tester"))[0],
                                 2, "%s %s" % (rolle, w))

    def test_andere_rollen_duerfen(self):
        for rolle in ("projektleiter", "architekt", "designer", "reviewer", "kritiker", "fachpruefer"):
            self.assertEqual(self.lauf(self.aufruf("SendMessage", rolle, to="architekt"))[0], 0, rolle)
        for typ in (None, "general-purpose", "Explore", "dev-team:entwickler"):
            self.assertEqual(self.lauf(self.agent(typ))[0], 0, typ)  # Projektleiter startet frei


class Tests(Basis):
    def test_bestehende_tests_nicht_aendern(self):
        for rel in ("tests/rechnung.test.js", "tests/referenz/fall1.json", "vitest.config.ts"):
            for w in ("Write", "Edit", "MultiEdit"):
                self.assertEqual(self.lauf(self.schreiben(os.path.join(self.wt, rel), "entwickler", w))[0], 2, rel)

    def test_neue_tests_anlegen_und_weiter_bearbeiten(self):
        neu = os.path.join(self.wt, "tests", "modell.test.ts")
        self.assertEqual(self.lauf(self.schreiben(neu, "entwickler"))[0], 0)
        with open(neu, "w") as f:
            f.write("x")
        git(self.wt, "add", "-A")
        git(self.wt, "-c", "user.email=t@t", "-c", "user.name=t", "commit", "-qm", "P1")
        self.assertEqual(self.lauf(self.schreiben(neu, "entwickler", "Edit"))[0], 0)  # eigener Test im Paket

    def test_code_frei(self):
        for rel in ("src/rechnung.js", "src/neu/modell.ts", "docs/notiz.md"):
            self.assertEqual(self.lauf(self.schreiben(os.path.join(self.wt, rel), "entwickler"))[0], 0, rel)

    def test_verdeckte_tests_tabu(self):
        verdeckt = os.path.join(self.projekt, ".dev-team", "verdeckt", "a1.test.ts")
        for e in (self.aufruf("Read", "entwickler", self.wt, file_path=verdeckt),
                  self.aufruf("Grep", "entwickler", self.wt, pattern="x", path=os.path.dirname(verdeckt)),
                  self.aufruf("Glob", "entwickler", self.wt, pattern=".dev-team/**"),
                  self.aufruf("Bash", "entwickler", self.wt, command="cat ../../../.dev-team/verdeckt/a1.test.ts")):
            self.assertEqual(self.lauf(e)[0], 2, e["tool_input"])

    def test_tester_und_projektleiter_frei(self):
        for rolle in ("tester", "projektleiter"):
            for rel in ("tests/rechnung.test.js", "vitest.config.ts", ".dev-team/verdeckt/a1.test.ts"):
                self.assertEqual(self.lauf(self.schreiben(os.path.join(self.projekt, rel), rolle))[0], 0, (rolle, rel))


class Minimal(Basis):
    def test_alles_andere_geht(self):
        for e in (self.aufruf("Bash", command="git push --force origin main"),
                  self.aufruf("Bash", "entwickler", self.wt, command="npm install lodash && npx vite"),
                  self.aufruf("Bash", "entwickler", self.wt, command="cd .. && ls"),
                  self.aufruf("Write", file_path=os.path.join(self.projekt, "src", "a.js"), content="x"),
                  self.aufruf("Workflow"), self.aufruf("mcp__Claude_Browser__navigate", url="http://localhost"),
                  self.aufruf("NeuesWerkzeug2027")):
            self.assertEqual(self.lauf(e)[0], 0, e["tool_input"])

    def test_schnell(self):
        start = time.time()
        for _ in range(20):
            self.lauf(self.aufruf("Read", file_path="x"))
        self.assertLess((time.time() - start) / 20, 0.2)

    def test_kein_python_noetig(self):
        e = self.schreiben(os.path.join(self.wt, "tests", "rechnung.test.js"), "entwickler")
        ordner = {os.path.dirname(shutil.which("bash")), os.path.dirname(shutil.which("git"))}
        self.assertEqual(self.lauf(e, {"PATH": os.pathsep.join(ordner)})[0], 2)

    def test_hooks(self):
        for datei in (os.path.join(PLUGIN, "hooks", "hooks.json"), os.path.join(PLUGIN, "vorlagen", "projekt-settings.json")):
            with open(datei, encoding="utf-8") as f:
                d = json.load(f)
            for e in d["hooks"]["PreToolUse"]:
                for h in e["hooks"]:
                    self.assertNotIn("onFailure", h, datei)  # kann der Wächter nicht laufen, wird nicht blockiert
            self.assertNotIn("ConfigChange", d["hooks"], datei)


if __name__ == "__main__":
    unittest.main()
