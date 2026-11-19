"""Tests für hooks/abschluss.mjs (kein „fertig“, solange ein neues Video ungemessen ist) und messen.py --art."""

import json
import os
import subprocess
import tempfile
import time
import unittest

PLUGIN = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
HOOK = os.path.join(PLUGIN, "hooks", "abschluss.mjs")
MESSEN = os.path.join(PLUGIN, "scripts", "messen.py")


def hook(cwd, aktiv=False):
    roh = json.dumps({"cwd": cwd, "stop_hook_active": aktiv})
    r = subprocess.run(["node", HOOK], input=roh, capture_output=True, text=True)
    return json.loads(r.stdout) if r.stdout.strip() else None


class Abschluss(unittest.TestCase):
    def setUp(self):
        self.ws = tempfile.mkdtemp()
        os.makedirs(os.path.join(self.ws, "video", "x", "pruefung"))
        os.makedirs(os.path.join(self.ws, "ausgabe"))

    def test_ohne_videoordner_nichts(self):
        leer = tempfile.mkdtemp()
        open(os.path.join(leer, "a.mp4"), "w").close()
        self.assertIsNone(hook(leer))

    def test_ungemessenes_video_blockt(self):
        open(os.path.join(self.ws, "ausgabe", "video.mp4"), "w").close()
        r = hook(self.ws)
        self.assertEqual(r["decision"], "block")
        self.assertIn("ausgabe/video.mp4", r["reason"])

    def test_gemessenes_video_frei(self):
        open(os.path.join(self.ws, "ausgabe", "video.mp4"), "w").close()
        time.sleep(1.2)
        open(os.path.join(self.ws, "video", "x", "pruefung", "messung_abgabe.json"), "w").close()
        self.assertIsNone(hook(self.ws))

    def test_nur_einmal_je_stopp(self):
        open(os.path.join(self.ws, "ausgabe", "video.mp4"), "w").close()
        self.assertIsNone(hook(self.ws, aktiv=True))

    def test_originale_und_zwischenstaende_zaehlen_nicht(self):
        os.makedirs(os.path.join(self.ws, "material"))
        open(os.path.join(self.ws, "material", "interview.mp4"), "w").close()
        open(os.path.join(self.ws, "video", "x", "pruefung", "entwurf.mp4"), "w").close()
        self.assertIsNone(hook(self.ws))


class MessenArt(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.video = os.path.join(tempfile.mkdtemp(), "standbild.mp4")
        subprocess.run(["ffmpeg", "-v", "error", "-y", "-f", "lavfi", "-i", "testsrc2=s=640x360:r=25", "-f", "lavfi",
                        "-i", "sine=f=440:r=48000", "-t", "8", "-vf", "trim=end_frame=1,loop=loop=-1:size=1",
                        "-shortest", "-c:v", "libx264", "-c:a", "aac", cls.video], check=True)

    def lauf(self, *args):
        r = subprocess.run(["python3", MESSEN, self.video] + list(args), capture_output=True, text=True)
        return r.returncode, r.stdout

    def test_komposition_standbild_ist_p0(self):
        code, aus = self.lauf()
        self.assertEqual(code, 1, aus)
        self.assertIn("ohne neue Information", aus)

    def test_schnitt_standbild_nur_hinweis(self):
        code, aus = self.lauf("--art", "schnitt")
        self.assertNotIn("P0: F1", aus)
        self.assertIn("HINWEIS: F1", aus)


if __name__ == "__main__":
    unittest.main()
