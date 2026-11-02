#!/usr/bin/env python3
"""Liefert den Abschlussbericht eines Agenten aus der SubagentStop-Eingabe (JSON auf stdin).

`last_assistant_message` ist bei Hintergrund-Agenten oft leer oder nur die letzte Zeile („Bericht übergeben.“),
wenn der Agent seinen Bericht über das Werkzeug SubagentHandback abgibt. Dann wird aus dem Agenten-Protokoll
(`agent_transcript_path`, JSONL) gelesen: der Handback-Bericht, sonst die letzte Textantwort – es gilt der längere.
Gibt nichts aus, wenn nichts zu finden ist.
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


def _texte(wert):
    if isinstance(wert, str):
        return [wert]
    if isinstance(wert, dict):
        return [t for v in wert.values() for t in _texte(v)]
    if isinstance(wert, list):
        return [t for v in wert for t in _texte(v)]
    return []


def aus_protokoll(pfad):
    """-> (letzte Textantwort, letzter Handback-Bericht)"""
    letzter, handback = "", ""
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
                    if isinstance(teil, dict) and teil.get("type") == "tool_use" and "handback" in str(teil.get("name", "")).lower():
                        h = "\n\n".join(x for x in _texte(teil.get("input")) if x.strip()).strip()
                        if h:
                            handback = h
    except OSError:
        return "", ""
    return letzter, handback


def bericht(eingabe):
    text = str(eingabe.get("last_assistant_message") or "").strip()
    pfad = eingabe.get("agent_transcript_path")
    if isinstance(pfad, str) and pfad:
        letzter, handback = aus_protokoll(pfad)
        kandidaten = [text, handback, letzter]
        return max(kandidaten, key=len)
    return text


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
