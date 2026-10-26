#!/usr/bin/env python3
"""Wächter des Dev-Teams (PreToolUse-Hook), Version 3.1.

Setzt technisch durch, was sonst nur eine Bitte im Text wäre:

1. Teamzwang: Nur Agenten aus team.json dürfen starten (lokal mit Präfix
   "dev-team:", in Cloud-Sitzungen ohne Präfix nur mit kopierter Agentendatei).
   Eingebaute Helfer, Agenten ohne Namen, erfundene oder fremde Agenten,
   Teammates, Agenten, die Agenten starten, Modell- und Isolations-Überschreiben
   und neue Claude-Sitzungen über die Shell werden blockiert.
2. Schreibrechte je Rolle (Bereiche in team.json) – für Write/Edit und, so weit
   erkennbar, auch für Shell-Befehle (Umleitung, tee, sed -i, cp, mv, rm, touch,
   git checkout/restore/rm/mv, Skript-Einzeiler mit Schreibzugriff).
3. Verdeckte Abnahmetests: Der Entwickler liest nur in seinem eigenen Worktree.
4. Schutzschalter: Einstellungen, die den Schutz abschalten würden, kann Claude
   nicht setzen; Einstellungsdateien schreibt nur Simon bzw. ein Plugin-Skript.

Aufruf: python3 -X utf8 waechter.py <plugin-ordner>  (Hook-Eingabe als JSON auf stdin)
Exit 0 = erlaubt. Exit 2 = blockiert (Grund auf stderr, JSON-Entscheidung auf stdout).
Im Zweifel wird blockiert: unlesbare Eingabe oder ein interner Fehler blockiert in
Dev-Team-Projekten. Außerhalb davon greift nur der Grundschutz.

Ehrliche Grenze: Shell-Befehle werden nach Mustern geprüft. Das erschwert Umgehungen
stark, kann sie aber nicht vollständig verhindern (z. B. selbst geschriebene Skripte).
"""

import io
import json
import os
import re
import shlex
import subprocess
import sys
import tempfile
from datetime import datetime

BLOCK = 2

SCHREIB_WERKZEUGE = {"Write", "Edit", "MultiEdit", "NotebookEdit"}
LESE_WERKZEUGE = {"Read", "Grep", "Glob", "NotebookRead", "LS"}
AGENT_WERKZEUGE = {"Agent", "Task"}
SHELL_WERKZEUGE = {"Bash", "PowerShell"}

SCHUTZSCHALTER = [
    r"DEV_TEAM_WARTUNG", r"disableAllHooks", r"bypassPermissions", r"dangerously-skip-permissions",
    r"allowManagedHooksOnly", r"\"defaultMode\"", r"CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH",
    r"CLAUDE_CODE_DISABLE_EXPLORE_PLAN_AGENTS", r"CLAUDE_CODE_FORK_SUBAGENT",
    r"dev-team@roelz-plugins\"?\s*:\s*false",
]
KONFIG_ENDUNGEN = (".json", ".toml", ".yaml", ".yml", ".env", ".sh", ".ps1", ".cmd", ".bat", ".cfg", ".ini")


class Blockiert(Exception):
    pass


# --------------------------------------------------------------------------- Hilfen

def utf8_einrichten():
    try:
        sys.stdin = io.TextIOWrapper(sys.stdin.buffer, encoding="utf-8", errors="replace")
    except (AttributeError, ValueError):
        pass
    for strom in (sys.stdout, sys.stderr):
        try:
            strom.reconfigure(encoding="utf-8", errors="replace")
        except (AttributeError, ValueError):
            pass


_KONTEXT = {"projekt": None, "rolle": None, "team": {}}


def blockieren(grund, protokoll=None):
    text = "⛔ Dev-Team-Wächter: " + grund
    projekt = _KONTEXT["projekt"]
    if projekt:
        log_zeile(projekt, "⛔", protokoll or _KONTEXT["rolle"] or "?", grund)
    try:
        sys.stderr.write(text + "\n")
        sys.stdout.write(json.dumps({
            "hookSpecificOutput": {
                "hookEventName": "PreToolUse",
                "permissionDecision": "deny",
                "permissionDecisionReason": text,
            }
        }, ensure_ascii=True) + "\n")
    except Exception:  # Ausgabe darf das Blockieren nie verhindern
        pass
    raise Blockiert()


def norm(pfad):
    return str(pfad).replace("\\", "/")


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


def ist_dev_team_projekt(ordner):
    if not ordner:
        return False
    if os.path.isfile(os.path.join(ordner, ".claude", "dev-team.json")):
        return True
    return (os.path.isfile(os.path.join(ordner, "docs", "STATUS.md"))
            and os.path.isfile(os.path.join(ordner, "docs", "lastenheft.md")))


def repo_wurzel(pfad):
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


def git(cwd, *args):
    try:
        r = subprocess.run(["git", *args], cwd=cwd, capture_output=True, text=True,
                           encoding="utf-8", errors="replace", timeout=10)
        return r.returncode, r.stdout.strip()
    except (OSError, subprocess.SubprocessError):
        return 1, ""


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


def heimat():
    return os.path.expanduser("~")


# --------------------------------------------------------------------------- Identität

def rolle_aus(agent_type, team, projekt):
    """Rolle eines laufenden Agenten. None = unbekannt (nicht im Team)."""
    roh = (agent_type or "").strip()
    if not roh:
        return "projektleiter"
    if ":" in roh:
        praefix, kurz = roh.rsplit(":", 1)
        kurz = kurz.strip().lower()
        if praefix.strip().lower() == "dev-team" and kurz in team["agenten"]:
            return kurz
        return None
    kurz = roh.lower()
    if kurz in team["agenten"] and cloud_kopie(projekt, kurz):
        return kurz
    return None


def cloud_kopie(projekt, kurz):
    return bool(projekt) and os.path.isfile(os.path.join(projekt, ".claude", "agents", "dev-team-%s.md" % kurz))


# --------------------------------------------------------------------------- Agenten-Start

def pruefe_agent_start(eingabe, team, projekt):
    ti = eingabe.get("tool_input") or {}
    if not isinstance(ti, dict):
        blockieren("Agent-Aufruf mit unlesbaren Angaben.")
    erlaubte = ", ".join("dev-team:" + n for n in sorted(team["agenten"]))
    roh = str(ti.get("subagent_type") or "").strip()

    if eingabe.get("agent_type") or eingabe.get("agent_id"):
        blockieren("Ein Agent darf keine weiteren Agenten starten ('%s' wollte '%s' starten). "
                   "Braucht er jemanden, schreibt er das als Bitte in seinen Bericht."
                   % (eingabe.get("agent_type") or "?", roh or "ohne Namen"), roh or "ohne Namen")
    if not roh:
        blockieren("Agent ohne Namen ist ein Allzweck-Helfer und im Dev-Team nicht erlaubt. "
                   "Erlaubt sind nur: %s. Fehlt eine Rolle: anhalten und Simon fragen." % erlaubte, "ohne Namen")
    kurz = rolle_aus(roh, team, projekt)
    if kurz is None:
        blockieren("'%s' ist nicht im festen Team. Erlaubt sind nur: %s. Keine Ersatz-Helfer, "
                   "keine eingebauten oder selbst angelegten Agenten. Fehlt eine Rolle: anhalten und "
                   "Simon fragen." % (roh, erlaubte), roh)
    if ti.get("model"):
        blockieren("Das Modell von '%s' ist im Steckbrief festgelegt und darf beim Aufruf nicht "
                   "überschrieben werden. Ohne model-Angabe erneut aufrufen." % kurz, kurz)
    if ti.get("name") or ti.get("team_name"):
        blockieren("Teammates/Agenten-Teams sind im Dev-Team nicht erlaubt. Ohne name-Angabe aufrufen.", kurz)
    iso = ti.get("isolation")
    if iso and kurz == "entwickler" and str(iso) != "worktree":
        blockieren("Der Entwickler arbeitet immer in einem eigenen Worktree; isolation darf nicht "
                   "überschrieben werden.", kurz)
    log_zeile(projekt, "▶", kurz, ti.get("description") or "")


# --------------------------------------------------------------------------- Schreibrechte

def bereich_von(relpfad, team):
    b = team["bereiche"]
    for name in b["reihenfolge"]:
        if passt(relpfad, b[name]):
            return name
    return "code"


def rechte(rolle, team):
    if rolle == "projektleiter":
        return team["projektleiter_schreibt"]
    return team["agenten"].get(rolle, {}).get("schreibt", [])


def neu_im_paket(absolut, wurzel, projekt):
    """Testdatei wurde in diesem Paket angelegt (nicht vorhanden an der Abzweigung)."""
    if not os.path.exists(absolut):
        return True
    rel = norm(os.path.relpath(absolut, wurzel))
    code, _ = git(wurzel, "ls-files", "--error-unmatch", "--", rel)
    if code != 0:
        return True  # noch nicht versioniert = im Paket neu
    _, haupt_kopf = git(projekt, "rev-parse", "HEAD")
    if not haupt_kopf:
        return False
    code, abzweig = git(wurzel, "merge-base", "HEAD", haupt_kopf)
    if code != 0 or not abzweig:
        return False
    code, _ = git(wurzel, "cat-file", "-e", "%s:%s" % (abzweig, rel))
    return code != 0


BEREICH_TEXT = {
    "gesperrt": "Agenten-, Skill-, Hook-, Freigabe- und Git-Dateien",
    "nachweis": "Nachweise (Agenten-Log, Testnachweis, Schranken-Nachweise)",
    "testkonfig": "Testkonfiguration (bestehende ändert nur der Tester)",
    "konfig": "Projekteinstellungen (.claude/settings*.json)",
    "teamkonfig": "die Dev-Team-Einstellungen (.claude/dev-team.json)",
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


def win_pfad(pfad, nt=None):
    """Git-Bash-Pfade (/c/Users/...) unter Windows in C:/Users/... umwandeln."""
    nt = (os.name == "nt") if nt is None else nt
    m = re.match(r"^/([A-Za-z])(/.*)?$", pfad or "")
    if nt and m:
        return "%s:%s" % (m.group(1).upper(), m.group(2) or "/")
    return pfad


def absolut_aus(cwd, pfad):
    pfad = win_pfad(os.path.expanduser(pfad))
    return os.path.abspath(os.path.join(cwd, pfad))


def baukasten_pfad():
    try:
        with open(os.path.join(heimat(), ".claude", "CLAUDE.md"), encoding="utf-8") as f:
            for zeile in f:
                if zeile.startswith("Baukasten:"):
                    return os.path.abspath(os.path.expanduser(win_pfad(zeile.split(":", 1)[1].strip())))
    except OSError:
        pass
    return None


def pruefe_ziel(absolut, team, projekt, plugin, rolle, art="schreiben", ueber_shell=False):
    """Prüft einen einzelnen Schreib- oder Löschzugriff auf einen Pfad."""
    np = norm(absolut)
    weg = " (auch über die Shell nicht)" if ueber_shell else ""

    if re.search(r"/\.claude/(agents|skills|hooks|commands)/", np, re.IGNORECASE):
        blockieren("Agenten-, Skill- und Hook-Dateien werden nicht von Claude angelegt oder geändert%s. "
                   "Neue Rollen nur über das Plugin-Repo mit Simons Freigabe." % weg)
    wartung = os.environ.get("DEV_TEAM_WARTUNG") == "1"
    if not wartung and re.search(r"(^|/)\.claude/settings(\.local)?\.json$|(^|/)\.claude\.json$|"
                                 r"(^|/)managed-settings\.json$", np, re.IGNORECASE):
        blockieren("Einstellungsdateien schreibt Claude nicht direkt%s. Neue Projekteinstellungen "
                   "über scripts/settings_zusammenfuehren.py nach Simons OK." % weg)
    if plugin and innerhalb(absolut, plugin) and not wartung:
        rel_p = norm(os.path.relpath(absolut, plugin))
        if not (rel_p.startswith("wissen/fachwissen/") or rel_p == "wissen/lessons.md"):
            blockieren("Das installierte Dev-Team (Grundgesetz, Agenten, team.json, Hooks, Skripte) wird nicht "
                       "aus einer Arbeitssitzung heraus geändert%s. Erlaubt sind nur Lessons und die "
                       "Fachwissen-Bibliothek. Wartung nur mit DEV_TEAM_WARTUNG=1, das Simon selbst setzt." % weg)
        if rolle != "projektleiter":
            blockieren("Lessons und Fachwissen-Bibliothek pflegt nur der Projektleiter nach Simons Bestätigung.")
        return
    claude_heim = os.path.join(heimat(), ".claude")
    if innerhalb(absolut, claude_heim) and not wartung:
        rel_heim = norm(os.path.relpath(absolut, claude_heim))
        if not (rel_heim == "CLAUDE.md" or rel_heim.startswith("dev-team/")):
            blockieren("In ~/.claude schreibt Claude nur CLAUDE.md und dev-team/%s." % weg)

    projekt = _KONTEXT["projekt"]
    if not projekt:
        return

    wurzel = repo_wurzel(absolut)
    if wurzel and (innerhalb(wurzel, projekt) or ist_dev_team_projekt(wurzel)):
        basis = wurzel
    elif innerhalb(absolut, projekt):
        basis = projekt
    else:
        if innerhalb(absolut, tempfile.gettempdir()) and not wurzel:
            return  # Wegwerf-Dateien im System-Temp (nicht in einem Repo)
        if rolle == "projektleiter" and wartung:
            return
        if rolle == "projektleiter":
            bk = baukasten_pfad()
            if innerhalb(absolut, claude_heim) or (bk and innerhalb(absolut, bk)):
                return
            blockieren("Außerhalb des Projekts schreibt der Projektleiter nur ~/.claude/CLAUDE.md, "
                       "~/.claude/dev-team/ und das Baukasten-Repo (nicht %s)%s. Für ein anderes Projekt "
                       "eine eigene Sitzung dort starten." % (np, weg))
        blockieren("Agent '%s' darf nur im Projekt bzw. seinem Worktree schreiben, nicht in %s%s."
                   % (rolle, np, weg))

    rel = norm(os.path.relpath(absolut, basis))
    if rel.startswith("../"):
        blockieren("Pfad außerhalb des Projekts: %s" % np)
    bereich = bereich_von(rel, team)
    if bereich == "teamkonfig" and art == "loeschen":
        blockieren("Die Dev-Team-Einstellungen (.claude/dev-team.json) werden nicht gelöscht oder "
                   "verschoben – ohne sie wäre das Projekt ungeschützt%s." % weg)
    existiert = os.path.exists(absolut)
    erlaubt = rechte(rolle, team)
    if bereich in erlaubt:
        return
    if (bereich + "-neu") in erlaubt and art != "loeschen":
        if not existiert:
            return
        if rolle == "entwickler" and bereich in ("tests", "testkonfig") and neu_im_paket(absolut, basis, projekt):
            return
    wer = "Der Projektleiter" if rolle == "projektleiter" else "Agent '%s'" % rolle
    zusatz = ""
    if rolle == "projektleiter" and bereich in ("code", "tests", "testkonfig"):
        zusatz = " Code baut der Agent 'entwickler', Tests schreibt der 'tester'."
    if rolle == "entwickler" and bereich in ("tests", "testkonfig"):
        zusatz = (" Der Entwickler darf Tests anlegen und seine eigenen neuen Tests bearbeiten, "
                  "bestehende aber nicht ändern oder löschen. Ist ein bestehender Test falsch: im "
                  "Bericht melden, der Tester entscheidet.")
    if bereich == "nachweis":
        zusatz = " Nachweise schreiben nur die Prüfskripte und Hooks."
    wort = {"loeschen": "löschen"}.get(art, "ändern" if existiert else "anlegen")
    blockieren("%s darf %s nicht %s (Datei: %s)%s.%s" % (wer, BEREICH_TEXT.get(bereich, bereich),
                                                         wort, rel, weg, zusatz))


def pruefe_schreiben(eingabe, team, projekt, plugin, rolle):
    ti = eingabe.get("tool_input") or {}
    if not isinstance(ti, dict):
        blockieren("Schreibvorgang mit unlesbaren Angaben.")
    pfad = ti.get("file_path") or ti.get("notebook_path") or ti.get("path") or ""
    if not isinstance(pfad, str) or not pfad:
        if projekt:
            blockieren("Schreibvorgang ohne lesbaren Dateipfad kann nicht geprüft werden.")
        return
    cwd = eingabe.get("cwd") or projekt or os.getcwd()
    absolut = absolut_aus(cwd, pfad)

    inhalt = " ".join(str(ti.get(k) or "") for k in ("content", "new_string", "new_source"))
    for e in ti.get("edits") or []:
        if isinstance(e, dict):
            inhalt += " " + str(e.get("new_string") or "")
    if os.environ.get("DEV_TEAM_WARTUNG") != "1":
        pruefe_auf_schalter(inhalt, nur_konfig=not absolut.lower().endswith(KONFIG_ENDUNGEN))
    pruefe_ziel(absolut, team, projekt, plugin, rolle)


def pruefe_auf_schalter(text, nur_konfig=False):
    muster = [r"DEV_TEAM_WARTUNG"] if nur_konfig else SCHUTZSCHALTER
    for m in muster:
        if re.search(m, text):
            blockieren("Schutzschalter des Dev-Teams (Wartungsmodus, Hooks aus, Freigaben umgehen, "
                       "Plugin aus, Agenten-Verschachtelung) setzt Claude nicht. Das macht nur Simon von Hand.")


# --------------------------------------------------------------------------- Shell

TRENNER = {";", "&&", "||", "|", "&", "\n", "(", ")", "|&"}
SCHREIB_INDIZIEN = re.compile(
    r"open\s*\([^)]*,\s*(?:mode\s*=\s*)?['\"][^'\"]*[wax+]|write_text|write_bytes|writeFile|appendFile|createWriteStream|"
    r"os\.remove|os\.unlink|unlink\s*\(|shutil\.|\.rename\s*\(|os\.replace|rmSync|rmdirSync|"
    r"Set-Content|Out-File|Add-Content|subprocess|os\.system|child_process|execSync|spawn|exec\s*\(|eval\s*\(|"
    r"__import__|base64|compile\s*\(", re.IGNORECASE)
SHELLS = {"bash", "sh", "zsh", "dash", "ksh", "fish", "pwsh", "powershell", "cmd", "busybox"}
INTERPRETER = {"python", "python3", "py", "node", "deno", "bun", "ruby", "perl", "php", "tclsh", "lua", "Rscript"}
PAKET_AUSFUEHRER = {"npx", "bunx", "uvx", "pnpx"}
UNPRUEFBAR = ("Dieser Befehl ist für den Wächter nicht prüfbar (Befehl in einer Hülle wie bash -c/eval, aus einer "
              "Variable, per Pipe an einen Interpreter oder ein Skript-Einzeiler mit Datei- oder Prozesszugriff). "
              "Dateien mit Write/Edit schreiben, Befehle direkt ausführen.")


def ohne_heredocs(befehl):
    return re.sub(r"<<-?\s*['\"]?(\w+)['\"]?[^\n]*\n.*?\n\s*\1\b", "<<HEREDOC", befehl, flags=re.S)


def segmente(befehl):
    text = ohne_heredocs(befehl)
    try:
        lex = shlex.shlex(text, posix=True, punctuation_chars=";&|()<>")
        lex.whitespace_split = True
        lex.commenters = ""
        tokens = list(lex)
    except ValueError:
        tokens = text.split()
    teil, vorher_pipe = [], False
    for t in tokens:
        if t in TRENNER or (t and set(t) <= set(";&|()")):
            if teil:
                yield teil, vorher_pipe
            teil = []
            vorher_pipe = t in ("|", "|&")
        else:
            teil.append(t)
    if teil:
        yield teil, vorher_pipe


def ohne_optionen(args):
    return [a for a in args if not a.startswith("-")]


def paket_bekannt(name, cwd):
    """npx/bunx-Paket steht in package.json (dann ist es durch die Abhängigkeits-Schranke gegangen)."""
    wurzel = repo_wurzel(cwd) if cwd else None
    try:
        with open(os.path.join(wurzel or cwd or ".", "package.json"), encoding="utf-8") as f:
            d = json.load(f)
    except (OSError, ValueError, TypeError):
        return False
    basis = re.sub(r"(?<!^)@.*$", "", name)
    for feld in ("dependencies", "devDependencies", "optionalDependencies"):
        if basis in (d.get(feld) or {}):
            return True
    return basis in {os.path.basename(b) for b in (d.get("bin") or {})} if isinstance(d.get("bin"), dict) else False


def shell_analyse(befehl, cwd=None, rolle="projektleiter", projekt=None, plugin="", tiefe=0):
    """-> (ziele: Liste (pfad, art)), opak: bool, verbotenes: str|None"""
    ziele, opak, verboten = [], False, None
    if tiefe > 3:
        return ziele, True, None
    # Heredoc oder Pipe direkt in einen Interpreter / eine Shell
    if re.search(r"\b(?:%s)\b[^\n|;&]*<<" % "|".join(sorted(SHELLS | INTERPRETER)), befehl):
        opak = True
    for seg, nach_pipe in segmente(befehl):
        i, rest = 0, []
        while i < len(seg):
            t = seg[i]
            if re.fullmatch(r"\d", t) and i + 1 < len(seg) and seg[i + 1].startswith((">", "<")):
                i += 1
                continue
            if t in (">&", "<&", ">>&"):
                if i + 1 < len(seg):
                    ziel = seg[i + 1]
                    if not re.fullmatch(r"\d+|-", ziel) and ziel not in ("/dev/null", "NUL", "nul"):
                        ziele.append((ziel, "schreiben"))
                    i += 2
                    continue
            if t in (">", ">>", ">|", "&>", "&>>") or re.fullmatch(r"\d?>>?", t):
                if i + 1 < len(seg):
                    ziel = seg[i + 1]
                    if not ziel.startswith("&") and ziel not in ("/dev/null", "NUL", "nul", "$null"):
                        ziele.append((ziel, "schreiben"))
                    i += 2
                    continue
            if t in ("<", "<<", "<<<"):
                i += 2
                continue
            rest.append(t)
            i += 1
        mit_xargs = False
        while rest and re.fullmatch(r"[A-Za-z_][A-Za-z0-9_]*=.*", rest[0]):
            rest = rest[1:]
        while rest and rest[0] in ("sudo", "command", "env", "nohup", "time", "exec", "xargs", "nice", "timeout"):
            mit_xargs = mit_xargs or rest[0] == "xargs"
            if rest[0] == "timeout" and len(rest) > 1:
                rest = rest[1:]
            rest = rest[1:]
            while rest and rest[0].startswith("-"):
                rest = rest[1:]
        if not rest:
            continue
        roh_cmd = rest[0]
        if "$" in roh_cmd or "`" in roh_cmd:
            return ziele, opak, UNPRUEFBAR
        cmd = os.path.basename(win_pfad(roh_cmd)).lower()
        args = rest[1:]
        if cmd.endswith(".exe"):
            cmd = cmd[:-4]

        if cmd in ("claude", "claude-code") or any("@anthropic-ai/claude-code" in a for a in rest):
            verboten = "Neue Claude-Sitzungen über die Shell sind Helfer außerhalb des Teams und nicht erlaubt."
        elif cmd in ("eval", "source", ".") :
            verboten = UNPRUEFBAR
        elif cmd in SHELLS:
            inneres = None
            for j, a in enumerate(args):
                if a in ("-c", "/c", "/C", "-Command", "-command", "-EncodedCommand", "-e"):
                    inneres = " ".join(args[j + 1:])
                    break
                if re.fullmatch(r"-[a-z]*c", a):
                    inneres = " ".join(args[j + 1:])
                    break
            if inneres is not None:
                if "EncodedCommand" in " ".join(args):
                    verboten = UNPRUEFBAR
                else:
                    z2, o2, v2 = shell_analyse(inneres, cwd, rolle, projekt, plugin, tiefe + 1)
                    ziele += z2
                    opak = opak or o2
                    verboten = verboten or v2
            elif nach_pipe or not ohne_optionen(args):
                verboten = UNPRUEFBAR  # z. B. curl … | bash
            else:
                skript = absolut_aus(cwd or ".", ohne_optionen(args)[0])
                if not (plugin and innerhalb(skript, plugin)):
                    if rolle == "projektleiter" and projekt and innerhalb(skript, projekt):
                        verboten = "Der Projektleiter führt keine Skripte aus dem Projekt aus."
        elif cmd in INTERPRETER:
            code = None
            for j, a in enumerate(args):
                if a in ("-c", "-e", "--eval", "-p", "--print", "-r"):
                    code = " ".join(args[j + 1:])
                    break
                if re.fullmatch(r"-[ce].+", a):
                    code = a[2:] + " " + " ".join(args[j + 1:])
                    break
            if code is not None:
                if "claude" in code:
                    verboten = "Neue Claude-Sitzungen sind auch aus Skripten heraus nicht erlaubt."
                elif SCHREIB_INDIZIEN.search(code):
                    opak = True
            elif "-m" in args:
                modul = args[args.index("-m") + 1:]
                if modul[:1] == ["pip"] and "install" in modul:
                    pakete = [a for a in ohne_optionen(modul[1:]) if a != "install" and not a.startswith((".", "/"))
                              and not a.endswith((".txt", ".toml"))]
                    if pakete and not any(a in ("-r", "--requirement", "-e", "--editable") for a in modul):
                        verboten = ("Pakete werden nicht per Befehl installiert. Abhängigkeit in den Bauplan, "
                                    "dann requirements/pyproject ändern und Abhängigkeits-Schranke laufen lassen.")
            else:
                frei = ohne_optionen(args)
                if (nach_pipe or not args or (frei and frei[0] == "-")) and not any(
                        a in ("--version", "-V", "--help", "-h") for a in args):
                    opak = True  # liest Programm von der Eingabe
                elif frei and rolle == "projektleiter" and projekt:
                    skript = absolut_aus(cwd or ".", frei[0])
                    if innerhalb(skript, projekt) and not (plugin and innerhalb(skript, plugin)):
                        verboten = "Der Projektleiter führt keine Skripte aus dem Projekt aus."
        elif cmd in PAKET_AUSFUEHRER or (cmd in ("npm", "pnpm", "yarn") and args[:1] in (["exec"], ["dlx"])) \
                or (cmd == "pipx" and args[:1] == ["run"]):
            frei = ohne_optionen(args[1:] if cmd in ("npm", "pnpm", "yarn", "pipx") else args)
            if frei and not paket_bekannt(frei[0], cwd):
                verboten = ("'%s' würde ein Paket ausführen, das nicht in package.json steht. Erst über Bauplan "
                            "und Abhängigkeits-Schranke aufnehmen." % frei[0])
        elif cmd in ("npm", "pnpm", "yarn", "bun") and args and args[0] in ("install", "i", "add") \
                and ohne_optionen(args[1:]):
            verboten = ("Pakete werden nicht per Befehl hinzugefügt. Abhängigkeit in den Bauplan, dann "
                        "Manifest ändern und Abhängigkeits-Schranke laufen lassen.")
        elif cmd in ("pip", "pip3", "uv", "pipx") and "install" in args:
            pakete = [a for a in ohne_optionen(args) if a not in ("install", "pip")
                      and not a.startswith((".", "/", "~")) and not a.endswith((".txt", ".toml"))]
            if pakete and not any(a in ("-r", "--requirement", "-e", "--editable") for a in args):
                verboten = ("Pakete werden nicht per Befehl installiert. Abhängigkeit in den Bauplan, dann "
                            "requirements/pyproject ändern und Abhängigkeits-Schranke laufen lassen.")
        elif cmd in ("poetry", "uv", "pdm", "cargo", "dotnet") and args[:1] == ["add"]:
            verboten = "Pakete werden nicht per Befehl hinzugefügt (Bauplan + Abhängigkeits-Schranke)."
        elif mit_xargs and cmd in ("rm", "mv", "cp", "sed", "tee", "touch", "truncate", "unlink", "chmod"):
            opak = True
        elif cmd == "find" and any(a in ("-delete", "-exec", "-execdir", "-ok", "-fprint") for a in args):
            opak = True
        elif cmd in ("patch", "unzip", "7z", "ed", "ex") or (cmd == "tar" and any("x" in a.lstrip("-") for a in args[:1])) \
                or (cmd in ("awk", "gawk") and "inplace" in " ".join(args)):
            opak = True
        elif cmd == "tee":
            ziele += [(a, "schreiben") for a in ohne_optionen(args)]
        elif cmd in ("sed", "gsed", "perl") and any(a == "-i" or a.startswith("-i") or a == "--in-place" or
                                                     a.startswith("--in-place") or a == "-pi" for a in args):
            frei = ohne_optionen(args)
            kandidaten = frei if ("-e" in args and cmd == "sed") else frei[1:]
            ziele += [(a, "schreiben") for a in kandidaten]
        elif cmd in ("cp", "mv", "install", "ln", "rsync", "copy", "move", "copy-item", "move-item"):
            frei = ohne_optionen(args)
            ziel_dir = None
            for j, a in enumerate(args):
                if a in ("-t", "--target-directory") and j + 1 < len(args):
                    ziel_dir = args[j + 1]
                elif a.startswith("--target-directory="):
                    ziel_dir = a.split("=", 1)[1]
            if ziel_dir:
                ziele.append((ziel_dir.rstrip("/") + "/x", "schreiben"))
            elif frei:
                ziele.append((frei[-1], "schreiben"))
            if cmd in ("mv", "move", "move-item"):
                ziele += [(a, "loeschen") for a in (frei if ziel_dir else frei[:-1])]
        elif cmd in ("rm", "rmdir", "unlink", "del", "erase", "remove-item", "rd", "shred"):
            ziele += [(a, "loeschen") for a in ohne_optionen(args)]
        elif cmd in ("touch", "truncate", "new-item", "set-content", "add-content", "out-file", "mkfifo"):
            ziele += [(a, "schreiben") for a in ohne_optionen(args) if not re.fullmatch(r"\d+[kmgKMG]?", a)]
        elif cmd == "dd":
            ziele += [(a[3:], "schreiben") for a in args if a.startswith("of=")]
        elif cmd == "git" and git_ohne_globale(args):
            args = git_ohne_globale(args)
            v = pruefe_git(args, rolle, cwd, projekt)
            if v:
                verboten = v
            sub = args[0]
            if sub in ("checkout", "restore"):
                if "--" in args:
                    pfade = args[args.index("--") + 1:]
                elif sub == "restore":
                    pfade = ohne_optionen(args[1:])
                else:
                    frei = ohne_optionen(args[1:])
                    pfade = frei[1:] if len(frei) > 1 else [a for a in frei if os.path.exists(absolut_aus(cwd or ".", a))]
                ziele += [(a, "schreiben") for a in pfade]
            elif sub == "rm":
                ziele += [(a, "loeschen") for a in ohne_optionen(args[1:])]
            elif sub == "mv":
                frei = ohne_optionen(args[1:])
                if frei:
                    ziele.append((frei[-1], "schreiben"))
                    ziele += [(a, "loeschen") for a in frei[:-1]]
            elif sub in ("apply", "am", "cherry-pick", "revert") or \
                    (sub == "stash" and args[1:2] in (["pop"], ["apply"])):
                opak = True
        if verboten:
            return ziele, opak, verboten
    return ziele, opak, verboten


def git_ohne_globale(args):
    """Globale Git-Optionen vor dem Unterbefehl entfernen (-C <pfad>, -c <x=y>, --no-pager …)."""
    i = 0
    while i < len(args) and args[i].startswith("-"):
        i += 2 if args[i] in ("-C", "-c", "--git-dir", "--work-tree", "--namespace") else 1
    return args[i:]


GIT_LESEND = {"status", "log", "diff", "show", "blame", "rev-parse", "rev-list", "ls-files", "ls-tree",
              "cat-file", "describe", "grep", "shortlog", "merge-base", "name-rev", "for-each-ref", "config",
              "version", "help", "count-objects", "check-ignore", "var", "whatchanged", "reflog", "fetch"}


def pruefe_git(args, rolle, cwd, projekt):
    sub = args[0]
    rest = args[1:]
    agenten = (_KONTEXT.get("team") or {}).get("agenten") or {}
    nur_lesen = rolle in agenten and not agenten[rolle].get("schreibt")
    if nur_lesen and sub not in GIT_LESEND and not (sub == "worktree" and rest[:1] == ["list"]) \
            and not (sub == "branch" and not ohne_optionen(rest)) and not (sub == "stash" and rest[:1] == ["list"]):
        return ("Prüfer ('%s') verändern das Repository nicht (kein git %s). Nur lesende Git-Befehle "
                "wie status, log, diff, show, blame." % (rolle, sub))
    if sub == "config" and ohne_optionen(rest)[1:]:
        return "Git-Einstellungen ändert Claude nicht (git config mit Wert)."
    if sub in ("clean", "filter-branch", "filter-repo", "update-ref", "replace"):
        return "'git %s' kann Arbeit unwiederbringlich löschen oder Verlauf umschreiben und ist gesperrt." % sub
    if sub == "reset" and "--hard" in rest:
        im_worktree = bool(projekt and cwd and not os.path.normcase(os.path.abspath(repo_wurzel(cwd) or cwd))
                           == os.path.normcase(os.path.abspath(projekt)))
        if not (rolle == "entwickler" and im_worktree):
            return ("'git reset --hard' ist gesperrt (nicht committete Arbeit ginge verloren). Einen eigenen "
                    "Merge rückgängig machen: 'git reset --keep ORIG_HEAD'.")
    if sub == "branch" and any(a in ("-D", "--delete --force") or a == "-D" for a in rest):
        return "'git branch -D' ist gesperrt; gemergte Branches mit 'git branch -d' löschen."
    if sub == "push":
        if any(a in ("-f", "--force", "--force-with-lease", "--mirror", "--delete", "-d") or a.startswith("--force")
               or a.startswith("+") for a in rest):
            return "Erzwungenes Pushen oder Löschen auf dem Server ist gesperrt."
        if any(re.search(r"(^|:)(main|master)$", a) for a in ohne_optionen(rest)[1:]):
            return "Push auf main/master macht nur Simon."
    if sub == "checkout" and "-B" in rest:
        return None
    return None


def pruefe_shell(eingabe, team, projekt, plugin, rolle):
    ti = eingabe.get("tool_input") or {}
    befehl = ti.get("command") if isinstance(ti, dict) else None
    if not isinstance(befehl, str):
        blockieren("Shell-Befehl nicht lesbar.")
    if os.environ.get("DEV_TEAM_WARTUNG") != "1":
        pruefe_auf_schalter(befehl)
    cwd = eingabe.get("cwd") or projekt or os.getcwd()
    ziele, opak, verboten = shell_analyse(befehl, cwd, rolle, projekt, plugin)
    if verboten:
        blockieren(verboten)
    if opak and not plugin_skript(befehl, plugin):
        blockieren(UNPRUEFBAR)
    for ziel, art in ziele:
        ziel = ziel.strip("'\"")
        if not ziel or re.match(r"\$\{?(TMPDIR|TEMP|TMP)\b", ziel):
            continue
        if ("$" in ziel and not ziel.startswith("$HOME")) or "`" in ziel:
            blockieren("Schreibziel mit Variable oder Befehl (%s) kann nicht geprüft werden." % ziel)
        ziel = ziel.replace("$HOME", heimat())
        pruefe_ziel(absolut_aus(cwd, ziel), team, projekt, plugin, rolle, art=art, ueber_shell=True)


def plugin_skript(befehl, plugin):
    """Nur wenn der ERSTE Befehl ein Skript im Plugin-Ordner ist (bash/python <plugin>/scripts/…)."""
    if not plugin:
        return False
    try:
        teile = shlex.split(befehl)
    except ValueError:
        return False
    while teile and (teile[0] in ("bash", "sh", "python", "python3", "py") or teile[0].startswith("-")):
        teile = teile[1:]
    if not teile or any(t in (";", "&&", "||", "|") for t in shlex.split(befehl)) or re.search(r"[;&|`]|\$\(", befehl):
        return False
    return innerhalb(os.path.abspath(win_pfad(teile[0])), plugin)


# --------------------------------------------------------------------------- Skills

def skill_datei(name):
    """Sucht die SKILL.md zu einem Skill-Namen (plugin:skill oder skill)."""
    plugin_name, _, kurz = name.rpartition(":")
    kandidaten = []
    projekt = _KONTEXT["projekt"]
    if not plugin_name:
        if projekt:
            kandidaten.append(os.path.join(projekt, ".claude", "skills", kurz, "SKILL.md"))
        kandidaten.append(os.path.join(heimat(), ".claude", "skills", kurz, "SKILL.md"))
    wurzeln = [os.path.join(heimat(), ".claude", "plugins")]
    for w in wurzeln:
        for ordner, unter, dateien in os.walk(w):
            tiefe = ordner[len(w):].count(os.sep)
            if tiefe > 7:
                unter[:] = []
                continue
            if os.path.basename(ordner) == kurz and "SKILL.md" in dateien and \
                    (not plugin_name or ("%s%s" % (os.sep, plugin_name)) in ordner):
                kandidaten.append(os.path.join(ordner, "SKILL.md"))
    for k in kandidaten:
        if os.path.isfile(k):
            return k
    return None


def pruefe_skill(eingabe, rolle):
    """Skills, die einen eigenen Agenten starten (context: fork), wären Helfer außerhalb des Teams."""
    ti = eingabe.get("tool_input") or {}
    name = str((ti.get("skill") or ti.get("name") or "") if isinstance(ti, dict) else "").strip().lstrip("/")
    if not name:
        blockieren("Skill-Aufruf ohne lesbaren Namen.")
    if name.startswith("dev-team:"):
        return
    datei = skill_datei(name)
    if not datei:
        return  # eingebauter Skill ohne Datei – startet keinen eigenen Agenten
    try:
        with open(datei, encoding="utf-8", errors="replace") as f:
            kopf = f.read(4000)
    except OSError:
        return
    m = re.match(r"^---\s*\n(.*?)\n---", kopf, re.S)
    if m and re.search(r"^\s*context\s*:\s*['\"]?fork", m.group(1), re.M | re.I):
        blockieren("Der Skill '%s' startet einen eigenen Agenten (context: fork). Das wäre ein Helfer außerhalb "
                   "des festen Teams. Die Aufgabe einem Agenten aus team.json geben." % name)
    if rolle != "projektleiter" and m and re.search(r"^\s*agent\s*:", m.group(1), re.M | re.I):
        blockieren("Agenten des Teams rufen keine Skills auf, die eigene Agenten festlegen ('%s')." % name)


# --------------------------------------------------------------------------- Lesen (Entwickler)

def eigenes_revier(eingabe, projekt):
    cwd = eingabe.get("cwd") or projekt
    w = repo_wurzel(cwd) if cwd else None
    return w or projekt


def ausserhalb_revier(absolut, revier, plugin):
    if innerhalb(absolut, revier) or (plugin and innerhalb(absolut, plugin)):
        return False
    return innerhalb(absolut, heimat()) or innerhalb(absolut, _KONTEXT["projekt"] or revier) or \
        innerhalb(absolut, tempfile.gettempdir())


def pruefe_lesen(eingabe, team, projekt, plugin, rolle, werkzeug):
    if rolle not in team.get("verdeckt_lesen_verboten_fuer", []):
        return
    ti = eingabe.get("tool_input") or {}
    if not isinstance(ti, dict):
        blockieren("Werkzeugaufruf mit unlesbaren Angaben.")
    revier = eigenes_revier(eingabe, projekt)
    marken = ("verdeckt", ".dev-team", ".verd")
    sperre = "Der Entwickler arbeitet und liest nur in seinem eigenen Worktree. Verdeckte Tests und der Hauptordner sind gesperrt."
    punkt_platzhalter = re.compile(r"(^|[/\\\s'\"])\.[^/\\\s]*[*?\[]")
    if werkzeug in SHELL_WERKZEUGE:
        text = str(ti.get("command") or "")
        tief = norm(text)
        if any(m in tief.lower() for m in marken) or "CLAUDE_PROJECT_DIR" in text or "../.." in tief \
                or re.search(r"\bcd\s+(\.\.|/|~|\$HOME|[A-Za-z]:)", tief) or punkt_platzhalter.search(tief) \
                or re.search(r"\bpushd\b", tief):
            blockieren(sperre)
        p = norm(projekt).rstrip("/")
        r = norm(revier).rstrip("/")
        for m in re.finditer(re.escape(p), tief):
            if not tief[m.start():].startswith(r) and r != p:
                blockieren(sperre)
        for pfad in re.findall(r"(?:^|\s)(/[^\s'\";|&]+|~[^\s'\";|&]*|[A-Za-z]:[\\/][^\s'\";|&]+)", text):
            absolut = absolut_aus(revier, pfad)
            if ausserhalb_revier(absolut, revier, plugin) and not innerhalb(absolut, os.path.join(heimat(), ".cache")):
                blockieren(sperre)
        return
    texte = [str(ti.get(k) or "") for k in ("file_path", "path", "pattern", "notebook_path", "glob")]
    if any(m in norm(t).lower() for t in texte for m in marken) or any(punkt_platzhalter.search(norm(t)) for t in texte[1:]):
        blockieren(sperre)
    cwd = eingabe.get("cwd") or revier
    for k in ("file_path", "path", "notebook_path"):
        wert = ti.get(k)
        if isinstance(wert, str) and wert:
            if ausserhalb_revier(absolut_aus(cwd, wert), revier, plugin):
                blockieren(sperre)
    muster = ti.get("pattern")
    if werkzeug == "Glob" and isinstance(muster, str) and (os.path.isabs(win_pfad(muster)) or muster.startswith("~")
                                                           or muster.startswith("..")):
        if ausserhalb_revier(absolut_aus(cwd, muster.split("*")[0] or "/"), revier, plugin):
            blockieren(sperre)


# --------------------------------------------------------------------------- Start

def lauf(roh, plugin):
    projekt_env = os.environ.get("CLAUDE_PROJECT_DIR") or ""
    try:
        eingabe = json.loads(roh) if roh.strip() else {}
    except ValueError:
        eingabe = None

    projekt = None
    for kandidat in (projekt_env, (eingabe or {}).get("cwd") if isinstance(eingabe, dict) else None):
        if isinstance(kandidat, str) and kandidat and ist_dev_team_projekt(kandidat):
            projekt = os.path.abspath(kandidat)
            break
    _KONTEXT["projekt"] = projekt

    if not isinstance(eingabe, dict):
        if projekt:
            blockieren("Hook-Eingabe nicht lesbar – im Zweifel blockiert.")
        return

    try:
        with open(os.path.join(plugin, "team.json"), encoding="utf-8") as f:
            team = json.load(f)
    except (OSError, ValueError):
        if projekt:
            blockieren("team.json im Plugin-Ordner fehlt oder ist ungültig – im Zweifel blockiert.")
        return

    _KONTEXT["team"] = team
    werkzeug = str(eingabe.get("tool_name") or "")
    rolle = rolle_aus(eingabe.get("agent_type"), team, projekt)
    _KONTEXT["rolle"] = rolle or str(eingabe.get("agent_type"))

    if werkzeug in AGENT_WERKZEUGE:
        if projekt:
            pruefe_agent_start(eingabe, team, projekt)
        return

    if projekt and rolle is None:
        blockieren("Unbekannter Agent '%s' arbeitet in einem Dev-Team-Projekt. Nur das feste Team darf "
                   "hier arbeiten." % eingabe.get("agent_type"))
    rolle = rolle or "projektleiter"

    if werkzeug == "Skill" and projekt:
        pruefe_skill(eingabe, rolle)
    elif werkzeug in SCHREIB_WERKZEUGE:
        pruefe_schreiben(eingabe, team, projekt, plugin, rolle)
    elif werkzeug in SHELL_WERKZEUGE and projekt:
        pruefe_shell(eingabe, team, projekt, plugin, rolle)
        pruefe_lesen(eingabe, team, projekt, plugin, rolle, werkzeug)
    elif werkzeug in LESE_WERKZEUGE and projekt:
        pruefe_lesen(eingabe, team, projekt, plugin, rolle, werkzeug)


def main():
    utf8_einrichten()
    plugin = sys.argv[1] if len(sys.argv) > 1 else os.environ.get("CLAUDE_PLUGIN_ROOT", "")
    plugin = os.path.abspath(plugin) if plugin else ""
    try:
        roh = sys.stdin.read()
        lauf(roh, plugin)
    except Blockiert:
        sys.exit(BLOCK)
    except Exception as fehler:  # interner Fehler: im Projekt sicher blockieren
        if _KONTEXT["projekt"] or ist_dev_team_projekt(os.environ.get("CLAUDE_PROJECT_DIR", "")):
            try:
                sys.stderr.write("⛔ Dev-Team-Wächter: interner Fehler (%s) – im Zweifel blockiert.\n"
                                 % type(fehler).__name__)
            except Exception:
                pass
            sys.exit(BLOCK)
        sys.exit(0)
    sys.exit(0)


if __name__ == "__main__":
    main()
