#!/usr/bin/env bash
# Selbstprüfung des Dev-Team-Plugins: findet Namens-, Verweis-, Versions- und Regelwidersprüche.
# Aufruf aus dem Repo-Hauptordner:  bash plugins/dev-team/scripts/pruefe-plugin.sh
# Exit 0 = alles in Ordnung, Exit 1 = Fehler (Liste auf stdout). Verändert nichts.

pl="${1:-plugins/dev-team}"
fehler=0
f() { echo "FEHLER: $*"; fehler=1; }

[ -d "$pl/agents" ] || { echo "Plugin-Ordner nicht gefunden: $pl"; exit 1; }

# 1. Namen = Dateinamen, Pflichtfelder
for a in "$pl"/agents/*.md; do
  n="$(basename "$a" .md)"
  grep -q "^name: $n\$" "$a" || f "$a: name passt nicht zum Dateinamen"
  for k in description tools model maxTurns; do grep -q "^$k:" "$a" || f "$a: Feld $k fehlt"; done
  grep -q 'CLAUDE_PLUGIN_ROOT' "$a" && f "$a: \${CLAUDE_PLUGIN_ROOT} im Agenten (wird in Cloud-Kopien nicht ersetzt)"
  grep -q '## Dev-Team-Kontext' "$a" || f "$a: Dev-Team-Kontext fehlt"
done
for s in "$pl"/skills/*/SKILL.md; do
  n="$(basename "$(dirname "$s")")"
  grep -q "^name: $n\$" "$s" || f "$s: name passt nicht zum Ordner"
  grep -q '^description:' "$s" || f "$s: description fehlt"
done

# 2. Jeder Agent im Grundgesetz oder Protokoll erwähnt
for a in "$pl"/agents/*.md; do
  n="$(basename "$a" .md)"
  grep -q "$n" "$pl/TEAM-PROTOKOLL.md" || f "Agent $n fehlt in TEAM-PROTOKOLL.md"
done

# 3. Verweise auf /dev-team:<skill> existieren
grep -rhoE '/dev-team:[a-z-]+' "$pl" README.md ANLEITUNG.md ../../README.md ../../ANLEITUNG.md 2>/dev/null | sort -u | while read -r v; do
  [ -d "$pl/skills/${v#/dev-team:}" ] || echo "FEHLER: Verweis auf unbekannten Skill $v"
done | grep . && fehler=1

# 4. Versionen einheitlich
v="$(sed -n 's/.*"version"[[:space:]]*:[[:space:]]*"\([^"]*\)".*/\1/p' "$pl/.claude-plugin/plugin.json" | head -n1)"
for datei in ../../ANLEITUNG.md ANLEITUNG.md; do
  [ -f "$datei" ] && ! grep -q "Version ${v%.*}" "$datei" && f "$datei nennt nicht Version ${v%.*}"
done
ls "$pl"/CHANGELOG*.md >/dev/null 2>&1 || f "kein Changelog"
grep -q "$v" "$pl"/CHANGELOG*.md 2>/dev/null || f "Changelog erwähnt Version $v nicht"

# 5. Tote Verweise auf Fremdes
grep -rn --exclude=pruefe-plugin.sh 'preisberater\|Plugin „firma“' "$pl" && f "Verweis auf nicht vorhandenes Plugin firma"

# 6. Stufen nur an einer Stelle definiert
n="$(grep -l '^| \*\*Klein\*\*' -r "$pl" 2>/dev/null | wc -l)"
[ "$n" -le 1 ] || f "Stufen-Tabelle mehrfach definiert ($n Dateien)"

# 7. Hooks-JSON gültig, Skripte syntaktisch ok
python3 -c "import json;json.load(open('$pl/hooks/hooks.json'))" 2>/dev/null || f "hooks.json ungültig"
for s in "$pl"/scripts/*.sh "$pl"/vorlagen/*.sh; do bash -n "$s" 2>/dev/null || f "$s: Syntaxfehler"; done

[ $fehler -eq 0 ] && echo "OK: Selbstprüfung ohne Befund (Version $v)"
exit $fehler
