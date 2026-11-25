// Ein Wisch = eine Animation (Simon, 25.11.2026) – wiederverwendbare Fassung aus der Honig-Musterseite.
// Jede Bühne ist ein <section data-buehne> mit einer .strecke (Scrollweg) und darin einer .buehne (sticky).
// Haltepunkte: Anfang und Ende jeder Bühne, dazu Zwischenschritte (data-schritte="0.3,0.6").
// Wisch, Mausrad-Klick (einer oder zwanzig), Trackpad-Schwung und Pfeiltasten fahren genau einen Haltepunkt weiter,
// in der Dauer der Szene (data-tempo="2400" bzw. data-tempi="1800,1800,2600" je Schritt). Die Bildlaufleiste bleibt frei.
//
// Einbinden:
//   <script src="schritte.js"></script>
//   Schritte.start({ fortschritt: (section, p) => { … } });     // p = 0…1 je Bühne
// Mit ?tune in der Adresse erscheinen Schieberegler für alle Dauern (tune.js, falls geladen).
(function () {
  "use strict";
  var teil = function (p, a, b) { return Math.min(1, Math.max(0, (p - a) / (b - a))); };
  var ruhig = function () { return matchMedia("(prefers-reduced-motion: reduce)").matches; };

  window.Schritte = {
    start: function (opt) {
      var buehnen = [].slice.call(document.querySelectorAll("section[data-buehne]"));
      var mass = [], faehrt = false;
      var hoehe = function () { return window.innerHeight; };
      function zahlen(s) { return s ? s.split(",").map(Number) : null; }
      function messen() {
        var y = window.scrollY, H = hoehe();
        mass = buehnen.map(function (el) {
          var st = el.querySelector(".strecke"), r = st.getBoundingClientRect(), oben = r.top + y;
          return { el: el, von: oben, bis: oben + st.offsetHeight - H, p: -1,
            tempo: Number(el.dataset.tempo) || 2000, teile: zahlen(el.dataset.schritte), tempi: zahlen(el.dataset.tempi) };
        });
      }
      function tick() {
        var y = window.scrollY, H = hoehe();
        for (var i = 0; i < mass.length; i++) {
          var m = mass[i];
          if (y < m.von - H || y > m.bis + H) continue;
          var p = Math.min(1, Math.max(0, (y - m.von) / Math.max(1, m.bis - m.von)));
          if (Math.abs(p - m.p) > 0.0004 || p === 0 || p === 1) { m.p = p; opt.fortschritt(m.el, p); }
        }
      }
      function haltepunkte() {
        var max = document.documentElement.scrollHeight - hoehe(), l = [{ y: 0, dauer: 900 }];
        mass.forEach(function (m) {
          l.push({ y: Math.max(0, Math.round(m.von)), dauer: 1000 });
          (m.teile || []).forEach(function (f, i) { l.push({ y: Math.round(m.von + (m.bis - m.von) * f), dauer: m.tempi ? m.tempi[i] : m.tempo }); });
          l.push({ y: Math.min(max, Math.round(m.bis)), dauer: m.tempi ? m.tempi[(m.teile || []).length] : m.tempo });
        });
        l.push({ y: max, dauer: 900 });
        l.sort(function (a, b) { return a.y - b.y; });
        return l.filter(function (h, i) { return i === 0 || h.y - l[i - 1].y > 40; });
      }
      function fahre(r) {
        if (faehrt) return;
        var y = window.scrollY, hp = haltepunkte(), ziel = null, i;
        if (r > 0) { for (i = 0; i < hp.length; i++) if (hp[i].y > y + 8) { ziel = hp[i]; break; } }
        else { for (i = hp.length - 1; i >= 0; i--) if (hp[i].y < y - 8) { ziel = hp[i]; break; } }
        if (!ziel) return;
        var dauer = ziel.dauer;
        if (r < 0) { var oben = hp.filter(function (h) { return h.y > ziel.y; })[0]; dauer = oben ? oben.dauer * 0.7 : 900; }
        var von = y, weg = ziel.y - y, t0 = performance.now(); faehrt = true;
        (function s(j) {
          var q = Math.min(1, (j - t0) / dauer), e = q < 0.5 ? 2 * q * q : 1 - Math.pow(-2 * q + 2, 2) / 2;
          window.scrollTo(0, von + weg * e);
          if (q < 1) requestAnimationFrame(s); else faehrt = false;
        })(t0);
      }
      // Eingaben
      var startY = null;
      document.addEventListener("touchstart", function (e) { if (e.touches.length === 1) startY = e.touches[0].clientY; }, { passive: true });
      document.addEventListener("touchmove", function (e) { var m = document.querySelector("details[open]"); if (!(m && m.contains(e.target)) && e.cancelable) e.preventDefault(); }, { passive: false });
      document.addEventListener("touchend", function (e) { if (startY === null) return; var dy = startY - e.changedTouches[0].clientY; startY = null; if (Math.abs(dy) > 24) fahre(dy > 0 ? 1 : -1); }, { passive: true });
      var radZeit = 0, radStaerke = 0;   // neu = Pause über 140 ms oder deutlich stärker; abklingender Nachlauf wird geschluckt
      window.addEventListener("wheel", function (e) {
        if (e.ctrlKey) return; e.preventDefault();
        var jetzt = performance.now(), st = Math.abs(e.deltaY) * (e.deltaMode === 1 ? 30 : 1);
        var neu = jetzt - radZeit > 140 || st > radStaerke * 1.4 + 4; radZeit = jetzt; radStaerke = st;
        if (neu && st >= 1 && !faehrt) fahre(e.deltaY > 0 ? 1 : -1);
      }, { passive: false });
      window.addEventListener("keydown", function (e) {
        var t = e.target; if (t && /input|textarea|select/i.test(t.tagName)) return;
        if (e.key === "ArrowDown" || e.key === "PageDown" || (e.key === " " && !/button|a|summary/i.test(t.tagName))) { e.preventDefault(); fahre(1); }
        else if (e.key === "ArrowUp" || e.key === "PageUp") { e.preventDefault(); fahre(-1); }
      });
      var geplant = false;
      window.addEventListener("scroll", function () { if (!geplant) { geplant = true; requestAnimationFrame(function () { geplant = false; tick(); }); } }, { passive: true });
      var breite = window.innerWidth, hAlt = hoehe();
      window.addEventListener("resize", function () { if (window.innerWidth === breite && Math.abs(hoehe() - hAlt) < 120) return; breite = window.innerWidth; hAlt = hoehe(); messen(); mass.forEach(function (m) { m.p = -1; }); tick(); });
      if (ruhig()) { messen(); mass.forEach(function (m) { opt.fortschritt(m.el, 1); }); return; }
      messen(); tick();
      if (window.Tune) window.Tune.start(buehnen, function () { messen(); });
      return { fahre: fahre, messen: messen, teil: teil };
    }
  };
})();
