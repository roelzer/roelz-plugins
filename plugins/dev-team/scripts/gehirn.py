#!/usr/bin/env python3
"""Schreibt Wissen ins Gehirn (Simons Obsidian-Tresor, privates Repo roelzer/brain).

Alles, was das Team dauerhaft weiß, landet im Gehirn: Projektstand, Lektionen, Entscheidungen,
Fachwissen. Das Skript hält sich an die Regeln des Tresors (CLAUDE.md dort): Kopfdaten, Verlinkung
von einer Übersicht, nichts löschen, keine Zugangsdaten. Vor dem Schreiben `git pull`, danach
Commit und Push direkt auf main (privates Einzel-Repo). Ohne Netz bleibt der Commit lokal liegen,
Obsidian gleicht ihn später ab.

  python3 gehirn.py pfad                                    → zeigt, ob und wo das Gehirn eingerichtet ist
  python3 gehirn.py projekt --name N --status S --stand-datei F [--fachgebiet G] [--repo R] [--ordner O]
  python3 gehirn.py lektion --text "…" [--bestaetigt] [--projekt N]
  python3 gehirn.py entscheidung --text "…" --grund "…" [--betrifft N]
  python3 gehirn.py wissen --titel T --datei F [--quelle Q] [--ersetzen]

Der Pfad steht in ~/.claude/CLAUDE.md (Block dev-team, Zeile „Gehirn: …“), eingetragen von
claude_md_block.py --gehirn. Für Tests: Umgebungsvariable DEV_TEAM_GEHIRN_TEST.
"""

import argparse
import os
import re
import subprocess
import sys
from datetime import date

GEHEIM = re.compile(
    r"-----BEGIN [A-Z ]*PRIVATE KEY-----|\bgh[pousr]_[A-Za-z0-9]{20,}|\bgithub_pat_[A-Za-z0-9_]{20,}|"
    r"\bsk-[A-Za-z0-9_-]{20,}|\bAKIA[0-9A-Z]{16}\b|\bxox[baprs]-[A-Za-z0-9-]{10,}|"
    r"(?i:\b(passwort|password|kennwort|api[_-]?key|secret|token)\s*[:=]\s*\S{6,})|"
    r"\bDE\d{2}(?:\s?\d{4}){4}\s?\d{2}\b")
# Sperrwörter stehen im Gehirn selbst (Datei „Sperrwörter.md“, eine Zeile „- wort“ je Eintrag), nicht in diesem
# öffentlichen Plugin. Damit hält Simon z. B. Firmenwissen des Arbeitgebers aus dem privaten Gehirn heraus.
SPERRWOERTER = "Sperrwörter.md"
_SPERRE = []
MARKE_START = "<!-- dev-team START (automatisch, wird überschrieben) -->"
MARKE_ENDE = "<!-- dev-team END -->"
HEUTE = date.today().isoformat()


def gehirn_pfad():
    if os.environ.get("DEV_TEAM_GEHIRN_TEST"):
        return os.environ["DEV_TEAM_GEHIRN_TEST"]
    try:
        with open(os.path.join(os.path.expanduser("~"), ".claude", "CLAUDE.md"), encoding="utf-8") as f:
            for z in f:
                if z.startswith("Gehirn:"):
                    p = os.path.expanduser(z.split(":", 1)[1].strip())
                    m = re.match(r"^/([A-Za-z])(/.*)$", p)
                    if os.name == "nt" and m:
                        p = "%s:%s" % (m.group(1).upper(), m.group(2))
                    return p
    except OSError:
        pass
    return None


def git(wurzel, *args):
    return subprocess.run(["git", *args], cwd=wurzel, capture_output=True, text=True, encoding="utf-8",
                          errors="replace")


def pruefen_geheim(text):
    pruefen_firma(text)
    m = GEHEIM.search(text or "")
    if m:
        print("FEHLER: Der Text enthält etwas, das wie ein Zugangsdatum oder eine Kontonummer aussieht (%s…). "
              "Ins Gehirn kommen keine Zugangsdaten. Nichts geschrieben." % m.group(0)[:12])
        sys.exit(1)


def sperrwoerter_laden(wurzel):
    text = lies(os.path.join(wurzel, SPERRWOERTER)) or ""
    for z in text.splitlines():
        m = re.match(r"^\s*-\s+(.+?)\s*$", z)
        if m:
            _SPERRE.append(re.compile(r"(?i)(?<!\w)%s(?!\w)" % re.escape(m.group(1))))


def pruefen_firma(text):
    for r in _SPERRE:
        m = r.search(text or "")
        if m:
            print("FEHLER: Der Text enthält das Sperrwort „%s“ (Liste: %s im Gehirn). Das gehört nicht in dieses "
                  "Gehirn. Ohne diesen Bezug umformulieren oder im Projekt lassen. Nichts geschrieben."
                  % (m.group(0), SPERRWOERTER))
            sys.exit(1)


def lies(p):
    try:
        with open(p, encoding="utf-8") as f:
            return f.read()
    except OSError:
        return None


def schreib(p, text):
    os.makedirs(os.path.dirname(p), exist_ok=True)
    with open(p, "w", encoding="utf-8", newline="\n") as f:
        f.write(text)


def sicherer_name(name):
    name = re.sub(r"[\\/:*?\"<>|#^\[\]]", " ", name).strip()
    return re.sub(r"\s+", " ", name)[:80] or "Unbenannt"


def kopf_stand(text):
    """Frontmatter-Feld 'stand' auf heute setzen (falls vorhanden)."""
    return re.sub(r"^(stand:).*$", r"\1 " + HEUTE, text, count=1, flags=re.M)


def verlinken(wurzel, datei_rel, abschnitt, zeile, notiz):
    """Zeile unter einer Überschrift in einer Übersicht ergänzen, wenn [[notiz]] dort noch fehlt."""
    p = os.path.join(wurzel, datei_rel)
    text = lies(p)
    if text is None or ("[[%s]]" % notiz) in text:
        return False
    teile = text.split("\n")
    for i, z in enumerate(teile):
        if z.strip().lower() == abschnitt.lower():
            j = i + 1
            while j < len(teile) and teile[j].strip() and not teile[j].startswith("#"):
                j += 1
            teile.insert(j, zeile)
            schreib(p, kopf_stand("\n".join(teile)))
            return True
    schreib(p, kopf_stand(text.rstrip("\n") + "\n\n%s\n%s\n" % (abschnitt, zeile)))
    return True


def sync_vorher(wurzel):
    if git(wurzel, "remote").stdout.strip():
        r = git(wurzel, "pull", "--rebase", "--autostash", "-q")
        if r.returncode != 0:
            print("HINWEIS: git pull ging nicht (%s) – schreibe auf den lokalen Stand." % r.stderr.strip()[:120])


def sync_nachher(wurzel, nachricht, dateien):
    git(wurzel, "add", "--", *dateien)
    if not git(wurzel, "diff", "--cached", "--name-only").stdout.strip():
        print("OK: Gehirn war schon aktuell.")
        return
    diff = git(wurzel, "diff", "--cached").stdout
    pruefen_geheim("\n".join(z for z in diff.splitlines() if z.startswith("+")))
    r = git(wurzel, "-c", "user.name=Dev-Team", "-c", "user.email=dev-team@localhost", "commit", "-q", "-m",
            nachricht)
    if r.returncode != 0:
        print("FEHLER: Commit im Gehirn ging nicht: %s" % r.stderr.strip()[:200])
        sys.exit(1)
    if git(wurzel, "remote").stdout.strip():
        p = git(wurzel, "push", "-q", "origin", "HEAD")
        if p.returncode != 0:
            print("HINWEIS: Push ging nicht (%s). Der Commit liegt lokal; Obsidian gleicht ihn beim nächsten Sync "
                  "ab." % p.stderr.strip()[:120])
            return
    print("GESPEICHERT im Gehirn: %s" % ", ".join(dateien))


def cmd_projekt(w, a):
    name = sicherer_name(a.name)
    stand = lies(a.stand_datei) if a.stand_datei else ""
    if a.stand_datei and stand is None:
        print("FEHLER: Datei %s fehlt." % a.stand_datei)
        sys.exit(1)
    pruefen_geheim(stand)
    rel = os.path.join("01 Projekte", name + ".md")
    p = os.path.join(w, rel)
    alt = lies(p)
    block = "%s\n## Stand laut Dev-Team (%s)\n**Status:** %s\n\n%s\n%s" % (MARKE_START, HEUTE, a.status,
                                                                         (stand or "").strip(), MARKE_ENDE)
    if alt is None:
        text = ("---\ntyp: projekt\nstatus: %s\nstand: %s\nrepo: %s\nordner: %s\nfachgebiet: %s\n---\n# %s\n\n"
                "## Worum geht es\n(siehe Lastenheft im Projekt)\n\n%s\n\nZurück: [[Projektübersicht]]\n"
                % (a.status, HEUTE, a.repo or "", a.ordner or "", a.fachgebiet or "", name, block))
    else:
        if MARKE_START in alt and MARKE_ENDE in alt:
            text = re.sub(re.escape(MARKE_START) + r".*?" + re.escape(MARKE_ENDE), lambda m: block, alt, flags=re.S)
        else:
            text = alt.rstrip("\n").replace("Zurück: [[Projektübersicht]]", "").rstrip("\n") + \
                "\n\n" + block + "\n\nZurück: [[Projektübersicht]]\n"
        text = re.sub(r"^(status:).*$", r"\1 " + a.status, text, count=1, flags=re.M)
        text = kopf_stand(text)
    schreib(p, text)
    geaendert = [rel]
    uebersicht = os.path.join(w, "01 Projekte", "Projektübersicht.md")
    ue = lies(uebersicht)
    if ue is not None:
        zeile_neu = "| [[%s]] | %s | %s | %s |" % (name, a.status, a.fachgebiet or "", a.repo or a.ordner or "")
        if ("[[%s]]" % name) in ue:
            ue2 = re.sub(r"^\|\s*\[\[%s\]\]\s*\|[^|]*\|" % re.escape(name),
                         lambda m: "| [[%s]] | %s |" % (name, a.status), ue, count=1, flags=re.M)
        else:
            teile = ue.split("\n")
            for i, z in enumerate(teile):
                if z.startswith("|---") and i > 0 and "Projekt" in teile[i - 1]:
                    j = i + 1
                    while j < len(teile) and teile[j].startswith("|"):
                        j += 1
                    teile.insert(j, zeile_neu)
                    break
            else:
                teile += ["", zeile_neu]
            ue2 = "\n".join(teile)
        if ue2 != ue:
            schreib(uebersicht, kopf_stand(ue2))
            geaendert.append(os.path.join("01 Projekte", "Projektübersicht.md"))
    return geaendert, "Dev-Team: Projektstand %s (%s)" % (name, a.status)


def cmd_lektion(w, a):
    pruefen_geheim(a.text)
    rel = os.path.join("05 Lektionen", "Dev-Team-Lektionen.md")
    p = os.path.join(w, rel)
    text = lies(p) or ("---\ntyp: lektionen\nstand: %s\n---\n# Dev-Team-Lektionen\n\nAllgemeine Lektionen, die das "
                       "Dev-Team in jeder Sitzung lädt. Format: `- [Bereich] Regel. (Anlass, Datum)`.\n\n"
                       "## Lektionen\n\n## Vorgeschlagen (noch nicht von Simon bestätigt)\n" % HEUTE)
    zeile = a.text.strip()
    if not zeile.startswith("- "):
        zeile = "- " + zeile
    if a.projekt:
        zeile += " (Projekt: [[%s]])" % sicherer_name(a.projekt)
    if zeile in text:
        return [], ""
    abschnitt = "## Lektionen" if a.bestaetigt else "## Vorgeschlagen (noch nicht von Simon bestätigt)"
    if abschnitt not in text:
        text = text.rstrip("\n") + "\n\n" + abschnitt + "\n"
    teile = text.split("\n")
    i = teile.index(abschnitt)
    j = i + 1
    while j < len(teile) and not teile[j].startswith("## "):
        j += 1
    while j > i + 1 and not teile[j - 1].strip():
        j -= 1
    teile.insert(j, zeile)
    schreib(p, kopf_stand("\n".join(teile).rstrip("\n") + "\n"))
    geaendert = [rel]
    if verlinken(w, os.path.join("05 Lektionen", "Lektionen.md"), "## Wo was steht",
                 "- **Dev-Team-Lektionen** (allgemein, in jeder Sitzung geladen): [[Dev-Team-Lektionen]]",
                 "Dev-Team-Lektionen"):
        geaendert.append(os.path.join("05 Lektionen", "Lektionen.md"))
    return geaendert, "Dev-Team: Lektion %s" % ("bestätigt" if a.bestaetigt else "vorgeschlagen")


def cmd_entscheidung(w, a):
    pruefen_geheim(a.text + " " + a.grund)
    rel = os.path.join("04 Entscheidungen", "Entscheidungslog.md")
    p = os.path.join(w, rel)
    text = lies(p) or "---\ntyp: log\nstand: %s\n---\n# Entscheidungslog\n\n" % HEUTE
    zeile = "- %s – %s – %s%s" % (HEUTE, a.text.strip(), a.grund.strip(),
                                  (" Betrifft: [[%s]]" % sicherer_name(a.betrifft)) if a.betrifft else "")
    if zeile in text:
        return [], ""
    schreib(p, kopf_stand(text.rstrip("\n") + "\n" + zeile + "\n"))
    return [rel], "Dev-Team: Entscheidung %s" % a.text.strip()[:50]


def cmd_wissen(w, a):
    inhalt = lies(a.datei)
    if inhalt is None:
        print("FEHLER: Datei %s fehlt." % a.datei)
        sys.exit(1)
    pruefen_geheim(inhalt)
    titel = sicherer_name(a.titel)
    rel = os.path.join("02 Wissen", titel + ".md")
    p = os.path.join(w, rel)
    if not inhalt.lstrip().startswith("---"):
        inhalt = "---\ntyp: wissen\nstand: %s\nquelle: %s\nvertraulichkeit: allgemein\n---\n# %s\n\n%s" % (
            HEUTE, a.quelle or "Dev-Team", titel, inhalt.strip() + "\n")
    alt = lies(p)
    if alt is not None and alt.strip() == inhalt.strip():
        return [], ""
    if alt is not None and not a.ersetzen:
        neu_zeilen = {z.strip() for z in inhalt.splitlines()}
        fehlt = [z.strip() for z in alt.splitlines() if z.strip() and z.strip() not in neu_zeilen
                 and not re.match(r"^(stand|quelle):", z.strip())]
        if fehlt:
            print("FEHLER: Die neue Fassung von „%s“ lässt %d Zeilen der bestehenden Notiz weg, z. B.: %s\n"
                  "Im Gehirn wird nichts gelöscht, was Simon nicht freigegeben hat. Erst die bestehende Notiz lesen und "
                  "ergänzen. Hat Simon das Streichen freigegeben: --ersetzen." % (titel, len(fehlt), fehlt[0][:80]))
            sys.exit(1)
    schreib(p, kopf_stand(inhalt))
    geaendert = [rel]
    if verlinken(w, "00 Start.md", "## Wissen", "- [[%s]]" % titel, titel):
        geaendert.append("00 Start.md")
    return geaendert, "Dev-Team: Wissen %s" % titel


def main():
    ap = argparse.ArgumentParser()
    sub = ap.add_subparsers(dest="cmd", required=True)
    sub.add_parser("pfad")
    p = sub.add_parser("projekt")
    p.add_argument("--name", required=True)
    p.add_argument("--status", required=True, choices=["aktiv", "ruhend", "fertig", "geparkt", "neu aufzunehmen"])
    p.add_argument("--stand-datei", default="")
    p.add_argument("--fachgebiet", default="")
    p.add_argument("--repo", default="")
    p.add_argument("--ordner", default="")
    p = sub.add_parser("lektion")
    p.add_argument("--text", required=True)
    p.add_argument("--bestaetigt", action="store_true")
    p.add_argument("--projekt", default="")
    p = sub.add_parser("entscheidung")
    p.add_argument("--text", required=True)
    p.add_argument("--grund", required=True)
    p.add_argument("--betrifft", default="")
    p = sub.add_parser("wissen")
    p.add_argument("--titel", required=True)
    p.add_argument("--datei", required=True)
    p.add_argument("--quelle", default="")
    p.add_argument("--ersetzen", action="store_true", help="nur mit Simons Freigabe: Zeilen dürfen wegfallen")
    a = ap.parse_args()

    w = gehirn_pfad()
    if not w or not os.path.isfile(os.path.join(w, "00 Start.md")):
        print("HINWEIS: Das Gehirn ist auf diesem Rechner nicht eingerichtet (Zeile „Gehirn:“ in ~/.claude/CLAUDE.md "
              "fehlt oder der Ordner hat keine „00 Start.md“). Projektleiter: Inhalt in docs/GEHIRN_NACHTRAG.md "
              "festhalten und Simon sagen, dass es später ins Gehirn muss.")
        sys.exit(3)
    if a.cmd == "pfad":
        print("Gehirn: %s" % w)
        return
    sync_vorher(w)
    sperrwoerter_laden(w)
    dateien, nachricht = {"projekt": cmd_projekt, "lektion": cmd_lektion, "entscheidung": cmd_entscheidung,
                          "wissen": cmd_wissen}[a.cmd](w, a)
    if not dateien:
        print("OK: Steht schon im Gehirn.")
        return
    sync_nachher(w, nachricht, dateien)


if __name__ == "__main__":
    main()
