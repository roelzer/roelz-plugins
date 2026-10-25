# Änderungsprotokoll Dev-Team

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
