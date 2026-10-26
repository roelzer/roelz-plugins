# Vorbilder: was das Dev-Team von anderen übernommen hat

Stand: 26.10.2026. Für Version 3 wurden die Agenten- und Ablauftexte dieser öffentlichen Projekte gelesen und verglichen. Übernommen wurden **Ideen und Regeln**, nicht Texte: Alles ist neu und auf Deutsch formuliert und an Simons Arbeitsweise angepasst. Wo eine Idee eindeutig von einem Projekt stammt, steht es hier.

| Projekt | Lizenz | Bewertung | Übernommen |
|---|---|---|---|
| [obra/superpowers](https://github.com/obra/superpowers) | MIT, © 2025 Jesse Vincent | **sehr stark**: klare, erprobte Regeln gegen typische KI-Ausreden | siehe unten |
| [bmad-code-org/BMAD-METHOD](https://github.com/bmad-code-org/BMAD-METHOD) | MIT, © 2025 BMad Code, LLC | **stark beim Architekten** | siehe unten |
| [anthropics/claude-code](https://github.com/anthropics/claude-code) (Plugins `feature-dev`, `pr-review-toolkit`, `code-review`) | alle Rechte vorbehalten | gut, aber nur **Ideen** übernommen, kein Text | siehe unten |
| [wshobson/agents](https://github.com/wshobson/agents) (`ship-mate`) | MIT, © 2024 Seth Hobson | brauchbare Ablauf-Agenten; die meisten anderen Agenten sind Fähigkeitslisten | siehe unten |
| [VoltAgent/awesome-claude-code-subagents](https://github.com/VoltAgent/awesome-claude-code-subagents) | MIT, © 2025 VoltAgent | **schwach**: Schlagwortlisten, Kennzahlen ohne Bezug, Verweise auf nicht vorhandene Agenten | nur die Idee „Barrierefreiheit prüfen“ |

## Übernommene Ideen

**Superpowers**
- Feste Statusmeldung des Entwicklers: FERTIG / FERTIG_MIT_BEDENKEN / BLOCKIERT / BRAUCHT_KONTEXT, und „lieber ehrlich abbrechen als schlechte Arbeit abgeben“, mit konkreten Abbruchgründen.
- Testgetrieben ohne Ausnahme: kein Programmcode ohne vorher roten Test; der rote Test muss aus dem richtigen Grund scheitern; besteht er sofort, prüft er nichts Neues.
- Gute Tests: Vorher benennen, welcher Fehler den Test rot machen würde. Erwartete Werte von Hand herleiten, nie mit dem zu prüfenden Code ausrechnen. Echtes Verhalten prüfen, nicht Attrappen.
- Erst Ursache, dann Behebung (systematische Fehlersuche).
- Reviewer: „Glaub dem Bericht nicht“ – Begründungen des Entwicklers sind Behauptungen. Erst Plan-Treue (fehlt / zu viel / missverstanden), dann Qualität. Stärken zuerst nennen. Mängel auch melden, wenn der Plan sie vorschreibt.
- Nachprüfung je Befund: behoben / nicht behoben; „versucht“ zählt nicht als behoben.
- Fix-Schleife mit Obergrenze und danach eine dokumentierte Entscheidung statt endloser Runden; kleine Befunde gesammelt am Ende vorlegen.
- „Entscheiden statt stehen bleiben“ bei umkehrbaren Fragen, jede Entscheidung mit Grund und „was es kostet, wenn sie falsch ist“; im Abschlussbericht vollständig als Liste für Simon.
- Basis-Commit vor jedem Auftrag festhalten, nie `HEAD~1`.
- Bauplan je Paket mit Schnittstellen „nutzt / liefert“ (exakte Namen und Typen), damit unabhängig gebaute Pakete zusammenpassen; Abschnitt „Prüf-Schwerpunkt“ für Eingaben, die keine Anforderung nennt.
- Verifizieren vor jeder Erfolgsmeldung; Warnungen in der Testausgabe sind ein Befund.

**BMAD**
- Architektur als „Rückgrat“: nur festlegen, worin zwei unabhängig gebaute Teile auseinanderlaufen könnten. Jede Festlegung mit „bindet / verhindert / Regel“; Offenes ausdrücklich als „zurückgestellt“.
- Bestehende Projekte: erst den vorhandenen Stil bestätigen, nicht neu erfinden. Neue Projekte: bewährten, verbreiteten Starter empfehlen, Versionen vorher prüfen. „Langweilige Technik“, „erst beim dritten Mal abstrahieren“.
- Die tragenden Entscheidungen (Grundmuster, Technik, große Grenzen) werden dem Menschen mit Alternativen gezeigt, nicht still getroffen.
- Der Betrieb (Umgebungen, Auslieferung, Hosting) darf im Architekturdokument nicht fehlen.
- Keine KI-Arbeitsnotizen oder Auftragsnummern als Kommentare im Code; Kommentare erklären das Warum.

**Anthropic (nur Ideen)**
- Architekt entscheidet klar für einen Weg statt Optionen aufzuzählen; Bauplan mit Datenfluss und Bau-Reihenfolge.
- Sicherheit 0–100 pro Befund, unter 80 nicht melden.
- Eigene Prüffragen für verschluckte Fehler: zu breite catch-Blöcke, „nur loggen und weiter“, Ersatzwerte bei Fehlern, stille Fallbacks, Attrappen im Produktivcode, Wiederholversuche ohne Meldung.
- Testlücken nach Wichtigkeit 1–10 bewerten; Verhalten statt Zeilenabdeckung.

**wshobson/ship-mate**
- Architekt-Eskalation, wenn Schnittstellen nach außen, bestehende Daten, das Sicherheitsmodell betroffen sind oder der Umfang deutlich wächst.
- Tester: feste Standardfälle in jedem Auftrag (leer, Grenzwerte, ungültig, doppelt/gleichzeitig, Rechte, Netzwerkfehler) und Prüfung angrenzender Funktionen.
- „Fertig“ heißt auch: keine TODOs, kein auskommentierter Code, keine Debug-Ausgaben.

## Bewusst nicht übernommen
- Superpowers baut nie parallel („Konflikte“). Wir bauen bei unabhängigen Paketen parallel in getrennten Worktrees, gestützt auf die CAID-Studie (2026): bis etwa 4 parallele Entwickler verbessern das Ergebnis, mehr verschlechtern es; nur echte Trennung (Worktrees) hilft.
- BMAD-Personas mit Namen, Menüs und Begrüßung: für eigenständige Läufe unnötig.
- Prüfer mit mehreren hundert Wörtern Fähigkeitslisten (wshobson, VoltAgent): erhöhen Kosten, nicht Qualität.
