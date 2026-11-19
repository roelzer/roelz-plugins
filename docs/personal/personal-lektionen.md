# Erkenntnisse für den Personaler selbst (Material für /personal:nachschulen)

Aus der ersten echten Einstellung (Video-Editor, 18.11.2026), gefunden vom personal-pruefer. Wird nach Abschluss der Einstellung in `plugins/personal/wissen/handwerk.md` übernommen – jeweils erst als Testfall, dann als Regel.

1. **Ausgaben, die ein Text-Prüfer nicht sehen kann** (Video, Bild, Ton): Qualitätsfälle in drei Schichten – Weg-Prüfung im Eval, festes Messskript über beide Arme, externer (nicht plugin-eigener) Kritiker als Vorfilter; der Mensch entscheidet.
2. **Messschwellen an den Negativbeispielen des Probelaufs eichen** – eine Schwelle, an der die schlechten Probelauf-Ergebnisse bestehen, prüft nichts (Beispiel: `freezedetect` mit Standardwert fand in den schlechten Videos nichts).
3. **Muss-Fälle müssen die schlechte Handlung ermöglichen** – sonst bestehen sie von selbst (Werkzeugfreigabe breit genug; auch ein von einer Sperre geblockter Versuch zählt als Fehlschlag).
4. **Probelauf-Material dauerhaft ablegen** (Aufträge wörtlich, Testdaten bzw. Bezugsquelle, Kontaktbögen) und als Vergleich lieber den Ohne-Arm des Evals nehmen als alte Einzelergebnisse.
5. **Maßstab „Spitzenniveau“ vom Menschen holen** (Vorbilder, Urteil über die Probelauf-Ergebnisse), nicht „besser als der Probelauf“.
6. **Vergleichsbasis festlegen**, wenn es fertige Werkzeug-Skills gibt (z. B. „Claude + HyperFrames-Skills“), damit Δ den eigenen Beitrag misst.
7. **Zielplattform des Menschen prüfen** (hier Windows): Hooks und Skripte plattformneutral, Rauchtest auf seinem Rechner vor „eingestellt“.
8. **Maßstab und Machbarkeit früh prüfen:** Simons Vorbild (ein 3D-Short) erst an Stopp 2 ernst genommen; dabei zeigte sich, dass Wow 3D braucht und ohne Grafikkarte ca. 55 s pro Bild rendert. Gehört in Schritt 1 mit einem kleinen Test.
9. **Pflichtschritte als Sperre:** Bei reinen Schnitten wurde weder gemessen noch der Kritiker gerufen, bis ein Stop-Hook es erzwang.

Übernommen in `plugins/personal/wissen/handwerk.md` Abschnitt 9 und `einstellen` Schritt 1 (Personaler 1.1.0). Testfall dazu: `evals/grenzfall-hardware`.
10. **Beispielseite muss den Maßstab zeigen, nicht nur sauber sein** (Website-Bauer, 19.11.2026): Simon zur ersten Beispielseite: „4K, 3D oder Apple-Design ist gar nicht drin“. Wenn das Vorbild 3D ist (Lando, Igloo), braucht Stopp 1 mindestens eine Richtung mit echtem 3D-Objekt aus dem Auftraggeber (z. B. Logo als Metall-Abzeichen). Typografie-Effekte allein gelten nicht als 3D.
11. **Bekannte Regel, trotzdem gebrochen** (Website-Bauer, 19.11.2026): „Kursive Serife“ stand schon als KI-Merkmal in `handwerk.md`, wanderte aber als zweite Zeile und Einschub aus der alten Seite mit. Simon: „diese kursiv schrift is auch KI typisch“. Gegenmittel: Die Regel zählt jede Form auf, und das Prüfskript meldet sie als P0. Merksatz: Eine Regel ohne Messung hält nicht, wenn Material vom Auftraggeber sie mitbringt.
12. **3D-Rückmeldungen sind handwerklich und konkret** („Kanten wie so abgerundet“, „Rand gleiches Grün“, „Ball nicht rund“): Jede wurde als Zahl ins Rezept übernommen (Fasenstufen, ein Material, Relief statt Kugel). So muss der nächste Lauf nicht neu fragen.
