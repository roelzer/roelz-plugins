# Dev-Team 2.4.0 – Senior-Entwicklungsprozess

## Änderungen
- Agentenbeschreibungen für alle bestehenden Dev-Team-Rollen präzisiert: Auftrag, Grenzen, Evidenz, Ampel und Ausgabeformat.
- Neuen unabhängigen Agenten `sicherheitspruefer` ergänzt.
- `auftrag` als risikobasierte Projektleitungs-Pipeline überarbeitet: klare Stufen, Freigabegrenzen, Qualitätsgates, Umgang mit Befunden und Abschlussnachweise.
- Sicherheits-Checkliste erweitert für Desktop-Apps, Tauri, zentrale APIs, Datenbankmigrationen, Updates, Supply Chain und KI-gestützte Entwicklung.
- Reviewer und Tester klarer getrennt: Tester weist Verhalten nach; Reviewer beurteilt den tatsächlichen Diff und technische Qualität; Produktprüfer nimmt Anforderungen aus Nutzersicht ab; Sicherheitsprüfer prüft Angriffswege und Datenschutz.

## Wichtige Hinweise
- Diese Regeln verbessern den Prozess, garantieren aber keine Fehlerfreiheit oder vollständige Sicherheit.
- Agenten können ähnliche blinde Flecken haben; unabhängige Tests, fachlich belastbare Referenzwerte und menschliche Prüfung kritischer Entscheidungen bleiben erforderlich.
- `sicherheitspruefer` wird für größere sicherheitsrelevante Änderungen eingeplant; die Verfügbarkeit hängt von der korrekt installierten Plugin-Version ab.
- Vor dem Update den bestehenden Plugin-Ordner bzw. das Git-Repository sichern und nach dem Update Claude Code/VS Code neu starten, damit die aktualisierten Agenten geladen werden.
