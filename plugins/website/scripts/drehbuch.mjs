// W20 Drehbuch (handwerk.md 1c): liest arbeit/drehbuch.md und prüft, ob sich das Wow durchzieht.
// Spalten: Abschnitt | laut/leise | Baustein | Übergang hinein | Rolle des Motivs | Grundfarbe | Text-Bewegung | Abgang
// Rückgabe: Liste [schwere, code, text, beleg]. Eigenes Modul, damit es ohne Browser testbar ist.
export function drehbuchBefunde(text) {
  const raus = [];
  if (text == null) return [["Hinweis", "W20", "arbeit/drehbuch.md fehlt – je Abschnitt laut/leise, Baustein, Übergang, Motiv-Rolle festlegen (handwerk.md 1c)", ""]];
  const zeilen = text.split("\n").filter((z) => /^\s*\|/.test(z) && !/^\s*\|[\s:|-]+\|\s*$/.test(z))
    .map((z) => z.trim().replace(/^\||\|$/g, "").split("|").map((x) => x.trim()));
  const daten = zeilen.filter((z) => !/^abschnitt$/i.test(z[0] || ""));
  if (daten.length < 3) return [["Hinweis", "W20", "arbeit/drehbuch.md hat weniger als 3 Abschnitte – Tabelle nach handwerk.md 1c", ""]];
  const n = daten.length, drittel = [0, 1, 2].map((k) => daten.slice(Math.floor((k * n) / 3), Math.floor(((k + 1) * n) / 3)));
  const ohne = drittel.map((d, k) => (d.some((z) => /^laut/i.test(z[1] || "")) ? null : ["oberen", "mittleren", "unteren"][k])).filter(Boolean);
  if (ohne.length) raus.push(["P0", "W20", `Drehbuch: im ${ohne.join(" und im ")} Drittel kein lauter Moment – das Wow muss sich durchziehen (Simon, 24.11.2026)`, "handwerk.md 1c Punkt 3"]);
  const motiv = daten.filter((z) => (z[4] || "").replace(/[-–—]/g, "").trim()).length;
  if (motiv < 4) raus.push(["Hinweis", "W20", `Drehbuch: das Motiv kommt nur in ${motiv} Abschnitten vor (Einstieg plus mindestens drei)`, "handwerk.md 1c Punkt 1"]);
  const blass = daten.filter((z) => /^\s*(von unten )?(einblenden|fade|erscheint)\b|^\s*$/i.test(z[3] || "")).length;
  if (blass > 1) raus.push(["Hinweis", "W20", `Drehbuch: ${blass} Abschnitte ohne eigenen Übergang (nur einblenden)`, "handwerk.md 1c Punkt 2"]);
  if (daten[0].length >= 8) {
    const weg = daten.filter((z) => /^\s*(aus|ausblenden|fade|verschwindet|schrumpft)\b/i.test(z[7] || "")).length;
    if (weg) raus.push(["Hinweis", "W20", `Drehbuch: ${weg} Abschnitte gehen nur durch Ausblenden – das Verschwinden ist auch ein Moment (Simon: „hat billig gewirkt“)`, "handwerk.md 1c Punkt 9"]);
  }
  return raus;
}
