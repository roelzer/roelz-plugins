# Oberflächen-Standard: jede Oberfläche sieht topmodern aus

Simons Vorgabe: Oberflächen sollen immer topmodern aussehen – auf dem Niveau aktueller Produkte wie Linear, Vercel, Stripe oder Notion, nicht wie ein Bootstrap-Formular oder der typische „KI-Look“. Gilt in jeder Besetzung. Der Designer legt das je Projekt fest (`docs/DESIGN.md`, `design/tokens.json`), wer baut, hält sich daran.

## Technische Grundlage (wenn das Projekt nichts anderes vorgibt)
- **Web mit React/Next.js:** Tailwind CSS + shadcn/ui (Bausteine auf Radix-Basis, barrierefrei), Symbole `lucide-react`, Diagramme mit den shadcn-Charts (Recharts) bzw. Tremor für Dashboards, Schrift Inter oder Geist (selbst gehostet, kein Google-Fonts-Abruf bei Kundendaten).
- **SvelteKit:** Tailwind CSS + shadcn-svelte, `lucide-svelte`, LayerChart.
- **Ohne Framework / einzelne HTML-Datei:** Tailwind (über den Build) oder eigene CSS-Variablen nach denselben Tokens; keine Bootstrap-Standardoptik.
- **Desktop (Tauri/Electron):** dieselbe Web-Grundlage. Excel/AutoCAD-Dialoge: dort zählt Ordnung und Klarheit, nicht dieser Stack.
- Neue Pakete wie immer über die Abhängigkeits-Schranke.

## Gestaltungsregeln
- **Ruhe:** viel Weißraum, Abstände nur aus einer Skala (4/8/12/16/24/32 px), klare Raster, höchstens zwei Schriftgrößen je Kartenbereich.
- **Farbe:** neutrale Grundfarben (Grau-Skala) plus **eine** Akzentfarbe (bei Kunden deren Markenfarbe); Signalfarben nur für Bedeutung (Erfolg, Warnung, Fehler). Hell- und Dunkelmodus von Anfang an über Tokens.
- **Typografie:** eine Schriftfamilie, klare Hierarchie (Titel, Abschnitt, Text, Beschriftung), Zahlen in Tabellen und Kennzahlen mit gleich breiten Ziffern (`tabular-nums`).
- **Form:** Radien 8–12 px einheitlich, feine Linien (1 px, gedämpft) statt dicker Rahmen, Schatten nur dezent für schwebende Elemente.
- **Zustände für jeden Bildschirm:** leer (mit Hinweis, was zu tun ist), lädt (Skeleton statt Drehkreisel bei Inhalten), Fehler (verständlich, mit Ausweg), viele Daten (Paging/Scrollen), sehr lange Texte.
- **Bewegung:** kurze, weiche Übergänge (150–200 ms) bei Öffnen, Wechseln, Hover; nie verspielt.
- **Dashboards:** Kennzahlen-Karten oben (Wert groß, Vergleich klein, Mini-Verlauf), darunter Verläufe; eine einheitliche Diagramm-Palette; Achsen und Raster dezent; Tooltips mit genauen Werten.
- **Handy zuerst mitdenken:** jeder Bildschirm bei 390 px Breite ohne waagrechtes Scrollen, Tippflächen ≥ 44 px.
- **Barrierefrei:** Kontrast mindestens WCAG AA, alles per Tastatur erreichbar, sichtbarer Fokus.

## Was nie vorkommt („KI-Look“)
Lila-blaue Verläufe als Hintergrund, Emojis als Symbole, gleichförmige Kachelwände, Platzhaltertext („Lorem ipsum“, „Beispieltitel“), zentrierte Textblöcke, Standard-Browserformulare, gemischte Symbolstile, Schatten und Rahmen gleichzeitig überall, mehr als eine Akzentfarbe.

## Prüfliste nach jedem Feature mit Oberfläche (wer gebaut hat, vor dem Commit)
1. App starten, den Bildschirm bei **1440 px und 390 px** fotografieren (Playwright) und das Bild **ansehen**.
2. Abstände aus der Skala? Ausrichtung sauber (Kanten fluchten)? Nichts überlappt, nichts abgeschnitten, kein waagrechtes Scrollen?
3. Leer-, Lade- und Fehlerzustand vorhanden und gesehen?
4. Dunkelmodus angesehen?
5. Sieht es aus wie ein Produkt, für das man bezahlen würde? Wenn nein: was genau nicht – und das zuerst beheben.
