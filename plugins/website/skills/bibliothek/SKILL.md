---
name: bibliothek
description: Baustein-Bibliothek des Website-Bauers erweitern oder pflegen. Baut neue, geprüfte Bausteine (Scroll-Momente, Übergänge, Text-Momente) als neutrale Demos, misst sie und nimmt sie auf, damit Aufträge sie nur noch auf das Thema umbauen. Nutzen bei „erweitere die Bibliothek“, „bau neue Bausteine“, „ich hab noch Kontingent, mach was für die Website-Bibliothek“, „nimm den Baustein aus dem Honig-Katalog in die Bibliothek“. Nicht für eine konkrete Kundenseite (website:bauen).
argument-hint: "[wie viele / welche Bausteine, z. B. „3 neue für Schluss“]"
---

# Baustein-Bibliothek erweitern

Auftrag: `$ARGUMENTS`

Simon, 24.11.2026: „wenn ich Kontingent hab, immer die Bibliothek erweitern“. Regeln und Format stehen in `${CLAUDE_PLUGIN_ROOT}/bibliothek/README.md`, die Bauformen in `${CLAUDE_PLUGIN_ROOT}/wissen/bausteine.md`, die Prinzipien in `wissen/handwerk.md` 1c und die Leistungsregeln in `wissen/3d-leistung.md`.

## 1. Was fehlt?
- `node ${CLAUDE_PLUGIN_ROOT}/scripts/bibliothek.mjs` und `bibliothek/bausteine.json` lesen: Was gibt es schon, je Abschnitt?
- Lücken nach dieser Reihenfolge füllen, wenn Simon nichts Bestimmtes nennt:
  1. Abschnitte mit weniger als drei Bausteinen (Einstieg zählt nicht, der wird pro Kunde gebaut),
  2. Bauformen aus `wissen/bausteine.md`, die noch keinen Baustein haben,
  3. neue Bauformen aus Vorbildern (`handwerk.md` Abschnitt 2). Neue Bauform zuerst mit einer Zeile in `wissen/bausteine.md` eintragen.
- Ohne Mengenangabe: **3 Bausteine** je Lauf. Das passt in etwa eine Stunde.

## 2. Bauen (je Baustein)
- Ordner `bibliothek/<kennung>-<kurzname>/` nach README: `index.html`, `baustein.css`, `baustein.js`, `baustein.json`.
- **Neutral, aber nicht leer:** Formen, Flächen und Platzhalter, die zeigen, wie der Baustein wirkt. Keine Kundennamen, keine echten Personenfotos, keine Marken.
- **Mit Mühe** (`handwerk.md` 1c): Ein lauter Baustein hat mindestens zwei zusammenspielende Ebenen und läuft über mehr als eine Bildschirmhöhe Scrollweg, rückwärts mit.
- Anpassbares nach oben: CSS-Variablen und ein `EINSTELLUNGEN`-Objekt. Im Steckbrief stehen Slots, Stellschrauben und **mindestens zwei Achsen zum Abwandeln**.
- Bewegung über `../_kern/scroll.js`. Kein GSAP im Repo, kein WebGL über die ganze Fläche.
- Ruhezustand für `prefers-reduced-motion`, Inhalt ohne JavaScript sichtbar.

## 3. Prüfen
- `node ${CLAUDE_PLUGIN_ROOT}/scripts/pruefen.mjs bibliothek/<id>` ohne P0 (Hinweise zu Impressum und Datenschutz gelten für Demos nicht, so vermerken).
- `node ${CLAUDE_PLUGIN_ROOT}/scripts/bibliothek.mjs --messen <id>`: fps normal und 4× gedrosselt plus `vorschau.png`. Unter 30 fps gedrosselt wird der Baustein vereinfacht, nicht aufgenommen.
- Bilder ansehen: Anfang, Mitte, Ende (`ablauf.mjs`). Ist es hübsch, aber nur eine Bewegung an einem Element, steht im Steckbrief `leise`.
- Zum Schluss `node ${CLAUDE_PLUGIN_ROOT}/scripts/bibliothek.mjs --pruefen` ohne FEHLER.

## 4. Übergeben
- `bibliothek/katalog.html` wird vom Skript neu erzeugt. Für Simon mit `vorschau.mjs bibliothek <ziel>.html` in eine Datei packen.
- Kurz an Simon: welche Bausteine neu sind (je ein Satz), was gemessen wurde, was noch fehlt.
- Bausteine aus einem Kundenauftrag übernehmen: erst neutralisieren (Kundenmotiv, Texte, Farben raus), dann wie oben prüfen. `herkunft` und `genutzt_in` im Steckbrief ausfüllen.
- Das Repo ist öffentlich: keine Kunden-, Firmen- oder Privatdaten in der Bibliothek.
