/* 3D-Fußball im Kopfbereich.
   Ohne Bibliothek: ein kleiner WebGL-Shader berechnet für jeden Bildpunkt,
   welches Fünf- bzw. Sechseck des Balls (abgestumpftes Ikosaeder) dort liegt.
   - dreht sich langsam von selbst
   - lässt sich mit Maus/Finger anschubsen
   - rollt beim Scrollen mit
   - bei "Bewegung reduzieren" steht er still */
(function () {
  "use strict";
  var canvas = document.getElementById("ball");
  if (!canvas) return;
  var box = document.getElementById("ballBox");
  var tipp = document.getElementById("ballTipp");
  var ruhig = window.matchMedia("(prefers-reduced-motion: reduce)");

  var gl = canvas.getContext("webgl", { premultipliedAlpha: true, antialias: false, alpha: true });
  if (!gl) { box.classList.add("ball--ohne-3d"); return; }

  var phi = (1 + Math.sqrt(5)) / 2;
  function norm(v) { var l = Math.hypot(v[0], v[1], v[2]); return [v[0] / l, v[1] / l, v[2] / l]; }
  function zyklisch(list) {
    var out = [];
    list.forEach(function (v) {
      out.push(v, [v[1], v[2], v[0]], [v[2], v[0], v[1]]);
    });
    return out;
  }
  function alleVorzeichen(v) {
    var out = [];
    [1, -1].forEach(function (a) { [1, -1].forEach(function (b) { [1, -1].forEach(function (c) {
      var w = [v[0] * a, v[1] * b, v[2] * c];
      if (!out.some(function (u) { return u[0] === w[0] && u[1] === w[1] && u[2] === w[2]; })) out.push(w);
    }); }); });
    return out;
  }
  // 12 Fünfecke = Ecken eines Ikosaeders, 20 Sechsecke = Ecken eines Dodekaeders
  var fuenf = [], sechs = [];
  zyklisch([[0, 1, phi]]).forEach(function (v) { fuenf = fuenf.concat(alleVorzeichen(v)); });
  sechs = alleVorzeichen([1, 1, 1]);
  zyklisch([[0, 1 / phi, phi]]).forEach(function (v) { sechs = sechs.concat(alleVorzeichen(v)); });
  fuenf = fuenf.map(norm); sechs = sechs.map(norm);

  var vs = "attribute vec2 p; void main(){ gl_Position = vec4(p,0.0,1.0); }";
  var fs = [
    "precision highp float;",
    "uniform vec2 uRes; uniform mat3 uRot; uniform vec3 uP[12]; uniform vec3 uH[20];",
    "void main(){",
    "  vec2 uv = (gl_FragCoord.xy*2.0 - uRes) / min(uRes.x,uRes.y);",
    "  uv /= 0.94;",
    "  float r2 = dot(uv,uv);",
    "  float px = 2.6 / min(uRes.x,uRes.y);",
    "  float a = 1.0 - smoothstep(1.0 - px*2.0, 1.0, r2);",
    "  if (a <= 0.0) { gl_FragColor = vec4(0.0); return; }",
    "  vec3 n = vec3(uv, sqrt(max(0.0,1.0 - r2)));",
    "  vec3 m = uRot * n;",
    "  float b1 = -9.0; float b2 = -9.0; float isP = 0.0;",
    "  for (int i=0;i<12;i++){ float s = dot(m,uP[i]) * 0.97415; if(s>b1){b2=b1;b1=s;isP=1.0;} else if(s>b2){b2=s;} }",
    "  for (int i=0;i<20;i++){ float s = dot(m,uH[i]); if(s>b1){b2=b1;b1=s;isP=0.0;} else if(s>b2){b2=s;} }",
    "  float d = b1 - b2;",
    "  float naht = 1.0 - smoothstep(0.006, 0.016, d);",
    "  vec3 weiss = vec3(0.93,0.95,0.92);",
    "  vec3 dunkel = vec3(0.04,0.13,0.20);",
    "  vec3 grund = mix(weiss, dunkel, isP);",
    "  vec3 L = normalize(vec3(-0.45,0.65,0.75));",
    "  float diff = max(dot(n,L),0.0);",
    "  float spec = pow(max(dot(reflect(-L,n), vec3(0.0,0.0,1.0)),0.0), 36.0);",
    "  vec3 col = grund * (0.18 + 0.9*diff);",
    "  col = mix(col, col*0.25, naht);",
    "  col += vec3(1.0) * spec * (0.55 - 0.3*isP);",
    "  float rand = pow(1.0 - n.z, 2.6);",
    "  col += vec3(0.83,1.0,0.25) * rand * 0.75 * smoothstep(-0.2,0.6, -uv.x*0.6 - uv.y*0.4 + 0.3);",
    "  col += vec3(0.24,0.78,0.84) * rand * 0.5 * smoothstep(-0.2,0.6, uv.x*0.7 + uv.y*0.2);",
    "  gl_FragColor = vec4(col * a, a);",
    "}"
  ].join("\n");

  function shader(typ, quelle) {
    var s = gl.createShader(typ); gl.shaderSource(s, quelle); gl.compileShader(s);
    if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) { throw new Error(gl.getShaderInfoLog(s)); }
    return s;
  }
  var prog;
  try {
    prog = gl.createProgram();
    gl.attachShader(prog, shader(gl.VERTEX_SHADER, vs));
    gl.attachShader(prog, shader(gl.FRAGMENT_SHADER, fs));
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(prog));
  } catch (e) { box.classList.add("ball--ohne-3d"); return; }
  gl.useProgram(prog);

  var buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  var loc = gl.getAttribLocation(prog, "p");
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  gl.uniform3fv(gl.getUniformLocation(prog, "uP"), new Float32Array([].concat.apply([], fuenf)));
  gl.uniform3fv(gl.getUniformLocation(prog, "uH"), new Float32Array([].concat.apply([], sechs)));
  var uRes = gl.getUniformLocation(prog, "uRes");
  var uRot = gl.getUniformLocation(prog, "uRot");

  // --- Drehung als Quaternion ---
  var q = [0.25, -0.3, 0.1, 0.9];
  (function () { var l = Math.hypot(q[0], q[1], q[2], q[3]); q = q.map(function (x) { return x / l; }); })();
  function drehen(ax, ay, az) {
    var w = Math.hypot(ax, ay, az); if (w < 1e-7) return;
    var s = Math.sin(w / 2) / w, r = [ax * s, ay * s, az * s, Math.cos(w / 2)];
    // q = r * q  (Drehung in Blickrichtung-Koordinaten)
    q = [
      r[3] * q[0] + r[0] * q[3] + r[1] * q[2] - r[2] * q[1],
      r[3] * q[1] - r[0] * q[2] + r[1] * q[3] + r[2] * q[0],
      r[3] * q[2] + r[0] * q[1] - r[1] * q[0] + r[2] * q[3],
      r[3] * q[3] - r[0] * q[0] - r[1] * q[1] - r[2] * q[2]
    ];
    var l = Math.hypot(q[0], q[1], q[2], q[3]); q = q.map(function (x) { return x / l; });
  }
  function matrix() {
    // Matrix, die Blick-Koordinaten in Ball-Koordinaten dreht (= transponierte Drehung)
    var x = q[0], y = q[1], z = q[2], w = q[3];
    var R = [
      1 - 2 * (y * y + z * z), 2 * (x * y - z * w), 2 * (x * z + y * w),
      2 * (x * y + z * w), 1 - 2 * (x * x + z * z), 2 * (y * z - x * w),
      2 * (x * z - y * w), 2 * (y * z + x * w), 1 - 2 * (x * x + y * y)
    ];
    // WebGL erwartet spaltenweise; R zeilenweise übergeben = R transponiert
    return new Float32Array(R);
  }

  // Größe nur bei Größenänderung messen (nicht in jedem Bild – das kostet Zeit)
  var groesse = 0, aufloesung = Math.min(window.devicePixelRatio || 1, 1.5), breite = 0;
  function messen() { breite = canvas.getBoundingClientRect().width; anpassen(); }
  function anpassen() {
    var g = Math.max(2, Math.round(breite * aufloesung));
    if (g !== groesse) { groesse = g; canvas.width = g; canvas.height = g; gl.viewport(0, 0, g, g); }
  }

  function zeichnen() {
    gl.uniform2f(uRes, canvas.width, canvas.height);
    gl.uniformMatrix3fv(uRot, false, matrix());
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  }

  // --- Bewegung ---
  var vx = 0, vy = 0;              // Schwung (Bogenmaß pro Bild)
  var grundX = 0.0025, grundY = 0.006;
  var ziehen = false, lx = 0, ly = 0, schonGezogen = false;
  var sichtbar = true, laeuft = false, letzterScroll = window.scrollY;

  canvas.addEventListener("pointerdown", function (e) {
    ziehen = true; lx = e.clientX; ly = e.clientY;
    canvas.setPointerCapture(e.pointerId);
    box.classList.add("ball--greift");
    if (!schonGezogen && tipp) { schonGezogen = true; tipp.classList.add("weg"); }
    start();
  });
  canvas.addEventListener("pointermove", function (e) {
    if (!ziehen) return;
    var dx = e.clientX - lx, dy = e.clientY - ly; lx = e.clientX; ly = e.clientY;
    var k = 3.2 / (breite || 300);
    // nach rechts ziehen = Drehung um die senkrechte Achse
    vx = dy * k; vy = dx * k;
    drehen(vx, vy, 0);
    if (ruhig.matches) zeichnen();
  });
  function loslassen() { ziehen = false; box.classList.remove("ball--greift"); }
  canvas.addEventListener("pointerup", loslassen);
  canvas.addEventListener("pointercancel", loslassen);

  window.addEventListener("scroll", function () {
    var y = window.scrollY, d = y - letzterScroll; letzterScroll = y;
    if (ruhig.matches) return;
    vx += Math.max(-0.08, Math.min(0.08, -d * 0.0016));
    start();
  }, { passive: true });

  if ("IntersectionObserver" in window) {
    new IntersectionObserver(function (eintraege) {
      sichtbar = eintraege[0].isIntersecting;
      if (sichtbar) start();
    }).observe(box);
  }
  document.addEventListener("visibilitychange", function () { if (!document.hidden) start(); });

  // Schwache Geräte: wenn die Bilder zu langsam kommen, erst Auflösung senken, dann Selbstdrehung aus.
  var messBilder = 0, messStart = 0, stufe = 0, selbstDrehen = true;
  function pruefeTempo(t) {
    if (!messStart) { messStart = t; messBilder = 0; return; }
    messBilder++;
    if (messBilder < 6) return;
    var ms = (t - messStart) / messBilder;
    messStart = t; messBilder = 0;
    if (ms > 60 || (ms > 34 && stufe === 1)) { stufe = 2; selbstDrehen = false; if (!ziehen) { vx = 0; vy = 0; } }
    else if (ms > 34 && stufe === 0) { stufe = 1; aufloesung = 0.75; anpassen(); }
  }

  function schritt(t) {
    if (!sichtbar || document.hidden || ruhig.matches) { laeuft = false; messStart = 0; return; }
    pruefeTempo(t);
    var ruhend = !selbstDrehen && !ziehen && Math.abs(vx) < 0.0005 && Math.abs(vy) < 0.0005;
    if (ruhend) { laeuft = false; messStart = 0; return; }
    if (!ziehen) {
      var zx = selbstDrehen ? grundX : 0, zy = selbstDrehen ? grundY : 0;
      vx += (zx - vx) * 0.04;
      vy += (zy - vy) * 0.04;
      drehen(vx, vy, 0);
    }
    zeichnen();
    requestAnimationFrame(schritt);
  }
  function start() {
    if (laeuft || ruhig.matches || !bereit) return;
    laeuft = true; requestAnimationFrame(schritt);
  }

  window.addEventListener("resize", function () { messen(); zeichnen(); });
  ruhig.addEventListener && ruhig.addEventListener("change", function () { zeichnen(); start(); });

  // Erst zeichnen, wenn die Seite fertig geladen ist – Text und Knöpfe haben Vorrang.
  var bereit = false;
  function los() {
    messen(); zeichnen();
    box.classList.add("ball--bereit");
    bereit = true;
    setTimeout(start, 400);
  }
  if (document.readyState === "complete") los(); else window.addEventListener("load", los);
})();
