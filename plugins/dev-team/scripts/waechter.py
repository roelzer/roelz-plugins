#!/usr/bin/env python3
"""Wächter des Dev-Teams (PreToolUse-Hook), Version 3.4.

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

5. Unbekannte Werkzeuge: In Dev-Team-Projekten ist nur erlaubt, was der Wächter
   kennt (harmlose Werkzeuge aus team.json, geprüfte Werkzeuge). Workflow ist gesperrt,
   Monitor wird wie die Shell geprüft.
6. Der Projektleiter darf in der Shell nur Befehle einer Erlaubnisliste ausführen.

Ehrliche Grenze: Shell-Befehle der bauenden Agenten werden nach Mustern geprüft. Das
erschwert Umgehungen stark, kann sie aber nicht vollständig verhindern.
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
SHELL_WERKZEUGE = {"Bash", "PowerShell", "Monitor"}
IMMER_GESPERRT = {"Workflow"}
# Bauende Rollen müssen beliebigen Code ausführen (Tests, eigene Hilfsskripte). Für sie wird nicht prüfbarer
# Code nicht blockiert: Muster helfen dort kaum, die Sicherung liegt in Schranke, Prüfsummen und Review.
BAUENDE_ROLLEN = {"entwickler", "tester", "architekt"}
HARMLOS_STANDARD = {
    "TodoWrite", "TodoRead", "TaskCreate", "TaskUpdate", "TaskList", "TaskGet", "TaskStop", "TaskOutput",
    "AskUserQuestion", "SendUserMessage", "SendUserFile", "ToolSearch", "EnterPlanMode", "ExitPlanMode",
    "WebSearch", "WebFetch", "BashOutput", "KillShell", "KillBash", "ListMcpResourcesTool",
    "ReadMcpResourceTool", "SendMessage", "ListAgents", "PushNotification", "ReportFindings",
    "ReadNotifications", "ListPlugins", "ListSkills", "SearchSkills", "ListConnectors", "SearchMcpRegistry",
    "CronList", "TaskGet", "ReadMcpResourceDirTool", "EnterWorktree", "ExitWorktree",
}
MCP_LESEND = re.compile(r"(^|_)(get|list|search|read|fetch|find|query|view|describe|show|lookup|current|recent|"
                        r"approximate|conversation|count|check|status|preview|inspect|browse|resolve)(_|$|[A-Z])")
MCP_SCHREIBEND = re.compile(r"(write|create|update|delete|remove|push|merge|publish|send|post|upload|edit|set|"
                            r"replace|append|move|commit|deploy|run|exec|fire|trigger|install)", re.I)
MCP_AUSFUEHREND = re.compile(r"(exec|execute|run_?code|run_?command|bash|shell|terminal|powershell|"
                             r"write_?file|edit_?file|create_?file|delete_?file|move_?file|notebook|computer)",
                             re.IGNORECASE)

SCHUTZSCHALTER = [
    r"DEV_TEAM_WARTUNG", r"disableAllHooks", r"bypassPermissions", r"dangerously-skip-permissions",
    r"allowManagedHooksOnly", r"\"defaultMode\"", r"CLAUDE_CODE_MAX_SUBAGENT_SPAWN_DEPTH",
    r"CLAUDE_CODE_DISABLE_EXPLORE_PLAN_AGENTS", r"CLAUDE_CODE_FORK_SUBAGENT",
    r"dev-team@roelz-plugins\"?\s*:\s*false", r"CLAUDE_CODE_DISABLE_WORKFLOWS", r"disableWorkflows",
    r"CLAUDE_CODE_PRINT_BG_WAIT_CEILING_MS",
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


_KONTEXT = {"projekt": None, "rolle": None, "team": {}, "cwd": None}


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


def git_out(cwd, *args):
    code, aus = git(cwd, *args)
    return aus if code == 0 else ""


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
    modell = str(ti.get("model") or "").strip().lower()
    erlaubt_m = team["agenten"][kurz].get("modelle") or []
    if modell and modell not in erlaubt_m:
        blockieren("Modell '%s' ist für '%s' nicht erlaubt (erlaubt: %s; Standard: %s). Ohne model-Angabe "
                   "oder mit einem erlaubten Modell erneut aufrufen." % (
                       modell, kurz, ", ".join(erlaubt_m) or "nur der Standard", team["agenten"][kurz].get("modell")), kurz)
    if ti.get("name") or ti.get("team_name"):
        blockieren("Teammates/Agenten-Teams sind im Dev-Team nicht erlaubt. Ohne name-Angabe aufrufen.", kurz)
    iso = ti.get("isolation")
    if iso and kurz == "entwickler" and str(iso) != "worktree":
        blockieren("Der Entwickler arbeitet immer in einem eigenen Worktree; isolation darf nicht "
                   "überschrieben werden.", kurz)
    modell_text = modell or team["agenten"][kurz].get("modell") or ""
    log_zeile(projekt, "▶", kurz, (ti.get("description") or "") + (" [%s]" % modell_text if modell_text else ""))


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
    "nachweis": "Nachweise (Agenten-Log, Prüfberichte, Testnachweis, Prüfsummen, Schranken-Nachweise)",
    "startskript": "das Startskript .claude/dev-team-start.sh (anlegen beim Einrichten, danach nur Simon)",
    "teamkonfig": "die Dev-Team-Einstellungen .claude/dev-team.json (ändern nur über scripts/geschuetzt_schreiben.py mit Simons Freigabe)",
    "testkonfig": "Testkonfiguration (bestehende ändert nur der Tester)",
    "konfig": "Projekteinstellungen (.claude/settings*.json)",
    "architektur": "Architekturregeln (nur der Architekt)",
    "abnahme": "Abnahmetests (nur der Tester)",
    "referenz": "Referenzfälle (nur Simon, neue über scripts/geschuetzt_schreiben.py mit seiner Freigabe)",
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
        if rel_heim == "CLAUDE.md":
            blockieren("~/.claude/CLAUDE.md (Grundgesetz-Verknüpfung, Baukasten-Pfad) wird nur über "
                       "scripts/claude_md_block.py nach Simons OK geschrieben%s." % weg)
        if not rel_heim.startswith("dev-team/"):
            blockieren("In ~/.claude schreibt Claude nur in dev-team/%s." % weg)

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
            blockieren("Außerhalb des Projekts schreibt der Projektleiter nur "
                       "~/.claude/dev-team/ und das Baukasten-Repo (nicht %s)%s. Für ein anderes Projekt "
                       "eine eigene Sitzung dort starten." % (np, weg))
        blockieren("Agent '%s' darf nur im Projekt bzw. seinem Worktree schreiben, nicht in %s%s."
                   % (rolle, np, weg))

    if rolle == "entwickler":
        revier = repo_wurzel(_KONTEXT.get("cwd") or "") or projekt
        if not innerhalb(absolut, revier):
            blockieren("Der Entwickler schreibt nur in seinem eigenen Worktree (%s), nicht in %s%s."
                       % (norm(revier), np, weg))
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
    if bereich == "teamkonfig" and rolle == "projektleiter" and art != "loeschen" and \
            git(basis, "ls-files", "--error-unmatch", "--", rel)[0] != 0:
        return  # noch nicht versioniert: beim Einrichten darf der Projektleiter sie ausfüllen
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
    r"__import__|base64|compile\s*\(|os\.open|io\.open|codecs\.open|pathlib|Path\s*\(|copyFile|cpSync|renameSync|"
    r"fs\.promises|Deno\.write|IO\.File|System\.IO|truncate\s*\(|os\.makedirs|mkdirSync|symlink|chmod|"
    r"importlib|ctypes|socket|urllib|requests\.|fetch\s*\(", re.IGNORECASE)
PL_ERLAUBT = {"git", "ls", "dir", "cat", "type", "head", "tail", "wc", "grep", "rg", "egrep", "fgrep", "find",
              "diff", "cmp", "echo", "printf", "mkdir", "pwd", "cd", "pushd", "popd", "test", "[", "true",
              "false", "which", "where", "sort", "uniq", "cut", "tr", "date", "stat", "file", "tree", "basename",
              "dirname", "realpath", "readlink", "jq", "cp", "mv", "rm", "rmdir", "touch", "tee", "du", "df",
              "column", "nl", "seq", "od", "md5sum", "sha256sum", "sha1sum", "get-content", "get-childitem",
              "select-string", "test-path", "get-location", "set-location", "write-output", "write-host"}
AUSGABE_PROGRAMME = {"curl", "wget", "sort", "gcc", "g++", "cc", "clang", "go", "pandoc", "openssl", "aria2c",
                     "http", "xh", "gpg", "zip", "convert", "magick", "ffmpeg"}
EDITOREN = {"vim", "vi", "nvim", "emacs", "nano", "pico", "micro", "ed", "ex", "joe", "code", "notepad"}
SHELLS = {"bash", "sh", "zsh", "dash", "ksh", "fish", "pwsh", "powershell", "cmd", "busybox"}
INTERPRETER = {"python", "python3", "py", "node", "deno", "bun", "ruby", "perl", "php", "tclsh", "lua", "Rscript"}
PAKET_AUSFUEHRER = {"npx", "bunx", "uvx", "pnpx"}
UNPRUEFBAR = ("Dieser Befehl ist für den Wächter nicht prüfbar (Befehl in einer Hülle wie bash -c/eval, aus einer "
              "Variable, per Pipe an einen Interpreter oder ein Skript-Einzeiler mit Datei- oder Prozesszugriff). "
              "Dateien mit Write/Edit schreiben, Befehle direkt ausführen.")


def ohne_heredocs(befehl):
    """Entfernt Heredoc-Inhalte – nur echte Heredocs (<< außerhalb von Anführungszeichen), damit ein
    getarntes "echo '<<X'" keine nachfolgenden Befehle vor dem Wächter versteckt."""
    aus, i, n = [], 0, len(befehl)
    quote = None
    while i < n:
        c = befehl[i]
        if quote:
            if c == "\\" and quote == '"' and i + 1 < n:
                aus.append(befehl[i:i + 2]); i += 2; continue
            if c == quote:
                quote = None
            aus.append(c); i += 1; continue
        if c == "\\" and i + 1 < n:
            aus.append(befehl[i:i + 2]); i += 2; continue
        if c in ("'", '"'):
            quote = c; aus.append(c); i += 1; continue
        if c == "#" and (i == 0 or befehl[i - 1] in " \t\n;&|("):
            ende = befehl.find("\n", i)
            ende = n if ende < 0 else ende
            aus.append(befehl[i:ende]); i = ende; continue
        m = re.match(r"<<(-?)\s*(['\"]?)([A-Za-z_][A-Za-z0-9_]*)\2", befehl[i:]) if befehl.startswith("<<", i) \
            and not befehl.startswith("<<<", i) else None
        if m:
            zeilenende = befehl.find("\n", i)
            if zeilenende < 0:
                aus.append(befehl[i:]); break
            kopf_rest = befehl[i + m.end():zeilenende]
            body_start = zeilenende + 1
            ende_marke, pos = None, body_start
            while pos <= n:
                z_ende = befehl.find("\n", pos)
                z_ende = n if z_ende < 0 else z_ende
                zeile = befehl[pos:z_ende]
                if (zeile.lstrip("\t") if m.group(1) else zeile) == m.group(3):
                    ende_marke = z_ende
                    break
                if z_ende >= n:
                    break
                pos = z_ende + 1
            if ende_marke is None:
                return befehl + "\n<<UNVOLLSTAENDIG"  # Heredoc ohne Ende: nicht sicher prüfbar
            aus.append("<<HEREDOC" + kopf_rest + "\n")
            i = ende_marke
            continue
        aus.append(c); i += 1
    return "".join(aus)


def zeilen_als_trenner(text):
    """Zeilenumbrüche außerhalb von Anführungszeichen trennen Befehle (wie ';')."""
    aus, quote, i = [], None, 0
    while i < len(text):
        c = text[i]
        if quote:
            if c == "\\" and quote == '"' and i + 1 < len(text):
                aus.append(text[i:i + 2]); i += 2; continue
            if c == quote:
                quote = None
        elif c == "\\" and i + 1 < len(text):
            if text[i + 1] == "\n":
                i += 2; continue  # Zeilenfortsetzung
            aus.append(text[i:i + 2]); i += 2; continue
        elif c in ("'", '"'):
            quote = c
        elif c == "\n":
            aus.append(" ; "); i += 1; continue
        aus.append(c); i += 1
    return "".join(aus)


def segmente(befehl):
    text = zeilen_als_trenner(ohne_heredocs(befehl))
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


def substitutionen(befehl):
    """Inhalte von $( … ), ` … `, <( … ) und >( … ) – auch innerhalb doppelter Anführungszeichen,
    denn die Shell führt sie dort ebenfalls aus. Arithmetik $(( … )) wird übersprungen."""
    funde, i, n, quote = [], 0, len(befehl), None
    while i < n:
        c = befehl[i]
        if quote == "'":
            if c == "'":
                quote = None
            i += 1
            continue
        if c == "\\":
            i += 2
            continue
        if c == "'" and quote is None:
            quote = "'"
            i += 1
            continue
        if c == '"':
            quote = None if quote == '"' else '"'
            i += 1
            continue
        if c in "$<>" and befehl.startswith("(", i + 1) and not (c == "$" and befehl.startswith("((", i + 1)):
            tiefe, j, q = 1, i + 2, None
            while j < n and tiefe:
                d = befehl[j]
                hd = re.match(r"<<-?\s*(['\"]?)([A-Za-z_][A-Za-z0-9_]*)\1[^\n]*\n", befehl[j:]) if not q else None
                if hd:
                    ende = re.search(r"\n[\t ]*%s[\t ]*(?=\n|\)|$)" % re.escape(hd.group(2)), befehl[j + hd.end() - 1:])
                    j = (j + hd.end() - 1 + ende.end()) if ende else n
                    continue
                if q:
                    if d == q:
                        q = None
                elif d in ("'", '"'):
                    q = d
                elif d == "\\":
                    j += 1
                elif d == "(":
                    tiefe += 1
                elif d == ")":
                    tiefe -= 1
                j += 1
            funde.append(befehl[i + 2:j - 1] if not tiefe else befehl[i + 2:])
            i = j
            continue
        if c == "`":
            j = befehl.find("`", i + 1)
            funde.append(befehl[i + 1:j] if j > 0 else befehl[i + 1:])
            i = (j + 1) if j > 0 else n
            continue
        i += 1
    return funde


def konfig_befehle(projekt):
    """Token-Listen der Befehle aus .claude/dev-team.json (Setup, Test, Zusatz, Sicherheit)."""
    try:
        with open(os.path.join(projekt, ".claude", "dev-team.json"), encoding="utf-8") as f:
            k = json.load(f)
    except (OSError, ValueError):
        return []
    befehle = [k.get("setup"), k.get("testbefehl"), k.get("sicherheitsbefehl"), k.get("startbefehl")]
    befehle += list(k.get("zusatzbefehle") or [])
    listen = []
    for b in befehle:
        if not isinstance(b, str) or not b.strip():
            continue
        for seg, _ in segmente(b):
            listen.append(seg)
    return listen


def pl_erlaubt(cmd, rest, cwd, projekt, plugin):
    if cmd in PL_ERLAUBT:
        return True
    for liste in konfig_befehle(projekt):
        if liste and rest[:len(liste)] == liste:
            return True
    if cmd in SHELLS and any(a in ("-c", "/c", "/C") or re.fullmatch(r"-[a-z]*c", a) for a in rest[1:]):
        return True  # Inhalt wird mit denselben Regeln geprüft (rekursiv)
    if cmd in INTERPRETER | SHELLS:
        frei = [a for a in rest[1:] if not a.startswith("-")]
        if any(a in ("--version", "-V") for a in rest[1:]) and len(rest) == 2:
            return True
        return bool(frei) and bool(plugin) and innerhalb(absolut_aus(cwd or ".", frei[0]), plugin)
    if plugin and innerhalb(absolut_aus(cwd or ".", rest[0]), plugin):
        return True
    for liste in konfig_befehle(projekt):
        if liste and rest[:len(liste)] == liste:
            return True
    return False


def variablen_einsetzen(token, variablen):
    """$NAME/${NAME} durch Werte ersetzen, die im selben Befehl fest zugewiesen wurden (S=/tmp/x; cp a $S/b)."""
    if "$" not in token or not variablen:
        return token
    return re.sub(r"\$\{?([A-Za-z_][A-Za-z0-9_]*)\}?",
                  lambda m: variablen.get(m.group(1), m.group(0)), token)


def shell_analyse(befehl, cwd=None, rolle="projektleiter", projekt=None, plugin="", tiefe=0):
    """-> (ziele: Liste (pfad, art)), opak: bool, verbotenes: str|None"""
    ziele, opak, verboten = [], False, None
    if tiefe > 3:
        return ziele, True, None
    for inneres in substitutionen(befehl):
        z2, o2, v2 = shell_analyse(inneres, cwd, rolle, projekt, plugin, tiefe + 1)
        ziele += z2
        opak = opak or o2
        if v2:
            return ziele, opak, v2
    # Heredoc oder Pipe direkt in einen Interpreter / eine Shell
    if re.search(r"(?:^|[\s;&|(])(?:\S*/)?(?:%s)(?:\.exe)?(?=\s)[^\n|;&]*<<" % "|".join(
            sorted(map(re.escape, SHELLS | INTERPRETER))), befehl, re.M):
        opak = True
    variablen = {}
    cwd_start = cwd
    for seg, nach_pipe in segmente(befehl):
        seg = [variablen_einsetzen(t, variablen) for t in seg]
        if seg and all(re.fullmatch(r"[A-Za-z_][A-Za-z0-9_]*=.*", t) for t in seg):
            for t in seg:
                name, _, wert = t.partition("=")
                if "$" not in wert and "`" not in wert:
                    variablen[name] = wert
            continue
        vorher_ziele = len(ziele)
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
            if t in ("<>",) and i + 1 < len(seg):
                ziele.append((seg[i + 1], "schreiben"))
                i += 2
                continue
            if t in ("<", "<<", "<<<"):
                i += 2
                continue
            rest.append(t)
            i += 1
        mit_xargs = False
        while rest and rest[0] in ("do", "then", "else", "elif", "if", "while", "until", "!", "{", "}", "time"):
            rest = rest[1:]
        if not rest or rest[0] in ("for", "case", "select", "function", "done", "fi", "esac", "in") or \
                re.fullmatch(r"[A-Za-z_][A-Za-z0-9_]*\(\)", rest[0]):
            continue
        while rest and re.fullmatch(r"[A-Za-z_][A-Za-z0-9_]*=.*", rest[0]):
            rest = rest[1:]
        while rest and rest[0] in ("sudo", "command", "env", "nohup", "time", "exec", "xargs", "nice", "timeout",
                                   "setsid", "stdbuf", "unbuffer", "doas", "runuser", "ionice", "chrt", "caffeinate"):
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

        if rolle == "projektleiter" and projekt and not pl_erlaubt(cmd, rest, cwd, projekt, plugin):
            return ziele, opak, (
                "'%s' steht nicht auf der Erlaubnisliste des Projektleiters. Er nutzt in der Shell nur Git, "
                "Lese- und Dateibefehle, die Plugin-Skripte und die Befehle aus .claude/dev-team.json "
                "(Setup, Tests, Zusatz-, Sicherheitsbefehl). Alles andere erledigt ein Agent des Teams." % cmd)
        if cmd in ("script",) and "-c" in args:
            return ziele, opak, UNPRUEFBAR
        if cmd in EDITOREN:
            opak = True
        if cmd in AUSGABE_PROGRAMME:
            for j, a in enumerate(args):
                if a in ("-o", "-O", "--output", "--output-document", "--out", "--outfile") and j + 1 < len(args):
                    if not (cmd == "wget" and a == "-O" and args[j + 1] == "-"):
                        ziele.append((args[j + 1], "schreiben"))
                elif re.match(r"--(output|output-document|out|outfile)=", a):
                    ziele.append((a.split("=", 1)[1], "schreiben"))
                elif re.fullmatch(r"-o.+", a) and cmd not in ("sort",) or (cmd == "sort" and re.fullmatch(r"-o.+", a)):
                    ziele.append((a[2:], "schreiben"))
            if cmd == "wget" and not any(a in ("-O", "--output-document") or a.startswith("--output-document=")
                                         for a in args) and ohne_optionen(args):
                ziele.append((os.path.basename(ohne_optionen(args)[-1].split("?")[0]) or "index.html", "schreiben"))
            if cmd == "curl" and any(a in ("-O", "--remote-name", "-J") for a in args):
                opak = True

        aussen = aussenwirkung(cmd, args)
        if aussen:
            return ziele, opak, aussen
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
        elif cmd == "uv" and (args[:1] == ["run"] and any(a == "--with" or a.startswith("--with=") or
                                                             a == "--with-requirements" for a in args)
                              or args[:2] == ["tool", "install"] or args[:2] == ["tool", "run"]):
            verboten = "Zusätzliche Pakete nur über Manifest + Abhängigkeits-Schranke (kein uv run --with / uv tool)."
        elif cmd == "uvx" and any(a == "--from" or a.startswith("--from=") or a == "--with" for a in args):
            verboten = "uvx mit --from/--with lädt fremde Pakete und ist gesperrt."
        elif cmd in ("pip", "pip3", "uv", "pipx") and "install" in args:
            pakete = [a for a in ohne_optionen(args) if a not in ("install", "pip")
                      and not (a in (".", "./") or (a.startswith((".", "/", "~")) and os.path.isdir(
                          absolut_aus(cwd or ".", a)))) and not a.endswith((".txt", ".toml"))]
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
        elif cmd == "git" and git_global_verboten(args, rolle):
            verboten = git_global_verboten(args, rolle)
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
        if cwd and len(ziele) > vorher_ziele and cwd != cwd_start:
            ziele[vorher_ziele:] = [(z if ("$" in z or "`" in z or z.startswith("~") or os.path.isabs(win_pfad(z)))
                                     else os.path.join(cwd, z), art) for z, art in ziele[vorher_ziele:]]
        if cmd in ("cd", "pushd") and cwd:
            ziel_cd = ohne_optionen(args)[:1]
            if ziel_cd and "$" not in ziel_cd[0] and "`" not in ziel_cd[0]:
                cwd = absolut_aus(cwd, ziel_cd[0])
        if verboten:
            return ziele, opak, verboten
    return ziele, opak, verboten


def worktree_gemergt(pfad, cwd):
    kopf = git_out(pfad, "rev-parse", "HEAD")
    if not kopf:
        return False
    offen = git_out(pfad, "status", "--porcelain", "--untracked-files=no")
    if offen:
        return False
    r = subprocess.run(["git", "merge-base", "--is-ancestor", kopf, "HEAD"], cwd=cwd, capture_output=True)
    return r.returncode == 0


def aussenwirkung(cmd, args):
    """Veröffentlichen, Hochladen, Senden: unumkehrbar und ohne Simons Freigabe verboten."""
    if cmd in ("npm", "pnpm", "yarn", "bun") and args[:1] in (["publish"], ["unpublish"], ["deprecate"], ["dist-tag"]):
        return "'%s %s' veröffentlicht – nur Simon." % (cmd, args[0])
    if (cmd == "twine" and args[:1] == ["upload"]) or (cmd in ("poetry", "uv", "pdm", "hatch", "flit", "cargo")
                                                         and args[:1] == ["publish"]):
        return "Veröffentlichen von Paketen macht nur Simon."
    if cmd == "dotnet" and args[:2] == ["nuget", "push"]:
        return "Veröffentlichen von Paketen macht nur Simon."
    if cmd in ("gh", "glab", "hub", "vercel", "netlify", "firebase", "fly", "flyctl", "heroku", "wrangler",
               "aws", "az", "gcloud", "gsutil", "docker", "kubectl", "terraform", "ssh", "scp", "sftp", "ftp",
               "nc", "ncat", "netcat", "telnet", "rclone", "s3cmd"):
        if not (args[:1] in (["--version"], ["version"], ["--help"]) or (cmd == "docker" and args[:1] in (
                ["ps"], ["images"], ["build"], ["compose"]) and "push" not in args)):
            return ("'%s' wirkt nach außen (Server, Cloud, fremde Rechner) und ist im Dev-Team ohne Simons "
                    "Freigabe gesperrt." % cmd)
    if cmd in ("curl", "wget", "http", "xh", "httpie"):
        for j, a in enumerate(args):
            nxt = args[j + 1].upper() if j + 1 < len(args) else ""
            if a in ("-d", "--data", "--data-raw", "--data-binary", "--data-urlencode", "-F", "--form", "-T",
                     "--upload-file", "--json", "--post-data", "--post-file", "--body-data", "--body-file") or \
                    a.startswith(("--data", "--form", "--json", "--post-", "--upload-file", "-d", "-F")) and len(a) > 2 \
                    and not a.startswith("--dump") or \
                    (a in ("-X", "--request", "--method") and nxt in ("POST", "PUT", "PATCH", "DELETE")) or \
                    re.match(r"--(request|method)=(POST|PUT|PATCH|DELETE)", a, re.I) or re.fullmatch(r"-X(POST|PUT|PATCH|DELETE)", a):
                return "Daten senden oder hochladen ('%s %s') ist im Dev-Team ohne Simons Freigabe gesperrt." % (cmd, a)
    if cmd == "rsync" and any(re.match(r"^[^/]*[^\\/]:", a) for a in args if not a.startswith("-")):
        return "Übertragen auf fremde Rechner (rsync host:…) ist gesperrt."
    return None


def git_global_verboten(args, rolle):
    """git -c alias.x='!…', core.hooksPath, core.pager … führen beliebige Befehle aus. Der Entwickler
    darf mit -C/--git-dir/--work-tree nicht auf andere Repositories (z. B. den Hauptordner) wirken."""
    i = 0
    while i < len(args) and args[i].startswith("-"):
        a = args[i]
        wert = args[i + 1] if i + 1 < len(args) else ""
        if a == "-c" or a.startswith("--config-env"):
            schluessel = wert.split("=", 1)[0].lower()
            if re.match(r"(alias\.|core\.|diff\.|merge\.|filter\.|credential|sequence\.|gpg\.|ssh\.|"
                        r"uploadpack|receivepack|protocol|url\.|http\.|include)", schluessel) or \
                    schluessel.endswith((".command", ".cmd", ".program", ".tool", ".helper", ".textconv")):
                return "git -c %s kann Befehle ausführen oder Ziele umlenken und ist gesperrt." % schluessel
        if rolle == "entwickler" and (a in ("-C", "--git-dir", "--work-tree") or
                                      a.startswith(("--git-dir=", "--work-tree="))):
            return ("Der Entwickler arbeitet nur in seinem eigenen Worktree (kein git %s). Befehle direkt im "
                    "Worktree ausführen." % a.split("=")[0])
        i += 2 if a in ("-C", "-c", "--git-dir", "--work-tree", "--namespace") else 1
    return None


def git_ohne_globale(args):
    """Globale Git-Optionen vor dem Unterbefehl entfernen (-C <pfad>, -c <x=y>, --no-pager …)."""
    i = 0
    while i < len(args) and args[i].startswith("-"):
        i += 2 if args[i] in ("-C", "-c", "--git-dir", "--work-tree", "--namespace") else 1
    return args[i:]


GIT_LESEND = {"status", "log", "diff", "show", "blame", "rev-parse", "rev-list", "ls-files", "ls-tree",
              "cat-file", "describe", "grep", "shortlog", "merge-base", "name-rev", "for-each-ref", "config",
              "version", "help", "count-objects", "check-ignore", "var", "whatchanged", "reflog", "fetch"}
GIT_HAUPTZWEIG = re.compile(r"(^|[:/])(main|master)$")


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
    if sub == "reflog" and rest[:1] and rest[0] not in ("show",) and not rest[0].startswith("-"):
        return "'git reflog %s' verändert den Verlauf der Sicherungspunkte und ist gesperrt." % rest[0]
    if sub == "branch":
        kurz = "".join(a[1:] for a in rest if re.fullmatch(r"-[a-zA-Z]+", a))
        loeschen = "D" in kurz or "d" in kurz or "--delete" in rest
        zwang = "D" in kurz or "f" in kurz or "--force" in rest
        if loeschen and zwang:
            return "Erzwungenes Löschen von Branches ist gesperrt; gemergte Branches mit 'git branch -d' löschen."
        if ("M" in kurz or "C" in kurz) or (("m" in kurz or "c" in kurz) and zwang):
            return "Erzwungenes Umbenennen/Kopieren von Branches ist gesperrt."
    if sub in ("checkout", "switch") and any(a in ("-f", "--force", "--discard-changes") for a in rest):
        return "'git %s --force' verwirft nicht committete Arbeit und ist gesperrt." % sub
    if sub == "stash" and rest[:1] and rest[0] in ("drop", "clear"):
        return "'git stash %s' löscht gesicherte Arbeit und ist gesperrt." % rest[0]
    if sub == "worktree" and rest[:1] == ["remove"] and any(a in ("-f", "--force") for a in rest):
        pfad = [a for a in rest[1:] if not a.startswith("-")]
        if not (rolle == "projektleiter" and pfad and worktree_gemergt(absolut_aus(cwd or ".", pfad[0]), cwd or projekt)):
            return ("'git worktree remove --force' ist nur für Worktrees erlaubt, deren Stand schon zusammengeführt "
                    "ist und die keine Änderungen an versionierten Dateien haben.")
    if sub == "gc" and any(a.startswith("--prune") for a in rest):
        return "'git gc --prune' kann Sicherungspunkte endgültig löschen und ist gesperrt."
    if sub == "push":
        if rolle != "projektleiter":
            return "Nur der Projektleiter pusht (und nur Dev-Team-Branches). Agenten senden nichts nach außen."
        if any(a in ("-f", "--force", "--force-with-lease", "--mirror", "--delete", "-d", "--all", "--prune",
                     "--tags") or a.startswith("--force") or a.startswith("+") for a in rest):
            return "Erzwungenes Pushen, Löschen oder Pushen aller Branches/Tags ist gesperrt."
        frei = [a for a in rest if not a.startswith("-")]
        ziele_push = frei[1:]
        if not ziele_push:
            return ("Push nur mit ausdrücklichem Ziel: 'git push origin dev-team/<auftrag>'. Ein bloßes 'git push' "
                    "könnte main treffen.")
        for z in ziele_push:
            ziel = z.split(":")[-1]
            ziel = re.sub(r"^refs/heads/", "", ziel)
            if GIT_HAUPTZWEIG.search(z) or not ziel.startswith("dev-team/"):
                return "Der Projektleiter pusht nur Dev-Team-Branches (dev-team/…). main/master und alles andere macht Simon."
    if sub == "merge":
        if any(a in ("--abort", "--quit") for a in rest):
            return None
        if "--continue" in rest:
            return "Konflikte werden nie von Hand aufgelöst: 'git merge --abort' und das Paket neu bauen lassen."
        aktueller = git_out(cwd or projekt or ".", "rev-parse", "--abbrev-ref", "HEAD") if (cwd or projekt) else ""
        if GIT_HAUPTZWEIG.search(aktueller or ""):
            return "Auf main/master wird nicht zusammengeführt. Das macht nur Simon."
        if "--no-ff" not in rest or any(a in ("--ff", "--ff-only", "--squash") for a in rest):
            return ("Zusammenführen nur mit 'git merge --no-ff <branch>' (eigener Merge-Commit, sonst prüft die "
                    "Schranke das Paket nicht vollständig).")
        werte = {"-m", "--message", "-F", "--file", "-s", "--strategy", "-X", "--strategy-option", "--into-name"}
        branches, j = [], 0
        while j < len(rest):
            a = rest[j]
            if a in werte:
                j += 2
                continue
            if not a.startswith("-"):
                branches.append(a)
            j += 1
        for b in branches:
            kopf = git_out(cwd or projekt, "rev-parse", "--verify", b + "^{commit}")
            if not kopf:
                return "Branch '%s' nicht gefunden." % b
            marke = os.path.join(projekt or "", ".dev-team", "schranke-ok", kopf)
            if projekt and not os.path.isfile(marke):
                return ("Für '%s' (%s) gibt es keinen grünen Schranken-Nachweis. Erst muss der Entwickler für genau "
                        "diesen Stand 'OK – alles grün' haben, dann Review, dann Merge." % (b, kopf[:10]))
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
    if re.search(r"\[(System\.)?IO\.|Invoke-Expression|\biex\b|Start-Process|-EncodedCommand|Add-Type|"
                 r"\[Reflection\.|New-Object\s+(System\.)?IO\.|DownloadFile|Invoke-WebRequest\s.*-OutFile",
                 befehl, re.IGNORECASE):
        blockieren(UNPRUEFBAR)
    ziele, opak, verboten = shell_analyse(befehl, cwd, rolle, projekt, plugin)
    if verboten:
        blockieren(verboten)
    if opak and not plugin_skript(befehl, plugin) and rolle not in BAUENDE_ROLLEN:
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
    if innerhalb(revier, absolut) or innerhalb(heimat(), absolut):
        return True  # Elternordner (z. B. "/" oder über HOME): würde den Hauptordner mit durchsuchen
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
        text = ohne_heredocs(str(ti.get("command") or ""))
        r_eigen = norm(revier).rstrip("/")
        text = re.sub(r"\bcd\s+['\"]?%s(/[^\s'\";|&]*)?['\"]?" % re.escape(r_eigen), "cd .", text)
        tief = norm(text)
        if any(m in tief.lower() for m in marken) or "CLAUDE_PROJECT_DIR" in text or "../.." in tief \
                or re.search(r"\bcd\s+(\.\.|/|~|\$HOME|[A-Za-z]:)", tief) or punkt_platzhalter.search(tief) \
                or re.search(r"\bpushd\b", tief) or re.search(r"(^|[\s'\"=])\.\.(/|\s|$|['\"])", tief):
            blockieren(sperre)
        p = norm(projekt).rstrip("/")
        r = norm(revier).rstrip("/")
        for m in re.finditer(re.escape(p), tief):
            if not tief[m.start():].startswith(r) and r != p:
                blockieren(sperre)
        for pfad in re.findall(r"(?:^|[\s=])(/[^\s'\";|&]*|~[^\s'\";|&]*|[A-Za-z]:[\\/][^\s'\";|&]*)", text):
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
    _KONTEXT["cwd"] = eingabe.get("cwd") if isinstance(eingabe.get("cwd"), str) else None
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

    if werkzeug in IMMER_GESPERRT and projekt:
        blockieren("Das Werkzeug '%s' startet eigene Helfer-Agenten außerhalb des festen Teams und ist im "
                   "Dev-Team gesperrt." % werkzeug)
    if werkzeug == "Skill" and projekt:
        pruefe_skill(eingabe, rolle)
    elif werkzeug in SCHREIB_WERKZEUGE:
        pruefe_schreiben(eingabe, team, projekt, plugin, rolle)
    elif werkzeug in SHELL_WERKZEUGE and projekt:
        pruefe_shell(eingabe, team, projekt, plugin, rolle)
        pruefe_lesen(eingabe, team, projekt, plugin, rolle, werkzeug)
    elif werkzeug in LESE_WERKZEUGE and projekt:
        pruefe_lesen(eingabe, team, projekt, plugin, rolle, werkzeug)
    elif projekt and werkzeug not in AGENT_WERKZEUGE and werkzeug != "Skill":
        pruefe_unbekannt(werkzeug, team, rolle)


def pruefe_unbekannt(werkzeug, team, rolle):
    """Werkzeuge, die der Wächter nicht kennt, sind in Dev-Team-Projekten gesperrt (Schutz vor neuen
    Werkzeugen wie Monitor/Workflow, die Befehle ausführen oder Agenten starten)."""
    harmlos = HARMLOS_STANDARD | set(team.get("harmlose_werkzeuge") or [])
    if werkzeug in harmlos:
        return
    if werkzeug.startswith("mcp__"):
        if rolle != "projektleiter":
            blockieren("Agenten des Teams nutzen keine Zusatz-Werkzeuge (%s)." % werkzeug)
        kurz = werkzeug.split("__")[-1]
        if MCP_LESEND.search(kurz) and not MCP_AUSFUEHREND.search(kurz) and not MCP_SCHREIBEND.search(kurz):
            return
        blockieren("Das Zusatz-Werkzeug '%s' ist in Dev-Team-Projekten nicht freigegeben: Erlaubt sind nur "
                   "lesende Zusatz-Werkzeuge (get/list/search/read …). Schreiben, Pushen, Veröffentlichen oder "
                   "Ausführen über Zusatz-Werkzeuge läuft am Team vorbei. Ist es harmlos, kann Simon es in team.json "
                   "unter 'harmlose_werkzeuge' aufnehmen." % werkzeug)
    blockieren("Das Werkzeug '%s' kennt der Wächter nicht. In Dev-Team-Projekten ist es deshalb gesperrt. "
               "Ist es harmlos (führt nichts aus, schreibt keine Dateien, startet keine Agenten), kann Simon es "
               "in team.json unter 'harmlose_werkzeuge' aufnehmen." % werkzeug)


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
