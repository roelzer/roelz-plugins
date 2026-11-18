# Quellen und Lizenzen – Musterseite Schreinerei Holzmann

Alles liegt lokal im Ordner. Die Seite lädt nichts von fremden Servern (keine Google Fonts, kein CDN, keine Tracker).

## Schriften (in `assets/fonts/`)
| Schrift | Herkunft | Lizenz |
|---|---|---|
| Bricolage Grotesque (variabel, Überschriften) | npm-Paket `@fontsource-variable/bricolage-grotesque` 5.3.0, Original: github.com/ateliertriay/bricolage | SIL Open Font License 1.1, Lizenztext liegt bei (`LICENSE-bricolage-grotesque.txt`) |
| Hanken Grotesk (variabel, Fließtext) | npm-Paket `@fontsource-variable/hanken-grotesk` 5.3.0, Original: github.com/marcologous/hanken-grotesk | SIL Open Font License 1.1, Lizenztext liegt bei (`LICENSE-hanken-grotesk.txt`) |

## Programmbibliotheken (eingebaut in `assets/js/`)
| Bibliothek | Version | Wofür | Lizenz |
|---|---|---|---|
| GSAP mit ScrollTrigger, SplitText, DrawSVGPlugin | 3.15.1 | Scroll-Animationen, Text-Einblendung, Strichzeichnungen | GSAP Standard „No Charge“ License (gsap.com/standard-license), kostenlos, auch gewerblich. Lizenzhinweis steht am Ende von `main.js` |
| three.js | 0.187.0 | 3D-Schwalbenschwanz-Verbindung | MIT. Lizenzhinweis steht am Ende von `joint.js` |
| esbuild | 0.28 | nur zum Bauen (nicht auf der Seite) | MIT |

## Bilder und Grafiken
- **Keine Fotos, keine Fremdbilder.**
- Holzmaserungen (Hero, Holzarten, Texturen im 3D-Modell): selbst programmiert (Shader in `src/wood-shader.js`), werden im Browser berechnet.
- Strichzeichnungen Küche, Dachschrank, Treppe, Tür: selbst gezeichnet (SVG direkt in `index.html`).
- Logo-Zeichen „Jahresringe“ und `assets/img/favicon.svg`: selbst gezeichnet.
- `assets/img/zinken.webp`: Standbild aus dem eigenen 3D-Modell (für Geräte ohne WebGL).
- Symbole (Telefon, Pfeil, Kamera, Schließen): selbst gezeichnete SVG-Pfade.

## Vorbilder (nur angeschaut, nichts übernommen)
Bildschirmfotos in `_arbeit/vorbilder/`, Übersicht `_arbeit/uebersicht.jpg`. Alle von onepagelove.com:
Mood Furniture (Holz als Vollbild-Hintergrund), Pearl Tiling (Handwerksbetrieb, eine starke Akzentfarbe, nummerierte Abschnitte), Krynt und Archiste (große Schrift, klare Raster), Wood Shed Production (ehrliche „von Hand gemacht“-Ansprache).
