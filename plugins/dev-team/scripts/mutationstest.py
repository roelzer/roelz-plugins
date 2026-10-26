#!/usr/bin/env python3
"""Mutationstest ohne Zusatzpakete (Python-Code): misst, ob die Tests Fehler im Code wirklich finden.

Baut absichtlich kleine Fehler in den Code ein (z. B. + statt -, < statt <=, Zahl um 1 verschoben,
True statt False), immer nur einen auf einmal, in einer Kopie des Projekts, und führt jedes Mal die
Tests aus. Ein guter Testsatz wird bei fast jedem dieser Fehler rot („Mutant getötet“). Überlebt ein
Mutant, fehlt ein Test für genau diese Stelle.

  python3 mutationstest.py --dateien src/rohrnetz/hydraulik.py src/rohrnetz/regeln.py --schwelle 70
                           [--max 80] [--testbefehl "<befehl>"]

Ohne --testbefehl wird der Testbefehl aus .claude/dev-team.json genommen. Exit 1, wenn der Anteil
getöteter Mutanten unter der Schwelle liegt. Für JavaScript/TypeScript: Stryker (über das Projekt).
"""

import argparse
import ast
import copy
import json
import os
import shutil
import subprocess
import sys
import tempfile
import time

TAUSCH_BIN = {ast.Add: ast.Sub, ast.Sub: ast.Add, ast.Mult: ast.Div, ast.Div: ast.Mult, ast.FloorDiv: ast.Div,
              ast.Pow: ast.Mult, ast.Mod: ast.Mult}
TAUSCH_CMP = {ast.Lt: ast.LtE, ast.LtE: ast.Lt, ast.Gt: ast.GtE, ast.GtE: ast.Gt, ast.Eq: ast.NotEq,
              ast.NotEq: ast.Eq, ast.Is: ast.IsNot, ast.IsNot: ast.Is, ast.In: ast.NotIn, ast.NotIn: ast.In}


def mutationsstellen(baum):
    """Liste (knoten_index, art, beschreibung) – deterministisch in Quelltext-Reihenfolge."""
    stellen = []
    for i, k in enumerate(ast.walk(baum)):
        zeile = getattr(k, "lineno", 0)
        if isinstance(k, ast.BinOp) and type(k.op) in TAUSCH_BIN:
            stellen.append((i, "bin", zeile, "%s → %s" % (type(k.op).__name__, TAUSCH_BIN[type(k.op)].__name__)))
        elif isinstance(k, ast.Compare) and k.ops and type(k.ops[0]) in TAUSCH_CMP:
            stellen.append((i, "cmp", zeile, "%s → %s" % (type(k.ops[0]).__name__, TAUSCH_CMP[type(k.ops[0])].__name__)))
        elif isinstance(k, ast.BoolOp):
            stellen.append((i, "bool", zeile, "and ↔ or"))
        elif isinstance(k, ast.UnaryOp) and isinstance(k.op, (ast.Not, ast.USub)):
            stellen.append((i, "unary", zeile, "%s entfernt" % type(k.op).__name__))
        elif isinstance(k, ast.Constant) and isinstance(k.value, bool):
            stellen.append((i, "boolconst", zeile, "%s → %s" % (k.value, not k.value)))
        elif isinstance(k, ast.Constant) and isinstance(k.value, (int, float)) and not isinstance(k.value, bool):
            stellen.append((i, "zahl", zeile, "%r verschoben" % k.value))
        elif isinstance(k, ast.Return) and k.value is not None and not (isinstance(k.value, ast.Constant)
                                                                         and k.value.value is None):
            stellen.append((i, "return", zeile, "Rückgabe → None"))
    return stellen


def mutiere(baum, index, art):
    neu = copy.deepcopy(baum)
    for i, k in enumerate(ast.walk(neu)):
        if i != index:
            continue
        if art == "bin":
            k.op = TAUSCH_BIN[type(k.op)]()
        elif art == "cmp":
            k.ops[0] = TAUSCH_CMP[type(k.ops[0])]()
        elif art == "bool":
            k.op = ast.Or() if isinstance(k.op, ast.And) else ast.And()
        elif art == "unary":
            k.op = ast.UAdd()
        elif art == "boolconst":
            k.value = not k.value
        elif art == "return":
            k.value = ast.Constant(value=None)
        elif art == "zahl":
            k.value = (k.value + 1) if isinstance(k.value, int) else (k.value * 1.5 if k.value else 1.0)
        break
    return ast.unparse(ast.fix_missing_locations(neu))


def docstring_konstanten(baum):
    """Konstanten in Docstrings und f-String-Formaten nicht mutieren (keine Wirkung)."""
    ausgenommen = set()
    for k in ast.walk(baum):
        if isinstance(k, ast.JoinedStr):
            for t in ast.walk(k):
                ausgenommen.add(id(t))
    return ausgenommen


def main():
    a = argparse.ArgumentParser()
    a.add_argument("--dateien", nargs="+", required=True)
    a.add_argument("--schwelle", type=float, default=70)
    a.add_argument("--max", type=int, default=80)
    a.add_argument("--testbefehl", default="")
    arg = a.parse_args()
    wurzel = subprocess.run(["git", "rev-parse", "--show-toplevel"], capture_output=True, text=True).stdout.strip() \
        or os.getcwd()
    befehl = arg.testbefehl
    if not befehl:
        try:
            with open(os.path.join(wurzel, ".claude", "dev-team.json"), encoding="utf-8") as f:
                befehl = json.load(f).get("testbefehl") or ""
        except (OSError, ValueError):
            befehl = ""
    if not befehl:
        print("FEHLER: kein Testbefehl.")
        sys.exit(1)
    tmp = tempfile.mkdtemp(prefix="dev-team-mutation-")
    try:
        dateien = subprocess.run(["git", "ls-files", "-co", "--exclude-standard"], cwd=wurzel, capture_output=True,
                                 text=True).stdout.splitlines()
        for d in dateien:
            if d.startswith((".claude/worktrees/", ".dev-team/")):
                continue
            q = os.path.join(wurzel, d)
            if os.path.isfile(q):
                z = os.path.join(tmp, d)
                os.makedirs(os.path.dirname(z), exist_ok=True)
                shutil.copy2(q, z)
        umgebung = dict(os.environ, PYTHONDONTWRITEBYTECODE="1")

        def cache_weg():
            # Python würde sonst zwischengespeicherten Bytecode einer früheren Mutante verwenden
            for o, unter, _ in os.walk(tmp):
                for u in list(unter):
                    if u == "__pycache__":
                        shutil.rmtree(os.path.join(o, u), ignore_errors=True)
                        unter.remove(u)

        def tests_laufen(grenze_s):
            cache_weg()
            if os.name == "nt" and shutil.which("bash"):
                return subprocess.run([shutil.which("bash"), "-c", befehl], cwd=tmp, capture_output=True, text=True,
                                      timeout=grenze_s, env=umgebung)
            return subprocess.run(befehl, shell=True, cwd=tmp, capture_output=True, text=True, timeout=grenze_s,
                                  env=umgebung)

        start = time.time()
        basis = tests_laufen(1800)
        dauer = time.time() - start
        if basis.returncode != 0:
            print("FEHLER: Die Tests sind schon ohne Mutation rot – erst grün machen.")
            sys.exit(1)
        grenze = max(30.0, dauer * 4)
        alle = []
        for d in arg.dateien:
            rel = d.replace("\\", "/")
            with open(os.path.join(wurzel, rel), encoding="utf-8") as f:
                quelle = f.read()
            baum = ast.parse(quelle)
            # Docstrings auslassen
            doc = {id(k.body[0].value) for k in ast.walk(baum)
                   if isinstance(k, (ast.Module, ast.FunctionDef, ast.ClassDef, ast.AsyncFunctionDef)) and k.body
                   and isinstance(k.body[0], ast.Expr) and isinstance(getattr(k.body[0], "value", None), ast.Constant)}
            aus = docstring_konstanten(baum) | doc
            knoten = list(ast.walk(baum))
            for st in mutationsstellen(baum):
                if id(knoten[st[0]]) in aus:
                    continue
                alle.append((rel, baum, quelle) + st)
        if len(alle) > arg.max:
            schritt = len(alle) / float(arg.max)
            alle = [alle[int(i * schritt)] for i in range(arg.max)]
        getoetet, ueberlebt = 0, []
        for rel, baum, quelle, index, art, zeile, text in alle:
            ziel = os.path.join(tmp, rel)
            try:
                neu = mutiere(baum, index, art)
            except Exception:
                continue
            with open(ziel, "w", encoding="utf-8") as f:
                f.write(neu)
            try:
                r = tests_laufen(grenze)
                tot = r.returncode != 0
            except subprocess.TimeoutExpired:
                tot = True  # Endlosschleife zählt als erkannt
            with open(ziel, "w", encoding="utf-8") as f:
                f.write(quelle)
            if tot:
                getoetet += 1
            else:
                ueberlebt.append("%s:%d %s" % (rel, zeile, text))
        gesamt = getoetet + len(ueberlebt)
        if not gesamt:
            print("FEHLER: keine Mutationsstellen gefunden.")
            sys.exit(1)
        anteil = 100.0 * getoetet / gesamt
        print("Mutationstest: %d von %d Mutanten erkannt (%.0f %%, Schwelle %.0f %%)." % (getoetet, gesamt, anteil,
                                                                                        arg.schwelle))
        for u in ueberlebt[:30]:
            print("  überlebt: " + u)
        if anteil < arg.schwelle:
            print("ERGEBNIS: NICHT OK – an diesen Stellen fehlen Tests.")
            sys.exit(1)
        print("ERGEBNIS: OK")
    finally:
        shutil.rmtree(tmp, ignore_errors=True)


if __name__ == "__main__":
    main()
