#!/usr/bin/env python3
"""Wächter des Dev-Teams (PreToolUse-Hook).

Setzt technisch durch, was sonst nur eine Bitte im Text wäre:

1. Teamzwang: Es dürfen nur Agenten aus team.json gestartet werden. Eingebaute
   Helfer (Explore, Plan, general-purpose, …), Aufrufe ohne Agentennamen,
   erfundene Namen, Teammates und Agenten, die selbst Agenten starten wollen,
   werden blockiert. Das Modell eines Agenten darf nicht überschrieben werden.
2. Schreibrechte: Wer welche Dateien anlegen oder ändern darf, steht in
   team.json (Bereiche). Beispiel: Der Entwickler darf Code schreiben und neue
   Tests anlegen, aber keine bestehenden Tests, Referenzwerte, Fachregeln,
   Architekturregeln oder Abnahmetests ändern. Der Projektleiter schreibt
   keinen Code.
3. Verdeckte Abnahmetests: Der Entwickler darf sie nicht lesen.
4. Agentendateien: Niemand legt über die Werkzeuge neue Agenten an.

Aufruf: python3 waechter.py <plugin-ordner>   (Hook-Eingabe als JSON auf stdin)
Ergebnis: Exit 0 = erlaubt (keine Ausgabe). Exit 2 = blockiert, Grund auf stderr
und zusätzlich als JSON-Entscheidung auf stdout.

Im Zweifel wird blockiert (z. B. unlesbare Eingabe in einem Dev-Team-Projekt).
Außerhalb von Dev-Team-Projekten greift nur der Schutz der Agentendateien.
"""

import json
import os
import re
import sys
from datetime import datetime

BLOCK = 2

SCHREIB_WERKZEUGE = {"Write", "Edit", "MultiEdit", "NotebookEdit"}
LESE_WERKZEUGE = {"Read", "Grep", "Glob", "NotebookRead"}
AGENT_WERKZEUGE = {"Agent", "Task"}


# --------------------------------------------------------------------------- Hilfen

def blockieren(grund, projekt=None, protokoll=None):
    text = "⛔ Dev-Team-Wächter: " + grund
    if projekt and protokoll:
        log_zeile(projekt, "⛔", protokoll, grund)
    sys.stderr.write(text + "\n")
    sys.stdout.write(json.dumps({
        "hookSpecificOutput": {
            "hookEventName": "PreToolUse",
            "permissionDecision": "deny",
            "permissionDecisionReason": text,
        }
    }, ensure_ascii=False) + "\n")
    sys.exit(BLOCK)


def erlauben():
    sys.exit(0)


def norm(pfad):
    return pfad.replace("\\", "/")


def muster_zu_regex(muster):
    """Glob mit ** (beliebig tief), * (ein Pfadteil), ? (ein Zeichen)."""
    m = norm(muster)
    teile = []
    i = 0
    while i < len(m):
        if m.startswith("**/", i):
            teile.append("(?:.*/)?")
            i += 3
        elif m.startswith("**", i):
            teile.append(".*")
            i += 2
        elif m[i] == "*":
            teile.append("[^/]*")
            i += 1
        elif m[i] == "?":
            teile.append("[^/]")
            i += 1
        else:
            teile.append(re.escape(m[i]))
            i += 1
    return re.compile("^" + "".join(teile) + "$", re.IGNORECASE)


def passt(relpfad, muster_liste):
    return any(muster_zu_regex(mu).match(relpfad) for mu in muster_liste)


def agent_kurzname(name):
    """'dev-team:entwickler' -> 'entwickler'; 'entwickler' -> 'entwickler'."""
    name = (name or "").strip()
    return name.split(":")[-1].strip().lower()


def ist_dev_team_projekt(ordner):
    if not ordner:
        return False
    if os.path.isfile(os.path.join(ordner, ".claude", "dev-team.json")):
        return True
    # Projekte aus Version 2 (noch ohne dev-team.json)
    return (os.path.isfile(os.path.join(ordner, "docs", "STATUS.md"))
            and os.path.isfile(os.path.join(ordner, "docs", "lastenheft.md")))


def repo_wurzel(pfad):
    """Nächster Ordner nach oben, der .git enthält (Ordner oder Datei = Worktree)."""
    d = pfad if os.path.isdir(pfad) else os.path.dirname(pfad)
    while d and not os.path.isdir(d):
        neu = os.path.dirname(d)
        if neu == d:
            break
        d = neu
    while d:
        if os.path.exists(os.path.join(d, ".git")):
            return d
        neu = os.path.dirname(d)
        if neu == d:
            return None
        d = neu
    return None


def innerhalb(pfad, ordner):
    p = os.path.normcase(os.path.abspath(pfad))
    o = os.path.normcase(os.path.abspath(ordner))
    return p == o or p.startswith(o.rstrip("\\/") + os.sep)


def log_zeile(projekt, zeichen, agent, text):
    docs = os.path.join(projekt, "docs")
    if not os.path.isdir(docs):
        return
    log = os.path.join(docs, "AGENTEN_LOG.md")
    try:
        neu = not os.path.exists(log)
        with open(log, "a", encoding="utf-8") as f:
            if neu:
                f.write("# Agenten-Protokoll\n\nWird automatisch geschrieben. "
                        "Jede Zeile: Zeit, Agent, was er bekommen bzw. gemeldet hat. "
                        "⛔ = vom Wächter blockiert.\n\n"
                        "| Zeit | | Agent | Auftrag / Ergebnis |\n|---|---|---|---|\n")
            sauber = re.sub(r"\s+", " ", str(text).replace("|", "/")).strip()[:160]
            f.write("| %s | %s | %s | %s |\n" % (
                datetime.now().strftime("%Y-%m-%d %H:%M"), zeichen, agent, sauber))
    except OSError:
        pass


# --------------------------------------------------------------------------- Prüfungen

def pruefe_agent_start(eingabe, team, projekt):
    ti = eingabe.get("tool_input") or {}
    erlaubte = sorted(team["agenten"].keys())
    roh = (ti.get("subagent_type") or "").strip()
    kurz = agent_kurzname(roh)
    beschreibung = ti.get("description") or ""
    liste = ", ".join(erlaubte)

    if eingabe.get("agent_type") or eingabe.get("agent_id"):
        blockieren("Ein Agent darf keine weiteren Agenten starten ('%s' wollte '%s' starten). "
                   "Braucht er jemanden, schreibt er das als Bitte in seinen Bericht."
                   % (eingabe.get("agent_type") or "?", roh or "ohne Namen"),
                   projekt, roh or "ohne Namen")
    if not roh:
        blockieren("Agent ohne Namen ist ein Allzweck-Helfer und im Dev-Team nicht erlaubt. "
                   "Erlaubt sind nur: %s. Fehlt eine Rolle: anhalten und Simon fragen." % liste,
                   projekt, "ohne Namen")
    if ":" in roh and not roh.lower().startswith("dev-team:"):
        blockieren("'%s' gehört nicht zum Dev-Team. Erlaubt sind nur: %s." % (roh, liste),
                   projekt, roh)
    if kurz not in team["agenten"]:
        blockieren("'%s' ist nicht im festen Team. Erlaubt sind nur: %s. Keine Ersatz-Helfer, "
                   "keine eingebauten Agenten. Fehlt eine Rolle: anhalten und Simon fragen."
                   % (roh, liste), projekt, roh)
    if ti.get("model"):
        blockieren("Das Modell von '%s' ist im Steckbrief festgelegt und darf beim Aufruf nicht "
                   "überschrieben werden (model='%s'). Ohne model-Angabe erneut aufrufen."
                   % (kurz, ti.get("model")), projekt, kurz)
    if ti.get("name") or ti.get("team_name"):
        blockieren("Teammates/Agenten-Teams sind im Dev-Team nicht erlaubt. "
                   "Agenten ohne name-Angabe aufrufen.", projekt, kurz)
    log_zeile(projekt, "▶", kurz, beschreibung)
    erlauben()


def bereich_von(relpfad, team):
    b = team["bereiche"]
    for name in b["reihenfolge"]:
        if passt(relpfad, b[name]):
            return name
    return "code"


def darf_schreiben(rolle, bereich, existiert, team):
    if rolle == "projektleiter":
        rechte = team["projektleiter_schreibt"]
    else:
        rechte = team["agenten"].get(rolle, {}).get("schreibt", [])
    if bereich in rechte:
        return True
    if (bereich + "-neu") in rechte and not existiert:
        return True
    return False


BEREICH_TEXT = {
    "gesperrt": "Agenten-, Skill-, Hook- und Git-Dateien",
    "konfig": "Projekteinstellungen (.claude/settings.json)",
    "architektur": "Architekturregeln (nur der Architekt)",
    "abnahme": "Abnahmetests (nur der Tester)",
    "referenz": "Referenzfälle (Werte ändert nur Simon)",
    "regeln": "Fachregeln (nur nach Simons Bestätigung, durch den Projektleiter)",
    "lastenheft": "Lastenheft (nur der Projektleiter)",
    "recherche": "Recherche",
    "quellen": "Fachunterlagen",
    "projektdateien": "Projektdateien",
    "prozess": "Projektunterlagen in docs/",
    "tests": "Tests",
    "code": "Programmcode (nur der Entwickler)",
}


def pruefe_schreiben(eingabe, team, projekt, plugin, rolle):
    ti = eingabe.get("tool_input") or {}
    pfad = ti.get("file_path") or ti.get("notebook_path") or ti.get("path") or ""
    if not pfad:
        if projekt:
            blockieren("Schreibvorgang ohne Dateipfad kann nicht geprüft werden.", projekt, rolle)
        erlauben()
    cwd = eingabe.get("cwd") or projekt or os.getcwd()
    absolut = os.path.abspath(os.path.join(cwd, os.path.expanduser(pfad)))
    np = norm(absolut)

    # Überall: niemand schaltet den Schutz über Einstellungen ab.
    inhalt = " ".join(str(ti.get(k) or "") for k in ("content", "new_string", "new_source"))
    for e in ti.get("edits") or []:
        if isinstance(e, dict):
            inhalt += " " + str(e.get("new_string") or "")
    if "DEV_TEAM_WARTUNG" in inhalt or re.search(r'"disableAllHooks"\s*:\s*true', inhalt) \
            or re.search(r"CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH\"?\s*:\s*\"?([2-9]|\d\d)", inhalt):
        blockieren("Schutzschalter des Dev-Teams (Wartungsmodus, Hooks aus, Agenten-Verschachtelung) "
                   "werden nicht von Claude gesetzt. Das macht nur Simon von Hand.", projekt, rolle)

    # Überall: keine neuen Agenten, Skills oder Hooks über die Werkzeuge.
    if re.search(r"/\.claude/(agents|skills|hooks|commands)/", np, re.IGNORECASE):
        blockieren("Agenten-, Skill- und Hook-Dateien werden nicht von Claude angelegt oder "
                   "geändert. Neue Rollen nur über das Plugin-Repo mit Simons Freigabe.",
                   projekt, rolle)
    if plugin and innerhalb(absolut, plugin) and os.environ.get("DEV_TEAM_WARTUNG") != "1":
        rel_plugin = norm(os.path.relpath(absolut, plugin))
        if not rel_plugin.startswith("wissen/"):
            blockieren("Das installierte Dev-Team (Agenten, team.json, Hooks, Skripte) wird nicht "
                       "aus einer Arbeitssitzung heraus geändert. Für Wartung startet Simon "
                       "Claude Code mit DEV_TEAM_WARTUNG=1.", projekt, rolle)

    if not projekt:
        erlauben()  # kein Dev-Team-Projekt: nur der Grundschutz oben

    wurzel = repo_wurzel(absolut)
    if wurzel and (innerhalb(wurzel, projekt) or ist_dev_team_projekt(wurzel)):
        basis = wurzel
    elif innerhalb(absolut, projekt):
        basis = projekt
    else:
        if rolle == "projektleiter":
            erlauben()  # z. B. ~/.claude/CLAUDE.md beim Einrichten
        blockieren("Agent '%s' darf nur im Projekt bzw. seinem Worktree schreiben, nicht in %s."
                   % (rolle, np), projekt, rolle)

    rel = norm(os.path.relpath(absolut, basis))
    if rel.startswith("../"):
        blockieren("Pfad außerhalb des Projekts: %s" % np, projekt, rolle)
    bereich = bereich_von(rel, team)
    existiert = os.path.exists(absolut)
    if not darf_schreiben(rolle, bereich, existiert, team):
        wer = "Der Projektleiter" if rolle == "projektleiter" else "Agent '%s'" % rolle
        zusatz = ""
        if rolle == "projektleiter" and bereich in ("code", "tests"):
            zusatz = " Code baut der Agent 'entwickler', Tests schreibt der 'tester'."
        if rolle == "entwickler" and bereich == "tests" and existiert:
            zusatz = (" Der Entwickler darf neue Tests anlegen, bestehende aber nicht ändern. "
                      "Ist ein bestehender Test falsch: im Bericht melden, der Tester entscheidet.")
        art = "ändern" if existiert else "anlegen"
        blockieren("%s darf %s nicht %s (Datei: %s).%s"
                   % (wer, BEREICH_TEXT.get(bereich, bereich), art, rel, zusatz),
                   projekt, rolle)
    erlauben()


def pruefe_lesen(eingabe, team, projekt, rolle, werkzeug):
    if rolle not in team.get("verdeckt_lesen_verboten_fuer", []):
        erlauben()
    ti = eingabe.get("tool_input") or {}
    if werkzeug == "Bash":
        text = ti.get("command") or ""
    else:
        text = " ".join(str(ti.get(k) or "") for k in ("file_path", "path", "pattern", "notebook_path", "glob"))
    marke = team.get("verdeckt_pfad", ".dev-team/verdeckt/").rstrip("/").split("/")[-1]
    if re.search(r"(^|[\\/\s\"'])\.dev-team[\\/]+" + re.escape(marke), norm(text), re.IGNORECASE) \
            or ("verdeckt" in text.lower() and ".dev-team" in text.lower()):
        blockieren("Die verdeckten Abnahmetests sind für den Entwickler gesperrt. Baue nach den "
                   "Abnahmekriterien im Plan.", projekt, rolle)
    erlauben()


# --------------------------------------------------------------------------- Start

def main():
    plugin = sys.argv[1] if len(sys.argv) > 1 else os.environ.get("CLAUDE_PLUGIN_ROOT", "")
    plugin = os.path.abspath(plugin) if plugin else ""
    roh = sys.stdin.read()
    projekt_env = os.environ.get("CLAUDE_PROJECT_DIR") or ""

    try:
        eingabe = json.loads(roh) if roh.strip() else {}
    except ValueError:
        eingabe = None

    projekt = None
    for kandidat in (projekt_env, (eingabe or {}).get("cwd") if isinstance(eingabe, dict) else None):
        if kandidat and ist_dev_team_projekt(kandidat):
            projekt = os.path.abspath(kandidat)
            break

    if not isinstance(eingabe, dict):
        if projekt:
            blockieren("Hook-Eingabe nicht lesbar – im Zweifel blockiert.")
        erlauben()

    try:
        with open(os.path.join(plugin, "team.json"), encoding="utf-8") as f:
            team = json.load(f)
    except (OSError, ValueError):
        if projekt:
            blockieren("team.json im Plugin-Ordner fehlt oder ist ungültig – im Zweifel blockiert.")
        erlauben()

    werkzeug = eingabe.get("tool_name") or ""
    rolle = agent_kurzname(eingabe.get("agent_type")) or "projektleiter"
    if rolle != "projektleiter" and rolle not in team["agenten"]:
        rolle_bekannt = False
    else:
        rolle_bekannt = True

    if werkzeug in AGENT_WERKZEUGE:
        if not projekt:
            erlauben()
        pruefe_agent_start(eingabe, team, projekt)

    if projekt and not rolle_bekannt:
        blockieren("Unbekannter Agent '%s' arbeitet in einem Dev-Team-Projekt. Nur das feste Team "
                   "darf hier arbeiten." % eingabe.get("agent_type"), projekt, eingabe.get("agent_type"))

    if werkzeug in SCHREIB_WERKZEUGE:
        pruefe_schreiben(eingabe, team, projekt, plugin, rolle)

    if projekt and werkzeug == "Bash":
        befehl = str((eingabe.get("tool_input") or {}).get("command") or "")
        if "DEV_TEAM_WARTUNG" in befehl or "disableAllHooks" in befehl:
            blockieren("Schutzschalter des Dev-Teams werden nicht von Claude gesetzt, auch nicht über "
                       "die Shell. Das macht nur Simon von Hand.", projekt, rolle)

    if projekt and (werkzeug in LESE_WERKZEUGE or werkzeug == "Bash"):
        pruefe_lesen(eingabe, team, projekt, rolle, werkzeug)

    erlauben()


if __name__ == "__main__":
    main()
