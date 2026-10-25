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
if [ -f "$global" ] && grep -q 'dev-team START' "$global" 2>/dev/null; then
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

# Festes Team immer nennen (Teamzwang).
team="$(sed -n 's/^    "\([a-z-]*\)":[[:space:]]*{ "phase".*/\1/p' "$plugin/team.json" 2>/dev/null | tr '\n' ' ')"
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
  fi
fi
exit 0
