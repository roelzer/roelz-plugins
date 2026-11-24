#!/usr/bin/env node
// Leistung im Handy-Profil messen (Lighthouse, kostenlos, läuft ohne Grafikkarte).
// Lehre aus dem SFH-Test (19.11.2026): Das 3D-Wappen wurde beim Laden mitgeladen, mit weichen Schatten.
// Handy-Leistung fiel von 98 auf 62, 12 s Blockierzeit, und niemand hatte gemessen.
// Pflicht nach jeder größeren Änderung. Ziel: mindestens 90. Die Abschluss-Sperre prüft das Ergebnis.
//
// Aufruf: node leistung.mjs <site-ordner | https://adresse> [--aus <ordner>] [--seiten /,/verein/]
//   --aus     Ordner für leistung.json (Standard: <site-ordner>/../arbeit/pruefung)
//   --seiten  Komma-Liste von Pfaden (Standard: nur die Startseite)
// Lokal fehlt die Kompression des Servers, online liegt der Wert meist etwas höher. Unter 90 ist trotzdem ein Befund.
// Seit 0.3.3 misst Lighthouse auch die Barrierefreiheit (unter 90 nur ein Hinweis, kein Exit-Code).
// Exit-Code 1, wenn eine Seite in der Leistung unter 90 liegt.
import { createRequire } from "node:module";
import { spawn } from "node:child_process";
import http from "node:http";
import zlib from "node:zlib";
import fs from "node:fs";
import path from "node:path";
import os from "node:os";

const require = createRequire(import.meta.url);
const args = process.argv.slice(2);
const wert = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const quelle = args.find((a, i) => !a.startsWith("--") && !(i > 0 && args[i - 1].startsWith("--")));
if (!quelle) { console.error("Aufruf: node leistung.mjs <site-ordner|adresse> [--aus <ordner>] [--seiten /,/verein/]"); process.exit(2); }
const aus = path.resolve(wert("--aus", /^https?:/.test(quelle) ? "." : path.join(quelle, "..", "arbeit", "pruefung")));
const seiten = wert("--seiten", "/").split(",");
const ZIEL = 0.9;

// Chrome von Playwright verwenden, wenn vorhanden
let chrome = process.env.CHROME_PATH;
if (!chrome) {
  for (const ort of [process.cwd(), path.dirname(new URL(import.meta.url).pathname)]) {
    try { chrome = require(require.resolve("playwright", { paths: [ort] })).chromium.executablePath(); break; } catch {}
  }
}

let basis = quelle, server = null;
if (!/^https?:/.test(quelle)) {
  const root = path.resolve(quelle);
  const typen = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".mjs": "text/javascript", ".json": "application/json",
    ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".webp": "image/webp", ".avif": "image/avif", ".woff2": "font/woff2", ".glb": "model/gltf-binary", ".pdf": "application/pdf" };
  server = http.createServer((req, res) => {
    let p = decodeURIComponent(req.url.split("?")[0]); if (p.endsWith("/")) p += "index.html";
    let f = path.join(root, p);
    if (fs.existsSync(f) && fs.statSync(f).isDirectory()) f = path.join(f, "index.html");
    if (!f.startsWith(root) || !fs.existsSync(f)) { res.writeHead(404); return res.end(); }
    const typ = typen[path.extname(f).toLowerCase()] || "application/octet-stream";
    // wie ein echter Server: Text komprimiert ausliefern, damit der Wert nicht künstlich schlecht ist
    if (/text|javascript|json|svg/.test(typ) && /gzip/.test(req.headers["accept-encoding"] || "")) {
      res.writeHead(200, { "Content-Type": typ, "Content-Encoding": "gzip" }); fs.createReadStream(f).pipe(zlib.createGzip()).pipe(res);
    } else { res.writeHead(200, { "Content-Type": typ }); fs.createReadStream(f).pipe(res); }
  }).listen(0, "127.0.0.1");
  await new Promise((r) => server.once("listening", r));
  basis = `http://127.0.0.1:${server.address().port}`;
}

const ergebnisse = [];
for (const s of seiten) {
  const url = basis.replace(/\/$/, "") + s;
  const datei = path.join(os.tmpdir(), `lh-${process.pid}-${ergebnisse.length}.json`);
  // nicht blockierend starten: Der eingebaute Server läuft im selben Programm und muss antworten können
  const r = await new Promise((fertig) => {
    let stderr = "";
    const k = spawn("npx", ["--yes", "lighthouse@12.6.1", url, "--quiet", "--only-categories=performance,accessibility", "--output=json", `--output-path=${datei}`,
      "--chrome-flags=--headless=new --no-sandbox"], { env: { ...process.env, ...(chrome ? { CHROME_PATH: chrome } : {}) } });
    k.stderr.on("data", (d) => (stderr += d));
    const uhr = setTimeout(() => k.kill("SIGKILL"), 300000);
    k.on("close", () => { clearTimeout(uhr); fertig({ stderr }); });
    k.on("error", (error) => { clearTimeout(uhr); fertig({ stderr, error }); });
  });
  if (!fs.existsSync(datei)) { ergebnisse.push({ seite: s, fehler: (r.stderr || r.error?.message || "Lighthouse lief nicht").slice(0, 300) }); continue; }
  const d = JSON.parse(fs.readFileSync(datei, "utf8"));
  const a = d.audits;
  ergebnisse.push({ seite: s, leistung: Math.round(d.categories.performance.score * 100),
    barrierefreiheit: d.categories.accessibility ? Math.round(d.categories.accessibility.score * 100) : null,
    blockierzeit_ms: Math.round(a["total-blocking-time"].numericValue), lcp_s: +(a["largest-contentful-paint"].numericValue / 1000).toFixed(1),
    cls: +a["cumulative-layout-shift"].numericValue.toFixed(3), gesamt_kb: Math.round(a["total-byte-weight"].numericValue / 1024) });
  fs.rmSync(datei, { force: true });
}
server?.close();

fs.mkdirSync(aus, { recursive: true });
const unter = ergebnisse.filter((e) => e.fehler || e.leistung < ZIEL * 100);
const hinweise = ergebnisse.filter((e) => e.barrierefreiheit !== null && e.barrierefreiheit !== undefined && e.barrierefreiheit < ZIEL * 100)
  .map((e) => `${e.seite}: Barrierefreiheit ${e.barrierefreiheit}/100 (unter ${ZIEL * 100}) – Fokus, Beschriftungen, Kontrast im Lighthouse-Bericht ansehen`);
fs.writeFileSync(path.join(aus, "leistung.json"), JSON.stringify({ zeit: new Date().toISOString(), profil: "Lighthouse Handy (Standard)", ziel: ZIEL * 100, ok: !unter.length, hinweise, ergebnisse }, null, 2));
for (const e of ergebnisse) console.log(e.fehler ? `${e.seite}: FEHLER ${e.fehler}` : `${e.seite}: Leistung ${e.leistung}/100 · Barrierefreiheit ${e.barrierefreiheit ?? "–"}/100 · Blockierzeit ${e.blockierzeit_ms} ms · LCP ${e.lcp_s} s · CLS ${e.cls} · ${e.gesamt_kb} KB`);
console.log(unter.length ? `\nUnter ${ZIEL * 100}: ${unter.map((e) => e.seite).join(", ")}. Typische Ursache: 3D oder große Skripte beim Laden. 3D erst bei der ersten Bewegung laden, am Handy ohne Schatten.` : `\nLeistung aller Seiten ab ${ZIEL * 100}.`);
for (const h of hinweise) console.log(`Hinweis: ${h}`);
console.log(`Ergebnis: ${path.join(aus, "leistung.json")}`);
process.exit(unter.length ? 1 : 0);
