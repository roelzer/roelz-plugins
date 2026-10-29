"""Reibungstests: Ein ganzer Auftrag wird mit den Werkzeugaufrufen nachgespielt, die jede Rolle normal braucht.

Grundsatz (Simon, 29.10.2026): Das Team soll Vorteile bringen und eigenständig arbeiten. Der Wächter prüft nur
noch, dass Entwickler und Tester nicht miteinander reden und dass der Entwickler keine bestehenden Tests ändert
bzw. die verdeckten Tests nicht anrührt. Jeder normale Arbeitsschritt, der gesperrt wird, macht hier einen Test rot.
Viele Fälle stammen aus dem Projekt „Unöder Haus“ (28./29.10.2026).
"""

import json
import os
import subprocess
import sys
import tempfile
import unittest

sys.path.insert(0, os.path.dirname(__file__))
from test_waechter import Basis, PLUGIN  # noqa: E402


class Auftrag(Basis):
    def darf(self, e, wer=""):
        code, fehler = self.lauf(e)
        self.assertEqual(code, 0, "%s gesperrt: %s\n%s" % (wer, json.dumps(e.get("tool_input"))[:200], fehler))

    def shell(self, befehl, rolle=None, cwd=None):
        return self.aufruf("Bash", rolle, cwd, command=befehl)


class Projektleiter(Auftrag):
    def test_alles_was_er_braucht(self):
        for b in ("npm run dev &", "npx vite --port 5173", "npm ci", "npm install three", "curl -s http://localhost:5173/",
                  "node scripts/pruefe-modelle.js", "bash docs/run.sh", "git merge --no-ff dev-team/p8 -m x",
                  "git push origin main-1tg5m0", "git worktree remove .claude/worktrees/p1", "start http://localhost:5173"):
            self.darf(self.shell(b), "PL: " + b)
        for w in ("mcp__Claude_Browser__navigate", "mcp__Claude_Browser__preview_start", "mcp__ccd_turn__wrap_up",
                  "SendUserFile", "PowerShell", "NeuesWerkzeugNachUpdate", "Skill"):
            self.darf(self.aufruf(w, command="Start-Process npm"), "PL " + w)
        for rel in ("docs/STATUS.md", ".claude/launch.json", "src/schnellfix.js"):
            self.darf(self.schreiben(os.path.join(self.projekt, rel)), "PL schreibt " + rel)
        for typ in ("dev-team:entwickler", "dev-team:tester", "dev-team:architekt", "general-purpose"):
            self.darf(self.agent(typ, isolation="worktree"), "PL startet " + typ)


class Entwickler(Auftrag):
    R = "entwickler"

    def test_bauen(self):
        for rel in ("src/haus/modell.ts", "tests/modell.test.ts", "playwright.config.ts", "package.json"):
            self.darf(self.schreiben(os.path.join(self.wt, rel), self.R), "Entwickler schreibt " + rel)
        for e in (self.aufruf("Read", self.R, self.wt, file_path=os.path.join(self.wt, "src", "rechnung.js")),
                  self.aufruf("Grep", self.R, self.wt, pattern="import .* from", path=self.wt),
                  self.aufruf("Grep", self.R, self.wt, pattern="verdeckt", path=os.path.join(self.wt, "src")),
                  self.aufruf("Glob", self.R, self.wt, pattern="src/**/*.ts")):
            self.darf(e, "Entwickler liest")

    def test_shell(self):
        for b in ("npm ci", "npm test", "npx vitest run", "npx tsc --noEmit", "npm install lodash-es",
                  "node -e \"fetch('http://localhost:5173')\"", "git add -A", "git commit -m 'P8'",
                  "cd %s && npm test" % self.wt, "git log dev-team/m1..HEAD",
                  "python3 \"%s/scripts/worktree_vorbereiten.py\"" % PLUGIN,
                  "bash \"%s/scripts/pruefe-tests.sh\" --rolle entwickler" % PLUGIN):
            self.darf(self.shell(b, self.R, self.wt), "Entwickler: " + b)


class Pruefer(Auftrag):
    def test_rollen(self):
        for rolle, rel in (("tester", "tests/abnahme/a1.test.ts"), ("tester", "vitest.config.ts"),
                           ("designer", "docs/DESIGN.md"), ("rechercheur", "fachwissen/recherche/wp.md"),
                           ("architekt", "docs/ARCHITEKTUR.md")):
            self.darf(self.schreiben(os.path.join(self.projekt, rel), rolle), "%s schreibt %s" % (rolle, rel))
        for rolle in ("designer", "produktpruefer", "gastgeber", "reviewer"):
            for w in ("mcp__Claude_Browser__navigate", "mcp__Claude_Browser__computer", "Bash"):
                self.darf(self.aufruf(w, rolle, command="npm run dev &", url="http://localhost:5173"), "%s %s" % (rolle, w))
            self.darf(self.aufruf("SendMessage", rolle, to="architekt"), rolle + " fragt nach")


class Gegenprobe(Auftrag):
    """Genau diese Dinge bleiben gesperrt – sonst nichts."""

    def test_die_zwei_regeln(self):
        for rolle in ("entwickler", "tester"):
            self.assertEqual(self.lauf(self.aufruf("SendMessage", rolle, to="x"))[0], 2, rolle)
        e = self.schreiben(os.path.join(self.wt, "tests", "rechnung.test.js"), "entwickler", "Edit")
        self.assertEqual(self.lauf(e)[0], 2)
        e = self.aufruf("Read", "entwickler", self.wt, file_path=os.path.join(self.projekt, ".dev-team", "verdeckt", "a.ts"))
        self.assertEqual(self.lauf(e)[0], 2)


class OhneTeam(unittest.TestCase):
    """Cloud-Sitzung, in der das Dev-Team nicht geladen werden kann: nichts wird gesperrt."""

    def test_alles_geht(self):
        t = tempfile.mkdtemp()
        for werkzeug, befehl in (("Bash", "git push origin main-1tg5m0"), ("Bash", "npm test"), ("Write", None),
                                 ("Agent", None), ("Edit", None)):
            ti = {"command": befehl} if befehl else {"file_path": "x"}
            r = subprocess.run(["bash", os.path.join(PLUGIN, "vorlagen", "projekt-dev-team-start.sh"), "waechter"],
                               input=json.dumps({"tool_name": werkzeug, "tool_input": ti}), capture_output=True,
                               text=True, env=dict(os.environ, HOME=t, CLAUDE_PROJECT_DIR=t,
                                                   XDG_CACHE_HOME=os.path.join(t, "c")))
            self.assertEqual(r.returncode, 0, (werkzeug, befehl))


if __name__ == "__main__":
    unittest.main()
