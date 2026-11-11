# Video-Handwerk: was ein KI-Video „irre gut“ statt „KI-Müll“ macht

Grundlage für den Skill `video` und den `video-kritiker`. Modelle und Preise ändern sich monatlich – **welche Modelle es gerade gibt, was sie kosten und was sie können, fragst du immer live beim verbundenen Dienst ab** (z. B. über die Higgsfield-Werkzeuge), nie aus dem Gedächtnis.

## Die fünf Gesetze
1. **Erst die Idee, dann die Bilder.** Ein Video ist gut, wenn es *eine* klare Botschaft hat und einen Grund, dranzubleiben. Schöne Bilder ohne Idee bleiben Müll.
2. **Storyboard vor jeder Erzeugung.** Standbilder kosten einen Bruchteil von Video. Erst wenn das Storyboard überzeugt, wird bewegt. Nie ohne Simons Freigabe Videos erzeugen.
3. **Bild zuerst, dann Bewegung (Keyframe → Video).** Jede Einstellung startet von einem freigegebenen Standbild (Bild-zu-Video). So bleiben Figur, Licht, Farben und Stil über alle Einstellungen gleich. Reiner Text-zu-Video nur für Ausprobier-Runden.
4. **Eine Einstellung, eine Handlung.** 3–8 Sekunden je Clip, eine klare Bewegung (Figur *oder* Kamera bewegt sich deutlich, nicht alles gleichzeitig). Lange Szenen entstehen im Schnitt, nicht im Modell.
5. **Text, Logo, Zahlen und Untertitel nie vom Modell erzeugen lassen** – die kommen in der Nachbearbeitung als saubere Ebene darüber. Generierter Text ist fast immer fehlerhaft.

## Dramaturgie
- **Haken in den ersten 1–2 Sekunden** (Social Media): Bewegung, Frage, Überraschung, ein starkes Bild. Kein Logo-Intro am Anfang.
- Aufbau: Haken → Spannung/Problem → Wendung/Lösung → Höhepunkt → klarer Abschluss (Botschaft, Handlungsaufforderung, Logo).
- **Takt:** Schnitte auf Musik-Schläge oder auf Bewegung („Cut on action“); Social 0,5–2 s je Einstellung, Erklärvideo 2–4 s, edel/ruhig 3–6 s. Höhepunkt mit dem stärksten Bild, Ende ruhig.
- Jede Einstellung muss eine Aufgabe haben (zeigen, erklären, fühlen lassen) – sonst raus.

## Bildsprache (für jede Einstellung festlegen)
- **Einstellungsgröße:** Totale (Ort), Halbtotale (Figur im Raum), Nah (Gefühl), Detail (Produkt, Hände, Textur). Wechseln, nie drei gleiche hintereinander.
- **Kamera:** statisch, langsamer Push-in (Bedeutung), Pull-out (Enthüllung), seitliche Fahrt (Tracking), Orbit (Produkt), Drohne/Vogelperspektive (Größe), Handkamera (Echtheit). Eine Bewegung je Einstellung.
- **Licht:** Tageszeit und Lichtrichtung benennen (goldene Stunde, weiches Fensterlicht, Gegenlicht mit Kante, Neon-Nacht). Licht macht 50 % von „hochwertig“.
- **Objektiv/Look:** Weitwinkel (Dynamik), 50 mm (natürlich), Tele mit geringer Schärfentiefe (edel, Produkt), Filmkorn, Farbstimmung (warm/kühl, entsättigt, kontrastreich).
- **Durchgehende Gestaltung:** feste Farbpalette, gleiche Lichtstimmung, gleiche Figur (Referenzbild bzw. Figuren-/Gesichtsfunktion des Dienstes, falls vorhanden) in allen Einstellungen.

## Eingabe (Prompt) für eine Einstellung
Frei und bildhaft wie für einen Kameramann, aber vollständig. Reihenfolge:
**Motiv** (wer/was, genau) · **Handlung** (eine) · **Ort** · **Kamera** (Größe + Bewegung) · **Licht** · **Stil/Look** · **Stimmung**.
Beispiel: „Ein junger Monteur in dunkelblauer Arbeitsjacke schraubt eine glänzende Kupferleitung fest, Nahaufnahme der Hände, langsamer Push-in, warmes Gegenlicht der Morgensonne durch Staub, 85 mm, geringe Schärfentiefe, cineastisch, ruhig und konzentriert.“
- Zusätzlich das *Gefühl* beschreiben („soll sich befriedigend und sauber anfühlen“) – Modelle setzen das um.
- Was nicht passieren soll, positiv umformulieren („ruhige Kamera“ statt „kein Wackeln“); wo der Dienst ein Negativfeld hat: verzerrte Hände, zusätzliche Finger, Text, Wasserzeichen, Flackern.
- Referenzbilder und Referenzvideos des Nutzers mitgeben, wenn der Dienst das erlaubt.

## Modellwahl (Grundsätze – die aktuelle Liste kommt live vom Dienst)
- Realistische Menschen, Gesichter, Lippen: das aktuell stärkste Realismus-Modell.
- Cineastische Kamerafahrten, Atmosphäre: Modelle mit guter Kamerasteuerung.
- Stilisiert (Animation, 3D, Spielzeug-, Pixel-, Anime-Look): Modelle mit Stilstärke; vorher 3–4 Stile als Standbild testen.
- Produkt: Bild-zu-Video vom echten Produktfoto, Orbit oder Push-in, sauberer Hintergrund.
- Bei Unsicherheit: dieselbe Einstellung mit 2 Modellen erzeugen (kleine Auflösung), besseres nehmen.

## Nachbearbeitung (hier mit ffmpeg / HTML-Animation)
- Clips in Storyboard-Reihenfolge, Schnitte auf Takt; Überblendungen sparsam (harter Schnitt ist meist besser).
- **Einheitliche Farbe:** leichte gemeinsame Farbkorrektur über alle Clips (Kontrast, Sättigung, Wärme), damit es aus einem Guss wirkt.
- Text-Ebenen: große, kurze Zeilen, sichere Ränder (Social: oben 15 %, unten 20 % frei für Bedienelemente), Untertitel Wort für Wort im Takt der Sprache, Schrift aus der Gestaltung des Kunden/Projekts.
- **Ton:** Musik mit Lizenz, Geräusche (Whoosh bei Schnitt, Klick, Atmosphäre) heben Qualität enorm; Lautheit auf ca. −14 LUFS normalisieren (`loudnorm`), Sprache immer vor Musik.
- Export: 9:16 1080×1920 (Reels, TikTok, Shorts), 1:1 1080×1080, 16:9 1920×1080 (YouTube, Präsentation); H.264, 30 fps (oder 24 fps für Kino-Look), hohe Bitrate.

## Typische KI-Fehler (Kritiker prüft jedes Bild)
Hände/Finger, Zähne, Augen schielen, Gesicht wechselt zwischen Einstellungen, Gegenstände tauchen auf/verschwinden, Physik (Wasser, Haare, Stoff), Gleiten statt Gehen, verbogene Linien und Gebäude, Text-Brei, Flackern, plastikhafte Haut, zu glatte „KI-Ästhetik“ (alles perfekt beleuchtet, keine Textur), Zeitlupe ohne Grund, Stilbruch zwischen Clips.

## Stil-Bibliothek
Je Nutzer bzw. Projekt `video/stile.md`: jeder bewährte Stil mit Name, Beispiel-Eingabe, Modell, Einstellungen, Beispielbild, wofür er passt. Neue Stile entstehen durch Ausprobieren (eine Szene in 4–10 Stilen als Standbild), die besten kommen in die Bibliothek. Vor jedem neuen Video zuerst dort nachsehen.

## Recht und Anstand
Keine echten Personen ohne deren Einwilligung (Simon selbst nur mit seinem Wunsch), keine fremden Marken, Logos, Figuren oder Werke nachbauen, keine Täuschung (KI-Inhalte, die als echtes Ereignis ausgegeben werden). Vorbilder liefern Prinzipien, nie Inhalte. Plattform-Regeln zur KI-Kennzeichnung beachten.
