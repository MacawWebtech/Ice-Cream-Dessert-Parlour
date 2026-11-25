/* Cone & Co. motion controller — adapted from the reference interaction system. */
(() => {
  'use strict';
  const reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const raf = window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : (fn) => setTimeout(fn, 16);

  const ready = (fn) => {
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn, { once: true });
    else fn();
  };

  function progressBar() {
    if (reduceMotion || $('.m-progress')) return;
    const bar = document.createElement('div');
    bar.className = 'm-progress';
    bar.setAttribute('aria-hidden', 'true');
    document.body.appendChild(bar);
    let ticking = false;
    const update = () => {
      const range = document.documentElement.scrollHeight - window.innerHeight;
      const progress = range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0;
      bar.style.transform = `scaleX(${progress.toFixed(4)})`;
      ticking = false;
    };
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; raf(update); } }, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    update();
  }

  function smartHeader() {
    const header = $('#siteHeader');
    /* Header stays pinned and always visible while scrolling (sticky nav). */
    if (!header || reduceMotion || true) return;
    let previousY = window.scrollY;
    let ticking = false;
    const update = () => {
      const y = window.scrollY;
      const menuOpen = $('[data-mobile-toggle][aria-expanded="true"]');
      if (menuOpen || y < 180 || y < previousY - 6) header.classList.remove('m-hide');
      else if (y > previousY + 8) header.classList.add('m-hide');
      previousY = y;
      ticking = false;
    };
    window.addEventListener('scroll', () => { if (!ticking) { ticking = true; raf(update); } }, { passive: true });
    header.addEventListener('focusin', () => header.classList.remove('m-hide'));
    $('[data-mobile-toggle]')?.addEventListener('click', () => header.classList.remove('m-hide'));
  }

  function heroMotion() {
    const hero = $('.hero');
    if (!hero || reduceMotion) return;
    const heading = $('h1', hero);
    if (heading) { splitWords(heading); heading.classList.add('m-in'); }
    const items = $$('.hero-copy > *, .hero-visual', hero);
    items.forEach((item, index) => {
      item.classList.add('motion-hero-item');
      item.style.setProperty('--motion-index', index);
    });
    const artwork = $('.hero-visual', hero);
    if (artwork && finePointer && window.matchMedia('(min-width: 1025px)').matches) {
      hero.addEventListener('pointermove', (event) => {
        const rect = hero.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = (event.clientY - rect.top) / rect.height - .5;
        artwork.style.setProperty('--hero-rx', `${(-y * 2.5).toFixed(2)}deg`);
        artwork.style.setProperty('--hero-ry', `${(x * 3.5).toFixed(2)}deg`);
      }, { passive: true });
      hero.addEventListener('pointerleave', () => {
        artwork.style.setProperty('--hero-rx', '0deg');
        artwork.style.setProperty('--hero-ry', '0deg');
      });
    }
  }

  function revealMotion() {
    if (reduceMotion) return;
    const groups = $$('.products, .menu-grid, .blog-grid, .packages, .categories, .gallery-grid, .pair-grid, .quote-grid');
    groups.forEach((group) => {
      const children = Array.from(group.children).filter((el) => !el.hidden);
      if (children.length < 2) return;
      group.classList.add('motion-stagger', 'motion-reveal');
      children.forEach((child, index) => {
        child.classList.add('motion-child');
        child.style.setProperty('--motion-index', Math.min(index, 8));
      });
    });

    const selectors = [
      'main .section-head', 'main .product-card', 'main .category', 'main .split > div',
      'main .blog-card', 'main .gallery-item', 'main .packages > article', 'main .reasons article',
      'main .pair-grid > *', 'main .quote-grid > *', 'main .review.active', 'main .visit > *',
      'main .offer-feature > *', 'main .discovery-feature > *'
    ];
    const elements = Array.from(new Set(selectors.flatMap((selector) => $$(selector))))
      .filter((element) => !element.closest('.hero') && !element.closest('[hidden]'));
    elements.forEach((element) => element.classList.add('motion-reveal'));

    if (!('IntersectionObserver' in window)) return;
    document.documentElement.classList.add('has-motion');
    const observer = new IntersectionObserver((entries, io) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      });
    }, { threshold: 0, rootMargin: '0px 0px -5% 0px' });
    const pending = $$('.motion-reveal');
    pending.forEach((element) => observer.observe(element));
    // Failsafe: anything already in the viewport must never stay at opacity 0.
    const flush = () => pending.forEach((el) => { const r = el.getBoundingClientRect(); if (r.top < window.innerHeight && r.bottom > 0) el.classList.add('is-visible'); });
    setTimeout(flush, 1200); window.addEventListener('pageshow', flush);
  }


  function splitWords(element) {
    if (element.dataset.motionSplit === 'true') return;
    element.dataset.motionSplit = 'true';
    const label = element.textContent.replace(/\s+/g, ' ').trim();
    if (!label) return;
    element.setAttribute('aria-label', label);
    let wordIndex = 0;
    const walk = (node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === Node.TEXT_NODE) {
          const parts = child.textContent.split(/(\s+)/);
          const fragment = document.createDocumentFragment();
          parts.forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) fragment.appendChild(document.createTextNode(part));
            else {
              const mask = document.createElement('span');
              mask.className = 'm-word';
              mask.setAttribute('aria-hidden', 'true');
              const word = document.createElement('span');
              word.className = 'm-word-inner';
              word.style.setProperty('--word-index', wordIndex++);
              word.textContent = part;
              mask.appendChild(word);
              fragment.appendChild(mask);
            }
          });
          child.parentNode.replaceChild(fragment, child);
        } else if (child.nodeType === Node.ELEMENT_NODE && child.tagName !== 'BR') {
          walk(child);
        }
      });
    };
    walk(element);
    element.classList.add('m-split');
  }

  function splitHeadingMotion() {
    if (reduceMotion || !('IntersectionObserver' in window)) return;
    const headings = $$('main .section-head h2, main .section-head h3').filter((el) => el.textContent.trim());
    if (!headings.length) return;
    headings.forEach(splitWords);
    const observer = new IntersectionObserver((entries, io) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('m-in');
        io.unobserve(entry.target);
      });
    }, { threshold: .35, rootMargin: '0px 0px -5% 0px' });
    headings.forEach((heading) => observer.observe(heading));
  }

  function cardSpotlights() {
    if (reduceMotion || !finePointer) return;
    $$('.product-card, .blog-card, .packages article').forEach((card) => {
      if (card.dataset.motionCard === 'true') return;
      card.dataset.motionCard = 'true';
      if (getComputedStyle(card).position === 'static') card.style.position = 'relative';
      const glow = document.createElement('span');
      glow.className = 'm-glow';
      glow.setAttribute('aria-hidden', 'true');
      card.appendChild(glow);
      card.classList.add('m-card');
      let pending = false;
      const tilt = !card.classList.contains('featured') && card.getBoundingClientRect().width < 620;
      card.addEventListener('pointerenter', () => card.classList.add('m-tilting'));
      card.addEventListener('pointermove', (event) => {
        if (pending) return;
        pending = true;
        const pointerX = event.clientX;
        const pointerY = event.clientY;
        raf(() => {
          pending = false;
          const rect = card.getBoundingClientRect();
          const x = pointerX - rect.left;
          const y = pointerY - rect.top;
          card.style.setProperty('--mx', `${x.toFixed(0)}px`);
          card.style.setProperty('--my', `${y.toFixed(0)}px`);
          if (tilt) {
            const rx = ((.5 - y / rect.height) * 3.5).toFixed(2);
            const ry = ((x / rect.width - .5) * 3.5).toFixed(2);
            card.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
          }
        });
      }, { passive: true });
      card.addEventListener('pointerleave', () => {
        card.classList.remove('m-tilting');
        card.style.transform = '';
      });
    });
  }

  function init() {
    if (reduceMotion) return;
    progressBar();
    smartHeader();
    heroMotion();
    revealMotion();
    splitHeadingMotion();
    cardSpotlights();
  }
  ready(init);
})();
