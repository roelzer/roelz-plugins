#!/usr/bin/env python3
"""Statische Prüfung neuer Agenten, Skills und Testfälle eines Plugins (ohne KI, ohne Kosten).

Aufruf:  python3 pruefe_agent.py <plugin-ordner> [--min-faelle N]
Ausgabe: Zeilen "FEHLER: …" und "WARNUNG: …", am Ende eine Zusammenfassung.
Exit 0 = keine Fehler (Warnungen möglich), 1 = Fehler, 2 = Aufruf falsch.
Verändert nichts. Bewusst ohne Fremdbibliotheken (läuft auch unter Windows mit reinem Python 3).
"""

import argparse
import os
import re
import sys

AGENT_FELDER = {"name", "description", "tools", "disallowedTools", "model", "effort", "maxTurns", "skills",
                "memory", "isolation", "color", "hooks", "mcpServers", "permissionMode", "omitClaudeMd"}
PLUGIN_IGNORIERT = {"hooks", "mcpServers", "permissionMode"}
SKILL_FELDER = {"name", "description", "argument-hint", "allowed-tools", "disable-model-invocation",
                "user-invocable", "context", "agent", "model", "effort", "when_to_use", "hooks", "paths",
                "shell", "version", "license", "metadata"}
PROMPT_FELDER = {"schema_version", "name", "description", "tags", "plugins", "runs", "expected_outcome",
                 "model", "max_turns", "timeout_seconds", "allowed_tools", "append_system_prompt", "env"}
GRADER_TYPEN = {"regex", "tool_used", "tool_order", "file_exists", "llm", "baseline"}
KOSTENPFLICHTIG = {"llm", "baseline"}
FALLARTEN = ["normal", "grenzfall", "druck", "ablehnen"]
AUSLOESE_ARTEN = ["ausloesen", "nicht-ausloesen"]
PERSONA = re.compile(r"\b(elite[\w-]*|world[- ]class[\w-]*|weltklasse[\w-]*|weltbeste\w*|top[- ]?experte\w*|genius|10x[- ]\w+|"
                     r"rockstar|ninja|legendär\w*)\b", re.I)
ABSOLUT = re.compile(r"\b(NIE|NIEMALS|IMMER|MUSS|MÜSSEN|NEVER|ALWAYS|MUST)\b")
MAX_BESCHREIBUNG = 1536
MAX_ZEILEN = {"agent": 150, "skill": 200}

fehler, warnungen = [], []


def F(text):
    fehler.append(text)


def W(text):
    warnungen.append(text)


def lies(pfad):
    with open(pfad, encoding="utf-8") as d:
        return d.read()


def frontmatter(text):
    """Gibt (felder, rumpf) zurück. Felder: nur oberste Ebene, Wert als Rohtext. None, wenn kein Frontmatter."""
    if not text.startswith("---"):
        return None, text
    teile = text.split("\n")
    try:
        ende = teile[1:].index("---") + 1
    except ValueError:
        return None, text
    felder, schluessel = {}, None
    for zeile in teile[1:ende]:
        if not zeile.strip() or zeile.lstrip().startswith("#"):
            continue
        m = re.match(r"^([A-Za-z_][\w-]*):\s?(.*)$", zeile)
        if m and not zeile.startswith((" ", "\t")):
            schluessel = m.group(1)
            felder[schluessel] = m.group(2).strip()
        elif schluessel:  # eingerückte Fortsetzung oder Liste
            felder[schluessel] = (felder[schluessel] + " " + zeile.strip()).strip()
    return felder, "\n".join(teile[ende + 1:])


def ohne_anfuehrung(wert):
    wert = wert.strip()
    if len(wert) >= 2 and wert[0] == wert[-1] and wert[0] in "'\"":
        return wert[1:-1]
    return wert


def liste(wert):
    wert = wert.strip()
    if wert.startswith("[") and wert.endswith("]"):
        wert = wert[1:-1]
    return [ohne_anfuehrung(x) for x in re.split(r"[,\s]+", wert) if x.strip()]


def pruefe_text(pfad, art, felder, rumpf):
    name = os.path.relpath(pfad)
    beschreibung = ohne_anfuehrung(felder.get("description", ""))
    if not beschreibung:
        F("%s: description fehlt" % name)
    else:
        if len(beschreibung) > MAX_BESCHREIBUNG:
            F("%s: description hat %d Zeichen (höchstens %d, der Rest wird abgeschnitten)"
              % (name, len(beschreibung), MAX_BESCHREIBUNG))
        if len(beschreibung) < 60:
            W("%s: description sehr kurz – fehlen die Auslösesätze („Nutzen bei …“)?" % name)
        if beschreibung.count("→") >= 2 or re.search(r"\b(Schritt \d|1\.\s.*2\.\s)", beschreibung):
            W("%s: description fasst einen Ablauf zusammen – nur was/wann/wann nicht (Agenten folgen sonst der Kurzfassung)"
              % name)
    for treffer in sorted({m.group(0) for m in PERSONA.finditer(beschreibung + "\n" + rumpf)}):
        W("%s: Persona-Floskel „%s“ – bringt nachweislich nichts, Rolle sachlich beschreiben" % (name, treffer))
    absolut = ABSOLUT.findall(rumpf)
    if len(absolut) > 5:
        W("%s: %d-mal NIE/IMMER/MUSS in Großbuchstaben (höchstens 5, je mit Grund; Ausnahmeloses gehört in eine Schranke)"
          % (name, len(absolut)))
    zeilen = sum(1 for z in rumpf.split("\n") if z.strip())
    if zeilen > MAX_ZEILEN[art]:
        W("%s: %d Textzeilen (Ziel unter %d) – Details in Wissensdateien auslagern?" % (name, zeilen, MAX_ZEILEN[art]))


def pruefe_agent(pfad):
    name = os.path.relpath(pfad)
    felder, rumpf = frontmatter(lies(pfad))
    if felder is None:
        F("%s: kein Frontmatter" % name)
        return
    soll = os.path.splitext(os.path.basename(pfad))[0]
    if ohne_anfuehrung(felder.get("name", "")) != soll:
        F("%s: name muss „%s“ heißen (wie die Datei)" % (name, soll))
    for feld in sorted(set(felder) - AGENT_FELDER):
        W("%s: unbekanntes Feld „%s“ – wird still ignoriert? Gegen aktuelle Doku prüfen" % (name, feld))
    for feld in sorted(set(felder) & PLUGIN_IGNORIERT):
        W("%s: Feld „%s“ wird bei Plugin-Agenten ignoriert" % (name, feld))
    if "tools" not in felder:
        W("%s: kein tools-Feld – der Agent erbt alle Werkzeuge; minimale Liste angeben" % name)
    elif {"Agent", "Task"} & set(liste(felder["tools"])):
        F("%s: Agent/Task in tools – Agenten starten keine Agenten" % name)
    if "Agent" not in liste(felder.get("disallowedTools", "")):
        W("%s: disallowedTools: Agent fehlt (Teamregel: Agenten starten keine Agenten)" % name)
    if "CLAUDE_PLUGIN_ROOT" in rumpf:
        W("%s: ${CLAUDE_PLUGIN_ROOT} im Agenten – wird nicht überall ersetzt; Pfad beim Aufruf mitgeben" % name)
    pruefe_text(pfad, "agent", felder, rumpf)


def pruefe_skill(pfad):
    name = os.path.relpath(pfad)
    felder, rumpf = frontmatter(lies(pfad))
    if felder is None:
        F("%s: kein Frontmatter" % name)
        return
    soll = os.path.basename(os.path.dirname(pfad))
    if ohne_anfuehrung(felder.get("name", "")) != soll:
        F("%s: name muss „%s“ heißen (wie der Ordner)" % (name, soll))
    for feld in sorted(set(felder) - SKILL_FELDER):
        W("%s: unbekanntes Feld „%s“ – gegen aktuelle Doku prüfen" % (name, feld))
    beschreibung = ohne_anfuehrung(felder.get("description", "")) + " " + ohne_anfuehrung(felder.get("when_to_use", ""))
    if len(beschreibung.strip()) > MAX_BESCHREIBUNG:
        F("%s: description + when_to_use über %d Zeichen" % (name, MAX_BESCHREIBUNG))
    pruefe_text(pfad, "skill", felder, rumpf)


def pruefe_evals(plugin, hat_skills, min_faelle):
    ordner = os.path.join(plugin, "evals")
    if not os.path.isdir(ordner):
        W("%s: keine Testfälle (evals/) – ohne Probearbeit kein Nachweis" % os.path.relpath(plugin))
        return
    faelle = sorted(d for d in os.listdir(ordner)
                    if os.path.isdir(os.path.join(ordner, d)) and d not in ("results", "mocks"))
    if len(faelle) < min_faelle:
        W("%s: nur %d Testfälle (Ziel mindestens %d)" % (os.path.relpath(ordner), len(faelle), min_faelle))
    alle_tags = set()
    for fall in faelle:
        fpfad = os.path.join(ordner, fall)
        rel = os.path.relpath(fpfad)
        prompt = os.path.join(fpfad, "prompt.md")
        case = os.path.join(fpfad, "case.yaml")
        if not os.path.exists(prompt) and not os.path.exists(case):
            F("%s: weder prompt.md noch case.yaml" % rel)
            continue
        if os.path.exists(prompt):
            felder, rumpf = frontmatter(lies(prompt))
            felder = felder or {}
            for feld in sorted(set(felder) - PROMPT_FELDER):
                F("%s/prompt.md: unbekannter Schlüssel „%s“ (ist bei plugin eval ein Fehler)" % (rel, feld))
            if not rumpf.strip() and not os.path.exists(case):
                F("%s/prompt.md: keine Anfrage im Text" % rel)
            alle_tags.update(liste(felder.get("tags", "")))
        graders_ordner = os.path.join(fpfad, "graders")
        grader = sorted(g for g in os.listdir(graders_ordner) if g.endswith(".md")) if os.path.isdir(graders_ordner) else []
        if not grader and not (os.path.exists(case) and "graders" in lies(case)):
            F("%s: kein Prüfpunkt (graders/*.md)" % rel)
            continue
        typen = []
        for g in grader:
            gfelder, grumpf = frontmatter(lies(os.path.join(graders_ordner, g)))
            typ = ohne_anfuehrung((gfelder or {}).get("type", ""))
            typen.append(typ)
            if typ not in GRADER_TYPEN:
                F("%s/graders/%s: type „%s“ unbekannt (erlaubt: %s)" % (rel, g, typ, ", ".join(sorted(GRADER_TYPEN))))
            if typ == "llm" and not ("PASS if" in grumpf and "FAIL if" in grumpf):
                W("%s/graders/%s: llm-Prüfpunkt ohne „PASS if …“ und „FAIL if …“" % (rel, g))
        if grader and all(t in KOSTENPFLICHTIG for t in typen):
            W("%s: nur kostenpflichtige Prüfpunkte – mindestens einen regex/file_exists/tool_used ergänzen" % rel)
    soll = FALLARTEN + (AUSLOESE_ARTEN if hat_skills else [])
    fehlend = [t for t in soll if t not in alle_tags]
    if faelle and fehlend:
        W("%s: Fallarten fehlen: %s" % (os.path.relpath(ordner), ", ".join(fehlend)))
    gitignore = [os.path.join(plugin, ".gitignore")]
    d = os.path.abspath(plugin)
    while True:
        gitignore.append(os.path.join(d, ".gitignore"))
        if os.path.isdir(os.path.join(d, ".git")) or os.path.dirname(d) == d:
            break
        d = os.path.dirname(d)
    if not any(os.path.exists(g) and re.search(r"evals/results", lies(g)) for g in gitignore):
        W("evals/results/ steht in keiner .gitignore – Ergebnisse gehören nicht ins Repo")


def main():
    a = argparse.ArgumentParser(description=__doc__.split("\n")[0])
    a.add_argument("plugin")
    a.add_argument("--min-faelle", type=int, default=10)
    arg = a.parse_args()
    plugin = arg.plugin
    if not os.path.isdir(plugin):
        print("Ordner nicht gefunden: %s" % plugin)
        return 2
    agenten_ordner = os.path.join(plugin, "agents")
    skills_ordner = os.path.join(plugin, "skills")
    agenten = sorted(os.path.join(agenten_ordner, n) for n in os.listdir(agenten_ordner)
                     if n.endswith(".md")) if os.path.isdir(agenten_ordner) else []
    skills = sorted(os.path.join(skills_ordner, n, "SKILL.md") for n in os.listdir(skills_ordner)
                    if os.path.exists(os.path.join(skills_ordner, n, "SKILL.md"))) if os.path.isdir(skills_ordner) else []
    if not agenten and not skills:
        F("%s: weder agents/*.md noch skills/*/SKILL.md gefunden" % plugin)
    for p in agenten:
        pruefe_agent(p)
    for p in skills:
        pruefe_skill(p)
    if not os.path.exists(os.path.join(plugin, ".claude-plugin", "plugin.json")):
        W("%s: .claude-plugin/plugin.json fehlt (nur bei eigenständigen Plugins nötig)" % plugin)
    pruefe_evals(plugin, bool(skills), arg.min_faelle)
    for t in fehler:
        print("FEHLER: " + t)
    for t in warnungen:
        print("WARNUNG: " + t)
    print("%s: %d Agent(en), %d Skill(s) – %d Fehler, %d Warnung(en)"
          % ("OK" if not fehler else "NICHT OK", len(agenten), len(skills), len(fehler), len(warnungen)))
    return 1 if fehler else 0


if __name__ == "__main__":
    sys.exit(main())
