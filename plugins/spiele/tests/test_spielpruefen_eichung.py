"""Eichung des Prüfskripts (scripts/spielpruefen.mjs) an den Probelauf-Spielen (handwerk.md §9.3: Eine Schwelle, an der
die schlechten Ergebnisse bestehen, prüft nichts).

Vorlagen in tests/werkzeug/vorlagen/:
- werkstatt (Probelauf B) lädt eine Google-Schrift → S1 (fremde Anfragen) muss FEHLER sein.
- elfmeter (Probelauf A): Das Tor ist hochkant klein, aber das Canvas füllt den ganzen Bildschirm. Das Skript misst das
  Element, nicht den Inhalt, und kommt auf 1,0. Die Lücke ist ehrlich als erwarteter Fehlschlag festgehalten (strict:
  wird der Test eines Tages grün, fällt das auf). Die Schwelle 0,5 wird dafür nicht verbogen.
- raetsel (Probelauf C): DOM-Spiel ohne Canvas → Hochkant nicht messbar (Hinweis), aber Regelkarte (S6).
- gut: kleine gute Testseite mit Bot-Schnittstelle → kein FEHLER, Bot punktet, verliert, Neustart < 1 s.
- scrollt: flache Spielfläche ohne touch-action → S2 und S4 (Wisch im iframe scrollt die Seite).
- sperrt: touch-action: none auf html/body → S5.
Alle Läufe laufen parallel (je etwa 15 s). Braucht Node und Playwright mit Chromium.
"""

import concurrent.futures as cf
import json
import os
import subprocess
import tempfile
import unittest

import pytest

PLUGIN = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
VORLAGEN = os.path.join(PLUGIN, "tests", "werkzeug", "vorlagen")
LAEUFE = {"elfmeter": [], "werkstatt": [], "raetsel": [], "gut": ["--bot"], "scrollt": ["--bot"], "sperrt": []}
_ERGEBNIS = {}


def _lauf(name):
    aus = tempfile.mkdtemp()
    p = subprocess.run(["node", os.path.join(PLUGIN, "scripts", "spielpruefen.mjs"), os.path.join(VORLAGEN, name), aus, "--schnell"] + LAEUFE[name],
                       capture_output=True, text=True, timeout=300)
    with open(os.path.join(aus, "pruefung.json")) as d:
        j = json.load(d)
    j["_exit"], j["_aus"], j["_ordner"] = p.returncode, p.stdout, aus
    return name, j


def ergebnis(name):
    if not _ERGEBNIS:
        with cf.ThreadPoolExecutor(len(LAEUFE)) as pool:
            _ERGEBNIS.update(dict(pool.map(_lauf, LAEUFE)))
    return _ERGEBNIS[name]


def fehler(j, code):
    return [b for b in j["befunde"] if b["schwere"] == "FEHLER" and b["fehler"] == code]


def hinweise(j, code):
    return [b for b in j["befunde"] if b["schwere"] == "Hinweis" and b["fehler"] == code]


class Eichung(unittest.TestCase):
    def test_werkstatt_fremde_schrift(self):
        j = ergebnis("werkstatt")
        self.assertTrue(fehler(j, "S1"), j["befunde"])
        self.assertTrue(any("fonts.googleapis.com" in u for u in j["fremde_anfragen"]))
        self.assertEqual(j["_exit"], 1)

    @pytest.mark.xfail(strict=True, reason="Canvas füllt den Bildschirm (Anteil 1,0); das kleine Tor darin misst kein engine-unabhängiges Skript. Prüfer und Fotos müssen es finden.")
    def test_elfmeter_hochkant_zu_klein(self):
        self.assertTrue(fehler(ergebnis("elfmeter"), "S2"))

    def test_elfmeter_regelkarte_und_messwerte(self):
        j = ergebnis("elfmeter")
        self.assertTrue(hinweise(j, "S6"), j["befunde"])
        self.assertEqual(j["hochkant"]["anteil"], 1)
        self.assertFalse(j["fremde_anfragen"])
        for f in ["hochkant-start.png", "hochkant-spiel.png", "quer-spiel.png", "eingebettet.png"]:
            self.assertTrue(os.path.exists(os.path.join(j["_ordner"], "fotos", f)), f)
        with open(os.path.join(j["_ordner"], "leistung.json")) as d:
            leistung = json.load(d)
        self.assertGreater(leistung["normal"]["fps"], 0)
        self.assertIn("gedrosselt_4x", leistung)

    def test_raetsel_regelkarte(self):
        self.assertTrue(hinweise(ergebnis("raetsel"), "S6"))

    def test_gute_seite_besteht(self):
        j = ergebnis("gut")
        self.assertFalse([b for b in j["befunde"] if b["schwere"] == "FEHLER"], j["befunde"])
        self.assertEqual(j["_exit"], 0)
        self.assertGreater(j["bot"]["max_punkte"], 0)
        self.assertTrue(j["bot"]["spielende"])
        self.assertLess(j["bot"]["neustart_ms"], 1000)
        self.assertGreaterEqual(j["hochkant"]["anteil"], 0.5)

    def test_flache_flaeche_und_iframe_scroll(self):
        j = ergebnis("scrollt")
        self.assertTrue(fehler(j, "S2"), j["befunde"])
        self.assertTrue(fehler(j, "S4"), j["befunde"])

    def test_ohne_bot_schnittstelle_hinweis(self):
        j = ergebnis("scrollt")
        self.assertTrue(hinweise(j, "S8"), j["befunde"])
        self.assertNotIn("bot", j)

    def test_touch_action_auf_body(self):
        self.assertTrue(fehler(ergebnis("sperrt"), "S5"))


class Aufruf(unittest.TestCase):
    def test_ohne_argumente_exit_2(self):
        p = subprocess.run(["node", os.path.join(PLUGIN, "scripts", "spielpruefen.mjs")], capture_output=True, text=True, timeout=30)
        self.assertEqual(p.returncode, 2)


if __name__ == "__main__":
    unittest.main()
