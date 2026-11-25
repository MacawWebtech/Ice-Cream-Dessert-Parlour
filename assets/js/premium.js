/* Cone & Co. — premium motion layer: banner parallax, image curtain reveals,
   staggered section reveals, animated counters and magnetic buttons.
   Everything is skipped when the visitor prefers reduced motion. */
(() => {
  'use strict';
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const fine = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const raf = window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : (fn) => setTimeout(fn, 16);

  const formatCount = (value, el) => {
    const decimals = Number(el.dataset.decimals || 0);
    const num = decimals ? value.toFixed(decimals) : Math.round(value).toLocaleString('en-US');
    return `${el.dataset.prefix || ''}${num}${el.dataset.suffix || ''}`;
  };

  function counters() {
    const items = $$('[data-count]');
    if (!items.length) return;
    const run = (el) => {
      const target = parseFloat(el.dataset.count);
      if (reduce || !isFinite(target)) { el.textContent = formatCount(target, el); return; }
      const duration = 1800;
      const start = performance.now();
      const tick = (now) => {
        const t = Math.min(1, (now - start) / duration);
        const eased = 1 - Math.pow(1 - t, 4);
        el.textContent = formatCount(target * eased, el);
        if (t < 1) raf(tick);
      };
      raf(tick);
    };
    if (reduce || !('IntersectionObserver' in window)) { items.forEach(run); return; }
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        run(entry.target);
        io.unobserve(entry.target);
      });
    }, { threshold: .6 });
    items.forEach((el) => io.observe(el));
  }

  function reveals() {
    if (reduce || !('IntersectionObserver' in window)) return;
    document.documentElement.classList.add('px-ready');

    // Staggered cards / steps / FAQ rows in the extra section
    $$('.xs').forEach((section) => {
      $$('.xs-grid, .xs-faq', section).forEach((group) => {
        Array.from(group.children).forEach((child, i) => {
          child.classList.add('xs-reveal');
          child.style.setProperty('--px-i', Math.min(i, 8));
        });
      });
    });

    // Generic reveals: <el data-reveal="index">
    $$('[data-reveal]').forEach((el) => { el.classList.add('xs-reveal'); el.style.setProperty('--px-i', Math.min(Number(el.dataset.reveal) || 0, 8)); });

    // Curtain reveal for editorial images
    const imgSelectors = [
      '.split-image img', '.offer-feature > img', '.pair-grid img', '.discovery-feature img',
      '.visit > img', '.seasonal > img', '.article-hero > img', '.page-hero > img', '.detail-image'
    ];
    // motion.js already reveals these wrappers; skip images inside them to avoid double animation
    $$(imgSelectors.join(',')).filter((img) => !img.closest('.motion-reveal, .motion-child')).forEach((img) => img.classList.add('px-img'));

    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('px-in');
        obs.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: '0px 0px -6% 0px' });
    const targets = $$('.xs-reveal, .px-img');
    targets.forEach((el) => io.observe(el));
    const flush = () => targets.forEach((el) => { const r = el.getBoundingClientRect(); if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('px-in'); });
    setTimeout(flush, 1200); window.addEventListener('pageshow', flush);
  }

  function bannerParallax() {
    if (reduce) return;
    const banners = $$('.hero, .page-hero, .article-hero');
    if (!banners.length) return;
    let ticking = false;
    const update = () => {
      const vh = window.innerHeight;
      banners.forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -100 || r.top > vh + 100) return;
        const progress = (vh / 2 - (r.top + r.height / 2)) / vh;
        el.style.setProperty('--banner-shift', `${(progress * -70).toFixed(1)}px`);
      });
      ticking = false;
    };
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; raf(update); } }, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  }

  function magnetic() {
    if (reduce || !fine) return;
    $$('.button.primary, .header-cta').forEach((btn) => {
      btn.classList.add('is-magnetic');
      btn.addEventListener('pointermove', (e) => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * .18;
        const y = (e.clientY - r.top - r.height / 2) * .3;
        btn.style.transform = `translate(${x.toFixed(1)}px, ${(y - 3).toFixed(1)}px)`;
      }, { passive: true });
      btn.addEventListener('pointerleave', () => { btn.style.transform = ''; });
    });
  }

  function faqSingleOpen() {
    $$('.xs-faq').forEach((list) => {
      const items = $$('details', list);
      items.forEach((d) => d.addEventListener('toggle', () => {
        if (d.open) items.forEach((o) => { if (o !== d) o.open = false; });
      }));
    });
  }

  const init = () => { counters(); reveals(); bannerParallax(); magnetic(); faqSingleOpen(); };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
  else init();
})();

/* Package section: staggered text + card animation (pairs with .pk-* CSS) */
(function () {
  const sec = document.querySelector('.party-packages');
  if (!sec || !('IntersectionObserver' in window) || (window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)) return;
  sec.querySelectorAll('.section-head > *').forEach((el, i) => el.style.setProperty('--pk-i', i));
  sec.querySelectorAll('.packages > article').forEach((card, c) => {
    card.style.setProperty('--pk-c', c);
    Array.from(card.children).forEach((el, t) => el.style.setProperty('--pk-t', t));
    card.querySelectorAll('li').forEach((li, l) => li.style.setProperty('--pk-l', l));
  });
  document.documentElement.classList.add('pk-ready');
  const io = new IntersectionObserver((entries) => entries.forEach((e) => {
    if (e.isIntersecting) { sec.classList.add('pk-in'); io.disconnect(); }
  }), { threshold: .15 });
  io.observe(sec);
})();
