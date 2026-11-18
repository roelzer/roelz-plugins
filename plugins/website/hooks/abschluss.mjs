#!/usr/bin/env node
// Stop-Sperre des Website-Bauers: Eine geänderte Seite darf nicht als fertig gemeldet werden, solange sie nicht mit
// scripts/pruefen.mjs geprüft wurde (eine pruefung*.json, die neuer ist als die neueste Datei in site/).
// Vorbild: Abschluss-Sperre des Video-Editors (Probearbeit 18.11.2026: Pflichtschritte wurden sonst übersprungen).
// Läuft nur einmal je Stopp (stop_hook_active), damit nie eine Endlosschleife entsteht.
import { existsSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const NIE = new Set(["node_modules", ".git", ".cache"]);

function neueste(ordner, tiefe = 0) {
  let zeit = 0;
  if (tiefe > 8 || !existsSync(ordner)) return 0;
  for (const name of readdirSync(ordner)) {
    if (NIE.has(name)) continue;
    const p = join(ordner, name);
    let s; try { s = statSync(p); } catch { continue; }
    zeit = Math.max(zeit, s.isDirectory() ? neueste(p, tiefe + 1) : s.mtimeMs);
  }
  return zeit;
}
function pruefungen(ordner, tiefe = 0, liste = []) {
  if (tiefe > 6 || !existsSync(ordner)) return liste;
  for (const name of readdirSync(ordner)) {
    if (NIE.has(name)) continue;
    const p = join(ordner, name);
    let s; try { s = statSync(p); } catch { continue; }
    if (s.isDirectory()) pruefungen(p, tiefe + 1, liste);
    else if (/^pruefung.*\.json$/.test(name)) liste.push(s.mtimeMs);
  }
  return liste;
}

export function pruefe(eingabe, jetzt = Date.now()) {
  if (eingabe.stop_hook_active) return null;
  const cwd = eingabe.cwd || process.cwd();
  const wurzel = join(cwd, "website");
  if (!existsSync(wurzel)) return null;
  const offen = [];
  for (const name of readdirSync(wurzel)) {
    const site = join(wurzel, name, "site");
    if (!existsSync(site)) continue;
    const geaendert = neueste(site);
    if (!geaendert || jetzt - geaendert > 6 * 3600 * 1000) continue;
    const letzte = Math.max(0, ...pruefungen(join(wurzel, name, "arbeit")));
    if (geaendert > letzte + 1000) { offen.push(`${relative(cwd, site)} (ungeprüft)`); continue; }
    // Pflichtschritte, die im Probelauf übersprungen wurden: Vorbilder wirklich angesehen, Kritiker gerufen
    const vorbilder = existsSync(join(wurzel, name, "arbeit", "vorbilder")) ? readdirSync(join(wurzel, name, "arbeit", "vorbilder")).filter((f) => /\.png$/i.test(f)).length : 0;
    if (vorbilder < 3) offen.push(`${relative(cwd, site)} (weniger als 3 Vorbild-Bildschirmfotos in arbeit/vorbilder)`);
    const runden = join(wurzel, name, "arbeit", "runden");
    const kritik = existsSync(runden) && readdirSync(runden).some((r) => existsSync(join(runden, r, "kritik.md")));
    if (!kritik) offen.push(`${relative(cwd, site)} (keine Kritik in arbeit/runden/<n>/kritik.md – website-kritiker nicht gerufen?)`);
  }
  if (!offen.length) return null;
  return `Website-Abschluss: ${offen.slice(0, 3).join("; ")}. Vor „fertig“: ` +
    "mindestens 3 Vorbilder fotografieren, node <Plugin>/scripts/pruefen.mjs website/<name>/site, P0 beheben, Bildschirmfotos ansehen, den Agenten website-kritiker rufen und seine Antwort als arbeit/runden/<n>/kritik.md sichern. " +
    "Kann etwas davon nicht laufen, sag ehrlich, was und warum.";
}

if (process.argv[1]?.endsWith("abschluss.mjs")) {
  let roh = "";
  process.stdin.on("data", (d) => (roh += d));
  process.stdin.on("end", () => {
    let eingabe = {};
    try { eingabe = JSON.parse(roh || "{}"); } catch { process.exit(0); }
    const g = pruefe(eingabe);
    if (g) process.stdout.write(JSON.stringify({ decision: "block", reason: g }));
    process.exit(0);
  });
}
