# Dev-Team – Anleitung

Stand: Oktober 2026 · Version 2.1

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
| **Reviewer** | nach dem Tester | Code-Qualität, Sicherheit, Architekturregeln |
| **Produktprüfer** | zum Schluss | jede Anforderung einzeln abnehmen: A1 ✅ A2 ❌ |
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
8. **Prüfen** – Tester → Fachprüfer → Reviewer → Produktprüfer
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

## 7. Befehle

| Befehl | Wofür |
|---|---|
| `/dev-team:auftrag <…>` | Auftrag Stufe Normal/Groß durchführen |
| `/dev-team:neues-projekt <name>` | neues Projekt mit Struktur anlegen |
| `/dev-team:projekt-aufnehmen` | bestehendes Projekt (z. B. SiRo) ins Dev-Team holen |
| `/dev-team:recherche <Thema>` | Fachgrundlagen recherchieren |
| `/dev-team:lektion <…>` | Lektion aus einem Fehler festhalten |
| `/dev-team:lektion vorschlaege` | gesammelte Lektionsvorschläge eines Projekts übernehmen |
| `/dev-team:uebergabe` | Übergabe an Kunden vorbereiten |
| `/dev-team:einrichten privat\|arbeit` | einmalige Einrichtung pro Rechner |
| `/tool-scout:scout <wofür>` | fremde Plugins/Skills suchen und prüfen |
| `@dev-team:<agent>` | einen Agenten gezielt rufen, z. B. `@dev-team:fachpruefer` |

---

## 8. Einrichtung auf einem Rechner

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

## 9. Updates

Wird am Dev-Team etwas geändert (neue Regel, neuer Agent), landet es auf GitHub. Auf dem anderen Rechner:
```
cd C:/Users/<du>/roelz-plugins
git pull
claude plugin marketplace update roelz-plugins
```
Danach VS Code neu starten.

## 10. Gut zu wissen

- **Arbeit:** Code, den du für deinen Arbeitgeber baust, gehört in der Regel dem Arbeitgeber. Nichts davon in deinen privaten Baukasten übernehmen.
- **Fremde Plugins** nie direkt aus Videos installieren. Erst `/tool-scout:scout check`.
- **Tokens:** Abwägungsrunde und Recherche kosten spürbar mehr. Deshalb die Stufen nutzen und nach jeder Aufgabe `/clear`.
- **Grenzen:** Alle Agenten sind Claude. Mehrere Instanzen haben ähnliche blinde Flecken. Die stärkste Absicherung bleiben deine Referenzfälle und die von dir bestätigten Fachregeln.
