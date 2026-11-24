#!/usr/bin/env node
// Probearbeit 24.11.2026: Bei Aufträgen zu einem schon vorhandenen Spiel („ruckelt“, „stell's online“) lud Claude
// den Skill nie und arbeitete ohne Messung, ohne Auftrags-Datei und mit dem Deploy als erstem Schritt.
// Dieser Hook erinnert daran, wenn im Projekt ein Ordner spiele/ liegt und die Nachricht nach einem Spiel klingt.
import { existsSync } from "node:fs";
import path from "node:path";

export function hinweis(eingabe) {
  const text = String(eingabe.prompt || "");
  if (!/spiel|game/i.test(text)) return null;
  let d = path.resolve(eingabe.cwd || process.cwd());
  for (let i = 0; i < 6; i++) {
    if (existsSync(path.join(d, "spiele"))) {
      return "Im Projekt liegt ein Ordner spiele/. Für Bauen, Ändern, Reparieren und Veröffentlichen eines Browserspiels gilt der Skill spiele:bauen – lade ihn zuerst (Messen vor dem Ändern, arbeit/veroeffentlichen.md, .assetsignore, erst prüfen, dann hochladen).";
    }
    const o = path.dirname(d); if (o === d) break; d = o;
  }
  return null;
}

if (process.argv[1]?.endsWith("hinweis.mjs")) {
  let roh = "";
  process.stdin.on("data", (x) => (roh += x));
  process.stdin.on("end", () => {
    let e = {}; try { e = JSON.parse(roh || "{}"); } catch { process.exit(0); }
    const h = hinweis(e);
    if (h) process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: "UserPromptSubmit", additionalContext: h } }));
    process.exit(0);
  });
}
