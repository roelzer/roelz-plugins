# Änderungsprotokoll Dev-Team

## 3.6.1 – Reibung aus dem Pilotlauf (Meilenstein-Ende)

- Live-Kontrolle 27.10.2026: Ohne verwaltete Einstellung lässt sich der Schutz über `settings.local.json` (`disableAllHooks` + umgelenkter `PATH`) für die nächste Sitzung abschalten – bestätigt. Die verwaltete Einstellung selbst ist noch nicht live geprüft (Einrichten in der Testumgebung abgelehnt); Probe für Simon in ANLEITUNG 9a, Schritt 5.

- Heredocs: Inhalt mit Anführungszeichen (`<<'E'`) wird nicht mehr als Befehl gelesen (Backticks in Notizen lösten Sperren aus); ungequotete Heredocs werden auf `$( … )`/Backticks geprüft.
- Python-Heredocs nur zum Rechnen (ohne Datei-, Netz- oder Prozesszugriff) sind für alle Prüfer erlaubt; Shell-Heredocs werden inhaltlich geprüft statt pauschal gesperrt.
- Neues Skript `scripts/fehlerprobe.py`: Prüfer bauen einen Fehler in eine Kopie ein und sehen, ob die Tests ihn finden – ohne selbst Code zu schreiben (Reviewer, Fachprüfer, Tester, Produktprüfer).
- Entwickler dürfen im System-Temp lesen (Sicherungskopien, Hilfsskripte); Temp-Kopien des blinden Laufs bleiben gesperrt.
- `/dev/full`, `/dev/stdout` u. ä. zählen nicht als Schreibziel.
- 221 automatische Tests.

## 3.6.0 – Befunde der Nachprüfung 3.5.0 (Umsetzung von P0/P1 nachgeschärft)

### Warum
Nachprüfung 3.5.0 (6/10, `docs/AUDIT-3.5.0.md`): Der Einstellungsschutz blockierte nur die laufende Sitzung, `env.PATH` konnte den Wächter umlenken, der Mutationstest zählte wegen Bytecode-Cache zu gut, Prüfsummen ließen sich durch Umbenennen/Löschen umgehen, die Fachregel-Abdeckung passte nicht zur eigenen Vorlage, Tester und Architekt durften wieder beliebige Einzeiler.

### Einstellungen und Wächter-Start
- `einstellungs_schutz.py` entfernt die schädlichen Einträge wieder aus der Datei (schützt auch die nächste Sitzung), erkennt `env.PATH`/`PYTHON*`/`CLAUDE_*` u. a., eigene Hooks in lokalen Einstellungen, pauschale Shell-Erlaubnis und Marktplatz-Umlenkung; prüft nur die geänderte Quelle (kein Dauer-Fehlalarm durch alte Benutzereinstellungen).
- Die Test-Schranke ist rot, solange so ein Eintrag existiert (Stolperdraht auch ohne Hooks).
- `waechter.sh` und `einstellungs-schutz.sh` bevorzugen feste Python-Pfade; der Wächter muss einen Einmal-Code zurückgeben, sonst wird blockiert (ein falsches „python“ fällt auf).
- Neu: `scripts/verwaltete_einstellungen.py` erzeugt die verwaltete Einstellung (managed settings) – der einzige Weg, den Wächter dauerhaft gegen Abschalten zu sichern (ANLEITUNG 9a, macht Simon einmal als Administrator). Ist sie eingerichtet, tritt der Plugin-Wächter zurück.

### Schranken
- Mutationstest: ohne Bytecode-Cache (`PYTHONDONTWRITEBYTECODE`, Cache je Mutante gelöscht), neue Mutation „Rückgabe → None“, Windows über Git Bash.
- Prüfsummen: Liste wird gegen ihre erste versionierte Fassung verglichen; gelöschte verdeckte Tests, fehlende Liste (beim Merge/Meilenstein) und am Meilenstein jede nicht unverändert aufgedeckte Fassung (auch unter anderem Namen) sind rot.
- Abdeckung nur über Testnamen (Syntaxbaum bzw. Titel von `it()/test()`), Lastenheft auch mit Überschriften `## A1`. Fachregeln: F- und R-Nummern im Abschnitt „Bestätigt“ (passend zur Vorlage). Mutationspflicht nur mit echtem Werkzeug (`mutationstest.py`, mutmut, Stryker …).
- Blinder Lauf prüft, dass die verdeckten Tests wirklich mitgelaufen sind (Testzahl mit/ohne).

### Wächter
- Einzeiler und Interpreter-Heredocs mit Netz- oder Prozesszugriff (subprocess, urllib, fetch …) sind für alle gesperrt; Architekt gehört nicht mehr zu den Rollen, die nicht prüfbaren Code ausführen dürfen.
- Projektleiter: gesperrt sind `git pull`, `rebase`, `reset` (außer `--keep ORIG_HEAD` und Entstagen), `branch -f`, `switch -C`/`checkout -B`, `update-index` (außer `--refresh`), `remote add/set-url`, Push an andere Ziele als `origin`, `git -c remote.*/branch.*/push.*`.
- Weitere Veröffentlichungswege gesperrt (`yarn npm publish`, `gem push`, `mvn deploy`, `gradle publish`, `python -m twine`, `setup.py upload`, `git send-email`).
- Höchstens 3 Entwickler gleichzeitig jetzt **technisch** (Zählung über das Agenten-Log, `team.json` → `max_parallele_entwickler`).
- Fehlalarme behoben: Projektleiter liest mit `sed -n`/`awk`, Reviewer mit `git archive | tar -t`, `.claude` im Pfad gilt nicht als Claude-Aufruf.

### Doku
- „Stark erschwert“ ersetzt durch „direkter Weg gesperrt, mit eigenem Skript möglich – deshalb Nachweise“; Einstellungsschutz ehrlich (nur mit verwalteter Einstellung dicht); Fachregeln einheitlich F-Nummern.
- 215 automatische Tests.

## 3.5.0 – Maßnahmen P0 und P1 aus dem Systemaudit (von Simon freigegeben)

### Warum
Systemaudit nach Simons Auftrag (`docs/AUDIT-SYSTEM-3.4.0.md`, 6/10): Schutz-Hooks per Programm abschaltbar, Merge-Prüfung bei Fast-Forward blind, Abnahmetests ohne Spur änderbar, Außenwirkung (Push, Veröffentlichen, Hochladen) nicht gesperrt, Prüfberichte nicht gespeichert, Wirksamkeit nicht gemessen. Simon hat P0 1–6, P1 1–4 und „3 parallele Entwickler“ freigegeben; Verschlankung der Rollen erst nach Messung. Dazu Reibung aus dem Pilotlauf.

### P0
1. **Einstellungsschutz:** neuer Hook `ConfigChange` (`scripts/einstellungs_schutz.py`) blockiert Änderungen, die Hooks, Plugin, Workflows oder Freigaben abschalten, und vermerkt ⛔ im Log. Stolperdraht im Grundgesetz: Einstellungsdateien zu Sitzungsbeginn prüfen.
2. **Merge nur mit `--no-ff` und Nachweis:** Der Wächter lässt `git merge` nur mit `--no-ff` zu, nur wenn für den Branch-Kopf ein grüner Schranken-Nachweis vorliegt, nie auf main/master, kein `--continue`. Die Schranke (`--rolle merge`) ist rot, wenn HEAD kein Merge-Commit ist.
3. **Prüfsummen der Abnahmetests** (`scripts/abnahme_pruefsummen.py` → `docs/ABNAHME_PRUEFSUMMEN.txt`, versioniert mit dem Plan). Jede Abweichung ist in der Schranke rot; Neuschreiben nur mit Simons Freigabe.
4. **Keine Außenwirkung:** Nur der Projektleiter pusht, nur `dev-team/…` mit ausdrücklichem Ziel. Gesperrt für alle: Veröffentlichen (npm/pnpm/yarn publish, twine, cargo, nuget), Hochladen/Senden (`curl -d/-F/-T/-X POST`, `wget --post-*`, scp, rsync host:), Cloud- und Server-Werkzeuge (gh, vercel, docker push, ssh …). Zusatz-Werkzeuge (MCP) nur lesend (Erlaubnisliste).
5. **Cloud ehrlich:** ANLEITUNG Abschnitt 7 – in claude.ai-Projekt-Threads gilt das Team nur mit Plugin-Eintrag in den Projekteinstellungen. `.claude/dev-team-start.sh` darf nur einmal angelegt werden.
6. **Testbefehl und Referenzfälle nur von Simon:** `.claude/dev-team.json` darf der Projektleiter nur ausfüllen, solange sie unversioniert ist; Referenzfälle gar nicht. Beides danach nur über `scripts/geschuetzt_schreiben.py` mit Freigabe (Geltung = Zielpfad), protokolliert mit Prüfsumme in `docs/FREIGABEN_LOG.md`.

### P1
1. **Vollständige Prüfberichte** je Agent in `docs/pruefberichte/` (Link im Agenten-Log), Kennzahl je Lauf in `.dev-team/kennzahlen.jsonl`; beides für Agenten gesperrt.
2. **Blinder Lauf der verdeckten Tests nach jedem Merge** (`scripts/verdeckt_blind.py`): meldet nur grün/rot und betroffene Anforderungsnummern, nie Testnamen oder Werte.
3. **Anforderungs-Abdeckung:** Am Meilenstein-Ende ist die Schranke rot, wenn eine Anforderung (A-Nummer) ohne Test ist.
4. **Fachsoftware:** jede bestätigte Fachregel (R-Nummer) braucht einen Test (Eigenschaftstest über viele Eingaben); Mutationstest in `meilensteinbefehle` ist Pflicht. Neues Skript `scripts/mutationstest.py` ohne Zusatzpakete (Python). Erwartete Rechenwerte nur aus Referenzfällen oder unabhängiger Herleitung.

### Weitere
- **Höchstens 3 parallele Entwickler** (vorher 4).
- Reibung aus dem Pilot: `for`/`if`-Schleifen für den Projektleiter, `ReadNotifications` u. a. als harmlos, bauende Rollen (Entwickler, Tester, Architekt) dürfen Hilfsskripte ausführen (Sicherung über Nachweise), Heredoc-Inhalt zählt nicht als Lesezugriff, `cd` in den eigenen Worktree, `git worktree remove --force` für schon zusammengeführte Worktrees.
- Doku ehrlich: „eigenes Skript kann die Shell-Sperren der bauenden Rollen umgehen – Sicherung über Nachweise“.
- 197 automatische Tests.

## 3.4.0 – Befunde der Nachprüfung 3.3.0, Modellwahl

### Warum
Nachprüfung 3.3.0 (7/10, Tendenz 8, `docs/AUDIT-3.3.0.md`): neue Claude-Code-Werkzeuge (`Monitor`, `Workflow`) liefen am Wächter vorbei, weitere Shell-Wege, Merge-Schranke am Meilenstein-Ende fälschlich rot. Simons Wunsch: Modelle je Agent festlegen bzw. pro Aufgabe wählen, um Token zu sparen. Pilotlauf: Hintergrund-Agenten wurden im unbeaufsichtigten Modus nach 10 Minuten abgebrochen.

### Teamzwang und Werkzeuge
- Der Wächter sieht jetzt **alle** Werkzeuge (Matcher `*`). `Workflow` ist gesperrt (zusätzlich `CLAUDE_CODE_DISABLE_WORKFLOWS`, `disableWorkflows`, Sperrregel). `Monitor` wird wie die Shell geprüft. **Unbekannte Werkzeuge sind gesperrt**, bis Simon sie in `team.json` → `harmlose_werkzeuge` aufnimmt. Zusatz-Werkzeuge (MCP), die Befehle ausführen oder Dateien schreiben, sind gesperrt; Agenten des Teams nutzen keine.
- **Modelle:** Standard je Agent in Steckbrief und `team.json` (`modell`), erlaubte Abweichungen in `modelle`. Prüfer, die Qualität absichern, immer Opus; Entwickler Sonnet, Opus bei Bauplan-Schwierigkeit `schwer` und ab Fix-Runde 3; kein Haiku. Der Wächter sperrt andere Modelle; das Modell steht im Agenten-Log. Der Architekt schätzt im Bauplan die Schwierigkeit.

### Shell
- **Erlaubnisliste für den Projektleiter:** Git, Lese- und Dateibefehle, Plugin-Skripte und die Befehle aus `.claude/dev-team.json`. Keine eigenen Skripte (auch nicht im Temp), keine Einzeiler, kein curl.
- Befehlsersetzungen (`$( … )`, Backticks, `<( … )`) werden mitgeprüft, auch in Anführungszeichen. Zeilenumbrüche trennen Befehle. Heredocs nur außerhalb von Anführungszeichen (getarnter Heredoc geschlossen). `cd` im selben Befehl und fest zugewiesene Variablen werden berücksichtigt.
- `git -c alias./core./…` gesperrt; Entwickler ohne `git -C/--git-dir/--work-tree`. Weitere Git-Sperren: Push auf `refs/heads/main`, `--all`, `branch -d -f`, `checkout -f`, `switch --discard-changes`, `stash drop/clear`, `worktree remove --force`, `reflog expire`, `gc --prune`.
- Schreibziele von `curl -o`, `wget -O`, `sort -o` u. a., `<>`-Umleitung; Editoren, `script -c`, `setsid` & Co.; mehr Einzeiler-Muster (`os.open`, `copyFileSync`, `pathlib` …); PowerShell `[IO.File]` u. ä.; `uv run --with`, `uvx --from`, `pip install <datei>`.
- Entwickler schreibt nur im eigenen Worktree; Lesen über Elternordner (`/`, oberhalb von HOME, `..`) gesperrt.
- `~/.claude/CLAUDE.md` nur über `scripts/claude_md_block.py`; Sitzungsstart gibt das Grundgesetz mit, wenn die Verknüpfung fehlt. `settings_zusammenfuehren.py` schreibt nur `.claude/settings.json`.

### Schranken
- Merge-Prüfung mit `--basis HEAD^1` (nur das Paket); Planungsstand wird vor der Meilenstein-Basis committet.
- Tests, die das Testwerkzeug verändern (assert-Methoden überschreiben, `except AssertionError`, `sys.exit`/`os._exit`, `setattr` auf unittest/pytest), und geänderte Testeinstellungen in `pyproject.toml`/`package.json` durch Entwickler sind rot.
- Bei geändertem Manifest/Lockfile läuft die Abhängigkeits-Schranke automatisch. `overrides`/`resolutions` werden geprüft, Lockfile-Adressen außerhalb der offiziellen Registry sind rot.
- Warnung bei Basis = HEAD und bei Fachsoftware ohne Mutationstests.
- Fertig-Prüfung: Satzzeichen, Pfade in Backticks (mit Leerzeichen), `/c/…`, nur der eigene Worktree.

### Sonstiges
- Projektvorlage: `CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS=0` (Hintergrund-Agenten werden in unbeaufsichtigten Läufen nicht mehr abgebrochen).
- CI-Vorlage `vorlagen/ci-github.yml`: Schranken laufen bei GitHub, außerhalb der Reichweite der Agenten.
- Doku ehrlich: Sandbox nur unter Linux/macOS/WSL2; Schritt 7 mit `Monitor` und getarntem Heredoc.
- 176 automatische Tests.

## 3.3.0 – Restpunkte aus Audit 3.1.0

- Schranke erkennt Tests ohne echte Prüfung: nur Konstanten (`assert True`, `expect(true).toBe(true)`, `assert.equal(a, a)`) oder `return` vor der ersten Prüfung (Python per Syntaxbaum).
- Testkonfiguration (auch neue, z. B. `conftest.py` mit `collect_ignore`) legt nur der Tester an.
- Prüfer dürfen Git nur lesen (kein commit, merge, stash, tag, checkout -b, config).
- Skills mit eigenem Agenten (`context: fork`) aus anderen Quellen sind gesperrt (Wächter prüft jetzt auch das Skill-Werkzeug).
- Abhängigkeits-Schranke: Tippfehler-Namen bekannter Pakete (Typosquatting) sind rot.
- Windows: Testbefehle laufen über Git Bash statt cmd.exe.
- Cloud-Start: `plugin_stand` in `.claude/dev-team.json` nagelt den Dev-Team-Stand fest; ohne Angabe Warnung.
- Reviewer: Datenmodell/Typen (ungültige Zustände), Kommentare noch wahr, Verlauf der geänderten Stellen (Pflichtfrage 12).
- Vorlage: Mutationstests (mutmut/Stryker) als empfohlener Zusatzbefehl im Profil fachsoftware.
- 152 automatische Tests.

## 3.2.0 – Befunde der Nachprüfung 3.1.0 behoben

### Warum
Nachprüfung durch einen frischen Auditor (7/10, `docs/AUDIT-3.1.0.md`): zwei von mir in 3.1 neu verursachte Fehler (Merge-Schranke immer rot, Freigabe per Teilwort) und weitere Umgehungswege.

### Schranken
- Neue Rolle `merge` für die Prüfung nach jedem Zusammenführen: Entwickler-Regeln, aber die Prozessdateien des Projektleiters zählen nicht. Rücknahme mit `git reset --keep ORIG_HEAD`.
- Freigaben: Format `Datum | Stichwort | Geltung | Grund`, Stichwort muss genau passen, Freigabe gilt nur für die genannten Pfade bzw. Prüfungen (`testzahl`, `uebersprungen`). Vorlage auskommentiert.
- Testkonfiguration (conftest.py, pytest.ini, vitest/jest/playwright-Konfiguration …) ist ein eigener Bereich: bestehende ändert nur der Tester.
- Nachweise (Agenten-Log, Testnachweis, Schranken-Nachweise) kann kein Agent schreiben.
- Im Worktree muss die Basis der Abzweigpunkt sein (das ganze Paket wird geprüft, nicht nur der letzte Commit).
- Fertig-Prüfung: Worktree-Pfad muss im Bericht stehen, der Worktree sauber committet sein und der Nachweis zu dessen aktuellem Stand passen. Höchstens zwei Zurückweisungen, dann „NICHT belegt“ im Log.
- Abhängigkeits-Schranke: umgelenkte Paketquellen (`.npmrc`, `pip.conf`, `uv`-/`poetry`-Index in `pyproject.toml` …) sind rot; aufgeweichte feste Versionen eine Warnung.

### Wächter
- Hüllen werden geprüft oder gesperrt: `bash -c` (Inhalt wird mitgeprüft), `eval`, `source`, Befehl aus Variable, Pipe oder Heredoc in einen Interpreter, `find -delete`, `xargs rm`, `tar x`, `unzip`, `patch`, `awk -i inplace`, `cp -t`, `git checkout <ref> <pfad>`.
- Plugin-Skripte gelten nur als erlaubt, wenn sie der einzige Befehl sind. Der Projektleiter führt keine Skripte aus dem Projekt aus.
- `python -m pip install`, `npx`/`bunx`/`uvx`/`pnpm dlx`/`npm exec`/`pipx run` nur mit Paketen aus `package.json`.
- Gesperrt: `git clean`, `git reset --hard` (außer Entwickler im eigenen Worktree), `git branch -D`, Push auf main/master, `--force`, `+branch`, `:branch`.
- Windows-Pfade im Git-Bash-Format (`/c/…`) werden erkannt. Der Projektleiter schreibt außerhalb des Projekts nur `~/.claude/CLAUDE.md`, `~/.claude/dev-team/`, das Baukasten-Repo und das System-Temp.
- Im Plugin-Ordner sind nur `wissen/lessons.md` und `wissen/fachwissen/` beschreibbar.
- Entwickler-Lesesperre: auch Grep/Glob außerhalb des Worktrees, absolute Muster, `cd ..`, Platzhalter in versteckten Ordnern und das Home-Verzeichnis.

### Sonstiges
- Sitzungsstart nennt das feste Team wieder (liest `team.json` per Python).
- Reviewer prüft die Projektregeln aus `CLAUDE.md` (Pflichtfrage 11). Entwickler hat eine Liste „Ausreden, die nicht zählen“ (Idee Superpowers).
- ANLEITUNG ehrlich: Lesesperre „stark erschwert, nicht unmöglich“; Schritt 7 um `bash -c` und `/c/…`-Pfad ergänzt.
- 145 automatische Tests.

## 3.1.0 – Vorbilder übernommen, Audit-Befunde behoben

### Warum
Audit 3.0.0 (unabhängiger Auditor, 6/10) und Simons Wunsch: die Agententexte mit den besten Ideen aus öffentlichen Agenten-Projekten bauen, mehrere Entwickler für mehr Tempo, ein Architekt, der den Code vorher plant. Vergleich und Herkunft: `docs/VORBILDER.md`.

### Agenten
- **Architekt** plant jetzt konkret: Architektur-Rückgrat mit Festlegungen „bindet / verhindert / Regel“ (Idee BMAD), Bauplan je Paket mit exakten Schnittstellen „nutzt / liefert“ und Prüf-Schwerpunkt (Idee Superpowers), tragende Entscheidungen mit Alternativen für Simon, Websuche für aktuelle Versionen.
- **Entwickler**: fester Status FERTIG / FERTIG_MIT_BEDENKEN / BLOCKIERT / BRAUCHT_KONTEXT, ausdrückliche Abbruchgründe, strenges „erst roter Test“, Regeln für gute Tests, Ursache vor Behebung, keine KI-Notizen im Code, Schranke nach dem Commit.
- **Reviewer**: „Glaub dem Bericht nicht“, fehlt / zu viel / missverstanden, Prüffragen für verschluckte Fehler (Idee Anthropic), Kalibrierung der Schwere, Stärken zuerst, neuer Modus `nachpruefung` (behoben / nicht behoben), führt die Schranke mit `--rolle entwickler` selbst aus.
- **Tester**: Standardfälle in jedem Auftrag (Idee wshobson), Testlücken nach Wichtigkeit 1–10, Hinweis auf Sonderfall-Code beim Aufdecken.
- Kritiker prüft Baupläne und still getroffene Entscheidungen; Produktprüfer prüft Grundlagen der Barrierefreiheit.

### Ablauf
- Stufe Klein mit Reviewer und kurzer Bestätigung durch Simon; Abwägungsrunde bei Normal immer.
- Bis zu 4 parallele Entwickler (CAID-Studie), Fix-Schleife bis 5 Runden mit frischem Entwickler ab Runde 4, kleine Befunde gesammelt.
- „Entscheiden statt stehen bleiben“ mit `docs/ENTSCHEIDUNGEN.md`; im Bericht vollständige Liste „Entscheidungen, die ich für dich getroffen habe“.
- Nach jedem Merge Schranke mit `--rolle entwickler` gegen die Meilenstein-Basis (unabhängige Prüfung, dass kein Entwickler Tests geändert hat).

### Technik (Audit-Befunde)
- Wächter v2: UTF-8 erzwungen (Windows), interner Fehler oder unlesbare Eingabe blockiert, `onFailure: block`, PowerShell überwacht.
- Shell-Prüfung: Umleitungen, `tee`, `sed -i`, `cp`, `mv`, `rm`, `touch`, `git checkout/restore/rm/mv/apply`, Skript-Einzeiler mit Schreibzugriff, `claude`-Aufrufe, Paket-Installationen per Befehl, Schutzschalter.
- Identität: lokal nur `dev-team:`-Agenten; ohne Präfix nur mit Cloud-Kopie. Isolation des Entwicklers nicht abschaltbar.
- Entwickler liest nur in seinem eigenen Worktree; darf seine im Paket neuen Tests weiter bearbeiten.
- Einstellungsdateien nur über `settings_zusammenfuehren.py` (nur mit Plugin-Vorlagen), `.claude/dev-team.json` nicht löschbar, Freigaben nur aus `.claude/freigaben.md` (nur Simon).
- Test-Schranke: weitere Skip-Varianten, übersprungene Tests im Lauf, Tests ohne Prüfung, Änderung der Teamkonfiguration, Nachweis je Commit.
- SubagentStop-Hook `fertig_pruefung.py`: „FERTIG“ ohne Schranken-Nachweis wird zurückgewiesen.
- Abhängigkeits-Schranke: direkte Quellen (git, URL, github:, npm-Alias), pyproject mit `tomllib` inkl. Extras und optionaler Gruppen, NuGet, Warnung bei ungeprüften Paketsystemen.
- `.gitattributes` (LF für Skripte), `.pyc` entfernt.
- Plugin-Tests: 120+.

### Ehrliche Grenzen
- Shell-Umgehungen sind stark erschwert, nicht unmöglich (z. B. eigene Skripte). Erkannt werden veränderte Tests, Referenzwerte und Einstellungen nachträglich; Projektleiter-Code per Skript nicht.
- Windows ist nachgestellt getestet (Kodierung), nicht auf echtem Windows.
- Alle Agenten nutzen Claude-Modelle und teilen blinde Flecken.

## 3.0.0 – Festes Team, Teamzwang, Entwickler und Architekt

### Warum
Simons Vorgaben (26.10.2026): Es wird immer genau im festen Team gearbeitet – der Projektleiter erstellt keine Helfer. Aufgaben fester definieren, klar trennen, wer eigenständig ist und was zusammengelegt wird. Mehrere Entwickler bei mehreren Aufgaben, ein Architekt für sauberen Aufbau, alle Tests grün, eigener Test-Agent. KI-Schwachstellen in der Softwareentwicklung abdecken; gute Ideen aus fremden Agenten-Repos übernehmen.

### Neu
- **Teamzwang technisch:** `team.json` als einzige Teamliste; Wächter-Hook `scripts/waechter.py` blockiert eingebaute Helfer, Agenten ohne Namen, fremde und erfundene Agenten, Teammates, Agenten, die Agenten starten, und das Überschreiben des Modells. Zusätzlich Sperrregeln in `vorlagen/projekt-settings.json` (`Agent(Explore)` …, Verschachtelung aus).
- **Schreibrechte technisch:** Code nur Entwickler; Tests nur Tester und (neue) Entwickler; Architektur nur Architekt; Referenzfälle ändert niemand; Projektleiter schreibt nur Projektunterlagen. Agenten-, Skill- und Hook-Dateien kann niemand anlegen. Wartungsmodus nur über `DEV_TEAM_WARTUNG=1`, das Claude nicht setzen kann.
- **Agent `entwickler`:** ein Paket pro Aufruf, eigener Git-Worktree, testgetrieben, bis zu drei parallel bei überschneidungsfreien Paketen.
- **Agent `architekt`:** Struktur, Abhängigkeitsrichtung, Paketschnitt, `docs/ARCHITEKTUR.md`, Architekturtests; Strukturprüfung je Meilenstein.
- **Verdeckte Abnahmetests:** Tester schreibt sie vor dem Bauen; für den Entwickler gesperrt.
- **Paket-Review vor jedem Merge** in zwei Stufen (Plan-Treue, dann Qualität) – Idee aus obra/superpowers.
- **Test-Schranke** `scripts/pruefe-tests.sh`: alle Tests und Zusatzbefehle grün, keine skip/only, keine geänderten Referenzfälle, keine gelöschten Tests, Testzahl sinkt nicht, keine 0-Tests-Läufe, Entwickler ändert keine bestehenden Tests; Nachweis in `docs/TESTNACHWEIS.md`.
- **Abhängigkeits-Schranke** `scripts/pruefe-abhaengigkeiten.sh` gegen erfundene und frisch registrierte Pakete (npm, PyPI), Lockfile-Pflicht.
- **Steckbrief für jeden Agenten:** Wann · Bekommt / bekommt nicht · Darf / darf nicht · Pflichtfragen · Ausgabe · Fertig, wenn. Sicherheit 0–100 pro Befund, unter 80 nicht in der Befundliste – Idee aus Anthropics code-review-Plugin.
- **Profile** `fachsoftware` und `web` in `.claude/dev-team.json`, neue Vorlagen `dev-team.json`, `architektur.md`.
- Produktprüfer mit Screenshots Desktop + Handy; Betriebs-Checkliste in `uebergabe`; Abschnitt KI-Schwächen in der Sicherheits-Checkliste.
- `scripts/settings_zusammenfuehren.py` für bestehende Projekte; Teamnachweis im Abschlussbericht.
- Plugin-Tests in `tests/` (Wächter, Schranken, Vorlagen, Steckbriefe), in `pruefe-plugin.sh` eingebunden.

### Geändert
- `rechercheur` und `quellenpruefer` zusammengelegt (Modi `recherche` und `gegenpruefung`, immer getrennte Aufrufe).
- Projektleiter baut und prüft nicht mehr selbst, auch nicht bei Stufe Klein.
- Skill `architekt` heißt jetzt `loesungsweg` (Verwechslung mit dem Agenten vermeiden).
- Grundgesetz, Team-Protokoll, Anleitung, `auftrag` neu gefasst.

### Ehrliche Grenzen
- Über die Shell kann der Projektleiter Dateien trotz Sperre ändern; das ist verboten und wird von Test-Schranke, Reviewer und Teamnachweis erkannt, aber nicht technisch verhindert.
- Es gibt Fehlermeldungen (April 2026), dass Hook- und Berechtigungs-Sperren für Agenten-Aufrufe nicht immer griffen. Deshalb doppelte Sperre und Pflicht-Test auf Simons Rechner (Anleitung, Abschnitt 9, Schritt 7).
- Skills Dritter, die selbst einen Agenten mitbringen, laufen eventuell an der Agenten-Sperre vorbei; deshalb fremde Skills nur nach `/tool-scout:scout check`.
- Alle Agenten nutzen Claude-Modelle und teilen blinde Flecken. Mechanische Prüfungen und menschliche Abnahme bleiben nötig.


## 2.4.0 – Senior-Entwicklungsprozess

### Änderungen
- Agentenbeschreibungen für alle bestehenden Dev-Team-Rollen präzisiert: Auftrag, Grenzen, Evidenz, Ampel und Ausgabeformat.
- Neuen unabhängigen Agenten `sicherheitspruefer` ergänzt.
- `auftrag` als risikobasierte Projektleitungs-Pipeline überarbeitet: klare Stufen, Freigabegrenzen, Qualitätsgates, Umgang mit Befunden und Abschlussnachweise.
- Sicherheits-Checkliste erweitert für Desktop-Apps, Tauri, zentrale APIs, Datenbankmigrationen, Updates, Supply Chain und KI-gestützte Entwicklung.
- Reviewer und Tester klarer getrennt: Tester weist Verhalten nach; Reviewer beurteilt den tatsächlichen Diff und technische Qualität; Produktprüfer nimmt Anforderungen aus Nutzersicht ab; Sicherheitsprüfer prüft Angriffswege und Datenschutz.

### Wichtige Hinweise
- Diese Regeln verbessern den Prozess, garantieren aber keine Fehlerfreiheit oder vollständige Sicherheit.
- Agenten können ähnliche blinde Flecken haben; unabhängige Tests, fachlich belastbare Referenzwerte und menschliche Prüfung kritischer Entscheidungen bleiben erforderlich.
- `sicherheitspruefer` wird für größere sicherheitsrelevante Änderungen eingeplant; die Verfügbarkeit hängt von der korrekt installierten Plugin-Version ab.
- Vor dem Update den bestehenden Plugin-Ordner bzw. das Git-Repository sichern und nach dem Update Claude Code/VS Code neu starten, damit die aktualisierten Agenten geladen werden.

## 2.4.1 – Änderungen nach dem Audit (docs/AUDIT-2.4.0.md)
- `auftrag`: feste Stopps bei Anforderungen, Freigabe und Bericht wiederhergestellt; Sichtbarkeit, offene Fragen, Lektionsvorschläge, harte Stopps, „Fachregel erst rot“, Tester-Isolation und Baukasten-Prüfung wieder drin; Meilensteine, „nur analysieren“-Modus, Wiederaufnahme nach Kontextverlust neu.
- Grundgesetz: eine einzige Stufen-Definition mit Risiko-Auslösern; Abschnitte „Fertig heißt belegt“, „Grenzen der Autonomie“, „Große Aufträge und Kontextverlust“; Sicherheitsprüfer aufgenommen; falschen Satz „Fachprüfer holt Rechercheur“ korrigiert.
- Alle Agenten: Lessons und Fachwissen lesen, Ampel und einfache Sprache, „nicht geprüft“ ehrlich benennen, `maxTurns`. Tester: Fachregeln über erzeugte Fälle wieder genau beschrieben.
- Neu: Agent `auditor`, Skill `audit`, Selbstprüfskript `scripts/pruefe-plugin.sh`.
- Sicherheits-Checkliste: Abschnitt Mehrbenutzer, Datenintegrität und Migration.
- Cloud-Start: Variable `DEV_TEAM_REF` zum Festnageln auf einen geprüften Stand; Repo ist öffentlich, README und Anleitung angepasst.
- Tote Verweise auf ein nicht mitgeliefertes Firmen-Plugin entfernt; `TEAM-PROTOKOLL.md` enthält keine zweite Stufen-Definition mehr.
