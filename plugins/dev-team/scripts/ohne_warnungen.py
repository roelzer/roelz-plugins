#!/usr/bin/env python3
"""Harte Prüfung ohne KI: Ein Befehl (z. B. der Build) muss ohne Fehler UND ohne Warnungen durchlaufen.

Aufruf (z. B. in 'meilensteinbefehle' von .claude/dev-team.json):
  python3 ohne_warnungen.py -- npm run build
Exit 0 = Befehl grün und keine Warnung in der Ausgabe; Exit 1 = Fehler oder Warnung (Zeilen werden gezeigt).
Zeilen wie „0 warnings“ oder „no warnings“ zählen nicht.
"""

import re
import shutil
import subprocess
import sys

WARNUNG = re.compile(r"(\bwarn(ing|ings)?\b|⚠)", re.IGNORECASE)
KEINE = re.compile(r"\b(0|no|zero|keine)\s+warn(ing|ings)?\b", re.IGNORECASE)


def warnzeilen(ausgabe):
    return [z for z in ausgabe.splitlines() if WARNUNG.search(z) and not KEINE.search(z)]


def main(argv):
    if "--" in argv:
        argv = argv[argv.index("--") + 1:]
    if not argv:
        print("FEHLER: Kein Befehl. Aufruf: ohne_warnungen.py -- <befehl>")
        return 1
    befehl = " ".join(argv)
    bash = shutil.which("bash")
    try:
        r = subprocess.run([bash, "-c", befehl] if bash else befehl, shell=not bash, capture_output=True,
                           text=True, encoding="utf-8", errors="replace", timeout=1800)
    except subprocess.TimeoutExpired:
        print("FEHLER: '%s' nach 30 Minuten abgebrochen." % befehl)
        return 1
    ausgabe = (r.stdout or "") + "\n" + (r.stderr or "")
    if r.returncode != 0:
        print("FEHLER: '%s' fehlgeschlagen (Exit %d):\n%s" % (
            befehl, r.returncode, "\n".join(ausgabe.strip().splitlines()[-15:])))
        return 1
    zeilen = warnzeilen(ausgabe)
    if zeilen:
        print("FEHLER: '%s' meldet %d Warnung(en) – Build muss warnungsfrei sein:\n%s" % (
            befehl, len(zeilen), "\n".join(zeilen[:20])))
        return 1
    print("OK: '%s' ohne Fehler und ohne Warnungen." % befehl)
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
