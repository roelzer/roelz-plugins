# Änderungsprotokoll Dev-Team

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
