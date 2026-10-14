# Deine digitale Firma – Anleitung

Stand: Oktober 2026 · Version 1.0

Dieses Repo enthält drei Plugins für Claude Code. Du richtest sie **einmal** ein, danach sind sie in **jedem Projekt** verfügbar – im Terminal genauso wie in VS Code.

---

## 1. Wer macht was?

### Plugin `dev-team` – Programmierabteilung (überall nutzbar, auch in der Arbeit)
| Rolle | Form | So nutzt du sie |
|---|---|---|
| **Projektleiter** | deine Hauptsitzung + Grundgesetz | ist immer da, du sprichst einfach mit Claude |
| **Architekt** | Skill | „Wie setzen wir das am besten um?“ – springt automatisch an, oder `/dev-team:architekt` |
| **Kritiker** | Agent (unabhängig) | prüft Pläne vor dem Bauen und Ergebnisse vor der Abgabe |
| **Tester** | Agent (unabhängig) | testet nur gegen die Anforderungen |
| **Reviewer** | Agent (unabhängig) | Senior-Abnahme, Sicherheit, Freigabe |
| **Produktprüfer** | Agent (unabhängig) | Kundenblick: Stolpersteine + Ideen mit Mehrwert |
| Sicherheit | Skill | Checkliste, nutzen Reviewer und Kritiker automatisch |
| Baukasten | Skill | wiederverwendbare Bausteine finden und sicher hinzufügen |

### Plugin `firma` – Backoffice (nur auf deinen eigenen Rechnern)
| Rolle | So nutzt du sie |
|---|---|
| **Anforderungsanalyst** | `/firma:erstgespraech vorbereiten` bzw. `auswerten` |
| **Preisberater** | `/firma:preisberater vorher` / `nachher` / `bewerten` |
| **Angebot** | `/firma:angebot` |
| **Büro** | `/firma:buero check` / `eintragen` / `beleg` |
| **Coach** | `/firma:coach plan` / `einheit` / `quiz` / `thema` |

### Plugin `tool-scout`
| Rolle | So nutzt du sie |
|---|---|
| **Tool-Scout** | `/tool-scout:scout <wofür>` oder `/tool-scout:scout check` |

Die Skills mit Fachwissen (Architekt, Preisberater …) springen meist auch von selbst an, wenn du einfach normal fragst. Die Befehle sind der sichere Weg.

---

## 2. Einmalige Einrichtung (privater Rechner)

**Voraussetzungen:** Git für Windows, VS Code mit der Claude-Code-Erweiterung, ein GitHub-Konto.

1. **Repo auf GitHub anlegen:** neues Repository `roelz-plugins`, **Private** auswählen.
2. **Ordner ablegen:** ZIP entpacken, z. B. nach `C:\Users\<du>\roelz-plugins`.
3. **Hochladen** – im VS-Code-Terminal in diesem Ordner:
   ```
   git init
   git add .
   git commit -m "Firma v1.0"
   git branch -M main
   git remote add origin https://github.com/<dein-name>/roelz-plugins.git
   git push -u origin main
   ```
4. **Plugins installieren** (Terminal, beliebiger Ordner):
   ```
   claude plugin marketplace add C:/Users/<du>/roelz-plugins
   claude plugin install dev-team@roelz-plugins
   claude plugin install firma@roelz-plugins
   claude plugin install tool-scout@roelz-plugins
   ```
   Wichtig: Den Marktplatz **aus dem lokalen Ordner** hinzufügen, nicht direkt von GitHub. Nur so werden neue Lektionen direkt in dein Repo geschrieben.
5. **Einrichten:** Claude Code starten (Terminal: `claude` oder in VS Code) und eingeben:
   ```
   /dev-team:einrichten privat
   ```
   Claude verknüpft Grundgesetz und Lektionen mit deiner globalen Einstellung und setzt Schutzregeln für Passwortdateien.
6. **Claude Code neu starten.** Falls Claude fragt, ob verknüpfte Dateien geladen werden dürfen: zustimmen.

Fertig. Ab jetzt gilt alles in jedem Projekt.

---

## 3. Terminal oder VS Code?

Beides nutzt dieselben Einstellungen aus deinem Benutzerordner (`~/.claude`). Was du einmal installierst, ist in beiden da – auch die Befehle mit `/`. Falls ein Befehl in VS Code einmal nicht auftaucht: im eingebauten Terminal `claude` starten, dort geht alles.

---

## 4. So läuft ein Kundenprojekt

1. **Vor dem Termin:** `/firma:erstgespraech vorbereiten` → Gesprächsleitfaden.
2. **Termin:** Aufnahme nur mit Zustimmung des Kunden.
3. **Danach:** `/firma:erstgespraech auswerten` + Notizen/Transkript → Lastenheft.
4. **Projekt anlegen:** im Ordner für deine Projekte `/dev-team:neues-projekt <name>`.
5. **Lösungsweg:** „Wie setzen wir das um?“ → Architekt, inkl. Stundenschätzung.
6. **Preis:** `/firma:preisberater vorher` → Preisspanne mit Begründung.
7. **Angebot:** `/firma:angebot`.
8. **Nach Auftrag:** `/dev-team:auftrag <was gebaut werden soll>` → Plan → Kritiker → du entscheidest → Bau → Tester → Reviewer → Produktprüfer.
9. **Übergabe:** `/dev-team:uebergabe` → Anleitung, Abnahmeprotokoll, Wartungsangebot.
10. **Nachkalkulation:** `/firma:preisberater nachher` → die nächste Schätzung wird genauer.

Kleinigkeiten (Fehler beheben, kleine Änderung) gehen ohne Pipeline – einfach Claude fragen.

---

## 5. Lernen aus Fehlern

- Tester und Reviewer schlagen Lektionen vor. Du bestätigst, dann: `/dev-team:lektion <was schiefging>`.
- Claude sortiert sie richtig ein: **allgemein** (Dev-Team), **Firma** oder **nur dieses Projekt**.
- Jeder Code-Fehler bekommt zusätzlich einen Test – so kommt er nicht zurück.
- Ab und zu aufräumen: `/dev-team:lektion aufraeumen`.
- **Danach ins Repo übernehmen:** `git add .`, `git commit -m "Lektion: …"`, `git push` (Claude macht das auch für dich). Auf dem anderen Rechner `git pull` – fertig, kein Neuinstallieren nötig.

---

## 6. Neuer Rechner oder neues Geschäftskonto

Die Plugins hängen am **Rechner**, nicht an deinem Claude-Account. Ein Accountwechsel (z. B. auf ein Geschäftskonto) ändert nichts.
Auf einem neuen Rechner: Repo klonen (`git clone https://github.com/<dein-name>/roelz-plugins.git`), dann Schritte 4–6 aus Abschnitt 2.

---

## 7. In der Arbeit (nur Dev-Team)

**Vorher mit deinem Arbeitgeber klären**, ob eigene Plugins und GitHub erlaubt sind.

Damit kein Firmenwissen (Preise, Kunden) auf den Arbeitsrechner kommt, wird dort **nur der Ordner `plugins/dev-team`** verwendet – er ist auch allein installierbar:
1. Ordner `plugins/dev-team` auf den Arbeitsrechner kopieren (z. B. `C:/Tools/dev-team`).
2. Installieren:
   ```
   claude plugin marketplace add C:/Tools/dev-team
   claude plugin install dev-team@roelz-dev-team
   ```
3. Einrichten: `/dev-team:einrichten arbeit`

Im Modus **arbeit** bleiben Lektionen auf dem Arbeitsrechner und fließen nicht in dein privates Repo zurück. Code aus der Arbeit gehört in der Regel dem Arbeitgeber – nichts davon in deinen privaten Baukasten übernehmen.

---

## 8. Claude-App (Handy, Browser)

Die Plugins laufen in **Claude Code**. In der Claude-App kannst du trotzdem über Preise, Angebote oder Lernthemen sprechen: Lege dort z. B. ein Projekt „Preise“ an und lade `plugins/firma/wissen/preis-kriterien.md` und `kalkulationen.md` als Projektwissen hoch. Die verbindliche Fassung bleibt immer im Repo – Ergebnisse danach in Claude Code übernehmen.

---

## 9. Tokens sparen

- **Eine Aufgabe pro Sitzung**, danach `/clear`. Lange Sitzung: `/compact`.
- Die Pipeline (`/dev-team:auftrag`) nur für echte Features – sie ruft mehrere Agenten und kostet entsprechend mehr.
- Routine: Sonnet. Planen und schwierige Probleme: Opus (`/model`).
- Lessons-Datei schlank halten (unter 40 Einträgen) – sie wird bei jedem Start geladen.

---

## 10. Deine ersten Schritte

1. Einrichtung (Abschnitt 2).
2. In `plugins/firma/wissen/preis-kriterien.md` deinen **Stundensatz** und Mindestauftragswert eintragen – oder `/firma:preisberater` fragen, wie du ihn festlegst.
3. `/firma:buero eintragen` – deine aktuellen Abos aufnehmen.
4. `/firma:coach plan` – Lernplan erstellen.
5. Mit einem **kleinen Testprojekt** die Pipeline einmal durchspielen (`/dev-team:neues-projekt test` → `/dev-team:auftrag …`). Was hakt, sagst du Claude – das ist der schnellste Weg, das Team auf dich einzustellen.
6. Optional: Baukasten-Repo anlegen (Skill `baukasten` erklärt es).

---

## 11. Gut zu wissen

- **Version 1:** Das Gerüst ist geprüft und installierbar. Feinschliff kommt mit echten Projekten – passe die Dateien an, wenn etwas nicht zu deiner Arbeitsweise passt. Alles sind normale Textdateien.
- **Keine Geheimnisse ins Repo:** Passwörter, Schlüssel, Kontonummern gehören nie in diese Dateien.
- **Fremde Plugins** erst nach Prüfung durch den Tool-Scout installieren.
- **Steuern & Recht:** Die Firma-Skills geben Orientierung, ersetzen aber weder Steuerberater noch Anwalt. Angebots- und Abnahmevorlage einmal anwaltlich prüfen lassen.
