#!/usr/bin/env python3
"""Liefert den Abschlussbericht eines Agenten aus der SubagentStop-Eingabe (JSON auf stdin).

`last_assistant_message` ist bei Hintergrund-Agenten oft leer – dann standen in docs/pruefberichte/
nur Kopfzeilen. Nur lesende Prüfer geben ihren Bericht außerdem über das Werkzeug SubagentHandback
zurück; ihre letzte Textzeile ist dann nur „Bericht übergeben“. Deshalb wird das Agenten-Protokoll
(`agent_transcript_path`, JSONL) gelesen: zuerst der Inhalt der letzten Berichtsübergabe, sonst die
letzte Textantwort. Gibt nichts aus, wenn nichts zu finden ist.
"""
import io
import json
import sys


def text_aus_inhalt(inhalt):
    if isinstance(inhalt, str):
        return inhalt
    if isinstance(inhalt, list):
        return "\n".join(t.get("text", "") for t in inhalt if isinstance(t, dict) and t.get("type") == "text")
    return ""


# Felder, in denen eine Berichtsübergabe ihren Text trägt (das erste gefüllte zählt).
UEBERGABE_FELDER = ("report", "bericht", "result", "message", "content", "text", "summary")


def text_aus_uebergabe(eingabe):
    if isinstance(eingabe, str):
        return eingabe
    if not isinstance(eingabe, dict):
        return ""
    for feld in UEBERGABE_FELDER:
        wert = eingabe.get(feld)
        if isinstance(wert, (str, list)) and text_aus_inhalt(wert).strip():
            return text_aus_inhalt(wert)
    return "\n\n".join(str(v) for v in eingabe.values() if isinstance(v, str) and v.strip())


def aus_protokoll(pfad):
    """-> (Text der letzten Berichtsübergabe, letzte Textantwort)"""
    uebergabe, letzter = "", ""
    try:
        with open(pfad, encoding="utf-8", errors="replace") as f:
            for zeile in f:
                try:
                    e = json.loads(zeile)
                except ValueError:
                    continue
                if not isinstance(e, dict) or e.get("type") != "assistant":
                    continue
                m = e.get("message") or {}
                inhalt = m.get("content") if isinstance(m, dict) else ""
                t = text_aus_inhalt(inhalt).strip()
                if t:
                    letzter = t
                for teil in inhalt if isinstance(inhalt, list) else []:
                    if isinstance(teil, dict) and teil.get("type") == "tool_use" \
                            and str(teil.get("name", "")).endswith("Handback"):
                        u = text_aus_uebergabe(teil.get("input")).strip()
                        if u:
                            uebergabe = u
    except OSError:
        return "", ""
    return uebergabe, letzter


def bericht(eingabe):
    pfad = eingabe.get("agent_transcript_path")
    uebergabe, letzter = aus_protokoll(pfad) if isinstance(pfad, str) and pfad else ("", "")
    if uebergabe:
        return uebergabe
    return str(eingabe.get("last_assistant_message") or "").strip() or letzter


def main():
    try:
        sys.stdout.reconfigure(encoding="utf-8", errors="replace")
        roh = io.TextIOWrapper(sys.stdin.buffer, encoding="utf-8", errors="replace").read()
        eingabe = json.loads(roh or "{}")
    except (ValueError, AttributeError):
        return 0
    if isinstance(eingabe, dict):
        sys.stdout.write(bericht(eingabe))
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception:
        sys.exit(0)
