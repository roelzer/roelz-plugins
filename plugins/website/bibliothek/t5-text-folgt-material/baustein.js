// Text folgt dem Material (handwerk.md 1c Punkt 11): Ein zäher Strahl zieht mit einem langen Wisch langsam nach unten,
// jede Zeile erscheint, wenn die Spitze ihre Höhe erreicht. Unten sammelt sich das Material flach.
// EINSTELLUNGEN: weich (wie weich eine Zeile einblendet, Anteil der Bühnenhöhe), nachlauf (px, wie weit die Zeile von oben nachläuft)
var EINSTELLUNGEN = { weich: 0.06, nachlauf: 18 };
(function () {
  var w = function (t) { return t * t * (3 - 2 * t); };
  var el = document.getElementById("langsam"), strahl = window.HonigFaden(el.querySelector(".material"));
  var zeilen = [].slice.call(el.querySelectorAll(".zeile, .unter")), echo = el.querySelector(".echo"), buehne = el.querySelector(".buehne");
  Schritte.start({ fortschritt: function (s, p) {
    strahl.setze(p, 0);
    var b = buehne.getBoundingClientRect(), kopfY = strahl.kopf(p).anteil * b.height, oben = echo.getBoundingClientRect().top - b.top;
    zeilen.forEach(function (z, k) {
      var mitte = oben + z.offsetTop + z.offsetHeight * 0.6, t = w(Math.min(1, Math.max(0, (kopfY - mitte) / (b.height * EINSTELLUNGEN.weich) + 1)));
      z.style.visibility = t > 0 ? "visible" : "hidden";
      z.style.opacity = (t * (z.classList.contains("unter") ? 1 : 1 - k * 0.2)).toFixed(3);
      z.style.transform = "translateY(" + (-(1 - t) * EINSTELLUNGEN.nachlauf) + "px) scaleY(" + (1 + (1 - t) * 0.3) + ")";
    });
  } });
})();
