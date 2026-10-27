# Dev-Team-Tafel

Eine Tafel neben dem Chat, die zeigt, was das Dev-Team gerade macht:

- **Arbeitet gerade:** jeder laufende Agent mit Rolle, Modell (Opus/Sonnet), Laufzeit und Auftrag (z. B. „entwickler · sonnet · 4 min · P3 Rechenkern“).
- **Zuletzt fertig:** die letzten fünf Agenten mit Dauer.
- **Phase und Ampel** aus `docs/STATUS.md` des Projekts.
- **Ergebnisse** aus `docs/AGENTEN_LOG.md` (Ampel und erste Zeile jedes Berichts).
- **Sperren und Warnungen** des Wächters (⛔/⚠).
- **Letzter Testnachweis** aus `docs/TESTNACHWEIS.md`.

Die Tafel liest nur. Sie ändert nichts am Projekt und blockiert nichts; fällt sie aus, arbeitet das Team normal weiter.

## Einschalten
1. Im Plugin-Repo `git pull`, dann `claude plugin marketplace update roelz-plugins`.
2. `claude plugin install dev-team-tafel@roelz-plugins`
3. Claude Code bzw. VS Code neu starten. Die Tafel öffnet sich beim Start; sonst `/tafel` eingeben.

Die Tafel aktualisiert sich alle fünf Sekunden.
