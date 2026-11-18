/* Seitenlogik: Inhalte aus daten.js einsetzen, Menü, Filter, Formular, Animationen. */
(function () {
  "use strict";
  var D = window.JFG;
  if (!D) return;
  var $ = function (s, el) { return (el || document).querySelector(s); };
  var $$ = function (s, el) { return Array.prototype.slice.call((el || document).querySelectorAll(s)); };
  var ruhig = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var TAGE = ["", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"];
  var TAGE_KURZ = ["", "Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
  var SPEICHER = "jfg-seenland-team";

  function esc(t) {
    return String(t).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function team(id) { return D.mannschaften.filter(function (m) { return m.id === id; })[0]; }
  function zeitenVon(id) {
    return D.training.filter(function (t) { return t.team === id; })
      .sort(function (a, b) { return a.tag - b.tag || a.von.localeCompare(b.von); });
  }
  function lesen() { try { return localStorage.getItem(SPEICHER); } catch (e) { return null; } }
  function merken(v) { try { localStorage.setItem(SPEICHER, v); } catch (e) { /* egal */ } }
  function liste(arr) {
    if (arr.length < 2) return arr.join("");
    return arr.slice(0, -1).join(", ") + " und " + arr[arr.length - 1];
  }

  /* ---------- Einfache Felder ---------- */
  $$("[data-feld]").forEach(function (el) {
    var f = el.getAttribute("data-feld");
    if (f === "stammvereine") el.textContent = liste(D.verein.stammvereine);
    else if (D.verein[f]) el.textContent = D.verein[f];
  });
  $("#jahr").textContent = new Date().getFullYear();
  if (D.entwurf) $("#entwurf").hidden = false;
  $("#entwurfZu").addEventListener("click", function () { $("#entwurf").hidden = true; });

  /* ---------- Mannschaften ---------- */
  var teamsEl = $("#teams");
  teamsEl.innerHTML = D.mannschaften.map(function (m, i) {
    var z = zeitenVon(m.id).map(function (t) { return TAGE_KURZ[t.tag]; });
    var zeit = zeitenVon(m.id)[0];
    return '<div class="team zeigen" role="listitem" style="--team:' + esc(m.farbe) + ';--i:' + i + '">' +
      '<div class="team__nummer" aria-hidden="true">' + esc(m.name) + '</div>' +
      '<div class="team__inhalt">' +
        '<h3 class="team__name">' + esc(m.name) + ' <span>' + esc(m.klasse) + '</span></h3>' +
        '<p class="team__jahrgang">Jahrgang <b>' + esc(m.jahrgang) + '</b></p>' +
        '<p class="team__motto">' + esc(m.motto) + '</p>' +
        '<dl class="team__daten">' +
          '<div><dt>Training</dt><dd>' + esc(z.join(" & ") || "folgt") + (zeit ? ' ab ' + esc(zeit.von) : '') + '</dd></div>' +
          '<div><dt>Trainer</dt><dd>' + esc(m.trainer) + '</dd></div>' +
        '</dl>' +
        '<a class="team__link" href="#training" data-team="' + esc(m.id) + '">Training ' + esc(m.name) + ' ansehen' +
          '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M4 10h11M11 5l5 5-5 5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/></svg></a>' +
      '</div></div>';
  }).join("");

  /* ---------- Training ---------- */
  var filterEl = $("#filter"), wocheEl = $("#woche"), kalKnopf = $("#kalender");
  var auswahl = lesen();
  if (auswahl !== "alle" && !team(auswahl)) auswahl = "alle";

  filterEl.innerHTML = '<button type="button" class="chip" data-wahl="alle">Alle</button>' +
    D.mannschaften.map(function (m) {
      return '<button type="button" class="chip" data-wahl="' + esc(m.id) + '" style="--team:' + esc(m.farbe) + '">' + esc(m.name) + '</button>';
    }).join("");

  function wocheZeigen() {
    $$(".chip", filterEl).forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-wahl") === auswahl));
    });
    var tage = [];
    D.training.forEach(function (t) { if (tage.indexOf(t.tag) < 0) tage.push(t.tag); });
    tage.sort();
    wocheEl.innerHTML = tage.map(function (tag) {
      var eintraege = D.training.filter(function (t) { return t.tag === tag; })
        .sort(function (a, b) { return a.von.localeCompare(b.von); });
      var aktiv = eintraege.some(function (t) { return auswahl === "alle" || t.team === auswahl; });
      return '<div class="tag' + (aktiv ? "" : " tag--leer") + '">' +
        '<h3 class="tag__name"><span class="lang">' + TAGE[tag] + '</span><span class="kurz" aria-hidden="true">' + TAGE_KURZ[tag] + '</span></h3>' +
        '<ul>' + eintraege.map(function (t) {
          var m = team(t.team);
          var an = auswahl === "alle" || t.team === auswahl;
          return '<li class="einheit' + (an ? "" : " einheit--aus") + '" style="--team:' + esc(m.farbe) + '"' + (an ? "" : ' aria-hidden="true"') + '>' +
            '<b class="einheit__team">' + esc(m.name) + '</b>' +
            '<span class="einheit__zeit">' + esc(t.von) + '–' + esc(t.bis) + '</span>' +
            '<span class="einheit__ort">' + esc(t.ort) + '</span></li>';
        }).join("") + '</ul></div>';
    }).join("");
    kalKnopf.hidden = auswahl === "alle";
    if (auswahl !== "alle") $("span", kalKnopf).textContent = "Training " + team(auswahl).name + " in meinen Kalender";
  }
  filterEl.addEventListener("click", function (e) {
    var b = e.target.closest(".chip"); if (!b) return;
    auswahl = b.getAttribute("data-wahl"); merken(auswahl); wocheZeigen();
  });
  teamsEl.addEventListener("click", function (e) {
    var a = e.target.closest("[data-team]"); if (!a) return;
    auswahl = a.getAttribute("data-team"); merken(auswahl); wocheZeigen();
  });
  $("#trainingHinweis").textContent = D.trainingHinweis || "";
  wocheZeigen();

  /* Kalenderdatei (.ics) – wöchentliche Termine für die gewählte Mannschaft */
  kalKnopf.addEventListener("click", function () {
    var m = team(auswahl); if (!m) return;
    var heute = new Date();
    var zeilen = ["BEGIN:VCALENDAR", "VERSION:2.0", "PRODID:-//JFG Seenland//Training//DE", "CALSCALE:GREGORIAN"];
    zeitenVon(m.id).forEach(function (t, i) {
      var d = new Date(heute.getFullYear(), heute.getMonth(), heute.getDate());
      var tagJs = t.tag % 7; // JS: 0 = Sonntag
      while (d.getDay() !== tagJs) d.setDate(d.getDate() + 1);
      function stempel(hm) {
        var p = hm.split(":");
        return d.getFullYear() + String(d.getMonth() + 1).padStart(2, "0") + String(d.getDate()).padStart(2, "0") +
          "T" + p[0].padStart(2, "0") + p[1].padStart(2, "0") + "00";
      }
      zeilen.push("BEGIN:VEVENT",
        "UID:jfg-seenland-" + m.id + "-" + i + "@jfg-seenland",
        "DTSTAMP:" + heute.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z",
        "DTSTART:" + stempel(t.von),
        "DTEND:" + stempel(t.bis),
        "RRULE:FREQ=WEEKLY",
        "SUMMARY:Training " + m.name + " (JFG Seenland)",
        "LOCATION:" + t.ort.replace(/[,;\\]/g, "\\$&"),
        "END:VEVENT");
    });
    zeilen.push("END:VCALENDAR");
    var blob = new Blob([zeilen.join("\r\n")], { type: "text/calendar;charset=utf-8" });
    var a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "Training-" + m.name + "-JFG-Seenland.ics";
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(function () { URL.revokeObjectURL(a.href); }, 2000);
  });

  /* ---------- Neuigkeiten ---------- */
  var fmt = new Intl.DateTimeFormat("de-DE", { day: "numeric", month: "long", year: "numeric" });
  $("#news").innerHTML = D.neuigkeiten.map(function (n, i) {
    var d = new Date(n.datum + "T12:00:00");
    var deko = i === 0 ? ' data-deko="' + String(d.getDate()).padStart(2, "0") + "." + String(d.getMonth() + 1).padStart(2, "0") + '."' : "";
    return '<article class="meldung' + (i === 0 ? " meldung--gross" : "") + ' zeigen" style="--i:' + i + '"' + deko + '>' +
      '<div class="meldung__kopf"><span class="rubrik">' + esc(n.rubrik) + '</span>' +
      '<time datetime="' + esc(n.datum) + '">' + fmt.format(d) + '</time></div>' +
      '<h3>' + esc(n.titel) + '</h3><p>' + esc(n.text) + '</p></article>';
  }).join("");

  /* ---------- Fragen ---------- */
  $("#fragenListe").innerHTML = D.fragen.map(function (q) {
    return '<details class="frage zeigen"><summary>' + esc(q.f) +
      '<span class="frage__plus" aria-hidden="true"></span></summary><p>' + esc(q.a) + '</p></details>';
  }).join("");

  /* ---------- Kontakt im Fuß ---------- */
  var k = [];
  k.push('<li><a href="mailto:' + esc(D.verein.email) + '">' + esc(D.verein.email) + '</a></li>');
  if (D.verein.telefon) k.push('<li><a href="tel:' + esc(D.verein.telefon.replace(/[^\d+]/g, "")) + '">' + esc(D.verein.telefon) + '</a></li>');
  if (D.verein.instagram) k.push('<li><a href="' + esc(D.verein.instagram) + '" rel="noopener">Instagram</a></li>');
  k.push('<li><a href="#mitmachen">Probetraining anfragen</a></li>');
  $("#kontaktListe").innerHTML = k.join("");

  $$("[data-mail]").forEach(function (a) {
    a.href = "mailto:" + D.verein.email + "?subject=" + encodeURIComponent("JFG Seenland: " + a.getAttribute("data-mail"));
  });

  /* ---------- Formular: Jahrgang -> passende Mannschaft ---------- */
  var jahrEl = $("#f-jahr"), vorschlag = $("#vorschlag");
  var jahre = [];
  D.mannschaften.forEach(function (m) {
    m.jahrgang.split("/").forEach(function (j) { jahre.push({ jahr: parseInt(j, 10), team: m }); });
  });
  jahre.sort(function (a, b) { return b.jahr - a.jahr; });
  jahrEl.insertAdjacentHTML("beforeend", jahre.map(function (j) {
    return '<option value="' + j.jahr + '">' + j.jahr + '</option>';
  }).join("") + '<option value="anders">anderes Jahr</option>');

  function passendesTeam() {
    var j = jahre.filter(function (x) { return String(x.jahr) === jahrEl.value; })[0];
    return j ? j.team : null;
  }
  jahrEl.addEventListener("change", function () {
    var m = passendesTeam();
    if (m) {
      var z = zeitenVon(m.id).map(function (t) { return TAGE[t.tag] + " " + t.von + " Uhr (" + t.ort + ")"; });
      vorschlag.innerHTML = 'Das passt zur <b>' + esc(m.name) + '</b> (' + esc(m.klasse) + '). Training: ' + esc(liste(z) || "folgt") + '.';
      vorschlag.style.setProperty("--team", m.farbe);
      vorschlag.hidden = false;
    } else if (jahrEl.value === "anders") {
      vorschlag.textContent = "Kein Problem – schreib uns einfach, wir finden eine Lösung.";
      vorschlag.style.removeProperty("--team");
      vorschlag.hidden = false;
    } else { vorschlag.hidden = true; }
  });

  $("#formular").addEventListener("input", function (e) {
    if (e.target.getAttribute("aria-invalid") === "true" && e.target.value.trim()) e.target.removeAttribute("aria-invalid");
  });
  $("#formular").addEventListener("change", function (e) {
    if (e.target.getAttribute("aria-invalid") === "true" && e.target.value.trim()) e.target.removeAttribute("aria-invalid");
  });

  $("#formular").addEventListener("submit", function (e) {
    e.preventDefault();
    var f = e.target, fehler = $("#formFehler");
    var E = f.elements;
    var name = E["name"].value.trim(), kontakt = E["kontakt"].value.trim();
    var fehlt = [];
    [["name", name], ["jahr", E["jahr"].value], ["kontakt", kontakt]].forEach(function (p) {
      var el = E[p[0]]; var leer = !p[1];
      if (leer) el.setAttribute("aria-invalid", "true"); else el.removeAttribute("aria-invalid");
      if (leer) fehlt.push(el);
    });
    if (fehlt.length) {
      fehler.textContent = "Bitte noch ausfüllen: " + fehlt.map(function (el) { return $('label[for="' + el.id + '"]').textContent; }).join(", ") + ".";
      fehler.hidden = false; fehlt[0].focus(); return;
    }
    fehler.hidden = true;
    var m = passendesTeam();
    var text = "Hallo JFG Seenland,\n\nwir möchten gern ein Probetraining ausmachen.\n\n" +
      "Vorname: " + name + "\nGeburtsjahr: " + (E["jahr"].value === "anders" ? "anderes" : E["jahr"].value) +
      (m ? "\nMannschaft: " + m.name : "") + "\nErreichbar unter: " + kontakt +
      (E["text"].value.trim() ? "\n\n" + E["text"].value.trim() : "") + "\n\nViele Grüße";
    window.location.href = "mailto:" + D.verein.email +
      "?subject=" + encodeURIComponent("Probetraining" + (m ? " " + m.name : "") + ": " + name) +
      "&body=" + encodeURIComponent(text);
  });

  /* ---------- Menü (Handy) ---------- */
  var menuKnopf = $("#menuKnopf"), kopf = $("#kopf");
  function menu(auf) {
    menuKnopf.setAttribute("aria-expanded", String(auf));
    kopf.classList.toggle("kopf--offen", auf);
    document.body.classList.toggle("menue-offen", auf);
  }
  menuKnopf.addEventListener("click", function () { menu(menuKnopf.getAttribute("aria-expanded") !== "true"); });
  $$("#nav a").forEach(function (a) { a.addEventListener("click", function () { menu(false); }); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && kopf.classList.contains("kopf--offen")) { menu(false); menuKnopf.focus(); }
  });

  /* Kopfzeile bekommt Hintergrund, sobald man scrollt */
  var kopfNachUnten = function () { kopf.classList.toggle("kopf--fest", window.scrollY > 40); };
  window.addEventListener("scroll", kopfNachUnten, { passive: true }); kopfNachUnten();

  /* ---------- Einblenden beim Scrollen + Zähler ---------- */
  function zaehlen(el) {
    var ziel = parseInt(el.getAttribute("data-zaehlen"), 10), t0 = null;
    if (ruhig) { el.textContent = ziel; return; }
    function f(t) {
      if (!t0) t0 = t;
      var p = Math.min(1, (t - t0) / 1200), e = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(ziel * e);
      if (p < 1) requestAnimationFrame(f);
    }
    requestAnimationFrame(f);
  }
  if ("IntersectionObserver" in window && !ruhig) {
    document.documentElement.classList.add("js-zeigen");
    var io = new IntersectionObserver(function (eintraege) {
      eintraege.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("da");
        var z = e.target.querySelector("[data-zaehlen]"); if (z) zaehlen(z);
        io.unobserve(e.target);
      });
    }, { rootMargin: "0px 0px -8% 0px" });
    $$(".zeigen").forEach(function (el) { io.observe(el); });
  }

  /* Hero: Ball wandert beim Scrollen leicht nach unten/außen (Parallaxe) */
  var ballBox = $("#ballBox");
  if (ballBox && !ruhig) {
    var tick = false;
    window.addEventListener("scroll", function () {
      if (tick) return; tick = true;
      requestAnimationFrame(function () {
        var y = Math.min(window.scrollY, window.innerHeight);
        ballBox.style.setProperty("--scroll", (y / window.innerHeight).toFixed(3));
        tick = false;
      });
    }, { passive: true });
  }
})();
