#!/usr/bin/env node
// PreToolUse-Sperre des Website-Bauers (Node, damit sie auch unter Windows läuft).
// 1. Veröffentlichen (wrangler deploy, Pages, gh-pages, netlify, vercel, Upload): nie still. Claude Code fragt Simon
//    jedes Mal selbst („ask“) – Simons Entscheidung vom 18.11.2026: nur auf sein ausdrückliches Ja nach Stopp 2.
// 2. Fremde Server in der Lieferung (Schriften, CDNs, Tracker) in Dateien unter website/<name>/site/: gesperrt.
// 3. Herunterladen von Bildern, Modellen oder Schriften von Seiten außerhalb der freien Quellen: gesperrt
//    (Vorbilder ansehen ja, ihre Dateien übernehmen nein).
// Ehrlich: Eine Befehls-Sperre fängt bekannte Befehle, keine Umwege über eigene Programme.
import path from "node:path";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";

// Die Sperre gilt nur dort, wo der Website-Bauer arbeitet (Ordner website/ im aktuellen oder einem oberen Ordner),
// damit git push oder Downloads in anderen Projekten (Dev-Team) nicht ausgebremst werden.
function websiteProjekt(cwd) {
  let d = path.resolve(cwd || process.cwd());
  for (let i = 0; i < 10; i++) { if (existsSync(path.join(d, "website"))) return true; const o = path.dirname(d); if (o === d) break; d = o; }
  return false;
}

const VEROEFFENTLICHEN = /\bwrangler\S*\b[^|;&\n]*\b(deploy|publish|versions\s+(upload|deploy)|pages\s+project\s+upload)\b|\b(npm|pnpm|yarn|bun)\s+(run\s+)?deploy\b|\bgh-pages\b|\bnetlify\s+deploy|\bvercel\b|\bfirebase\s+deploy|\bsurge\b|\bgit\s+push\b|\b(rsync|scp|sftp|lftp)\b/i;
const UPLOAD = /\b(curl|wget|Invoke-WebRequest|iwr)\b[^|;&]*(\s-F\b|\s-T\b|\s-d\s*@|--data(-binary|-raw)?\s*@|--upload-file|-X\s*(POST|PUT)|-Method\s+(Post|Put))/i;
const FREMD_IN_SEITE = /(fonts\.googleapis\.com|fonts\.gstatic\.com|use\.typekit\.net|p\.typekit\.net|fonts\.bunny\.net|cdn\.jsdelivr\.net|unpkg\.com|cdnjs\.cloudflare\.com|code\.jquery\.com|cdn\.tailwindcss\.com|googletagmanager\.com|google-analytics\.com|gtag\(|connect\.facebook\.net|plausible\.io|hotjar|clarity\.ms|matomo|youtube\.com\/embed|maps\.googleapis\.com|api\.mapbox|prod\.spline\.design|unsplash\.com\/photos|images\.unsplash\.com|images\.pexels\.com)/i;
const MEDIEN = /\.(jpe?g|png|webp|avif|gif|svg|glb|gltf|bin|hdr|exr|ktx2|woff2?|ttf|otf|mp4|webm|mov)(\?|\s|"|'|$)/i;
const FREIE_QUELLEN = /(polyhaven\.(com|org)|api\.openverse\.org|openverse\.org|images\.unsplash\.com|unsplash\.com|images\.pexels\.com|pexels\.com|upload\.wikimedia\.org|wikimedia\.org|rawpixel\.com|stocksnap\.io|ambientcg\.com|registry\.npmjs\.org|github\.com|githubusercontent\.com|fonts\.google\.com|gwfh\.mranftl\.com|fontshare\.com|api\.fontshare\.com|velvetyne\.fr|kenney\.nl|khronos\.org|localhost|127\.0\.0\.1)/i;

// Veröffentlichen laut Auftrag (Simon, 24.11.2026: „angenommen es steht im Auftrag, dann soll das auch gleich erstellt
// und gepusht werden“, ohne dreimal zu bestätigen). Erlaubt ohne Rückfrage, wenn
//   1. website/<name>/arbeit/veroeffentlichen.md Simons Auftrag wörtlich zitiert (Zeile „Simon: „…““) und
//   2. die jüngste Prüfung (arbeit/pruefung/pruefung.json) keinen P0 hat und neuer ist als jede Datei in site/.
// Sonst fragt Claude Code Simon wie bisher.
function wurzelMitWebsite(cwd) {
  let d = path.resolve(cwd || process.cwd());
  for (let i = 0; i < 10; i++) { if (existsSync(path.join(d, "website"))) return d; const o = path.dirname(d); if (o === d) break; d = o; }
  return null;
}
function juengste(ordner) {
  let t = 0;
  const geh = (d) => { for (const n of readdirSync(d, { withFileTypes: true })) { const p = path.join(d, n.name); if (n.isDirectory()) { if (n.name !== "node_modules") geh(p); } else t = Math.max(t, statSync(p).mtimeMs); } };
  try { geh(ordner); } catch {}
  return t;
}
export function auftragsFreigabe(cwd) {
  const w = wurzelMitWebsite(cwd);
  if (!w) return null;
  let namen = [];
  try { namen = readdirSync(path.join(w, "website")); } catch { return null; }
  for (const n of namen) {
    const arbeit = path.join(w, "website", n, "arbeit");
    const frei = path.join(arbeit, "veroeffentlichen.md");
    if (!existsSync(frei)) continue;
    const text = readFileSync(frei, "utf8");
    if (!/^\s*[-*]?\s*Simon\s*:\s*\S/im.test(text)) continue;
    const pj = path.join(arbeit, "pruefung", "pruefung.json");
    if (!existsSync(pj)) return { ok: false, grund: "Auftrag sagt veröffentlichen, aber es gibt noch keine Prüfung (pruefen.mjs)." };
    let p0 = 1;
    try { p0 = (JSON.parse(readFileSync(pj, "utf8")).befunde || []).filter((b) => b.schwere === "P0").length; } catch {}
    if (p0) return { ok: false, grund: `Auftrag sagt veröffentlichen, aber die Prüfung hat ${p0} P0.` };
    if (statSync(pj).mtimeMs < juengste(path.join(w, "website", n, "site"))) return { ok: false, grund: "Auftrag sagt veröffentlichen, aber die Seite wurde nach der letzten Prüfung geändert." };
    return { ok: true, grund: `Veröffentlichen laut Auftrag (website/${n}/arbeit/veroeffentlichen.md), Prüfung ohne P0.` };
  }
  return null;
}

function inLieferung(datei) {
  const p = String(datei || "").split(path.sep).join("/");
  return /(^|\/)website\/[^/]+\/site\//.test(p);
}

// Text in einem Heredoc ist Dateiinhalt, kein Befehl (z. B. QUELLEN.md mit „vercel“ oder „git push“ als Pflegehinweis,
// Fehlalarm im Schreinerei-Test 23.11.2026). Ausnahme: Der Heredoc geht an eine Shell, dann zählt er als Befehl.
export function ohneHeredocText(befehl) {
  const zeilen = befehl.split("\n"); const raus = []; let ende = null;
  for (const z of zeilen) {
    if (ende !== null) { if (z.replace(/^\t+/, "") === ende) { ende = null; raus.push(z); } continue; }
    raus.push(z);
    const m = z.match(/<<-?\s*(['"]?)([A-Za-z_][A-Za-z0-9_]*)\1/);
    if (m && !/\|\s*(sudo\s+)?(ba|z|da)?sh\b|\b(ba|z|da)?sh\s+(-s\s*)?<</.test(z)) ende = m[2];
  }
  return raus.join("\n");
}

export function pruefe(eingabe) {
  const werkzeug = eingabe.tool_name || "";
  const t = eingabe.tool_input || {};
  if (["Write", "Edit", "MultiEdit"].includes(werkzeug)) {
    if (!inLieferung(t.file_path) || !/\.(html?|css|m?js|svg|json|webmanifest)$/i.test(t.file_path)) return null;  // QUELLEN.md darf Adressen nennen
    const inhalt = [t.content, t.new_string, ...(t.edits || []).map((e) => e.new_string)].filter(Boolean).join("\n");
    // nur Ladeverweise zählen (src, href auf Stylesheets/Skripte, url(), @import, import … from), keine reinen Links
    const lade = (inhalt.match(/(src\s*=\s*["'][^"']+|<link[^>]+href\s*=\s*["'][^"']+|url\(\s*["']?[^)"']+|@import\s+["'(][^"')]+|\bfrom\s+["'][^"']+|import\(\s*["'][^"']+|gtag\(|fetch\(\s*["'][^"']+)/gi) || []).join("\n");
    const m = lade.match(FREMD_IN_SEITE);
    if (m) return { art: "deny", grund: `„${m[0]}“ lädt etwas von einem fremden Server. Schriften, Bibliotheken und Bilder liegen lokal in site/, Tracker gibt es nicht.` };
    return null;
  }
  if (werkzeug !== "Bash" && werkzeug !== "PowerShell") return null;
  const befehl = ohneHeredocText(String(t.command || ""));
  if (!websiteProjekt(eingabe.cwd) && !/website\//.test(befehl)) return null;
  if (VEROEFFENTLICHEN.test(befehl)) {
    const f = auftragsFreigabe(eingabe.cwd);
    if (f && f.ok) return { art: "allow", grund: f.grund };
    return { art: "ask", grund: (f ? f.grund + " " : "") + "Veröffentlichen nur, wenn der Auftrag es verlangt oder auf Simons ausdrückliches Ja nach der Vorschau (Stopp 2). Simon, willst du das jetzt wirklich online stellen?" };
  }
  if (UPLOAD.test(befehl)) return { art: "deny", grund: "Hochladen ist gesperrt – Simon bekommt die lokale Seite." };
  const laden = befehl.match(/\b(curl|wget|Invoke-WebRequest|iwr)\b[^|;&\n]*/gi) || [];
  for (const teil of laden) {
    const urls = teil.match(/https?:\/\/[^\s"'<>]+/g) || [];
    for (const u of urls) {
      if (MEDIEN.test(u) && !FREIE_QUELLEN.test(new URL(u).host)) {
        return { art: "deny", grund: `Dateien von ${new URL(u).host} werden nicht übernommen. Vorbilder ansehen ja, ihre Bilder, Modelle oder Schriften nein. Freie Quellen: Poly Haven, Openverse, Unsplash, Pexels (siehe wissen/bilder.md).` };
      }
    }
  }
  return null;
}

if (process.argv[1]?.endsWith("sperre.mjs")) {
  let roh = "";
  process.stdin.on("data", (d) => (roh += d));
  process.stdin.on("end", () => {
    let eingabe = {};
    try { eingabe = JSON.parse(roh || "{}"); } catch { process.exit(0); }
    const g = pruefe(eingabe);
    if (g) process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: "PreToolUse", permissionDecision: g.art, permissionDecisionReason: `Website-Sperre: ${g.grund}` } }));
    process.exit(0);
  });
}
