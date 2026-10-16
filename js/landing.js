(() => {
  const reveal = document.querySelector('[data-reveal]');
  const tilt = document.querySelector('[data-tilt]');
  const image = reveal?.querySelector('img');
  if (!reveal || !tilt || !image) return;

  const pct = (value, total) => `${(value / total) * 100}%`;
  const hover = window.HERO_HOVER ?? {};
  const hoverTargets = [];

  // Shows the image region `box` (source pixels) inside `el`, pixel-aligned with the original.
  const showRegion = (el, box, { src, width, height }) => {
    Object.assign(el.style, {
      backgroundImage: `url("${src}")`,
      backgroundSize: `${(width / box.w) * 100}% ${(height / box.h) * 100}%`,
      backgroundPosition: `${(box.x / (width - box.w)) * 100}% ${(box.y / (height - box.h)) * 100}%`
    });
  };

  const buildText = (layer, image, { cycle, startDelay, lines }) => {
    const fragment = document.createDocumentFragment();
    let delay = startDelay;

    lines.forEach((line) => {
      const lineBox = { x: line.cuts[0], y: line.top, w: line.cuts.at(-1) - line.cuts[0], h: line.bottom - line.top };
      const strip = document.createElement('span');
      strip.className = 'text-line';
      strip.dataset.line = line.name;
      Object.assign(strip.style, {
        left: pct(lineBox.x, image.width),
        top: pct(lineBox.y, image.height),
        width: pct(lineBox.w, image.width),
        height: pct(lineBox.h, image.height)
      });

      line.cuts.slice(0, -1).forEach((x, i) => {
        const box = { x, y: line.top, w: line.cuts[i + 1] - x, h: lineBox.h };
        const letter = document.createElement('span');
        letter.className = 'letter';
        Object.assign(letter.style, {
          left: pct(x - lineBox.x, lineBox.w),
          width: pct(box.w, lineBox.w),
          animationDuration: `${cycle}s`,
          animationDelay: `${delay.toFixed(2)}s`
        });
        showRegion(letter, box, image);
        strip.appendChild(letter);
        if (hover.letter) {
          hoverTargets.push({ el: letter, x: x + box.w / 2, y: line.top + box.h / 2, ...hover.letter });
        }
        delay += line.step;
      });

      fragment.appendChild(strip);
      delay += 0.12;
    });

    layer.appendChild(fragment);
  };

  const buildParts = (layer, image, parts) => {
    const { width, height } = image;
    const fragment = document.createDocumentFragment();

    parts.forEach((part) => {
      const soft = !part.shape;
      const coverage = soft ? (part.core ?? 72) / 100 : 1;
      const w = (part.rx / coverage) * 2;
      const h = (part.ry / coverage) * 2;
      const left = part.x - w / 2;
      const top = part.y - h / 2;

      const el = document.createElement('span');
      el.className = `part part--${part.motion}${soft ? '' : ` part--${part.shape}`}`;
      el.dataset.part = part.name;
      Object.assign(el.style, {
        left: pct(left, width),
        top: pct(top, height),
        width: pct(w, width),
        height: pct(h, height),
        animationDuration: `${part.dur}s`,
        animationDelay: `${part.delay ?? 0}s`
      });
      showRegion(el, { x: left, y: top, w, h }, image);
      if (soft) el.style.setProperty('--core', `${coverage * 100}%`);
      if (part.origin) el.style.transformOrigin = part.origin;
      fragment.appendChild(el);

      const reaction = hover[part.motion] ?? hover.default;
      if (reaction) {
        const reach = hover.reach ?? 0;
        hoverTargets.push({ el, x: part.x, y: part.y, ...reaction, rx: part.rx + reach, ry: part.ry + reach });
      }
    });

    layer.appendChild(fragment);
  };

  const partsLayer = document.querySelector('[data-parts]');
  if (partsLayer && window.HERO_PARTS && window.HERO_IMAGE) {
    buildParts(partsLayer, window.HERO_IMAGE, window.HERO_PARTS);
    if (window.HERO_TEXT) buildText(partsLayer, window.HERO_IMAGE, window.HERO_TEXT);
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

  const imageReady = image.complete && image.naturalWidth
    ? Promise.resolve()
    : new Promise((resolve) => {
        image.addEventListener('load', resolve, { once: true });
        image.addEventListener('error', resolve, { once: true });
      });

  const showOnce = () => imageReady.then(() => {
    requestAnimationFrame(() => reveal.classList.add('is-revealed'));
  });

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        observer.disconnect();
        showOnce();
      }
    }, { threshold: 0.15 });
    observer.observe(reveal);
  } else {
    showOnce();
  }

  const MAX_TILT = 1;
  const EASE = 0.08;
  const target = { x: 0, y: 0 };
  const current = { x: 0, y: 0 };
  let frame = null;

  const render = () => {
    current.x += (target.x - current.x) * EASE;
    current.y += (target.y - current.y) * EASE;

    const settled = Math.abs(target.x - current.x) < 0.002 && Math.abs(target.y - current.y) < 0.002;
    if (settled) {
      current.x = target.x;
      current.y = target.y;
    }

    tilt.style.setProperty('--rx', `${current.x.toFixed(3)}deg`);
    tilt.style.setProperty('--ry', `${current.y.toFixed(3)}deg`);
    frame = settled ? null : requestAnimationFrame(render);
  };

  const schedule = () => {
    if (frame === null) frame = requestAnimationFrame(render);
  };

  const onMove = (event) => {
    if (event.pointerType !== 'mouse') return;
    const rect = tilt.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    target.y = Math.max(-1, Math.min(1, px * 2)) * MAX_TILT;
    target.x = Math.max(-1, Math.min(1, py * 2)) * -MAX_TILT;
    schedule();
  };

  const onLeave = () => {
    target.x = 0;
    target.y = 0;
    schedule();
  };

  const tiltEnabled = () => finePointer.matches && !reducedMotion.matches;

  const syncTilt = () => {
    tilt.removeEventListener('pointermove', onMove);
    tilt.removeEventListener('pointerleave', onLeave);
    if (tiltEnabled()) {
      tilt.addEventListener('pointermove', onMove);
      tilt.addEventListener('pointerleave', onLeave);
    } else {
      onLeave();
    }
  };

  syncTilt();
  reducedMotion.addEventListener?.('change', syncTilt);
  finePointer.addEventListener?.('change', syncTilt);

  /*
   * Pointer proximity: pieces near the pointer lift, grow and turn. Uses the
   * individual translate/scale/rotate properties, which compose with the
   * looping keyframe `transform` instead of replacing it.
   */
  const hero = document.querySelector('.hero');
  if (!hero || !partsLayer || !hoverTargets.length) return;

  const HOVER_EASE = 0.18;
  const TOUCH_HOLD_MS = 700;
  const smoothstep = (v) => (v <= 0 ? 0 : v >= 1 ? 1 : v * v * (3 - 2 * v));
  const pointer = { x: null, y: null };
  let hoverFrame = null;
  let touchTimer = null;

  hoverTargets.forEach((t) => {
    t.current = 0;
    t.goal = 0;
  });

  const applyHover = (t) => {
    const f = t.current;
    t.el.style.translate = f && t.lift ? `0 ${(-t.lift * f).toFixed(3)}%` : '';
    t.el.style.scale = f && t.scale ? (1 + (t.scale - 1) * f).toFixed(4) : '';
    t.el.style.rotate = f && t.rotate ? `${(t.rotate * f).toFixed(2)}deg` : '';
  };

  const renderHover = () => {
    let moving = false;
    hoverTargets.forEach((t) => {
      if (t.current === t.goal) return;
      t.current += (t.goal - t.current) * HOVER_EASE;
      if (Math.abs(t.goal - t.current) < 0.002) t.current = t.goal;
      else moving = true;
      applyHover(t);
    });
    hoverFrame = moving ? requestAnimationFrame(renderHover) : null;
  };

  const updateGoals = () => {
    const { width, height } = window.HERO_IMAGE;
    const rect = partsLayer.getBoundingClientRect();
    const ix = pointer.x === null ? null : ((pointer.x - rect.left) / rect.width) * width;
    const iy = pointer.y === null ? null : ((pointer.y - rect.top) / rect.height) * height;

    hoverTargets.forEach((t) => {
      if (ix === null) {
        t.goal = 0;
        return;
      }
      const d = Math.hypot((ix - t.x) / t.rx, (iy - t.y) / t.ry);
      t.goal = smoothstep((1 - d) * 1.6);
    });

    if (hoverFrame === null) hoverFrame = requestAnimationFrame(renderHover);
  };

  const hoverEnabled = () => !reducedMotion.matches;

  const setPointer = (x, y) => {
    pointer.x = x;
    pointer.y = y;
    updateGoals();
  };

  hero.addEventListener('pointermove', (event) => {
    if (event.pointerType !== 'mouse' || !hoverEnabled()) return;
    setPointer(event.clientX, event.clientY);
  });

  hero.addEventListener('pointerleave', () => setPointer(null, null));

  hero.addEventListener('pointerdown', (event) => {
    if (event.pointerType === 'mouse' || !hoverEnabled()) return;
    setPointer(event.clientX, event.clientY);
    clearTimeout(touchTimer);
    touchTimer = setTimeout(() => setPointer(null, null), TOUCH_HOLD_MS);
  });

  reducedMotion.addEventListener?.('change', () => setPointer(null, null));
})();
