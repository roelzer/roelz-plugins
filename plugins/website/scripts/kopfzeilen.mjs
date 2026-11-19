#!/usr/bin/env node
// Erzeugt site/_headers (Cloudflare) mit strenger Content-Security-Policy und den übrigen Sicherheits-Headern.
// Eingebettete <style>- und <script>-Blöcke bekommen ihren sha256-Hash in die CSP, damit kein 'unsafe-inline' nötig ist.
// Aufruf: node kopfzeilen.mjs <site-ordner> [--hsts-preload]   (preload nur nach Simons Ja – lässt sich monatelang nicht zurücknehmen)
// Quellen: OWASP CSP Cheat Sheet, OWASP Secure Headers, Mozilla HTTP Observatory (Bewertung), Cloudflare Static Assets Headers.
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const site = path.resolve(process.argv[2] || ".");
const preload = process.argv.includes("--hsts-preload");
const seiten = [];
(function lauf(d) { for (const e of fs.readdirSync(d, { withFileTypes: true })) { const p = path.join(d, e.name); if (e.isDirectory()) lauf(p); else if (/\.html?$/i.test(e.name)) seiten.push(p); } })(site);
const hash = (s) => `'sha256-${crypto.createHash("sha256").update(s, "utf8").digest("base64")}'`;
const stile = new Set(), skripte = new Set();
for (const p of seiten) {
  const t = fs.readFileSync(p, "utf8");
  for (const m of t.matchAll(/<style(?:\s[^>]*)?>([\s\S]*?)<\/style>/gi)) stile.add(hash(m[1]));
  for (const m of t.matchAll(/<script(?![^>]*\bsrc=)(?![^>]*type=["'](?:application\/ld\+json|importmap)["'])(?:\s[^>]*)?>([\s\S]*?)<\/script>/gi)) skripte.add(hash(m[1]));
  for (const m of t.matchAll(/<script[^>]*type=["']importmap["'][^>]*>([\s\S]*?)<\/script>/gi)) skripte.add(hash(m[1]));
}
const csp = [
  "default-src 'none'",
  `script-src 'self'${[...skripte].map((h) => " " + h).join("")}`,
  `style-src 'self'${[...stile].map((h) => " " + h).join("")}`,
  "img-src 'self' data: blob:", "font-src 'self'", "connect-src 'self'", "media-src 'self'", "manifest-src 'self'", "worker-src 'self' blob:",
  "object-src 'none'", "base-uri 'none'", "form-action 'self' mailto:", "frame-ancestors 'none'", "upgrade-insecure-requests",
].join("; ");
const zeilen = [
  "/*",
  `  Content-Security-Policy: ${csp}`,
  `  Strict-Transport-Security: max-age=63072000; includeSubDomains${preload ? "; preload" : ""}`,
  "  X-Content-Type-Options: nosniff",
  "  X-Frame-Options: DENY",
  "  Referrer-Policy: strict-origin-when-cross-origin",
  "  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=()",
  "  Cross-Origin-Opener-Policy: same-origin",
  "  Cross-Origin-Resource-Policy: same-origin",
  "",
];
const zu_lang = zeilen.find((z) => z.length > 2000);
if (zu_lang) { console.error("Eine Header-Zeile ist länger als 2000 Zeichen (Grenze von Cloudflare). Eingebettete Blöcke in Dateien auslagern."); process.exit(1); }
fs.writeFileSync(path.join(site, "_headers"), zeilen.join("\n"));
fs.writeFileSync(path.join(site, ".assetsignore"), ["*.map", ".env*", ".git", "node_modules", "*.md", "!QUELLEN.md", "*.bak", "*.log", "*.zip", "*.psd", "package*.json", ".assetsignore", ""].join("\n"));
console.log(`_headers geschrieben (${skripte.size} Skript- und ${stile.size} Stil-Hashes) und .assetsignore angelegt: ${site}`);
