# Entscheidungsrat

Ab 3.23 laufen alle Aufträge im Autopilot. Fragen, die früher bei Simon lagen (Produkt- und Fachfragen, tragende Architekturentscheidungen, Wow-Auswahl, Prüferpunkte nach zwei Überarbeitungen), entscheidet dieser Rat. Simon bekommt die Entscheidungen im Bericht und kann jede später umwerfen.

Anlass: Simon: „ich will, dass alles autonom läuft“, für alle Projekte (24.11.2026). Vorbild ist das „LLM Council“ von Promptgeflüster: fünf Berater antworten unabhängig, bewerten sich anonym, ein Vorsitz entscheidet.

## Wann
- **Nie bei Werkstatt- und Klein-Aufträgen.** Die laufen wie bisher ohne Plan und ohne Rat. Simon: „gerade kleine Änderungen können dadurch unnötig lang werden“.
- **Nur, wenn es eine tragende offene Frage gibt.** Hat die Planprüfung keine, entfällt der Rat ganz. Das ist bei den meisten Normal-Aufträgen so.
- **Gesammelt, nicht einzeln:** Alle offenen Fragen einer Phase gehen in **einen** Rat, nach der Planprüfung (Phase 3/4) und bei Bedarf noch einmal je Meilenstein. Kostet etwa 10 Agentenläufe, deshalb nie für eine einzelne Kleinigkeit.
- **Nicht vor den Rat** gehören technische Fragen ohne Produktfolge. Die entscheidest du wie bisher nach der Empfehlung des zuständigen Agenten, mit einer Zeile in `docs/ENTSCHEIDUNGEN.md`.

## Was trotzdem bei Simon bleibt („Nur Simon“, hält den Lauf nie an)
Das ist keine Entscheidungsfrage, sondern eine Grenze:
- **Was technisch nur ein Mensch kann:** Konten, Zahlungen, echte Geräte, Netzwerk.
- **Was nach außen geht oder nicht umkehrbar ist:**
  - Veröffentlichen und Ausliefern. Ausnahme: Der Auftrag verlangt es schon („ausliefern“, „online stellen“, „deployen“, „veröffentlichen“). Dann geht es ohne Rückfrage, sobald alles grün ist.
  - Produktive Datenbanken und Migrationen.
  - Daten löschen oder überschreiben, die nicht neu angelegt wurden.
  - Daten an externe Dienste senden.
  - Neue laufende Kosten.
- **Geänderte bestehende Abnahmetests und Referenzwerte:** Das ist der Schutz dagegen, dass sich das Team seine eigene Prüfung passend macht.
- **Unbestätigte Fachregeln:** Sie bleiben „vorgeschlagen“, Berechnungen damit gelten als vorläufig.

So ein Paket wird gebaut, geprüft und geparkt. Der fertige Schritt steht in `docs/OFFENE_FRAGEN.md` unter „Nur Simon“.

## Besetzung (5 Berater, jeder ohne die anderen)
| Berater | Agent | Blick |
|---|---|---|
| Fach | `fachexperte` | Was verlangt das Fachgebiet, was erwarten Nutzer dort? |
| Einfach | `pragmatiker` | Die einfachste tragfähige Lösung, Aufwand gegen Nutzen |
| Langfrist | `langfrist-architekt` | Was hält in zwei Jahren noch, was wird teuer? |
| Nutzer | `produktpruefer` | Was erlebt der Nutzer, was verwirrt ihn? |
| Risiko | `sicherheitspruefer` | Was kann schiefgehen: Daten, Sicherheit, Recht? |

Modell: `sonnet`, bei Stufe Groß oder im Profil `fachsoftware` `opus`. Jeder bekommt Lastenheft, Plan, `docs/ARCHITEKTUR.md`, `docs/kunde.md` (falls vorhanden) und die Fragenliste. Die Antworten der anderen sieht keiner. Auftrag an jeden: „Modus `rat`: Beantworte jede Frage mit genau einer Option, einem Satz Begründung und dem, was es kostet, wenn die Wahl falsch ist. Keine Ausweichantwort.“

## Ablauf
1. **Fragenliste** in `docs/rat/<datum>-fragen.md`:
   - je Frage 2–4 Optionen und die Empfehlung des zuständigen Agenten,
   - was sich mit jeder Option für den Nutzer ändert,
   - was die Anforderungen in Simons Worten dazu sagen.
2. **Runde 1:** alle 5 Berater parallel, in **einer** Antwort gestartet.
3. **Runde 2, blind bewerten:** Die Antworten werden auf Buchstaben A–E umbenannt, ohne Rolle. Jeder Berater bekommt alle fünf und nennt je Frage die beste und die schlechteste Antwort, mit einem Satz. Das läuft als Nachricht an die schon fertigen Agenten.
4. **Vorsitz bist du:**
   - Je Frage gilt die Mehrheit aus Runde 1, bei Gleichstand die besser bewertete Antwort aus Runde 2.
   - Ein belastbarer Befund des Risiko-Beraters zu Sicherheit, Datenverlust oder Recht wird **nie überstimmt**.
   - Ein Widerspruch zu Simons ausdrücklichen Anforderungen wird nie überstimmt. Die Anforderung gilt.
   - Ist die Mehrheit 3:2 und die Frage tragend (Datenmodell, Hauptablauf, Preis- und Rechtsfolgen), wähle die leichter umkehrbare Option und schreib das dazu.
5. **Festhalten** in `docs/rat/<datum>-beschluss.md` und je Frage eine Zeile in `docs/ENTSCHEIDUNGEN.md`: `Datum | Frage | Beschluss (4:1) | warum | was es kostet, wenn falsch | Gegenstimme`.
6. **Weiterbauen.** Im Abschlussbericht stehen alle Beschlüsse als Liste „Vom Rat entschieden – bitte prüfen“, die knappen (3:2) zuerst.

## Grenzen
- Der Rat entscheidet nur über Fragen, nicht über Prüfungen. Schranken, verdeckte Abnahmetests, Reviews und Wächter bleiben unberührt.
- Kein Rat, um einen roten Befund wegzustimmen. Rote Urteile werden behoben oder als „Nur Simon“ geparkt.
- Sagt Simon beim Auftrag „mit Freigabe“ (oder steht `"autopilot": false` in `.claude/dev-team.json`), gibt es wieder die Startfreigabe statt des Rats.
