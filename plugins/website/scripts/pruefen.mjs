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
// Seit 0.3.3 (GitHub-Abgleich 24.11.2026, nur Ideen und Schwellen aus impeccable, Hallmark, Vercel Web Interface
// Guidelines, gsap-skills und Anthropic frontend-design, eigene Umsetzung): W13 Inhalt bleibt unsichtbar, W14 Fokus
// sichtbar, W15 Zoom gesperrt, W16 Breiten 320 und 1920 px, W17 Text fehlt am Handy, W18 Bewegung nur über transform
// und opacity, W19 GSAP-Markierungen, dazu weitere W1-Merkmale (Verlaufstext, Leuchtrand, Creme, Beiwerk).
import { createRequire } from "node:module";
import http from "node:http";
import fs from "node:fs";
import path from "node:path";
import { drehbuchBefunde } from "./drehbuch.mjs";

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

// ---------- Zugang und Bewegung im eigenen Code (ohne Browser) ----------
// Eigene Stile und Skripte: Dateien außerhalb von vendor/lib plus eingebettete <style>- und <script>-Blöcke.
{
  const eingebettet = (re) => html.map((f) => [...lies(f).matchAll(re)].map((m) => m[1]).join("\n")).join("\n");
  const eigenCss = dateien.filter((f) => /\.css$/i.test(f) && !bibliothek(f) && !/\.min\.css$/i.test(f)).map((f) => lies(f)).join("\n") + "\n" + eingebettet(/<style(?:\s[^>]*)?>([\s\S]*?)<\/style>/gi);
  const eigenJs = dateien.filter((f) => /\.m?js$/i.test(f) && !bibliothek(f)).map((f) => lies(f)).join("\n") + "\n" + eingebettet(/<script(?![^>]*\bsrc=)(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi);
  const css = eigenCss.replace(/\/\*[\s\S]*?\*\//g, "");
  // W15 Zoom gesperrt (Vercel Web Interface Guidelines)
  for (const f of html) {
    const m = lies(f).match(/<meta[^>]+name=["']viewport["'][^>]*>/i);
    const inhalt = m ? ((m[0].match(/content=["']([^"']*)["']/i) || [])[1] || "") : "";
    const max = (inhalt.match(/maximum-scale\s*=\s*([\d.]+)/i) || [])[1];
    if (/user-scalable\s*=\s*(no|0)\b/i.test(inhalt) || (max && parseFloat(max) <= 1)) befund("P0", "W15", `Zoom gesperrt in ${f} (user-scalable=no bzw. maximum-scale=1) – nie sperren`, "Vercel Web Interface Guidelines");
  }
  // W14 Fokus: outline weggenommen, aber keine :focus-visible-Regel (Hallmark sloplint gate 26a, Vercel)
  const ohneRand = css.match(/outline\s*:\s*(none|0)\s*(!important)?\s*[;}]/i);
  if (ohneRand && !/:focus-visible/.test(css)) befund("P0", "W14", "outline: none ohne :focus-visible-Regel im CSS – Tastatur-Nutzer sehen nicht, wo sie sind", "Hallmark sloplint 26a, Vercel");
  // W1 Federnde Bewegung (impeccable bounce-easing): cubic-bezier, dessen y-Werte über 0…1 hinausschießen
  const federnd = [...css.matchAll(/cubic-bezier\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)/g)].filter((m) => [m[2], m[4]].some((y) => +y < 0 || +y > 1)).map((m) => m[0]);
  if (federnd.length) befund("Hinweis", "W1", "Federnde Bewegung (Überschwinger) – Profis bremsen ab, ohne zurückzufedern", [...new Set(federnd)].slice(0, 3).join(", ") + " · impeccable bounce-easing");
  // W18 Bewegung, die das Layout neu rechnet (Vercel, Hallmark): transition: all bzw. width/height/top/left
  const bewegung = [];
  if (/transition(-property)?\s*:\s*all\b/i.test(css)) bewegung.push("transition: all");
  for (const m of css.matchAll(/transition(?:-property)?\s*:([^;}]*)/gi)) { const p = m[1].match(/(^|[\s,])(width|height|top|left)(?=[\s,]|$)/i); if (p) { bewegung.push(`transition von ${p[2]}`); break; } }
  for (const m of css.matchAll(/@keyframes\s+([\w-]+)\s*\{((?:[^{}]*\{[^{}]*\})*)[^{}]*\}/gi)) { const p = m[2].match(/(^|[;{\s])(width|height|top|left)\s*:/i); if (p) { bewegung.push(`@keyframes ${m[1]} ändert ${p[2]}`); break; } }
  if (bewegung.length) befund("Hinweis", "W18", "Animiert wird nur transform und opacity", bewegung.join(" · ") + " · Vercel, Hallmark");
  // W19 GSAP-Markierungen im eigenen Code (gsap-skills): Prüfhilfe, die sichtbar mit ausgeliefert würde
  if (/\bmarkers\s*:\s*(true|\{)/.test(eigenJs)) befund("P0", "W19", "GSAP ScrollTrigger mit markers: true im eigenen Code – Prüfhilfe vor der Lieferung entfernen", "gsap-skills");
}

// ---------- W20 Drehbuch: das Wow zieht sich durch (handwerk.md 1c, Simon 24.11.2026) ----------
{
  let dt = null;
  try { dt = fs.readFileSync(path.join(site, "..", "arbeit", "drehbuch.md"), "utf8"); } catch {}
  for (const b of drehbuchBefunde(dt)) befund(...b);
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
let ruhe = null, fokus = null;
const textBestaende = {};

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
        // Zeilen, die unter einer festen Leiste liegen (Kopfleiste mit eigener Fläche), sieht niemand: nicht werten
        const verdeckt = (r) => {
          const o = document.elementFromPoint(Math.min(innerWidth - 1, Math.max(0, r.left + r.width / 2)), Math.min(innerHeight - 1, Math.max(0, r.top + r.height / 2)));
          if (!o || o === e || e.contains(o) || o.contains(e)) return false;
          for (let n = o; n && n.nodeType === 1; n = n.parentElement) { const p = getComputedStyle(n).position; if (p === "fixed" || p === "sticky") return !n.contains(e) && getComputedStyle(n).backgroundColor !== "rgba(0, 0, 0, 0)"; }
          return false;
        };
        const zeilen = [...rg.getClientRects()].filter((r) => r.width >= 4 && r.height >= 8 && r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth && !verdeckt(r));
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
  textBestaende[name] = await textBestand(page);
  if (name === "desktop") { stilInfo = await stilAnalyse(page); ruhe = await ruheZustand(page); fokus = await fokusPruefen(page); }
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
// Zwei Breiten mehr (Hallmark): 320 px (kleinstes Handy) und 1920 px (großer Bildschirm), nur Messung, keine Bilder
const breiten = {};
{
  // ohne isMobile: Sonst zoomt Chromium bei zu breitem Inhalt heraus, und die Messung sieht kein seitliches Scrollen
  const ctx = await browser.newContext({ viewport: { width: 320, height: 640 }, deviceScaleFactor: 1, hasTouch: true });
  const page = await ctx.newPage();
  await page.goto(basis, { waitUntil: "load", timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(1500);
  breiten.b320 = await page.evaluate(() => {
    const zuBreit = [...document.querySelectorAll("body *")].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && r.right > innerWidth + 1 && ![...e.children].some((k) => k.getBoundingClientRect().right > innerWidth + 1); })
      .slice(0, 4).map((e) => `${e.tagName.toLowerCase()}${e.className && typeof e.className === "string" ? "." + e.className.split(" ")[0] : ""} (${Math.round(e.getBoundingClientRect().right)} px)`);
    // auch zu lange Wörter, die aus ihrem Kasten ragen (große Überschrift)
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (w.nextNode() && zuBreit.length < 4) { const rg = document.createRange(); rg.selectNodeContents(w.currentNode); const r = rg.getBoundingClientRect(); if (r.width > 0 && r.right > innerWidth + 1) zuBreit.push(`Text „${w.currentNode.textContent.trim().slice(0, 24)}“ (${Math.round(r.right)} px)`); }
    return { seitlich: document.documentElement.scrollWidth > innerWidth + 1, breite: document.documentElement.scrollWidth, zuBreit };
  }).catch(() => null);
  await ctx.close();
}
{
  const ctx = await browser.newContext({ viewport: { width: 1920, height: 1080 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(basis, { waitUntil: "load", timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(1500);
  // breiteste Textzeile im Fließtext (Zeilen gemessen, nicht Kästen)
  breiten.b1920 = await page.evaluate(() => {
    const lang = [];
    for (const e of document.querySelectorAll("p,li,dd,blockquote,figcaption,td")) {
      if (e.textContent.trim().length < 80) continue;
      const rg = document.createRange(); rg.selectNodeContents(e);
      const w = Math.max(0, ...[...rg.getClientRects()].map((r) => r.width));
      if (w > 1600) lang.push(`„${e.textContent.trim().slice(0, 30)}…“ ${Math.round(w)} px`);
    }
    return { zuBreit: lang.slice(0, 3) };
  }).catch(() => null);
  await ctx.close();
}
// Inhalt bleibt unsichtbar, noch einmal mit „Bewegung reduzieren“ (dort springen Einblendungen oft nicht an)
let ruheReduziert = null;
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
  const page = await ctx.newPage();
  await page.goto(basis, { waitUntil: "load", timeout: 60000 }).catch(() => {});
  await page.addStyleTag({ content: "html,body{scroll-behavior:auto!important}" }).catch(() => {});
  await page.waitForTimeout(1200);
  ruheReduziert = await ruheZustand(page);
  await ctx.close();
}
await browser.close();
server.close();

// ---------- Text, der sichtbar gerendert ist (für W17: fehlt am Handy) ----------
async function textBestand(page) {
  return page.evaluate(() => {
    const m = {};
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (w.nextNode()) {
      const t = w.currentNode, txt = t.textContent.replace(/\s+/g, " ").trim(), e = t.parentElement;
      if (txt.length < 2 || !e || e.closest("script,style,noscript,template,[aria-hidden='true']")) continue;
      const rg = document.createRange(); rg.selectNodeContents(t);
      const da = [...rg.getClientRects()].some((r) => r.width * r.height > 4) && getComputedStyle(e).visibility !== "hidden";
      m[txt] = (m[txt] || 0) + (da ? 1 : 0);
    }
    return m;
  }).catch(() => ({}));
}

// ---------- W13: Inhalt bleibt unsichtbar (impeccable content-hidden-at-rest) ----------
// Einmal Schritt für Schritt bis ganz unten und wieder hoch (Zeit für IntersectionObserver), dabei merken, welcher Text
// und welche Fläche je sichtbar war. Was nie sichtbar war und am Ende auf Deckkraft 0, visibility: hidden oder einem auf
// null zugeschnittenen clip-path steht, sieht kein Besucher (Schreinerei-Test 23.11.2026: Team-Rahmen blieb leer).
async function ruheZustand(page) {
  return page.evaluate(async () => {
    const warte = (ms) => new Promise((r) => setTimeout(r, ms));
    // Menüs, Dialoge und Hover-Zustände in Bedienelementen sind absichtlich verborgen
    const ABSICHT = "a,button,summary,label,select,[role=button],[role=dialog],[role=menu],dialog,[aria-modal=true],nav,[inert]";
    const knoten = [];
    const w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
    while (w.nextNode() && knoten.length < 4000) {
      const t = w.currentNode, n = t.textContent.replace(/\s+/g, " ").trim().length, e = t.parentElement;
      if (n < 2 || !e || e.closest("script,style,noscript,template,[aria-hidden='true']")) continue;
      knoten.push({ t, e, n, gesehen: false });
    }
    const box = (k) => { const rg = document.createRange(); rg.selectNodeContents(k.t); return rg.getBoundingClientRect(); };
    const imBild = (r) => r.width * r.height >= 1 && r.bottom > 0 && r.top < innerHeight;
    const versteckt = (e) => { let o = 1; for (let n = e; n && n.nodeType === 1; n = n.parentElement) { o *= parseFloat(getComputedStyle(n).opacity); if (o < 0.05) return true; } return getComputedStyle(e).visibility === "hidden"; };
    // äußerstes Element, das den Text verbirgt
    const verstecker = (e) => { let wer = null; for (let n = e; n && n.nodeType === 1; n = n.parentElement) { const s = getComputedStyle(n); const vorne = n.parentElement ? getComputedStyle(n.parentElement).visibility : "visible"; if (parseFloat(s.opacity) < 0.05 || (s.visibility === "hidden" && vorne !== "hidden")) wer = n; } return wer; };
    const nurLeser = (e) => { for (let n = e; n && n.nodeType === 1; n = n.parentElement) { const s = getComputedStyle(n); if (/rect\(0/.test(s.clip) || (s.overflow === "hidden" && n.getBoundingClientRect().width <= 2)) return true; } return false; };
    const nullClip = (e, r) => {
      const cp = getComputedStyle(e).clipPath; if (!cp || cp === "none") return false;
      const m = cp.match(/^inset\(([^)]*)\)/);
      if (m) {
        const t = m[1].split(/\s+round\s+/)[0].trim().split(/\s+/); const [a, b = a, c = a, d = b] = t;
        const px = (v, ganz) => (v.endsWith("%") ? (parseFloat(v) / 100) * ganz : parseFloat(v) || 0);
        return px(a, r.height) + px(c, r.height) >= r.height - 0.5 || px(b, r.width) + px(d, r.width) >= r.width - 0.5;
      }
      return /^circle\(\s*0(px|%)?[\s)]/.test(cp);
    };
    const flaechen = [...document.querySelectorAll("body *")].slice(0, 4000).filter((e) => getComputedStyle(e).clipPath !== "none");
    const frei = new Set();
    const pruefe = () => {
      for (const k of knoten) { if (k.gesehen) continue; const r = box(k); if (imBild(r) && !versteckt(k.e)) k.gesehen = true; }
      for (const e of flaechen) { if (frei.has(e)) continue; const r = e.getBoundingClientRect(); if (imBild(r) && !nullClip(e, r)) frei.add(e); }
    };
    const H = () => document.documentElement.scrollHeight;
    const schritt = Math.max(innerHeight * 0.5, (H() - innerHeight) / 60);
    pruefe();
    for (let y = schritt; y < H() - innerHeight; y += schritt) { scrollTo(0, y); await warte(140); pruefe(); }
    scrollTo(0, H()); await warte(1200); pruefe();
    for (let y = H() - innerHeight - schritt; y > 0; y -= schritt) { scrollTo(0, y); await warte(80); pruefe(); }
    scrollTo(0, 0); await warte(1200); pruefe();
    let gesamt = 0, weg = 0; const texte = [];
    for (const k of knoten) {
      const r = box(k); if (r.width * r.height < 1 || nurLeser(k.e)) continue;
      gesamt += k.n;
      if (k.gesehen || !versteckt(k.e)) continue;
      const v = verstecker(k.e); if (v && v.closest(ABSICHT)) continue;
      weg += k.n; if (texte.length < 4) texte.push(k.t.textContent.trim().slice(0, 30));
    }
    const leer = [];
    for (const e of [...document.querySelectorAll("body *")].slice(0, 4000)) {
      const r = e.getBoundingClientRect();
      if (r.width < 40 || r.height < 40 || frei.has(e) || e.closest(ABSICHT) || !nullClip(e, r)) continue;
      leer.push(`${e.tagName.toLowerCase()}${typeof e.className === "string" && e.className ? "." + e.className.trim().split(/\s+/)[0] : ""} (${Math.round(r.width)}×${Math.round(r.height)})`);
    }
    return { gesamt, weg, texte, flaechen: leer.slice(0, 4) };
  }).catch((e) => ({ fehler: String(e).slice(0, 120) }));
}

// ---------- W14: Fokus sichtbar (Hallmark, Vercel) ----------
// Ruhezustand aller Bedienelemente merken, dann bis zu 16× Tab: Ändert sich am fokussierten Element weder Rahmenlinie
// (outline), Schatten, Rand, Hintergrund, Unterstreichung noch ein ::before/::after, sieht man den Fokus nicht.
async function fokusPruefen(page) {
  await page.evaluate(() => {
    scrollTo(0, 0); document.activeElement?.blur?.();
    const merk = (e, p) => {
      const s = getComputedStyle(e, p); if (p && (s.content === "none" || s.content === "normal")) return "";
      const rand = s.outlineStyle !== "none" && parseFloat(s.outlineWidth) > 0 && !/^rgba\([^)]*,\s*0\)$/.test(s.outlineColor) ? `${s.outlineStyle} ${s.outlineWidth} ${s.outlineColor} ${s.outlineOffset}` : "-";
      return [rand, s.boxShadow, s.borderTopColor, s.borderTopWidth, s.borderBottomColor, s.borderBottomWidth, s.borderLeftColor, s.borderRightColor, s.backgroundColor, s.backgroundImage, s.textDecorationLine, p ? `${s.opacity} ${s.transform} ${s.width} ${s.height}` : ""].join("|");
    };
    window.__pfMerk = merk;
    window.__pfRuhe = new Map([...document.querySelectorAll("a[href],button,input:not([type=hidden]),select,textarea,summary,[tabindex]:not([tabindex='-1'])")].map((e) => [e, [merk(e), merk(e, "::before"), merk(e, "::after")].join("#")]));
  }).catch(() => {});
  const gesehen = new Set(), ohne = [];
  let geprueft = 0;
  for (let i = 0; i < 16; i++) {
    await page.keyboard.press("Tab").catch(() => {});
    await page.waitForTimeout(150);
    const r = await page.evaluate(() => {
      const e = document.activeElement; if (!e || e === document.body || !window.__pfRuhe?.has(e)) return null;
      const q = e.getBoundingClientRect(); if (q.width < 1 || q.height < 1) return { id: "-", leer: true };
      if (!e.dataset.pfFokus) e.dataset.pfFokus = String(Math.random()).slice(2, 10);
      const jetzt = [window.__pfMerk(e), window.__pfMerk(e, "::before"), window.__pfMerk(e, "::after")].join("#");
      return { id: e.dataset.pfFokus, sichtbar: jetzt !== window.__pfRuhe.get(e), name: `${e.tagName.toLowerCase()} „${(e.textContent || e.getAttribute("aria-label") || "").trim().slice(0, 24)}“` };
    }).catch(() => null);
    if (!r || r.leer) continue;
    if (gesehen.has(r.id)) break;   // einmal rum
    gesehen.add(r.id); geprueft++;
    if (!r.sichtbar) ohne.push(r.name);
  }
  return { geprueft, ohne };
}

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
    // Verlaufstext (impeccable gradient-text)
    const verlaufstext = alle.filter((e) => { const st = getComputedStyle(e); return (st.backgroundClip === "text" || st.webkitBackgroundClip === "text") && /gradient/.test(st.backgroundImage) && e.textContent.trim(); }).map((e) => e.textContent.trim().slice(0, 30));
    // Neon-Leuchtrand (impeccable dark-glow): Schatten ohne Versatz, weich (≥ 3 px), farbig (Sättigung > 0,4)
    const leuchten = (wert) => wert && wert !== "none" && wert.split(/,(?![^(]*\))/).some((sch) => {
      const f = sch.match(/rgba?\([^)]*\)/); if (!f) return false;
      const [x, y, unschaerfe = 0] = (sch.replace(f[0], "").match(/-?[\d.]+px/g) || []).map(parseFloat);
      const c = rgb(f[0]); const a = c.length > 3 ? c[3] : 1; const x2 = hsl(c);
      return x === 0 && y === 0 && unschaerfe >= 3 && x2.s > 0.4 && x2.l > 0.2 && a >= 0.1;
    });
    const leuchtrand = alle.filter((e) => { const st = getComputedStyle(e); if (!leuchten(st.boxShadow) && !leuchten(st.textShadow)) return false; const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0; })
      .map((e) => (e.textContent.trim() || e.tagName.toLowerCase()).slice(0, 24));
    // Creme-Grund (impeccable cream-palette): größte Hintergrundfläche, genau gemessen
    const genau = new Map();
    for (const e of [document.documentElement, document.body, ...alle]) {
      const st = getComputedStyle(e); const c = rgb(st.backgroundColor); if (c.length < 3 || (c.length > 3 && c[3] < 0.9)) continue;
      const r = e.getBoundingClientRect(); const a = Math.min(r.width, innerWidth) * Math.min(r.height, 20000); if (a < 1) continue;
      const k = c.slice(0, 3).map(Math.round).join(","); genau.set(k, (genau.get(k) || 0) + a);
    }
    const grund = ([...genau].sort((a, b) => b[1] - a[1])[0] || ["255,255,255"])[0].split(",").map(Number);
    const creme = Math.min(...grund) >= 209 && grund[0] >= grund[1] && grund[1] >= grund[2] && grund[0] - grund[2] >= 6 && grund[0] - grund[2] <= 48;
    const serifenTitel = [...document.querySelectorAll("h1,h2")].some((h) => { const f = getComputedStyle(h).fontFamily.toLowerCase().replace(/["']/g, ""); const erste = f.split(",")[0];
      return !/sans|grotesk|mono/.test(erste) && (/(^|,)\s*serif\s*(,|$)/.test(f) || /georgia|times|garamond|playfair|fraunces|cormorant|baskerville|lora|caslon|merriweather|serif|crimson|spectral|newsreader/.test(erste)); });
    const terrakotta = alle.some((e) => { const st = getComputedStyle(e); const r = e.getBoundingClientRect(); if (r.width * r.height < 1) return false;
      return [rgb(st.color), rgb(st.backgroundColor), rgb(st.borderTopColor)].some((c) => { if (c.length < 3 || (c.length > 3 && c[3] < 0.5)) return false; const x = hsl(c); return x.h >= 10 && x.h <= 30 && x.s > 0.35 && x.l >= 0.35 && x.l <= 0.75; }); });
    // Pulsierender Punkt (impeccable pulsing-dot): klein, rund, Animation ohne Ende – auch als ::before/::after
    const rund = (st, w, h) => { const br = st.borderTopLeftRadius; return br.endsWith("%") ? parseFloat(br) >= 50 : parseFloat(br) >= Math.min(w, h) / 2 - 0.5; };
    const pulsPunkte = alle.filter((e) => {
      const st = getComputedStyle(e); const r = e.getBoundingClientRect();
      if (st.animationName !== "none" && /infinite/.test(st.animationIterationCount) && r.width > 0 && r.height > 0 && r.width <= 16 && r.height <= 16 && rund(st, r.width, r.height)) return true;
      return ["::before", "::after"].some((p) => { const ps = getComputedStyle(e, p); if (ps.content === "none" || ps.content === "normal" || ps.animationName === "none" || !/infinite/.test(ps.animationIterationCount)) return false;
        const w = parseFloat(ps.width), h = parseFloat(ps.height); return w > 0 && h > 0 && w <= 16 && h <= 16 && rund(ps, w, h); });
    }).length;
    // Icon-Kachel über Überschrift (impeccable icon-tile-stack)
    const kachel = (k, h) => { if (!k || k === h || k.contains(h)) return false; const r = k.getBoundingClientRect(); if (r.width < 12 || r.height < 12 || r.width > 64 || r.height > 64) return false;
      const st = getComputedStyle(k); if (!(parseFloat(st.borderTopLeftRadius) > 0)) return false; const c = rgb(st.backgroundColor); const a = c.length > 3 ? c[3] : c.length === 3 ? 1 : 0; return a >= 0.05 || /gradient/.test(st.backgroundImage); };
    const iconKacheln = [...document.querySelectorAll("h2,h3")].filter((h) => {
      if (kachel(h.previousElementSibling, h)) return true;
      for (let c = h, i = 0; i < 2 && c.parentElement; i++, c = c.parentElement) if (kachel(c.parentElement.firstElementChild, h)) return true;
      return false;
    }).length;
    // Meta-Zeilen „A · B · C“ (Anthropic frontend-design, Hallmark)
    const zweiPunkte = (e) => (e.textContent.match(/·/g) || []).length >= 2 && e.textContent.length < 200;
    const metaZeilen = alle.filter((e) => { if (!zweiPunkte(e) || [...e.children].some(zweiPunkte)) return false; const r = e.getBoundingClientRect(); const st = getComputedStyle(e); return r.width > 0 && r.height > 0 && st.visibility !== "hidden" && parseFloat(st.opacity) > 0.05; }).length;
    // Seitenstreifen an runder Karte (impeccable side-tab): nur links oder nur oben ein Rand von 2–12 px
    const seitenstreifen = alle.filter((e) => {
      const st = getComputedStyle(e); const b = (k) => (st[`border${k}Style`] === "none" ? 0 : parseFloat(st[`border${k}Width`]) || 0);
      const l = b("Left"), t = b("Top"), r = b("Right"), u = b("Bottom");
      const einseitig = (l >= 2 && l <= 12 && !t && !r && !u) || (t >= 2 && t <= 12 && !l && !r && !u);
      if (!einseitig) return false;
      const radius = Math.max(...["TopLeft", "TopRight", "BottomLeft", "BottomRight"].map((k) => parseFloat(st[`border${k}Radius`]) || 0));
      const q = e.getBoundingClientRect(); return radius >= 4 && q.width >= 60 && q.height >= 30;
    }).length;
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
      kursivSerif: [...new Set(kursivSerif)].slice(0, 3),
      verlaufstext: [...new Set(verlaufstext)].slice(0, 3), leuchtrand: [...new Set(leuchtrand)].slice(0, 3), grund, creme, serifenTitel, terrakotta, pulsPunkte, iconKacheln, metaZeilen, seitenstreifen, kunstKursiv: [...new Set(kunstKursiv)].slice(0, 4), buehnen, laengsteUebergang: Math.max(0, ...dauern), lineareUebergaenge: linear.length, pflicht, reduzierteBewegung };
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
if (s.verlaufstext?.length) befund("P0", "W1", "Verlaufstext (Farbverlauf in der Schrift)", s.verlaufstext.join(" · ") + " · impeccable gradient-text");
if (s.leuchtrand?.length) befund("P0", "W1", "Neon-Leuchtrand (farbiger Schatten ohne Versatz)", s.leuchtrand.join(" · ") + " · impeccable dark-glow");
if (s.creme && s.serifenTitel && s.terrakotta) befund("P0", "W1", "Creme-Grund mit Serifen-Überschrift und Terrakotta-Akzent (Vorlagen-Look „edel“)", `Grund rgb(${s.grund.join(",")}) · impeccable cream-palette`);
else if (s.creme) befund("Hinweis", "W1", "Creme-Grund – nur, wenn er aus dem Auftraggeber kommt", `rgb(${s.grund.join(",")}) · impeccable cream-palette`);
const beiwerk = [s.labelsUeberUeberschrift >= 3 && `${s.labelsUeberUeberschrift}× Großbuchstaben-Label über Überschrift`, s.pfeilKnoepfe >= 3 && `${s.pfeilKnoepfe}× „→“ an Knöpfen`,
  s.akkordeon >= 4 && `FAQ-Akkordeon (${s.akkordeon})`, s.glas >= 3 && `${s.glas}× Glas-Effekt`, s.karten >= 4 && `${s.karten} gleich große Karten (Baukasten)`,
  s.pulsPunkte >= 1 && `${s.pulsPunkte}× pulsierender Punkt`, s.iconKacheln >= 3 && `${s.iconKacheln}× Icon-Kachel über Überschrift`,
  s.metaZeilen >= 3 && `${s.metaZeilen}× Meta-Zeile „A · B · C“`, s.seitenstreifen >= 1 && `${s.seitenstreifen}× farbiger Seitenstreifen an runder Karte`].filter(Boolean);
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

// W13 Inhalt bleibt unsichtbar – mit und ohne „Bewegung reduzieren“, aber nur ein Befund
const ruheFehlt = (r) => r && !r.fehler && ((r.gesamt >= 200 && r.weg / r.gesamt > 0.3) || r.weg >= 150 || r.flaechen.length > 0);
if (ruheFehlt(ruhe) || ruheFehlt(ruheReduziert)) {
  const r = ruheFehlt(ruhe) ? ruhe : ruheReduziert;
  const wann = ruheFehlt(ruhe) && ruheFehlt(ruheReduziert) ? "auch bei „Bewegung reduzieren“" : ruheFehlt(ruhe) ? "nach Scrollen bis unten und zurück" : "nur bei „Bewegung reduzieren“";
  const teile = [r.weg ? `${r.weg} von ${r.gesamt} Zeichen Text unsichtbar (${r.texte.map((t) => `„${t}“`).join(", ")})` : "", r.flaechen.length ? `auf null zugeschnitten: ${r.flaechen.join(", ")}` : ""].filter(Boolean);
  befund("P0", "W13", `Inhalt bleibt unsichtbar (${wann}) – Einblendung springt nicht an`, teile.join(" · ") + " · impeccable content-hidden-at-rest");
}
// W14 Fokus sichtbar
if (fokus?.ohne.length) befund("P0", "W14", `${fokus.ohne.length} von ${fokus.geprueft} Bedienelementen zeigen mit Tab keinen sichtbaren Fokus`, fokus.ohne.slice(0, 4).join(", ") + " · Hallmark, Vercel");
// W16 Zwei Breiten mehr
if (breiten.b320?.seitlich) befund("P0", "W16", `Bei 320 px Breite scrollt die Seite seitlich (${breiten.b320.breite} px breit)`, breiten.b320.zuBreit.join(", ") + " · Hallmark");
if (breiten.b1920?.zuBreit.length) befund("Hinweis", "W16", "Bei 1920 px läuft Fließtext breiter als 1600 px (Breite begrenzen)", breiten.b1920.zuBreit.join(" · ") + " · Hallmark");
// W17 Text fehlt am Handy (Hallmark F25)
let handyFehlt = 0; const handyBeispiele = [];
if (textBestaende.desktop && textBestaende.handy) for (const [t, n] of Object.entries(textBestaende.desktop)) {
  const fehlt = n - (textBestaende.handy[t] || 0); if (fehlt <= 0) continue;
  handyFehlt += fehlt * t.split(" ").length; if (handyBeispiele.length < 3) handyBeispiele.push(`„${t.slice(0, 30)}“`);
}
if (handyFehlt >= 40) befund("Hinweis", "W17", `${handyFehlt} Wörter sind am Desktop sichtbar, am Handy nicht – Handy-Besucher brauchen denselben Inhalt`, handyBeispiele.join(", ") + " · Hallmark F25");

const kontrastListe = Object.fromEntries(kontrastFehler);
const ergebnis = { kontrast: kontrastListe, site, zeit: new Date().toISOString(), groesse_kb: groesseKB, p0: befunde.filter((b) => b.schwere === "P0").length, befunde, geraete, stil: stilInfo,
  zugang: { ruhe, ruhe_reduziert: ruheReduziert, fokus, breiten, handy_fehlende_woerter: handyFehlt }, bilder: aus };
fs.mkdirSync(path.dirname(jsonDatei), { recursive: true });
fs.writeFileSync(jsonDatei, JSON.stringify(ergebnis, null, 2));
for (const b of befunde) console.log(`${b.schwere.padEnd(7)} ${b.fehler.padEnd(9)} ${b.text}${b.beleg ? "  [" + b.beleg + "]" : ""}`);
console.log(`\n${ergebnis.p0} harte Befunde (P0), ${befunde.length - ergebnis.p0} Hinweise. Bildschirmfotos: ${aus}  Ergebnis: ${jsonDatei}`);
process.exit(ergebnis.p0 ? 1 : 0);
