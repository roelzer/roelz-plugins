---
name: neues-projekt
description: Legt ein neues Projekt mit sauberer Struktur an – Ordner, Projekt-CLAUDE.md, Lastenheft, Risiko-Log, .gitignore und Git. Für jeden neuen Kunden- oder Eigenprojekt-Start. Für ein bestehendes Projekt stattdessen `/dev-team:projekt-aufnehmen`.
disable-model-invocation: true
argument-hint: "[Projektname]"
---

# Neues Projekt anlegen

Projektname: `$ARGUMENTS` (fehlt er, frag danach). Ordnername: Kleinbuchstaben mit Bindestrichen.

## Grundregel
**Ein Kunde = ein eigenes Repo.** Niemals Code oder Daten mehrerer Kunden in einem Ordner. Prüfe, dass du nicht in einem bestehenden Projekt- oder Kundenordner stehst. Wenn doch: Simon fragen, wo das Projekt hin soll.

## Schritte
Ordner und leere Unterordner legst du mit `mkdir -p` an; Dateien aus Vorlagen mit dem Write-Werkzeug (Code und Tests schreibst du nicht – die kommen später vom Entwickler und Tester).

1. Ordner anlegen mit:
   ```
   <projekt>/
     CLAUDE.md          ← aus ${CLAUDE_PLUGIN_ROOT}/vorlagen/projekt-CLAUDE.md
     .gitignore         ← aus ${CLAUDE_PLUGIN_ROOT}/vorlagen/gitignore.txt
     .env.example       ← leer, mit Kommentar „Hier nur Variablennamen, keine echten Werte“
     .worktreeinclude   ← eine Zeile `.env` (damit Entwickler-Worktrees lokale Einstellungen bekommen)
     .claude/
       settings.json    ← aus ${CLAUDE_PLUGIN_ROOT}/vorlagen/projekt-settings.json (Teamzwang, Worktrees, Dev-Team auch in Cloud-Sitzungen)
       dev-team.json    ← aus ${CLAUDE_PLUGIN_ROOT}/vorlagen/dev-team.json (Profil, Setup-, Test- und Zusatzbefehle – mit Simon ausfüllen)
       dev-team-start.sh ← aus ${CLAUDE_PLUGIN_ROOT}/vorlagen/projekt-dev-team-start.sh (holt das Dev-Team in Cloud-Sitzungen, tut lokal nichts)
     docs/
       lastenheft.md    ← aus ${CLAUDE_PLUGIN_ROOT}/vorlagen/lastenheft.md
       risiko-log.md    ← aus ${CLAUDE_PLUGIN_ROOT}/vorlagen/risiko-log.md
       plan.md          ← aus ${CLAUDE_PLUGIN_ROOT}/vorlagen/plan.md
       ARCHITEKTUR.md   ← legt der Agent `architekt` beim ersten Auftrag an (Vorlage ${CLAUDE_PLUGIN_ROOT}/vorlagen/architektur.md)
       STATUS.md        ← aus ${CLAUDE_PLUGIN_ROOT}/vorlagen/status.md
       OFFENE_FRAGEN.md ← aus ${CLAUDE_PLUGIN_ROOT}/vorlagen/offene-fragen.md
       LEKTIONEN_VORSCHLAEGE.md ← leer, Überschrift „Lektionsvorschläge“
     fachwissen/        ← nur bei Projekten mit fachlichen Ergebnissen (Berechnung, Dimensionierung …)
       regeln.md        ← aus ${CLAUDE_PLUGIN_ROOT}/vorlagen/fachregeln.md
       quellen/         ← eigene Unterlagen (Handbücher, Datenblätter, Tabellen)
       recherche/
     src/
     tests/
       referenz/        ← nur bei fachlichen Ergebnissen: echte Fälle mit bekanntem Ergebnis (Werte ändert nur Simon)
       abnahme/         ← Abnahmetests (nur der Tester)
       architektur/     ← Architekturtests (nur der Architekt)
   ```
2. Profil (`web` oder `fachsoftware`) mit Simon festlegen und in `.claude/dev-team.json` eintragen; Setup-, Test- und Zusatzbefehle erst eintragen, wenn die Technik entschieden ist – bis dahin wird nicht gebaut. Projektname in CLAUDE.md und Lastenheft eintragen. Fachgebiet erfragen und eintragen. Gibt es dazu eine Datei in `${CLAUDE_PLUGIN_ROOT}/wissen/fachwissen/`, übernimm deren bestätigte Regeln in `fachwissen/regeln.md` (Quelle: „aus Bibliothek“).
3. Liegt ein Lastenheft aus dem Erstgespräch vor (falls Simon eines mitbringt), übernimm es nach `docs/lastenheft.md`.
4. `git init` und ersten Commit „Projekt angelegt“ erstellen.
5. Kurz mitteilen: Projekt steht. Nächster Schritt: Lastenheft prüfen, dann Lösungsweg mit dem Skill `loesungsweg` klären oder direkt `/dev-team:auftrag`.

Den Technik-Teil der CLAUDE.md erst ausfüllen, wenn der Lösungsweg entschieden ist.
