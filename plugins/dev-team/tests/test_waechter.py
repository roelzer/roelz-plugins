"""Tests für den Wächter-Hook (scripts/waechter.py und waechter.sh).

Ausführen aus dem Repo-Hauptordner:
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
WAECHTER_PY = os.path.join(PLUGIN, "scripts", "waechter.py")
WAECHTER_SH = os.path.join(PLUGIN, "scripts", "waechter.sh")


def git(cwd, *args):
    subprocess.run(["git", *args], cwd=cwd, check=True, capture_output=True)


class Basis(unittest.TestCase):
    def setUp(self):
        self.tmp = tempfile.mkdtemp(prefix="waechter-")
        self.projekt = os.path.join(self.tmp, "projekt")
        os.makedirs(os.path.join(self.projekt, ".claude"))
        os.makedirs(os.path.join(self.projekt, "docs"))
        os.makedirs(os.path.join(self.projekt, "src"))
        os.makedirs(os.path.join(self.projekt, "tests", "referenz"))
        with open(os.path.join(self.projekt, ".claude", "dev-team.json"), "w") as f:
            f.write("{}")
        for datei in ("src/rechnung.js", "tests/rechnung.test.js", "tests/referenz/fall1.json",
                      "fachwissen/regeln.md", "docs/lastenheft.md", "docs/STATUS.md",
                      ".claude/settings.json"):
            pfad = os.path.join(self.projekt, datei)
            os.makedirs(os.path.dirname(pfad), exist_ok=True)
            with open(pfad, "w") as f:
                f.write("x")
        git(self.projekt, "init", "-q")
        self.leer = os.path.join(self.tmp, "kein-projekt")
        os.makedirs(self.leer)

    def tearDown(self):
        shutil.rmtree(self.tmp, ignore_errors=True)

    def lauf(self, eingabe, projekt=None, skript="py", env_zusatz=None):
        projekt = self.projekt if projekt is None else projekt
        eingabe.setdefault("cwd", projekt)
        env = dict(os.environ, CLAUDE_PROJECT_DIR=projekt, CLAUDE_PLUGIN_ROOT=PLUGIN)
        env.pop("DEV_TEAM_WARTUNG", None)
        if env_zusatz:
            env.update(env_zusatz)
        if skript == "py":
            befehl = [sys.executable, WAECHTER_PY, PLUGIN]
        else:
            befehl = ["bash", WAECHTER_SH]
        r = subprocess.run(befehl, input=json.dumps(eingabe), capture_output=True,
                           text=True, env=env, cwd=projekt)
        return r.returncode, r.stderr

    def agent(self, typ=None, **extra):
        ti = {"description": "Test", "prompt": "x"}
        if typ is not None:
            ti["subagent_type"] = typ
        ti.update(extra)
        return {"tool_name": "Agent", "tool_input": ti}

    def schreiben(self, pfad, rolle=None, werkzeug="Write"):
        e = {"tool_name": werkzeug, "tool_input": {"file_path": pfad, "content": "y"}}
        if rolle:
            e["agent_type"] = rolle
            e["agent_id"] = "a1"
        return e


class Teamzwang(Basis):
    def test_teammitglied_erlaubt(self):
        for name in ("kritiker", "dev-team:entwickler", "Dev-Team:Tester", "architekt"):
            code, _ = self.lauf(self.agent(name))
            self.assertEqual(code, 0, name)

    def test_eingebaute_helfer_blockiert(self):
        for name in ("Explore", "Plan", "general-purpose", "claude-code-guide",
                     "statusline-setup", "fork", "claude"):
            code, fehler = self.lauf(self.agent(name))
            self.assertEqual(code, 2, name)
            self.assertIn("nicht im festen Team", fehler)

    def test_ohne_namen_blockiert(self):
        code, fehler = self.lauf(self.agent())
        self.assertEqual(code, 2)
        self.assertIn("ohne Namen", fehler)
        code, _ = self.lauf(self.agent(""))
        self.assertEqual(code, 2)

    def test_fremdes_plugin_mit_gleichem_namen_blockiert(self):
        code, _ = self.lauf(self.agent("fremd-plugin:entwickler"))
        self.assertEqual(code, 2)

    def test_erfundener_name_blockiert(self):
        code, _ = self.lauf(self.agent("hilfs-entwickler-2"))
        self.assertEqual(code, 2)

    def test_agent_darf_keinen_agenten_starten(self):
        e = self.agent("tester")
        e["agent_type"] = "dev-team:entwickler"
        e["agent_id"] = "abc"
        code, fehler = self.lauf(e)
        self.assertEqual(code, 2)
        self.assertIn("keine weiteren Agenten", fehler)

    def test_modell_ueberschreiben_blockiert(self):
        code, _ = self.lauf(self.agent("reviewer", model="haiku"))
        self.assertEqual(code, 2)

    def test_teammate_blockiert(self):
        code, _ = self.lauf(self.agent("tester", name="helfer"))
        self.assertEqual(code, 2)

    def test_task_werkzeug_ebenso(self):
        e = self.agent("Explore")
        e["tool_name"] = "Task"
        self.assertEqual(self.lauf(e)[0], 2)

    def test_ausserhalb_dev_team_projekt_frei(self):
        code, _ = self.lauf(self.agent("Explore"), projekt=self.leer)
        self.assertEqual(code, 0)

    def test_v2_projekt_wird_erkannt(self):
        v2 = os.path.join(self.tmp, "v2")
        os.makedirs(os.path.join(v2, "docs"))
        for d in ("STATUS.md", "lastenheft.md"):
            open(os.path.join(v2, "docs", d), "w").close()
        self.assertEqual(self.lauf(self.agent("Explore"), projekt=v2)[0], 2)

    def test_protokoll_schreibt_start_und_block(self):
        self.lauf(self.agent("kritiker"))
        self.lauf(self.agent("Explore"))
        with open(os.path.join(self.projekt, "docs", "AGENTEN_LOG.md"), encoding="utf-8") as f:
            log = f.read()
        self.assertIn("| ▶ | kritiker |", log)
        self.assertIn("| ⛔ | Explore |", log)

    def test_kaputte_eingabe_blockiert_im_projekt(self):
        env = dict(os.environ, CLAUDE_PROJECT_DIR=self.projekt)
        r = subprocess.run([sys.executable, WAECHTER_PY, PLUGIN], input="{kaputt",
                           capture_output=True, text=True, env=env)
        self.assertEqual(r.returncode, 2)

    def test_fehlende_teamliste_blockiert(self):
        leerplugin = os.path.join(self.tmp, "plugin-ohne-team")
        os.makedirs(leerplugin)
        env = dict(os.environ, CLAUDE_PROJECT_DIR=self.projekt)
        r = subprocess.run([sys.executable, WAECHTER_PY, leerplugin],
                           input=json.dumps(self.agent("kritiker")), capture_output=True,
                           text=True, env=env)
        self.assertEqual(r.returncode, 2)

    def test_unbekannter_agent_darf_nicht_arbeiten(self):
        e = {"tool_name": "Read", "tool_input": {"file_path": "src/rechnung.js"},
             "agent_type": "Explore", "agent_id": "x"}
        self.assertEqual(self.lauf(e)[0], 2)


class Schreibrechte(Basis):
    def p(self, rel):
        return os.path.join(self.projekt, rel)

    def test_projektleiter_schreibt_keinen_code(self):
        code, fehler = self.lauf(self.schreiben(self.p("src/rechnung.js")))
        self.assertEqual(code, 2)
        self.assertIn("entwickler", fehler)
        self.assertEqual(self.lauf(self.schreiben(self.p("src/neu.js")))[0], 2)

    def test_projektleiter_schreibt_docs_und_regeln(self):
        for rel in ("docs/plan.md", "docs/STATUS.md", "docs/lastenheft.md",
                    "fachwissen/regeln.md", "CLAUDE.md", ".gitignore"):
            self.assertEqual(self.lauf(self.schreiben(self.p(rel)))[0], 0, rel)

    def test_projektleiter_relativer_pfad(self):
        self.assertEqual(self.lauf(self.schreiben("src/rechnung.js"))[0], 2)
        self.assertEqual(self.lauf(self.schreiben("docs/plan.md"))[0], 0)

    def test_projektleiter_referenz_nur_neu(self):
        self.assertEqual(self.lauf(self.schreiben(self.p("tests/referenz/fall2.json")))[0], 0)
        self.assertEqual(self.lauf(self.schreiben(self.p("tests/referenz/fall1.json")))[0], 2)

    def test_settings_nur_anlegen(self):
        self.assertEqual(self.lauf(self.schreiben(self.p(".claude/settings.json")))[0], 2)
        os.remove(self.p(".claude/settings.json"))
        self.assertEqual(self.lauf(self.schreiben(self.p(".claude/settings.json")))[0], 0)

    def test_entwickler_code_ja(self):
        for rel in ("src/rechnung.js", "src/neu/modul.py", "package.json", "index.html"):
            self.assertEqual(self.lauf(self.schreiben(self.p(rel), "dev-team:entwickler"))[0], 0, rel)

    def test_entwickler_neue_tests_ja_bestehende_nein(self):
        self.assertEqual(self.lauf(self.schreiben(self.p("tests/neu.test.js"), "entwickler"))[0], 0)
        self.assertEqual(self.lauf(self.schreiben(self.p("src/neu.spec.ts"), "entwickler"))[0], 0)
        code, fehler = self.lauf(self.schreiben(self.p("tests/rechnung.test.js"), "entwickler", "Edit"))
        self.assertEqual(code, 2)
        self.assertIn("bestehende aber nicht", fehler)

    def test_entwickler_geschuetzte_bereiche_nein(self):
        for rel in ("tests/referenz/fall1.json", "tests/referenz/neu.json", "fachwissen/regeln.md",
                    "docs/lastenheft.md", "docs/ARCHITEKTUR.md", "tests/architektur/schichten.test.js",
                    "tests/abnahme/a1.test.js", ".dev-team/verdeckt/a1.test.js", "docs/STATUS.md",
                    ".claude/settings.json", "CLAUDE.md"):
            self.assertEqual(self.lauf(self.schreiben(self.p(rel), "entwickler"))[0], 2, rel)

    def test_tester(self):
        for rel in ("tests/rechnung.test.js", "tests/abnahme/a1.test.js", ".dev-team/verdeckt/a1.test.js",
                    "src/x.test.js"):
            self.assertEqual(self.lauf(self.schreiben(self.p(rel), "tester"))[0], 0, rel)
        for rel in ("src/rechnung.js", "tests/referenz/fall1.json", "tests/architektur/x.test.js",
                    "fachwissen/regeln.md"):
            self.assertEqual(self.lauf(self.schreiben(self.p(rel), "tester"))[0], 2, rel)

    def test_architekt(self):
        for rel in ("docs/ARCHITEKTUR.md", "tests/architektur/schichten.test.js"):
            self.assertEqual(self.lauf(self.schreiben(self.p(rel), "architekt"))[0], 0, rel)
        for rel in ("src/rechnung.js", "docs/plan.md", "tests/rechnung.test.js"):
            self.assertEqual(self.lauf(self.schreiben(self.p(rel), "architekt"))[0], 2, rel)

    def test_projektleiter_architektur_und_abnahme_nein(self):
        for rel in ("docs/ARCHITEKTUR.md", "tests/abnahme/a1.test.js", ".dev-team/verdeckt/x.js"):
            self.assertEqual(self.lauf(self.schreiben(self.p(rel)))[0], 2, rel)

    def test_rechercheur(self):
        self.assertEqual(self.lauf(self.schreiben(self.p("fachwissen/recherche/2026-thema.md"), "rechercheur"))[0], 0)
        self.assertEqual(self.lauf(self.schreiben(self.p("fachwissen/regeln.md"), "rechercheur"))[0], 2)

    def test_pruefer_schreiben_nichts(self):
        for rolle in ("reviewer", "kritiker", "produktpruefer", "sicherheitspruefer", "auditor"):
            self.assertEqual(self.lauf(self.schreiben(self.p("docs/notiz.md"), rolle))[0], 2, rolle)

    def test_agentendateien_ueberall_gesperrt(self):
        for pfad in (self.p(".claude/agents/helfer.md"),
                     os.path.join(self.leer, ".claude", "agents", "helfer.md"),
                     os.path.expanduser("~/.claude/agents/helfer.md"),
                     self.p(".claude/skills/x/SKILL.md")):
            for proj in (self.projekt, self.leer):
                self.assertEqual(self.lauf(self.schreiben(pfad), projekt=proj)[0], 2, pfad)

    def test_plugin_ordner_gesperrt_ausser_wissen(self):
        self.assertEqual(self.lauf(self.schreiben(os.path.join(PLUGIN, "team.json")))[0], 2)
        self.assertEqual(self.lauf(self.schreiben(os.path.join(PLUGIN, "agents", "neu.md")))[0], 2)
        self.assertEqual(self.lauf(self.schreiben(os.path.join(PLUGIN, "wissen", "lessons.md")))[0], 0)

    def test_wartungsmodus_oeffnet_plugin_ordner(self):
        code, _ = self.lauf(self.schreiben(os.path.join(PLUGIN, "team.json")),
                            env_zusatz={"DEV_TEAM_WARTUNG": "1"})
        self.assertEqual(code, 0)

    def test_agent_schreibt_nicht_ausserhalb(self):
        self.assertEqual(self.lauf(self.schreiben(os.path.join(self.leer, "x.js"), "entwickler"))[0], 2)
        self.assertEqual(self.lauf(self.schreiben(os.path.join(self.leer, "x.md")))[0], 0)

    def test_worktree_regeln_gelten_relativ_zum_worktree(self):
        git(self.projekt, "add", "-A")
        git(self.projekt, "-c", "user.email=t@t", "-c", "user.name=t", "commit", "-qm", "start")
        wt = os.path.join(self.projekt, ".claude", "worktrees", "paket-1")
        git(self.projekt, "worktree", "add", "-q", wt, "-b", "paket-1")
        self.assertEqual(self.lauf(self.schreiben(os.path.join(wt, "src", "rechnung.js"), "entwickler"))[0], 0)
        self.assertEqual(self.lauf(self.schreiben(os.path.join(wt, "tests", "rechnung.test.js"),
                                                  "entwickler", "Edit"))[0], 2)
        self.assertEqual(self.lauf(self.schreiben(os.path.join(wt, "tests", "referenz", "fall1.json"),
                                                  "entwickler"))[0], 2)

    def test_notebook_und_multiedit(self):
        e = {"tool_name": "NotebookEdit", "tool_input": {"notebook_path": self.p("src/a.ipynb")}}
        self.assertEqual(self.lauf(e)[0], 2)
        self.assertEqual(self.lauf(self.schreiben(self.p("src/a.js"), werkzeug="MultiEdit"))[0], 2)

    def test_windows_pfade(self):
        pfad = self.p("tests/referenz/fall1.json").replace("/", "\\") if os.name == "nt" \
            else self.p("tests/referenz/fall1.json")
        self.assertEqual(self.lauf(self.schreiben(pfad, "entwickler"))[0], 2)

    def test_gross_klein_egal(self):
        self.assertEqual(self.lauf(self.schreiben(self.p("Tests/Referenz/Fall9.json"), "entwickler"))[0], 2)


class Verdeckt(Basis):
    def test_entwickler_liest_verdeckte_tests_nicht(self):
        for e in ({"tool_name": "Read", "tool_input": {"file_path": self.projekt + "/.dev-team/verdeckt/a1.test.js"}},
                  {"tool_name": "Grep", "tool_input": {"pattern": "x", "path": ".dev-team/verdeckt"}},
                  {"tool_name": "Glob", "tool_input": {"pattern": ".dev-team/verdeckt/**"}},
                  {"tool_name": "Bash", "tool_input": {"command": "cat ../../.dev-team/verdeckt/a1.test.js"}}):
            e["agent_type"] = "dev-team:entwickler"
            e["agent_id"] = "a"
            self.assertEqual(self.lauf(e)[0], 2, e["tool_name"])

    def test_tester_darf_lesen(self):
        e = {"tool_name": "Read", "tool_input": {"file_path": ".dev-team/verdeckt/a1.test.js"},
             "agent_type": "tester", "agent_id": "a"}
        self.assertEqual(self.lauf(e)[0], 0)

    def test_entwickler_liest_normalen_code(self):
        e = {"tool_name": "Read", "tool_input": {"file_path": "src/rechnung.js"},
             "agent_type": "entwickler", "agent_id": "a"}
        self.assertEqual(self.lauf(e)[0], 0)


class Startskript(Basis):
    def test_bash_wrapper_reicht_durch(self):
        self.assertEqual(self.lauf(self.agent("Explore"), skript="sh")[0], 2)
        self.assertEqual(self.lauf(self.agent("kritiker"), skript="sh")[0], 0)

    def test_ohne_python_blockiert_im_projekt(self):
        bin_ordner = os.path.join(self.tmp, "bin")
        os.makedirs(bin_ordner)
        for werkzeug in ("bash", "cat", "dirname", "pwd"):
            ziel = shutil.which(werkzeug)
            if ziel:
                os.symlink(ziel, os.path.join(bin_ordner, werkzeug))
        env = {"PATH": bin_ordner, "CLAUDE_PROJECT_DIR": self.projekt, "CLAUDE_PLUGIN_ROOT": PLUGIN,
               "HOME": self.tmp}
        r = subprocess.run([os.path.join(bin_ordner, "bash"), WAECHTER_SH],
                           input=json.dumps(self.agent("kritiker")), capture_output=True,
                           text=True, env=env)
        self.assertEqual(r.returncode, 2)
        self.assertIn("Python 3", r.stderr)
        env["CLAUDE_PROJECT_DIR"] = self.leer
        r = subprocess.run([os.path.join(bin_ordner, "bash"), WAECHTER_SH],
                           input=json.dumps(self.agent("kritiker")), capture_output=True,
                           text=True, env=env, cwd=self.leer)
        self.assertEqual(r.returncode, 0)


class TeamlisteStimmt(unittest.TestCase):
    def test_jeder_agent_hat_datei_und_umgekehrt(self):
        with open(os.path.join(PLUGIN, "team.json"), encoding="utf-8") as f:
            team = json.load(f)
        dateien = {n[:-3] for n in os.listdir(os.path.join(PLUGIN, "agents")) if n.endswith(".md")}
        self.assertEqual(set(team["agenten"]), dateien)


if __name__ == "__main__":
    unittest.main()
