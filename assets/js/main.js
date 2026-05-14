/* Mobile navigation toggle + scroll-aware nav */
(function () {
  'use strict';

  const toggle = document.querySelector('.nav__toggle');
  const links = document.querySelector('.nav__links');

  if (toggle && links) {
    toggle.addEventListener('click', () => {
      const open = links.getAttribute('data-open') === 'true';
      links.setAttribute('data-open', String(!open));
      toggle.setAttribute('aria-expanded', String(!open));
    });

    links.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        links.setAttribute('data-open', 'false');
        toggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Mark current nav link
  const path = window.location.pathname.replace(/\/$/, '') || '/index.html';
  document.querySelectorAll('.nav__link').forEach((a) => {
    const href = a.getAttribute('href');
    if (!href) return;
    const normalized = href.startsWith('/') ? href : '/' + href;
    if (path.endsWith(href) || path === normalized) {
      a.setAttribute('aria-current', 'page');
    }
  });
})();
