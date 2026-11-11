# Übergabe: Dev-Team weiterentwickeln (Stand 11.11.2026, Dev-Team 3.17.0)

Für die nächste Sitzung, die mit Simon am Dev-Team (roelz-plugins) weiterarbeitet. Erst ganz lesen.

## Simon
- Spricht Deutsch, ist kein Programmierer, liest keinen Code. Kurz, klar, ehrlich, mit Empfehlung antworten.
- Arbeitet **nur in Cloud-Sitzungen** (Claude-App). Max-Abo mit Wochenlimit → sparsam mit Agenten und Tokens.
- Will: Team arbeitet **eigenständig bis fertig**, keine unnötigen Stopps, keine Chat-Flut, sicher, Oberflächen **topmodern**, und künftig echten **Wow-Effekt**.
- Hat Merges an Claude delegiert („ich klicke sowieso auf Merge“): Plugin-PRs nach grünen Tests selbst zusammenführen.

## Stand roelz-plugins (main)
- Dev-Team **3.17.0**, Team-Tafel **0.3.1**. Alles in `plugins/dev-team/CHANGELOG.md`.
- Kernideen:
  - **Besetzungen** Solo (Standard: Projektleiter baut selbst, Schranken nach jedem Feature, Review je Abschnitt), Kunde (+Architekt, Kritiker, verdeckte Abnahmetests, Prüfung je Meilenstein, Übergabe), Voll (Entwickler je Paket, alle Prüfer).
  - **Ein Stopp** (Startfreigabe) oder **Autopilot** (keiner). Jeder Bau-Auftrag läuft bis zum Ende, nie „womit weitermachen?“.
  - **Stiller Durchlauf**, Push-Mitteilung nur wenn Simon gebraucht wird oder fertig.
  - **Kontext-Wächter** (`scripts/kontext.sh`), `autoCompactWindow: 400000`, Übergabe `docs/SITZUNGSUEBERGABE.md`, Durchlauf wird nach Sitzungswechsel automatisch wieder eingeschaltet.
  - **Schranken ohne KI:** Test-Schranke (`pruefe_tests.py`, Rollen inkl. `solo`), Sicherheits-Schranke (`pruefe_sicherheit.py`: rot nur fast Sicheres, Unscharfes als Warnung), Abhängigkeits-Schranke, Prüfsummen nur ergänzen.
  - **Freigaben:** technische prüft ein frischer `kritiker` (Modus `freigabe`), der Projektleiter trägt ein; fachliche Sollwerte/Fachregeln nur Simon. **Merge nach main** macht der Projektleiter am Ende.
  - **Oberflächen-Standard** `wissen/oberflaeche.md` (Tailwind + shadcn/ui, Regeln, KI-Look-Verbote, Prüfliste mit Bildschirmfotos); Designer in Solo/Kunde: Entwurf zu Beginn, Sichtprüfung je Abschnitt.
- Prüfen vor jedem PR: `python3 -m unittest discover -s plugins/dev-team/tests`, `bash plugins/dev-team/scripts/pruefe-plugin.sh`, Tafel: `claude plugin test plugins/dev-team-tafel`.
- Bekannte Grenze: **Team-Tafel (Mod) lädt in Cloud-Sitzungen nicht** (Plugins aus Projekteinstellungen werden dort nicht installiert, Mods sind zudem per Rollout geschaltet). Ersatz: Status in `docs/status.md`, Push-Mitteilung.
- Ehrlich bleiben: Zeitschätzungen bisher kaum gemessen. Gemessen: M7-Nacht in ichkannalles, 87 Agentenläufe in 11,5 h für 5 Pakete (alte Besetzung „voll“).

## Projekte (alle mit Dev-Team eingerichtet)
- **ichkannalles** (privat, Besetzung Kunde): M7 lief in eigener Sitzung weiter. Falls die Schranke „Eintrag … fehlt“ meldet: `abnahme_pruefsummen.py --schreiben --freigabe m5-format-v3`.
- **SiRo/ENERPLAN** (privat, ENERPIPE-intern mit echten Kundendaten → Kunde).
- **Simfit** (Solo, Fitness-App, Garmin): eingerichtet, erste Version gebaut; Sitzung wartete auf Simons Antworten H1–H4. Garmin-Login macht Simon selbst.
- **W-rmenetz-Dorf** (Solo, Handyspiel): Sitzung lief zuletzt mit Opus, Denkaufwand „medium“, ~250k Kontext. Empfehlung an Simon war: neue Sitzung, Opus + Denkaufwand hoch, Spielregeln in `docs/lastenheft.md` mit Tests.

## Erledigt: Dev-Team 3.17 „Schnell aufbauen, robust fertigstellen, mit Wow-Effekt“
Simon hat zugestimmt und ergänzt: (a) Werkzeuge und Bibliotheken aus dem Internet nutzen → Werkzeugkasten in `wissen/oberflaeche.md`; (b) Tempo: Er empfand ein anderes Chat-Werkzeug als „10-mal schneller“, das Warten auf Prüfungen bei vielen Zwischenschritten nervt. Seine Vorgabe: „Erst wenn das Produkt finalisiert wird, also das Grundgerüst mit Funktionen steht, soll das Testteam alles robust bauen.“ → Solo in zwei Phasen (Aufbau mit Schnellprüfung `--schnell`, Vorschau, Werkstatt; Fertigstellung mit `tester` Modus `haerten`, voller Schranke, Prüfern, Video, Feinschliff). Kunde/Voll bleiben streng. Details im CHANGELOG 3.17.0.
Ehrlich gesagt an Simon: erwartet 2–4-mal schneller in Solo, nicht gemessen. **Nächster Schritt:** in Simfit oder W-rmenetz-Dorf messen, wie lange Aufbau-Schritte jetzt dauern, und nachjustieren.

## Neu in dieser Sitzung außerdem
- **KI-Update** (geplante Aufgabe „KI-Update für Simon“, Mo + Do 7:43 Berlin, frische Sitzung, Push): KI-Neuigkeiten und passende Plugins/Skills, ändert nichts.
- **Plugin `video-studio` 1.0.0** (`/video-studio:video`): Briefing → Storyboard aus Keyframes zur Freigabe mit Kostenschätzung → Bild-zu-Video über Higgsfield → `video-kritiker` prüft Kontaktbögen (`scripts/kontaktbogen.sh`) → Schnitt/Ton/Export mit ffmpeg → Stil-Bibliothek `video/stile.md`. Grundlage nach Simons Referenzvideo (Lebersorger, „Higgsfield in 12 Minuten“, gesponsert): Storyboard vor Erzeugung, Stil-Bibliothek, reich beschreiben. Higgsfield-Verbindung muss Simon selbst als Custom Connector anlegen (Adresse `https://mcp.higgsfield.ai/mcp` laut Drittquelle, nicht offiziell bestätigt) – danach erster echter Test offen.
