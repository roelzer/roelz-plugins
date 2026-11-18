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
const SCHREIBEND = /\b(rm|del|mv|move|cp|copy|ffmpeg|sox|truncate|tee|sed\s+-i|Remove-Item|Move-Item|Copy-Item|Set-Content|Out-File)\b|>\s*\S/;

function originale(cwd) {
  // ORIGINALE.txt in video/<name>/ – eine Datei je Zeile (absolut oder relativ zur ORIGINALE.txt)
  const liste = [];
  const basis = join(cwd, "video");
  if (!existsSync(basis)) return liste;
  for (const name of readdirSync(basis)) {
    const datei = join(basis, name, "ORIGINALE.txt");
    if (!existsSync(datei) || !statSync(datei).isFile()) continue;
    for (const zeile of readFileSync(datei, "utf8").split(/\r?\n/)) {
      const p = zeile.trim();
      if (p && !p.startsWith("#")) liste.push(resolve(dirname(datei), p));
    }
  }
  return liste;
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
  if (orig.length && SCHREIBEND.test(befehl)) {
    for (const o of orig) {
      const kurz = basename(o);
      // Ein Original darf gelesen werden (ffmpeg -i original …), aber nie Ziel sein.
      const alsZiel = new RegExp(`(?:>|\\s-y\\s[^|;&]*|\\s)${kurz.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']?\\s*(?:$|[|;&])`);
      const entfernt = new RegExp(`\\b(rm|del|mv|move|Remove-Item|Move-Item)\\b[^|;&]*${kurz.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}`);
      const nurGelesen = new RegExp(`-i\\s+["']?[^"'\\s]*${kurz.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}["']?\\s*(?:$|[|;&])`);
      if (entfernt.test(befehl) || (alsZiel.test(befehl) && !nurGelesen.test(befehl))) {
        return `„${kurz}“ ist ein Original und wird nie überschrieben, verschoben oder gelöscht – arbeite an einer Kopie.`;
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
    if (g) {
      process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: "PreToolUse",
        permissionDecision: "deny", permissionDecisionReason: `Video-Sperre: ${g}` } }));
    }
    process.exit(0);
  });
}
