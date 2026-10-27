---
name: lektion
description: Hält eine Lektion aus einem Fehler fest, damit er nie wieder passiert – an der richtigen Stelle (allgemein, Firma oder Projekt) und mit Regressionstest. Auch zum Aufräumen der Lessons-Datei („aufraeumen“).
disable-model-invocation: true
argument-hint: "[Was ist schiefgelaufen? | vorschlaege | aufraeumen]"
---

# Lektion festhalten

Eingabe: `$ARGUMENTS`

## A) Neue Lektion
1. **Formulieren:** eine Regel, die den Fehler künftig verhindert. Aktiv, konkret, eine Zeile. Gut: „Excel-Zellwerte vor dem Rechnen auf leere Zellen prüfen.“ Schlecht: „Besser aufpassen.“
2. **Ort wählen:**
   - *Allgemein* (gilt in jedem Projekt) → **ins Gehirn**: `python3 "${CLAUDE_PLUGIN_ROOT}/scripts/gehirn.py" lektion --text "- [Bereich] Regel. (Anlass, Datum)" --bestaetigt`. Das Gehirn ist die Quelle; jede Sitzung und jeder Agent lädt die bestätigten Lektionen von dort. Ohne Gehirn (Skript meldet „nicht eingerichtet“): Lessons-Datei aus `~/.claude/CLAUDE.md` bzw. `docs/GEHIRN_NACHTRAG.md`.
   - *Firma* (Preise, Angebote, Abläufe der eigenen Firma) → ins Gehirn als Wissen: Text nach `docs/gehirn/<thema>.md` schreiben, dann `python3 "${CLAUDE_PLUGIN_ROOT}/scripts/gehirn.py" wissen --titel "<Thema>" --datei <datei>`. Nie ins öffentliche Plugin.
   - *Nur dieses Projekt* → Abschnitt „Projekt-Lektionen“ in der Projekt-`CLAUDE.md`.
3. **Doppelt?** Gibt es schon eine ähnliche Lektion: zusammenführen statt neu anlegen. Taucht dasselbe Thema zum zweiten Mal auf: Simon vorschlagen, es ins Grundgesetz zu übernehmen.
4. **Test:** Ist es ein Code-Fehler, stelle sicher, dass ein Test genau diesen Fehler prüft. Fehlt er, schreibe ihn.
5. Simon die Zeile zeigen, nach Bestätigung eintragen.
6. Das Skript committet und pusht das Gehirn selbst (vorher `git pull`). Meldet es, dass der Push nicht ging, liegt der Commit lokal; Obsidian gleicht ihn beim nächsten Sync ab.

## B) Gesammelte Vorschläge übernehmen (`vorschlaege`)
1. Lies `docs/LEKTIONEN_VORSCHLAEGE.md` im aktuellen Projekt.
2. Zeige Simon alle noch nicht übernommenen Vorschläge als nummerierte Liste, je mit deiner Empfehlung (übernehmen / nur Projekt / verwerfen) und dem vorgeschlagenen Ort.
3. Für jeden bestätigten Vorschlag die Schritte aus A) ausführen.
4. In `docs/LEKTIONEN_VORSCHLAEGE.md` jede Zeile markieren: `✅ übernommen`, `📁 nur Projekt` oder `✗ verworfen`.

## C) Aufräumen (`aufraeumen`)
- Doppelte und verwandte Lektionen zusammenfassen, veraltete markieren.
- Ziel: höchstens 40 Einträge, jede Zeile kurz. Datei: `<Gehirn>/05 Lektionen/Dev-Team-Lektionen.md` (mit Simons OK von Hand bearbeiten, danach im Gehirn `git pull`, commit, push). Nichts löschen ohne Simons Freigabe – Veraltetes markieren.
- Wiederkehrende Themen als Vorschlag fürs Grundgesetz sammeln.
- Änderungen erst nach Simons Bestätigung schreiben.
