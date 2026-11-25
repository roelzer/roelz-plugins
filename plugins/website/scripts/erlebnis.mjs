#!/usr/bin/env node
// Erlebnis-Prüfung: Fühlt sich die Seite beim Wischen richtig an? (Simon, Honig 25.11.2026:
// „teilweise muss ich 2-mal oder ganz stark scrollen, dass was geht“, „die Biene wartet in der Mitte und fliegt dann weg“,
// „das ‚dann zu‘ ist viel zu schnell“ – „ich will solche Checks auch mit drin haben“.)
//
// Aufruf: node erlebnis.mjs <site-ordner | https://adresse> [--schritte 30] [--aus <ordner>]
//
// 1. Eingabe: Ein einzelner Mausrad-Klick muss einen Schritt auslösen. 20 schnelle Klicks und ein Trackpad-Schwung
//    müssen an derselben Stelle landen wie ein Klick (genau ein Schritt). Ein kleiner Handy-Wisch ebenso.
// 2. Bewegung je Schritt (Pfeiltaste nach unten, bis zum Ende): Bilder alle ~60 ms, Unterschied von Bild zu Bild.
//    Hinweis „steht mitten im Schritt“: über 0,9 s fast nichts bewegt sich, obwohl davor und danach etwas passiert.
//    Hinweis „ballt sich“: über 60 % der Bewegung in weniger als 12 % der Schrittdauer (wirkt zu schnell).
// Ausgabe: FEHLER/Hinweis-Zeilen und erlebnis.json. FEHLER nur bei der Eingabe, Bewegung sind Hinweise mit Werten.
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const args = process.argv.slice(2);
const wert = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const ziel = args.find((a, i) => !a.startsWith("--") && !(i > 0 && args[i - 1].startsWith("--")));
if (!ziel) { console.error("Aufruf: node erlebnis.mjs <site-ordner | url> [--schritte 30] [--aus <ordner>]"); process.exit(2); }
const MAX = Number(wert("--schritte", 30));
const aus = path.resolve(wert("--aus", fs.existsSync(ziel) ? path.join(ziel, "..", "arbeit", "erlebnis") : "erlebnis"));
fs.mkdirSync(aus, { recursive: true });
let pw; for (const o of [process.cwd(), path.dirname(new URL(import.meta.url).pathname)]) { try { pw = require(require.resolve("playwright", { paths: [o] })); break; } catch {} }
if (!pw) try { pw = require("playwright"); } catch { console.error("Playwright fehlt"); process.exit(2); }

let url = ziel, server = null;
if (fs.existsSync(ziel)) {
  const root = path.resolve(ziel);
  const typ = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".css": "text/css", ".webp": "image/webp", ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml", ".woff2": "font/woff2", ".json": "application/json", ".glb": "model/gltf-binary", ".mp4": "video/mp4" };
  server = http.createServer((q, a) => { let u = decodeURIComponent(q.url.split("?")[0]); if (u.endsWith("/")) u += "index.html"; const f = path.join(root, u); if (!f.startsWith(root) || !fs.existsSync(f)) { a.writeHead(404); return a.end(); } a.writeHead(200, { "content-type": typ[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(a); }).listen(0);
  url = `http://127.0.0.1:${server.address().port}/`;
}
const befunde = [], ergebnis = { eingabe: {}, schritte: [] };
const ruhig = async (p, ms = 500) => { let y = -1, gleich = 0; for (let i = 0; i < 400 && gleich < ms / 50; i++) { const n = await p.evaluate(() => scrollY); gleich = n === y ? gleich + 1 : 0; y = n; await p.waitForTimeout(50); } return y; };

const b = await pw.chromium.launch();
// ---------- 1. Eingabe ----------
{
  const p = await b.newPage({ viewport: { width: 1366, height: 768 } });
  await p.goto(url); await p.waitForTimeout(1500); await p.mouse.move(683, 400);
  const start = async () => { await p.evaluate(() => scrollTo(0, 0)); await ruhig(p, 300); };
  await start(); await p.mouse.wheel(0, 100); const ein = await ruhig(p);
  await start(); for (let k = 0; k < 20; k++) { await p.mouse.wheel(0, 100); await p.waitForTimeout(15); } const zwanzig = await ruhig(p);
  await start(); for (let k = 0; k < 40; k++) { await p.mouse.wheel(0, 120 * Math.exp(-k / 12)); await p.waitForTimeout(18); } const schwung = await ruhig(p);
  await start(); await p.mouse.wheel(0, 4); const winzig = await ruhig(p);
  // zweiter Klick direkt nach dem Ende des ersten Schritts
  await start(); await p.mouse.wheel(0, 100); const nachEins = await ruhig(p, 250); await p.mouse.wheel(0, 100); const zwei = await ruhig(p);
  ergebnis.eingabe = { ein, zwanzig, schwung, winzig, nachEins, zwei };
  if (ein === 0) befunde.push("FEHLER Eingabe: Ein einzelner Mausrad-Klick löst nichts aus");
  if (winzig === 0) befunde.push("Hinweis Eingabe: Eine ganz kleine Trackpad-Bewegung löst nichts aus");
  if (zwanzig !== ein) befunde.push(`FEHLER Eingabe: 20 schnelle Klicks landen woanders (${zwanzig}) als einer (${ein}) – ein Schwung muss genau ein Schritt sein`);
  if (schwung !== ein) befunde.push(`FEHLER Eingabe: Trackpad-Schwung landet woanders (${schwung}) als ein Klick (${ein})`);
  if (zwei === nachEins) befunde.push("FEHLER Eingabe: Ein zweiter Klick direkt nach dem ersten Schritt wird verschluckt");
  await p.close();
  const h = await b.newContext({ ...pw.devices["iPhone 13"] }); const hp = await h.newPage();
  await hp.goto(url); await hp.waitForTimeout(1500);
  const cdp = await h.newCDPSession(hp);
  const wisch = async (dy, ms) => { await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: 200, y: 600 }] }); for (let i = 1; i <= 5; i++) { await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: 200, y: 600 - dy * i / 5 }] }); await hp.waitForTimeout(ms / 5); } await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] }); };
  await wisch(60, 120); const klein = await ruhig(hp);
  await hp.evaluate(() => scrollTo(0, 0)); await ruhig(hp, 300); await wisch(500, 60); const kraeftig = await ruhig(hp);
  ergebnis.eingabe.handy = { klein, kraeftig };
  if (klein === 0) befunde.push("FEHLER Eingabe (Handy): Ein kleiner Wisch löst nichts aus");
  if (kraeftig !== klein) befunde.push(`FEHLER Eingabe (Handy): Ein kräftiger Wisch landet woanders (${kraeftig}) als ein kleiner (${klein})`);
  await h.close();
}

// ---------- 2. Bewegung je Schritt ----------
{
  const p = await b.newPage({ viewport: { width: 1280, height: 800 } });
  await p.goto(url); await p.waitForTimeout(1500);
  const cdp = await p.context().newCDPSession(p);
  // Bilder erst sammeln, verglichen wird danach in einer zweiten Seite (eine zweite offene Seite würde diese in den Hintergrund
  // schieben, dann zeichnet der Browser nicht mehr weiter)
  const gesammelt = [];
  const diffs = async (rechner, bilder) => rechner.evaluate(async (bilder) => {
    const c = document.querySelector("canvas"), x = c.getContext("2d", { willReadFrequently: true }); let vor = null; const out = [];
    for (const b64 of bilder) {
      const bm = await createImageBitmap(await (await fetch("data:image/jpeg;base64," + b64)).blob());
      c.width = 160; c.height = 100; x.drawImage(bm, 0, 0, 160, 100); const d = x.getImageData(0, 0, 160, 100).data;
      if (vor) { let s = 0; for (let i = 0; i < d.length; i += 4) s += Math.abs(d[i] - vor[i]) + Math.abs(d[i + 1] - vor[i + 1]) + Math.abs(d[i + 2] - vor[i + 2]); out.push(s / (160 * 100 * 3)); }
      vor = d;
    }
    return out;
  }, bilder);
  let vorY = await p.evaluate(() => scrollY);
  for (let n = 0; n < MAX; n++) {
    await p.keyboard.press("ArrowDown");
    const t0 = Date.now(), bilder = [], zeiten = []; let still = 0, y = vorY;
    while (Date.now() - t0 < 20000) {
      const sy = await p.evaluate(() => scrollY);   // clip ist in Dokument-Koordinaten: sichtbaren Ausschnitt nehmen
      const s = await cdp.send("Page.captureScreenshot", { format: "jpeg", quality: 35, clip: { x: 0, y: sy, width: 1280, height: 800, scale: 0.2 } });
      bilder.push(s.data); zeiten.push(Date.now() - t0);
      const ny = await p.evaluate(() => scrollY); still = ny === y ? still + 1 : 0; y = ny;
      if (still >= 8 && Date.now() - t0 > 600) break;
    }
    if (y === vorY) break;   // Ende erreicht
    const abschnitt = await p.evaluate(() => { const m = [...document.querySelectorAll("section[id]")].find((s) => { const r = s.getBoundingClientRect(); return r.top <= innerHeight / 2 && r.bottom >= innerHeight / 2; }); return m ? m.id : "?"; });
    gesammelt.push({ n, abschnitt, vorY, y, bilder, zeiten });
    vorY = y;
  }
  await p.close();
  const rechner = await b.newPage(); await rechner.setContent("<canvas></canvas>");
  for (const g of gesammelt) {
    const { n, abschnitt, bilder, zeiten } = g;
    const d = await diffs(rechner, bilder), dauer = zeiten[zeiten.length - 1], summe = d.reduce((a, c) => a + c, 0) || 1;
    const mittel = summe / d.length, grenze = Math.max(0.15 * mittel, 0.05);
    const aktiv = d.map((v) => v > grenze), erst = aktiv.indexOf(true), letzt = aktiv.lastIndexOf(true);
    let pause = 0, lauf = 0;
    for (let i = erst; i >= 0 && i <= letzt; i++) { if (!aktiv[i]) { lauf += zeiten[i + 1] - zeiten[i]; pause = Math.max(pause, lauf); } else lauf = 0; }
    let fenster = dauer;
    for (let i = 0; i < d.length; i++) { let s2 = 0; for (let k = i; k < d.length; k++) { s2 += d[k]; if (s2 >= 0.6 * summe) { fenster = Math.min(fenster, zeiten[k + 1] - zeiten[i]); break; } } }
    const s = { nr: n + 1, abschnitt, von: g.vorY, bis: g.y, dauer_ms: dauer, laengste_pause_ms: pause, ballung_anteil: +(fenster / dauer).toFixed(2) };
    ergebnis.schritte.push(s);
    if (pause > 900) befunde.push(`Hinweis Schritt ${s.nr} (#${abschnitt}): steht ${(pause / 1000).toFixed(1)} s mitten im Schritt still – wirkt wie Warten`);
    if (dauer > 1200 && fenster / dauer < 0.12) befunde.push(`Hinweis Schritt ${s.nr} (#${abschnitt}): 60 % der Bewegung in ${(fenster / 1000).toFixed(2)} s von ${(dauer / 1000).toFixed(1)} s – wirkt zu schnell`);
  }
  await rechner.close();
}
await b.close(); if (server) server.close();
fs.writeFileSync(path.join(aus, "erlebnis.json"), JSON.stringify({ befunde, ...ergebnis }, null, 2));
console.log(befunde.length ? befunde.join("\n") : "Erlebnis ohne Befund: jede Eingabe ein Schritt, keine Pause und keine Ballung");
console.log(`${ergebnis.schritte.length} Schritte geprüft · ${path.join(aus, "erlebnis.json")}`);
if (befunde.some((x) => x.startsWith("FEHLER"))) process.exitCode = 1;
