#!/usr/bin/env node
// Vorschau für Simon an Stopp 2: packt die gebaute Seite in EINE HTML-Datei (Stile, Skripte, Bilder, Schriften,
// Texturen, Modelle eingebettet), die per Doppelklick im Browser und in der Vorschau der Claude-App läuft.
// Unterseiten (impressum.html, datenschutz.html …) werden als ausklappbare Abschnitte angehängt.
// Im Schreinerei-Test (23.11.2026) hat der Bauer dafür jedes Mal eigene Skripte gebastelt – dieses ersetzt sie.
//
// Aufruf: node vorschau.mjs <site-ordner> <ziel.html> [--pruefen <bilder-ordner>]
//   --pruefen  öffnet die Datei eingebettet in einem <iframe> (Laptop und Handy) und fotografiert nach 3 und 12 s.
//              Sind beide Bilder gleich, spielt der Moment eingebettet nicht von selbst ab (Fehler, handwerk.md §11).
//              Dazu je Abschnitt (section[id]) zwei Bilder kurz nach dem Hineinscrollen und 3 s später: zeigt, ob
//              sich unten etwas bewegt (handwerk.md 1c „Das Wow zieht sich durch“) und ob etwas leer bleibt.
// Braucht esbuild (Bündeln von Modulen) und für --pruefen Playwright: npm i -D esbuild playwright
import { createRequire } from "node:module";
import fs from "node:fs";
import path from "node:path";

const require = createRequire(import.meta.url);
const args = process.argv.slice(2);
const wert = (n) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : null; };
const [ordner, ziel] = args.filter((a, i) => !a.startsWith("--") && !(i > 0 && args[i - 1].startsWith("--")));
if (!ordner || !ziel) { console.error("Aufruf: node vorschau.mjs <site-ordner> <ziel.html> [--pruefen <bilder-ordner>]"); process.exit(2); }
const root = path.resolve(ordner);
const orte = [process.cwd(), root, path.dirname(root), path.join(path.dirname(root), "arbeit", "build"), path.dirname(new URL(import.meta.url).pathname)];
const lade = (name) => { for (const o of orte) { try { return require(require.resolve(name, { paths: [o] })); } catch {} } try { return require(name); } catch { return null; } };
const esbuild = lade("esbuild");
if (!esbuild) console.error("Hinweis: esbuild fehlt (npm i -D esbuild in arbeit/build) – Module mit import werden nicht gebündelt.");

const TYP = { ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".avif": "image/avif", ".gif": "image/gif",
  ".svg": "image/svg+xml", ".ico": "image/x-icon", ".woff2": "font/woff2", ".woff": "font/woff", ".ttf": "font/ttf", ".otf": "font/otf", ".glb": "model/gltf-binary",
  ".gltf": "model/gltf+json", ".bin": "application/octet-stream", ".hdr": "application/octet-stream", ".ktx2": "image/ktx2", ".mp4": "video/mp4", ".webm": "video/webm", ".json": "application/json" };
const lokal = (ref, basis) => {
  if (!ref || /^(data:|https?:|mailto:|tel:|#|javascript:)/i.test(ref)) return null;
  const rein = ref.split(/[?#]/)[0];
  const p = rein.startsWith("/") ? path.join(root, rein) : path.resolve(basis, rein);
  return p.startsWith(root) && fs.existsSync(p) && fs.statSync(p).isFile() ? p : null;
};
const datenUri = (p) => `data:${TYP[path.extname(p).toLowerCase()] || "application/octet-stream"};base64,${fs.readFileSync(p).toString("base64")}`;
const cssEinbetten = (css, basis) => css
  .replace(/@import\s+(?:url\()?['"]([^'"]+)['"]\)?\s*;/g, (m, ref) => { const p = lokal(ref, basis); return p ? cssEinbetten(fs.readFileSync(p, "utf8"), path.dirname(p)) : m; })
  .replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g, (m, q, ref) => { const p = lokal(ref, basis); return p ? `url("${datenUri(p)}")` : m; });

let html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const alias = {};
const im = html.match(/<script[^>]*type=["']importmap["'][^>]*>([\s\S]*?)<\/script>/i);
if (im) { try { for (const [k, v] of Object.entries(JSON.parse(im[1]).imports || {})) { const p = lokal(v, root); if (p && !k.endsWith("/")) alias[k] = p; } } catch {} }

html = html.replace(/<link\b[^>]*rel=["']?preload["']?[^>]*>\s*/gi, "");
html = html.replace(/<link\b[^>]*rel=["']?stylesheet["']?[^>]*>/gi, (tag) => {
  const p = lokal((tag.match(/href=["']([^"']+)["']/) || [])[1], root);
  return p ? `<style>${cssEinbetten(fs.readFileSync(p, "utf8"), path.dirname(p))}</style>` : tag;
});
html = html.replace(/<style([^>]*)>([\s\S]*?)<\/style>/gi, (m, a, css) => `<style${a}>${cssEinbetten(css, root)}</style>`);

// Dateien, die Skripte zur Laufzeit holen (Texturen, Modelle, HDR, JSON): über eine kleine Weiche aus dem Speicher
const vorrat = {};
for (const f of fs.readdirSync(root, { recursive: true })) {
  const p = path.join(root, String(f));
  if (fs.statSync(p).isFile() && /\.(glb|gltf|bin|hdr|json|ktx2|jpe?g|png|webp|avif)$/i.test(p) && fs.statSync(p).size < 25e6)
    vorrat["/" + path.relative(root, p).split(path.sep).join("/")] = datenUri(p);
}
const buendeln = (opts) => { if (!esbuild) throw new Error("esbuild fehlt"); return esbuild.buildSync({ ...opts, bundle: true, format: "esm", write: false, minify: true, alias, logLevel: "silent",
  loader: { ".glb": "dataurl", ".hdr": "dataurl", ".png": "dataurl", ".jpg": "dataurl", ".webp": "dataurl", ".svg": "dataurl", ".woff2": "dataurl", ".json": "json" } })
  .outputFiles[0].text.replace(/<\/script/gi, "<\\/script"); };
html = html.replace(/<script\b([^>]*)\bsrc=["']([^"']+)["']([^>]*)><\/script>/gi, (tag, a, src, b) => {
  const p = lokal(src, root); if (!p) return tag;
  const modul = /type=["']module["']/.test(a + b);
  const roh = () => `<script${modul ? ' type="module"' : ""}>${fs.readFileSync(p, "utf8").replace(/<\/script/gi, "<\\/script")}</script>`;
  if (modul && !esbuild && !/^\s*import\b|\bimport\s*\(/m.test(fs.readFileSync(p, "utf8"))) return roh();
  try { return modul ? `<script type="module">${buendeln({ entryPoints: [p] })}</script>` : `<script>${fs.readFileSync(p, "utf8").replace(/<\/script/gi, "<\\/script")}</script>`; }
  catch (e) { console.error(`Hinweis: ${src} nicht gebündelt (${e.message.split("\n")[0]})`); return tag; }
});
html = html.replace(/<script\b([^>]*)type=["']module["']([^>]*)>([\s\S]*?)<\/script>/gi, (tag, a, b, code) => {
  if (!/\bimport\b/.test(code)) return tag;
  try { return `<script type="module">${buendeln({ stdin: { contents: code, resolveDir: root, loader: "js" } })}</script>`; } catch { return tag; }
});
if (im) html = html.replace(im[0], "");
html = html.replace(/\b(src|poster|href)=["']([^"']+\.(?:png|jpe?g|webp|avif|gif|svg|mp4|webm|ico|woff2?))["']/gi, (m, attr, ref) => { const p = lokal(ref, root); return p ? `${attr}="${datenUri(p)}"` : m; });
html = html.replace(/\bsrcset=["']([^"']+)["']/gi, (m, set) => `srcset="${set.split(",").map((t) => { const [u, w] = t.trim().split(/\s+/); const p = lokal(u, root); return (p ? datenUri(p) : u) + (w ? " " + w : ""); }).join(", ")}"`);

// Unterseiten als Abschnitte anhängen, die per Link aufgehen (#seite-impressum …)
const unter = new Set();
html = html.replace(/href=["'](?:\.\/)?([\w-]+)\.html(#[^"']*)?["']/gi, (m, name) => {
  if (name === "index") return 'href="#"';
  if (!fs.existsSync(path.join(root, name + ".html"))) return m;
  unter.add(name); return `href="#seite-${name}"`;
});
html = html.replace(/href=["']\.\/(#[^"']*)?["']/g, (m, anker) => `href="${anker || "#"}"`);
if (unter.size) {
  let anhang = '<style>.vorschau-unterseite{display:none;padding:48px 16px;max-width:760px;margin:0 auto}.vorschau-unterseite:target{display:block}</style>';
  for (const name of unter) {
    const t = fs.readFileSync(path.join(root, name + ".html"), "utf8");
    const inhalt = (t.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i) || t.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i) || [, ""])[1]
      .replace(/<script\b[\s\S]*?<\/script>/gi, "").replace(/<(\/?)h1\b/gi, "<$1h2");
    anhang += `<section class="vorschau-unterseite" id="seite-${name}">${inhalt}<p><a href="#">Zurück nach oben</a></p></section>`;
  }
  html = /<\/body>/i.test(html) ? html.replace(/<\/body>/i, anhang + "</body>") : html + anhang;
}
if (Object.keys(vorrat).length) {
  const ordnerNamen = [...new Set(Object.keys(vorrat).map((k) => k.split("/")[1]))].map((s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  const weiche = `<script>(()=>{const D=${JSON.stringify(vorrat)};const f=window.fetch.bind(window);const n=u=>{try{const x=new URL(u,location.href);if(x.protocol!=="file:"&&x.origin!==location.origin)return null;const p=decodeURIComponent(x.pathname);const m=p.match(/\\/(?:${ordnerNamen})\\/.*$/);return m?m[0]:p.replace(/^.*\\//,"/")}catch{return null}};const such=u=>{const k=n(u);if(!k)return null;for(const p in D)if(k===p||k.endsWith(p))return D[p];return null};window.fetch=(u,o)=>{const d=such(typeof u==="string"?u:u.url);return f(d||u,o)};const X=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(m,u,...r){return X.call(this,m,such(u)||u,...r)};const S=Object.getOwnPropertyDescriptor(HTMLImageElement.prototype,"src");Object.defineProperty(HTMLImageElement.prototype,"src",{get(){return S.get.call(this)},set(u){S.set.call(this,such(u)||u)},configurable:true})})();</script>`;
  html = html.replace(/<head[^>]*>/i, (h) => h + weiche);
}
fs.mkdirSync(path.dirname(path.resolve(ziel)), { recursive: true });
fs.writeFileSync(ziel, html);
const fremd = (html.match(/(?:src|href)=["']https?:\/\/[^"']+/gi) || []).filter((u) => !/<a\b/.test(u));
console.log(`${ziel}: ${(Buffer.byteLength(html) / 1048576).toFixed(1)} MB${unter.size ? ", Unterseiten: " + [...unter].join(", ") : ""}`);

const bilder = wert("--pruefen");
if (bilder) {
  const pw = lade("playwright");
  if (!pw) { console.error("Playwright fehlt für --pruefen: npm i -D playwright"); process.exit(2); }
  fs.mkdirSync(bilder, { recursive: true });
  const b = await pw.chromium.launch({ args: ["--use-gl=swiftshader", "--enable-unsafe-swiftshader", "--ignore-gpu-blocklist"] });
  const datei = "file://" + path.resolve(ziel);
  const befunde = [];
  const gleich = (a, c) => fs.readFileSync(a).equals(fs.readFileSync(c));
  for (const [n, w, h] of [["laptop", 1280, 860], ["handy", 390, 760]]) {
    const p = await b.newPage({ viewport: { width: w, height: h } });
    const fehler = []; p.on("pageerror", (e) => fehler.push(e.message));
    const huelle = path.join(path.resolve(bilder), `huelle-${n}.html`);
    fs.writeFileSync(huelle, `<!doctype html><body style="margin:0"><iframe src="${datei}" style="border:0;width:${w}px;height:${h}px"></iframe></body>`);
    await p.goto("file://" + huelle);
    await p.waitForTimeout(3000); await p.screenshot({ path: path.join(bilder, `eingebettet-${n}-3s.png`) });
    await p.waitForTimeout(9000); await p.screenshot({ path: path.join(bilder, `eingebettet-${n}-12s.png`) });
    if (gleich(path.join(bilder, `eingebettet-${n}-3s.png`), path.join(bilder, `eingebettet-${n}-12s.png`)))
      befunde.push(`FEHLER eingebettet (${n}): nach 3 und 12 s dasselbe Bild – der Moment spielt in der Vorschau nicht von selbst ab`);
    fehler.forEach((f) => befunde.push(`FEHLER Skript (${n}, eingebettet): ${f}`));
    fs.rmSync(huelle); await p.close();
  }
  const p = await b.newPage({ viewport: { width: 1280, height: 860 } });
  await p.goto(datei); await p.waitForTimeout(1500);
  const ids = await p.evaluate(() => [...document.querySelectorAll("main section[id], body > section[id]")].filter((s) => !s.classList.contains("vorschau-unterseite") && s.getBoundingClientRect().top + scrollY > innerHeight).map((s) => s.id));
  for (const id of ids) {
    await p.evaluate((i) => { const e = document.getElementById(i); scrollTo(0, e.getBoundingClientRect().top + scrollY - 80); }, id);
    await p.waitForTimeout(500); await p.screenshot({ path: path.join(bilder, `unten-${id}-a.png`) });
    await p.waitForTimeout(3000); await p.screenshot({ path: path.join(bilder, `unten-${id}-b.png`) });
    // auf null zugeschnittene oder unsichtbar gebliebene Flächen (Animation nie gestartet)
    const leer = await p.evaluate((i) => [...document.getElementById(i).querySelectorAll("*")].filter((e) => {
      const r = e.getBoundingClientRect(); if (r.width < 40 || r.height < 40 || r.bottom < 0 || r.top > innerHeight) return false;
      const s = getComputedStyle(e); return /inset\(0px 0px 100%|inset\(100%/.test(s.clipPath) || (s.opacity === "0" && !e.closest("[aria-hidden=true]"));
    }).map((e) => e.tagName.toLowerCase() + (e.className && typeof e.className === "string" ? "." + e.className.split(" ")[0] : "")), id);
    if (leer.length) befunde.push(`FEHLER #${id}: ${[...new Set(leer)].slice(0, 4).join(", ")} bleibt nach 3,5 s unsichtbar – Animation startet nicht (handwerk.md 1c, Stolperstein IntersectionObserver)`);
    if (gleich(path.join(bilder, `unten-${id}-a.png`), path.join(bilder, `unten-${id}-b.png`))) befunde.push(`Hinweis #${id}: keine Bewegung beim Hineinscrollen (ok, wenn gewollt – sonst handwerk.md 1c)`);
  }
  await b.close();
  if (fremd.length) befunde.push(`Hinweis: ${fremd.length} Verweis(e) auf fremde Server bleiben drin (${fremd.slice(0, 2).join(", ")})`);
  console.log(befunde.length ? befunde.join("\n") : "Eingebettet spielt der Moment ab, unten bleibt nichts leer.");
  console.log(`Bilder: ${path.resolve(bilder)} – ansehen, bevor Simon die Datei bekommt.`);
  if (befunde.some((x) => x.startsWith("FEHLER"))) process.exit(1);
}
