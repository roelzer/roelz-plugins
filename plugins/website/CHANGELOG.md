# Änderungsprotokoll Website-Bauer

## 0.2.1 – Rezept 3D-Logo

Simons Urteil über die Beispielseite: „4K, 3D oder Apple-Design ist gar nicht drin“. Danach entstand ein Muster: das Vereinswappen als 3D-Abzeichen in Metall-Optik. Das Rezept steht in `wissen/3d-leistung.md`. Übergabe: `docs/UEBERGABE-WEBSITE-BAUER.md`.

## 0.2.0 – Sicherheit, Recht und Simons erstes Feedback

Anlass: Simon: „was du auch noch ausführlich recherchieren musst für unser plugin sind sicherheitslücken, keine daten im frontend, keine rechtlichen lücken allgemein, die website einfach nicht angreifbar“. Dazu sein Feedback zur Beispielseite (Neubau SFH): Hausschrift beibehalten, eigener Spruch statt „Ein Dorf. Ein Verein.“, „sehr in die fresse, könnte teilweise noch bisschen dezenter sein“, „die 77 aber noch dicker machen“.
- **Sicherheit** (`wissen/sicherheit.md`, Recherche-Strang E): strenge Header mit CSP, neues Skript `scripts/kopfzeilen.mjs` (Hashes für eingebettete Stile und Skripte, HSTS ohne preload, `.assetsignore`). `pruefen.mjs` prüft jetzt ohne Browser:
  - Positivliste der Dateien
  - Schlüssel und Passwörter, Source Maps, interne Pfade
  - Inline-Ereignisse, eval, document.write, innerHTML
  - EXIF/GPS in Fotos, Autoren in PDF-Metadaten (beim SFH-Neubau gefunden)
  - fehlende oder schwache `_headers`, CSP-Hashes, die nicht zu den eingebetteten Blöcken passen
- **Recht** (`wissen/recht.md`, Strang F): Impressum je Fall, Datenschutz-Gerüst (Cloudflare-DPA, DPF mit SCC-Rückfall), Kinderfotos nur mit bestätigter Elterneinwilligung, Musterseiten, BFSG-Ausnahmen, OS-Plattform-Link entfernen. `pruefen.mjs` meldet einen fehlenden Impressum-Link auf jeder Seite und den OS-Plattform-Link als harten Befund.
- **Handwerk:** Hausschrift, Farben und Sprüche des Auftraggebers bleiben. „Wow heißt nicht laut“: nur ein großer Moment, sonst maßvolle Größen. Der Kritiker fragt beides ab, dazu Kinderfotos.
- **Prüfer-Befunde eingearbeitet:**
  - Veröffentlichungs-Sperre erfasst wrangler@x, versions, git push, rsync/scp und gilt nur in Website-Projekten.
  - QUELLEN.md darf Adressen nennen.
  - Weg-Prüfpunkte zählen nur im Mit-Arm.
  - Die Abschluss-Sperre verlangt 3 Vorbild-Fotos und eine gesicherte Kritik.
  - Der Läufer meldet, ob der Konto-Skill geladen war.
- Prüfskript: Texte, die feste Leisten berühren oder verdeckt sind, werden nicht gemessen (Fehlalarme an der SFH-Seite).
- Tests: Eichung 8 und Sperren 17 Tests, alle grün. Neue Testseite `tests/seiten/unsicher`.

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
