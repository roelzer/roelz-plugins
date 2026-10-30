#!/usr/bin/env bash
# Dev-Team-Wächter – bewusst minimal (seit 3.11, Simons Vorgabe: nur das Nötigste, nichts darf ausbremsen).
#
# Er prüft genau zwei Dinge, und nur bei Entwickler und Tester:
#   1. Entwickler und Tester reden nicht miteinander: Sie starten keine Agenten und schicken keine Nachrichten.
#      Ihre Ergebnisse gehen über ihren Bericht an den Projektleiter.
#   2. Der Entwickler ändert keine bestehenden Tests, Testkonfigurationen oder Referenzwerte (neue darf er anlegen
#      und weiter bearbeiten) und rührt die verdeckten Abnahmetests unter .dev-team/ nicht an.
# Alles andere läuft ohne Prüfung durch. Für jeden anderen Aufruf endet das Skript sofort, ohne ein weiteres
# Programm zu starten. Kein Python nötig. Änderungen über die Shell (sed, echo >) fängt die Test-Schranke beim
# Zusammenführen ab (pruefe_tests.py --rolle merge).

IFS= read -r -d '' eingabe || true

# Wer ruft? Projektleiter und alle anderen Rollen: sofort durchlassen.
rolle=""
if [[ "$eingabe" =~ \"agent_type\"[[:space:]]*:[[:space:]]*\"([^\"]*)\" ]]; then
  rolle="${BASH_REMATCH[1]##*:}"
  rolle="${rolle,,}"
  rolle="${rolle#dev-team-}"   # Cloud-Kopien heißen evtl. dev-team-entwickler
fi
[[ "$rolle" == "entwickler" || "$rolle" == "tester" ]] || exit 0

werkzeug=""
[[ "$eingabe" =~ \"tool_name\"[[:space:]]*:[[:space:]]*\"([^\"]*)\" ]] && werkzeug="${BASH_REMATCH[1]}"

sperre() { echo "⛔ Dev-Team-Wächter: $1" >&2; exit 2; }

# 1. Entwickler und Tester reden nicht miteinander (und starten keine weiteren Helfer).
case "$werkzeug" in
  Agent|Task|SendMessage)
    sperre "Entwickler und Tester sprechen nicht mit anderen Agenten und starten keine. Was du brauchst oder weitergeben willst, schreib in deinen Bericht – der Projektleiter kümmert sich." ;;
esac

[ "$rolle" = "entwickler" ] || exit 0

# 2a. Verdeckte Abnahmetests: nicht lesen, nicht suchen, nicht anfassen.
if [[ "$eingabe" == *".dev-team/"* || "$eingabe" == *'.dev-team\\'* || "$eingabe" == *"dev-team-blind"* || "$eingabe" == *"dev-team-verdeckt"* ]]; then
  sperre "Die verdeckten Abnahmetests (.dev-team/) sind für den Entwickler tabu."
fi

# 2b. Bestehende Tests, Testkonfiguration, Referenzwerte: nicht ändern (neue anlegen und weiterbearbeiten geht).
case "$werkzeug" in Write|Edit|MultiEdit|NotebookEdit) ;; *) exit 0 ;; esac
pfad=""
[[ "$eingabe" =~ \"(file_path|notebook_path)\"[[:space:]]*:[[:space:]]*\"([^\"]*)\" ]] && pfad="${BASH_REMATCH[2]}"
[ -n "$pfad" ] || exit 0
pfad="${pfad//\\\\//}"
pfad="${pfad//\\//}"
name="${pfad##*/}"
klein="${pfad,,}"
testdatei=0
case "/$klein" in
  */tests/*|*/test/*|*/__tests__/*|*/e2e/*|*/spec/*) testdatei=1 ;;
esac
case "${name,,}" in
  *.test.*|*.spec.*|test_*.py|*_test.py|*_test.go|*tests.cs|*test.java|conftest.py|sitecustomize.py|pytest.ini|tox.ini|\
  vitest.config.*|vitest.workspace.*|jest.config.*|playwright.config.*|karma.conf.*|.mocharc*|cypress.config.*) testdatei=1 ;;
esac
[ $testdatei -eq 1 ] || exit 0
[ -e "$pfad" ] || exit 0   # neue Datei: darf er anlegen

# Bestand die Datei schon, als sein Paket begann? Nur dann ist sie tabu (eigene neue Tests darf er weiter ändern).
ordner="${pfad%/*}"
[ -d "$ordner" ] || exit 0
wurzel="$(git -C "$ordner" rev-parse --show-toplevel 2>/dev/null)" || exit 0
# Windows: Laufwerksbuchstabe und Groß-/Kleinschreibung können abweichen (c:/ vs C:/)
[[ "${pfad,,}" == "${wurzel,,}/"* ]] || exit 0
rel="${pfad:${#wurzel}+1}"
haupt_kopf=""
while IFS= read -r zeile; do
  [[ "$zeile" == HEAD\ * ]] && { haupt_kopf="${zeile#HEAD }"; break; }
done < <(git -C "$wurzel" worktree list --porcelain 2>/dev/null)
basis="HEAD"
if [ -n "$haupt_kopf" ]; then
  basis="$(git -C "$wurzel" merge-base HEAD "$haupt_kopf" 2>/dev/null)" || basis="HEAD"
fi
if git -C "$wurzel" cat-file -e "$basis:$rel" 2>/dev/null; then
  sperre "Bestehende Tests, Testkonfiguration und Referenzwerte ändert der Entwickler nicht ($rel). Ist ein Test falsch: im Bericht melden, der Tester entscheidet."
fi
exit 0
