# Dev-Team – Anleitung

Stand: Oktober 2026 · Version 3.1

Dieses Repo enthält zwei Plugins für Claude Code: **`dev-team`** und **`tool-scout`**. Beide enthalten kein Firmen- oder Kundenwissen und dürfen deshalb auch auf einen Arbeitsrechner (wenn dein Arbeitgeber eigene Plugins erlaubt). Das Backoffice-Plugin `firma` liegt bewusst **nicht** hier.

Du richtest alles **einmal pro Rechner** ein, danach gilt es in **jedem Projekt**, im Terminal genauso wie in VS Code.

---

## 1. Wer macht was? Das feste Team

Du sprichst immer nur mit **einer** Person, dem Projektleiter. Er **baut nicht selbst und prüft nicht selbst**, er beauftragt das feste Team. Jeder Agent fängt frisch an, kennt nur seinen Auftrag, beantwortet feste Pflichtfragen und berichtet mit Ampel 🟢🟡🔴.

| Rolle | Wann | Aufgabe |
|---|---|---|
| **Projektleiter** | immer | Anforderungen festhalten, planen, Agenten beauftragen, Pakete zusammenführen, dir berichten |
| **Architekt** | beim Planen und am Ende jedes Meilensteins | **plant den Code, bevor gebaut wird**: Architektur-Rückgrat, Abhängigkeitsrichtung, Paketschnitt und pro Paket einen **Bauplan** mit exakten Schnittstellen, damit parallel gebaute Teile zusammenpassen. Tragende Entscheidungen legt er dir mit Alternativen vor. Regeln als automatische Tests, Prüfung auf Wildwuchs und Duplikate |
| **Kritiker** | nach dem Plan | Lücken, Risiken, fehlende Anforderungen, Tests die den Fehler nicht finden würden |
| **Fachprüfer** | Plan und Ergebnis | Kann das Ergebnis in der Praxis so sein? Fachregeln, Referenzfälle |
| ↳ **Rechercheur** | bei Wissenslücken | erst Recherche mit Quellen, dann in einem frischen Aufruf Gegenprüfung gegen zweite Quellen |
| **Abwägungsrunde** | vor der Freigabe | drei unabhängige Urteile: **Fachexperte** (praxistauglich?), **Pragmatiker** (Aufwand/Nutzen?), **Langfrist-Architekt** (rächt sich das später?) |
| **Tester** | vor dem Bauen und nach dem Bauen | schreibt **verdeckte Abnahmetests**, die der Entwickler nie sieht; danach voller Testlauf und Lücken schließen |
| **Entwickler** | beim Bauen, einer pro Arbeitspaket | baut genau ein Paket nach Bauplan in eigenem Arbeitsordner, streng testgetrieben, bis alles grün ist, und meldet einen festen Status (FERTIG / FERTIG_MIT_BEDENKEN / BLOCKIERT / BRAUCHT_KONTEXT). **Bis zu vier parallel**, wenn der Architekt die Pakete als unabhängig markiert hat |
| **Reviewer** | nach jedem Paket, nach jeder Nachbesserung und am Meilenstein-Ende | glaubt dem Bericht des Entwicklers nicht: erst „fehlt etwas, zu viel, missverstanden?“, dann „ist der Code gut?“ (verschluckte Fehler, Duplikate, Testtricks, Sicherheit); bei Nachbesserungen je Befund „behoben / nicht behoben“ |
| **Sicherheitsprüfer** | bei Login, Rechten, sensiblen Daten, Server, Updates, großen Releases | Angriffswege, Datenschutz, Scanner, typische KI-Schwächen |
| **Produktprüfer** | zum Schluss | jede Anforderung mit Nachweis abnehmen, Anwendung starten, Screenshots Desktop und Handy |
| **Auditor** | auf Wunsch (`/dev-team:audit`) | prüft das Team oder ein Projekt unabhängig, bewertet 1–10; behebt selbst nichts |
| Tool-Scout | wenn du willst | fremde Plugins/Skills prüfen, bevor du sie installierst |

**Woher die Regeln kommen:** Die Agententexte bauen auf den stärksten öffentlichen Vorbildern auf (vor allem Superpowers und BMAD, dazu Ideen aus Anthropics Plugins). Was übernommen wurde und was bewusst nicht: [docs/VORBILDER.md](docs/VORBILDER.md).

**Warum so geschnitten:** Eigenständig ist, wer einen eigenen Blickwinkel hat, andere Rechte braucht oder vom Ersteller unabhängig sein muss. Rechercheur und Quellenprüfer waren dieselbe Sicht und sind jetzt ein Agent mit zwei Modi. Übergabe und Betrieb sind eine Checkliste, kein Agent.

## 2. Teamzwang: es arbeitet nur dieses Team

Damit sich der Aufbau lohnt, ist das **technisch** abgesichert, nicht nur als Bitte:

- Der **Wächter** (ein Hook, `scripts/waechter.py`) lässt nur Agenten aus `team.json` starten. Eingebaute Helfer (Explore, Plan, general-purpose …), Agenten ohne Namen, erfundene Namen und Agenten, die selbst Agenten starten wollen, werden blockiert und im Agenten-Log mit ⛔ vermerkt.
- **Schreibrechte** sind festgelegt: Code schreibt nur der Entwickler, Tests nur Entwickler (neue) und Tester, Architekturregeln nur der Architekt, Referenzwerte änderst nur du. Der Projektleiter kann keinen Code schreiben.
- **Neue Agenten** kann Claude nicht anlegen. Neue Rollen entstehen nur hier im Repo, mit deinem OK.
- Zusätzlich sperren die Projekteinstellungen (`.claude/settings.json`) die eingebauten Helfer.

- Auch **Shell-Befehle** prüft der Wächter: Umleitungen, `sed -i`, `cp`, `mv`, `rm`, `git checkout`, Skript-Einzeiler mit Schreibzugriff, neue Claude-Sitzungen (`claude -p`) und Paket-Installationen per Befehl werden blockiert. Der Entwickler kann außerhalb seines Arbeitsordners nichts lesen (verdeckte Tests).
- **Schutzschalter** (Hooks aus, Plugin aus, Freigaben umgehen) kann Claude weder in Dateien noch über die Shell setzen. Einstellungsdateien schreibt nur ein Plugin-Skript nach deinem OK.

**Ehrliche Grenzen:**
- Shell-Befehle werden nach Mustern geprüft. Ein selbst geschriebenes Skript, das Dateien ändert, erkennt der Wächter nicht sicher. Das ist verboten und wird nachträglich erkannt: Nach jedem Zusammenführen prüft die Test-Schranke, dass kein Entwickler bestehende Tests, Referenzwerte oder Einstellungen geändert hat. Code, den der Projektleiter verbotenerweise per Skript schreiben würde, wäre nicht von Entwickler-Code unterscheidbar. Ganz dicht ginge es nur mit der Sandbox von Claude Code.
- Der Abschlussbericht enthält einen **Teamnachweis** aus dem Agenten-Log: Fehlt eine Pflichtprüfung dort, gilt sie als nicht gemacht.
- Die Sperre muss auf deinem Windows-Rechner einmal ausprobiert werden (siehe Abschnitt 9, Schritt 7).

## 3. Wie viel Prüfung? Stufen und Profile

Der Projektleiter sagt dir vor dem Start, welche Stufe er wählt. Du kannst hochstufen („mach das als Stufe Groß“).

| Stufe | Beispiel | Ablauf |
|---|---|---|
| **Klein** | Tippfehler, Farbe, klarer Einzelfehler | du bestätigst kurz, ein Entwickler mit Test, Reviewer, Merge, Test-Schranke |
| **Normal** | neues Feature über mehrere Dateien | voller Ablauf inklusive Abwägungsrunde |
| **Groß** | Berechnung, Datenmodell, neues Modul | voller Ablauf mit allen Instanzen, Meilensteine |

Jedes Projekt hat ein **Profil** in `.claude/dev-team.json`:
- **`fachsoftware`** (z. B. SiRo): Fachprüfer, Fachregeln und Referenzfälle Pflicht.
- **`web`** (Websites, Web-Apps, Automatisierungen für Kunden): Screenshots Desktop + Handy Pflicht, Sicherheitsprüfer sobald Login oder Kundendaten, Betriebs-Checkliste vor der Auslieferung.

## 3a. Der Ablauf eines Auftrags

Start mit: `/dev-team:auftrag <was gebaut werden soll>`

1. **Anforderungen**: jede deiner Anforderungen einzeln mit Nummer. ⏸ *Du bestätigst.*
2. **Ausführlicher Plan**, der **Architekt** legt Struktur und Paketschnitt fest und schreibt Architekturtests.
3. **Kritiker**, **Fachprüfer** (+ Recherche), **Sicherheitsprüfer**, dann **Abwägungsrunde**.
4. ⏸ **Freigabe durch dich**: Ampel, wichtigste Punkte, neue Fachregeln, Paketliste mit Parallelität, „Freigabe zum eigenständigen Bauen?“
5. **Verdeckte Abnahmetests** vom Tester, bevor gebaut wird.
6. **Eigenständig bauen**, auch wenn du stundenlang weg bist:
   - je Paket ein Entwickler in eigenem Arbeitsordner (Git-Worktree), bis zu vier parallel
   - jedes Paket geht durch den Reviewer, bevor es zusammengeführt wird; Nachbesserung höchstens 5 Runden
   - nach jedem Zusammenführen müssen **alle Tests grün** sein
   - kleine Entscheidungen trifft der Projektleiter selbst und schreibt sie mit Begründung auf; im Bericht stehen **alle** („Entscheidungen, die ich für dich getroffen habe“)
   - Stand jederzeit in `docs/STATUS.md`, Fragen in `docs/OFFENE_FRAGEN.md`
7. **Prüfen** je Meilenstein: Tester (deckt Abnahmetests auf) → Fachprüfer → Architekt → Reviewer → Sicherheitsprüfer → Produktprüfer.
8. ⏸ **Bericht** mit Abnahmeliste, Testnachweis und Teamnachweis.

## 3b. „Alle Tests grün“ heißt wirklich grün

Die **Test-Schranke** (`scripts/pruefe-tests.sh`) entscheidet, nicht die Selbstauskunft eines Agenten. Sie führt alle Tests und Zusatzbefehle (Lint, Build, Architekturtests) aus `.claude/dev-team.json` aus und schlägt Alarm, wenn:
- ein Test fehlschlägt oder gar keine Tests laufen,
- ein Test übersprungen oder exklusiv gestellt wurde (`skip`, `only` …),
- weniger Tests bestehen als beim letzten grünen Lauf,
- Referenzfälle geändert oder Testdateien gelöscht wurden (nur mit deiner Freigabe),
- der Entwickler bestehende Tests angefasst hat,
- neue Tests gar nichts prüfen oder Tests im Lauf übersprungen wurden,
- sich der Testbefehl in `.claude/dev-team.json` geändert hat.

**Ausnahmen genehmigst nur du:** Muss sich ein Referenzwert oder der Testbefehl ändern, trägst du in VS Code eine Zeile in `.claude/freigaben.md` ein, z. B. `2026-10-26 | rohrtabelle-2026 | neue Herstellertabelle`. Claude kann diese Datei nicht schreiben; die Schranke akzeptiert nur Freigaben, die dort stehen.

Meldet ein Entwickler „FERTIG“, prüft ein Hook, ob es für genau seinen Commit einen grünen Schranken-Nachweis gibt. Ohne Nachweis muss er nacharbeiten oder ehrlich „BLOCKIERT“ melden.

Jeder Lauf steht automatisch in `docs/TESTNACHWEIS.md`. Neue Bibliotheken prüft die **Abhängigkeits-Schranke** (`scripts/pruefe-abhaengigkeiten.sh`): Gibt es das Paket wirklich, ist es alt und verbreitet genug, ist die Version festgeschrieben? KI erfindet sonst gern Paketnamen.

## 4. Fachregeln – damit offensichtliche Fehler nicht durchrutschen

Hunderte Tests helfen nichts, wenn keiner prüft, ob ein Ergebnis **fachlich überhaupt möglich** ist. Deshalb hat jedes Projekt mit Berechnungen `fachwissen/regeln.md`, z. B. „Rohrdimension wird in Fließrichtung nie größer“.

- Jede **von dir bestätigte** Regel wird als automatische Prüfung gebaut, die über **jedes** berechnete Ergebnis läuft: Referenzfälle, viele zufällig erzeugte Fälle und im Programm selbst.
- Neue Regel: Sie muss am fehlerhaften Stand zuerst **rot** werden. Das ist der Beweis, dass sie wirkt.
- Recherche-Ergebnisse sind nur **Vorschläge**. Nur du machst daraus Regeln.
- Eigene Unterlagen (Handbücher, Datenblätter, Rohrtabellen) in `fachwissen/quellen/` legen. Die sind die beste Quelle.
- Recherche gezielt starten: `/dev-team:recherche <Thema>`

## 5. Sehen, wer gerade was macht

- **Im Chat:** Der Projektleiter kündigt jeden Agenten an („→ Kritiker prüft den Plan“) und meldet das Ergebnis mit Ampel („← Kritiker: 🟡 …“). In VS Code kannst du jeden Agenten-Block aufklappen.
- **`docs/STATUS.md`:** oben steht immer die Phase und **jeder laufende Agent**, z. B. „Entwickler P3 ⏳, Entwickler P4 ⏳, Reviewer P2 ✅“, dazu die Pakettabelle mit Branch, Review, Merge und Testergebnis.
- **`docs/AGENTEN_LOG.md`:** wird automatisch mitgeschrieben, auch wenn du nicht da bist. Jede Zeile: Uhrzeit, ▶ Start / ■ Ende mit Ampel / ⛔ blockiert, Agent, Auftrag bzw. Ergebnis.
- **`docs/TESTNACHWEIS.md`:** jeder Lauf der Test-Schranke mit Stand und Zahl bestandener Tests.

## 6. Mehrere Projekte und gemeinsames Lernen

- **Getrennt arbeiten:** Jedes Projekt hat seinen eigenen Ordner und sein eigenes VS-Code-Fenster. Mehrere können gleichzeitig laufen, ohne sich zu sehen.
- **Gemeinsam lernen:** Geteilt werden nur zwei Dinge, beide ohne Projekt-, Kunden- oder Firmennamen:
  - **Lessons** – Erfahrungen zu Arbeitsweise und Code. Beim eigenständigen Bauen sammelt jedes Projekt Vorschläge in `docs/LEKTIONEN_VORSCHLAEGE.md`. Im Abschlussbericht bestätigst du sie, dann übernimmt `/dev-team:lektion vorschlaege` sie für alle Projekte.
  - **Fachwissen-Bibliothek** (`plugins/dev-team/wissen/fachwissen/`) – allgemeine Regeln je Fachgebiet, z. B. `waermenetz.md`. Nach jeder bestätigten Fachregel fragt der Projektleiter, ob sie allgemein gilt. Neue Projekte im selben Fachgebiet starten mit allen Regeln von dort.
- **Bleibt im Projekt:** interne Werte und Unterlagen eines Arbeitgebers oder Kunden.
- Auf dem Arbeitsrechner bleiben Lessons lokal. Die Fachwissen-Bibliothek ist allgemein und wird über GitHub auf beiden Rechnern aktuell gehalten.

## 7. Gilt automatisch: jedes Projekt, auch in der Cloud

- **Auf deinen Rechnern:** Das Plugin ist für deinen ganzen Benutzer installiert. Agenten und Grundgesetz gelten damit in **jedem** Projekt, auch in neuen, ohne dass du etwas tun musst.
- **Neues oder noch nicht aufgenommenes Projekt:** Beim Start merkt der Projektleiter das und bietet dir `/dev-team:neues-projekt` bzw. `/dev-team:projekt-aufnehmen` an.
- **Cloud-Sitzungen** (ein Projekt baut auf GitHub in der Cloud weiter, während dein Laptop aus ist): Dort gibt es keine installierten Plugins. Deshalb legen `neues-projekt` und `projekt-aufnehmen` in jedes Repo zwei kleine Dateien:
  - `.claude/settings.json` startet bei jeder Sitzung
  - `.claude/dev-team-start.sh`, das in der Cloud das Dev-Team von GitHub holt und Grundgesetz, Agenten, Abläufe und Protokoll bereitstellt. Auf deinen Rechnern tut es nichts, dort übernimmt das installierte Plugin.
- In der Cloud heißen die Befehle mit Bindestrich, z. B. `/dev-team-auftrag`, die Agenten ohne Präfix, z. B. `kritiker`.
- **Voraussetzung:** Die Cloud-Sitzung muss `github.com/roelzer/roelz-plugins` erreichen (das Repo ist öffentlich). Wenn nicht, sagt dir der Projektleiter das gleich zu Beginn.
- **Sicherheit der Lieferkette:** Ohne weitere Angabe holt die Cloud den aktuellen Stand von `main`. Wer einen geprüften Stand festnageln will, setzt in der Cloud-Umgebung die Variable `DEV_TEAM_REF` auf einen Tag oder Commit. Wegen des öffentlichen Repos darf dort nie etwas Vertrauliches stehen.
- Lektionen aus Cloud-Sitzungen landen als Vorschlag in `docs/LEKTIONEN_VORSCHLAEGE.md` des Projekts. Übernommen werden sie später, wenn du dabei bist.

## 8. Befehle

| Befehl | Wofür |
|---|---|
| `/dev-team:auftrag <…>` | Auftrag Stufe Normal/Groß durchführen |
| `/dev-team:neues-projekt <name>` | neues Projekt mit Struktur anlegen |
| `/dev-team:projekt-aufnehmen` | bestehendes Projekt (z. B. SiRo) ins Dev-Team holen |
| `/dev-team:recherche <Thema>` | Fachgrundlagen recherchieren |
| `/dev-team:lektion <…>` | Lektion aus einem Fehler festhalten |
| `/dev-team:lektion vorschlaege` | gesammelte Lektionsvorschläge eines Projekts übernehmen |
| `/dev-team:audit plugin\|projekt` | unabhängiges Audit, Behebung, Nachprüfung durch frischen Auditor |
| `/dev-team:uebergabe` | Übergabe an Kunden vorbereiten |
| `/dev-team:einrichten privat\|arbeit` | einmalige Einrichtung pro Rechner |
| `/tool-scout:scout <wofür>` | fremde Plugins/Skills suchen und prüfen |
| `@dev-team:<agent>` | einen Agenten gezielt rufen, z. B. `@dev-team:fachpruefer` |

---

## 9. Einrichtung auf einem Rechner

**Voraussetzungen:** Claude Code ab Version 2.1.295, Git für Windows (ab 2.31, mit Git Bash – ohne Git Bash laufen die Hooks nicht, und der Wächter blockiert dann mit Absicht alles), **Python 3** im PATH (python.org, Haken bei „Add python.exe to PATH“ – ohne Python blockiert der Wächter mit Absicht jede Arbeit in Dev-Team-Projekten), VS Code mit der Claude-Code-Erweiterung, Zugriff auf dein GitHub-Konto.

1. **Repo klonen** (VS-Code-Terminal):
   ```
   git clone https://github.com/roelzer/roelz-plugins.git C:/Users/<du>/roelz-plugins
   ```
2. **Plugins installieren:**
   ```
   claude plugin marketplace add C:/Users/<du>/roelz-plugins
   claude plugin install dev-team@roelz-plugins
   claude plugin install tool-scout@roelz-plugins
   ```
   Den Marktplatz **aus dem lokalen Ordner** hinzufügen, nicht direkt von GitHub. Nur so landen neue Lektionen im Repo.
3. **VS Code komplett schließen und neu öffnen.** Plugins werden nur beim Start geladen.
4. **Einrichten:** Claude Code starten und eingeben:
   - privater Rechner: `/dev-team:einrichten privat`
   - Arbeitsrechner: `/dev-team:einrichten arbeit` (Lektionen bleiben dann lokal und fließen nicht ins private Repo)
5. **Noch einmal neu starten.** Fragt Claude, ob verknüpfte Dateien geladen werden dürfen: zustimmen.
6. Prüfen: `/agents` zeigt die Dev-Team-Agenten mit `dev-team:` davor.
7. **Teamzwang einmal ausprobieren** (in einem Testprojekt, das mit `/dev-team:neues-projekt test-teamzwang` angelegt wurde), Claude bitten:
   - „Starte den Explore-Agenten und such nach README“ → muss mit ⛔ blockiert werden
   - „Schreib selbst eine Datei src/test.js“ → muss blockiert werden („Code baut der Agent entwickler“)
   - „Lass den Kritiker kurz das Lastenheft lesen“ → muss laufen
   Steht im `docs/AGENTEN_LOG.md` ein ⛔ für den ersten Versuch und ▶ für den Kritiker, wirkt die Sperre.

## 10. Updates

Wird am Dev-Team etwas geändert (neue Regel, neuer Agent), landet es auf GitHub. Auf dem anderen Rechner:
```
cd C:/Users/<du>/roelz-plugins
git pull
claude plugin marketplace update roelz-plugins
```
Danach VS Code neu starten.

**Bestehende Projekte auf Version 3 umstellen:** im Projekt `/dev-team:projekt-aufnehmen` ausführen. Es legt `.claude/dev-team.json` an und zeigt dir die Änderungen an `.claude/settings.json` (Teamzwang, Worktrees), bevor es sie schreibt.

**Am Team selbst arbeiten** (Agenten, `team.json`, Hooks ändern): Der Wächter sperrt das in normalen Sitzungen. Für Wartung Claude Code mit gesetzter Variable starten, z. B. in Git Bash: `DEV_TEAM_WARTUNG=1 claude`. Danach die Plugin-Tests laufen lassen: `python3 -m unittest discover -s plugins/dev-team/tests`.

## 10a. Freigaben für stundenlanges eigenständiges Bauen

Damit der Lauf nicht bei der ersten Rückfrage stehen bleibt, braucht Claude Code die Erlaubnis für die üblichen Befehle. Empfehlung:
- **Auto-Modus** von Claude Code (ein Prüfmodell entscheidet über Rückfragen) oder eine **Erlaubnisliste** in deinen Benutzereinstellungen für die Befehle, die das Projekt braucht (z. B. `Bash(npm test)`, `Bash(npm ci)`, `Bash(git status)`, `Bash(git merge *)`, `Bash(git worktree *)`).
- **Nicht** `bypassPermissions`: Dann gelten nur noch Wächter und Sperrregeln, alle anderen Rückfragen fallen weg.
- Optional später die **Sandbox** von Claude Code: Sie sperrt auf Betriebssystemebene und schließt die Shell-Lücke, macht aber manche Befehle umständlicher. Wir prüfen das nach dem ersten Pilotprojekt.

## 11. Senior-Qualitätsregeln und Grenzen der Autonomie

- Gebaut wird eigenständig, aber auf einem eigenen Branch. Kein Push auf `main`, kein Löschen, keine Datenbank-Migration, kein Release, keine Schlüssel in der Sitzung und keine Daten an externe Dienste ohne dein Ja. Die vollständige Liste steht im Grundgesetz („Grenzen der Autonomie“).
- Technische Grenzen: höchstens vier Entwickler und drei Prüfer gleichzeitig, jeder mit Schrittobergrenze, Nachbesserung höchstens fünf Runden. Große Aufträge werden in Meilensteine mit eigenem Stopp geteilt. Der Stand steht in Dateien (`docs/STATUS.md`), damit nach `/clear` nichts verloren geht.
- Gibt dein Auftrag eigene Phasen vor („nur analysieren, noch nichts ändern“), gilt das vor dem Standardablauf.
- Selbstprüfung des Plugins: `bash plugins/dev-team/scripts/pruefe-plugin.sh` (findet widersprüchliche Namen, tote Verweise, uneinheitliche Versionen, Abweichungen zwischen `team.json` und den Agentendateien und führt die Plugin-Tests aus).

- Die Projektleitung bleibt für Integration und Abschluss verantwortlich, auch wenn Spezialisten prüfen.
- Kritische oder hohe Sicherheits-/Datenintegritätsbefunde blockieren die Freigabe.
- Nur tatsächlich ausgeführte Tests gelten als ausgeführt; nicht geprüfte Punkte werden offen benannt.
- Bestehende Referenzwerte und Tests werden nicht stillschweigend angepasst, um grüne Ergebnisse zu erhalten.
- Für neue Rollen und die präzisierte Pipeline siehe `plugins/dev-team/TEAM-PROTOKOLL.md` und `plugins/dev-team/CHANGELOG.md`.

## 12. Gut zu wissen

- **Arbeit:** Code, den du für deinen Arbeitgeber baust, gehört in der Regel dem Arbeitgeber. Nichts davon in deinen privaten Baukasten übernehmen.
- **Fremde Plugins** nie direkt aus Videos installieren. Erst `/tool-scout:scout check`.
- **Tokens:** Abwägungsrunde und Recherche kosten spürbar mehr. Deshalb die Stufen nutzen und nach jeder Aufgabe `/clear`.
- **Grenzen:** Alle Agenten sind Claude. Mehrere Instanzen haben ähnliche blinde Flecken. Das Team mildert das mit unterschiedlichen Modellen, Werkzeugen ohne KI (Tests, Linter, Scanner) und verdeckten Tests. Die stärkste Absicherung bleiben deine Referenzfälle, die von dir bestätigten Fachregeln und eure gegenseitige Abnahme vor Kundenauslieferungen.
- **Parallele Entwickler** sparen Zeit nur bei wirklich unabhängigen Paketen. Eine Studie von 2026 (CAID) fand das beste Ergebnis bei etwa vier parallelen Entwicklern; mit mehr wurde es wieder schlechter. Kollidieren zwei beim Zusammenführen, wird das Paket neu gebaut, nicht von Hand geflickt. Das kostet Tokens; der Pragmatiker prüft vorher, ob sich die Parallelität lohnt.
