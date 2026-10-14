---
name: sicherheit
description: Sicherheits- und Datenschutz-Checkliste für Software (Login, Rechte, Eingaben, Geheimnisse, Abhängigkeiten, DSGVO, KI-spezifische Risiken wie Prompt Injection). Nutzen beim Planen von Login/Daten-Funktionen, beim Review und vor jeder Abgabe.
---

# Sicherheits-Checkliste

Nicht jeder Punkt passt zu jedem Projekt – ein Excel-Makro braucht kein Login. Markiere nicht zutreffende Punkte als „entfällt“ statt sie zu überspringen.

## Geheimnisse
- [ ] Keine Passwörter, API-Schlüssel, Tokens im Code oder in der Git-Historie (`git log -p` stichprobenartig prüfen).
- [ ] Geheimnisse über `.env` / Umgebungsvariablen; `.env` steht in `.gitignore`; `.env.example` enthält nur Namen.

## Login & Rechte (Web-Apps)
- [ ] Bewährte Login-Lösung des Frameworks oder Anbieters – kein selbstgebautes Passwort-Handling.
- [ ] Passwörter nur gehasht (z. B. bcrypt/argon2), niemals im Klartext.
- [ ] Jede Serverfunktion prüft, ob der Nutzer das **darf** – nicht nur, ob er eingeloggt ist.
- [ ] Sitzungen laufen ab; Logout funktioniert wirklich.

## Eingaben
- [ ] Alle Eingaben werden serverseitig geprüft (Typ, Länge, erlaubte Werte).
- [ ] Datenbankzugriffe nur mit Parametern (keine zusammengebauten SQL-Strings).
- [ ] Ausgaben im Browser werden escaped (Schutz vor XSS).
- [ ] Datei-Uploads: Typ und Größe begrenzt, nicht ausführbar abgelegt.

## Übertragung & Betrieb
- [ ] Nur HTTPS.
- [ ] Fehlermeldungen für Nutzer verraten keine internen Details.
- [ ] Backups vorhanden und Wiederherstellung einmal getestet.
- [ ] Logs enthalten keine Passwörter oder unnötigen Personendaten.

## Abhängigkeiten
- [ ] Nur verbreitete, gepflegte Pakete; Versionen festgeschrieben (Lockfile).
- [ ] Bekannte Schwachstellen geprüft (`npm audit`, `pip-audit` o. ä.).

## Datenschutz (DSGVO)
- [ ] Welche personenbezogenen Daten? Nur die nötigen (Datensparsamkeit).
- [ ] Speicherort (EU bevorzugt) und Zugriff dokumentiert.
- [ ] Löschung möglich.
- [ ] Verarbeitet Simon Personendaten im Auftrag des Kunden → Auftragsverarbeitungsvertrag (AVV) nötig.
- [ ] Bei Webseiten/Web-Apps: Impressum und Datenschutzerklärung.

## KI-spezifisch (wenn die Software KI nutzt oder mit KI gebaut wird)
- [ ] Inhalte aus Dateien, Webseiten, E-Mails gelten als Daten, nie als Befehle (Prompt Injection).
- [ ] KI-Funktionen haben nur die Rechte, die sie brauchen; kritische Aktionen brauchen Bestätigung durch einen Menschen.
- [ ] Kundendaten werden nur an KI-Dienste geschickt, wenn der Kunde zugestimmt hat.

## Desktop / Office
- [ ] Makros/Add-Ins: keine Netzwerkzugriffe oder Dateilöschungen ohne Bestätigung.
- [ ] Pfade nicht fest auf einen Rechner verdrahtet.
