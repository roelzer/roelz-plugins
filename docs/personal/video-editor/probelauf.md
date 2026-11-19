# Probelauf ohne Video-Editor (18.11.2026) – Befunde

Vier Aufgaben (erfunden, von Simon an Stopp 1 zu bestätigen), je ein frischer Claude-Subagent ohne Hinweise, nur kostenlose Werkzeuge (ffmpeg, Node, Python, Playwright). Ausgewertet an Kontaktbögen und Einzelbildern durch den Personaler. Material: „Sintel“-Trailer (Blender Foundation, CC BY 3.0) und eine kleine Demo-App.

## B2 LinkedIn-Reel (Text-Animation, HTML+Playwright Bild für Bild, ffmpeg)
Gut: technisch sauber (1080x1920, 15 s, 30 fps), lesbare Schrift, Fortschrittsbalken, Ränder frei, Hook „3 Fehler“ im ersten Bild, hat Bilder selbst geprüft.
Schwach (warum es nach „KI“ aussieht):
- Foliensatz statt Video: je Szene Text-Karten einblenden, dann ~2 s Stillstand; kaum Bewegung, keine Bildsprache (keine Rohre/Produkt/Menschen, nur Text-Boxen).
- Zu viel Text für die Zeit: ~25 Wörter pro 3-s-Szene – im Feed nicht lesbar (keine Lesezeit-Rechnung).
- Komposition: untere ~40 % jedes Bildes leer; Inhalt klebt oben.
- Generischer KI-Look: dunkles Navy + Neon-Orange, abgerundete Karten mit Glow, gestrichelte Deko-Linien.
- Kein Ton/Sounddesign (nur stumme Spur).
- Keine Gestaltungsrichtung/Vorbilder vorher festgelegt; kein Storyboard; keine Bewegungsprinzipien (Easing, Überlappung, Rhythmus zum Takt).
- Fachaussage selbst als unsicher markiert (gut), aber ungeprüft eingebaut.

## B4 Software-Vorführvideo (HTML-Bühne + Playwright Bild für Bild, 60 fps, selbst erzeugter Ton)
Gut: kein Echtzeit-Mitschnitt, sondern Bild-für-Bild-Rendern (ruckelfrei); echte App gezeigt; Kamerafahrt, nummerierte Hinweise, Klick-Rückmeldung; Lautheit gemessen; ehrlich „Ton nicht angehört“.
Schwach:
- Bildausschnitt bei Zooms unsauber: Kopfzeile links abgeschnitten („– Heizungsrohre…“), Feldbeschriftung oben angeschnitten, Browserleiste halb im Bild – keine Regel für sichere Ränder/Bildmitte bei Kamerafahrten.
- Viel leere graue Fläche, App wirkt klein und bieder; kein „Produktvideo-Look“ (kein Hintergrund/Device-Mockup-Stil, keine Tiefe, Hinweis-Pillen winzig).
- Intro/Outro = Logo auf Verlauf (generisch), kein Nutzen-Satz/Hook am Anfang.
- Musik synthetisch mit numpy erzeugt – vermutlich billig klingend; nicht angehört.
- Zeiger klein, Tippen ohne Hervorhebung der Wirkung.

## B3 Teaser aus Filmtrailer (ffmpeg-Schnitt, Hochformat-Ausschnitte, Untertitel)
Gut – bester Lauf: echte Story-Hook mit Dialog, Montage auf Paukenschläge, Ausschnitte folgen Gesichtern, deutsche Untertitel, Lautheit gemessen (−14 LUFS), Original per Prüfsumme unverändert, CC-BY korrekt.
Schwach:
- Abspann 3,5 s von 15 s (23 %) fast statisch – für ein Reel viel zu lang; Info-Text klein.
- Einstieg: erste Sekunde langsame vermummte Figur + einblendender Titel – kein starker Haken in Sekunde 0–1.
- Starke Vergrößerung (2,35:1 → 9:16) macht Bilder weich – keine Prüfung/kein Hinweis vorab, ob Material das Format hergibt.
- Einige Einstellungen sehr dunkel (Gasse).
Lehre: Mit gutem echtem Material liefert Claude ordentlich – das Müll-Problem entsteht vor allem, wenn es Bilder selbst „erfinden“ muss (B1/B2/B4: Folien-/Vorlagen-Look).

## B1 Erklärvideo 30 s (HTML-Animation Bild für Bild, 60 fps, stumm)
Gut: klare Dramaturgie Problem→Lösung→Vorteile→Aufruf, gute Idee (Excel-Fehler poppen auf), Werte plausibel nachgerechnet, ehrlich „nicht in Echtzeit angesehen“.
Schwach:
- Wieder dunkles Navy + Kupfer/Orange-Glow (2. von 3 Code-Videos mit fast gleicher Palette).
- Elemente klein, Tabelle/Karten bei 1080p kaum lesbar, viel leere dunkle Fläche.
- Erstes Bild leer/dunkel – kein Haken; Aufruf-Bild 7 s fast unverändert.
- Folienstruktur (Überschrift links + Karte rechts), Vorteile als 3 Karten – Vorlagen-Look.
- App-Oberfläche erfunden (nicht die echte App), stumm.

# Gemeinsame Fehlerbilder (F1–F8)
F1 Folien statt Film: Szenen = Elemente einblenden + Stillstand; kaum Kamera, Tiefe, Übergänge mit Bedeutung; lange Standbilder (Aufruf 7 s, Abspann 3,5 s). [B1,B2,B3,B4]
F2 Einheits-KI-Look: dunkles Navy + Orange/Kupfer-Glow, abgerundete Glow-Karten, gestrichelte Deko. [B1,B2,B4]
F3 Lesbarkeit/Maßstab: zu viel Text für die Zeit (~25 Wörter/3 s), Schrift/Elemente zu klein, große leere Flächen. [B1,B2,B4]
F4 Kein Haken in Sekunde 0–1 (leeres Bild, langsame Einblendung, Logo-Intro). [B1,B3,B4]
F5 Ton fehlt oder billig selbst synthetisiert; Ton nie angehört. [B1,B2,B4]
F6 Erfundene statt echte Inhalte (Mock-UI statt echter App, keine echten Bilder/Fotos). [B1,B2]
F7 Bildausschnitt: abgeschnittene Kanten bei Zooms, Weichzeichnung durch starke Vergrößerung ohne Vorab-Prüfung. [B3,B4]
F8 Kein Vorab-Prozess: keine Gestaltungsrichtung/Vorbilder, kein Storyboard zur Freigabe, keine Lesezeit-Rechnung; Prüfung nur an Standbildern, Bewegung/Ton nie beurteilt. [alle]
Behalten (machten alle richtig): Bild-für-Bild-Rendern statt Echtzeit-Aufnahme, Originale unangetastet, Lautheit gemessen, Lizenz-/Quellenangabe.
