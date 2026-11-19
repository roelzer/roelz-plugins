# Probelauf Website-Bauer (ohne neuen Mitarbeiter, 18.11.2026)

4 erfundene Aufträge, wie Simon sie schreiben würde, je in einem frischen Subagenten ohne Hinweis auf den geplanten Mitarbeiter. Danach prüfte ich alle vier gleich: Playwright, Handy 390 px und Desktop 1440 px, 9 Scrollstellen, Konsole, fremde Server, Bildrate beim Scrollen (SwiftShader = schwache Hardware), Tippflächen, Pflichtseiten. Die Bildschirmfotos liegen in der Sitzung, nicht im Repo.

## P2 Firmenseite (Ein-Mann-Firma, „Apple-Richtung, keine KI sichtbar“)
**Messung:** 0 Konsolenfehler, 0 fremde Server (GSAP und Inter lokal), 60 fps, kein seitliches Verrutschen, `prefers-reduced-motion` vorhanden, Impressum und Datenschutz als Vorlage, 468 KB. Tippflächen unter 44 px: 1 (Handy) bzw. 5 (Desktop). Der Agent meldete Lighthouse 96/100.
**Gut:** handwerklich sauber, gepinnte Scroll-Geschichte, die das Angebot zeigt (Tabelle → Leitung → Angebot), keine Emojis, keine Lila-Verläufe, Beispiele als „keine Kundenprojekte“ markiert, gründliche Selbstprüfung in 6 Größen.
**Fehlt / falsch (gemessen an „Wow, nicht sichtbar KI“):**
- **W1 Baukasten-Look 2024:** Inter, Schwarz/Weiß mit einer Signalfarbe, Bento-Kacheln, „Was Sie nicht bekommen“ durchgestrichen, FAQ-Akkordeon, CTA mit Eingabefeld. Das ist die typische SaaS-Landingpage (Linear/Vercel-Stil), und genau so sieht KI-Webdesign heute aus. Sauber, aber austauschbar.
- **W2 Kein echtes Motiv:** keine Fotos, kein 3D, keine eigene Bildsprache. Das einzige Bildelement sind nachgebaute Tabellen.
- **W3 Vorbilder nicht angesehen:** „bekannte Vorbilder, die ich in diesem Lauf nicht live angesehen habe (apple.com, stripe.com, linear.app)“. Wörtlich.
- **W4 Erfundenes über Simon:** „Ich bin Simon. Ich komme selbst aus einem Planungsberuf …“, Versprechen wie „Ich melde mich innerhalb eines Werktags“, „fester Preis“. Sie sind zwar als Annahme markiert, stehen aber im Text.
- **W5 Kein Prüfer von außen:** Bewertet hat nur der Erbauer selbst („Lighthouse 96“). Niemand hat das Ergebnis unabhängig mit Vorbildern verglichen.

## P1 Vereinsseite (JFG, „richtig geil, nicht wie die üblichen Vereinsseiten“)
**Messung:** 0 Konsolenfehler, 0 fremde Server, Tippflächen in Ordnung, kein seitliches Verrutschen, `prefers-reduced-motion` vorhanden, Pflichtseiten vorhanden. Bildrate beim Scrollen: Handy 53 fps, **Desktop 33 fps** (der 3D-Ball auf schwacher Hardware). Der Ordner hat **10,5 MB**, weil Prüfskripte und Bildschirmfotos (`_pruefung/`) im Lieferordner liegen.
**Gut:** echte Funktionen, die Eltern helfen (Filter nach Mannschaft mit Merken, Kalenderdatei, Formular schlägt aus dem Geburtsjahr die Mannschaft vor). Inhalte zentral in `daten.js`, Platzhalter ehrlich als „Ort A“ und `.example`, ein Entwurfs-Hinweis, Schutz für schwache Geräte beim Ball.
**Fehlt / falsch:**
- **W1 KI-Look Dark Mode + Neon:** Nachtblau mit grellem Gelbgrün, schmale Großbuchstaben, Karten mit Glas-Rand. Das ist die Sport-Vorlage von der Stange und dasselbe Fehlerbild wie F2 beim Video (Navy mit Leuchten).
- **W2 Kein echtes Motiv:** keine Fotos. Der Wow-Moment ist ein selbst geschriebener Shader-Fußball, der etwas nach Kunststoff aussieht. Ohne Grafikkarte dreht er sich auf dem Desktop gar nicht.
- **W3 Vorbilder nicht angesehen:** „Diese Seiten habe ich nur über die Beschreibungen in den Artikeln gesehen, nicht selbst geöffnet.“
- **W6 Leistung auf schwacher Hardware:** 33 fps am Desktop, Lighthouse-Leistung schwankte nach eigener Angabe zwischen 70 und 100.
- **W7 Lieferung vermischt:** Prüfdateien liegen im Webordner („Gehört nicht auf den Webserver“ steht nur im Bericht).
- Der Entwurfs-Hinweis überdeckt am Handy auf jeder Bildschirmhöhe Inhalt.
- Die Gestaltung „Flutlicht“ ist eine eigene Idee, aber nicht aus dem Verein abgeleitet (Wappen, Farben, Orte waren unbekannt). Eine Rückfrage wäre dafür kein Fehler gewesen.

## P4 Musterseite Schreinerei („damit die sagen: wow, das wollen wir“)
**Messung:** 0 Konsolenfehler, 0 fremde Server, 60 fps auf Handy und Desktop, kein seitliches Verrutschen, `prefers-reduced-motion` vorhanden, Pflichtseiten vorhanden, 3 Tippflächen unter 44 px. Der 3D-Teil lädt erst beim Hinscrollen (Lazy Loading). Ordner **18 MB**, davon 17 MB Arbeitsdateien (`_arbeit/`).
**Gut:** Das ist die stärkste der Seiten. Die Gestaltung kommt aus dem Thema: Nussbaum-Maserung, Strichzeichnungen wie Werkpläne, die sich beim Scrollen selbst zeichnen, eine Schwalbenschwanz-Verbindung in 3D, die sich beim Scrollen zusammenfügt, Holzarten zum Durchklicken, eine Leiste „Anrufen / Anfrage“ am Handy. Platzhalter sind rot gestrichelt und lassen sich ausblenden, `noindex` ist gesetzt. **Als einziger Lauf hat er 7 Vorbilder wirklich geöffnet und fotografiert** (`_arbeit/vorbilder/`).
**Fehlt / falsch:**
- **W2 Kein echtes Motiv:** Die Maserung wird im Browser berechnet und wirkt künstlich. Die 3D-Verbindung hat wenig Details und sieht nach Spielzeug aus. Drei leere Fotoplätze stehen ausgerechnet im Teil, der überzeugen soll. Für „wow, das wollen wir“ fehlen echte Bilder von Holz und Arbeit (z. B. freie Fotos mit Lizenz als Stimmungsbilder, klar markiert).
- **W8 Darstellungsfehler übersehen:** Bei den Holzarten zeigt die Karte am Desktop unter der Maserung einen schwarzen leeren Balken (Bildschirmfoto bei Scrollstelle 6). Die Selbstprüfung hat das nicht gefunden.
- **W7 Lieferung vermischt:** 17 MB Arbeitsdateien im Lieferordner.
- Die Annahme „Antwort in zwei Werktagen“ ist als Platzhalter markiert, also in Ordnung.

## P3 Haus-Projektseite („beim Scrollen durchs Haus fahren, Wow wie Preisträger-Seiten“)
**Messung:** Bildschirmfotos auf Handy und Desktop in Ordnung. **Die Bildrate ließ sich nicht messen:** Meine Scroll-Messung brach mit Software-Grafik nach über 5 Minuten ab. Die drei anderen Seiten brauchten dafür Sekunden. Der Agent selbst: erstes 3D-Bild nach 1,8 s, „wie flüssig es auf deinem Laptop läuft, ist noch offen“, kein Lighthouse. Gesamtgewicht ca. 880 KB, Ordner 8,3 MB mit `pruefung/`.
**Gut:** der größte Wurf. Ein 3D-Haus entsteht live aus denselben Maßen wie die Grundrisse, die Kamerafahrt geht durch 5 Räume, die Tageszeit läuft von Nachmittag bis Nacht mit, die Höhenanzeige läuft live mit, die Raumwahl springt direkt, und es gibt einen Ersatz ohne WebGL sowie bei „Bewegung reduzieren“. Vorbilder: 4 von Awwwards und Vide Infra. Echte Architekten-Details wie Ankerlöcher im Sichtbeton.
**Fehlt / falsch:**
- **W2 Spielgrafik statt echt:** Lutscher-Bäume, flache Wiese, glatte Flächen. Es wirkt „wie ein gutes Architekturmodell“ (Agent), eher wie ein Computerspiel. Ihm fehlt Licht, das echt aussieht (eingebackenes Licht, HDRI, echte Materialien). Für „Preisträger-Wow“ ist das zu wenig.
- **W6 Leistung unklar und vermutlich zu schwer:** nicht auf schwacher Hardware gemessen. Bei mir lief die Fahrt mit Software-Grafik so langsam, dass die Messung abbrach. Auf Simons Laptop ohne Grafikkarte ist das ein echtes Risiko.
- **W9 Lesbarkeit über 3D:** Weiße Schrift liegt teils direkt auf hellem Sichtbeton oder Himmel (Treppe, Ankommen), ohne eigene Fläche dahinter.
- **W7** Prüfdateien liegen im Lieferordner.

## Fehlerliste (Zusammenfassung)
| Nr. | Fehler | P1 | P2 | P3 | P4 |
|---|---|---|---|---|---|
| W1 | Vorlagen- bzw. KI-Look (SaaS-Schwarzweiß, Dark Mode + Neon) | ja | ja | – | – |
| W2 | Kein echtes Motiv: keine Fotos, 3D wirkt nach Spiel oder Kunststoff | ja | ja | ja | ja |
| W3 | Vorbilder nicht selbst angesehen | ja | ja | teils | nein (7 fotografiert) |
| W4 | Erfundenes über den Auftraggeber im Text | – | ja | – | – |
| W5 | Nur Selbstprüfung, kein unabhängiger Vergleich mit Vorbildern | ja | ja | ja | ja |
| W6 | Leistung auf schwacher Hardware nicht gesichert (3D) | ja (33 fps) | – | ja | – |
| W7 | Arbeits- und Prüfdateien im Lieferordner | ja | – | ja | ja |
| W8 | Darstellungsfehler, die die Selbstprüfung übersah | – | – | – | ja |
| W9 | Text über Bild oder 3D schlecht lesbar | – | – | ja | – |

**Was überall stimmte (kein Bedarf):** keine fremden Server, keine Tracker, keine erfundenen Bewertungen, `prefers-reduced-motion`, Impressum und Datenschutz als Vorlage, nichts veröffentlicht, Handy und Desktop angesehen, Tippflächen fast überall in Ordnung. Das deckt der bestehende Skill und Claude schon ab.

**Kern:** Die Lücke ist nicht Technik, sondern Spitzenniveau. Alle vier Seiten sind sauber, aber keine hat echte Bilder oder ein überzeugendes Motiv. Drei haben ihre Vorbilder nicht angeschaut, und keine wurde unabhängig gegen ein Vorbild geprüft. Die einzige Seite, die Vorbilder wirklich angesehen hat (P4), ist die stärkste. Das spricht für einen Mitarbeiter, der Vorbilder, Bildsprache und unabhängige Prüfung zur Pflicht macht. Dazu kommt eine klare Leistungsgrenze für 3D auf schwacher Hardware.

## Echte Fälle (anonymisiert, mit Simons Erlaubnis vom 18.11.2026 gelesen)
- **Jugendfußball-Verein, noch nicht gebaut.** Ziel laut Repo: „Statisch, mobil zuerst, Vorstand soll begeistert sein und die Seite als echte Vereinsseite online stellen können.“ Das entspricht Testfall q2.
- **Dorf-Sportverein, bereits gebaut und online** (Astro, Cloudflare, keine Cookies, Lighthouse 94–100). Gut: Vorbilder angesehen und in einer Tabelle ausgewertet, drei Richtungen mit Begründung, die Idee kommt aus einer wahren Geschichte des Vereins (neues Flutlicht), Farben aus dem Wappen gemessen, Recherche- und Fragen-Dateien für den Vorstand. Grenzen: Die vorhandenen Fotos sind höchstens 1024 px breit, deshalb ist der Einstieg gezeichnet. Fast schwarzes Grün mit hellem Rasengrün als Akzent streift das KI-Merkmal „fast schwarz + eine grelle Akzentfarbe“. Das ist ein echter Fall für „Mach die Vereinsseite schöner“ (Testfall k1): Was holt man aus kleinen echten Fotos heraus, ohne den Charakter zu verlieren?
