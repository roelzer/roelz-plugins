# Profi-Recherche Website-Bauer (18.11.2026)

Vier Stränge, jeweils mit der Fehlerliste aus `probelauf.md` (W1–W9): **A** die besten Studios, **B** Design-Agenten und Studien, **C** Werkzeugstand, **D** Preisträger zerlegt und gemessen. Es zählen nur Quellen, die im Lauf geöffnet wurden. Die Rechercheure haben zu jeder Aussage ein Zitat geliefert. Hier stehen die Kernaussagen mit Quelle. Belastbarkeit: hoch / mittel / niedrig.

## Gegenmittel je Fehler

### W1 Vorlagen- und KI-Look
| Praktik | Quelle | Belastbarkeit |
|---|---|---|
| **Eine Idee vor dem ersten Pixel, aus echten Merkmalen des Auftraggebers** (Logo, Material, Ort, Werkzeug). Markentausch-Test: Passt die Seite genauso zu einem Konkurrenten, wird sie verworfen. | Lusion „The pipeline follows the idea, not the other way around“ (blog.lusion.co); Lando-Norris-Neon stammt vom Helm (designrush.com); Hon Tran „originality with intent“ | mittel |
| **Erst Plan, dann Prüfung gegen die Standardlösung:** 4–6 Farben, Schriftrollen, Layout-Skizze. „Käme ich bei einem ähnlichen Auftrag genauso hierhin?“ Den Branchen-Standard **und** sein vorhersehbares Gegenteil ausschließen. | Anthropic-Skill frontend-design (github.com/anthropics/skills) „if any part of it reads like the generic default … revise“; Impeccable `new-work-world.md` „the page this category always ships and its predictable opposite; both are the rut“ | hoch |
| **Liste der KI-Merkmale als Regel und als Prüfskript.** Die Probelauf-Looks stehen fast wörtlich darauf: „near-black background with a single bright acid-green … accent“, Karten-Baukasten, Großbuchstaben-Label über jeder Überschrift, fade-and-slide-up bei jeder Sektion. | Anthropic-Skill 2026; Impeccable (62 feste Regeln, als Hook); Anthropic Cookbook 2025 | hoch |
| **Keine festen Schriftlisten und keine Superlative im Prompt.** Beides erzeugt den nächsten Einheitslook (Space Grotesk, Creme mit Terrakotta, „museum quality“). Gestaltung aus Branche, Material und Fachsprache ableiten. | Anthropic Cookbook gibt die Konvergenz selbst zu; Anthropic Harness-Artikel (03/2026) | mittel |
| **Typo-Maße der Preisträger:** Headline 4- bis 10-mal so groß wie der Fließtext, negative Laufweite −0,01 bis −0,05 em bei großen Headlines, Fließtext 30–64 ch breit (Practical Typography: 45–90 Zeichen), keine der 11 Seiten nutzt Inter. | Messung an 11 Preisträgern (D); practicaltypography.com | mittel |
| **Zwei Grundfarben, höchstens ein Akzent**, warm-erdig oder Schwarz-Weiß. Nachtblau mit Neon kam bei keinem Preisträger vor. | Awwwards-Palettenangaben, Bildschirmfotos (D) | mittel |
| **Bewegung:** Bedienelemente 150–400 ms, große einmalige Einblendungen 600–1000 ms, immer abbremsend (z. B. cubic-bezier(.19,1,.22,1)), nie linear. **Ein** Wow-Moment je Seite, sonst nur ruhige Einblendungen. | NN/g Animation Duration „100–400 ms“, „ease-out“; Material 3 Motion-Tokens; Apple HIG Motion „Don't add motion for the sake of adding motion“; CSS der Preisträger | hoch (Zeiten) / mittel („genau 1“) |
| Sperrliste der Billig-Signale: Cursor-Blob, Standard-Lenis, Boilerplate-WebGL-Fläche, alles schwebt, Stockfoto-Optik, Zierschrift überall. | Hon Tran; webdesignawards.io | niedrig |

### W2 Kein echtes Motiv
| Praktik | Quelle | Belastbarkeit |
|---|---|---|
| **Echtes Motiv trägt, 3D ist nur Zugabe.** Alle 11 Preisträger leben von echten Fotos, Videos oder echtem Produktmaterial. 3D liegt immer auf etwas Echtem (Helm auf Porträt, Gläser mit echten Etiketten). | Stichprobe von 11 Preisträgern (D) | mittel |
| **Echtheit vorab erzeugen statt im Browser berechnen:** Material fotografieren, gemalte Bilder, in Blender gerenderte Bildfolgen. Selbst Lusion fand Echtzeit-Materialien zu schwach. | Lusion Oryzo BTS (180 RAW-Fotos für Rinde); Immersive Garden Rainforest Foods (Matte Painting mit Parallax) | mittel |
| **Freie Fotos herunterladen und selbst hosten** (Unsplash, Pexels: kommerziell, ohne Namensnennung). Die Unsplash-API nicht zur Laufzeit nutzen, sie verlangt Hotlinking. Poly Haven CC0 für HDRIs und Texturen. | unsplash.com/license; help.unsplash.com API Guidelines; pexels.com/license; polyhaven.com/license | hoch |
| **Ersatz sichtbar als Ersatz markieren** und eine Austauschliste übergeben. Selbst gezeichnete Szenen oder Maskottchen gelten als KI-Merkmal. | Impeccable `/slop`, SKILL.md „Ship real imagery when the brief needs it“ | mittel |
| **Wenn Echtzeit-3D:** Licht in Blender einbacken, wenige direkte Lichter, Farbmanagement prüfen (Farbtexturen sRGB, Datentexturen linear, Tone Mapping an, AgX). Falsches Farbmanagement ist ein Hauptgrund für den Spielgrafik-Look. | Don McCurdy (three.js) „Color management in three.js“; discoverthreejs.com „Bake lighting“; Three.js Journey | hoch |
| **Graue Rohfassung zuerst:** Aufbau und Weg des Besuchers in Graustufen festlegen, als Bildschirmfoto prüfen, erst dann Material. | Abeto, Igloo Inc Case Study (Awwwards SOTY 2024) „grey mockups and sketches“; Bornfight | mittel–hoch |

### W3 Vorbilder nicht angesehen
| Praktik | Quelle | Belastbarkeit |
|---|---|---|
| **Vorbilder öffnen und fotografieren, daraus zuerst Gestaltungswerte (Tokens) ableiten, dann bauen.** Je genauer die Bildvorlage, desto besser das Ergebnis. Ein benannter Stil schlägt Adjektive. | NN/g „AI Prototyping in Real Design Contexts“ (10/2025) „The higher the fidelity of the attached file, the more accurately the design was translated“; NN/g „Prompt to Design“ (12/2025); Anthropic Claude Design (04/2026); Impeccable „two or three products this should sit alongside … make their craft level the bar“ | mittel–hoch |
| Im Probelauf war die einzige Seite mit wirklich angesehenen Vorbildern (P4) die stärkste. | `probelauf.md` | Beobachtung |

### W4 Erfundenes
| Praktik | Quelle | Belastbarkeit |
|---|---|---|
| **Wahrheitsregel:** Preise, Kunden, Lebenslauf, Versprechen und Fähigkeiten werden nie erfunden. Markierter Platzhalter plus Liste „was du ersetzen musst“. Achtung: Der offizielle Anthropic-Skill lädt sonst dazu ein, Texte selbst zu erfinden. | Impeccable `new-work-world.md`; Anthropic-Skill „Build with the brief's real content“ | mittel |

### W5 Nur Selbstprüfung
| Praktik | Quelle | Belastbarkeit |
|---|---|---|
| **Eigener skeptischer Kritiker** in frischem Kontext, öffnet die laufende Seite selbst. Design-Qualität und Originalität zählen mehr als Handwerk. | Anthropic Engineering „Harness design for long-running apps“ (03/2026) „agents reliably skew positive when grading their own work“; Impeccable `critique.md` (Urteil und Prüfskript getrennt); Duan u. a. (Self-Bias) | hoch |
| **Schleife Bildschirmfoto → Kritik → Fix, etwa 3 Runden, die beste Fassung behalten** (nicht die letzte). Mit Bildkritik +17,8 %, ohne +1,5 %. Ein Bewerter mit mehreren Kriterien stimmt zu 69,5 % mit Menschen überein, einer mit nur einer Gesamtnote zu 48,5 %. | Sansford u. a. (Amazon, ICLR-2026-Workshop); Anthropic Harness „plateauing“ | hoch |
| **Kriterien wie die Awwwards-Jury:** Design 40 %, Usability 30 %, Kreativität 20 %, Inhalt 10 %. Mehrere Urteile, Ausreißer streichen. **Für Betriebsseiten Usability und Inhalt höher gewichten**, denn bei 9 von 11 Preisträgern war Usability die schwächste Note. | awwwards.com/about-evaluation; Messung D | hoch (Verfahren) |
| **Dem KI-Kritiker nur zutrauen, was er kann:** klare Fehler mit Beleg und deutlich verschiedene Fassungen. Bei feinen Geschmacksfragen liegt er nahe am Zufall (Paarvergleich ca. 60 %, bei großem Abstand ca. 93 %). Wenige Beispiele von Fachleuten verbessern ihn um 55 %. **Simon entscheidet über Wow.** | „MLLM as a UI Judge“ (arXiv 2510.08783); UICrit (UIST 2024) | hoch |

### W6 3D-Leistung auf schwacher Hardware
| Praktik | Quelle | Belastbarkeit |
|---|---|---|
| **Gemessen an 11 Preisträgern ohne Grafikkarte:** WebGL über die ganze Fläche bricht auf 1–4 fps ein (Lando, Colombel, JJ, SANTAL). Foto, Video und 3D zum Zuschalten laufen flüssig (Agrumea, ESR 60 fps). | Messung D (SwiftShader, 4 Kerne) | mittel |
| **3D zum Einschalten statt Pflicht, dazu eine Stufe ohne WebGL.** Qualitätsstufen mit detect-gpu (Stufe 0 unter 15 fps → kein WebGL), aber nur mit selbst gehosteten Messdaten (Standard lädt von unpkg). | Belgrade Arbor (SOTD 10/2026); github.com/pmndrs/detect-gpu; Ben Houston (Web3DSurvey) | hoch |
| **Rechenlast deckeln:** Größe der Zeichenfläche ist der wirksamste Hebel (50 % → 16 auf 33 fps). Pixeldichte am Desktop höchstens 1,25 (so macht es die Site of the Year 2025), sonst höchstens 2. Post-Effekte und Kantenglättung weg. | web.dev Case Study „The Hobbit Experience“; Code von landonorris.com; discoverthreejs.com | hoch |
| **3D-Budget:** höchstens 100k Dreiecke (gut 30–50k), Texturen höchstens 2048², höchstens 10 Materialien, Modell höchstens 10 MB, mit gltf-transform/Meshopt komprimieren; mit `renderer.info` prüfen. | Google Scene Viewer (für AR auf Handys, daher nur Richtwert); discoverthreejs.com | mittel |
| **Kamerafahrt vorab rendern** (Bildfolge auf `<canvas>` oder Video) statt Echtzeit-3D, mit Datenbudget und einem Ersatzbild bei langsamer Leitung. Negativbeispiele: 55,8 MB, 57 MB, 82 MB. | CSS-Tricks (Nachbau der Apple-Seiten); Messung D | mittel |
| **Leistung nie headless als Abnahme:** Ohne Grafikkarte rechnet headless Chrome mit Software (SwiftShader). Abnahme auf Simons echtem Laptop (DevTools, fps, Long Tasks über 50 ms). Headless nur für Funktion, Bilder und den Vergleich robust gegen fragil. | chromium.googlesource.com (swiftshader.md); developer.chrome.com Performance; web.dev Long Tasks | hoch |
| Erst CSS Scroll-driven Animations (Baseline seit 27.10.2026), GSAP nur für Aufwendiges. | web-platform-dx web-features-explorer | hoch |

### W7 Arbeitsdateien im Lieferordner, W8 übersehene Darstellungsfehler
| Praktik | Quelle | Belastbarkeit |
|---|---|---|
| **Design-QA als eigene Stufe mit dem Auftrag „kaputtmachen“:** feste Breiten (375/768/1440, dazu 320/1920), ganze Seite, Entwurf bzw. Vorbild daneben, Probleme mit Bildbeleg statt Code-Lösungen. | Infinum-Handbuch „deliberately trying to break them“; OneRedOak design-review-agent; Impeccable | mittel |
| Playwright `toHaveScreenshot` an festen Scrollstellen als Rückfallschutz (fängt neue Fehler nach Freigabe, nicht den ersten). | playwright.dev/docs/test-snapshots | hoch / mittel |
| Lieferordner getrennt von Arbeitsordner (`site/` vs. `arbeit/`), Prüfung per Skript. | kein Fachbeleg, Probelauf-Befund | – |
| Leere oder schwarze Flächen automatisch finden (Farbverteilung je Abschnitt im ganzseitigen Bildschirmfoto). | unbelegt, eigene Idee | – |

### W9 Text über Bild
| Praktik | Quelle | Belastbarkeit |
|---|---|---|
| **Kontrast aus den Pixeln des Bildschirmfotos messen**, gegen die hellste Stelle hinter heller Schrift, an mehreren Scrollstellen: mindestens 4,5:1, große Schrift 3:1 (4,499 besteht nicht). axe bzw. Lighthouse prüfen Text auf Hintergrundbildern **gar nicht**. | W3C WCAG 2.2 F83 und 1.4.3; Deque axe-Regel „will not report on text elements that have a background-image“ | hoch |
| Text nur auf ruhige, dunkle Bildzonen oder mit Abdunklung (Verlauf mit 50 % statt 30 % Deckkraft). | NN/g „Text over images“; Preisträger LPAS, ESR, Scout | hoch |

## Werkzeuge (Stand 18.11.2026, alle kostenlos)
GSAP 3.15.1 (Webflow-Standardlizenz, kommerziell frei, Version fest, lokal) · CSS Scroll-driven Animations · three.js r187 mit WebGLRenderer · gltf-transform 4.5.1 · Blender 5.2 für vorab gerenderte Bilder · Poly Haven (CC0) · Unsplash/Pexels heruntergeladen · sharp 0.35.5 (AVIF/WebP) · Astro 7.4 oder Vite 8.3 · Playwright 1.65.1 · axe-core 4.14 · Lighthouse CI 0.16 · Cloudflare Workers Static Assets (statische Anfragen frei und unbegrenzt).
Nicht: Spline für fertige Seiten (Free mit Wasserzeichen, glTF erst ab 25 $/Monat), Unsplash-API zur Laufzeit, WebGPU als Pflicht (fehlt in Firefox), lokale Bild-KI ohne Grafikkarte, Schriften von Typekit/Google-Servern.

## Recht (Kurzfassung, keine Rechtsberatung)
Impressum nach § 5 DDG bei geschäftsmäßigen Seiten. Ohne Cookies, Browser-Speicher, Tracker und fremde Server ist nach § 25 TDDDG keine Einwilligung und damit kein Banner nötig (prüfbar). Google Fonts nur selbst gehostet (LG München I, 3 O 17493/20). Fontshare ist kostenlos kommerziell, aber nicht OFL (Lizenzdatei lesen).

## Gegenstimmen
- Wow schadet, wenn es die Bedienung stört: NN/g „scrolljacking leads to more user pain than benefits“. Keine Scroll-Übernahme mit wichtigem Text, am Handy meiden, nicht ganz oben.
- WCAG 2.2.2: Automatische Bewegung über 5 s braucht eine Pause-Möglichkeit.
- Ladezeit: 0,1 s schneller bringt laut einer von Google beauftragten Studie 8,4 % mehr Abschlüsse im Handel (Belastbarkeit mittel).
- Awwwards-Noten sind kein Erfolgsmaß für Betriebsseiten (Inhalt zählt dort nur 10 %).

## Vorbilder für Simon (Stopp 1)
11 Preisträger 2024–2026, alle geöffnet und gemessen: htarchitecte.com, belgradearbor.rs, lpas.com, santalarch.com (nur Schrift, ruckelt ohne Grafik), esrbespoke.au (Handwerk, echte Werkstatt), agrumeafarm.it (3D mit echten Etiketten, flüssig), landonorris.com (SOTY 2025, ruckelt ohne Grafik), jjettas.com (Sammelkarten, übertragbar auf Verein), guillaumecolombel.fr, silent-house.com, scoutmotors.com. Bildschirmfotos liegen in der Sitzung, nicht im Repo (fremde Urheberrechte).

## Unbelegt
Vorbild-Bildschirmfotos als Beispiele für den KI-Kritiker bei Websites · automatische Erkennung leerer Flächen · Obergrenze für Draw Calls auf iGPU · Messungen auf echter Prozessorgrafik (nur SwiftShader) · Core Web Vitals der Preisträger · Prozessberichte weiterer Studios (Codrops blockiert) · Tagessieger bei Vereinsseiten · Impressumspflicht für Vereine.

## Herkunft der Regeln im Plugin
| Regel (Datei, Abschnitt) | gegen | Herkunft |
|---|---|---|
| handwerk.md 1 Idee, Markentausch, Plan gegen Standard und Gegenteil, keine Superlative | W1 | Lusion, OFF+BRAND/Lando, Anthropic-Skill frontend-design, Impeccable, Anthropic Harness-Artikel; echter Fall Dorfverein (Flutlicht) |
| handwerk.md 2 Vorbilder öffnen, Tabelle der Werte | W3 | Probelauf P4, NN/g (2025), Impeccable, Anthropic Claude Design |
| handwerk.md 3 KI-Merkmale | W1 | Anthropic-Skill 2026, Impeccable, Anthropic Cookbook; Probelauf P1/P2 |
| handwerk.md 4 Zahlen | W1 | Messung an 11 Preisträgern (Strang D), NN/g, Material 3, Practical Typography, Apple HIG |
| handwerk.md 5 Echtes Motiv, 3D aus Fotos | W2 | Strang D (11 Preisträger), Lusion, Immersive Garden, The Rundown, Muster vom 18.11. |
| handwerk.md 6 Lesbarkeit | W9 | W3C F83/1.4.3, Deque axe-Doku, NN/g; Probelauf P3 |
| handwerk.md 7 Nichts erfinden | W4 | Probelauf P2, Impeccable |
| handwerk.md 9, pruefen.mjs W7 Lieferung | W7 | Probelauf P1/P3/P4 |
| 3d-leistung.md | W6, W2 | Simons Laptop-Test, Strang D (Messung), web.dev Hobbit, Code landonorris.com, discoverthreejs, Don McCurdy, detect-gpu, CSS-Tricks, Blender-Messung 18.11. |
| bilder.md | W2 | Lizenzseiten Unsplash, Pexels, Poly Haven, Openverse-API (selbst getestet 18.11.), LG München I |
| recht.md | Recht | DDG § 5, TDDDG § 25, LG München I |
| Skill: Kritiker, 3 Runden, beste Fassung behalten | W5, W8 | Anthropic Harness-Artikel, Sansford u. a. (Amazon), MLLM as a UI Judge, UICrit |
| Skill: Stopp 1 mit grauen Rohfassungen | W1, W3 | Abeto (Igloo Inc), Bornfight, Ablauf Video-Editor |
| Sperren und Abschluss-Sperre | Grenzen, W5 | Simons Entscheidungen 18.11., Lehre Video-Editor (Pflichtschritte als Sperre) |
