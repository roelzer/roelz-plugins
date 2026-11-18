# 3D und Leistung (gegen W2 und W6)

Stand 18.11.2026. Quellen in `docs/personal/website-bauer/recherche.md`.

## Was Simons Laptop schafft
Simon (8 GB RAM, keine eigene Grafikkarte) über landonorris.com: „geht bei mir gut durch, aber beim Scrollen durch die Seite könnte es flüssiger sein“. Also: **ein** 3D-Objekt auf echtem Motiv ja, schwere Effekte über die ganze Fläche beim Scrollen nein. Ohne Grafikkarte im Testrechner (Software-Rendering) liefen WebGL-Seiten über die ganze Fläche mit 1–4 fps (Lando, SANTAL, JJ, Colombel). Foto, Video und 3D zum Zuschalten liefen mit 60 fps.

## Wahl der Bauweise
| Ziel | Bauweise |
|---|---|
| Produkt oder Objekt zeigen (Möbel, Werkzeug, Helm) | Echtes Motiv + **ein** Echtzeit-3D-Objekt (three.js, glTF aus Fotos/Scan, HDRI-Licht), Pixeldichte gedeckelt |
| Rundgang durch ein Haus, Kamerafahrt | **Vorab rendern** (Blender) als Bildfolge auf `<canvas>` oder als Video, mit Datenbudget. Echtzeit-3D nur auf Knopfdruck („Im 3D ansehen“, Vorbild belgradearbor.rs) |
| Stimmung ohne Objekt | Foto oder Video, Typografie, Parallaxe auf Ebenen. Kein WebGL nötig |

## Pflicht bei jedem Echtzeit-3D
- **Stufen:** Ohne WebGL oder bei sehr schwacher Grafik ein Standbild (gleiche Szene, vorab gerendert oder als Bildschirmfoto). Mit `prefers-reduced-motion` keine Kamerafahrt.
- **Pixeldichte deckeln:** am Desktop höchstens 1,25, am Handy höchstens 2 (`Math.min(devicePixelRatio, innerWidth > 768 ? 1.25 : 2)`, so macht es die Site of the Year 2025). Die Größe der Zeichenfläche ist der wirksamste Hebel (web.dev, The Hobbit: 50 % Fläche brachte 16 → 33 fps).
- **Nur zeichnen, wenn sich etwas bewegt** (beim Scrollen bzw. während einer Animation), nicht dauernd.
- **Budget:** höchstens 100.000 Dreiecke (gut 30–50k), Texturen höchstens 2048², höchstens 10 Materialien, Modell höchstens 10 MB. Komprimieren mit `npx @gltf-transform/cli optimize in.glb out.glb` (Meshopt) bzw. Texturen verkleinern. Kontrolle mit `renderer.info`.
- **Keine Post-Effekte** (Bloom, Tiefenunschärfe) und keine Kantenglättung auf schwachen Geräten.
- **Licht:** Studio-HDRI von Poly Haven als Umgebung (`scene.environment`), dazu höchstens ein bis zwei direkte Lichter. Tone Mapping `AgXToneMapping`. Farbtexturen sRGB, Normal-/Rauheitskarten linear (macht der GLTFLoader richtig, eigene Texturen prüfen). Falsches Farbmanagement ist ein Hauptgrund für den Spielgrafik-Look.
- **Licht einbacken**, wenn eine ganze Szene (Raum, Haus) in Echtzeit laufen muss: in Blender Licht und Schatten in Texturen backen, im Browser fast ohne Lichter anzeigen.
- three.js r187 mit `WebGLRenderer` (WebGPU fehlt in Firefox). Version fest, lokal in `site/vendor/`.

## Vorab gerenderte Bildfolge (Rundgang)
- Ca. 120–150 Bilder für eine Fahrt, Seite etwa 400–500vh lang, Bilder in ein `<canvas>` zeichnen.
- **Datenbudget** festlegen und einhalten (Beispiel: 150 Bilder × 60–100 KB AVIF ≈ 9–15 MB am Desktop, am Handy halbe Größe). Negativbeispiele aus der Messung: 55,8 MB, 57 MB, 82 MB.
- Bilder vorladen, bei langsamer Verbindung (`navigator.connection.saveData` bzw. langsamer Ladebeginn) nur ein Standbild zeigen.
- **Rechenzeit vorher nennen:** Blender Cycles ohne Grafikkarte ca. 55 s pro Bild in 1080p (gemessen 18.11.2026). 150 Bilder sind gut 2 Stunden, auf dem Laptop eher länger. Nur auf Simons Wunsch, über Nacht oder in kleiner Auflösung.

## Messen
- Das Prüfskript misst ohne Grafikkarte. Seine fps-Werte sind **nur ein Vergleich** (robust oder fragil), keine Abnahme.
- **Die Abnahme macht Simons Laptop:** An Stopp 2 öffnet er die Seite lokal und scrollt durch. Zeigt die Seite ruckelt: Pixeldichte senken, Fläche verkleinern, auf Bildfolge oder Standbild ausweichen.
