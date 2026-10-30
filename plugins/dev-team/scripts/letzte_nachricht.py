#!/usr/bin/env python3
"""Liefert den Abschlussbericht eines Agenten aus der SubagentStop-Eingabe (JSON auf stdin).

`last_assistant_message` ist bei Hintergrund-Agenten oft leer – dann standen in docs/pruefberichte/
nur Kopfzeilen. In dem Fall wird die letzte Textantwort aus dem Agenten-Protokoll
(`agent_transcript_path`, JSONL) gelesen. Gibt nichts aus, wenn nichts zu finden ist.
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


def aus_protokoll(pfad):
    letzter = ""
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
                t = text_aus_inhalt(m.get("content") if isinstance(m, dict) else "").strip()
                if t:
                    letzter = t
    except OSError:
        return ""
    return letzter


def bericht(eingabe):
    text = str(eingabe.get("last_assistant_message") or "").strip()
    if text:
        return text
    pfad = eingabe.get("agent_transcript_path")
    return aus_protokoll(pfad) if isinstance(pfad, str) and pfad else ""


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
