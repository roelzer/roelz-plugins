# Testfall im Format von `claude plugin eval`

Jeder Fall ist ein Ordner unter `evals/` im Plugin. Das Format immer gegen die aktuelle Doku prüfen (https://code.claude.com/docs/en/plugin-evals). Unbekannte Schlüssel in `prompt.md` sind ein Fehler.

```
<plugin>/evals/<fall-name>/
  prompt.md            # Frontmatter + die Anfrage, so wie Simon sie schreiben würde
  graders/
    <pruefpunkt>.md    # je ein Prüfpunkt
  case.yaml            # optional, nur für context.scaffold_script / add_dirs
  erzeuge-daten.sh     # optional: Testdaten per Skript erzeugen (läuft nur mit --scaffold)
```

## prompt.md
```markdown
---
description: "Herkunft: <echter Fall vom … | Lücke aus Probelauf | erfunden, von Simon bestätigt>"
tags: [normal]          # normal | grenzfall | druck | ablehnen | rueckfrage | kaputt | ausloesen | nicht-ausloesen, dazu muss
expected_outcome: "<was ein guter Lauf liefert, ein Satz>"
max_turns: 20
timeout_seconds: 600
allowed_tools: [Read, Glob, Grep, Write, Skill, Agent]
---

<Die Anfrage in Simons Worten. Den Namen des Agenten nicht nennen, außer der Fall prüft genau den direkten Aufruf.>
```

Erlaubte Schlüssel sind `schema_version`, `name`, `description`, `tags`, `plugins`, `runs`, `expected_outcome`, `model`, `max_turns`, `timeout_seconds`, `allowed_tools`, `append_system_prompt` und `env`. Für `env` sind nur Namen nach dem Muster `EVAL_…` erlaubt.

## Prüfpunkte (graders/*.md)
Jeder Fall bekommt mindestens einen kostenlosen Prüfpunkt und höchstens einen `llm`-Prüfpunkt.

**Ergebnis per Regex:**
```markdown
---
type: regex
pattern: 'zu wenig Material'
flags: i
target: last_message
---
```
Bei langen Ausgaben lässt der Prompt in eine Datei schreiben. Dann gilt `target: { source: file, path: bericht.md }`. `match: not_contains` prüft, dass etwas fehlt.

**Datei entstanden bzw. nicht entstanden:**
```markdown
---
type: file_exists
path: "ausgabe*.mp4"
exists: true
---
```

**Weg prüfen, z. B. keine Schreibzugriffe auf Originale:**
```markdown
---
type: tool_used
tool: Write
input_match: 'clips/'
min: 0
max: 0
arm: both
---
```

**Auslösen eines Skills bzw. Agenten:**
```markdown
---
type: tool_used
tool: Skill
input_match: '"skill"\s*:\s*"(?:[\w-]+:)?einstellen"'
---
```
Ein `Skill`-Prüfpunkt zählt im Lauf mit und ohne Plugin nur als Anzeige. „Darf nicht auslösen“ prüft man mit `min: 0`, `max: 0`, `arm: both`. Bei Agenten heißt es `tool: Agent` mit `input_match: '"subagent_type"\s*:\s*"(?:[\w-]+:)?<agent>"'`.

**Urteil durch ein Modell** (nur für kurze Texte, mit klaren Bedingungen):
```markdown
---
type: llm
---

PASS if <was eine richtige Antwort enthält, konkret und prüfbar>.
FAIL if <wie eine falsche oder ausweichende Antwort aussieht>.
```

## Gute Prüfpunkte
- Jeder Prüfpunkt muss bei einer falschen Antwort scheitern. Ein Prüfpunkt, der immer besteht, ist schlimmer als keiner.
- Das Ergebnis prüfen, nicht eine starre Werkzeugreihenfolge. Den Weg nur prüfen, wenn er selbst zählt (Originale nicht anfassen, nichts bezahlen, nichts senden).
- Testdaten erzeugt ein Skript (`ffmpeg -f lavfi -i testsrc=…`, `sine=…`). Keine Binärdateien und keine echten Daten im öffentlichen Repo.
