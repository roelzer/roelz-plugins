---
name: einrichten
description: Richtet das Dev-Team einmalig auf diesem Rechner ein – verknüpft Grundgesetz und Lessons mit der globalen CLAUDE.md und setzt Schutzregeln für Geheimnisse. Nach der Installation einmal ausführen, auch nach einem Rechner- oder Account-Wechsel.
disable-model-invocation: true
argument-hint: "[privat|arbeit]"
---

# Dev-Team einrichten

Führe die Schritte der Reihe nach aus. Zeige Simon vor jeder Änderung an einer Datei kurz, was du ändern wirst.

## 0. Voraussetzungen prüfen
- **Python 3** muss als `python3`, `python` oder `py` aufrufbar sein (`python --version`). Python brauchen Test-Schranke und Prüfskripte; der Wächter selbst läuft ohne Python.
- **Git** ab Version 2.31 (`git --version`), wegen der Worktrees.

## 1. Modus klären
Modus aus dem Argument (`$ARGUMENTS`) übernehmen; fehlt er, frag:
- **privat** – eigener Rechner. Lektionen werden direkt im Plugin-Repo gespeichert und per Git auf alle Rechner verteilt.
- **arbeit** – Rechner beim Arbeitgeber. Lektionen bleiben lokal auf diesem Rechner, damit nichts aus der Arbeit ins private Repo gelangt.

Plugin-Ordner: `${CLAUDE_PLUGIN_ROOT}`

## 2. Lessons-Pfad festlegen
- **privat:** Mit Gehirn (siehe unten) ist es egal, ob der Plugin-Ordner ein Git-Klon oder eine Kopie im Cache ist (`.claude/plugins/cache`): Lektionen und Fachwissen liegen dann im Gehirn, die Datei im Plugin ist nur Rückfall. **Ohne** Gehirn und bei einer Kopie: Simon erklären, dass neue Lektionen beim nächsten Update verloren gingen, und ihm das Gehirn empfehlen; erst wenn er beides ablehnt, abbrechen.
  Lessons-Pfad = `${CLAUDE_PLUGIN_ROOT}/wissen/lessons.md`
- **arbeit:** Lessons-Pfad = `~/.claude/dev-team/lessons-arbeit.md`. Existiert die Datei nicht, lege sie als Kopie von `${CLAUDE_PLUGIN_ROOT}/wissen/lessons.md` an.

Frag im Modus „privat“ außerdem, ob es schon ein Baukasten-Repo gibt und wo es liegt (optional, siehe Skill `baukasten`).

**Gehirn:** Frag nach dem Ordner von Simons Obsidian-Tresor (lokaler Klon von `roelzer/brain`, erkennbar an `00 Start.md`). Ist er da, kommt er mit `--gehirn <Ordner>` in den Block. Ab dann gilt: Lektionen, Projektstand, Entscheidungen und Fachwissen schreibt das Team über `scripts/gehirn.py` ins Gehirn. Ohne Gehirn läuft alles wie bisher, Wissen sammelt sich dann in `docs/GEHIRN_NACHTRAG.md`.

Verwende im nächsten Schritt den vollständigen, absoluten Pfad mit Schrägstrichen `/`, auch unter Windows.

## 3. Globale CLAUDE.md verknüpfen
**Alter Block aus Version 1/2:** Steht in `~/.claude/CLAUDE.md` schon ein Dev-Team-Abschnitt **ohne** die Marker `<!-- dev-team START -->` / `<!-- dev-team END -->` (z. B. mit `@…/grundgesetz.md` aus einem anderen Ordner), zeig ihn Simon. Er muss weg, sonst gelten zwei Grundgesetze. Simon löscht ihn selbst im Editor oder gibt dir ausdrücklich das OK; dann ersetze ihn durch die Ausgabe des Skripts unten.
`~/.claude/CLAUDE.md` schreibt Claude nicht direkt . Zeige Simon die Änderung mit
`python3 "${CLAUDE_PLUGIN_ROOT}/scripts/claude_md_block.py" --modus <privat|arbeit> --lessons <Lessons-Pfad> [--baukasten <Baukasten-Repo>] [--gehirn <Gehirn-Ordner>]`
und führe nach seinem OK denselben Befehl mit `--schreiben` aus. Das Skript ersetzt nur den Block zwischen `<!-- dev-team START -->` und `<!-- dev-team END -->`; alles andere bleibt. Im Block stehen Modus, Plugin-Ordner, Lessons-Datei, ggf. Baukasten und Gehirn und die Verknüpfungen `@…/grundgesetz.md` und `@<Lessons>`.

## 4. Schutzregeln für Geheimnisse und Worktree-Start
Benutzereinstellungen schreibt Claude nicht direkt. Zeige Simon die Änderung mit
`python3 "${CLAUDE_PLUGIN_ROOT}/scripts/settings_zusammenfuehren.py" --vorlage "${CLAUDE_PLUGIN_ROOT}/vorlagen/benutzer-settings.json" --ziel ~/.claude/settings.json`
(ergänzt Lese-Sperren für Geheimnisse und `worktree.baseRef: head` – neue Entwickler-Worktrees starten damit in **jedem** Projekt vom aktuellen Stand statt von `main`; bestehende Einträge bleiben) und führe nach seinem OK denselben Befehl mit `--schreiben` aus.

## 5. Abschluss
Sag Simon in drei Zeilen:
- was eingerichtet wurde,
- dass er Claude Code einmal neu starten soll (beim ersten Start fragt Claude evtl., ob die verknüpften Dateien geladen werden dürfen → zustimmen),
- dass ein neues Projekt mit `/dev-team:neues-projekt` startet.
