# Spiele-Bauer – Probelauf ohne Mitarbeiter (24.11.2026)

Drei Aufträge, wie Simon sie schreiben würde, je ein frischer Agent (`general-purpose`) ohne Hinweis auf den geplanten Mitarbeiter. Vorgaben nach Simons „mach alles was sinnvoll ist“:
- Browserspiele für Handy und Laptop, ohne Installation,
- Spaßprojekte und Mini-Spiele für Websites,
- nur kostenlose Werkzeuge.

| Fall | Auftrag | Ergebnis |
|---|---|---|
| A | Elfmeterschießen für die Vereinsseite, Wischen, Torwart reagiert, „gleich nochmal“, Bestenliste lokal | „Elfmeter-Duell“, 2D-Canvas, 52 KB, Effet, lernender Torwart, Konfetti, Sound aus dem Browser |
| B | Eigenes Spiel: Lehrling in der Schreinerwerkstatt fängt Bretter und weicht Werkzeug aus, „nicht wie ein billiges Lernspiel“ | „Holz & Hektik“, 2D-Canvas, 76 KB, Extras, Serien, Musik und Geräusche aus dem Browser |
| C | Tägliches Familien-Rätsel zum Vergleichen, Übungslevel, Handy | „Tägliche Knobelei“, Mini-Sudoku 6×6, 36 KB, Ergebnis teilen und einfügen, 12 Level |

## Was gut war
- Alle drei laufen fehlerfrei, ohne Bibliotheken, als einzelne Datei.
- Sie wurden im Browser automatisiert durchgespielt, mit Bildschirmfotos bei mehreren Größen.
- Spielgefühl ist eingebaut: Wackeln, Partikel, kurzes Einfrieren bei Treffern, Vibration und im Browser erzeugter Ton.
- Eine einfache Schwierigkeitskurve ist vorhanden. A hat sie sogar mit 150 simulierten Schüssen je Schussart gemessen.

## Was fehlte oder falsch war (gemessen an „richtig gut, gleich nochmal, nicht billig“)
1. **Gleicher Einstieg bei allen drei:** dunkle oder helle Karte, Titel, nummerierte Regel-Liste mit 4–6 Punkten, großer gelber oder orangefarbener Knopf. Das ist der Vorlagen-Look für Spiele, wie bei den Websites. Profis erklären durch Spielen, nicht durch Lesen.
2. **Abstimmung nur geraten, auf keinem echten Gerät gefühlt:** Bei A ging ein normaler, mittelschneller Wisch im Test „DRÜBER“ (117 km/h). Der Agent schreibt selbst, man solle „die 6.5 umstellen“, falls es sich falsch anfühlt.
3. **Fremder Server:** B lädt eine Google-Schrift. Das ist ein Datenschutzproblem beim Einbetten in eine Vereins- oder Firmenseite (DSGVO) und bricht offline.
4. **Idee von der Stange:** C ist ein Mini-Sudoku. Das funktioniert, ist aber kein eigenes Spiel, und niemand erzählt davon. Ein Spiel-„Moment“, den man sich merkt, fehlt bei allen dreien. Das ist dieselbe Lücke wie beim Website-Bauer vor der Hauptidee.
5. **Handy hochkant bei A:** Das Tor ist klein, Bandenwerbung ist abgeschnitten („SV MUSTERSTA“), die Tribüne nimmt die Hälfte ein.
6. **Nicht geprüft:** Bildrate auf schwachen Geräten, Ton auf echten Lautsprechern, erste 30 Sekunden mit einem Menschen (verstehen Spieler es ohne Text?), Einbetten in eine Website (iframe, Abmessungen, Scrollen der Seite beim Wischen).

## Ausreden wörtlich
- A: „Ein echtes Handy in der Hand konnte ich nicht testen. Wenn sich Schüsse in der Praxis zu oft ‚drüber‘ … anfühlen, stellt man in der Datei nur eine Zahl um“
- B: „Auf einem echten Handy und mit echtem Ton habe ich es noch nicht gespielt.“
- B: „Ohne Internet läuft es auch, nur die Google-Schrift fällt dann … zurück.“

## Folgerung
Technisch kann Claude ohne Mitarbeiter schon viel. Die Lücke ist dieselbe wie beim Website-Bauer: **Spielgefühl, Abstimmung, Eigenständigkeit und der Einstieg.** Der Spiele-Bauer muss vor allem das messbar besser machen, nicht die Technik.
