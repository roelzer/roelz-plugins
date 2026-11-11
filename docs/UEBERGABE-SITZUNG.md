# Übergabe: Dev-Team weiterentwickeln (Stand 11.11.2026, Dev-Team 3.16.3)

Für die nächste Sitzung, die mit Simon am Dev-Team (roelz-plugins) weiterarbeitet. Erst ganz lesen.

## Simon
- Spricht Deutsch, ist kein Programmierer, liest keinen Code. Kurz, klar, ehrlich, mit Empfehlung antworten.
- Arbeitet **nur in Cloud-Sitzungen** (Claude-App). Max-Abo mit Wochenlimit → sparsam mit Agenten und Tokens.
- Will: Team arbeitet **eigenständig bis fertig**, keine unnötigen Stopps, keine Chat-Flut, sicher, Oberflächen **topmodern**, und künftig echten **Wow-Effekt**.
- Hat Merges an Claude delegiert („ich klicke sowieso auf Merge“): Plugin-PRs nach grünen Tests selbst zusammenführen.

## Stand roelz-plugins (main)
- Dev-Team **3.16.3**, Team-Tafel **0.3.1**. Alles in `plugins/dev-team/CHANGELOG.md` (3.13–3.16.3 aus dieser Sitzung).
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

## Offene Entscheidung: Dev-Team 3.17 „Wow-Effekt“
Simon hat mit Copilot fünf Leitfäden erarbeitet (Agent Operating System, Experience Director, Art Director, Motion Director, Reverse Engineering Workflow). Meine Bewertung: kein neuer Agent, sondern einbauen:
1. **Designer = Gestaltungs-Verantwortlicher** für Optik, Bewegung und Gefühl; im Entwurf 2–3 Vorbilder wählen und Prinzipien ableiten (Reverse Engineering, nie kopieren), Bewegungssprache festlegen (Zeiten klein 100–250 ms / mittel 250–500 / groß 500–1000, Federn, Erfolgsmomente).
2. **Prüfen mit Video statt nur Bildschirmfoto:** am Abschnittsende die wichtigsten Abläufe per Playwright als Video aufnehmen und bewerten (Rückmeldung bei jeder Aktion? harte Sprünge? Erfolgsmomente? „Würde man das Video teilen?“) plus Screenshot-Test (Produkt, wichtigste Aktion, Zustand sofort erkennbar).
3. **Oberflächen-Standard erweitern** um Bewegung (Framer Motion/GSAP für Web, PixiJS fürs Spiel, Zweck je Animation, 60 FPS), Rückmeldung, Erfolgsmomente, Screenshot-Test.
4. **Harte Prüfung ohne KI:** keine Browser-Konsolenfehler, keine Build-Warnungen.
5. **Feinschliff-Runde je Meilenstein:** Gastgeber + Designer nennen die 3 Stellen mit dem größten Wow-Potenzial, der Projektleiter setzt sie um.
Nicht übernehmen: „TypeScript bevorzugen“ als allgemeine Regel (Python/VBA-Projekte); der Rest des „Agent Operating System“ steht schon im Grundgesetz.
**Simon hat noch nicht zugestimmt** – zuerst fragen.
