#!/usr/bin/env python3
"""Schreibt den Dev-Team-Block in ~/.claude/CLAUDE.md (nur über dieses Skript – der Wächter sperrt
das direkte Bearbeiten, damit eine Sitzung das Grundgesetz nicht abschalten oder sich mehr Rechte
geben kann).

  python3 claude_md_block.py --modus privat|arbeit --lessons <pfad> [--baukasten <repo>] [--schreiben]

Ohne --schreiben wird nur der Unterschied angezeigt.
"""

import argparse
import difflib
import os
import re
import subprocess
import sys

PLUGIN = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def fwd(p):
    return os.path.abspath(os.path.expanduser(p)).replace("\\", "/")


def main():
    a = argparse.ArgumentParser()
    a.add_argument("--modus", required=True, choices=["privat", "arbeit"])
    a.add_argument("--lessons", required=True)
    a.add_argument("--baukasten", default="")
    a.add_argument("--schreiben", action="store_true")
    arg = a.parse_args()

    heim = os.path.expanduser("~")
    lessons = fwd(arg.lessons)
    erlaubt = (fwd(os.path.join(PLUGIN, "wissen", "lessons.md")), fwd(os.path.join(heim, ".claude", "dev-team",
                                                                                 "lessons-arbeit.md")))
    if lessons not in erlaubt:
        print("FEHLER: Lessons-Datei nur %s oder %s. Nichts geändert." % erlaubt)
        sys.exit(1)
    zeilen = ["<!-- dev-team START -->", "## Dev-Team", "Modus: %s" % arg.modus,
              "Plugin-Ordner: %s" % fwd(PLUGIN), "Lessons-Datei: %s" % lessons]
    if arg.baukasten:
        bk = fwd(arg.baukasten)
        echt = subprocess.run(["git", "-C", bk, "rev-parse", "--show-toplevel"], capture_output=True, text=True)
        if arg.modus != "privat" or echt.returncode != 0 or fwd(echt.stdout.strip()) != bk \
                or fwd(heim).startswith(bk.rstrip("/") + "/") or bk in ("/", fwd(heim)):
            print("FEHLER: Baukasten muss ein eigenes Git-Repo sein (Wurzelordner), nur im Modus privat. "
                  "Nichts geändert.")
            sys.exit(1)
        zeilen.append("Baukasten: %s" % bk)
    zeilen += ["@%s/wissen/grundgesetz.md" % fwd(PLUGIN), "@%s" % lessons, "<!-- dev-team END -->"]
    block = "\n".join(zeilen) + "\n"

    ziel = os.path.join(heim, ".claude", "CLAUDE.md")
    alt = open(ziel, encoding="utf-8").read() if os.path.exists(ziel) else ""
    muster = re.compile(r"<!-- dev-team START -->.*?<!-- dev-team END -->\n?", re.S)
    neu = muster.sub(lambda m: block, alt) if muster.search(alt) else (alt.rstrip("\n") + "\n\n" + block
                                                                      if alt.strip() else block)
    diff = list(difflib.unified_diff(alt.splitlines(), neu.splitlines(), "vorher", "nachher", lineterm=""))
    if not diff:
        print("OK: ~/.claude/CLAUDE.md ist schon aktuell.")
        return
    print("\n".join(diff))
    if arg.schreiben:
        os.makedirs(os.path.dirname(ziel), exist_ok=True)
        with open(ziel, "w", encoding="utf-8", newline="\n") as f:
            f.write(neu)
        print("\nGESCHRIEBEN: %s" % ziel)
    else:
        print("\nNoch nichts geschrieben. Nach Simons OK mit --schreiben erneut ausführen.")


if __name__ == "__main__":
    main()
