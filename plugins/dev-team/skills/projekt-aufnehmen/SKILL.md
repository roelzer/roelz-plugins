---
name: projekt-aufnehmen
description: Nimmt ein bestehendes Projekt ins Dev-Team auf – ergänzt fehlende Struktur (docs, Fachregeln, Referenzfälle, Status), führt eine vorhandene CLAUDE.md mit der Vorlage zusammen und erstellt eine ehrliche Bestandsaufnahme mit Ampel. Für Projekte, die schon Code haben.
disable-model-invocation: true
---

# Bestehendes Projekt aufnehmen

Du stehst im Hauptordner eines bestehenden Projekts. Prüfe zuerst mit `git status`, dass es ein Git-Repo ist und keine ungesicherten Änderungen hat. Sonst: Simon fragen.

## 1. Bestandsaufnahme (nur lesen)
- Aufbau: Ordner, Sprache, wie startet man es, wie laufen die Tests?
- Wo liegt das Datenmodell, wo die Berechnung, ist sie von Oberfläche und Dateiformaten getrennt?
- Gibt es Tests, Referenzfälle, Plausibilitätsprüfungen?
- Gibt es schon eine `CLAUDE.md`? Welche Regeln stehen drin?

## 2. Struktur ergänzen
Nur anlegen, was fehlt. **Nichts Bestehendes überschreiben oder löschen.**
```
docs/
  lastenheft.md      ← aus ${CLAUDE_PLUGIN_ROOT}/vorlagen/lastenheft.md, mit dem befüllt, was aus Code und CLAUDE.md erkennbar ist (als „rekonstruiert, bitte prüfen“ markieren)
  risiko-log.md      ← aus ${CLAUDE_PLUGIN_ROOT}/vorlagen/risiko-log.md
  plan.md            ← aus ${CLAUDE_PLUGIN_ROOT}/vorlagen/plan.md
  STATUS.md          ← aus ${CLAUDE_PLUGIN_ROOT}/vorlagen/status.md
  OFFENE_FRAGEN.md   ← aus ${CLAUDE_PLUGIN_ROOT}/vorlagen/offene-fragen.md
  LEKTIONEN_VORSCHLAEGE.md ← leer, Überschrift „Lektionsvorschläge“
fachwissen/          ← bei fachlichen Ergebnissen
  regeln.md          ← aus ${CLAUDE_PLUGIN_ROOT}/vorlagen/fachregeln.md; Regeln aus der bestehenden CLAUDE.md übernehmen
  quellen/
  recherche/
tests/referenz/      ← bei fachlichen Ergebnissen
```

Gibt es zum Fachgebiet eine Datei in `${CLAUDE_PLUGIN_ROOT}/wissen/fachwissen/`: deren bestätigte Regeln in `fachwissen/regeln.md` übernehmen (Quelle: „aus Bibliothek“).

## 3. CLAUDE.md zusammenführen
- Gibt es schon eine: Alle bestehenden Regeln und Entscheidungen bleiben erhalten. Ergänze nur fehlende Abschnitte aus `${CLAUDE_PLUGIN_ROOT}/vorlagen/projekt-CLAUDE.md` (Fachgebiet, Technik, Wichtige Dateien).
- Gibt es keine: aus der Vorlage anlegen.
- Zeige Simon die Änderung, bevor du speicherst.

## 4. Commit
Ein Commit „Projekt ins Dev-Team aufgenommen“.

## 5. Bericht an Simon
- **Ampel** zum Ist-Zustand.
- So ist das Projekt aufgebaut (5–10 Zeilen, einfache Sprache).
- Die größten Risiken (höchstens 5), besonders: Berechnungen ohne Tests, fehlende Referenzfälle, fehlende Fachregeln.
- Was Simon liefern sollte (z. B. Referenzfälle mit bekannten Ergebnissen, Unterlagen für `fachwissen/quellen/`, Fachregeln).
- Vorschlag für den ersten Auftrag.
