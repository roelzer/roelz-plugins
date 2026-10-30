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
import subprocess
import sys
from datetime import datetime

sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
import letzte_nachricht  # noqa: E402


def log(projekt, text):
    datei = os.path.join(projekt, "docs", "AGENTEN_LOG.md")
    if not os.path.isdir(os.path.dirname(datei)):
        return
    try:
        with open(datei, "a", encoding="utf-8") as f:
            f.write("| %s | ⚠ | entwickler | %s |\n" % (datetime.now().strftime("%Y-%m-%d %H:%M"), text))
    except OSError:
        pass


def zaehle_zurueckweisung(projekt, eingabe):
    """Eigener Schutz gegen Endlosschleifen (falls stop_hook_active fehlt): höchstens 2 Zurückweisungen."""
    kennung = re.sub(r"[^A-Za-z0-9_-]", "", str(eingabe.get("agent_id") or eingabe.get("session_id") or "x"))[:64]
    ordner = os.path.join(projekt, ".dev-team", "fertig-zaehler")
    datei = os.path.join(ordner, kennung or "x")
    try:
        os.makedirs(ordner, exist_ok=True)
        anzahl = int(open(datei).read().strip() or 0) + 1 if os.path.exists(datei) else 1
        with open(datei, "w") as f:
            f.write(str(anzahl))
        return anzahl
    except (OSError, ValueError):
        return 99


def status_von(text):
    """Status aus der Statuszeile (Groß/Klein egal)."""
    for zeile in text.splitlines()[:15]:
        m = re.search(r"status\W{0,6}(fertig_mit_bedenken|fertig|blockiert|braucht_kontext)", zeile, re.IGNORECASE)
        if m:
            return m.group(1).upper()
    return None


def git(cwd, *args):
    try:
        r = subprocess.run(["git", *args], cwd=cwd, capture_output=True, text=True, timeout=10)
        return r.returncode, r.stdout.strip()
    except (OSError, subprocess.SubprocessError):
        return 1, ""


def win_pfad(pfad):
    m = re.match(r"^/([A-Za-z])(/.*)?$", pfad or "")
    if os.name == "nt" and m:
        return "%s:%s" % (m.group(1).upper(), m.group(2) or "/")
    return pfad


def kandidaten_aus(text):
    """Worktree-Pfade aus dem Bericht – auch in Backticks mit Leerzeichen, ohne Satzzeichen am Ende."""
    roh = re.findall(r"`([^`\n]*[\\/]\.claude[\\/]worktrees[\\/][^`\n]+)`", text)
    roh += re.findall(r"[^\s`'\"()]*[\\/]\.claude[\\/]worktrees[\\/][^\s`'\"()]+", text)
    aus = []
    for k in roh:
        k = k.strip().rstrip(".,;:!?)]}")
        m = re.match(r"(.*?[\\/]\.claude[\\/]worktrees[\\/][^\\/]+)", k)
        if m:
            aus.append(win_pfad(m.group(1)))
    return aus


def belegt(projekt, text, cwd=None):
    wt_basis = os.path.normcase(os.path.abspath(os.path.join(projekt, ".claude", "worktrees")))
    pfade = []
    for k in kandidaten_aus(text):
        p = os.path.abspath(k)
        if os.path.isdir(p) and os.path.normcase(p).startswith(wt_basis + os.sep):
            pfade.append(p)
    eigen = None
    if cwd:
        c = os.path.normcase(os.path.abspath(cwd))
        if c.startswith(wt_basis + os.sep):
            eigen = os.path.join(os.path.abspath(projekt), ".claude", "worktrees",
                                 os.path.relpath(c, wt_basis).split(os.sep)[0])
    if eigen and pfade and os.path.normcase(pfade[-1]) != os.path.normcase(eigen):
        return False, "der genannte Worktree ist nicht der eigene (%s)" % eigen
    if not pfade:
        if not eigen:
            return False, "kein gültiger Worktree-Pfad im Bericht"
        pfade = [eigen]
    wt = pfade[-1]
    code, kopf = git(wt, "rev-parse", "HEAD")
    if code != 0:
        return False, "Worktree nicht lesbar"
    _, offen = git(wt, "status", "--porcelain")
    if offen:
        return False, "Worktree hat nicht committete Änderungen"
    if not os.path.isfile(os.path.join(projekt, ".dev-team", "schranke-ok", kopf)):
        return False, "kein grüner Schranken-Nachweis für HEAD %s" % kopf[:10]
    if kopf not in text:
        return False, "der gemeldete Commit ist nicht der aktuelle HEAD %s" % kopf[:10]
    return True, ""


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
    text = letzte_nachricht.bericht(eingabe)
    status = status_von(text)
    if status in ("BLOCKIERT", "BRAUCHT_KONTEXT"):
        return 0
    if status is None and not re.search(r"🟢|🟡|\bfertig\b", text[:800], re.IGNORECASE):
        return 0
    ok, warum = belegt(projekt, text, eingabe.get("cwd"))
    if ok:
        return 0
    grund = ("Fertigmeldung ohne Beleg (%s). Nötig: Worktree-Pfad nennen, alles committet, und für genau "
             "diesen HEAD hat pruefe-tests.sh --rolle entwickler „OK – alles grün“ gemeldet. Sonst ehrlich "
             "BLOCKIERT melden." % warum)
    if eingabe.get("stop_hook_active") or zaehle_zurueckweisung(projekt, eingabe) > 2:
        log(projekt, "Fertigmeldung NICHT belegt – Paket gilt als BLOCKIERT (%s)" % warum)
        return 0
    log(projekt, "Fertigmeldung ohne Beleg zurückgewiesen")
    sys.stdout.write(json.dumps({"decision": "block", "reason": grund}, ensure_ascii=True) + "\n")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception:
        sys.exit(0)
