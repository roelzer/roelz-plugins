"""W20: Das Drehbuch muss das Wow durch die ganze Seite tragen (handwerk.md 1c, Simon 24.11.2026)."""
import json
import os
import subprocess
import unittest

PLUGIN = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
KOPF = "| Abschnitt | laut/leise | Baustein | Übergang | Motiv | Farbe | Text |\n|---|---|---|---|---|---|---|\n"


def befunde(text):
    code = ("import { drehbuchBefunde } from %s; process.stdout.write(JSON.stringify(drehbuchBefunde(%s)))"
            % (json.dumps(os.path.join(PLUGIN, "scripts", "drehbuch.mjs")), json.dumps(text)))
    r = subprocess.run(["node", "--input-type=module", "-e", code], capture_output=True, text=True, timeout=30)
    return json.loads(r.stdout)


class Drehbuch(unittest.TestCase):
    def test_durchgezogen_ohne_befund(self):
        zeilen = ["| Einstieg | laut | E1 | – | Fliese kippt | grau | – |",
                  "| Leistungen | laut | L1 | Karte schiebt sich | Fliese als Karte | terrakotta | – |",
                  "| Satz | leise | T1 | Farbwechsel | – | weiß | Wort für Wort |",
                  "| Ablauf | laut | A1 | deckt auf | Fliese Schicht | weiß | – |",
                  "| Referenzen | leise | R2 | zieht auf | – | anthrazit | – |",
                  "| Schluss | laut | S2 | Fußzeile aufgedeckt | letzte Fliese | anthrazit | Kernsatz |"]
        self.assertEqual(befunde(KOPF + "\n".join(zeilen)), [])

    def test_nur_oben_laut_ist_p0(self):
        zeilen = ["| Einstieg | laut | E1 | – | Fliese | grau | – |"] + \
                 ["| %s | leise | – | einblenden | – | grau | – |" % n for n in ("Leistungen", "Ablauf", "Referenzen", "Team", "Kontakt")]
        b = befunde(KOPF + "\n".join(zeilen))
        self.assertEqual([x[0] for x in b if x[1] == "W20"].count("P0"), 1)
        self.assertIn("mittleren und im unteren", b[0][2])

    def test_fehlendes_drehbuch_nur_hinweis(self):
        self.assertEqual([x[0] for x in befunde(None)], ["Hinweis"])


if __name__ == "__main__":
    unittest.main()
