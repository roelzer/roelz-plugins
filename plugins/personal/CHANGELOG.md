# Änderungsprotokoll Personaler

## 1.1.0 – Lektionen aus der ersten Einstellung (Video-Editor)

Anlass: Der Video-Editor war sauber, aber ohne Wow. Simon: „okay also auf deutsch video geht nur mit besserer hardware“. Dass Wow 3D braucht und ohne Grafikkarte etwa 55 s pro Bild rendert, fiel erst an Stopp 2 auf.
- `einstellen` Schritt 1: **Maßstab und Machbarkeit prüfen.** Vorbild für „Spitzenniveau“ zeigen lassen, zerlegen und mit einem kleinen Test gegen Simons Hardware messen, bevor gebaut wird.
- `handwerk.md` Abschnitt 9: neun Lektionen aus der Einstellung (Prüfung nicht-textlicher Ausgaben, Schwellen an Negativbeispielen eichen, Muss-Fälle, Pflichtschritte als Sperre, Testläufer-Fallen u. a.).
- Neuer Testfall `grenzfall-hardware` (echter Fall). **Noch nicht gelaufen**, erst bei der nächsten Probearbeit.

## 1.0.0 – Der Personaler

Anlass: Simon: „Ich will einen Agenten für Agentenerstellung, wie eine Art Personaler: Wenn ich schreib, ich will einen neuen Agenten für das und das, dann soll er den erstellen, und zwar so, wie ich das auch machen würde – intensiv recherchieren, was die besten Fachleute in dem Gebiet machen und was man sich von anderen Projekten abschauen kann.“
- `/personal:einstellen`: Bedarf klären (höchstens 5 Fragen, Nullvariante) → Probelauf ohne den Neuen → Profi-Recherche (Fachleute, Agenten-Vorbilder, Werkzeugstand) → **Stopp 1: Stellenausschreibung** mit Testfällen → Bauen in Simons Handschrift → Probearbeit mit `claude plugin eval` (mit/ohne, 3 Läufe) und unabhängigem Prüfer → **Stopp 2** → Einstellen per Pull Request, danach Probezeit.
- `/personal:nachschulen`: Fehler eines bestehenden Mitarbeiters erst als roten Testfall, dann als kleinste Regeländerung; Modi `pruefen` (Keeper-Test) und `modellwechsel`.
- Agent `personal-pruefer`: unabhängiger Prüfer für Ausschreibung, Entwurf und Probearbeit; bekommt die Begründungen des Erbauers nicht.
- Wissen: `handwerk.md` (Bauform, Regelform nach Fehlerart, Checkliste, Testverfahren), `handschrift.md` (wie Simon Agenten haben will). Vorlagen für Stellenausschreibung, Rechercheauftrag, Testfall.
- `scripts/pruefe_agent.py`: statische Prüfung ohne KI (Namen, Beschreibung, Persona-Floskeln, NIE/IMMER, Länge, Plugin-Fallen, Testfall-Format, Fallarten); 14 Tests.
- Eigene Probearbeit (`evals/`, 7 Fälle, je 3 Läufe mit/ohne): alle Fälle mit Personaler 1,00. Deutlichster Unterschied: Kundendaten fürs öffentliche Repo – ohne Personaler schrieb Claude die Telefonnummern in 3 von 3 Läufen in die Datei, mit ihm in keinem (Δ +1,0). Springt nicht bei normalen Programmieraufträgen an und nimmt bei Fehlern bestehender Agenten `nachschulen`. Unter Zeitdruck sprang er zunächst nur in 1 von 3 Läufen an; nach Ergänzung der Beschreibung („auch wenn es eilt“) in 3 von 3, ohne Fehlalarme. Der eigentliche Bauablauf wird erst mit der ersten echten Einstellung (Video-Editor) geprüft.
