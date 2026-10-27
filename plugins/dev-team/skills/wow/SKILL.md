---
name: wow
description: Findet mit dem Agenten gastgeber die Momente, an die niemand gedacht hat – für den Wow-Effekt nach dem Vorbild von 5-Sterne-Hotels, Emirates und Disney. Für eine Idee, ein Lastenheft oder ein fertiges Produkt. Simon wählt aus, was davon gebaut wird.
argument-hint: "[Idee | Projekt | nachschliff]"
---

# Wow-Effekt finden

Eingabe: `$ARGUMENTS`

Grundlage: die Wow-Prinzipien W1–W10 (Gehirn `02 Wissen/Wow-Effekt.md`, sonst `${CLAUDE_PLUGIN_ROOT}/wissen/wow-prinzipien.md`). Kurz: Wow heißt, jemand hat an mich gedacht, bevor ich daran gedacht habe – auf einem Fundament, das funktioniert.

## Ablauf
1. **Was liegt vor?**
   - Nur eine Idee (kein Projekt): Frag Simon in höchstens drei kurzen Fragen nach Nutzer, Einsatzort und dem, was heute nervt. Schreib das als kurze Notiz nach `docs/wow-briefing.md` (im aktuellen Ordner, falls es ein Projekt ist) bzw. gib es dem Agenten direkt mit.
   - Projekt mit Lastenheft, noch nicht gebaut: Modus `ideen`.
   - Fertiges Produkt (`nachschliff` oder Projekt mit gebautem Stand): Modus `nachschliff`, dazu die letzten Berichte von Produktprüfer und Designer aus `docs/pruefberichte/`.
2. → `gastgeber` im passenden Modus mit Lastenheft, Plan, `docs/DESIGN.md` (falls vorhanden), Projekt-`CLAUDE.md` und dem Briefing. **Keine** Urteile anderer Prüfer mitgeben.
3. **Lücken im Fundament**, die der Gastgeber meldet, sind keine Extras: Sie gehen in den Plan (bzw. an den Kritiker im nächsten Auftrag) – nicht in die Wow-Liste.
4. **Simon vorlegen**, beginnend mit der Ampel:
   - „Wer ist der Gast“ in drei Sätzen,
   - Lücken im Fundament (falls vorhanden),
   - Top 3 mit „was der Nutzer erlebt“, Aufwand und Prüfkriterium,
   - weitere Ideen als Kurzliste,
   - deine Empfehlung (welche ein bis drei sich lohnen, 95/5).
   Frage: „Welche davon sollen rein?“
5. **Nach Simons Auswahl:** Jede gewählte Idee wird eine Anforderung im Lastenheft (`docs/lastenheft.md`, nächste freie A-Nummer, mit dem Prüfkriterium als Abnahmekriterium) – nur dann wird sie gebaut und getestet wie jede andere Anforderung. Nicht gewählte Ideen kommen nach `docs/wow-ideen.md` (Ideenspeicher für später).
6. **Ins Gehirn:** Hat Simon Ideen gewählt oder ausdrücklich verworfen, ist das eine Entscheidung: `python3 "${CLAUDE_PLUGIN_ROOT}/scripts/gehirn.py" entscheidung --text "Wow: <Idee> rein/raus" --grund "<Simons Grund>" --betrifft <Projekt>`. Ein allgemein gültiges neues Wow-Muster (nicht projektspezifisch) als Lektionsvorschlag: `gehirn.py lektion --text "- [Wow] … (Anlass, Datum)"`.

## Grenzen
- Wow kommt **nach** den Anforderungen, nie statt ihnen. Ist das Fundament wacklig, sag das deutlich (Ampel 🔴) und empfiehl zuerst das Fundament.
- Höchstens drei Wow-Momente pro Auftrag (95/5). Jede zusätzliche Abhängigkeit, Datenspeicherung oder laufende Kosten nennst du ausdrücklich.
- Persönliche Daten von Nutzern (z. B. „merken, was jemand mag“) nur, wenn es datenschutzrechtlich sauber ist – im Zweifel `sicherheitspruefer` im Auftrag einplanen.
