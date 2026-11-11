# Oberflächen-Standard: jede Oberfläche sieht topmodern aus

Simons Vorgabe: Oberflächen sollen immer topmodern aussehen und einen echten **Wow-Effekt** haben – auf dem Niveau aktueller Produkte wie Linear, Vercel, Stripe oder Notion, nicht wie ein Bootstrap-Formular oder der typische „KI-Look“. Gilt in jeder Besetzung. Gut sieht nicht nur das Standbild aus, sondern auch die Bewegung: jede Aktion gibt Rückmeldung, nichts springt, Erfolge fühlen sich gut an. Der Designer legt das je Projekt fest (`docs/DESIGN.md`, `design/tokens.json`), wer baut, hält sich daran.

## Technische Grundlage (wenn das Projekt nichts anderes vorgibt)
- **Web mit React/Next.js:** Tailwind CSS + shadcn/ui (Bausteine auf Radix-Basis, barrierefrei), Symbole `lucide-react`, Diagramme mit den shadcn-Charts (Recharts) bzw. Tremor für Dashboards, Schrift Inter oder Geist (selbst gehostet, kein Google-Fonts-Abruf bei Kundendaten).
- **SvelteKit:** Tailwind CSS + shadcn-svelte, `lucide-svelte`, LayerChart.
- **Ohne Framework / einzelne HTML-Datei:** Tailwind (über den Build) oder eigene CSS-Variablen nach denselben Tokens; keine Bootstrap-Standardoptik.
- **Desktop (Tauri/Electron):** dieselbe Web-Grundlage. Excel/AutoCAD-Dialoge: dort zählt Ordnung und Klarheit, nicht dieser Stack.
- **Spiele (Browser/Handy):** PixiJS (2D, schnell) oder Phaser (2D-Spielrahmen mit Szenen, Physik, Eingabe); 3D mit Three.js. Menüs und Dialoge drumherum nach diesem Standard.
- Neue Pakete wie immer über die Abhängigkeits-Schranke; Auswahl aus dem Werkzeugkasten unten.

## Gestaltungsregeln
- **Ruhe:** viel Weißraum, Abstände nur aus einer Skala (4/8/12/16/24/32 px), klare Raster, höchstens zwei Schriftgrößen je Kartenbereich.
- **Farbe:** neutrale Grundfarben (Grau-Skala) plus **eine** Akzentfarbe (bei Kunden deren Markenfarbe); Signalfarben nur für Bedeutung (Erfolg, Warnung, Fehler). Hell- und Dunkelmodus von Anfang an über Tokens.
- **Typografie:** eine Schriftfamilie, klare Hierarchie (Titel, Abschnitt, Text, Beschriftung), Zahlen in Tabellen und Kennzahlen mit gleich breiten Ziffern (`tabular-nums`).
- **Form:** Radien 8–12 px einheitlich, feine Linien (1 px, gedämpft) statt dicker Rahmen, Schatten nur dezent für schwebende Elemente.
- **Zustände für jeden Bildschirm:** leer (mit Hinweis, was zu tun ist), lädt (Skeleton statt Drehkreisel bei Inhalten), Fehler (verständlich, mit Ausweg), viele Daten (Paging/Scrollen), sehr lange Texte.
- **Bewegung:** siehe eigener Abschnitt unten – jede Animation hat einen Zweck, nie verspielt.
- **Dashboards:** Kennzahlen-Karten oben (Wert groß, Vergleich klein, Mini-Verlauf), darunter Verläufe; eine einheitliche Diagramm-Palette; Achsen und Raster dezent; Tooltips mit genauen Werten.
- **Handy zuerst mitdenken:** jeder Bildschirm bei 390 px Breite ohne waagrechtes Scrollen, Tippflächen ≥ 44 px.
- **Barrierefrei:** Kontrast mindestens WCAG AA, alles per Tastatur erreichbar, sichtbarer Fokus.

## Bewegung, Rückmeldung, Erfolgsmomente
- **Zeiten:** klein (Hover, Knopf, Häkchen) 100–250 ms · mittel (Dialog, Menü, Seitenwechsel, Liste) 250–500 ms · groß (Erfolgsmoment, erster Start, Spielszene) 500–1000 ms. Hinein schnell, hinaus etwas schneller; Federn (spring) für Dinge, die man anfasst oder zieht, weiche Kurven (ease-out) für alles andere.
- **Zweck je Animation:** Orientierung (woher kommt das, wohin geht es), Rückmeldung (Aktion angekommen), Belohnung (geschafft). Ohne Zweck → weglassen.
- **Rückmeldung bei jeder Aktion** innerhalb von 100 ms: Knopf reagiert beim Drücken, Speichern zeigt „gespeichert“ (Toast oder Häkchen), Langsames zeigt Fortschritt; optimistische Anzeige, wo sicher (Änderung sofort zeigen, bei Fehler zurücknehmen mit Meldung).
- **Erfolgsmomente:** die wenigen Stellen, an denen der Nutzer etwas geschafft hat (Ziel erreicht, Auftrag fertig, Level geschafft) bekommen einen spürbaren Moment – Häkchen-Animation, kurzer Konfetti- oder Glanzeffekt, Zahl zählt hoch, im Spiel Partikel und Ton. Sparsam: was ständig passiert, wird nicht gefeiert.
- **Flüssig (60 FPS):** nur `transform` und `opacity` animieren, nie Breite/Höhe/Position im Layout; kein springendes Layout beim Laden (Platz für Bilder und Inhalte freihalten); Listen-Änderungen weich (Einfügen, Entfernen, Umsortieren).
- **Rücksicht:** `prefers-reduced-motion` respektieren (dann nur Überblenden), nichts blinkt, Bewegung blockiert nie die Bedienung.

## Werkzeugkasten – geprüfte Bibliotheken und Material
Erst hier auswählen, statt selbst zu basteln. Alles quelloffen bzw. kostenlos auch für Firmen; vor dem Einbau die Lizenz im Paket kurz bestätigen (bei Kundenprojekten in `docs/ENTSCHEIDUNGEN.md` vermerken).

| Bereich | Erste Wahl | Wofür |
|---|---|---|
| Bewegung (React) | **Motion** (`motion`, früher Framer Motion, MIT) | Übergänge, Federn, Layout-Animation, Gesten, Seitenwechsel |
| Bewegung (aufwendig, jedes Framework) | **GSAP** (kostenlos inkl. Plugins, eigene Lizenz) | Zeitachsen, Scroll-Effekte, Text- und SVG-Animation |
| Kleine Übergänge ohne Aufwand | **AutoAnimate** (`@formkit/auto-animate`, MIT); Svelte: eingebaute `svelte/transition` | Listen, Ein-/Ausblenden mit einer Zeile |
| Fertige Effekt-Bausteine | **Magic UI** (MIT), **Aceternity UI** (Lizenz je Baustein prüfen) | auffällige Bausteine passend zu shadcn/Tailwind – sparsam, nur wo es zur Gestaltungsrichtung passt |
| Bedienbausteine | shadcn/ui, **Sonner** (Toasts), **Vaul** (Handy-Schublade), **cmdk** (Befehlspalette) | Rückmeldung, Handy-Bedienung, schnelle Suche |
| Vorgefertigte Animationen | **Lottie** (`lottie-web`/dotLottie, MIT; Animationen von LottieFiles mit deren Lizenz) | Erfolgs-, Lade- und Leer-Zustände von Designern |
| Interaktive Figuren | **Rive** (Laufzeit MIT) | bewegte Maskottchen, Knöpfe mit Zuständen, Spielfiguren |
| Freudemomente | **canvas-confetti** (ISC) | Konfetti/Glanz beim Erfolgsmoment |
| Spiel und Grafik | **PixiJS**, **Phaser**, **Three.js** / React Three Fiber (alle MIT) | 2D-Spiele, Partikel, 3D |
| Symbole | **Lucide** (ISC), **Phosphor** (MIT) | ein Stil je Projekt, nie mischen |
| Schriften | **Fontsource** (selbst gehostet) | Inter, Geist u. a. ohne Abruf bei Google |
| Prüfen | **Playwright** (Fotos, Videos, Ende-zu-Ende), **Lighthouse** (Tempo), **axe-core** (`@axe-core/playwright`, Barrierefreiheit) | Belege statt Eindruck |

**Regeln für alles aus dem Internet:** nur bekannte, gepflegte Projekte (letzte Veröffentlichung im letzten Jahr, nennenswerte Nutzung); Lizenz erlaubt Firmennutzung; über die Abhängigkeits-Schranke; nichts zur Laufzeit von fremden Servern nachladen (Schriften, Bilder, Animationen ins Projekt legen) – bei Kundendaten Pflicht; Bilder und Illustrationen nur mit klarer Lizenz (eigene, CC0 oder ausdrücklich frei), nie fremde Marken oder Produktbilder übernehmen. Vorbilder liefern Prinzipien, nicht Inhalte.

## Was nie vorkommt („KI-Look“)
Lila-blaue Verläufe als Hintergrund, Emojis als Symbole, gleichförmige Kachelwände, Platzhaltertext („Lorem ipsum“, „Beispieltitel“), zentrierte Textblöcke, Standard-Browserformulare, gemischte Symbolstile, Schatten und Rahmen gleichzeitig überall, mehr als eine Akzentfarbe.

## Harte Prüfungen ohne KI (ab der Fertigstellung Pflicht)
- **Keine Fehler in der Browser-Konsole:** Jeder Ende-zu-Ende-Test läuft mit dem Konsolen-Wächter – ein Konsolenfehler oder nicht abgefangener Fehler macht den Test rot. Playwright-Vorlage (`e2e/waechter.ts`, Tests importieren `test` von dort):
  ```ts
  import { test as basis, expect } from '@playwright/test';
  export const test = basis.extend({
    page: async ({ page }, use) => {
      const fehler: string[] = [];
      page.on('console', (m) => { if (m.type() === 'error') fehler.push(m.text()); });
      page.on('pageerror', (e) => fehler.push(e.message));
      await use(page);
      expect(fehler, 'Fehler in der Browser-Konsole').toEqual([]);
    },
  });
  export { expect };
  ```
- **Keine Build-Warnungen:** in `meilensteinbefehle` (Ergänzen darf der Projektleiter selbst) z. B. `python3 ${DEV_TEAM_PLUGIN}/scripts/ohne_warnungen.py -- npm run build` – rot bei Fehler **oder** Warnung. Dazu, wo vorhanden, `eslint --max-warnings 0` und `tsc --noEmit`.

## Screenshot-Test
Auf **einem** Bildschirmfoto je Hauptbildschirm muss man sofort erkennen: welches Produkt das ist, was die wichtigste Aktion ist, in welchem Zustand man ist. Wenn nicht: Hierarchie schärfen, bevor irgendetwas verziert wird.

## Prüfliste (Aufbau: ein Foto je geänderter Bildschirm; Fertigstellung und je Abschnitt: vollständig)
1. App starten, den Bildschirm bei **1440 px und 390 px** fotografieren (Playwright) und das Bild **ansehen**.
2. Abstände aus der Skala? Ausrichtung sauber (Kanten fluchten)? Nichts überlappt, nichts abgeschnitten, kein waagrechtes Scrollen?
3. Leer-, Lade- und Fehlerzustand vorhanden und gesehen?
4. Dunkelmodus angesehen?
5. Bewegung: Rückmeldung bei jeder Aktion, keine harten Sprünge, Erfolgsmomente da (in der Fertigstellung per **Video** der Hauptabläufe, siehe Designer Modus `treue`)?
6. Konsolen-Wächter und Build ohne Warnungen grün? Screenshot-Test bestanden?
7. Sieht es aus wie ein Produkt, für das man bezahlen würde – und würde man das Video teilen? Wenn nein: was genau nicht – und das zuerst beheben.
