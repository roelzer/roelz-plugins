#!/usr/bin/env python3
"""ConfigChange-Hook: blockiert Einstellungsänderungen, die den Schutz des Dev-Teams abschalten würden.

Claude Code meldet jede Änderung an Einstellungsdateien während der Sitzung (auch durch Programme, die
ein Agent ausführt). Steht danach in einer der Dateien ein Schutzschalter (Hooks aus, Plugin aus,
Freigaben umgehen, Workflows an, Agenten-Verschachtelung), wird die Änderung blockiert und im
Agenten-Log vermerkt. Wartung nur mit DEV_TEAM_WARTUNG=1, das Simon selbst in seiner Shell setzt.
"""

import io
import json
import os
import sys
from datetime import datetime


def lade(pfad):
    try:
        with open(pfad, encoding="utf-8") as f:
            return json.load(f)
    except (OSError, ValueError):
        return None


def befunde(d, quelle, projekt_datei):
    if not isinstance(d, dict):
        return []
    aus = []
    if d.get("disableAllHooks") is True:
        aus.append("disableAllHooks")
    if d.get("allowManagedHooksOnly") is True:
        aus.append("allowManagedHooksOnly")
    if (d.get("enabledPlugins") or {}).get("dev-team@roelz-plugins") is False:
        aus.append("Dev-Team-Plugin abgeschaltet")
    if ((d.get("permissions") or {}).get("defaultMode") or "") in ("bypassPermissions",):
        aus.append("bypassPermissions")
    if d.get("disableWorkflows") is False:
        aus.append("Workflows eingeschaltet")
    env = d.get("env") or {}
    if str(env.get("CLAUDE_CODE_DISABLE_WORKFLOWS", "1")) not in ("1", "true"):
        aus.append("Workflows eingeschaltet (env)")
    tiefe = env.get("CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH")
    if tiefe is not None and str(tiefe) != "1":
        aus.append("Agenten-Verschachtelung")
    if "DEV_TEAM_WARTUNG" in env:
        aus.append("Wartungsmodus")
    if projekt_datei and quelle == "projekt" and d.get("hooks") is not None:
        texte = json.dumps(d.get("hooks"))
        if "dev-team-start.sh" not in texte:
            aus.append("Dev-Team-Hooks aus den Projekteinstellungen entfernt")
    return aus


def main():
    try:
        sys.stdin = io.TextIOWrapper(sys.stdin.buffer, encoding="utf-8", errors="replace")
    except (AttributeError, ValueError):
        pass
    if os.environ.get("DEV_TEAM_WARTUNG") == "1":
        return 0
    try:
        eingabe = json.loads(sys.stdin.read() or "{}")
    except ValueError:
        eingabe = {}
    projekt = os.environ.get("CLAUDE_PROJECT_DIR") or eingabe.get("cwd") or ""
    heim = os.path.expanduser("~")
    dateien = [("benutzer", os.path.join(heim, ".claude", "settings.json")),
               ("benutzer", os.path.join(heim, ".claude", "settings.local.json"))]
    im_projekt = bool(projekt) and os.path.isfile(os.path.join(projekt, ".claude", "dev-team.json"))
    if im_projekt:
        dateien += [("projekt", os.path.join(projekt, ".claude", "settings.json")),
                    ("lokal", os.path.join(projekt, ".claude", "settings.local.json"))]
    fp = eingabe.get("file_path")
    if isinstance(fp, str) and fp and all(os.path.abspath(fp) != os.path.abspath(p) for _, p in dateien):
        dateien.append(("geaendert", fp))
    funde = []
    for quelle, pfad in dateien:
        for b in befunde(lade(pfad), quelle, im_projekt):
            funde.append("%s (%s)" % (b, pfad))
    if not funde:
        return 0
    grund = ("⛔ Dev-Team-Einstellungsschutz: Diese Einstellungsänderung würde den Schutz abschalten und wird "
             "nicht übernommen: %s. Nur Simon ändert das, außerhalb der Sitzung (oder mit DEV_TEAM_WARTUNG=1)."
             % "; ".join(funde))
    if im_projekt and os.path.isdir(os.path.join(projekt, "docs")):
        try:
            with open(os.path.join(projekt, "docs", "AGENTEN_LOG.md"), "a", encoding="utf-8") as f:
                f.write("| %s | ⛔ | einstellungen | %s |\n" % (datetime.now().strftime("%Y-%m-%d %H:%M"),
                                                          grund.replace("|", "/")[:300]))
        except OSError:
            pass
    sys.stderr.write(grund + "\n")
    sys.stdout.write(json.dumps({"decision": "block", "reason": grund}, ensure_ascii=True) + "\n")
    return 2


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception as fehler:  # im Zweifel blockieren
        sys.stderr.write("⛔ Dev-Team-Einstellungsschutz: interner Fehler (%s) – Änderung blockiert.\n" % fehler)
        sys.exit(2)
