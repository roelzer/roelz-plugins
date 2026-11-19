---
name: nachschulen
description: Personaler. Verbessert einen bestehenden Agenten, Skill oder ein Plugin anhand eines beobachteten Fehlers – erst als Testfall, dann als Regel, mit Messung vorher und nachher. Nutzen bei „der Reviewer hat X übersehen“, „Agent Y macht immer Z falsch“, „der neue Mitarbeiter soll …“, „prüf mal, ob Agent X noch was bringt“, nach einem Modellwechsel. Nicht für neue Mitarbeiter (dafür /personal:einstellen).
argument-hint: "[Wer hat was falsch gemacht? | pruefen <plugin> | modellwechsel <plugin>]"
---

# Personaler: nachschulen

Auftrag: `$ARGUMENTS`

Lies zuerst `${CLAUDE_PLUGIN_ROOT}/wissen/handwerk.md` und `${CLAUDE_PLUGIN_ROOT}/wissen/handschrift.md`.

Jede Verbesserung beginnt mit einem Testfall, der den Fehler zeigt. So bleibt der Fehler behoben, und es lässt sich prüfen, ob die Änderung wirkt. Ohne roten Testfall wird nicht geändert.

## Modus Fehler (Standard)
1. **Fall aufnehmen:** Welcher Mitarbeiter war es, was ist passiert, was wäre richtig gewesen? Hol dir einen Beleg (Ausschnitt, Datei, Bericht). Höchstens 3 Rückfragen in einer Nachricht, jede mit Vorschlag.
2. **Testfall schreiben:** Lege unter `evals/` des Plugins einen Fall an, der genau diesen Fehler prüft (`vorlagen/testfall.md`, `description: "Herkunft: Einsatz vom <Datum>"`). Hat das Plugin noch keine Testfälle (z. B. ältere Dev-Team-Agenten), kommen 2 Fälle für das dazu, was der Mitarbeiter heute schon gut kann. Sonst merkt niemand, wenn die Änderung etwas kaputt macht.
3. **Rot sehen:** Lass den Fall mit dem jetzigen Stand laufen, 3 Läufe (Messweg wie bei `einstellen` Schritt 6). Scheitert er nicht, ist der Fall zu weich oder der Fehler war Zufall. Dann schärfst du den Fall nach oder sagst Simon ehrlich, dass sich der Fehler nicht nachstellen ließ.
4. **Ursache aus dem Transkript benennen.** Mögliche Ursachen: Wissen fehlt, eine Regel ist mehrdeutig, steht zu weit unten oder geht in einem langen Text unter, ein Werkzeug fehlt, zwei Regeln widersprechen sich. Fehlt Fachwissen, startest du eine kurze gezielte Recherche mit `vorlagen/recherche-auftrag.md`.
5. **Kleinste Änderung** in der Form, die zur Fehlerart passt (`handwerk.md` Abschnitt 3). Lieber eine Regel schärfen oder ersetzen als eine neue anhängen. Der Text soll nicht wachsen, wenn es sich vermeiden lässt.
6. **Ganze Testreihe:** Der neue Fall muss grün sein, die alten dürfen nicht schlechter werden. Die geänderten Fälle bewertet `personal-pruefer` im Modus `probearbeit`.
7. **Abschluss:** Version und CHANGELOG des Plugins anpassen, die Prüfungen des Repos laufen lassen (beim Dev-Team `pruefe-plugin.sh` und pytest), dann Commit, Push und Pull Request. Kurzbericht an Simon: Ursache, Änderung, Messung vorher und nachher.

## Modus `pruefen <plugin>`: Keeper-Test ohne konkreten Fehler
- `python3 ${CLAUDE_PLUGIN_ROOT}/scripts/pruefe_agent.py <plugin-ordner>` ausführen und die Checkliste aus `handwerk.md` Abschnitt 4 durchgehen. Den Entwurf beurteilt `personal-pruefer` im Modus `entwurf`.
- Gibt es Testfälle, laufen sie mit und ohne Plugin.
- Ergebnis für Simon: was gut ist, was fehlt, ob sich der Mitarbeiter noch lohnt (Keeper-Test) und die drei Verbesserungen mit dem größten Nutzen. Geändert wird erst nach Simons Ja.

## Modus `modellwechsel <plugin>`
- Alle Testfälle des Plugins laufen mit dem neuen Modell, mit und ohne Plugin.
- Fälle, die jetzt auch ohne Plugin bestehen, sind Kandidaten zum Streichen. Fälle, die schlechter geworden sind, sind Kandidaten zum Nachschulen.
- Bericht an Simon mit Vorschlag. Gestrichen wird nur auf sein Wort.

## Ehrlich abbrechen
Halte an und sag es Simon, wenn:
- sich der Fehler in 3 Läufen nicht nachstellen lässt,
- die Änderung andere Fälle verschlechtert und es keine Lösung ohne diesen Zielkonflikt gibt,
- der Fehler in einer Schranke liegt statt im Text. Dann gehört die Lösung ins Skript, und das sagst du so.
