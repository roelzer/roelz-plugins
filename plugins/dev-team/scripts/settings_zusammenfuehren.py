#!/usr/bin/env python3
"""Führt die Dev-Team-Einstellungen in eine bestehende .claude/settings.json zusammen.

Bestehende Einträge bleiben erhalten. Ergänzt bzw. setzt: Marktplatz, Plugins,
disableAllHooks=false, worktree.baseRef=head, env-Werte des Dev-Teams,
Sperrregeln (permissions.deny, Vereinigung) und die Dev-Team-Hooks (alte
Dev-Team-Hooks werden ersetzt, fremde Hooks bleiben).

Ohne --schreiben wird nur der Unterschied angezeigt. Der Projektleiter zeigt
ihn Simon und schreibt erst nach dessen OK (Wächter sperrt das direkte
Bearbeiten bestehender Einstellungen).

  python3 settings_zusammenfuehren.py --vorlage <vorlage.json> --ziel .claude/settings.json [--schreiben]
"""

import argparse
import copy
import difflib
import json
import os
import sys

MARKE = "dev-team-start.sh"


def ist_dev_team_hook(eintrag):
    return any(MARKE in (h.get("command") or "") for h in eintrag.get("hooks", []))


def zusammenfuehren(alt, vorlage):
    neu = copy.deepcopy(alt)
    for schluessel in ("extraKnownMarketplaces", "enabledPlugins"):
        if vorlage.get(schluessel):
            neu.setdefault(schluessel, {}).update(vorlage[schluessel])
    if "disableAllHooks" in vorlage:
        neu["disableAllHooks"] = False
    if "worktree" in vorlage:
        neu.setdefault("worktree", {}).update(vorlage["worktree"])
    if vorlage.get("env"):
        neu.setdefault("env", {}).update(vorlage["env"])
    perm = neu.setdefault("permissions", {})
    deny = perm.setdefault("deny", [])
    for regel in vorlage.get("permissions", {}).get("deny", []):
        if regel not in deny:
            deny.append(regel)
    hooks = neu.setdefault("hooks", {}) if vorlage.get("hooks") else {}
    for ereignis, eintraege in vorlage.get("hooks", {}).items():
        bestehend = [e for e in hooks.get(ereignis, []) if not ist_dev_team_hook(e)]
        hooks[ereignis] = bestehend + copy.deepcopy(eintraege)
    return neu


def main():
    a = argparse.ArgumentParser()
    a.add_argument("--vorlage", required=True)
    a.add_argument("--ziel", required=True)
    a.add_argument("--schreiben", action="store_true")
    arg = a.parse_args()
    erlaubt = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "vorlagen")
    if os.path.dirname(os.path.abspath(arg.vorlage)) != erlaubt:
        print("FEHLER: Als Vorlage sind nur Dateien aus %s erlaubt. Nichts geändert." % erlaubt)
        sys.exit(1)
    with open(arg.vorlage, encoding="utf-8") as f:
        vorlage = json.load(f)
    alt = {}
    if os.path.exists(arg.ziel):
        with open(arg.ziel, encoding="utf-8") as f:
            try:
                alt = json.load(f)
            except ValueError as e:
                print("FEHLER: %s ist kein gültiges JSON (%s). Nichts geändert." % (arg.ziel, e))
                sys.exit(1)
    neu = zusammenfuehren(alt, vorlage)
    alt_text = json.dumps(alt, indent=2, ensure_ascii=False).splitlines()
    neu_text = json.dumps(neu, indent=2, ensure_ascii=False).splitlines()
    unterschied = list(difflib.unified_diff(alt_text, neu_text, "vorher", "nachher", lineterm=""))
    if not unterschied:
        print("OK: Einstellungen sind schon aktuell.")
        return
    print("\n".join(unterschied))
    if arg.schreiben:
        os.makedirs(os.path.dirname(os.path.abspath(arg.ziel)), exist_ok=True)
        with open(arg.ziel, "w", encoding="utf-8", newline="\n") as f:
            json.dump(neu, f, indent=2, ensure_ascii=False)
            f.write("\n")
        print("\nGESCHRIEBEN: %s" % arg.ziel)
    else:
        print("\nNoch nichts geschrieben. Nach Simons OK mit --schreiben erneut ausführen.")


if __name__ == "__main__":
    main()
