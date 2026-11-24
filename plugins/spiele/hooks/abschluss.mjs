#!/usr/bin/env node
// Stop-Sperre des Spiele-Bauers: Ein geändertes Spiel darf nicht als fertig gemeldet werden, solange scripts/spielpruefen.mjs
// es nicht geprüft hat (arbeit/pruefung.json neuer als die neueste Spieldatei). Probelauf 24.11.2026: Bildrate, Einbetten
// und Hochkant wurden ohne Pflichtschritt nie geprüft. Läuft nur einmal je Stopp (stop_hook_active), nie in Schleife.
import { existsSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const NIE = new Set(["node_modules", ".git", "arbeit"]);
function neueste(ordner, tiefe = 0) {
  let zeit = 0;
  if (tiefe > 6 || !existsSync(ordner)) return 0;
  for (const name of readdirSync(ordner)) {
    if (NIE.has(name)) continue;
    const p = join(ordner, name);
    let s; try { s = statSync(p); } catch { continue; }
    zeit = Math.max(zeit, s.isDirectory() ? neueste(p, tiefe + 1) : s.mtimeMs);
  }
  return zeit;
}

export function pruefe(eingabe, jetzt = Date.now()) {
  if (eingabe.stop_hook_active) return null;
  const cwd = eingabe.cwd || process.cwd();
  const wurzel = join(cwd, "spiele");
  if (!existsSync(wurzel)) return null;
  const offen = [];
  for (const name of readdirSync(wurzel)) {
    const spiel = join(wurzel, name);
    if (!existsSync(join(spiel, "index.html"))) continue;
    const geaendert = neueste(spiel);
    if (!geaendert || jetzt - geaendert > 6 * 3600 * 1000) continue;
    const pruefung = join(spiel, "arbeit", "pruefung.json");
    const zeit = existsSync(pruefung) ? statSync(pruefung).mtimeMs : 0;
    if (geaendert > zeit + 1000) offen.push(`${relative(cwd, spiel)} (ungeprüft)`);
    else if (!existsSync(join(spiel, "arbeit", "leistung.json"))) offen.push(`${relative(cwd, spiel)} (keine arbeit/leistung.json)`);
  }
  if (!offen.length) return null;
  return `Spiele-Abschluss: ${offen.slice(0, 3).join("; ")}. Vor der Übergabe: node <Plugin>/scripts/spielpruefen.mjs spiele/<name> spiele/<name>/arbeit --bot, ` +
    "FEHLER beheben, Fotos ansehen, den Agenten spiele-pruefer rufen. Kann etwas davon nicht laufen, sag ehrlich, was und warum.";
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
