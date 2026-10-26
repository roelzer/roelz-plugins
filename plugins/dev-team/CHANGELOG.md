# Änderungsprotokoll Dev-Team

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
