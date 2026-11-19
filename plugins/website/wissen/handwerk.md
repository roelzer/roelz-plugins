# Handwerk: so entsteht eine Seite auf Spitzenniveau

Stand 18.11.2026. Jede Regel stammt aus dem Probelauf (Fehler W1–W9, `docs/personal/website-bauer/probelauf.md`) oder aus der Profi-Recherche (`docs/personal/website-bauer/recherche.md`, dort mit Quelle und Zitat). Maßstab sind Simons Vorbilder **landonorris.com** (Awwwards Site of the Year 2025) und **igloo.inc** (Site of the Year 2024).

## 1. Idee vor dem ersten Pixel (gegen W1)
- Schreib in `arbeit/idee.md` **einen Satz**: Was ist die Idee der Seite, und aus welchem **echten Merkmal des Auftraggebers** kommt sie (Logo, Wappen, Material, Ort, Werkzeug, eine wahre Geschichte)? Vorbilder: Bei Lando kommt das Neon vom Helm. Bei einem Dorfverein wurde das neue Flutlicht, über das der Verein selbst geschrieben hatte, zum Einstieg.
- **Markentausch-Test:** Würde die Seite genauso gut zu einem Konkurrenten derselben Branche passen? Dann ist die Idee zu schwach. Schreib die Antwort mit Begründung in `idee.md`.
- **Plan vor Code:** 4–6 Farben mit Hex-Wert und Herkunft, Schriftrollen, eine grobe Skizze des Aufbaus. Dann prüfen: „Käme ich bei einem ähnlichen Auftrag genauso hierhin?“ Ausgeschlossen sind **die Standardseite der Branche und ihr vorhersehbares Gegenteil**. Beispiele: SaaS-Schwarzweiß mit Kacheln bzw. Dark Mode mit Neon (Sport), Creme mit Serife und Terrakotta (Handwerk, „edel“).
- Keine Superlative im eigenen Plan („preisverdächtig“, „museumsreif“). Sie führen nachweislich zu Einheitsergebnissen. Beschreib stattdessen konkret, was zu sehen ist.

**Was der Auftraggeber schon hat, bleibt** (Simon zur SFH-Seite, 18.11.2026: „schriftart sollte aber die von der website davor bleiben, das is ja so bisschen unsere corporate schrift“). Hausschrift, Farben, Logo und eigene Sprüche des Auftraggebers werden übernommen, nicht durch eigene Ideen ersetzt. Gibt es eine bisherige Seite oder Drucksachen, prüfst du sie zuerst darauf. Eigene Sprüche schlägst du an Stopp 1 als Annahme vor, Simon korrigiert sie („Ein Dorf. Ein Verein.“ war „nicht so unsers“, besser „Grün-Weiß, ein Leben lang“).

## 2. Vorbilder wirklich ansehen (gegen W3)
- Öffne **mindestens 3 Vorbilder** und fotografiere sie (Playwright, 1440 px und 390 px) nach `arbeit/vorbilder/`. Simons Vorbilder (Lando, Igloo) sind immer dabei. Dazu 1–2 aus der Branche, z. B. von Awwwards (Kategorie und Jury-Note ansehen).
- Leite daraus eine Tabelle in `arbeit/idee.md` ab: **Vorbild → übernommener Gestaltungswert** (Schriftgrößen-Verhältnis, Laufweite, Farbanzahl, Art und Dauer der Bewegung, wie Text auf Bild steht). Jeder Wert der Seite stammt aus dieser Tabelle oder aus dem Auftraggeber.
- Nachgebaut wird nichts. Übernommen werden Maße und Prinzipien, keine Dateien (die Sperre blockt Downloads von Vorbild-Seiten).

## 3. KI-Merkmale: nicht verwenden (gegen W1)
Quelle: Anthropic-Skill `frontend-design` (2026), Impeccable, Anthropic Cookbook. Das Prüfskript erkennt die messbaren davon.
- **Farben:** fast schwarzer Grund mit **einer** grellen Akzentfarbe (Säuregrün, Neon-Gelbgrün, Zinnober). Nachtblau oder Schwarz mit Neon. Lila-Verläufe. Creme `#F4F1EA` mit Serifen-Titel und Terrakotta `#D97757`. Cyan auf Dunkel, Neon-Leuchtränder, Verlaufstext.
- **Schrift:** Inter (auch Inter Tight), Roboto, Arial, Space Grotesk, Geist als Hauptschrift. **Kursive Serife in jeder Form**: als „edler“ Titel, als zweite Zeile („am Irle.“), als Einschub („seit 1977“) oder in Kopf- und Fußzeile. Simon, 19.11.2026: „diese kursiv schrift is auch KI typisch“. Das Prüfskript meldet es als P0. Stattdessen die Hausschrift in der Akzentfarbe.
- **Aufbau:** gleich große Karten mit einem Radius und weichem Schatten (Bento-Baukasten), Icon-Kachel über jeder Überschrift, Großbuchstaben-Label über jeder Überschrift, „01/02/03“ ohne echte Reihenfolge, große Zahl mit kleinem Label und Verlauf, ein einzeln eingefärbtes Wort im Titel, FAQ-Akkordeon als Füllung, durchgestrichene „Das bekommen Sie nicht“-Liste, „→“ an jedem Knopf.
- **Bewegung:** jede Sektion gleitet von unten herein, Hover-Effekt auf jeder Karte, pulsierender Punkt, Laufband, Cursor-Blob, alles schwebt.
- **Bilder:** selbst gezeichnete Szenen, Maskottchen, Emoji statt Symbolen, Glas-Effekte als Deko.
Gegenmittel ist nicht „das Gegenteil“, sondern die Herleitung aus dem Auftraggeber (Abschnitt 1).

## 4. Zahlen der Preisträger (gemessen an 11 Awwwards-Tagessiegern 2024–2026)
- **Rangordnung:** größte Überschrift 4- bis 10-mal so groß wie der Fließtext.
- **Laufweite:** große Überschriften −0,01 bis −0,05 em; kleine Großbuchstaben-Labels +0,02 bis +0,12 em.
- **Zeilenlänge:** Fließtext 30–64 ch breit (Practical Typography: 45–90 Zeichen).
- **Farben:** zwei Grundfarben, höchstens ein Akzent, warm-erdig oder Schwarz-Weiß.
- **Schriften:** Display-Grotesk, oft mit einer Serife als Kontrast. Kostenlos und selbst hostbar sind z. B. Mona Sans (die Schrift der Lando-Seite), Work Sans, IBM Plex. Fontshare ist kostenlos kommerziell nutzbar, aber nicht OFL: Lizenzdatei lesen.
- **Bewegung:** Bedienelemente 150–400 ms, große einmalige Auftritte 600–1000 ms, immer abbremsend (z. B. `cubic-bezier(.19,1,.22,1)` oder `cubic-bezier(.22,1,.36,1)`), nie linear. NN/g: Ab 500 ms wirken wiederkehrende Animationen zäh.
- **Ein Wow-Moment je Seite.** Daneben nur ruhige Einblendungen.
- **Hausschrift mit nur einer Stärke kräftiger machen** (Simon: „Schriftart gern noch bissle dicker“): Kontur in der eigenen Farbe mit `-webkit-text-stroke: 0.06–0.08em currentColor; paint-order: stroke fill;` und Laufweite +0,02 em. Die Kontur wächst dann nach außen, die Buchstaben bleiben scharf.
- **Wow heißt nicht laut** (Simon: „sehr in die fresse, könnte teilweise noch bisschen dezenter sein“). Nur der eine große Moment darf riesig sein. Überschriften sonst etwa 40–90 px am Desktop, Fließtext-Sätze normal fett, viel Luft. Lieber eine kräftige Form (z. B. eine dicke Ziffer als Fenster ins Foto) als viele große Schriften.

## 5. Echtes Motiv (gegen W2)
- **Das echte Motiv trägt die Seite, 3D ist Zugabe.** Bei allen 11 gemessenen Preisträgern liegt 3D auf etwas Echtem (Helm auf echtem Porträt, Gläser mit echten Etiketten).
- **Reihenfolge:** (1) Bilder und Objekte von Simon bzw. dem Auftraggeber. (2) Freie Fotos und Modelle mit Lizenz (`wissen/bilder.md`). (3) In Blender gerenderte Bilder. Nie das Hauptmotiv als Platzhalter.
- **3D aus Fotos, nicht aus dem Kopf.** Claude modelliert von Grund auf nur einfache Formen („Claude's from-scratch geometry is basic“). Fotografisch erfasste Modelle (Poly Haven, CC0) mit echtem Studiolicht (HDRI) wirken echt. Belegt durch das Muster in `docs/personal/website-bauer/muster/`.
- **Keine im Browser berechneten Ersatz-Oberflächen** (Holzmaserung aus einem Shader, Lutscher-Bäume) als Hauptbild.
- Wo echtes Material fehlt und zwingend vom Auftraggeber kommen muss (Team, eigene Werkstatt): sichtbar markierter Platzhalter **außerhalb** des Einstiegs, und die Stelle kommt in die Austauschliste.
- **Kleine Fotos** (z. B. 1024 px aus einem Vereinsarchiv): nicht über die ganze Breite ziehen. Als Karte, im Raster, mit Rahmen oder in Schwarz-Weiß mit Vereinsfarbe als Fläche nutzen.

## 6. Lesbarkeit (gegen W9)
- Kontrast mindestens 4,5:1, bei großer Schrift (ab 24 px bzw. 18,66 px fett) 3:1. **Gemessen wird gegen die ungünstigste Stelle des Bildes dahinter** (W3C F83), an jeder Scrollstelle. Lighthouse und axe prüfen Text auf Bildern nicht, deshalb misst das Prüfskript aus den Pixeln.
- Text auf Bild nur auf ruhige, dunkle Bildzonen oder mit Abdunklung (Verlauf mit etwa 50 % statt 30 % Deckkraft). Feste Kopfleisten brauchen eine eigene Fläche, sobald sie über Bilder oder 3D laufen.

## 7. Nichts erfinden (gegen W4)
- Keine Aussagen über Person, Firma, Kunden, Zahlen, Preise, Bewertungen, Zeiten oder Versprechen, die nicht im Briefing stehen. Auch keine harmlos klingenden („ich melde mich innerhalb eines Werktags“, „seit 1998“, „über 150 Projekte“).
- Stattdessen ein markierter Platzhalter in der Form `<span class="platzhalter">[Platzhalter: …]</span>` und ein Eintrag in `arbeit/austauschliste.md`.
- Beispieltexte für Musterseiten sind erlaubt, wenn sie als Beispiel erkennbar sind (`.example`-Adressen, „Musterort“).

## 8. Grenzen und Recht (Kurzfassung, siehe `wissen/recht.md`)
- Keine fremden Server: Schriften, Bibliotheken, Bilder liegen in `site/`. Keine Tracker. Ohne Cookies, Browser-Speicher und fremde Server braucht es keinen Cookie-Banner.
- Impressum und Datenschutz immer als eigene Seiten mit markierten Platzhaltern.
- `prefers-reduced-motion` beachten. Automatische Bewegung über 5 s braucht eine Pause-Möglichkeit (WCAG 2.2.2). Keine Scroll-Übernahme mit wichtigem Text darin, am Handy meiden (NN/g).
- Veröffentlichen nur auf Simons ausdrückliches Ja nach der Vorschau.

## 9. Lieferung (gegen W7)
- `website/<name>/site/` enthält nur, was auf den Server gehört. Vorbilder, Rohfassungen, Prüfungen, Quellcode zum Bauen, `node_modules` und Berichte liegen in `website/<name>/arbeit/`.
- `site/QUELLEN.md` darf mit (Lizenzen und Namensnennungen).

## 10. Simons Geschmack (aus dem SFH-Test, 19.11.2026)
Gilt für Simon und als Ausgangspunkt für Auftraggeber, die er mitbringt. Jede Zeile ist ein Zitat oder eine umgesetzte Anmerkung.
- **Ja:**
  - kräftige, dicke Schrift („gern noch bissle dicker“)
  - klare, gefräste Kanten bei 3D („die sind wie so abgerundet“ war Kritik)
  - das eigene Logo oder Wappen als 3D-Objekt („so richtig geil, wie in der Sportschau“)
  - ein Grün statt mehrerer Töne
  - Geschichten beim Scrollen (seitlich laufende Chronik: „fand ich cool“)
  - „mach und zeig“ statt langer Abstimmung
- **Nein:**
  - kursive Serife („auch KI typisch“)
  - Überlappen und Enge („da überlappt es und alles is sehr eng“)
  - zu laut („sehr in die fresse“)
  - runde Formen, wo er Relief erwartet („3D aber nicht rund“)
