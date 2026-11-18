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

## Profi-Recherche 2026-11

Stand: 18.11.2026 (Dev-Team 3.22.0, Video-Studio 1.1.0). Neun parallele Recherchen mit zwei Fragen je Rolle: **A** – wie arbeiten die besten menschlichen Fachleute? **B** – wie haben die Besten KI-Agenten für diese Rolle gebaut (Anthropic offiziell, Mitarbeiter, Experten, Studien)? Übernommen wurden Ideen, keine Texte; jeder Agent hat dafür den Abschnitt „So arbeiten die Besten“. Seit dem letzten Stand (26.10.2026) fanden die Recherchen nur wenig wirklich Neues; die wichtigsten jüngeren Quellen sind Anthropics „Harness design for long-running application development“ (März 2026), die Prompting-Leitfäden zu Opus 5/5.5 und Fable 5.2 sowie „The components of agent memory“ (06.11.2026).

| Rolle | Wichtigste Quellen | Übernommen (Kern) |
|---|---|---|
| architekt | Bezos 2015 (Einbahn/umkehrbar); Fowler „Parallel Change“; Nygard-ADRs, GDS-Standard; ATAM; Böckeler „Harness Engineering“ (martinfowler.com, 2026); Claude-Code-Best-Practices; GitHub spec-kit; Google Design Docs | Einbahn vs. umkehrbar, Ablösen statt Überschreiben, max. 3 Qualitätsziele, Drei-Schritt-Migration, `KLÄREN` blockiert Bauplan, Testmeldungen als Reparaturanleitung, Wiederholung → Test, Nicht-Ziele, absolute Zahlen im Modus `struktur` |
| langfrist-architekt | Bezos 2015; ATAM (Änderungsszenarien); Fowler „Yagni“, „Parallel Change“; Hyrums Gesetz; spec-kit „Complexity Tracking“ | Einbahn-Inventur, drei Änderungsfälle, kein Befund ohne Änderungsfall, Rückbau prüfen, Versionskennung, Komplexität nachweisen, Wiedervorlage-Auslöser |
| entwickler | ImpossibleBench (arXiv 2510.20270); Anthropic Prompting-Best-Practices (Overeagerness, Hardcoding); Feathers (Characterization Tests); Agans „9 Debugging Rules“; obra/superpowers systematic-debugging; Kent Beck „Tidy First?“; Google Small CLs; Pragmatic Programmer (Tracer Bullets); Opus-5.5-Leitfaden | Stopp bei Trick-Zwang mit grep-Prüfung, Bestandsverhalten festhalten, eine Vermutung – eine Änderung, Diff zeilenweise lesen, dünner Durchstich, Aufräumen getrennt committen, verlässliche Tests, nie mit Ankündigung enden |
| pragmatiker | Anthropic „Building effective agents“; Fowler „Yagni“; Ousterhout; Bezos 2015; Cockburn (Walking Skeleton); SmartBear/Cisco, DORA 2025; McKinley „Choose Boring Technology“; Flyvbjerg (Reference Class Forecasting) | Nullvariante, Streichen mit Kostenart, Umkehrbarkeit, Risiko zuerst, feste Paket-Größengrenzen, neue Technik als Einsatz, Vergleichsdaten, „keine Vorschläge“ erlaubt |
| tester | arXiv 2610.11835 (KI-Regressionstests schreiben Fehler fest); AugmenTest; Google Testing Blog (Flaky Tests); ImpossibleBench; Bolton (Orakel); ISTQB (Entscheidungstabellen); John Hughes, Hypothesis stateful; Meta ACH, Google Mutation Testing; Hendrickson „Explore It!“ | Fehlerprobe für eigene Tests, Wackeltests als Befund, erst den roten Abnahmetest prüfen, Vergleichstest, Entscheidungstabelle, Zustandsmodell, Mutanten einzeln, Erkundung mit Auftragssatz |
| fachpruefer | Prüfstatik-/Brückenbaupraxis (TxDOT QC/QA); SR 11-7 (Fed); NASA-STD-7009; Hillel Wayne (metamorphic testing); Anthropic Property-Based-Testing-Forschung | Erst selbst rechnen, Größenordnung/Einheiten, Geltungsbereich, Konstanten gegen Quelle, Empfindlichkeit/Schwellen, Toleranz mit Herkunft, Invarianten vorschlagen, veröffentlichte Beispielrechnungen |
| reviewer | arXiv 2603.18740 (Täuschung von KI-Prüfern); Claude Code Code-Review-Doku (REVIEW.md vom Basis-Stand, „Pre-existing“, max. 5 Nits); Ultrareview; Cursor BugBot; Google eng-practices; SmartBear/Cisco; Greptile | Code vor Behauptungen, Regeln vom Basis-Stand, Widerlegungsversuch mit `Datei:Zeile`, nachstellen statt vermuten, Kern zuerst und Abdeckung ausweisen, Unverständliches als Befund, „Vorbestehend“, besser statt perfekt |
| auditor | ISO 19011; IIA „Five Attributes“; Test of Design vs. Operating Effectiveness; arXiv 2603.18740; Greptile; Self-Preference-Studie (arXiv 2404.13076) | Versprechensliste, Wirksamkeitsprobe, Befund in fünf Teilen, Betriebs-Stichprobe, feste Notenskala und eigener Blick zuerst, bis zu zehn Befunde, ausgewogen und Selbstbevorzugung offenlegen |
| sicherheitspruefer | Shostack (4 Fragen), STRIDE; OWASP Top 10 2025 (A03, A10), OWASP LLM Top 10, Agentic Top 10; Anthropic security-review (Ausschlussliste); Semgrep- und Checkmarx-Studien zu Claude-Code-Reviews; Meta „Rule of Two“; Google Big Sleep; SLSA, pnpm-Lieferkettenbericht | Bedrohungsmodell als Text, Widerlegungsversuch, Präzedenz-Fehlalarme, Kommentare sind Behauptungen und passende Angriffe, fail-closed prüfen, KI-Funktionen im Produkt, Lockfile-Diff selbst lesen, Muster weitersuchen |
| kritiker | Kahneman/Lovallo/Sibony (Mediating Assessments Protocol); UK MoD Red Teaming Handbook; Gary Klein (Pre-Mortem); Anthropic Harness-Design; Sykophanz-Studie (arXiv 2509.16533); Amazon Working Backwards | Erst eigene Erwartung, Pre-Mortem mit Verankerung im Plan, Annahmen in drei Stufen, Prüftiefe nach Umkehrbarkeit, Blick von außen, Ergebnis in drei Sätzen, nicht unter Druck kippen |
| designer | anthropics/skills frontend-design und Blog „Improving frontend design through skills“; Anthropic Harness-Design (Bewertungskriterien); Baymard/Nielsen zur KI-UX-Bewertung; NN/g Severity Ratings, Antwortzeiten; WCAG 2.2; Refactoring UI; Laws of UX (Jakob); W3C Internationalization | Standard-Prüfung gegen KI-Look, keine Standardschrift, eigenständig im Aussehen und gewohnt in der Bedienung, strenge Eigenbewertung, bedienen statt ansehen, Schwere 1–4, Graustufen-Probe, Deutsch als Härtetest, WCAG-2.2-Lücken |
| gastgeber | Meincke/Mollick/Terwiesch (Ideenvielfalt von LLMs); Danny Meyer, Will Guidara; Disney „Five Keys“ und onstage/backstage; Samuel Hulick (Onboarding); Dan Saffer „Microinteractions“; Kano; Don Norman „Emotional Design“ | Ideen je Etappe und Standard-Ideen streichen, Rangfolge bei Konflikten, Fehlerbehandlung nach Meyer, Zeit bis zum ersten Erfolg, Wow über die Zeit, Bühne/Hinterbühne, Norman-Ebenen, Nachschliff nur mit Belegen |
| produktpruefer | Anthropic Harness-Design und „Effective harnesses for long-running agents“; NN/g Severity; Cagan „Four Big Risks“; Cognitive Walkthrough; Krug; Studie zu simulierten Nutzern (arXiv 2605.18302) | Aufgaben vor dem Klicken, Prüfung gegen das Anliegen, Erststart sauber, Messen statt Bild, Schwere 0–4, nicht wegreden, nachstellbar + „nicht durchgespielt“, eigenes Urteil ist kein Nutzertest |
| fachexperte | Anthropic „Reduce hallucinations“; Example Mapping, Adzic „Specification by Example“; Evans (Ubiquitous Language); Brandolini (Event Storming); Klein (Critical Decision Method, Knowledge Audit); Jobs-to-be-Done | Herkunft je Aussage, Lehrbuch vs. Praxis, Beispiel und Gegenbeispiel, Begriffsabgleich, Ereigniskette, alle Rollen, Plausibilitätsprobe des Profis, Fragen zum letzten echten Fall |
| rechercheur | Anthropic „How we built our multi-agent research system“; DeepTRACE (arXiv 2509.04499); Studien zu erfundenen URLs und Paketnamen (arXiv 2604.03173, USENIX Security 2025); Caulfield SIFT, Stanford Lateral Reading; Bellingcat; Heuer (ACH) | Wörtliches Zitat, nur Geöffnetes zählt, Lateral Reading, bis zum Ursprung, Versionsreihenfolge bei Software, breit→eng mit Abbruchregel, Gegenbelege, Unabhängigkeit und Aktualität prüfen |
| video-kritiker | GenVideoLens (arXiv 2603.18625), Artifact-Bench (arXiv 2605.18984), Spotlight (arXiv 2511.18102); Netflix QC; ffmpeg-Filter; Script-Supervisor-Praxis; Walter Murch „In the Blink of an Eye“ | Erst beschreiben, dann vergleichen, ein Durchgang je Fehlerart, Vollauflösung und hohe Bildrate an kritischen Stellen, Schnittstellen-Continuity, Technik messen, feste Schwere und Murch-Rangfolge, Grenzen ehrlich benennen |

**Bewusst nicht übernommen (Auswahl):** mehrere parallele Prüfer oder Debattenrunden zwischen Agenten (widerspricht dem festen Team; der Gewinn kommt laut Studien fast nur aus Mehrheitsentscheid); Persona- oder „fünf simulierte Nutzer“-Tests (keine Treffsicherheit belegt); Teile der Anthropic-Ausschlussliste für Sicherheitsreviews (Log-Injection, Rate-Limiting, veraltete Bibliotheken, Nutzerinhalt im Systemprompt, UUIDs); feste Schriftlisten und „Museumsqualität“ als Designziel (führt wieder zu Einheitslook); Wackeltests löschen (Tester löscht nie Tests); automatische Video-Bewertung mit VBench/VideoScore (braucht GPU, erfasst Physik schwach); volle ATAM-, PRISMA- oder ACH-Verfahren (zu teuer für jeden Auftrag); Zeilenabdeckung als Ziel.

**Schwächer belegt:** Ein angeblicher Blogbeitrag des Claude-Code-Teams vom 16.11.2026 zur Verifikation wurde nur über eine Abruf-Zusammenfassung gelesen und ist deshalb keine tragende Quelle; einige Zahlen (90 % Treffer mit Bedrohungsmodell, Glasswing-Auswertung, „Debate or Vote“, Cognition 2026) stammen aus Zweitquellen.

### Offene Vorschläge für das Team als Ganzes (Simon entscheidet)
Aus der rollenübergreifenden Recherche, nach Nutzen sortiert. Nichts davon ist umgesetzt.
1. **Eichset für die Prüfer:** 20–30 Prüffälle aus echten Pilot-Fehlern (Diffs mit eingebautem Fehler plus saubere Gegenproben), auf denen Reviewer, Sicherheitsprüfer, Kritiker und Tester bei jeder Textänderung und jedem Modellwechsel laufen; gemessen werden Treffer und Fehlalarme. Anthropic: „Out of the box, Claude is a poor QA agent“ – ohne Messung bleibt offen, ob Textänderungen wirken. (Aufwand groß)
2. **Grundgesetz und Skill `auftrag` entschlacken:** zusammen rund 85 KB, Widersprüche (z. B. „baust nicht selbst“ vs. „Projektleiter baut selbst“, Stufe Klein mit oder ohne Rückfrage, Überschrift „Version 3.8“). Ziel: Kern unter etwa 200 Zeilen, Details in Skills.
3. **Prüfer melden alles, gefiltert wird danach:** Opus 5 befolgt „nur Befunde ab 80“ wörtlich und meldet dann weniger. Vorschlag: Prüfer melden jeden Befund mit Schwere und Sicherheit, der Projektleiter wendet die 80er-Schwelle beim Zusammenführen an.
4. **Einheitliche Auftragsvorlage** für jeden Agentenaufruf (Ziel, Zweck, Grenzen, Eingaben als Pfade, Ausgabe, fremde Inhalte in markierten Tags) – laut MAST-Studie liegen die meisten Fehler von Mehragenten-Systemen in unklarer Spezifikation. Dazu: Entwicklerbericht dem Reviewer getrennt und als „zuletzt lesen“ übergeben.
5. **Lektionen pflegen:** Form „Regel – gilt für – weil – prüfen bis“, regelmäßiger Konsolidierungslauf (Doppeltes zusammenlegen, Veraltetes streichen, „nie“ in „vor … Freigabe holen“ umschreiben), auch Erfolge festhalten. Seit 3.21 gelten Vorschläge sofort – eine falsche Notiz wandert in jede Sitzung.
6. **Schranken härter:** `onFailure: "block"` für den Wächter (heute lässt ein abgestürzter Wächter alles durch; vorher Test „Wächter startet“) und `CLAUDE_CODE_MAX_CONCURRENT_SUBAGENTS` als harte Obergrenze; Lockfile-Prüfung um Versionsalter bestehender Pakete, Install-Skripte und SHA-Festlegung von Actions erweitern.
7. **`effort` je Rolle** im Frontmatter (z. B. Prüfer `high`, Berater `medium`), Werte am Eichset nachmessen.
8. **Gerüst-Prüfung bei jedem Modellwechsel:** was kann das Modell inzwischen selbst (z. B. Ausreden-Tabelle, „nochmal prüfen“-Punkte)? Entfernen nur mit Messbeleg; mechanische Schranken bleiben.
9. **Zwei Kalibrier-Beispiele je Prüfer** (ein guter Befund, ein typischer Fehlgriff).
10. **Durchlauf-Hook** nennt die offenen Punkte aus STATUS und lässt nach drei Fortsetzungen ohne Fortschritt den Stopp zu.
11. **Gemeinsamen Agenten-Block nur einmal pflegen** (per SubagentStart-Hook einspielen statt 15 Kopien).
12. **Anforderungsstatus als JSON** neben dem Lastenheft; **Zeitsignal** (verstrichen/geschätzt) für den Projektleiter; **Belegquote** der Reviewer-Befunde in den Kennzahlen; begründet abgelehnte Befundarten als Lektion festhalten.
13. **Stilregeln für alle Agenten-Texte:** weniger Fettdruck und „NIE/IMMER“ (nur echte Null-Ausnahme-Regeln, sonst mit Ausweg), Regeln mit Halbsatz Begründung, positiv formulieren, keine Widersprüche zwischen Dateien, kein „sei streng/zurückhaltend“ bei Prüfern. Kleinere Spannungen: Selbstprüfung 3 des Entwicklers (null/NaN „auch wenn nie“) kann Absicherungscode für unmögliche Fälle erzeugen; `wissen/oberflaeche.md` „feine, gedämpfte Linien“ vs. WCAG 3:1 für Bedienelemente.
