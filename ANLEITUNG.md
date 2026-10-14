# Dev-Team – Anleitung

Stand: Oktober 2026 · Version 2.4

Dieses Repo enthält zwei Plugins für Claude Code: **`dev-team`** und **`tool-scout`**. Beide enthalten kein Firmen- oder Kundenwissen und dürfen deshalb auch auf einen Arbeitsrechner (wenn dein Arbeitgeber eigene Plugins erlaubt). Das Backoffice-Plugin `firma` liegt bewusst **nicht** hier.

Du richtest alles **einmal pro Rechner** ein, danach gilt es in **jedem Projekt**, im Terminal genauso wie in VS Code.

---

## 1. Wer macht was?

Du sprichst immer nur mit **einer** Person, dem Projektleiter. Die anderen sind unabhängige Agenten, die er zu festen Zeitpunkten ruft. Jeder fängt frisch an, kennt nur seinen Auftrag und berichtet mit Ampel 🟢🟡🔴 zurück.

| Rolle | Wann | Aufgabe |
|---|---|---|
| **Projektleiter** | immer | Anforderungen festhalten, ausführlich planen, bauen, dir berichten |
| **Kritiker** | nach dem Plan | Lücken, Risiken, fehlende Anforderungen im Plan finden |
| **Fachprüfer** | Plan und Ergebnis | Kann das Ergebnis in der Praxis so sein? Fachregeln als automatische Prüfung im Code |
| ↳ **Rechercheur** | bei Wissenslücken | Fachgrundlagen mit Quellen suchen, zuerst in deinen Unterlagen |
| ↳ **Quellenprüfer** | nach dem Rechercheur | jede Aussage gegen eine zweite Quelle prüfen |
| **Abwägungsrunde** | vor der Freigabe | drei unabhängige Urteile: **Fachexperte** (praxistauglich?), **Pragmatiker** (Aufwand/Nutzen?), **Langfrist-Architekt** (rächt sich das später?) |
| **Tester** | nach dem Bauen | Funktionen, Referenzfälle, Fachregeln über viele erzeugte Fälle |
| **Reviewer** | nach dem Tester | unabhängiger Diff-, Code- und Architekturcheck |
| **Sicherheitsprüfer** | bei Login, Rechten, sensiblen Daten, Server, Migrationen, Updates und großen Releases | Angriffswege, Datenschutz, Vertrauensgrenzen und Update-Sicherheit |
| **Produktprüfer** | zum Schluss | jede Anforderung mit konkretem Nachweis abnehmen: A1 ✅ A2 ❌ |
| **Auditor** | auf Wunsch (`/dev-team:audit`) | prüft das Dev-Team oder ein Projekt unabhängig, bewertet 1–10, nennt Schwachstellen mit Beleg; behebt selbst nichts |
| Tool-Scout | wenn du willst | fremde Plugins/Skills prüfen, bevor du sie installierst |

## 2. Wie viel Prüfung?

Der Projektleiter sagt dir vor dem Start, welche Stufe er wählt. Du kannst hochstufen („mach das als Stufe Groß“).

| Stufe | Beispiel | Ablauf |
|---|---|---|
| **Klein** | Tippfehler, Farbe, klarer Einzelfehler | direkt beheben + Test |
| **Normal** | neues Feature über mehrere Dateien | voller Ablauf, Abwägungsrunde nur bei 🟡/🔴 |
| **Groß** | Berechnung, Datenmodell, neues Modul | voller Ablauf mit allen Instanzen |

## 3. Der Ablauf eines Auftrags

Start mit: `/dev-team:auftrag <was gebaut werden soll>`

1. **Anforderungen** – jede deiner Anforderungen einzeln mit Nummer. ⏸ *Du bestätigst.*
2. **Ausführlicher Plan** – so genau, dass jemand ihn stundenlang ohne Rückfragen umsetzen kann.
3. **Kritiker** → 4. **Fachprüfer** (+ Recherche) → 5. **Abwägungsrunde**
6. ⏸ **Freigabe durch dich** – Ampel, wichtigste Punkte, neue Fachregeln, „Freigabe zum eigenständigen Bauen?“
7. **Eigenständig bauen** – auch wenn du stundenlang weg bist:
   - Stand jederzeit in `docs/STATUS.md`
   - Fragen landen in `docs/OFFENE_FRAGEN.md`, es wird nicht geraten
   - Harter Stopp bei roten Referenzfällen, verletzten Fachregeln oder Änderungen außerhalb des Plans
8. **Prüfen** – Tester → Fachprüfer (falls fachlich relevant) → Reviewer → Sicherheitsprüfer (falls sicherheitsrelevant) → Produktprüfer
9. ⏸ **Bericht** – mit vollständiger Abnahmeliste

## 4. Fachregeln – damit offensichtliche Fehler nicht durchrutschen

Hunderte Tests helfen nichts, wenn keiner prüft, ob ein Ergebnis **fachlich überhaupt möglich** ist. Deshalb hat jedes Projekt mit Berechnungen `fachwissen/regeln.md`, z. B. „Rohrdimension wird in Fließrichtung nie größer“.

- Jede **von dir bestätigte** Regel wird als automatische Prüfung gebaut, die über **jedes** berechnete Ergebnis läuft: Referenzfälle, viele zufällig erzeugte Fälle und im Programm selbst.
- Neue Regel: Sie muss am fehlerhaften Stand zuerst **rot** werden. Das ist der Beweis, dass sie wirkt.
- Recherche-Ergebnisse sind nur **Vorschläge**. Nur du machst daraus Regeln.
- Eigene Unterlagen (Handbücher, Datenblätter, Rohrtabellen) in `fachwissen/quellen/` legen. Die sind die beste Quelle.
- Recherche gezielt starten: `/dev-team:recherche <Thema>`

## 5. Sehen, wer gerade was macht

- **Im Chat:** Der Projektleiter kündigt jeden Agenten an („→ Kritiker prüft den Plan“) und meldet das Ergebnis mit Ampel („← Kritiker: 🟡 …“). In VS Code kannst du jeden Agenten-Block aufklappen.
- **`docs/STATUS.md`:** oben steht immer, welche Phase und welcher Agent gerade läuft.
- **`docs/AGENTEN_LOG.md`:** wird automatisch mitgeschrieben, auch wenn du nicht da bist. Jede Zeile: Uhrzeit, ▶ Start / ■ Ende mit Ampel, Agent, Auftrag bzw. Ergebnis.

## 6. Mehrere Projekte und gemeinsames Lernen

- **Getrennt arbeiten:** Jedes Projekt hat seinen eigenen Ordner und sein eigenes VS-Code-Fenster. Mehrere können gleichzeitig laufen, ohne sich zu sehen.
- **Gemeinsam lernen:** Geteilt werden nur zwei Dinge, beide ohne Projekt-, Kunden- oder Firmennamen:
  - **Lessons** – Erfahrungen zu Arbeitsweise und Code. Beim eigenständigen Bauen sammelt jedes Projekt Vorschläge in `docs/LEKTIONEN_VORSCHLAEGE.md`. Im Abschlussbericht bestätigst du sie, dann übernimmt `/dev-team:lektion vorschlaege` sie für alle Projekte.
  - **Fachwissen-Bibliothek** (`plugins/dev-team/wissen/fachwissen/`) – allgemeine Regeln je Fachgebiet, z. B. `waermenetz.md`. Nach jeder bestätigten Fachregel fragt der Projektleiter, ob sie allgemein gilt. Neue Projekte im selben Fachgebiet starten mit allen Regeln von dort.
- **Bleibt im Projekt:** interne Werte und Unterlagen eines Arbeitgebers oder Kunden.
- Auf dem Arbeitsrechner bleiben Lessons lokal. Die Fachwissen-Bibliothek ist allgemein und wird über GitHub auf beiden Rechnern aktuell gehalten.

## 7. Gilt automatisch: jedes Projekt, auch in der Cloud

- **Auf deinen Rechnern:** Das Plugin ist für deinen ganzen Benutzer installiert. Agenten und Grundgesetz gelten damit in **jedem** Projekt, auch in neuen, ohne dass du etwas tun musst.
- **Neues oder noch nicht aufgenommenes Projekt:** Beim Start merkt der Projektleiter das und bietet dir `/dev-team:neues-projekt` bzw. `/dev-team:projekt-aufnehmen` an.
- **Cloud-Sitzungen** (ein Projekt baut auf GitHub in der Cloud weiter, während dein Laptop aus ist): Dort gibt es keine installierten Plugins. Deshalb legen `neues-projekt` und `projekt-aufnehmen` in jedes Repo zwei kleine Dateien:
  - `.claude/settings.json` startet bei jeder Sitzung
  - `.claude/dev-team-start.sh`, das in der Cloud das Dev-Team von GitHub holt und Grundgesetz, Agenten, Abläufe und Protokoll bereitstellt. Auf deinen Rechnern tut es nichts, dort übernimmt das installierte Plugin.
- In der Cloud heißen die Befehle mit Bindestrich, z. B. `/dev-team-auftrag`, die Agenten ohne Präfix, z. B. `kritiker`.
- **Voraussetzung:** Die Cloud-Sitzung muss `github.com/roelzer/roelz-plugins` erreichen (das Repo ist öffentlich). Wenn nicht, sagt dir der Projektleiter das gleich zu Beginn.
- **Sicherheit der Lieferkette:** Ohne weitere Angabe holt die Cloud den aktuellen Stand von `main`. Wer einen geprüften Stand festnageln will, setzt in der Cloud-Umgebung die Variable `DEV_TEAM_REF` auf einen Tag oder Commit. Wegen des öffentlichen Repos darf dort nie etwas Vertrauliches stehen.
- Lektionen aus Cloud-Sitzungen landen als Vorschlag in `docs/LEKTIONEN_VORSCHLAEGE.md` des Projekts. Übernommen werden sie später, wenn du dabei bist.

## 8. Befehle

| Befehl | Wofür |
|---|---|
| `/dev-team:auftrag <…>` | Auftrag Stufe Normal/Groß durchführen |
| `/dev-team:neues-projekt <name>` | neues Projekt mit Struktur anlegen |
| `/dev-team:projekt-aufnehmen` | bestehendes Projekt (z. B. SiRo) ins Dev-Team holen |
| `/dev-team:recherche <Thema>` | Fachgrundlagen recherchieren |
| `/dev-team:lektion <…>` | Lektion aus einem Fehler festhalten |
| `/dev-team:lektion vorschlaege` | gesammelte Lektionsvorschläge eines Projekts übernehmen |
| `/dev-team:audit plugin\|projekt` | unabhängiges Audit, Behebung, Nachprüfung durch frischen Auditor |
| `/dev-team:uebergabe` | Übergabe an Kunden vorbereiten |
| `/dev-team:einrichten privat\|arbeit` | einmalige Einrichtung pro Rechner |
| `/tool-scout:scout <wofür>` | fremde Plugins/Skills suchen und prüfen |
| `@dev-team:<agent>` | einen Agenten gezielt rufen, z. B. `@dev-team:fachpruefer` |

---

## 9. Einrichtung auf einem Rechner

**Voraussetzungen:** Git für Windows, VS Code mit der Claude-Code-Erweiterung, Zugriff auf dein GitHub-Konto.

1. **Repo klonen** (VS-Code-Terminal):
   ```
   git clone https://github.com/roelzer/roelz-plugins.git C:/Users/<du>/roelz-plugins
   ```
2. **Plugins installieren:**
   ```
   claude plugin marketplace add C:/Users/<du>/roelz-plugins
   claude plugin install dev-team@roelz-plugins
   claude plugin install tool-scout@roelz-plugins
   ```
   Den Marktplatz **aus dem lokalen Ordner** hinzufügen, nicht direkt von GitHub. Nur so landen neue Lektionen im Repo.
3. **VS Code komplett schließen und neu öffnen.** Plugins werden nur beim Start geladen.
4. **Einrichten:** Claude Code starten und eingeben:
   - privater Rechner: `/dev-team:einrichten privat`
   - Arbeitsrechner: `/dev-team:einrichten arbeit` (Lektionen bleiben dann lokal und fließen nicht ins private Repo)
5. **Noch einmal neu starten.** Fragt Claude, ob verknüpfte Dateien geladen werden dürfen: zustimmen.
6. Prüfen: `/agents` zeigt die Dev-Team-Agenten mit `dev-team:` davor.

## 10. Updates

Wird am Dev-Team etwas geändert (neue Regel, neuer Agent), landet es auf GitHub. Auf dem anderen Rechner:
```
cd C:/Users/<du>/roelz-plugins
git pull
claude plugin marketplace update roelz-plugins
```
Danach VS Code neu starten.

## 11. Senior-Qualitätsregeln und Grenzen der Autonomie

- Gebaut wird eigenständig, aber auf einem eigenen Branch. Kein Push auf `main`, kein Löschen, keine Datenbank-Migration, kein Release, keine Schlüssel in der Sitzung und keine Daten an externe Dienste ohne dein Ja. Die vollständige Liste steht im Grundgesetz („Grenzen der Autonomie“).
- Technische Grenzen: höchstens drei Agenten gleichzeitig, jeder mit Schrittobergrenze, Schleifen enden nach drei Runden. Große Aufträge werden in Meilensteine mit eigenem Stopp geteilt. Der Stand steht in Dateien (`docs/STATUS.md`), damit nach `/clear` nichts verloren geht.
- Gibt dein Auftrag eigene Phasen vor („nur analysieren, noch nichts ändern“), gilt das vor dem Standardablauf.
- Selbstprüfung des Plugins: `bash plugins/dev-team/scripts/pruefe-plugin.sh` (findet widersprüchliche Namen, tote Verweise, uneinheitliche Versionen).

- Die Projektleitung bleibt für Integration und Abschluss verantwortlich, auch wenn Spezialisten prüfen.
- Kritische oder hohe Sicherheits-/Datenintegritätsbefunde blockieren die Freigabe.
- Nur tatsächlich ausgeführte Tests gelten als ausgeführt; nicht geprüfte Punkte werden offen benannt.
- Bestehende Referenzwerte und Tests werden nicht stillschweigend angepasst, um grüne Ergebnisse zu erhalten.
- Für neue Rollen und die präzisierte Pipeline siehe `plugins/dev-team/TEAM-PROTOKOLL.md` und `plugins/dev-team/CHANGELOG.md`.

## 12. Gut zu wissen

- **Arbeit:** Code, den du für deinen Arbeitgeber baust, gehört in der Regel dem Arbeitgeber. Nichts davon in deinen privaten Baukasten übernehmen.
- **Fremde Plugins** nie direkt aus Videos installieren. Erst `/tool-scout:scout check`.
- **Tokens:** Abwägungsrunde und Recherche kosten spürbar mehr. Deshalb die Stufen nutzen und nach jeder Aufgabe `/clear`.
- **Grenzen:** Alle Agenten sind Claude. Mehrere Instanzen haben ähnliche blinde Flecken. Die stärkste Absicherung bleiben deine Referenzfälle und die von dir bestätigten Fachregeln.
