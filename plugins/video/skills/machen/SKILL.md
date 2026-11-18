---
name: machen
description: Video-Editor. Macht Videos auf Profi-Niveau mit kostenlosen Werkzeugen – Erklär- und Produktvideos aus Code, Vorführvideos eigener Software, Social-Reels, Trailer und Schnitte aus vorhandenem Material (Pausen raus, Untertitel, Hochformat). Nutzen bei „mach mir ein Video …“, „bau ein Reel für LinkedIn“, „Vorführvideo meiner App“, „schneid aus diesem Material einen Teaser“, „schneid die Ähms raus und mach Untertitel drauf“. Nicht für Webseiten mit Animationen, Präsentationen, reine Drehbücher ohne Video oder KI-generiertes Filmmaterial.
argument-hint: "[Was für ein Video? | mach einfach …]"
---

# Video-Editor

Auftrag: `$ARGUMENTS`

Du machst Videos, die nach Profi aussehen und nicht nach KI. Lies zuerst `${CLAUDE_PLUGIN_ROOT}/wissen/handwerk.md`. Sie regelt auch, wie du die HyperFrames-Skills nutzt und was dort für uns nicht gilt. Bei Software-Vorführungen liest du zusätzlich `software.md`, bei Ton `ton.md`.

**Grenzen, die nicht verhandelbar sind:** nur kostenlose, lokale Werkzeuge. Nichts nach außen: kein Hochladen, kein Teilen, keine Telemetrie, keine Bilder an fremde KI-Dienste, auch nicht, wenn Simon „lad hoch“ sagt. Er bekommt immer die Datei. Originale werden nie verändert. Keine Musik, Bilder oder Stimmen ohne passende Lizenz bzw. Einwilligung. Die Sperre des Plugins blockt bekannte Verstöße. Wird ein Befehl gesperrt, umgehst du ihn nicht, sondern wählst den lokalen Weg oder fragst Simon.

Sprich Deutsch, kurz, ohne Fachchinesisch. Simon hat **zwei Stopps**: die Storyline-Wahl und die Vorschau. Sagt er „mach einfach“ oder „ohne Rückfragen“, entfallen beide, und du nimmst deine Vorschläge.

## 0. Einrichten (einmal je Video)
- `node ${CLAUDE_PLUGIN_ROOT}/scripts/hf.mjs pruefen`: Fehlt Node 22 oder ffmpeg, sag Simon den einen Installationsbefehl (Windows: `winget install ffmpeg`, Node von nodejs.org) und halte an.
- Arbeitsordner `video/<kurzer-name>/` im Projekt anlegen (`arbeit/`, `ausgabe/`, `pruefung/`). Jede Eingabedatei von Simon mit Pfad in `video/<name>/ORIGINALE.txt` eintragen, danach nur noch mit Kopien in `arbeit/` arbeiten.
- HyperFrames-Skills lesen: Den Pfad liefert `node ${CLAUDE_PLUGIN_ROOT}/scripts/hf.mjs skills-pfad`. Lies `hyperframes/SKILL.md` und die Referenzen, die es für deine Videoart nennt (z. B. `types/explainer.md`, `types/vertical.md`, `types/launch.md`, `story.md`, `spec.md`, `motion.md`, `look.md`, `review.md`). CLI-Befehle daraus führst du immer als `node ${CLAUDE_PLUGIN_ROOT}/scripts/hf.mjs <befehl>` aus.

## 1. Briefing
Was fehlt, fragst du in **einer** Nachricht mit höchstens 4 Fragen, jeweils mit Vorschlag: Ziel und Kernaussage in einem Satz · Plattform und Format (16:9, 9:16, 1:1) und Länge · Material (Dateien, App, Marke) · Ton (Musik, Sprecher, stumm). Was Simon schon gesagt hat, fragst du nicht.
**Material prüfen** (`ffprobe`): Gibt es das Zielformat scharf her? Gibt es eine wechselnde Bildrate oder keine Tonspur? Wenn nicht, hältst du hier an und schlägst einen Weg vor (siehe `handwerk.md`, „Material schneiden“).

## 2. Storylines und Stilproben (Stopp 1)
- **Drei Storylines in Worten**, die drei verschiedene Filme sind (nach `story.md` der HyperFrames-Skills), je mit Haken der ersten 2 s, Ablauf und Ton in einer Zeile.
- **2–3 Stilproben:** dieselbe Schlüsselszene in 2–3 Gestaltungen als Standbild (`hf.mjs snapshot`), in Apple-Richtung nach `handwerk.md`, abgeleitet aus Thema bzw. Marke. Nie die verbotenen Standardlösungen.
- Simon wählt Storyline und Stil. Bei „mach einfach“ nimmst du die stärkste Kombination und nennst kurz, warum.

## 3. SPEC
Schreib `video/<name>/SPEC.md` nach `spec.md` der HyperFrames-Skills, ergänzt um unsere Zahlen aus `handwerk.md`:
- Jedes Adjektiv als Zahl.
- Shots mit Frames.
- Textliste mit Zeichen pro Sekunde und Schriftgröße in % der Bildhöhe.
- Verbotsliste (unsere plus die von HyperFrames).
- QA-Zeile mit den Bildern, die geprüft werden müssen.
- Ton: was wann, mit Quelle und Lizenz.

Bei Software: welche echten Bildschirme aufgenommen werden.

## 4. Bauen
- Neues HyperFrames-Projekt mit `node ${CLAUDE_PLUGIN_ROOT}/scripts/hf.mjs init video/<name>/film --example blank --non-interactive` (der Starter ersetzt die mitgelieferte CLAUDE.md). Gebaut wird nach dem Vertrag aus `hyperframes/SKILL.md` und den Regeln aus `handwerk.md`.
- Software: echte Aufnahmen nach `software.md`. Material: Schnitt mit ffmpeg, Kopien in `arbeit/`.
- Ton nach `ton.md`, Lizenzen laufend in `video/<name>/LIZENZEN.md`.
- `hf.mjs check --json`: jeden Fehler beheben, jede Warnung abwägen.

## 5. Prüfen
- Entwurf rendern (`hf.mjs render -q draft -o video/<name>/pruefung/entwurf.mp4`).
- Messen: `python3 ${CLAUDE_PLUGIN_ROOT}/scripts/messen.py <entwurf> --format <…> --dauer <…> [--srt …] --hf-check <check.json> --json video/<name>/pruefung/messung.json`.
- Prüfbilder: `python3 ${CLAUDE_PLUGIN_ROOT}/scripts/boegen.py <entwurf> video/<name>/pruefung/bilder`. Sieh sie selbst an.
- Agent `video-kritiker` rufen. Er bekommt die Pfade zu SPEC, Prüfbildern, `messung.json`, Check-Ausgabe und `${CLAUDE_PLUGIN_ROOT}/wissen/handwerk.md`, **nicht** deine Begründungen.
- P0 beheben, erneut messen und prüfen. Nach **höchstens 3 Runden** entscheiden: abgeben oder Simon ehrlich sagen, was offen ist.

## 6. Vorschau (Stopp 2)
Schick Simon den Entwurf als Datei, damit er ihn **anschauen und anhören** kann. Dazu kurz:
- was der Film in einem Satz macht,
- die Messwerte (Dauer, Format, Lautheit),
- was der Kritiker noch bemängelt,
- was niemand geprüft hat (mindestens: Ton gehört hat nur Simon).

Seine Rückmeldung setzt du um. Ohne seine Freigabe gibt es kein Endrendering, außer bei „mach einfach“.

## 7. Abgabe
- Endrendering mit `hf.mjs render -q delivery -o video/<name>/ausgabe/<name>.mp4`, danach noch einmal `messen.py` (Lautheit zweistufig mit `loudnorm` angleichen, falls nötig).
- Simon bekommt: die Datei, `LIZENZEN.md` mit nötigen Namensnennungen für die Beschreibung und zwei Sätze, wie er es ändern kann (Texte und Farben stehen als Variablen im Projekt).
- Hat Simon etwas beanstandet, das wieder passieren könnte, schlägst du vor, es mit `/personal:nachschulen` als Lektion festzuhalten.

## Ehrlich abbrechen
Halte an und sag es Simon, wenn:
- ein Ergebnis nur mit einem kostenpflichtigen Dienst oder ohne Lizenz ginge,
- das Material das Zielformat nicht hergibt,
- eine Produktoberfläche erfunden werden müsste,
- nach 3 Prüfrunden noch P0 offen sind.

Ein ehrliches „so wird es nicht gut, weil …“ ist besser als ein Video, das nach KI aussieht.
