# Audit Dev-Team 2.4.0

Geprüft: Stand aus `roelz-plugins-senior-team-v2.4.0.zip` (Commit „Stand aus ZIP“), 11 Agenten, 10 Skills, 4 Hooks, 3 Skripte, 10 Vorlagen, Grundgesetz, Anleitung.
Maßstab: der Prüfauftrag `Senior_Engeneer.txt` und der SiRo-Projektauftrag (Windows-App, zentrale Daten, signierte Updates).
Geprüft wurde vom Projektleiter-Claude selbst, nicht von einer frischen Sitzung. Deshalb ist die Nachprüfung in Abschnitt 7 offen.

## 1. Gesamtbewertung: 6 von 10

Gute Grundlage (klare Rollen, Evidenzpflicht, Sicherheitsprüfer, brauchbare Checkliste). Aber 2.4.0 hat sich beim Umbau selbst widersprochen und Dinge verloren, die dir wichtig waren (Freigabe-Stopps, Sichtbarkeit, Lernen). Für SiRo noch nicht geeignet, nach den Korrekturen in diesem Commit bedingt (siehe 6).

## 2. Die zehn wichtigsten Schwachstellen

| # | Schwere | Befund | Beleg |
|---|---|---|---|
| 1 | kritisch | Die Freigabe-Stopps sind im neuen `auftrag` aufgeweicht: „Bei Routineaufträgen … darfst du mit einem reversiblen Plan fortfahren.“ Du hattest verlangt: erst nach deinem OK bauen. Das Grundgesetz sagt weiter das Gegenteil. | `skills/auftrag/SKILL.md` Phase 1 und 4 gegen `wissen/grundgesetz.md` „Ablauf“ Punkt 6 |
| 2 | kritisch | Drei verschiedene Definitionen von Klein/Normal/Groß, die sich widersprechen. Das Grundgesetz (wird in Cloud-Sitzungen eingespielt) kennt den Sicherheitsprüfer gar nicht. | `grundgesetz.md` Z. 21, `TEAM-PROTOKOLL.md` Z. 36, `auftrag` Z. 26 |
| 3 | kritisch | Beim Umbau von `auftrag` gingen verloren: Sichtbarkeit (→/←-Zeilen, Phase in STATUS), `OFFENE_FRAGEN.md`, `LEKTIONEN_VORSCHLAEGE.md`, harte Stopps, „Fachregel erst rot“, Tester bekommt nur Anforderungen, Baukasten-Prüfung, Abwägungsrunde bei 🟡/🔴 | Suche nach diesen Begriffen in `auftrag/SKILL.md`: keine Treffer |
| 4 | wichtig | 9 von 11 Agenten lesen weder Lessons noch Fachwissen-Bibliothek noch die Dev-Team-Pfade. Das gemeinsame Lernen und die Fachwissen-Bibliothek wirken bei den Prüfern damit nicht. Auch die Pflicht „Bericht in einfacher Sprache“ fehlt in den meisten. | `grep` über `agents/*.md`: 0 Treffer außer kritiker, reviewer |
| 5 | wichtig | „Autonomie“ ohne klare Rechtegrenzen: nichts zu Arbeitsbranch, Push, Force-Push, Installieren fremder Pakete, Zugang zu Signierschlüsseln, Ausführen von Code aus Fremdquellen. Die Freigabegrenze ist nur im Satz „produktive Systeme, Datenverlust …“ beschrieben. | `auftrag` Phase 4, `grundgesetz.md` „Eigenständig bauen“ |
| 6 | wichtig | „Nur lesen“-Rollen sind nur Anweisung, nicht Technik: Tester/Quellenprüfer/Rechercheur haben Write/Edit, Prüfer haben Bash. Plugin-Agenten können laut offizieller Doku keine Hooks und keinen `permissionMode` setzen. Es gibt keine Nachkontrolle und kein `maxTurns`. | Doku „Plugin components → Agents“: ignorierte Felder `permissionMode`, `hooks`, `mcpServers`; `agents/*.md` ohne `maxTurns` |
| 7 | wichtig | Keine Mechanik für große Aufträge wie SiRo: keine Meilensteine, keine Wiederaufnahme nach Kontextverlust, kein „nur analysieren“-Modus, obwohl der SiRo-Auftrag Phase 1 ausdrücklich ohne Dateiänderung verlangt. | `auftrag` hat nur eine Durchlaufschleife |
| 8 | wichtig | Lieferkette: Der Cloud-Start klont `main` ungeprüft und führt daraus Skripte aus. Das Repo ist jetzt öffentlich, die Anleitung sagt noch „privat“. | `vorlagen/projekt-dev-team-start.sh` Z. 18–30; `README.md`, `ANLEITUNG.md` Z. 86 |
| 9 | mittel | Tote oder falsche Verweise: Skill `preisberater`/Plugin „firma“ existiert hier nicht; „Fachprüfer holt bei Bedarf Rechercheur“ ist unmöglich (Agenten können keine Agenten starten, der Fachprüfer hat das Werkzeug nicht); `TEAM-PROTOKOLL.md` und `CHANGELOG-2.4.0.md` hängen als Waisen im Plugin. | `architekt/SKILL.md` Z. 38, `grundgesetz.md` „Ablauf“ Punkt 4, `ANLEITUNG.md` Z. 145 |
| 10 | mittel | Keine automatische Selbstprüfung des Plugins (Namen, Verweise, Versionen, Widersprüche) und mehrere Funktionen nie unter Windows oder über Stunden getestet. | siehe Abschnitt 4 |

## 3. Kritisch / wichtig / optional

**Kritisch (Punkte 1–3):** behoben in diesem Commit.
**Wichtig (4–8):** behoben bzw. entschärft, Grenzen siehe Abschnitt 6.
**Optional:** `isolation: worktree` für die Prüfer (technische Absicherung gegen Änderungen, aber nicht getestet, deshalb nicht eingebaut); eigener Daten-/Migrationsprüfer; automatische Kostenobergrenze.

## 4. Was geprüft wurde und was nicht

| Prüfung | Ergebnis |
|---|---|
| `claude plugin validate --strict` für Plugin und beide Marktplätze | bestanden (ausgeführt, 2.4.0-Stand) |
| JSON-Dateien (6) parsen | bestanden |
| Frontmatter: Name = Dateiname, Modell, Werkzeuge (20 Dateien) | bestanden |
| `bash -n` für alle Skripte | bestanden |
| Agenten-Log-Skript mit Beispieleingabe | bestanden, Zeilen werden geschrieben |
| Abgleich Agentennamen in Texten gegen vorhandene Dateien | bestanden |
| Abgleich der Regeln untereinander | **durchgefallen** (Punkte 1–3) |
| Offizielle Doku zu Plugin-Agenten und Variablen | gelesen, Ergebnis siehe Punkt 6 |
| `shellcheck` | **nicht möglich** (nicht installiert) |
| Windows (Git Bash) Hooks | **nicht geprüft** (Prüfumgebung ist Linux) |
| Mehrstündiger autonomer Lauf eines echten Projekts | **nicht geprüft** |
| Fachliche Richtigkeit der Wärmenetz-Regeln | **nicht geprüft** (nur W1 von dir bestätigt) |

## 5. Was geändert wurde (Version 2.4.1)

Siehe `plugins/dev-team/CHANGELOG.md`, Abschnitt 2.4.1. Kurz: `auftrag` mit allen Stopps und neuen Meilensteinen, „nur analysieren“ und Wiederaufnahme; eine einzige Stufen-Definition im Grundgesetz; „Fertig heißt belegt“ und „Grenzen der Autonomie“; alle Agenten lesen Lessons und Fachwissen und haben `maxTurns`; neuer Agent `auditor` mit Skill `audit`; Selbstprüfskript `scripts/pruefe-plugin.sh`; Cloud-Start mit `DEV_TEAM_REF`; tote Verweise entfernt.

Nach den Änderungen ausgeführt: `scripts/pruefe-plugin.sh` (ohne Befund), `claude plugin validate --strict` (bestanden).

## 6. Eignung für ein Projekt wie SiRo (Windows-App, zentrale Daten, signierte Updates)

**Bedingt geeignet, mit Aufsicht.** Für Phase 1 (nur analysieren) und das Planen: ja. Für das stundenlange, eigenständige Bauen: nur in kleinen Meilensteinen, mit deinem Stopp nach jedem.

Warum nicht uneingeschränkt:
- „Nur lesen“-Rollen sind Anweisungen, keine technische Sperre (Plugin-Agenten können laut Doku keine Hooks und keinen `permissionMode` setzen). Gegenmaßnahme: Nachkontrolle per Git-Vergleich nach jedem Prüfer.
- Alle Agenten sind Claude und haben ähnliche blinde Flecken. Echte Absicherung geben nur deine Referenzfälle und bestätigten Fachregeln.
- Update-Signierung, Datenbank-Migration und Zugangsdaten bleiben Handarbeit der IT bzw. von dir. Der private Signierschlüssel darf nie in die KI-Sitzung.

## 7. Offen

- **Nachprüfung durch eine frische Sitzung steht aus.** Dieses Audit hat der Projektleiter selbst gemacht. Ablauf: neue Sitzung, `/dev-team:audit`, der `auditor` prüft Stand 2.4.1 ohne Vorwissen.
- Nicht geprüft: Windows/Git Bash, mehrstündiger Echtlauf, `shellcheck`, Fachinhalt W2–W7.
