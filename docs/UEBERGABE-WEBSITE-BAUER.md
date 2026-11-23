# Übergabe: Website-Bauer weiterentwickeln (Stand 23.11.2026)

Für die nächste Sitzung mit Simon. Erst ganz lesen, dann `plugins/personal/wissen/handwerk.md` (Abschnitt 9) und `plugins/website/skills/bauen/SKILL.md`.

## Simon in einem Absatz
- Spricht Deutsch, ist kein Programmierer und will kurze, ehrliche Antworten mit Empfehlung.
- Will **„das Beste vom Besten“**. Vorbilder: **landonorris.com** und **igloo.inc**.
- Wow heißt für ihn: echtes 3D, gestochen scharf, Apple-Design, aber **nicht laut**.
- Nur kostenlose Werkzeuge. Nichts geht ohne sein Ja nach außen.
- Sein Geschmack steht jetzt in `plugins/website/wissen/handwerk.md` Abschnitt 10.
- Laptop: 8 GB RAM, keine eigene Grafikkarte.

## Stand
- **Website-Bauer** (`plugins/website`, **0.3.0, nach der Probearbeit umgebaut, nicht eingestellt**). Alle Unterlagen in `docs/personal/website-bauer/`.
- **Tests:** `python3 -m pytest plugins/website/tests`: 40 grün (23.11.2026, Dauer etwa 7 Minuten).
- **Testfälle (Evals):** 17, neu sind `k2-altbestand` und `k3-wunsch-erhalten`. Läufer: `tests/werkzeug/probearbeit.py`.

## Was am 19.11. im Test mit der Vereinsseite (SFH) entstand
Simon hat den Test für beendet erklärt. Die SFH-Seite selbst arbeitet er im Chat zum Vereins-Repo weiter (privates Repo, Fahrplan in dessen `docs/FAHRPLAN.md`).
- **3D-Wappen:**
  - Sauber als Vektor nachgebaut (Abweichung 8 % zum Original), dann als Metall-Abzeichen in 3D.
  - Simons Runden: Rand im gleichen Grün, mehr Relief innen, Ball als flaches Relief statt Kugel, scharfe Kanten.
  - Skripte im Vereins-Repo unter `neubau/wappen-v2/werk/`.
- **Startseite „Es werde Licht“:**
  - Nacht am Irle in 3D (Platz, Flutlichtmasten, Lichtkegel). Beim Scrollen gehen die Masten an, das Wappen dreht sich nach vorn, dann wird es Tag mit „Grün-Weiß. Ein Leben lang.“
  - Danach hell und ruhig, Spieltag live vom BFV, seitlich laufende Chronik.
  - Alle Unterseiten hell.
  - Online unter der Cloudflare-Testadresse, veröffentlicht von Hand über die Cloudflare-Schnittstelle.
- **Simons Urteil im Verlauf:** „mega“, „finde es cool“. Meine eigene Einschätzung gegen Lando: Einstieg etwa 3,5 von 5, ganze Seite etwa 3.

## Was ins Plugin nachgeschult wurde
- **0.2.2:**
  - Kursive Serife ist ein P0 im Prüfskript.
  - Hausschrift mit nur einer Stärke wird über eine Kontur kräftiger.
  - Neues Rezept „Logo oder Wappen als 3D-Objekt“ in `3d-leistung.md`.
- **0.2.3:**
  - Neues Skript `ablauf.mjs` für Bildserien vom Scroll-Ablauf.
  - Prüfskript: neue Prüfung W10 (überlappender Text), Fehlalarme zurückgenommen (Daten-Blöcke, gewollt dunkle Szenen, Server-Schnittstelle in der lokalen Vorschau).
  - Skill: Stopp 1 knapp, früher Entwurf, Fragen nach Betrieb (Domain, E-Mail, Webspace, Pflege), Altbestand prüfen, Klassen mit Präfix, „fertig“ erst nach Simons Laptop-Test, automatisches Veröffentlichen gehört zur Abgabe, Webspace als Alternative.
  - Einzelfälle mit Begründung: `docs/personal/personal-lektionen.md` Punkte 10 bis 12.

- **0.2.4** (zehn Funde aus der Durchsicht des Entwurfs durch eine zweite Sitzung):
  - `leistung.mjs` (Lighthouse Handy ≥ 90, von der Abschluss-Sperre verlangt).
  - Neue Prüfungen: künstlich kursiv, Bühnenlänge, ohne JavaScript, Ballast, Quellenangaben.
  - Wunschliste bei Umbauten Pflicht, Müll-Sperre.
  - Regeln in `handwerk.md` Abschnitt 11.
  - Gegenprobe am alten und am aufgeräumten SFH-Stand: alt schlägt überall an, aufgeräumt null harte Befunde.

## Probearbeit (20.11.2026) und Umbau auf 0.3.0
- **Ergebnis automatisch:** Große Aufträge mit Plugin 1,00 und null harte Befunde (Firma, Verein, Schreinerei), ohne Plugin 0,60–0,71. Haus in 3D beide Arme 0,25, mit Plugin zweimal ins Zeitlimit von 60 Minuten. Kosten der großen Läufe etwa 34 $.
- **Simons Urteil:** „haut mich jetz alles nicht so um“. Meins: 2 bis 3 von 5 gegen Lando, alle mit demselben Einstieg (Überschrift, zwei Knöpfe, Bild).
- **Ursache:** Die Prüfungen zählten Fehler, nicht das Besondere, und ohne Simon an den Haltepunkten fehlte das Nachsteuern.
- **Umbau 0.3.0 (Simon: „ja passt dann so umbauen“):** Hauptidee als Pflicht, Stopp 1b Entwurf, Kritiker mit Merk-Urteil, 3D klein planen, Sperre und Testfälle. Einzelheiten im CHANGELOG.
- **Nächster Schritt:** Die Schreinerei (q3) neu bauen lassen, mit Simon an Stopp 1 und 1b. Erst wenn er dort „wow“ sagt, wieder eine Probearbeit.
- Alle Seiten der Probearbeit als einzelne HTML-Dateien hat Simon bekommen (Packer im Scratchpad der Sitzung, nicht im Repo).

## Ehrlich offen
1. **Der formale Ablauf lief im Test nicht vollständig:** kein Kritiker-Agent, keine drei Vorbild-Fotos, kein blinder Vergleich. Für die Probearbeit zählt der Lauf nur halb.
2. **Konto-Skill `website-bauen` abschalten** (Simon hat zugestimmt): Er lief in der Probearbeit auch im Arm ohne Plugin mit und verfälscht den Vergleich.
3. **Veröffentlichen ohne Wrangler-Anmeldung** ging nur mit viel Handarbeit über die Cloudflare-Schnittstelle (Manifest, Upload-Sitzung, Worker hochladen). Ein Skript, das das in einem Schritt mit einem API-Token erledigt, fehlt. Ungetestet nicht einbauen.
4. **Prüfskript:** Abgeschnittene Inhalte (overflow) und ein fehlendes Handy-Menü erkennt es weiterhin nicht.
5. **Leistung:** Ohne Grafikkarte nicht messbar. Simons Laptop entscheidet.

## Sicherheit und Regeln (unverändert wichtig)
- Öffentliches Repo: keine Kunden-, Firmen- oder Privatdaten, keine echten Personenfotos.
- Arbeitgeber-Name nie nennen. Die alte Git-Historie ist noch offen und wird nur auf Simons Wort umgeschrieben.
- Merge, Push in fremde Repos und alles nach außen nur auf Simons Wort.
- Gehirn (`roelzer/brain`): Regeln in dessen CLAUDE.md.
