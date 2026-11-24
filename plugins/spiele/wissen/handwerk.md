# Handwerk: kleine Browserspiele, die sich gut anfühlen

Stand: 24.11.2026. Herkunft: `docs/personal/spiele-bauer/recherche.md` (Praktiken 1–17) und `probelauf.md`. Jede Regel ist prüfbar; „Prüfung“ sagt, wer oder was sie prüft.

## 1. Regeln
| # | Regel | Prüfung | Quelle |
|---|---|---|---|
| 1 | **Erste Minute aufschreiben** (`arbeit/erste-minute.md`): durch Tun beigebracht, endet beim ersten Moment, in dem die Idee zündet. Keine Regel-Liste vor dem Start, die erste Berührung ist eine Spielaktion. Höchstens ein einzeiliger Hinweis. | Datei vorhanden; `spielpruefen.mjs` S6 (mehr als 60 Wörter oder nummerierte Liste vor der ersten Eingabe); Prüfer Frage 1–2 | Miyamoto zu World 1-1; Claude-Code-Game-Studios („first minute … taught by doing“) |
| 2 | **Abstand zum nächsten Spiel:** „Nächstes bekanntes Spiel: X – meins unterscheidet sich in: Y“. Y ist eine Mechanik, die man in der ersten Minute spürt. Ohne Y wird die Idee geändert. Dazu der **Merk-Satz**: Was erzählt man abends davon? | Satz in `arbeit/idee.md`; Prüfer Frage 9–10 | Claude-Code-Game-Studios („nothing to say there is a copy“); Anthropic Harness-Design; Website-Bauer 1b |
| 3 | **Stellschrauben-Tabelle:** jeder Abstimmungswert mit `value`, `min`, `max`, `step` in einem Konfig-Block, `?tune` zeigt Schieber. Nachsicht-Fenster wirken zugunsten des Spielers (Coyote-Time etwa 100 ms, Eingabepuffer). | Regex im Code; Übergabe nennt ≥ 3 Stellschrauben mit Wert | Celeste `Player.cs` (`JumpGraceTime = 0.1f`); Thorson („fudged … in the player's favor“); Survey arXiv 2011.09201 |
| 4 | **Hitstop etwa 50 ms, Juice gestuft** (`feedback("klein" \| "mittel" \| "gross")`) und abschaltbar (Wackeln, Blitzen). Mittel schlägt keins und extrem. | Code; Schalter sichtbar | Celeste (`Freeze(.05f)`); Kao-Studie über Survey 2011.09201; awesome-gamedev-agent-skills game-feel |
| 5 | **Fester Zeitschritt, fester Zufall:** `?seed=N`, `window.game.step(ms)`, `window.render_game_to_text()` (JSON mit `modus`, `punkte`). Bots spielen, ohne Pixel zu raten. | `spielpruefen.mjs --bot` S8 | Claude-Code-Game-Studios; godogen („?seed=N fixes the RNG“); game-creator (render_game_to_text) |
| 6 | **Spielbarkeit per Bot beweisen:** punkten möglich, verlieren möglich, „Nochmal“ startet neu. Bei Wischspielen trifft ein mittlerer Wisch. Bot mit menschenähnlichem Rauschen. | `spielpruefen.mjs --bot`; Prüfer Frage 3 | game-creator gameplay-invariants; Play2Code (arXiv 2605.28258); Roohi u. a. 2107.12061 |
| 7 | **Design ist eine Hypothese:** Ein Bot ersetzt keinen Menschen. Immer ein 30-Sekunden-Test mit einem echten Menschen, in der Übergabe als konkreter Auftrag. | Übergabe | Valve, Ambinder GDC 2009 („Nothing beats direct gameplay observation“) |
| 8 | **Prüfer getrennt vom Bauer:** Ein frischer Agent spielt nur über Playwright und kennt die Begründungen nicht. | `spiele-pruefer` gerufen, Antwort in `arbeit/runden/` | Anthropic Harness-Design („agents reliably skew positive when grading their own work“) |
| 9 | **Sofort-Neustart, kurze Runden:** vom Scheitern bis zur nächsten Eingabe unter 1 s. Gegenposition: genug Zeit, den Fehler zu verstehen (ein kurzer Blick, kein Menü). | `spielpruefen.mjs --bot` (Neustart-ms) | Team Meat (Super Meat Boy), zweite Hand |
| 10 | **Hochkant als eigener Fall:** Fotos vom aktiven Spiel bei 390×844 und 1280×720, Spielfläche hochkant ≥ 0,5 der Höhe, kein abgeschnittener Text, Treffflächen ≥ 44 px (mindestens 24). | `spielpruefen.mjs` S2, S3, Fotos; Prüfer Frage 4–5 | threejs-game-skills QA; WCAG 2.2 Target Size; Hoober |
| 11 | **Schwaches Gerät simulieren:** Bildzeit im aktiven Spiel mit CPU-Drosselung 4×, WebGL-Renderer nennen. Ziel ≥ 50 fps normal, ≥ 30 fps gedrosselt, Werte in `arbeit/leistung.json`. | `spielpruefen.mjs` S7 | CDP `Emulation.setCPUThrottlingRate`; godogen („Headless Chrome silently falls back to SwiftShader“) |
| 12 | **Einbetten:** `touch-action: none` nur auf der Spielfläche. Im iframe auf einer langen Seite scrollt ein Wisch die Seite nicht. Das Spiel geht ohne Vollbild. | `spielpruefen.mjs` S4, S5 | MDN touch-action („game surface“); BCD Fullscreen (iPhone nicht) |
| 13 | **Nichts von fremden Servern:** Schrift, Skript, Ton lokal. Schriften OFL mit Lizenztext, Ton im Code (ZzFX, jsfxr), Fremdgrafik nur CC0 (Kenney), alles in `CREDITS.md`. | `spielpruefen.mjs` S1; Sperre | LG München I 3 O 17493/20 (Google Fonts); OFL-FAQ §2.1/§1.7; kenney.nl/support |
| 14 | **Ton erst nach der ersten Berührung** (`AudioContext.resume()`), auf iOS zusätzlich `navigator.audioSession.type = "playback"`. | Code; Ton-Schalter sichtbar | Chrome Autoplay-Blog; WebKit-Bug 237322 |
| 15 | **Erst reines Canvas, Engine nur bei Bedarf** (`technik.md`). Godot und Defold nicht für Mini-Spiele. | Begründung in `idee.md` | eigene Messung (npm, gzip -9); Godot-Web-Doku |
| 16 | **Ehrliche Übergabe:** geprüft und geraten getrennt, Stellschrauben, „Noch von keinem Menschen gespielt“ bis Simon gespielt hat, 30-Sekunden-Testauftrag. | Übergabe | Claude-Code-Game-Studios Handover („nothing you ran judges whether it is fun“) |
| 18 | **Bedienung verzeiht** (Simons Blindvergleich 24.11.2026, Kegeln: „Bedienung A“, ohne Spiele-Bauer gebaut). Die Geste startet **überall** auf der Spielfläche, nicht nur auf einem kleinen Objekt („Zieh vom Ball aus …“ verlor). Ein misslungener Versuch zählt nicht als Fehlwurf, sondern zeigt sofort, was fehlte („Schneller wischen“). Zielen und Auslösen sind getrennt (erst Ball verschieben, dann wischen). Am Laptop geht es auch mit Tastatur. | Bot wischt aus 3 zufälligen Startpunkten; Fotos vom Hinweis | Simons Blindvergleich |
| 19 | **Eine Welt mit Charakter statt nur einer Mechanik** (Blindvergleich, Lehrling: Fassung ohne Spiele-Bauer gewann). Die Siegerin hatte bei gleicher Kern-Idee mehr Welt: vier Holzarten, eine Figur am Rand, die trocken kommentiert („Das war Eiche. Echte Eiche.“), Gefahr wird vorher an der Decke angekündigt, Aufträge statt nackter Punkte. Die Mechanik allein reicht nicht, zum Thema gehören Material, Stimme und kleine Ziele. | Prüfer-Frage „Welt“; in `idee.md` je Idee: Stimme, Material, kleines Ziel | Simons Blindvergleich |
| 17 | **Schlank bleiben:** Fallen, Prüfskript und Vorlagen statt Prozess-Bürokratie. | – | godogen README |

## 2. Fallen
| Falle | Was passiert | Was hilft |
|---|---|---|
| **SwiftShader im Test** | Headless Chrome ohne Grafikkarte rechnet WebGL in Software. fps sind dann viel schlechter oder anders verteilt als auf echten Geräten. | `spielpruefen.mjs` liest den Renderer und schreibt „nur Vergleich“. In der Übergabe so sagen; echte Bildrate prüft Simon am Gerät. |
| **iOS-Ton** | Safari spielt keinen Ton vor einer Berührung; mit Stummschalter am iPhone bleibt Web-Audio stumm. | `resume()` im ersten Eingabe-Ereignis, `navigator.audioSession.type = "playback"` (wo vorhanden), Ton-Schalter. Nie Ton beim Laden starten. |
| **Fullscreen fehlt am iPhone** | `requestFullscreen` gibt es auf dem iPhone nicht (nur iPad). Ein Spiel, das Vollbild voraussetzt, ist dort klein oder kaputt. | Layout füllt den Ansichtsbereich (`100dvh`) ohne Vollbild. Vollbild-Knopf nur als Zusatz, wo vorhanden. |
| **Safari löscht `localStorage`** | Nach 7 Tagen ohne Besuch löscht Safari (ITP) Skriptspeicher; die Bestenliste ist weg. | `navigator.storage.persist()` anfragen und im Spiel einen Satz zeigen: „Bestenliste nur auf diesem Gerät.“ |
| **`touch-action` auf `body`** | `touch-action: none` auf `html` oder `body` sperrt Zoomen und Scrollen der ganzen Seite, auch der Vereinsseite drumherum. | Nur auf das Canvas bzw. `[data-spielflaeche]`. `spielpruefen.mjs` S5. |
| **Module unter `file://`** | `<script type="module" src>` lädt beim Doppelklick nicht (CORS). | Für die Vorschau-Datei alles in eine HTML einbetten; `spielpruefen.mjs` startet selbst einen kleinen Server. |
| **Canvas füllt alles, Spiel ist trotzdem klein** | Das Canvas ist bildschirmhoch, aber Tor, Brett oder Ziel nehmen hochkant nur einen Streifen ein (Probelauf Elfmeter). Das Prüfskript misst nur das Element. | Hochkant eigenes Layout: Kamera oder Maßstab nach Hochkant ausrichten, Deko kürzen. Mit `window.game.spielflaeche()` (`{w, h}` in CSS-Pixeln) die eigentliche Fläche melden. Fotos selbst ansehen. |
| **Regelkarte aus `div`s** | Nummerierte Regeln in Kreisen statt `<ol>` sehen wie eine Liste aus. | `spielpruefen.mjs` zählt auch Abzeichen „1, 2, 3“. Besser gar keine Karte. |

## 3. Vorlage: Übergabe
```
🟡 „<Name>“ – <ein Satz, was man tut>. Merk-Satz: <…>
Noch von keinem Menschen gespielt.

Geprüft (gemessen): 0 fremde Anfragen · Hochkant 0,82 der Höhe · Bot: punkten ja, Spielende ja, Neustart 120 ms ·
  60 fps normal / 34 fps 4× gedrosselt (SwiftShader, nur Vergleich) · iframe-Wisch scrollt nicht
Geraten: Spielgefühl, Schwierigkeit nach 2 Minuten, Ton auf echten Lautsprechern, Bildrate auf deinem Handy

30-Sekunden-Test: Gib das Handy jemandem ohne Erklärung. Weiß er nach 5 s, was zu tun ist? Holt er einen Punkt? Will er nochmal?

Stellschrauben (?tune zeigt Schieber):
- Schusskraft 6,5 (3–10): höher = öfter drüber
- Nachsicht 100 ms (0–200): höher = verzeihender
- Torwart-Lernrate 0,3 (0–1): höher = Torwart merkt sich deine Ecke schneller
```
