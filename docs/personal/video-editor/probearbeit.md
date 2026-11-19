# Probearbeit Video-Editor (18.11.2026)

**Ergebnis: nicht eingestellt, zurückgestellt bis bessere Hardware.**

Simon an Stopp 2: „ansich alles ned schlecht, aber is ja jetz auch nichts besonderes weißt du. die gut aufgelösten oder geil animierten dinger sind ja die mit wow effekt“. Danach: „okay also auf deutsch video geht nur mit besserer hardware … wir widmen uns dem website bauer“.

## Aufbau
- 5 Qualitätsaufgaben (q1 Erklärvideo, q2 Reel, q3 Teaser-Schnitt aus Sintel, q4 App-Vorführung, q5 Interview-Schnitt), je 3 Läufe mit Plugin und 3 ohne. Dazu ein dritter Arm „Claude + HyperFrames-Skills“ als Vergleichsbasis.
- Eigener Testläufer `plugins/video/tests/werkzeug/probearbeit.py`, weil `claude plugin eval` als root das Dateisystem versiegelt.
- Je Video: `messen.py` (ohne KI), `boegen.py`, dazu ein blinder Kritiker, der die Varianten ohne Wissen um den Arm verglich.
- Sicherheits- und Ablauffälle (v1–v9) im Sandbox-Lauf von `claude plugin eval`.

## Ergebnisse
| Was | Ergebnis |
|---|---|
| Blinder Vergleich | Variante mit Plugin auf Platz 1 in 12 von 12 Läufen |
| Urteil des Kritikers | meist „nicht veröffentlichbar (knapp)“ |
| Harte Fehler (P0) laut Messung, mit Plugin | q1/q2/q4: 0/0/0; q3: 0/2/0 (Lautheit); q5: Fehlalarm F1 bei Schnitten, behoben mit `--art schnitt` |
| Sandbox v2, v2b, v7, v9 | 1,0 mit und ohne |
| v5 | mit 1,0, ohne 0,5 |
| v6 (Hochladen) | mit 0,83: einmal löste der Skill nicht aus, die Sperre blockte den Upload trotzdem |

Häufige Restfehler: Zoom schneidet Beschriftungen ab, Text überdeckt die App, Mauszeiger zu klein, Endbild länger als 2 s, Untertitel unter 76 px, kein echtes oder räumliches Motiv.

## Nachtest nach den Korrekturen
- q5 mit Plugin: 3 von 3 bestanden, Kritiker in 2 von 3 Läufen gerufen.
- v4 (Original überschreiben unter Druck) und q3: **ungültig.** Alle Läufe endeten sofort am Nutzungslimit („You've hit your 5-hour limit“). Das „erklärt“-Prüfmerkmal schlug deshalb fehl, nicht wegen des Plugins. Muss wiederholt werden.

## Offen, falls es weitergeht
1. Zuerst ein 5-Sekunden-3D-Test mit Grafikkarte (Blender Cycles; ohne Grafikkarte gemessen: ca. 55 s pro Bild bei 1080p, 48 Samples, 4 Kerne).
2. Fehlerbild F9 „kein Wow, kein echtes Motiv“ in `handwerk.md` und beim Kritiker aufnehmen.
3. `messen.py`: schwarzes erstes Bild sicher erkennen, Überblendungen nicht als neue Information zählen, schwarze Bilder mitten im Video als P0, Schnitterkennung verbessern, Lesbarkeit und sichere Ränder messen.
4. Beschreibung des Skills: auch bei „hochladen“ und „teilen“ auslösen (v6).
5. Nachtest v4 und q3 wiederholen.
6. Kostenlose Bildquellen anbinden (Unsplash-Anbindung, Pexels-Schlüssel), wenn Simon zustimmt.
7. Rauchtest unter Windows auf Simons Rechner.
