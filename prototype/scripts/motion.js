(() => {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) document.documentElement.classList.add('reduce-motion');

  // ============================================================ Scroll reveal
  const REVEAL_SELECTORS = [
    '.section-header',
    '.section-header-row',
    '.section-header-center',
    '.card',
    '.feature-card',
    '.process-step',
    '.testi-card',
    '.value-card',
    '.ps-card',
    '.featured-card',
    '.results-band',
    '.stats-band',
    '.faq-item',
    '.contact-channel',
    '.gallery-img',
  ];

  if (!reduceMotion && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          e.target.classList.add('is-visible');
          obs.unobserve(e.target);
        }
      }
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    REVEAL_SELECTORS.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el, i) => {
        el.classList.add('reveal');
        if (i < 8) el.style.setProperty('--reveal-delay', `${i * 60}ms`);
        obs.observe(el);
      });
    });
  } else {
    REVEAL_SELECTORS.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => el.classList.add('reveal', 'is-visible'));
    });
  }

  // ============================================================ Mobile drawer
  const toggle = document.querySelector('.navbar-mobile-toggle');
  const drawer = document.querySelector('.navbar-drawer');
  const scrim = document.querySelector('.navbar-scrim');
  const closeBtn = document.querySelector('.navbar-drawer-close');

  if (toggle && drawer && scrim) {
    const setOpen = (open) => {
      drawer.dataset.open = String(open);
      scrim.dataset.open = String(open);
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    };
    toggle.addEventListener('click', () => setOpen(drawer.dataset.open !== 'true'));
    closeBtn?.addEventListener('click', () => setOpen(false));
    scrim.addEventListener('click', () => setOpen(false));
    drawer.querySelectorAll('a').forEach((a) => a.addEventListener('click', () => setOpen(false)));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.dataset.open === 'true') setOpen(false);
    });
  }

  // ============================================================ Filter chips (visual only)
  document.querySelectorAll('.filter-bar').forEach((bar) => {
    const chips = bar.querySelectorAll('.filter-chip');
    chips.forEach((chip) => {
      chip.addEventListener('click', () => {
        chips.forEach((c) => {
          c.classList.remove('is-active');
          c.setAttribute('aria-selected', 'false');
        });
        chip.classList.add('is-active');
        chip.setAttribute('aria-selected', 'true');
      });
    });
  });

  // ============================================================ TOC active state (blog post)
  const tocLinks = document.querySelectorAll('.post-toc a');
  if (tocLinks.length > 0 && !reduceMotion && 'IntersectionObserver' in window) {
    const headings = Array.from(tocLinks).map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
    const tocObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          const id = e.target.id;
          tocLinks.forEach((a) => a.classList.toggle('is-active', a.getAttribute('href') === `#${id}`));
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px' });
    headings.forEach((h) => tocObs.observe(h));
  }
})();
