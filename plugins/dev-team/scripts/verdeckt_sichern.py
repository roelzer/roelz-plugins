#!/usr/bin/env python3
"""Sichert die verdeckten Abnahmetests (.dev-team/verdeckt/) außerhalb des Arbeitsstands – für Cloud-Sitzungen.

.dev-team/ steht absichtlich in .gitignore. In einer Cloud-Sitzung ist der Container flüchtig: Wird er
abgeräumt oder startet eine neue Sitzung, wären die verdeckten Tests weg. Dieses Skript legt sie als
eigenen Commit auf den Branch `dev-team-verdeckt` (ohne gemeinsame Geschichte mit dem Projekt, nie in
einem Worktree ausgecheckt) und holt sie bei Bedarf zurück. Arbeitsordner und Index bleiben unberührt.

  python3 verdeckt_sichern.py --sichern     # nach dem Tester (Phase 6) und nach jeder Änderung
  python3 verdeckt_sichern.py --holen       # fehlen die Tests, zurückholen und gegen die Prüfsummen prüfen

Ausgabe: eine Zeile. Exit 0 = gesichert/geholt/nichts zu tun, 1 = Problem (Text sagt, was fehlt).
"""
import argparse
import os
import shutil
import subprocess
import sys
import tempfile

BRANCH = "dev-team-verdeckt"
REF = "refs/heads/" + BRANCH
UNTER = os.path.join(".dev-team", "verdeckt")


def git(cwd, *args, umg=None, zeit=60):
    try:
        r = subprocess.run(["git", *args], cwd=cwd, capture_output=True, text=True, encoding="utf-8",
                           errors="replace", env=umg, timeout=zeit)
    except subprocess.TimeoutExpired:
        return 1, "Zeitgrenze"
    return r.returncode, (r.stdout or "").strip() or (r.stderr or "").strip()


def hauptordner():
    code, gemeinsam = git(os.getcwd(), "rev-parse", "--path-format=absolute", "--git-common-dir")
    return os.path.dirname(gemeinsam.rstrip("/\\")) if code == 0 else None


def sichern(haupt):
    quelle = os.path.join(haupt, UNTER)
    if not os.path.isdir(quelle) or not any(f for _, _, d in os.walk(quelle) for f in d):
        print("NICHTS ZU SICHERN – %s ist leer oder fehlt." % UNTER.replace(os.sep, "/"))
        return 0
    tmp = tempfile.mkdtemp(prefix="verdeckt-")
    try:
        umg = dict(os.environ, GIT_INDEX_FILE=os.path.join(tmp, "index"))
        # Eigener Index, Arbeitsbaum = .dev-team/: so landen nur die verdeckten Tests im Commit.
        code, aus = git(haupt, "--work-tree", os.path.join(haupt, ".dev-team"), "add", "-A", "-f", "verdeckt",
                        umg=umg)
        if code != 0:
            print("FEHLER – Sichern nicht möglich: %s" % aus)
            return 1
        _, baum = git(haupt, "write-tree", umg=umg)
        code, alt = git(haupt, "rev-parse", "-q", "--verify", REF)
        if code == 0 and git(haupt, "rev-parse", alt + "^{tree}")[1] == baum:
            neu = alt
        else:
            eltern = ["-p", alt] if code == 0 else []
            code, neu = git(haupt, "-c", "user.name=Dev-Team", "-c", "user.email=dev-team@localhost", "commit-tree",
                            baum, *eltern, "-m", "Verdeckte Abnahmetests (nicht zusammenführen)")
            if code != 0:
                print("FEHLER – Sichern nicht möglich: %s" % neu)
                return 1
            git(haupt, "update-ref", REF, neu)
    finally:
        shutil.rmtree(tmp, ignore_errors=True)
    code, aus = git(haupt, "push", "-q", "origin", "%s:%s" % (REF, REF), zeit=90)
    if code != 0:
        print("NUR LOKAL GESICHERT (%s) – Push auf '%s' nicht möglich: %s. In einer Cloud-Sitzung gehen die verdeckten "
              "Tests verloren, wenn der Container endet; Simon das sagen." % (neu[:10], BRANCH, aus.splitlines()[-1:]))
        return 1
    print("GESICHERT – verdeckte Tests auf Branch '%s' (%s)." % (BRANCH, neu[:10]))
    return 0


def holen(haupt):
    ziel = os.path.join(haupt, UNTER)
    if os.path.isdir(ziel) and any(f for _, _, d in os.walk(ziel) for f in d):
        print("NICHTS ZU HOLEN – verdeckte Tests sind da.")
        return 0
    code, _ = git(haupt, "fetch", "-q", "origin", "%s:%s" % (REF, REF), zeit=30)
    code, _ = git(haupt, "rev-parse", "-q", "--verify", REF)
    if code != 0:
        print("KEINE SICHERUNG – Branch '%s' gibt es weder lokal noch auf GitHub." % BRANCH)
        return 1
    tmp = tempfile.mkdtemp(prefix="verdeckt-")
    try:
        umg = dict(os.environ, GIT_INDEX_FILE=os.path.join(tmp, "index"))
        git(haupt, "read-tree", REF, umg=umg)
        os.makedirs(os.path.join(haupt, ".dev-team"), exist_ok=True)
        code, aus = git(haupt, "--work-tree", os.path.join(haupt, ".dev-team"), "checkout-index", "-a", umg=umg)
        if code != 0:
            print("FEHLER – Zurückholen nicht möglich: %s" % aus)
            return 1
    finally:
        shutil.rmtree(tmp, ignore_errors=True)
    pruef = os.path.join(os.path.dirname(os.path.abspath(__file__)), "abnahme_pruefsummen.py")
    r = subprocess.run([sys.executable, pruef, "--pruefen"], cwd=haupt, capture_output=True, text=True,
                       encoding="utf-8", errors="replace")
    letzte = ((r.stdout or "") + (r.stderr or "")).strip().splitlines()[-1:] or [""]
    if r.returncode != 0:
        print("GEHOLT, ABER PRÜFSUMMEN PASSEN NICHT – %s" % letzte[0])
        return 1
    print("GEHOLT – verdeckte Tests aus '%s' zurück, Prüfsummen stimmen." % BRANCH)
    return 0


def main():
    a = argparse.ArgumentParser()
    g = a.add_mutually_exclusive_group(required=True)
    g.add_argument("--sichern", action="store_true")
    g.add_argument("--holen", action="store_true")
    arg = a.parse_args()
    haupt = hauptordner()
    if not haupt:
        print("FEHLER – kein Git-Repo.")
        return 1
    return sichern(haupt) if arg.sichern else holen(haupt)


if __name__ == "__main__":
    sys.exit(main())
