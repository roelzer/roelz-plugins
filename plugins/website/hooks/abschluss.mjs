#!/usr/bin/env node
// Stop-Sperre des Website-Bauers: Eine geänderte Seite darf nicht als fertig gemeldet werden, solange sie nicht mit
// scripts/pruefen.mjs geprüft wurde (eine pruefung*.json, die neuer ist als die neueste Datei in site/).
// Vorbild: Abschluss-Sperre des Video-Editors (Probearbeit 18.11.2026: Pflichtschritte wurden sonst übersprungen).
// Läuft nur einmal je Stopp (stop_hook_active), damit nie eine Endlosschleife entsteht.
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
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

function finde(ordner, test, tiefe = 0, liste = []) {
  if (tiefe > 8 || !existsSync(ordner)) return liste;
  for (const name of readdirSync(ordner)) {
    if (name === "node_modules" || name === ".git") continue;
    const p = join(ordner, name);
    if (test(name)) liste.push(p);
    let s; try { s = statSync(p); } catch { continue; }
    if (s.isDirectory()) finde(p, test, tiefe + 1, liste);
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
    // SFH-Test 19.11.2026: Handy-Leistung fiel unbemerkt von 98 auf 62 → Lighthouse-Messung ist Pflicht, Ziel ≥ 90
    const leistung = finde(join(wurzel, name, "arbeit"), (n) => n === "leistung.json").map((p) => ({ p, t: statSync(p).mtimeMs })).sort((a, b) => b.t - a.t)[0];
    let leistungOk = false;
    if (leistung && leistung.t + 1000 >= geaendert) { try { leistungOk = JSON.parse(readFileSync(leistung.p, "utf8")).ok === true; } catch {} }
    if (!leistungOk) offen.push(`${relative(cwd, site)} (Leistung im Handy-Profil nicht gemessen oder unter 90 – node <Plugin>/scripts/leistung.mjs ${relative(cwd, site)})`);
    // Umbau: Wünsche aus dem bisherigen Stand müssen erfasst sein, sonst gehen sie verloren (SFH: die „50“ mit Foto fehlte)
    const umbau = existsSync(join(wurzel, name, "arbeit", "inhaltsliste.md")) || existsSync(join(wurzel, name, "arbeit", "original"));
    if (umbau && !existsSync(join(wurzel, name, "arbeit", "wuensche.md"))) offen.push(`${relative(cwd, site)} (Umbau ohne arbeit/wuensche.md – frühere Wünsche des Auftraggebers erfassen und mitnehmen)`);
    // Probearbeit 20.11.2026: alle Seiten fehlerfrei, aber ohne Moment („haut mich jetz alles nicht so um“).
    // Neue Seiten brauchen eine Hauptidee und ein Merk-Urteil des Kritikers; bleibt es in allen Runden „langweilig“, ehrlich sagen.
    if (!umbau) {
      const arbeit = join(wurzel, name, "arbeit");
      if (!existsSync(join(arbeit, "hauptidee.md"))) offen.push(`${relative(cwd, site)} (keine arbeit/hauptidee.md – den einen Moment festlegen, den man sich merkt, handwerk.md Abschnitt 1b)`);
      if (kritik) {
        const urteile = readdirSync(runden).map((r) => join(runden, r, "kritik.md")).filter((k) => existsSync(k))
          .map((k) => (readFileSync(k, "utf8").match(/Merk-Urteil:\s*\**\s*(merkt man sich|langweilig)/i) || [])[1]?.toLowerCase()).filter(Boolean);
        if (!urteile.length) offen.push(`${relative(cwd, site)} (Kritik ohne Merk-Urteil – website-kritiker muss mit „Merk-Urteil: merkt man sich“ oder „Merk-Urteil: langweilig“ beginnen)`);
        else if (!urteile.includes("merkt man sich") && !existsSync(join(arbeit, "ehrlich.md")))
          offen.push(`${relative(cwd, site)} (der Kritiker nennt jede Runde „langweilig“ – am Moment arbeiten, nicht an Details; nach 3 Runden in arbeit/ehrlich.md begründen und Simon ehrlich sagen)`);
      }
    }
    // Müll im Projekt (SFH: eingecheckte __pycache__-Datei)
    const muell = finde(join(wurzel, name), (n) => n === "__pycache__" || n === ".DS_Store" || /\.pyc$/.test(n));
    if (muell.length) offen.push(`${relative(cwd, join(wurzel, name))} (Müll im Projekt: ${muell.slice(0, 2).map((m) => relative(cwd, m)).join(", ")} – löschen und in .gitignore aufnehmen)`);
  }
  if (!offen.length) return null;
  return `Website-Abschluss: ${offen.slice(0, 4).join("; ")}. Vor „fertig“: ` +
    "mindestens 3 Vorbilder fotografieren, node <Plugin>/scripts/pruefen.mjs website/<name>/site, P0 beheben, Bildschirmfotos ansehen, node <Plugin>/scripts/leistung.mjs (Handy ≥ 90), bei neuen Seiten arbeit/hauptidee.md schreiben, den Agenten website-kritiker rufen und seine Antwort (mit Merk-Urteil) als arbeit/runden/<n>/kritik.md sichern, Unterlagen (QUELLEN.md, Design-Notizen) mit anpassen. " +
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
