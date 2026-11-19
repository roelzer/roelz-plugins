/* Fuge – Landingpage. Ohne Build, ohne Tracker.
   Bewegung: GSAP + ScrollTrigger (lokal). Bei reduzierter Bewegung oder ohne GSAP
   bleibt alles sichtbar und statisch. */
(() => {
  'use strict';

  const EMAIL = 'hallo@ihre-domain.de'; // TODO: echte Adresse eintragen (auch in index.html)

  const root = document.documentElement;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hasGsap = !!(window.gsap && window.ScrollTrigger);
  if (!hasGsap) root.classList.remove('motion');
  const motion = root.classList.contains('motion');

  const fmt = new Intl.NumberFormat('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  /* ---------------------------------------------------------
     Leitungen zwischen Tabelle und Angebot (SVG)
     --------------------------------------------------------- */
  const stage = $('#stage');
  const svg = $('#wires');
  const sheet = $('#winSheet');
  const doc = $('#winDoc');
  const sheetRows = $$('.sheet__row[data-row]', sheet);
  const docRows = $$('.doc__row[data-row]', doc);
  const NS = 'http://www.w3.org/2000/svg';
  const wires = [];
  const pos = { cx0: 0, cy0: 0, cx1: 0, cy1: 0 };

  function offsetIn(el, ancestor) {
    let x = 0, y = 0, n = el;
    while (n && n !== ancestor) { x += n.offsetLeft; y += n.offsetTop; n = n.offsetParent; }
    return { x, y };
  }

  function mk(tag, attrs) {
    const e = document.createElementNS(NS, tag);
    for (const k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  sheetRows.forEach(() => {
    const glow = mk('path', { class: 'wire-glow', pathLength: 1 });
    const wire = mk('path', { class: 'wire', pathLength: 1 });
    const streak = mk('path', { class: 'streak', pathLength: 1, 'stroke-dasharray': '0.15 1.15', 'stroke-dashoffset': '0.15' });
    const p0 = mk('circle', { class: 'port', r: 3 });
    const p1 = mk('circle', { class: 'port', r: 3 });
    svg.append(glow, wire, streak, p0, p1);
    wires.push({ glow, wire, streak, p0, p1 });
  });

  function layoutWires() {
    const w = stage.offsetWidth, h = stage.offsetHeight;
    svg.setAttribute('viewBox', `0 0 ${w} ${h}`);
    const vertical = getComputedStyle(stage).flexDirection === 'column';
    const sO = offsetIn(sheet, stage), dO = offsetIn(doc, stage);

    sheetRows.forEach((row, i) => {
      const dRow = docRows[i];
      const sCell = $('.c-qty', row), dCell = $('.d-qty', dRow);
      const rO = offsetIn(row, stage), drO = offsetIn(dRow, stage);
      let sx, sy, ex, ey, d;
      if (vertical) {
        const spread = (i - 1.5) * 7;
        const sc = offsetIn(sCell, stage), dc = offsetIn(dCell, stage);
        sx = sc.x + sCell.offsetWidth / 2 + spread; sy = sO.y + sheet.offsetHeight;
        ex = dc.x + dCell.offsetWidth / 2 + spread; ey = dO.y;
        const dy = (ey - sy) * .55;
        d = `M${sx},${sy} C${sx},${sy + dy} ${ex},${ey - dy} ${ex},${ey}`;
      } else {
        sx = sO.x + sheet.offsetWidth; sy = rO.y + row.offsetHeight / 2;
        ex = dO.x; ey = drO.y + dRow.offsetHeight / 2;
        const dx = (ex - sx) * .55;
        d = `M${sx},${sy} C${sx + dx},${sy} ${ex - dx},${ey} ${ex},${ey}`;
      }
      const wr = wires[i];
      [wr.glow, wr.wire, wr.streak].forEach(p => p.setAttribute('d', d));
      wr.p0.setAttribute('cx', sx); wr.p0.setAttribute('cy', sy);
      wr.p1.setAttribute('cx', ex); wr.p1.setAttribute('cy', ey);
    });

    // Mauszeiger-Weg für Schritt 1: von der Zelle in der Tabelle ins Angebotsfeld
    const sc0 = $('.c-qty', sheetRows[0]), dc0 = $('.d-qty', docRows[0]);
    const a = offsetIn(sc0, stage), b = offsetIn(dc0, stage);
    pos.cx0 = a.x + sc0.offsetWidth * .55; pos.cy0 = a.y + sc0.offsetHeight * .45;
    pos.cx1 = b.x + 2; pos.cy1 = b.y + dc0.offsetHeight * .3;

    // Hinweis „Zahlendreher“ direkt unter den falschen Wert setzen
    const flag = $('#flag');
    const fo = offsetIn(dc0, doc);
    flag.style.left = Math.round(fo.x + dc0.offsetWidth - flag.offsetWidth + 6) + 'px';
    flag.style.top = Math.round(fo.y + dc0.offsetHeight + 2) + 'px';

    // Handy: Meldung mitten in die Fuge zwischen den Fenstern
    const toast = $('#toast');
    if (vertical) {
      const gapMid = (sO.y + sheet.offsetHeight + dO.y) / 2;
      toast.style.top = Math.round(gapMid - toast.offsetHeight / 2) + 'px';
      toast.style.left = Math.round((w - toast.offsetWidth) / 2) + 'px';
    } else {
      toast.style.top = ''; toast.style.left = '';
    }
  }

  layoutWires();
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(layoutWires);
  window.addEventListener('load', layoutWires);
  if (!motion) {
    let rT;
    window.addEventListener('resize', () => { clearTimeout(rT); rT = setTimeout(layoutWires, 120); });
  }

  /* ---------------------------------------------------------
     Die Szene: gepinnt, per Scroll gesteuert
     --------------------------------------------------------- */
  let sceneST = null;
  if (motion) {
    const { gsap, ScrollTrigger } = window;
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
    ScrollTrigger.addEventListener('refreshInit', layoutWires);

    const hero = $('.hero');
    const caps = $$('.caption');
    const cursor = $('#cursor');
    const typo = $('.typo', docRows[0]);
    const flag = $('#flag');
    const toast = $('#toast');
    const sum = $('#sum');
    const sheetQty0 = $('.c-qty', sheetRows[0]);
    const isNarrow = () => window.innerWidth <= 760;

    // Einstieg beim Laden
    gsap.from('.hero__title .line > span', { yPercent: 110, duration: 1.3, ease: 'expo.out', stagger: .12, delay: .1 });
    gsap.from(['.hero__eyebrow', '.hero__sub', '.hero__cta'], { opacity: 0, y: 18, duration: .9, ease: 'power3.out', stagger: .08, delay: .15 });
    requestAnimationFrame(() => stage.classList.add('is-in'));

    // Ausgangslage
    const peekY = () => {
      const vh = window.innerHeight;
      const heroBottom = hero.offsetTop + hero.offsetHeight + (isNarrow() ? 28 : 48);
      let target = Math.max(heroBottom, vh * .7);
      target = Math.min(target, vh - (isNarrow() ? 90 : 130));
      return target - stage.offsetTop;
    };
    // Schräglage der „Inseln“ (Werte als Funktionen, damit sie sich bei Größenänderung neu berechnen)
    const tilt = (desk, phone) => {
      const v = {};
      for (const k in desk) v[k] = () => (isNarrow() ? phone[k] : desk[k]);
      return v;
    };
    const tiltSheet = tilt({ rotationX: 10, rotationY: 26, rotationZ: -2, x: -70, y: 30, z: -120 },
                           { rotationX: 24, rotationY: 10, rotationZ: -3, x: -14, y: 10, z: -40 });
    const tiltDoc = tilt({ rotationX: 10, rotationY: -24, rotationZ: 2, x: 70, y: -10, z: -60 },
                         { rotationX: 24, rotationY: -10, rotationZ: 3, x: 14, y: 22, z: -20 });
    const flat = { rotationX: 0, rotationY: 0, rotationZ: 0, x: 0, y: 0, z: 0, duration: 1.1, ease: 'power2.inOut' };

    gsap.set(caps, { autoAlpha: 0, y: 26 });
    gsap.set(stage, { transformOrigin: '50% 0%' });
    gsap.set([sheet, doc], { transformOrigin: '50% 50%' });
    gsap.set(wires.map(w => [w.wire, w.glow]).flat(), { strokeDasharray: 1, strokeDashoffset: 1 });
    gsap.set(wires.map(w => [w.p0, w.p1]).flat(), { opacity: 0 });
    gsap.set($$('.v', doc), { opacity: 0 });
    gsap.set(flag, { autoAlpha: 0, scale: .8 });
    gsap.set(toast, { autoAlpha: 0, y: 16 });
    gsap.set(cursor, { autoAlpha: 0 });
    typo.textContent = '';
    sum.textContent = '0,00';

    const tl = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: '.scene__pin',
        start: 'top top',
        end: () => '+=' + Math.round(window.innerHeight * 3.8),
        pin: true,
        scrub: .8,
        anticipatePin: 1,
        invalidateOnRefresh: true
      }
    });
    sceneST = tl.scrollTrigger;

    // Phase A: Überschrift geht, Bühne kommt
    tl.fromTo(stage, { y: peekY, scale: .92 }, { y: 0, scale: 1, duration: 1.2, ease: 'power1.inOut' }, 0)
      .to(hero, { y: -70, autoAlpha: 0, duration: .7 }, 0)
      .to(caps[0], { autoAlpha: 1, y: 0, duration: .5 }, .8);

    // Phase B: Abtippen mit Zahlendreher
    const typing = { n: 0 };
    const typed = '42,6';
    tl.to(sheetQty0, { backgroundColor: 'rgba(255,122,26,.2)', boxShadow: 'inset 0 0 0 1.5px #ff7a1a', duration: .2 }, 1.3)
      .fromTo(cursor, { x: () => pos.cx0, y: () => pos.cy0, autoAlpha: 0 }, { autoAlpha: 1, duration: .2 }, 1.3)
      .to(cursor, { x: () => pos.cx1, y: () => pos.cy1, duration: .8, ease: 'power1.inOut' }, 1.6)
      .fromTo(typing, { n: 0 }, {
        n: typed.length, immediateRender: false, duration: .5, ease: 'none',
        onUpdate: () => { typo.textContent = typed.slice(0, Math.round(typing.n)); }
      }, 2.4)
      .fromTo(typo, { color: '#1d1d1f' }, { color: '#ff453a', duration: .15, immediateRender: false }, 2.95)
      .to(flag, { autoAlpha: 1, scale: 1, duration: .2, ease: 'back.out(2)' }, 2.95);

    // Phase C: Verbindung entsteht
    tl.to(caps[0], { autoAlpha: 0, y: -20, duration: .35 }, 3.45)
      .to(caps[1], { autoAlpha: 1, y: 0, duration: .5 }, 3.75)
      .to([flag, typo, cursor], { autoAlpha: 0, duration: .3 }, 3.5)
      .to(sheetQty0, { backgroundColor: 'rgba(255,122,26,0)', boxShadow: 'inset 0 0 0 1.5px rgba(255,122,26,0)', duration: .3 }, 3.5)
      .fromTo(sheet, tiltSheet, { ...flat }, 3.6)
      .fromTo(doc, tiltDoc, { ...flat }, 3.6);
    wires.forEach((w, i) => {
      const t = 4.55 + i * .14;
      tl.to(w.p0, { opacity: 1, duration: .1 }, t)
        .to([w.wire, w.glow], { strokeDashoffset: 0, duration: .65, ease: 'power1.inOut' }, t)
        .to(w.p1, { opacity: 1, duration: .1 }, t + .6);
    });

    // Phase D: Werte fließen
    tl.to(caps[1], { autoAlpha: 0, y: -20, duration: .35 }, 5.75)
      .to(caps[2], { autoAlpha: 1, y: 0, duration: .5 }, 6.05);
    wires.forEach((w, i) => {
      const t = 6.3 + i * .38;
      const sQty = $('.c-qty', sheetRows[i]);
      tl.set(w.streak, { opacity: 1 }, t)
        .fromTo(w.streak, { strokeDashoffset: .15 }, { strokeDashoffset: -1, duration: .8, ease: 'power1.in', immediateRender: false }, t)
        .set(w.streak, { opacity: 0 }, t + .8)
        .fromTo(sQty, { backgroundColor: 'rgba(255,122,26,.25)' }, { backgroundColor: 'rgba(255,122,26,0)', duration: .6, immediateRender: false }, t)
        .to($$('.v', docRows[i]), { opacity: 1, duration: .12 }, t + .72)
        .fromTo(docRows[i], { backgroundColor: 'rgba(255,122,26,.2)' }, { backgroundColor: 'rgba(255,122,26,0)', duration: .7, immediateRender: false }, t + .72);
    });
    const total = { v: 0 };
    tl.fromTo(total, { v: 0 }, {
      v: 2778.5, immediateRender: false, duration: 1.9, ease: 'power1.out',
      onUpdate: () => { sum.textContent = fmt.format(total.v); }
    }, 6.6)
      .to(toast, { autoAlpha: 1, y: 0, duration: .4, ease: 'back.out(1.6)' }, 8.3)
      .to({}, { duration: 1.1 }, 8.7); // kurz stehen lassen

    // Texte aus den Zwischenwerten nachziehen. ScrollTrigger unterdrückt beim Neuberechnen
    // (z. B. Fenstergröße geändert) die onUpdate-Aufrufe – so bleibt die Anzeige trotzdem richtig.
    const syncTexts = () => {
      sum.textContent = fmt.format(total.v);
      typo.textContent = typed.slice(0, Math.round(typing.n));
    };
    tl.eventCallback('onUpdate', syncTexts);
    ScrollTrigger.addEventListener('refresh', syncTexts);

    /* -------- Aussage: Wort für Wort -------- */
    const st = $('#statement');
    st.innerHTML = st.textContent.trim().split(/\s+/).map(w => `<span class="w">${w}</span>`).join(' ');
    gsap.to($$('.w', st), {
      opacity: 1, ease: 'none', stagger: .1,
      scrollTrigger: { trigger: st, start: 'top 78%', end: 'bottom 42%', scrub: .5 }
    });

    /* -------- Durchstreichen -------- */
    $$('.strike span').forEach(s => {
      gsap.to(s, {
        backgroundSize: '100% 3px', ease: 'none',
        scrollTrigger: { trigger: s, start: 'top 72%', end: 'top 50%', scrub: .4 }
      });
    });

    /* -------- Ablauf: Linie füllt sich -------- */
    const stepsEl = $('#steps');
    const stepEls = $$('.step', stepsEl);
    ScrollTrigger.create({
      trigger: stepsEl, start: 'top 72%', end: 'bottom 62%', scrub: true,
      onUpdate: self => {
        const p = self.progress;
        stepsEl.style.setProperty('--progress', p.toFixed(3));
        stepEls.forEach((s, i) => s.classList.toggle('is-on', p >= i / (stepEls.length - 1) - .001 && p > 0));
      }
    });

    /* -------- Einblenden -------- */
    ScrollTrigger.batch('.reveal', {
      start: 'top 88%', once: true,
      onEnter: els => gsap.to(els, { opacity: 1, y: 0, duration: 1.1, ease: 'power3.out', stagger: .08, overwrite: true })
    });

    // Nach dem Laden der Schrift einmal neu messen
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => ScrollTrigger.refresh());
  }

  /* ---------------------------------------------------------
     Kleine Vorführungen in den Kacheln – nur wenn sichtbar
     --------------------------------------------------------- */
  const flip = $('.watch-flip');
  const miniTo = $$('.mini--to span');
  let flipTimer = null, cellTimer = null;

  function runCells() {
    let i = 0;
    miniTo.forEach(s => s.classList.remove('on'));
    clearInterval(cellTimer);
    cellTimer = setInterval(() => {
      if (i < miniTo.length) { miniTo[i].classList.add('on'); i++; }
      else if (i > miniTo.length + 3) { i = 0; miniTo.forEach(s => s.classList.remove('on')); }
      else i++;
    }, 520);
  }

  if (reduced || !motion) {
    miniTo.forEach(s => s.classList.add('on'));
  } else if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        const tile = e.target;
        tile.classList.toggle('is-live', e.isIntersecting);
        if (tile.contains(flip)) {
          clearInterval(flipTimer);
          if (e.isIntersecting) flipTimer = setInterval(() => flip.classList.toggle('is-warn'), 2600);
        }
        if (tile.querySelector('.mini--to')) {
          if (e.isIntersecting) runCells(); else clearInterval(cellTimer);
        }
      });
    }, { threshold: .35 });
    $$('.tile').forEach(t => io.observe(t));
  }

  /* ---------------------------------------------------------
     Beispiele: Pfeil-Knöpfe
     --------------------------------------------------------- */
  const rail = $('#rail');
  const btns = $$('.rail-btn');
  function railState() {
    const max = rail.scrollWidth - rail.clientWidth - 2;
    btns[0].disabled = rail.scrollLeft <= 2;
    btns[1].disabled = rail.scrollLeft >= max;
  }
  btns.forEach(b => b.addEventListener('click', () => {
    const card = $('.card', rail);
    const step = card.offsetWidth + parseFloat(getComputedStyle(rail).columnGap || 20);
    rail.scrollBy({ left: step * Number(b.dataset.dir), behavior: reduced ? 'auto' : 'smooth' });
  }));
  rail.addEventListener('scroll', railState, { passive: true });
  window.addEventListener('resize', railState);
  railState();

  /* ---------------------------------------------------------
     Navigation: hell über hellen Abschnitten
     --------------------------------------------------------- */
  const nav = $('#nav');
  const lightSecs = $$('.section--light');
  let ticking = false;
  function navTone() {
    ticking = false;
    const y = nav.offsetHeight / 2;
    const light = lightSecs.some(s => { const r = s.getBoundingClientRect(); return r.top <= y && r.bottom > y; });
    nav.classList.toggle('is-light', light);
  }
  window.addEventListener('scroll', () => { if (!ticking) { ticking = true; requestAnimationFrame(navTone); } }, { passive: true });
  navTone();

  /* ---------------------------------------------------------
     Sprungmarken: sanft scrollen, „So funktioniert’s“ in die Szene
     --------------------------------------------------------- */
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href').slice(1);
    const behavior = reduced ? 'auto' : 'smooth';
    if (id === 'top') { e.preventDefault(); window.scrollTo({ top: 0, behavior }); return; }
    if (id === 'so-gehts' && sceneST) {
      e.preventDefault();
      window.scrollTo({ top: sceneST.start + (sceneST.end - sceneST.start) * .2, behavior });
      return;
    }
    const el = document.getElementById(id);
    if (!el) return;
    if (motion) { e.preventDefault(); el.scrollIntoView({ behavior }); history.replaceState(null, '', '#' + id); }
  }));

  /* ---------------------------------------------------------
     Anfrage: baut eine E-Mail, kein Server, nichts gespeichert
     --------------------------------------------------------- */
  const form = $('#ask');
  const ta = $('#askText');
  const hint = $('#askHint');
  const hintDefault = hint.textContent;
  $('#mailLink').href = 'mailto:' + EMAIL;
  $('#mailLink').textContent = EMAIL;
  ta.addEventListener('input', () => { hint.classList.remove('is-warn'); hint.textContent = hintDefault; });
  form.addEventListener('submit', e => {
    e.preventDefault();
    const text = ta.value.trim();
    if (!text) {
      hint.textContent = 'Ein Satz genügt – worum geht es?';
      hint.classList.add('is-warn');
      ta.focus();
      return;
    }
    const body = `${text}\n\n—\nName:\nBetrieb:\nTelefon (optional):\n`;
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent('Anfrage über die Website')}&body=${encodeURIComponent(body)}`;
    hint.classList.remove('is-warn');
    hint.textContent = `Ihr E-Mail-Programm sollte sich jetzt öffnen. Falls nicht: ${EMAIL}`;
  });
})();
