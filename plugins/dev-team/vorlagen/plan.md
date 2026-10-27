# Plan: [Auftrag in einem Satz]

**Stand:** [Datum] · **Stufe:** [Normal / Groß] · **Status:** Entwurf / geprüft / freigegeben am [Datum]

## 1. Ziel
Was ist nach diesem Auftrag anders? Für Simon verständlich, 2–4 Sätze.

## 2. Anforderungen
Verweis auf `docs/lastenheft.md`. Liste der Anforderungen, die dieser Auftrag umsetzt:
| Nr. | Anforderung (Simons Worte) | Arbeitspaket(e) |
|---|---|---|
| A… | | P… |
Jede Anforderung muss einem Paket zugeordnet sein.

## 3. Ausgangslage im Code
Welche Teile gibt es schon, wie hängen sie zusammen? Was ist der Stand der Tests und Referenzfälle?

## 4. Lösung
Struktur und Abhängigkeitsrichtung kommen vom `architekt` (Details in `docs/ARCHITEKTUR.md`).
- Aufbau: welche Module/Dateien neu, welche geändert, wie sie zusammenspielen (gern als Text-Diagramm).
- Datenmodell: ändert es sich? Wenn ja, wie genau, und was passiert mit bestehenden Daten/Projekten?
- Warum diese Lösung und nicht eine andere (kurz, mit verworfenen Alternativen).
- Annahmen: alles, was angenommen statt gewusst wird, markiert mit **ANNAHME**.

## 5. Arbeitspakete
Jedes Paket für sich lauffähig und testbar. Paketschnitt, Dateien und Parallelität legt der `architekt` fest. Parallel nur, wenn keine gemeinsamen Dateien und keine Abhängigkeit.
| Nr. | Was | Dateien (gehören dem Paket) | Fertig, wenn … (prüfbar) | Abhängig von | Parallel möglich mit |
|---|---|---|---|---|---|
| P1 | Grundlagen (Datenmodell, Schnittstellen) | | | – | – |

**Gruppen:** Gruppe 1: P1 · Gruppe 2: P2, P3 (parallel) · …
**Meilensteine:** M1 = P1–P4 · …

## 6. Absicherung
- Testgetrieben: jedes Abnahmekriterium bekommt zuerst einen roten Test (Entwickler) – zusätzlich verdeckte Abnahmetests (Tester) vor dem Bauen.
- Architekturtests in `tests/architektur/` (Architekt).
- Neue Abhängigkeiten: Name, Grund, Abhängigkeits-Schranke.
- Betroffene Referenzfälle, neue Referenzfälle nötig?
- Betroffene Fachregeln, neue Plausibilitätsprüfungen (erst rot am alten Stand, dann beheben).

## 7. Risiken
Bekannte Risiken und was dagegen getan wird. Ergebnisse von Kritiker, Fachprüfer und Abwägungsrunde werden hier eingearbeitet.

## 8. Harte Stopps für diesen Auftrag
Zusätzlich zu den Stopps im Grundgesetz: [projektspezifische Stopps, z. B. „Rohrtabelle muss geändert werden“].

## 9. Offene Fragen an Simon
Was vor der Freigabe geklärt sein muss.
