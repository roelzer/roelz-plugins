# Bausteine: Vorschläge je Abschnitt, Simon wählt, dann wird zusammengebaut

Simon, 24.11.2026: „Vorschläge für Bausteine liefern, ich wähl aus und dann zusammenbauen.“ Grundlage ist die Auswertung von Scale, Zoox, AirPods 5, Stripe Press und ikilledacactus (24.11.2026, Bildserien und Messungen im Notizordner der Sitzung). Übernommen werden Prinzipien, nichts wird nachgebaut.

## So wird ein Baustein für einen Auftraggeber
Jeder Baustein unten ist eine **Bauform**. Für den Auftraggeber wird er erst mit seinem Motiv und seinem Gewerk-Zeichen gefüllt (`handwerk.md` 1c, Punkt 1 und 7). „Kartenstapel“ allein ist Stangenware. „Leistungen schieben sich als Fliesen übereinander, die Fuge dazwischen bleibt sichtbar“ ist ein Baustein.

Lautstärke: **laut** = mindestens zwei Ebenen spielen zusammen, über mehr als eine Bildschirmhöhe Scrollweg, mit Bezug zum Motiv. **leise** = eine Bewegung, ein Element.
Risiko: gemessen auf einem Laptop ohne Grafikkarte.

## Einstieg (immer laut, das ist die Hauptidee)
| Bauform | Was man sieht | Technik | Aufwand | Risiko | Vorbild |
|---|---|---|---|---|---|
| E1 Einstiegsbild verwandelt sich | Das erste Bild oder Video kippt beim ersten Scrollen in die Perspektive und wird Teil einer Szene (Stapel, Wand, Regal) | CSS 3D (`perspective`, `rotateX`) auf `<video>`/Bild, ScrollTrigger `scrub`, kein WebGL | mittel | gering bis mittel (Videogröße) | Scale |
| E2 Aufziehen | Eine eingerückte Bild- oder Videokarte zieht beim Scrollen zur vollen Breite auf, der Satz darüber bleibt ruhig | `clip-path: inset()` oder `scale` mit `scrub` | gering | gering | Zoox |
| E3 Ein Objekt baut sich auf | Das Werkstück setzt sich Teil für Teil zusammen (Schrank, Fliesenfeld, Wappen) | SVG oder Bildebenen mit transform; 3D nur nach `3d-leistung.md` | mittel bis hoch | mittel | SFH, Schreinerei |
| E4 Licht und Tageszeit | Über dem Ort wird es Abend, Lichter gehen an | Bildebenen und Überblendung, Farbverlauf in CSS-Variablen | mittel | gering | SFH |

## Leistungen, Angebot
| Bauform | Was man sieht | Technik | Aufwand | Risiko | Vorbild |
|---|---|---|---|---|---|
| L1 Kartenstapel aus dem Material | Jede Leistung schiebt sich als Karte (Fliese, Brett, Platte) über die vorige | `position: sticky` mit wachsendem `top`, leichte Skalierung der unteren Karte | gering | gering | Scale |
| L2 Ein Motiv, viele Rollen | Dasselbe Objekt erscheint je Leistung in neuer Lage (seitlich, von oben, im Wasser, unter der Wasserwaage) | 3–5 freigestellte Standbilder, Überblendung und transform | mittel | gering | ikilledacactus, Stripe |
| L3 Fester 3D-Stapel, wechselnder Inhalt | Eine Szene bleibt stehen, nur ihr Inhalt und der Text darunter wechseln je Leistung | sticky Bühne, CSS 3D, Inhalte tauschen per ScrollTrigger | mittel | gering | Scale |
| L4 Kapitel nach Farbe | Jede Leistung hat eine Grundfarbe aus dem Material, der Wechsel ist der Übergang | CSS-Variable auf `body`, von ScrollTrigger umgeschaltet | gering | gering | AirPods, Scale |
| L5 Baukasten zum Antippen | Besucher wählt eine Variante (Muster, Holzart, Farbe), das Bild legt sich live um | CSS-Gitter mit FLIP (GSAP Flip) | mittel | gering | eigen |

## Ablauf, So arbeiten wir
| Bauform | Was man sieht | Technik | Aufwand | Risiko | Vorbild |
|---|---|---|---|---|---|
| A1 Werkstück entsteht Schritt für Schritt | Je Schritt kommt eine Schicht dazu (Untergrund, Abdichtung, Kleber, Fliese, Fuge) | Bildebenen oder SVG, sticky Bühne, `scrub` | mittel | gering | eigen |
| A2 Faden des Gewerks | Eine Linie (Fuge, Maßlinie, Naht) läuft am Rand entlang, knickt zu jedem Schritt ab | SVG-Pfad, `stroke-dashoffset` mit `scrub` | gering | gering | Scale (Marken) |
| A3 Drehung als Bildfolge | Das Werkstück dreht sich und zeigt seine Rückseite (Kleberkamm, Verbindung) | 40–60 WebP auf `<canvas>`, unter 2 MB, **nie als Lottie** | mittel | gering bei kleiner Fläche | Zoox (Fußzeile) |

## Referenzen, Arbeiten
| Bauform | Was man sieht | Technik | Aufwand | Risiko | Vorbild |
|---|---|---|---|---|---|
| R1 Vorher/Nachher im Raster | Das neue Bild legt sich Zelle für Zelle über das alte (Fliese für Fliese, Brett für Brett) | Gitter aus Maskenzellen (`clip-path`), gestaffelt; höchstens etwa 100 Zellen | mittel | mittel | eigen |
| R2 Bild wächst | Ein Foto wächst beim Scrollen von klein auf bildfüllend | `scale` mit `scrub` | gering | gering | Zoox |
| R3 Schwebende Kacheln | Bilder schweben in verschiedenen Tiefen, ein Wort im Satz wechselt mit | transform mit unterschiedlicher Geschwindigkeit | gering | gering | Scale |

## Text-Momente (in jedem Drittel einer)
| Bauform | Was man sieht | Technik | Aufwand | Risiko | Vorbild |
|---|---|---|---|---|---|
| T1 Wort für Wort aufhellen | Ein Kernsatz wird beim Lesen hell | Text in Spans teilen, opacity mit `scrub` | gering | gering | Scale |
| T2 Wechselndes Wort | „Fliesen für ___“ mit Bad, Küche, Balkon, Treppe | Wörter fahren vertikal durch | gering | gering | Scale |
| T3 Hervorgehobene Liste | Eine Liste, in der beim Scrollen der Reihe nach ein Eintrag hell wird | ScrollTrigger je Eintrag | gering | gering | Zoox |
| T4 Echo | Ein Satz wiederholt sich verblassend, das Objekt steigt dahinter auf | gestaffelte Kopien mit abnehmender opacity | gering | gering | AirPods |

## Schluss, Kontakt, Fußzeile (antwortet auf den Einstieg)
| Bauform | Was man sieht | Technik | Aufwand | Risiko | Vorbild |
|---|---|---|---|---|---|
| S1 Aufgedeckte Fußzeile | Die letzte Karte rutscht hoch, darunter liegt der Schluss wie unter der Seite (Werkzeug auf Fliese, Telefonnummer groß) | fixe Fußzeile hinter der Seite oder sticky | gering | gering | Scale, Zoox |
| S2 Motiv kommt an | Das Objekt vom Einstieg landet am Ziel (das Buch im Regal, das Auto fährt vor, die letzte Fliese wird ausgeklopft) | wie im Einstieg, kleiner | mittel | gering | Stripe, Zoox |
| S3 Kernsatz riesig | Der erste Satz der Seite steht groß in der Fußzeile | Typografie, leichte Bewegung | gering | gering | Scale |
| S4 Leere Stelle für den Kunden | Eine Lücke im Werkstück („Ihr Maß?“, eine fehlende Fliese) führt zum Kontakt | SVG oder Bild | gering | gering | Schreinerei |

## Begleiter (die ganze Seite)
| Bauform | Was man sieht | Technik | Aufwand | Risiko |
|---|---|---|---|---|
| B0 Ein Wisch = eine Animation (Standard, Simon 25.11.2026) | Jeder Wisch, Rad-Schwung oder Pfeil fährt genau eine Szene weiter, auch ein kräftiger Wisch | Haltepunkte = Anfang/Ende jeder Bühne; `touchmove` mit `preventDefault`, Rad summieren und Nachlauf schlucken, Fahrt per `scrollTo` mit Szenendauer; Vorlage: Honig-Musterseite `js/seite.js` „schrittweise“ | mittel | gering |
| B00 iPhone-Rahmen | Dunkle, durchgehende Kopfleiste bis in die Notch, kein Farbbalken beim Überscrollen | `viewport-fit=cover`, `theme-color`, Kopfleiste mit `padding-top: env(safe-area-inset-top)`, `html { background: <dunkel>; overscroll-behavior: none }` | gering | gering |
| B1 Fortschritt als Werkzeug | Am Rand füllt sich ein Zollstock oder eine Fugenlehre mit dem Scrollen, Millimeter statt Prozent | SVG, transform | gering | gering |
| B2 Zeichen des Gewerks | Ein kleines Zeichen (Fugenkreuz, Maßpfeil, Nagel) markiert Überschriften und Übergänge | SVG | gering | gering |

## Beispiel: Fliesenleger
Motiv: eine Musterfliese. Gewerk-Zeichen: das Fugenkreuz. Farben aus dem Material: Zementgrau, Terrakotta, Marmorweiß, Anthrazit.
- Einstieg E1: Ein Video vom fertigen Bad kippt und wird eine Fliese in einem schwebenden Stapel aus Musterfliesen.
- Leistungen L1 + L4: Bad, Küche, Terrasse und Naturstein schieben sich als Fliesen übereinander, je mit eigener Materialfarbe.
- Text T1: „Gerade Fugen. Dichte Duschen. Saubere Baustelle.“
- Ablauf A1: Untergrund, Abdichtung, Kleber, Fliese, Fuge, Schicht für Schicht.
- Referenzen R1: Das alte Bad wird Fliese für Fliese neu verlegt.
- Begleiter A2/B1: Eine Fuge läuft die Seite entlang, am Rand eine Fugenlehre als Fortschritt.
- Schluss S1 + S2: Die letzte Fliese wird ausgeklopft, darunter liegen Zahnkelle und Telefonnummer.

## Leistung (gilt für alle Bausteine)
- **Kein bildfüllendes WebGL.** Stripe Press schafft so ohne Grafikkarte 2 fps. Zoox (59 fps) und AirPods (52 fps) kommen mit Video, Bildfolge und transform aus.
- **Videos erst bei Sicht starten**, vorher ein Standbild (AirPods: `autoplay` aus, Abspielen per Skript, Startbild). Lieber ein kurzes Video mit mehreren Szenen als viele (Scale: ein `Packed.mp4`).
- **Bildfolgen auf ein 2D-Canvas, nie als Lottie.** ikilledacactus packt 35 MB Bilder in Lottie und kommt ohne WebGL nur auf 25 fps.
- **Ein Modell, viele Texturen**, wenn 3D: Stripe nutzt ein Buchmodell mit 84 KB für alle Bücher.
- **Bewegung reduzieren:** Jeder Baustein hat einen ruhigen Zustand für `prefers-reduced-motion` (AirPods: 23 Regeln dafür).
- Nur `transform`, `opacity`, `clip-path` animieren, nichts, was das Layout neu rechnet (W18).
- **Viele Einzelteile auf ein Canvas** (Honig-Katalog, 24.11.2026): Eine Wabe aus über 800 SVG-Zellen, die je per CSS-Variable rechnen, kostet bei jedem Bild alle Zellen neu. Ab etwa 200 bewegten Teilen in einer Szene: auf ein `<canvas>` zeichnen oder ein Muster (SVG-`<pattern>`, Maske) mit einer einzigen bewegten Ebene.
- **Keine Endlosschleifen, nur Sichtbares animieren:** Selbstlauf und Schmuckbänder laufen nur, solange sie im Bild sind (IntersectionObserver), ein Selbstlauf mit 30 Bildern/s reicht, Bereiche außerhalb mit `content-visibility: auto`. Der Honig-Katalog animierte eingebettet alle 17 Bausteine pausenlos und stürzte am iPhone ab. `vorschau.mjs --pruefen` misst das jetzt (FEHLER ab 40 % Leerlauf-Rechenzeit).

## Material echt darstellen (Rezepte)
Wenn das Material selbst die Bewegung macht, wird es nicht als Symbol gezeichnet (Simon, Honig 24.11.2026). Kleine Fläche, ein Canvas, nur solange sichtbar.
- **Honig, der läuft:** ein dünner Strahl, der unten in Schlaufen aufläuft und sich legt („Seilwurf“, wie echter Honig vom Löffel). Gezeichnet als Kette aus Punkten mit Trägheit (Verlet), langsam, weil zähflüssig. Darstellung: durchscheinender Bernstein-Verlauf quer zum Strahl (Rand dunkler, Mitte heller), ein schmaler weißer Glanzstreifen auf einer Seite, unten ein Glanzpunkt im See. Dazu leichte Verdickung, wo der Strahl auftrifft. Mit WebGL nur, wenn die Fläche klein bleibt (Brechung, Glanz), sonst Canvas 2D mit Verläufen.
- **Allgemein:** Durchscheinen (Verlauf und Transparenz), Glanzlicht (eine helle Kante), Trägheit in der Bewegung (Material hat Gewicht) und Kontakt (es staut, spritzt, legt sich). Fehlt eins davon, wirkt es wie Clipart.

