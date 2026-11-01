#!/usr/bin/env bash
# Stop-Hook: Der Projektleiter hält während eines freigegebenen Auftrags nicht einfach an.
#
# Anlass: Im Pilot musste Simon in zwei Tagen rund 80-mal „mach weiter“ schreiben – der Lauf stand jedes Mal,
# bis er sich meldete. Solange .dev-team/durchlauf existiert (der Projektleiter legt die Datei nach Simons
# Freigabe an und löscht sie vor einem festen Stopp), schickt dieser Hook ihn einmal zurück an die Arbeit.
# Läuft gerade ein Agent im Hintergrund, darf er anhalten – dessen Ergebnis weckt ihn von selbst.
# Ist der Kontext voll (kontext.sh), schickt er ihn stattdessen in den Sitzungswechsel.
# Nie blockierend bei Fehlern; stop_hook_active verhindert Endlosschleifen.

IFS= read -r -d '' eingabe || true
projekt="${CLAUDE_PROJECT_DIR:-$PWD}"
marke="$projekt/.dev-team/durchlauf"
[ -f "$marke" ] || exit 0
[[ "$eingabe" =~ \"stop_hook_active\"[[:space:]]*:[[:space:]]*true ]] && exit 0

# Laufende Agenten: Starts minus Enden seit dem Anlegen der Marke (aus .dev-team/kennzahlen.jsonl).
kz="$projekt/.dev-team/kennzahlen.jsonl"
if [ -f "$kz" ]; then
  seit="$(stat -c %Y "$marke" 2>/dev/null || stat -f %m "$marke" 2>/dev/null || echo 0)"
  offen=0
  while IFS= read -r zeile; do
    [[ "$zeile" =~ \"ts\":([0-9]+) ]] || continue
    (( BASH_REMATCH[1] >= seit )) || continue
    case "$zeile" in
      *'"ereignis":"start"'*) offen=$((offen + 1)) ;;
      *'"ereignis":"ende"'*) offen=$((offen - 1)) ;;
    esac
  done < "$kz"
  [ "$offen" -gt 0 ] && exit 0
fi

# Kontext voll: statt weiterzuarbeiten sauber in eine neue Sitzung übergeben (scripts/kontext.sh).
if [ "$(printf '%s' "$eingabe" | bash "$(dirname "$0")/kontext.sh" stufe 2>/dev/null)" = "2" ]; then
  grund="Durchlauf aktiv, aber der Kontext dieser Sitzung ist voll: Sitzungswechsel statt Weiterarbeiten. Keine neuen Agenten starten. docs/SITZUNGSUEBERGABE.md schreiben (Vorlage vorlagen/sitzungsuebergabe.md im Plugin-Ordner), docs/STATUS.md aktualisieren, committen (Cloud: Arbeitsbranch pushen), dann .dev-team/durchlauf löschen und Simon in einer Zeile bitten, eine neue Sitzung zu starten und dort „weiter“ zu schreiben."
  printf '{"decision":"block","reason":"%s"}\n' "$grund"
  exit 0
fi

grund="Durchlauf aktiv (Simon hat den Auftrag freigegeben): nicht auf „mach weiter“ warten. Beantworte eine Frage von Simon kurz und arbeite dann am nächsten Schritt laut docs/STATUS.md weiter. Ein Zwischenbericht ist kein Stopp. Anhalten nur bei einem festen Stopp (Abschlussbericht, harter Stopp, Frage, ohne die nichts Unabhängiges mehr weitergeht, Simon sagt stopp, Sitzungswechsel wegen vollem Kontext) – dann zuerst die Datei .dev-team/durchlauf löschen. Laufen Agenten im Hintergrund, beende die Runde einfach erneut."
printf '{"decision":"block","reason":"%s"}\n' "$grund"
exit 0
