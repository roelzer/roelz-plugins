# Profi-Recherche Video-Editor (18.11.2026)

Vier Recherchen: Werkzeugstand, Motion-Design-Profis (A), Social- und Demo-Video-Profis (A), Video-Agenten-Vorbilder einschließlich der HyperFrames-Skills (B). Der Probelauf mit den Fehlerbildern F1–F8 steht in `probelauf.md`. Belastbarkeit: h = hoch, m = mittel, n = niedrig. Vollständige Zitate stehen in den Berichten der Recherche-Agenten. Diese Datei hält die Zuordnung fest.

## Werkzeuge (nur kostenlos)
| Werkzeug | Wofür | Lizenz | Beleg | Bel. |
|---|---|---|---|---|
| HyperFrames 0.9.65 (HeyGen) | Videos aus HTML/CSS/GSAP, Bild für Bild gerendert; mit Agenten-Skills, `check`, `snapshot --review`, `audio`, `transcribe` | Apache-2.0; lokales Rendern kostenlos, ohne Konto | github.com/heygen-com/hyperframes, hyperframes.heygen.com/faq.md; hier getestet: 10 s in 29 s gerendert | h |
| GSAP 3.15 | Animation | Standardlizenz, kommerziell frei | gsap.com/standard-license | h |
| ffmpeg | Schnitt, Lautheit (`loudnorm`, `ebur128`), Untertitel (`subtitles`), `freezedetect`, `xfade` | LGPL/GPL, Nutzung unkritisch | ffmpeg.org/ffmpeg-filters.html | h |
| Piper + Stimme `de_DE-thorsten` | deutsche Sprecherstimme lokal | Engine GPL-3.0, Stimme CC0 | huggingface.co/rhasspy/piper-voices (Modellkarte) | h |
| faster-whisper / `hyperframes transcribe --language de` | Transkription, Wortzeiten | MIT | github.com/SYSTRAN/faster-whisper | h |
| auto-editor | Pausen entfernen | Unlicense; Binary von GitHub | auto-editor.com/installing | m |
| Manim | nur für Mathe-/Diagrammvideos | MIT | docs.manim.community | m |

**Nicht verwendet:**
- Remotion: ab 4 Mitarbeitern Firmenlizenz, 25 $ pro Monat und Person.
- HeyGen-Stimmen, -Avatare und -Cloud sowie `share`/`publish`/`feedback`/`events`/`auth`: kosten Geld oder senden Daten nach außen.
- MusicGen: CC-BY-NC.
- Kokoro: kann kein Deutsch.
- Coqui XTTS: nur nicht kommerziell.
- Edge-TTS: inoffizieller Online-Dienst.
- DaVinci Resolve Free: Automatisierung nur in der kostenpflichtigen Studio-Version.

**Kostenlose Medien:**
- Pexels, Pixabay: ohne Namensnennung.
- Freesound: nur CC0 oder CC BY, nie NC.
- Schriften unter der OFL.
- LottieFiles.

## Praktiken gegen die Fehler aus dem Probelauf
| Fehler | Praktik (Regelkandidat) | Quelle | Bel. |
|---|---|---|---|
| F1 Folien statt Film | Etwa alle 2–4 s etwas Neues (je nach Musik alle 1–2 Takte). Kein ungeplanter Stillstand über 0,7 s (`freezedetect`), Halten nur für die Lesezeit. Szenen nicht „alles im ersten Viertel, dann eingefroren“. Gestaffelte Auftritte statt gleichzeitiger. Nie linear animieren. 3–5 Übergangsarten, jede ausgelöst durch etwas im Bild. | HyperFrames film.md, spec.md, motion.md; product-launch-video CRAFT.md; UX in Motion; School of Motion; Cutting 2011 | h/m |
| F2 Einheits-KI-Look | Standardlösungen sind namentlich verboten („dark navy void, glow, neon …“). Die Gestaltung kommt aus Thema und Marke oder aus einer Referenz, nicht aus Gewohnheit. Jedes Adjektiv wird im SPEC als Zahl festgelegt. 2–3 Stilproben derselben Szene zur Wahl. | HyperFrames spec.md, look.md; Anthropic frontend-design; Milanote | h/n |
| F3 Lesbarkeit | Höchstens 20 Zeichen pro Sekunde (BBC: 0,33 s pro Wort), mindestens 0,8 s Standzeit, höchstens 2 Zeilen mit je 42 Zeichen. Kleinste Schrift: 7–8 % der Bildhöhe bei 16:9, 3,9–4,5 % bei 9:16. Zu viel Text heißt Wörter streichen, nie die Schrift verkleinern. Hauptmotiv nimmt mindestens 40 % des Bildes ein. | Netflix Timed Text; BBC Subtitle Guidelines; HyperFrames spec.md, story.md | h |
| F4 Haken | Bild 0 ist das Vorschaubild: nie schwarz, nie nur ein Logo. Die ersten 2 s sind die dichtesten, die Kernaussage steht spätestens bei 3 s. Mitten in der Handlung oder mit einer Nahaufnahme einsteigen. | HyperFrames story.md; Google ABCD (+30 %, Kantar); TikTok; LinkedIn | h |
| F5 Ton | Eine durchgehende Musik, geschnitten auf den Takt. Effekte als echte Aufnahmen (CC0) nur auf Schlüsselmomente, nicht derselbe Whoosh bei jedem Schnitt. Musik 6–10 dB unter die Stimme absenken. Ziel −14 bis −16 LUFS, höchstens −1 dBTP. Selbst synthetisierte Klänge vermeiden. „Ich kann nicht hören“ offen sagen, Messwerte nennen. | HyperFrames sound.md; Apple App Previews; EBU R128; FEVR | m |
| F6 Erfundenes | Was das Produkt darstellt, ist das echte Produkt: echte UI aufnehmen, aufräumen erlaubt, erfinden nie. Fehlt etwas, kommt ein beschrifteter Platzhalter hin. | HyperFrames launch.md; Apple App Previews; product-launch-video | h |
| F7 Bildausschnitt | Mit hoher Pixeldichte aufnehmen (deviceScaleFactor 2–3) statt hineinzoomen. Zoom höchstens so weit, wie die Pixeldichte reicht. Hochformat eigens aufbauen statt aus 16:9 schneiden. Sichere Ränder: Handlung 90 %, Text 80 % (EBU 3,5/5 %). Bildpunkte per Raster finden (`locate.mjs`), nicht schätzen. Zeiger groß, ruhender Zeiger wird ausgeblendet. | Apple; HyperFrames launch.md, film.md; EBU R95; Screen Studio | h/m |
| F8 Vorab-Prozess und Prüfung | Drei Storylines nur in Worten, Simon wählt; danach SPEC mit verbotenen Standardlösungen und QA-Zeile. Prüfung am Kontaktbogen der Szenen, dazu Bildstreifen über jeden Schnitt (±0,2 s), Handy-Bogen 360 px, Messwerte vor Augenmaß. Ein **unabhängiger** Kritiker bekommt SPEC und Messwerte, nicht die Begründungen des Erbauers. Keine Bewertung in Punkten. „Was niemand geprüft hat“ wird aufgelistet. Bewegung wird nicht aus einem einzelnen Bogen beurteilt (Vision-Modelle sind bei Zeitabfolgen nahe Zufall). | HyperFrames story.md, spec.md, review.md; Anthropic Harness-Design 2026; video-use; TOMATO (ICLR 2025) | h/m |

## Entscheidung Bauform (Empfehlung der Recherche B)
**Eine dünne eigene Schicht über den HyperFrames-Skills (Variante b).**
- Nicht nur die Skills installieren: Sie verlangen Telemetrie und Feedback-Uploads, drängen zu HeyGen („no cheaper or free swaps“), haben keine deutsche Stimme und prüfen standardmäßig selbst.
- Nichts Eigenes von Grund auf: Die HyperFrames-Regeln treffen F1–F8 fast eins zu eins. Ein Nachbau aus eigenem Wissen bringt laut SkillsBench nichts.
- Abhängigkeitsrisiko (unter Version 1.0, fast täglich neue Versionen): Version fest pinnen, Updates nur nach einem Testlauf. Unsere Prüfungen (ffmpeg) bleiben werkzeugneutral.

## Herkunft je Regel im neuen Plugin
Wird beim Bau ergänzt.
