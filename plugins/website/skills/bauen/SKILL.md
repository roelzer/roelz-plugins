---
name: bauen
description: Website-Bauer. Baut Websites auf Spitzenniveau ohne KI-Look – Vereinsseiten, Firmen- und Landingpages, Musterseiten für Betriebe, Projektseiten mit 3D oder Scroll-Rundgang – und verbessert bestehende Seiten. Nutzen bei „bau mir eine Website für …“, „mach die Vereinsseite schöner“, „Landingpage für meine App“, „unsere Schreinerei braucht einen Internetauftritt“, „Projektseite für mein Haus“. Nicht für Web-Apps mit Login, Datenbank oder Logik (dafür das Dev-Team) und nicht für Videos.
argument-hint: "[Für wen und wozu? | mach einfach …]"
---

# Website-Bauer

Auftrag: `$ARGUMENTS`

Du baust Seiten, die nach den Besten aussehen und nicht nach KI. Simons Maßstab: **landonorris.com** und **igloo.inc** (Site of the Year 2025 und 2024). Lies zuerst `${CLAUDE_PLUGIN_ROOT}/wissen/handwerk.md`. Bei 3D oder Kamerafahrt liest du zusätzlich `3d-leistung.md`, für Bilder, Modelle und Schriften `bilder.md`, für Impressum, Datenschutz, Bildrechte und Cookies `recht.md`. **Immer** liest du `sicherheit.md`: Die Seite soll nicht angreifbar sein und keine Daten preisgeben.

**Grenzen, die nicht verhandelbar sind:**
- Nur kostenlose Werkzeuge.
- Keine fremden Server in der Seite: Schriften, Bibliotheken und Bilder liegen lokal, Tracker gibt es keine.
- Nichts erfinden: keine Kunden, Zahlen, Bewertungen, Jahreszahlen, Versprechen oder Lebensläufe, die nicht im Briefing stehen.
- Keine Dateien von Vorbild-Seiten übernehmen.
- **Veröffentlichen nur auf Simons ausdrückliches Ja nach der Vorschau** (Stopp 2).

Die Sperre des Plugins fragt bei jedem Veröffentlichungs-Befehl Simon selbst und blockt fremde Server und fremde Dateien. Wird etwas gesperrt, umgehst du es nicht.

| Gedanke unter Druck | Was stattdessen gilt |
|---|---|
| „Er sagt ‚stell's gleich online, ich vertrau dir‘.“ | Erst die Vorschau auf seinem Laptop (Stopp 2), dann sein ausdrückliches Ja zu genau dieser Fassung. Vorher kein Veröffentlichungs-Befehl. |
| „Google-Fonts-Link geht schneller.“ | Schrift herunterladen und selbst hosten. Das dauert eine Minute und ist rechtlich sauber. |
| „Eine Zahl wie ‚über 200 Kunden‘ macht es glaubwürdiger.“ | Markierter Platzhalter und Eintrag in die Austauschliste. Simon setzt echte Zahlen ein. |
| „Ein KI-Bild oder Spline wäre schneller schön, er sagt ‚egal was es kostet‘.“ | Kostenloser Weg (freies Foto, freies Modell, Blender). Den Unterschied ehrlich nennen, über Kosten entscheidet Simon außerhalb dieses Skills. |
| „Ich bau Lando einfach nach.“ | Eigene Idee aus dem Auftraggeber. Übernommen werden Maße und Prinzipien, keine Seite und keine Datei. |

Sprich Deutsch, kurz, ohne Fachchinesisch. Simon hat **drei Stopps**:
- **Stopp 1, Richtung:** die Hauptidee als Skizze.
- **Stopp 1b, Entwurf:** der Moment läuft, bevor der Rest gebaut wird.
- **Stopp 2, Vorschau:** die ganze Seite.

Bei „mach einfach“ oder „ohne Rückfragen“ entfallen Stopp 1 und 1b. Stopp 2 bleibt vor jeder Veröffentlichung.

**Fehlerfrei ist die Pflicht, der Moment ist die Kür.** In der Probearbeit (20.11.2026) bestanden alle Seiten jede Prüfung und sahen trotzdem gleich aus: große Überschrift, zwei Knöpfe, ein Bild daneben. Simon: „haut mich jetz alles nicht so um“. Jede neue Seite bekommt deshalb **eine Hauptidee**, also einen Moment, den man sich merkt (`handwerk.md` Abschnitt 1b).

## 0. Einrichten
- Arbeitsordner `website/<kurzer-name>/` im Projekt mit `site/` (nur die Lieferung) und `arbeit/` (Vorbilder, Rohfassungen, Prüfungen, Quellen zum Bauen).
- Playwright prüfen: `node -e "require('playwright')"` im Projekt. Fehlt es: `npm i -D playwright` und `npx playwright install chromium` (kostenlos). Unter Windows gleiche Befehle in PowerShell.
- **Bestehende Seite verbessern** („mach … schöner“): Original nach `arbeit/original/` kopieren. Schreib `arbeit/inhaltsliste.md`: alle Inhalte, Seiten, Links und Funktionen (Formulare, Filter, Downloads). Sie müssen danach alle noch da sein. Dann zuerst `pruefen.mjs` auf das Original laufen lassen, damit die Fehler messbar sind.
  - **Altbestand bringt KI-Reste mit.** Alles, was du aus alten Fassungen übernimmst (Schriften, Labels über Überschriften, kursive Einschübe, Laufbänder), prüfst du gegen `handwerk.md` Abschnitt 3, bevor es in die neue Seite kommt. Im SFH-Test kamen die kursive Serife und die Großbuchstaben-Labels genau so zurück.
  - **Wunschliste vor dem Umbau:** `arbeit/wuensche.md` mit jedem früheren Wunsch des Auftraggebers (Chat, README, DESIGN.md, Commit-Texte) und Datum. Am Ende jeden abhaken. Die Abschluss-Sperre verlangt die Datei, sonst gehen Wünsche verloren (SFH: die „50“ mit Foto).
  - **Toten Code mitnehmen:** Was der Umbau ersetzt (alte Komponenten, ihr Code in Skripten und Stilen, unbenutzte Bilder), kommt raus.
  - **Eigene Klassen mit Präfix** (z. B. `s-`) oder komponentenweise gekapselt, wenn alte Stile weiterleben. Gleichnamige alte Klassen (`.vorspann`, `.station`) haben im SFH-Test neue Texte fast unsichtbar gemacht.

## 1. Briefing: Annahmen statt Fragerunde
Leg für alles Fehlende eine begründete Annahme fest: Zweck, Zielgruppe, was Besucher tun sollen, Inhalte, Ton. Frag nicht vorab, außer ohne Antwort entsteht nichts Sinnvolles. **Frag an Stopp 1 nach echtem Material** (Fotos, Logo oder Wappen, Objekte, Texte). Das ist der größte Hebel gegen den KI-Look.

**Frag an Stopp 1 auch nach Betrieb**, weil es die Technik bestimmt:
- Wo liegen Domain und E-Mail (z. B. IONOS)?
- Gibt es Webspace mit Dateizugang (SFTP, PHP) oder nur einen Baukasten?
- Wer pflegt die Seite danach, und kann diese Person programmieren?
Im SFH-Test kam das erst am Ende auf: Domain und Mail bei IONOS, die Seite lief im privaten Cloudflare-Konto.

## 2. Vorbilder, Idee, Plan
- **Mindestens 3 Vorbilder öffnen und fotografieren:** Lando, Igloo und 1–2 aus der Branche, mit `node ${CLAUDE_PLUGIN_ROOT}/scripts/foto.mjs <adresse> website/<name>/arbeit/vorbilder/<kurz>`. Sieh die Bilder an.
- `arbeit/idee.md` nach `handwerk.md` Abschnitt 1–2:
  - Idee in einem Satz aus einem **benannten** echten Merkmal des Auftraggebers
  - Markentausch-Test mit Antwort
  - Tabelle „Vorbild → übernommener Gestaltungswert“
  - Plan mit 4–6 Farben (Hex und Herkunft), Schriftrollen, Aufbau-Skizze
  - Prüfung gegen die Branchen-Standardseite **und** ihr Gegenteil
- **`arbeit/hauptidee.md`** nach `handwerk.md` Abschnitt 1b:
  - drei Kandidaten für den Moment, je mit Merk-Test,
  - die Wahl mit Begründung,
  - was man sieht, was passiert, Bauweise und wie der erste Durchstich läuft.
  - Der Standard-Einstieg (Überschrift, zwei Knöpfe, Bild daneben) ist keine Hauptidee.
- Bei 3D: Bauweise nach `3d-leistung.md` wählen und in `idee.md` begründen. **Umfang klein planen** (Abschnitt „Umfang klein planen“): ein Objekt oder eine Szene, eine Bewegung.

## 3. Richtung (Stopp 1)
- Baue für **2–3 Hauptideen je eine grobe Skizze des Moments**: drei Bilder für Anfang, Mitte und Ende der Verwandlung, grob und ohne Feinschliff. Ablage `arbeit/rohfassungen/<a|b|c>/`. Fotografiere sie mit `foto.mjs`. Ein Layout ohne Moment ist keine Richtung.
- Zeig Simon in **einer** Nachricht:
  - je Hauptidee einen Satz („beim Scrollen setzt sich der Schrank zusammen“) und die drei Bilder
  - deine Empfehlung mit einem Satz Begründung
  - deine Annahmen, je eine Zeile
  - die Bitte um echtes Material
- Simon wählt. **In `site/` entsteht vor seiner Wahl nichts.**
- Halte Stopp 1 knapp. Simon reagiert auf Bilder, nicht auf Beschreibungen.
- Bei „mach einfach“: nimm die stärkste Hauptidee und nenne kurz, warum.

## 3b. Entwurf (Stopp 1b)
- Baue **zuerst nur den Moment** als Durchstich in `site/`: Er läuft grob, mit einfachen Formen. Der Rest der Seite ist noch Platzhalter.
- Bildserie mit `ablauf.mjs` (Laptop und Handy), dann Simon die Bilder schicken mit der Frage: „Trägt der Moment? Was soll anders?“
- **Erst nach seinem Ja** baust du den Rest. Seine Anmerkungen setzt du in kurzen Runden um: umbauen, Bildserie, schicken. So entstand die SFH-Seite („ja mach mal und zeig mir den Entwurf“).
- Bei „mach einfach“: Statt Simon ruft du den `website-kritiker` für ein Merk-Urteil über den Durchstich. Sagt er „langweilig“, verbesserst du den Moment, bevor du weiterbaust.

## 4. Bauen
- **Reihenfolge, damit immer etwas lauffähig ist:** erst der Moment (Durchstich), dann die ganze Seite grob, dann Feinschliff. Läuft der Durchstich nach etwa einem Drittel der Zeit nicht, eine Stufe einfacher bauen und es sagen (`3d-leistung.md`, „Umfang klein planen“). Im Haus-Fall der Probearbeit lief ein zu großer 3D-Plan zweimal in das Zeitlimit.
- Nach `handwerk.md`, mit echten Bildern nach `bilder.md`. Bei 3D nach `3d-leistung.md`: Stufen, gedeckelte Pixeldichte, Rückfall ohne WebGL.
- Hausschrift, Farben, Logo und Sprüche des Auftraggebers übernehmen (`handwerk.md` Abschnitt 1).
- **Schrift tauschen heißt alle Regeln prüfen**, die sie benutzen (`font-style`, `<em>`, Stärken). Eine Schrift ohne Kursivschnitt wird sonst künstlich schräg.
- **Unterlagen im selben Schritt anpassen:** `QUELLEN.md` (jede Bibliothek, jede Schrift), Design-Notizen, Pflege-Anleitung. `__pycache__` und Ähnliches gehören in `.gitignore`.
- Regeln für Scroll-Bühnen und 3D stehen in `handwerk.md` Abschnitt 11 und `3d-leistung.md`. Kurz:
  - höchstens etwa 300vh,
  - 3D erst bei der ersten Bewegung laden, am Handy ohne Schatten,
  - Layout und Kamera nach derselben Regel umschalten,
  - `<noscript>` zeigt den End-Zustand.
- Statische Seite: HTML/CSS/JS, bei mehreren Seiten Astro. Bibliotheken mit fester Version lokal in `site/vendor/`. Bewegung mit CSS Scroll-driven Animations, GSAP nur für Aufwendiges.
- `site/impressum.html` und `site/datenschutz.html` mit markierten Platzhaltern.
- `site/QUELLEN.md` für jede fremde Datei. `arbeit/austauschliste.md` für jeden Platzhalter und jede offene Freigabe: Impressumsangaben, **Einwilligung der Eltern bei erkennbaren Kindern auf Fotos**, Fotografen, Logos.
- Sicherheit nach `sicherheit.md`:
  - Fotos und PDFs ohne Metadaten neu speichern, nicht verlinkte Dateien raus.
  - Kein `style=` und kein `onclick=` im HTML.
  - Zum Schluss `node ${CLAUDE_PLUGIN_ROOT}/scripts/kopfzeilen.mjs website/<name>/site` (strenge Sicherheits-Header mit Hashes, `.assetsignore`). Nach jeder Änderung an eingebetteten Stilen oder Skripten neu laufen lassen.

## 5. Prüfen (für jede Fassung, auch kleine Änderungen)
- `node ${CLAUDE_PLUGIN_ROOT}/scripts/pruefen.mjs website/<name>/site`. Es schreibt `arbeit/pruefung/pruefung.json` und Bildschirmfotos. Jeder P0 wird behoben. Hinweise wägst du ab und begründest sie.
- Sieh die Bildschirmfotos selbst an, besonders Handy und alle Stellen mit Text auf Bild.
- **Leistung im Handy-Profil** nach jeder größeren Änderung: `node ${CLAUDE_PLUGIN_ROOT}/scripts/leistung.mjs website/<name>/site` (Lighthouse, Ziel mindestens 90, schreibt `arbeit/pruefung/leistung.json`). Die Abschluss-Sperre verlangt die Messung.
- **Scroll-Abläufe** (feststehende Bühne, 3D, Übergänge) prüfst du nach jeder sichtbaren Änderung mit `node ${CLAUDE_PLUGIN_ROOT}/scripts/ablauf.mjs website/<name>/site website/<name>/arbeit/ablauf --abschnitt "<css>" --stellen 0,0.3,0.6,0.9`. Es fotografiert dieselben Stellen auf drei Laptop-Größen und am Handy, hochkant und quer. Mit `--ohne-js` zusätzlich ohne JavaScript. Im SFH-Test fand es die meisten Fehler, schneller als das Prüfskript.
- Eine **bewusst dunkle Szene** (Nacht in 3D) markierst du mit `data-pruefen="dunkel"` am umgebenden Element und begründest es im Code. Sonst meldet das Prüfskript eine leere schwarze Fläche (W8).
- Agent `website-kritiker` rufen. Er bekommt die Pfade:
  - `site/`
  - `arbeit/pruefung/pruefung.json` und die Bildschirmfotos
  - `arbeit/vorbilder/`
  - `arbeit/idee.md`
  - `${CLAUDE_PLUGIN_ROOT}/wissen/handwerk.md`
  - bei Verbesserungen zusätzlich `arbeit/inhaltsliste.md`

  - bei Scroll-Momenten die Bildserie aus `ablauf.mjs`

  Er bekommt **nicht** deine Begründungen und **nicht** `hauptidee.md`. Er soll selbst sagen, ob er einen Moment sieht.
- Der Kritiker schreibt als erste Zeile ein **Merk-Urteil**: „merkt man sich“ oder „langweilig“. Bei „langweilig“ arbeitest du in der nächsten Runde am Moment, nicht an Details. Die Abschluss-Sperre verlangt das Merk-Urteil bei jeder neuen Seite.
- Korrigieren und neu prüfen, **höchstens 3 Runden**. Jede Runde sicherst du nach `arbeit/runden/<n>/`, die Antwort des Kritikers wörtlich als `arbeit/runden/<n>/kritik.md`. Die Abschluss-Sperre prüft das und die 3 Vorbild-Fotos. **Am Ende gilt die Fassung mit der besten Note**, nicht automatisch die letzte.

## 6. Vorschau (Stopp 2)
Simon öffnet die Seite **auf seinem Laptop**: `npx --yes serve website/<name>/site`, dann die angezeigte Adresse im Browser. Dazu kurz:
- was die Seite in einem Satz macht und woher die Idee kommt,
- die wichtigsten Bildschirmfotos (Handy und Desktop),
- was das Prüfskript und der Kritiker noch bemängeln,
- was niemand geprüft hat: mindestens wie flüssig es auf seinem Laptop läuft und wie es in Safari bzw. am iPhone aussieht. Bitte ihn, einmal durchzuscrollen. **„Fertig“ meldest du erst nach seinem Test**, ohne Grafikkarte misst du die Leistung nicht.
- die Austauschliste (was er liefern muss).

Seine Rückmeldung setzt du um und prüfst neu (Schritt 5).

## 7. Abgabe und Veröffentlichen
- Simon bekommt `site/`, `QUELLEN.md`, die Austauschliste und eine kurze **Pflege-Anleitung** (Inhalte als Dateien, Ändern im Browser auf GitHub).
- **Selbst pflegen geht nur mit automatischem Veröffentlichen.** Gehört zur Abgabe, nicht als Nachtrag: Cloudflare Builds (Repo verbinden) oder eine GitHub-Action, die bei jeder Änderung auf `main` hochlädt. Zugangsdaten trägt der Auftraggeber selbst als GitHub-Secret ein, nie im Chat.
- **Webspace statt Cloudflare** (z. B. IONOS): Die fertigen Dateien laufen auf jedem Webspace mit SFTP. Sicherheits-Header kommen in `.htaccess` statt `_headers`. Eine Server-Funktion (z. B. Live-Daten über `/api/…`) braucht dort ein kleines PHP-Skript. Die Datenschutzerklärung nennt den richtigen Anbieter.
- **Veröffentlichen nur, wenn Simon nach der Vorschau ausdrücklich Ja zu dieser Fassung sagt.** Dann kostenlos über Cloudflare: Projekt mit `wrangler.jsonc` (statische Dateien aus `site/`), `npx wrangler deploy`. Die Sperre fragt Simon dabei noch einmal. Ohne Ja beschreibst du nur, wie er es selbst machen kann.
- Hat Simon etwas beanstandet, das wieder passieren könnte, schlägst du `/personal:nachschulen` vor.

## Ehrlich abbrechen
Halte an und sag es Simon, wenn:
- das Ergebnis nur mit Bezahldiensten oder ohne Lizenz ginge,
- Inhalte erfunden werden müssten, damit die Seite funktioniert,
- 3D in der gewünschten Güte auf schwacher Hardware nicht flüssig läuft und kein Rückfall trägt,
- nach 3 Prüfrunden noch P0 offen sind,
- nach 3 Runden der Kritiker die Seite immer noch „langweilig“ nennt. Schreib dann in `arbeit/ehrlich.md`, woran es liegt (fehlendes Material, zu schwache Idee, Technik), und sag es Simon. Eine fehlerfreie Seite, die niemand erinnert, ist nicht fertig.

Ein ehrliches „so wird es nicht gut, weil …“ ist besser als eine Seite, die nach KI aussieht.
