// Neutrale Prüfung einer lokalen Website: Bildschirmfotos (Handy 390 / Desktop 1440) an mehreren Scrollstellen,
// Konsolenfehler, fremde Anfragen (Schriften, Tracker, CDNs), grobe Bildrate beim Scrollen, Ladezeit.
// Aufruf: node pruefen.js <ordner-mit-index.html> <ausgabeordner>
const { chromium } = require("playwright");
const http = require("http");
const fs = require("fs");
const path = require("path");
const [ordnerRoh, aus] = process.argv.slice(2);
const ordner = path.resolve(ordnerRoh);

fs.mkdirSync(aus, { recursive: true });
const typen = { ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".svg": "image/svg+xml",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".webp": "image/webp", ".avif": "image/avif", ".glb": "model/gltf-binary",
  ".gltf": "model/gltf+json", ".woff2": "font/woff2", ".woff": "font/woff", ".json": "application/json", ".mp4": "video/mp4", ".hdr": "application/octet-stream" };
const server = http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split("?")[0]);
  if (p.endsWith("/")) p += "index.html";
  const f = path.join(ordner, p);
  if (!f.startsWith(path.resolve(ordner)) || !fs.existsSync(f) || fs.statSync(f).isDirectory()) { res.writeHead(404); return res.end(); }
  res.writeHead(200, { "Content-Type": typen[path.extname(f).toLowerCase()] || "application/octet-stream" });
  fs.createReadStream(f).pipe(res);
}).listen(0);

(async () => {
  const port = server.address().port;
  const url = `http://127.0.0.1:${port}/`;
  const browser = await chromium.launch({ args: ["--enable-unsafe-swiftshader", "--use-gl=angle", "--use-angle=swiftshader"] });
  const bericht = { url, geraete: {} };
  for (const [name, vp] of [["handy", { width: 390, height: 844 }], ["desktop", { width: 1440, height: 900 }]]) {
    const ctx = await browser.newContext({ viewport: vp, deviceScaleFactor: 1, isMobile: name === "handy", hasTouch: name === "handy" });
    const page = await ctx.newPage();
    const fehler = [], fremd = new Set(), fehlend = [];
    page.on("console", (m) => { if (m.type() === "error") fehler.push(m.text().slice(0, 200)); });
    page.on("pageerror", (e) => fehler.push("pageerror: " + String(e.message).slice(0, 200)));
    page.on("request", (r) => { const u = r.url(); if (!u.startsWith(url) && !u.startsWith("data:") && !u.startsWith("blob:")) fremd.add(new URL(u).host); });
    page.on("response", (r) => { if (r.status() >= 400) fehlend.push(`${r.status()} ${r.url().replace(url, "/")}`); });
    const t0 = Date.now();
    await page.goto(url, { waitUntil: "load", timeout: 60000 }).catch((e) => fehler.push("goto: " + e.message));
    const ladezeit = Date.now() - t0;
    await page.waitForTimeout(2500);
    const hoehe = await page.evaluate(() => document.documentElement.scrollHeight);
    const schritte = 8;
    for (let i = 0; i <= schritte; i++) {
      const y = Math.round(((hoehe - vp.height) * i) / schritte);
      await page.evaluate((y) => window.scrollTo(0, y), y);
      await page.waitForTimeout(900);
      await page.screenshot({ path: path.join(aus, `${name}_${String(i).padStart(2, "0")}.png`) });
    }
    // Bildrate beim weichen Scrollen (SwiftShader = schwache Hardware, nur grober Vergleich)
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
    const fps = await page.evaluate(async (h) => {
      let frames = 0; let lauf = true;
      const zaehl = () => { frames++; if (lauf) requestAnimationFrame(zaehl); };
      requestAnimationFrame(zaehl);
      const t = performance.now();
      for (let y = 0; y < h; y += 40) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 16)); }
      lauf = false;
      return Math.round((frames / (performance.now() - t)) * 1000);
    }, hoehe);
    const info = await page.evaluate(() => {
      const zuKlein = [...document.querySelectorAll("a,button,input,select,[role=button]")].filter((e) => {
        const r = e.getBoundingClientRect(); return r.width > 0 && r.height > 0 && (r.height < 44 || r.width < 44);
      }).length;
      const breiter = document.documentElement.scrollWidth > window.innerWidth + 1;
      const fonts = [...new Set([...document.querySelectorAll("body *")].slice(0, 400).map((e) => getComputedStyle(e).fontFamily))].slice(0, 6);
      return { zuKleineTippflaechen: zuKlein, horizontalScroll: breiter, schriften: fonts, reducedMotionRegel: [...document.styleSheets].some((s) => { try { return [...s.cssRules].some((r) => String(r.conditionText || "").includes("reduced-motion")); } catch { return false; } }),
        canvas: document.querySelectorAll("canvas").length, impressum: /impressum/i.test(document.body.innerText), datenschutz: /datenschutz/i.test(document.body.innerText) };
    });
    bericht.geraete[name] = { ladezeit_ms: ladezeit, seitenhoehe: hoehe, fps_scroll: fps, konsolenfehler: fehler, fremde_hosts: [...fremd], fehlende_dateien: fehlend, ...info };
    await ctx.close();
  }
  const groesse = (d) => fs.readdirSync(d, { withFileTypes: true }).reduce((s, e) => s + (e.isDirectory() ? groesse(path.join(d, e.name)) : fs.statSync(path.join(d, e.name)).size), 0);
  bericht.ordner_kb = Math.round(groesse(ordner) / 1024);
  fs.writeFileSync(path.join(aus, "bericht.json"), JSON.stringify(bericht, null, 2));
  console.log(JSON.stringify(bericht, null, 2));
  await browser.close(); server.close();
})();
