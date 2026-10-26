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
DIREKT = []   # (Datei, Eintrag) – direkte Quellen ohne Registry-Prüfung


def py_req_namen(text, datei="requirements"):
    namen = {}
    for zeile in (text or "").splitlines():
        zeile = zeile.split(" #", 1)[0].strip()
        if not zeile or zeile.startswith("#"):
            continue
        if zeile.startswith(("-r", "--requirement", "-c", "--constraint")):
            continue
        if zeile.startswith(("-e", "--editable", "git+", "http://", "https://", "file:", "-i", "--index-url",
                             "--extra-index-url", "-f", "--find-links", "--trusted-host")) or " @ " in zeile:
            DIREKT.append((datei, zeile))
            continue
        m = PY_NAME.match(zeile)
        if m:
            namen[m.group(1).lower().replace("_", "-")] = m.group(3).strip()
    return namen


def pyproject_namen(text, datei="pyproject.toml"):
    namen = {}
    if not text:
        return namen
    try:
        import tomllib
        d = tomllib.loads(text)
    except Exception:
        d = None
    if d is None:
        for block in re.findall(r"dependencies\s*=\s*\[(.*?)\n\s*\]", text, re.S):
            for eintrag in re.findall(r"[\"']([^\"']+)[\"']", block):
                namen.update(py_req_namen(eintrag, datei))
        return namen
    projekt = d.get("project") or {}
    eintraege = list(projekt.get("dependencies") or [])
    for gruppe in (projekt.get("optional-dependencies") or {}).values():
        eintraege += list(gruppe or [])
    for gruppe in (d.get("dependency-groups") or {}).values():
        eintraege += [x for x in (gruppe or []) if isinstance(x, str)]
    for eintrag in eintraege:
        namen.update(py_req_namen(eintrag, datei))
    poetry = (d.get("tool") or {}).get("poetry") or {}
    tabellen = [poetry.get("dependencies") or {}, poetry.get("dev-dependencies") or {}]
    for g in (poetry.get("group") or {}).values():
        tabellen.append((g or {}).get("dependencies") or {})
    for tab in tabellen:
        for name, wert in tab.items():
            if name.lower() == "python":
                continue
            if isinstance(wert, dict) and any(k in wert for k in ("git", "path", "url")):
                DIREKT.append((datei, "%s = %s" % (name, wert)))
                continue
            namen[name.lower()] = str(wert)
    return namen


NPM_DIREKT = re.compile(r"^(npm:|github:|gitlab:|bitbucket:|git(\+\w+)?:|https?:|file:|link:|workspace:|portal:)|"
                        r"^[\w.-]+/[\w.-]+(#.*)?$")


def npm_ziel(name, wert):
    """Liefert (echter Paketname, direkte Quelle oder None)."""
    wert = str(wert).strip()
    if wert.startswith("npm:"):
        rest = wert[4:]
        echt = rest.rsplit("@", 1)[0] if rest.count("@") > (1 if rest.startswith("@") else 0) else rest
        return echt, None
    if NPM_DIREKT.match(wert):
        return name, wert
    return name, None


def nuget_namen(text):
    return {m.group(1).lower(): m.group(2) or "" for m in re.finditer(
        r"<PackageReference\s+Include=\"([^\"]+)\"(?:\s+Version=\"([^\"]*)\")?", text or "", re.I)}


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


def pruefe_nuget(name, fehler, ok):
    try:
        meta = hole_json("https://api.nuget.org/v3-flatcontainer/%s/index.json" % urllib.parse.quote(name.lower()))
    except urllib.error.HTTPError as e:
        fehler.append("NuGet-Paket '%s' %s." % (name, "existiert nicht (erfunden?)" if e.code == 404
                                                 else "– Registry-Fehler %d, nicht geprüft" % e.code))
        return
    except (urllib.error.URLError, OSError, ValueError) as e:
        fehler.append("NuGet nicht erreichbar für '%s' (%s) – nicht geprüft." % (name, e))
        return
    versionen = meta.get("versions") or []
    if len(versionen) < MIN_VERSIONEN:
        fehler.append("NuGet-Paket '%s' hat nur %d Versionen (Minimum %d)." % (name, len(versionen), MIN_VERSIONEN))
    else:
        ok.append("NuGet '%s': existiert, %d Versionen." % (name, len(versionen)))


def main():
    a = argparse.ArgumentParser()
    a.add_argument("--basis", required=True)
    arg = a.parse_args()
    wurzel = subprocess.run(["git", "rev-parse", "--show-toplevel"], capture_output=True,
                            text=True).stdout.strip() or os.getcwd()
    fehler, warn, ok = [], [], []
    del DIREKT[:]
    alle = subprocess.run(["git", "ls-files", "--cached", "--others", "--exclude-standard"],
                          cwd=wurzel, capture_output=True, text=True).stdout.splitlines()

    # npm
    for pfad in subprocess.run(["git", "ls-files", "--cached", "--others", "--exclude-standard"],
                               cwd=wurzel, capture_output=True, text=True).stdout.splitlines():
        if not pfad.endswith("package.json") or "node_modules/" in pfad:
            continue
        neu = npm_namen(lies(wurzel, pfad))
        alt = npm_namen(git_datei(wurzel, arg.basis, pfad))
        hinzu = sorted(set(neu) - set(alt))
        geaenderte_werte = sorted(n for n in set(neu) & set(alt) if str(neu[n]) != str(alt[n]))
        for name in hinzu + geaenderte_werte:
            echt, direkt = npm_ziel(name, neu[name])
            if direkt:
                fehler.append("%s: '%s' kommt aus direkter Quelle '%s' (nicht aus der npm-Registry) – nur mit "
                              "Simons Freigabe und Prüfung durch den Sicherheitsprüfer." % (pfad, name, direkt))
            elif name in hinzu or echt != name:
                pruefe_npm(echt, fehler, ok)
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
        alt_direkt = len(DIREKT)
        if re.match(r"requirements.*\.txt$", basis_name):
            alt = py_req_namen(git_datei(wurzel, arg.basis, pfad), pfad)
            del DIREKT[alt_direkt:]
            neu = py_req_namen(lies(wurzel, pfad), pfad)
        elif basis_name == "pyproject.toml":
            alt = pyproject_namen(git_datei(wurzel, arg.basis, pfad), pfad)
            del DIREKT[alt_direkt:]
            neu = pyproject_namen(lies(wurzel, pfad), pfad)
        else:
            continue
        alt_text = git_datei(wurzel, arg.basis, pfad) or ""
        for datei, eintrag in DIREKT[alt_direkt:]:
            if eintrag not in alt_text:
                fehler.append("%s: direkte Quelle '%s' (nicht aus PyPI) – nur mit Simons Freigabe und Prüfung "
                              "durch den Sicherheitsprüfer." % (datei, eintrag[:120]))
        for name in sorted(set(neu) - set(alt)):
            pruefe_pypi(name, fehler, ok)
            if "==" not in neu[name] and basis_name != "pyproject.toml":
                warn.append("Python '%s' in %s ohne feste Version (==)." % (name, pfad))

    # NuGet (.NET)
    for pfad in alle:
        if not pfad.lower().endswith((".csproj", ".fsproj", ".vbproj")) and not pfad.endswith("Directory.Packages.props"):
            continue
        neu, alt = nuget_namen(lies(wurzel, pfad)), nuget_namen(git_datei(wurzel, arg.basis, pfad))
        for name in sorted(set(neu) - set(alt)):
            pruefe_nuget(name, fehler, ok)

    # Andere Paketsysteme: nicht geprüft
    for pfad in alle:
        if os.path.basename(pfad) in ("Cargo.toml", "go.mod", "Gemfile", "composer.json", "pubspec.yaml",
                                      "build.gradle", "build.gradle.kts", "pom.xml", "Package.swift"):
            if (lies(wurzel, pfad) or "") != (git_datei(wurzel, arg.basis, pfad) or ""):
                warn.append("%s geändert: dieses Paketsystem prüft die Schranke nicht – Sicherheitsprüfer muss "
                            "neue Abhängigkeiten von Hand prüfen." % pfad)

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
