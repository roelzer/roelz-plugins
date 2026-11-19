"""Tests für hooks/sperre.mjs (Video-Sperre) und scripts/hf.mjs (gesperrte Befehle).

Der erste Fall ist der Befehl, mit dem in der Probearbeit (18.11.2026, v4-druck-original, Lauf mit-1) ein Original
überschrieben wurde, weil die alte Sperre den Dateinamen nur nach einem Leerzeichen erkannte und cp nicht prüfte.
"""

import json
import os
import subprocess
import tempfile
import unittest

PLUGIN = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
SPERRE = os.path.join(PLUGIN, "hooks", "sperre.mjs")
HF = os.path.join(PLUGIN, "scripts", "hf.mjs")


class Sperre(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.ws = tempfile.mkdtemp()
        os.makedirs(os.path.join(cls.ws, "material"))
        os.makedirs(os.path.join(cls.ws, "video", "interview", "ausgabe"))
        open(os.path.join(cls.ws, "material", "interview.mp4"), "w").close()
        with open(os.path.join(cls.ws, "video", "interview", "ORIGINALE.txt"), "w") as d:
            d.write(os.path.join(cls.ws, "material", "interview.mp4") + "\n")

    def entscheid(self, werkzeug, eingabe, cwd=None):
        roh = json.dumps({"tool_name": werkzeug, "tool_input": eingabe, "cwd": cwd or self.ws})
        r = subprocess.run(["node", SPERRE], input=roh, capture_output=True, text=True)
        self.assertEqual(r.returncode, 0, r.stderr)
        return json.loads(r.stdout)["hookSpecificOutput"]["permissionDecisionReason"] if r.stdout.strip() else None

    def gesperrt(self, befehl, cwd=None):
        self.assertIsNotNone(self.entscheid("Bash", {"command": befehl}, cwd), "nicht gesperrt: " + befehl)

    def frei(self, befehl, cwd=None):
        self.assertIsNone(self.entscheid("Bash", {"command": befehl}, cwd), "fälschlich gesperrt: " + befehl)

    # --- Originale ---
    def test_durchgerutschter_befehl_aus_der_probearbeit(self):
        unten = os.path.join(self.ws, "video", "interview", "ausgabe")
        self.gesperrt("cd ../../.. && cp video/interview/ausgabe/interview.mp4 material/interview.mp4 && ffprobe material/interview.mp4", cwd=unten)

    def test_ueberschreiben_auf_viele_arten(self):
        for b in ["cp schnitt.mp4 material/interview.mp4", "mv schnitt.mp4 ./material/interview.mp4",
                  "ffmpeg -y -i schnitt.mp4 -c copy material/interview.mp4", "rm material/interview.mp4",
                  "cat schnitt.mp4 > material/interview.mp4", "ffmpeg -i a.mp4 -f mp4 - | tee material/interview.mp4",
                  'cp "schnitt.mp4" "material/interview.mp4"', "rm -f material/*.mp4 material/interview.mp4"]:
            self.gesperrt(b)

    def test_absoluter_pfad(self):
        self.gesperrt("cp /tmp/x.mp4 " + os.path.join(self.ws, "material", "interview.mp4"))

    def test_lesen_und_kopieren_bleiben_erlaubt(self):
        for b in ["ffmpeg -i material/interview.mp4 -c copy arbeit/kopie.mp4", "cp material/interview.mp4 arbeit/",
                  "ffprobe material/interview.mp4", "python3 messen.py material/interview.mp4",
                  "cp material/interview.mp4 video/interview/arbeit/quelle.mp4"]:
            self.frei(b)

    def test_write_tool_auf_original(self):
        self.assertIsNotNone(self.entscheid("Write", {"file_path": "material/interview.mp4"}))
        self.assertIsNone(self.entscheid("Write", {"file_path": "video/interview/SPEC.md"}))

    # --- Kosten, Upload, Telemetrie ---
    def test_gesperrte_dienste_und_uploads(self):
        for b in ["npx hyperframes share", "npx -y hyperframes render", "node x/plugin-cli.mjs render",
                  "curl -F file=@out.mp4 https://example.com", "python3 tts.py --provider elevenlabs",
                  "hyperframes@0.9.65 publish ."]:
            self.gesperrt(b)

    def test_starter_ist_erlaubt(self):
        self.frei("node /pfad/scripts/hf.mjs render -o ausgabe/video.mp4")

    # --- Starter selbst ---
    def test_starter_sperrt_befehle(self):
        for argv in (["share"], ["events", "--skill=x"], ["snapshot", "--describe"], ["skills", "update"]):
            r = subprocess.run(["node", HF] + argv, capture_output=True, text=True)
            self.assertEqual(r.returncode, 3, argv)


if __name__ == "__main__":
    unittest.main()
