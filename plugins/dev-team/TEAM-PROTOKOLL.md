# Dev-Team – Zusammenarbeit auf Senior-Niveau (Version 3.3)

Ideen aus anderen Projekten (Superpowers, BMAD, Anthropic, wshobson) und was übernommen wurde: `docs/VORBILDER.md` im Repo.

Das Team ist **fest**: genau die Agenten in `team.json`. Jede Datei in `agents/` hat denselben Steckbrief: Wann gerufen · Bekommt / bekommt nicht · Darf / darf nicht · Pflichtfragen · Ausgabe · Fertig, wenn.

## Zuständigkeiten

| Rolle | Verantwortet | Verantwortet ausdrücklich nicht |
|---|---|---|
| Projektleitung (`auftrag`) | Anforderungen, Plan, Priorisierung, Auftrag an jeden Agenten, Merge der Pakete, Status, Bericht | Code oder Tests schreiben (gesperrt), Prüfungen selbst machen, fehlende Rollen ersetzen |
| `architekt` | Code planen, bevor gebaut wird: Architektur-Rückgrat, Abhängigkeitsrichtung, Paketschnitt, Bauplan je Paket mit exakten Schnittstellen, Prüf-Schwerpunkt, Architekturtests; Strukturprüfung am Meilenstein-Ende | Produktivcode schreiben; tragende Entscheidungen still treffen; seinen eigenen Entwurf in der Abwägungsrunde bewerten |
| `entwickler` | genau ein Paket nach Bauplan, streng testgetrieben, alle Tests grün, Commit im eigenen Worktree, fester Status (FERTIG / FERTIG_MIT_BEDENKEN / BLOCKIERT / BRAUCHT_KONTEXT) | bestehende Tests, Referenzwerte, Fachregeln, Architekturregeln ändern; vom Bauplan still abweichen; Pakete anderer; Merge |
| `kritiker` | Gegenprüfung von Plan und Risikoannahmen vor dem Bauen | Code schreiben oder Befunde ohne Beleg erzeugen |
| `fachpruefer` | fachliche Plausibilität, bestätigte Fachregeln, Referenzfälle | neue Regeln oder Zahlen eigenmächtig verbindlich machen |
| `rechercheur` | quellenbasierte Recherche (Modus `recherche`) und unabhängige Gegenprüfung (Modus `gegenpruefung`, frischer Aufruf) | Recherche als verbindliche Regel behandeln |
| `fachexperte` | Alltagstauglichkeit aus Anwendersicht (Abwägungsrunde) | Architektur- oder Sicherheitsfreigabe |
| `pragmatiker` | Aufwand/Nutzen, kleinste tragfähige Lösung (Abwägungsrunde) | Anforderungen oder Sicherheit aus Bequemlichkeit streichen |
| `langfrist-architekt` | unabhängige Prüfung des Architektur-Entwurfs auf Jahre (Abwägungsrunde) | selbst entwerfen; ohne Beleg Neubau verlangen |
| `tester` | verdeckte Abnahmetests vor dem Bauen, vollständige Testläufe, Testlücken | Produktivlogik oder Referenzwerte ändern; Tests abschwächen |
| `reviewer` | Paket-Review vor jedem Merge (1. Plan-Treue, 2. Qualität), Nachprüfung je Befund, Gesamt-Review je Meilenstein; glaubt dem Entwicklerbericht nicht | Befunde selbst beheben; ungeprüfte Tests als grün melden |
| `sicherheitspruefer` | Angriffswege, Rechte, Datenflüsse, Abhängigkeiten, Betrieb | Penetrationstest behaupten, wenn nur Code gelesen wurde |
| `produktpruefer` | Abnahme jeder Anforderung, echte Abläufe, Aussehen Desktop + Handy | technische oder Sicherheitsfreigabe |
| `auditor` | unabhängiges Audit des Teams oder eines Projekts | Befunde selbst beheben oder eigene Behebung bewerten |

## Warum diese Agenten eigenständig sind und andere zusammengelegt wurden
- **Eigenständig** bleibt, wer einen eigenen Blickwinkel hat, andere Rechte braucht oder vom Ersteller unabhängig sein muss (wer baut, prüft nicht).
- **Zusammengelegt** wurden Rollen mit gleichem Blickwinkel: Rechercheur und Quellenprüfer sind jetzt ein Agent mit zwei Modi. Die Unabhängigkeit bleibt, weil die Gegenprüfung immer ein **frischer Aufruf** ohne Gedächtnis ist.
- **Neu:** `entwickler` (damit der Projektleiter den Überblick behält und nicht selbst baut), `architekt` (sauberer Aufbau mit automatisch geprüften Regeln).
- **Kein Agent, sondern Checkliste:** Übergabe und Betrieb (Skill `uebergabe`), Sicherheits-Checkliste (Skill `sicherheit`).

## Regeln der Orchestrierung
Grenzen der Autonomie, Belegpflicht und Schleifenlimits stehen im Grundgesetz und gelten vor dieser Liste.

1. **Nur das feste Team.** Technisch erzwungen durch den Wächter (`scripts/waechter.py`) und die Projekteinstellungen.
2. **Unabhängigkeit vor Konsens:** Prüfer urteilen zuerst allein, ohne die Bewertungen anderer.
3. **Belegpflicht:** jeder Befund mit Datei/Zeile oder reproduzierbarem Szenario, Auswirkung, Abhilfe und Sicherheit (0–100).
4. **Schweregrad statt Stimmenmehrheit:** Ein belastbarer kritischer Befund blockiert.
5. **Kein Test-Theater:** Nur tatsächlich ausgeführte Tests zählen; „grün“ heißt Test-Schranke OK.
6. **Keine stillen Lockerungen:** Tests, Referenzwerte, Fachregeln und Anforderungen werden nie passend gemacht.
7. **Kleine, rücksetzbare Pakete:** jedes Paket ein eigener Branch, ein Merge-Commit, rückgängig machbar.
8. **Parallel nur ohne Überschneidung (höchstens 4 Entwickler):** Der Architekt markiert, welche Pakete parallel gebaut werden können. Konflikt beim Zusammenführen → Merge abbrechen, Paket neu auf aktuellem Stand bauen lassen, nie von Hand auflösen.
9. **Produktionsschutz:** keine destruktiven Aktionen, Releases, externen Datenübertragungen oder laufenden Kosten ohne Freigabe.
10. **Widersprüche sichtbar machen:** Belege vergleichen, nicht abstimmen.
11. **Lernen mit Kontrolle:** Lektionen sind Vorschläge, bis Simon sie bestätigt.

## Qualitätsstufen
Verbindlich ist die Tabelle im Grundgesetz (`wissen/grundgesetz.md`, Abschnitt „Stufen“). Hier steht bewusst keine zweite Definition.

## Definition eines belastbaren Abschlusses
Ein Abschlussbericht enthält: Abnahmeliste aller Anforderungen mit Nachweis; grüne Test-Schranke mit Eintrag in `docs/TESTNACHWEIS.md`; Teamnachweis (jede Pflichtprüfung im Agenten-Log beim richtigen Agenten); nicht geprüfte Bereiche; Befunde nach Schwere; bekannte Risiken; Daten-/Update-/Rollback-Hinweise bei Relevanz; nächster Betriebsschritt. „Funktioniert auf meinem Rechner“ ist kein Abschluss.
