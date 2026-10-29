# Dev-Team – Anleitung

Stand: Oktober 2026 · Version 3.11

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
| **Gastgeber** | bei großen Aufträgen mit Nutzern (vor und nach dem Bauen) oder auf Zuruf | **denkt an das, woran du nicht denkst** – wie ein 5-Sterne-Hotel oder Emirates: geht die ganze Nutzerreise durch (erster Start, Höhepunkt, Fehler, Abschluss, Weitergeben), greift Nebensätze aus dem Lastenheft auf und schlägt höchstens drei Wow-Momente vor, je mit Aufwand und Prüfkriterium. Du wählst aus; Gewähltes wird eine normale Anforderung mit Test. Fehlende Grundfunktionen meldet er getrennt als Lücke. Auch einzeln: `/dev-team:wow` |
| **Produktprüfer** | zum Schluss | jede Anforderung mit Nachweis abnehmen, Anwendung starten, Screenshots Desktop und Handy |
| **Auditor** | auf Wunsch (`/dev-team:audit`) | prüft das Team oder ein Projekt unabhängig, bewertet 1–10; behebt selbst nichts |
| Tool-Scout | wenn du willst | fremde Plugins/Skills prüfen, bevor du sie installierst |

**Woher die Regeln kommen:** Die Agententexte bauen auf den stärksten öffentlichen Vorbildern auf (vor allem Superpowers und BMAD, dazu Ideen aus Anthropics Plugins). Was übernommen wurde und was bewusst nicht: [docs/VORBILDER.md](docs/VORBILDER.md).

**Warum so geschnitten:** Eigenständig ist, wer einen eigenen Blickwinkel hat, andere Rechte braucht oder vom Ersteller unabhängig sein muss. Rechercheur und Quellenprüfer waren dieselbe Sicht und sind jetzt ein Agent mit zwei Modi. Übergabe und Betrieb sind eine Checkliste, kein Agent.

## 2. Das feste Team und der (minimale) Wächter

Es arbeitet das feste Team aus `team.json`; wer was macht und schreibt, steht im Grundgesetz. Seit 3.11 ist das **Regel und Protokoll, keine Sperre** – das Team soll dir Arbeit abnehmen, nicht sich selbst blockieren. Im Agenten-Log siehst du, wer gearbeitet hat.

Der **Wächter** (`scripts/waechter.sh`, reines Bash, kein Python) prüft nur noch zwei Dinge, und nur bei Entwickler und Tester:
1. **Entwickler und Tester reden nicht miteinander:** Sie starten keine Agenten und schicken keine Nachrichten. Ergebnisse gehen über ihren Bericht an den Projektleiter.
2. **Der Entwickler ändert keine bestehenden Tests**, Testkonfigurationen oder Referenzwerte (neue darf er anlegen und weiter bearbeiten) und rührt die **verdeckten Abnahmetests** unter `.dev-team/` nicht an.

Für alle anderen Aufrufe endet er sofort. Kann er nicht laufen (Last, fehlende Datei), wird nichts blockiert.

Was es außerdem gibt, ohne zu bremsen:
- Die **Test-Schranke** nach jedem Paket und Merge erkennt geänderte Tests und Referenzwerte – auch wenn jemand sie über die Shell geändert hat.
- **Sperrregeln in den Projekteinstellungen:** kein Force-Push, kein Push auf main, keine Geheimnisse (`.env`, Schlüssel) lesen. Noch stärker: auf GitHub für `main` den Branch-Schutz einschalten.
- **Prüfsummen und blinder Lauf** der verdeckten Tests, Reviewer, Teamnachweis im Abschlussbericht.

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
  Vorher holt das Skript den neuesten Stand (`git pull`), danach committet und pusht es. Auch jeder Sitzungsstart holt das Gehirn zuerst von GitHub (höchstens 8 Sekunden). So hat der zweite Laptop neue Lektionen sofort, selbst wenn Obsidian dort geschlossen ist. Zugangsdaten und Wörter aus der Notiz „Sperrwörter“ im Gehirn werden geblockt (dort steht z. B., dass Firmenwissen deines Arbeitgebers draußen bleibt). Ohne Gehirn (Cloud, fremder Rechner) sammelt der Projektleiter alles in `docs/GEHIRN_NACHTRAG.md`.
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
- Kann eine Cloud-Sitzung das Dev-Team nicht laden (Repo `roelz-plugins` fehlt in der Umgebung), arbeitet sie normal weiter, nur ohne Team-Agenten und Protokoll. Abhilfe: `roelzer/roelz-plugins` in der Cloud-Umgebung hinzufügen.
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

**Voraussetzungen:** Claude Code ab Version 2.1.295, Git für Windows (ab 2.31, mit Git Bash – ohne Git Bash laufen die Hooks nicht), **Python 3** im PATH (python.org, Haken bei „Add python.exe to PATH“; brauchen Test-Schranke und Prüfskripte), VS Code mit der Claude-Code-Erweiterung, Zugriff auf dein GitHub-Konto.

1. **Marktplatz von GitHub hinzufügen** (gilt auf jedem Rechner gleich, das Repo ist öffentlich):
   ```
   claude plugin marketplace add roelzer/roelz-plugins
   ```
2. **Plugins installieren:**
   ```
   claude plugin install dev-team@roelz-plugins
   claude plugin install tool-scout@roelz-plugins
   claude plugin install dev-team-tafel@roelz-plugins
   ```
   **Automatische Updates einschalten:** in Claude Code `/plugin` → Marketplaces → `roelz-plugins` → Auto-update aktivieren. Dann holt jeder Rechner neue Versionen beim Start selbst; ein Update-Befehl ist nicht nötig (von Hand: `claude plugin marketplace update roelz-plugins`). Neue Versionen werden nur erkannt, wenn die Versionsnummer in `plugin.json` steigt, das tut sie bei jeder Änderung.
   **Lektionen und Wissen** landen im Gehirn (`roelzer/brain`), nicht mehr im Plugin-Ordner. Deshalb braucht es keinen lokalen Klon mehr; das Gehirn richtest du in Schritt 4 pro Rechner ein.
   *Bisher eingerichtet mit lokalem Ordner?* Einmal pro Rechner umstellen: `claude plugin marketplace remove roelz-plugins`, dann Schritt 1 und 2. Danach darfst du den alten Ordner löschen, sofern dort nichts Ungespeichertes liegt.
3. **VS Code komplett schließen und neu öffnen.** Plugins werden nur beim Start geladen.
4. **Einrichten:** Claude Code starten und eingeben:
   - privater Rechner: `/dev-team:einrichten privat`
   - Arbeitsrechner: `/dev-team:einrichten arbeit` (Lektionen bleiben dann lokal und fließen nicht ins private Repo)
   - Der Projektleiter fragt dabei nach dem Ordner deines Gehirns (lokaler Klon von `roelzer/brain`, z. B. `C:/Users/<du>/roelz-brain`). Damit liest und schreibt das Team ab dann dort.
5. **Noch einmal neu starten.** Fragt Claude, ob verknüpfte Dateien geladen werden dürfen: zustimmen.
6. Prüfen: `/agents` zeigt die Dev-Team-Agenten mit `dev-team:` davor.
7. **Wächter kurz ausprobieren** (in einem Testprojekt): Claude bitten „Lass einen Entwickler die bestehende Datei tests/… ändern“ → muss mit ⛔ blockiert werden; „Lass den Entwickler einen neuen Test anlegen“ → muss laufen.

## 10. Updates

Wird am Dev-Team etwas geändert (neue Regel, neuer Agent), landet es auf GitHub. Mit eingeschaltetem Auto-Update (Schritt 9.2) holt jeder Rechner die neue Version beim Start selbst. Von Hand:
```
claude plugin marketplace update roelz-plugins
claude plugin update dev-team@roelz-plugins
```
Danach VS Code neu starten.

**Nach dem Update auf 3.11 einmal je Projekt:** `/dev-team:projekt-aufnehmen` ausführen. Es bringt die Projekteinstellungen auf den neuen Stand (minimaler Wächter, alte Sperren wie die gegen eingebaute Helfer oder `git push origin main*` – die auch Branches wie `main-1tg5m0` traf – werden entfernt) und zeigt dir die Änderung vorher. Auf jedem Rechner zusätzlich einmal `/dev-team:einrichten` (privat bzw. arbeit), damit Worktrees überall vom aktuellen Stand starten.

**Bestehende Projekte auf Version 3 umstellen:** im Projekt `/dev-team:projekt-aufnehmen` ausführen. Es legt `.claude/dev-team.json` an und zeigt dir die Änderungen an `.claude/settings.json` (Teamzwang, Worktrees), bevor es sie schreibt.

**Am Team selbst arbeiten** (Agenten, `team.json`, Hooks ändern): im Repo-Ordner ändern, danach die Plugin-Tests laufen lassen: `python3 -m unittest discover -s plugins/dev-team/tests`.

## 10a. Freigaben für stundenlanges eigenständiges Bauen

Damit der Lauf nicht bei der ersten Rückfrage stehen bleibt, braucht Claude Code die Erlaubnis für die üblichen Befehle. Empfehlung:
- **Auto-Modus** von Claude Code (ein Prüfmodell entscheidet über Rückfragen) oder eine **Erlaubnisliste** in deinen Benutzereinstellungen für die Befehle, die das Projekt braucht (z. B. `Bash(npm test)`, `Bash(npm ci)`, `Bash(npm run *)`, `Bash(npx *)`, `Bash(curl *localhost*)`, `Bash(git status)`, `Bash(git merge *)`, `Bash(git worktree *)`, dazu die Browser-Werkzeuge `mcp__Claude_Browser`). Die eigentliche Sperre ist der Wächter; seit 3.11 sperrt er nur noch Schadensfälle.
- **Laptop nicht schlafen lassen,** solange ein Lauf arbeiten soll (Windows: Energieoptionen → „Nie“ im Netzbetrieb, oder einmalig `powercfg /change standby-timeout-ac 0`). Endet die Sitzung (App zu, Laptop aus), stehen die Agenten bis zur nächsten Sitzung. Echte Nachtarbeit geht nur als **Cloud-Sitzung/Routine** auf GitHub – das richten wir gezielt ein.
- **Nicht** `bypassPermissions`: Dann fallen alle Rückfragen weg, auch für Befehle außerhalb des Projekts.
- Optional später die **Sandbox** von Claude Code: Sie sperrt auf Betriebssystemebene und schließt die Shell-Lücke, läuft aber nur unter Linux, macOS und WSL2 (nicht unter normalem Windows). Unter Windows hilft stattdessen die CI-Vorlage `vorlagen/ci-github.yml`: GitHub prüft bei jedem Push die Tests und Schranken auf einem Rechner, an den kein Agent herankommt.

## 11. Senior-Qualitätsregeln und Grenzen der Autonomie

- Gebaut wird eigenständig, aber auf einem eigenen Branch. Kein Push auf `main`, kein Löschen, keine Datenbank-Migration, kein Release, keine Schlüssel in der Sitzung und keine Daten an externe Dienste ohne dein Ja. Die vollständige Liste steht im Grundgesetz („Grenzen der Autonomie“).
- Technische Grenzen: höchstens drei Entwickler und drei Prüfer gleichzeitig, jeder mit Schrittobergrenze, Nachbesserung höchstens fünf Runden. Große Aufträge werden in Meilensteine mit höchstens 5 Paketen geteilt; deine Freigabe gilt für alle, angehalten wird nur bei Rot oder harten Stopps. Der Stand steht in Dateien (`docs/STATUS.md`), damit nach `/clear` nichts verloren geht.
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
