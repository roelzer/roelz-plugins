#!/usr/bin/env node
// PreToolUse-Sperre des Website-Bauers (Node, damit sie auch unter Windows läuft).
// 1. Veröffentlichen (wrangler deploy, Pages, gh-pages, netlify, vercel, Upload): nie still. Claude Code fragt Simon
//    jedes Mal selbst („ask“) – Simons Entscheidung vom 18.11.2026: nur auf sein ausdrückliches Ja nach Stopp 2.
// 2. Fremde Server in der Lieferung (Schriften, CDNs, Tracker) in Dateien unter website/<name>/site/: gesperrt.
// 3. Herunterladen von Bildern, Modellen oder Schriften von Seiten außerhalb der freien Quellen: gesperrt
//    (Vorbilder ansehen ja, ihre Dateien übernehmen nein).
// Ehrlich: Eine Befehls-Sperre fängt bekannte Befehle, keine Umwege über eigene Programme.
import path from "node:path";

const VEROEFFENTLICHEN = /\b(wrangler\s+(pages\s+)?(deploy|publish)|wrangler\s+pages\s+project\s+upload|npm\s+run\s+deploy|pnpm\s+(run\s+)?deploy|yarn\s+deploy|gh-pages\b|netlify\s+deploy|vercel(\s+--prod|\s+deploy)?\b|firebase\s+deploy|surge\b)/i;
const UPLOAD = /\b(curl|wget|Invoke-WebRequest|iwr)\b[^|;&]*(\s-F\b|\s-T\b|--upload-file|--data-binary|-X\s*(POST|PUT)|-Method\s+(Post|Put))/i;
const FREMD_IN_SEITE = /(fonts\.googleapis\.com|fonts\.gstatic\.com|use\.typekit\.net|p\.typekit\.net|fonts\.bunny\.net|cdn\.jsdelivr\.net|unpkg\.com|cdnjs\.cloudflare\.com|code\.jquery\.com|cdn\.tailwindcss\.com|googletagmanager\.com|google-analytics\.com|gtag\(|connect\.facebook\.net|plausible\.io|hotjar|clarity\.ms|matomo|youtube\.com\/embed|maps\.googleapis\.com|api\.mapbox|prod\.spline\.design|unsplash\.com\/photos|images\.unsplash\.com|images\.pexels\.com)/i;
const MEDIEN = /\.(jpe?g|png|webp|avif|gif|svg|glb|gltf|bin|hdr|exr|ktx2|woff2?|ttf|otf|mp4|webm|mov)(\?|\s|"|'|$)/i;
const FREIE_QUELLEN = /(polyhaven\.(com|org)|api\.openverse\.org|openverse\.org|images\.unsplash\.com|unsplash\.com|images\.pexels\.com|pexels\.com|upload\.wikimedia\.org|wikimedia\.org|rawpixel\.com|stocksnap\.io|ambientcg\.com|registry\.npmjs\.org|github\.com|githubusercontent\.com|fonts\.google\.com|gwfh\.mranftl\.com|fontshare\.com|api\.fontshare\.com|velvetyne\.fr|kenney\.nl|khronos\.org|localhost|127\.0\.0\.1)/i;

function inLieferung(datei) {
  const p = String(datei || "").split(path.sep).join("/");
  return /(^|\/)website\/[^/]+\/site\//.test(p);
}

export function pruefe(eingabe) {
  const werkzeug = eingabe.tool_name || "";
  const t = eingabe.tool_input || {};
  if (["Write", "Edit", "MultiEdit"].includes(werkzeug)) {
    if (!inLieferung(t.file_path)) return null;
    const inhalt = [t.content, t.new_string, ...(t.edits || []).map((e) => e.new_string)].filter(Boolean).join("\n");
    const m = inhalt.match(FREMD_IN_SEITE);
    if (m) return { art: "deny", grund: `„${m[0]}“ lädt etwas von einem fremden Server. Schriften, Bibliotheken und Bilder liegen lokal in site/, Tracker gibt es nicht.` };
    return null;
  }
  if (werkzeug !== "Bash" && werkzeug !== "PowerShell") return null;
  const befehl = String(t.command || "");
  if (VEROEFFENTLICHEN.test(befehl)) return { art: "ask", grund: "Veröffentlichen nur auf Simons ausdrückliches Ja nach der Vorschau (Stopp 2). Simon, willst du das jetzt wirklich online stellen?" };
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
