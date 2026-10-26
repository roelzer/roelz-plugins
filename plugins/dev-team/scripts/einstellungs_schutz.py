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
import re
import sys
from datetime import datetime


def lade(pfad):
    try:
        with open(pfad, encoding="utf-8") as f:
            return json.load(f)
    except (OSError, ValueError):
        return None


GEFAEHRLICHE_ENV = ("PATH", "PYTHON", "BASH_ENV", "ENV", "SHELL", "CLAUDE_CODE_SHELL", "CLAUDE_PLUGIN_ROOT",
                    "CLAUDE_PROJECT_DIR", "CLAUDE_CONFIG_DIR", "HOME", "USERPROFILE", "LD_PRELOAD", "LD_LIBRARY_PATH",
                    "DYLD_", "NODE_OPTIONS", "GIT_", "DEV_TEAM")


def befunde(d, quelle, projekt_datei):
    """-> Liste (Text, Schlüsselpfad) – Schlüsselpfad wird beim Reparieren entfernt."""
    if not isinstance(d, dict):
        return []
    aus = []
    if d.get("disableAllHooks") is True:
        aus.append(("disableAllHooks", ["disableAllHooks"]))
    if d.get("allowManagedHooksOnly") is True and quelle != "benutzer":
        aus.append(("allowManagedHooksOnly", ["allowManagedHooksOnly"]))
    if (d.get("enabledPlugins") or {}).get("dev-team@roelz-plugins") is False:
        aus.append(("Dev-Team-Plugin abgeschaltet", ["enabledPlugins", "dev-team@roelz-plugins"]))
    if ((d.get("permissions") or {}).get("defaultMode") or "") in ("bypassPermissions",):
        aus.append(("bypassPermissions", ["permissions", "defaultMode"]))
    if d.get("disableWorkflows") is False:
        aus.append(("Workflows eingeschaltet", ["disableWorkflows"]))
    env = d.get("env") or {}
    if str(env.get("CLAUDE_CODE_DISABLE_WORKFLOWS", "1")) not in ("1", "true"):
        aus.append(("Workflows eingeschaltet (env)", ["env", "CLAUDE_CODE_DISABLE_WORKFLOWS"]))
    tiefe = env.get("CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH")
    if tiefe is not None and str(tiefe) != "1":
        aus.append(("Agenten-Verschachtelung", ["env", "CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH"]))
    if isinstance(env, dict):
        for k in list(env):
            if k.upper().startswith(GEFAEHRLICHE_ENV) and not k.startswith("CLAUDE_CODE_DISABLE") and \
                    k not in ("CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH", "CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS"):
                aus.append(("Umgebungsvariable %s (kann Wächter oder Hooks umlenken)" % k, ["env", k]))
    if quelle == "lokal" and d.get("hooks"):
        aus.append(("eigene Hooks in %s-Einstellungen" % quelle, ["hooks"]))
    erlaubt = (d.get("permissions") or {}).get("allow") or []
    if quelle in ("lokal", "projekt") and any(re.fullmatch(r"\s*Bash(\(\s*\*?\s*\))?\s*|\s*PowerShell(\(\s*\*?\s*\))?\s*|\s*\*\s*", str(r))
           for r in erlaubt):
        aus.append(("pauschale Shell-Erlaubnis (Bash(*))", None))
    mk = (d.get("extraKnownMarketplaces") or {}).get("roelz-plugins")
    if mk and quelle in ("lokal",):
        aus.append(("Marktplatz roelz-plugins umgelenkt", ["extraKnownMarketplaces", "roelz-plugins"]))
    if projekt_datei and quelle == "projekt" and d.get("hooks") is not None:
        texte = json.dumps(d.get("hooks"))
        if "dev-team-start.sh" not in texte:
            aus.append(("Dev-Team-Hooks aus den Projekteinstellungen entfernt", None))
    return aus


def reparieren(pfad, d, schluessel_liste):
    """Entfernt die gefährlichen Schlüssel aus der Datei, damit auch die NÄCHSTE Sitzung geschützt ist
    (ConfigChange blockiert nur die laufende)."""
    geaendert = False
    for weg in schluessel_liste:
        if not weg:
            continue
        knoten = d
        for k in weg[:-1]:
            knoten = knoten.get(k) if isinstance(knoten, dict) else None
        if isinstance(knoten, dict) and weg[-1] in knoten:
            del knoten[weg[-1]]
            geaendert = True
    if geaendert:
        try:
            with open(pfad, "w", encoding="utf-8", newline="\n") as f:
                json.dump(d, f, indent=2, ensure_ascii=False)
                f.write("\n")
        except OSError:
            return False
    return geaendert


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
    quelle_ein = str(eingabe.get("source") or "")
    zuordnung = {"user_settings": "benutzer", "project_settings": "projekt", "local_settings": "lokal"}
    if quelle_ein in zuordnung:
        # nur die Dateien der geänderten Quelle prüfen (sonst blockiert eine alte Einstellung jede Änderung)
        dateien = [(q, p) for q, p in dateien if q == zuordnung[quelle_ein]]
    if isinstance(fp, str) and fp:
        passend = [(q, p) for q, p in dateien if os.path.abspath(fp) == os.path.abspath(p)]
        dateien = passend or [("geaendert", fp)]
    if not im_projekt:
        dateien = [(q, p) for q, p in dateien if q == "benutzer"]
    funde, repariert = [], []
    for quelle, pfad in dateien:
        d = lade(pfad)
        bf = befunde(d, quelle, im_projekt)
        for text, _ in bf:
            funde.append("%s (%s)" % (text, pfad))
        if bf and quelle in ("lokal", "benutzer", "geaendert") and isinstance(d, dict):
            if reparieren(pfad, d, [w for _, w in bf]):
                repariert.append(pfad)
    if not funde:
        return 0
    grund = ("⛔ Dev-Team-Einstellungsschutz: Diese Einstellungsänderung würde den Schutz abschalten und wird "
             "nicht übernommen: %s.%s Nur Simon ändert das, außerhalb der Sitzung (oder mit DEV_TEAM_WARTUNG=1)."
             % ("; ".join(funde), (" Die schädlichen Einträge wurden wieder entfernt (%s)." % ", ".join(repariert))
                if repariert else ""))
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
