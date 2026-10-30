#!/usr/bin/env python3
"""Macht einen frischen Entwickler-Worktree lauffähig – so schnell wie möglich.

Bisher hat jeder Entwickler `npm ci` ausgeführt (2–5 Minuten je Paket). Hat der Worktree dieselbe Lockdatei
wie der Hauptordner und liegt dort schon ein installiertes node_modules, wird es per Verknüpfung
wiederverwendet (Windows: Junction, sonst Symlink). Andernfalls läuft der Setup-Befehl aus .claude/dev-team.json.

  python3 worktree_vorbereiten.py            # im Worktree ausführen
  python3 worktree_vorbereiten.py --trennen  # Verknüpfung lösen (z. B. vor dem Aufnehmen einer neuen
                                             # Abhängigkeit), danach läuft der Setup-Befehl im Worktree
  python3 worktree_vorbereiten.py --nur-trennen --ordner <worktree>  # vor dem Aufräumen des Worktrees

Nie `rm -rf node_modules` auf eine Verknüpfung anwenden: Das könnte den Inhalt im Hauptordner löschen.
Ausgabe: eine Zeile, was passiert ist. Exit 0 = Worktree bereit.
"""
import argparse
import hashlib
import json
import os
import subprocess
import sys

LOCKDATEIEN = ("package-lock.json", "pnpm-lock.yaml", "yarn.lock", "bun.lockb")


def git(cwd, *args):
    r = subprocess.run(["git", *args], cwd=cwd, capture_output=True, text=True, encoding="utf-8", errors="replace")
    return r.returncode, r.stdout.strip()


def hauptordner(worktree):
    code, aus = git(worktree, "worktree", "list", "--porcelain")
    if code != 0:
        return None
    for zeile in aus.splitlines():
        if zeile.startswith("worktree "):
            return zeile[len("worktree "):].strip()
    return None


def lock_hash(ordner):
    for name in LOCKDATEIEN:
        pfad = os.path.join(ordner, name)
        if os.path.isfile(pfad):
            with open(pfad, "rb") as f:
                return name, hashlib.sha256(f.read()).hexdigest()
    return None, None


def ist_verknuepfung(pfad):
    if os.path.islink(pfad):
        return True
    if os.name == "nt" and os.path.isdir(pfad):
        try:
            return bool(os.stat(pfad, follow_symlinks=False).st_file_attributes & 0x400)  # Reparse-Punkt
        except (OSError, AttributeError):
            return False
    return False


def verknuepfen(ziel, link):
    if os.name == "nt":
        import _winapi  # Junction braucht keine Administratorrechte
        _winapi.CreateJunction(ziel, link)
    else:
        os.symlink(ziel, link, target_is_directory=True)


def trennen(link):
    if os.path.islink(link):
        os.unlink(link)
    else:
        os.rmdir(link)  # entfernt bei einer Junction nur die Verknüpfung, nie den Inhalt


def setup_befehl(worktree):
    try:
        with open(os.path.join(worktree, ".claude", "dev-team.json"), encoding="utf-8") as f:
            return (json.load(f).get("setup") or "").strip()
    except (OSError, ValueError):
        return ""


def setup_ausfuehren(worktree, grund):
    befehl = setup_befehl(worktree)
    if not befehl:
        print("OK – kein Setup-Befehl in .claude/dev-team.json (%s)." % grund)
        return 0
    r = subprocess.run(befehl, cwd=worktree, shell=True)
    if r.returncode != 0:
        print("FEHLER – Setup-Befehl '%s' endete mit %d (%s)." % (befehl, r.returncode, grund))
        return 1
    print("OK – Setup-Befehl '%s' ausgeführt (%s)." % (befehl, grund))
    return 0


def ausgangslage(worktree, haupt):
    """Wurde genau dieser Startpunkt im Hauptordner schon grün geprüft (Schranke nach dem Merge), ist ein
    zweiter voller Testlauf im frischen Worktree nur Wartezeit. Gibt eine Zeile aus, wenn er entfallen darf."""
    if not haupt:
        return False
    code, kopf = git(worktree, "rev-parse", "HEAD")
    _, offen = git(worktree, "status", "--porcelain")
    nachweis = os.path.join(haupt, ".dev-team", "gruen", kopf)
    if code != 0 or offen or not os.path.isfile(nachweis):
        return False
    with open(nachweis, encoding="utf-8", errors="replace") as f:
        print("AUSGANGSLAGE BELEGT GRÜN – Startpunkt %s wurde im Hauptordner geprüft (%s). Der volle Ausgangslauf "
              "entfällt." % (kopf[:10], f.read().strip()))
    return True


def main():
    a = argparse.ArgumentParser()
    a.add_argument("--trennen", action="store_true")
    a.add_argument("--nur-trennen", action="store_true", help="nur Verknüpfung lösen (vor git worktree remove)")
    a.add_argument("--ordner", default=os.getcwd())
    arg = a.parse_args()
    code, worktree = git(arg.ordner, "rev-parse", "--show-toplevel")
    if code != 0:
        print("FEHLER – kein Git-Ordner.")
        return 1
    worktree = os.path.abspath(worktree)
    nm = os.path.join(worktree, "node_modules")

    if arg.nur_trennen:
        if ist_verknuepfung(nm):
            trennen(nm)
            print("OK – Verknüpfung gelöst, Hauptordner unberührt.")
        else:
            print("OK – keine Verknüpfung vorhanden.")
        return 0
    if arg.trennen:
        if ist_verknuepfung(nm):
            trennen(nm)
        return setup_ausfuehren(worktree, "Verknüpfung gelöst, eigene Installation")

    haupt = hauptordner(worktree)
    ausgangslage(worktree, haupt)
    if ist_verknuepfung(nm) or (os.path.isdir(nm) and os.listdir(nm)):
        print("OK – node_modules ist schon da.")
        return 0
    name, h_wt = lock_hash(worktree)
    if not name or not haupt or os.path.normcase(os.path.abspath(haupt)) == os.path.normcase(worktree):
        return setup_ausfuehren(worktree, "keine Lockdatei oder kein eigener Worktree")
    _, h_haupt = lock_hash(haupt)
    haupt_nm = os.path.join(haupt, "node_modules")
    ignoriert = git(worktree, "check-ignore", "-q", "node_modules/")[0] == 0
    if h_wt != h_haupt or not os.path.isdir(haupt_nm) or not ignoriert:
        grund = ("Lockdatei weicht vom Hauptordner ab" if h_wt != h_haupt else
                 "im Hauptordner ist nichts installiert" if not os.path.isdir(haupt_nm) else
                 "node_modules steht nicht in .gitignore")
        return setup_ausfuehren(worktree, grund)
    # Eine Verknüpfung ist für Git eine Datei, kein Ordner: "node_modules/" in .gitignore trifft sie nicht.
    # Damit sie nie mit "git add -A" im Commit landet, kommt "/node_modules" in die lokale Ausschlussliste.
    code, gemeinsam = git(worktree, "rev-parse", "--git-common-dir")
    if code != 0:
        return setup_ausfuehren(worktree, "Git-Ordner nicht gefunden")
    ausschluss = os.path.join(os.path.abspath(os.path.join(worktree, gemeinsam)), "info", "exclude")
    try:
        bisher = open(ausschluss, encoding="utf-8").read() if os.path.isfile(ausschluss) else ""
        if "/node_modules\n" not in bisher:
            os.makedirs(os.path.dirname(ausschluss), exist_ok=True)
            with open(ausschluss, "a", encoding="utf-8") as f:
                f.write(("" if bisher.endswith("\n") or not bisher else "\n") + "/node_modules\n")
    except OSError as fehler:
        return setup_ausfuehren(worktree, "Ausschlussliste nicht schreibbar: %s" % fehler)
    if os.path.isdir(nm):
        os.rmdir(nm)  # leerer Ordner
    try:
        verknuepfen(haupt_nm, nm)
    except OSError as fehler:
        return setup_ausfuehren(worktree, "Verknüpfung nicht möglich: %s" % fehler)
    if git(worktree, "status", "--porcelain", "--", "node_modules")[1]:
        trennen(nm)
        return setup_ausfuehren(worktree, "Verknüpfung wäre in Git sichtbar")
    print("OK – node_modules vom Hauptordner übernommen (gleiche %s). Neue Abhängigkeit nötig? Erst "
          "'worktree_vorbereiten.py --trennen'." % name)
    return 0


if __name__ == "__main__":
    sys.exit(main())
