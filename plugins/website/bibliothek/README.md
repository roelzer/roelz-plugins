# Baustein-Bibliothek

Simon, 24.11.2026: „wenn ich Kontingent hab, immer die Bibliothek erweitern. Wenn ich dann einen neuen Auftrag gebe, baut der quasi nur noch die Dinge einmal um auf das Thema, ggf. noch ein bisschen anders, dass es nicht ganz gleich ist.“

Hier liegen fertige, geprüfte Bausteine als neutrale Demos. Ein Auftrag baut sie nicht neu, sondern **passt sie an** (Thema, Motiv, Farben, Texte) und **verändert sie leicht** (siehe „Abwandeln“). Nur der Einstieg wird pro Kunde neu gebaut.

## Aufbau eines Bausteins
`bibliothek/<id>/`, z. B. `bibliothek/l1-kartenstapel/`:
- `index.html`: eigenständige Demo mit eigener Scrollstrecke, ohne Kundendaten, ohne fremde Server. Bilder als neutrale Platzhalter (Flächen, Formen), keine echten Personenfotos.
- `baustein.css`, `baustein.js`: der eigentliche Baustein. Alles Anpassbare steht oben als CSS-Variablen (`--b-farbe-1`, `--b-dauer` …) bzw. als `EINSTELLUNGEN`-Objekt im JS.
- `baustein.json`: Steckbrief (siehe unten).
- Bewegung über `_kern/scroll.js` (eigener kleiner Helfer: Fortschritt eines Elements durch den Bildschirm, ein `requestAnimationFrame` je Bild). **Keine GSAP-Dateien im Repo** (Lizenz der Weitergabe ungeklärt); im Kundenprojekt darf GSAP lokal unter `site/vendor/` dazukommen.

## Steckbrief `baustein.json`
```json
{
  "id": "l1-kartenstapel",
  "name": "Kartenstapel aus dem Material",
  "abschnitt": "leistungen",
  "lautstaerke": "laut",
  "bauform": "L1",
  "was_man_sieht": "Jede Leistung schiebt sich als Karte über die vorige …",
  "technik": "position: sticky, transform, _kern/scroll.js",
  "vorbild": "Scale",
  "slots": ["titel", "karten[]: {titel, text, bild}"],
  "stellschrauben": ["--b-versatz", "--b-skalierung", "EINSTELLUNGEN.karten"],
  "abwandeln": ["Kartenform (Fliese, Brett, Wabe)", "Richtung (von unten, von der Seite)", "Stapelkante sichtbar ja/nein"],
  "gemessen": { "fps_normal": 60, "fps_4x": 48, "datum": "2026-11-24", "renderer": "SwiftShader" },
  "reduzierte_bewegung": "Karten stehen untereinander, ohne Stapel",
  "genutzt_in": ["Musterseite Honig (24.11.2026)"],
  "herkunft": "aus dem Honig-Katalog übernommen, neutralisiert"
}
```

## Aufnahmeregeln (jeder neue Baustein)
1. Läuft eigenständig per Doppelklick und eingebettet (iframe).
2. `pruefen.mjs` ohne P0, fps normal und 4× gedrosselt gemessen und im Steckbrief.
3. Ruhiger Zustand bei `prefers-reduced-motion`, Inhalt auch ohne JavaScript sichtbar.
4. Nur `transform`, `opacity`, `clip-path` animiert. Kein bildfüllendes WebGL.
5. Neutral: keine Kundennamen, keine echten Fotos von Personen, keine Marken.
6. Eintrag in `bausteine.json` (wird mit `scripts/bibliothek.mjs` aus den Steckbriefen erzeugt) und Bilderblatt in `<id>/vorschau.png`.

## Abwandeln (damit keine zwei Seiten gleich aussehen)
Bei jedem Einsatz ändert der Bauer **mindestens zwei** der Achsen, die im Steckbrief unter `abwandeln` stehen, plus Motiv, Farben und Texte. Was er geändert hat, steht im Drehbuch (`arbeit/drehbuch.md`, Spalte Baustein: `l1-kartenstapel (Form: Wabe, Richtung: seitlich)`).
