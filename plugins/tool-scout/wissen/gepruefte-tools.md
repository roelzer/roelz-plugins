# Geprüfte Tools

| Datum | Name / Quelle | Wofür | Empfehlung (installiert / Idee übernommen / abgelehnt) | Risiko | Begründung |
|---|---|---|---|---|---|
| 2026-11-24 | Superpowers (Plugin, empfohlen von Promptgeflüster) | Brainstorming mit Rückfragen, Pläne, TDD, Fehlersuche, Worktrees, Code-Review, „Visual Companion“ (lokale Browser-Vorschau zum Auswählen) | Idee übernommen | gering | Den Ablauf hat das Dev-Team schon (Planprüfung, verdeckte Tests, Worktrees, Reviewer). Die Vorschau zum Anklicken ist eine Idee für Stopp 1 des Website-Bauers, aber localhost ist aus Cloud-Sitzungen nicht erreichbar. Nicht installiert, nur aus einem Video bewertet, Code nicht geprüft. |
| 2026-11-24 | Claude-Mem (Plugin, Promptgeflüster) | dauerhaftes Gedächtnis über Sitzungen | abgelehnt | mittel | Doppelt zum Gehirn (roelzer/brain). Laut Promptgeflüster selbst kostet es viele Tokens, weil es den Verlauf mitschleppt. Nur aus einem Video bewertet. |
| 2026-11-24 | Ralph-Wiggum-Loop (Plugin) bzw. `/loop` | denselben Auftrag immer wieder laufen lassen, bis nichts mehr zu tun ist | abgelehnt | mittel | Der Durchlauf-Wächter des Dev-Teams (Stop-Hook schickt zurück an die Arbeit, bis der Auftrag belegt fertig ist) leistet das gezielt. Ein offener Endlos-Loop („mach Snake immer besser“, 7 Tage) verbrennt Tokens ohne Abnahmekriterium. Nur aus einem Video bewertet. |
| 2026-11-24 | frontend-design (Anthropic) | Gestaltungsregeln gegen KI-Look | Idee übernommen | gering | Steckt schon in `website/wissen/handwerk.md` Abschnitt 3 und im Prüfskript. |
