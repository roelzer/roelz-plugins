# Systemaudit Dev-Team 3.4.0 nach Simons Auftrag

**Ampel: GELB. Gesamtnote 6 von 10**

**In drei Sätzen:** Die Sperren für die normalen Werkzeuge der Agenten (Datei schreiben, Agenten starten, Modellwahl) und die Test-Schranke funktionieren nachweislich: 176 Plugin-Tests sind grün, und meine eigenen Angriffsversuche auf dieser Ebene wurden blockiert. Für dein Ziel „Qualitätssicherung, die nachweislich funktioniert und wirtschaftlich ist“ fehlt aber das Wichtigste: Niemand hat bisher gemessen, ob die vielen Prüfer echte Fehler finden und was das kostet. Dazu habe ich eine kritische Lücke live bestätigt: Jedes Stück Code, das ein Agent ausführt, kann die Schutz-Hooks für die nächste Sitzung unsichtbar abschalten. Und die Merge-Prüfung übersieht nachweislich manipulierte Tests, wenn der Projektleiter einen Fast-Forward-Merge macht (ein Merge, bei dem Git nur den Zeiger vorschiebt, ohne eigenen Merge-Commit).

Die Note liegt unter den 7 aus Audit 3.3.0. Das System ist nicht schlechter geworden: Ich messe an deinem strengeren Maßstab (nachgewiesene Wirksamkeit, Kosten), und ich habe zwei neue Lücken der Stufe kritisch bzw. hoch gefunden.

Arbeitsweise: Ich habe nur analysiert. Das Repo ist unverändert (`git status` ist sauber, geprüft). Alle Versuche liefen in Kopien unter `/tmp/claude-0/-home-claude/a4c81a93-19cb-592d-9747-5a6e216b1947/scratchpad/audit4/`. Offenlegung: Ein Sammelbefehl von mir enthielt versehentlich ein `git status` im Pilotordner `/home/claude/fremd/rohrnetz-check`. Das Berechtigungssystem hat ihn **vor** der Ausführung blockiert. Dort wurde nichts ausgeführt, nur Dateien gelesen.

---

## Abweichungen zwischen deiner Beschreibung und dem echten Stand

| Deine Beschreibung | Tatsächlicher Stand (Beleg) |
|---|---|
| Bis zu **3** parallele Entwickler | Eingebaut sind **4** (`wissen/grundgesetz.md` Z. 73 und 131, `skills/auftrag/SKILL.md` Z. 70) |
| Projektleiter „darf keine Tests ausführen“ | Er startet nach **jedem Merge** und am Meilenstein-Ende die Test-Schranke (`auftrag` Z. 88 und 103). Er darf alle Befehle aus `.claude/dev-team.json` ausführen (`scripts/waechter.py` Z. 677–695). Meine Meinung: Das ist **gut so**, weil die Schranke ein Werkzeug ohne KI ist. Die Beschreibung sollte angepasst werden, nicht das System. |
| Projektleiter schreibt „ausschließlich Plan, Status, Lastenheft“ | Er schreibt auch: Fachregeln, Recherche, Quellen, `CLAUDE.md`, `.gitignore`, `.claude/dev-team-start.sh`, `.claude/dev-team.json` (Testbefehl!) und **neue Referenzfälle** (`team.json`, Feld `projektleiter_schreibt`) |
| Prüfer „dürfen nichts schreiben“ | Stimmt für das Schreib-Werkzeug. Reviewer, Fachprüfer, Produktprüfer, Sicherheitsprüfer und Auditor haben aber die Shell und dürfen Projektcode ausführen, und der kann schreiben (getestet, Fall R3). Wirklich nur lesend sind Kritiker, Fachexperte, Pragmatiker und Langfrist-Architekt (sie haben gar keine Shell). |
| Tester „deckt nach der Implementierung auf“ | Aufgedeckt wird erst **am Meilenstein-Ende**, nicht je Paket (`auftrag` Phase 8). Bis dahin werden Pakete ohne Abnahmetests zusammengeführt. |
| Produktprüfer „erstellt Screenshots“ | Nur in einem Temp-Ordner, sie werden nicht aufbewahrt (`agents/produktpruefer.md`, Steckbrief) |
| Modellwahl | Neu in 3.4: Standardmodell je Agent plus erlaubte Ausweichmodelle in `team.json`. Der Wächter sperrt andere Modelle (getestet: Haiku für den Entwickler wird blockiert). |
| Rechercheur mit „zweitem, frischem Aufruf“ | Nur eine Anweisung im Skill `recherche`, nicht technisch erzwungen |

---

## Teil 1: Ist-Zustand

### Aufbau (gelesen)
- **13 Agenten** in `/home/claude/roelz-plugins/plugins/dev-team/agents/*.md`, einheitlicher Steckbrief. `team.json` ist die einzige Quelle für Team, Schreibbereiche und Modelle.
- **Projektleiter** = die Hauptsitzung. Regeln in `wissen/grundgesetz.md`, Ablauf in `skills/auftrag/SKILL.md` (Phasen 1–9, drei feste Stopps bei dir).
- **Hooks** (`hooks/hooks.json`, zusätzlich als Kopie über `vorlagen/projekt-settings.json` und `vorlagen/projekt-dev-team-start.sh` für die Cloud):
  - Sitzungsstart: gibt das Grundgesetz mit.
  - Agentenstart: gibt die Pfade mit.
  - **Wächter** vor jedem Werkzeugaufruf (`scripts/waechter.py`, 1300 Zeilen, blockiert bei Fehlern).
  - Agentenende: **Fertig-Prüfung** und **Agenten-Log**.
- **Test-Schranke** `scripts/pruefe_tests.py`: führt die Tests aus und prüft den Unterschied zum Basis-Stand (geänderte oder gelöschte Tests, Referenzfälle, übersprungene Tests, leere Prüfungen, Eingriffe ins Testwerkzeug, Testzahl, Testeinstellungen).
- **Abhängigkeits-Schranke** `scripts/pruefe_abhaengigkeiten.py`: Paket existiert, ist alt und verbreitet genug, kein Tippfehler-Name, Lockfile passt.
- **Nachweise:** `docs/AGENTEN_LOG.md`, `docs/TESTNACHWEIS.md`, `.dev-team/schranke-ok/<commit>`.
- **Freigaben:** `.claude/freigaben.md`, nur von dir von Hand.

### Was technisch erzwungen ist, was nur Anweisung ist

| Regel | Art | Wirksamkeit (getestet = Befehl ausgeführt) |
|---|---|---|
| Nur die 13 Agenten, keine Helfer | technisch (Wächter + Einstellungen) | getestet: Explore blockiert, Agent ohne Namen blockiert, Agenten starten keine Agenten |
| Modell je Agent | technisch | getestet: Haiku für den Entwickler blockiert |
| Schreibbereiche über Write/Edit | technisch | getestet: Entwickler ändert bestehenden Test → blockiert; Reviewer und Architekt schreiben Code → blockiert |
| Schreibbereiche über die Shell | Muster-Prüfung | Umleitungen und `cp` blockiert. **Eigenes Skript schreiben und ausführen: erlaubt** (getestet) |
| Verdeckte Tests nicht lesbar | Muster-Prüfung | Direktes Lesen blockiert. **Per eigenem Skript gelesen** (getestet, Inhalt „GEHEIMWERT 4711“ ausgegeben) |
| Kein Merge ohne grüne Schranke | **nur Anweisung** | Der Wächter prüft beim `git merge` nichts |
| `--no-ff` beim Merge | **nur Anweisung** | Fast-Forward erlaubt; dann übersieht die Schranke Manipulationen (getestet) |
| Kein Push oder Merge auf `main` | teilweise | `git push origin main` blockiert. **`git push`, `git push origin HEAD`, `git checkout main` + `git merge`: erlaubt** (getestet) |
| Entwickler pusht und veröffentlicht nicht | **nur Anweisung** | `git push`, `npm publish`, `curl -X POST -d @datei`: erlaubt (getestet) |
| Aufgedeckte Abnahmetests unverändert | **nur Anweisung** (`agents/tester.md` Z. 45) | Keine Prüfsumme, der Tester kann sie ändern (getestet) |
| „Fertig“ nur mit Beleg | technisch (Fertig-Hook) | in den Plugin-Tests geprüft; den Nachweis kann aber Code des Entwicklers selbst anlegen |
| Prüfberichte nachvollziehbar | teilweise | Nur die ersten 160 Zeichen je Agent landen im Log (`scripts/agenten-log.sh` Z. 56, `waechter.py` Z. 195) |
| Wirksamkeit gemessen | **fehlt** | keine Kennzahlen, keine Fehlerexperimente auf Agentenebene |

---

## Teil 2: Schwachstellen nach Schweregrad

### Kritisch

**K1 – Schutz-Hooks lassen sich durch ausgeführten Code unsichtbar abschalten** (bestätigt, Sicherheit 90)
- **Problem:** Jedes Programm, das ein Agent startet, kann in `.claude/settings.local.json` die Einstellung `"disableAllHooks": true` schreiben. Das kann ein eigenes Skript des Entwicklers sein, sein Testcode oder ein Installationsskript eines Pakets. Danach laufen Wächter, Fertig-Prüfung und Log nicht mehr.
- **Nachweis:**
  1. Wächter-Ebene: Entwickler legt das Skript an und führt `python3 werkzeug/x.py` aus. Beides ist erlaubt (Fälle E1 und E2).
  2. Live in Claude Code 2.1.310 mit einem kleinen Haiku-Lauf: Ein **Projekt-Hook** war nach dem Skript **sofort** aus.
  3. Ein **Plugin-Hook** blieb in der laufenden Sitzung aktiv, war aber in der **nächsten Sitzung ganz aus**. Ein vorher blockierter Befehl lief durch.
  4. Die Datei steht in `vorlagen/gitignore.txt` Z. 41. Die Schranke sieht die Änderung also nie.
  5. `hooks/hooks.json` hat keinen `ConfigChange`-Hook. Den gibt es laut offizieller Doku, und er kann Einstellungsänderungen blockieren.
- **Schaden:** Am nächsten Morgen arbeitet das Team ohne jede technische Sperre, und nichts zeigt es an.
- **Wahrscheinlichkeit:** Pro Lauf niedrig, denn es braucht absichtliches Umgehen oder ein bösartiges Paket. Bei stundenlangen Läufen ohne Aufsicht ist es aber real.
- **Abhilfe:** siehe P0-1.

### Hoch

**H1 – Verdeckte Tests und Hauptordner über eigene Skripte erreichbar; auch Helfer-Sitzungen möglich** (bestätigt, Sicherheit 95)
- **Nachweis:**
  - Entwickler-Skript im Worktree hat `../../../.dev-team/verdeckt/` gelesen.
  - Ein Skript, das `claude` startet, wird beim Entwickler nicht geprüft (Fall X6). Grund: `waechter.py` Z. 834–864 prüft beim Entwickler nur Einzeiler, keine Skriptdateien.
  - Das Grundgesetz (Z. 29) nennt das „stark erschwert“. Tatsächlich sind es zwei einfache Schritte.
- **Schaden:** Die verdeckten Tests verlieren ihren Wert. Ein Helfer außerhalb des Teams ist möglich.
- **Abhilfe:** Ehrlich dokumentieren. Zusätzlich: Prüfsummen der verdeckten Tests (P0-3), blinde Prüfung je Paket (P1-2). Echte Abhilfe bringt nur eine Trennung auf Betriebssystemebene (WSL2-Sandbox oder Container, P2).

**H2 – Merge-Schranke übersieht manipulierte Tests bei Fast-Forward-Merge** (bestätigt, Sicherheit 95)
- **Nachweis:** Versuch in der Kopie:
  1. Commit 1 ändert einen bestehenden Test (erwartet 4 statt 3).
  2. Commit 2 passt den Code an.
  3. `git merge --ff-only`, dann die Schranke mit `--basis HEAD^1 --rolle merge` → „OK – alles grün“.
  4. Gegenprobe mit der richtigen Basis → FEHLER „Entwickler hat bestehende Testdatei geändert“.
- `--no-ff` steht nur als Anweisung in `auftrag` Z. 87. `pruefe_git` (`waechter.py` Z. 998–1043) prüft `merge` gar nicht.
- **Schaden:** Ein Test wird passend gemacht, und die „unabhängige“ Nachprüfung meldet grün.
- **Wahrscheinlichkeit:** mittel. Ohne `--no-ff` macht Git den Fast-Forward von selbst, sobald es möglich ist, also oft bei nacheinander gebauten Paketen. Der Reviewer würde es mit seiner eigenen Schranke finden, aber nur, wenn er sie wirklich ausführt.
- **Abhilfe:** P0-2.

**H3 – Abnahmetests können ohne Spur geändert werden** (bestätigt, Sicherheit 90)
- **Nachweis:**
  - Der Tester darf `tests/abnahme/` und `.dev-team/verdeckt/` ändern (Fälle T1 und T2 erlaubt).
  - „Inhalt unverändert“ ist nur eine Anweisung (`agents/tester.md` Z. 45).
  - Die Schranke meldet beim Tester nur geänderten Programmcode (`pruefe_tests.py` Z. 384).
  - Die verdeckten Tests sind nicht versioniert (stehen in `.gitignore`). Es ist also auch nicht belegbar, dass sie **vor** dem Bauen fertig waren.
- **Schaden:** Ein roter Abnahmetest wird „korrigiert“ statt der Code.
- **Abhilfe:** P0-3.

**H4 – Unumkehrbare Außenwirkung möglich** (bestätigt auf Wächter-Ebene, Sicherheit 85)
- **Nachweis:**
  - Entwickler: `git push`, `npm publish` und `curl -X POST -d @src/...` sind erlaubt.
  - Projektleiter: `git push`, `git push origin HEAD`, `git checkout main` und `git merge` sind erlaubt.
  - Die Zusatzwerkzeuge `mcp__github__push_files` und `create_pull_request` sind für den Projektleiter erlaubt. Grund: Die Sperrliste `waechter.py` Z. 55–57 kennt „push“ und „merge“ nicht.
  - Ob eine Berechtigungsabfrage von Claude Code zusätzlich stoppt, hängt vom Modus ab. Nicht geprüft.
- **Schaden:** Ein Push oder Merge nach `main`, eine Veröffentlichung oder abgeflossene Daten ohne deine Freigabe.
- **Abhilfe:** P0-4.

**H5 – Prüfberichte werden nicht gespeichert, das Log ist veränderbar** (bestätigt, Sicherheit 90)
- **Nachweis:**
  - Je Agent landen nur 160 Zeichen in `docs/AGENTEN_LOG.md` (Belegstellen siehe oben).
  - Die vollständigen Befunde liegen nur im Gedächtnis des Projektleiters und sind nach `/clear` weg.
  - Es gibt keine mechanische Verknüpfung Anforderung → Test → Befund → Commit.
  - Das Log ist eine normale Datei, die jeder ausgeführte Code ergänzen kann.
  - Im Pilot ist auch die Benennung uneinheitlich: Start als „architekt“, Ende als „dev-team:architekt“.
- **Schaden:** Deine Frage „Welcher Agent hat welche Prüfung mit welchem Befund gemacht?“ ist nur teilweise beantwortbar.
- **Abhilfe:** P1-1 und P1-3.

**H6 – Wirksamkeit und Kosten sind nicht gemessen** (bestätigt, Sicherheit 95)
- **Nachweis:**
  - Kein Skript, keine Datei für Kosten, Dauer, Nacharbeit oder „welcher Prüfer fand was“.
  - Die 176 Tests prüfen den Wächter und die Schranken, nicht die KI-Prüfer.
  - Mutationstests (absichtlich eingebaute Fehler, die die Tests finden müssen) sind bei Fachsoftware nur eine Warnung (`pruefe_tests.py` Z. 523–527). Im Pilot ist `zusatzbefehle` leer.
  - Kein abgeschlossener Pilot, kein Vergleich mit einem einzelnen Agenten.
- **Schaden:** Du weißt nicht, ob 13 Rollen besser sind als 6, oder besser als ein einzelner Claude.
- **Abhilfe:** Teil 6.

**H7 – Cloud: Das Team gilt dort nicht so wie versprochen** (Doku gelesen, nicht live in der Cloud getestet, Sicherheit 85)
- **Nachweis:**
  - Laut offizieller Doku (claude-projects, Tabelle „What threads pick up“): In Cloud-Threads eines claude.ai-Projekts laufen die Hooks aus `.claude/settings.json` **nicht**, und dort eingetragene Plugins laden **nicht**.
  - `ANLEITUNG.md` Abschnitt 7 (Z. 130) verspricht: „Gilt automatisch: jedes Projekt, auch in der Cloud“.
  - In normalen Cloud-Sitzungen darf der Projektleiter `.claude/dev-team-start.sh` überschreiben (Fall P1 erlaubt). Damit ist der Wächter dort sofort aus.
- **Abhilfe:** P0-5.

### Mittel

**M1 – Gemeinsame Fehlerquelle bei erwarteten Werten** (Schlussfolgerung aus dem Aufbau, Sicherheit 80)
- Der Architekt schreibt erwartete Werte in den Bauplan (`agents/architekt.md` Z. 53), der Entwickler übernimmt sie.
- Der Tester rechnet mit demselben Modell (Opus) aus denselben Anforderungen. Zwei KI-Rechnungen können sich auf denselben falschen Wert einigen.
- Wirklich unabhängig sind nur deine Referenzfälle. Neue darf aber der Projektleiter anlegen, und ob die Werte wirklich von dir stammen, prüft keine Technik.
- **Abhilfe:** P0-6 und P1-4.

**M2 – Testbefehl kann still geändert werden** (Sicherheit 85)
- Der Projektleiter darf `.claude/dev-team.json` schreiben (Fall P2 erlaubt).
- Die Schranke merkt die Änderung nur, solange sie nach dem Basis-Stand liegt. Wird sie mit „Plan freigegeben“ committet, sehen alle späteren Schranken sie nicht mehr.
- **Abhilfe:** P0-6.

**M3 – Abnahmetests erst am Meilenstein-Ende** (Sicherheit 90)
- Fehler im Zusammenspiel fallen spät auf. Nacharbeit wird teuer, besonders mit parallelen Paketen.
- **Abhilfe:** P1-2.

**M4 – Architekturregeln hängen ganz an den Tests, die der Architekt pro Projekt schreibt** (Sicherheit 85)
- Es gibt kein mitgeliefertes Werkzeug für Abhängigkeiten oder doppelten Code.
- Doppelter Code wird nur von KI-Prüfern gesucht.
- `docs/ARCHITEKTUR.md` selbst ist geschützt (nur der Architekt) und wird in Git versioniert. Das ist gut.
- **Abhilfe:** P1-5.

**M5 – Produktprüfung kaum reproduzierbar** (Sicherheit 85)
- Keine gespeicherten Ende-zu-Ende-Tests. Screenshots nur im Temp-Ordner.
- Playwright nur, wenn es im Projekt steht (`npx playwright` ohne Eintrag wurde blockiert, getestet).
- Für Desktop, Excel und AutoCAD gibt es keinen Weg, die echte Bedienung zu prüfen.
- **Abhilfe:** P1-6.

**M6 – Sicherheitsprüfung fast nur durch Lesen** (Sicherheit 85)
- Kein Werkzeug, das Code auf typische Lücken absucht. Keine Suche nach versteckten Zugangsdaten. Keine Tests gegen die laufende Anwendung.
- „Verfügbare Scanner“ hängt vom `sicherheitsbefehl` ab, und der ist im Pilot leer.
- **Abhilfe:** P1-7.

**M7 – Reibung und Fehlalarme** (Sicherheit 85)
- Das Pilot-Log zeigt in 10 Minuten 4 Blockaden harmloser Arbeit: `for`-Schleife, Werkzeug `ReadNotifications`, Architekt „nicht prüfbar“, `python3`.
- Jede Blockade kostet einen Wiederholungsversuch.
- Das Muster-Wettrüsten im Wächter (1300 Zeilen) bringt beim Entwickler kaum noch etwas, denn er muss ohnehin beliebigen Code ausführen.

### Niedrig
- **N1:** Der Produktprüfer sagt „Wann: Phase 7“ (`agents/produktpruefer.md` Z. 23), der Ablauf sagt Phase 8.
- **N2:** Der Projektleiter kann die verdeckten Tests lesen (Fall P5) und sie versehentlich an Entwickler weitergeben.
- **N3:** Die Ampel im Log wird aus dem Text gesucht. Ein 🔴 irgendwo im Bericht, etwa in einer Legende, färbt rot. Das ist vorsichtig, aber ungenau.

### Unsichere Beobachtungen (unter 80, nicht in der Liste oben)
- **(70)** Die Vorgabe an den Architekten, „absichtlichen Verstoß in einer Wegwerf-Kopie zeigen“, ist vermutlich schwer umsetzbar. Eine Kopie mit Git-Ordner und `dev-team.json` gilt als Projekt, und dort darf er keinen Code schreiben. Nicht vollständig getestet.
- **(60)** Wie schnell der Wächter unter Windows ist: Unter Linux braucht er etwa 55–60 ms je Werkzeugaufruf (gemessen). Unter Windows nicht geprüft.

---

## Teil 3: Redundanzanalyse

| Rolle | Eigene, unabhängige Leistung | Überschneidung | Empfehlung |
|---|---|---|---|
| Projektleiter | Steuerung, Merge, Bericht | – | dauerhaft |
| Architekt (Entwurf) | Paketschnitt, Schnittstellen | – | dauerhaft ab Normal |
| Architekt (Struktur) | Strukturprüfung | großteils durch Werkzeuge ersetzbar (Abhängigkeiten, doppelter Code) | nur, wenn Werkzeuge rot melden oder Schnittstellen geändert wurden |
| Entwickler | baut | – | dauerhaft |
| Tester | einzige unabhängige Testquelle | – | dauerhaft |
| Reviewer (Paket) | Plan-Treue, Qualität vor dem Merge | – | dauerhaft |
| Reviewer (gesamt) | Zusammenspiel | mit Architekt-Struktur und Tester | bei Normal mit der Strukturprüfung in **einem** Aufruf; getrennt nur bei Groß |
| Kritiker | Gegenprüfung des Plans | mit Pragmatiker (Überkomplexität) | dauerhaft ab Normal |
| Pragmatiker | Aufwand und Nutzen | als Pflichtfrage im Kritiker abdeckbar | nur bei Groß |
| Fachexperte | Anwendersicht | mit Fachprüfer (Plan) und Produktprüfer | nur bei Groß oder bei neuer Bedienung |
| Langfrist-Architekt | unabhängige Prüfung des Architektur-Entwurfs | – (schützt vor Selbstbestätigung des Architekten) | nur, wenn die Architektur neu ist oder sich ändert |
| Fachprüfer | Fachregeln, Referenzfälle | Teile durch Fachregel-Tests ersetzbar | bei fachlichen Folgen; prüft eher Regeln und Referenzen als Code |
| Rechercheur + Gegenprüfung | Quellen | – | Gegenprüfung nur, wenn das Ergebnis Fachregel oder verbindlicher Wert werden soll |
| Sicherheitsprüfer | Bedrohungsmodell, Angriffswege | Muster-Teil durch Scanner ersetzbar | bei Auslösern; Scanner laufen dafür bei jedem Merge |
| Produktprüfer | Bedienbarkeit, Aussehen | Abläufe durch Ende-zu-Ende-Tests des Testers ersetzbar | bei Oberfläche; urteilt nur noch über Bedienbarkeit und Optik |
| Auditor | Prozessprüfung | – | bei Bedarf |

**Schlussfolgerung:** Fest im Einsatz bei Normal sind 6 Rollen: Projektleiter, Architekt, Entwickler, Tester, Reviewer, Kritiker. Die übrigen 7 werden nach Auslöser gerufen. Dabei geht **keine** Kontrolle verloren, bei der Unabhängigkeit zählt. Kritiker und Dreierrunde überschneiden sich deutlich. Reviewer, Fachprüfer und Auditor dagegen kaum: Sie prüfen Code, Fachlichkeit und Prozess. **Wichtig:** Zuerst messen (Teil 6, V10), dann verschlanken. Nicht aus Gefühl kürzen.

**Kosten (Schätzung, nicht gemessen):** Ein Normal-Auftrag mit 3 Paketen braucht heute etwa 20–24 Agentenaufrufe, davon rund zwei Drittel auf Opus. Mit der Empfehlung oben sind es etwa 14–17.

---

## Teil 4: Zielarchitektur (Grundstruktur bleibt)

**Grundsatz:** Mehr Sicherheit durch **Werkzeuge ohne KI an den Übergabepunkten** und durch Schutz der Einstellungen. Weniger durch weitere Muster im Wächter.

1. **Rollen und Rechte:** wie heute, dazu:
   - Der Entwickler darf nichts nach außen senden (Push, Veröffentlichen, Hochladen).
   - Der Projektleiter darf nur auf `dev-team/*`-Branches pushen und mergen, nie auf oder nach `main`.
   - `.claude/dev-team.json` ändert nur noch du (wie `freigaben.md`).
2. **Übergabepunkte mit verbindlichen Freigabekriterien:**

| Übergang | Kriterien (mechanisch, wo möglich) |
|---|---|
| Plan → Bauen | deine Freigabe; Commit „Plan freigegeben“ **mit Prüfsummen der verdeckten Tests** |
| Paket → Merge | Fertig-Nachweis für den Branch-Kopf; Reviewer-Bericht 🟢 oder 🟡 **als Datei gespeichert**; der Wächter erlaubt `git merge` nur mit `--no-ff` und mit Nachweis; Schranke nach dem Merge grün; blinder Lauf der verdeckten Tests (nur Anzahl, kein Inhalt) |
| Meilenstein | Abnahmetests grün **und Prüfsumme gleich**; Referenzfälle grün; Architektur- und Doppelcode-Werkzeug grün; bei Fachsoftware Mutationswert über der Schwelle; Scanner grün; Produktprüfer-Tabelle vollständig; kein offener kritischer Befund |
| `main` / Release | deine Freigabe; GitHub-Prüfung (CI) grün auf geschütztem Branch |

3. **Automatische Prüfungen:** Schranke (vorhanden), Abhängigkeiten (vorhanden), neu: Architektur-Werkzeug, Doppelcode, Suche nach Zugangsdaten, Sicherheits-Scanner, Mutationstests am Meilenstein, Abdeckung der Anforderungsnummern.
4. **Fehlerbehandlung und Eskalation:** Die harten Stopps und Schleifengrenzen im Grundgesetz sind gut und bleiben.
5. **Protokoll:** Der Agentenende-Hook speichert jeden vollständigen Bericht unter `docs/pruefberichte/`. Eine Kennzahlenzeile je Agent kommt nach `.dev-team/kennzahlen.jsonl` (Agent, Modell, Dauer, Tokens aus dem Gesprächsprotokoll).
6. **Rücksetzbarkeit:** `--no-ff` erzwungen, Tag je Meilenstein, `git reset --keep ORIG_HEAD` wie heute.
7. **Schutz der Einstellungen:**
   - `ConfigChange`-Hook blockiert jede Änderung, die Hooks oder Plugins betrifft.
   - Stolperdraht im Grundgesetz: Der Projektleiter liest zu Beginn die Einstellungsdateien. Das wirkt auch dann, wenn die Hooks schon aus sind.
   - Optional: Wächter als verwaltete Einstellung (managed settings, einmal mit Administratorrechten einrichten). Dann kann kein Agent ihn abschalten.

**Wann parallel, wann nacheinander:**
- Parallel nur, wenn alles davon zutrifft: keine gemeinsamen Dateien, keine gemeinsamen Referenzdaten, keine Schnittstelle, die noch entsteht, Grundlagen-Paket schon gemergt, jedes Paket voraussichtlich über 30 Minuten.
- Nacheinander bei: Datenmodell, Berechnungskern, gemeinsamen Testdaten, oder nach dem zweiten Merge-Konflikt im selben Auftrag.
- 3 statt 4 parallel reicht, bis Kennzahlen etwas anderes zeigen.

**Methoden aus deinem Auftrag (Punkte 1–12)**

| Nr. | Methode | Nutzen | Aufwand | laufende Kosten | Empfehlung |
|---|---|---|---|---|---|
| 1 | Mutationstests | hoch für den Berechnungskern | klein | Rechenzeit | Pflicht bei Fachsoftware, nur Kern, am Meilenstein (P1) |
| 2 | Property-Tests und Grenzwerte | hoch (z. B. „Rohrdimension wird nicht kleiner und dann wieder größer“) | klein | gering | Fachregeln als Property-Tests, verpflichtend (P1) |
| 3 | Unabhängige Referenzfälle | am höchsten | mittel (deine Daten) | gering | mit Herkunftsnachweis (P0) |
| 4 | Automatische Merge-Prüfung | hoch | klein | gering | im Wächter erzwingen (P0) |
| 5 | Geschützte Test- und Referenzdaten | hoch | klein | keine | Prüfsummen (P0) |
| 6 | Architektur- und Kreis-Erkennung | mittel bis hoch | klein | gering | Vorlagen mitliefern (P1) |
| 7 | Reproduzierbare Builds, Regression | mittel | klein | gering | CI-Vorlage aktivieren (P1) |
| 8 | Prüfprotokolle mit Verknüpfung | hoch | klein | keine | Berichte speichern, Anforderungsnummern in Testnamen (P1) |
| 9 | Risikobasierte Freigaben | Kostenersparnis | klein | – | Verschlankung laut Teil 3 (P1, nach Messung) |
| 10 | Modellunabhängigkeit | mittel | – | – | weitgehend schon erfüllt (Kurznamen `opus`/`sonnet`, Markdown-Steckbriefe); offen ist nur die Abhängigkeit von Claude-Code-Werkzeugnamen; Doku-Abgleich bei jedem Audit (P2) |
| 11 | Fehlerexperimente | **entscheidend für den Nachweis** | mittel | einmalig pro Version | P1 |
| 12 | Doppelte oder ineffiziente Aufrufe erkennen | mittel | klein | keine | Auswertungsskript über Log und Kennzahlen (P2) |

---

## Teil 5: Priorisierter Maßnahmenplan

### P0 – zwingend
1. **Einstellungen schützen.**
   - Betroffen: `hooks/hooks.json`, `vorlagen/projekt-settings.json`, `wissen/grundgesetz.md`.
   - Umsetzung: `ConfigChange`-Hook, der Änderungen an Projekt- und lokalen Einstellungen mit `disableAllHooks`, `enabledPlugins`, `hooks` oder `env` blockiert. Dazu ein Stolperdraht im Grundgesetz: Zu Beginn jeder Sitzung `.claude/settings.local.json` und `~/.claude/settings.json` lesen; steht dort `disableAllHooks` oder ist das Plugin aus: Stopp, dich fragen. Optional: Wächter als verwaltete Einstellung.
   - Nutzen: schließt K1. Aufwand: klein.
   - Erfolgskriterium: Der Versuch aus K1 wird abgefangen (V1).
2. **Merge nur mit `--no-ff` und Nachweis.**
   - Betroffen: `waechter.py` (`pruefe_git`), `pruefe_tests.py`.
   - Umsetzung: Der Wächter sperrt Fast-Forward-Merges des Projektleiters und Merges ohne Nachweis-Datei für den Branch-Kopf. Die Schranke in der Rolle `merge` meldet rot, wenn `HEAD` kein Merge-Commit ist.
   - Erfolgskriterium: Der Versuch aus H2 wird rot. Ein Plugin-Test bleibt dafür dauerhaft im Bestand.
3. **Prüfsummen der verdeckten Tests.**
   - Betroffen: `auftrag` Phase 6 und 7, `pruefe_tests.py`, `agents/tester.md`.
   - Umsetzung: Ein Plugin-Skript schreibt beim Entwurf die Prüfsummen in eine versionierte Datei. Die Schranke vergleicht die aufgedeckten Tests damit.
   - Erfolgskriterium: Ein geänderter Abnahmetest wird rot.
4. **Keine Außenwirkung ohne dich.**
   - Betroffen: `waechter.py`.
   - Umsetzung: Entwickler und Prüfer: `git push`, `npm/pip publish`, `curl`/`wget` mit Hochladen oder Senden sperren. Projektleiter: Push nur mit ausdrücklichem Ziel `dev-team/*`, kein `checkout main` + `merge`. Zusatzwerkzeuge (MCP) per **Erlaubnisliste** statt Sperrmuster.
   - Erfolgskriterium: Die Fälle aus H4 sind blockiert.
5. **Cloud ehrlich und abgesichert.**
   - Betroffen: `ANLEITUNG.md` Abschnitt 7, `team.json`.
   - Umsetzung: Dokumentieren, dass in claude.ai-Projekt-Threads das Plugin unter „Project settings > Plugins“ eingetragen werden muss, sonst gilt das Team dort nicht. `.claude/dev-team-start.sh` in den gesperrten Bereich verschieben (nur du).
   - Erfolgskriterium: Ein Cloud-Probelauf zeigt eine Wächter-Blockade.
6. **Testbefehl und Referenzfälle nur von dir.**
   - Betroffen: `team.json`, `pruefe_tests.py`.
   - Umsetzung: `teamkonfig` und `referenz-neu` aus den Rechten des Projektleiters nehmen. Neue Referenzfälle brauchen eine Zeile in `freigaben.md` mit der Prüfsumme der Datei.
   - Erfolgskriterium: Eine Änderung des Testbefehls oder ein neuer Referenzfall ohne deinen Eintrag wird blockiert oder rot.

### P1 – hoher Nutzen
1. **Berichte vollständig speichern.** Der Agentenende-Hook schreibt `last_assistant_message` nach `docs/pruefberichte/<Zeit>-<Agent>.md`; der Bereich ist für Agenten gesperrt. Erfolg: Jede Pflichtprüfung hat eine Datei.
2. **Blinder Lauf der verdeckten Tests nach jedem Merge.** Ein Plugin-Skript führt sie in einer Temp-Kopie aus und meldet nur die Anzahl bestanden und fehlgeschlagen. Erfolg: Ein Zusammenspielfehler fällt beim Paket auf, nicht erst am Meilenstein.
3. **Anforderungsnummern in Testnamen** (A1 …) und ein Skript, das prüft, dass jede Anforderung aus dem Lastenheft mindestens einen Test hat. Erfolg: Eine fehlende Abdeckung wird rot.
4. **Fachsoftware:** Fachregeln als Property-Tests verpflichtend; Mutationstests auf den Berechnungskern mit Schwelle am Meilenstein; erwartete Werte für Berechnungen nur aus Referenzfällen oder einer unabhängigen Vergleichsrechnung (z. B. deine bestehenden Excel-Werkzeuge).
5. **Vorlagen für Architekturtests** (Python: import-linter, JS/TS: dependency-cruiser) und eine Prüfung auf doppelten Code als Zusatzbefehl.
6. **Produktprüfung:** Der Tester schreibt Ende-zu-Ende-Tests (Playwright) für die wichtigsten Abläufe und Fehlerzustände. Der Produktprüfer bekommt einen gesperrten Ablageordner für Screenshots mit Bezug auf die Anforderungsnummer.
7. **Sicherheit:** Suche nach Zugangsdaten (z. B. gitleaks) und einen Sicherheits-Scanner (semgrep bzw. bandit) als feste Befehle; im Profil web ein einfacher dynamischer Test gegen den laufenden Server.
8. **Verschlankung laut Teil 3**, erst nach der Messung V10.
9. **CI-Vorlage für wichtige Projekte aktivieren**, mit Branch-Schutz auf `main`.

### P2 – optional
1. Entwickler unter WSL2 mit der Sandbox von Claude Code (Schreiben nur im Worktree, Lesesperre für `.dev-team/`). Das schließt H1 wirklich.
2. Auswertungsskript für ineffiziente Schleifen und doppelte Aufrufe.
3. Log mit Prüfsummen-Kette gegen nachträgliche Änderungen.
4. Doku-Abgleich der Claude-Code-Werkzeugliste bei jedem Release.

---

## Teil 6: Validierungsplan

Ein Mechanismus gilt erst als wirksam, wenn ein absichtlich eingebauter Fehler von ihm gefunden wird.

| Nr. | Was wird nachgewiesen | Wie | Erfolgskriterium |
|---|---|---|---|
| V1 | Einstellungsschutz | Plugin-Test plus ein kurzer echter Lauf: Skript schreibt `disableAllHooks` | Änderung blockiert bzw. Stopp beim Sitzungsstart |
| V2 | Merge-Prüfung | Versuch aus H2 als Plugin-Test | rot |
| V3 | Prüfsummen Abnahmetests | einen Abnahmetest ändern | rot |
| V4 | Außenwirkung | Fälle aus H4 als Wächter-Tests | blockiert |
| V5 | Nachvollziehbarkeit | nach einem Pilot: Anforderung → Test → Bericht → Commit für 3 zufällige Anforderungen nachverfolgen | lückenlos ohne Rückfrage |
| V6 | **Fehlerkatalog** (Kern) | 10 absichtlich eingebaute Fehler in einem Übungsprojekt, z. B. Vorzeichenfehler, Einheiten verwechselt, Grenzwert um eins verschoben, verschluckter Fehler, fest eingetragener Testwert, falscher Referenzwert, Schnittstelle weicht ab, Zugangsdaten im Code, übersprungener Test, passend gemachter Test. Team normal laufen lassen, notieren, **welche Stufe** welchen Fehler findet. | Mindestens 8 von 10 werden vor deiner Abnahme gefunden; jeder Prüfer findet mindestens einen Fehler, den die Werkzeuge nicht finden, sonst gehört er auf „bei Bedarf“ |
| V7 | Testqualität | Mutationswert des Berechnungskerns messen | Schwelle festlegen (z. B. 70 %) und halten |
| V8 | **Fairer Vergleich mit einem Einzelagenten** | 6–8 echte Aufgaben aus deinem Rückstand, je in einer frischen Kopie, gleiche Anforderungen, gleiches Modell (Opus), gleiches Zeitlimit. Die Abnahmetests schreibst **du** vorher (oder lässt sie unabhängig schreiben); keines der beiden Systeme sieht sie. Reihenfolge abwechseln. Bewertung ohne Wissen, welches System was gebaut hat. | Messen: bestandene Abnahmetests, gefundene eingebaute Fehler, Fehler in 2 Wochen Nutzung, Kosten (Tokens), Zeit, Eingriffe durch dich. Das Team lohnt sich nur, wenn es bei Fehlern deutlich besser ist und die Mehrkosten kleiner sind als der Wert der vermiedenen Fehler. |
| V9 | Windows-Pilot | mehrstündiger Lauf auf deinem Rechner mit parallelen Entwicklern | weniger als 2 Fehlalarme pro Stunde, keine Umgehung, Wächter-Dauer gemessen |
| V10 | Nutzen je Rolle | über 5 Aufträge: je Prüfer zählen, wie viele seiner Befunde den Plan oder Code tatsächlich verändert haben | Rollen ohne verwertbaren Befund → bei Bedarf statt immer |

**Kennzahlen dauerhaft** (aus `.dev-team/kennzahlen.jsonl` und dem Log): Kosten und Zeit je abgenommener Anforderung, Fix-Runden je Paket, Blockaden und Wiederholungen, Merge-Konflikte, Fehler nach der Abnahme, Fund-Stufe je Fehler, deine Eingriffe.

---

## Pflichtfragen des Auditors (kurz)

1. **Teamzwang:**
   - Technisch: Agenten-Aufrufe, Modelle, unbekannte Werkzeuge, `claude` über die Shell des Projektleiters (getestet).
   - Lücke: Ein Entwickler-Skript kann `claude` starten (X6). In claude.ai-Projekt-Threads gibt es ohne eingetragenes Plugin gar keinen Teamzwang (Doku).
2. **Rechte:**
   - Für Write/Edit technisch umgesetzt.
   - Über die Shell beim Entwickler und Tester nur „erschwert“: eigene Skripte funktionieren. Der Projektleiter ist per Erlaubnisliste gut eingegrenzt, kann aber Testbefehl, Startskript und neue Referenzfälle ändern.
3. **Belegpflicht:**
   - Fertig-Hook und Schranke sind vorhanden.
   - Lücken: Fast-Forward-Merge (H2), Merge ohne Nachweis, unvollständige Berichte (H5).
4. **KI-Schwächen:**
   - Testtricks: gut abgedeckt (Schranke).
   - Erfundene Pakete: gut (Abhängigkeits-Schranke).
   - Unsicherer Code: nur durch Lesen (M6).
   - Doppelter Code: nur durch KI (M4).
   - Abdriften: Baupläne und Meilensteine.
   - Verschluckte Fehler: nur Anweisung und Review.
5. **Zusammenarbeit:**
   - Rollen klar.
   - Abnahmetests kommen zu spät (M3).
   - Kritiker und Dreierrunde überschneiden sich (Teil 3).
6. **Technik:**
   - `claude plugin validate --strict` und die Selbstprüfung bestanden.
   - Steckbrief-Felder (`isolation`, `maxTurns`, `disallowedTools`, `model`) laut aktueller Doku gültig.
   - `onFailure: block` gibt es (ab 2.1.295).
   - `ConfigChange` ungenutzt.
   - Cloud-Versprechen veraltet.
7. **Windows:** nicht geprüft (kein Windows-Rechner). Unterwegs sind Git-Bash-Pfadumwandlung und die Suche nach Python vorgesehen (gelesen). Die Sandbox gibt es unter nativem Windows nicht (Doku).
8. **Autonomie:**
   - Löschen und Verlauf-Umschreiben in Git: gut gesperrt.
   - Push, Veröffentlichen, Datenabfluss: lückenhaft (H4).
   - Lieferkette: Abhängigkeits-Schranke gut; der Cloud-Stand ist ohne `plugin_stand` nicht festgenagelt (bekannt, mit Warnung).

---

## Prüfungen

| Prüfung | Art | Ergebnis |
|---|---|---|
| `python3 -m unittest discover -s plugins/dev-team/tests` | ausgeführt | 176 Tests, OK |
| `bash plugins/dev-team/scripts/pruefe-plugin.sh` | ausgeführt | „OK: Selbstprüfung ohne Befund (Version 3.4.0)“ |
| `claude plugin validate --strict plugins/dev-team` | ausgeführt | Validation passed |
| 47 Wächter-Szenarien in einer Kopie (`harness.py`, `harness2.py`, `harness3.py` im Scratch-Ordner) | ausgeführt | Ergebnisse wie in Teil 1 und 2 |
| Skript liest verdeckte Tests | ausgeführt | gelesen |
| Fast-Forward-Merge + Schranke | ausgeführt | fälschlich grün |
| `disableAllHooks` per Skript, Projekt-Hook | ausgeführt (Haiku, ohne bypassPermissions) | sofort aus |
| dasselbe, Plugin-Hook | ausgeführt | in derselben Sitzung noch aktiv, nächste Sitzung aus |
| Laufzeit Wächter | ausgeführt | etwa 55–60 ms je Aufruf (Linux) |
| Offizielle Doku (Subagents, Hooks, Settings, Settings-Referenz, Projects) | gelesen am 26.10.2026 | siehe Teil 2 |
| Agenten, Skills, Grundgesetz, Vorlagen, Skripte, Audits 3.3.0, Changelog | gelesen | – |
| Pilot `rohrnetz-check` | nur Dateien gelesen | 4 Fehlblockaden in 10 Minuten |

**Nicht geprüft (mit Grund):**
- Windows: kein Rechner verfügbar.
- Cloud-Sitzung live: würde eine teure Umgebung brauchen; nur die Doku gelesen.
- Ob eine Berechtigungsabfrage von Claude Code die Fälle aus H4 zusätzlich stoppt: hängt vom Modus ab, nicht im echten Lauf getestet.
- Mehrstündiger Lauf mit parallelen Entwicklern: Kosten; das macht der Pilot.
- Ergebnisqualität der KI-Prüfer: es gibt keine Messdaten (genau das ist H6).

---

## Eignung für ein komplexes Projekt (z. B. SiRo)

**Bedingt.** Planung, Baupläne, Paket-Review, Schranke und harte Stopps sind auf gutem Niveau. Für mehrstündige Läufe ohne Aufsicht erst, wenn:
1. P0-1 bis P0-4 umgesetzt sind,
2. bei Fachsoftware P0-6 und P1-4 umgesetzt sind (Referenzfälle mit Herkunft, Fachregeln als Property-Tests, Mutationstests auf den Kern),
3. der Fehlerkatalog V6 einmal durchgelaufen ist,
4. ein Windows-Pilot (V9) ohne Umgehung durchgelaufen ist.

---

## Was für 9 und 10 fehlt

**Für eine 8:** P0-1 bis P0-6 umgesetzt und mit V1–V4 nachgewiesen.

**Für eine 9:**
- P1-1 bis P1-4 umgesetzt.
- Fehlerkatalog V6 mit mindestens 8 von 10 gefundenen Fehlern.
- Windows-Pilot V9 bestanden.
- CI mit Branch-Schutz für `main` in deinen wichtigen Projekten aktiv.
- Doku stimmt Satz für Satz mit den Tests (z. B. „stark erschwert“ → „mit eigenem Skript möglich, wird nachträglich erkannt“).

**Für eine 10:**
- Entwickler laufen betriebssystemseitig getrennt (WSL2-Sandbox oder Container).
- Der Wächter läuft als verwaltete Einstellung, die kein Agent abschalten kann.
- Die verdeckten Tests liegen außerhalb des Rechners (z. B. als CI-Geheimnis).
- Mutationsschwellen sind Pflicht.
- Der Vergleich V8 zeigt einen messbaren Vorteil gegenüber einem Einzelagenten zu vertretbaren Kosten.

**Grundsätzlich nicht ganz lösbar:**
- Wer Code ausführen darf, kann auf einem Rechner ohne Sandbox alles. Abfangen lässt sich das nur nachträglich (Prüfsummen, CI) oder mit einer Sandbox.
- Grüne Tests beweisen keine fachliche Richtigkeit. Das unabhängige Orakel bleiben deine Referenzfälle.
- Alle Agenten sind Claude-Modelle und haben dieselben blinden Flecken. Das ist im Grundgesetz ehrlich benannt.

---

**Bitte an den Projektleiter:**
- Nach P0 einen frischen Auditor nur die Versuche V1–V4 wiederholen lassen.
- Die Pilot-Ergebnisse gegen M3 (späte Abnahmetests) und M7 (Fehlalarme) auswerten.

**Zum Merken (für die Hauptsitzung):**
- In Claude Code 2.1.310 schaltet `"disableAllHooks": true` in `.claude/settings.local.json` Plugin-Hooks **ab der nächsten Sitzung** ab, Projekt-Hooks sofort. Getestet; die Datei ist per `.gitignore` für die Schranke unsichtbar.
- In claude.ai-Projekt-Cloud-Threads laufen Hooks und Plugins aus `.claude/settings.json` nicht; Plugins müssen dort unter „Project settings > Plugins“ eingetragen werden.
- Claude Code hat einen `ConfigChange`-Hook, der Einstellungsänderungen blockieren kann.

**Wichtige Dateien:**
- `/home/claude/roelz-plugins/plugins/dev-team/scripts/waechter.py`
- `/home/claude/roelz-plugins/plugins/dev-team/scripts/pruefe_tests.py`
- `/home/claude/roelz-plugins/plugins/dev-team/skills/auftrag/SKILL.md`
- `/home/claude/roelz-plugins/plugins/dev-team/agents/tester.md`
- `/home/claude/roelz-plugins/plugins/dev-team/hooks/hooks.json`
- `/home/claude/roelz-plugins/plugins/dev-team/vorlagen/gitignore.txt`
- `/home/claude/roelz-plugins/plugins/dev-team/team.json`
- `/home/claude/roelz-plugins/ANLEITUNG.md`
- Versuchsskripte: `/tmp/claude-0/-home-claude/a4c81a93-19cb-592d-9747-5a6e216b1947/scratchpad/audit4/harness.py`, `/tmp/claude-0/-home-claude/a4c81a93-19cb-592d-9747-5a6e216b1947/scratchpad/audit4/harness2.py`, `/tmp/claude-0/-home-claude/a4c81a93-19cb-592d-9747-5a6e216b1947/scratchpad/audit4/harness3.py`

Quellen (offizielle Doku, gelesen am 26.10.2026):
- [Subagents](https://code.claude.com/docs/en/sub-agents)
- [Hooks](https://code.claude.com/docs/en/hooks)
- [Settings](https://code.claude.com/docs/en/settings)
- [Settings-Referenz](https://code.claude.com/docs/en/settings-reference)
- [Projects](https://code.claude.com/docs/en/claude-projects)

Ich warte auf Simons Freigabe, bevor irgendetwas geändert wird.
