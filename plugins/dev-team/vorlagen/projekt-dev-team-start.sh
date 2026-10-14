#!/usr/bin/env bash
# Dev-Team-Start für dieses Projekt (wird von .claude/settings.json aufgerufen).
#
# Auf Simons Rechnern ist das Plugin dev-team installiert und erledigt alles selbst –
# dann tut dieses Skript nichts. In Cloud-Sitzungen (kein installiertes Plugin) holt es
# das Dev-Team von GitHub und stellt Grundgesetz, Agenten, Skills und Protokoll bereit.
# Darf die Sitzung nie blockieren: bei Fehlern still beenden.

modus="${1:-start}"
eingabe="$(cat 2>/dev/null)"
projekt="${CLAUDE_PROJECT_DIR:-$PWD}"

# Plugin lokal installiert? Dann übernimmt das Plugin.
for f in "$HOME/.claude/plugins/installed_plugins.json" "$HOME/.claude/settings.json"; do
  grep -q 'dev-team@roelz-plugins' "$f" 2>/dev/null && exit 0
done

repo_url="https://github.com/roelzer/roelz-plugins.git"
cache="${XDG_CACHE_HOME:-$HOME/.cache}/roelz-plugins"
plugin="$cache/plugins/dev-team"

holen() {
  if [ -d "$cache/.git" ]; then
    timeout 60 git -C "$cache" pull -q --ff-only >/dev/null 2>&1 || true
  else
    mkdir -p "$(dirname "$cache")" 2>/dev/null
    timeout 90 git clone -q --depth 1 "$repo_url" "$cache" >/dev/null 2>&1 || return 1
  fi
  [ -f "$plugin/wissen/grundgesetz.md" ]
}

case "$modus" in
  start)
    if ! holen; then
      echo "⚠ Dev-Team konnte in dieser Cloud-Sitzung nicht geladen werden: Das Repo roelzer/roelz-plugins ist nicht erreichbar."
      echo "Projektleiter: Sag Simon das zu Beginn. Abhilfe: roelzer/roelz-plugins zur Sitzung bzw. zur Cloud-Umgebung hinzufügen, dann 'bash .claude/dev-team-start.sh start' ausführen und die Ausgabe als Arbeitsregeln übernehmen."
      exit 0
    fi
    # Agenten und Skills ins Projekt kopieren (nicht committen, siehe .gitignore).
    mkdir -p "$projekt/.claude/agents" "$projekt/.claude/skills" 2>/dev/null
    for a in "$plugin"/agents/*.md; do
      cp "$a" "$projekt/.claude/agents/dev-team-$(basename "$a")" 2>/dev/null
    done
    for s in "$plugin"/skills/*/; do
      name="$(basename "$s")"
      ziel="$projekt/.claude/skills/dev-team-$name"
      mkdir -p "$ziel" 2>/dev/null
      # Pfade einsetzen; in der Cloud darf der Projektleiter alle Abläufe selbst starten.
      sed -e "s#\${CLAUDE_PLUGIN_ROOT}#$plugin#g" -e '/^disable-model-invocation:/d' "$s/SKILL.md" > "$ziel/SKILL.md" 2>/dev/null
    done
    # Sicherstellen, dass die Kopien nie ins Repo gelangen.
    gi="$projekt/.gitignore"
    for muster in ".claude/agents/dev-team-*.md" ".claude/skills/dev-team-*/"; do
      grep -qxF "$muster" "$gi" 2>/dev/null || echo "$muster" >> "$gi"
    done
    printf '%s' "$eingabe" | CLAUDE_PLUGIN_ROOT="$plugin" CLAUDE_PROJECT_DIR="$projekt" bash "$plugin/scripts/sitzungsstart.sh"
    echo
    echo "Hinweis Cloud-Sitzung: Die Dev-Team-Befehle heißen hier mit Bindestrich, z. B. /dev-team-auftrag statt /dev-team:auftrag; die Agenten ohne Präfix, z. B. kritiker statt dev-team:kritiker. Für Aufgaben der Stufe Normal/Groß den Skill dev-team-auftrag verwenden."
    ;;
  agent)
    [ -d "$plugin" ] || exit 0
    printf '%s' "$eingabe" | CLAUDE_PLUGIN_ROOT="$plugin" bash "$plugin/scripts/agent-kontext.sh"
    ;;
  log-start|log-ende)
    [ -d "$plugin" ] || exit 0
    printf '%s' "$eingabe" | CLAUDE_PROJECT_DIR="$projekt" bash "$plugin/scripts/agenten-log.sh" "${modus#log-}"
    ;;
esac
exit 0
