---
name: lektion
description: Hält eine Lektion aus einem Fehler fest, damit er nie wieder passiert – an der richtigen Stelle (allgemein, Firma oder Projekt) und mit Regressionstest. Auch zum Aufräumen der Lessons-Datei („aufraeumen“).
disable-model-invocation: true
argument-hint: "[Was ist schiefgelaufen? | aufraeumen]"
---

# Lektion festhalten

Eingabe: `$ARGUMENTS`

## A) Neue Lektion
1. **Formulieren:** eine Regel, die den Fehler künftig verhindert. Aktiv, konkret, eine Zeile. Gut: „Excel-Zellwerte vor dem Rechnen auf leere Zellen prüfen.“ Schlecht: „Besser aufpassen.“
2. **Ort wählen:**
   - *Allgemein* (gilt in jedem Projekt) → Lessons-Datei aus `~/.claude/CLAUDE.md`, Block „dev-team“. **Keine Kunden-, Firmen- oder Projektnamen, keine echten Werte** – sonst umformulieren.
   - *Firma* (Preise, Angebote, Abläufe der eigenen Firma) → `lessons-firma.md` im Plugin „firma“, falls installiert.
   - *Nur dieses Projekt* → Abschnitt „Projekt-Lektionen“ in der Projekt-`CLAUDE.md`.
3. **Doppelt?** Gibt es schon eine ähnliche Lektion: zusammenführen statt neu anlegen. Taucht dasselbe Thema zum zweiten Mal auf: Simon vorschlagen, es ins Grundgesetz zu übernehmen.
4. **Test:** Ist es ein Code-Fehler, stelle sicher, dass ein Test genau diesen Fehler prüft. Fehlt er, schreibe ihn.
5. Simon die Zeile zeigen, nach Bestätigung eintragen.
6. Im Modus „privat“: Simon erinnern, die Änderung im Plugin-Repo zu committen und zu pushen (`git add`, `git commit -m "Lektion: …"`, `git push`) – oder anbieten, das zu tun.

## B) Aufräumen (`aufraeumen`)
- Doppelte und verwandte Lektionen zusammenfassen, veraltete markieren.
- Ziel: höchstens 40 Einträge, jede Zeile kurz.
- Wiederkehrende Themen als Vorschlag fürs Grundgesetz sammeln.
- Änderungen erst nach Simons Bestätigung schreiben.
