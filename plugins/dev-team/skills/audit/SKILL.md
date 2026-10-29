---
name: audit
description: Unabhängiges Audit des Dev-Teams oder eines Projekts durch den auditor, danach Behebung durch den Projektleiter in kleinen Schritten und Nachprüfung durch einen frischen auditor. Mit Bericht in docs/.
disable-model-invocation: true
argument-hint: "[plugin | projekt]"
---

# Audit durchführen

Gegenstand: `$ARGUMENTS` (leer = `plugin`, wenn du im Plugin-Repo stehst, sonst `projekt`). Du bist der Projektleiter. Der Prüfer und der Behebende sind absichtlich verschiedene Instanzen.

## 1. Vorbereiten
- `git status` muss sauber sein. Sonst Simon fragen.
- Gegenstand `plugin`: das Plugin-Repo (alle Agenten, Skills, Hooks, Skripte, Vorlagen, Anleitung). Gegenstand `projekt`: das aktuelle Projekt inklusive Projekt-`CLAUDE.md`, Tests, Referenzfälle, Fachregeln, Sicherheit, Betrieb.
- Lege `docs/` an, falls nötig. Eine Zeile an Simon: „→ Auditor prüft jetzt …“.

## 2. Audit
Starte den Agenten `auditor` mit dem Gegenstand, dem Pfad und, falls vorhanden, dem Projektauftrag als Maßstab. Gib ihm **nicht** deine Meinung zur Qualität mit. Speichere seinen Bericht unverändert als `docs/AUDIT-<version-oder-datum>.md`. Kontrolliere danach mit `git status`, dass er nichts anderes geändert hat.

**Stopp 1:** Zeige Simon Note, Ampel, die zehn Schwachstellen in einfacher Sprache und deinen Maßnahmenplan. Frag, ob alles wie vorgeschlagen behoben werden soll. Solange nichts entschieden ist, wird nichts geändert.

## 3. Beheben
Nach Freigabe, jeweils ein Commit pro Maßnahme, nach den Regeln im Grundgesetz (Arbeitsbranch, keine stillen Lockerungen, Belegpflicht). Nach jeder Änderung die Prüfungen erneut ausführen, die der Auditor genannt hat (`claude plugin validate --strict`, `scripts/pruefe-plugin.sh`, die Plugin-Tests `python3 -m unittest discover -s plugins/dev-team/tests`). Dokumentiere Änderungen in der Changelog-Datei des Plugins. Was du nicht sicher beheben kannst, steht als offen im Bericht.

## 4. Nachprüfung
Starte einen **neuen** `auditor` (frischer Kontext) mit dem Auftrag, den Stand nach den Änderungen zu prüfen und für jeden früheren Befund zu sagen: behoben / teilweise / offen / neu verursacht. Hänge sein Ergebnis an den Bericht an.

## 5. Abschlussbericht an Simon
Ampel zuerst. Dann: vorgenommene Änderungen, bestandene und fehlgeschlagene Prüfungen, **nicht durchgeführte** Prüfungen mit Grund, offene Risiken, ehrliche Einschätzung, was das Team wirklich zuverlässig leisten kann. Maximal fünf Punkte plus Verweis auf die Berichtsdatei.
