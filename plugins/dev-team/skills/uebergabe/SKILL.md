---
name: uebergabe
description: Bereitet die Übergabe eines fertigen Projekts an den Kunden vor – Bedienungsanleitung, Installationsanleitung, Änderungsliste, Abnahmeprotokoll und Wartungshinweise.
disable-model-invocation: true
---

# Übergabe an den Kunden

Voraussetzung: Reviewer hat freigegeben. Wenn nicht: zuerst `/dev-team:auftrag` abschließen.

Lege im Projekt den Ordner `docs/uebergabe/` an mit:

## 1. `bedienungsanleitung.md`
Für Nutzer ohne Fachwissen. Aufbau: Wofür ist das Tool? → Erste Schritte → die 3–5 häufigsten Abläufe Schritt für Schritt → Häufige Fehlermeldungen und was zu tun ist → Kontakt.
Kurze Sätze, keine Fachbegriffe. Wo Screenshots sinnvoll sind, Platzhalter `[Screenshot: …]` setzen.

## 2. `installation.md`
Für die IT des Kunden: Voraussetzungen (Windows-/Office-Version, Rechte), Installation, Konfiguration (welche Variablen, ohne echte Werte), Update, Deinstallation, Backup.

## 3. `aenderungen.md`
Version, Datum, was enthalten ist. Bekannte Einschränkungen ehrlich nennen.

## 4. `abnahmeprotokoll.md`
- Projekt, Version, Datum, Beteiligte
- Tabelle: jede Muss-Anforderung aus dem Lastenheft mit „erfüllt / nicht erfüllt / Anmerkung“
- Offene Punkte mit Frist
- Unterschriftsfelder Auftraggeber und Auftragnehmer
Hinweis an Simon: Die Abnahme ist rechtlich wichtig (u. a. Beginn der Gewährleistung und Fälligkeit der Rechnung). Die Vorlage einmal von einem Anwalt prüfen lassen.

## 5. Wartung
Kurzer Vorschlag für einen Wartungsvertrag: was enthalten ist (Updates, Fehlerbehebung, Reaktionszeit), was nicht. Keinen Preis festlegen – das macht der Preisberater.

Danach: Simon an die Nachkalkulation erinnern (geschätzte gegen tatsächliche Stunden), damit die nächste Schätzung genauer wird.
