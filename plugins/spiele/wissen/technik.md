# Technik: Werkzeugstand und wann was

Stand: 24.11.2026. Versionen aus der npm-Registry, Größen selbst gemessen (`gzip -9` der Auslieferungsdatei). Vor dem Einbau Version und Lizenz neu prüfen und fest eintragen (`kaplay@3001.0.19`, nie „latest“). Bibliotheken liegen lokal im Spielordner, nie per CDN.

## Wann was
| Lage | Wahl | Warum |
|---|---|---|
| Ein Bildschirm, wenige Objekte, eigene Mechanik (fast alle Mini-Spiele) | **reines Canvas 2D** | 0 KB, volle Kontrolle über Zeitschritt und Gefühl, eine einzige `index.html` |
| Rätsel, Karten, Raster | **DOM oder SVG** mit `data-spielflaeche` | Text scharf, Treffflächen einfach, barrierearm |
| Mehrere Szenen, Sprites, Kollisionen, und der Canvas-Code würde lang | **Kaplay** | klein (etwa 68 KB gz), einfache API |
| Tilemaps, viele Szenen, Physik, Kamera | **Phaser** | ausgereift, aber 5× so groß wie Kaplay |
| 3D trägt die Idee (Kegeln, Werfen im Raum) | **three.js** + Rückfall ohne WebGL | Standard für 3D im Browser; Leistung auf schwachem Gerät messen |
| Physik in 3D | **cannon-es** (oder einfache eigene Physik) | klein genug, MIT |
| Klang | **ZzFX** oder **jsfxr**, im Code erzeugt | keine Dateien, keine Lizenzfrage, kein Server |
| Godot, Defold, Unity-Web | **nie für Mini-Spiele** | WASM-Größe, COOP/COEP-Header, Probleme in Safari (Godot-Web-Doku) |

## Werkzeugstand
| Werkzeug | Version | Lizenz | Größe gz | Bemerkung |
|---|---|---|---|---|
| Kaplay | 3001.0.19 | MIT | etwa 68 KB (`kaplay.mjs`) | Nachfolger von Kaboom |
| Phaser | 4.2.1 | MIT | 312 KB (nur Arcade-Physik) bis 344 KB (voll) | |
| three.js | 0.187.0 | MIT | etwa 185 KB (minifiziert, gebündelt) | nur importieren, was gebraucht wird |
| cannon-es | 0.20.0 | MIT | etwa 35 KB | 3D-Physik |
| ZzFX | 1.4.0 | MIT | unter 1 KB (Micro) | Ton aus Zahlenreihen |
| jsfxr | 1.4.1 | Unlicense | etwa 6 KB | Retro-Klänge |
| plinkfx | – | MIT, Klänge CC0 | etwa 3 KB | Kandidat, vorher den Code lesen |
| Kenney-Grafik | – | CC0 | – | kenney.nl, in CREDITS nennen (freiwillig, aber üblich) |
| Schriften | – | OFL | – | als `.woff2` lokal mit `OFL.txt`; Quelle z. B. fonts.google.com (Download, nicht Einbinden) |
| Playwright | im Projekt | Apache-2.0 | – | für `spielpruefen.mjs` und den Prüfer |

Nicht gemessen und nicht empfohlen: PixiJS (8.23.0, etwa 250 KB gz, nur Darstellung), Babylon.js und PlayCanvas (groß), Excalibur, LittleJS. Größe von Godot- und Defold-Exporten ist unbelegt.

## 3D ohne Grafikkarte
- Pixeldichte deckeln (`renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5))`), am Handy keine Schatten.
- Rückfall ohne WebGL: eine 2D-Fassung oder ein Standbild mit Hinweis, kein weißer Bildschirm.
- Im Test läuft WebGL über SwiftShader. Die fps aus `leistung.json` dienen nur dem Vergleich zwischen Fassungen.

## Häufige Ruckel-Ursachen in Canvas 2D
- `shadowBlur` oder `filter` je Objekt im Loop: sehr teuer. Leuchten einmal vorab in ein Offscreen-Canvas zeichnen oder weglassen.
- Bei jedem Bild neue Objekte, Arrays oder Farbverläufe anlegen: Müllabfuhr ruckelt. Vorab anlegen und wiederverwenden.
- `canvas.width` jedes Bild neu setzen: leert und kostet. Nur bei Größenänderung.
- Messen vor und nach der Änderung mit `spielpruefen.mjs` (fps normal und 4× gedrosselt) und beide Werte nennen.
