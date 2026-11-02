#!/usr/bin/env bash
# Stop-Hook: Der Projektleiter hält während eines freigegebenen Auftrags nicht einfach an.
#
# Anlass: Im Pilot musste Simon in zwei Tagen rund 80-mal „mach weiter“ schreiben – der Lauf stand jedes Mal,
# bis er sich meldete. Solange .dev-team/durchlauf existiert (der Projektleiter legt die Datei nach Simons
# Freigabe an und löscht sie vor einem festen Stopp), schickt dieser Hook ihn einmal zurück an die Arbeit.
# Läuft gerade ein Agent im Hintergrund, darf er anhalten – dessen Ergebnis weckt ihn von selbst.
# Nie blockierend bei Fehlern; stop_hook_active verhindert Endlosschleifen.

IFS= read -r -d '' eingabe || true
projekt="${CLAUDE_PROJECT_DIR:-$PWD}"
marke="$projekt/.dev-team/durchlauf"
[ -f "$marke" ] || exit 0
[[ "$eingabe" =~ \"stop_hook_active\"[[:space:]]*:[[:space:]]*true ]] && exit 0

# Laufende Agenten (aus .dev-team/kennzahlen.jsonl, letzte 4 Stunden): Starts minus Agenten, die geendet haben.
# Enden werden je Agent-Kennung nur einmal gezählt – ein Agent, den die Fertig-Prüfung zurückschickt, endet mehrmals
# (vorher wurde der Projektleiter dadurch aufgescheucht, obwohl noch ein Agent lief, und schrieb jedes Mal in den Chat).
# Ist seit 45 Minuten gar nichts mehr passiert, gilt ein offener Start als hängen geblieben.
kz="$projekt/.dev-team/kennzahlen.jsonl"
if [ -f "$kz" ]; then
  jetzt="$(date +%s)"
  ab=$((jetzt - 4 * 3600))
  starts=0
  letzter=0
  declare -A enden=()
  ohne_id=0
  while IFS= read -r zeile; do
    [[ "$zeile" =~ \"ts\":([0-9]+) ]] || continue
    ts="${BASH_REMATCH[1]}"
    (( ts >= ab )) || continue
    (( ts > letzter )) && letzter=$ts
    case "$zeile" in
      *'"ereignis":"start"'*) starts=$((starts + 1)) ;;
      *'"ereignis":"ende"'*)
        if [[ "$zeile" =~ \"id\":\"([^\"]+)\" ]]; then enden["${BASH_REMATCH[1]}"]=1; else ohne_id=$((ohne_id + 1)); fi ;;
    esac
  done < "$kz"
  offen=$((starts - ${#enden[@]} - ohne_id))
  if [ "$offen" -gt 0 ] && [ $((jetzt - letzter)) -lt 2700 ]; then
    exit 0
  fi
fi

grund="Durchlauf aktiv (Simon hat den Auftrag freigegeben): nicht auf „mach weiter“ warten. Beantworte eine Frage von Simon kurz und arbeite dann still am nächsten Schritt laut docs/STATUS.md weiter: kein Text im Chat, auch keine Bestätigung wie „läuft weiter“ oder ein Status-Link – der Stand steht auf der Team-Tafel. Anhalten nur bei einem festen Stopp (Abschlussbericht, harter Stopp, Frage, ohne die nichts Unabhängiges mehr weitergeht, Simon sagt stopp) – dann zuerst die Datei .dev-team/durchlauf löschen und docs/SITZUNGSUEBERGABE.md entfernen. Laufen Agenten im Hintergrund, beende die Runde erneut, ohne etwas zu schreiben. Ein voller Kontext ist kein Stopp: Übergabe schreiben (Kontext-Wächter), weiterarbeiten."
printf '{"decision":"block","reason":"%s"}\n' "$grund"
exit 0
