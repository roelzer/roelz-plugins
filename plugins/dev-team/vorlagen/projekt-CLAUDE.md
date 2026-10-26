# [Projektname]

Gilt nur für dieses Projekt. Allgemeine Regeln stehen im Grundgesetz des Dev-Teams.

## Worum geht es
[Ein bis zwei Sätze: Was macht die Software, für wen.]

## Fachgebiet
[z. B. „Wärmenetzplanung“. Die Agenten fachpruefer, fachexperte und rechercheur richten sich danach.]

## Technik
- Typ: [Web-App / Desktop-App (.exe) / Excel-Add-In / VBA / AutoCAD-LISP / Skript]
- Sprache & Frameworks: [...]
- Starten: `[Befehl]`
- Setup-, Test- und Zusatzbefehle stehen **nur** in `.claude/dev-team.json` (eine Stelle, damit nichts auseinanderläuft).

## Architekturregeln
- Berechnung getrennt von Oberfläche, Import/Export und fremden Programmen.
- Datenmodell an genau einer Stelle.
- Physikalische Größen mit Einheit im Namen oder Kommentar (z. B. `laenge_m`).
- Keine Zahlen ohne Quelle im Code: Stoffwerte, Tabellen und Grenzwerte in eigenen Datendateien.
- [Weitere Projektregeln]

## Wichtige Dateien
- `docs/lastenheft.md` – Anforderungen (A1, A2 …) mit Abnahmekriterien
- `docs/plan.md` – aktueller Plan
- `docs/STATUS.md` – Stand beim eigenständigen Bauen
- `docs/OFFENE_FRAGEN.md` – Fragen an Simon
- `docs/risiko-log.md` – Risiken und Entscheidungen
- `docs/ARCHITEKTUR.md` – Architektur-Rückgrat (nur der Architekt ändert es)
- `docs/ENTSCHEIDUNGEN.md` – Entscheidungen des Projektleiters während eines Auftrags
- `.claude/freigaben.md` – Freigaben, nur von Simon von Hand
- `fachwissen/regeln.md` – Fachregeln, die nie verletzt werden dürfen
- `tests/referenz/` – Referenzfälle mit bekanntem Ergebnis

## Entscheidungslog
Format: `Datum – Entscheidung – Grund`

## Projekt-Lektionen
<!-- Nur was speziell für dieses Projekt gilt. Allgemeines gehört in die Lessons des Dev-Teams. -->
