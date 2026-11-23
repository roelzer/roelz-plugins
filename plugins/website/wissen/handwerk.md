# Handwerk: so entsteht eine Seite auf Spitzenniveau

Stand 18.11.2026. Jede Regel stammt aus dem Probelauf (Fehler W1–W9, `docs/personal/website-bauer/probelauf.md`) oder aus der Profi-Recherche (`docs/personal/website-bauer/recherche.md`, dort mit Quelle und Zitat). Maßstab sind Simons Vorbilder **landonorris.com** (Awwwards Site of the Year 2025) und **igloo.inc** (Site of the Year 2024).

## 1. Idee vor dem ersten Pixel (gegen W1)
- Schreib in `arbeit/idee.md` **einen Satz**: Was ist die Idee der Seite, und aus welchem **echten Merkmal des Auftraggebers** kommt sie (Logo, Wappen, Material, Ort, Werkzeug, eine wahre Geschichte)? Vorbilder: Bei Lando kommt das Neon vom Helm. Bei einem Dorfverein wurde das neue Flutlicht, über das der Verein selbst geschrieben hatte, zum Einstieg.
- **Markentausch-Test:** Würde die Seite genauso gut zu einem Konkurrenten derselben Branche passen? Dann ist die Idee zu schwach. Schreib die Antwort mit Begründung in `idee.md`.
- **Plan vor Code:** 4–6 Farben mit Hex-Wert und Herkunft, Schriftrollen, eine grobe Skizze des Aufbaus. Dann prüfen: „Käme ich bei einem ähnlichen Auftrag genauso hierhin?“ Ausgeschlossen sind **die Standardseite der Branche und ihr vorhersehbares Gegenteil**. Beispiele: SaaS-Schwarzweiß mit Kacheln bzw. Dark Mode mit Neon (Sport), Creme mit Serife und Terrakotta (Handwerk, „edel“).
- Keine Superlative im eigenen Plan („preisverdächtig“, „museumsreif“). Sie führen nachweislich zu Einheitsergebnissen. Beschreib stattdessen konkret, was zu sehen ist.

**Was der Auftraggeber schon hat, bleibt** (Simon zur SFH-Seite, 18.11.2026: „schriftart sollte aber die von der website davor bleiben, das is ja so bisschen unsere corporate schrift“). Hausschrift, Farben, Logo und eigene Sprüche des Auftraggebers werden übernommen, nicht durch eigene Ideen ersetzt. Gibt es eine bisherige Seite oder Drucksachen, prüfst du sie zuerst darauf. Eigene Sprüche schlägst du an Stopp 1 als Annahme vor, Simon korrigiert sie („Ein Dorf. Ein Verein.“ war „nicht so unsers“, besser „Grün-Weiß, ein Leben lang“).

## 1b. Die Hauptidee: der eine Moment, den man sich merkt (Probearbeit, 20.11.2026)
In der Probearbeit waren alle Seiten des Website-Bauers fehlerfrei und bestanden jede Prüfung. Sie sahen trotzdem gleich aus: große Überschrift, zwei Knöpfe, ein Bild daneben. Simon: „haut mich jetz alles nicht so um“. Bei der SFH-Seite fand er „mega“, was keine Prüfung misst: Beim Scrollen gehen die Flutlichter an, und das Wappen dreht sich nach vorn. **Fehlerfrei ist die Pflicht, der Moment ist die Kür.**

- **Die Hauptidee ist ein Moment, kein Layout.** Schreib sie in `arbeit/hauptidee.md` mit vier Teilen:
  1. **Was man sieht:** ein konkretes Objekt oder eine Szene aus dem Auftraggeber (Wappen, Werkstück, Werkzeug, Ort, Material).
  2. **Was passiert:** eine Verwandlung beim Scrollen oder Bewegen, z. B. geht an, setzt sich zusammen, öffnet sich, wird Tag, man fährt hindurch.
  3. **Merk-Test:** Was erzählt ein Besucher abends am Tisch von der Seite? „Die hatten eine schöne Seite“ ist durchgefallen. „Da ging beim Scrollen das Flutlicht an“ ist bestanden.
  4. **Machbarkeit:** Bauweise nach `3d-leistung.md`, und wie der Moment in einem ersten Durchstich läuft (Abschnitt „Umfang klein planen“).
- **Erst drei Kandidaten**, dann den stärksten wählen, nach Merk-Test, Bezug zum Auftraggeber und Machbarkeit. Die Wahl kurz begründen.
- **Keine Hauptidee sind:** der Standard-Einstieg (Überschrift, zwei Knöpfe, Bild daneben), ein Bild, das nur einblendet, Parallaxe allein, Laufband, hochzählende Zahlen, eine Kugel oder Partikel ohne Bezug zum Auftraggeber, „edle Ruhe“ ohne Ereignis.
- **Beispiele als Denkanstoß, nicht als Vorlage:**
  - Verein: Das Flutlicht am eigenen Platz geht beim Scrollen an (SFH).
  - Schreinerei: Ein Schrank setzt sich beim Scrollen aus seinen Teilen zusammen, Fuge für Fuge. Oder ein rohes Brett wird zur fertigen Schublade.
  - Fotograf: Die Blende öffnet sich und gibt das erste Bild frei.
  - Software für Betriebe: Zwei Tabellen, die nicht zusammenpassen, verbinden sich beim Scrollen Zeile für Zeile.
  - Haus: Über dem Haus wird es Abend, und die Fenster gehen an.
- **Der Rest der Seite dient dem Moment** und bleibt ruhig (Simon: nicht laut). Ein Moment, der trägt, ist besser als fünf kleine Effekte.
- **Der Moment steht ganz oben** oder spätestens nach dem ersten Scrollen. Wer ihn suchen muss, erlebt ihn nicht.
- **Danach nicht abfallen** (Schreinerei-Test, 23.11.2026). Simon: „find ich cool, wird nach unten hin immer langweilig“. Ruhig heißt nicht leblos. Jeder Abschnitt darunter bekommt eine kleine eigene Bewegung aus derselben Bildsprache wie der Moment, z. B.:
  - Skizzen zeichnen sich Strich für Strich, wenn man hinscrollt.
  - Ein Zollstock klappt sich Glied für Glied auf, und die Schritte rasten ein.
  - Maßlinien laufen an Überschriften entlang.
  - Der letzte Abschnitt greift den Moment wieder auf, z. B. eine leere Nische mit „Ihr Maß?“.

  Machart: CSS oder SVG, nur beim Hineinscrollen (IntersectionObserver), keine zweite WebGL-Fläche, bei reduzierter Bewegung ohne. Nicht: jeden Absatz von unten einblenden lassen. Das ist Stangenware.

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

## 11. Umbauen ohne Rückschritte (Durchsicht des Entwurfs „Kombi“, 19.11.2026)
Eine zweite Sitzung hat den Entwurf durchgesehen und zehn Fehler gefunden. Jeder steht hier als Regel. Wo möglich prüft ihn das Prüfskript oder die Abschluss-Sperre.
1. **Leistung messen, nicht hoffen.** Nach jeder größeren Änderung `scripts/leistung.mjs` (Lighthouse, Handy-Profil), Ziel mindestens 90.
   - Im Entwurf fiel die Handy-Leistung von 98 auf 62, mit 12 s Blockierzeit, weil das 3D beim Laden mitkam.
   - Die Abschluss-Sperre verlangt die Messung.
2. **Wünsche des Auftraggebers mitnehmen.** Vor einem Umbau `arbeit/wuensche.md` schreiben: Jeder frühere Wunsch aus Chat, README, DESIGN.md und Commits, mit Datum. Am Ende jeden abhaken.
   - Im Entwurf fehlte die „50“ mit dem Stadtmeister-Foto, die Simon am 15.11. ausdrücklich verlangt hatte.
   - Die Abschluss-Sperre verlangt die Datei bei jedem Umbau.
3. **Schrift tauschen heißt alle Regeln prüfen**, die sie benutzen: `font-style: italic`, `<em>`, `font-weight`, Fallbacks. Eine Schrift ohne Kursivschnitt verzerrt der Browser schräg. Das Prüfskript meldet „künstlich kursiv“.
4. **Feststehende Scroll-Bühnen höchstens etwa 300vh.** Das nächste Wichtige (z. B. das nächste Spiel) muss schnell erreichbar sein. Prüfskript W11, seitliche Galerien sind ausgenommen.
5. **Hochkant keine Lücke:** Text direkt unter dem Objekt, nicht oben das Objekt und unten der Text mit leerer Fläche dazwischen. Prüfen mit `ablauf.mjs`.
6. **Layout und 3D-Kamera schalten nach derselben Regel.** Entscheidet die Kamera nach Seitenverhältnis, schaltet das CSS auch nach Seitenverhältnis (`@media (min-aspect-ratio: 4/5)`), nicht nach Breite. Sonst überlagern sich Objekt und Text am quer gehaltenen Handy. `ablauf.mjs` fotografiert dafür auch quer.
7. **Ohne JavaScript den End-Zustand zeigen** (`<noscript>` mit Stil, der die Bühne auf den Tag-Zustand setzt). Prüfskript W12 meldet eine Seite, die beim Scrollen stillsteht.
8. **Toten Code beim Umbau mitnehmen:** Komponenten, die niemand mehr benutzt, und ihr Code in Skripten und Stilen kommen raus, ebenso unbenutzte Bilder. Das Prüfskript meldet mitgelieferte Dateien, auf die nichts verweist (Ballast).
9. **Kein Müll im Repository:** `__pycache__`, `.pyc`, `.DS_Store` gehören in `.gitignore`. Die Abschluss-Sperre meldet sie.
10. **Unterlagen im selben Schritt wie die Änderung anpassen:** `QUELLEN.md` (jede Bibliothek, jede Schrift mit Lizenz), Design-Notizen, Pflege-Anleitung, offene Fragen. Das Prüfskript meldet Bibliotheken und Schriften, die in `QUELLEN.md` fehlen.
11. **Der Moment muss auch ohne eigenes Scrollen laufen** (Schreinerei-Test, 23.11.2026). Simon öffnete die Seite in der Vorschau der Claude-App, am Handy und am Laptop: „bei mir bewegt isch da garnix“. In eingebetteten Vorschauen scrollt die App, nicht die Seite, und der scrollgesteuerte Moment stand still.
   - Wenn die Seite eingebettet ist (`window.top !== window.self`) oder nicht scrollen kann, spielt der Moment einmal von selbst ab. Ein Knopf startet ihn neu.
   - Bei „Bewegung reduzieren“ steht der End-Zustand, und derselbe Knopf spielt den Moment auf Wunsch ab.
   - Ereignis-Handler nie direkt als Startfunktion mit Parametern übergeben (`addEventListener("pointerdown", start)` gibt das Ereignis als ersten Parameter mit). Im Test hat genau das den Rückfall ausgehebelt.
   - Prüfen: die Seite einmal in einem `<iframe>` normaler Höhe öffnen und nach einigen Sekunden fotografieren.
   - Simon bekommt zum Ansehen eine einzelne HTML-Datei und den Hinweis, sie per Doppelklick im Browser zu öffnen.

