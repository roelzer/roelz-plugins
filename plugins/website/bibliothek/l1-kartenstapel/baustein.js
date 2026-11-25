// Kartenstapel: Jede Karte schiebt sich mit einem Wisch über die vorige, der Grund nimmt ihre Farbe an.
// EINSTELLUNGEN: drehung (Grad beim Hereinkommen), versatz (px, wie weit die unteren Karten hochrutschen)
var EINSTELLUNGEN = { drehung: 7, versatz: 16, verkleinern: 0.05 };
(function () {
  var w = function (t) { return t * t * (3 - 2 * t); }, teil = function (p, a, b) { return Math.min(1, Math.max(0, (p - a) / (b - a))); };
  var mix = function (a, b, t) { var x = parseInt(a.slice(1), 16), y = parseInt(b.slice(1), 16); return "rgb(" + [16, 8, 0].map(function (s) { var u = (x >> s) & 255, v = (y >> s) & 255; return Math.round(u + (v - u) * t); }).join(",") + ")"; };
  var css = getComputedStyle(document.documentElement), farbe = function (n) { return css.getPropertyValue(n).trim(); };
  var E = EINSTELLUNGEN;
  Schritte.start({ fortschritt: function (el, p) {
    var k = el.querySelectorAll(".karte"), H = innerHeight, e2 = w(teil(p, 0.08, 0.45)), e3 = w(teil(p, 0.55, 0.92));
    k[0].style.transform = "translate(-50%,-50%) translateY(" + (-(e2 + e3) * E.versatz) + "px) scale(" + (1 - E.verkleinern * (e2 + e3)) + ")";
    k[1].style.transform = "translate(-50%,-50%) translateY(" + ((1 - e2) * H * 1.05 - e3 * E.versatz) + "px) rotate(" + ((1 - e2) * E.drehung) + "deg) scale(" + (1 - E.verkleinern * e3) + ")";
    k[2].style.transform = "translate(-50%,-50%) translateY(" + ((1 - e3) * H * 1.05) + "px) rotate(" + ((1 - e3) * -E.drehung) + "deg)";
    var t = (e2 + e3) / 2; el.querySelector(".buehne").style.background = t < 0.5 ? mix(farbe("--b-grund-1"), farbe("--b-grund-2"), t * 2) : mix(farbe("--b-grund-2"), farbe("--b-grund-3"), t * 2 - 1);
    el.querySelector(".zaehler b").textContent = 1 + (e2 > 0.5) + (e3 > 0.5);
  } });
})();
