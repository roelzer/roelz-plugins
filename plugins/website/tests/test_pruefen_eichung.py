"""Eichung des Prüfskripts (scripts/pruefen.mjs) – Lehre aus dem Video-Editor: Eine Schwelle, an der die schlechten
Probelauf-Ergebnisse bestehen, prüft nichts.

Negativbeispiele: die Probelauf-Seiten in docs/personal/website-bauer/probelauf-seiten (P1 Verein, P2 Firma, P4
Schreinerei) und kleine Testseiten in tests/seiten. Positivbeispiel: tests/seiten/gut.
- P1 und P2 müssen bei W1 (KI-Look) anschlagen, P4 bei W2 (leere Foto-Platzhalter).
- tests/seiten/w8-leer muss W8 (leere schwarze Fläche), w9-kontrast muss W9 (Text über hellem Bild) auslösen.
- tests/seiten/gut darf keinen harten Befund haben (mit _headers aus scripts/kopfzeilen.mjs).
- tests/seiten/unsicher muss die Sicherheits- und Rechtsprüfungen auslösen (Inline-Ereignis, Schlüssel, Source Map,
  EXIF/GPS im Foto, Autor im PDF, fehlende Header, OS-Plattform-Link).
Hinweis: Der schwarze Balken aus P4 war ein Zustand beim Laden und ließ sich nicht wieder hervorrufen; W8 wird deshalb
an einer Testseite geprüft. P3 (3D-Rundgang) ist ohne Grafikkarte zu langsam für einen Test.
Braucht Node und Playwright mit Chromium. Dauer: einige Minuten.
"""

import json
import os
import subprocess
import tempfile
import unittest

PLUGIN = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
REPO = os.path.abspath(os.path.join(PLUGIN, "..", ".."))
PROBELAUF = os.path.join(REPO, "docs", "personal", "website-bauer", "probelauf-seiten")
SEITEN = os.path.join(PLUGIN, "tests", "seiten")


def pruefen(ordner):
    aus = tempfile.mkdtemp()
    subprocess.run(["node", os.path.join(PLUGIN, "scripts", "pruefen.mjs"), ordner, "--aus", aus, "--schnell"],
                   capture_output=True, text=True, timeout=900)
    with open(os.path.join(aus, "pruefung.json")) as d:
        return json.load(d)


def harte(ergebnis, fehler):
    return [b for b in ergebnis["befunde"] if b["schwere"] == "P0" and b["fehler"] == fehler]


class Eichung(unittest.TestCase):
    def test_p1_verein_ki_look(self):
        self.assertTrue(harte(pruefen(os.path.join(PROBELAUF, "p1")), "W1"))

    def test_p2_firma_ki_look(self):
        self.assertTrue(harte(pruefen(os.path.join(PROBELAUF, "p2")), "W1"))

    def test_p4_schreinerei_leere_fotoplaetze(self):
        self.assertTrue(harte(pruefen(os.path.join(PROBELAUF, "p4")), "W2"))

    def test_leere_flaeche(self):
        self.assertTrue(harte(pruefen(os.path.join(SEITEN, "w8-leer")), "W8"))

    def test_text_ueber_hellem_bild(self):
        self.assertTrue(harte(pruefen(os.path.join(SEITEN, "w9-kontrast")), "W9"))

    def test_gute_seite_ohne_harten_befund(self):
        e = pruefen(os.path.join(SEITEN, "gut"))
        self.assertEqual(e["p0"], 0, [b["text"] for b in e["befunde"] if b["schwere"] == "P0"])

    def test_unsichere_seite(self):
        e = pruefen(os.path.join(SEITEN, "unsicher"))
        texte = " | ".join(b["text"] for b in harte(e, "Sicherheit"))
        for erwartet in ("Inline-Ereignis", "Schlüssel", "Interne Angabe", "EXIF", "PDF-Metadaten", "_headers fehlt"):
            self.assertIn(erwartet, texte)
        self.assertTrue(any("OS-Plattform" in b["text"] for b in harte(e, "Recht")))

    def test_lieferordner_mit_arbeitsdateien(self):
        d = tempfile.mkdtemp()
        for f in ("index.html", "impressum.html", "datenschutz.html", "_headers"):
            with open(os.path.join(SEITEN, "gut", f)) as q, open(os.path.join(d, f), "w") as z:
                z.write(q.read())
        os.makedirs(os.path.join(d, "_pruefung"))
        open(os.path.join(d, "_pruefung", "shot.png"), "w").close()
        self.assertTrue(harte(pruefen(d), "W7"))


if __name__ == "__main__":
    unittest.main()
