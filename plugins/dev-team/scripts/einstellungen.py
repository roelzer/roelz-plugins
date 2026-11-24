#!/usr/bin/env python3
"""Legt .claude/dev-team.json für ein neues oder noch nicht aufgenommenes Projekt an – ohne Rückfrage.

Anlass (Praxistest 24.11.2026): Im Autopilot wollte der Projektleiter die Datei mit Write anlegen. Claude Code fragt
bei Dateien unter .claude/ aber immer nach („sensitive file“), im unbeaufsichtigten Lauf kam keine Antwort – die
Schranke lief deshalb nie grün, und die statische Analyse wurde nie eingerichtet. Dieses Skript schreibt die Datei
über die Shell, erkennt die Technik und trägt Testbefehl, Zählmuster und statische Analyse ein.

  python3 einstellungen.py --anlegen [--profil web|fachsoftware] [--ordner <projekt>]

Überschreibt nie eine vorhandene Datei (Änderungen danach nur mit Freigabe über geschuetzt_schreiben.py).
Ausgabe: was eingetragen wurde und was fehlt (z. B. ein nicht installiertes Analysewerkzeug).
"""

import argparse
import json
import os
import shutil
import sys

PLUGIN = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


def lies_json(pfad):
    try:
        with open(pfad, encoding="utf-8") as f:
            return json.load(f)
    except (OSError, ValueError):
        return {}


def _hat_python(wurzel):
    """Python-Dateien bis zwei Ebenen tief, ohne versteckte Ordner."""
    for ordner, unter, dateien in os.walk(wurzel):
        unter[:] = [u for u in unter if not u.startswith(".") and u not in ("node_modules", "venv", "__pycache__")]
        if os.path.relpath(ordner, wurzel).count(os.sep) >= 2:
            unter[:] = []
        if any(d.endswith(".py") for d in dateien):
            return True
    return False


def erkennen(wurzel):
    """-> (einstellungen, hinweise)"""
    e, hinweise = {}, []
    hat = lambda *namen: any(os.path.exists(os.path.join(wurzel, n)) for n in namen)
    pkg = lies_json(os.path.join(wurzel, "package.json"))
    if pkg:
        deps = {**pkg.get("dependencies", {}), **pkg.get("devDependencies", {})}
        skripte = pkg.get("scripts", {})
        e["setup"] = "npm ci" if hat("package-lock.json") else "npm install"
        e["testbefehl"] = "npm test"
        if "vitest" in deps:
            e["testzahl_muster"] = r"Tests\s+(\d+) passed"
        elif "jest" in deps:
            e["testzahl_muster"] = r"Tests:\s+(\d+) passed"
        elif "@playwright/test" in deps:
            e["testzahl_muster"] = r"(\d+) passed"
        else:
            e["testzahl_muster"] = r"# pass (\d+)|(\d+) passing|(\d+) passed"
            hinweise.append("Testwerkzeug nicht erkannt: testzahl_muster prüfen (node:test, mocha …).")
        zusatz = []
        if hat("tsconfig.json"):
            zusatz.append("npx tsc --noEmit")
        if "eslint" in deps or any(n.startswith("eslint.config") or n.startswith(".eslintrc") for n in os.listdir(wurzel)):
            zusatz.append("npx eslint .")
        else:
            hinweise.append("Kein ESLint: im ersten Paket einrichten und 'npx eslint .' ergänzen (statische Analyse ist Pflicht).")
        if "build" in skripte:
            zusatz.append("npm run build")
        e["zusatzbefehle"] = zusatz
        e["sicherheitsbefehl"] = "npm audit --audit-level=high"
        e["profil"] = "web"
    elif hat("pyproject.toml", "requirements.txt", "setup.py") or _hat_python(wurzel):
        text = ""
        for n in ("pyproject.toml", "requirements.txt", "requirements-dev.txt"):
            try:
                text += open(os.path.join(wurzel, n), encoding="utf-8").read().lower()
            except OSError:
                pass
        e["setup"] = "pip install -r requirements.txt" if hat("requirements.txt") else ""
        if "pytest" in text or hat("conftest.py", "pytest.ini"):
            e["testbefehl"] = "python3 -m pytest -q tests"
            e["testzahl_muster"] = r"(\d+) passed"
        else:
            e["testbefehl"] = "python3 -m unittest discover -s tests -t ."
            e["testzahl_muster"] = r"Ran (\d+) tests?"
        zusatz = []
        if "ruff" in text or shutil.which("ruff"):
            zusatz.append("ruff check .")
        else:
            hinweise.append("ruff nicht installiert: 'pip install ruff' (kostenlos), dann 'ruff check .' in zusatzbefehle "
                            "ergänzen – der Projektleiter darf das selbst (Verschärfung).")
        if "mypy" in text or shutil.which("mypy"):
            zusatz.append("mypy .")
        e["zusatzbefehle"] = zusatz
        e["sicherheitsbefehl"] = "pip-audit" if shutil.which("pip-audit") else ""
        e["profil"] = "fachsoftware"
    elif hat("composer.json"):
        e["setup"] = "composer install"
        e["testbefehl"] = "vendor/bin/phpunit"
        e["testzahl_muster"] = r"OK \((\d+) tests?"
        e["zusatzbefehle"] = ["vendor/bin/phpstan analyse"] if hat("phpstan.neon", "phpstan.neon.dist") else []
        if not e["zusatzbefehle"]:
            hinweise.append("Kein PHPStan: im ersten Paket einrichten (mindestens Stufe 5) und ergänzen.")
        e["sicherheitsbefehl"] = "composer audit"
        e["profil"] = "web"
    else:
        hinweise.append("Technik noch nicht erkennbar (leeres Projekt): Testbefehl, Zählmuster und statische Analyse "
                        "trägt der Projektleiter ein, sobald der Architekt die Technik festgelegt hat – solange die Datei "
                        "unversioniert ist, mit diesem Skript und --neu.")
    return e, hinweise


def main():
    a = argparse.ArgumentParser()
    a.add_argument("--anlegen", action="store_true", required=True)
    a.add_argument("--profil", choices=["web", "fachsoftware"])
    a.add_argument("--ordner", default=".")
    a.add_argument("--neu", action="store_true", help="unversionierte, noch unfertige Datei neu erkennen")
    arg = a.parse_args()
    wurzel = os.path.abspath(arg.ordner)
    ziel = os.path.join(wurzel, ".claude", "dev-team.json")
    if os.path.exists(ziel) and not arg.neu:
        print("VORHANDEN: %s – nichts geändert (Änderungen nur mit Freigabe über geschuetzt_schreiben.py)." % ziel)
        return 0
    if os.path.exists(ziel) and arg.neu:
        import subprocess
        versioniert = subprocess.run(["git", "ls-files", "--error-unmatch", ".claude/dev-team.json"], cwd=wurzel,
                                     capture_output=True).returncode == 0
        if versioniert:
            print("FEHLER: .claude/dev-team.json ist schon versioniert – ändern nur mit Freigabe (geschuetzt_schreiben.py).")
            return 1
    vorlage = lies_json(os.path.join(PLUGIN, "vorlagen", "dev-team.json"))
    erkannt, hinweise = erkennen(wurzel)
    daten = {k: v for k, v in vorlage.items()}
    daten.update(erkannt)
    if arg.profil:
        daten["profil"] = arg.profil
    if not erkannt:
        for k in ("setup", "testbefehl", "testzahl_muster", "sicherheitsbefehl"):
            daten[k] = ""
        daten["zusatzbefehle"] = []
    os.makedirs(os.path.dirname(ziel), exist_ok=True)
    with open(ziel, "w", encoding="utf-8") as f:
        json.dump(daten, f, ensure_ascii=False, indent=2)
        f.write("\n")
    print("ANGELEGT: %s" % ziel)
    for k in ("profil", "setup", "testbefehl", "testzahl_muster", "zusatzbefehle", "sicherheitsbefehl"):
        print("  %s: %s" % (k, daten.get(k)))
    for h in hinweise:
        print("HINWEIS: " + h)
    return 0


if __name__ == "__main__":
    sys.exit(main())
