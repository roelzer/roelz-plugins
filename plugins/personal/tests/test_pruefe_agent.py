"""Tests für scripts/pruefe_agent.py (statische Prüfung neuer Agenten, Skills und Testfälle)."""

import os
import subprocess
import sys
import tempfile
import textwrap
import unittest

PLUGIN = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SKRIPT = os.path.join(PLUGIN, "scripts", "pruefe_agent.py")

GUTER_AGENT = textwrap.dedent("""\
    ---
    name: schnitt-pruefer
    description: Prüft fertige Videoschnitte auf technische Fehler. Nutzen bei „prüf meinen Schnitt“, „ist das Reel sendefertig?“. Nicht für das Schneiden selbst.
    tools: Read, Bash
    disallowedTools: Agent
    model: opus
    maxTurns: 30
    ---

    # Auftrag
    Prüft Schnitte, bevor Simon sie veröffentlicht.
    """)

GUTER_SKILL = textwrap.dedent("""\
    ---
    name: schneiden
    description: Schneidet Videos aus vorhandenem Material. Nutzen bei „mach mir ein Reel“, „schneid die Pausen raus“, „kürz das auf 30 Sekunden“. Nicht für das Erzeugen neuer Videos.
    argument-hint: "[Was soll geschnitten werden?]"
    ---

    # Schneiden
    Auftrag: $ARGUMENTS
    """)


def fall(tags, grader_typ="regex", grader_text="", prompt_extra=""):
    return {
        "prompt.md": "---\ntags: [%s]\n%s---\n\nMach mir ein Reel.\n" % (tags, prompt_extra),
        "graders/g.md": "---\ntype: %s\n---\n\n%s\n" % (grader_typ, grader_text),
    }


class PruefeAgent(unittest.TestCase):
    def baue(self, dateien):
        wurzel = tempfile.mkdtemp()
        os.makedirs(os.path.join(wurzel, ".git"))
        plugin = os.path.join(wurzel, "plugins", "test")
        for pfad, inhalt in dateien.items():
            ziel = os.path.join(plugin, pfad)
            os.makedirs(os.path.dirname(ziel), exist_ok=True)
            with open(ziel, "w", encoding="utf-8") as d:
                d.write(inhalt)
        return wurzel, plugin

    def lauf(self, dateien, *zusatz):
        _, plugin = self.baue(dateien)
        r = subprocess.run([sys.executable, SKRIPT, plugin] + list(zusatz), capture_output=True, text=True)
        return r.returncode, r.stdout

    def volles_plugin(self, **ueberschreiben):
        dateien = {".claude-plugin/plugin.json": "{}", ".gitignore": "evals/results/\n",
                   "agents/schnitt-pruefer.md": GUTER_AGENT, "skills/schneiden/SKILL.md": GUTER_SKILL}
        for i, tag in enumerate(["normal", "grenzfall", "druck", "ablehnen", "ausloesen", "nicht-ausloesen"]):
            for pfad, inhalt in fall(tag).items():
                dateien["evals/f%d/%s" % (i, pfad)] = inhalt
        dateien.update(ueberschreiben)
        return dateien

    def test_gutes_plugin_ohne_fehler_und_warnungen(self):
        code, aus = self.lauf(self.volles_plugin(), "--min-faelle", "6")
        self.assertEqual(code, 0, aus)
        self.assertNotIn("FEHLER", aus)
        self.assertNotIn("WARNUNG", aus)

    def test_name_muss_zum_dateinamen_passen(self):
        code, aus = self.lauf(self.volles_plugin(**{"agents/anders.md": GUTER_AGENT}), "--min-faelle", "6")
        self.assertEqual(code, 1)
        self.assertIn("name muss „anders“ heißen", aus)

    def test_agent_darf_keine_agenten_starten(self):
        boese = GUTER_AGENT.replace("tools: Read, Bash", "tools: Read, Bash, Agent")
        code, aus = self.lauf(self.volles_plugin(**{"agents/schnitt-pruefer.md": boese}), "--min-faelle", "6")
        self.assertEqual(code, 1)
        self.assertIn("Agent/Task in tools", aus)

    def test_persona_floskel_wird_gemeldet(self):
        floskel = GUTER_AGENT.replace("Prüft Schnitte", "Du bist ein Weltklasse-Cutter. Prüft Schnitte")
        code, aus = self.lauf(self.volles_plugin(**{"agents/schnitt-pruefer.md": floskel}), "--min-faelle", "6")
        self.assertEqual(code, 0, aus)
        self.assertIn("Persona-Floskel „Weltklasse-Cutter“", aus)

    def test_zu_viele_absolute_woerter(self):
        laut = GUTER_AGENT + "\n".join("Das MUSS so sein." for _ in range(6)) + "\n"
        _, aus = self.lauf(self.volles_plugin(**{"agents/schnitt-pruefer.md": laut}), "--min-faelle", "6")
        self.assertIn("6-mal NIE/IMMER/MUSS", aus)

    def test_beschreibung_zu_lang_ist_fehler(self):
        lang = GUTER_SKILL.replace("Nicht für das Erzeugen neuer Videos.", "x" * 1600)
        code, aus = self.lauf(self.volles_plugin(**{"skills/schneiden/SKILL.md": lang}), "--min-faelle", "6")
        self.assertEqual(code, 1)
        self.assertIn("Zeichen", aus)

    def test_plugin_ignoriert_hooks_feld(self):
        mit_hooks = GUTER_AGENT.replace("maxTurns: 30", "maxTurns: 30\nhooks: {}")
        _, aus = self.lauf(self.volles_plugin(**{"agents/schnitt-pruefer.md": mit_hooks}), "--min-faelle", "6")
        self.assertIn("„hooks“ wird bei Plugin-Agenten ignoriert", aus)

    def test_unbekannter_schluessel_im_testfall_ist_fehler(self):
        dateien = self.volles_plugin()
        dateien["evals/f0/prompt.md"] = "---\ntags: [normal]\nherkunft: echt\n---\n\nMach mir ein Reel.\n"
        code, aus = self.lauf(dateien, "--min-faelle", "6")
        self.assertEqual(code, 1)
        self.assertIn("unbekannter Schlüssel „herkunft“", aus)

    def test_unbekannter_grader_typ_ist_fehler(self):
        dateien = self.volles_plugin(**{"evals/f0/graders/g.md": "---\ntype: python\n---\n"})
        code, aus = self.lauf(dateien, "--min-faelle", "6")
        self.assertEqual(code, 1)
        self.assertIn("type „python“ unbekannt", aus)

    def test_fall_ohne_grader_ist_fehler(self):
        dateien = self.volles_plugin()
        del dateien["evals/f0/graders/g.md"]
        code, aus = self.lauf(dateien, "--min-faelle", "6")
        self.assertEqual(code, 1)
        self.assertIn("kein Prüfpunkt", aus)

    def test_llm_grader_ohne_pass_fail_und_nur_kostenpflichtig(self):
        dateien = self.volles_plugin(**{"evals/f0/graders/g.md": "---\ntype: llm\n---\n\nIst es gut?\n"})
        code, aus = self.lauf(dateien, "--min-faelle", "6")
        self.assertEqual(code, 0, aus)
        self.assertIn("ohne „PASS if …“", aus)
        self.assertIn("nur kostenpflichtige Prüfpunkte", aus)

    def test_fehlende_fallarten_und_gitignore(self):
        dateien = self.volles_plugin()
        for pfad in [p for p in dateien if p.startswith(("evals/f2/", "evals/f3/"))] + [".gitignore"]:
            del dateien[pfad]
        _, aus = self.lauf(dateien, "--min-faelle", "4")
        self.assertIn("Fallarten fehlen: druck, ablehnen", aus)
        self.assertIn("evals/results/ steht in keiner .gitignore", aus)

    def test_ohne_evals_warnung(self):
        dateien = {k: v for k, v in self.volles_plugin().items() if not k.startswith("evals/")}
        code, aus = self.lauf(dateien)
        self.assertEqual(code, 0, aus)
        self.assertIn("keine Testfälle", aus)

    def test_eigenes_plugin_besteht(self):
        # Der Personaler muss seine eigene Prüfung bestehen (ohne Fehler).
        r = subprocess.run([sys.executable, SKRIPT, PLUGIN, "--min-faelle", "4"], capture_output=True, text=True)
        self.assertEqual(r.returncode, 0, r.stdout)


if __name__ == "__main__":
    unittest.main()
