# Änderungsprotokoll Recherche

## 0.1.0 – YouTube-Recherche (24.11.2026)
Anlass: Bei der Recherche zu Promptgeflüster waren YouTube-Inhalte nicht erreichbar, weil die Watch-Seiten aus der Cloud eine Captcha-Sperre zeigen. Simon: „machen wirs über 1“, also über die offizielle Schnittstelle.
- Skill `youtube` mit Ablauf: Kanal finden → Überblick → Details und Kommentare → Begleit-Blogs und Repos → höchstens drei Transkripte gezielt bei Simon erbitten → Ergebnis mit Quellen und Kennzeichnung (Beschreibung / Transkript / Blog / Schluss).
- `scripts/yt.py` (nur Python-Standardbibliothek): `kanal`, `video`, `suche` (kostet 100 Einheiten), `kommentare`. Schlüssel kommt aus `YOUTUBE_API_KEY` oder als Network secret (Header `X-Goog-Api-Key`).
- Kein Herunterladen von Videos oder Untertiteln, das verbieten die YouTube-Nutzungsbedingungen.
- Tests für die Hilfsfunktionen.
