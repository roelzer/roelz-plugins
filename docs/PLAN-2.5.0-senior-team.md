# Plan Dev-Team 2.5.0 – Senior-Team, das gemeinsam baut

Stand: 2026-10-16 · Stufe **Groß** (betrifft alle Projekte) · Arbeitsbranch `dev-team/senior-team`

## 1. Anforderungen (Simons Worte)

| Nr | Simon | Abnahmekriterium |
|---|---|---|
| A1 | „mach jedem Agenten einen ausführlichen Prompt als Agentenbeschreibung" | Jede Rolle hat einen ausführlichen Prompt mit festen Abschnitten (Wer du bist, Platz im Team, Arbeitsweise, Zusammenarbeit, Grenzen, Fertig wenn, Übergabeformat). Das Prüfskript erzwingt die Abschnitte. |
| A2 | „ein Senior-Team, dass miteinander Projekte gezielt und getestet umsetzen kann" | Es gibt eine Bau-Rolle. Der Ablauf „Auftrag" verteilt das Bauen an Entwickler, die test-first arbeiten; der Tester prüft unabhängig. Ein Probelauf zeigt, dass ein Entwickler eine kleine Aufgabe mit Test umsetzt und ein Tester sie prüft. |
| A3 | „unter sich Aufgaben zuweist" | Im Team-Modus nutzen die Rollen die gemeinsame Aufgabenliste (anlegen, nehmen, abhängig machen, abschließen). Feste Regeln, wer Aufgaben anlegen und wem zuweisen darf. |
| A4 | „sich abspricht" | Jede Rolle weiß, wen sie wann direkt anschreibt (Nachrichten), mit festem Nachrichtenformat. Probelauf zeigt eine echte Nachricht zwischen zwei Rollen. |
| A5 | „ich hab gerade nicht das Gefühl, dass das so läuft" / „sodass das alles zuverlässiger wird" | Ursachen beseitigt (siehe 2). Technische Absicherung statt nur Anweisung, wo möglich: Prüfskript, Werkzeug-Grenzen je Rolle, Skills fest mitgegeben, Probelauf belegt. |
| A6 | „schau dir an, was für Agenten schon erstellt sind … entscheide, was man zusammenfassen kann und dem Agenten Dinge nur als Skill gibt" | Rollen sind zusammengelegt (12 → 7), Prüflisten liegen als Skills vor, die die Rolle beim Start fest bekommt. Kein bisheriger Prüfinhalt geht verloren (Abgleich-Tabelle in 4). |
| A7 | Entscheidung: Teamform „beides, je nach Stufe" | Stufe Groß: echtes Agent-Team. Stufe Normal: einzelne Agenten über den Projektleiter. Jede Rolle funktioniert in beiden Formen. Ohne aktivierte Agent-Teams läuft Groß automatisch im Einzel-Modus weiter. |
| A8 | Entscheidung: „Entwickler-Rollen dazu" | Neue Rolle `entwickler`, mehrfach einsetzbar mit eigenem Dateibereich; Oberflächenarbeit über den Skill `oberflaeche` (siehe 3). |
| A10 | „bau auch ein, dass die Agenten entweder entscheiden, welches Modell für die Aufgabe am besten ist, der Leiter es ihnen sagt, weil er das abwägt, oder gib den Agenten gleich von Anfang an ein Modell, in dem sie arbeiten sollen" | Jede Rolle hat ein festes Grundmodell (Frontmatter). Der Projektleiter wählt je Aufruf nach fester Regel (Tabelle im Skill `teamarbeit`) und sagt Simon in der Ankündigungszeile Modell und Grund. Agenten empfehlen in ihrer Übergabe das Modell für den nächsten Schritt. (Ein Agent kann sein eigenes Modell während der Arbeit technisch nicht wechseln.) |
| A9 | Entscheidung: „im Plugin, für alle Projekte" | Änderung in `roelz-plugins`, Version 2.5.0, Branch + PR; Merge erst nach Simons Freigabe. |

Unverändert gelten: Grundgesetz (Freigaben, Belegpflicht, Ampel, Deutsch, Grenzen der Autonomie), Unabhängigkeit der Prüfer, keine Firmen-/Kundendaten im Plugin.

## 2. Warum es heute nicht läuft (Befund)

1. **Niemand baut außer dem Projektleiter.** Alle 12 Agenten prüfen. Das Team ist ein Einzelkämpfer mit 12 Gutachtern.
2. **Keine Absprache.** Jede Rolle steht für sich, liefert einen Bericht und ist weg. Die Rollen sagen sogar „Du kannst keine anderen Agenten starten" – inzwischen technisch überholt: benannte Agenten können sich per `SendMessage` erreichen, Agent-Teams haben eine gemeinsame Aufgabenliste.
3. **Kurze Checklisten statt Rollen.** 30–40 Zeilen, ohne Arbeitsweise, ohne Übergaben, ohne „fertig wenn".
4. **Überschneidungen.** Kritiker/Pragmatiker/Langfrist-Architekt/Fachexperte bewerten alle „den Plan"; Tester und Produktprüfer prüfen beide Anforderungen; Reviewer und Sicherheitsprüfer beide den Diff; Rechercheur und Quellenprüfer sind eine Kette. Viele Aufrufe, viel Wiederholung, unklare Zuständigkeit.
5. **Wissen nur „bitte lies Datei X".** Ob der Agent es wirklich liest, ist Zufall.

## 3. Neuer Aufbau

### 3.1 Rollen: 12 → 7 (+ Projektleiter = Hauptsitzung)

| Neue Rolle | Modell | Werkzeuge | Bekommt fest (Skills) | Ersetzt |
|---|---|---|---|---|
| `entwickler` (neu) | opus | Read, Grep, Glob, Bash, Write, Edit, SendMessage | teamarbeit, bauen | – (neu); Oberfläche zusätzlich mit Skill `oberflaeche` |
| `architekt` | opus | Read, Grep, Glob, SendMessage | teamarbeit, architektur-pruefen | `pragmatiker` + `langfrist-architekt` |
| `kritiker` | opus | Read, Grep, Glob, Bash (nur lesend), WebSearch, WebFetch, SendMessage | teamarbeit, audit-pruefliste | `kritiker` + `auditor` |
| `fachexperte` | opus | Read, Grep, Glob, Bash, SendMessage | teamarbeit, fachregeln-pruefen | `fachexperte` + `fachpruefer` |
| `rechercheur` | sonnet | Read, Grep, Glob, WebSearch, WebFetch, Write, Edit, SendMessage | teamarbeit, quellen-pruefen | `rechercheur` + `quellenpruefer` (Gegenprüfung = zweite, frische Instanz) |
| `tester` | sonnet | Read, Grep, Glob, Bash, Write, Edit, SendMessage | teamarbeit, testen, abnahme | `tester` + `produktpruefer` (Abnahme = frische Instanz im Modus Abnahme) |
| `reviewer` | opus | Read, Grep, Glob, Bash, SendMessage | teamarbeit, review-pruefliste, sicherheit | `reviewer` + `sicherheitspruefer` |

Begründung: Wer gemeinsam urteilen muss, sitzt in einer Rolle (ein Senior-Architekt wägt „einfach" und „langlebig" selbst ab). **Unabhängigkeit** bleibt dort, wo sie zählt: Wer baut, prüft nicht. Gegenprüfung (Quellen, Abnahme, Sicherheit bei Groß) läuft als **zweite, frische Instanz** derselben Rolle mit anderem Skill-Modus statt als eigene Rolle.

Oberfläche als Skill statt eigener Rolle: weniger Rollen; der Projektleiter gibt einem `entwickler` die Oberfläche als Dateibereich und den Skill `oberflaeche` mit (Browser-Probe mit Playwright, Screenshots).

### 3.2 Skills (Prüflisten und Handwerk), fest mitgegeben

Neu, nur für Agenten (`user-invocable: false`, ohne `disable-model-invocation`, damit Vorladen geht):
- `teamarbeit` – das Team-Handbuch: Rollenliste, Einzel- und Team-Modus, Aufgabenliste, Nachrichtenformat, Dateibereiche, Eskalation, Ampel, Belegpflicht. **Jede Rolle bekommt es.**
- `bauen` – test-first, kleine Schritte, Dateibereich, Commit-Regeln, Übergabe an Tester.
- `oberflaeche` – Oberflächenarbeit mit Browser-Probe.
- `architektur-pruefen` – Prüfliste aus Pragmatiker + Langfrist-Architekt.
- `audit-pruefliste` – Prüfliste aus dem Auditor.
- `fachregeln-pruefen` – Prüfliste aus dem Fachprüfer (Regel → Code → Test).
- `quellen-pruefen` – Prüfliste aus dem Quellenprüfer.
- `testen` – Testebenen aus dem Tester.
- `abnahme` – Abnahmeliste aus dem Produktprüfer.
- `review-pruefliste` – Prüfliste aus dem Reviewer.
Bestehend und weiter genutzt: `sicherheit` (wird vorladbar, bleibt aufrufbar).

**Namensfalle – geklärt per Versuch (2026-10-16):**
- Aufbau: Test-Plugin mit Agent `skills: [merkskill]` und Kennwort im Skill. Der Hauptsitzung war der Skill-Zugriff gesperrt, der Agent hatte nur `Read`. Jede Variante lief 3× mit Sonnet.
- Ergebnis: Ein Plugin-Agent bekommt einen Plugin-Skill mit dem **Namen ohne Präfix** zuverlässig vorgeladen (3/3), mit Präfix ebenso (3/3), auch mit `user-invocable: false` (3/3).
- Gegenprobe: Ein nicht vorhandener Skill wird still übersprungen (2/2 „kein Kennwort").
- Mit Haiku als Agentenmodell schwankte das Ergebnis; Haiku folgt vorgeladenen Inhalten nicht verlässlich.
- **Folge:** Skills ohne Präfix eintragen. Der Cloud-Start schreibt die Namen auf `dev-team-<name>` um. Das Prüfskript erzwingt, dass jeder Name existiert. Haiku nie für Rollen, die vorgeladenen Prüflisten folgen müssen.

### 3.3 Zusammenarbeit

- **Einzel-Modus (Stufe Normal):** Projektleiter startet Rollen einzeln. Rollen bekommen `SendMessage` und dürfen **benannte** Kollegen direkt fragen, z. B. Entwickler fragt Architekt zu einer Schnittstelle. Ergebnis geht an den Projektleiter.
- **Team-Modus (Stufe Groß, `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS=1`):** Projektleiter legt Aufgaben mit Abhängigkeiten an (Bauen → Testen → Review → Abnahme), startet ein Team von höchstens 5 Mitgliedern mit festen Namen (z. B. `entwickler-logik`, `entwickler-oberflaeche`, `tester`, `reviewer`), die sich Aufgaben nehmen und absprechen.
- **Feste Regeln (im Skill `teamarbeit`):**
  - Aufgaben legt der Projektleiter an. Mitglieder dürfen Folgeaufgaben anlegen, nie Abnahmekriterien ändern.
  - Jeder Entwickler hat einen Dateibereich; fremde Dateien nur nach Absprache.
  - Prüfer urteilen erst selbst, dann Austausch.
  - Ein Befund wird nie „wegverhandelt", sondern behoben oder an den Projektleiter eskaliert.
  - Nachrichten haben ein festes Kurzformat (Betreff, Stand, Bitte, Frist/Blockiert?).
  - Fertig nur mit Beleg (Befehl + Ergebnis).
  - Höchstens 3 Rückfrage-Runden zwischen zwei Rollen, dann Projektleiter.
- Freigaben bei Simon bleiben unverändert (Stopp 1–3).

### 3.4 Modellwahl (A10)

Drei Ebenen, in dieser Rangfolge (so wählt auch Claude Code):
1. **Projektleiter gibt vor:** beim Aufruf über den Parameter `model` bzw. im Startauftrag des Teammitglieds.
2. **Grundmodell der Rolle** aus der Tabelle in 3.1.
3. **Empfehlung des Agenten:** steht in seiner Übergabe („nächster Schritt besser mit Opus, weil …"). Der Projektleiter übernimmt sie oder begründet, warum nicht.

Regel für den Projektleiter (Skill `teamarbeit`):

| Aufgabe | Modell |
|---|---|
| Suchen, Prüfläufe ausführen, Formales, Umbenennen | haiku |
| übliche Umsetzung, Recherche, Tests schreiben, Abnahme | sonnet |
| Architektur, Berechnungslogik, Erkennungslogik, Sicherheit, Review bei Groß, unklare Fehler | opus |

Ankündigung an Simon: „→ Entwickler (Sonnet, Routine) baut Paket 3".

### 3.5 Zuverlässigkeit (technisch statt nur „bitte")

- Werkzeuge je Rolle begrenzen, was sie darf: Prüfer ohne Write/Edit; der Tester darf schreiben, laut Regel nur Tests, und der Projektleiter kontrolliert per `git status`.
- Skills fest vorladen statt „lies Datei X".
- Das Prüfskript `pruefe-plugin.sh` erweitern:
  - Pflichtabschnitte je Rolle.
  - Jeder Skill in `skills:` existiert und ist vorladbar (kein `disable-model-invocation`).
  - Keine Verweise auf alte Rollennamen.
  - Agent-Werkzeuge gültig.
- Probelauf (Abschnitt 6) mit echten Agenten.

## 4. Abgleich: kein Prüfinhalt geht verloren

| Bisher | Inhalt wandert nach |
|---|---|
| kritiker (Prüffelder, max. 7 Befunde) | kritiker (Prompt) |
| auditor (Prüfumfang 1–5, Note 1–10) | Skill `audit-pruefliste`; Rolle kritiker im Modus Audit |
| pragmatiker | Skill `architektur-pruefen` Teil „Aufwand/Nutzen" |
| langfrist-architekt | Skill `architektur-pruefen` Teil „Langlebigkeit" |
| fachexperte | fachexperte (Prompt: Praxis) |
| fachpruefer | Skill `fachregeln-pruefen` |
| rechercheur | rechercheur (Prompt) + Skill `recherche` (Ablauf für Projektleiter, bleibt) |
| quellenpruefer | Skill `quellen-pruefen` |
| tester | Skill `testen` + tester (Prompt) |
| produktpruefer | Skill `abnahme`; tester im Modus Abnahme |
| reviewer | Skill `review-pruefliste` + reviewer (Prompt) |
| sicherheitspruefer | Skill `sicherheit` (bestehend) + reviewer im Modus Sicherheit |

## 5. Arbeitspakete

1. Skill `teamarbeit` + `bauen` + `oberflaeche` schreiben.
2. Prüflisten-Skills aus den alten Rollen herauslösen (Inhalt 1:1, nur umgeordnet).
3. Sieben Rollen ausführlich neu schreiben.
4. Alte Rollen entfernen.
5. Verweise anpassen: Grundgesetz, TEAM-PROTOKOLL, `auftrag`, `recherche`, `audit`, `sicherheit`, Vorlagen, Anleitungen.
6. Team-Modus in `auftrag` (Phase 6/7) und Grundgesetz (Grenzen: höchstens 5 Teammitglieder).
7. Vorlage `projekt-settings.json`: Agent-Teams-Schalter. Cloud-Start: Skill-Namen in Kopien umschreiben.
8. `pruefe-plugin.sh` erweitern.
9. Version 2.5.0, CHANGELOG mit Umbenennungstabelle (alte Namen → neue Rolle/Skill).
10. Probelauf (6). Danach Reviewer-Prüfung des Diffs, dann PR an Simon.

## 6. Tests und Belege

- `bash plugins/dev-team/scripts/pruefe-plugin.sh` grün, am alten Stand mit den neuen Prüfungen rot.
- `claude plugin validate --strict`, sofern verfügbar.
- **Probelauf** in einer Wegwerf-Mappe, Plugin vorher installiert:
  - (a) Jede Rolle meldet die fest mitgegebenen Skills (Kennzeichen aus dem Skill zitieren).
  - (b) Ein Entwickler setzt eine kleine Aufgabe mit Test um, ein Tester prüft sie.
  - (c) Eine echte `SendMessage`-Nachricht zwischen zwei Rollen.
  - (d) Team-Modus soweit in dieser Umgebung möglich; was nicht geht, wird als **nicht geprüft** benannt.

## 7. Risiken

- Agent-Teams sind experimentell: Absturz, Kosten, Aufgabenstatus hängt. Abhilfe: nur bei Groß, Einzel-Modus als Rückfall.
- Projekte und Skills, die alte Namen (`fachpruefer`, `sicherheitspruefer` …) nutzen, laufen ins Leere. Abhilfe: Umbenennungstabelle im CHANGELOG, Prüfskript, Projekt-`CLAUDE.md` der aktiven Projekte anpassen (eigener PR je Projekt).
- Weniger Rollen heißt weniger „Augenpaare". Abhilfe: Gegenprüfung als frische zweite Instanz; Sicherheit bei Risiko-Auslösern immer als eigene Reviewer-Instanz.
- Längere Prompts kosten Tokens. Abhilfe: Prüflisten nur als Skill bei der Rolle, die sie braucht.
