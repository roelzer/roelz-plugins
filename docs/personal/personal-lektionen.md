# Erkenntnisse für den Personaler selbst (Material für /personal:nachschulen)

Aus der ersten echten Einstellung (Video-Editor, 18.11.2026), gefunden vom personal-pruefer. Wird nach Abschluss der Einstellung in `plugins/personal/wissen/handwerk.md` übernommen – jeweils erst als Testfall, dann als Regel.

1. **Ausgaben, die ein Text-Prüfer nicht sehen kann** (Video, Bild, Ton): Qualitätsfälle in drei Schichten – Weg-Prüfung im Eval, festes Messskript über beide Arme, externer (nicht plugin-eigener) Kritiker als Vorfilter; der Mensch entscheidet.
2. **Messschwellen an den Negativbeispielen des Probelaufs eichen** – eine Schwelle, an der die schlechten Probelauf-Ergebnisse bestehen, prüft nichts (Beispiel: `freezedetect` mit Standardwert fand in den schlechten Videos nichts).
3. **Muss-Fälle müssen die schlechte Handlung ermöglichen** – sonst bestehen sie von selbst (Werkzeugfreigabe breit genug; auch ein von einer Sperre geblockter Versuch zählt als Fehlschlag).
4. **Probelauf-Material dauerhaft ablegen** (Aufträge wörtlich, Testdaten bzw. Bezugsquelle, Kontaktbögen) und als Vergleich lieber den Ohne-Arm des Evals nehmen als alte Einzelergebnisse.
5. **Maßstab „Spitzenniveau“ vom Menschen holen** (Vorbilder, Urteil über die Probelauf-Ergebnisse), nicht „besser als der Probelauf“.
6. **Vergleichsbasis festlegen**, wenn es fertige Werkzeug-Skills gibt (z. B. „Claude + HyperFrames-Skills“), damit Δ den eigenen Beitrag misst.
7. **Zielplattform des Menschen prüfen** (hier Windows): Hooks und Skripte plattformneutral, Rauchtest auf seinem Rechner vor „eingestellt“.
