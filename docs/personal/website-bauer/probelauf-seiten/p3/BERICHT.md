# Bericht: Projektseite „Haus Lichtung“

**Startseite:** `/tmp/claude-0/-home-user-roelz-plugins/dfd44ad9-a9bd-5c29-ae3c-93086733df49/scratchpad/website-probelauf/p3/index.html`. Öffnen per Doppelklick reicht, ein Server ist nicht nötig. Nichts wurde veröffentlicht oder hochgeladen.

## Was ich gebaut habe
Eine Seite, auf der man beim Scrollen durch ein 3D-Modell des Hauses fährt. Das Modell entsteht live im Browser (three.js). Fotos oder Renderings braucht es dafür nicht.

**Die Fahrt (ein großer Wow-Moment statt vieler kleiner Effekte):**
1. **Start:** Luftbild am Nachmittag, großer Titel „Haus Lichtung“, der Buchstabe für Buchstabe einfliegt.
2. **01 Ankommen:** Man kommt von der Straße über Trittplatten zum Eingang unter dem 3 m auskragenden Obergeschoss. Die Drehtür aus Lärche geht beim Näherkommen auf.
3. **02 Wohnen & Essen:** Ein offener Raum mit fast 17 m Glas nach Süden, Küche, Esstisch, Kamin, Holzdeck und Wasserbecken.
4. **03 Treppe:** Eichenstufen, frei an der Sichtbetonwand. Die Kamera steigt mit hinauf, oben ein Oberlicht (daher der Name).
5. **04 Schlafen:** Elternzimmer mit Glasecke, halbhohem Kopfteil und Schrankwand. Die Schiebetür zur Terrasse öffnet sich.
6. **05 Dachterrasse:** Blick im Sonnenuntergang.
7. **Schluss:** Die Kamera zieht hoch, es wird blaue Stunde und das Haus leuchtet von innen wie eine Laterne.

Die Tageszeit läuft mit dem Scrollen von Nachmittag bis Nacht. Der Sonnenstand, der Himmel, die Spiegelungen im Glas und das Innenlicht ändern sich dabei mit.

**Kleine Details für Architekten:** Der Sichtbeton zeigt Ankerlöcher und Schalungsstöße (Tafeln 2,40 × 1,20 m). Eine Live-Anzeige zeigt Höhe und Geschoss („Obergeschoss +4,95 m“), dazu ein Kompass, der sich mit dem Blick dreht. Unten gibt es eine Raumwahl (01–05), die direkt zu jedem Raum springt.

**Unter der Fahrt:**
- **Grundrisse EG/OG/Dach:** als Zeichnung, zum Antippen. Die Raumliste zeigt die Flächen. Zeichnung und 3D-Modell kommen aus denselben Maßen, sie passen also zusammen.
- **Ansicht Süd** mit Höhenkoten ±0,00 / +3,30 / +6,70.
- **Material:** Sichtbeton, Glas, Holz. Die Proben sind dieselben Bilder wie im Modell.
- **Zahlen:** Wohnfläche ca. 305 m², BGF 340 m², Höhe, Glasfront, Raumhöhen.
- **Planungsstand** als Platzhalter, Fußzeile, Impressum und Datenschutz als Platzhalterseiten.

**Ersatz, wo 3D nicht geht:** Ohne WebGL zeigt die Seite Standbilder der Räume, die mit dem Scrollen überblenden. Bei „Bewegung reduzieren“ springt die Kamera von Raum zu Raum statt zu fahren, und das weiche Scrollen ist aus.

**Dateien:**
- `index.html`, `impressum.html`, `datenschutz.html`
- `assets/` (CSS, ein gebündeltes Skript, Schriften, 7 Standbilder)
- `quellcode/` (lesbarer Code und Bauanleitung: `npm install`, dann `node build.mjs`)
- `QUELLEN.md` (Lizenzen)
- `pruefung/` (Prüfskripte und Bildschirmfotos)

## Annahmen (alles änderbar)
- **Name „Haus Lichtung“** ist ein Arbeitstitel. Ebenso „Entwurf 2026“.
- **Entwurf selbst ausgedacht:**
  - Erdgeschoss 17 × 10,5 m.
  - Obergeschoss 14 × 11,5 m, kragt 3 m nach Osten über den Eingang und 1 m nach Süden aus.
  - Raumhöhen 3,00 m im EG und 2,80 m im OG. Attika +6,70 m.
  - Eine durchgehende Sichtbetonwand als „Rückgrat“, an der die Treppe hängt.
  - Dachterrasse auf dem EG-Dach vor dem Schlafzimmer, nach Westen.
  - Gründach auf dem OG, Wasserbecken im Garten.
- **Räume:**
  - EG: Wohnen/Essen/Kochen, Diele, Gast/Arbeiten, Speis/HWR, Duschbad.
  - OG: Schlafen mit Ankleide, Bad Eltern, Kind 1, Kind 2, Bad, Arbeiten, Flur.
- **Flächen** sind aus vereinfachten lichten Maßen gerechnet: EG 157,9 m², OG 132,3 m², Dachterrasse zu ¼ nach WoFlV, zusammen ca. 305 m². Das ist keine geprüfte Flächenberechnung.
- **Materialangaben:** Lärche außen, Eiche innen, Sichtbetonklasse SB3. Das sind Annahmen.
- **Planungsstand** „LP 2 Vorentwurf aktuell“ ist ein Platzhalter. Termine gibt es bewusst keine.
- **Keine erfundenen Bewertungen, Kunden oder Preise.** Kontaktangaben fehlen absichtlich.
- **Lage:** Grundstück, Himmelsrichtung (Garten nach Süden, Straße im Norden) und Landschaft (Wiese, Hügel) sind angenommen.
- **Gestaltung:** dunkel und filmisch. Schriften Archivo (breit, leicht) und IBM Plex Mono für Maße. Akzentfarbe ist warmes Abendlicht.

## Was ich geprüft habe und wie
- **Vorbilder:** 4 Vorbilder angesehen (Casa di Solare, Masters Residence, Silver Pinewood, das lynam_up-Reel aus dem Gehirn) und daraus einen eigenen Stil abgeleitet. Nichts nachgebaut. Links stehen in `QUELLEN.md`.
- **Bildschirmfotos mit Playwright und Chrome** (Software-Grafik) auf Desktop 1440 × 900 und Handy 390 × 844. Für jeden Halt der Fahrt und jeden Abschnitt habe ich sie mir angesehen und Fehler behoben, zum Beispiel:
  - Bäume wirkten kantig und billig, jetzt sind sie weich.
  - Schlaf- und Terrassen-Blick waren verdeckt, jetzt stimmt der Bildausschnitt.
  - Die Lattenfassade wirkte flickig, jetzt läuft sie durch.
  - Die Decke war zu dunkel.
  - Der Titel brach auf dem Handy mitten im Wort um.
  - Die Fußzeile lief über den Rand, und Raumnamen im Grundriss liefen über die Wände hinaus.
  - Im Grundriss fehlte das Becken.
  - Auf dem Handy war der Grundriss zu klein, jetzt ist er größer und seitlich wischbar.
  - Ohne Hintergrund war die Kopfzeile über Text schlecht lesbar.
  - Die Fotos liegen in `pruefung/ui/` und `pruefung/bilder/`.
- **Konsole:** keine Fehler und keine Warnungen auf Desktop, Handy, mit „Bewegung reduzieren“ und ohne 3D (`index.html?ohne3d`).
- **Layout:** kein seitliches Überlaufen auf 390 px und 1440 px. Alle Knöpfe und Links sind mindestens 44 px groß.
- **Bedienung:** Raumwahl-Klicks landen am richtigen Halt (Treppe 0,55, Terrasse 0,875, Ankommen 0,225). Die Ankerlinks funktionieren. Die Tab-Reihenfolge ist sinnvoll, mit sichtbarem Fokus und einem Link „Rundgang überspringen“. Impressum und Datenschutz laden (HTTP 200).
- **Ladegewicht** über einen lokalen Webserver gemessen:
  - Zusammen ca. 880 KB, davon das Skript 730 KB (210 KB gepackt).
  - Erster Inhalt nach 0,13 s.
  - Das Modell baut sich in ca. 0,5 s auf.
  - Das erste 3D-Bild kam nach 1,8 s, gemessen mit Software-Grafik. Mit echter Grafikkarte ist es schneller.
- **Build:** Ein Neubau aus `quellcode/` ergibt eine identische `app.js`.
- **Sparsamkeit:** Gerendert wird nur, wenn sich etwas bewegt. Nach der Fahrt hält die 3D-Ansicht an. Bei ruckeliger Bildrate senkt die Seite automatisch die Auflösung. Auf dem Handy gibt es kleinere Schattenkarten und weniger Bäume.

## Was noch fehlt / offen
- **Flüssigkeit auf echter Hardware:** Auf deinem Laptop (8 GB, ohne eigene Grafikkarte) und auf einem echten Handy ist das nicht gemessen. Hier gab es nur Software-Grafik. Bitte einmal in Chrome/Edge durchscrollen. Läuft es zäh, kann ich die Schattenqualität senken oder auf eine vorab gerenderte Bildfolge umstellen.
- **Kein Lighthouse-Lauf.** Mit Software-Grafik wären die Werte für eine WebGL-Seite nicht aussagekräftig.
- **Look:** Das Modell wirkt wie ein gutes Architekturmodell, nicht fotorealistisch. Für Foto-Look siehe Gehirn [[Blender]] und [[Scroll-Website mit Bildfolge]]: dasselbe Haus in Blender rendern und die Bilder einsetzen.
- **Echte Inhalte fehlen:** dein Entwurf (Maße, Räume, Materialien), Name, Planungsstand, eventuell Kontakt. Die Maße stehen zentral in `quellcode/src/layout.js`, die Kamerafahrt in `quellcode/src/path.js`.
- **Impressum und Datenschutz** sind nur Platzhalter und müssen vor einer Veröffentlichung geprüft werden.
- **Veröffentlichung** (z. B. Cloudflare Pages, kostenlos) nur nach deinem Ja.
- **Auf Englisch** gibt es die Seite nicht.
- **Ohne JavaScript** sieht man nur Standbilder und Texte, keine Fahrt.
- **Hinweis zu „nichts außerhalb ändern“:** Mein erster, fehlgeschlagener npm-Aufruf hat automatisch eine Protokolldatei angelegt: `/root/.npm/_logs/2026-11-18T13_04_03_333Z-debug-0.log`. Danach habe ich Cache und Logs in den Projektordner umgeleitet. Die Datei wollte ich löschen, das wurde aber nicht erlaubt. Sie ist harmlos und kann weg. Außerdem legt Chrome beim Testen eigene Temp-Dateien an. Sonst habe ich außerhalb von `p3/` nichts geändert. Den npm-Arbeitsordner `.build` im Projekt habe ich am Ende wieder gelöscht.
