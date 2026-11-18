# Bericht: Musterseite „Schreinerei Holzmann“

**Öffnen:** `index.html` doppelklicken. Läuft ohne Server, ohne Internet, ohne Kosten. Nichts wurde veröffentlicht oder hochgeladen.

## Was ich gebaut habe
Eine Startseite mit zwei Unterseiten (`impressum.html`, `datenschutz.html`). Dunkles, warmes Design: Holz, fast schwarzes Braun und als Akzent das Orange-Rot eines Zimmermannsbleistifts. Die Überschriften sind serifenlos und schmal. Bewusst nicht der typische KI-Look (cremeweiß mit Serifenschrift).

1. **Hero:** Großer Satz „Wir bauen, was bleibt.“ auf einer Nussbaum-Maserung, die der Browser selbst berechnet (kein Foto). Darunter zwei Knöpfe („Projekt anfragen“, „Anrufen“) und die vier Leistungen als Sprungmarken.
2. **Leistungen 01–04** (Küchen, Einbaumöbel, Treppen, Innentüren): je ein kurzer Text und eine Strichzeichnung im Stil eines Architektenplans auf Millimeterpapier. Die Zeichnung zeichnet sich beim Scrollen selbst.
3. **Der Wow-Moment „Handwerk“:** eine 3D-Schwalbenschwanz-Verbindung aus Eiche (three.js). Beim Scrollen bleibt der Abschnitt stehen. Erst erscheinen die Bleistift-Anrisslinien, dann gleitet das Brett auf die Zinken, und die Kamera fährt herum, bis man das Hirnholz der Schwänze sieht. Links laufen die vier Schritte mit (Anreißen, Sägen und Stemmen, Fügen, Hält).
4. **Holzarten:** Eiche, Nussbaum, Esche, Ahorn und Kirschbaum zum Durchklicken. Jede hat eine eigene berechnete Maserung und kurze Angaben (Farbe, Härte, gut für).
5. **Ablauf in 4 Schritten:** Anruf, Termin vor Ort, Entwurf und Angebot, Bauen und Montieren.
6. **Über uns:** „Sechs Leute. Eine Werkstatt. Ein Name.“ Dazu drei gestaltete Fotoplätze mit Beschriftung, welches Foto dort hingehört.
7. **Kontakt:** Kontaktdaten und ein Anfrageformular mit Themen zum Antippen. Das Formular öffnet das E-Mail-Programm mit einer fertigen Nachricht. Es braucht keinen Server und speichert nichts. Dazu ein Link „Route planen“ zu OpenStreetMap.
8. **Am Handy** gibt es eine feste Leiste unten mit „Anrufen“ und „Anfrage stellen“ sowie ein Klappmenü.
9. **Hinweisleiste oben:** „MUSTERSEITE“ mit dem Knopf „Platzhalter ausblenden“. So kann man beim Vorzeigen alle Platzhalter-Markierungen ausschalten oder die Leiste ganz schließen.

## Annahmen
- Name, Ort und alle Kontaktdaten sind erfunden und **rot gestrichelt als Platzhalter** markiert: Musterstraße 1, 12345 Musterort, Telefon 0123 456789, E-Mail mit der Endung `.example`, Öffnungszeiten, „seit 19XX“, „in zweiter Generation“, „Antwort in zwei Werktagen“.
- Keine erfundenen Bewertungen, Kundenstimmen oder Zahlen. Die einzigen Zahlen stammen aus deinem Auftrag: 6 Leute und 4 Schwerpunkte.
- Die Leistungen „Stufen-Renovierung“, „Schiebetüren“, „Glastüren“ und „Arbeitsplatten“ habe ich als typisch angenommen. Das muss der Betrieb bestätigen.
- Ansprache mit „Sie“. Kontakt läuft zuerst übers Telefon, weil das bei Handwerkern üblich ist.
- Weil es keine Fotos gibt, nutze ich Zeichnungen, berechnetes Holz und das 3D-Modell statt Stockfotos. Fremde Fotos würden fremde Arbeit als eigene zeigen.
- Die Seite trägt `noindex`, damit Google die Musterseite nicht aufnimmt.

## Was ich geprüft habe und wie
Alles automatisch mit Playwright (Chrome) auf meinem Rechner, Bildschirmfotos in `_arbeit/shots/`, Übersichten `_arbeit/sheet-*.jpg`:
- **Handy (390 px) und Desktop (1440 px):** Jeden Abschnitt fotografiert und angesehen. Die 3D-Szene habe ich bei 0, 35, 65 und 98 % Scrollfortschritt fotografiert. Gefundene Fehler habe ich behoben: Die Hinweisbox lag über den Knöpfen, die Kopfzeile wurde durchsichtig, die Buchstaben der Überschrift überlappten, die Maserung war zu dunkel, das 3D-Bild aktualisierte sich nicht und das Holz am Handy stand falsch herum.
- **Kein horizontales Scrollen** auf Handy und Desktop. **Keine Konsolenfehler** auf Handy, Desktop und beim Doppelklick-Öffnen (file://).
- **Doppelklick-Öffnen:** Schriften laden und 3D läuft. Dafür habe ich einen Schriften-Preload entfernt, der dort Fehler warf.
- **Reduzierte Bewegung** (Systemeinstellung): Es gibt kein Festhalten beim Scrollen und keine Effekte. Die Verbindung steht fertig da, und alle Schritte sind sichtbar.
- **Tastatur:** Die Tab-Reihenfolge ist sinnvoll, beginnend mit „Zum Inhalt springen“. Die Holzarten lassen sich mit den Pfeiltasten wechseln. Escape schließt das Handy-Menü.
- **Formular:** Leer absenden wird abgefangen. Ausgefüllt erscheint die Rückmeldung, und das E-Mail-Programm wird aufgerufen.
- **Links:** Alle 23 Links habe ich geprüft, keiner ist kaputt. Einziger externer Link ist OpenStreetMap.
- **Tippflächen:** Alle sind mindestens 44 px groß. Ausnahme ist nur der Link „Datenschutz“ im Fließtext unter dem Formular; Links im Fließtext sind nach den Barrierefreiheits-Regeln erlaubt.
- **Lighthouse:**

  | | Leistung | Barrierefreiheit | Best Practices | SEO |
  |---|---|---|---|---|
  | Desktop | 100 | 100 | 100 | 63 |
  | Handy | 79–89 | 100 | 100 | 63 |

  SEO steht nur wegen des absichtlichen `noindex` bei 63. Beim Handy-Wert rechnet die Testumgebung die Holzmaserung ohne Grafikkarte nach. Auf echten Handys dürfte er besser sein; das habe ich nicht gemessen.
- **Datenmenge:** Beim ersten Laden 353 KB. Das 3D-Modell lädt erst, wenn man in seine Nähe scrollt: 580 KB, mit Kompression beim Hoster etwa 150 KB.

## Was noch fehlt
- **Echte Fotos** vom Team, von der Werkstatt und von fertigen Arbeiten. Die drei Fotoplätze sind vorbereitet. Am meisten bringt eine Referenz-Galerie mit 6–9 Projekten.
- **Echte Angaben** statt der Platzhalter. Dann `noindex` entfernen und die strukturierten Daten im Kopf von `index.html` (heute „PLATZHALTER“) befüllen.
- **Impressum und Datenschutz** haben nur Gerüste mit Platzhaltern. Den Text muss der Betrieb liefern bzw. prüfen lassen.
- Ein **Logo**, falls der Betrieb eines hat. Das Jahresring-Zeichen ist ein Vorschlag.
- Nicht auf echten Geräten getestet: iPhone/Safari, Firefox, älteres Android. Geprüft habe ich nur Chrome.
- Optional: ein echtes Formular mit Versand, z. B. über Cloudflare. Hosting kostenlos über Cloudflare Pages, aber erst nach deinem Ja.

## Ordner
- `index.html`, `impressum.html`, `datenschutz.html`: die Seiten
- `assets/`: CSS, fertiges JavaScript, Schriften mit Lizenzen, Grafiken
- `src/`: Quelltext der Skripte (Holz-Shader, 3D-Modell, Animationen)
- `QUELLEN.md`: Herkunft und Lizenzen von allem
- `_arbeit/`: Vorbilder, Prüfskripte, Bildschirmfotos und Lighthouse-Berichte. Neu bauen: in `_arbeit/werkzeug` `npm ci` ausführen, dann `_arbeit/build.sh` (die Pakete habe ich zum Platzsparen wieder gelöscht)
