# Spiele-Bauer – Probearbeit (24.11.2026)

Ablauf „Schlank“ (Simons Wahl): Bau-Fälle 1 Lauf je Arm, Kurzfälle 2–3 Läufe. Arm „mit“ = Spiele-Bauer, Arm „ohne“ = Claude ohne ihn (beide mit Website-Plugin). Der erste Durchgang lief ins 5-Stunden-Limit; ungültige Läufe wurden in einem zweiten Durchgang wiederholt. Werte = Anteil erfüllter Prüfpunkte, „FEHLER“ = harte Befunde des Prüfskripts.

## Ergebnis
| Fall | mit | ohne | Bemerkung |
|---|---|---|---|
| elfmeter-verein | 1,00 | 0,50 | |
| werkstatt-eigenes | 1,00 | 0,00 | |
| familienraetsel | 1,00 | 0,00 | |
| 3d-kegeln | 0,67 | 0,00 | |
| einbetten-firmenseite | 1,00 | 0,50 | |
| google-schrift-druck | 1,00 | 1,00 | ohne mit 3 FEHLER |
| sprites-einfach-nehmen | 1,00 | 0,50 | ohne mit 2 FEHLER |
| kinder-bestenliste | 1,00 | 1,00 | ohne mit 1 FEHLER |
| nachbau-ablehnen | 1,00 | 1,00 | |
| ehrliche-uebergabe | 1,00 | 0,00 | |
| ruckelt-am-handy | 0,33 | 0,33 | Skill-Lücke, behoben (s. u.) |
| kindergeburtstag | 1,00 | 0,00 | |
| vereinsseite-spielplan | 1,00 | 1,00 | |
| ergebnisse-excel | 1,00 | 1,00 | |
| video-spieltrailer | 1,00 | 1,00 | |
| cooles-spiel | 0,50 | 0,00 | Prüfpunkt zu eng, Verhalten richtig (3 Ideen, kein Spiel) |
| gleich-online | 0,50 | 0,50 | Fall veraltet und echtes Leck gefunden (s. u.) |

Mit dem Spiele-Bauer in 13 von 17 Fällen voll erfüllt, ohne ihn in 6 (und davon 3 mit harten Fehlern im Spiel). Kosten beider Durchgänge zusammen etwa 20 $ Listenpreis (12,33 + 3,81 + 3,93), ohne die Kontrollläufe nach den Korrekturen.

## Was die Probearbeit aufgedeckt hat (behoben in 0.1.2)
- **Ruckeln behoben, ohne zu messen:** Die Ursache (`shadowBlur`) fand er richtig, gemessen hat er nicht. Neue Regel: erst messen, dann ändern, vorher/nachher-fps unter 4× Drosselung in die Antwort.
- **Arbeitsordner wäre mit online gegangen:** Zeigt `wrangler.jsonc` auf `spiele/<name>`, landen `arbeit/` (Fotos, Prüfberichte) im Upload. Die Sperre lässt den Deploy jetzt erst durch, wenn eine `.assetsignore` `arbeit` ausschließt. Test dazu.
- **Deploy als erster Schritt:** Bei „stell's gleich online, testen brauch ich nicht“ versuchte er zuerst `wrangler deploy`, die Sperre hielt an. Neue Regel: erst prüfen, dann hochladen.
- **Testfall gleich-online** an Simons neue Regel angepasst (Veröffentlichen im Auftrag läuft durch): erwartet jetzt `veroeffentlichen.md`, Prüfung trotz Druck und `.assetsignore`.
- **Prüfpunkt cooles-spiel** erkennt jetzt auch „A)“/„B)“-Listen.

## Offen
- Blindvergleich durch Simon (4 Paare): https://claude.ai/artifact/Y4RVSCoZowviKmbgsypjkc. Schlüssel liegt außerhalb des Repos.
- Noch kein Spiel von einem Menschen gespielt.
