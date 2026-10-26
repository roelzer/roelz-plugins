#!/usr/bin/env python3
"""Erzeugt die verwaltete Einstellung (managed settings) für das Dev-Team auf diesem Rechner.

Warum: Hooks aus Plugin- oder Projekteinstellungen kann ein Programm, das ein Agent ausführt, über
.claude/settings.local.json für die NÄCHSTE Sitzung abschalten (disableAllHooks, env.PATH). Hooks aus
verwalteten Einstellungen kann keine Benutzer-, Projekt- oder lokale Einstellung abschalten. Das ist
der einzige dokumentierte Weg, den Wächter dauerhaft zu sichern.

  python3 verwaltete_einstellungen.py            → zeigt Inhalt und Zielort
  python3 verwaltete_einstellungen.py --datei X  → schreibt den Inhalt nach X (z. B. Desktop), Simon
                                                   kopiert ihn dann als Administrator an den Zielort

Zielort (braucht Administratorrechte, macht nur Simon):
  Windows: C:\\Program Files\\ClaudeCode\\managed-settings.json
  macOS:   /Library/Application Support/ClaudeCode/managed-settings.json
  Linux:   /etc/claude-code/managed-settings.json   (unter WSL ist dieser Ordner vom Benutzer beschreibbar
           und schützt deshalb nicht)
"""

import argparse
import json
import os
import shutil
import sys

PLUGIN = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def fwd(p):
    return os.path.abspath(p).replace("\\", "/")


def main():
    a = argparse.ArgumentParser()
    a.add_argument("--datei", default="")
    arg = a.parse_args()
    py = fwd(sys.executable)
    bash = shutil.which("bash") or ("C:/Program Files/Git/bin/bash.exe" if os.name == "nt" else "/bin/bash")
    bash = fwd(bash)
    plugin = fwd(PLUGIN)

    def befehl(skript, *extra):
        return '"%s" -X utf8 "%s/scripts/%s" %s' % (py, plugin, skript, " ".join(extra))

    inhalt = {
        "permissions": {"disableBypassPermissionsMode": "disable", "deny": ["Workflow"]},
        "disableWorkflows": True,
        "hooks": {
            "PreToolUse": [{"matcher": "*", "hooks": [{
                "type": "command", "timeout": 20, "onFailure": "block",
                "command": befehl("waechter.py", '"%s"' % plugin, "dev-team-verwaltet")}]}],
            "ConfigChange": [{"matcher": "*", "hooks": [{
                "type": "command", "timeout": 20, "command": befehl("einstellungs_schutz.py", "dev-team-verwaltet")}]}],
        },
    }
    text = json.dumps(inhalt, indent=2, ensure_ascii=False) + "\n"
    ziel = {"nt": r"C:\Program Files\ClaudeCode\managed-settings.json"}.get(
        os.name, "/Library/Application Support/ClaudeCode/managed-settings.json" if sys.platform == "darwin"
        else "/etc/claude-code/managed-settings.json")
    if arg.datei:
        with open(arg.datei, "w", encoding="utf-8", newline="\n") as f:
            f.write(text)
        print("GESCHRIEBEN: %s\nSimon kopiert diese Datei als Administrator nach: %s\nDanach Claude Code neu starten "
              "und mit /status prüfen, dass „managed settings“ geladen sind." % (arg.datei, ziel))
    else:
        print("Zielort (nur Simon, mit Administratorrechten): %s\n" % ziel)
        print(text)
    print("Hinweis: Python-Pfad %s und Plugin-Pfad %s sind fest eingetragen. Ändern sie sich (neues Python, "
          "Repo verschoben), die Datei neu erzeugen." % (py, plugin))


if __name__ == "__main__":
    main()
