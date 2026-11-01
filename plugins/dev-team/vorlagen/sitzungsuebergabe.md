# Sitzungsübergabe

Geschrieben, weil der Kontext der Sitzung voll war (Kontext-Wächter). Die nächste Sitzung liest diese Datei zuerst,
übernimmt und löscht sie dann. Alles, was nur „im Kopf“ der alten Sitzung war, muss hier oder in den Projektdateien stehen.

**Übergeben am:** [Datum, Uhrzeit] · **Auftrag:** [Plan-Titel] · **Dev-Team-Version:** [x.y.z]
**Durchlauf:** an / aus (an = Simons Freigabe gilt weiter, neue Sitzung schaltet ihn wieder ein)

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

## Laufende oder abgebrochene Agenten
Vor der Übergabe sollen alle Agenten fertig sein. Falls nicht: wer, an welchem Paket, welcher Worktree, was ist sicher committet.

## Nur in dieser Sitzung entschieden oder besprochen
Was Simon gesagt hat und was ich entschieden habe – sofern noch nicht in `docs/ENTSCHEIDUNGEN.md` oder `docs/OFFENE_FRAGEN.md`.
- …

## Fallstricke
Was die neue Sitzung wissen muss, um nicht in dieselbe Falle zu laufen (z. B. „Dev-Server auf Port 5174, 5173 ist belegt“, „Test X ist langsam, mit --befehl gezielt laufen lassen“).
- …

## Erst lesen
`docs/STATUS.md`, `docs/plan.md`, `docs/ENTSCHEIDUNGEN.md`, `docs/OFFENE_FRAGEN.md`, [weitere Dateien, die für den nächsten Schritt nötig sind]
