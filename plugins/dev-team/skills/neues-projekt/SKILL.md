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
     .gitattributes     ← aus ${CLAUDE_PLUGIN_ROOT}/vorlagen/gitattributes.txt (Windows-Zeilenenden für Skripte)
     .claude/
       settings.json    ← mit dem Skript, siehe Schritt 1b (Teamzwang, Worktrees, Dev-Team auch in Cloud-Sitzungen)
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
       ENTSCHEIDUNGEN.md ← aus ${CLAUDE_PLUGIN_ROOT}/vorlagen/entscheidungen.md
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
1b. **Einstellungen:** `.claude/settings.json` schreibt Claude nicht direkt. Zeige Simon den Inhalt mit
   `python3 "${CLAUDE_PLUGIN_ROOT}/scripts/settings_zusammenfuehren.py" --vorlage "${CLAUDE_PLUGIN_ROOT}/vorlagen/projekt-settings.json" --ziel .claude/settings.json`
   und schreibe nach seinem OK mit demselben Befehl plus `--schreiben`. Die Freigabedatei `.claude/freigaben.md` legt Simon bei Bedarf selbst an (Beispiel: `${CLAUDE_PLUGIN_ROOT}/vorlagen/freigaben-beispiel.md`).
2. Profil (`web` oder `fachsoftware`) mit Simon festlegen und in `.claude/dev-team.json` eintragen; Setup-, Test- und Zusatzbefehle erst eintragen, wenn die Technik entschieden ist – bis dahin wird nicht gebaut. Projektname in CLAUDE.md und Lastenheft eintragen. Fachgebiet erfragen und eintragen. Gibt es dazu eine Datei in `${CLAUDE_PLUGIN_ROOT}/wissen/fachwissen/`, übernimm deren bestätigte Regeln in `fachwissen/regeln.md` (Quelle: „aus Bibliothek“). **Wichtig:** `.claude/dev-team.json` bleibt unversioniert, bis Testbefehl und Zählmuster eingetragen sind; nach dem ersten Commit kann sie nur noch über `scripts/geschuetzt_schreiben.py` mit Simons Freigabe geändert werden. Bei `fachsoftware` gleich `meilensteinbefehle` mit dem Mutationstest des Rechenkerns vorsehen (sobald der Kern feststeht, per Freigabe).
3. Liegt ein Lastenheft aus dem Erstgespräch vor (falls Simon eines mitbringt), übernimm es nach `docs/lastenheft.md`.
4. `git init` und ersten Commit „Projekt angelegt“ erstellen.
4b. **Ins Gehirn:** `python3 "${CLAUDE_PLUGIN_ROOT}/scripts/gehirn.py" projekt --name <Projekt> --status aktiv --stand-datei docs/STATUS.md --fachgebiet <…> --ordner <Projektordner>` (legt `01 Projekte/<Projekt>.md` an und trägt es in die Projektübersicht ein). Gibt es im Gehirn unter `02 Wissen/` eine Notiz zum Fachgebiet, übernimm deren bestätigte Regeln in `fachwissen/regeln.md` (Quelle: „aus Gehirn“) – das Gehirn hat Vorrang vor der Bibliothek im Plugin.
5. Kurz mitteilen: Projekt steht. Nächster Schritt: Lastenheft prüfen, dann Lösungsweg mit dem Skill `loesungsweg` klären oder direkt `/dev-team:auftrag`.

Den Technik-Teil der CLAUDE.md erst ausfüllen, wenn der Lösungsweg entschieden ist.
