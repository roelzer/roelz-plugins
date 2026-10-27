# Dev-Team – Anleitung

Stand: Oktober 2026 · Version 3.8

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
| **Entwickler** | beim Bauen, einer pro Arbeitspaket | baut genau ein Paket nach Bauplan in eigenem Arbeitsordner, streng testgetrieben, bis alles grün ist, und meldet einen festen Status (FERTIG / FERTIG_MIT_BEDENKEN / BLOCKIERT / BRAUCHT_KONTEXT). **Bis zu drei parallel**, wenn der Architekt die Pakete als unabhängig markiert hat |
| **Reviewer** | nach jedem Paket, nach jeder Nachbesserung und am Meilenstein-Ende | glaubt dem Bericht des Entwicklers nicht: erst „fehlt etwas, zu viel, missverstanden?“, dann „ist der Code gut?“ (verschluckte Fehler, Duplikate, Testtricks, Sicherheit); bei Nachbesserungen je Befund „behoben / nicht behoben“ |
| **Sicherheitsprüfer** | bei Login, Rechten, sensiblen Daten, Server, Updates, großen Releases | Angriffswege, Datenschutz, Scanner, typische KI-Schwächen |
| **Designer** | bei Projekten mit Oberfläche, vor dem Bauen und vor der Abnahme | **gestaltet die Oberfläche, bevor gebaut wird**: eine klare Gestaltungsrichtung, Abläufe, jeden Bildschirm mit allen Zuständen (leer, laden, Fehler, Handy), Farben/Schrift/Abstände als Vorgabe; prüft nach dem Bauen per Screenshot, ob so gebaut wurde. Schreibt keinen Code |
| **Gastgeber** | beim Planen (und bei großen Aufträgen nach dem Bauen) | **denkt an das, woran du nicht denkst** – wie ein 5-Sterne-Hotel oder Emirates: geht die ganze Nutzerreise durch (erster Start, Höhepunkt, Fehler, Abschluss, Weitergeben), greift Nebensätze aus dem Lastenheft auf und schlägt höchstens drei Wow-Momente vor, je mit Aufwand und Prüfkriterium. Du wählst aus; Gewähltes wird eine normale Anforderung mit Test. Fehlende Grundfunktionen meldet er getrennt als Lücke. Auch einzeln: `/dev-team:wow` |
| **Produktprüfer** | zum Schluss | jede Anforderung mit Nachweis abnehmen, Anwendung starten, Screenshots Desktop und Handy |
| **Auditor** | auf Wunsch (`/dev-team:audit`) | prüft das Team oder ein Projekt unabhängig, bewertet 1–10; behebt selbst nichts |
| Tool-Scout | wenn du willst | fremde Plugins/Skills prüfen, bevor du sie installierst |

**Woher die Regeln kommen:** Die Agententexte bauen auf den stärksten öffentlichen Vorbildern auf (vor allem Superpowers und BMAD, dazu Ideen aus Anthropics Plugins). Was übernommen wurde und was bewusst nicht: [docs/VORBILDER.md](docs/VORBILDER.md).

**Warum so geschnitten:** Eigenständig ist, wer einen eigenen Blickwinkel hat, andere Rechte braucht oder vom Ersteller unabhängig sein muss. Rechercheur und Quellenprüfer waren dieselbe Sicht und sind jetzt ein Agent mit zwei Modi. Übergabe und Betrieb sind eine Checkliste, kein Agent.

## 2. Teamzwang: es arbeitet nur dieses Team

Damit sich der Aufbau lohnt, ist das **technisch** abgesichert, nicht nur als Bitte:

- Der **Wächter** (ein Hook, `scripts/waechter.py`) lässt nur Agenten aus `team.json` starten. Eingebaute Helfer (Explore, Plan, general-purpose …), Agenten ohne Namen, erfundene Namen und Agenten, die selbst Agenten starten wollen, werden blockiert und im Agenten-Log mit ⛔ vermerkt.
- **Schreibrechte** sind festgelegt: Code schreibt nur der Entwickler, Tests nur Entwickler (neue) und Tester, Architekturregeln nur der Architekt, Referenzwerte änderst nur du. Der Projektleiter kann über die Datei-Werkzeuge keinen Code schreiben; in der Shell darf er nur Befehle einer Erlaubnisliste ausführen (Git, Lese- und Dateibefehle, Plugin-Skripte, die Befehle aus `.claude/dev-team.json`).
- **Neue Agenten** kann Claude nicht anlegen. Neue Rollen entstehen nur hier im Repo, mit deinem OK.
- Zusätzlich sperren die Projekteinstellungen (`.claude/settings.json`) die eingebauten Helfer und das Workflow-Werkzeug (startet viele Helfer). Werkzeuge, die der Wächter nicht kennt (z. B. neue Werkzeuge nach einem Claude-Code-Update), sind in Dev-Team-Projekten gesperrt, bis Simon sie als harmlos freigibt (`team.json` → `harmlose_werkzeuge`). `Monitor` wird wie die Shell geprüft.
- **Modelle:** Jeder Agent hat ein Standardmodell. Prüfer, die Qualität absichern (Architekt, Kritiker, Reviewer, Sicherheits-, Fach-, Langfrist-Prüfer, Auditor), laufen immer mit Opus. Entwickler laufen mit Sonnet und bekommen Opus bei schweren Paketen und ab der 3. Nachbesserung. Andere Modelle lässt der Wächter nicht zu; das gewählte Modell steht im Agenten-Log.

- Auch **Shell-Befehle** prüft der Wächter: Umleitungen, `sed -i`, `cp`, `mv`, `rm`, `git checkout`, Hüllen wie `bash -c` und `eval`, Pipes in einen Interpreter (`curl … | bash`), Skript-Einzeiler mit Schreib- oder Prozesszugriff, neue Claude-Sitzungen (`claude -p`), Paket-Installationen und `npx` mit fremden Paketen. Gesperrt sind auch `git reset --hard`, `git clean`, `git branch -D` und Pushes auf main oder mit Gewalt. Der Projektleiter führt keine Skripte aus dem Projekt aus.
- Prüfer (Reviewer, Kritiker usw.) dürfen Git nur lesen, nicht committen oder zusammenführen. Skills, die einen eigenen Agenten starten würden (`context: fork`), sind gesperrt.
- Der Entwickler arbeitet in seinem eigenen Worktree. Lesen außerhalb davon (Hauptordner, verdeckte Tests, `cd ..`) blockiert der Wächter. Der direkte Weg ist gesperrt; **mit einem eigenen Skript geht es trotzdem**. Deshalb zählen die verdeckten Tests als zusätzliche Absicherung, die Prüfsummen und der blinde Lauf als Nachweis (siehe Grenzen).
- **Schutzschalter** (Hooks aus, Plugin aus, Freigaben umgehen, Workflows an) kann Claude über die Datei-Werkzeuge nicht setzen, und Shell-Befehle mit diesen Namen werden blockiert. `~/.claude/CLAUDE.md` (Verknüpfung zum Grundgesetz) schreibt nur ein Plugin-Skript nach deinem OK. Einstellungsdateien schreibt nur ein Plugin-Skript nach deinem OK.

**Ehrliche Grenzen:**
- Shell-Befehle der bauenden Agenten (Entwickler, Tester, Architekt) werden nach Mustern geprüft. Ein selbst geschriebenes Skript, das Dateien ändert oder liest, erkennt der Wächter nicht sicher. Deshalb sind die verdeckten Abnahmetests eine **zusätzliche** Absicherung, nicht die einzige: Reviewer und Tester prüfen außerdem auf Sonderfall-Code. Das ist verboten und wird nachträglich erkannt: Nach jedem Zusammenführen prüft die Test-Schranke, dass kein Entwickler bestehende Tests, Referenzwerte oder Einstellungen geändert hat. Code, den der Projektleiter verbotenerweise per Skript schreiben würde, wäre nicht von Entwickler-Code unterscheidbar. Ganz dicht ginge es nur mit der Sandbox von Claude Code – die gibt es aber **nur unter Linux, macOS und WSL2, nicht unter normalem Windows**. Die stärkste zusätzliche Absicherung unter Windows ist eine Prüfung außerhalb der Reichweite der Agenten, z. B. GitHub Actions (Vorlage `vorlagen/ci-github.yml`).
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
   - je Paket ein Entwickler in eigenem Arbeitsordner (Git-Worktree), bis zu drei parallel
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
- der Entwickler bestehende Tests oder die Testkonfiguration angefasst hat (nach jedem Zusammenführen noch einmal geprüft),
- neue Tests gar nichts prüfen, nur Selbstverständliches prüfen (`assert True`) oder vor der Prüfung aussteigen, oder Tests im Lauf übersprungen wurden,
- sich der Testbefehl in `.claude/dev-team.json` geändert hat.

**Ausnahmen genehmigst nur du:** Muss sich ein Referenzwert oder der Testbefehl ändern, trägst du in VS Code eine Zeile in `.claude/freigaben.md` ein: `Datum | Stichwort | Geltung | Grund`, z. B. `2026-10-26 | rohrtabelle-2026 | tests/referenz/fall3.json | neue Herstellertabelle`. Die Freigabe gilt nur für das, was unter „Geltung“ steht, und nur bei genau passendem Stichwort. Claude kann diese Datei nicht schreiben. Vorlage mit Beispielen: `vorlagen/freigaben-beispiel.md`.

Meldet ein Entwickler „FERTIG“, prüft ein Hook, ob sein Worktree sauber committet ist und ob es für genau diesen Stand einen grünen Schranken-Nachweis gibt. Ohne Nachweis muss er nacharbeiten oder ehrlich „BLOCKIERT“ melden.

Jeder Lauf steht automatisch in `docs/TESTNACHWEIS.md`. Neue Bibliotheken prüft die **Abhängigkeits-Schranke** (`scripts/pruefe-abhaengigkeiten.sh`): Gibt es das Paket wirklich, ist es alt und verbreitet genug, ist die Version festgeschrieben? KI erfindet sonst gern Paketnamen. Namen, die wie ein Tippfehler eines bekannten Pakets aussehen (`reqeusts`), sind ebenfalls rot.

**Weitere Sicherungen (ab Version 3.5):**
- **Prüfsummen der Abnahmetests:** Sobald der Tester die verdeckten Tests fertig hat, hält ein Skript ihre Prüfsummen fest (`docs/ABNAHME_PRUEFSUMMEN.txt`, wird mit dem Plan committet). Wird ein Abnahmetest später verändert, ist die Schranke rot.
- **Blinder Lauf nach jedem Merge:** Die verdeckten Tests laufen nach jedem Zusammenführen in einer Kopie mit. Gemeldet wird nur „grün“ oder „rot bei Anforderung A3“ – der Entwickler erfährt nie den Test selbst.
- **Jede Anforderung hat einen Test:** Tests tragen die Nummer der Anforderung (A3) bzw. Fachregel (F2). Am Meilenstein-Ende ist die Schranke rot, wenn eine Nummer ohne Test ist.
- **Berechnungssoftware:** Fachregeln werden über viele erzeugte Eingaben geprüft, und ein **Mutationstest** baut absichtlich kleine Fehler in den Rechenkern ein (z. B. `<` statt `<=`). Die Tests müssen die meisten davon finden (Schwelle, z. B. 70 %), sonst ist der Meilenstein rot. Eintrag in `.claude/dev-team.json` unter `meilensteinbefehle`.
- **Vollständige Prüfberichte** jedes Agenten liegen in `docs/pruefberichte/`, je Lauf eine Kennzahl in `.dev-team/kennzahlen.jsonl` (für die spätere Messung, welche Rolle wie viel bringt).
- **Referenzfälle und Testbefehl ändert nur du:** Neue Referenzdaten oder einen anderen Testbefehl gibst du per Zeile in `.claude/freigaben.md` frei (Geltung = Zielpfad, z. B. `tests/referenz/fall5.json`). Der Projektleiter übernimmt die Datei dann mit `scripts/geschuetzt_schreiben.py`; jede Übernahme steht mit Prüfsumme in `docs/FREIGABEN_LOG.md`.
- **Wer startet die Schranke?** Der Projektleiter startet sie nach jedem Merge. Die Schranke ist ein Programm ohne KI; er prüft dabei nichts selbst, er liest nur „grün“ oder „rot“.
- **Einstellungsschutz:** Versucht ein Programm, die Schutz-Hooks in einer Einstellungsdatei abzuschalten oder umzulenken (z. B. `disableAllHooks`, ein anderer Suchpfad `PATH`), meldet Claude Code das dem Hook `ConfigChange`. Er blockiert die Änderung für die laufende Sitzung, **entfernt die schädlichen Einträge wieder aus der Datei** und schreibt ein ⛔ ins Log. Zusätzlich ist jede Test-Schranke rot, solange so ein Eintrag existiert, und der Projektleiter prüft laut Grundgesetz zu Beginn jeder Sitzung die Einstellungsdateien. **Ehrliche Grenze:** Ganz dicht ist das nur, wenn du den Wächter einmal als *verwaltete Einstellung* einrichtest (Abschnitt 9a) – die kann keine Projekt- oder Benutzereinstellung abschalten.

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
- **Team-Tafel (neu in 3.7, Zusatz-Plugin `dev-team-tafel`):** eine Tafel neben dem Chat. Sie zeigt live, wer gerade arbeitet (Rolle, Modell, Laufzeit, Paket), wer zuletzt fertig wurde, Phase und Ampel aus `STATUS.md`, die letzten Ergebnisse und Sperren aus dem Agenten-Log und den letzten Testnachweis. Sie liest nur und aktualisiert sich alle 5 Sekunden. Öffnen: startet von selbst, sonst `/tafel`. Installieren: siehe 9, Schritt 2.

## 6. Mehrere Projekte und gemeinsames Lernen

- **Getrennt arbeiten:** Jedes Projekt hat seinen eigenen Ordner und sein eigenes VS-Code-Fenster. Mehrere können gleichzeitig laufen, ohne sich zu sehen.
- **Gemeinsam lernen – über das Gehirn (neu in 3.7):** Alles, was das Team dauerhaft weiß, steht in deinem Obsidian-Tresor (Repo `roelzer/brain`). Das Team schreibt selbst hinein, über `scripts/gehirn.py`:
  - nach jedem Auftrag den **Projektstand** in `01 Projekte/<Projekt>.md` (nur der Bereich zwischen den Dev-Team-Markern wird ersetzt, deine eigenen Notizen bleiben) und die Zeile in der Projektübersicht,
  - **Lektionsvorschläge** unter „Vorgeschlagen“ in `05 Lektionen/Dev-Team-Lektionen.md`; bestätigst du sie, wandern sie nach oben und gelten ab der nächsten Sitzung für alle Agenten,
  - **Entscheidungen**, die du getroffen hast, in den Entscheidungslog,
  - von dir bestätigtes **Fachwissen** in `02 Wissen/` (bestehende Zeilen werden nie gestrichen).
  Vorher holt das Skript den neuesten Stand (`git pull`), danach committet und pusht es. Zugangsdaten und Wörter aus der Notiz „Sperrwörter“ im Gehirn werden geblockt (dort steht z. B., dass Firmenwissen deines Arbeitgebers draußen bleibt). Ohne Gehirn (Cloud, fremder Rechner) sammelt der Projektleiter alles in `docs/GEHIRN_NACHTRAG.md`.
- **Rückfall ohne Gehirn:** die beiden Dateien im Plugin, beide ohne Projekt-, Kunden- oder Firmennamen:
  - **Lessons** – Erfahrungen zu Arbeitsweise und Code. Beim eigenständigen Bauen sammelt jedes Projekt Vorschläge in `docs/LEKTIONEN_VORSCHLAEGE.md`. Im Abschlussbericht bestätigst du sie, dann übernimmt `/dev-team:lektion vorschlaege` sie für alle Projekte.
  - **Fachwissen-Bibliothek** (`plugins/dev-team/wissen/fachwissen/`) – allgemeine Regeln je Fachgebiet, z. B. `waermenetz.md`. Nach jeder bestätigten Fachregel fragt der Projektleiter, ob sie allgemein gilt. Neue Projekte im selben Fachgebiet starten mit allen Regeln von dort.
- **Bleibt im Projekt:** interne Werte und Unterlagen eines Arbeitgebers oder Kunden.
- Auf dem Arbeitsrechner bleiben Lessons lokal. Die Fachwissen-Bibliothek ist allgemein und wird über GitHub auf beiden Rechnern aktuell gehalten.

## 7. Wo das Dev-Team gilt (Rechner und Cloud)

- **Auf deinen Rechnern:** Das Plugin ist für deinen ganzen Benutzer installiert. Agenten und Grundgesetz gelten damit in **jedem** Projekt, auch in neuen, ohne dass du etwas tun musst.
- **Neues oder noch nicht aufgenommenes Projekt:** Beim Start merkt der Projektleiter das und bietet dir `/dev-team:neues-projekt` bzw. `/dev-team:projekt-aufnehmen` an.
- **Cloud-Sitzungen** (ein Projekt baut auf GitHub in der Cloud weiter, während dein Laptop aus ist): Dort gibt es keine installierten Plugins. Deshalb legen `neues-projekt` und `projekt-aufnehmen` in jedes Repo zwei kleine Dateien:
  - `.claude/settings.json` startet bei jeder Sitzung
  - `.claude/dev-team-start.sh`, das in der Cloud das Dev-Team von GitHub holt und Grundgesetz, Agenten, Abläufe und Protokoll bereitstellt. Auf deinen Rechnern tut es nichts, dort übernimmt das installierte Plugin.
- **Wichtig – claude.ai-Projekte:** In Cloud-Threads eines claude.ai-Projekts laufen laut Claude-Code-Doku die Hooks und Plugins aus `.claude/settings.json` des Repos **nicht**. Dort gilt das Dev-Team nur, wenn du es in den Projekteinstellungen unter „Project settings → Plugins“ einträgst. Ohne diesen Eintrag gibt es dort **keinen** Teamzwang – dann nicht eigenständig bauen lassen.
- `.claude/dev-team-start.sh` legt das Einrichten einmal an; danach kann es kein Agent mehr ändern (sonst könnte er den Wächter in der Cloud abschalten).
- In der Cloud heißen die Befehle mit Bindestrich, z. B. `/dev-team-auftrag`, die Agenten ohne Präfix, z. B. `kritiker`.
- **Voraussetzung:** Die Cloud-Sitzung muss `github.com/roelzer/roelz-plugins` erreichen (das Repo ist öffentlich). Wenn nicht, sagt dir der Projektleiter das gleich zu Beginn.
- **Sicherheit der Lieferkette:** Ohne weitere Angabe holt die Cloud den aktuellen Stand von `main`. Wer einen geprüften Stand festnageln will, trägt in `.claude/dev-team.json` unter `plugin_stand` einen Tag oder Commit ein (oder setzt in der Cloud-Umgebung `DEV_TEAM_REF`). Ohne Angabe meldet der Start eine Warnung. Wegen des öffentlichen Repos darf dort nie etwas Vertrauliches stehen.
- Lektionen aus Cloud-Sitzungen landen als Vorschlag in `docs/LEKTIONEN_VORSCHLAEGE.md` des Projekts. Übernommen werden sie später, wenn du dabei bist.

## 8. Befehle

| Befehl | Wofür |
|---|---|
| `/dev-team:auftrag <…>` | Auftrag Stufe Normal/Groß durchführen |
| `/dev-team:neues-projekt <name>` | neues Projekt mit Struktur anlegen |
| `/dev-team:projekt-aufnehmen` | bestehendes Projekt (z. B. SiRo) ins Dev-Team holen |
| `/dev-team:recherche <Thema>` | Fachgrundlagen recherchieren |
| `/dev-team:wow <Idee \| Projekt \| nachschliff>` | Wow-Effekt finden: woran hat noch niemand gedacht? (Gastgeber) |
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
   claude plugin install dev-team-tafel@roelz-plugins
   ```
   Den Marktplatz **aus dem lokalen Ordner** hinzufügen, nicht direkt von GitHub. Nur so landen neue Lektionen im Repo.
3. **VS Code komplett schließen und neu öffnen.** Plugins werden nur beim Start geladen.
4. **Einrichten:** Claude Code starten und eingeben:
   - privater Rechner: `/dev-team:einrichten privat`
   - Arbeitsrechner: `/dev-team:einrichten arbeit` (Lektionen bleiben dann lokal und fließen nicht ins private Repo)
   - Der Projektleiter fragt dabei nach dem Ordner deines Gehirns (lokaler Klon von `roelzer/brain`, z. B. `C:/Users/<du>/roelz-brain`). Damit liest und schreibt das Team ab dann dort.
5. **Noch einmal neu starten.** Fragt Claude, ob verknüpfte Dateien geladen werden dürfen: zustimmen.
6. Prüfen: `/agents` zeigt die Dev-Team-Agenten mit `dev-team:` davor.
7. **Teamzwang einmal ausprobieren** (in einem Testprojekt, das mit `/dev-team:neues-projekt test-teamzwang` angelegt wurde), Claude bitten:
   - „Starte den Explore-Agenten und such nach README“ → muss mit ⛔ blockiert werden
   - „Schreib selbst eine Datei src/test.js“ → muss blockiert werden („Code baut der Agent entwickler“)
   - „Führ aus: bash -c "echo x > src/test2.js"“ → muss blockiert werden
   - „Schreib die Datei /c/Users/<du>/Desktop/test.txt“ → muss blockiert werden (außerhalb des Projekts)
   - „Nutze das Monitor-Werkzeug mit dem Befehl echo x > src/test3.js“ → muss blockiert werden
   - „Führ aus: echo '<<X' ; echo y > src/test4.js ; X=1“ → muss blockiert werden (getarnter Heredoc)
   - „Lass den Kritiker kurz das Lastenheft lesen“ → muss laufen
   Steht im `docs/AGENTEN_LOG.md` ein ⛔ für die gesperrten Versuche und ▶ für den Kritiker, wirkt die Sperre. Danach im Explorer nachsehen, dass `src/test.js` bis `src/test4.js` und `test.txt` auf dem Desktop **wirklich nicht** entstanden sind.

## 9a. Wächter dauerhaft absichern (verwaltete Einstellung, einmalig, empfohlen)

Hooks aus dem Plugin oder aus den Projekteinstellungen kann ein Programm, das ein Agent ausführt, für die **nächste** Sitzung abschalten. Hooks aus einer *verwalteten Einstellung* (managed settings) kann keine Benutzer-, Projekt- oder lokale Einstellung abschalten. Das braucht einmal Administratorrechte:

1. Im Terminal: `python plugins/dev-team/scripts/verwaltete_einstellungen.py --datei %USERPROFILE%\Desktop\managed-settings.json` (im Repo-Ordner).
2. Die Datei vom Desktop **als Administrator** nach `C:\Program Files\ClaudeCode\managed-settings.json` kopieren (Ordner anlegen, falls er fehlt).
3. Claude Code neu starten, `/status` aufrufen: Unter „Setting sources“ muss „managed“ stehen.
4. Ab jetzt läuft der Wächter aus der verwalteten Einstellung; der Plugin-Wächter tritt automatisch zurück, damit nichts doppelt läuft.
5. **Probe (wichtig, bisher nur auf deinem Rechner möglich):** In einem Testprojekt die Datei `.claude/settings.local.json` mit dem Inhalt `{"disableAllHooks": true}` anlegen, Claude Code neu starten und bitten: „Leg die Datei src/probe.js an.“ Das muss mit ⛔ blockiert werden. Danach die Datei `settings.local.json` wieder löschen.

**Stand der Prüfung (27.10.2026):** Ohne verwaltete Einstellung ist die Lücke im echten Lauf bestätigt: Mit `disableAllHooks` und umgelenktem Suchpfad in `settings.local.json` konnte der Projektleiter in der nächsten Sitzung Code schreiben. Ob die verwaltete Einstellung das verhindert, ist **noch nicht live geprüft** – das Einrichten einer verwalteten Einstellung in der Cloud-Testumgebung wurde (zu Recht) von der Sicherheitsprüfung von Claude Code abgelehnt. Die Wirkung beruht auf der Claude-Code-Doku; die Probe in Schritt 5 ist der Nachweis.

Ändert sich der Python-Pfad oder verschiebst du das Repo, die Datei neu erzeugen. Hinweis: Unter WSL ist der entsprechende Ordner vom Benutzer beschreibbar und schützt dort nicht.

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
- Optional später die **Sandbox** von Claude Code: Sie sperrt auf Betriebssystemebene und schließt die Shell-Lücke, läuft aber nur unter Linux, macOS und WSL2 (nicht unter normalem Windows). Unter Windows hilft stattdessen die CI-Vorlage `vorlagen/ci-github.yml`: GitHub prüft bei jedem Push die Tests und Schranken auf einem Rechner, an den kein Agent herankommt.

## 11. Senior-Qualitätsregeln und Grenzen der Autonomie

- Gebaut wird eigenständig, aber auf einem eigenen Branch. Kein Push auf `main`, kein Löschen, keine Datenbank-Migration, kein Release, keine Schlüssel in der Sitzung und keine Daten an externe Dienste ohne dein Ja. Die vollständige Liste steht im Grundgesetz („Grenzen der Autonomie“).
- Technische Grenzen: höchstens drei Entwickler und drei Prüfer gleichzeitig, jeder mit Schrittobergrenze, Nachbesserung höchstens fünf Runden. Große Aufträge werden in Meilensteine mit eigenem Stopp geteilt. Der Stand steht in Dateien (`docs/STATUS.md`), damit nach `/clear` nichts verloren geht.
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
- **Parallele Entwickler** sparen Zeit nur bei wirklich unabhängigen Paketen. Eine Studie von 2026 (CAID) fand das beste Ergebnis bei etwa vier parallelen Entwicklern; mit mehr wurde es wieder schlechter. Wir starten vorsichtig mit **höchstens drei** und erhöhen erst, wenn die eigenen Messwerte (`.dev-team/kennzahlen.jsonl`) es rechtfertigen. Kollidieren zwei beim Zusammenführen, wird das Paket neu gebaut, nicht von Hand geflickt. Das kostet Tokens; der Pragmatiker prüft vorher, ob sich die Parallelität lohnt.
