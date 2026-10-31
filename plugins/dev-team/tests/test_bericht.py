"""Tests für das Agenten-Protokoll (agenten-log.sh): vollständige Berichte in docs/pruefberichte/.
Ausführen:
    python3 -m unittest discover -s plugins/dev-team/tests -v
"""

import glob
import json
import os
import shutil
import subprocess
import tempfile
import unittest

PLUGIN = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
LOG = os.path.join(PLUGIN, "scripts", "agenten-log.sh")


class TestBericht(unittest.TestCase):
    def setUp(self):
        self.p = tempfile.mkdtemp(prefix="bericht-")
        os.makedirs(os.path.join(self.p, "docs"))

    def tearDown(self):
        shutil.rmtree(self.p, ignore_errors=True)

    def ende(self, eingabe):
        subprocess.run(["bash", LOG, "ende"], input=json.dumps(eingabe), text=True, capture_output=True,
                       env=dict(os.environ, CLAUDE_PROJECT_DIR=self.p), check=True)
        return sorted(glob.glob(os.path.join(self.p, "docs", "pruefberichte", "*.md")))

    def protokoll(self, *eintraege):
        pfad = os.path.join(self.p, "agent.jsonl")
        with open(pfad, "w", encoding="utf-8") as f:
            for e in eintraege:
                f.write(json.dumps(e) + "\n")
        return pfad

    def test_bericht_aus_protokoll_wenn_nachricht_leer(self):
        # Hintergrund-Agenten liefern last_assistant_message oft leer – früher stand dann nur die Kopfzeile da.
        pfad = self.protokoll(
            {"type": "user", "message": {"role": "user", "content": "Baue P3"}},
            {"type": "assistant", "message": {"content": [{"type": "text", "text": "Zwischenstand"}]}},
            {"type": "assistant", "message": {"content": [{"type": "tool_use", "name": "Bash"}]}},
            {"type": "assistant", "message": {"content": [{"type": "text", "text": "🟢 FERTIG\nAlle 14 Tests grün"}]}},
        )
        dateien = self.ende({"agent_type": "dev-team:reviewer", "agent_id": "abc", "last_assistant_message": "",
                             "agent_transcript_path": pfad})
        self.assertEqual(len(dateien), 1)
        inhalt = open(dateien[0], encoding="utf-8").read()
        self.assertIn("Alle 14 Tests grün", inhalt)
        self.assertNotIn("Zwischenstand", inhalt)
        log = open(os.path.join(self.p, "docs", "AGENTEN_LOG.md"), encoding="utf-8").read()
        self.assertIn("| ■ 🟢 | reviewer | 🟢 FERTIG", log)

    def test_direkte_nachricht_hat_vorrang(self):
        pfad = self.protokoll({"type": "assistant", "message": {"content": [{"type": "text", "text": "alt"}]}})
        dateien = self.ende({"agent_type": "tester", "last_assistant_message": "🟡 Bericht direkt",
                             "agent_transcript_path": pfad})
        self.assertIn("Bericht direkt", open(dateien[0], encoding="utf-8").read())

    def test_bericht_aus_berichtsuebergabe(self):
        # Nur lesende Prüfer übergeben ihren Bericht per SubagentHandback; die letzte Textzeile ist dann nur
        # „Bericht übergeben“ – früher stand nur diese Zeile in docs/pruefberichte/ (Pilot 31.10.).
        pfad = self.protokoll(
            {"type": "assistant", "message": {"content": [
                {"type": "tool_use", "name": "SubagentHandback",
                 "input": {"report": "🟡 Kritiker-Urteil\n1. Wichtig: Randfall fehlt"}}]}},
            {"type": "assistant", "message": {"content": [{"type": "text", "text": "Bericht übergeben."}]}},
        )
        dateien = self.ende({"agent_type": "kritiker", "agent_id": "k1", "last_assistant_message": "Bericht übergeben.",
                             "agent_transcript_path": pfad})
        inhalt = open(dateien[0], encoding="utf-8").read()
        self.assertIn("Randfall fehlt", inhalt)
        log = open(os.path.join(self.p, "docs", "AGENTEN_LOG.md"), encoding="utf-8").read()
        self.assertIn("| ■ 🟡 | kritiker |", log)

    def test_ohne_agententyp_kein_eintrag(self):
        # In Cloud-Sitzungen kamen Ereignisse ohne Agententyp mit Simons Chatnachricht an („? | mach weiter“).
        dateien = self.ende({"agent_type": "", "last_assistant_message": "Gut mach weiter"})
        self.assertEqual(dateien, [])
        log = os.path.join(self.p, "docs", "AGENTEN_LOG.md")
        self.assertNotIn("mach weiter", open(log, encoding="utf-8").read() if os.path.exists(log) else "")


if __name__ == "__main__":
    unittest.main()
