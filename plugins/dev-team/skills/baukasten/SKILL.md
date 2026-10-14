---
name: baukasten
description: Wiederverwendbare Bausteine (z. B. Login, Excel-Import, PDF-Export, Projektvorlagen) finden, einsetzen und neue sicher hinzufügen – ohne dass Kundendaten in andere Projekte gelangen. Nutzen vor dem Bau neuer Funktionen und nach Projektabschluss.
---

# Baukasten

Der Baukasten ist ein **eigenes Git-Repo**, getrennt von allen Kundenprojekten. Sein Pfad steht in `~/.claude/CLAUDE.md`, Block „dev-team“, Zeile `Baukasten:`. Fehlt die Zeile, gibt es noch keinen Baukasten: Simon anbieten, ihn anzulegen (siehe unten), und ohne ihn weiterarbeiten.

## Struktur des Baukasten-Repos
```
baukasten/
  README.md            ← Übersicht aller Bausteine (Name, Zweck, Technik, Stand)
  bausteine/
    <name>/
      README.md        ← Wofür, wie einbauen, Abhängigkeiten, Grenzen
      src/ …
      tests/ …
  projektvorlagen/     ← fertige Startgerüste je Projekttyp (Web-App, Excel-Add-In, …)
```

## Baustein suchen und einsetzen
1. `README.md` des Baukastens lesen, passende Bausteine nennen.
2. Baustein ins Projekt **kopieren** (nicht verlinken), an das Projekt anpassen.
3. Die Tests des Bausteins mitnehmen und im Projekt laufen lassen.

## Neuen Baustein hinzufügen – nur mit Freigabe
1. Kandidat erkennen: Code, der in mindestens einem weiteren Projekt nützlich wäre.
2. Allgemein machen: Kundennamen, Firmenlogik, echte Werte, Pfade und Zugangsdaten entfernen; Konfiguration über Parameter.
3. Agent `reviewer` mit dem Auftrag „Baukasten-Prüfung“ aufrufen. Nur bei ✅ weiter.
4. Mit README und Tests in den Baukasten legen, Übersicht ergänzen, committen.
5. Simon zeigen, was aufgenommen wurde.

## Rechtlicher Hinweis
Code, der im Rahmen eines Kundenauftrags oder einer Anstellung entsteht, kann dem Kunden bzw. Arbeitgeber gehören. In den privaten Baukasten gehört nur, was Simon nutzen darf – im Zweifel nachfragen. Im Modus „arbeit“ nichts in den privaten Baukasten übernehmen.

## Baukasten anlegen (einmalig)
Ordner `baukasten` neben den Projekten anlegen, obige Struktur und README erstellen, `git init`, privat auf GitHub ablegen. Dann den Pfad als Zeile `Baukasten: <absoluter Pfad>` in den Block „dev-team“ von `~/.claude/CLAUDE.md` eintragen.
