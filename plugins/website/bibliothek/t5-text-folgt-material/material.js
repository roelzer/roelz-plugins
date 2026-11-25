// Laufender Honig für „Langsam.“ (wissen/bausteine.md, „Material echt darstellen“).
// Ein zäher Strahl fällt von oben in eine Wabenzelle, legt sich dort in Schlaufen übereinander („Seilwurf“),
// die Schlaufen sinken langsam ein und verlaufen zum See. Darstellung: durchscheinendes Bernstein
// (Rand dunkel, Kern hell), Glanzkante, Schatten unter den Schlaufen, Glanzlichter im See.
// Trägheit: Der Strahl schwingt mit der Scroll-Geschwindigkeit nach (gedämpfte Feder).
// Läuft nur, solange die Fläche sichtbar ist, mit gut 30 Bildern pro Sekunde.
window.HonigFaden = function (canvas) {
  "use strict";
  var ctx = canvas.getContext("2d");
  var W = 0, H = 0, dpr = 1, p = 0, sichtbar = false, laeuft = false, letzt = 0, t = 0;
  var schwung = 0, schwungV = 0, ziel = 0, spur = [], winkel = 0, ringe = [], ringZeit = 0;
  var teil = function (x, a, b) { return Math.min(1, Math.max(0, (x - a) / (b - a))); };
  var weich = function (x) { return x * x * (3 - 2 * x); };

  function groesse() {
    var w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    dpr = Math.min(2, window.devicePixelRatio || 1);
    W = w; H = h; canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
  }
  function hex(cx, cy, rx, ry) {
    ctx.beginPath();
    for (var k = 0; k < 6; k++) { var a = Math.PI / 3 * k; ctx.lineTo(cx + rx * Math.cos(a), cy + ry * Math.sin(a)); }
    ctx.closePath();
  }
  // (Wabenzelle entfernt, 25.11.2026: „sieht komisch und billig aus“ – der Honig landet jetzt in Honig)
  // Maße: alles hängt an einer Einheit u, damit Handy und Laptop gleich aussehen
  function masse() {
    var schmal = W < 700;
    var u = Math.max(7, Math.min(13, Math.min(W, H * 1.2) / 70));
    return {
      u: u,
      x: W * (schmal ? 0.8 : 0.7),
      yZelle: H * (schmal ? 0.84 : 0.8),
      rx: Math.min(W * (schmal ? 0.2 : 0.17), 15 * u),
    };
  }

  function band(punkte, breite, farbe) {     // dicker Strich entlang einer Punktliste
    ctx.beginPath();
    for (var i = 0; i < punkte.length; i++) { if (i === 0) ctx.moveTo(punkte[i][0], punkte[i][1]); else ctx.lineTo(punkte[i][0], punkte[i][1]); }
    ctx.lineWidth = breite; ctx.strokeStyle = farbe; ctx.lineCap = "round"; ctx.lineJoin = "round"; ctx.stroke();
  }

  // Wie weit die Spitze ist (0 = oben, 1 = unten): langsam anlaufen, dann gleichmäßig zäh
  function kopfAnteil(q) { var x = teil(q, 0.02, 0.8); return x < 0.15 ? x * x / 0.3 : 0.075 + (x - 0.15) / 0.85 * 0.925; }

  function zeichne() {
    if (!W) groesse();
    if (!W) return;
    var M = masse(), u = M.u, x0 = M.x + schwung * 0.12;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    // Simon, 25.11.: „sooo gaaanz langsam runterziehen“ – die Spitze braucht fast den ganzen Wisch bis unten
    var KOPF_BIS = 0.8;
    var fluss = teil(p, 0.02, 0.06) * (1 - teil(p, 0.93, 0.99));  // Strahl läuft
    var L = weich(teil(p, KOPF_BIS, 1));                         // erst wenn er unten ist, sammelt er sich – und nur flach
    var stapel = Math.min(1, spur.length / 60);                  // wie hoch die Schlaufen liegen

    // Honigoberfläche (Seitenansicht): steigt vom unteren Rand auf, unter dem Strahl ein kleiner Hügel,
    // um den Auftreffpunkt laufen flache Ringe. Körper durchscheinend: oben hell, nach unten satt und dunkel.
    var yS = H + u - L * H * (W < 700 ? 0.06 : 0.08);
    var hoch0 = (0.9 * u + stapel * 0.8 * u) * fluss * teil(p, KOPF_BIS - 0.02, KOPF_BIS + 0.04);
    var huegel = function (x) { var d = (x - x0) / (4.5 * u); return hoch0 * Math.exp(-d * d); };
    var welle = function (x) {
      var w = 0;
      for (var r = 0; r < ringe.length; r++) { var g = ringe[r], d = Math.abs(x - x0) - g.r; if (Math.abs(d) < 2 * u) w += Math.cos(d / u * 1.6) * 0.18 * u * (1 - g.r / g.max) * (1 - Math.abs(d) / (2 * u)); }
      return w;
    };
    var oberY = function (x) { return yS - huegel(x) - welle(x); };
    if (yS < H + u * 0.5) {
      ctx.beginPath(); ctx.moveTo(0, H);
      for (var x = 0; x <= W; x += 6) ctx.lineTo(x, oberY(x));
      ctx.lineTo(W, H); ctx.closePath();
      var gk = ctx.createLinearGradient(0, yS - hoch0, 0, H);
      gk.addColorStop(0, "rgba(250,196,84,.97)"); gk.addColorStop(0.18, "rgba(232,150,32,.98)"); gk.addColorStop(1, "rgba(122,58,6,1)");
      ctx.fillStyle = gk; ctx.fill();
      // Lichtband im Honig: Licht, das von oben einfällt und unter der Oberfläche leuchtet
      var gl = ctx.createRadialGradient(x0, yS + 2 * u, u, x0, yS + 2 * u, Math.max(W, H) * 0.35);
      gl.addColorStop(0, "rgba(255,220,130,.45)"); gl.addColorStop(1, "rgba(255,220,130,0)");
      ctx.save(); ctx.clip(); ctx.fillStyle = gl; ctx.fillRect(0, yS - 4 * u, W, H - yS + 4 * u); ctx.restore();
      // Glanzkante auf der Oberfläche, zur Seite hin auslaufend
      var gs = ctx.createLinearGradient(0, 0, W, 0);
      gs.addColorStop(0, "rgba(255,248,226,0)"); gs.addColorStop(Math.max(0.05, x0 / W - 0.25), "rgba(255,248,226,.15)");
      gs.addColorStop(Math.min(0.99, x0 / W - 0.04), "rgba(255,248,226,.85)"); gs.addColorStop(Math.min(1, x0 / W + 0.2), "rgba(255,248,226,.2)"); gs.addColorStop(1, "rgba(255,248,226,0)");
      ctx.beginPath(); for (var x2 = 0; x2 <= W; x2 += 6) { var yy = oberY(x2) + 1.2; if (x2 === 0) ctx.moveTo(x2, yy); else ctx.lineTo(x2, yy); }
      ctx.lineWidth = Math.max(1.2, 0.18 * u); ctx.strokeStyle = gs; ctx.stroke();
      // flache Ringe auf der Oberfläche
      for (var r2 = 0; r2 < ringe.length; r2++) {
        var g2 = ringe[r2], al = 0.5 * (1 - g2.r / g2.max);
        ctx.beginPath(); ctx.ellipse(x0, yS - 0.2 * u, g2.r, g2.r * 0.11, 0, Math.PI * 1.05, Math.PI * 1.95);
        ctx.lineWidth = 1.2; ctx.strokeStyle = "rgba(255,240,200," + al.toFixed(3) + ")"; ctx.stroke();
      }
    }

    // Auftreffpunkt: kreist (Seilwurf), steigt mit dem Stapel leicht an
    var R = (1.1 + 0.4 * Math.sin(t * 0.6)) * u;
    var hoch = hoch0;
    var kx = x0, ky = yS - hoch0 + 0.15 * u;
    if (fluss > 0.05) spur.push({ t: t });
    var leben = 3.2;
    while (spur.length && t - spur[0].t > leben) spur.shift();

    // (Schlaufen entfernt, 25.11.2026: „sieht immer noch so billig aus, diesen Stich mein ich“ – der Strahl geht weich in den Hügel über)

    // Strahl: von oben bis zum Auftreffpunkt. Oben breiter, unten dünner, kurz vor dem Aufprall leicht verdickt.
    if (fluss > 0) {
      var kopf = (ky + 2 * u) * kopfAnteil(p);                     // die Spitze zieht langsam und gleichmäßig nach unten
      var oben = ky * weich(teil(p, 0.93, 1));                     // ganz am Ende reißt er oben ab
      var unten = Math.min(ky, kopf);
      if (unten - oben > u * 0.5) {
        var n = 40, mitte = [];
        for (var j = 0; j <= n; j++) {
          var v = j / n, y = oben + (unten - oben) * v;
          var x = x0 + schwung * Math.sin(v * Math.PI) * 0.8 + (kx - x0) * Math.pow(v, 4) + Math.sin(t * 1.1 + v * 4) * 0.25 * u * v;
          mitte.push([x, y, v]);
        }
        var dicke = function (v) {
          var d = (1.25 - 0.62 * Math.pow(v, 0.55)) * u;             // verjüngt sich nach unten
          if (v > 0.9) d += Math.pow((v - 0.9) / 0.1, 3) * 1.1 * u;   // kleiner, weicher Fuß, der in den Hügel übergeht
          if (oben > 0) d *= 0.55 + 0.45 * (1 - teil(v, 0, 0.15));   // abreißendes Ende wird spitz
          return d * (0.6 + 0.4 * fluss);
        };
        var li = [], re = [];
        for (var q = 0; q < mitte.length; q++) {
          var A = mitte[Math.max(0, q - 1)], C = mitte[Math.min(mitte.length - 1, q + 1)];
          var dx = C[0] - A[0], dy = C[1] - A[1], l = Math.hypot(dx, dy) || 1, nx = -dy / l, ny = dx / l, h = dicke(mitte[q][2]) / 2;
          li.push([mitte[q][0] + nx * h, mitte[q][1] + ny * h]); re.push([mitte[q][0] - nx * h, mitte[q][1] - ny * h]);
        }
        var umriss = function () {
          ctx.beginPath(); ctx.moveTo(li[0][0], li[0][1]);
          for (var m = 1; m < li.length; m++) ctx.lineTo(li[m][0], li[m][1]);
          for (var r = re.length - 1; r >= 0; r--) ctx.lineTo(re[r][0], re[r][1]);
          ctx.closePath();
        };
        // Körper: quer zum Strahl Rand dunkel, Kern hell (durchscheinend)
        var bx = x0 - 1.2 * u, gx = ctx.createLinearGradient(bx, 0, bx + 2.4 * u, 0);
        gx.addColorStop(0, "rgba(128,62,4,.97)"); gx.addColorStop(0.3, "rgba(226,146,30,.95)");
        gx.addColorStop(0.5, "rgba(255,206,96,.9)"); gx.addColorStop(0.72, "rgba(232,152,34,.95)"); gx.addColorStop(1, "rgba(120,58,4,.97)");
        umriss(); ctx.fillStyle = gx; ctx.fill();
        // Glanzkante links, schwacher Gegenglanz rechts
        var kante = function (seite, staerke, farbe) {
          ctx.beginPath();
          for (var g = 0; g < mitte.length - 1; g++) {
            var px = mitte[g][0] + seite * dicke(mitte[g][2]) * 0.26;
            if (g === 0) ctx.moveTo(px, mitte[g][1]); else ctx.lineTo(px, mitte[g][1]);
          }
          ctx.lineWidth = staerke; ctx.strokeStyle = farbe; ctx.lineCap = "round"; ctx.stroke();
        };
        // Fließlinien: helle Schlieren wandern langsam nach unten – man sieht, dass der Honig zäh läuft
        ctx.save(); umriss(); ctx.clip();
        for (var fl = 0; fl < 3; fl++) {
          ctx.beginPath();
          for (var g2 = 0; g2 < mitte.length; g2++) { var px2 = mitte[g2][0] + (fl - 1) * dicke(mitte[g2][2]) * 0.22; if (g2 === 0) ctx.moveTo(px2, mitte[g2][1]); else ctx.lineTo(px2, mitte[g2][1]); }
          ctx.setLineDash([2.5 * u, (5 + fl * 2) * u]); ctx.lineDashOffset = -t * (1.6 + fl * 0.4) * u - fl * 3 * u;
          ctx.lineWidth = Math.max(1, (0.14 - fl * 0.03) * u); ctx.strokeStyle = "rgba(255,236,170," + (0.55 - fl * 0.12).toFixed(2) + ")"; ctx.stroke();
        }
        ctx.setLineDash([]); ctx.restore();
        kante(-1, Math.max(1, 0.2 * u), "rgba(255,250,232,.8)");
        kante(1, Math.max(0.8, 0.08 * u), "rgba(255,236,180,.45)");
        // fallende Spitze als Tropfen
        if (kopf < ky) {
          var tx = mitte[n][0], ty = kopf;
          ctx.beginPath();
          ctx.moveTo(tx, ty - 1.6 * u);
          ctx.bezierCurveTo(tx + 0.9 * u, ty - 0.4 * u, tx + 0.9 * u, ty + 0.9 * u, tx, ty + 0.9 * u);
          ctx.bezierCurveTo(tx - 0.9 * u, ty + 0.9 * u, tx - 0.9 * u, ty - 0.4 * u, tx, ty - 1.6 * u);
          var gt = ctx.createRadialGradient(tx - 0.3 * u, ty, 0.1 * u, tx, ty + 0.2 * u, 1.1 * u);
          gt.addColorStop(0, "rgba(255,214,110,.97)"); gt.addColorStop(1, "rgba(150,76,6,.97)");
          ctx.fillStyle = gt; ctx.fill();
          ctx.beginPath(); ctx.ellipse(tx - 0.35 * u, ty - 0.1 * u, 0.18 * u, 0.32 * u, 0.3, 0, Math.PI * 2); ctx.fillStyle = "rgba(255,250,232,.8)"; ctx.fill();
        }
      }
    }
  }

  function schritt(jetzt) {
    if (!sichtbar) { laeuft = false; return; }
    var dt = Math.min(0.05, (jetzt - letzt) / 1000 || 0.016);
    if (dt < 0.028) { requestAnimationFrame(schritt); return; }   // gut 30 Bilder pro Sekunde reichen für zähen Honig
    letzt = jetzt; t += dt; winkel += dt * 2.1;
    var flussJetzt = teil(p, 0.8, 0.84) * (1 - teil(p, 0.93, 0.99));
    if (flussJetzt > 0.2 && t - ringZeit > 0.9) { ringZeit = t; ringe.push({ r: 0, max: (W < 700 ? 9 : 14) * masse().u }); }
    for (var ri = ringe.length - 1; ri >= 0; ri--) { ringe[ri].r += dt * 2.2 * masse().u; if (ringe[ri].r > ringe[ri].max) ringe.splice(ri, 1); }
    schwungV += (-(schwung - ziel) * 9 - schwungV * 3.2) * dt; schwung += schwungV * dt; ziel *= 0.9;
    zeichne();
    var ruhe = p <= 0.02 || p >= 0.995;
    if (ruhe && spur.length === 0 && ringe.length === 0 && Math.abs(schwungV) < 0.5) { laeuft = false; return; }
    requestAnimationFrame(schritt);
  }
  function an() { if (!laeuft && sichtbar) { laeuft = true; letzt = performance.now(); requestAnimationFrame(schritt); } }

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (e) { sichtbar = e[0].isIntersecting; if (sichtbar) an(); }, { threshold: 0 }).observe(canvas);
  } else sichtbar = true;
  window.addEventListener("resize", function () { groesse(); zeichne(); });

  return {
    setze: function (neuP, tempo) { p = neuP; if (tempo) ziel = Math.max(-28, Math.min(28, tempo * 0.03)); zeichne(); an(); },
    kopf: function (neuP) { var M = W ? masse() : null; return { anteil: kopfAnteil(neuP), unten: H ? (H - (W < 700 ? 0.02 : 0.03) * H) / H : 0.95 }; },
    still: function (neuP) { p = neuP; for (var k = 0; k < 70; k++) { t += 0.045; winkel += 0.045 * 2.1; zeichne(); } }
  };
};
