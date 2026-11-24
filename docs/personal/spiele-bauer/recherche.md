# Spiele-Bauer – Profi-Recherche (24.11.2026)

Drei Recherche-Agenten mit `plugins/personal/vorlagen/recherche-auftrag.md` und der Fehlerliste aus `probelauf.md`:
- **A:** menschliche Fachleute, 16 Quellen
- **B:** KI-Agenten, Skills, GitHub und Studien
- **Werkzeugstand:** npm-Registry und offizielle Doku, Größen selbst gemessen

Nur geöffnete Quellen, Zitate stehen in den Agentenberichten. Belastbarkeit: hoch, mittel oder niedrig.

## Praktik → gegen welchen Fehler → Quelle → Belastbarkeit

| # | Praktik | Fehler (probelauf.md) | Quelle | Belastb. |
|---|---|---|---|---|
| 1 | **Erste Minute aufschreiben, durch Tun beigebracht**, endet beim ersten Moment, in dem die Idee zündet. Keine Regel-Liste vor dem Start, die erste Berührung ist die erste Spielaktion. | 1 Vorlagen-Einstieg | Miyamoto zu World 1-1 („gradually and naturally understand“); Donchitos/Claude-Code-Game-Studios one-shot-1-card („First minute … taught by doing“) | mittel |
| 2 | **Abstand zum nächsten Spiel:** Satz „Nächstes bekanntes Spiel X, meins unterscheidet sich in Y“. Ohne Y wird die Idee geändert. Dazu Simons Merk-Test aus dem Website-Bauer: Was erzählt man abends davon? | 4 Idee von der Stange | Game-Studios one-shot-2-build („Nothing to say there is a copy“); Anthropic Harness-Design („evidence of custom decisions“); Website-Bauer 1b (Simon, Schreinerei-Test) | mittel |
| 3 | **Stellschrauben-Tabelle:** jeder Abstimmungswert mit Wert, Min, Max und Schritt in einem Konfig-Block. Nachsicht-Fenster wirken zugunsten des Spielers (Coyote-Time etwa 100 ms, Eingabepuffer). Mit `?tune` erscheinen Schieber, damit Simon am Handy nachstellt. | 2 Abstimmung geraten | Celeste Player.cs (`JumpGraceTime = 0.1f`); Thorson („fudged … in the player's favor“); Survey arXiv 2011.09201; Game-Studios („Every tuning value goes in config.js … value, min, max, step“) | hoch |
| 4 | **Hitstop wenige Frames (etwa 50 ms), Juice gestuft (klein/mittel/groß) über einen Aufruf `feedback(stufe)`, abschaltbar.** Mittel ist besser als keins oder extrem. | 2, Lesbarkeit | Celeste (`Freeze(.05f)`); Kao-Studie über Survey („medium and high … outperformed extreme“); awesome-gamedev-agent-skills game-feel | hoch/mittel |
| 5 | **Fester Zeitschritt, fester Zufall:** `?seed=N`, `window.game.step()` und `render_game_to_text()`, damit Bots spielen, ohne Pixel zu raten. | 2, 6 | Game-Studios („Game logic runs on the step“); godogen („?seed=N fixes the RNG“); game-creator (render_game_to_text) | mittel |
| 6 | **Spielbarkeit per Bot beweisen:** Man kann punkten, man kann verlieren, „Nochmal“ startet neu. Bei Wischspielen trifft ein mittlerer Wisch. Der Bot spielt mit menschenähnlichem Rauschen, seine Erfolgsquote je Stufe steht in einer Tabelle. | 2, 6 | game-creator gameplay-invariants; Play2Code („Generating a game is not the same as making one playable“); Roohi u. a. 2107.12061; Xiao/Yang 2410.02829 | mittel |
| 7 | **Design ist eine Hypothese:** Verhalten aufzeichnen (Tode, Rundenzeiten, Orte). Ein Bot ersetzt keinen Menschen, deshalb gibt es immer einen 30-Sekunden-Test mit einem echten Menschen. | 6 | Valve, Ambinder GDC 2009 („Game designs are hypotheses“, „Nothing beats direct gameplay observation“) | hoch |
| 8 | **Prüfer getrennt vom Bauer:** Ein frischer Subagent spielt das Spiel nur über Playwright. | 6, Selbstlob | Anthropic Harness-Design („agents reliably skew positive when grading their own work“) | hoch |
| 9 | **Sofort-Neustart, kurze Runden**, Zeit vom Scheitern bis zur nächsten Eingabe unter 1 s. Gegenposition: Man braucht genug Zeit, den Fehler zu verstehen. | „gleich nochmal“ | Team Meat (Super Meat Boy), zweite Hand | mittel |
| 10 | **Hochkant als eigener Fall:** Fotos vom aktiven Spiel bei 390×844 und 1280×720, Spielfläche hochkant mindestens die halbe Höhe, kein abgeschnittener Text, Treffflächen ≥ 44 px (mindestens 24). | 5 | threejs-game-skills QA („Capture active play … not just the title screen“); WCAG 2.2 Target Size; Hoober (Griff wechselt ständig) | hoch |
| 11 | **Schwaches Gerät simulieren:** Bildzeit im aktiven Spiel mit CPU-Drosselung 4×, WebGL-Renderer prüfen (SwiftShader im Test ist kein echtes Gerät). | 6 | CDP `Emulation.setCPUThrottlingRate`; godogen („Headless Chrome silently falls back to SwiftShader“) | hoch |
| 12 | **Einbetten:** `touch-action: none` nur auf die Spielfläche. Test im iframe auf einer langen Seite, ein Wisch darf die Seite nicht scrollen. Das Spiel geht ohne Vollbild, weil das iPhone kein Fullscreen-API hat. | 6 | MDN touch-action („game surface“); BCD Fullscreen (iPhone nicht) | hoch |
| 13 | **Nichts von fremden Servern:** Schrift, Skript, Ton liegen lokal. Schriften als OFL mit Lizenztext, Ton im Code (ZzFX, jsfxr, plinkfx), Fremdgrafik nur CC0 (Kenney), sonst steht es in CREDITS. | 3 | LG München I 3 O 17493/20 (Google Fonts, IP personenbezogen); OFL-FAQ §2.1/§1.7; kenney.nl/support | hoch |
| 14 | **Ton erst nach der ersten Berührung** (`resume()`), auf iOS zusätzlich `navigator.audioSession.type = "playback"`. | 6 | Chrome Autoplay-Blog; WebKit-Bug 237322 | hoch/mittel |
| 15 | **Erst reines Canvas, Engine nur bei Bedarf:** zuerst Kaplay (67 KB gz), Phaser (312–343 KB) für Szenen, Tilemaps und Physik, three.js (185 KB) nur, wenn 3D die Idee trägt. Godot und Defold nicht für Mini-Spiele (WASM, COOP/COEP, Safari). | Ladezeit | eigene Messung (npm, gzip -9); Godot-Web-Doku | hoch |
| 16 | **Ehrliche Übergabe:** Sie nennt, was geprüft und was geraten ist, und welche Stellschrauben es gibt. Bis Simon gespielt hat, steht dort „Noch von keinem Menschen gespielt“, dazu ein 30-Sekunden-Testauftrag. | Ausreden A/B | Game-Studios Handover („nothing you ran judges whether it is fun“) | mittel |
| 17 | **Schlank bleiben:** Fallen, Prüfskripte und Vorlagen statt Prozess-Bürokratie. | Bauform | godogen README („What's left is simple building blocks“) | mittel |

## Was es schon gibt (GitHub)
| Repo | Sterne | Lizenz | Urteil |
|---|---|---|---|
| Donchitos/Claude-Code-Game-Studios | 40,8k | MIT | Idee übernommen (erste Minute, Abstand zum nächsten Spiel, Stellschrauben, ehrliche Übergabe). 49 Agenten sind zu schwer. |
| htdt/godogen | 7,4k | MIT | Idee übernommen (Fallen, Aufnahme-Rezepte, schlank). Asset-Erzeugung braucht Bezahlschlüssel, abgelehnt. |
| gamedev-skills/awesome-gamedev-agent-skills | 10,7k | Apache-2.0 | Idee übernommen (Juice-Stufen, Barrierefreiheits-Schalter). Viel Unity/Godot. |
| PlayableIntelligence/game-creator | 374 | keine LICENSE-Datei | Idee übernommen (render_game_to_text, Invarianten). Nichts kopieren. |
| majidmanzarpour/threejs-game-skills | 2,9k | MIT | Idee übernommen (QA im aktiven Spiel). Generatoren brauchen Schlüssel. |
| maximilianfeix/plinkfx | 63 | MIT, Klänge CC0 | Kandidat zum Einbetten (Ton im Code, 3,1 kB). Vorher den Code lesen. |
| anthropics/skills | – | Apache-2.0 je Skill | webapp-testing und frontend-design nutzbar, kein Spiele-Skill. |

## Studien
- **WebGameBench** (arXiv 2605.17637, 111 Aufgaben, 12 Agenten): „76.9% usable rate but only a 20.2% excellent rate“. Das deckt sich mit unserem Probelauf: Die Spiele laufen, sind aber nicht richtig gut.
- **Play2Code/PlaytestArena** (arXiv 2605.28258): Wenn ein Agent das Spiel durchspielt, steigt die Erfolgsquote um 14,6 Punkte. Die Prüf-Bots scheitern aber an genauem Timing und kleinen Bedienelementen.

## Offen und unbelegt
- Feste ms-Grenzen für die Reaktionszeit (Zahlen nach Swink nur aus zweiter Hand)
- „Juice it or lose it“ im Original
- Ideenfindung für kleine Spiele: dafür gilt Simons eigene Methode aus dem Website-Bauer (Hauptidee, Merk-Test)
- Größe von Godot- und Defold-Exporten
- Lizenz-FAQ von OpenGameArt (403)
- Vibration-API
