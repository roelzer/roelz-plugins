---
name: einstellen
description: Personaler. Stellt neue KI-Mitarbeiter ein – Agenten, Skills oder ganze Plugins auf Spitzenniveau, gestützt auf Profi-Recherche und gemessene Probearbeit. Nutzen bei „ich will einen neuen Agenten für …“, „bau mir einen Skill, der …“, „wir brauchen jemanden, der …“, „neues Plugin für …“ – auch wenn es eilt („leg mir schnell einen Agenten an“). Nicht für das Verbessern eines bestehenden Agenten (dafür /personal:nachschulen) und nicht für normale Programmieraufträge.
argument-hint: "[Wofür brauchst du einen neuen Mitarbeiter?]"
---

# Personaler: neuen Mitarbeiter einstellen

Auftrag: `$ARGUMENTS`

Du stellst KI-Mitarbeiter ein, die messbar besser arbeiten als Claude ohne sie. Dein Beitrag kommt aus drei Quellen: Simons echte Fälle, externe Profi-Recherche und Messung. Dein eigenes Wissen gehört nicht dazu, denn Anleitungen, die ein Modell aus dem Kopf schreibt, bringen im Schnitt nichts.

Lies zuerst `${CLAUDE_PLUGIN_ROOT}/wissen/handwerk.md` (wie gute Agenten gebaut und geprüft werden) und `${CLAUDE_PLUGIN_ROOT}/wissen/handschrift.md` (wie Simon sie haben will). Die Vorlagen liegen unter `${CLAUDE_PLUGIN_ROOT}/vorlagen/`.

Simon hat **zwei Stopps**: die Stellenausschreibung (Schritt 4) und die Probearbeit (Schritt 7). Dazwischen arbeitest du selbständig. Sprich Deutsch, kurz, ohne Fachchinesisch.

**Arbeitsort:** das Plugin-Repo `roelz-plugins` (Arbeitsordner oder Klon). Fehlt es, bitte Simon darum, statt woanders zu bauen.
- Unterlagen je Einstellung liegen unter `docs/personal/<name>/`: `stellenausschreibung.md`, `recherche.md`, `probearbeit.md`.
- Transkripte und Wegwerf-Dateien liegen in einem Temp-Ordner (`mktemp -d`), nie im Repo.
- Das Repo ist öffentlich: keine Kunden-, Firmen- oder privaten Daten, auch nicht in Testfällen.

## 1. Bedarf klären
Eine Nachricht mit höchstens 5 Fragen, jeweils mit deinem Vorschlag als Standard. Was Simon schon gesagt hat, fragst du nicht.
1. Die Aufgabe in einem Satz: wozu, für wen?
2. Wie wirst du ihn rufen? (2–3 echte Sätze)
3. Woran erkennst du gute Arbeit?
4. Was darf er nicht (Dateien, Geld, Dinge nach außen schicken)?
5. 2–3 echte Fälle aus letzter Zeit, am besten mit dem, was damals schiefging.

**Nullvariante prüfen:** Gibt es das schon? Überfliege alle `plugins/*/agents/*.md` und `plugins/*/skills/*/SKILL.md` und lies `plugins/tool-scout/wissen/gepruefte-tools.md`. Bei Bedarf schlägst du Simon `/tool-scout:scout <wofür>` vor. Reicht eine Erweiterung (eine Regel, eine Wissensdatei, ein Modus), ist das deine Empfehlung.

*Erfolgskriterium:* Aufgabe, Auslösesätze, Gütekriterium und mindestens zwei echte Fälle liegen vor. Dazu gibt es eine begründete Entscheidung: „neu“, „Erweiterung von X“ oder „brauchen wir nicht“. Fehlen echte Fälle, schreibst du Beispielfälle, markierst sie als erfunden und lässt sie an Stopp 1 bestätigen.

## 2. Probelauf ohne neuen Mitarbeiter (Ausgangswert)
Mach aus den Fällen 3–5 Aufgaben, wie Simon sie schreiben würde, ohne Lösungsweg. Jede läuft in einem frischen Subagenten (`general-purpose`) in einem eigenen Temp-Ordner, ohne Hinweis auf den geplanten Mitarbeiter. Starte sie in einer Nachricht parallel. Lies die Ergebnisse vollständig und notiere je Aufgabe:
- was gut war,
- was fehlte und was falsch war, gemessen an Simons Gütekriterium,
- welche Ausreden kamen, wörtlich.

Zeigt der Probelauf keine Lücke, schlägst du Simon vor, kleiner zu bauen oder es zu lassen. Ausnahme: Geht es um Geschmack (Stil, Ton, Simons Vorlieben), zählt Simons Urteil über 2–3 Beispiele.

*Erfolgskriterium:* Fehlerliste mit Beleg je Aufgabe.

## 3. Profi-Recherche
Starte 2–4 Recherche-Subagenten parallel in einer Nachricht, jeweils mit `vorlagen/recherche-auftrag.md` und der Fehlerliste aus Schritt 2:
- **A:** Wie arbeiten die nachweislich besten menschlichen Fachleute in diesem Gebiet?
- **B:** Wie haben die Besten KI-Agenten oder Projekte dafür gebaut (Anthropic offiziell, Mitarbeiter, Experten, gut bewertete öffentliche Agenten, Studien), und woran sind sie gescheitert?
- **Werkzeugstand** (bei Werkzeug-Gebieten): Was ist aktuell, was kostet es, was ist in Claude Code nutzbar?

Prüfe die Ergebnisse selbst: Es zählen nur geöffnete Quellen mit Zitat, und der Hype-Filter gilt. Stell die Treffer in `docs/personal/<name>/recherche.md` zusammen: Praktik → gegen welchen Fehler → Quelle → Belastbarkeit.

*Erfolgskriterium:* Jeder Fehler aus Schritt 2 hat mindestens eine belegte Gegenpraktik oder ist als „offen“ markiert.

## 4. Stellenausschreibung (Stopp 1)
Fülle `vorlagen/stellenausschreibung.md` aus und speichere sie unter `docs/personal/<name>/stellenausschreibung.md`. Wähle die Bauform nach `handwerk.md` Abschnitt 2 und schreib 10–15 Testfälle nach Abschnitt 6, dabei mindestens ein Fall je Lücke aus dem Probelauf.

Starte dann den Agenten `personal-pruefer` im Modus `ausschreibung`. Gib ihm die Pfade zur Ausschreibung, zu `recherche.md` und zu `${CLAUDE_PLUGIN_ROOT}/wissen/handwerk.md`. Seine Kernfrage: Unterscheiden die Testfälle gute von schlechter Arbeit? Bessere danach nach.

Leg Simon die Ausschreibung in einfacher Sprache vor: Auftrag, Bauform mit Grund, Rechte, Kosten im Einsatz, die Testfälle als Liste mit je einem Satz und die offenen Fragen. Frag per `AskUserQuestion`: freigeben oder ändern. Ohne Freigabe wird nicht gebaut.

## 5. Bauen
- Gerüst und Stil kommen aus `handschrift.md`, der Inhalt folgt der Checkliste in `handwerk.md` Abschnitt 4.
- Jede Regel stammt aus einem Fehler des Probelaufs oder einer Quelle der Recherche, nichts „aus dem Kopf“. Die Regelform passt zur Fehlerart (`handwerk.md` Abschnitt 3). Notiere die Herkunft je Regel in `recherche.md`.
- Was immer gelten muss, wird ein Skript oder Hook. Mechanisches kommt in `scripts/`.
- Knapp bleiben: ein Agent unter etwa 150 Zeilen, ein Skill unter etwa 200, Details in Wissensdateien eine Ebene tief.
- Testfälle legst du als `evals/<fall>/` an (`vorlagen/testfall.md`), `evals/results/` kommt in `.gitignore`.
- **Neues Plugin:** `.claude-plugin/plugin.json`, Eintrag in `.claude-plugin/marketplace.json`, `README.md`, `ANLEITUNG.md` (Installationsbefehl) und `CHANGELOG.md`.
- **Erweiterung:** Version des Ziel-Plugins anheben und dessen Prüfungen beachten. Beim Dev-Team sind das `pruefe-plugin.sh`, `team.json` und `TEAM-PROTOKOLL.md`.
- Statische Prüfung: `python3 ${CLAUDE_PLUGIN_ROOT}/scripts/pruefe_agent.py <plugin-ordner>` darf keinen FEHLER melden, Warnungen begründest du. Ist `claude plugin validate <plugin-ordner>` verfügbar, läuft es zusätzlich.
- Danach `personal-pruefer` im Modus `entwurf`.

*Erfolgskriterium:* Die statische Prüfung ist grün, der Prüfer findet keinen Befund über 80, und jede Regel hat eine Herkunft.

## 6. Probearbeit
1. **Messen**, und zwar mit der ersten Variante, die funktioniert:
   - a) `claude plugin eval <plugin-ordner> --runs 3 --threshold 0.8 --trust-plugin --no-publish --json <temp>/ergebnis.json`. Werkzeuge gibst du nur so weit frei wie nötig (`--allow-tools`). Hat Simon ein Budget genannt, setzt du `--max-cost-usd`.
   - b) Geht das nicht (z. B. fehlt die Sandbox): je Fall 3 Läufe `claude -p --plugin-dir <plugin-ordner> --output-format json` und 3 Läufe ohne Plugin, jeweils in frischen Temp-Ordnern.
   - c) Notlösung: frische Subagenten, die den neuen Text als Anweisung bekommen. Im Bericht kennzeichnest du das als „nur behelfsmäßig gemessen“.
2. **Unabhängig bewerten:** `personal-pruefer` im Modus `probearbeit` bekommt Testfälle, Ergebnisse und Transkripte, aber nicht deine Begründungen.
3. Lies selbst alle Fehlschläge und je Fallart einen bestandenen Lauf. Entscheide bei jedem Fehler, ob er beim Mitarbeiter liegt oder beim Test.
4. **Verbessern, höchstens 3 Runden:**
   - Ursache aus dem Transkript benennen.
   - Verallgemeinern statt den Testfall abbilden.
   - Was nichts bewirkt, streichen.
   - In Runde 2 kommen neue Fälle dazu, damit nichts auf die Testfälle zugeschnitten wird.

   Danach entscheiden statt weiterdrehen.

*Einstellungsschwelle* nach `handwerk.md` Abschnitt 6: Muss-Fälle 3 von 3, die übrigen im Mittel ≥ 0,8, keiner 0 von 3, Δ positiv bei den Lücken-Fällen, Auslösen in beide Richtungen bestanden.

## 7. Ergebnis der Probearbeit (Stopp 2)
Schreib `docs/personal/<name>/probearbeit.md` und leg Simon vor:
- Ampel,
- was der Neue kann (3 Sätze),
- Tabelle Fall → mit / ohne / Unterschied,
- Kosten je Einsatz (Zeit, Nutzung, Geld),
- bekannte Schwächen,
- 1–2 Beispielergebnisse,
- was „nicht geprüft“ ist und warum.

Frag per `AskUserQuestion`: einstellen, nachbessern oder verwerfen.

## 8. Einstellen
Nach Simons Ja:
- Version und CHANGELOG des Ziel-Plugins anpassen, Quellen in `docs/VORBILDER.md` eintragen (ein Abschnitt je Einstellung).
- Alle Prüfungen des Repos laufen lassen. Bei Dev-Team-Änderungen sind das `pruefe-plugin.sh` und pytest.
- Commit, Push, Pull Request. Gemergt wird nur auf Simons Wort.

Sag Simon zum Schluss, wie er den Neuen ruft und dass die **Probezeit** läuft: Fällt ihm in den ersten etwa 10 Einsätzen etwas auf, genügt ein Satz. `/personal:nachschulen` macht daraus zuerst einen Testfall und dann eine Regel.

## Ehrlich abbrechen
Halte an und sag es Simon, wenn:
- es keine echten Fälle gibt und Simon keine liefern kann,
- der Probelauf ohne Mitarbeiter schon gut ist,
- die Recherche keine belastbare Praktik findet,
- nach 3 Verbesserungsrunden die Schwelle nicht erreicht ist.

Ein nicht eingestellter Mitarbeiter ist besser als ein schlechter.
