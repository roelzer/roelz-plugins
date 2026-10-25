---
name: einrichten
description: Richtet das Dev-Team einmalig auf diesem Rechner ein – verknüpft Grundgesetz und Lessons mit der globalen CLAUDE.md und setzt Schutzregeln für Geheimnisse. Nach der Installation einmal ausführen, auch nach einem Rechner- oder Account-Wechsel.
disable-model-invocation: true
argument-hint: "[privat|arbeit]"
---

# Dev-Team einrichten

Führe die Schritte der Reihe nach aus. Zeige Simon vor jeder Änderung an einer Datei kurz, was du ändern wirst.

## 0. Voraussetzungen prüfen
- **Python 3** muss als `python3`, `python` oder `py` aufrufbar sein (`python --version`). Ohne Python blockiert der Wächter in Dev-Team-Projekten jede Arbeit – mit Absicht, damit das Team nie ohne Schutz arbeitet. Fehlt es: Simon bitten, Python von python.org zu installieren (Haken bei „Add python.exe to PATH“), dann Claude Code neu starten.
- **Git** ab Version 2.31 (`git --version`), wegen der Worktrees.

## 1. Modus klären
Modus aus dem Argument (`$ARGUMENTS`) übernehmen; fehlt er, frag:
- **privat** – eigener Rechner. Lektionen werden direkt im Plugin-Repo gespeichert und per Git auf alle Rechner verteilt.
- **arbeit** – Rechner beim Arbeitgeber. Lektionen bleiben lokal auf diesem Rechner, damit nichts aus der Arbeit ins private Repo gelangt.

Plugin-Ordner: `${CLAUDE_PLUGIN_ROOT}`

## 2. Lessons-Pfad festlegen
- **privat:** Prüfe, ob der Plugin-Ordner ein lokaler Git-Klon ist (enthält der Pfad `.claude/plugins/cache`, ist es nur eine Kopie). Bei einer Kopie: Simon erklären, dass er das Repo klonen und den Marktplatz aus dem lokalen Ordner hinzufügen soll (siehe ANLEITUNG.md im Repo), sonst gehen Lektionen beim nächsten Update verloren. Danach abbrechen.
  Lessons-Pfad = `${CLAUDE_PLUGIN_ROOT}/wissen/lessons.md`
- **arbeit:** Lessons-Pfad = `~/.claude/dev-team/lessons-arbeit.md`. Existiert die Datei nicht, lege sie als Kopie von `${CLAUDE_PLUGIN_ROOT}/wissen/lessons.md` an.

Frag im Modus „privat“ außerdem, ob es schon ein Baukasten-Repo gibt und wo es liegt (optional, siehe Skill `baukasten`).

Verwende im nächsten Schritt den vollständigen, absoluten Pfad mit Schrägstrichen `/`, auch unter Windows.

## 3. Globale CLAUDE.md verknüpfen
Datei: `~/.claude/CLAUDE.md` (anlegen, falls nicht vorhanden). Existiert schon ein Block zwischen `<!-- dev-team START -->` und `<!-- dev-team END -->`, ersetze nur diesen Block. Alles andere bleibt unverändert.

```
<!-- dev-team START -->
## Dev-Team
Modus: <privat|arbeit>
Plugin-Ordner: <absoluter Plugin-Pfad>
Lessons-Datei: <absoluter Lessons-Pfad>
Baukasten: <absoluter Pfad zum Baukasten-Repo – Zeile weglassen, wenn es noch keinen gibt oder Modus „arbeit“>
@<absoluter Plugin-Pfad>/wissen/grundgesetz.md
@<absoluter Lessons-Pfad>
<!-- dev-team END -->
```

## 4. Schutzregeln für Geheimnisse
In `~/.claude/settings.json` unter `permissions.deny` diese Regeln ergänzen (bestehende Einträge behalten, gültiges JSON sicherstellen):
```
"Read(**/.env)", "Read(**/.env.*)", "Read(**/secrets/**)", "Read(**/*.pem)", "Read(**/*.key)"
```
Zeige Simon das Ergebnis, bevor du speicherst.

## 5. Abschluss
Sag Simon in drei Zeilen:
- was eingerichtet wurde,
- dass er Claude Code einmal neu starten soll (beim ersten Start fragt Claude evtl., ob die verknüpften Dateien geladen werden dürfen → zustimmen),
- dass ein neues Projekt mit `/dev-team:neues-projekt` startet.
