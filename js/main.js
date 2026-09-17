/* =========================================================
   BF Menuiserie — interactions (0 dépendance, 0 build)
   1. Parallax sur requestAnimationFrame
   2. Apparitions au scroll (IntersectionObserver)
   3. Compteurs animés
   4. Navigation mobile + header collant
   ========================================================= */
(() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- 1. Parallax ---- */
  const layers = [...document.querySelectorAll('[data-parallax]')];
  let ticking = false;

  function parallax() {
    const vh = window.innerHeight;
    for (const el of layers) {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < -vh || rect.top > vh * 2) continue;   // hors écran : on saute
      const speed = parseFloat(el.dataset.parallax);
      const offset = (rect.top + rect.height / 2 - vh / 2) * speed;
      el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
    }
    ticking = false;
  }
  function onScroll() {
    if (!ticking) { ticking = true; requestAnimationFrame(parallax); }
  }
  if (!reduced && layers.length) {
    parallax();
    addEventListener('scroll', onScroll, { passive: true });
    addEventListener('resize', onScroll);
  }

  /* ---- 2. Apparitions ---- */
  const revealables = document.querySelectorAll('.reveal');
  if (reduced || !('IntersectionObserver' in window)) {
    revealables.forEach(el => el.classList.add('is-in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
      }
    }, { threshold: 0.15, rootMargin: '0px 0px -60px' });
    revealables.forEach(el => io.observe(el));
  }

  /* ---- 3. Compteurs ---- */
  const counters = document.querySelectorAll('[data-count]');
  const countObserver = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries, obs) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue;
          animate(e.target);
          obs.unobserve(e.target);
        }
      }, { threshold: 0.6 })
    : null;

  function animate(el) {
    const target = parseInt(el.dataset.count, 10);
    if (reduced) { el.textContent = target; return; }
    const duration = 1400, start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));  // easeOutCubic
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  counters.forEach(el => countObserver ? countObserver.observe(el) : animate(el));

  /* ---- 4. Header + menu mobile ---- */
  const nav = document.getElementById('nav');
  const links = document.getElementById('navLinks');
  const burger = document.getElementById('burger');

  addEventListener('scroll', () => {
    nav.classList.toggle('is-stuck', scrollY > 40);
  }, { passive: true });

  burger.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
  });
  links.addEventListener('click', (e) => {
    if (e.target.tagName !== 'A') return;
    links.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  });

  /* ---- Année du footer ---- */
  document.getElementById('year').textContent = new Date().getFullYear();
})();
