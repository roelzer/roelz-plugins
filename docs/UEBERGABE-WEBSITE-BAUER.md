# Übergabe: Website-Bauer weiterentwickeln (Stand 19.11.2026)

Für die nächste Sitzung mit Simon. Erst ganz lesen, dann `plugins/personal/wissen/handwerk.md` (Abschnitt 9) und `plugins/website/skills/bauen/SKILL.md`.

## Simon in einem Absatz
Deutsch, kein Programmierer, kurz und ehrlich mit Empfehlung antworten. Will **„das Beste vom Besten“**: Vorbilder **landonorris.com** und **igloo.inc** (Awwwards Site of the Year 2025/2024). Wow heißt für ihn **echtes 3D, gestochen scharf („4K“), Apple-Design**, aber **nicht laut** („sehr in die fresse, könnte dezenter sein“). Nur kostenlose Werkzeuge. Nichts geht ohne sein Ja nach außen. Laptop: 8 GB RAM, keine eigene Grafikkarte; landonorris.com läuft dort, beim Scrollen könnte es flüssiger sein.

## Was in den Sitzungen vom 17.–19.11. entstand
- **Personaler** (`plugins/personal`, 1.1.0): stellt Agenten ein (Probelauf ohne → Profi-Recherche → Stellenausschreibung → Bau → Probearbeit). Lektionen in `handwerk.md` Abschnitt 9, Einzelfälle in `docs/personal/personal-lektionen.md`.
- **Video-Editor** (`plugins/video`, 0.1.1): **zurückgestellt bis bessere Hardware**. Wissen im Gehirn („Video-Produktion mit Claude“).
- **Website-Bauer** (`plugins/website`, **0.2.0, in Probearbeit, nicht eingestellt**). Alle Unterlagen in `docs/personal/website-bauer/`:
  - Bedarf, Probelauf (4 Seiten, Fehler W1–W9), Recherche in 6 Strängen (Studios, Agenten, Werkzeuge, Preisträger gemessen, Sicherheit, Recht)
  - Muster (Hocker-3D)
  - Stellenausschreibung, von Simon freigegeben mit diesen Entscheidungen: veröffentlichen nur auf sein Ja über Cloudflare, Probearbeit als Sparvariante mit 2 Läufen
  - **Bestandteile:**
    - Skill `/website:bauen`, Agent `website-kritiker`
    - `scripts/pruefen.mjs`: misst ohne KI (KI-Look, Kontrast aus Pixeln, leere Flächen, Sicherheit, Recht), geeicht an den Probelauf-Seiten
    - `scripts/kopfzeilen.mjs`: Sicherheits-Header mit CSP-Hashes
    - `scripts/foto.mjs`
    - Sperren: Veröffentlichen nur mit Rückfrage, keine fremden Server, Abschluss-Sperre (Prüfung, 3 Vorbilder, Kritik)
    - Wissen: handwerk, 3d-leistung, bilder, sicherheit, recht
    - 15 Testfälle mit eigenem Läufer `tests/werkzeug/probearbeit.py`
  - **Tests:** `python3 -m pytest plugins/website/tests` (25 grün, Eichung dauert ~4 Min).

## Beispiel: Neubau der Vereinsseite (Simons privates Vereins-Repo)
- Nach dem Ablauf gebaut: Stopp 1 mit drei Richtungen, Simon wählte A+C. Drei Kritiker-Runden (6,4 → 6,6 → behoben). Danach Simons Wünsche:
  - Hausschrift Kelly Slab bleibt,
  - Spruch „Grün-Weiß. ein Leben lang.“,
  - dezenter,
  - dicke 77.
- **Simons Urteil (19.11.):** „zwei coole Sachen drin, aber 4K, 3D oder Apple-Design ist gar nicht drin, typische KI-Sachen teilweise drin, das ist noch nicht das, wo ich hin will.“
- **Danach gebaut: Muster 3D-Wappen in Metall-Optik.** Simon wünschte ausdrücklich „ein geiles 3D-Modell vom SFH-Logo, in so ner Metall-Optik, aber schon grün-weiß“.
  - Weg: Wappen-PNG → Masken → potrace → SVG → three.js `ExtrudeGeometry`, silberne Basis plus grün lackierte erhabene Teile, eigenes Studio-Licht über PMREM.
  - Funktioniert, auch als Einzeldatei.
  - Die Kanten sind vom Nachzeichnen noch nicht perfekt.
- **Ablage:** lokaler Commit auf Branch `claude/neubau-website-bauer` im privaten Vereins-Repo (Ordner `neubau/` mit `site/`, `arbeit/`, `3d-wappen/` und READMEs). **Nicht gepusht:** Die Sicherheitsprüfung hat den Push angehalten, Simon muss ihn erlauben. Geht die alte Sitzung verloren, ist der Stand nur noch in den Dateien, die Simon geschickt bekam (SFH-Vorschau.html, SFH-3D-Wappen.html).
- **Vor jeder Veröffentlichung:** Elterneinwilligung für Fotos mit erkennbaren Kindern, Fotografen, Vertretung im Impressum, Hosting (Austauschliste).

## Nächste Schritte (Vorschlag, Simon entscheidet)
1. **Vereinsseite auf Simons Niveau heben:**
   - 3D-Wappen als Einstieg (Apple-Art: Produkt im Studiolicht, dreht sich beim Scrollen, viel Weiß),
   - Wappen vorher sauber als Vektor nachbauen,
   - der alte Lederball (Poly Haven „Dirty Football“, CC0) für „50 Jahre“,
   - KI-Reste raus: kleine Beschriftungen über Überschriften, Einblenden von unten, gleiche Karten, „große Zahl, kleiner Text“, grüne Tönung überall.

   Dann blind gegen Lando vergleichen (Skala 1–5).
2. **Lehre für das Plugin** (nachschulen): Wenn der Auftraggeber ein Logo oder Wappen hat, ist ein 3D-Objekt daraus ein starker, eigener Wow-Moment. Rezept und Skript `logo3d` ins Plugin. Der Maßstab „4K, 3D, Apple“ gehört als Pflicht in Stopp 1 (mindestens eine Richtung mit echtem 3D).
3. **Probearbeit** des Website-Bauers (Sparvariante, 2 Läufe, ca. 3,5–5 Mio. Tokens), danach Stopp 2 mit Simons blinder Note. Erst dann einstellen. Den Konto-Skill `website-bauen` abschalten (Simon hat zugestimmt).
4. **Offen aus der Prüfung:**
   - Das Prüfskript erkennt abgeschnittene Inhalte (overflow) und Karten-Baukasten noch schlecht.
   - Das Fehlen eines Handy-Menüs fällt ihm nicht auf.

## Sicherheit und Regeln (unverändert wichtig)
- Öffentliches Repo: keine Kunden-, Firmen- oder Privatdaten, keine echten Personenfotos.
- Arbeitgeber-Name nie (alte Git-Historie noch offen, nur auf Simons Wort umschreiben).
- Merge, Push in fremde Repos und alles nach außen nur auf Simons Wort.
- Gehirn (`roelzer/brain`): Regeln in dessen CLAUDE.md.
