/*
 * Motion for the sections below the hero. Runs after site.js has rendered
 * the content. Purely presentational: everything still reads and works
 * without it, and prefers-reduced-motion turns it off.
 */
(() => {
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
  const smoothstep = (v) => (v <= 0 ? 0 : v >= 1 ? 1 : v * v * (3 - 2 * v));

  /* ---------- Floating decorations behind each section ---------- */

  // x/y in % of the section, size in px, depth = parallax strength.
  const DECOR = {
    about: [
      { shape: 'star', color: 'yellow', x: 5, y: 12, size: 34, depth: 0.6, motion: 'float' },
      { shape: 'cloud', color: 'blue', x: 86, y: 12, size: 120, depth: 0.3, motion: 'drift' },
      { shape: 'sparkle', color: 'pink', x: 93, y: 44, size: 22, depth: 0.8, motion: 'twinkle' },
      { shape: 'ring', color: 'lilac', x: 3, y: 66, size: 62, depth: 0.4, motion: 'spin' },
      { shape: 'heart', color: 'pink', x: 52, y: 88, size: 20, depth: 0.7, motion: 'float' }
    ],
    features: [
      { shape: 'cloud', color: 'pink', x: 5, y: 12, size: 130, depth: 0.3, motion: 'drift' },
      { shape: 'star', color: 'lilac', x: 94, y: 16, size: 30, depth: 0.7, motion: 'float' },
      { shape: 'sparkle', color: 'yellow', x: 8, y: 46, size: 22, depth: 0.9, motion: 'twinkle' },
      { shape: 'squiggle', color: 'blue', x: 90, y: 70, size: 76, depth: 0.5, motion: 'sway' },
      { shape: 'ring', color: 'mint', x: 50, y: 8, size: 44, depth: 0.4, motion: 'spin' }
    ],
    programs: [
      { shape: 'star', color: 'pink', x: 4, y: 9, size: 28, depth: 0.7, motion: 'float' },
      { shape: 'sparkle', color: 'blue', x: 95, y: 12, size: 24, depth: 0.8, motion: 'twinkle' },
      { shape: 'cloud', color: 'lilac', x: 90, y: 86, size: 130, depth: 0.3, motion: 'drift' },
      { shape: 'ring', color: 'yellow', x: 2, y: 62, size: 54, depth: 0.5, motion: 'spin' },
      { shape: 'heart', color: 'mint', x: 60, y: 90, size: 18, depth: 0.6, motion: 'float' }
    ],
    pricing: [
      { shape: 'sparkle', color: 'yellow', x: 7, y: 14, size: 26, depth: 0.8, motion: 'twinkle' },
      { shape: 'star', color: 'blue', x: 91, y: 9, size: 34, depth: 0.6, motion: 'float' },
      { shape: 'ring', color: 'pink', x: 95, y: 60, size: 66, depth: 0.4, motion: 'spin' },
      { shape: 'squiggle', color: 'lilac', x: 3, y: 84, size: 72, depth: 0.5, motion: 'sway' }
    ],
    contact: [
      { shape: 'cloud', color: 'blue', x: 89, y: 13, size: 124, depth: 0.3, motion: 'drift' },
      { shape: 'star', color: 'yellow', x: 5, y: 16, size: 30, depth: 0.7, motion: 'float' },
      { shape: 'sparkle', color: 'pink', x: 47, y: 8, size: 20, depth: 0.9, motion: 'twinkle' },
      { shape: 'heart', color: 'pink', x: 94, y: 86, size: 26, depth: 0.6, motion: 'float' }
    ],
    footer: [
      { shape: 'sparkle', color: 'white', x: 93, y: 18, size: 16, depth: 0, motion: 'twinkle' },
      { shape: 'sparkle', color: 'white', x: 72, y: 62, size: 12, depth: 0, motion: 'twinkle' },
      { shape: 'sparkle', color: 'white', x: 42, y: 14, size: 10, depth: 0, motion: 'twinkle' }
    ]
  };

  const SHAPES = { star: 'd-star', cloud: 'd-cloud', ring: 'd-ring', squiggle: 'd-squiggle', heart: 'd-heart', sparkle: 'i-sparkle' };

  Object.entries(DECOR).forEach(([key, items]) => {
    const section = document.querySelector(`[data-section="${key}"]`);
    if (!section) return;
    const layer = document.createElement('div');
    layer.className = 'deco';
    layer.setAttribute('aria-hidden', 'true');
    layer.innerHTML = items.map((d, i) => `
      <span class="deco__item deco__item--${d.motion} deco--${d.color} deco-shape--${d.shape}"
        style="left:${d.x}%;top:${d.y}%;--size:${d.size}px;--depth:${d.depth};--d:${i}">
        <svg><use href="#${SHAPES[d.shape]}"></use></svg>
      </span>`).join('');
    section.prepend(layer);
  });

  /* ---------- Section titles: split into letters ---------- */

  const splitTitle = (heading) => {
    const label = heading.textContent.replace(/\s+/g, ' ').trim();
    let index = 0;
    const splitText = (text) => text.split(/(\s+)/).map((chunk) => {
      if (!chunk) return '';
      if (/^\s+$/.test(chunk)) return ' ';
      const chars = [...chunk].map((ch) => `<span class="char" style="--c:${index++}">${ch}</span>`).join('');
      return `<span class="word">${chars}</span>`;
    }).join('');

    const html = [...heading.childNodes].map((node) => {
      if (node.nodeType === Node.TEXT_NODE) return splitText(node.textContent);
      if (node.classList?.contains('accent')) {
        node.classList.add('is-split');
        node.innerHTML = splitText(node.textContent);
        return node.outerHTML;
      }
      return node.outerHTML ?? '';
    }).join('');

    heading.setAttribute('aria-label', label);
    heading.innerHTML = `<span class="title-chars" aria-hidden="true">${html}</span>`;
  };

  $$('.section__title').forEach(splitTitle);

  if (reducedMotion.matches) return;
  document.documentElement.classList.add('motion');

  /* ---------- Sections in view: run idle loops only on screen ---------- */

  const sections = $$('.section, .site-footer');
  const inView = new Set();
  const viewObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      entry.target.classList.toggle('in-view', entry.isIntersecting);
      if (entry.isIntersecting) inView.add(entry.target);
      else inView.delete(entry.target);
    });
    scheduleScroll();
  }, { rootMargin: '10% 0px' });
  sections.forEach((s) => viewObserver.observe(s));

  /* ---------- Scroll: progress bar + decoration parallax ---------- */

  const progress = document.querySelector('[data-scroll-progress]');
  let scrollFrame = null;

  const onScrollFrame = () => {
    scrollFrame = null;
    const max = document.documentElement.scrollHeight - innerHeight;
    if (progress) progress.style.transform = `scaleX(${max > 0 ? Math.min(1, scrollY / max) : 0})`;
    inView.forEach((section) => {
      const rect = section.getBoundingClientRect();
      const p = (rect.top + rect.height / 2 - innerHeight / 2) / innerHeight;
      section.style.setProperty('--parallax', p.toFixed(3));
    });
  };

  function scheduleScroll() {
    if (scrollFrame === null) scrollFrame = requestAnimationFrame(onScrollFrame);
  }

  window.addEventListener('scroll', scheduleScroll, { passive: true });
  window.addEventListener('resize', scheduleScroll);
  scheduleScroll();

  /* ---------- Count-up numbers ---------- */

  const countUp = (el) => {
    const text = el.textContent;
    const numbers = text.match(/\d[\d,]*/g);
    if (!numbers || numbers.length !== 1) return;
    const target = Number(numbers[0].replace(/,/g, ''));
    const useGrouping = numbers[0].includes(',');
    const [before, after] = text.split(numbers[0]);
    const duration = 1400;
    const start = performance.now();
    el.style.minWidth = `${el.offsetWidth}px`;

    const tick = (now) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      const value = Math.round(target * eased);
      el.textContent = `${before}${useGrouping ? value.toLocaleString('en-IN') : value}${after}`;
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = text;
    };
    requestAnimationFrame(tick);
  };

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      countObserver.unobserve(entry.target);
      countUp(entry.target);
    });
  }, { threshold: 0.6 });
  $$('.pricing-plan__amount').forEach((el) => countObserver.observe(el));

  /* ---------- Pointer effects (mouse only) ---------- */

  if (!finePointer.matches) return;

  // Cards tilt toward the pointer and show a soft spotlight under it.
  const TILT = 5;
  $$('.card:not(.contact__form), .pricing-plan').forEach((card) => {
    card.classList.add('tiltable');
    card.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse') return;
      const rect = card.getBoundingClientRect();
      const px = (event.clientX - rect.left) / rect.width;
      const py = (event.clientY - rect.top) / rect.height;
      card.classList.add('is-tilting');
      card.style.setProperty('--rx', `${((0.5 - py) * TILT).toFixed(2)}deg`);
      card.style.setProperty('--ry', `${((px - 0.5) * TILT * 1.4).toFixed(2)}deg`);
      card.style.setProperty('--mx', `${(px * 100).toFixed(1)}%`);
      card.style.setProperty('--my', `${(py * 100).toFixed(1)}%`);
    });
    card.addEventListener('pointerleave', () => {
      card.classList.remove('is-tilting');
      card.style.setProperty('--rx', '0deg');
      card.style.setProperty('--ry', '0deg');
    });
  });

  // Title letters lift as the pointer passes, like the hero headline.
  $$('.section__head').forEach((head) => {
    const chars = $$('.char', head).map((el) => ({ el, x: 0, y: 0, current: 0, goal: 0 }));
    if (!chars.length) return;
    let frame = null;
    let measured = false;
    let size = 40;

    const measure = () => {
      size = parseFloat(getComputedStyle(head.querySelector('.section__title')).fontSize) || 40;
      chars.forEach((c) => {
        const r = c.el.getBoundingClientRect();
        c.x = r.left + r.width / 2;
        c.y = r.top + r.height / 2;
      });
      measured = true;
    };

    const render = () => {
      let moving = false;
      chars.forEach((c) => {
        if (c.current === c.goal) return;
        c.current += (c.goal - c.current) * 0.2;
        if (Math.abs(c.goal - c.current) < 0.003) c.current = c.goal;
        else moving = true;
        const f = c.current;
        c.el.style.translate = f ? `0 ${(-0.15 * f).toFixed(3)}em` : '';
        c.el.style.scale = f ? (1 + 0.12 * f).toFixed(3) : '';
      });
      frame = moving ? requestAnimationFrame(render) : null;
    };

    const setGoals = (x, y) => {
      chars.forEach((c) => {
        if (x === null) {
          c.goal = 0;
          return;
        }
        const d = Math.hypot((x - c.x) / (size * 1.8), (y - c.y) / (size * 1.2));
        c.goal = smoothstep((1 - d) * 1.5);
      });
      if (frame === null) frame = requestAnimationFrame(render);
    };

    head.addEventListener('pointerenter', () => { measured = false; });
    head.addEventListener('pointermove', (event) => {
      if (event.pointerType !== 'mouse') return;
      if (!measured) measure();
      setGoals(event.clientX, event.clientY);
    });
    head.addEventListener('pointerleave', () => setGoals(null, null));
    window.addEventListener('scroll', () => { measured = false; }, { passive: true });
  });
})();
