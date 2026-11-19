#!/usr/bin/env node
// Bildserie eines Scroll-Ablaufs: dieselben Stellen auf drei Laptop-Größen und am Handy.
// Gedacht für Einstiege, die beim Scrollen eine Geschichte erzählen (feststehende Bühne, 3D, Übergänge).
// Fand beim SFH-Test (19.11.2026) die meisten Fehler: Überlappen im Tag-Zustand, verdecktes Wappen am Handy,
// matschiger Übergang. Nach jeder sichtbaren Änderung laufen lassen und die Bilder ansehen.
//
// Aufruf: node ablauf.mjs <site-ordner | https://adresse> <ziel-ordner> [--abschnitt <css>] [--stellen 0,0.3,0.6,0.9] [--warten 3500]
//   --abschnitt  CSS-Auswahl des Abschnitts, durch den gescrollt wird (z. B. "[data-einstieg]").
//                Die Stellen sind dann Anteile seines Scrollwegs. Ohne: Anteile der ganzen Seite.
//   --stellen    Komma-Liste von Anteilen zwischen 0 und 1 (Standard 0,0.25,0.5,0.75,1)
//   --warten     Millisekunden je Stelle, bis Übergänge und 3D nachgezogen haben (Standard 3500)
// Ergebnis: <ziel>/<gerät>-<stelle>.png für 1366×768, 1440×900, 1920×1080 und iPhone 13.
import { createRequire } from "node:module";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);
let pw;
for (const ort of [process.cwd(), path.dirname(new URL(import.meta.url).pathname)]) { try { pw = require(require.resolve("playwright", { paths: [ort] })); break; } catch {} }
if (!pw) { try { pw = require("playwright"); } catch { console.error("Playwright fehlt: npm i -D playwright && npx playwright install chromium"); process.exit(2); } }

const args = process.argv.slice(2);
const wert = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const [quelle, ziel] = args.filter((a, i) => !a.startsWith("--") && !(i > 0 && args[i - 1].startsWith("--")));
if (!quelle || !ziel) { console.error("Aufruf: node ablauf.mjs <ordner|adresse> <ziel-ordner> [--abschnitt <css>] [--stellen 0,0.5,1] [--warten 3500]"); process.exit(2); }
const abschnitt = wert("--abschnitt", "");
const stellen = wert("--stellen", "0,0.25,0.5,0.75,1").split(",").map(Number).filter((x) => x >= 0 && x <= 1);
const warten = Number(wert("--warten", 3500));
fs.mkdirSync(ziel, { recursive: true });

let url = quelle, server = null;
if (!/^https?:/.test(quelle)) {
  const root = path.resolve(quelle);
  const typen = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript", ".json": "application/json",
    ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".avif": "image/avif", ".woff2": "font/woff2", ".glb": "model/gltf-binary" };
  server = http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split("?")[0]); if (p.endsWith("/")) p += "index.html";
    let f = path.join(root, p);
    if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html");
    if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { "Content-Type": typen[path.extname(f).toLowerCase()] || "application/octet-stream" }); fs.createReadStream(f).pipe(res);
  }).listen(0, "127.0.0.1");
  await new Promise((r) => server.once("listening", r));
  url = `http://127.0.0.1:${server.address().port}/`;
}

const browser = await pw.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
const geraete = [
  ["laptop-1366", { viewport: { width: 1366, height: 768 } }],
  ["laptop-1440", { viewport: { width: 1440, height: 900 } }],
  ["desktop-1920", { viewport: { width: 1920, height: 1080 } }],
  ["handy", { ...pw.devices["iPhone 13"] }],
];
const fehler = [];
for (const [name, opt] of geraete) {
  const ctx = await browser.newContext(opt);
  const page = await ctx.newPage();
  page.on("pageerror", (e) => fehler.push(`${name}: ${e.message.slice(0, 140)}`));
  await page.goto(url, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(Math.max(3000, warten));   // 3D und Schriften laden lassen
  for (const s of stellen) {
    await page.evaluate(({ s, abschnitt }) => {
      let y;
      const el = abschnitt && document.querySelector(abschnitt);
      if (el) { const oben = el.getBoundingClientRect().top + scrollY; y = oben + Math.max(0, el.offsetHeight - innerHeight) * s; }
      else y = (document.documentElement.scrollHeight - innerHeight) * s;
      scrollTo(0, y);
    }, { s, abschnitt });
    await page.waitForTimeout(warten);
    await page.screenshot({ path: path.join(ziel, `${name}-${String(s).replace(".", "_")}.png`) });
  }
  await ctx.close();
}
await browser.close();
server?.close();
console.log(`${geraete.length * stellen.length} Bilder in ${ziel}`);
if (fehler.length) { console.log("Skriptfehler:\n" + fehler.slice(0, 5).join("\n")); process.exitCode = 1; }
