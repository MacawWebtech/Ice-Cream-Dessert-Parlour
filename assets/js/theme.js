/* Cone & Co. theme controller — local preference + OS fallback. */
(() => {
  'use strict';
  const root = document.documentElement;
  const key = 'stackly-theme';
  const media = window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
  const store = { get: (k) => { try { return localStorage.getItem(k); } catch (e) { return null; } }, set: (k, v) => { try { localStorage.setItem(k, v); } catch (e) {} } };
  const saved = store.get(key) || store.get('theme');
  let userChoice = Boolean(saved);

  const iconMarkup = (theme) => `<i data-lucide="${theme === 'dark' ? 'sun' : 'moon'}"></i>`;
  const refreshButtons = (theme) => {
    document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
      button.innerHTML = iconMarkup(theme);
      const label = theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode';
      button.setAttribute('aria-label', label);
      button.setAttribute('title', label);
      button.setAttribute('aria-pressed', String(theme === 'dark'));
    });
    if (window.lucide && typeof window.lucide.createIcons === 'function') window.lucide.createIcons();
  };

  const apply = (theme, persist = false) => {
    const next = theme === 'dark' ? 'dark' : 'light';
    root.dataset.theme = next;
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', next === 'dark' ? '#43251F' : '#FFF3E2');
    refreshButtons(next);
    if (persist) { store.set(key, next); userChoice = true; }
  };

  apply(saved || (media && media.matches ? 'dark' : 'light'));
  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    button.addEventListener('click', (event) => {
      event.preventDefault();
      apply(root.dataset.theme === 'dark' ? 'light' : 'dark', true);
    });
  });

  if (media) {
    const onSystemChange = (event) => { if (!userChoice) apply(event.matches ? 'dark' : 'light'); };
    if (typeof media.addEventListener === 'function') media.addEventListener('change', onSystemChange);
    else if (typeof media.addListener === 'function') media.addListener(onSystemChange);
  }
})();
