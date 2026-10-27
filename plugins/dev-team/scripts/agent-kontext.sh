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
  gehirn="$(grep -m 1 '^Gehirn:' "$global" 2>/dev/null | sed 's/^Gehirn:[[:space:]]*//' | tr '\\' '/' | tr -d '\r')"
fi
wissen="$plugin_fwd/wissen/fachwissen/"
gehirn_text=""
if [ -n "${gehirn:-}" ] && [ -f "$gehirn/00 Start.md" ]; then
  wissen="$gehirn/02 Wissen/"
  gl="$gehirn/05 Lektionen/Dev-Team-Lektionen.md"
  if [ -f "$gl" ]; then
    # Nur bestätigte Lektionen, als eine Zeile (JSON-tauglich).
    gehirn_text="$(sed -n '/^## Lektionen/,/^## /p' "$gl" 2>/dev/null | grep '^- ' | tr -d '"\\\r' | tr '\n' ' ' | cut -c1-6000)"
    lessons="$gl"
  fi
fi

# JSON sicher bauen: nur Schrägstriche, Anführungszeichen entfernen.
saeubern() { printf '%s' "$1" | tr -d '"\r\n'; }
p="$(saeubern "$plugin_fwd")"; l="$(saeubern "$lessons")"; w="$(saeubern "$wissen")"
zusatz=""
[ -n "$gehirn_text" ] && zusatz=" Bestätigte Dev-Team-Lektionen aus dem Gehirn (gelten für dich): $(saeubern "$gehirn_text")"

printf '{"hookSpecificOutput":{"hookEventName":"SubagentStart","additionalContext":"Dev-Team-Pfade: Plugin-Ordner = %s ; Lessons-Datei = %s ; Fachwissen-Bibliothek = %s . Wo deine Anweisungen auf den Block dev-team in ~/.claude/CLAUDE.md verweisen, gelten diese Pfade. Berichte an Simon mit Ampel und in einfacher Sprache.%s"}}\n' "$p" "$l" "$w" "$zusatz"
exit 0
