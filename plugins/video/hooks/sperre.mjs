#!/usr/bin/env node
// PreToolUse-Sperre des Video-Plugins (Node, damit sie auch unter Windows läuft).
// Blockt: bekannte Bezahl-/Upload-/Telemetrie-Befehle von HyperFrames und HeyGen, HyperFrames am Starter vorbei,
// Uploads per curl/wget, und jede Änderung an Original-Dateien, die in einer ORIGINALE.txt stehen.
// Ehrlich: Eine Befehls-Sperre fängt bekannte Befehle, keine Umwege über eigene Programme. Volle Sicherheit gäbe
// nur eine Netzwerksperre. Die Telemetrie schaltet zusätzlich der Starter scripts/hf.mjs ab.
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { basename, dirname, join, resolve } from "node:path";

const HF_GESPERRT = /\bhyperframes(?:@[\w.^~-]+)?\s+(events|feedback|auth|login|logout|cloud|lambda|cloudrun|share|publish|usage|open|catch-up|upgrade|update|billing|templates|reverse|present|skills)\b/;
const HF_DIREKT = /\b(npx|pnpm\s+dlx|bunx|yarn\s+dlx)\s+(-y\s+)?hyperframes\b|plugin-cli\.mjs/;
const FREMD = /\b(heygen|elevenlabs|higgsfield|runwayml|api\.openai\.com|generativelanguage\.googleapis|openrouter\.ai)\b/i;
const UPLOAD = /\b(curl|wget|Invoke-WebRequest|iwr)\b[^|;&]*(\s-F\b|\s-T\b|--upload-file|--data-binary|-X\s*(POST|PUT)|-Method\s+(Post|Put))/i;

function originale(cwd) {
  // ORIGINALE.txt in video/<name>/ – eine Datei je Zeile (absolut oder relativ zur ORIGINALE.txt).
  // Gesucht wird vom aktuellen Ordner aufwärts, denn der Agent steht oft in einem Unterordner.
  const liste = [];
  const gesehen = new Set();
  const lies = (datei) => {
    if (gesehen.has(datei) || !existsSync(datei) || !statSync(datei).isFile()) return;
    gesehen.add(datei);
    for (const zeile of readFileSync(datei, "utf8").split(/\r?\n/)) {
      const p = zeile.trim();
      if (p && !p.startsWith("#")) liste.push(resolve(dirname(datei), p));
    }
  };
  let dir = resolve(cwd);
  for (let i = 0; i < 12; i++) {
    lies(join(dir, "ORIGINALE.txt"));
    const video = join(dir, "video");
    if (existsSync(video) && statSync(video).isDirectory()) {
      for (const name of readdirSync(video)) lies(join(video, name, "ORIGINALE.txt"));
    }
    const oben = dirname(dir);
    if (oben === dir) break;
    dir = oben;
  }
  return liste;
}

// --- Schreibziele eines Shell-Befehls bestimmen (Kette mit &&, ||, ;, |; cd wird mitverfolgt) ---
function woerter(segment) {
  const w = []; let akt = ""; let q = null;
  for (let i = 0; i < segment.length; i++) {
    const c = segment[i];
    if (q) { if (c === q) q = null; else if (c === "\\" && q === '"' && i + 1 < segment.length) akt += segment[++i]; else akt += c; continue; }
    if (c === "'" || c === '"') { q = c; continue; }
    if (c === "\\" && i + 1 < segment.length) { akt += segment[++i]; continue; }
    if (/\s/.test(c)) { if (akt) { w.push(akt); akt = ""; } continue; }
    if (c === ">") { if (akt) { w.push(akt); akt = ""; } w.push(segment[i + 1] === ">" ? (i++, ">>") : ">"); continue; }
    akt += c;
  }
  if (akt) w.push(akt);
  return w;
}

export function schreibziele(befehl, cwd) {
  const ziele = [];
  let dir = cwd;
  for (const segment of befehl.split(/&&|\|\||;|\||\n/)) {
    const w = woerter(segment.trim());
    if (!w.length) continue;
    for (let i = 0; i < w.length - 1; i++) if (w[i] === ">" || w[i] === ">>") ziele.push(resolve(dir, w[i + 1]));
    const ohneUml = w.filter((x, i) => x !== ">" && x !== ">>" && w[i - 1] !== ">" && w[i - 1] !== ">>");
    const cmd = basename(ohneUml[0] || "").toLowerCase();
    const args = ohneUml.slice(1).filter((a) => !a.startsWith("-"));
    if (cmd === "cd" || cmd === "pushd") { if (args[0]) dir = resolve(dir, args[0]); continue; }
    if (["rm", "del", "unlink", "shred", "truncate", "remove-item"].includes(cmd)) ziele.push(...args.map((a) => resolve(dir, a)));
    else if (["cp", "mv", "copy", "move", "install", "rsync", "copy-item", "move-item", "ln"].includes(cmd) && args.length) ziele.push(resolve(dir, args[args.length - 1]));
    else if (["ffmpeg", "sox"].includes(cmd) && args.length) ziele.push(resolve(dir, args[args.length - 1]));
    else if (cmd === "tee" || cmd === "set-content" || cmd === "out-file") ziele.push(...args.map((a) => resolve(dir, a)));
    else if (cmd === "sed" && ohneUml.some((a) => a.startsWith("-i"))) ziele.push(...args.slice(1).map((a) => resolve(dir, a)));
  }
  return ziele;
}

function istOriginalPfad(pfad, orig) {
  // gleicher Pfad – oder (falls ein Pfad nicht sauber aufzulösen war) gleicher Dateiname in einem material/-Ordner
  return orig.some((o) => o === pfad || (basename(o) === basename(pfad) && /[\\/]material[\\/]/.test(pfad) && /[\\/]material[\\/]/.test(o)));
}

export function pruefe(eingabe) {
  const werkzeug = eingabe.tool_name || "";
  const t = eingabe.tool_input || {};
  const cwd = eingabe.cwd || process.cwd();
  const orig = originale(cwd);
  const istOriginal = (pfad) => {
    if (!pfad) return false;
    const abs = resolve(cwd, pfad);
    return orig.some((o) => o === abs);
  };
  if (["Write", "Edit", "MultiEdit", "NotebookEdit"].includes(werkzeug)) {
    if (istOriginal(t.file_path || t.notebook_path)) return "Original-Dateien werden nie verändert – arbeite an einer Kopie.";
    return null;
  }
  if (werkzeug !== "Bash" && werkzeug !== "PowerShell") return null;
  const befehl = String(t.command || "");
  if (HF_GESPERRT.test(befehl)) return "Dieser HyperFrames-Befehl ist gesperrt (kostet, lädt hoch oder sendet Daten).";
  if (HF_DIREKT.test(befehl)) return "HyperFrames nur über den Starter aufrufen: node <Plugin>/scripts/hf.mjs <befehl> (feste Version, Telemetrie aus).";
  if (FREMD.test(befehl)) return "Bezahlte oder fremde KI-Dienste sind gesperrt – nutze die lokalen, kostenlosen Werkzeuge.";
  if (UPLOAD.test(befehl)) return "Hochladen ist gesperrt – Simon bekommt immer nur die lokale Datei.";
  if (orig.length) {
    const ziel = schreibziele(befehl, cwd).find((z) => istOriginalPfad(z, orig));
    if (ziel) return `„${basename(ziel)}“ ist ein Original und wird nie überschrieben, verschoben oder gelöscht – arbeite an einer Kopie.`;
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
    if (g) {
      process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: "PreToolUse",
        permissionDecision: "deny", permissionDecisionReason: `Video-Sperre: ${g}` } }));
    }
    process.exit(0);
  });
}
