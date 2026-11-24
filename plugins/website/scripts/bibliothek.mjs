#!/usr/bin/env node
// Baustein-Bibliothek verwalten (bibliothek/README.md).
//   node bibliothek.mjs                 Steckbriefe einsammeln → bibliothek/bausteine.json und bibliothek/katalog.html
//   node bibliothek.mjs --messen [id]   fps normal und 4× gedrosselt je Baustein messen (Playwright), in den Steckbrief schreiben
//   node bibliothek.mjs --pruefen       Aufnahmeregeln prüfen (Pflichtfelder, keine fremden Server, Ruhezustand), Ausgabe FEHLER/Hinweis
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { createRequire } from "node:module";

const BIB = path.join(path.dirname(new URL(import.meta.url).pathname), "..", "bibliothek");
const args = process.argv.slice(2);
const PFLICHT = ["id", "name", "abschnitt", "lautstaerke", "was_man_sieht", "technik", "slots", "stellschrauben", "abwandeln", "reduzierte_bewegung"];
const ABSCHNITTE = ["einstieg", "leistungen", "ablauf", "referenzen", "text", "schluss", "begleiter"];

export function steckbriefe(bib = BIB) {
  return fs.readdirSync(bib, { withFileTypes: true })
    .filter((d) => d.isDirectory() && !d.name.startsWith("_"))
    .map((d) => { try { return { ...JSON.parse(fs.readFileSync(path.join(bib, d.name, "baustein.json"), "utf8")), ordner: d.name }; } catch { return { ordner: d.name, kaputt: true }; } });
}

export function pruefe(bib = BIB) {
  const raus = [];
  for (const s of steckbriefe(bib)) {
    if (s.kaputt) { raus.push(`FEHLER ${s.ordner}: baustein.json fehlt oder ist kein JSON`); continue; }
    for (const f of PFLICHT) if (s[f] == null || (Array.isArray(s[f]) && !s[f].length)) raus.push(`FEHLER ${s.ordner}: Feld „${f}“ fehlt`);
    if (s.id !== s.ordner) raus.push(`FEHLER ${s.ordner}: id „${s.id}“ passt nicht zum Ordner`);
    if (!ABSCHNITTE.includes(s.abschnitt)) raus.push(`FEHLER ${s.ordner}: abschnitt muss eins sein von ${ABSCHNITTE.join(", ")}`);
    if (!["laut", "leise"].includes(s.lautstaerke)) raus.push(`FEHLER ${s.ordner}: lautstaerke laut oder leise`);
    if ((s.abwandeln || []).length < 2) raus.push(`FEHLER ${s.ordner}: mindestens zwei Achsen unter „abwandeln“`);
    const idx = path.join(bib, s.ordner, "index.html");
    if (!fs.existsSync(idx)) { raus.push(`FEHLER ${s.ordner}: index.html fehlt`); continue; }
    const code = fs.readdirSync(path.join(bib, s.ordner)).filter((f) => /\.(html|css|m?js)$/.test(f))
      .map((f) => fs.readFileSync(path.join(bib, s.ordner, f), "utf8")).join("\n");
    const fremd = code.match(/(src|href)\s*=\s*["']https?:\/\/[^"']+|url\(\s*["']?https?:\/\/[^)"']+|from\s+["']https?:\/\/[^"']+/gi);
    if (fremd) raus.push(`FEHLER ${s.ordner}: lädt von fremden Servern: ${fremd.slice(0, 2).join(", ")}`);
    if (/gsap/i.test(code) && /(src|from)\s*=?\s*["'][^"']*gsap/i.test(code)) raus.push(`FEHLER ${s.ordner}: GSAP-Datei im Repo (README: Lizenz der Weitergabe ungeklärt)`);
    if (!/prefers-reduced-motion|ruhig\(\)/.test(code)) raus.push(`FEHLER ${s.ordner}: kein Ruhezustand für prefers-reduced-motion`);
    if (!s.gemessen) raus.push(`Hinweis ${s.ordner}: noch nicht gemessen (--messen)`);
    if (!fs.existsSync(path.join(bib, s.ordner, "vorschau.png"))) raus.push(`Hinweis ${s.ordner}: vorschau.png fehlt`);
  }
  return raus;
}

const esc = (t) => String(t ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]);

export function katalog(liste) {
  const gruppen = ABSCHNITTE.map((a) => [a, liste.filter((s) => s.abschnitt === a && !s.kaputt)]).filter(([, l]) => l.length);
  const karte = (s) => `<article><header><h3>${esc(s.name)}</h3><span class="${esc(s.lautstaerke)}">${esc(s.lautstaerke)}</span><code>${esc(s.id)}</code></header>
<p>${esc(s.was_man_sieht)}</p><iframe loading="lazy" src="${esc(s.ordner)}/index.html" title="${esc(s.name)}"></iframe>
<p class="klein">Abwandeln: ${esc((s.abwandeln || []).join(" · "))}${s.gemessen ? ` · gemessen ${s.gemessen.fps_normal}/${s.gemessen.fps_4x} fps` : ""}${s.vorbild ? ` · Vorbild ${esc(s.vorbild)}` : ""}</p></article>`;
  return `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Baustein-Bibliothek</title><style>
:root{--bg:#f4f3ef;--fg:#1b1d1a;--leise:#6b7a6e;--laut:#b4532a;--linie:#d9d6cc}
@media (prefers-color-scheme:dark){:root{--bg:#141613;--fg:#ecebe5;--linie:#2c2f2a}}
body{margin:0;background:var(--bg);color:var(--fg);font:16px/1.5 system-ui,sans-serif}
main{max-width:1100px;margin:0 auto;padding:24px max(16px,env(safe-area-inset-left))}
h1{font-size:clamp(28px,5vw,44px);margin:0 0 4px}h2{margin:40px 0 12px;text-transform:capitalize}
.raster{display:grid;gap:20px;grid-template-columns:repeat(auto-fill,minmax(min(100%,340px),1fr))}
article{border-top:1px solid var(--linie);padding-top:12px;min-width:0}
article header{display:flex;gap:8px;align-items:baseline;flex-wrap:wrap}h3{margin:0;font-size:18px}
span.laut,span.leise{font-size:12px;letter-spacing:.06em;text-transform:uppercase;color:var(--bg);background:var(--laut);padding:1px 8px;border-radius:99px}
span.leise{background:var(--leise)}code{font-size:12px;opacity:.7}
iframe{width:100%;aspect-ratio:9/12;border:1px solid var(--linie);border-radius:10px;background:#000}
.klein{font-size:13px;opacity:.75}
</style></head><body><main><h1>Baustein-Bibliothek</h1>
<p>${liste.filter((s) => !s.kaputt).length} Bausteine. In jedem Fenster scrollen, um den Baustein laufen zu sehen. Für einen Auftrag wird er auf das Thema umgebaut und leicht abgewandelt.</p>
${gruppen.map(([a, l]) => `<h2>${esc(a)}</h2><div class="raster">${l.map(karte).join("\n")}</div>`).join("\n")}
</main></body></html>
`;
}

async function messen(nur) {
  const require = createRequire(import.meta.url);
  let pw; try { pw = require("playwright"); } catch { console.error("Playwright fehlt"); process.exit(2); }
  const server = http.createServer((q, a) => {
    const f = path.join(BIB, decodeURIComponent(q.url.split("?")[0]));
    if (!f.startsWith(BIB) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { a.writeHead(404); return a.end(); }
    const typ = { ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".jpg": "image/jpeg" }[path.extname(f)] || "application/octet-stream";
    a.writeHead(200, { "content-type": typ }); fs.createReadStream(f).pipe(a);
  }).listen(0);
  const port = server.address().port;
  const browser = await pw.chromium.launch();
  for (const s of steckbriefe().filter((x) => !x.kaputt && (!nur || x.id === nur))) {
    const werte = {};
    for (const [name, rate] of [["fps_normal", 1], ["fps_4x", 4]]) {
      const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
      const cdp = await page.context().newCDPSession(page);
      await cdp.send("Emulation.setCPUThrottlingRate", { rate });
      await page.goto(`http://127.0.0.1:${port}/${s.ordner}/index.html`);
      await page.waitForTimeout(800);
      werte[name] = await page.evaluate(async () => {
        const hoch = document.documentElement.scrollHeight - innerHeight; let n = 0; const t0 = performance.now();
        await new Promise((fertig) => { const schritt = () => { n++; const t = performance.now() - t0; scrollTo(0, hoch * Math.min(1, t / 3000)); t < 3000 ? requestAnimationFrame(schritt) : fertig(); }; requestAnimationFrame(schritt); });
        return Math.round(n / ((performance.now() - t0) / 1000));
      });
      if (name === "fps_normal") { await page.evaluate(() => scrollTo(0, (document.documentElement.scrollHeight - innerHeight) * 0.5)); await page.waitForTimeout(300); await page.screenshot({ path: path.join(BIB, s.ordner, "vorschau.png") }); }
      werte.renderer = werte.renderer || await page.evaluate(() => { try { const g = document.createElement("canvas").getContext("webgl"); const e = g.getExtension("WEBGL_debug_renderer_info"); return g.getParameter(e.UNMASKED_RENDERER_WEBGL); } catch { return "unbekannt"; } });
      await page.close();
    }
    const datei = path.join(BIB, s.ordner, "baustein.json");
    const j = JSON.parse(fs.readFileSync(datei, "utf8"));
    j.gemessen = { fps_normal: werte.fps_normal, fps_4x: werte.fps_4x, datum: new Date().toISOString().slice(0, 10), renderer: /swiftshader/i.test(werte.renderer) ? "SwiftShader (nur Vergleich)" : werte.renderer };
    fs.writeFileSync(datei, JSON.stringify(j, null, 2) + "\n");
    console.log(`${s.id}: ${werte.fps_normal} / ${werte.fps_4x} fps`);
  }
  await browser.close(); server.close();
}

if (process.argv[1]?.endsWith("bibliothek.mjs")) {
  if (args.includes("--messen")) await messen(args[args.indexOf("--messen") + 1]?.startsWith("--") ? null : args[args.indexOf("--messen") + 1]);
  if (args.includes("--pruefen")) { const r = pruefe(); console.log(r.length ? r.join("\n") : "OK: alle Bausteine erfüllen die Aufnahmeregeln"); process.exitCode = r.some((z) => z.startsWith("FEHLER")) ? 1 : 0; }
  const liste = steckbriefe();
  fs.writeFileSync(path.join(BIB, "bausteine.json"), JSON.stringify(liste.filter((s) => !s.kaputt).map(({ ordner, ...s }) => s), null, 2) + "\n");
  fs.writeFileSync(path.join(BIB, "katalog.html"), katalog(liste));
  console.log(`${liste.length} Bausteine → bibliothek/bausteine.json, bibliothek/katalog.html`);
}
