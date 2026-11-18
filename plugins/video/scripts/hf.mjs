#!/usr/bin/env node
// Starter für HyperFrames: feste Version, Telemetrie und Update-Prüfung aus, keine Schlüssel für fremde KI-Dienste,
// gesperrte Befehle (Kosten, Hochladen, Konto). Läuft unter Windows, macOS und Linux (Node 22+).
//
//   node hf.mjs <hyperframes-befehl> [argumente]   z. B.  node hf.mjs init film --example blank
//   node hf.mjs skills-pfad                          druckt den Ordner der HyperFrames-Skills dieser Version
//   node hf.mjs pruefen                              prüft Node, ffmpeg, Installation
//
// Warum: Die HyperFrames-Skills verlangen u. a. einen „usage beacon“, Feedback-Uploads und drängen zu bezahlten
// HeyGen-Diensten. Simons Grenzen: kostenlos, nichts nach außen. Updates erst nach einem Testlauf (Version unten).
import { spawnSync } from "node:child_process";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

export const VERSION = "0.9.65";
export const GESPERRT = new Set([
  "events", "feedback", "auth", "login", "logout", "cloud", "lambda", "cloudrun", "share", "publish", "usage",
  "open", "catch-up", "upgrade", "update", "billing", "templates", "reverse", "present", "skills",
]);
export const GESPERRTE_SCHALTER = ["--describe", "--publish", "--share", "--cloud", "--upload"];
const FREMD_SCHLUESSEL = ["GEMINI_API_KEY", "GOOGLE_API_KEY", "OPENROUTER_API_KEY", "OPENAI_API_KEY",
  "HEYGEN_API_KEY", "HYPERFRAMES_API_KEY", "ELEVENLABS_API_KEY", "REPLICATE_API_TOKEN", "FAL_KEY"];

export function grund(argv) {
  const befehl = argv.find((a) => !a.startsWith("-"));
  if (befehl && GESPERRT.has(befehl)) return `„${befehl}“ ist gesperrt (kostet, lädt hoch oder sendet Daten)`;
  const schalter = argv.find((a) => GESPERRTE_SCHALTER.some((s) => a === s || a.startsWith(s + "=")));
  if (schalter) return `Schalter „${schalter}“ ist gesperrt (schickt Bilder oder Projekt nach außen)`;
  return null;
}

function ordner() {
  return join(homedir(), ".roelz-video", `hyperframes-${VERSION}`);
}

function installieren() {
  const ziel = ordner();
  const cli = join(ziel, "node_modules", "hyperframes", "bin", "hyperframes.mjs");
  if (existsSync(cli)) return cli;
  mkdirSync(ziel, { recursive: true });
  console.error(`HyperFrames ${VERSION} wird einmalig nach ${ziel} installiert …`);
  const r = spawnSync("npm", ["install", "--prefix", ziel, `hyperframes@${VERSION}`, "--no-audit", "--no-fund",
    "--loglevel=error"], { stdio: "inherit", shell: process.platform === "win32", env: umgebung() });
  if (r.status !== 0 || !existsSync(cli)) {
    console.error("Installation fehlgeschlagen. Ist Node 22+ mit npm installiert und das Netz erreichbar?");
    process.exit(2);
  }
  return cli;
}

export function umgebung() {
  const env = { ...process.env, HYPERFRAMES_NO_TELEMETRY: "1", DO_NOT_TRACK: "1", HYPERFRAMES_NO_UPDATE_CHECK: "1",
    HYPERFRAMES_NO_AUTO_INSTALL: "1", HYPERFRAMES_SKIP_SKILLS: "1" };
  for (const k of FREMD_SCHLUESSEL) delete env[k];
  return env;
}

function hauptprogramm(argv) {
  if (argv[0] === "skills-pfad") {
    installieren();
    console.log(join(ordner(), "node_modules", "hyperframes", "dist", "skills"));
    return 0;
  }
  if (argv[0] === "pruefen") {
    const node = Number(process.versions.node.split(".")[0]);
    const ff = spawnSync("ffmpeg", ["-version"], { encoding: "utf8", shell: process.platform === "win32" });
    console.log(`Node ${process.versions.node} ${node >= 22 ? "ok" : "zu alt (22+ nötig)"}`);
    console.log(`ffmpeg ${ff.status === 0 ? ff.stdout.split("\n")[0] : "FEHLT (Windows: winget install ffmpeg)"}`);
    console.log(`HyperFrames ${VERSION}: ${existsSync(join(ordner(), "node_modules", "hyperframes")) ? "installiert" : "noch nicht installiert (passiert beim ersten Aufruf)"}`);
    return node >= 22 && ff.status === 0 ? 0 : 1;
  }
  const g = grund(argv);
  if (g) {
    console.error(`GESPERRT: ${g}. Es gibt immer einen lokalen, kostenlosen Weg – oder Simon entscheidet.`);
    return 3;
  }
  if (argv[0] === "init" && !argv.includes("--skip-skills")) argv = [...argv, "--skip-skills"];
  const cli = installieren();
  const r = spawnSync(process.execPath, [cli, ...argv], { stdio: "inherit", env: umgebung() });
  if (argv[0] === "init" && r.status === 0) {
    // init legt CLAUDE.md/AGENTS.md von HeyGen an (u. a. „usage beacon“, Skill-Updates). Ersetzen, damit sie nicht
    // automatisch in Claudes Kontext landen und unseren Regeln widersprechen.
    const projekt = argv.slice(1).find((a) => !a.startsWith("-") && !/^[\w-]+=/.test(a));
    if (projekt) {
      const hinweis = "# Video-Projekt (Plugin video)\n\nDieses Projekt wird mit dem Skill `/video:machen` bearbeitet. Es gelten dessen Regeln " +
        "und Grenzen (kostenlos, nichts nach außen, HyperFrames nur über scripts/hf.mjs). Die von HyperFrames erzeugten " +
        "Hinweise zu Telemetrie, Skill-Updates, Desktop-App und HeyGen gelten hier nicht.\n";
      for (const name of ["CLAUDE.md", "AGENTS.md"]) {
        const pfad = join(projekt, name);
        if (existsSync(pfad)) writeFileSync(pfad, hinweis);
      }
    }
  }
  return r.status ?? 1;
}

if (import.meta.url === `file://${process.argv[1]}` || process.argv[1]?.endsWith("hf.mjs")) {
  process.exit(hauptprogramm(process.argv.slice(2)));
}
