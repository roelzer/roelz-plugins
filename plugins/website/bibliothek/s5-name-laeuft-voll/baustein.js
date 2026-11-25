// Name läuft voll: Das Material steigt mit einer Wellenkante in die Buchstaben. Erst wenn der Name voll ist,
// steigen die Kontaktdaten auf (Simon: „dann soll auch erst die Schrift unten erkennbar werden“).
// EINSTELLUNGEN: welle (Höhe der Wellenkante in Einheiten der Schrift), datenAb (ab welchem Fortschritt die Daten kommen)
var EINSTELLUNGEN = { welle: 14, datenAb: 0.78 };
(function () {
  var w = function (t) { return t * t * (3 - 2 * t); }, teil = function (p, a, b) { return Math.min(1, Math.max(0, (p - a) / (b - a))); };
  var svg = document.querySelector(".name"), text = svg.querySelector(".leer"), welle = svg.querySelector(".welle"), bb = null;
  var daten = document.querySelector(".daten"), fuss = document.querySelector(".fuss");
  function messen() { try { bb = text.getBBox(); svg.setAttribute("viewBox", [bb.x - 10, bb.y - 10, bb.width + 20, bb.height + 20].join(" ")); } catch (e) {} }
  messen(); if (document.fonts) document.fonts.ready.then(messen);
  Schritte.start({ fortschritt: function (el, p) {
    if (!bb) messen(); if (!bb) return;
    var F = w(teil(p, 0.04, 0.74)), unten = bb.y + bb.height + 30, oben = bb.y - 30, y = unten - F * (unten - oben), A = EINSTELLUNGEN.welle * (1 - F * 0.7);
    var d = "M" + (bb.x - 40) + " " + y; for (var x = bb.x - 40; x <= bb.x + bb.width + 40; x += 30) d += " L" + x + " " + (y + Math.sin(x / 70 + p * 16) * A).toFixed(1);
    welle.setAttribute("d", d + " L" + (bb.x + bb.width + 40) + " " + (unten + 40) + " L" + (bb.x - 40) + " " + (unten + 40) + " Z");
    var k = w(teil(p, EINSTELLUNGEN.datenAb, 0.97));
    daten.style.opacity = fuss.style.opacity = k; daten.style.visibility = fuss.style.visibility = k > 0 ? "visible" : "hidden";
    daten.style.transform = "translateY(" + ((1 - k) * 40) + "px)";
  } });
})();
