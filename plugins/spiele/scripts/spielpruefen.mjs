#!/usr/bin/env node
// Prüfskript des Spiele-Bauers, ohne KI und an keine Engine gebunden (reines Canvas, Kaplay, Phaser, three.js, DOM).
// Misst, was im Probelauf (24.11.2026) niemand geprüft hat: fremde Server, Hochkant am Handy, Bildzeit auf schwachem
// Gerät, Einbetten per iframe, Regelkarte vor dem Start und – mit --bot – ob man punkten, verlieren und neu starten kann.
//
// Aufruf: node spielpruefen.mjs <spiel-ordner oder index.html> <ziel-ordner> [--bot] [--schnell]
//   schreibt <ziel>/pruefung.json (alle Befunde), <ziel>/leistung.json (Bildzeit) und <ziel>/fotos/*.png
//   --bot      spielt über window.game.step() und render_game_to_text() mit festem Zufall (?seed=42)
//   --schnell  kürzere Messungen (für Tests)
// Exit 1, wenn ein FEHLER gefunden wurde, 2 bei Bedienfehlern oder wenn der Browser nicht startet.
//
// Das Spiel wird über einen kleinen Server auf 127.0.0.1 geladen (Module laufen unter file:// nicht). Als „fremd“ zählt
// jede Anfrage, die nicht an diesen Server, an data:, blob: oder about: geht. Fremde Anfragen werden abgebrochen, das
// Spiel läuft also so, wie es offline laufen würde.
import { createRequire } from "node:module";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);
const args = process.argv.slice(2);
const BOT = args.includes("--bot");
const SCHNELL = args.includes("--schnell");
const [quelle, ziel] = args.filter((a) => !a.startsWith("--"));
if (!quelle || !ziel) { console.error("Aufruf: node spielpruefen.mjs <spiel-ordner oder index.html> <ziel-ordner> [--bot] [--schnell]"); process.exit(2); }

const lade = (name) => { for (const o of [process.cwd(), path.dirname(path.resolve(quelle))]) { try { return require(require.resolve(name, { paths: [o] })); } catch {} } try { return require(name); } catch { return null; } };
const pw = lade("playwright");
if (!pw) { console.error("Playwright fehlt: npm i -D playwright && npx playwright install chromium"); process.exit(2); }

const quellPfad = path.resolve(quelle);
const istDatei = fs.existsSync(quellPfad) && fs.statSync(quellPfad).isFile();
const wurzel = istDatei ? path.dirname(quellPfad) : quellPfad;
const startDatei = istDatei ? path.basename(quellPfad) : "index.html";
if (!fs.existsSync(path.join(wurzel, startDatei))) { console.error(`Nicht gefunden: ${path.join(wurzel, startDatei)}`); process.exit(2); }
const zielPfad = path.resolve(ziel);
fs.mkdirSync(path.join(zielPfad, "fotos"), { recursive: true });

// Sicherheitsnetz: Ein Spiel, das hängt, darf das Skript nicht festhalten.
const wachhund = setTimeout(() => { console.error("Abbruch: Prüfung dauerte länger als 4 Minuten (Spiel hängt?)"); process.exit(2); }, 240_000);
wachhund.unref();

const befunde = [];
const melde = (schwere, fehler, text) => befunde.push({ schwere, fehler, text });
const mitFrist = (p, ms, wert = null) => Promise.race([p, new Promise((r) => setTimeout(() => r(wert), ms))]);
const warte = (ms) => new Promise((r) => setTimeout(r, ms));

// ---------- kleiner Server: Spiel auf einem Port, äußere Testseite für den iframe-Test auf einem zweiten (fremder Ursprung)
const TYP = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".json": "application/json",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".gif": "image/gif", ".svg": "image/svg+xml",
  ".woff2": "font/woff2", ".woff": "font/woff", ".ttf": "font/ttf", ".otf": "font/otf", ".mp3": "audio/mpeg", ".ogg": "audio/ogg", ".wav": "audio/wav",
  ".glb": "model/gltf-binary", ".gltf": "model/gltf+json", ".bin": "application/octet-stream", ".wasm": "application/wasm" };
function server(antwort) {
  return new Promise((r) => {
    const s = http.createServer(antwort);
    s.listen(0, "127.0.0.1", () => r(s));
  });
}
const spielServer = await server((req, res) => {
  const rein = decodeURIComponent(new URL(req.url, "http://x").pathname);
  const p = path.join(wurzel, rein === "/" ? startDatei : rein);
  if (!p.startsWith(wurzel) || !fs.existsSync(p) || !fs.statSync(p).isFile()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "content-type": TYP[path.extname(p).toLowerCase()] || "application/octet-stream" });
  fs.createReadStream(p).pipe(res);
});
const spielUrl = `http://127.0.0.1:${spielServer.address().port}/${encodeURI(startDatei)}`;
const huelleServer = await server((req, res) => {
  res.writeHead(200, { "content-type": "text/html; charset=utf-8" });
  res.end(`<!doctype html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;font:16px sans-serif}p{margin:0;padding:16px;height:400px;background:linear-gradient(#eee,#ccc)}iframe{display:block;width:100%;height:560px;border:0}</style></head>
<body><p>Vereinsseite oben</p><iframe id="spiel" src="${spielUrl}" allow="autoplay; fullscreen"></iframe>${"<p>Text darunter</p>".repeat(8)}</body></html>`);
});
const huelleUrl = `http://127.0.0.1:${huelleServer.address().port}/`;
const eigeneUrsprunge = [new URL(spielUrl).origin, new URL(huelleUrl).origin];

let browser;
try {
  browser = await pw.chromium.launch({ args: ["--ignore-gpu-blocklist", "--autoplay-policy=user-gesture-required"] });
} catch (e) { console.error("Chromium startet nicht: " + e.message.split("\n")[0] + " (npx playwright install chromium)"); process.exit(2); }

const fremde = new Set();
async function neueSeite(breite, hoehe, touch) {
  const ctx = await browser.newContext({ viewport: { width: breite, height: hoehe }, hasTouch: touch, isMobile: touch, deviceScaleFactor: 1 });
  await ctx.route("**/*", (route) => {
    const u = route.request().url();
    if (/^(data|blob|about):/i.test(u) || eigeneUrsprunge.some((o) => u.startsWith(o))) return route.continue();
    fremde.add(u.slice(0, 140));
    return route.abort();
  });
  const seite = await ctx.newPage();
  seite.setDefaultTimeout(8000);
  const fehler = [];
  seite.on("pageerror", (e) => fehler.push(e.message.split("\n")[0]));
  return { ctx, seite, fehler };
}
async function oeffne(seite, url) {
  try { await seite.goto(url, { waitUntil: "load", timeout: 15000 }); } catch (e) { melde("FEHLER", "S0", `Spiel lädt nicht in 15 s (${e.message.split("\n")[0]})`); return false; }
  await warte(800);
  return true;
}
const mitte = (seite) => { const v = seite.viewportSize(); return { x: Math.round(v.width / 2), y: Math.round(v.height / 2) }; };
async function ersteBeruehrung(seite, touch) {
  const m = mitte(seite);
  try { if (touch) await seite.touchscreen.tap(m.x, m.y); else await seite.mouse.click(m.x, m.y); } catch {}
  try { await seite.keyboard.press("Space"); } catch {}
}

// Was die Seite vor der ersten Eingabe zeigt (Regelkarte?) und wie die Spielfläche liegt
const LAGE = () => {
  const sichtbar = (el) => { const s = getComputedStyle(el); const r = el.getBoundingClientRect(); return s.display !== "none" && s.visibility !== "hidden" && Number(s.opacity) > 0.05 && r.width > 1 && r.height > 1 && r.bottom > 0 && r.top < innerHeight; };
  const kandidaten = [...document.querySelectorAll("canvas, svg, [data-spielflaeche]")].filter((el) => !el.closest("svg") || el.tagName.toLowerCase() === "svg" && !el.parentElement.closest("svg")).filter(sichtbar);
  const markiert = kandidaten.filter((el) => el.hasAttribute("data-spielflaeche"));
  let beste = null, flaeche = 0;
  for (const el of markiert.length ? markiert : kandidaten) {
    const r = el.getBoundingClientRect();
    const h = Math.max(0, Math.min(innerHeight, r.bottom) - Math.max(0, r.top)), b = Math.max(0, Math.min(innerWidth, r.right) - Math.max(0, r.left));
    if (h * b > flaeche) { flaeche = h * b; beste = { tag: el.tagName.toLowerCase() + (el.id ? "#" + el.id : ""), hoehe: Math.round(h), breite: Math.round(b), markiert: el.hasAttribute("data-spielflaeche") }; }
  }
  if (typeof window.game?.spielflaeche === "function") { try { const s = window.game.spielflaeche(); if (s && s.h) beste = { tag: "game.spielflaeche()", hoehe: Math.round(s.h), breite: Math.round(s.w || 0), markiert: true }; } catch {} }
  const text = (document.body?.innerText || "").trim();
  const listen = [...document.querySelectorAll("ol")].filter(sichtbar).map((ol) => [...ol.children].filter((li) => li.tagName === "LI" && sichtbar(li)).length);
  // nachgebaute Listen: kleine Abzeichen „1“, „2“, „3“ … (Probelauf: Regelkarte aus div-Kreisen statt <ol>)
  const nummern = new Set([...document.querySelectorAll("body *")].filter((el) => !el.children.length && /^\s*[1-9][.)]?\s*$/.test(el.textContent) && sichtbar(el)).map((el) => parseInt(el.textContent)));
  let folge = 0; while (nummern.has(folge + 1)) folge++;
  listen.push(folge >= 3 ? folge : 0);
  const st = (el) => getComputedStyle(el).touchAction;
  return { flaeche: beste, hoehe: innerHeight, woerter: text ? text.split(/\s+/).length : 0, listePunkte: Math.max(0, ...listen),
    querScroll: document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
    touchHtml: st(document.documentElement), touchBody: document.body ? st(document.body) : "" };
};

// Bildzeit: eigener rAF-Zähler. Hängt der Hauptfaden am Spiel, kommen auch diese Bilder später.
const BILDZEIT = (ms) => new Promise((fertig) => {
  const zeiten = []; let letzte = performance.now(); const start = letzte;
  const schritt = (t) => { zeiten.push(t - letzte); letzte = t; if (t - start < ms) requestAnimationFrame(schritt); else {
    const s = [...zeiten].sort((a, b) => a - b); const p = (q) => s[Math.min(s.length - 1, Math.floor(q * s.length))] || 0;
    fertig({ bilder: zeiten.length, fps: Math.round(zeiten.length / ((t - start) / 1000) * 10) / 10, median_ms: Math.round(p(0.5) * 10) / 10, p95_ms: Math.round(p(0.95) * 10) / 10, ueber_50ms: zeiten.filter((z) => z > 50).length });
  } };
  requestAnimationFrame(schritt);
});
const RENDERER = () => { try { const c = document.createElement("canvas"); const g = c.getContext("webgl2") || c.getContext("webgl"); if (!g) return "kein WebGL"; const e = g.getExtension("WEBGL_debug_renderer_info"); return e ? g.getParameter(e.UNMASKED_RENDERER_WEBGL) : g.getParameter(g.RENDERER); } catch (e) { return "unbekannt"; } };

async function bewegen(seite, dauer) {
  // während der Messung „spielen“: kleine Bewegungen und Tipper, damit das Spiel aktiv bleibt
  const v = seite.viewportSize(); const ende = Date.now() + dauer; let i = 0;
  while (Date.now() < ende) {
    const x = v.width * (0.3 + 0.4 * Math.abs(Math.sin(i * 0.7))), y = v.height * (0.45 + 0.2 * Math.cos(i));
    try { await seite.mouse.move(x, y, { steps: 3 }); if (i % 4 === 0) await seite.mouse.click(x, y); } catch {}
    i++; await warte(150);
  }
}

const ergebnis = { spiel: path.join(wurzel, startDatei), zeit: new Date().toISOString() };
const messDauer = SCHNELL ? 2000 : 3000;

// ---------- 1. Handy hochkant 390×844
{
  const { ctx, seite, fehler } = await neueSeite(390, 844, true);
  if (await oeffne(seite, spielUrl)) {
    const vorher = await mitFrist(seite.evaluate(LAGE), 5000);
    if (vorher && (vorher.woerter > 60 || vorher.listePunkte >= 3))
      melde("Hinweis", "S6", `Regelkarte? Vor der ersten Eingabe stehen ${vorher.woerter} Wörter${vorher.listePunkte >= 3 ? ` und eine nummerierte Liste mit ${vorher.listePunkte} Punkten` : ""}. Besser durch Spielen beibringen, erste Berührung = Spielaktion.`);
    await seite.screenshot({ path: path.join(zielPfad, "fotos", "hochkant-start.png") }).catch(() => {});
    await ersteBeruehrung(seite, true);
    await warte(2000);
    const lage = await mitFrist(seite.evaluate(LAGE), 5000);
    await seite.screenshot({ path: path.join(zielPfad, "fotos", "hochkant-spiel.png") }).catch(() => {});
    if (!lage) melde("FEHLER", "S0", "Seite antwortet nicht (Hauptfaden blockiert?)");
    else {
      ergebnis.hochkant = lage;
      if (!lage.flaeche) melde("Hinweis", "S2", "Keine Spielfläche erkannt (canvas, svg oder ein Element mit data-spielflaeche), Hochkant-Anteil nicht gemessen. Bei DOM-Spielen die Fläche mit data-spielflaeche markieren.");
      else {
        const anteil = Math.round((lage.flaeche.hoehe / lage.hoehe) * 100) / 100;
        ergebnis.hochkant.anteil = anteil;
        if (anteil < 0.5) melde("FEHLER", "S2", `Hochkant 390×844: Spielfläche (${lage.flaeche.tag}) nimmt nur ${anteil} der Höhe ein, Ziel ≥ 0,5.`);
      }
      if (lage.querScroll) melde("FEHLER", "S3", "Hochkant 390×844: Die Seite scrollt waagrecht (etwas ist breiter als der Bildschirm).");
      for (const [n, w] of [["html", lage.touchHtml], ["body", lage.touchBody]])
        if (w === "none") melde("FEHLER", "S5", `touch-action: none auf ${n}. Das sperrt Zoomen und Scrollen der ganzen Seite; nur auf die Spielfläche setzen.`);
    }
  }
  if (fehler.length) melde("Hinweis", "S9", `JavaScript-Fehler: ${[...new Set(fehler)].slice(0, 3).join(" | ")}`);
  await ctx.close();
}

// ---------- 2. Laptop quer 1280×720 mit Bildzeit normal und unter 4× CPU-Drosselung
{
  const { ctx, seite } = await neueSeite(1280, 720, false);
  if (await oeffne(seite, spielUrl)) {
    await ersteBeruehrung(seite, false);
    await warte(2000);
    await seite.screenshot({ path: path.join(zielPfad, "fotos", "quer-spiel.png") }).catch(() => {});
    const lageQuer = await mitFrist(seite.evaluate(LAGE), 5000);
    if (lageQuer?.querScroll) melde("FEHLER", "S3", "Quer 1280×720: Die Seite scrollt waagrecht.");
    const renderer = String(await mitFrist(seite.evaluate(RENDERER), 5000, "unbekannt")).replace(/\s*\(0x[0-9a-f]+\)/gi, "");
    const software = /swiftshader|llvmpipe|software|kein webgl/i.test(renderer);
    const messe = async () => { const [m] = await Promise.all([mitFrist(seite.evaluate(BILDZEIT, messDauer), messDauer + 8000), bewegen(seite, messDauer)]); return m; };
    const normal = await messe();
    let gedrosselt = null;
    try {
      const cdp = await ctx.newCDPSession(seite);
      await cdp.send("Emulation.setCPUThrottlingRate", { rate: 4 });
      gedrosselt = await messe();
      await cdp.send("Emulation.setCPUThrottlingRate", { rate: 1 });
    } catch (e) { melde("Hinweis", "S7", "CPU-Drosselung nicht möglich: " + e.message.split("\n")[0]); }
    const ok = !!(normal && gedrosselt && normal.fps >= 50 && gedrosselt.fps >= 30);
    const leistung = { renderer, nur_vergleich: software, normal, gedrosselt_4x: gedrosselt, ziel: { normal_fps: 50, gedrosselt_fps: 30 }, ok,
      hinweis: software ? "Software-Grafik im Test (SwiftShader/llvmpipe): Werte nur zum Vergleich zwischen Fassungen, kein echtes Gerät." : "" };
    fs.writeFileSync(path.join(zielPfad, "leistung.json"), JSON.stringify(leistung, null, 2));
    ergebnis.leistung = leistung;
    if (!normal) melde("FEHLER", "S7", "Bildzeit nicht messbar: Das Spiel blockiert den Browser.");
    else if (!ok) {
      const text = `Bildrate normal ${normal.fps} fps (Ziel ≥ 50), 4× gedrosselt ${gedrosselt ? gedrosselt.fps : "–"} fps (Ziel ≥ 30), p95 ${gedrosselt ? gedrosselt.p95_ms : normal.p95_ms} ms.`;
      if (software) melde("Hinweis", "S7", text + ` Software-Grafik (${/swiftshader/i.test(renderer) ? "SwiftShader" : renderer.slice(0, 50)}) – nur Vergleich, kein echtes Gerät.`);
      else melde("FEHLER", "S7", text);
    } else if (software) melde("Hinweis", "S7", `Normal ${normal.fps} fps, 4× gedrosselt ${gedrosselt.fps} fps, gemessen mit Software-Grafik (${/swiftshader/i.test(renderer) ? "SwiftShader" : renderer.slice(0, 50)}) – nur Vergleich, kein echtes Gerät.`);
  }
  await ctx.close();
}

// ---------- 3. Einbetten: Spiel im iframe auf einer langen Seite, ein Wisch im Spiel darf die Seite nicht scrollen
{
  const { ctx, seite } = await neueSeite(390, 844, true);
  try {
    await seite.goto(huelleUrl, { waitUntil: "load", timeout: 15000 });
    await warte(1200);
    await seite.evaluate(() => window.scrollTo(0, 200));
    await warte(200);
    const box = await seite.locator("#spiel").boundingBox();
    const x = Math.round(box.x + box.width / 2), y = Math.round(box.y + box.height / 2);
    await seite.touchscreen.tap(x, y).catch(() => {});
    await seite.keyboard.press("Space").catch(() => {});
    await warte(800);
    const vorher = await seite.evaluate(() => window.scrollY);
    const cdp = await ctx.newCDPSession(seite);
    const punkt = (yy) => [{ x, y: yy, radiusX: 4, radiusY: 4, force: 1, id: 1 }];
    await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: punkt(y + 120) });
    for (let i = 1; i <= 12; i++) { await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: punkt(y + 120 - i * 20) }); await warte(16); }
    await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
    await warte(900);
    const nachher = await seite.evaluate(() => window.scrollY);
    ergebnis.iframe = { scrollY_vorher: vorher, scrollY_nachher: nachher };
    if (Math.abs(nachher - vorher) > 2) melde("FEHLER", "S4", `Eingebettet: Ein Wisch im Spiel scrollt die äußere Seite (${vorher} → ${nachher} px). touch-action: none auf die Spielfläche setzen.`);
    await seite.screenshot({ path: path.join(zielPfad, "fotos", "eingebettet.png") }).catch(() => {});
  } catch (e) { melde("Hinweis", "S4", "iframe-Test nicht möglich: " + e.message.split("\n")[0]); }
  await ctx.close();
}

// ---------- 4. Bot (nur mit --bot): fester Zufall, zufällige Eingaben mit Rauschen, Punkte, Spielende, Neustart
if (BOT) {
  const { ctx, seite } = await neueSeite(390, 844, true);
  const url = spielUrl + (spielUrl.includes("?") ? "&" : "?") + "seed=42";
  if (await oeffne(seite, url)) {
    const hat = await mitFrist(seite.evaluate(() => typeof window.game?.step === "function" && typeof window.render_game_to_text === "function"), 5000, false);
    if (!hat) melde("Hinweis", "S8", "Keine Bot-Schnittstelle (window.game.step und window.render_game_to_text fehlen). Spielbarkeit nicht belegt.");
    else {
      const ZUSTAND = () => {
        let t = ""; try { t = String(window.render_game_to_text()); } catch (e) { return { fehler: e.message }; }
        let j = null; try { j = JSON.parse(t); } catch {}
        const such = (re) => { if (j) for (const [k, v] of Object.entries(j)) if (re.test(k)) return v; const m = t.match(new RegExp("(?:" + re.source + ")\\W{0,3}([\\w.-]+)", "i")); return m ? m[1] : null; };
        const punkte = Number(such(/^(punkte|score|points|punktestand)$/i)) || 0;
        const modus = String(such(/^(modus|state|phase|status|zustand)$/i) || "").toLowerCase();
        return { punkte, modus, ende: /ende|over|verloren|lost|game_?over|vorbei/.test(modus) };
      };
      const z = (fn) => mitFrist(seite.evaluate(fn), 4000, null);
      const v = seite.viewportSize();
      await seite.touchscreen.tap(v.width / 2, v.height / 2).catch(() => {});
      // eigener Zufall mit festem Startwert, damit Läufe vergleichbar sind; Rauschen wie ein Mensch (nicht pixelgenau)
      let s = 42; const zufall = () => ((s = (s * 1103515245 + 12345) % 2147483648) / 2147483648);
      const rauschen = () => (zufall() + zufall() + zufall() - 1.5) * 0.25;
      let maxPunkte = 0, ende = false, schritte = 0; const grenze = SCHNELL ? 300 : 600; const startZeit = Date.now();
      const tasten = ["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Space"];
      while (schritte < grenze && !ende && Date.now() - startZeit < 45000) {
        const x = v.width * Math.min(0.95, Math.max(0.05, 0.5 + rauschen() * 1.6)), y = v.height * Math.min(0.95, Math.max(0.1, 0.55 + rauschen()));
        const art = zufall();
        try {
          if (art < 0.35) await seite.touchscreen.tap(x, y);
          else if (art < 0.65) { await seite.mouse.move(x, v.height * 0.85); await seite.mouse.down(); await seite.mouse.move(x + rauschen() * v.width, v.height * (0.3 + rauschen()), { steps: 4 }); await seite.mouse.up(); }
          else if (art < 0.85) await seite.mouse.move(x, y, { steps: 2 });
          else await seite.keyboard.press(tasten[Math.floor(zufall() * tasten.length)]);
        } catch {}
        const st = await mitFrist(seite.evaluate(() => { try { for (let i = 0; i < 6; i++) window.game.step(1000 / 60); } catch (e) { return e.message; } return null; }), 4000, "Zeitüberschreitung");
        if (st) { melde("FEHLER", "S8", `window.game.step() wirft: ${st}`); break; }
        const zu = await z(ZUSTAND);
        if (zu && !zu.fehler) { maxPunkte = Math.max(maxPunkte, zu.punkte); ende = zu.ende; }
        schritte++;
      }
      ergebnis.bot = { schritte, max_punkte: maxPunkte, spielende: ende };
      if (maxPunkte <= 0) melde("FEHLER", "S8", `Bot: In ${schritte} Zügen mit Zufallseingaben keinen Punkt geholt. Punkten muss möglich sein (render_game_to_text liefert „punkte“?).`);
      if (!ende) melde("FEHLER", "S8", `Bot: Kein Spielende in ${schritte} Zügen. Verlieren muss möglich sein (render_game_to_text liefert „modus“: „ende“?).`);
      else {
        // Neustart in Echtzeit messen: vom Spielende bis zum spielbaren Zustand nach einem Tipper
        const t0 = Date.now();
        await seite.touchscreen.tap(v.width / 2, v.height / 2).catch(() => {});
        await seite.keyboard.press("Space").catch(() => {});
        let neu = null;
        while (Date.now() - t0 < 3000) { const zu = await z(ZUSTAND); if (zu && !zu.fehler && !zu.ende) { neu = Date.now() - t0; break; } await warte(30); }
        ergebnis.bot.neustart_ms = neu;
        if (neu === null || neu >= 1000) melde("FEHLER", "S8", `Bot: Neustart nach dem Spielende dauert ${neu === null ? "über 3 s" : neu + " ms"} (Ziel < 1 s, ein Tipper genügt).`);
      }
    }
  }
  await ctx.close();
}

await browser.close();
spielServer.close(); huelleServer.close();

ergebnis.fremde_anfragen = [...fremde];
if (fremde.size) melde("FEHLER", "S1", `${fremde.size} Anfrage(n) an fremde Server zur Laufzeit: ${[...fremde].slice(0, 3).join(", ")}. Schrift, Skripte und Klänge lokal ablegen.`);
ergebnis.befunde = befunde;
const fehlerZahl = befunde.filter((b) => b.schwere === "FEHLER").length;
ergebnis.ok = fehlerZahl === 0;
fs.writeFileSync(path.join(zielPfad, "pruefung.json"), JSON.stringify(ergebnis, null, 2));

const reihe = [...befunde].sort((a, b) => (a.schwere === b.schwere ? 0 : a.schwere === "FEHLER" ? -1 : 1));
for (const b of reihe) console.log(`${b.schwere.padEnd(7)} ${b.fehler}  ${b.text}`);
const l = ergebnis.leistung;
console.log("\nZusammenfassung:");
console.log(`  Hochkant-Anteil der Spielfläche: ${ergebnis.hochkant?.anteil ?? "–"} (Ziel ≥ 0,5)`);
console.log(`  Fremde Anfragen: ${fremde.size} (Ziel 0)`);
console.log(`  Bildrate: normal ${l?.normal?.fps ?? "–"} fps, 4× gedrosselt ${l?.gedrosselt_4x?.fps ?? "–"} fps${l?.nur_vergleich ? " (Software-Grafik, nur Vergleich)" : ""}`);
console.log(`  iframe-Wisch: ${ergebnis.iframe ? `scrollY ${ergebnis.iframe.scrollY_vorher} → ${ergebnis.iframe.scrollY_nachher}` : "nicht gemessen"}`);
if (BOT) console.log(`  Bot: ${ergebnis.bot ? `max. ${ergebnis.bot.max_punkte} Punkte, Spielende ${ergebnis.bot.spielende ? "ja" : "nein"}, Neustart ${ergebnis.bot.neustart_ms ?? "–"} ms` : "keine Schnittstelle"}`);
console.log(`  ${fehlerZahl} FEHLER, ${befunde.length - fehlerZahl} Hinweis(e) · Fotos und JSON in ${zielPfad}`);
process.exit(fehlerZahl ? 1 : 0);
