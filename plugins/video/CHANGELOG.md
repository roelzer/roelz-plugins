# Änderungsprotokoll Video-Editor

## 0.1.1 – Zurückgestellt bis bessere Hardware

Simon an Stopp 2 (18.11.2026): „ansich alles ned schlecht, aber is ja jetz auch nichts besonderes … die gut aufgelösten oder geil animierten dinger sind ja die mit wow effekt“, danach: „video geht nur mit besserer hardware … wir widmen uns dem website bauer“.
- Nicht eingestellt. Das Plugin bleibt im Repo, damit es mit Grafikkarte weitergehen kann. Ergebnisse und offene Punkte: `docs/personal/video-editor/probearbeit.md`. Wissen fürs Gehirn: Notiz „Video-Produktion mit Claude“.

## 0.1.0 – Erste Einstellung durch den Personaler

Anlass: Simon: „Ich will einen Agenten für Videoerstellung, der alle Tools kennt … ich hab noch gar keine Videos gemacht, weil alle Ergebnisse von Claude bis jetzt richtiger Müll waren. Ich will, dass das High-End wird.“ Gebaut vom Personaler nach Probelauf, Profi-Recherche und Stellenausschreibung (`docs/personal/video-editor/`).
- **Skill `/video:machen`:** Erklär- und Produktvideos aus Code, Vorführvideos eigener Software, Social-Reels, Trailer, Schnitte aus Material. Zwei Stopps: erst Annahmen, Storylines und Stilproben, dann die Vorschau. Gestaltung in Apple-Richtung, typische KI-Looks sind verboten.
- **Schicht über HyperFrames** (Apache-2.0, feste Version 0.9.65). Die Regeln für Story, Bewegung und Look kommen aus den HyperFrames-Skills, unsere Regeln haben Vorrang.
- **Agent `video-kritiker`:** unabhängig, urteilt je Fehlerbild F1–F8 anhand von Messwerten und Prüfbildern, bekommt die Begründungen des Erbauers nicht.
- **Sperre (Hook, Node):** blockt Bezahl-, Upload- und Telemetrie-Befehle, HyperFrames am Starter vorbei und jede Änderung an Original-Dateien.
- **Starter `scripts/hf.mjs`:** feste Version, Telemetrie aus, keine Schlüssel für fremde KI-Dienste, ersetzt die von HyperFrames erzeugte CLAUDE.md.
- **Messung ohne KI (`scripts/messen.py`):** erstes Bild, Strecken ohne neue Information (an den Probelauf-Videos geeicht), Stillstand, Lautheit, Untertitel-Lesbarkeit. Dazu kommen `scripts/boegen.py` (Kontaktbogen, Handy-Bogen, Bildstreifen über jeden Schnitt) und `scripts/transkribieren.py` (lokale Transkription mit Wortzeiten).
- **Wissen:** `handwerk.md` (Regeln mit Zahlen), `software.md` (echte App-Aufnahmen), `ton.md` (Musiksammlung, Geräusche, Mischung), `stimmen.md` (VoxCPM2 für Charakterstimmen, Pocket TTS als Rückfall).
- **15 Testfälle** in `evals/`, dazu eine Testumgebung und ein eigener Testläufer (`tests/werkzeug/`) für Fälle, die schreiben. Grund: `claude plugin eval` versiegelt das Dateisystem, wenn es als root läuft.
