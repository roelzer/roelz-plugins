# Änderungsprotokoll Recherche

## 0.2.1 – Abgrenzung und Abbruch (24.11.2026)
- **profi:** „Nicht für“ gegenüber tool-scout:scout, wegen gleicher Auslösesätze.
- **profi:** Abbruchkriterien (zwei Quellen je Kernpraktik, zwei Runden ohne Neues, etwa 15 Quellen).

## 0.2.0 – Profi-Recherche (24.11.2026)
Simon: „auch der Recherche-Skill soll das alles beinhalten: recherchieren, wie die Fachleute in den Gebieten das machen und was es schon im Internet, vor allem auf GitHub, gibt und was wir davon nutzen können“.
- Neuer Skill `profi` mit drei Fragen:
  1. Wie machen es die Besten? (Fachleute, Standardwerke, Checklisten, Videos über den Skill `youtube`)
  2. Was gibt es schon? (GitHub-Suche über `gh api` oder Websuche, Plugins, Skills, Agenten, Werkzeuge)
  3. Was nutzen wir? (installieren, Idee übernehmen oder ablehnen, verglichen mit unseren Plugins)
- Prüfung je Fund: lebt es, Lizenz, taugt es, Sicherheit, Nutzen für uns. Dazu der Hype-Filter.
- Nur lesen, nie fremden Code ausführen. Ergebnisse kommen auch in die Prüfliste des Tool-Scouts.

## 0.1.0 – YouTube-Recherche (24.11.2026)
Anlass: Bei der Recherche zu Promptgeflüster waren YouTube-Inhalte nicht erreichbar, weil die Watch-Seiten aus der Cloud eine Captcha-Sperre zeigen. Simon: „machen wirs über 1“, also über die offizielle Schnittstelle.
- Skill `youtube` mit Ablauf: Kanal finden → Überblick → Details und Kommentare → Begleit-Blogs und Repos → höchstens drei Transkripte gezielt bei Simon erbitten → Ergebnis mit Quellen und Kennzeichnung (Beschreibung / Transkript / Blog / Schluss).
- `scripts/yt.py` (nur Python-Standardbibliothek): `kanal`, `video`, `suche` (kostet 100 Einheiten), `kommentare`. Schlüssel kommt aus `YOUTUBE_API_KEY` oder als Network secret (Header `X-Goog-Api-Key`).
- Kein Herunterladen von Videos oder Untertiteln, das verbieten die YouTube-Nutzungsbedingungen.
- Tests für die Hilfsfunktionen.
