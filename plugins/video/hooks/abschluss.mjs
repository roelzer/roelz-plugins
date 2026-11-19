#!/usr/bin/env node
// Stop-Sperre des Video-Plugins: Ein neues oder geändertes Video darf nicht als fertig gemeldet werden, solange es
// nicht mit scripts/messen.py gemessen wurde (eine messung*.json, die neuer ist als das Video).
// Anlass: Probearbeit 18.11.2026 – bei reinen Schnitten (Teaser, Interview) wurde teils weder gemessen noch der
// Kritiker gerufen; ein zu laut abgemischter Teaser rutschte so durch. Was immer gelten muss, gehört in eine Sperre.
// Läuft nur einmal je Stopp (stop_hook_active), damit nie eine Endlosschleife entsteht.
import { existsSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

// Videos in diesen Ordnern sind Originale, Zwischenstände oder Bausteine – sie lösen die Sperre nicht aus.
const KEINE_ABGABE = new Set(["material", "arbeit", "pruefung", "stilproben", "renders", "film", "assets"]);
const NIE = new Set(["node_modules", ".git", ".hyperframes", "frames", ".cache"]);

function dateien(wurzel, tiefe = 0, liste = [], abgabe = true) {
  if (tiefe > 6 || !existsSync(wurzel)) return liste;
  for (const name of readdirSync(wurzel)) {
    const p = join(wurzel, name);
    let s;
    try { s = statSync(p); } catch { continue; }
    if (s.isDirectory()) { if (!NIE.has(name)) dateien(p, tiefe + 1, liste, abgabe && !KEINE_ABGABE.has(name)); }
    else liste.push({ p, name, zeit: s.mtimeMs, abgabe });
  }
  return liste;
}

export function pruefe(eingabe, jetzt = Date.now()) {
  if (eingabe.stop_hook_active) return null;
  const cwd = eingabe.cwd || process.cwd();
  // Nur, wenn der Video-Skill in diesem Projekt gearbeitet hat (video/<name>/ existiert).
  if (!existsSync(join(cwd, "video"))) return null;
  const alle = dateien(cwd);
  const messungen = alle.filter((d) => /^messung.*\.json$/.test(d.name)).map((d) => d.zeit);
  const neueste = messungen.length ? Math.max(...messungen) : 0;
  const frisch = alle.filter((d) => d.abgabe && /\.(mp4|mov|webm)$/i.test(d.name) && jetzt - d.zeit < 6 * 3600 * 1000);
  const ungemessen = frisch.filter((d) => d.zeit > neueste + 1000);
  if (!ungemessen.length) return null;
  const namen = ungemessen.slice(0, 3).map((d) => relative(cwd, d.p)).join(", ");
  return `Video-Abschluss: ${namen} ist noch nicht gemessen. Vor „fertig“ gilt für jedes Video, auch für reine Schnitte: ` +
    "python3 <Plugin>/scripts/messen.py <video> … --json video/<name>/pruefung/messung.json, P0 beheben, " +
    "Prüfbilder mit boegen.py erzeugen und den Agenten video-kritiker rufen. Kann etwas davon nicht laufen, sag ehrlich, was und warum.";
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
