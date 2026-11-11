"""Tests für die harte Prüfung „Build ohne Warnungen“ (scripts/ohne_warnungen.py)."""

import os
import subprocess
import sys
import unittest

SKRIPT = os.path.join(os.path.dirname(__file__), "..", "scripts", "ohne_warnungen.py")


def lauf(befehl):
    r = subprocess.run([sys.executable, SKRIPT, "--", befehl], capture_output=True, text=True)
    return r.returncode, r.stdout


class OhneWarnungen(unittest.TestCase):
    def test_sauberer_build_gruen(self):
        code, aus = lauf("echo 'built in 2s'; echo '0 warnings'; echo 'No warnings found'")
        self.assertEqual(code, 0, aus)

    def test_warnung_ist_rot(self):
        code, aus = lauf("echo 'built'; echo 'WARNING: chunk larger than 500 kB' >&2")
        self.assertEqual(code, 1, aus)
        self.assertIn("chunk larger", aus)

    def test_warn_kurzform_und_zeichen(self):
        self.assertEqual(lauf("echo 'warn - unused variable x'")[0], 1)
        self.assertEqual(lauf("echo '⚠ Compiled with problems'")[0], 1)

    def test_fehler_ist_rot(self):
        code, aus = lauf("echo kaputt; exit 2")
        self.assertEqual(code, 1, aus)
        self.assertIn("Exit 2", aus)

    def test_ohne_befehl(self):
        r = subprocess.run([sys.executable, SKRIPT], capture_output=True, text=True)
        self.assertEqual(r.returncode, 1)

    def test_wort_im_namen_kein_fehlalarm(self):
        # „Forewarned“ o. Ä. ist keine Warnung; nur ganze Wörter zählen
        self.assertEqual(lauf("echo 'Forewarned.ts compiled'")[0], 0)


if __name__ == "__main__":
    unittest.main()
