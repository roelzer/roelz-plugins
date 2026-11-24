# Hilfsfunktionen von yt.py (ohne Netz).
import importlib.util
import os
import unittest

SPEC = importlib.util.spec_from_file_location("yt", os.path.join(os.path.dirname(__file__), "..", "scripts", "yt.py"))
yt = importlib.util.module_from_spec(SPEC)
SPEC.loader.exec_module(yt)


class Hilfen(unittest.TestCase):
    def test_video_id(self):
        for t in ["https://www.youtube.com/watch?v=hG0bOVupyto&t=3s", "https://youtu.be/hG0bOVupyto",
                  "https://www.youtube.com/shorts/hG0bOVupyto", "hG0bOVupyto"]:
            self.assertEqual(yt.video_id(t), "hG0bOVupyto", t)
        with self.assertRaises(yt.Fehler):
            yt.video_id("kein link")

    def test_kanal(self):
        self.assertEqual(yt.kanal_angabe("https://www.youtube.com/@Promptgefl%C3%BCster/videos"), ("handle", "@Promptgeflüster"))
        self.assertEqual(yt.kanal_angabe("Promptgeflüster"), ("handle", "@Promptgeflüster"))
        self.assertEqual(yt.kanal_angabe("https://www.youtube.com/channel/UCfb8Rzk25eJ73VC0mJsNm5A"), ("id", "UCfb8Rzk25eJ73VC0mJsNm5A"))

    def test_dauer(self):
        self.assertEqual(yt.dauer("PT51M2S"), "51:02")
        self.assertEqual(yt.dauer("PT1H2M3S"), "1:02:03")
        self.assertEqual(yt.sekunden("PT2M59S"), 179)

    def test_kapitel_und_links(self):
        b = "Intro\n0:00 Einleitung\n2:15 - Planung\n10:40 Agenten\nMehr: https://example.org/blog)\n"
        self.assertEqual(yt.kapitel(b), [("0:00", "Einleitung"), ("2:15", "Planung"), ("10:40", "Agenten")])
        self.assertEqual(yt.links(b), ["https://example.org/blog"])
        self.assertEqual(yt.kapitel("3:00 nur eine Zeitmarke"), [])


if __name__ == "__main__":
    unittest.main()
