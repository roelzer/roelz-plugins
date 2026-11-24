# Änderungsprotokoll Spiele-Bauer

## 0.1.0 – Einstellung (24.11.2026)
Anlass: Simon: „Ja, so bauen“ zur Stellenausschreibung (`docs/personal/spiele-bauer/stellenausschreibung.md`, §13: 2D und 3D, gemeinsame Bestenlisten einplanbar, aber nur auf sein Ja veröffentlichen).

Der Probelauf ohne Mitarbeiter zeigte drei lauffähige, aber austauschbare Spiele: Regelkarte vor dem Start, geratene Abstimmung, Google-Schrift, ein Mini-Sudoku als eigenes Rätsel, hochkant zu kleines Tor. Bildrate, Einbetten und die ersten 30 Sekunden mit einem Menschen prüfte niemand.
- Skill `bauen` mit drei Stopps: Idee (2–3 Ideen mit erster Minute, Abstand-Satz, Merk-Satz), spielbarer Durchstich am Handy, fertig mit Vorschau-Datei und ehrlicher Übergabe („Noch von keinem Menschen gespielt“, 30-Sekunden-Testauftrag, Stellschrauben).
- Agent `spiele-pruefer`: spielt das Spiel selbst über Playwright, zehn Pflichtfragen, Merk-Urteil, kennt die Begründungen des Bauers nicht.
- Prüfskript `scripts/spielpruefen.mjs` ohne KI und ohne Engine-Bindung: fremde Anfragen, Hochkant-Anteil der Spielfläche, waagrechtes Scrollen, Fotos hochkant und quer, Bildzeit normal und unter 4× CPU-Drosselung (mit Renderer, SwiftShader nur als Vergleich), iframe-Wisch, Regelkarte, `touch-action` auf `html`/`body`, mit `--bot` punkten, Spielende und Neustart unter 1 s.
- Sperre: Veröffentlichen fragt Simon, Ladeverweise auf fremde Server im Spielordner und Grafik oder Musik ohne Lizenz sind gesperrt. Abschluss-Sperre: kein „fertig“ ohne Prüfung.
- Wissen: `handwerk.md` (17 Regeln mit Quelle, Fallen, Übergabe-Vorlage), `technik.md` (Werkzeugstand mit Versionen, Lizenzen und gzip-Größen).
- 17 Testfälle aus §10 der Ausschreibung, Eichung des Prüfskripts an den drei Probelauf-Spielen (`tests/werkzeug/vorlagen/`).
- Ehrlich: Beim Elfmeter füllt das Canvas den ganzen Bildschirm, das Prüfskript misst deshalb 1,0, obwohl das Tor hochkant klein ist. Das bleibt Aufgabe von Fotos und Prüfer und steht als erwarteter Fehlschlag im Test.

Ideen aus Claude-Code-Game-Studios, godogen, game-creator, threejs-game-skills, awesome-gamedev-agent-skills; nur eigene Formulierung, kein fremder Code.
