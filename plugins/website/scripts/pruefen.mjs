#!/usr/bin/env node
// Prüfskript des Website-Bauers – misst ohne KI, was sich messen lässt, und liefert Bildschirmfotos für den Kritiker.
// Aufruf: node pruefen.mjs <site-ordner> [--aus <ordner>] [--json <datei>] [--schnell]
//   <site-ordner>  Ordner mit index.html (die Lieferung, z. B. website/<name>/site)
//   --aus          Ordner für Bildschirmfotos (Standard: <site-ordner>/../arbeit/pruefung)
//   --json         Ergebnisdatei (Standard: <aus>/pruefung.json)
//   --schnell      nur Desktop und Handy, weniger Scrollstellen
// Exit-Code 1, wenn ein harter Befund (P0) vorliegt.
// Geeicht an den Probelauf-Seiten (docs/personal/website-bauer/probelauf-seiten): P1 und P2 schlagen bei W1 an,
// P3 bei W9, P4 bei W2 und W8. Leistungswerte aus diesem Skript sind nur ein Vergleich: Ohne Grafikkarte rechnet
// Chromium mit Software (SwiftShader). Die Abnahme der Leistung macht Simons Laptop.
import { createRequire } from "node:module";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);
function playwrightLaden() {
  const orte = [process.cwd(), path.dirname(new URL(import.meta.url).pathname)];
  for (const ort of orte) {
    try { return require(require.resolve("playwright", { paths: [ort] })); } catch {}
  }
  try { return require("playwright"); } catch {}
  console.error("Playwright fehlt. Einmalig im Projekt: npm i -D playwright && npx playwright install chromium");
  process.exit(2);
}

// ---------- Argumente ----------
const args = process.argv.slice(2);
const opt = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const site = path.resolve(args.find((a, i) => !a.startsWith("--") && !["--aus", "--json"].includes(args[i - 1])) || ".");
if (!fs.existsSync(path.join(site, "index.html"))) { console.error(`Keine index.html in ${site}`); process.exit(2); }
const aus = path.resolve(opt("--aus", path.join(site, "..", "arbeit", "pruefung")));
const jsonDatei = path.resolve(opt("--json", path.join(aus, "pruefung.json")));
const schnell = args.includes("--schnell");
fs.mkdirSync(aus, { recursive: true });

const befunde = [];
const befund = (schwere, fehler, text, beleg = "") => befunde.push({ schwere, fehler, text, beleg });

// ---------- W7: Lieferordner ----------
const NICHT_IN_LIEFERUNG = /(^|\/)(_?pruef\w*|_arbeit|arbeit|node_modules|quellcode|src|\.build|lighthouse|screenshots?|shots|bericht\.md|package(-lock)?\.json|[^/]+\.(py|cjs|map|psd|blend|ts)$|vite\.config|tsconfig)/i;
function alleDateien(d, basis = d, liste = []) {
  for (const e of fs.readdirSync(d, { withFileTypes: true })) {
    const p = path.join(d, e.name);
    if (e.isDirectory()) alleDateien(p, basis, liste); else liste.push(path.relative(basis, p).split(path.sep).join("/"));
  }
  return liste;
}
const dateien = alleDateien(site);
const fremdeDateien = dateien.filter((f) => NICHT_IN_LIEFERUNG.test(f));
const groesseKB = Math.round(dateien.reduce((s, f) => s + fs.statSync(path.join(site, f)).size, 0) / 1024);
if (fremdeDateien.length) befund("P0", "W7", `${fremdeDateien.length} Arbeits- oder Prüfdateien liegen in der Lieferung`, fremdeDateien.slice(0, 6).join(", "));

// ---------- Sicherheit und Recht ohne Browser (wissen/sicherheit.md, wissen/recht.md) ----------
import crypto from "node:crypto";
const ERLAUBT = /\.(html?|css|m?js|json|webmanifest|svg|png|jpe?g|webp|avif|gif|ico|woff2?|pdf|glb|gltf|bin|hdr|ktx2|mp4|webm|txt|xml)$/i;
const SONDER = new Set(["_headers", "_redirects", ".assetsignore", "QUELLEN.md", "robots.txt"]);
const ausserListe = dateien.filter((f) => !ERLAUBT.test(f) && !SONDER.has(f) && !fremdeDateien.includes(f));
if (ausserListe.length) befund("P0", "Sicherheit", `${ausserListe.length} Dateien außerhalb der Positivliste (öffentlich lesbar)`, ausserListe.slice(0, 6).join(", "));
const lies = (f) => fs.readFileSync(path.join(site, f), "utf8");
const textdateien = dateien.filter((f) => /\.(html?|css|m?js|json|svg|webmanifest|txt|xml)$/i.test(f));
const bibliothek = (f) => /(^|\/)(vendor|lib|libs|node_modules)\//i.test(f) || /(three|gsap|lenis|scrolltrigger)[\w.-]*\.m?js$/i.test(f) || /\.min\.m?js$/i.test(f);
const html = dateien.filter((f) => /\.html?$/i.test(f));
const SCHLUESSEL = /(AKIA[0-9A-Z]{16}|sk_live_[0-9a-zA-Z]{16,}|ghp_[A-Za-z0-9]{30,}|github_pat_[A-Za-z0-9_]{30,}|AIza[0-9A-Za-z_-]{35}|xox[baprs]-[0-9A-Za-z-]{10,}|-----BEGIN [A-Z ]*PRIVATE KEY-----|\b(api[_-]?key|secret|access[_-]?token|passw(or)?d)\b\s*[:=]\s*["'][^"'\s]{8,}["'])/i;
const INTERN = /(sourceMappingURL=|\blocalhost:\d|\b127\.0\.0\.1\b|[A-Z]:\\\\Users\\\\|\/home\/[a-z][\w-]+\/|\/Users\/[A-Z][\w-]+\/)/;
for (const f of textdateien) {
  const t = lies(f);
  const k = t.match(SCHLUESSEL); if (k) befund("P0", "Sicherheit", `Möglicher Schlüssel oder Passwort in ${f}`, k[0].slice(0, 40) + "…");
  if (!bibliothek(f)) { const i = t.match(INTERN); if (i) befund("P0", "Sicherheit", `Interne Angabe in ${f} (Source Map, lokaler Pfad oder Testadresse)`, i[0]); }
  if (/ec\.europa\.eu\/consumers\/odr|OS-Plattform/i.test(t)) befund("P0", "Recht", `Link bzw. Hinweis auf die abgeschaltete EU-OS-Plattform in ${f} (seit 20.07.2025 entfernen)`);
}
for (const f of html) {
  const t = lies(f);
  const ev = t.match(/<[a-z][^>]*\son[a-z]+\s*=\s*["']/i); if (ev) befund("P0", "Sicherheit", `Inline-Ereignis (onclick o. ä.) in ${f} – mit strenger CSP blockiert, addEventListener nehmen`, ev[0].slice(0, 60));
  const st = (t.match(/<[a-z][^>]*\sstyle\s*=\s*["']/gi) || []).length; if (st) befund("Hinweis", "Sicherheit", `${st} style-Attribute in ${f} – mit strenger CSP blockiert, Klassen nehmen`);
  if (!/impressum/i.test(t)) befund("P0", "Recht", `Kein Impressum-Link auf ${f} (Pflicht auf jeder Seite)`);
  for (const m of t.matchAll(/<a\s[^>]*target=["']_blank["'][^>]*>/gi)) if (!/rel=["'][^"']*noopener/i.test(m[0])) { befund("Hinweis", "Sicherheit", `Link mit target=_blank ohne rel="noopener" in ${f}`); break; }
}
for (const f of dateien.filter((f) => /\.m?js$/i.test(f) && !bibliothek(f))) {
  const t = lies(f);
  if (/\beval\s*\(|new\s+Function\s*\(|document\.write\s*\(/.test(t)) befund("P0", "Sicherheit", `eval/new Function/document.write im eigenen Code (${f})`);
  if (/\.(innerHTML|outerHTML)\s*=|insertAdjacentHTML\s*\(/.test(t)) befund("Hinweis", "Sicherheit", `innerHTML o. ä. im eigenen Code (${f}) – textContent nehmen`);
}
for (const f of html) {
  const t = lies(f);
  if (/\.(innerHTML|outerHTML)\s*=|insertAdjacentHTML\s*\(|\beval\s*\(|document\.write\s*\(/.test([...t.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)].map((m) => m[1]).join("\n")))
    befund("Hinweis", "Sicherheit", `innerHTML, eval oder document.write in eingebettetem Skript (${f}) prüfen`);
}
// Ballast: Bilder, Schriften, Modelle und PDFs, auf die keine Seite, kein Stil und kein Skript verweist
// (SFH-Test 19.11.2026: zwei unbenutzte Fotos und toter Code wurden mit ausgeliefert)
{
  const alleTexte = textdateien.map((f) => lies(f)).join("\n");
  const MEDIEN = /\.(png|jpe?g|webp|avif|gif|svg|woff2?|glb|gltf|bin|hdr|ktx2|mp4|webm|pdf)$/i;
  const ungenutzt = dateien.filter((f) => MEDIEN.test(f) && !/^(favicon|apple-touch-icon|icon|vorschau|og-image)/i.test(path.basename(f)) && !alleTexte.includes(path.basename(f)));
  if (ungenutzt.length) befund("P0", "Ballast", `${ungenutzt.length} mitgelieferte Dateien, auf die nichts verweist – löschen`, ungenutzt.slice(0, 6).join(", "));
  // Quellenangaben: Jede Bibliothek und jede Schriftdatei muss in QUELLEN.md stehen (Lizenz, Herkunft)
  const quellen = [path.join(site, "QUELLEN.md"), path.join(site, "..", "QUELLEN.md"), path.join(site, "..", "..", "QUELLEN.md")].find((q) => fs.existsSync(q));
  const js = dateien.filter((f) => /\.m?js$/i.test(f)).map((f) => lies(f)).join("\n");
  const benutzt = [];
  if (/REVISION\s*=\s*["']\d+|three\.module|THREE\.WebGLRenderer|WebGLRenderer/.test(js)) benutzt.push(["three.js", /three/i]);
  if (/gsap|GreenSock/.test(js)) benutzt.push(["GSAP", /gsap/i]);
  if (/lenis/i.test(js)) benutzt.push(["Lenis", /lenis/i]);
  for (const f of dateien.filter((f) => /\.(woff2?|otf|ttf)$/i.test(f))) {
    // „kelly-slab-latin.CmV-vOqR.woff2“ → „kelly slab“ (Hash nach dem ersten Punkt und Teilmengen-Namen weg)
    const fam = path.basename(f).split(".")[0].split(/[-_]/).filter((w) => w.length > 2 && !/^(latin|ext|subset|wght|regular|bold|italic|variable|var|vf)$/i.test(w));
    if (fam.length) benutzt.push([`Schrift ${fam.join(" ")}`, new RegExp(fam.join("[\\s_-]*"), "i")]);
  }
  if (!quellen && benutzt.length) befund("Hinweis", "Unterlagen", "Keine QUELLEN.md gefunden (Bibliotheken und Schriften mit Lizenz nennen)", benutzt.map((b) => b[0]).join(", "));
  else if (quellen) {
    const q = fs.readFileSync(quellen, "utf8");
    const fehlt = [...new Map(benutzt.map((b) => [b[0], b])).values()].filter(([, re]) => !re.test(q)).map(([n]) => n);
    if (fehlt.length) befund("P0", "Unterlagen", `QUELLEN.md nennt nicht: ${fehlt.join(", ")} – Unterlagen im selben Schritt wie die Änderung anpassen`, path.relative(process.cwd(), quellen));
  }
}

// Metadaten in Fotos und PDFs
for (const f of dateien.filter((f) => /\.(jpe?g|png|webp|avif)$/i.test(f))) {
  const b = fs.readFileSync(path.join(site, f));
  const kopf = b.subarray(0, Math.min(b.length, 256 * 1024)).toString("latin1");
  if (/Exif\x00\x00|eXIf|EXIF/.test(kopf)) { befund("P0", "Sicherheit", `Metadaten (EXIF, ggf. GPS) im Foto ${f} – beim Neuspeichern entfernen`); }
}
for (const f of dateien.filter((f) => /\.pdf$/i.test(f))) {
  const t = fs.readFileSync(path.join(site, f)).toString("latin1");
  const a = t.match(/\/Author\s*\((?!\))([^)]{1,60})\)|<dc:creator>[\s\S]{0,200}?<\/dc:creator>|\/Author\s*<(?!>)[0-9A-Fa-f]{4,}>/);
  if (a) befund("P0", "Sicherheit", `Autor in den PDF-Metadaten (${f}) – mit qpdf --linearize bzw. neu schreiben entfernen`);
}
// Sicherheits-Header
const kopfDatei = path.join(site, "_headers");
if (!fs.existsSync(kopfDatei)) befund("P0", "Sicherheit", "Keine Sicherheits-Header (site/_headers fehlt) – node <Plugin>/scripts/kopfzeilen.mjs <site>");
else {
  const k = fs.readFileSync(kopfDatei, "utf8");
  const csp = (k.match(/Content-Security-Policy:\s*(.*)/i) || [])[1] || "";
  const fehlt = ["default-src", "frame-ancestors", "base-uri", "object-src", "form-action"].filter((d) => !csp.includes(d));
  if (!csp) befund("P0", "Sicherheit", "_headers ohne Content-Security-Policy");
  else {
    if (fehlt.length) befund("P0", "Sicherheit", `CSP ohne ${fehlt.join(", ")}`);
    const sk = (csp.match(/script-src([^;]*)/) || [])[1] || "";
    if (/'unsafe-inline'|'unsafe-eval'|\s\*(\s|$)|\shttps?:(\s|$)/.test(sk)) befund("P0", "Sicherheit", "script-src erlaubt unsafe-inline, unsafe-eval oder beliebige Server");
    const h = (s) => `'sha256-${crypto.createHash("sha256").update(s, "utf8").digest("base64")}'`;
    const stilHashes = (csp.match(/style-src([^;]*)/) || [])[1] || "";
    for (const f of html) {
      const t = lies(f);
      for (const m of t.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*type=["'](?!module|text\/javascript)[^"']*["'])(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)) if (!sk.includes(h(m[1])) && !/'unsafe-inline'/.test(sk)) { befund("P0", "Sicherheit", `Eingebettetes Skript in ${f} passt nicht zur CSP (Hash fehlt) – kopfzeilen.mjs neu laufen lassen`); break; }
      for (const m of t.matchAll(/<style(?:\s[^>]*)?>([\s\S]*?)<\/style>/gi)) if (!stilHashes.includes(h(m[1])) && !/'unsafe-inline'/.test(stilHashes)) { befund("P0", "Sicherheit", `Eingebetteter Stil in ${f} passt nicht zur CSP (Hash fehlt) – kopfzeilen.mjs neu laufen lassen`); break; }
    }
  }
  for (const nötig of ["Strict-Transport-Security", "X-Content-Type-Options", "Referrer-Policy", "Permissions-Policy"]) if (!new RegExp(nötig, "i").test(k)) befund("Hinweis", "Sicherheit", `Header ${nötig} fehlt in _headers`);
  if (/preload/i.test(k)) befund("Hinweis", "Sicherheit", "HSTS mit preload – nur nach Simons ausdrücklichem Ja (monatelang nicht rücknehmbar)");
  if (k.split("\n").some((z) => z.length > 2000)) befund("P0", "Sicherheit", "Eine Zeile in _headers ist länger als 2000 Zeichen (Grenze von Cloudflare)");
}

// ---------- lokaler Server ----------
const TYPEN = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css",
  ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".avif": "image/avif",
  ".glb": "model/gltf-binary", ".gltf": "model/gltf+json", ".bin": "application/octet-stream", ".woff2": "font/woff2", ".woff": "font/woff",
  ".json": "application/json", ".mp4": "video/mp4", ".webm": "video/webm", ".hdr": "application/octet-stream", ".ico": "image/x-icon", ".txt": "text/plain" };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p.endsWith("/")) p += "index.html";
  const f = path.join(site, p);
  if (!f.startsWith(site) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "Content-Type": TYPEN[path.extname(f).toLowerCase()] || "application/octet-stream" });
  fs.createReadStream(f).pipe(res);
}).listen(0, "127.0.0.1");
await new Promise((r) => server.once("listening", r));
const basis = `http://127.0.0.1:${server.address().port}/`;

// ---------- Pixel-Auswertung im Browser (ohne Zusatzpakete) ----------
async function pixelSeite(browser) {
  const p = await browser.newPage();
  await p.setContent("<canvas id=c></canvas>");
  return p;
}
async function auswerten(analyse, png, rechtecke) {
  return analyse.evaluate(async ({ b64, rechtecke }) => {
    const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode();
    const c = document.getElementById("c"); c.width = img.width; c.height = img.height;
    const ctx = c.getContext("2d", { willReadFrequently: true }); ctx.drawImage(img, 0, 0);
    const lum = (r, g, b) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
    return rechtecke.map((q) => {
      const x = Math.max(0, Math.floor(q.x)), y = Math.max(0, Math.floor(q.y));
      const w = Math.min(img.width - x, Math.ceil(q.w)), h = Math.min(img.height - y, Math.ceil(q.h));
      if (w < 2 || h < 2) return null;
      const d = ctx.getImageData(x, y, w, h).data;
      const schritt = Math.max(1, Math.floor(Math.sqrt((w * h) / 4000)));
      const werte = []; const zeilen = [];
      for (let yy = 0; yy < h; yy += schritt) {
        let s = 0, s2 = 0, n = 0, r0 = 0, g0 = 0, b0 = 0;
        for (let xx = 0; xx < w; xx += schritt) {
          const i = (yy * w + xx) * 4; const L = lum(d[i], d[i + 1], d[i + 2]);
          werte.push(L); s += L; s2 += L * L; n++; r0 += d[i]; g0 += d[i + 1]; b0 += d[i + 2];
        }
        zeilen.push({ mittel: s / n, streuung: Math.sqrt(Math.max(0, s2 / n - (s / n) ** 2)), rgb: [r0 / n, g0 / n, b0 / n] });
      }
      werte.sort((a, b) => a - b);
      const quant = (p) => werte[Math.min(werte.length - 1, Math.floor(p * werte.length))];
      // längstes Band gleichförmiger Zeilen (für leere Flächen)
      let best = 0, akt = 0, farbe = null, bestFarbe = null;
      for (const z of zeilen) {
        const gleich = z.streuung < 0.004 && (!farbe || Math.abs(z.mittel - farbe) < 0.01);
        if (gleich) { akt++; farbe = farbe ?? z.mittel; if (akt > best) { best = akt; bestFarbe = z.rgb; } } else { akt = 0; farbe = null; }
      }
      return { hell: quant(0.95), dunkel: quant(0.05), median: quant(0.5), band: best / zeilen.length, bandFarbe: bestFarbe };
    });
  }, { b64: png.toString("base64"), rechtecke });
}

// ---------- Messung je Gerät ----------
const { chromium } = playwrightLaden();
const browser = await chromium.launch({ args: ["--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
const analyse = await pixelSeite(browser);
const GERAETE = schnell ? [["handy", 390, 844], ["desktop", 1440, 900]] : [["handy", 390, 844], ["tablet", 768, 1024], ["desktop", 1440, 900]];
const geraete = {};
const kontrastFehler = new Map();
const leereFlaechen = new Map();
const ueberlappungen = [];
let stilInfo = null;

for (const [name, breite, hoehe] of GERAETE) {
  const ctx = await browser.newContext({ viewport: { width: breite, height: hoehe }, deviceScaleFactor: 1, isMobile: name !== "desktop", hasTouch: name !== "desktop" });
  const page = await ctx.newPage();
  page.setDefaultTimeout(20000);
  const konsole = [], fremd = new Set(), fehlend = [];
  page.on("console", (m) => { if (m.type() === "error" && !/GPU stall|WebGL|GL Driver|swiftshader/i.test(m.text())) konsole.push(m.text().slice(0, 160)); });
  page.on("pageerror", (e) => konsole.push("Skriptfehler: " + String(e.message).slice(0, 160)));
  page.on("request", (r) => { const u = r.url(); if (!u.startsWith(basis) && /^https?:/.test(u)) fremd.add(new URL(u).host); });
  page.on("response", (r) => { if (r.status() >= 400) fehlend.push(`${r.status()} ${r.url().replace(basis, "/")}`); });
  const t0 = Date.now();
  await page.goto(basis, { waitUntil: "load", timeout: 60000 }).catch((e) => konsole.push("Laden: " + e.message.slice(0, 120)));
  const ladezeit = Date.now() - t0;
  await page.addStyleTag({ content: "html,body{scroll-behavior:auto!important}" }).catch(() => {});
  await page.waitForTimeout(2500);
  const seitenhoehe = await page.evaluate(() => document.documentElement.scrollHeight).catch(() => hoehe);
  // Scrollstellen dicht genug, dass jede Bildschirmhöhe mindestens einmal ganz zu sehen ist
  const stellen = Math.min(schnell ? 14 : 30, Math.max(schnell ? 4 : 6, Math.ceil((seitenhoehe - hoehe) / (hoehe * (schnell ? 1.2 : 0.8)))));
  const langsam = [];
  for (let i = 0; i <= stellen; i++) {
    const y = Math.round(((seitenhoehe - hoehe) * i) / stellen);
    await page.evaluate((y) => window.scrollTo(0, y), y).catch(() => {});
    await page.waitForTimeout(1100);
    const t = Date.now();
    const datei = path.join(aus, `${name}_${String(i).padStart(2, "0")}.png`);
    let png;
    try { png = await page.screenshot({ path: datei, timeout: 25000 }); } catch { langsam.push(i); continue; }
    if (Date.now() - t > 8000) langsam.push(i);
    // sichtbare Texte und Medien an dieser Stelle
    const abfrage = (gespeichert) => page.evaluate((gespeichert) => {
      const sichtbar = (r) => r.width > 4 && r.height > 4 && r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth;
      const deckkraft = (e) => { let o = 1; for (let n = e; n && n.nodeType === 1; n = n.parentElement) { const s = getComputedStyle(n); o *= parseFloat(s.opacity); if (s.visibility === "hidden" || s.display === "none") return 0; } return o; };
      const texte = [];
      // feste Leisten (Kopf, Fuß, Hinweise): Texte, die sie berühren, werden nicht gemessen (Messung würde die Leiste mitnehmen)
      const fest = [...document.querySelectorAll("body *")].filter((x) => { const st = getComputedStyle(x).position; if (st !== "fixed" && st !== "sticky") return false; const q = x.getBoundingClientRect(); return q.height > 0 && q.height < innerHeight * 0.4 && q.width > innerWidth * 0.5; }).map((x) => x.getBoundingClientRect());
      const beruehrt = (r) => fest.some((q) => r.top < q.bottom + 6 && r.bottom > q.top - 6);
      for (const e of document.querySelectorAll("h1,h2,h3,h4,p,li,a,button,span,label,blockquote,figcaption,dd,dt,td,th,small,strong,em")) {
        const eigen = [...e.childNodes].filter((n) => n.nodeType === 3 && n.textContent.trim().length > 1).map((n) => n.textContent.trim()).join(" ");
        if (!eigen || e.closest("[aria-hidden='true']")) continue;  // Deko-Schrift zählt nicht (WCAG: beiläufiger Text)
        const s = getComputedStyle(e);
        if (s.backgroundClip === "text" || s.webkitBackgroundClip === "text" || parseFloat(s.fontSize) < 9) continue;
        if (deckkraft(e) < 0.9) continue;
        // nur die Fläche der eigenen Textzeilen messen, nicht Knopfränder, Ecken oder Symbole daneben
        let r = null;
        for (const n of e.childNodes) {
          if (n.nodeType !== 3 || !n.textContent.trim()) continue;
          const rg = document.createRange(); rg.selectNodeContents(n); const q = rg.getBoundingClientRect();
          if (q.width < 1) continue;
          r = r ? { left: Math.min(r.left, q.left), top: Math.min(r.top, q.top), right: Math.max(r.right, q.right), bottom: Math.max(r.bottom, q.bottom) } : { left: q.left, top: q.top, right: q.right, bottom: q.bottom };
        }
        if (!r) continue;
        r = { x: r.left, y: r.top, width: r.right - r.left, height: r.bottom - r.top, left: r.left, top: r.top, right: r.right, bottom: r.bottom };
        if (!sichtbar(r) || (beruehrt(r) && !e.closest("[style*='fixed'],header,footer,nav"))) continue;
        // verdeckt (z. B. hinter fester Kopfleiste)? Dann sieht ihn niemand – nicht werten
        // an Mitte und beiden Ecken muss der Text selbst oben liegen (sonst teilweise verdeckt oder weggeschnitten)
        const trifft = (x, y) => { const o = document.elementFromPoint(Math.min(innerWidth - 1, Math.max(0, x)), Math.min(innerHeight - 1, Math.max(0, y))); return o && (o === e || e.contains(o) || o.contains(e)); };
        if (![[r.left + r.width / 2, r.top + r.height / 2], [r.left + 2, r.top + 2], [r.right - 2, r.top + 2], [r.left + 2, r.bottom - 2], [r.right - 2, r.bottom - 2]].every(([x, y]) => trifft(x, y))) continue;
        const groesse = parseFloat(s.fontSize), fett = parseInt(s.fontWeight) >= 700;
        if (!gespeichert) e.dataset.pfFarbe = s.color;
        const farbe = gespeichert ? e.dataset.pfFarbe : s.color;
        if (!farbe) continue;
        texte.push({ x: r.x, y: r.y, w: r.width, h: r.height, farbe, gross: groesse >= 24 || (fett && groesse >= 18.66), text: eigen.slice(0, 50) });
      }
      const medien = [];
      for (const e of document.querySelectorAll("img,canvas,video,figure,picture,[style*='background-image']")) {
        if (e.closest("[data-pruefen~='dunkel']")) continue;  // bewusst dunkle Szene (z. B. Nacht in 3D), im Code begründen
        const r = e.getBoundingClientRect(); if (!sichtbar(r) || r.width < 120 || r.height < 80 || deckkraft(e) < 0.9) continue;
        medien.push({ x: r.x, y: r.y, w: r.width, h: r.height, tag: e.tagName.toLowerCase(), klasse: String(e.className?.baseVal ?? e.className ?? "").slice(0, 40) });
      }
      return { texte: texte.slice(0, 150), medien: medien.slice(0, 30) };
    }, gespeichert).catch(() => ({ texte: [], medien: [] }));
    const ziele = await abfrage(false);
    const ueber = await page.evaluate(() => {
      const kaesten = [];
      for (const e of document.querySelectorAll("h1,h2,h3,h4,p,li,a,button,label,blockquote,figcaption,dd,dt,td,th")) {
        if (!e.textContent.trim() || e.closest("[aria-hidden='true']")) continue;
        let o = 1, weg = false; for (let n = e; n && n.nodeType === 1; n = n.parentElement) { const st = getComputedStyle(n); o *= parseFloat(st.opacity); if (st.visibility === "hidden" || st.display === "none") weg = true; }
        if (weg || o < 0.5) continue;
        // je Textzeile ein Kasten (umbrechende Links in einem Absatz würden als großer Kasten sonst fälschlich überlappen)
        const rg = document.createRange(); rg.selectNodeContents(e);
        const zeilen = [...rg.getClientRects()].filter((r) => r.width >= 4 && r.height >= 8 && r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth);
        if (zeilen.length) kaesten.push({ e, zeilen });
      }
      const treffer = [];
      for (let a = 0; a < kaesten.length; a++) for (let b = a + 1; b < kaesten.length; b++) {
        const A = kaesten[a], B = kaesten[b];
        if (A.e.contains(B.e) || B.e.contains(A.e)) continue;
        const deckt = A.zeilen.some((p) => B.zeilen.some((q) => {
          const w = Math.min(p.right, q.right) - Math.max(p.left, q.left), h = Math.min(p.bottom, q.bottom) - Math.max(p.top, q.top);
          return w > 0 && h > 0 && (w * h) / Math.min(p.width * p.height, q.width * q.height) > 0.15;
        }));
        if (deckt) treffer.push(`„${A.e.textContent.trim().slice(0, 24)}“ / „${B.e.textContent.trim().slice(0, 24)}“`);
      }
      return treffer.slice(0, 3);
    }).catch(() => []);
    if (ueber.length) ueberlappungen.push(`${name} ${path.basename(datei)}: ${ueber.join(", ")}`);
    // Medien: leere, gleichförmige Bänder (W8)
    if (ziele.medien.length && png) {
      const erg = await auswerten(analyse, png, ziele.medien);
      erg.forEach((m, k) => {
        if (!m) return;
        const [r, g, b] = m.bandFarbe || [255, 255, 255];
        const fastSchwarz = r + g + b < 40;
        if (m.band >= 0.15 && fastSchwarz) {
          const z = ziele.medien[k];
          leereFlaechen.set(`${z.tag}.${z.klasse}`, { geraet: name, stelle: i, anteil: Math.round(m.band * 100), datei: path.basename(datei) });
        }
      });
    }
    // Kontrast aus Pixeln (W9): Text unsichtbar machen, Hintergrund fotografieren, gegen die schlechteste Stelle messen
    if (ziele.texte.length) {
      const stil = await page.addStyleTag({ content: "*:not(#pf_a):not(#pf_b),*:not(#pf_a):not(#pf_b)::before,*:not(#pf_a):not(#pf_b)::after{color:transparent!important;-webkit-text-fill-color:transparent!important;text-shadow:none!important;-webkit-text-stroke:0!important;caret-color:transparent!important;text-decoration-color:transparent!important}" }).catch(() => null);
      await page.waitForTimeout(200);
      const vorher = await abfrage(true);
      let hinter = null;
      try { hinter = await page.screenshot({ timeout: 25000 }); } catch {}
      const nachher = await abfrage(true);
      if (stil) await stil.evaluate((n) => n.remove()).catch(() => {});
      // nur Texte werten, die sich während der Aufnahme nicht bewegt haben (Animationen, weiches Scrollen)
      const ruhig = vorher.texte.filter((t) => nachher.texte.some((u) => u.text === t.text && Math.abs(u.x - t.x) < 2 && Math.abs(u.y - t.y) < 2));
      if (hinter && ruhig.length) {
        const erg = await auswerten(analyse, hinter, ruhig);
        erg.forEach((m, k) => {
          if (!m) return;
          const t = ruhig[k];
          const f = (t.farbe.match(/[\d.]+/g) || []).map(Number);
          if (f.length < 3) return;
          const a = f.length > 3 ? f[3] : 1;
          if (a < 0.5) return;  // Text blendet gerade erst ein
          const lin = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
          let L = 0.2126 * lin(f[0]) + 0.7152 * lin(f[1]) + 0.0722 * lin(f[2]);
          L = a * L + (1 - a) * m.median;
          const hellerText = L > m.median;
          const grund = hellerText ? m.hell : m.dunkel;  // W3C F83: gegen die ungünstigste Stelle
          const kr = (Math.max(L, grund) + 0.05) / (Math.min(L, grund) + 0.05);
          const soll = t.gross ? 3 : 4.5;
          if (kr < soll) {
            const schluessel = t.text;
            const alt = kontrastFehler.get(schluessel);
            if (!alt || kr < alt.kontrast) kontrastFehler.set(schluessel, { kontrast: Math.round(kr * 100) / 100, soll, geraet: name, stelle: i, datei: path.basename(datei), farbe: t.farbe, grund: { hell: +m.hell.toFixed(3), dunkel: +m.dunkel.toFixed(3), median: +m.median.toFixed(3) }, rechteck: [t.x, t.y, t.w, t.h].map(Math.round) });
          }
        });
      }
    }
  }
  // Bildrate beim Scrollen (nur Vergleichswert), mit Zeitgrenze
  await page.evaluate(() => window.scrollTo(0, 0)).catch(() => {});
  const fps = await Promise.race([
    page.evaluate(async (h) => {
      let frames = 0, lauf = true; const zaehl = () => { frames++; if (lauf) requestAnimationFrame(zaehl); }; requestAnimationFrame(zaehl);
      const t = performance.now();
      for (let y = 0; y < Math.min(h, 6000); y += 60) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 16)); }
      lauf = false; return Math.round((frames / (performance.now() - t)) * 1000);
    }, seitenhoehe),
    new Promise((r) => setTimeout(() => r(null), 20000)),
  ]).catch(() => null);
  const info = await page.evaluate(() => {
    const klein = [...document.querySelectorAll("a,button,input,select,textarea,[role=button],summary")].filter((e) => {
      const r = e.getBoundingClientRect(); if (r.width === 0 || r.height === 0) return false;
      const imText = e.tagName === "A" && e.closest("p,li,td") && getComputedStyle(e).display === "inline";
      return !imText && (r.height < 44 || r.width < 44);
    }).length;
    const flaeche = innerWidth * innerHeight;
    const grossesCanvas = [...document.querySelectorAll("canvas")].some((c) => { const r = c.getBoundingClientRect(); return (r.width * r.height) / flaeche > 0.5; });
    return { zuKleineTippflaechen: klein, seitlichScroll: document.documentElement.scrollWidth > innerWidth + 1, grossesCanvas,
      speicher: { local: localStorage.length, session: sessionStorage.length } };
  }).catch(() => ({}));
  const cookies = (await ctx.cookies()).length;
  if (name === "desktop") stilInfo = await stilAnalyse(page);
  geraete[name] = { ladezeit_ms: ladezeit, seitenhoehe, fps_scroll: fps, langsame_stellen: langsam, konsolenfehler: konsole.slice(0, 8),
    fremde_hosts: [...fremd], fehlende_dateien: fehlend.slice(0, 8), cookies, ...info };
  await ctx.close();
}
// Ohne JavaScript: Scrollen muss etwas zeigen (SFH: Einstieg blieb vier Bildschirmhöhen lang dunkel, Menü kaum lesbar)
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false });
  const page = await ctx.newPage();
  await page.goto(basis, { waitUntil: "load", timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(800);
  const bilder = [];
  for (let i = 0; i < 5; i++) {
    const y = await page.evaluate((y) => { window.scrollTo(0, y); return window.scrollY; }, i * 900).catch(() => 0);
    if (i && y <= bilder[bilder.length - 1].y) break;   // Seitenende erreicht: kurze Seiten sind kein Stillstand
    await page.waitForTimeout(250); bilder.push({ y, b: await page.screenshot().catch(() => null) });
  }
  let gleich = 0, laengste = 0;
  for (let i = 1; i < bilder.length; i++) { const a = bilder[i - 1].b, b = bilder[i].b; const g = a && b && (a.equals(b) || Math.abs(a.length - b.length) / a.length < 0.002); gleich = g ? gleich + 1 : 0; laengste = Math.max(laengste, gleich); }
  if (laengste >= 2) befund("P0", "W12", `Ohne JavaScript steht die Seite über ${laengste + 1} Bildschirmhöhen still – mit <noscript> gleich den End-Zustand zeigen`);
  await ctx.close();
}
await browser.close();
server.close();

// ---------- W1: KI- und Vorlagen-Merkmale (Desktop) ----------
async function stilAnalyse(page) {
  await page.evaluate(() => window.scrollTo(0, 0)).catch(() => {});
  return page.evaluate(() => {
    const rgb = (s) => (s.match(/[\d.]+/g) || []).map(Number);
    const hsl = ([r, g, b]) => { r /= 255; g /= 255; b /= 255; const mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2; let h = 0, s = 0;
      if (mx !== mn) { const d = mx - mn; s = l > 0.5 ? d / (2 - mx - mn) : d / (mx + mn); h = mx === r ? (g - b) / d + (g < b ? 6 : 0) : mx === g ? (b - r) / d + 2 : (r - g) / d + 4; h *= 60; } return { h, s, l }; };
    const lum = ([r, g, b]) => { const f = (v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b); };
    const alle = [...document.querySelectorAll("body *")].slice(0, 3000);
    // Hintergrundflächen nach Fläche gewichtet
    const flaechen = new Map(); let gesamt = 0;
    for (const e of [document.body, ...alle]) {
      const s = getComputedStyle(e); const c = rgb(s.backgroundColor); if (c.length < 3 || (c.length > 3 && c[3] < 0.9)) continue;
      const r = e.getBoundingClientRect(); const a = Math.min(r.width, innerWidth) * Math.min(r.height, 20000); if (a < 1) continue;
      const k = c.slice(0, 3).map((v) => Math.round(v / 8) * 8).join(","); flaechen.set(k, (flaechen.get(k) || 0) + a); gesamt += a;
    }
    const dunkelAnteil = [...flaechen].filter(([k]) => lum(k.split(",").map(Number)) < 0.03).reduce((s, [, a]) => s + a, 0) / (gesamt || 1);
    const dunkleNeutral = [...flaechen].filter(([k]) => { const c = k.split(",").map(Number); return lum(c) < 0.03 && hsl(c).s < 0.25; }).reduce((s, [, a]) => s + a, 0) / (gesamt || 1);
    // Akzentfarben: kräftige Farben auf Knöpfen, Links, Überschriften-Teilen
    const akzente = new Set();
    for (const e of alle) {
      const s = getComputedStyle(e);
      for (const c of [rgb(s.color), rgb(s.backgroundColor), rgb(s.borderTopColor)]) {
        if (c.length < 3 || (c.length > 3 && c[3] < 0.5)) continue; const x = hsl(c);
        if (x.s > 0.7 && x.l > 0.35 && x.l < 0.8) akzente.add(Math.round(x.h / 10) * 10);
      }
    }
    const neon = [...akzente].some((h) => (h >= 50 && h <= 170) || (h >= 280 && h <= 320));
    const zinnober = [...akzente].some((h) => h <= 25 || h >= 345);
    // Schriften
    const familien = new Map();
    for (const e of alle) { if (!e.textContent.trim()) continue; const f = getComputedStyle(e).fontFamily.split(",")[0].replace(/["']/g, "").trim(); familien.set(f, (familien.get(f) || 0) + 1); }
    const hauptschriften = [...familien].sort((a, b) => b[1] - a[1]).slice(0, 3).map(([f]) => f);
    const ueberschriften = [...document.querySelectorAll("h1,h2")].map((h) => getComputedStyle(h).fontFamily.split(",")[0].replace(/["']/g, "").trim());
    // Typo-Verhältnis
    const groessen = [...document.querySelectorAll("p")].map((p) => parseFloat(getComputedStyle(p).fontSize)).filter(Boolean).sort((a, b) => a - b);
    const fliess = groessen.length ? groessen[Math.floor(groessen.length / 2)] : 16;
    let groesste = 0, laufweite = 0;
    for (const h of document.querySelectorAll("h1,h2,[class*=hero] *,[class*=title]")) { const s = getComputedStyle(h); const g = parseFloat(s.fontSize); if (g > groesste) { groesste = g; laufweite = parseFloat(s.letterSpacing) || 0; } }
    const zeilenlaenge = Math.max(0, ...[...document.querySelectorAll("p")].filter((p) => p.textContent.trim().length > 250).map((p) => { const s = getComputedStyle(p); return p.getBoundingClientRect().width / (parseFloat(s.fontSize) * 0.5); }));
    // Vorlagen-Beiwerk
    const labelsUeberUeberschrift = [...document.querySelectorAll("h2")].filter((h) => { const v = h.previousElementSibling; if (!v) return false; const s = getComputedStyle(v); return s.textTransform === "uppercase" && parseFloat(s.fontSize) <= 14 && parseFloat(s.letterSpacing) > 0.5; }).length;
    const pfeilKnoepfe = [...document.querySelectorAll("a,button")].filter((e) => /[→↗]\s*$/.test(e.textContent.trim())).length;
    const akkordeon = document.querySelectorAll("details").length;
    const glas = alle.filter((e) => /blur\(/.test(getComputedStyle(e).backdropFilter || "")).length;
    // Künstlich kursiv: kursiv gesetzt in einer Webschrift, die keinen Kursivschnitt hat (der Browser verzerrt sie schräg).
    // SFH-Test 19.11.2026: Schrift ausgetauscht, aber an zehn Stellen font-style: italic stehen lassen.
    const schnitte = new Map();
    for (const f of document.fonts) { const fam = f.family.replace(/["']/g, "").trim().toLowerCase(); if (!schnitte.has(fam)) schnitte.set(fam, new Set()); schnitte.get(fam).add(f.style); }
    const kunstKursiv = [...document.querySelectorAll("body *")].filter((e) => {
      if (![...e.childNodes].some((n) => n.nodeType === 3 && n.textContent.trim())) return false;
      const st = getComputedStyle(e); if (st.fontStyle === "normal") return false;
      const fam = st.fontFamily.split(",")[0].replace(/["']/g, "").trim().toLowerCase();
      const set = schnitte.get(fam); return !!set && ![...set].some((x) => x !== "normal");
    }).map((e) => e.textContent.trim().slice(0, 30));
    // Lange Scroll-Bühnen (feststehender Einstieg): mehr als 3,2 Bildschirmhöhen ist zu lang (SFH: 420vh, nächstes Spiel erst nach 3500 px)
    // seitlich laufende Spuren (Chronik, Galerie) ausgenommen: Ihre Länge folgt aus der Breite der Spur
    const buehnen = [...document.querySelectorAll("body *")].filter((e) => getComputedStyle(e).position === "sticky" && e.parentElement && e.getBoundingClientRect().height > innerHeight * 0.6 && e.scrollWidth < innerWidth * 1.5)
      .map((e) => ({ h: e.parentElement.getBoundingClientRect().height / innerHeight, k: String(e.parentElement.className || e.parentElement.tagName).slice(0, 30) })).filter((b) => b.h > 3.2);
    // Kursive Serife als „edle“ Überschrift oder Einschub (Simon 19.11.2026: „diese kursiv schrift is auch KI typisch“)
    const kursivSerif = [...document.querySelectorAll("h1,h2,h3,h1 *,h2 *,h3 *,[class*=hero] *,[class*=held] *,[class*=title] *")].filter((e) => {
      const st = getComputedStyle(e); if (st.fontStyle !== "italic" || parseFloat(st.fontSize) < 20 || !e.textContent.trim()) return false;
      const f = st.fontFamily.toLowerCase(); return !/sans|grotesk|mono/.test(f) && /serif|garamond|playfair|fraunces|cormorant|baskerville|lora|georgia|times|instrument/.test(f);
    }).map((e) => e.textContent.trim().slice(0, 30));
    const emoji = [...document.querySelectorAll("h1,h2,h3,button")].some((e) => /\p{Extended_Pictographic}/u.test(e.textContent));
    const lilaVerlauf = alle.some((e) => { const b = getComputedStyle(e).backgroundImage; if (!/gradient/.test(b)) return false; return (b.match(/rgba?\([^)]+\)/g) || []).some((c) => { const x = hsl(rgb(c)); return x.s > 0.4 && x.h >= 250 && x.h <= 300; }); });
    const karten = (() => { const m = new Map(); for (const e of alle) { const s = getComputedStyle(e); if (parseFloat(s.borderTopLeftRadius) >= 12 && (s.boxShadow !== "none" || s.borderTopWidth !== "0px")) { const r = e.getBoundingClientRect(); if (r.width > 180 && r.height > 120) { const k = `${Math.round(r.width / 20)}x${Math.round(r.height / 20)}`; m.set(k, (m.get(k) || 0) + 1); } } } return Math.max(0, ...m.values()); })();
    // Echtes Motiv (W2)
    const fotos = [...document.images].filter((i) => i.naturalWidth >= 600 && !/\.svg/i.test(i.currentSrc)).length + document.querySelectorAll("video").length;
    const platzhalterFotos = [...document.querySelectorAll("body *")].filter((e) => { const r = e.getBoundingClientRect(); return r.width >= 150 && r.height >= 100 && /^(ihr |hier )?(foto|bild)( folgt| fehlt| hier)?$|ihr foto|foto folgt|bild folgt|platzhalter[- ]?(foto|bild)/i.test(e.textContent.trim().slice(0, 40)) && e.children.length < 4; }).length;
    // Bewegung aus CSS
    const dauern = [], linear = [];
    for (const sh of document.styleSheets) { let regeln; try { regeln = sh.cssRules; } catch { continue; }
      for (const r of regeln) { const t = r.cssText || ""; for (const m of t.matchAll(/transition[^;]*?([\d.]+)(m?s)/g)) dauern.push(m[2] === "s" ? parseFloat(m[1]) * 1000 : parseFloat(m[1])); if (/transition[^;]*linear/.test(t)) linear.push(1); } }
    const pflicht = { impressum: /impressum/i.test(document.body.innerText) || !!document.querySelector("a[href*=impressum]"), datenschutz: /datenschutz/i.test(document.body.innerText) || !!document.querySelector("a[href*=datenschutz]") };
    const reduzierteBewegung = [...document.styleSheets].some((sh) => { try { return [...sh.cssRules].some((r) => String(r.conditionText || r.media?.mediaText || "").includes("reduced-motion")); } catch { return false; } }) || /prefers-reduced-motion/.test([...document.scripts].map((s) => s.textContent).join(" "));
    return { dunkelAnteil, dunkleNeutral, akzente: [...akzente], neon, zinnober, hauptschriften, ueberschriften: [...new Set(ueberschriften)], fliess, groesste, laufweite,
      zeilenlaenge: Math.round(zeilenlaenge), labelsUeberUeberschrift, pfeilKnoepfe, akkordeon, glas, emoji, lilaVerlauf, karten, fotos, platzhalterFotos,
      kursivSerif: [...new Set(kursivSerif)].slice(0, 3), kunstKursiv: [...new Set(kunstKursiv)].slice(0, 4), buehnen, laengsteUebergang: Math.max(0, ...dauern), lineareUebergaenge: linear.length, pflicht, reduzierteBewegung };
  }).catch((e) => ({ fehler: String(e) }));
}

// ---------- Befunde ableiten ----------
const s = stilInfo || {};
const vorlagenSchrift = (f) => /^(inter( tight| display)?|roboto|arial|helvetica neue|space grotesk|geist|system-ui|-apple-system|poppins|montserrat)$/i.test(f || "");
if (s.hauptschriften && vorlagenSchrift(s.hauptschriften[0])) befund("P0", "W1", `Hauptschrift „${s.hauptschriften[0]}“ ist eine KI-Standardschrift`, "Anthropic-Skill frontend-design, Impeccable");
if (s.dunkelAnteil > 0.45 && s.neon) befund("P0", "W1", "Dunkle Fläche mit Neon-Akzent (Grün/Gelbgrün/Cyan/Magenta)", `dunkel ${Math.round(s.dunkelAnteil * 100)} %, Akzent-Farbtöne ${s.akzente.join(",")}`);
if (s.dunkleNeutral > 0.3 && s.zinnober && !s.neon) befund("Hinweis", "W1", "Fast schwarz mit einer grellen Zinnober-Akzentfarbe (steht auf Anthropics Liste der KI-Merkmale)", `neutral dunkel ${Math.round(s.dunkleNeutral * 100)} %`);
if (s.lilaVerlauf) befund("P0", "W1", "Lila-Verlauf", "Anthropic Cookbook");
if (s.emoji) befund("P0", "W1", "Emoji in Überschriften oder Knöpfen", "Impeccable");
if (s.kunstKursiv?.length) befund("P0", "W1", "Künstlich kursiv: kursiv gesetzt in einer Schrift ohne Kursivschnitt (wird schräg verzerrt) – beim Schrifttausch alle Regeln prüfen", s.kunstKursiv.join(" · "));
for (const b of s.buehnen || []) befund("P0", "W11", `Scroll-Bühne ist ${b.h.toFixed(1)} Bildschirmhöhen lang (höchstens etwa 3; wichtige Inhalte rücken sonst zu weit nach unten)`, b.k);
if (s.kursivSerif?.length) befund("P0", "W1", "Kursive Serife in Überschriften (KI-Merkmal, steht in handwerk.md Abschnitt 3)", s.kursivSerif.join(" · "));
const beiwerk = [s.labelsUeberUeberschrift >= 3 && `${s.labelsUeberUeberschrift}× Großbuchstaben-Label über Überschrift`, s.pfeilKnoepfe >= 3 && `${s.pfeilKnoepfe}× „→“ an Knöpfen`,
  s.akkordeon >= 4 && `FAQ-Akkordeon (${s.akkordeon})`, s.glas >= 3 && `${s.glas}× Glas-Effekt`, s.karten >= 4 && `${s.karten} gleich große Karten (Baukasten)`].filter(Boolean);
if (beiwerk.length >= 3) befund("P0", "W1", "Vorlagen-Beiwerk gehäuft", beiwerk.join(" · "));
else if (beiwerk.length) befund("Hinweis", "W1", "Vorlagen-Beiwerk", beiwerk.join(" · "));
if (s.groesste && s.fliess && s.groesste / s.fliess < 3) befund("Hinweis", "W1", `Schwache Rangordnung: größte Überschrift nur ${(s.groesste / s.fliess).toFixed(1)}× Fließtext (Preisträger 4–10×)`);
if (s.groesste > 60 && s.laufweite > 0) befund("Hinweis", "W1", "Große Überschrift ohne negative Laufweite (Preisträger −0,01 bis −0,05 em)");
if (s.zeilenlaenge > 95) befund("Hinweis", "allgemein", `Fließtext bis ca. ${s.zeilenlaenge} Zeichen breit (Ziel 45–90)`);
if (s.lineareUebergaenge) befund("Hinweis", "W1", "Lineare Übergänge (Profis: abbremsend)");
if (s.platzhalterFotos) befund("P0", "W2", `${s.platzhalterFotos} leere Foto-Platzhalter auf der Seite`, "Hauptmotiv und Bildflächen dürfen keine Platzhalter sein");
if (s.fotos === 0) befund("Hinweis", "W2", "Kein einziges echtes Foto oder Video auf der Seite");
if (s.pflicht && !s.pflicht.impressum) befund("P0", "Recht", "Kein Impressum verlinkt");
if (s.pflicht && !s.pflicht.datenschutz) befund("P0", "Recht", "Keine Datenschutzerklärung verlinkt");
if (s.reduzierteBewegung === false) befund("Hinweis", "allgemein", "Keine Regel für „Bewegung reduzieren“ (prefers-reduced-motion) gefunden");
if (ueberlappungen.length) befund("P0", "W10", `Texte überlappen sich (${ueberlappungen.length} Stellen)`, ueberlappungen.slice(0, 4).join(" · "));
for (const [k, v] of leereFlaechen) befund("P0", "W8", `Leere schwarze Fläche in ${k} (${v.anteil} % der Höhe)`, `${v.geraet}, ${v.datei}`);
const kontraste = [...kontrastFehler].sort((a, b) => a[1].kontrast - b[1].kontrast);
if (kontraste.length) befund("P0", "W9", `${kontraste.length} Texte unter dem Mindestkontrast (aus Pixeln gemessen)`, kontraste.slice(0, 5).map(([t, v]) => `„${t}“ ${v.kontrast}:1 statt ${v.soll}:1 (${v.geraet}, ${v.datei})`).join(" · "));
for (const [n, g] of Object.entries(geraete)) {
  if (g.fremde_hosts.length) befund("P0", "Grenze", `Fremde Server (${n})`, g.fremde_hosts.join(", "));
  if (g.cookies || g.speicher?.local || g.speicher?.session) befund("Hinweis", "Recht", `Cookies oder Browser-Speicher gesetzt (${n}) – ohne Not braucht das einen Hinweis bzw. eine Einwilligung`, JSON.stringify({ cookies: g.cookies, ...g.speicher }));
  const api = g.fehlende_dateien.filter((f) => /^\d+ \/api\//.test(f));
  const dateien = g.fehlende_dateien.filter((f) => !api.includes(f));
  let konsole = g.konsolenfehler;
  if (api.length) {
    befund("Hinweis", "Technik", `Server-Schnittstelle in der lokalen Vorschau nicht erreichbar (${n}) – online prüfen`, api.slice(0, 3).join(" | "));
    let rest = api.length; konsole = konsole.filter((k) => !(/Failed to load resource/.test(k) && rest-- > 0));
  }
  if (konsole.length) befund("P0", "Technik", `Konsolenfehler (${n})`, konsole.slice(0, 3).join(" | "));
  if (dateien.length) befund("P0", "Technik", `Fehlende Dateien (${n})`, dateien.slice(0, 3).join(" | "));
  if (g.seitlichScroll) befund("P0", "Technik", `Seite ist breiter als der Bildschirm (${n})`);
  if (n === "handy" && g.zuKleineTippflaechen > 3) befund("Hinweis", "allgemein", `${g.zuKleineTippflaechen} Tippflächen unter 44 px (Handy)`);
  if (g.langsame_stellen.length || g.fps_scroll === null) befund("Hinweis", "W6", `Sehr langsame Darstellung ohne Grafikkarte (${n}): Bildschirmfotos über 8 s bzw. Bildrate nicht messbar`, "nur Vergleich, Abnahme auf Simons Laptop");
  else if (g.fps_scroll !== null && g.fps_scroll < 30 && g.grossesCanvas) befund("Hinweis", "W6", `WebGL über mehr als die halbe Fläche und nur ${g.fps_scroll} fps ohne Grafikkarte (${n})`, "Stufen und Rückfall prüfen");
}

const kontrastListe = Object.fromEntries(kontrastFehler);
const ergebnis = { kontrast: kontrastListe, site, zeit: new Date().toISOString(), groesse_kb: groesseKB, p0: befunde.filter((b) => b.schwere === "P0").length, befunde, geraete, stil: stilInfo, bilder: aus };
fs.mkdirSync(path.dirname(jsonDatei), { recursive: true });
fs.writeFileSync(jsonDatei, JSON.stringify(ergebnis, null, 2));
for (const b of befunde) console.log(`${b.schwere.padEnd(7)} ${b.fehler.padEnd(9)} ${b.text}${b.beleg ? "  [" + b.beleg + "]" : ""}`);
console.log(`\n${ergebnis.p0} harte Befunde (P0), ${befunde.length - ergebnis.p0} Hinweise. Bildschirmfotos: ${aus}  Ergebnis: ${jsonDatei}`);
process.exit(ergebnis.p0 ? 1 : 0);
