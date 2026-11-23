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

## Rezept: Logo oder Wappen als 3D-Objekt (starker, eigener Wow-Moment)
Simon zum Vereinswappen: „ein geiles 3D-Modell vom Logo, in so ner Metall-Optik, aber schon grün-weiß“, dann „mehr 3D, cleanere Ränder, kräftigere Farben, so wie die Vereinswappen früher in der Sportschau“. Muster vom 19.11.2026 im privaten Vereins-Repo (`neubau/wappen-v2/`, Skripte `bau.py`, `ball.py`, `szene.js`).
1. **Vektor sauber nachbauen statt nachzeichnen.** Gibt es keine SVG vom Auftraggeber:
   - Außenkontur aus der Alpha-Maske messen (skimage `find_contours` auf der 4-fach vergrößerten Maske).
   - Ecken festhalten, zwischen den Ecken glätten, eine Hälfte exakt spiegeln.
   - Rand als gleichmäßiger Versatz (shapely `buffer(-d, join_style="mitre")`).
   - Schrift: freie Schrift in derselben Form (z. B. TeX Gyre Adventor für Avant Garde) mit opentype.js in Polygone wandeln und **Buchstabe für Buchstabe** auf die Spalten des Originals einpassen.
   - Gerade Formen als exakte Rechtecke, runde Buchstaben aus der Maske mit festen Ecken.
   - Fußball als echtes abgestumpftes Ikosaeder, Drehung per Suche an das Original anpassen.
   - **Kontrolle:** Rote Kanten über das Original legen und die Abweichung in Prozent der Pixel messen. Ziel unter 10 %, der Rest sind Unschärfe und Handzeichnung im Original.
2. **Ebenen:** Je Farbe eine Polygonliste mit Löchern als JSON. Daraus `ExtrudeGeometry` direkt, ohne SVGLoader: Löcher bleiben sicher.
   - Körper mit Chromkante, Rand erhaben.
   - Weiße Emaille auf mittlerer Höhe, Schrift eingelassen.
   - Ein Ball, der nicht rund wirken soll (Simon: „3D aber nicht rund“), wird ein flaches Relief: weiße Felder auf Emaille-Höhe, grüne Teile darüber.
3. **Klare Kanten:** `bevelSegments: 1` (gefräste Schräge statt Rundung, Simon: „die sind wie so abgerundet“). Fasen klein halten: Chrom 0,09–0,11, Rand 0,04, Weiß 0,02 bei 10 Einheiten Wappenhöhe. Danach `toCreasedNormals(geo, 30°)`, sonst flimmern die Kanten.
4. **Ein Grün für alles** (Rand, Feld, Schrift, Ball): ein einziges Material. Simon: „der Rand muss genau das gleiche Grün haben wie der Rest“. Tone Mapping `NeutralToneMapping` hält die Farben kräftig.
5. **Licht wie im Fotostudio:** dunkler Raum mit großen Lichtflächen über `PMREMGenerator.fromScene`, eine davon hinter der Kamera. Dazu ein gerichtetes Licht mit weichem Schatten (Schattenkarte 2048²): Dann werfen die erhabenen Teile Schatten, das gibt „mehr 3D innen“.
6. **Auf der Seite:**
   - Erst bei der ersten Bewegung laden.
   - Nur zeichnen, wenn sich etwas ändert (Scrollen).
   - Pixeldichte am Desktop höchstens 1,5; wird es langsam, senken.
   - Am Handy keine Schatten.
   - Bis das 3D geladen ist, steht die SVG.
   - Gesamt etwa 80.000 Dreiecke.
7. **Einstieg mit Geschichte statt Effekt:** Das Wappen dreht sich beim Scrollen aus dem Dunkel nach vorn, während eine wahre Geschichte des Auftraggebers passiert. Beim Verein: das Flutlicht geht an, „Es werde Licht“ von 2020. Die Umgebung (Platz, Masten, Lichtkegel) ist ebenfalls 3D, sonst beißt sich eine flache Zeichnung mit dem echten Objekt. Umgebung und Objekt auf zwei Zeichenflächen, damit eine helle Fläche dazwischen den Übergang machen kann.

## Umfang klein planen (Probearbeit, 20.11.2026)
Der Haus-Rundgang in 3D lief in beiden Läufen in das Zeitlimit von 60 Minuten: einmal ganz ohne Seite, einmal mit halber Bildfolge. Ein großer Plan, der nicht fertig wird, ist schlechter als ein kleiner, der sitzt.
- **Ein Objekt oder eine Szene, eine Bewegung.** Eine Kamerafahrt oder eine Verwandlung, nicht beides und nicht mehrere Räume.
- **Reihenfolge, damit immer etwas lauffähig ist:**
  1. Durchstich: Der Moment läuft grob in `site/` (einfache Formen, ohne Feinschliff). Spätestens nach etwa einem Drittel der Zeit.
  2. Die ganze Seite grob: alle Abschnitte mit echtem Inhalt, Impressum, Datenschutz.
  3. Erst dann verfeinern: Material, Licht, Kanten, Übergänge.
- **Läuft der Durchstich nach einem Drittel der Zeit nicht,** wechselst du eine Stufe herunter und sagst es: von Echtzeit-3D auf eine kurze Bildfolge, von der Bildfolge auf Ebenen in 2,5D, im Notfall auf ein Standbild mit einer Bewegung. Nicht kurz vor Schluss neu anfangen.
- **Modelle aus einfachen Formen** in three.js bauen (Quader, Extrusion aus SVG, gefaste Kanten) statt große Fremdmodelle. Ein Schrank aus 12 Quadern mit Holz-Material wirkt, wenn Licht und Kanten stimmen.
- **Bildfolgen klein:** höchstens etwa 60 Bilder in 720p für den ersten Stand. Mehr nur auf Simons Wunsch.

## Pflicht bei jedem Echtzeit-3D
- **Erst bei der ersten Bewegung laden** (erstes Scrollen, Tippen oder Tastendruck), nicht beim `load`. Bis dahin steht ein Standbild bzw. die Vektorgrafik.
  - SFH-Test: beim `load` geladen gab es Handy-Leistung 62 und 12 s Blockierzeit. Nach der Umstellung waren es 100.
  - **Am Handy ohne Schatten.**
  - Danach `scripts/leistung.mjs`, Ziel mindestens 90.
- **Layout und Kamera nach derselben Regel umschalten** (Seitenverhältnis in JS und `@media (min-aspect-ratio: …)` im CSS).
- **`<noscript>` zeigt den End-Zustand** der Szene, damit die Seite ohne JavaScript nicht stillsteht.
- **Stufen:** Ohne WebGL oder bei sehr schwacher Grafik ein Standbild (gleiche Szene, vorab gerendert oder als Bildschirmfoto). Mit `prefers-reduced-motion` keine Kamerafahrt.
- **Pixeldichte deckeln:** am Desktop höchstens 1, am Handy höchstens 1,5 (`Math.min(devicePixelRatio, innerWidth > 768 ? 1 : 1.5)`). Die Site of the Year 2025 nimmt 1,25 und 2, aber auf Simons Laptop ohne Grafikkarte ruckelte die Schreinerei damit (23.11.2026).
- **Ruckel-Bremse einbauen:** Laufen etwa 12 Bilder hintereinander langsamer als 45 fps, die Auflösung um eine Stufe senken (höchstens zweimal, z. B. ×0,8 und ×0,6), dabei auch die Schattenkarte verkleinern.
- **Teure Bausteine meiden:** keine `VSMShadowMap` mit großem Weichzeichner (stattdessen `PCFSoftShadowMap`, Karte 1024²), kein `MeshPhysicalMaterial` mit Klarlack (stattdessen `MeshStandardMaterial`), Zeichenfläche nicht größer als die Bühne. Schatten, die sich nicht bewegen, als Bild unterlegen. Die Größe der Zeichenfläche ist der wirksamste Hebel (web.dev, The Hobbit: 50 % Fläche brachte 16 → 33 fps).
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
