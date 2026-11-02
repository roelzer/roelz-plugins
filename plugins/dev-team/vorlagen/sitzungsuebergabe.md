# Sitzungsübergabe

Schreibt der Projektleiter, wenn der Kontext-Wächter es verlangt – kurz bevor Claude Code das Gespräch automatisch
zusammenfasst. Nach dem Zusammenfassen (oder in einer neuen Sitzung) zeigt der Sitzungsstart diese Datei. Sie wird jedes Mal
überschrieben und bei jedem festen Stopp (auch Stopp 3) entfernt. Alles, was nur „im Kopf“ der Sitzung war, muss hier oder in den
Projektdateien stehen – die Zusammenfassung von Claude Code allein reicht nicht.

**Übergeben am:** [Datum, Uhrzeit] · **Auftrag:** [Plan-Titel] · **Dev-Team-Version:** [x.y.z]
**Durchlauf:** an / aus (an = Simons Freigabe gilt weiter; eine neue Sitzung schaltet ihn wieder ein)

## Wo wir stehen
- **Phase:** [Nr – Name] · **Meilenstein:** [n von m]
- **Arbeitsbranch:** dev-team/[auftrag] · **Letzter Commit:** [Hash] (gepusht: ja/nein)
- **Letzter grüner Stand:** [Commit, Zahl bestanden]

## Nächster Schritt
Genau ein Satz, so konkret, dass die neue Sitzung ohne Nachdenken anfangen kann.
z. B. „P4 an einen entwickler geben (Bauplan in docs/plan.md, Basis = HEAD), parallel P5.“

## Pakete
| Nr. | Stand | Branch / Worktree | Was noch fehlt |
|---|---|---|---|
| P… | gemergt / im Review / Fix-Runde n / offen / zurückgestellt | | |

## Laufende Agenten
Wer, an welchem Paket, welcher Worktree, Basis-Commit – damit ihr Ergebnis nach dem Zusammenfassen richtig eingeordnet wird.

## Nur in dieser Sitzung entschieden oder besprochen
Was Simon gesagt hat und was ich entschieden habe – sofern noch nicht in `docs/ENTSCHEIDUNGEN.md` oder `docs/OFFENE_FRAGEN.md`.
- …

## Fallstricke
Was die neue Sitzung wissen muss, um nicht in dieselbe Falle zu laufen (z. B. „Dev-Server auf Port 5174, 5173 ist belegt“, „Test X ist langsam, mit --befehl gezielt laufen lassen“).
- …

## Erst lesen
`docs/STATUS.md`, `docs/plan.md`, `docs/ENTSCHEIDUNGEN.md`, `docs/OFFENE_FRAGEN.md`, [weitere Dateien, die für den nächsten Schritt nötig sind]
