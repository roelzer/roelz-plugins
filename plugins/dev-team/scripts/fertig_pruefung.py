#!/usr/bin/env python3
"""SubagentStop-Hook: Ein Entwickler darf nur „fertig“ melden, wenn es belegt ist.

Meldet der Agent `entwickler` FERTIG oder FERTIG_MIT_BEDENKEN (bzw. 🟢/🟡), muss
im Hauptordner unter .dev-team/schranke-ok/<commit> ein Nachweis der Test-Schranke
für genau den Commit liegen, den er nennt. Sonst wird das Beenden einmal blockiert
(der Entwickler muss nacharbeiten). Wird er danach trotzdem ohne Nachweis beendet,
steht im Agenten-Log: „Fertigmeldung NICHT belegt“ – der Projektleiter behandelt
das Paket als BLOCKIERT.

Ehrliche Meldungen (BLOCKIERT, BRAUCHT_KONTEXT, 🔴) werden nie aufgehalten.
"""

import io
import json
import os
import re
import sys
from datetime import datetime


def log(projekt, text):
    datei = os.path.join(projekt, "docs", "AGENTEN_LOG.md")
    if not os.path.isdir(os.path.dirname(datei)):
        return
    try:
        with open(datei, "a", encoding="utf-8") as f:
            f.write("| %s | ⚠ | entwickler | %s |\n" % (datetime.now().strftime("%Y-%m-%d %H:%M"), text))
    except OSError:
        pass


def main():
    try:
        sys.stdin = io.TextIOWrapper(sys.stdin.buffer, encoding="utf-8", errors="replace")
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
    except (AttributeError, ValueError):
        pass
    try:
        eingabe = json.loads(sys.stdin.read() or "{}")
    except ValueError:
        return 0
    if not isinstance(eingabe, dict):
        return 0
    agent = str(eingabe.get("agent_type") or "").split(":")[-1].strip().lower()
    if agent != "entwickler":
        return 0
    projekt = os.environ.get("CLAUDE_PROJECT_DIR") or eingabe.get("cwd") or ""
    if not os.path.isfile(os.path.join(projekt, ".claude", "dev-team.json")):
        return 0
    text = str(eingabe.get("last_assistant_message") or "")
    kopf = text[:600]
    ehrlich_rot = re.search(r"BLOCKIERT|BRAUCHT_KONTEXT|🔴", kopf)
    meldet_fertig = re.search(r"FERTIG|🟢|🟡", kopf)
    if ehrlich_rot or not meldet_fertig:
        return 0
    hashes = re.findall(r"\b[0-9a-f]{40}\b", text)
    nachweis_ordner = os.path.join(projekt, ".dev-team", "schranke-ok")
    belegt = any(os.path.isfile(os.path.join(nachweis_ordner, h)) for h in hashes)
    if belegt:
        return 0
    grund = ("Fertigmeldung ohne Beleg: Für den genannten Commit (vollständiger 40-stelliger Hash) liegt "
             "kein grüner Nachweis der Test-Schranke vor. Erst committen, dann "
             "pruefe-tests.sh --rolle entwickler ausführen, Hash im Bericht nennen – oder ehrlich BLOCKIERT melden.")
    if eingabe.get("stop_hook_active"):
        log(projekt, "Fertigmeldung NICHT belegt – Paket gilt als BLOCKIERT")
        return 0
    log(projekt, "Fertigmeldung ohne Beleg zurückgewiesen")
    sys.stdout.write(json.dumps({"decision": "block", "reason": grund}, ensure_ascii=True) + "\n")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception:
        sys.exit(0)
