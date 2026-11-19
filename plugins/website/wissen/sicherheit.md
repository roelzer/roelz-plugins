# Sicherheit: eine statische Seite, die nicht angreifbar ist

Stand 18.11.2026. Quellen: OWASP (Top 10 2025, CSP Cheat Sheet, DOM-XSS Cheat Sheet, Secure Headers), MDN, Mozilla HTTP Observatory, Cloudflare Docs, exiftool, gitleaks, npm. Details und Zitate stehen in `docs/personal/website-bauer/recherche.md`, Abschnitt „Sicherheit“. Das Prüfskript misst die meisten Punkte, Abschnitt „Prüfung“.

## Grundsatz
Alles, was in `site/` liegt, ist öffentlich und darf von jedem gelesen werden. Die Seite verlässt sich auf nichts Fremdes zur Laufzeit.

## 1. Nichts Fremdes laden (Lieferkette)
- three.js, GSAP, Schriften und Bilder liegen lokal in `site/`, mit fester Version. OWASP führt „Software Supply Chain Failures“ 2025 auf Platz 3. Beim polyfill.io-Angriff 2024 waren über 100.000 Seiten betroffen.
- Abhängigkeiten nur mit `npm ci --ignore-scripts` aus dem Lockfile installieren, danach `npm audit --audit-level=high`.

## 2. Sicherheits-Header (`site/_headers`)
- Erzeugen mit `node ${CLAUDE_PLUGIN_ROOT}/scripts/kopfzeilen.mjs website/<name>/site`. Das Skript schreibt eine strenge CSP und trägt für eingebettete `<style>`- und `<script>`-Blöcke deren Hash ein. Danach nichts mehr an diesen Blöcken ändern, sonst passt der Hash nicht (oder das Skript neu laufen lassen).
- CSP: `default-src 'none'`, nur `'self'`, kein `'unsafe-inline'` in `script-src`, kein `'unsafe-eval'`, `frame-ancestors 'none'` gegen Einbetten in fremde Seiten, `object-src 'none'`, `base-uri 'none'`, `form-action 'self' mailto:`.
- **Folgen für den Code:**
  - keine `style="…"`-Attribute im HTML (eine Klasse nehmen),
  - keine `onclick=`-Attribute (`addEventListener` nehmen).
  Stilwerte, die JavaScript direkt über `element.style` setzt (GSAP, eigene Animationen), sind erlaubt.
- HSTS mit 2 Jahren, aber **ohne `preload`**. Preload lässt sich monatelang nicht zurücknehmen, deshalb nur nach Simons Ja.
- `.assetsignore` (legt das Skript mit an) verhindert, dass Source Maps, `.env`, Markdown oder Pakete hochgeladen werden.

## 3. Keine Daten im Frontend
- Keine Schlüssel, Tokens oder Passwörter, auch nicht „nur zum Testen“. Statische Seiten brauchen keine.
- Keine Source Maps, keine internen Pfade (`/home/`, `C:\Users`, `localhost`), keine `TODO`-Kommentare mit Interna.
- **Fotos ohne Metadaten:** EXIF und GPS entfernen. Neu speichern mit `sharp` bzw. PIL entfernt sie, prüfen mit `exiftool -a -gps:all`.
- **PDFs ohne Autor:** Vereins-PDFs tragen oft Namen von Privatpersonen in den Metadaten (beim SFH-Neubau gefunden: drei Namen in drei PDFs). Entfernen mit `qpdf --linearize` bzw. neu schreiben (pypdf). exiftool allein löscht bei PDFs nicht wirklich. Nicht verlinkte PDFs gehören nicht in die Lieferung.
- E-Mail-Adressen nur die, die veröffentlicht werden sollen (Impressum, Ansprechpartner mit deren Zustimmung).

## 4. Eigenes JavaScript
- Text mit `textContent` einfügen, nie mit `innerHTML`, `outerHTML`, `insertAdjacentHTML` oder `document.write` (OWASP: „the most fundamental safe way“).
- Kein `eval`, kein `new Function`, keine Weiterleitung auf Werte aus `location.search` oder `location.hash`.

## 5. Cloudflare (bei Veröffentlichung, nur nach Simons Ja)
- An: Always Use HTTPS, TLS 1.2 als Mindestversion, TLS 1.3. DDoS-Schutz läuft automatisch.
- Aus: Bot Fight Mode. Er spritzt Skripte ein, die mit der strengen CSP kollidieren, und eine statische Seite braucht ihn nicht.
- Email Obfuscation: Sie verändert `mailto:`-Links und lädt ein Skript. Nach dem Livegang die Konsole auf CSP-Fehler prüfen, bei Fehlern abschalten.
- Nach dem Livegang:
  - `curl -sI <adresse>` zeigt alle Header.
  - `/.git/config`, `/.env` und `/*.map` liefern 404.
  - Ziel im Mozilla HTTP Observatory ist A+ (ab 100 Punkten). Den Test führt Simon selbst aus.

## Prüfung
`pruefen.mjs` meldet als harten Fehler (P0, Kennung „Sicherheit“):
- fehlende `_headers`, eine CSP ohne Pflichtteile oder mit `unsafe-inline`/`unsafe-eval` in `script-src`, oder Hashes, die nicht zu den eingebetteten Blöcken passen
- `onclick`-Attribute, `eval`/`new Function`/`document.write` im eigenen Code
- Schlüssel-Muster, Source Maps, interne Pfade
- Metadaten in Fotos, Autoren in PDFs
- Dateien außerhalb der Positivliste

Als Hinweis meldet es `innerHTML` und `style`-Attribute.
