# Video-Handwerk: unsere Schicht über HyperFrames

Stand: 18.11.2026, HyperFrames 0.9.65. Herkunft jeder Regel: `docs/personal/video-editor/recherche.md` (Profi-Recherche) und `probelauf.md` (Fehlerbilder F1–F8 aus dem Probelauf ohne Video-Editor).

## Vorrang
Die **HyperFrames-Skills** (Ordner: `node <Plugin>/scripts/hf.mjs skills-pfad`) liefern das Handwerk für Story, Bewegung, Look, Ton und Prüfung. Lies sie, wie der Skill es sagt. **Wo sie etwas anderes sagen als diese Datei, gilt diese Datei.** Davon ausdrücklich ausgenommen und verboten:
- „Usage beacon“ (`events`), `feedback`, `auth`/Anmeldung, `usage`, `cloud`, `share`, `publish`, `open`/`catch-up` (Desktop-App), `skills update`, `upgrade`, `snapshot --describe` und Bildbeschreibungen über fremde KI-Dienste.
- HeyGen-Stimmen, -Avatare, -Musik, -Video und jede Empfehlung „no cheaper or free swaps“. Bei uns gilt immer der kostenlose, lokale Weg. Beim Medien-Skill nur lokale Quellen (`resolve --local-only`).
- `npx hyperframes …` direkt. Immer `node <Plugin>/scripts/hf.mjs …` verwenden (feste Version, Telemetrie aus). Die Sperre blockt den direkten Aufruf.
- Rendern ohne Freigabe bleibt wie bei HyperFrames verboten. Unsere Freigaben stehen im Skill.

## Look: Apple-Richtung, nicht sichtbar KI
- **Prinzipien statt Marke:** Zurückhaltung. Das echte Produkt oder Motiv steht im Mittelpunkt und füllt mindestens 40 % des Bildes. Präzise Typografie mit klarer Hierarchie aus zwei bis drei Größen. Ruhige, bestimmte Kamera. Licht und Luft: helle oder echte Hintergründe, Tiefe durch Licht und Schatten, kein Glow. **Ein** Akzent pro Film, eingesetzt an **einer** Stelle.
- **Nicht übernehmen:** Apple-Logo, Apple-Werbung, die Schrift SF Pro (Lizenz gilt nur für Apple-Plattformen). Schriften kommen unter OFL als Datei in `assets/fonts/` (z. B. aus Fontsource), keine Systemschrift und kein Nachladen aus dem Netz.
- **Verboten ohne ausdrückliche Begründung im SPEC** (das ist der Look aus dem Probelauf): dunkles Navy oder schwarze Fläche mit Glow, Neon oder Bloom, leuchtende Karten mit runden Ecken, gestrichelte Deko-Linien, Verlaufshintergründe als Füllung, Logo auf Verlauf als Intro oder Abspann, Inter/Space Grotesk/Geist/JetBrains Mono als Standardwahl, „fade + slide-up“ für jedes Element. Die Liste wächst: Jede Standardlösung, die trotzdem im Film landet, wird im REVIEW benannt.
- **Woher die Gestaltung kommt** (in dieser Reihenfolge): Marke des Auftrags, Simons Vorbild-Videos, eine echte Referenz aus der Welt des Themas (Werkstoff, Ort, Gerät), dann erst eigene Entscheidung. Jedes Adjektiv im SPEC als Zahl (Farbe als Hex, Größe in % der Bildhöhe, Dauer in Frames).

## Lesbarkeit (F3)
- Eingeblendeter Text: höchstens **20 Zeichen pro Sekunde**, mindestens **0,8 s** Standzeit, höchstens **2 Zeilen à 42 Zeichen** (Netflix/BBC). Haltezeit ungefähr Zeichen ÷ 20 + 0,5 s.
- Kleinste Schrift für eingeblendeten Text: **7 % der Bildhöhe bei 16:9** (≈ 76 px bei 1080p), **3,9 % bei 9:16** (≈ 75 px bei 1920 px Höhe). Zu viel Text heißt Wörter streichen, nie die Schrift verkleinern.
- Text im Material (App-Oberfläche, Film) zählt nicht. Muss er gelesen werden, wird herangefahren oder er wird als eingeblendeter Text wiederholt.

## Haken (F4)
Bild 0 ist das Vorschaubild: nie schwarz, nie nur ein Logo, nie leer. Die ersten 2 s sind die dichtesten. Die Kernaussage steht spätestens bei 3 s, der Haken trägt bis 6 s. Einstieg mitten in der Handlung oder mit einer Nahaufnahme.

## Bewegung und Rhythmus (F1)
- Etwa alle 2–4 s kommt neue Information (bei Musik alle 1–2 Takte; 120 BPM bei 30 fps ergibt 15 Frames pro Takt). Halten nur für die Lesezeit. Das Schlussbild steht höchstens 2 s.
- Nie linear animieren (außer bei mechanischer Dauerbewegung). Auftritte bremsen beim Ankommen. Zusammengehöriges kommt gestaffelt, nie alles gleichzeitig.
- 3–5 Übergangsarten pro Film, jede ausgelöst durch etwas im Bild (Verwandlung, Zoom „hinein“, Fahrt zum nächsten Ort). Eine Blende ist erlaubt, aber nicht der Standard.
- Messbar mit `scripts/messen.py`: längste Strecke ohne neue Information über 4 s ist ein schwerer Fehler. Dünne Deko-Bewegung zählt nicht als Information.

## Echtes Produkt (F6, F7)
- Was das Produkt darstellt, ist das echte Produkt. Simons App wird mit Playwright aufgenommen (Anleitung in `software.md`). Aufräumen ist erlaubt (Testdaten, Cursor, ruhige Fenster), erfinden nie. Fehlt ein Bildschirm, kommt ein beschrifteter Platzhalter hin, und Simon wird gefragt.
- Mit hoher Pixeldichte aufnehmen (deviceScaleFactor 2–3). Höchstens so weit hineinzoomen, wie die Pixeldichte reicht. Hochformat eigens aufbauen (mobiles Layout oder neu angeordnete Ebenen), nie einfach aus 16:9 schneiden.
- Sichere Ränder: Handlung innerhalb von 90 %, Text innerhalb von 80 % der Bildfläche. Bei Reels zusätzlich die Bedienfelder der Plattform frei lassen: oben 14 %, unten 35 %, seitlich 6 % ohne Text und Logo. Die Fläche dort wird trotzdem gefüllt, nur nicht mit Wichtigem.
- Bildpunkte per Raster finden (HyperFrames `scripts/locate.mjs`), nicht schätzen.

## Material schneiden
- Originale nie verändern. Gleich zu Beginn trägt der Skill alle Eingabedateien in `video/<name>/ORIGINALE.txt` ein (die Sperre schützt sie). Gearbeitet wird an Kopien in `video/<name>/arbeit/`.
- Vor dem Schnitt das Material messen (`ffprobe`): Auflösung, Bildrate (wechselnd?), Tonspur, Seitenverhältnis. Gibt das Material das Zielformat nicht scharf her (z. B. 640×360 → 1080×1920, oder 2,35:1-Film → 9:16), wird vorher angehalten. Simon bekommt einen Vorschlag: anderes Layout (Bild im Bild, unscharfer Hintergrund, Hochformat-Komposition) oder anderes Material.
- Schnitte auf Wortgrenzen und auf Bewegung bzw. Takt, Blenden um 30 ms gegen Knackser. Blickpunkt über den Schnitt in derselben Bildregion halten. J/L-Schnitte für Ton.
- Pausen und „ähm“ entfernen: Transkription mit Wortzeiten (`node hf.mjs transcribe <datei> --language de` oder faster-whisper, **nie ein `.en`-Modell**), dann auf Wortgrenzen schneiden. Untertitel als SRT, geprüft mit `messen.py --srt`.

## Ton (F5)
Stimmen und Musik: siehe `ton.md`. Grundregeln:
- Ein Film über 15 s, der etwas erzählt, hat ein Musikbett und Klänge zu den sichtbaren Handlungen, außer er ist bewusst für stummes Abspielen gebaut. Dann trägt der Text alles, und das steht im Bericht.
- Eine durchgehende Musik, auf den Takt geschnitten, am Ende auf dem Schlussakkord auflösen statt ausblenden. Effekte sparsam, nicht derselbe Whoosh bei jedem Schnitt. Keine selbst synthetisierten Töne.
- Musik 6–10 dB unter die Stimme absenken. Endmischung −16 bis −14 LUFS, True Peak höchstens −1 dBTP (`ffmpeg loudnorm` zweistufig).
- **Du kannst nicht hören.** Sag es im Bericht und nenne die Messwerte. Ob der Ton gut ist, entscheidet Simon an Stopp 2.

## Lizenzen
Jedes Video bekommt `video/<name>/LIZENZEN.md`: jede Musik, jedes Geräusch, jede Schrift, jedes Bild und jeder Film mit Quelle, Lizenz und gegebenenfalls nötiger Namensnennung. Erlaubt sind CC0, Pixabay-Lizenz, OFL und CC BY (mit Nennung im Video oder in der Beschreibung). **Nie NC** (nicht kommerziell), nie Songs aus Charts oder YouTube, nie fremde Marken. Stimmen echter Personen nur mit deren Einwilligung.

## Prüfen (F8)
1. `node hf.mjs check --json` → alle Fehler beheben, jede Warnung abwägen.
2. `python3 <Plugin>/scripts/messen.py <video> --format … --dauer … [--srt …] --json messung.json`.
3. `python3 <Plugin>/scripts/boegen.py <video> <ordner>`: Kontaktbogen, Handy-Bogen, Streifen über jeden Schnitt. Selbst ansehen.
4. Den Agenten `video-kritiker` mit SPEC, Prüfbildern und Messwerten rufen, **ohne** deine Begründungen. Er urteilt je F1–F8. Höchstens 3 Runden, dann ehrlich berichten, was offen ist.
5. Nie den eigenen Film in Punkten bewerten. Immer auflisten, was niemand geprüft hat (Ton, Bewegung in Echtzeit, Windows).
