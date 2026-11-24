#!/usr/bin/env node
// PreToolUse-Sperre des Spiele-Bauers (Node, damit sie auch unter Windows läuft). Muster: Website-Sperre.
// 1. Veröffentlichen (wrangler deploy, netlify, vercel, gh-pages, git push, rsync/scp, npm publish): nie still.
//    Claude Code fragt Simon jedes Mal selbst („ask“) – Ausschreibung §6: nichts veröffentlichen ohne sein Ja.
// 2. Ladeverweise auf fremde Server (Schriften, CDNs, fetch an fremde Adressen) in Code-Dateien unter spiele/<name>/:
//    gesperrt. Markdown (CREDITS.md, QUELLEN.md, arbeit/*.md) darf Adressen nennen.
//    Ausnahme gemeinsame Bestenliste (Simons Entscheidung 24.11.2026): Steht in spiele/<name>/arbeit/freigabe-bestenliste.md
//    die Adresse des eigenen Dienstes (nach Simons Ja), darf fetch() genau diese Adresse ansprechen.
// 3. Bilder, Klänge oder Musik von Seiten außerhalb der freien Quellen herunterladen, yt-dlp: gesperrt.
// Ehrlich: Eine Befehls-Sperre fängt bekannte Befehle, keine Umwege über eigene Programme.
import path from "node:path";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";

// Gilt nur dort, wo der Spiele-Bauer arbeitet (Ordner spiele/ im aktuellen oder einem oberen Ordner).
function spieleProjekt(cwd) {
  let d = path.resolve(cwd || process.cwd());
  for (let i = 0; i < 10; i++) { if (existsSync(path.join(d, "spiele"))) return true; const o = path.dirname(d); if (o === d) break; d = o; }
  return false;
}

const VEROEFFENTLICHEN = /\bwrangler\S*\b[^|;&\n]*\b(deploy|publish|versions\s+(upload|deploy)|pages\s+project\s+upload)\b|\b(npm|pnpm|yarn|bun)\s+(run\s+)?(deploy|publish)\b|\bgh-pages\b|\bnetlify\s+deploy|\bvercel\b|\bfirebase\s+deploy|\bsurge\b|\bbutler\s+push\b|\bgit\s+push\b|\b(rsync|scp|sftp|lftp)\b/i;
const UPLOAD = /\b(curl|wget|Invoke-WebRequest|iwr)\b[^|;&]*(\s-F\b|\s-T\b|\s-d\s*@|--data(-binary|-raw)?\s*@|--upload-file|-X\s*(POST|PUT)|-Method\s+(Post|Put))/i;
const VIDEO_LADEN = /\b(yt-dlp|youtube-dl)\b/i;
const MEDIEN = /\.(png|jpe?g|gif|webp|avif|svg|mp3|ogg|wav|m4a|flac|mid|glb|gltf|woff2?|ttf|otf)(\?|\s|"|'|$)/i;
// freie Quellen (CC0 oder OFL) und Paketquellen; alles andere ist ohne geprüfte Lizenz
const FREIE_QUELLEN = /(^|\.)(kenney\.nl|polyhaven\.(com|org)|ambientcg\.com|opengameart\.org|freesound\.org|registry\.npmjs\.org|github\.com|githubusercontent\.com|fonts\.google\.com|gwfh\.mranftl\.com|fontsource\.org|velvetyne\.fr|localhost|127\.0\.0\.1)$/i;
const BEKANNT_FREMD = /(fonts\.googleapis\.com|fonts\.gstatic\.com|use\.typekit\.net|fonts\.bunny\.net|cdn\.jsdelivr\.net|unpkg\.com|cdnjs\.cloudflare\.com|esm\.sh|cdn\.skypack\.dev|code\.jquery\.com|cdn\.tailwindcss\.com|googletagmanager\.com|google-analytics\.com|youtube\.com\/embed)/i;

function spielOrdner(datei) {
  const p = String(datei || "").split(path.sep).join("/");
  const m = p.match(/^(.*(?:^|\/)spiele\/[^/]+)\//);
  return m ? m[1] : null;
}

function freigegebeneHosts(ordner) {
  const f = path.join(ordner, "arbeit", "freigabe-bestenliste.md");
  if (!existsSync(f)) return [];
  try { return [...readFileSync(f, "utf8").matchAll(/https:\/\/([a-z0-9.-]+)/gi)].map((m) => m[1].toLowerCase()); } catch { return []; }
}

// Text in einem Heredoc ist Dateiinhalt, kein Befehl (CREDITS.md mit „git push“ als Pflegehinweis). Ausnahme: Der Heredoc
// geht an eine Shell, dann zählt er als Befehl. Gleiche Regel wie in der Website-Sperre.
// Veröffentlichen laut Auftrag (Simon, 24.11.2026): erlaubt ohne Rückfrage, wenn spiele/<name>/arbeit/veroeffentlichen.md
// Simons Auftrag wörtlich zitiert (Zeile „Simon: „…““) und arbeit/pruefung.json (spielpruefen.mjs) keinen FEHLER hat
// und neuer ist als jede Spieldatei. Sonst fragt Claude Code Simon.
function juengste(ordner) {
  let t = 0;
  const geh = (d) => { for (const n of readdirSync(d, { withFileTypes: true })) { const p = path.join(d, n.name); if (n.isDirectory()) { if (!["node_modules", "arbeit"].includes(n.name)) geh(p); } else if (n.name !== ".assetsignore") t = Math.max(t, statSync(p).mtimeMs); } };
  try { geh(ordner); } catch {}
  return t;
}
// Probearbeit 24.11.2026: Zeigt wrangler.jsonc auf spiele/<name>, würde arbeit/ (Fotos, Prüfberichte) mit online gehen.
export function arbeitWirdMitveroeffentlicht(w, n) {
  const spiel = path.join(w, "spiele", n);
  for (const datei of [path.join(w, "wrangler.jsonc"), path.join(w, "wrangler.json"), path.join(spiel, "wrangler.jsonc"), path.join(spiel, "wrangler.json")]) {
    if (!existsSync(datei)) continue;
    const m = readFileSync(datei, "utf8").match(/"directory"\s*:\s*"([^"]+)"/);
    if (!m) continue;
    const ziel = path.resolve(path.dirname(datei), m[1]);
    const rel = path.relative(ziel, path.join(spiel, "arbeit"));
    if (rel.startsWith("..") || path.isAbsolute(rel)) continue;
    let ignor = "";
    try { ignor = readFileSync(path.join(ziel, ".assetsignore"), "utf8"); } catch {}
    const muster = rel.split(path.sep).join("/");
    if (!ignor.split("\n").some((z) => { const t = z.trim().replace(/^\/+|\/+$/g, ""); return t === "arbeit" || t === muster || t === "**/arbeit"; }))
      return `Der Upload-Ordner ${path.relative(w, ziel) || "."} enthält ${path.relative(w, path.join(spiel, "arbeit"))}/ (Fotos, Prüfberichte). Erst eine .assetsignore mit der Zeile „${muster}“ in den Upload-Ordner legen.`;
  }
  return null;
}

export function auftragsFreigabe(cwd) {
  let d = path.resolve(cwd || process.cwd()), w = null;
  for (let i = 0; i < 10; i++) { if (existsSync(path.join(d, "spiele"))) { w = d; break; } const o = path.dirname(d); if (o === d) break; d = o; }
  if (!w) return null;
  let namen = [];
  try { namen = readdirSync(path.join(w, "spiele")); } catch { return null; }
  for (const n of namen) {
    const arbeit = path.join(w, "spiele", n, "arbeit");
    const frei = path.join(arbeit, "veroeffentlichen.md");
    if (!existsSync(frei) || !/^\s*[-*]?\s*Simon\s*:\s*\S/im.test(readFileSync(frei, "utf8"))) continue;
    const pj = path.join(arbeit, "pruefung.json");
    if (!existsSync(pj)) return { ok: false, grund: "Auftrag sagt veröffentlichen, aber spielpruefen.mjs ist noch nicht gelaufen." };
    let fehler = 1;
    try { fehler = (JSON.parse(readFileSync(pj, "utf8")).befunde || []).filter((b) => b.schwere === "FEHLER").length; } catch {}
    if (fehler) return { ok: false, grund: `Auftrag sagt veröffentlichen, aber die Prüfung hat ${fehler} FEHLER.` };
    if (statSync(pj).mtimeMs < juengste(path.join(w, "spiele", n))) return { ok: false, grund: "Auftrag sagt veröffentlichen, aber das Spiel wurde nach der letzten Prüfung geändert." };
    const leck = arbeitWirdMitveroeffentlicht(w, n);
    if (leck) return { ok: false, grund: leck };
    return { ok: true, grund: `Veröffentlichen laut Auftrag (spiele/${n}/arbeit/veroeffentlichen.md), Prüfung ohne FEHLER.` };
  }
  return null;
}

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
    const ordner = spielOrdner(t.file_path);
    if (!ordner || !/\.(html?|css|m?[jt]sx?|svg|json|webmanifest)$/i.test(t.file_path)) return null;
    const inhalt = [t.content, t.new_string, ...(t.edits || []).map((e) => e.new_string)].filter(Boolean).join("\n");
    // nur Ladeverweise zählen, keine reinen Links (<a href> zum Verein ist erlaubt)
    const lade = inhalt.match(/(\bsrc\s*=\s*["'][^"']+|<link[^>]+href\s*=\s*["'][^"']+|url\(\s*["']?[^)"']+|@import\s+(url\()?\s*["']?[^"');]+|\bfrom\s+["'][^"']+|import\(\s*["'][^"']+|fetch\(\s*["'`][^"'`]+|new\s+(WebSocket|EventSource|Audio)\(\s*["'`][^"'`]+|\.open\(\s*["'][A-Z]+["']\s*,\s*["'][^"']+)/gi) || [];
    const erlaubt = freigegebeneHosts(ordner);
    for (const l of lade) {
      if (/^[^"'(]*["'(`]\s*["']?data:/i.test(l)) continue;   // eingebettete data:-Adressen (SVG mit xmlns) laden nichts
      const fremd = l.match(/(?:https?:|wss?:)?\/\/([a-z0-9-]+(?:\.[a-z0-9-]+)+)/i);
      const bekannt = l.match(BEKANNT_FREMD);
      if (!fremd && !bekannt) continue;
      const host = (fremd ? fremd[1] : bekannt[0]).toLowerCase();
      if (/^(localhost|127\.0\.0\.1|www\.w3\.org)$/.test(host)) continue;
      if (/^fetch\(/i.test(l) && erlaubt.includes(host)) continue;
      return { art: "deny", grund: `„${l.slice(0, 80)}“ lädt zur Laufzeit von ${host}. Schriften, Skripte, Klänge und Grafik liegen lokal im Spielordner (Datenschutz, offline spielbar, einbettbar). Gemeinsame Bestenliste nur über den eigenen Dienst nach Simons Ja (arbeit/freigabe-bestenliste.md).` };
    }
    return null;
  }
  if (werkzeug !== "Bash" && werkzeug !== "PowerShell") return null;
  const befehl = ohneHeredocText(String(t.command || ""));
  if (!spieleProjekt(eingabe.cwd) && !/spiele\//.test(befehl)) return null;
  if (VEROEFFENTLICHEN.test(befehl)) {
    const f = auftragsFreigabe(eingabe.cwd);
    if (f && f.ok) return { art: "allow", grund: f.grund };
    return { art: "ask", grund: (f ? f.grund + " " : "") + "Veröffentlichen nur, wenn der Auftrag es verlangt oder auf Simons ausdrückliches Ja zu genau dieser Fassung. Verlangt es der Auftrag: Simons Satz nach spiele/<name>/arbeit/veroeffentlichen.md (Zeile „Simon: …“), .assetsignore mit „arbeit“ in den Upload-Ordner, spielpruefen.mjs laufen lassen, dann erneut deployen (Skill spiele:bauen). Simon, willst du das jetzt wirklich online stellen?" };
  }
  if (UPLOAD.test(befehl)) return { art: "deny", grund: "Hochladen ist gesperrt – Simon bekommt das Spiel als Datei." };
  if (VIDEO_LADEN.test(befehl)) return { art: "deny", grund: "Musik oder Videos von YouTube haben keine klare Lizenz. Ton im Code erzeugen (ZzFX, jsfxr) oder CC0-Klänge nehmen." };
  const laden = befehl.match(/\b(curl|wget|Invoke-WebRequest|iwr)\b[^|;&\n]*/gi) || [];
  for (const teil of laden) {
    for (const u of teil.match(/https?:\/\/[^\s"'<>]+/g) || []) {
      let host = ""; try { host = new URL(u).host; } catch { continue; }
      if (MEDIEN.test(u) && !FREIE_QUELLEN.test(host))
        return { art: "deny", grund: `Grafik, Klänge oder Schriften von ${host} haben keine geprüfte Lizenz. Nur CC0 (z. B. Kenney) oder selbst erzeugt, alles in CREDITS.md (wissen/handwerk.md).` };
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
    if (g) process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: "PreToolUse", permissionDecision: g.art, permissionDecisionReason: `Spiele-Sperre: ${g.grund}` } }));
    process.exit(0);
  });
}
