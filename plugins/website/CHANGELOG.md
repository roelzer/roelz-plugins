# Änderungsprotokoll Website-Bauer

## 0.4.0 – Das Wow zieht sich durch, Bausteine zur Auswahl, Kunden pflegen selbst
Simon, 24.11.2026: „das obere ist immer noch am coolsten, nach unten hin z. B. der Meterstab war halt sehr einfach wieder gemacht, ohne Mühe, das Wow soll nicht nur oben sein, sondern sich durchziehen“, „Vorschläge für Bausteine liefern, ich wähl aus und dann zusammenbauen“, Kunden pflegen die Seite selbst. Neue Vorbilder: Zoox, AirPods 5, Scale („vor allem Scale ist echt krass“), Stripe Press, ikilledacactus, ausgewertet mit Bildserien, Technik und fps-Messung.
- **`handwerk.md` 1c „Das Wow zieht sich durch“:** acht Prinzipien aus den Vorbildern (Motiv verwandelt sich mindestens dreimal, eigener Übergang je Abschnitt, laut/leise im Wechsel mit einem lauten Moment je Drittel, Farbe trägt das Kapitel, Typografie bewegt sich, Schluss antwortet auf den Anfang, Zeichen des Gewerks, Bewegung am Scrollen). Klar definiert, was „mit Mühe“ heißt. Ersetzt „Danach nicht abfallen“ (eine kleine Bewegung je Abschnitt reichte Simon nicht).
- **Drehbuch** `arbeit/drehbuch.md` je Abschnitt; das Prüfskript liest es (**W20**): kein lauter Moment in einem Drittel ist P0, zu wenig Motiv-Auftritte und bloßes Einblenden sind Hinweise. Tests dazu.
- **Stopp 1 ist jetzt ein Bausteinkatalog:** je Abschnitt 2–3 laufende Bausteine mit dem Motiv des Auftraggebers, als eine Datei zum Durchscrollen plus Bilderblätter. Simon wählt, daraus wird das Drehbuch. Neue Datei `wissen/bausteine.md` mit über 20 Bauformen (Technik, Aufwand, Risiko, Vorbild) und einem Beispiel für einen Fliesenleger.
- **Kritiker:** bewertet jedes Drittel einzeln mit Bild. Liegt eins mehr als 2 Punkte unter dem ersten, ist das ❌.
- **Ruckeln:** belegte Leistungsregeln aus den Vorbildern (kein bildfüllendes WebGL, Videos erst bei Sicht mit Standbild, Bildfolgen auf 2D-Canvas statt Lottie, ein Modell mit vielen Texturen). Folgerung: Das Wow kommt aus Verwandlung, Übergängen und Rhythmus, nicht aus WebGL.
- **Kunden pflegen selbst:** Sveltia CMS unter `/admin/` mit Login ohne GitHub-Konto (Sveltia CMS Additions auf Cloudflare Free), Inhalte nur in `content/`, feste Felder, Design nie erreichbar, deutsche Oberfläche, Anleitung auf einer Seite. Recherche in `docs/recherche/2026-11-24-kunden-pflege.md`.

## 0.3.4 – Veröffentlichen laut Auftrag ohne Rückfrage
Simon, 24.11.2026: „sowas wie Cloudflare pushen, will ich, dass ich nicht 3 mal bestätigen muss … angenommen es steht im Auftrag, dann soll das auch gleich erstellt werden und dann gepusht“.
- Steht das Veröffentlichen im Auftrag, schreibt der Skill zu Beginn `arbeit/veroeffentlichen.md` mit Simons Satz wörtlich.
- Die Sperre lässt `wrangler deploy` und Co. dann **ohne Rückfrage** durch („allow“, damit fragt auch Claude Code nicht mehr). Bedingung: Die jüngste Prüfung hat keinen P0 und ist neuer als jede Datei in `site/`.
- Fehlt der Auftrag, ist die Prüfung rot oder veraltet, fragt Claude Code wie bisher.
- Tests dazu.

## 0.3.3 – Mehr Prüfregeln aus dem GitHub-Abgleich (24.11.2026)
Anlass: GitHub-Abgleich 24.11.2026. Quellen: impeccable, Hallmark, Vercel Web Interface Guidelines, gsap-skills, Anthropic `frontend-design`. Übernommen sind nur Ideen und Schwellen, die Umsetzung ist eigen, kein fremder Code.
- Prüfskript, KI-Look (W1):
  - P0: Verlaufstext, Neon-Leuchtrand, Creme-Grund mit Serifen-Überschrift und Terrakotta.
  - Hinweis: Creme-Grund allein, federnde Bewegung (`cubic-bezier` über 0…1).
  - Zählt zum Beiwerk: pulsierender Punkt, Icon-Kachel über Überschrift, Meta-Zeilen „A · B · C“, Seitenstreifen an runder Karte.
- Prüfskript, Technik und Zugang:
  - W13 (P0): Inhalt bleibt unsichtbar. Die Seite wird bis unten und zurück gescrollt, auch mit „Bewegung reduzieren“. Erfasst auch auf null zugeschnittene Flächen (der leere Team-Rahmen aus dem Schreinerei-Test).
  - W14 (P0): Fokus sichtbar, gemessen mit bis zu 16× Tab. Dazu `outline: none` ohne `:focus-visible` im CSS.
  - W15 (P0): Zoom gesperrt.
  - W16: 320 px seitlich (P0), Fließtext über 1600 px bei 1920 px (Hinweis).
  - W17 (Hinweis): Text fehlt am Handy.
  - W18 (Hinweis): `transition: all` bzw. animierte Breite, Höhe, top oder left.
  - W19 (P0): GSAP `markers: true` im eigenen Code.
- `leistung.mjs`: Misst auch die Barrierefreiheit. Unter 90 gibt es einen Hinweis in Ausgabe und JSON. Der Exit-Code hängt weiter nur an der Leistung.
- `handwerk.md`:
  - §3: weitere Vorlagen-Merkmale.
  - §4: nur `transform` und `opacity` animieren, Breiten von 320 bis 1920 px.
  - §8: sichtbarer Fokus, Zoom nie sperren.
  - §9: Prüfhilfen raus.
- Kritiker: Pflichtfrage 11 (Tab bis zum Kontakt-Knopf, Fokus sichtbar). Vor dem Urteil nennt er ein Element, das man streichen sollte.
- Eichung: zehn neue Testseiten: neun mit Fehler und `gut-zugang` als Gegenprobe ohne Fehlalarm.

## 0.3.2 – Alles aus dem Schreinerei-Test im Skill (23.11.2026)
Simon zur Schreinerei v2: „Ja is cool so, Bau alles in den skill ein.“
- Neues Werkzeug `scripts/vorschau.mjs`:
  - Packt die Seite in eine einzelne HTML-Datei für Simon (Doppelklick, Claude-App). Impressum und Datenschutz kommen als aufklappbare Abschnitte dazu.
  - Mit `--pruefen` fotografiert es die Datei eingebettet und meldet, wenn der Moment nicht von selbst abspielt.
  - Es meldet auch, wenn unten etwas unsichtbar bleibt oder sich nichts bewegt.
  - Bisher hat der Bauer das jedes Mal von Hand gebastelt. Den leeren Team-Rahmen hätte das Werkzeug gefunden.
- Skill:
  - Stopp 2 liefert über `vorschau.mjs`.
  - Bei Noten, die höchstens 0,4 auseinanderliegen, gilt die spätere Fassung, wenn sie benannte Fehler behebt.
  - Nach der letzten Kritiker-Runde laufen Prüfskript und Vorschau-Prüfung erneut.
- `handwerk.md`:
  - §11.12: Der Kontakt bleibt immer erreichbar, auch während einer langen Bühne.
  - 1b: Stolperstein IntersectionObserver bei auf null zugeschnittenen Elementen.
- `3d-leistung.md`: pro Bild kein Layout lesen, Scroll-Ereignisse über `requestAnimationFrame`.
- Neuer Test `tests/test_vorschau.py`.

## 0.3.1 – Nicht abfallen, nicht ruckeln (Schreinerei-Test, 23.11.2026)
Simon zur fertigen Schreinerei: „find ich cool, wird nach unten hin immer langweilig und ruckelt bisschen“.
- `handwerk.md` 1b: Nach dem Moment nicht abfallen. Jeder Abschnitt darunter bekommt eine kleine eigene Bewegung aus derselben Bildsprache (CSS/SVG beim Hineinscrollen), und der Schluss greift den Moment wieder auf.
- Kritiker: neue Pflichtfrage 5b „Fällt die Seite nach dem Moment ab?“ mit Bild der unteren Hälfte.
- `3d-leistung.md`:
  - Pixeldichte am Desktop höchstens 1, am Handy höchstens 1,5.
  - Ruckel-Bremse, die die Auflösung selbst senkt.
  - Keine VSM-Schatten und kein Klarlack-Material.

## 0.3.0 – Hauptidee statt Stangenware (Probearbeit, 20.11.2026)
Die Probearbeit zeigte: Mit Plugin bestanden die großen Aufträge jede Prüfung (1,00 gegen 0,60–0,71 ohne), aber alle Seiten hatten denselben Einstieg. Simon: „haut mich jetz alles nicht so um“. Der Haus-Rundgang in 3D lief zweimal ins Zeitlimit.
- `handwerk.md` Abschnitt 1b: Jede neue Seite bekommt eine Hauptidee, also einen Moment aus dem Auftraggeber, der beim Scrollen passiert. Drei Kandidaten, Merk-Test, Liste mit Dingen, die keine Hauptidee sind.
- Skill:
  - Stopp 1 zeigt 2–3 Hauptideen als Skizze (Anfang, Mitte, Ende) statt grauer Layouts.
  - Neuer Stopp 1b: Erst läuft der Moment als Durchstich, Simon sieht ihn, dann wird der Rest gebaut.
  - Reihenfolge Moment → ganze Seite grob → Feinschliff, damit immer etwas lauffähig ist.
- `3d-leistung.md` „Umfang klein planen“: ein Objekt oder eine Szene, eine Bewegung, Zeitkasten mit Stufe zurück, kleine Bildfolgen.
- Kritiker: zuerst ein Merk-Urteil („merkt man sich“ oder „langweilig“) neben dem Lando-Foto, neues Kriterium Wow-Moment (25 %), bei „langweilig“ höchstens 6 von 10. Er bekommt die Hauptidee nicht zu sehen.
- Abschluss-Sperre: Neue Seiten brauchen `arbeit/hauptidee.md` und ein Merk-Urteil. Bleibt es in allen Runden „langweilig“, muss `arbeit/ehrlich.md` begründen, warum, und Simon erfährt es.
- Moment läuft auch in eingebetteter Vorschau und bei „Bewegung reduzieren“ (`handwerk.md` Abschnitt 11, Punkt 11; Schreinerei-Test: in der Claude-App bewegte sich nichts).
- Bauform festgehalten: ein Skill (Bauer, redet mit Simon), ein Agent (Kritiker), kein Website-Team (`stellenausschreibung.md` Abschnitt 7).
- Testfälle: q1–q4 prüfen Hauptidee und Merk-Urteil, v1 erwartet Hauptideen an Stopp 1. Vier neue Tests für die Sperre.

## 0.2.4 – Zehn Funde aus der Durchsicht des Entwurfs „Kombi“
- Neues Skript `leistung.mjs`: Lighthouse im Handy-Profil, Ziel ≥ 90, schreibt `leistung.json`. Gegenprobe: Der alte Stand misst 62 (11,2 s Blockierzeit), der aufgeräumte 99.
- Prüfskript:
  - künstlich kursive Schrift (W1),
  - Scroll-Bühne über 3,2 Bildschirmhöhen (W11),
  - Stillstand ohne JavaScript (W12),
  - unbenutzte mitgelieferte Dateien (Ballast),
  - Bibliotheken und Schriften fehlen in `QUELLEN.md` (Unterlagen).
- Abschluss-Sperre: verlangt Leistungsmessung ≥ 90, bei Umbauten `arbeit/wuensche.md`, kein `__pycache__`/`.pyc`/`.DS_Store`.
- `ablauf.mjs`: Handy auch quer, Option `--ohne-js`.
- `handwerk.md` Abschnitt 11 (zehn Regeln), `3d-leistung.md` (3D erst bei der ersten Bewegung, am Handy ohne Schatten, gleiche Umschaltregel, `<noscript>`), Skill entsprechend.
- Testfall `k3-wunsch-erhalten`, Eichungsseiten `kunstkursiv`, `ballast`, `buehne-ohne-js`, vier neue Sperren-Tests.

## 0.2.3 – Nachschulung aus dem SFH-Test
- Neues Skript `ablauf.mjs`: Bildserie eines Scroll-Ablaufs auf drei Laptop-Größen und am Handy.
- Prüfskript: neue Prüfung W10 „Texte überlappen“ (je Textzeile gemessen). Daten-Blöcke (`application/json`) zählen nicht mehr als CSP-Fehler. Bewusst dunkle Szenen lassen sich mit `data-pruefen="dunkel"` ausnehmen. Eine fehlende Server-Schnittstelle (`/api/…`) in der lokalen Vorschau ist nur noch ein Hinweis.
- Skill: Stopp 1 knapp, danach früher Entwurf und kurze Runden. An Stopp 1 nach Domain, E-Mail, Webspace und Pflege fragen. Altbestand gegen die KI-Merkmale prüfen, eigene Klassen mit Präfix. „Fertig“ erst nach Simons Test auf dem Laptop. Automatisches Veröffentlichen und Pflege-Anleitung gehören zur Abgabe. Webspace (IONOS) als Alternative beschrieben.
- `handwerk.md` Abschnitt 10: Simons Geschmack.
- Testfall `k2-altbestand`, Eichungs-Testseiten `w10-ueberlappung`, `kursiv`, `gut-sonderfaelle`.

## 0.2.2 – Lehren aus dem SFH-Wappen und der Kombi-Seite
- Prüfskript: kursive Serife in Überschriften ist jetzt ein harter Befund (P0).
- `handwerk.md`: kursive Serife in jeder Form ausgeschlossen; Hausschrift mit einer Stärke über Kontur kräftiger machen.
- `3d-leistung.md`: Rezept „Logo oder Wappen als 3D-Objekt“ neu: Vektor-Nachbau mit Messung, klare Fasen, ein Material je Farbe, Relief statt Kugel, Einstieg mit wahrer Geschichte und 3D-Umgebung.

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
