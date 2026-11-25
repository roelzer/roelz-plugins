// Zelle in fünf Schritten mit Figur (aus der Honig-Musterseite): Eine Zelle geht mit je einem Wisch durch fünf Zustände
// (eintragen, reifen, verdeckeln, schleudern, abfüllen), der passende Satz leuchtet gleichzeitig auf. Im ersten Schritt
// fliegt eine Figur (Biene) nach der Uhr ganz durch und bleibt nie stehen (handwerk.md 1c Punkt 10).
// Die Zustände und die Figur werden beim Auftraggeber ersetzt (Fliese: Untergrund, Abdichtung, Kleber, Fliese, Fuge).
(function () {
  var teil = function (p, a, b) { return Math.min(1, Math.max(0, (p - a) / (b - a))); };
  var weich = function (t) { return t * t * (3 - 2 * t); };
  var rgb = function (h) { var n = parseInt(h.slice(1), 16); return [n >> 16, (n >> 8) & 255, n & 255]; };
  var mischen = function (a, b, t) { var x = rgb(a), y = rgb(b); return "rgb(" + [0, 1, 2].map(function (i) { return Math.round(x[i] + (y[i] - x[i]) * t); }).join(",") + ")"; };
  var verlauf = function (s, t) { var n = s.length - 1, k = Math.min(n - 1, Math.floor(t * n)); return mischen(s[k], s[k + 1], Math.min(1, t * n - k)); };
  var zeige = function (el, an) { var w = an ? "" : "none"; if (el.style.display !== w) el.style.display = w; };
  var hoehe = function () { return window.innerHeight; };
  var RUHIG = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var szene = (function (el) {
    var buehneEl = el.querySelector(".buehne"), svg = el.querySelector(".zelle-gross");
    var ganz = el.querySelector(".zelle-ganz"), pegel = el.querySelector(".pegel"), glanz = el.querySelector(".zelle-glanz");
    var nektar = el.querySelectorAll(".nektar"), deckel = el.querySelector(".zelle-deckel");
    var spritzer = el.querySelectorAll(".spritzer circle"), glas = el.querySelector(".glas"), glasHonig = el.querySelector(".glas-honig");
    var schritte = el.querySelectorAll(".schritte li"), biene = el.querySelector(".biene"), buehneEl2 = el.querySelector(".buehne");
    var bieneFlug = { laeuft: false, fertig: false, id: 0 };
    function bieneStopp() { bieneFlug.laeuft = false; bieneFlug.fertig = true; cancelAnimationFrame(bieneFlug.id); biene.hidden = true; }
    function bieneStart() {
      bieneFlug.laeuft = true; var t0 = performance.now(), DAUER = 5000;
      (function flug(jetzt) {
        if (!bieneFlug.laeuft) return;
        var f = Math.min(1, (jetzt - t0) / DAUER);
        var zr = svg.getBoundingClientRect(), br = buehneEl2.getBoundingClientRect(), bw = biene.getBoundingClientRect().width || 120;
        var zx = zr.left - br.left + zr.width / 2, zy = zr.top - br.top + zr.height * 0.3;
        var lauf = Math.min(1, Math.max(0, f + 0.72 * Math.sin(f * Math.PI * 2) / (Math.PI * 2)));   // über der Zelle langsam, nie 0
        var start = -bw * 1.6, ende = br.width + bw * 1.6;
        var bx = lauf < 0.5 ? start + (zx - start) * (lauf / 0.5) : zx + (ende - zx) * ((lauf - 0.5) / 0.5);
        var by = zy - (1 - Math.sin(lauf * Math.PI)) * zr.height * 0.35 + Math.sin(f * 40) * 3;
        var kipp = (0.5 - lauf) * 18 + Math.sin(f * 32) * 3;
        biene.hidden = false;
        biene.style.transform = "translate(" + (bx - bw / 2).toFixed(1) + "px," + (by - bw * 0.45).toFixed(1) + "px) rotate(" + (-kipp).toFixed(1) + "deg) scaleX(-1)";
        if (f < 1) bieneFlug.id = requestAnimationFrame(flug); else bieneStopp();
      })(t0);
    }
    return function (p) {
      var z = weich(teil(p, 0, 0.13));
      svg.style.transform = "translateY(" + ((1 - z) * hoehe() * (window.innerWidth < 700 ? 0.12 : 0.34)).toFixed(1) + "px) scale(" + (0.14 + 0.86 * z).toFixed(4) + ")";
      var q = teil(p, 0.13, 0.97) * 5;
      for (var i = 0; i < nektar.length; i++) {
        var t = weich(teil(q, 0.32 + i * 0.05, 0.6 + i * 0.05));
        zeige(nektar[i], t > 0 && q < 1.35);
        nektar[i].setAttribute("transform", "translate(0 " + (t * (175 - i * 8)).toFixed(1) + ")");
      }
      // Biene: Flug nach Zeit, nicht nach Scrollstelle (Simon: „die Biene sitzt immer noch manchmal in der Mitte“).
      // Startet, sobald Schritt 1 beginnt, fliegt in 5 s ganz durch und ist danach weg, wo auch immer man anhält.
      if (q > 0.02 && q < 0.95 && !bieneFlug.laeuft && !bieneFlug.fertig) bieneStart();
      if (q <= 0.02) { bieneFlug.fertig = false; if (bieneFlug.laeuft) bieneStopp(); }
      if (q >= 0.95 && bieneFlug.laeuft) bieneStopp();
      var L = weich(teil(q, 0.9, 1.9)) * (1 - weich(teil(q, 3.35, 3.95)));
      pegel.setAttribute("y", (100 - L * 200).toFixed(1));
      zeige(glanz, L > 0.6);
      var C = weich(teil(q, 2, 2.7)), u = weich(teil(q, 3, 3.4));
      zeige(deckel, C > 0 && u < 1);
      deckel.setAttribute("transform", "translate(" + (u * 170).toFixed(1) + " " + (-(1 - C) * 200 - u * 170).toFixed(1) + ") rotate(" + (u * 28).toFixed(1) + ")");
      var w = weich(teil(q, 4, 4.35));
      ganz.setAttribute("transform", "translate(0 " + (-w * 280).toFixed(1) + ") rotate(" + (weich(teil(q, 3.3, 4)) * 360).toFixed(1) + ")");
      var sp = teil(q, 3.4, 4.1);
      for (var k = 0; k < spritzer.length; k++) {
        var a = k * Math.PI / 3 + 0.4, dist = 40 + sp * 120;
        zeige(spritzer[k], sp > 0 && sp < 1);
        spritzer[k].setAttribute("cx", (Math.cos(a) * dist).toFixed(1));
        spritzer[k].setAttribute("cy", (Math.sin(a) * dist).toFixed(1));
      }
      zeige(glas, w > 0);
      glas.setAttribute("transform", "translate(0 " + ((1 - w) * 280).toFixed(1) + ")");
      glasHonig.style.transform = "scaleY(" + weich(teil(q, 4.3, 4.9)).toFixed(4) + ")";
      var SCHWELLE = [0.02, 0.95, 2.05, 2.8, 4.15];   // jeder Satz leuchtet erst mit seinem Wisch auf, gleichzeitig mit der Animation (Haltepunkte 0,9 · 2,0 · 2,75 · 4,1)
      for (var j = 0; j < schritte.length; j++) schritte[j].classList.toggle("an", q > SCHWELLE[j] || p >= 1);
      buehneEl.style.backgroundColor = verlauf(["#F1D68A", "#EDC86A", "#E6B04A"], q / 5);
    };
  })(document.getElementById("ablauf"));
  Schritte.start({ fortschritt: function (s, p) { szene(p); } });
})();
