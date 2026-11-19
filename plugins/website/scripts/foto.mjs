#!/usr/bin/env node
// Bildschirmfotos einer lokalen Seite oder einer Adresse (für Vorbilder und Rohfassungen an Stopp 1).
// Aufruf: node foto.mjs <ordner-mit-index.html | https://adresse> <ziel-präfix> [--scroll 3]
// Ergebnis: <präfix>_desktop_0.png …, <präfix>_handy_0.png … (Desktop 1440×900, Handy 390×844)
import { createRequire } from "node:module";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);
let pw;
for (const ort of [process.cwd(), path.dirname(new URL(import.meta.url).pathname)]) { try { pw = require(require.resolve("playwright", { paths: [ort] })); break; } catch {} }
if (!pw) { try { pw = require("playwright"); } catch { console.error("Playwright fehlt: npm i -D playwright && npx playwright install chromium"); process.exit(2); } }

const [quelle, praefix] = process.argv.slice(2);
const i = process.argv.indexOf("--scroll"); const scrolls = i > 0 ? Number(process.argv[i + 1]) : 2;
if (!quelle || !praefix) { console.error("Aufruf: node foto.mjs <ordner|adresse> <ziel-präfix> [--scroll 3]"); process.exit(2); }
fs.mkdirSync(path.dirname(path.resolve(praefix)), { recursive: true });

let url = quelle, server = null;
if (!/^https?:/.test(quelle)) {
  const root = path.resolve(quelle);
  server = http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split("?")[0]); if (p.endsWith("/")) p += "index.html";
    const f = path.join(root, p);
    if (!f.startsWith(root) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
    const t = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript", ".svg": "image/svg+xml", ".woff2": "font/woff2" };
    res.writeHead(200, { "Content-Type": t[path.extname(f)] || "application/octet-stream" }); fs.createReadStream(f).pipe(res);
  }).listen(0, "127.0.0.1");
  await new Promise((r) => server.once("listening", r));
  url = `http://127.0.0.1:${server.address().port}/`;
}
const browser = await pw.chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
for (const [name, w, h] of [["desktop", 1440, 900], ["handy", 390, 844]]) {
  const page = await browser.newPage({ viewport: { width: w, height: h }, isMobile: name === "handy" });
  await page.goto(url, { waitUntil: "load", timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(2500);
  const hoehe = await page.evaluate(() => document.documentElement.scrollHeight).catch(() => h);
  for (let k = 0; k <= scrolls; k++) {
    await page.evaluate((y) => window.scrollTo(0, y), Math.round(((hoehe - h) * k) / Math.max(1, scrolls))).catch(() => {});
    await page.waitForTimeout(1000);
    await page.screenshot({ path: `${praefix}_${name}_${k}.png`, timeout: 30000 }).catch(() => {});
  }
  await page.close();
}
await browser.close();
if (server) server.close();
console.log(`Bildschirmfotos: ${praefix}_desktop_*.png, ${praefix}_handy_*.png`);
