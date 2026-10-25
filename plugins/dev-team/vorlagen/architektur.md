# Architektur: [Projektname]

Geführt vom Agenten `architekt`. Nur er ändert diese Datei. Die wichtigsten Regeln sind als automatische Tests in `tests/architektur/` abgesichert.

**Stand:** [Datum] · **Entscheidungen zuletzt geprüft:** [Datum, Modus struktur]

## 1. Überblick
Zwei bis drei Sätze: Woraus besteht das Programm, wie fließen die Daten?

## 2. Module
| Modul / Ordner | Zuständig für (ein Satz) | Darf benutzen |
|---|---|---|
| `src/logik/` | Berechnung und Fachregeln | `src/daten/` |
| `src/daten/` | Datenmodell, Laden/Speichern | – |
| `src/oberflaeche/` | Anzeige und Bedienung | `src/logik/`, `src/daten/` |

## 3. Abhängigkeitsregeln (als Test abgesichert)
- Logik kennt keine Oberfläche, kein Excel, kein AutoCAD, keine Netzwerkaufrufe.
- Keine Kreis-Abhängigkeiten zwischen Modulen.
- [weitere]

## 4. Datenmodell
Genau ein Ort: `[Pfad]`. Einheiten im Namen (`laenge_m`, `leistung_kw`).

## 5. Konventionen
- Fehler: sichtbar machen, mit verständlicher Meldung; nie leere catch-Blöcke, nie still mit Ersatzwerten weiterrechnen.
- Konfiguration: [wo, wie]; Geheimnisse nur in `.env`.
- Logging: ohne Passwörter, Tokens und vertrauliche Inhalte.
- Benennung: [Regeln]

## 6. Öffentliche Schnittstellen
Was andere Teile (und die Abnahmetests) benutzen dürfen: Funktionen, Endpunkte, Seiten.

## 7. Entscheidungen
Format: `Datum – Entscheidung – Grund – verworfene Alternativen`
