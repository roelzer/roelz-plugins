# Fachwissen-Bibliothek

Gemeinsames Fachwissen für **alle Projekte** eines Fachgebiets, auf allen Rechnern (über GitHub verteilt). Neue Projekte im selben Fachgebiet starten mit diesen Regeln.

Eine Datei pro Fachgebiet, z. B. `waermenetz.md`. Aufbau wie `fachwissen/regeln.md` im Projekt.

## Was hier hinein darf
- Nur **allgemein gültiges** Fachwissen: Physik, Normen, Lehrbuchwissen, allgemeine Planungsgrundsätze.
- Jede Regel mit öffentlicher Quelle oder als „Grundsatz, von Simon bestätigt“.
- Nur von Simon bestätigte Regeln.

## Was **nicht** hier hinein darf
- Interne Werte und Unterlagen eines Arbeitgebers oder Kunden (Firmen-Grenzwerte, Inhalte aus internen Handbüchern, Preislisten, Projektdaten). Die bleiben in `fachwissen/` des jeweiligen Projekts.
- Kunden-, Firmen- oder Projektnamen.

## Ablauf
1. Simon bestätigt im Projekt eine Fachregel.
2. Projektleiter fragt: „Gilt das allgemein für das ganze Fachgebiet?“
3. Wenn ja und die Regel ist frei von internen Werten: Eintrag hier, Commit und Push im Plugin-Repo.
4. Beim Start eines Projekts im selben Fachgebiet werden die Regeln von hier in dessen `fachwissen/regeln.md` übernommen (mit Verweis „aus Bibliothek“).
