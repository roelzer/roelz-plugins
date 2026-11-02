# Dev-Team-Tafel

Eine Tafel neben dem Chat, die zeigt, was das Dev-Team gerade macht – damit der Projektleiter im Durchlauf nichts in den Chat schreiben muss:

- **🔴 Braucht dich** ganz oben, wenn der Lauf angehalten hat (Grund aus `docs/STATUS.md`), und die Zahl offener Fragen an dich (`docs/OFFENE_FRAGEN.md`).
- **Stand-Kasten:** Jetzt / Zuletzt fertig / Als Nächstes / Geschätzt fertig / Fortschritt, und ob der Durchlauf aktiv ist.
- **Statusleiste:** eine Kurzzeile („Dev-Team: 🟢 3 von 5 Paketen“), auch wenn die Tafel zu ist.

- **Arbeitet gerade:** jeder laufende Agent mit Rolle, Modell (Opus/Sonnet), Laufzeit und Auftrag (z. B. „entwickler · sonnet · 4 min · P3 Rechenkern“).
- **Zuletzt fertig:** die letzten fünf Agenten mit Dauer.
- **Phase und Ampel** aus `docs/STATUS.md` des Projekts.
- **Ergebnisse** aus `docs/AGENTEN_LOG.md` (Ampel und erste Zeile jedes Berichts).
- **Sperren und Warnungen** des Wächters (⛔/⚠).
- **Letzter Testnachweis** aus `docs/TESTNACHWEIS.md`.

Die Tafel liest nur. Sie ändert nichts am Projekt und blockiert nichts; fällt sie aus, arbeitet das Team normal weiter.

## Einschalten
1. `claude plugin marketplace update roelz-plugins` (holt die neueste Version von GitHub).
2. `claude plugin install dev-team-tafel@roelz-plugins`
3. Claude Code bzw. VS Code neu starten. Die Tafel öffnet sich beim Start; sonst `/tafel` eingeben.

Die Tafel aktualisiert sich alle fünf Sekunden.
