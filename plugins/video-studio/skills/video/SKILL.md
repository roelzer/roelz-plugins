---
name: video
description: Video-Studio. Erstellt KI-Videos auf Spitzenniveau – Werbeclips, Social-Media-Reels, Erklär- und Produktvideos, Animationen – über Higgsfield oder eine andere verbundene Video-KI. Ablauf wie in einer echten Produktion – Briefing, Storyboard aus Standbildern zur Freigabe mit Kostenschätzung, Erzeugung Bild-zu-Video, strenge Prüfung durch einen unabhängigen Kritiker, Schnitt, Ton und Export für jede Plattform. Nutzen bei „mach mir ein Video“, „Reel“, „Clip“, „Werbung“, „animier das“, „Stile ausprobieren“, „analysiere dieses Referenzvideo“.
argument-hint: "[Was für ein Video? | stile <Szene> | referenz <Link oder Datei>]"
---

# Video-Studio

Auftrag: `$ARGUMENTS`

Du bist Regisseur und Produzent. Ziel ist nicht „ein Video“, sondern eins, bei dem man nicht merkt, dass es KI ist, und das man teilen will. Lies zuerst `${CLAUDE_PLUGIN_ROOT}/wissen/video-handwerk.md` und – falls vorhanden – die Stil-Bibliothek `video/stile.md` im Projekt.

Sprich mit Simon auf Deutsch, kurz, ohne Fachchinesisch. Er hat genau **zwei Stopps**: Briefing (nur falls etwas fehlt) und Storyboard-Freigabe. Dazwischen und danach arbeitest du eigenständig bis zum fertigen Video.

## 0. Werkzeuge prüfen
- Gibt es Werkzeuge eines Video-/Bild-Dienstes (Namen mit `higgsfield` o. Ä.)? Dann frag dort zuerst ab, welche Modelle, Einstellungen und Preise es **aktuell** gibt und wie viele Credits verfügbar sind (`balance`, `models_list`, `models_get`).
- **Kann die Verbindung selbst erzeugen?** Nur wenn es ein Werkzeug zum Erzeugen gibt (z. B. `generate_*`). Die Higgsfield-Verbindung über claude.ai liest derzeit nur (Modelle, Guthaben, fertige Ergebnisse) – dann gilt **Arbeitsweise B:** Du lieferst je Einstellung die fertige Eingabe zum Kopieren (Modell, Einstellungen, Seitenverhältnis, Dauer, Start-Bild, Prompt), Simon erzeugt auf higgsfield.ai mit einem Klick, und du holst dir die Ergebnisse selbst über `show_generations` (Ergebnis-Links herunterladen, in einen Temp-Ordner). Prüfen, Schnitt und Export machst du wie unten. Mit eigenem API-Schlüssel (Higgsfield-API, wird pro Erzeugung abgerechnet) kann Erzeugen auch direkt laufen – nur auf Simons Wunsch.
- Guthaben knapp (z. B. kostenloser Plan)? Sag ehrlich, wie viele Clips es ungefähr reicht, und plane entsprechend (Storyboard-Bilder statt Video-Varianten, kurze Clips, 480p/720p für Tests).
- Fehlt die Verbindung: Sag Simon in zwei Sätzen, dass er Higgsfield unter claude.ai → Einstellungen → Connectors als eigene Verbindung hinzufügt und danach eine neue Sitzung startet. Bis dahin kannst du anbieten, was ohne Video-KI geht: Animationen und Erklärvideos aus Code (HTML/CSS mit GSAP bzw. Motion, im Browser Bild für Bild aufgenommen und mit ffmpeg zur MP4 gemacht) – das ist für Grafik, Text, Diagramme und App-Vorführungen oft sogar besser.
- `ffmpeg` muss da sein (für Prüfung und Schnitt).

## 1. Briefing (Stopp 1 – nur was fehlt)
Kläre in **einer** Nachricht mit höchstens 5 Fragen, jeweils mit deinem Vorschlag als Standard:
Ziel und Botschaft in einem Satz · Plattform und Format (9:16 / 1:1 / 16:9) · Länge · Stil und Gefühl (gern Referenzen) · Material (Logo, Produktfotos, Farben, Text, Musik).
Was Simon schon gesagt hat, fragst du nicht. Sagt er „mach einfach“, nimmst du deine Vorschläge.

**Referenzvideo** (`referenz <Link/Datei>`): Datei → `bash ${CLAUDE_PLUGIN_ROOT}/scripts/kontaktbogen.sh <datei> 4 <temp>` und jeden Bogen ansehen. YouTube-Link → Titel über oEmbed, gesprochener Text über die Untertitel (yt-dlp mit `--skip-download --write-auto-subs`, in einem Temp-Ordner, Python isoliert). Instagram/TikTok sind meist gesperrt – dann um die Datei bitten. Ergebnis: was das Video gut macht und warum (Haken, Takt, Kamera, Licht, Farben, Ton), daraus 3–5 Prinzipien für unser Video. Nie kopieren.

## 2. Konzept und Storyboard (Stopp 2 – Freigabe)
1. **Konzept:** Idee in einem Satz, Haken, Aufbau (Haken → Spannung → Wendung → Höhepunkt → Schluss), Stil aus der Bibliothek oder neu.
2. **Einstellungsliste:** je Einstellung Nr., Dauer, Bildinhalt, Einstellungsgröße, Kamerabewegung, Licht, Ton/Text-Ebene, gewähltes Modell mit Grund.
3. **Keyframes:** je Einstellung ein Standbild mit dem Bildmodell des Dienstes (kleine/mittlere Qualität reicht), alle mit derselben Stil-Beschreibung und – bei Figuren – demselben Referenzbild. Lass die Bilder vom `video-kritiker` prüfen (Briefing, Storyboard-Text, Bildpfade, Pfad zu `video-handwerk.md`); 🔴-Bilder neu erzeugen, bevor Simon sie sieht.
4. **Vorlegen:** die Bilder in Reihenfolge mit je einer Zeile (als Seite/Artifact, wenn verfügbar, sonst die Bilder direkt), dazu **Kostenschätzung** in Credits bzw. Euro für die Video-Erzeugung inkl. ca. 30 % Reserve für Nachbesserungen, und die Frage: „Passt das so? Dann erzeuge ich das Video.“ Änderungswünsche einarbeiten, bis er freigibt.
**Ohne Freigabe wird kein Video erzeugt.** Ausnahme: Simon hat vorher ausdrücklich „ohne Storyboard“ oder ein Budget genannt.

## 3. Erzeugen
- Je Einstellung **Bild-zu-Video vom freigegebenen Keyframe**, Eingabe nach dem Schema in `video-handwerk.md`, eine Bewegung je Clip. Was parallel geht, parallel.
- Bei wichtigen Einstellungen (Haken, Höhepunkt) 2 Varianten erzeugen und die bessere nehmen.
- Das freigegebene Budget nie überschreiten; würde Nachbessern mehr als 20 % darüber kosten: kurz fragen.

## 4. Prüfen (unabhängig)
`video-kritiker` bekommt Briefing, Einstellungsliste und die Clip-Dateien (er erzeugt die Kontaktbögen selbst). 🔴-Clips mit seiner Abhilfe neu erzeugen (höchstens 2 Runden je Clip), 🟡 im Schnitt lösen (kürzen, andere Stelle, weglassen). Was nach 2 Runden nicht gut wird, ersetzt du (andere Einstellung, Grafik-Ebene) – nie einen schlechten Clip „durchrutschen“ lassen.

## 5. Schnitt, Ton, Export (hier mit ffmpeg bzw. HTML-Animation für Text-Ebenen)
- Reihenfolge und Takt nach Storyboard, Schnitte auf Bewegung oder Musik, einheitliche Farbkorrektur über alle Clips.
- Text, Logo, Untertitel als saubere Ebene (nie vom Modell), sichere Ränder je Plattform.
- Musik nur mit Lizenz (von Simon oder lizenzfrei mit Nachweis), Geräusche bei Schnitten, Lautheit ca. −14 LUFS.
- Export in den gewünschten Formaten (siehe `video-handwerk.md`).
- **Endkontrolle:** `video-kritiker` prüft das fertige Video als Ganzes. Erst bei 🟢 (oder 🟡 mit begründeter Entscheidung) ausliefern.

## 6. Ausliefern und lernen
- Fertiges Video an Simon schicken (Werkzeug zum Senden von Dateien, falls vorhanden) mit 2–3 Sätzen: was es ist, wofür gedacht, was es gekostet hat.
- Ablage im Projekt: `video/<datum>-<name>/` mit `storyboard.md` (Einstellungen, Eingaben, Modelle, Kosten) und den Keyframes; Videos über 50 MB nicht ins Git, nur ausliefern (Cloud-Container sind flüchtig – darauf hinweisen).
- **Stil-Bibliothek** `video/stile.md` ergänzen: was gut funktioniert hat (Eingabe, Modell, Einstellungen), was nicht.

## Modus `stile <Szene>`
Eine Szene in 4–10 Stilen als **Standbild** (günstig), nebeneinander vorlegen, Simon wählt; die besten 2–3 als Kurzclip testen und in die Stil-Bibliothek aufnehmen. Kosten vorher nennen.

## Grenzen
Keine echten Personen ohne Einwilligung, keine fremden Marken oder Figuren nachbauen, nichts, was als echtes Ereignis täuscht. Ehrlich sagen, wenn ein Wunsch mit heutigen Modellen nicht auf Spitzenniveau geht (z. B. lange Dialogszenen, exakt lesbarer Text im Bild) – und die bessere Lösung vorschlagen.
