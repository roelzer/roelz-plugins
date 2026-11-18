# Änderungsprotokoll Website-Bauer

## 0.1.0 – Gebaut vom Personaler, in Probearbeit

Anlass: Simon: „website bauen soll ähnlich wie grad mit den videos laufen, ich will dass ich das beste vom besten erschaffen kann. also brauch ich da auch bessere recherche“. Seine Vorbilder: landonorris.com und igloo.inc („die sind irre gut“). Unterlagen: `docs/personal/website-bauer/` (Bedarf, Probelauf mit 4 Seiten, Recherche in 4 Strängen, Muster, Stellenausschreibung, von Simon freigegeben am 18.11.2026).
- **Skill `/website:bauen`:** Vorbilder öffnen und fotografieren → Idee aus einem echten Merkmal des Auftraggebers mit Markentausch-Test → **Stopp 1** mit 2–3 grauen Rohfassungen → Bauen mit echten Bildern → Prüfskript, Kritiker, höchstens 3 Runden, beste Fassung behalten → **Stopp 2** auf Simons Laptop → Veröffentlichen nur auf Simons ausdrückliches Ja.
- **Agent `website-kritiker`:** unabhängig, öffnet die Seite selbst, vergleicht mit den Vorbildern, Noten nach festen Kriterien (angelehnt an Awwwards, für Betriebsseiten angepasst), bekommt die Begründungen des Erbauers nicht.
- **Prüfskript `scripts/pruefen.mjs`** (Node, Playwright, ohne KI): Bildschirmfotos an dichten Scrollstellen auf Handy, Tablet und Desktop. Es prüft:
  - Kontrast aus den Pixeln hinter jedem sichtbaren Text, gegen die ungünstigste Stelle (W3C F83)
  - leere schwarze Flächen
  - KI-Merkmale (Standardschriften, Dunkel + Neon, Lila-Verlauf, gehäuftes Vorlagen-Beiwerk, leere Foto-Platzhalter)
  - fremde Server, Cookies und Browser-Speicher
  - Arbeitsdateien in der Lieferung, Pflichtseiten, Typo-Verhältnisse
  **Geeicht an den Probelauf-Seiten:** P1 und P2 schlagen bei W1 an, P3 bei W9, P4 bei W2. Dazu Testseiten für W8 und W9 und eine gute Seite ohne harten Befund (`tests/test_pruefen_eichung.py`, 7 Tests).
- **`scripts/foto.mjs`:** Bildschirmfotos von Vorbildern und Rohfassungen.
- **Sperren (Node):**
  - Veröffentlichen löst immer eine Rückfrage an Simon aus.
  - Fremde Server in Dateien unter `website/*/site/` sind gesperrt.
  - Bilder, Modelle oder Schriften dürfen nur von freien Quellen geladen werden.
  - Abschluss-Sperre: kein „fertig“, solange die Seite ungeprüft ist (`tests/test_sperren.py`, 13 Tests).
- **Wissen:** `handwerk.md` (Idee, Vorbilder, KI-Merkmale, Zahlen von 11 Preisträgern, echtes Motiv, Lesbarkeit, nichts erfinden), `3d-leistung.md` (Stufen, Budget, Pixeldichte, vorab gerenderte Rundgänge), `bilder.md` (Openverse, Poly Haven, Unsplash, Pexels, Schriften, QUELLEN.md), `recht.md`.
- **15 Testfälle** in `evals/`, eigener Testläufer `tests/werkzeug/probearbeit.py` mit Messung durch das Prüfskript in beiden Armen.
