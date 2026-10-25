#!/usr/bin/env python3
"""Abhängigkeits-Schranke: schützt vor erfundenen und frisch registrierten Paketen.

KI-Modelle erfinden Paketnamen; Angreifer registrieren genau diese Namen
("Slopsquatting"). Diese Schranke prüft jede NEUE Abhängigkeit gegenüber einem
Basis-Commit in package.json, requirements*.txt und pyproject.toml:

  - existiert sie in der offiziellen Registry (npm bzw. PyPI)?
  - ist sie mindestens MIN_ALTER_TAGE alt?
  - npm: mindestens MIN_DOWNLOADS Downloads in der letzten Woche?
  - PyPI: mindestens MIN_VERSIONEN veröffentlichte Versionen?
  - npm: wurde das Lockfile mit aktualisiert?
  - Python: ist die Version festgeschrieben (==)?

Ist die Registry nicht erreichbar, gilt die Prüfung als NICHT bestanden
(im Zweifel sicher). Aufruf im Projektordner:
  python3 pruefe_abhaengigkeiten.py --basis <commit>
Exit 0 = OK, 1 = FEHLER.
"""

import argparse
import json
import os
import re
import subprocess
import sys
import urllib.error
import urllib.parse
import urllib.request
from datetime import datetime, timezone

MIN_ALTER_TAGE = 90
MIN_DOWNLOADS = 1000
MIN_VERSIONEN = 3
ZEITLIMIT = 15


def git_datei(wurzel, commit, pfad):
    r = subprocess.run(["git", "show", "%s:%s" % (commit, pfad)], cwd=wurzel,
                       capture_output=True, text=True, encoding="utf-8", errors="replace")
    return r.stdout if r.returncode == 0 else None


def lies(wurzel, pfad):
    try:
        with open(os.path.join(wurzel, pfad), encoding="utf-8") as f:
            return f.read()
    except OSError:
        return None


def npm_namen(text):
    if not text:
        return {}
    try:
        d = json.loads(text)
    except ValueError:
        return {}
    namen = {}
    for feld in ("dependencies", "devDependencies", "optionalDependencies", "peerDependencies"):
        for k, v in (d.get(feld) or {}).items():
            namen[k] = v
    return namen


PY_NAME = re.compile(r"^\s*([A-Za-z0-9][A-Za-z0-9._-]*)(\[[^\]]*\])?\s*(.*)$")


def py_req_namen(text):
    namen = {}
    for zeile in (text or "").splitlines():
        zeile = zeile.split("#", 1)[0].strip()
        if not zeile or zeile.startswith(("-", "git+", "http://", "https://", "file:")):
            continue
        m = PY_NAME.match(zeile)
        if m:
            namen[m.group(1).lower().replace("_", "-")] = m.group(3).strip()
    return namen


def pyproject_namen(text):
    namen = {}
    if not text:
        return namen
    block = re.search(r"dependencies\s*=\s*\[(.*?)\]", text, re.S)
    if block:
        for eintrag in re.findall(r"[\"']([^\"']+)[\"']", block.group(1)):
            namen.update(py_req_namen(eintrag))
    poetry = re.search(r"\[tool\.poetry\.dependencies\](.*?)(\n\[|\Z)", text, re.S)
    if poetry:
        for zeile in poetry.group(1).splitlines():
            m = re.match(r"\s*([A-Za-z0-9][A-Za-z0-9._-]*)\s*=\s*(.+)", zeile)
            if m and m.group(1).lower() != "python":
                namen[m.group(1).lower()] = m.group(2).strip()
    return namen


def hole_json(url):
    req = urllib.request.Request(url, headers={"User-Agent": "dev-team-abhaengigkeitsschranke"})
    with urllib.request.urlopen(req, timeout=ZEITLIMIT) as r:
        return json.loads(r.read().decode("utf-8"))


def alter_tage(iso):
    t = datetime.fromisoformat(iso.replace("Z", "+00:00"))
    if t.tzinfo is None:
        t = t.replace(tzinfo=timezone.utc)
    return (datetime.now(timezone.utc) - t).days


def pruefe_npm(name, fehler, ok):
    try:
        meta = hole_json("https://registry.npmjs.org/" + urllib.parse.quote(name, safe="@"))
    except urllib.error.HTTPError as e:
        if e.code == 404:
            fehler.append("npm-Paket '%s' existiert nicht (erfunden?)." % name)
        else:
            fehler.append("npm-Paket '%s': Registry-Fehler %d – nicht geprüft." % (name, e.code))
        return
    except (urllib.error.URLError, OSError, ValueError) as e:
        fehler.append("npm-Registry nicht erreichbar für '%s' (%s) – nicht geprüft." % (name, e))
        return
    erstellt = (meta.get("time") or {}).get("created")
    tage = alter_tage(erstellt) if erstellt else None
    if tage is None or tage < MIN_ALTER_TAGE:
        fehler.append("npm-Paket '%s' ist erst %s Tage alt (Minimum %d)." % (name, tage, MIN_ALTER_TAGE))
    try:
        dl = hole_json("https://api.npmjs.org/downloads/point/last-week/" + urllib.parse.quote(name, safe="@"))
        zahl = int(dl.get("downloads") or 0)
    except (urllib.error.URLError, OSError, ValueError):
        zahl = None
    if zahl is None:
        fehler.append("npm-Paket '%s': Downloadzahl nicht abrufbar – nicht geprüft." % name)
    elif zahl < MIN_DOWNLOADS:
        fehler.append("npm-Paket '%s' hat nur %d Downloads/Woche (Minimum %d)." % (name, zahl, MIN_DOWNLOADS))
    else:
        ok.append("npm '%s': existiert, %s Tage alt, %d Downloads/Woche." % (name, tage, zahl))


def pruefe_pypi(name, fehler, ok):
    try:
        meta = hole_json("https://pypi.org/pypi/%s/json" % urllib.parse.quote(name))
    except urllib.error.HTTPError as e:
        if e.code == 404:
            fehler.append("PyPI-Paket '%s' existiert nicht (erfunden?)." % name)
        else:
            fehler.append("PyPI-Paket '%s': Registry-Fehler %d – nicht geprüft." % (name, e.code))
        return
    except (urllib.error.URLError, OSError, ValueError) as e:
        fehler.append("PyPI nicht erreichbar für '%s' (%s) – nicht geprüft." % (name, e))
        return
    releases = meta.get("releases") or {}
    daten = [d.get("upload_time_iso_8601") for dateien in releases.values() for d in dateien
             if d.get("upload_time_iso_8601")]
    tage = alter_tage(min(daten)) if daten else None
    if tage is None or tage < MIN_ALTER_TAGE:
        fehler.append("PyPI-Paket '%s' ist erst %s Tage alt (Minimum %d)." % (name, tage, MIN_ALTER_TAGE))
    elif len(releases) < MIN_VERSIONEN:
        fehler.append("PyPI-Paket '%s' hat nur %d Versionen (Minimum %d)." % (name, len(releases), MIN_VERSIONEN))
    else:
        ok.append("PyPI '%s': existiert, %d Tage alt, %d Versionen." % (name, tage, len(releases)))


def main():
    a = argparse.ArgumentParser()
    a.add_argument("--basis", required=True)
    arg = a.parse_args()
    wurzel = subprocess.run(["git", "rev-parse", "--show-toplevel"], capture_output=True,
                            text=True).stdout.strip() or os.getcwd()
    fehler, warn, ok = [], [], []

    # npm
    for pfad in subprocess.run(["git", "ls-files", "--cached", "--others", "--exclude-standard"],
                               cwd=wurzel, capture_output=True, text=True).stdout.splitlines():
        if not pfad.endswith("package.json") or "node_modules/" in pfad:
            continue
        neu = npm_namen(lies(wurzel, pfad))
        alt = npm_namen(git_datei(wurzel, arg.basis, pfad))
        hinzu = sorted(set(neu) - set(alt))
        for name in hinzu:
            pruefe_npm(name, fehler, ok)
        if hinzu:
            ordner = os.path.dirname(pfad)
            locks = [os.path.join(ordner, l) for l in ("package-lock.json", "pnpm-lock.yaml", "yarn.lock")]
            vorhanden = [l for l in locks if os.path.exists(os.path.join(wurzel, l))]
            geaendert = subprocess.run(["git", "diff", "--name-only", arg.basis, "--"] + vorhanden,
                                       cwd=wurzel, capture_output=True, text=True).stdout.strip()
            if not vorhanden:
                fehler.append("%s: neue Abhängigkeiten, aber kein Lockfile (package-lock.json o. ä.)." % pfad)
            elif not geaendert and all(git_datei(wurzel, arg.basis, l) is not None for l in vorhanden):
                fehler.append("%s: neue Abhängigkeiten, aber das Lockfile wurde nicht aktualisiert." % pfad)
            for name in hinzu:
                if re.match(r"^[\^~*>]|latest|x", str(neu[name])):
                    warn.append("npm '%s': Version '%s' nicht exakt festgeschrieben (Lockfile hält sie fest)." % (name, neu[name]))

    # Python
    for pfad in subprocess.run(["git", "ls-files", "--cached", "--others", "--exclude-standard"],
                               cwd=wurzel, capture_output=True, text=True).stdout.splitlines():
        basis_name = os.path.basename(pfad)
        if re.match(r"requirements.*\.txt$", basis_name):
            neu, alt = py_req_namen(lies(wurzel, pfad)), py_req_namen(git_datei(wurzel, arg.basis, pfad))
        elif basis_name == "pyproject.toml":
            neu, alt = pyproject_namen(lies(wurzel, pfad)), pyproject_namen(git_datei(wurzel, arg.basis, pfad))
        else:
            continue
        for name in sorted(set(neu) - set(alt)):
            pruefe_pypi(name, fehler, ok)
            if "==" not in neu[name] and basis_name != "pyproject.toml":
                warn.append("Python '%s' in %s ohne feste Version (==)." % (name, pfad))

    if not ok and not fehler:
        print("OK: Keine neuen Abhängigkeiten gegenüber %s." % arg.basis)
    for t in ok:
        print("OK:      " + t)
    for t in warn:
        print("WARNUNG: " + t)
    for t in fehler:
        print("FEHLER:  " + t)
    print("\nERGEBNIS: %s" % ("NICHT OK" if fehler else "OK"))
    sys.exit(1 if fehler else 0)


if __name__ == "__main__":
    main()
