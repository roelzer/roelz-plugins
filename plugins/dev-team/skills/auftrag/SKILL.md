---
name: auftrag
description: Projektleitungs-Workflow für Softwareaufträge mit dem festen Dev-Team. Anforderungen mit Freigabe, Plan und Baupläne vom Architekten, unabhängige Prüfungen, Abwägungsrunde, verdeckte Abnahmetests, eigenständiges Bauen durch bis zu 3 parallele Entwickler, Paket-Review vor jedem Merge, Fix-Schleife mit Obergrenze, alle Tests grün, Abnahme jeder Anforderung. Feste Stopps bei Simon.
disable-model-invocation: true
argument-hint: "[Was soll gebaut oder geändert werden?]"
---

# Auftrag durchführen – Projektleitung

Auftrag: `$ARGUMENTS`

Du bist der verantwortliche Projektleiter. Du planst, beauftragst, führst zusammen, entscheidest und berichtest. **Du schreibst keinen Code und keine Tests und machst keine Prüfung selbst** – dafür ist das Team da (Regel, keine Sperre). Ein Agentenbericht ist eine Behauptung, keine Wahrheit: Was zählt, sind Belege (Schranke, Diff, Log). Es gelten das Grundgesetz und `TEAM-PROTOKOLL.md`.

## Zu Beginn
- **Als Allererstes, vor jeder anderen Arbeit:** Gibt es `.claude/dev-team.json` mit Testbefehl? Fehlt sie (z. B. Projekt aus Dev-Team 2), sag Simon **sofort** in einem Satz: „Das Projekt ist noch nicht aufgenommen – bitte einmal `/dev-team:projekt-aufnehmen`, sonst meldet die Test-Schranke immer rot und Worktrees starten falsch.“ Und warte darauf. Nicht erst Agenten losschicken und es dann merken.
- Schreibe die installierte Dev-Team-Version (`version` in `${CLAUDE_PLUGIN_ROOT}/team.json`) nach `.dev-team/plugin-version`. Ändert sie sich mitten im Auftrag (automatisches Update), meldet das der Sitzungsstart.
- Lies `docs/STATUS.md`, `docs/ENTSCHEIDUNGEN.md` und `docs/OFFENE_FRAGEN.md`: Läuft schon ein Auftrag (z. B. nach `/clear`), machst du am dokumentierten Schritt weiter, statt Pakete neu zu vergeben.
- Lege eine Aufgabenliste mit den Phasen an. Kündige **jeden** Agenten-Aufruf an („→ Entwickler baut P3“) und melde das Ergebnis mit Ampel („← Entwickler P3: 🟢 FERTIG, 14 Tests grün“). Zwischen den Schritten höchstens eine kurze Zeile – Status, Log und Dateien sind die Aufzeichnung.
- `docs/STATUS.md` (Vorlage `${CLAUDE_PLUGIN_ROOT}/vorlagen/status.md`) zeigt oben die Phase und **jeden laufenden Agenten**.
- Jeder Agent bekommt genau das, was in seinem Steckbrief unter „Bekommt“ steht, und nichts aus „Bekommt nicht“. Prüfer sehen die Urteile anderer erst nach ihrem eigenen. Gib Agenten nie deinen Verlauf, sondern gezielt die Dateien und Angaben.
- Auftrag „nur analysieren“: Phasen 1–4 plus Bericht, ohne Dateien im Projekt zu ändern.

## Stufe bestimmen
Nach der Tabelle und den Risiko-Auslösern im Grundgesetz, nach Risiko, nicht nach Dateizahl. Bei Unsicherheit hochstufen. Sag Simon Stufe und Profil mit einem Satz Begründung; er kann hochstufen.

**Stufe Klein:** Simon bestätigt in einem Satz, was geändert wird → Arbeitsbranch → `entwickler` (ein Paket; Kriterium: ein Test, der den Fehler zeigt) → `reviewer` Modus `paket` → Merge → Schranke → kurzer Bericht mit Testnachweis.

## Phase 1 – Verstehen und Anforderungen festhalten
1. `git status` (fremde Änderungen nie überschreiben), `CLAUDE.md`, `docs/lastenheft.md`, `docs/ARCHITEKTUR.md`, `docs/risiko-log.md`, `fachwissen/regeln.md`, Lessons-Datei, Fachwissen-Bibliothek (mit Gehirn: `<Gehirn>/02 Wissen/` und die Projektnotiz `<Gehirn>/01 Projekte/<Projekt>.md`).
2. **Jede** Anforderung einzeln mit **Simons eigenen Worten**, Nummer (A1, A2 …) und messbarem Abnahmekriterium. Nebensätze zählen. Muss / Soll / Idee trennen. In `docs/lastenheft.md`.
3. Daten, Rollen, Vertrauensgrenzen, externe Dienste, Betrieb, Risiko-Auslöser erfassen.
4. Skill `baukasten`: gibt es passende Bausteine?
5. Fragen nur, wenn die Antwort eine wesentliche Produkt-, Daten-, Kosten- oder Sicherheitsentscheidung ändert.

**Stopp 1 (Normal und Groß):** Anforderungen, Stufe und Profil zeigen. „Fehlt etwas, ist etwas falsch verstanden?“ Erst nach Bestätigung weiter.

## Phase 2 – Plan und Architektur
1. Technik offen (Web-App, .exe, Excel …)? Erst mit dem Skill `loesungsweg` klären.
2. Schreibe `docs/plan.md` nach `${CLAUDE_PLUGIN_ROOT}/vorlagen/plan.md`: Ziel, Anforderungen, Ausgangslage, Absicherung, Risiken, harte Stopps.
3. → `architekt` Modus `entwurf`. Er liefert: tragende Entscheidungen für Simon (mit Alternativen), Rückgrat in `docs/ARCHITEKTUR.md`, Architekturtests, Paketschnitt mit Parallelität, **Bauplan je Paket** (Dateien, Nutzt/Liefert-Schnittstellen, Tests, Randfälle) und den Prüf-Schwerpunkt. Trage Abschnitt 4, 5, die Baupläne und den Prüf-Schwerpunkt in den Plan ein. Laufen die Architekturtests nicht im Testbefehl mit, schlage Simon die Ergänzung der Zusatzbefehle vor (Änderungen an `.claude/dev-team.json` brauchen seine Freigabe).
3b. **Hat das Projekt eine Oberfläche** (Web, Desktop-Fenster, Formulare, Berichte mit Layout, Excel-Menüband und -Dialoge, AutoCAD-Dialoge): → `designer` Modus `entwurf` mit Lastenheft, Zielgruppe/Einsatzort, Plan und Architektur-Entwurf; ohne Design-Vorgabe zusätzlich Modus `vorgabe`. Er legt `docs/DESIGN.md` und `design/` an (Abläufe, Bildschirme mit allen Zuständen für Desktop und Handy, Farben/Schrift/Abstände in `design/tokens.json`). Danach nimmt der `architekt` die Übergabe-Hinweise in die Baupläne auf (welche Bausteine, welche Zustände, Tests dafür). Kritiker und Abwägungsrunde bekommen `docs/DESIGN.md` mit.
3c. **Stufe Groß und das Produkt hat Nutzer** (nicht bei Klein/Normal, nicht bei reinen Hintergrundskripten und Bibliotheken; Simon kann ihn jederzeit mit `/dev-team:wow` oder auf Zuruf dazuholen): → `gastgeber` Modus `ideen` mit Lastenheft (inkl. Gesprächsnotizen), Plan, `docs/DESIGN.md` falls vorhanden, Zielgruppe und Einsatzort. Er liefert „Lücken im Fundament“ (fehlende Grundanforderungen → in den Plan einarbeiten wie einen Kritiker-Befund) und höchstens drei Wow-Vorschläge mit Aufwand und Prüfkriterium. Die Wow-Vorschläge baust du **nicht** in den Plan ein – sie gehen an Simon in Stopp 2. Stufe Klein und Normal: entfällt.
4. Jede Anforderung hat ein Paket mit Bauplan, sonst ist der Plan nicht fertig. **Höchstens 5 Pakete je Meilenstein**; mehr → weitere Meilensteine. Simons Freigabe in Stopp 2 gilt für **alle** Meilensteine des Plans: Zwischen den Meilensteinen wird nicht angehalten, du schreibst den Meilenstein-Bericht in `docs/STATUS.md` und baust weiter. Angehalten wird nur bei Rot nach der Fix-Schleife, bei harten Stopps oder wenn Simon ausdrücklich Stopps je Meilenstein will.
5. **Kein einzelnes Vorab-Paket** (z. B. P1 „Grundgerüst“ allein vor allen anderen), außer wirklich alle anderen Pakete hängen davon ab – dann so klein wie möglich (Ziel: unter 30 Minuten). Gemeinsame Grundlagen lieber in das erste Paket jeder parallelen Gruppe legen.
6. **Bestehende Testkonfiguration** (`vitest.config.*`, `conftest.py` …) ändert nur der `tester`. Verlangt ein Bauplan eine Änderung daran, gibst du sie **vor** der Paketvergabe an den `tester`; der Entwickler bekommt sie dann schon fertig. Neue Testkonfiguration darf der Entwickler selbst anlegen.

## Phase 3 – Unabhängige Planprüfung (parallel, höchstens 3)
- `kritiker`: immer.
- `fachpruefer` Modus `plan`: bei fachlichen Folgen; im Profil `fachsoftware` bei jeder Berechnung.
- `sicherheitspruefer`: **bei Stufe Normal und Groß immer** (Sicherheit ist nie optional); bei Klein nur mit Risiko-Auslöser. Im Profil `web` gilt das ohnehin.
- **Auslöser-Checkliste (Pflicht):** Vor der Planprüfung schreibst du in `docs/plan.md` für **jeden** Risiko-Auslöser aus dem Grundgesetz eine Zeile `ja/nein – Begründung`. Der Kritiker prüft diese Liste gegen Plan und Lastenheft; ein falsches „nein“ ist ein Befund.
- **Fachwissen-Inventur (Profil `fachsoftware`, Pflicht):** Vergleiche die Fachwissen-Bibliothek mit dem, was die Anforderungen berechnen: Welche Regeln sind nur „offen“ oder „vorgeschlagen", welche Grenzwerte fehlen, welche Rechenschritte haben gar keine Regel? Das Ergebnis geht als Liste „Fachwissen-Lücken“ an Simon (Stopp 1/2); Jede Lücke geht **automatisch** an den `rechercheur` (Recherche + frische Gegenprüfung, Skill `recherche`); du wartest nicht auf Simon. Die Ergebnisse schreibst du sofort als **„Vorgeschlagen“** (mit Quelle und Sicherheit) ins Gehirn (`gehirn.py wissen`). Simon bekommt nur eine Bestätigungsliste; erst bestätigte Regeln zählen für Tests und Berechnung. Was Recherche nicht klärt (z. B. interne Grenzwerte), bleibt als Frage an Simon.
- Wissenslücke: `rechercheur` Modus `recherche`, danach ein **frischer** `rechercheur` Modus `gegenpruefung` nur mit der Recherche-Datei (Skill `recherche`). Ergebnisse bleiben Vorschläge.
- Punkte einarbeiten oder begründen, warum nicht (höchstens 2 Überarbeitungen, dann Frage an Simon). Strukturänderung → `architekt` erneut.

## Phase 4 – Abwägungsrunde (Normal und Groß: immer)
- `fachexperte`, `pragmatiker`, `langfrist-architekt` **parallel**, je mit Lastenheft, Plan, `docs/ARCHITEKTUR.md`, Kritiker- und Fachprüfer-Bericht, ohne die Urteile der anderen.
- **Aussprache (einmal):** Gibt es Widersprüche zwischen den dreien, bekommt jeder die beiden anderen Urteile wörtlich (Nachricht an den bereits fertigen Agenten) und antwortet kurz: Position beibehalten oder ändern, mit Grund. Danach nicht noch eine Runde.
- Zusammenfassen: Einigkeit, Widersprüche, deine begründete Empfehlung. Gesamtampel: 🔴 sobald einer 🔴; 🟢 nur wenn alle 🟢; sonst 🟡. Kritische Sicherheits-, Datenintegritäts- oder Fachregel-Befunde werden nicht überstimmt.

## Phase 5 – Freigabe
**Stopp 2:** Simon vorlegen:
1. Gesamtampel und wichtigste Punkte in einfacher Sprache.
2. **Tragende Architekturentscheidungen** mit Alternativen und Empfehlung – Simon entscheidet sie.
3. Deine Empfehlung je Punkt der Prüfer (beheben / akzeptieren / später).
4. Neu vorgeschlagene Fachregeln zur Bestätigung.
5. **Wow-Vorschläge des Gastgebers** (Top 3: was der Nutzer erlebt, Aufwand, Prüfkriterium) mit deiner Empfehlung. Was Simon wählt, wird eine Anforderung mit nächster A-Nummer im Lastenheft (Prüfkriterium = Abnahmekriterium), bekommt Paket und Bauplan vom `architekt` und wird getestet wie alles andere. Nicht Gewähltes → `docs/wow-ideen.md`.
6. Paketliste mit Parallelität, geschätzter Bauzeit, Arbeitsbranch; Frage: „Freigabe zum eigenständigen Bauen?“

Entscheidungen in `docs/risiko-log.md`, bestätigte Regeln in `fachwissen/regeln.md`. Bei jeder neuen Regel fragen, ob sie fürs ganze Fachgebiet gilt. **Ohne ausdrückliche Freigabe wird nicht gebaut.**

## Phase 6 – Verdeckte Abnahmetests
→ `tester` Modus `abnahme-entwurf` mit Anforderungen, Abnahmekriterien, Fachregeln, Prüf-Schwerpunkt und den Schnittstellen (Namen und Typen) aus den Bauplänen – **ohne** Lösungsideen. Ablageort: `.dev-team/verdeckt/` im Hauptordner (nicht im Repo; Entwickler arbeiten in Worktrees, der Wächter sperrt den direkten Zugriff, mit einem eigenen Skript ginge es trotzdem – deshalb zählen die verdeckten Tests als zusätzliche Absicherung, belegt durch Prüfsummen und den blinden Lauf). Prüfe, dass `.dev-team/` in `.gitignore` steht. Jeder Testname (oder ein Kommentar daneben) trägt die Nummer der Anforderung (A3) bzw. Fachregel (F2), die er prüft.
Danach **Prüfsummen festhalten:** `python3 "${CLAUDE_PLUGIN_ROOT}/scripts/abnahme_pruefsummen.py" --schreiben`. Das belegt, dass die Abnahmetests vor dem Bauen fertig waren; jede spätere Änderung macht die Schranke rot.

## Phase 7 – Eigenständig bauen
Nach „Eigenständig bauen“ und „Grenzen der Autonomie“ im Grundgesetz.

0. **Bauen ohne Leerlauf:** Dev-Server und App immer im Hintergrund starten (Bash mit `run_in_background`) und nach dem Prüfen beenden – sonst hängt das Shell-Werkzeug oder der Port ist beim nächsten Start belegt. Simon die App zeigen: Dev-Server starten, im eingebauten Browser öffnen (Vorschau/Bildschirmfoto), Link nennen.
1. **Planungsstand committen:** Plan, `docs/ARCHITEKTUR.md`, Architekturtests, Fachregeln, Lastenheft und `docs/ABNAHME_PRUEFSUMMEN.txt` so, wie sie freigegeben sind, als Commit „Plan freigegeben“ festhalten (die verdeckten Tests liegen in `.dev-team/` und werden nicht committet). Erst dann **Arbeitsbranch** `dev-team/<auftrag>` anlegen. **Meilenstein-Basis** = `git rev-parse HEAD`, in STATUS eintragen. So bekommen alle Entwickler-Worktrees die Architekturtests mit. Prüfe `"worktree": {"baseRef": "head"}` in `.claude/settings.json`.
2. **Pakete verteilen:** die nächste Gruppe aus dem Plan. Pakete, die laut Architekt parallel möglich sind und deren Abhängigkeiten gemergt sind, gehen gleichzeitig an je einen `entwickler` – **höchstens 3 gleichzeitig**; Aufgaben unter etwa einer halben Stunde nicht parallelisieren. Vor jedem Aufruf **Basis-Commit = aktueller HEAD** festhalten (nie `HEAD~1`). Jeder bekommt: Paket, Bauplan, Anforderungen, Basis-Commit, Startpunkt (= Basis), `docs/ARCHITEKTUR.md`, Plugin-Ordner. Alle Aufrufe einer Gruppe in **einer** Antwort starten; dann auf **alle** Ergebnisse warten.
   **Modell wählen (Token sparen, Qualität halten):** Standard ist das Modell im Steckbrief (`team.json` → `modell`). Nur diese Abweichungen:
   - `entwickler`: Standard `sonnet` für Bauplan-Schwierigkeit `einfach` und `mittel`. `model: "opus"` bei `schwer`, ab Fix-Runde 3 und nach einem BLOCKIERT wegen Unklarheit.
   - `tester`: Standard `opus` für verdeckte Abnahmetests; `model: "sonnet"` nur für reines Ausführen und Aufdecken ohne neue Tests.
   - `fachexperte`, `rechercheur`, `produktpruefer`: Standard `sonnet`; `opus` bei Stufe Groß oder Fachsoftware mit Berechnungen.
   - Architekt, Kritiker, Reviewer, Sicherheitsprüfer, Fachprüfer, Langfrist-Architekt, Auditor: immer `opus`, keine Abweichung.
   Das gewählte Modell steht automatisch im Agenten-Log.
3. **Status des Entwicklers auswerten:**
   - **FERTIG:** Branch, vollständiger Commit-Hash, Worktree-Pfad und Schranken-Zeile müssen da sein; im Log darf keine Zeile „Fertigmeldung NICHT belegt“ stehen. Sonst wie BLOCKIERT behandeln.
   - **FERTIG_MIT_BEDENKEN:** Bedenken lesen. Betreffen sie Richtigkeit oder Umfang: vor dem Review klären (Architekt fragen oder Entscheidung treffen). Sonst notieren und weiter zum Review.
   - **BRAUCHT_KONTEXT:** Rückfrage an den `architekt` (bzw. Fachprüfer/Designer) sofort stellen und die Antwort wörtlich zurückgeben, im selben Schritt; fehlende Angaben liefern, denselben Entwickler fortsetzen (Nachricht an ihn) oder neu beauftragen.
   - **BLOCKIERT:** Ist es Kontext → liefern. Ist das Paket zu groß → Architekt teilt es. Ist der Bauplan falsch → Architekt korrigiert. Nie denselben Auftrag unverändert wiederholen.
4. **Paket mit Oberflächenänderung:** vor dem Merge zusätzlich → `designer` Modus `treue` (Screenshots Desktop und Handy bzw. Dialog im Zielprogramm): sieht es gut aus, ist alles sinnvoll angeordnet, stimmen Abstände, Reihenfolge, Zustände? Bei Mängeln liefert er eine neue Anordnung in `docs/DESIGN.md`/`design/`; der Entwickler setzt sie um (zählt zur Fix-Schleife).
4b. **Paket-Review vor dem Merge:** → `reviewer` Modus `paket` mit Bauplan, Anforderungen, `<Basis>..<Commit>`, Worktree-Pfad. Der Reviewer führt die Schranke mit `--rolle entwickler` selbst aus.
5. **Fix-Schleife** bei 🔴 oder kritischen/wichtigen Befunden (kleine Befunde → Liste „zurückgestellt“ in STATUS, nicht in die Schleife):
   - Runde 1–3: denselben Entwickler mit den Befunden **wörtlich** fortsetzen, sonst einen neuen `entwickler` mit Startpunkt = letzter Paket-Commit, Basis-Commit = ursprüngliche Paket-Basis. Danach `reviewer` Modus `nachpruefung` (je Befund behoben / nicht behoben).
   - Runde 4–5: neuer `entwickler` mit allen bisherigen Befunden und dem Satz „Vorgänger haben das N-mal versucht; du übernimmst“.
   - Danach: **Entscheidung** je offenem Befund (siehe „Entscheiden statt stehen bleiben“) – zurückstellen mit Begründung, oder als tragend einstufen und Simon vorlegen. Nie still verwerfen.
6. **Merge:** `git merge --no-ff <branch> -m "P3: …"` (immer `--no-ff`, nur mit grünem Schranken-Nachweis des Entwicklers für den Branch-Kopf; nie auf `main`). **Konflikt:** `git merge --abort`, Paket neu an einen `entwickler` auf dem aktuellen Stand – nie von Hand auflösen.
7. **Nach jedem Merge die Schranke** im Hauptordner: `bash "${CLAUDE_PLUGIN_ROOT}/scripts/pruefe-tests.sh" --basis HEAD^1 --rolle merge` (`HEAD^1` = Stand direkt vor diesem Merge; geprüft wird genau das, was das Paket mitbringt – Änderungen von Tester, Architekt oder dir dazwischen zählen nicht als Entwickler-Verstoß). Die Rolle `merge` prüft mit den Entwickler-Regeln, dass **kein** Entwickler bestehende Tests, Testkonfiguration, Referenzwerte oder Einstellungen geändert hat; deine eigenen Prozessdateien (`docs/STATUS.md` usw.) zählen dabei nicht. Rot → `git reset --keep ORIG_HEAD` (nimmt nur deinen eigenen Merge-Commit zurück; `--hard` ist gesperrt), Befund „Zusammenspiel mit …“ an einen `entwickler`. Grün → **blinder Lauf der verdeckten Tests:** `python3 "${CLAUDE_PLUGIN_ROOT}/scripts/verdeckt_blind.py"`. Er meldet nur grün/rot und betroffene Anforderungsnummern. Rot → dem nächsten Entwickler nur „Anforderung A3 ist im Zusammenspiel noch nicht erfüllt“ geben, **nie** Testnamen oder Werte. Danach Worktree aufräumen: zuerst `python3 "${CLAUDE_PLUGIN_ROOT}/scripts/worktree_vorbereiten.py" --nur-trennen --ordner <pfad>` (löst eine node_modules-Verknüpfung, damit das Aufräumen den Hauptordner nicht berührt), dann `git worktree remove <pfad>` (bei zurückgebliebenen Cache-Dateien `--force`, nur für schon zusammengeführte Worktrees erlaubt) und `git branch -d <branch>`.
   **Pushen** nur, wenn Simon es wollte, und nur `git push origin dev-team/<auftrag>`; nie `main`.
8. STATUS nach jedem Schritt aktualisieren. Lektionsvorschläge der Agenten → `docs/LEKTIONEN_VORSCHLAEGE.md`.
9. **Neue Fachregel:** erst die Prüfung bauen lassen und belegen, dass sie am alten Stand **rot** ist, dann beheben lassen.

### Entscheiden statt stehen bleiben
Ist Simon nicht da, wartet der Lauf nicht auf ihn. Widersprüche, Unklarheiten im Plan, kleine Lücken: Du entscheidest – die Anforderungen sind bindend, der Plan ist ihre Begründung, dein Urteil klärt den Rest. Jede Entscheidung als Zeile in `docs/ENTSCHEIDUNGEN.md`:
`- <Datum> | <was entschieden> | <warum> | <was es kostet, wenn es falsch ist>`
Und weiter.

**Sperrt der Wächter einen Schritt** (⛔, betrifft nur Entwickler/Tester): Grund lesen, nie denselben Aufruf wiederholen. Hilft das nicht: Paket zurückstellen, Zeile in `docs/ENTSCHEIDUNGEN.md` („⛔ … – zurückgestellt, Grund …“), weiter mit dem nächsten unabhängigen Paket, und im Bericht an Simon nennen. Ein ⛔ ist nie ein Grund, den ganzen Lauf anzuhalten. Dasselbe gilt für Agenten: Wer festhängt, meldet BLOCKIERT mit dem Wächter-Text, statt es zehnmal zu versuchen.

**Ausnahmen – hier wird angehalten:** die harten Stopps im Grundgesetz, freigabepflichtige Aktionen, alles Unumkehrbare, Produktfragen, die Simon gehören (→ `docs/OFFENE_FRAGEN.md`, weiter mit unabhängigen Paketen).

## Phase 8 – Prüfen (je Meilenstein)
1. → `tester` Modus `pruefen` (deckt die verdeckten Tests auf, voller Testlauf, Lücken nach Wichtigkeit). Danach `git status`: nur Testdateien neu oder geändert.
2. Parallel (höchstens 3): `fachpruefer` Modus `ergebnis` (bei fachlichen Folgen), `reviewer` Modus `gesamt` (`<Meilenstein-Basis>..HEAD`, mit der Liste zurückgestellter Befunde; prüft auch die Architekturtests und `docs/ARCHITEKTUR.md`). `architekt` Modus `struktur` nur bei Stufe Groß oder wenn der Meilenstein die Struktur geändert hat (neue Bausteine, geänderte Schnittstellen, `docs/ARCHITEKTUR.md` im Diff) oder ein Paketreview Strukturbefunde hatte; sonst entfällt er und du schreibst in den Bericht, warum.
3. `sicherheitspruefer` bei Stufe Normal und Groß immer, bei Klein mit Risiko-Auslöser, und vor jedem größeren Release.
3b. Bei Oberfläche: `designer` Modus `treue` – vergleicht per Screenshot, ob gebaut wurde, was entworfen war.
3c. Stufe Groß mit Nutzern: `gastgeber` Modus `nachschliff` (mit den Berichten von Produktprüfer und Designer, nach dem Produktprüfer) – Vorschläge für den nächsten Auftrag, blockiert nichts.
4. `produktpruefer` zuletzt: jede Anforderung einzeln, Anwendung starten, Screenshots Desktop + Handy bei Web-Oberflächen, Bedienbarkeit nach sieben Punkten.
5. Befunde: **ein** `entwickler` bekommt die vollständige Liste (nicht ein Entwickler pro Befund), danach **eine** `reviewer`-Nachprüfung und die betroffenen Prüfer erneut. Was danach offen ist: Entscheidung oder Simon.
6. Zum Schluss Schranke im Hauptordner mit `--rolle projektleiter --basis <Meilenstein-Basis>`: muss „OK – alles grün“ melden. Sie prüft zusätzlich, dass jede Anforderung und bei Fachsoftware jede bestätigte Fachregel einen Test hat, dass die Abnahmetests den Prüfsummen entsprechen, und führt die `meilensteinbefehle` aus (bei Fachsoftware Pflicht: Mutationstest).
7. **Referenzfälle und `.claude/dev-team.json`** änderst du nicht selbst. Liefert Simon neue Referenzdaten oder will er einen anderen Testbefehl: Er trägt eine Freigabe in `.claude/freigaben.md` ein (Geltung = Zielpfad), dann `python3 "${CLAUDE_PLUGIN_ROOT}/scripts/geschuetzt_schreiben.py" --quelle <datei> --ziel <pfad> --freigabe <stichwort>`.

## Phase 9 – Bericht
**Stopp 3:** Bericht an Simon, beginnend mit der Ampel:
1. **Abnahmeliste** A1 ✅ / A2 ❌ (Grund), vollständig, mit Nachweis.
2. Was gebaut wurde und wie man es startet, in einfacher Sprache.
3. **Testnachweis:** letzte Zeile aus `docs/TESTNACHWEIS.md`; getrennt davon **nicht geprüft** (mit Grund).
4. **Teamnachweis:** Tabelle Pflichtprüfung → Agent → Zeile im `docs/AGENTEN_LOG.md` → Ampel → vollständiger Bericht in `docs/pruefberichte/`. Fehlt eine Pflichtprüfung im Log: „nicht gemacht“. Blockierte Versuche (⛔) und Warnungen (⚠) nennen.
5. **Entscheidungen, die ich für dich getroffen habe:** vollständig aus `docs/ENTSCHEIDUNGEN.md`, je mit „was es kostet, wenn falsch“. Diese Liste ist der einzige Ort, an dem Simon sie sieht – keine darf fehlen.
6. Reviewer-, Architekt- und Sicherheitsurteil, zurückgestellte Befunde, offene Risiken, bekannte Einschränkungen.
7. Daten-, Backup-, Release- und Rollback-Hinweise, falls relevant.
8. Offene Fragen aus `docs/OFFENE_FRAGEN.md`.
9. Ideen des Produktprüfers und des Gastgebers (Nachschliff) und Fachregel-Vorschläge.
10. Lektionsvorschläge mit Empfehlung (bestätigt → `/dev-team:lektion vorschlaege`).
11. Merge nach `main` nur nach Simons Freigabe; bei Kundenprojekten `/dev-team:uebergabe`.
12. **Ins Gehirn schreiben** (vor dem Bericht, ohne Nachfrage – das ist Teil von „fertig“):
    - Projektstand: `python3 "${CLAUDE_PLUGIN_ROOT}/scripts/gehirn.py" projekt --name <Projekt> --status <aktiv|fertig|ruhend> --stand-datei docs/STATUS.md --fachgebiet <…> --ordner <Projektordner>`.
    - Lektionsvorschläge der Agenten: je `python3 "${CLAUDE_PLUGIN_ROOT}/scripts/gehirn.py" lektion --text "- [Bereich] Regel. (Anlass, Datum)" --projekt <Projekt>` (landen unter „Vorgeschlagen“; bestätigt werden sie erst über `/dev-team:lektion vorschlaege`).
    - Entscheidungen, die Simon in diesem Auftrag **selbst** getroffen hat: je `python3 "${CLAUDE_PLUGIN_ROOT}/scripts/gehirn.py" entscheidung --text "…" --grund "…" --betrifft <Projekt>`. Deine eigenen Entscheidungen aus `docs/ENTSCHEIDUNGEN.md` erst nach Simons OK.
    - Meldet das Skript „nicht eingerichtet“ (z. B. Cloud): dieselben Inhalte in `docs/GEHIRN_NACHTRAG.md` sammeln und im Bericht sagen, dass sie noch ins Gehirn müssen.
    - Nie ins Gehirn: Zugangsdaten, echte Kundendaten, Rechnungen, Original-LVs, Namen oder Adressen von Endkunden (das Skript blockt Zugangsdaten, den Rest prüfst du).

Fertig heißt: Kriterien belegt, Schranke grün, Teamnachweis vollständig, Entscheidungen offengelegt, kritische Risiken behandelt, Einschränkungen genannt, nächster Betriebsschritt klar. Für die nächste Aufgabe `/clear`.
