# Recherche: 3D-Wow für den Video-Editor (18.11.2026)

Für später, wenn der Video-Editor mit besserer Hardware weitergeht. Alle Renderzeiten hier sind **Schätzungen** aus Benchmark-Daten. Gemessen wurde nur in der Cloud-Sitzung: ca. 55 s pro Bild (Cycles, 1080p, 48 Samples, 4 Kerne).

## Weg
1. **Hauptweg: Blender 5.2 LTS headless** (`blender -b --factory-startup -Y --offline-mode --python-exit-code 1 -P szene.py`) mit einer festen Vorlagen-Szene im Plugin. Gewartet bis Juli 2028, läuft ohne Oberfläche, Fehler kommen als Exit-Code. Final rendert **Cycles**, das läuft auf jeder CPU. EEVEE braucht eine GPU und läuft nicht headless unter Windows.
2. **MCP nur optional**, nie im Testlauf. Das offizielle Blender-Lab-MCP (GPL-3.0, ab Blender 5.1) ist die bessere Wahl. `ahujasid/blender-mcp` sendet ohne Zustimmung Nutzungsdaten (abschalten nur mit `DISABLE_TELEMETRY=true`), führt beliebigen Python-Code aus, der Port hat keine Anmeldung, und es wirbt für bezahlte Cloud-Generatoren. Für uns ist das nicht der Standard.
3. **Three.js in HyperFrames** für einfache Heldenobjekte (glTF, HDRI): schnell, aber ohne echtes Bounce-Licht. Der Path-Tracer ist ohne GPU unbrauchbar.
4. **Ablauf:** Blender rendert 3–5 s als PNG-Folge mit transparentem Hintergrund und Schattenfänger. HyperFrames legt Text und App-Aufnahmen darüber.

## 11 Regeln für Wow
1. Ein Heldenobjekt, das mindestens 40 % des Bildes füllt. Die Kamera fährt hinein, statt um das Objekt herum.
2. Ein Studio-HDRI als Grundlicht (Poly Haven, CC0), dazu Key, Fill und Rim. Key zu Fill 2:1 bis 3:1 für den hellen Look. Das Rim-Licht ist schmal und etwa so hell wie das Key.
3. Den Verlauf im Hintergrund mit Licht erzeugen, nicht mit einem Farbverlauf.
4. Bei Metall die Umgebung drehen, nicht das Objekt, dazu ein Kontaktschatten.
5. Echte PBR-Werte statt geschätzter Farben, z. B. Kupfer linear (0,932; 0,623; 0,522) mit Metallic 1 (physicallybased.info). Dazu Kanten-Bevel und Rauheitsvariation.
6. Farbmanagement AgX (Filmic ist veraltet).
7. Echter Maßstab in Metern, Schärfe auf das Objekt.
8. Langsame Kamera mit Easing: etwa 3° pro Sekunde, also höchstens 15–20° Drehung in 4 s. Brennweite 50–100 mm.
9. Bewegungsunschärfe mit Shutter 0,5 Frames (entspricht 180°).
10. Cycles mit 64–128 Samples, adaptivem Sampling, OIDN mit Albedo und animiertem Seed. Clamp Indirect gegen helle Einzelpixel.
11. Mit einer Vorlage arbeiten statt frei zu modellieren, danach drei Standbilder prüfen (kein schwarzes Bild, Histogramm schneidet nicht ab). „Claude's from-scratch geometry is basic“ (The Rundown, 07/2026).

API-Fallen: Ab Blender 4.0 heißen Principled-Felder anders (Specular → Specular IOR Level). Ab 5.0 heißt die Engine `BLENDER_EEVEE`. Gegenmittel: Version fest, im Skript `bpy.app.version` prüfen.

## Einrichtung (feste Version 5.2.4)
- Windows: portables ZIP `blender-5.2.4-windows-x64.zip` von download.blender.org, SHA256 `BBD78F8931DC940444DA4FF2983374930F9F5C092AE0E330588E9760BB9D967C`. winget führt nur 5.2.3.
- Linux: `blender-5.2.4-linux-x64.tar.xz`, SHA256 `2fd14c50987426897ba60237ee996edf2b4151f4b1a72a460ca20be58c1d2d86`.
- Sicherheit: fremde `.blend`-Dateien nie mit `-y` öffnen, lieber glTF oder OBJ importieren. Assets nur von Poly Haven oder ambientCG, jedes Modell einzeln prüfen, Lizenzen in `LIZENZEN.md` eintragen. Nichts hochladen, keine Generatoren.
- Kupferrohre, Fittings und Heizkörper lassen sich gut per Skript bauen (Kurve mit Bevel, Array-Modifier). Herunterladen lohnt sich vor allem für HDRIs und Texturen.

## Renderzeiten (Schätzung) und Strategie
- 1080p, 64 Samples, einfache Produktszene, Laptop-CPU: etwa 20–75 s pro Bild. 4 s Film (120 Bilder) brauchen 40–150 min. Eine Intel-Arc-iGPU (oneAPI) ist etwa 3,4-mal so schnell wie die CPU, eine AMD 780M kaum schneller.
- Nur 1–2 Heldenaufnahmen von 3–5 s, der Rest bleibt in HyperFrames. Vorschau bei 480×270 mit 16 Samples.
- Alternative: ein Standbild in hoher Qualität, die Kamerafahrt dann als Parallaxe in HyperFrames.

## Nicht empfohlen
Cloud-Generatoren (Hyper3D Rodin, Meshy, Tripo u. a.), Sketchfab (Konto, gemischte Lizenzen mit NC/ND), BlenderKit (Konto, Bezahlplan), OptiX (nur NVIDIA), KeyShot und Renderfarmen (kostenpflichtig).

## Unbelegt
Nate Herks Ablauf (das Vorbild-Short hat keine Beschreibung), echte Zeiten auf Simons Rechner, EEVEE ohne GPU, Zahlen für Bevel, Roughness, Brennweite und Blende.

Quellen: Blender-Handbuch 5.2 und Release Notes 4.0/5.0/5.2, projects.blender.org/lab/blender_mcp, github.com/ahujasid/blender-mcp, anthropic.com/news/claude-for-creative-work, opendata.blender.org, Poly Haven, ambientCG, physicallybased.info, Fujifilm „How to Light a Studio“, KeyShot-Blog, The Rundown, voyager.so, HyperFrames-Referenzen `3d.md` und `path-tracing.md`.
