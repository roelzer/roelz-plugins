# Bericht: Landingpage für die Ein-Mann-Firma

## Was gebaut wurde
Eine statische Landingpage: HTML, CSS und JavaScript, ohne Server und ohne Build-Schritt. Zum Ansehen `index.html` über einen lokalen Webserver öffnen (z. B. `python3 -m http.server` im Ordner). Dazu gibt es `impressum.html` und `datenschutz.html` als Vorlagen. Der Ordner ist 0,5 MB groß, die Startseite lädt rund 256 KB.

**Stil:** in Richtung Apple. Schwarze und fast weiße Abschnitte wechseln sich ab. Sehr große, eng gesetzte Überschriften in Inter. Eine einzige Akzentfarbe, Signalorange: Sie steht für die „Fuge“, also die Verbindung, durch die die Daten fließen. Bewusst weggelassen habe ich, was nach Baukasten oder KI aussieht: keine Emojis, keine lila Farbverläufe, keine drei Symbol-Karten, keine erfundenen Kundenstimmen oder Zahlen, keine Fenster-Attrappen mit drei bunten Punkten. Statt Symbolen zeigt jede Leistung eine kleine echte Vorführung.

**Der eine starke Moment (Wow):** eine Szene, die beim Scrollen am Bildschirm stehen bleibt (gepinnt) und eine Geschichte in drei Schritten erzählt:
1. *Heute: Jedes Programm ist eine Insel.* Eine Aufmaß-Tabelle und ein Angebot schweben schräg im Raum. Ein Mauszeiger tippt eine Menge ab, und es passiert ein Zahlendreher (42,6 statt 24,6). Ein rotes Schild „Zahlendreher“ erscheint.
2. *Dann: Ich baue die Verbindung dazwischen.* Die Fenster richten sich gerade aus, und orange Leitungen ziehen sich von Zeile zu Zeile.
3. *Ab jetzt: Die Werte kommen von selbst.* Lichtimpulse laufen durch die Leitungen, die Angebotszeilen füllen sich, die Summe zählt auf 2.778,50 € hoch, und eine Meldung „4 Positionen übertragen · geprüft“ erscheint.
Das ist genau das Angebot in einem Bild: Ihre Programme bleiben, ich baue das Stück dazwischen. Auf dem Handy stehen die Fenster untereinander, und die Leitungen laufen senkrecht.

**Abschnitte danach:** Kernaussage, deren Wörter sich beim Scrollen nacheinander dunkel färben → Leistungen als Kachelraster („Bento“) mit vier kleinen Live-Vorführungen (Schnittstellen, Überwachung, Automatisierung, kleine Werkzeuge) → „Was Sie nicht bekommen“ (wird beim Scrollen durchgestrichen) mit „Sondern: … fester Preis“ → Ablauf in drei Schritten mit einer Linie, die sich füllt → fünf Alltagsbeispiele zum seitlichen Wischen, klar markiert als „keine Kundenprojekte“ → Über mich → Fragen und Antworten (aufklappbar) → Abschluss „Was tippen Sie heute noch ab?“ mit einem Eingabefeld, das eine fertige E-Mail im eigenen Mailprogramm öffnet (kein Server, nichts wird gespeichert) → Fußzeile mit Impressum und Datenschutz.

**Technik:** GSAP 3.13 mit ScrollTrigger für die Animationen. Beides liegt lokal im Ordner, ebenso die Schrift Inter. Es gibt keine Verbindung zu fremden Servern, keine Cookies und keine Tracker. three.js habe ich bewusst nicht genommen: Die Szene ist in HTML, CSS und SVG gebaut, mit echter 3D-Neigung über CSS. Dadurch bleibt alles scharf, leicht und auch auf schwachen Handys flüssig.

## Annahmen (bitte prüfen)
- **Firmenname:** Es gibt noch keinen, deshalb steht als Arbeitstitel **„Fuge“** da. Gemeint ist die Fuge zwischen zwei Bauteilen, also die Verbindung zwischen Programmen; das passt auch zu einem Architekten. Der Name ist **nicht** auf bestehende Firmen oder Marken geprüft. Er steht im Logo (2×), im `<title>`, in den Meta-Angaben, auf den Unterseiten und im Bild `assets/og.png`. Zum Tauschen nach „Fuge“ suchen.
- **E-Mail:** Platzhalter `hallo@ihre-domain.de`, in `index.html` und in `assets/js/main.js` (Konstante `EMAIL`).
- **Über mich:** „Ich bin Simon. Ich komme selbst aus einem Planungsberuf …“. Vorname und Berufshintergrund habe ich angenommen. Raus damit, wenn es nicht passt.
- **Versprechen, die Sie halten müssen:** „Ich komme vorbei“ (Termin vor Ort), „fester Preis, bevor ich anfange“ (statt Stundenlohn), „Ich melde mich innerhalb eines Werktags“, „kleine Automatisierungen oft wenige Tage, größere einige Wochen“, „Daten wo möglich auf Ihren Rechnern oder bei einem EU-Anbieter“, KI wird als Hilfsmittel offen genannt.
- **Zielgruppe:** kleine Betriebe (Handwerk, Planungsbüros, Handel, Hausverwaltung, Büros). Ansprache mit „Sie“, einfache Sprache ohne Fachchinesisch.
- **Beispiele und Zahlen** in der Szene (Fliesen, Preise, „Angebot 2026-118“) sind ausgedacht. Sie dienen nur der Darstellung und sind keine Kundendaten.
- **Vorbilder:** Die Suche auf onepagelove und lapa.ninja brachte keine passenden Treffer. Den Stil habe ich aus bekannten Vorbildern abgeleitet, die ich in diesem Lauf **nicht live angesehen** habe: apple.com-Produktseiten (gepinnte Scroll-Geschichten, Schwarz-Weiß-Wechsel, große Typografie), stripe.com (Linien und Datenfluss) und linear.app (dunkle, präzise Oberfläche). Nachgebaut ist davon nichts.

## Was geprüft wurde und wie
Geprüft mit Playwright und Chrome (headless) an einem lokalen Server; die Prüf-Skripte liegen außerhalb des Ordners.
- **Bildschirmfotos** jedes Szenen-Schritts und der ganzen Seite in sechs Größen: Desktop 1440×900, Laptop 1366×768, Tablet 820×1180, Handy 390×844, kleines Handy 375×667. Dabei gefunden und behoben:
  - Die Überschrift brach in drei Zeilen um.
  - Die Zeilen im Angebot waren schon vor der Animation orange hinterlegt (GSAP-Startwerte).
  - Die Meldung überdeckte die Summe.
  - Das Schild „Zahlendreher“ überdeckte Text.
  - Auf dem kleinen Handy überlappten Text und Fenster.
  - Nach einer Änderung der Fenstergröße zeigte die Summe „0,00“.
- **Fenstergröße während des Scrollens geändert** (Desktop → Handy → Desktop): Die Leitungen werden neu berechnet, und der Endzustand stimmt.
- **Reduzierte Bewegung** (Systemeinstellung `prefers-reduced-motion`): Es gibt keine Animation. Alle drei Schritte stehen untereinander, die Szene ist im fertigen Zustand zu sehen, mit Leitungen.
- **Ohne JavaScript:** Alle Texte sind sichtbar, nichts bleibt versteckt.
- **Konsole:** keine Fehler und keine fehlgeschlagenen Anfragen, auch nicht auf den Unterseiten.
- **Links:** Alle Sprungmarken haben ein Ziel. Impressum, Datenschutz und Favicon liefern 200. „So funktioniert’s“ springt in die Szene. Die Pfeil-Knöpfe der Beispiele funktionieren.
- **Formular:** Leer abgeschickt gibt es einen Hinweis, und der Cursor springt ins Feld. Ausgefüllt öffnet es eine `mailto:`-Adresse mit Betreff und Text.
- **Tastatur:** Die Reihenfolge stimmt (zuerst „Zum Inhalt springen“), und der Fokusrahmen ist sichtbar.
- **Tippflächen:** alle mindestens 44 px. Der kleine Knopf „Anfragen“ oben ist 32 px hoch, hat aber eine unsichtbare Tippfläche von 44 px.
- **Kein seitliches Verrutschen** in allen Größen.
- **Lighthouse 12** (lokal):

  | | Leistung | Barrierefreiheit | Best Practices | SEO | LCP | CLS |
  |---|---|---|---|---|---|---|
  | Handy | 96 | 96 | 100 | 100 | 2,6 s | 0 |
  | Desktop | 100 | 96 | 100 | 100 | 0,6 s | 0 |

  Die restlichen Kontrast-Hinweise betreffen die Wörter der Kernaussage. Die sind absichtlich hell, bis man dorthin scrollt. Ein paar kleine Beschriftungen in der Szene habe ich danach noch kontrastreicher gemacht, Lighthouse aber nicht erneut laufen lassen.

## Was noch fehlt
1. **Echter Firmenname** und eine Markenprüfung (DPMA, Handelsregister, Domain), danach Logo und Texte anpassen.
2. **Echte E-Mail-Adresse**, auf Wunsch eine Telefonnummer.
3. **Impressum und Datenschutz** mit echten Angaben füllen und rechtlich prüfen lassen (die Vorlagen sind markiert).
4. **Foto von Ihnen** für „Über mich“, falls gewünscht; das schafft bei kleinen Betrieben viel Vertrauen. Dazu Ihre Texte und Versprechen bestätigen (siehe Annahmen).
5. **Später echte Referenzen**, sobald es erste Kundenprojekte gibt, mit deren Erlaubnis.
6. **Vor dem Veröffentlichen:** Bei `og:image` die volle Adresse mit Domain eintragen. Beim Hoster Komprimierung und Caching einschalten (Cloudflare macht das von selbst). Auf einem echten iPhone und einem Android-Gerät durchscrollen; geprüft wurde nur im Chrome-Emulator, nicht in Safari.
7. **Veröffentlicht wurde nichts.** Das Hochladen (z. B. Cloudflare Pages, kostenlos) erst nach Ihrem Ja.

## Dateien
- `index.html` – Startseite
- `impressum.html`, `datenschutz.html` – Vorlagen
- `assets/css/style.css`, `assets/js/main.js` – Gestaltung und Bewegung (kommentiert)
- `assets/vendor/` – GSAP und ScrollTrigger
- `assets/fonts/` – Inter mit Lizenz
- `assets/favicon.svg`, `assets/og.png` – Symbol für den Browser-Tab und Vorschaubild für geteilte Links
- `QUELLEN.md` – Herkunft und Lizenzen
