---
name: recherche
description: Recherchiert Fachgrundlagen zu einem Thema mit zwei Instanzen (rechercheur sucht, quellenpruefer prüft gegen zweite Quelle) und legt das Ergebnis als Vorschlag in die Wissensbasis fachwissen/. Simon bestätigt, was davon zur Fachregel wird. Auch zum ersten Aufbau der Wissensbasis eines Projekts.
argument-hint: "[Thema oder Fachfrage]"
---

# Fachrecherche

Thema: `$ARGUMENTS` (fehlt es, frag danach).

## Ablauf
1. **Vorbereiten:** Lege, falls nicht vorhanden, an:
   ```
   fachwissen/
     regeln.md        ← aus ${CLAUDE_PLUGIN_ROOT}/vorlagen/fachregeln.md
     quellen/         ← eigene Unterlagen von Simon (Handbücher, Datenblätter, Tabellen)
     recherche/       ← Rechercheberichte
   ```
   Ist `quellen/` leer: Simon kurz darauf hinweisen, dass eigene Unterlagen die beste Quelle sind, und trotzdem weitermachen.
2. **Thema schärfen:** Formuliere 1–5 konkrete Fachfragen (z. B. „Welche Formel für den Druckverlust in Rohren, für welchen Bereich gültig?“). Bei breiten Themen: in mehrere Fragen teilen.
3. **Rechercheur:** Agent `rechercheur` mit den Fragen und dem Fachgebiet aus der Projekt-`CLAUDE.md`.
4. **Quellenprüfer:** Agent `quellenpruefer` mit dem Pfad der Recherche-Datei.
5. **In die Wissensbasis:** Trage jede Aussage mit Sicherheit „hoch“ oder „mittel“ in `fachwissen/regeln.md` unter „Vorgeschlagen“ ein, mit Verweis auf die Recherche-Datei. Unsichere Aussagen bleiben nur in der Recherche-Datei.

## Bericht an Simon
- **Ampel** des Quellenprüfers.
- Die vorgeschlagenen Regeln und Werte, je mit Sicherheit und Quelle, in einfacher Sprache.
- Widersprüche und offene Punkte.
- Frage: „Welche davon sollen bestätigte Regeln werden?“

Erst nach Simons Bestätigung wandert ein Eintrag nach „Bestätigt“. Bestätigte Regeln werden im nächsten Auftrag als Plausibilitätsprüfung im Code umgesetzt (zuerst rot am alten Stand, dann beheben).
