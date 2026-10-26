#!/usr/bin/env python3
"""Blinder Lauf der verdeckten Abnahmetests nach jedem Merge (Projektleiter, Hauptordner).

Baut den aktuellen Stand (HEAD) in einem Temp-Ordner nach, legt die verdeckten Tests dazu, führt den
Testbefehl aus und meldet NUR: grün/rot, Anzahl, und welche Anforderungsnummern (A1 …) betroffen sind.
Testnamen, Werte und Ausgaben werden nicht gezeigt – der Entwickler bekommt nur „Anforderung A3 ist
im Zusammenspiel noch nicht erfüllt“, nicht den Test. So fallen Zusammenspielfehler je Paket auf und
nicht erst am Meilenstein-Ende.

  python3 verdeckt_blind.py
"""

import io
import json
import os
import re
import shutil
import subprocess
import sys
import tarfile
import tempfile

FEHL_ZEILE = re.compile(r"^(FAIL|ERROR|FAILED|✗|×|not ok|\s*[✕✗×]|\s*FAIL\b)|\bFAILED\b|\bfailed\b", re.M)
ANF = re.compile(r"(?<![A-Za-z0-9])[Aa](\d{1,3})(?![0-9])")


def main():
    haupt = subprocess.run(["git", "rev-parse", "--path-format=absolute", "--git-common-dir"], capture_output=True,
                           text=True).stdout.strip()
    if not haupt:
        print("FEHLER: kein Git-Repo.")
        sys.exit(1)
    hauptordner = os.path.dirname(haupt.rstrip("/\\"))
    try:
        with open(os.path.join(hauptordner, ".claude", "dev-team.json"), encoding="utf-8") as f:
            konfig = json.load(f)
    except (OSError, ValueError):
        print("FEHLER: .claude/dev-team.json fehlt oder ist ungültig.")
        sys.exit(1)
    verdeckt = os.path.join(hauptordner, ".dev-team", "verdeckt")
    dateien = [os.path.join(o, d) for o, _, ds in os.walk(verdeckt) if "__pycache__" not in o for d in ds
               if not (d.upper().startswith(("README", "LIESMICH")) or d.endswith((".pyc", ".pyo")) or d.startswith("."))]
    if not dateien:
        print("HINWEIS: Keine verdeckten Abnahmetests vorhanden – nichts zu prüfen.")
        return
    tmp = tempfile.mkdtemp(prefix="dev-team-blind-")
    try:
        archiv = subprocess.run(["git", "archive", "--format=tar", "HEAD"], cwd=hauptordner, capture_output=True)
        with tarfile.open(fileobj=io.BytesIO(archiv.stdout)) as t:
            t.extractall(tmp, filter="data") if hasattr(tarfile, "data_filter") else t.extractall(tmp)
        for voll in dateien:
            rel = os.path.relpath(voll, verdeckt).replace("\\", "/")
            rel = rel[:-len(".verdeckt")] if rel.endswith(".verdeckt") else rel
            ziel = os.path.join(tmp, rel if rel.startswith("tests/") else os.path.join("tests", "abnahme", rel))
            os.makedirs(os.path.dirname(ziel), exist_ok=True)
            shutil.copyfile(voll, ziel)
            init = os.path.join(os.path.dirname(ziel), "__init__.py")
            if ziel.endswith(".py") and os.path.isfile(os.path.join(tmp, "tests", "__init__.py")) and not os.path.exists(init):
                open(init, "w").close()
        if konfig.get("setup"):
            subprocess.run(konfig["setup"], shell=True, cwd=tmp, capture_output=True, timeout=1800)
        r = subprocess.run(konfig.get("testbefehl") or "false", shell=True, cwd=tmp, capture_output=True, text=True,
                           encoding="utf-8", errors="replace", timeout=1800)
        ausgabe = (r.stdout or "") + "\n" + (r.stderr or "")
        zahl = None
        if konfig.get("testzahl_muster"):
            t = re.findall(konfig["testzahl_muster"], ausgabe)
            if t:
                zahl = t[-1][0] if isinstance(t[-1], tuple) else t[-1]
        betroffen = set()
        for zeile in ausgabe.splitlines():
            if FEHL_ZEILE.search(zeile):
                betroffen |= {"A" + n for n in ANF.findall(zeile)}
        if r.returncode == 0:
            print("Verdeckte Abnahmetests (blind): GRÜN%s." % (" – %s Tests bestanden" % zahl if zahl else ""))
            return
        print("Verdeckte Abnahmetests (blind): ROT. Betroffene Anforderungen: %s." % (
            ", ".join(sorted(betroffen, key=lambda x: int(x[1:]))) or "nicht zuordenbar (Testnamen ohne A-Nummer)"))
        print("Dem Entwickler nur die Anforderungsnummer nennen, nie Testnamen oder Werte.")
        sys.exit(1)
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


if __name__ == "__main__":
    main()
