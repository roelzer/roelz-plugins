"""Eichung des Prüfskripts (scripts/pruefen.mjs) – Lehre aus dem Video-Editor: Eine Schwelle, an der die schlechten
Probelauf-Ergebnisse bestehen, prüft nichts.

Negativbeispiele: die Probelauf-Seiten in docs/personal/website-bauer/probelauf-seiten (P1 Verein, P2 Firma, P4
Schreinerei) und kleine Testseiten in tests/seiten. Positivbeispiel: tests/seiten/gut.
- P1 und P2 müssen bei W1 (KI-Look) anschlagen, P4 bei W2 (leere Foto-Platzhalter).
- tests/seiten/w8-leer muss W8 (leere schwarze Fläche), w9-kontrast muss W9 (Text über hellem Bild) auslösen.
- tests/seiten/gut darf keinen harten Befund haben (mit _headers aus scripts/kopfzeilen.mjs).
- Aus dem SFH-Test (19.11.2026): tests/seiten/w10-ueberlappung muss W10 (Texte überlappen) auslösen, kursiv muss
  „Kursive Serife“ (W1) melden, gut-sonderfaelle (gewollt dunkle 3D-Fläche, Datenblock, Schnittstelle nur online) darf
  keinen harten Befund haben.
- Aus der Durchsicht des Entwurfs „Kombi“ (19.11.2026): kunstkursiv (Schrift ohne Kursivschnitt kursiv gesetzt) → W1,
  ballast (unbenutzte Datei) → Ballast, buehne-ohne-js (420vh-Bühne, ohne JavaScript Stillstand) → W11 und W12.
- tests/seiten/unsicher muss die Sicherheits- und Rechtsprüfungen auslösen (Inline-Ereignis, Schlüssel, Source Map,
  EXIF/GPS im Foto, Autor im PDF, fehlende Header, OS-Plattform-Link).
- Aus dem GitHub-Abgleich (24.11.2026, Ideen von impeccable, Hallmark, Vercel, gsap-skills): je Seite eine neue harte
  Regel – w1-verlaufstext, w1-leuchtrand, w1-creme → W1; w13-unsichtbar (Text) und w13-rahmen (auf null
  zugeschnittener Rahmen wie im Schreinerei-Test) → W13; w14-fokus → W14 (Messung mit Tab und CSS-Text); w15-zoom → W15;
  w16-schmal (bei 320 px zu breit) → W16; w19-markers → W19. gut-zugang (Einblendung, die anspringt, eigener
  Fokus-Stil, verstecktes Menü, Text nur für Bildschirmleser, Hover-Zustände in Links) darf keinen harten Befund haben.
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

    def test_ueberlappender_text(self):
        self.assertTrue(harte(pruefen(os.path.join(SEITEN, "w10-ueberlappung")), "W10"))

    def test_kursive_serife(self):
        self.assertTrue(any("Kursive Serife" in b["text"] for b in harte(pruefen(os.path.join(SEITEN, "kursiv")), "W1")))

    def test_sonderfaelle_ohne_fehlalarm(self):
        e = pruefen(os.path.join(SEITEN, "gut-sonderfaelle"))
        self.assertEqual(e["p0"], 0, [b["text"] for b in e["befunde"] if b["schwere"] == "P0"])

    def test_kuenstlich_kursiv(self):
        self.assertTrue(any("Künstlich kursiv" in b["text"] for b in harte(pruefen(os.path.join(SEITEN, "kunstkursiv")), "W1")))

    def test_ballast(self):
        self.assertTrue(harte(pruefen(os.path.join(SEITEN, "ballast")), "Ballast"))

    def test_lange_buehne_und_ohne_javascript(self):
        e = pruefen(os.path.join(SEITEN, "buehne-ohne-js"))
        self.assertTrue(harte(e, "W11"))
        self.assertTrue(harte(e, "W12"))

    def test_verlaufstext(self):
        self.assertTrue(any("Verlaufstext" in b["text"] for b in harte(pruefen(os.path.join(SEITEN, "w1-verlaufstext")), "W1")))

    def test_neon_leuchtrand(self):
        self.assertTrue(any("Leuchtrand" in b["text"] for b in harte(pruefen(os.path.join(SEITEN, "w1-leuchtrand")), "W1")))

    def test_creme_serife_terrakotta(self):
        self.assertTrue(any("Creme" in b["text"] for b in harte(pruefen(os.path.join(SEITEN, "w1-creme")), "W1")))

    def test_inhalt_bleibt_unsichtbar(self):
        self.assertTrue(harte(pruefen(os.path.join(SEITEN, "w13-unsichtbar")), "W13"))

    def test_rahmen_bleibt_leer(self):
        self.assertTrue(any("zugeschnitten" in b["beleg"] for b in harte(pruefen(os.path.join(SEITEN, "w13-rahmen")), "W13")))

    def test_fokus_unsichtbar(self):
        texte = " | ".join(b["text"] for b in harte(pruefen(os.path.join(SEITEN, "w14-fokus")), "W14"))
        self.assertIn("mit Tab keinen sichtbaren Fokus", texte)
        self.assertIn("ohne :focus-visible", texte)

    def test_zoom_gesperrt(self):
        self.assertTrue(harte(pruefen(os.path.join(SEITEN, "w15-zoom")), "W15"))

    def test_320_seitlich(self):
        self.assertTrue(harte(pruefen(os.path.join(SEITEN, "w16-schmal")), "W16"))

    def test_gsap_markers(self):
        self.assertTrue(harte(pruefen(os.path.join(SEITEN, "w19-markers")), "W19"))

    def test_zugang_ohne_fehlalarm(self):
        e = pruefen(os.path.join(SEITEN, "gut-zugang"))
        self.assertEqual(e["p0"], 0, [b["text"] for b in e["befunde"] if b["schwere"] == "P0"])

    def test_ablauf_bildserie(self):
        aus = tempfile.mkdtemp()
        r = subprocess.run(["node", os.path.join(PLUGIN, "scripts", "ablauf.mjs"), os.path.join(SEITEN, "gut"), aus,
                            "--stellen", "0,1", "--warten", "500"], capture_output=True, text=True, timeout=600)
        self.assertEqual(r.returncode, 0, r.stdout + r.stderr)
        self.assertEqual(len([f for f in os.listdir(aus) if f.endswith(".png")]), 10)

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
