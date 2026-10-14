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
1. Ordner anlegen mit:
   ```
   <projekt>/
     CLAUDE.md          ← aus ${CLAUDE_PLUGIN_ROOT}/vorlagen/projekt-CLAUDE.md
     .gitignore         ← aus ${CLAUDE_PLUGIN_ROOT}/vorlagen/gitignore.txt
     .env.example       ← leer, mit Kommentar „Hier nur Variablennamen, keine echten Werte“
     docs/
       lastenheft.md    ← aus ${CLAUDE_PLUGIN_ROOT}/vorlagen/lastenheft.md
       risiko-log.md    ← aus ${CLAUDE_PLUGIN_ROOT}/vorlagen/risiko-log.md
       plan.md          ← aus ${CLAUDE_PLUGIN_ROOT}/vorlagen/plan.md
       STATUS.md        ← aus ${CLAUDE_PLUGIN_ROOT}/vorlagen/status.md
       OFFENE_FRAGEN.md ← aus ${CLAUDE_PLUGIN_ROOT}/vorlagen/offene-fragen.md
     fachwissen/        ← nur bei Projekten mit fachlichen Ergebnissen (Berechnung, Dimensionierung …)
       regeln.md        ← aus ${CLAUDE_PLUGIN_ROOT}/vorlagen/fachregeln.md
       quellen/         ← eigene Unterlagen (Handbücher, Datenblätter, Tabellen)
       recherche/
     src/
     tests/
       referenz/        ← nur bei fachlichen Ergebnissen: echte Fälle mit bekanntem Ergebnis
   ```
2. Projektname in CLAUDE.md und Lastenheft eintragen.
3. Liegt ein Lastenheft aus dem Erstgespräch vor (z. B. vom Plugin „firma“), übernimm es nach `docs/lastenheft.md`.
4. `git init` und ersten Commit „Projekt angelegt“ erstellen.
5. Kurz mitteilen: Projekt steht. Nächster Schritt: Lastenheft prüfen, dann Lösungsweg mit dem Skill `architekt` klären oder direkt `/dev-team:auftrag`.

Den Technik-Teil der CLAUDE.md erst ausfüllen, wenn der Lösungsweg entschieden ist.
