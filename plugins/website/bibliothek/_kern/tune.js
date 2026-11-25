// Timing selbst einstellen (Skill Abschnitt 3a): Mit ?tune in der Adresse erscheint unten ein Feld mit Schiebereglern
// für jede Dauer (data-tempo / data-tempi der Bühnen). Werte bleiben im Browser, „Werte kopieren“ legt sie als Text
// in die Zwischenablage, damit Simon sie in den Chat schicken kann. Ohne ?tune passiert nichts.
// Am Handy darf das Feld die Szene nicht zudecken: Es startet eingeklappt als Knopf „Timing“, aufgeklappt zeigt es
// nur die Regler der Bühne, die gerade auf dem Bildschirm ist (höchstens ein Drittel der Höhe).
(function () {
  "use strict";
  window.Tune = {
    start: function (buehnen, neuMessen) {
      if (!/[?&]tune\b/.test(location.search) && !document.querySelector('meta[name="tune"]')) return;   // Artifact: <meta name="tune">
      var gespeichert = {};
      try { gespeichert = JSON.parse(localStorage.getItem("tune") || "{}"); } catch (e) {}
      var feld = document.createElement("div");
      feld.setAttribute("style", "position:fixed;left:8px;right:8px;bottom:8px;z-index:9999;max-height:34vh;overflow:auto;background:rgba(20,14,8,.9);color:#fbf1cf;font:13px/1.4 system-ui,sans-serif;padding:10px 12px;border-radius:12px;touch-action:pan-y");
      var zeilen = [];
      buehnen.forEach(function (el) {
        var id = el.id || "?", tempi = el.dataset.tempi ? el.dataset.tempi.split(",").map(Number) : [Number(el.dataset.tempo) || 2000];
        if (gespeichert[id] && gespeichert[id].length === tempi.length) tempi = gespeichert[id];   // Schrittzahl geändert: alte Werte verwerfen
        tempi.forEach(function (ms, i) {
          var z = document.createElement("label");
          z.setAttribute("style", "display:grid;grid-template-columns:9em 1fr 4em;gap:8px;align-items:center;margin:4px 0");
          z.innerHTML = '<span></span><input type="range" min="300" max="15000" step="100"><output></output>';
          z.firstChild.textContent = id + (tempi.length > 1 ? " · Schritt " + (i + 1) : "");
          var r = z.querySelector("input"), o = z.querySelector("output");
          r.value = ms; o.textContent = (ms / 1000).toFixed(1) + " s";
          r.addEventListener("input", function () {
            tempi[i] = Number(r.value); o.textContent = (tempi[i] / 1000).toFixed(1) + " s";
            if (tempi.length > 1) el.dataset.tempi = tempi.join(","); else el.dataset.tempo = tempi[0];
            gespeichert[id] = tempi.slice(); try { localStorage.setItem("tune", JSON.stringify(gespeichert)); } catch (e) {}
            neuMessen();
          });
          if (tempi.length > 1) el.dataset.tempi = tempi.join(","); else el.dataset.tempo = tempi[0];
          z.dataset.buehne = id; zeilen.push(z); feld.appendChild(z);
        });
      });
      var knopf = document.createElement("button");
      knopf.type = "button"; knopf.textContent = "Werte kopieren";
      knopf.setAttribute("style", "margin-top:8px;min-height:40px;padding:0 14px;border:0;border-radius:20px;background:#f1d68a;color:#2b1a0e;font-weight:700");
      knopf.addEventListener("click", function () {
        var text = "Timing: " + JSON.stringify(gespeichert);
        (navigator.clipboard ? navigator.clipboard.writeText(text) : Promise.reject()).then(function () { knopf.textContent = "Kopiert"; }, function () { prompt("Werte", text); });
      });
      feld.appendChild(knopf);
      var zu = document.createElement("button");
      zu.type = "button"; zu.textContent = "Einklappen";
      zu.setAttribute("style", "margin:8px 0 0 8px;min-height:40px;padding:0 14px;border:1px solid #f1d68a;border-radius:20px;background:transparent;color:#f1d68a");
      feld.appendChild(zu);
      var auf = document.createElement("button");
      auf.type = "button"; auf.textContent = "Timing";
      auf.setAttribute("style", "position:fixed;right:10px;bottom:10px;z-index:9999;min-height:40px;padding:0 16px;border:0;border-radius:20px;background:rgba(20,14,8,.85);color:#f1d68a;font:600 13px system-ui,sans-serif");
      feld.style.display = "none";
      auf.addEventListener("click", function () { feld.style.display = ""; auf.style.display = "none"; sichtbar(); });
      zu.addEventListener("click", function () { feld.style.display = "none"; auf.style.display = ""; });
      // nur die Regler der Bühne zeigen, die gerade den Bildschirm füllt
      function sichtbar() {
        if (feld.style.display === "none") return;
        var mitte = innerHeight / 2, jetzt = null;
        buehnen.forEach(function (el) { var r = el.getBoundingClientRect(); if (r.top <= mitte && r.bottom >= mitte) jetzt = el.id; });
        zeilen.forEach(function (z) { z.style.display = !jetzt || z.dataset.buehne === jetzt ? "grid" : "none"; });
      }
      window.addEventListener("scroll", sichtbar, { passive: true });
      document.body.appendChild(feld); document.body.appendChild(auf);
      neuMessen();
    }
  };
})();
