#!/usr/bin/env node
// Mappe: eine einzige HTML-Datei mit allen Seiten einer mehrseitigen Website (Simon, 26.11.2026:
// „kann ich da nicht einfach eine Datei anklicken, die dann auf die anderen HTML zugreift?“).
//
// Aufruf: node mappe.mjs <site-ordner mit mehreren .html> <ziel.html>
//
// Jede Seite wird einzeln mit vorschau.mjs gepackt (Bilder, Skripte, Schriften eingebettet) und in ein iframe geladen.
// Klicks auf Links zu anderen Seiten (seite.html, seite.html#anker) fängt die Mappe ab und lädt die Seite,
// die Zurück-Taste funktioniert über #seite=…. Große Teile, die auf vielen Seiten gleich sind (data:-Bilder,
// gebündelte Skripte, Stile), werden nur einmal gespeichert (Firmenseite: 43,6 MB → 6,5 MB).
// Grenze: Seiten, die Parameter aus der Adresse lesen (projekt.html?p=…), zeigen in der Mappe ihren Standard.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";

const [ordner, ziel] = process.argv.slice(2);
if (!ordner || !ziel) { console.error("Aufruf: node mappe.mjs <site-ordner> <ziel.html>"); process.exit(2); }
const root = path.resolve(ordner);
const vorschau = path.join(path.dirname(new URL(import.meta.url).pathname), "vorschau.mjs");
const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "mappe-"));
const namen = fs.readdirSync(root).filter((f) => f.endsWith(".html")).map((f) => f.slice(0, -5));
if (!namen.includes("index")) { console.error("Im Ordner fehlt index.html"); process.exit(2); }

const seiten = {};
for (const n of namen) {
  const d = path.join(tmp, n); fs.mkdirSync(d);
  // andere Seiten nicht danebenlegen: vorschau.mjs würde sie sonst als Abschnitte anhängen und die Links umschreiben
  for (const x of fs.readdirSync(root)) if (!x.endsWith(".html")) fs.symlinkSync(path.join(root, x), path.join(d, x));
  const html = fs.readFileSync(path.join(root, n + ".html"), "utf8").replace(/href="(?:\.\/)?index\.html/g, 'href="mappe:index').replace(/href="\.\/"/g, 'href="mappe:index"');
  fs.writeFileSync(path.join(d, "index.html"), html);
  const aus = path.join(tmp, n + ".gepackt.html");
  // cwd = Site-Elternordner, damit vorschau.mjs esbuild in arbeit/build findet
  execFileSync(process.execPath, [vorschau, d, aus], { cwd: path.dirname(root), stdio: ["ignore", "ignore", "inherit"] });
  seiten[n] = fs.readFileSync(aus, "utf8");
}

const teile = [], nr = new Map();
const merk = (t) => { if (!nr.has(t)) { nr.set(t, teile.length); teile.push(t); } return `§§B${nr.get(t)}§§`; };
for (const n of namen) {
  seiten[n] = seiten[n]
    .replace(/data:[\w/+.-]+;base64,[A-Za-z0-9+/=]{5000,}/g, (m) => merk(m))
    .replace(/(<script\b[^>]*>)([\s\S]{5000,}?)(<\/script>)/g, (m, a, b, c) => a + merk(b) + c)
    .replace(/(<style\b[^>]*>)([\s\S]{5000,}?)(<\/style>)/g, (m, a, b, c) => a + merk(b) + c);
}
const js = (o) => JSON.stringify(o).replace(/<\//g, "<\\/");
const html = `<!doctype html><html lang="de"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="theme-color" content="#1c1f22"><title>Website-Entwurf</title>
<style>html,body{margin:0;height:100%;background:#1c1f22;overflow:hidden}iframe{position:fixed;inset:0;width:100%;height:100%;border:0;display:block}</style>
</head><body><iframe id="f" title="Website"></iframe>
<script>
const SEITEN = ${js(seiten)};
const TEILE = ${js(teile)};
const voll = (t) => t.replace(/\\u00a7\\u00a7B(\\d+)\\u00a7\\u00a7/g, (m, i) => TEILE[+i]);
const f = document.getElementById("f");
function ziel(roh) {
  const m = roh && roh.match(/^(?:mappe:|\\.\\/)?([\\w-]+)(?:\\.html)?(\\?[^#]*)?(#.*)?$/);
  if (!m || !SEITEN[m[1]] || (!/^mappe:/.test(roh) && !/\\.html/.test(roh))) return null;
  return { seite: m[1], anker: m[3] || "" };
}
function lade(seite, anker, neu) {
  if (!SEITEN[seite]) seite = "index";
  f.srcdoc = voll(SEITEN[seite]);
  f.onload = () => {
    const d = f.contentDocument;
    d.addEventListener("click", (e) => {
      const a = e.target.closest && e.target.closest("a[href]"); if (!a) return;
      const z = ziel(a.getAttribute("href")); if (!z) return;
      e.preventDefault(); lade(z.seite, z.anker, true);
    }, true);
    if (anker) { const el = d.getElementById(anker.slice(1)); if (el) el.scrollIntoView(); }
    f.contentWindow.focus();
  };
  const h = "#seite=" + seite + (anker ? "&a=" + anker.slice(1) : "");
  if (neu) history.pushState(null, "", h); else history.replaceState(null, "", h);
}
function ausHash() { const p = new URLSearchParams(location.hash.slice(1)); lade(p.get("seite") || "index", p.get("a") ? "#" + p.get("a") : "", false); }
addEventListener("popstate", ausHash);
ausHash();
</script></body></html>`;
fs.writeFileSync(ziel, html);
fs.rmSync(tmp, { recursive: true, force: true });
console.log(`${ziel}: ${(Buffer.byteLength(html) / 1048576).toFixed(1)} MB, ${namen.length} Seiten (${namen.join(", ")}), ${teile.length} gemeinsame Teile`);
