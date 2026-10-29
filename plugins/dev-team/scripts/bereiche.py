"""Bereiche des Projekts (Tests, Testkonfig, Referenzwerte, Code …) laut team.json.

Wird von der Test-Schranke (pruefe_tests.py) und geschuetzt_schreiben.py benutzt. Früher Teil des großen
Wächters; seit 3.11 ist der Wächter ein kleines Bash-Skript und diese Hilfen stehen hier allein.
"""

import re


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


def bereich_von(relpfad, team):
    b = team["bereiche"]
    for name in b["reihenfolge"]:
        if passt(relpfad, b[name]):
            return name
    return "code"
