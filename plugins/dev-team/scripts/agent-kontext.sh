#!/usr/bin/env bash
# SubagentStart-Hook des Dev-Teams.
# Gibt jedem Agenten mit, wo Plugin-Ordner, Lessons und Fachwissen-Bibliothek liegen –
# auch in Cloud-Sitzungen ohne ~/.claude/CLAUDE.md. Darf nie blockieren.

cat >/dev/null 2>&1

plugin="${CLAUDE_PLUGIN_ROOT:-}"
[ -n "$plugin" ] || exit 0
plugin_fwd="$(printf '%s' "$plugin" | tr '\\' '/')"

lessons="$plugin_fwd/wissen/lessons.md"
global="$HOME/.claude/CLAUDE.md"
if [ -f "$global" ]; then
  zeile="$(grep -m 1 '^Lessons-Datei:' "$global" 2>/dev/null | sed 's/^Lessons-Datei:[[:space:]]*//' | tr '\\' '/' | tr -d '\r')"
  [ -n "$zeile" ] && lessons="$zeile"
fi

# JSON sicher bauen: nur Schrägstriche, Anführungszeichen entfernen.
saeubern() { printf '%s' "$1" | tr -d '"\r\n'; }
p="$(saeubern "$plugin_fwd")"; l="$(saeubern "$lessons")"

printf '{"hookSpecificOutput":{"hookEventName":"SubagentStart","additionalContext":"Dev-Team-Pfade: Plugin-Ordner = %s ; Lessons-Datei = %s ; Fachwissen-Bibliothek = %s/wissen/fachwissen/ . Wo deine Anweisungen auf den Block dev-team in ~/.claude/CLAUDE.md verweisen, gelten diese Pfade. Berichte an Simon mit Ampel und in einfacher Sprache."}}\n' "$p" "$l" "$p"
exit 0
