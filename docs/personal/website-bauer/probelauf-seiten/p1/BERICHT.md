# Bericht: Website JFG Seenland (Probelauf p1)

## Was gebaut wurde
Eine Vereinsseite auf einer Seite (Startseite `index.html`) plus `impressum.html` und `datenschutz.html`. Sie ist statisch: kein Server, keine Datenbank, keine fremden Dienste. Sie lässt sich kostenlos auf GitHub Pages oder Cloudflare Pages hosten. Hochgeladen ist sie nicht.

**Stil:** „Flutlichtabend am See“: nachtblauer Hintergrund, kreideweiße Schrift und ein grelles Gelbgrün wie Flutlicht als Signalfarbe. Die Überschriften sind groß, schmal und in Großbuchstaben, wie auf einem Spieltagsplakat. Den typischen KI-Look (Serifen-Überschrift, cremeweißer Hintergrund, Karten mit Farbstreifen) habe ich bewusst vermieden.

**Inhalt von oben nach unten:**
1. **Kopfbereich:** „Drei Dörfer. Ein Team.“ Dazu ein **3D-Fußball**. Er dreht sich von selbst, man kann ihn mit Maus oder Finger anschubsen, und er rollt beim Scrollen mit. Im Hintergrund zeichnen sich die Spielfeldlinien. Das ist der eine große Effekt der Seite. Darunter läuft ein schräges Band mit U9 … U19, „Mädchen & Jungs willkommen“ und „Probetraining kostenlos“.
2. **Wer wir sind:** erklärt, was eine JFG ist. Dazu Kennzahlen (3 Dörfer, 6 Mannschaften, ca. 180 Kinder, U9–U19).
3. **Mannschaften:** eine Karte je Mannschaft mit großer Kontur-Nummer, Jugend-Klasse, Jahrgang, Trainingstagen und Trainer. Am Handy wischt man seitlich durch die Karten. „Training ansehen“ springt zu den Zeiten und stellt die Mannschaft gleich ein.
4. **Trainingszeiten:** ein Wochenplan Mo–Fr mit Filter nach Mannschaft. Die Seite merkt sich die Auswahl für den nächsten Besuch. Mit **„In meinen Kalender“** lädt man eine Kalenderdatei (.ics) mit den wöchentlichen Terminen herunter.
5. **Neuigkeiten:** eine große Meldung und drei kleine.
6. **Mitmachen:** drei Schritte (Melden, Reinschnuppern, Dabei sein) und ein Formular für das Probetraining. Wählt man das Geburtsjahr, sagt das Formular sofort, welche Mannschaft passt und wann sie trainiert. Beim Absenden öffnet sich das E-Mail-Programm mit einer fertigen Nachricht. Es wird nichts gespeichert, und es braucht keinen Server.
7. **Nicht nur auf dem Platz:** Trainer werden, Eltern & Helfer, Sponsor werden (öffnet jeweils eine E-Mail).
8. **Häufige Fragen** für Eltern, zum Aufklappen.
9. **Fuß:** Kontakt, Impressum, Datenschutz, „Keine Cookies, kein Tracking“.

**Pflege ohne HTML:** Alle Inhalte, die sich ändern (Orte, Mannschaften, Trainingszeiten, Neuigkeiten, Fragen, E-Mail), stehen in **`js/daten.js`** und sind auf Deutsch kommentiert. Steht dort `entwurf: false`, verschwindet der gelbe Entwurfs-Hinweis.

**Dateien:**
- `index.html`, `impressum.html`, `datenschutz.html`
- `css/style.css`: Gestaltung
- `js/daten.js`: Inhalte; `js/main.js`: Seitenlogik; `js/ball.js`: 3D-Ball
- `fonts/`: zwei freie Schriften (OFL), lokal eingebunden
- `img/wappen.svg`: Entwurfs-Wappen (Schild, drei Punkte für drei Dörfer, Wellen für die Seen)
- `QUELLEN.md`: Herkunft und Lizenzen
- `_pruefung/`: Prüfskripte, Bildschirmfotos und Lighthouse-Ergebnisse. Gehört nicht auf den Webserver.

Die Website selbst ist ca. 210 KB groß (mit Schriften), ohne Fotos.

## Vorbilder
Vor dem Bauen habe ich per Websuche nach Fußball- und Akademie-Seiten gesucht. Daraus habe ich die Richtung abgeleitet, aber keine Seite nachgebaut. Fundstellen waren:
- Pro Elite Watford (designrush.com): kräftige Fotos, sportliche Schrift
- „Elite Youth Football Academy“ (contra.com): randlose Flächen, fette Schrift, wenige Farben
- FC Vanguard (themeisle.com): Spielfeld als Gestaltungsidee, Probetraining im Mittelpunkt
- Manchester City, Arsenal, Melbourne FC (Übersichtsartikel webalive.com.au und jerseywatch.com)

Diese Seiten habe ich nur über die Beschreibungen in den Artikeln gesehen, nicht selbst geöffnet. Bildschirmfotos der Vorbilder gibt es deshalb keine. onepagelove.com (Kategorie Sport) lieferte einen Fehler 404.

## Annahmen (alle in `js/daten.js` bzw. den Unterseiten änderbar)
- **Ortsnamen und Stammvereine sind unbekannt.** Platzhalter: „Ort A/B/C“, „SV Ort A“, „TSV Ort B“, „FC Ort C“.
- **Sechs Mannschaften**, eine je Altersklasse: U9, U11, U13, U15, U17, U19. Es könnten auch mehr sein, z. B. zwei U11 oder einzelne Jahrgänge wie U10.
- **Jahrgänge** sind für die Saison 2026/27 gerechnet: U9 = 2018/2019 … U19 = 2008/2009.
- **Trainingszeiten und Plätze sind ausgedacht** (Beispielzeiten Mo–Fr).
- **Neuigkeiten sind Beispieltexte** ohne erfundene Zahlen oder Namen.
- **Trainer:** „Trainerteam folgt“. Keine echten Namen.
- **E-Mail:** `jugend@jfg-seenland.example`. Die Endung `.example` ist absichtlich nicht echt, damit keine Post bei Fremden landet.
- **Inhalt:** Probetraining kostenlos. Mädchen und Jungen spielen gemeinsam. Die Mitgliedschaft läuft über die Stammvereine. Hilfe bei der Trainerlizenz wird angeboten.
- **Bundesland Bayern:** JFG ist vor allem ein Begriff des Bayerischen Fußball-Verbands. Deshalb nennt die Datenschutzseite das Bayerische Landesamt für Datenschutzaufsicht.
- **Formular ohne Server (mailto):** kostenlos und datensparsam. Es braucht aber ein eingerichtetes E-Mail-Programm beim Besucher.
- **Keine Fotos:** Es gibt keine echten Fotos, und Stockfotos mit unklarer Lizenz wollte ich nicht. Die Wirkung kommt deshalb aus Schrift, Farbe und dem 3D-Ball.
- **Keine Bibliotheken:** GSAP und three.js aus der Skill-Empfehlung habe ich nicht genommen. Ball und Animationen sind selbst geschrieben (WebGL-Shader, CSS, IntersectionObserver). So gibt es weniger Dateien, keine Abhängigkeiten und nichts von fremden Servern.

## Was geprüft wurde und wie
Geprüft mit Playwright und Google Chrome (headless) gegen einen lokalen Testserver. Die Skripte liegen in `_pruefung/pruefen.py` und `_pruefung/ball_test.py`, die Bilder in `_pruefung/bilder/`.
- **Bildschirmfotos** auf Handy (390 px) und Desktop (1440 px), jeder Abschnitt und die ganze Seite. Angesehen und gefundene Fehler behoben:
  - Die Umlaut-Punkte in „DÖRFER“ waren abgeschnitten.
  - Hinter „EIN TEAM.“ lag ein dunkler Kasten.
  - Der Ball überlappte die Überschrift (Desktop) bzw. die Kennzeile (Handy).
  - Die Seite war 30 px bzw. 9 px zu breit, man konnte also seitlich scrollen.
  - Formularfelder blieben nach dem Ausfüllen rot.
  - Am Handy kam man nicht an den Ball, weil der Text darüber lag.
  - Die große Neuigkeiten-Karte war leer.
- **Funktionen, automatisch geprüft (zuletzt alle ohne Fehler):**
  - Filter U13 zeigt nur U13.
  - Die Auswahl bleibt nach dem Neuladen erhalten.
  - Die Kalenderdatei enthält 2 wöchentliche Termine.
  - Der Link „Training U9 ansehen“ stellt den Filter um.
  - Ein leeres Formular zeigt eine Fehlermeldung und setzt den Fokus ins erste Feld.
  - Geburtsjahr 2015 schlägt die U13 vor.
  - Die fertige mailto-Nachricht ist korrekt zusammengesetzt.
  - Das Handy-Menü geht auf und schließt sich mit Esc.
- **Links:** Alle 14 Links und Sprungmarken haben ein Ziel. Impressum und Datenschutz laden.
- **Keine Konsolenfehler, keine Anfragen an fremde Server.** Die einzigen Meldungen waren WebGL-Leistungshinweise, die das Bildschirmfoto-Werkzeug selbst auslöst.
- **Tastatur und Barrierefreiheit:**
  - Sprunglink „Zum Inhalt springen“, sichtbarer Fokusrahmen, sinnvolle Tab-Reihenfolge.
  - Am Handy sind alle Tippflächen mindestens 44 px groß (automatisch gemessen).
  - Die Farbe der U19 wurde für genug Kontrast aufgehellt.
- **„Bewegung reduzieren“** (Systemeinstellung): Alle Animationen sind aus, der Ball steht still, alle Inhalte sind sichtbar.
- **Lighthouse 12:**
  - Barrierefreiheit, Best Practices und SEO: je 100 (Handy und Desktop).
  - Leistung: Handy 88, Desktop 81. In früheren Läufen schwankte sie zwischen 70 und 100.
  - LCP (wann der größte Inhalt sichtbar ist): 1,8 s am Handy, 0,5 s am Desktop. CLS (Verrutschen beim Laden): 0.
  - Die Schwankung kommt vom 3D-Ball. Der Testrechner hat keine Grafikkarte und rechnet WebGL deshalb langsam auf dem Prozessor.
  - Als Schutz für schwache Geräte misst der Ball, wie flüssig er läuft. Ist es zu langsam, senkt er die Auflösung und hört dann auf, sich selbst zu drehen. Anschubsen geht weiter.

- **Hinweis zu „nichts außerhalb des Ordners“:** Die Schriften und das Prüfwerkzeug Lighthouse habe ich mit npm in einen Hilfsordner innerhalb von `p1` geladen und ihn danach gelöscht. npm legt dabei automatisch eine Kopie in seinem Zwischenspeicher (`~/.npm`) ab. Außerhalb des Ordners habe ich sonst nichts geändert.

## Was noch fehlt
1. **Echte Inhalte** in `js/daten.js`: Ortsnamen, Stammvereine, Trainingszeiten, Plätze, Trainer, Neuigkeiten, Kontakt-E-Mail. Danach `entwurf: false`.
2. **Impressum und Datenschutz:** Die Platzhalter in eckigen Klammern ausfüllen und den Hosting-Anbieter eintragen. Danach rechtlich prüfen lassen (Vorstand oder Verband). Die Texte sind keine Rechtsberatung.
3. **Echte Fotos** von Training und Spielen. Sie würden die Seite deutlich lebendiger machen, brauchen aber die Einwilligung der Eltern. Gute Stellen dafür: Mannschaftskarten und die große Neuigkeit.
4. **Echtes Vereinswappen** statt des Entwurfs.
5. **Test auf echten Geräten** (iPhone, Android, älterer Laptop). Vor allem ist zu prüfen, ob der Ball dort flüssig läuft. Am Desktop-Bildschirm habe ich die Selbstdrehung im Test nicht laufen sehen: Ohne Grafikkarte greift dort gleich der Schutz für schwache Geräte. Bei Handy-Breite drehte er sich nachweislich.
6. **Spielpläne und Ergebnisse** sind nicht eingebaut. Ein Link auf fussball.de wäre einfach. Ein eingebettetes fussball.de-Widget würde fremde Server laden und müsste in die Datenschutzerklärung.
7. **Veröffentlichen** nach deinem Ja, z. B. GitHub Pages oder Cloudflare Pages (kostenlos). Dabei muss nur der Ordner ohne `_pruefung/` hochgeladen werden. Eine eigene Domain wie `jfg-seenland.de` kostet ca. 5–15 € im Jahr; ohne Domain bleibt es kostenlos (z. B. `….pages.dev`).
8. **Optional:** Wenn das Formular ohne E-Mail-Programm funktionieren soll, braucht es einen Formulardienst. Das ist ein zusätzlicher Anbieter in der Datenschutzerklärung.
