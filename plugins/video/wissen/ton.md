# Ton: Musik, Geräusche, Stimmen

Herkunft: Recherchen vom 18.11.2026 (`docs/personal/video-editor/recherche.md`, Abschnitt Ton). Grenzen wie immer: kostenlos, kommerziell nutzbar auch in einer Firma über 3 Mitarbeitern, lokal, nichts nach außen, **nie NC**.

## Musik
**Hauptweg: Simons Musiksammlung** in `~/.roelz-video/musik/` (Windows: `%USERPROFILE%\.roelz-video\musik\`).
- Unterordner nach Stimmung (`ruhig/`, `positiv/`, `filmisch/`, `warm/`, `dezent/`).
- Neben jeder Datei liegt eine Lizenzangabe, entweder `<datei>.lizenz.txt` oder eine gemeinsame `LIZENZEN.md` mit Titel, Urheber, Quelle und Lizenz.
- Simon füllt die Sammlung einmal von Hand. Erlaubte Quellen:
  - Pixabay Music und Mixkit: kommerziell frei, ohne Namensnennung. Laut deren Bedingungen nur von Hand laden, nie per Skript.
  - OpenGameArt nur mit CC0.
  - Free Music Archive nur mit CC0 oder CC BY.
- Liegt dem Auftrag Musik bei (z. B. `material/musik/`), wird diese genommen.
- **Fehlt passende Musik:** Sag es Simon in einem Satz und schlag eine Stimmung vor. Bis dahin baust du mit Geräuschen und ohne Musik und schreibst das in den Bericht. Musik wird nie selbst synthetisiert, nie aus dem Netz gezogen und nie aus Charts, YouTube oder Spotify genommen.
- **Später möglich:** ACE-Step 1.5 (lokale Musik-KI, MIT-Lizenz, ohne Umsatzgrenze), sobald ein Rechner mit NVIDIA-Grafikkarte (≥ 6 GB) da ist. Nur über die lokale API, `HF_HUB_OFFLINE=1`, nie über den Online-Dienst.

**Schnitt der Musik:**
- Eine durchgehende Spur. Takt bestimmen mit `node hf.mjs beats <musik>`, dann Schnitte und Höhepunkte auf starke Taktzeiten legen.
- Am Ende auf einem Schluss enden (Phrase zu Ende, Schlussakkord), nicht einfach ausblenden.
- Unter Sprache 6–10 dB absenken.

## Geräusche
- Die Geräusche der HyperFrames-Skills (`media-use/audio/assets/sfx/`, Lizenz laut deren `CREDITS.md`: Pixabay) und Simons Sammlung `~/.roelz-video/geraeusche/`. CC0 von Freesound nur, wenn Simon einen eigenen API-Schlüssel hinterlegt hat.
- Sparsam, nur auf Schlüsselmomente (Ankommen eines wichtigen Elements, Klick, Ergebnis). Nicht derselbe Whoosh bei jedem Schnitt.
- Der Klang setzt ein Frame nach dem Bild ein. Keine selbst erzeugten Pieptöne.

## Stimmen
Simon will verschiedene Stimmen, auch Charakterstimmen mit Gefühl. Die Stimme „thorsten“ will er ausdrücklich nicht. Welches Werkzeug das kostenlos, lokal und auf Deutsch leistet, steht in `stimmen.md`. Unabhängig vom Werkzeug gilt:
- **Einwilligung:** Stimmen echter Personen werden nur mit deren Einwilligung nachgebildet (Simons eigene Stimme ja, Promis nie).
- **Prüfen:** Jede erzeugte Sprachdatei wird transkribiert (`scripts/transkribieren.py`) und mit dem Skript verglichen. So fallen fehlende Wörter, falsche Aussprache von Fachwörtern und abgeschnittene Enden auf. Für schwierige Wörter gibt es ein Aussprache-Lexikon im Projekt (`video/<name>/aussprache.txt`, Schreibweise → Lautschrift oder Umschreibung).
- **Tempo:** Erzähler etwa 2,0–2,4 Wörter pro Sekunde auf Deutsch; die Bilder richten sich nach der Sprecherspur, nicht umgekehrt.

## Mischung und Messung
- Endmischung −16 bis −14 LUFS, True Peak höchstens −1 dBTP, zweistufig mit `ffmpeg loudnorm` (erst messen, dann angleichen).
- `scripts/messen.py` prüft das.
- **Du kannst nicht hören.** Im Bericht stehen die Messwerte und der Satz, dass Simon den Ton an Stopp 2 anhören muss.

## Lizenzdatei je Video
`video/<name>/LIZENZEN.md` mit einer Zeile je Ton:
- Datei, Titel, Urheber, Quelle (URL), Lizenz
- Namensnennung nötig ja/nein mit fertigem Text
- bei KI-Erzeugung: Modell, Version, Lizenz, Text bzw. Prompt, Seed
