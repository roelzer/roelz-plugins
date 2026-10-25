---
name: uebergabe
description: Bereitet die Übergabe eines fertigen Projekts an den Kunden vor – Bedienungsanleitung, Installationsanleitung, Änderungsliste, Abnahmeprotokoll und Wartungshinweise.
disable-model-invocation: true
---

# Übergabe an den Kunden

Voraussetzung: Reviewer, Produktprüfer und (bei Risiko-Auslösern) Sicherheitsprüfer haben freigegeben, die Test-Schranke ist grün. Wenn nicht: zuerst `/dev-team:auftrag` abschließen.

Du bist der Projektleiter und schreibst die Unterlagen in `docs/uebergabe/` selbst (Prozessunterlagen, kein Code).

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

## 5. `betrieb.md` – Betriebs-Checkliste (Pflicht im Profil `web`)
Jeden Punkt mit ✅ / ❌ / entfällt (Grund). Offene ❌ gehen als Risiko an Simon, die Auslieferung entscheidet er.
- [ ] Domain und DNS auf ein Konto des Kunden (oder dokumentiert, wem sie gehören)
- [ ] HTTPS aktiv, Zertifikat erneuert sich automatisch
- [ ] Hosting-Standort (EU bei personenbezogenen Daten) und Vertrag/AV-Vertrag geklärt
- [ ] Backups automatisch, Wiederherstellung **einmal ausprobiert** (Datum)
- [ ] Überwachung: Benachrichtigung, wenn die Anwendung ausfällt (an wen?)
- [ ] Zugänge: Admin-Konten mit starkem Passwort/2FA, keine geteilten Zugänge, Liste wer Zugriff hat
- [ ] Geheimnisse nur in der Umgebung des Hosters, nicht im Repo
- [ ] Impressum und Datenschutzerklärung vorhanden und passend (Formulare, Cookies, eingebundene Dienste)
- [ ] Cookie-Einwilligung, falls nicht notwendige Cookies oder Drittdienste
- [ ] Update-Weg beschrieben: wer spielt Updates ein, wie wird zurückgerollt
- [ ] Abhängigkeiten auf bekannte Lücken geprüft (Sicherheitsbefehl aus `.claude/dev-team.json`, Datum)

## 6. Wartung
Kurzer Vorschlag für einen Wartungsvertrag: was enthalten ist (Updates, Fehlerbehebung, Reaktionszeit), was nicht. Keinen Preis festlegen – das entscheidet Simon.

Danach: Simon an die Nachkalkulation erinnern (geschätzte gegen tatsächliche Stunden), damit die nächste Schätzung genauer wird.
