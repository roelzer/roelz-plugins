# Vorführvideos von Simons Software

Ziel: Die Aufnahme sieht aus wie ein Produktfilm einer Software-Firma. Das Produkt ist dabei immer das echte. Herkunft: Apple App Previews, Screen Studio, HyperFrames `types/launch.md`, Probelauf B4.

## Aufnehmen (echt, scharf, ruhig)
- Die App lokal starten (Startbefehl aus der Projekt-`CLAUDE.md` bzw. Datei im Browser). Mit **Playwright** steuern, nie mit einer Echtzeit-Bildschirmaufnahme.
- Viewport so, wie die Szene ihn braucht: 16:9 mit z. B. 1440×810 CSS-Pixeln, 9:16 mit dem mobilen Layout (z. B. 430×764). **deviceScaleFactor 2–3**, damit Heranfahrten scharf bleiben.
- Je Handlung einzelne Standbilder bzw. Bildfolgen aufnehmen (`page.screenshot` nach jedem Schritt, bei Animationen in festen Zeitabständen mit `page.clock`). Daraus entsteht in HyperFrames die Kamerafahrt. Alternative: `recordVideo` mit expliziter `size`, sonst wird auf 800×800 verkleinert.
- **Testdaten:** plausibel und fiktiv, nie Kundendaten, nie echte Namen, E-Mails oder Telefonnummern. Vor der Aufnahme störende Elemente (Cookie-Banner, Debug-Hinweise, blinkender Cursor) über CSS ausblenden. Das ist Aufräumen, nicht Erfinden.
- Fehlt ein Bildschirm oder eine Funktion, wird nichts nachgebaut. Es kommt ein beschrifteter Platzhalter hin, und Simon wird gefragt.

## Inszenieren
- **Erst Überblick, dann Detail, dann zurück:** Arbeitsbereich zeigen, die Handlung auf das 1,6- bis 2-fache vergrößert isolieren, zurückführen. Zoom-Rahmen = Zielelement plus mindestens 8 % Rand je Seite, an die Bildkanten geklemmt. Nie über die Aufnahme-Pixeldichte hinaus vergrößern.
- **Keine schräge 3D-Kippung der Oberfläche** und keine Kamerafahrt über einem eingefrorenen Bildschirm, die so tut, als passiere etwas. Das Produkt führt die Handlung wirklich aus.
- **Zeiger:** groß (bei 1080 px Breite etwa 2–3-fache Systemgröße), Bahn geglättet, ruhender Zeiger ausgeblendet, Klick mit dezenter Markierung. Tippen mit realistischem Tempo, Ergebnis mit kurzer Hervorhebung.
- **App groß:** Die App füllt mindestens 80 % der Bildbreite oder ist das klare Hauptmotiv. Keine kleine Oberfläche auf großer leerer Fläche.
- **Haken:** Der Film beginnt mit dem Nutzen bzw. dem Ergebnis (z. B. die fertige Empfehlung), nicht mit Logo oder Ladebildschirm.
- Ein Satz Text je Schritt, höchstens 6 Wörter, groß. Erklärt wird über das Bild, nicht über Absätze.
