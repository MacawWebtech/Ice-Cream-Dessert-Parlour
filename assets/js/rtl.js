/* Cone & Co. direction controller — mirrors layout without translating copy. */
(() => {
  'use strict';
  const root = document.documentElement;
  const key = 'stackly-dir';
  const setDirection = (direction, persist = false) => {
    const next = direction === 'rtl' ? 'rtl' : 'ltr';
    root.setAttribute('dir', next);
    document.querySelectorAll('[data-rtl-toggle]').forEach((button) => {
      button.textContent = next === 'rtl' ? 'LTR' : 'RTL';
      button.setAttribute('aria-label', next === 'rtl' ? 'Switch layout to left-to-right' : 'Switch layout to right-to-left');
      button.setAttribute('title', next === 'rtl' ? 'Switch layout to left-to-right' : 'Switch layout to right-to-left');
      button.setAttribute('aria-pressed', String(next === 'rtl'));
    });
    if (persist) { try { localStorage.setItem(key, next); } catch (e) {} }
  };
  let stored = null; try { stored = localStorage.getItem(key); } catch (e) {}
  setDirection(stored || 'ltr');
  document.querySelectorAll('[data-rtl-toggle]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      setDirection(root.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl', true);
    });
  });
})();
