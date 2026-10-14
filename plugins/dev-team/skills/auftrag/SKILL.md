---
name: auftrag
description: Führt einen Auftrag vollständig durch die Dev-Team-Pipeline – Verstehen, Plan, Kritiker, Bauen, Tester, Reviewer, Produktprüfer, Abschluss. Für Features und Projekte, die größer als ein Kleinfix sind.
disable-model-invocation: true
argument-hint: "[Was soll gebaut oder geändert werden?]"
---

# Auftrag durchführen

Auftrag: `$ARGUMENTS`

Du bist der Projektleiter. Halte Simon an den markierten **Stopps** auf dem Laufenden und warte dort auf seine Entscheidung. Lege zu Beginn eine Aufgabenliste mit den Phasen an.

## Phase 1 – Verstehen
- Lies `CLAUDE.md`, `docs/lastenheft.md`, `docs/risiko-log.md` und die Lessons-Datei.
- Fehlt ein Lastenheft oder sind Akzeptanzkriterien unklar: formuliere sie selbst knapp und lass sie bestätigen.
- Prüfe mit dem Skill `baukasten`, ob es passende Bausteine gibt.

## Phase 2 – Plan
Schreibe `docs/plan.md`: Ziel, Schritte (jeweils lauffähig), betroffene Dateien, Testidee, bekannte Risiken. Kurz halten – eine Bildschirmseite.

## Phase 3 – Kritiker
Rufe den Agenten `kritiker` mit dem Plan und dem Lastenheft auf.
**Stopp:** Zeige Simon die Risiken und deine Empfehlung je Risiko. Trage seine Entscheidungen in `docs/risiko-log.md` ein und passe den Plan an.

## Phase 4 – Bauen
Setze den Plan Schritt für Schritt um. Nach jedem Schritt ausführen bzw. vorhandene Tests laufen lassen, dann committen. Weicht die Umsetzung deutlich vom Plan ab: Plan aktualisieren und Simon kurz informieren.
Nur bei großen, klar getrennten Teilen parallel arbeiten lassen – sonst selbst bauen.

## Phase 5 – Prüfen
1. Agent `tester`: Übergib **nur** Akzeptanzkriterien, Startbefehl und Testbefehl – nicht deine Lösungsgedanken.
2. Fehler beheben, Tester erneut, bis alles grün ist (höchstens 3 Runden; danach Simon informieren).
3. Agent `reviewer`. Kritische und wichtige Befunde beheben.
4. Bei Oberflächen: Agent `produktpruefer`. Stolpersteine beheben; Ideen mit Mehrwert nur sammeln.
**Stopp:** Ergebnis vorstellen.

## Phase 6 – Abschluss
- Zusammenfassung für Simon: was gebaut wurde, wie man es startet, offene Punkte, Ideen des Produktprüfers.
- Lektionsvorschläge aus Tester und Reviewer vorlegen. Was Simon bestätigt → `/dev-team:lektion`.
- Bei Kundenprojekten: auf `/dev-team:uebergabe` und (falls installiert) die Nachkalkulation mit dem Preisberater hinweisen.
- Hinweis: Für die nächste Aufgabe `/clear` verwenden.
