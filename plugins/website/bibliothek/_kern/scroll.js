// Kleiner Scroll-Helfer der Baustein-Bibliothek (eigener Code, keine Fremdbibliothek).
// fortschritt(el, cb, {start, ende}) ruft cb(p) mit p = 0..1, während el durch den Bildschirm läuft.
// Ein requestAnimationFrame je Bild, Größen nur bei resize messen (3d-leistung.md: „Pro Bild kein Layout lesen“).
export const ruhig = () => matchMedia("(prefers-reduced-motion: reduce)").matches;

const eintraege = [];
let geplant = false, hoehe = innerHeight;

function messen() {
  hoehe = innerHeight;
  for (const e of eintraege) {
    const r = e.el.getBoundingClientRect();
    e.oben = r.top + scrollY; e.h = r.height;
  }
  zeichnen();
}

function zeichnen() {
  geplant = false;
  const y = scrollY;
  for (const e of eintraege) {
    // start/ende in Bildschirmhöhen: 1 = Oberkante erreicht Unterkante des Fensters, 0 = Oberkante oben
    const von = e.oben - hoehe * e.start, bis = e.oben + e.h - hoehe * e.ende;
    const p = Math.min(1, Math.max(0, (y - von) / Math.max(1, bis - von)));
    if (p !== e.p) { e.p = p; e.cb(p); }
  }
}

addEventListener("scroll", () => { if (!geplant) { geplant = true; requestAnimationFrame(zeichnen); } }, { passive: true });
addEventListener("resize", () => requestAnimationFrame(messen));

export function fortschritt(el, cb, { start = 1, ende = 0 } = {}) {
  const e = { el, cb, start, ende, p: -1, oben: 0, h: 0 };
  eintraege.push(e);
  requestAnimationFrame(messen);
  return () => eintraege.splice(eintraege.indexOf(e), 1);
}

// Hilfen für Kurven und Abschnitte eines Fortschritts
export const teil = (p, a, b) => Math.min(1, Math.max(0, (p - a) / (b - a)));
export const weich = (t) => t * t * (3 - 2 * t);
