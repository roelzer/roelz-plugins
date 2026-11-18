# Bilder, Modelle, Schriften: kostenlose Quellen und Lizenzen

Stand 18.11.2026. Alles wird **heruntergeladen und in `site/` gelegt**. Nichts wird zur Laufzeit von fremden Servern geladen.

## Reihenfolge
1. **Von Simon bzw. dem Auftraggeber** (eigene Fotos, Handy-Scans von Objekten, Logos, Wappen). Frag im Briefing danach, das ist der größte Hebel.
2. **Freie Quellen** (unten).
3. **Selbst gerendert** (Blender) aus freien Modellen.

## Suchen ohne Schlüssel
- **Openverse** (CC0- und gemeinfreie Fotos aus vielen Archiven):
  `curl -s -A "website-bauer/1.0" "https://api.openverse.org/v1/images/?q=<begriff>&license=cc0,pdm&page_size=40&size=large"`
  Felder: `url`, `width`, `height`, `license`, `creator`, `foreign_landing_url`. Viele Treffer sind klein (≤1024 px) oder historisch, also vor dem Einbau ansehen. Wikimedia-Dateien lassen sich je nach Netz nicht laden.
- **Poly Haven** (CC0: HDRIs, Texturen, fotografisch erfasste 3D-Modelle wie Möbel, Werkzeug, Pflanzen):
  - Liste: `https://api.polyhaven.com/assets?t=models&c=furniture` bzw. `t=hdris&c=studio`
  - Dateien: `https://api.polyhaven.com/files/<id>` (glTF 1k/2k mit `md5` zum Prüfen)
  - Urheber: `https://api.polyhaven.com/info/<id>`
  - Einen eigenen User-Agent senden (Nutzungsbedingungen).
- **Unsplash und Pexels:** kommerziell frei, ohne Pflicht zur Namensnennung (Pexels: keine erkennbaren Personen in schlechtem Licht, nicht als Marke). Die Unsplash-API verlangt Hotlinking, deshalb nicht über die API, sondern Bilder manuell bzw. über eine bekannte Bild-Adresse herunterladen. Nicht über inoffizielle Schnittstellen suchen.

## Nicht verwenden
Sketchfab (Konto, gemischte Lizenzen mit NC/ND), BlenderKit (Konto, Bezahlplan), Spline-Exporte (Free mit Wasserzeichen, glTF erst ab 25 $/Monat), Lizenzen mit „NC“ oder „ND“, KI-Bilddienste, Bilder von Vorbild-Seiten, Stockfotos mit Wasserzeichen.

## Schriften
- Selbst gehostete WOFF2 mit Lizenzdatei in `site/fonts/`.
- Wege: npm-Pakete `@fontsource/<name>` bzw. `@fontsource-variable/<name>` (OFL), Google-Fonts-Dateien nur herunterladen, Fontshare (ITF-Lizenz, kostenlos kommerziell).
- **Nie** per Link zu `fonts.googleapis.com` (LG München I, 3 O 17493/20), nie Typekit.

## QUELLEN.md (Pflicht, liegt in `site/`)
Je Datei eine Zeile: Datei · Titel · Urheber · Quelle (Adresse) · Lizenz · geändert ja/nein. Bei CC-BY steht die Namensnennung zusätzlich sichtbar auf der Seite (Fußzeile oder Bildunterschrift).

## Bilder vorbereiten
- AVIF bzw. WebP mit `sharp` (`npx sharp-cli` oder ein kleines Node-Skript). Breiten 640/1280/1920/2560 mit `srcset`.
- Ein Einstiegsbild höchstens ca. 300 KB am Handy, 600 KB am Desktop.
- Nur freistellen, wenn eine echte Maske möglich ist (z. B. aus dem Modell gerendert). Keine geometrischen Ersatzmasken.
