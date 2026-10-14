---
name: auftrag
description: Führt einen Auftrag vollständig durch die Dev-Team-Pipeline – Anforderungsliste, ausführlicher Plan, Kritiker, Fachprüfer, Abwägungsrunde, Freigabe, eigenständiges Bauen, Prüfung und Abnahme jeder Anforderung. Für Aufgaben der Stufe Normal und Groß.
disable-model-invocation: true
argument-hint: "[Was soll gebaut oder geändert werden?]"
---

# Auftrag durchführen

Auftrag: `$ARGUMENTS`

Du bist der Projektleiter. Lege zu Beginn eine Aufgabenliste mit den Phasen an. Kündige jeden Agenten-Aufruf mit einer Zeile an („→ Kritiker prüft den Plan“) und melde das Ergebnis mit Ampel („← Kritiker: 🟡 …“). Halte in `docs/STATUS.md` oben fest, welche Phase gerade läuft. An den markierten **Stopps** wartest du auf Simon. Zwischen Freigabe (Phase 6) und Bericht (Phase 9) arbeitest du eigenständig nach den Regeln im Grundgesetz.

## Phase 1 – Verstehen und Anforderungen festhalten
1. Lies `CLAUDE.md`, `docs/lastenheft.md`, `docs/risiko-log.md`, `fachwissen/regeln.md` (falls vorhanden), die Lessons-Datei und die Fachwissen-Bibliothek zum Fachgebiet des Projekts (`<Plugin-Ordner>/wissen/fachwissen/`).
2. Schreibe jede Anforderung aus Simons Auftrag einzeln auf, mit **seinen eigenen Worten** und einem Abnahmekriterium. Nummerierung fortlaufend im Lastenheft (A1, A2 …). Auch Nebensätze zählen.
3. Lege die Stufe fest (Normal/Groß, siehe Grundgesetz) und begründe sie in einem Satz.
4. Prüfe mit dem Skill `baukasten`, ob es passende Bausteine gibt.

**Stopp:** Zeige Simon die Anforderungsliste und die Stufe. Frag: „Fehlt etwas, ist etwas falsch verstanden?“ Erst nach Bestätigung weiter.

## Phase 2 – Ausführlicher Plan
Ist die grundsätzliche Technik noch offen (Web-App, .exe, Excel …), kläre sie vorher mit Simon über den Skill `architekt`.
Schreibe `docs/plan.md` nach der Vorlage `${CLAUDE_PLUGIN_ROOT}/vorlagen/plan.md`. Der Plan muss so genau sein, dass ein anderer Entwickler ihn ohne Rückfragen umsetzen könnte. Jede Anforderung A… muss mindestens einem Arbeitspaket zugeordnet sein; fehlt eine Zuordnung, ist der Plan nicht fertig.

## Phase 3 – Kritiker
Rufe den Agenten `kritiker` mit Plan, Lastenheft und Risiko-Log auf. Arbeite seine Punkte in den Plan ein oder notiere, warum nicht.

## Phase 4 – Fachprüfer
Hat der Auftrag fachliche Folgen (Berechnungen, Dimensionierung, Mengen, Normen): Rufe den Agenten `fachpruefer` mit dem Plan auf. Er prüft betroffene Fachregeln und meldet fehlendes Wissen.
- Meldet er Wissenslücken: Starte für jede Lücke `rechercheur` und danach `quellenpruefer` (siehe Skill `recherche`). Ergebnisse landen als **vorgeschlagen** in `fachwissen/`.
- Plan um die Fachregel-Prüfungen ergänzen, die gebaut oder erweitert werden müssen.
Bei Stufe Normal ohne fachliche Folgen: Phase überspringen und das im Plan vermerken.

## Phase 5 – Abwägungsrunde
- **Stufe Groß:** immer.
- **Stufe Normal:** nur, wenn Kritiker oder Fachprüfer 🟡 oder 🔴 gemeldet haben.

Starte `fachexperte`, `pragmatiker` und `langfrist-architekt` **parallel**. Jeder bekommt Plan, Lastenheft, Kritiker-Bericht und Fachprüfer-Bericht, aber nicht die Urteile der anderen. Fasse danach zusammen:
- Wo sind sich alle einig?
- Wo widersprechen sie sich, und wie würdest du entscheiden?
- Gesamtampel: 🔴, sobald einer 🔴 meldet; 🟢 nur, wenn alle 🟢 melden; sonst 🟡.

## Phase 6 – Freigabe
**Stopp:** Lege Simon vor:
1. Gesamtampel und die wichtigsten Punkte aus Kritiker, Fachprüfer und Abwägungsrunde, in einfacher Sprache.
2. Deine Empfehlung je Punkt (beheben / akzeptieren / später).
3. Neu vorgeschlagene Fachregeln zur Bestätigung.
4. Geschätzte Bauzeit und die Frage: „Freigabe zum eigenständigen Bauen?“

Trage Simons Entscheidungen in `docs/risiko-log.md` ein, bestätigte Regeln in `fachwissen/regeln.md` (Status „bestätigt“), passe den Plan an. Frag bei jeder neu bestätigten Regel, ob sie allgemein fürs Fachgebiet gilt; wenn ja, in die Fachwissen-Bibliothek übernehmen (Regeln im Grundgesetz). Ohne ausdrückliche Freigabe wird nicht gebaut.

## Phase 7 – Eigenständig bauen
Nach den Regeln „Eigenständig bauen“ im Grundgesetz:
- Arbeitspakete der Reihe nach, nach jedem: Tests, Commit, `docs/STATUS.md` aktualisieren (Vorlage `${CLAUDE_PLUGIN_ROOT}/vorlagen/status.md`).
- Fragen → `docs/OFFENE_FRAGEN.md`, weiter mit unabhängigen Paketen.
- Lektionsvorschläge → `docs/LEKTIONEN_VORSCHLAEGE.md`, nie direkt in die gemeinsame Lessons-Datei.
- Neue Fachregel: erst Prüfung bauen, zeigen dass sie am alten Stand rot wird, dann beheben.
- Harte Stopps beachten.

## Phase 8 – Prüfen
1. `tester`: Übergib **nur** Anforderungsliste, Abnahmekriterien, Fachregeln, Start- und Testbefehl, nicht deine Lösungsgedanken. Fehler beheben, erneut testen (höchstens 3 Runden, danach Stopp).
2. `fachpruefer` (bei fachlichen Folgen): prüft Ergebnisse und Plausibilitätsprüfung.
3. `reviewer`: kritische und wichtige Befunde beheben.
4. `produktpruefer`: Abnahme jeder Anforderung einzeln. ❌ ohne triftigen Grund → zurück zu Phase 7.

## Phase 9 – Bericht
**Stopp:** Bericht an Simon, beginnend mit der Ampel:
1. **Abnahmeliste:** A1 ✅ / A2 ❌ (Grund) … vollständig.
2. Was gebaut wurde, wie man es startet, in einfacher Sprache.
3. Stand der Absicherung: Tests, Referenzfälle, Fachregeln, was davon grün ist.
4. Offene Fragen aus `docs/OFFENE_FRAGEN.md`.
5. Ideen des Produktprüfers und Fachregel-Vorschläge. Was Simon bestätigt → `fachwissen/regeln.md`.
6. Alle Lektionsvorschläge aus `docs/LEKTIONEN_VORSCHLAEGE.md` gesammelt, mit Empfehlung. Was Simon bestätigt → `/dev-team:lektion vorschlaege`.
7. Hinweis auf `docs/AGENTEN_LOG.md` für den genauen Ablauf.
8. Bei Kundenprojekten: Hinweis auf `/dev-team:uebergabe`.
Für die nächste Aufgabe `/clear` verwenden.
