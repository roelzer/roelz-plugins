#!/usr/bin/env bash
# SessionStart-Hook des Dev-Teams.
# Sorgt dafür, dass Grundgesetz und Lessons in JEDER Sitzung gelten – auch in Cloud-Sitzungen,
# in denen es keine eingerichtete ~/.claude/CLAUDE.md gibt.
# Ausgabe auf stdout wird von Claude Code als Kontext übernommen. Darf die Sitzung nie blockieren.

cat >/dev/null 2>&1   # Eingabe-JSON wird nicht gebraucht

plugin="${CLAUDE_PLUGIN_ROOT:-}"
[ -n "$plugin" ] || exit 0
plugin_fwd="$(printf '%s' "$plugin" | tr '\\' '/')"
projekt="${CLAUDE_PROJECT_DIR:-$PWD}"
global="$HOME/.claude/CLAUDE.md"

eingerichtet=""
if [ -f "$global" ] && grep -q 'dev-team START' "$global" 2>/dev/null \
   && grep -q '^@.*wissen/grundgesetz\.md' "$global" 2>/dev/null; then
  eingerichtet="ja"
fi

if [ -n "$eingerichtet" ]; then
  # Lokal eingerichtet: Grundgesetz kommt schon über ~/.claude/CLAUDE.md.
  echo "Dev-Team aktiv (lokal eingerichtet). Plugin-Ordner: $plugin_fwd"
else
  # Cloud-Sitzung oder noch nicht eingerichtet: Grundgesetz und Lessons direkt mitgeben.
  echo "# Dev-Team aktiv (ohne lokale Einrichtung, z. B. Cloud-Sitzung)"
  echo
  echo "Plugin-Ordner: $plugin_fwd"
  echo "Lessons-Datei: $plugin_fwd/wissen/lessons.md (nur lesen; neue Lektionen als Vorschlag in docs/LEKTIONEN_VORSCHLAEGE.md)"
  echo "Fachwissen-Bibliothek: $plugin_fwd/wissen/fachwissen/"
  echo
  cat "$plugin/wissen/grundgesetz.md" 2>/dev/null
  echo
  echo "## Lessons (allgemein)"
  sed -n '/^## Lektionen/,$p' "$plugin/wissen/lessons.md" 2>/dev/null | tail -n +2
fi

# Gehirn (Simons Obsidian-Tresor): Dev-Team-Lektionen und Projektnotiz mitgeben.
gehirn=""
[ -f "$global" ] && gehirn="$(grep -m 1 '^Gehirn:' "$global" 2>/dev/null | sed 's/^Gehirn:[[:space:]]*//' | tr '\\' '/' | tr -d '\r')"
if [ -n "$gehirn" ] && [ -f "$gehirn/00 Start.md" ]; then
  # Erst den neuesten Stand holen (anderer Laptop, Obsidian evtl. zu). Höchstens 8 Sekunden, nie nachfragen,
  # eigene Änderungen werden beiseitegelegt und wieder aufgesetzt. Klappt es nicht: lokaler Stand, mit Hinweis.
  abgleich="nicht abgeglichen (kein Netz, kein Remote oder Konflikt) – es gilt der lokale Stand"
  if git -C "$gehirn" remote 2>/dev/null | grep -q . && command -v timeout >/dev/null 2>&1; then
    if [ -d "$gehirn/.git/rebase-merge" ] || [ -d "$gehirn/.git/rebase-apply" ] || [ -f "$gehirn/.git/MERGE_HEAD" ]; then
      abgleich="nicht abgeglichen: im Gehirn läuft noch ein Zusammenführen (in Obsidian oder per git lösen)"
    elif GIT_TERMINAL_PROMPT=0 GCM_INTERACTIVE=never timeout 8 git -C "$gehirn" pull --rebase --autostash -q >/dev/null 2>&1; then
      abgleich="abgeglichen mit GitHub"
    else
      git -C "$gehirn" rebase --abort >/dev/null 2>&1
    fi
  fi
  echo
  echo "## Gehirn (Obsidian-Tresor): $gehirn"
  echo "Stand: $abgleich."
  echo "Alles, was das Team dauerhaft lernt oder über Projekte weiß, kommt ins Gehirn – über"
  echo "python3 \"$plugin_fwd/scripts/gehirn.py\" (projekt | lektion | entscheidung | wissen). Fachwissen: $gehirn/02 Wissen/"
  gl="$gehirn/05 Lektionen/Dev-Team-Lektionen.md"
  if [ -f "$gl" ]; then
    echo
    echo "### Dev-Team-Lektionen aus dem Gehirn (bestätigt)"
    sed -n '/^## Lektionen/,/^## /p' "$gl" 2>/dev/null | grep '^- '
  fi
  pname="$(basename "$projekt")"
  if [ -f "$gehirn/01 Projekte/$pname.md" ]; then
    echo
    echo "Projektnotiz im Gehirn: $gehirn/01 Projekte/$pname.md (bei Bedarf lesen)"
  fi
elif [ -n "$eingerichtet" ]; then
  echo "Hinweis: Kein Gehirn eingerichtet (Zeile „Gehirn:“ fehlt). Wissen landet dann in docs/GEHIRN_NACHTRAG.md. Einrichten mit /dev-team:einrichten."
fi

# Festes Team immer nennen (Teamzwang).
team=""
for py in python3 python py; do
  if command -v "$py" >/dev/null 2>&1; then
    team="$("$py" -X utf8 -c 'import json,sys; print(" ".join(json.load(open(sys.argv[1], encoding="utf-8"))["agenten"]))' "$plugin/team.json" 2>/dev/null)"
    [ -n "$team" ] && break
  fi
done
if [ -n "$team" ]; then
  echo
  echo "Festes Dev-Team (nur diese Agenten, sonst blockiert der Wächter): $team"
  echo "Projektleiter: Du baust und prüfst nicht selbst. Code = entwickler, Tests = tester, Struktur = architekt."
fi

# Hinweis, wenn das Projekt noch nicht im Dev-Team aufgenommen ist.
if [ -d "$projekt/.git" ] || [ -n "$(ls -A "$projekt" 2>/dev/null)" ]; then
  if [ ! -f "$projekt/.claude/dev-team.json" ] && [ -f "$projekt/docs/STATUS.md" ]; then
    echo
    echo "Hinweis an den Projektleiter: Projekt aus Dev-Team 2 erkannt (keine .claude/dev-team.json). Teamzwang gilt schon. Biete Simon an, mit /dev-team:projekt-aufnehmen auf Version 3 umzustellen (Profil, Testbefehl, Einstellungen)."
  fi
  if [ ! -f "$projekt/docs/STATUS.md" ] && [ ! -f "$projekt/docs/lastenheft.md" ] && [ ! -f "$projekt/.claude/dev-team.json" ]; then
    echo
    echo "Hinweis an den Projektleiter: Dieses Projekt ist noch nicht im Dev-Team aufgenommen (keine docs/STATUS.md, kein docs/lastenheft.md). Biete Simon bei der ersten größeren Aufgabe an: bestehendes Projekt → /dev-team:projekt-aufnehmen, leerer Ordner → /dev-team:neues-projekt. Kleine Fragen ohne Nachfrage beantworten."
  fi
  if [ ! -f "$projekt/.claude/settings.json" ] || ! grep -q 'roelz-plugins' "$projekt/.claude/settings.json" 2>/dev/null; then
    echo
    echo "Hinweis an den Projektleiter: Im Projekt fehlt .claude/settings.json mit dem Dev-Team. Ohne sie gilt das Dev-Team in Cloud-Sitzungen dieses Projekts nicht. Wird bei /dev-team:projekt-aufnehmen bzw. /dev-team:neues-projekt angelegt."
  elif grep -q '"timeout": *20,' "$projekt/.claude/settings.json" 2>/dev/null && grep -q 'waechter' "$projekt/.claude/settings.json" 2>/dev/null; then
    echo
    echo "Hinweis an den Projektleiter: Die Projekteinstellungen haben noch den alten Wächter-Hook (20 s, blockiert bei Last alles, auch Lesen). Sag Simon das in einem Satz und schlage vor: /dev-team:projekt-aufnehmen erneut ausführen (zeigt die Änderung, schreibt erst nach seinem OK)."
  fi
fi

# Versionswechsel mitten im Auftrag (Plugin aktualisiert sich automatisch von GitHub)
version="$(sed -n 's/^[[:space:]]*"version":[[:space:]]*"\([^"]*\)".*/\1/p' "$plugin/team.json" 2>/dev/null | head -n 1)"
if [ -n "$version" ] && [ -f "$projekt/.dev-team/plugin-version" ]; then
  auftrag_version="$(head -n 1 "$projekt/.dev-team/plugin-version" 2>/dev/null)"
  if [ -n "$auftrag_version" ] && [ "$auftrag_version" != "$version" ]; then
    echo
    echo "⚠ Versionswechsel: Der laufende Auftrag begann mit Dev-Team $auftrag_version, jetzt ist $version installiert (automatisches Update). Projektleiter: Sag Simon das zu Beginn in einem Satz mit dem wichtigsten Unterschied aus $plugin_fwd/CHANGELOG.md, arbeite dann am dokumentierten Schritt weiter und trage die neue Version in .dev-team/plugin-version ein."
  fi
fi
exit 0
