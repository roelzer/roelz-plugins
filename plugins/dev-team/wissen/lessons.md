# Lessons – Dev-Team (allgemein)

> **Rückfall-Datei.** Ist das Gehirn eingerichtet (Zeile „Gehirn:“ im Block dev-team), gilt `05 Lektionen/Dev-Team-Lektionen.md` im Gehirn. Diese Datei nur noch für Rechner ohne Gehirn (z. B. Cloud).

Allgemeine Lektionen, die in jedem Projekt gelten. **Keine Kunden-, Firmen- oder Projektnamen, keine echten Werte.**
Format: eine Zeile pro Lektion – `- [Bereich] Regel. (Anlass in 3–6 Wörtern, Datum)`
Pflege: Bei über 40 Einträgen zusammenfassen; doppelte zusammenlegen; wiederkehrende ins Grundgesetz übernehmen.

## Lektionen
- [Allgemein] Vor dem Bauen prüfen, ob die Lösung schon im Baukasten existiert. (Startregel, 2026-10)
- [Prozess/Effizienz] Entwickler arbeiten vor FERTIG die Selbstprüfung ab (Plan-Treue, Gegenproben, Grenzfälle, Sichtprüfung, Duplikate) – spart je Paket 1–2 Review-Runden. (Pilot-Auswertung, 2026-10-30)
- [Prozess] Änderungen an bestehenden Tests, die ein Bauplan braucht, macht der Tester vorab in einem eigenen Commit – nie im Merge-Commit eines Entwicklerpakets. (Merge-Schranke meldete Tester-Änderung, 2026-10-30)
- [Werkzeuge] Eine Gegenprobe zählt nur, wenn der Leerlauf grün war und der Test an einer Prüfung scheitert, nicht an einem Lade- oder Syntaxfehler. (Schein-„ERKANNT“ ohne node_modules, 2026-10-30)
- [Tests] Grenzwert-Tests mit Gleitkomma (`<=` gegen `<`) treffen die Grenze nur, wenn die Differenz exakt darstellbar ist – Grenzwerte so wählen (z. B. 0,5 statt 0,1). (Pilot M3, 2026-10-30)
- [Werkzeuge] Gegenprobe-Suchtext mit genug Umgebung angeben, damit er genau eine Stelle trifft – sonst wird die erste Fundstelle ersetzt. (Pilot M4, 2026-10-30)
- [Werkzeuge] userEvent unter vi.useFakeTimers() hängt in happy-dom – Tastatur dort mit fireEvent prüfen. (Pilot M4, 2026-10-30)
- [Sichtprüfung] Überlagerungen (Bänder, Hinweise, Menüs) in jeder Ansicht fotografieren, die die Fläche nutzt, am Handy und am Desktop. (Pilot M3, 2026-10-30)
