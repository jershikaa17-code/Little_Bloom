(() => {
  const site = window.SITE;
  if (!site) return;

  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const esc = (value) => String(value).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  })[c]);

  const icon = (name) => `<svg aria-hidden="true"><use href="#i-${name}"></use></svg>`;

  // Title arrays alternate plain text and accent words: ['A happy place to', 'grow', 'and', 'bloom'].
  const title = (parts, id) => {
    let accent = 0;
    const html = parts.map((part, i) => {
      if (i % 2 === 0) return esc(part);
      accent += 1;
      return `<span class="accent accent--${accent % 2 ? 'pink' : 'blue'}">${esc(part)}</span>`;
    }).join(' ');
    return `<h2 class="section__title" id="${id}">${html}</h2>`;
  };

  const head = (block, id) => `
    <header class="section__head reveal">
      <p class="eyebrow"><svg class="eyebrow__spark" aria-hidden="true"><use href="#i-sparkle"></use></svg>${esc(block.eyebrow)}</p>
      ${title(block.title, id)}
      ${block.lead ? `<p class="section__lead">${esc(block.lead)}</p>` : ''}
    </header>`;

  // Same accent-alternating markup as `title`, but as an h3 for subsections
  // that sit inside a larger section (used only within the About narrative).
  const subTitle = (parts, id) => {
    let accent = 0;
    const html = parts.map((part, i) => {
      if (i % 2 === 0) return esc(part);
      accent += 1;
      return `<span class="accent accent--${accent % 2 ? 'pink' : 'blue'}">${esc(part)}</span>`;
    }).join(' ');
    return `<h3 class="section__title" id="${id}">${html}</h3>`;
  };

  const subHead = (block, id, align) => `
    <header class="section__head reveal${align ? ` section__head--${align}` : ''}">
      <p class="eyebrow"><svg class="eyebrow__spark" aria-hidden="true"><use href="#i-sparkle"></use></svg>${esc(block.eyebrow)}</p>
      ${subTitle(block.title, id)}
      ${block.lead ? `<p class="section__lead">${esc(block.lead)}</p>` : ''}
    </header>`;

  const money = (n) => `${site.pricing.currency}${n.toLocaleString('en-IN')}`;

  // Each "Why parents choose us" panel gets its own small visual, built from
  // whichever story-specific field its content carries (preview messages,
  // trust tags, a milestone row, or an activity cluster) rather than a
  // generic icon-in-a-box.
  const featureVisual = (p) => {
    if (p.preview) {
      return `
        <div class="feature-visual feature-visual--messages">
          ${p.preview.map((m, i) => `
            <div class="feature-msg" style="--i:${i}">
              <div class="feature-msg__head"><strong>${esc(m.who)}</strong><span>${esc(m.when)}</span></div>
              <p>${esc(m.note)}</p>
            </div>`).join('')}
        </div>`;
    }
    if (p.tags) {
      return `
        <div class="feature-visual feature-visual--shield">
          <span class="feature-visual__shield icon-bubble icon-bubble--${p.color} icon-bubble--lg">${icon(p.icon)}</span>
          <ul class="feature-tags" role="list">
            ${p.tags.map((t) => `<li class="chip chip--${p.color}">${esc(t)}</li>`).join('')}
          </ul>
        </div>`;
    }
    if (p.milestones) {
      return `
        <div class="feature-visual feature-visual--milestones">
          ${p.milestones.map((m, i) => `
            <div class="feature-milestone" style="--i:${i}">
              <span class="icon-bubble icon-bubble--${i % 2 ? 'blue' : 'pink'}">${icon(m.icon)}</span>
              <span>${esc(m.label)}</span>
            </div>`).join('')}
        </div>`;
    }
    if (p.activities) {
      return `
        <div class="feature-visual feature-visual--activities">
          ${p.activities.map((a, i) => `
            <div class="feature-activity" style="--i:${i}">
              <span class="icon-bubble icon-bubble--${i % 2 ? 'blue' : 'pink'}">${icon(a.icon)}</span>
              <span>${esc(a.label)}</span>
            </div>`).join('')}
        </div>`;
    }
    return '';
  };

  /* ---------- Sections ---------- */

  const renderers = {
    about: (a) => `
      <div class="container about-hero">
        <div class="about-hero__copy reveal">
          <p class="eyebrow"><svg class="eyebrow__spark" aria-hidden="true"><use href="#i-sparkle"></use></svg>${esc(a.eyebrow)}</p>
          ${title(a.title, 'about-title')}
          <p class="section__lead about-hero__lead">${esc(a.lead)}</p>
          <span class="chip chip--pink about-hero__tag">${esc(a.tag)}</span>
          <div class="about-hero__cta">
            <a class="btn btn--primary" href="#about-philosophy-title">${esc(a.ctaPrimary)} ${icon('arrow')}</a>
            <a class="btn btn--light" href="#programs">${esc(a.ctaSecondary)}</a>
          </div>
        </div>
        <div class="about-hero__visual reveal" aria-hidden="true">
          <span class="about-hero__ring"></span>
          <span class="about-hero__blob about-hero__blob--a">${icon('book')}</span>
          <span class="about-hero__blob about-hero__blob--b">${icon('palette')}</span>
          <span class="about-hero__blob about-hero__blob--c">${icon('leaf')}</span>
          <span class="about-hero__blob about-hero__blob--d">${icon('heart')}</span>
        </div>
      </div>

      <div class="about-philosophy">
        <div class="container about-philosophy__grid">
          <div class="reveal">
            ${subHead(a.philosophy, 'about-philosophy-title', 'left')}
          </div>
          <div class="about-philosophy__copy reveal">
            ${a.philosophy.text.map((p) => `<p>${esc(p)}</p>`).join('')}
            <p class="about-philosophy__quote">&ldquo;${esc(a.philosophy.quote)}&rdquo;</p>
          </div>
        </div>
      </div>

      <div class="container about-day">
        ${subHead(a.day, 'about-day-title', 'left')}
        <ol class="about-day__list" role="list">
          ${a.day.items.map((d, i) => `
            <li class="about-day__item reveal" style="--i:${i}">
              <span class="icon-bubble icon-bubble--${d.color}">${icon(d.icon)}</span>
              <div class="about-day__body">
                <p class="about-day__time">${esc(d.time)}</p>
                <h4 class="about-day__title">${esc(d.title)}</h4>
                <p class="about-day__text">${esc(d.text)}</p>
              </div>
            </li>`).join('')}
        </ol>
      </div>

      <div class="about-different">
        <div class="container">
          ${subHead(a.different, 'about-different-title', 'left')}
          <ol class="about-different__list" role="list">
            ${a.different.items.map((d, i) => `
              <li class="about-different__item reveal" style="--i:${i}">
                <span class="about-different__n" aria-hidden="true">${esc(d.n)}</span>
                <h4 class="about-different__title">${esc(d.title)}</h4>
                <p class="about-different__text">${esc(d.text)}</p>
              </li>`).join('')}
          </ol>
        </div>
      </div>

      <div class="container about-parents reveal">
        <p class="eyebrow"><svg class="eyebrow__spark" aria-hidden="true"><use href="#i-sparkle"></use></svg>${esc(a.parents.eyebrow)}</p>
        ${subTitle(a.parents.title, 'about-parents-title')}
        <p class="about-parents__text">${esc(a.parents.text)}</p>
        <button class="btn btn--primary" type="button" data-action="signup">Book a visit ${icon('arrow')}</button>
      </div>`,

    features: (f) => `
      <div class="container">
        ${head(f, 'features-title')}
      </div>

      <div class="features-story">
        ${f.pillars.map((p, i) => `
          <div class="feature-panel container${i % 2 ? ' feature-panel--reverse' : ''} pillar" id="feature-${p.id}" tabindex="-1">
            ${featureVisual(p)}
            <div class="feature-panel__copy reveal">
              <span class="feature-panel__n" aria-hidden="true">0${i + 1}</span>
              <h3 class="feature-panel__title">${esc(p.title)}</h3>
              <p class="feature-panel__text">${esc(p.text)}</p>
            </div>
          </div>`).join('')}
      </div>

      <div class="container app-showcase">
        <div class="app-showcase__head reveal">
          <h3 class="section__title">${esc(f.appTitle)}</h3>
          <p class="section__lead app-showcase__lead">${esc(f.appLead)}</p>
          <div class="app-panel__stores">
            <button class="store-btn" type="button" data-action="store" data-store="App Store">App Store <span>Coming soon</span></button>
            <button class="store-btn" type="button" data-action="store" data-store="Google Play">Google Play <span>Coming soon</span></button>
          </div>
        </div>

        <div class="app-showcase__body reveal">
          <div class="app-phone" aria-hidden="true">
            <div class="app-phone__screen">
              <p class="app-phone__greeting">Good afternoon, Aarav&rsquo;s family <span aria-hidden="true">👋</span></p>
              <div class="app-phone__card">
                <span class="app-phone__icon icon-bubble icon-bubble--${f.app[0].color}" data-app-icon>${icon(f.app[0].icon)}</span>
                <p data-app-text>${esc(f.app[0].preview)}</p>
              </div>
              <div class="app-phone__dots" data-app-dots>
                ${f.app.map((t, i) => `<span class="${i === 0 ? 'is-active' : ''}"></span>`).join('')}
              </div>
            </div>
          </div>

          <div class="app-tabs" role="list" aria-label="Parent app features">
            ${f.app.map((t, i) => `
              <button class="app-tab${i === 0 ? ' is-active' : ''}" type="button" aria-pressed="${i === 0 ? 'true' : 'false'}" data-app-tab="${i}" data-icon="${t.icon}" data-color="${t.color}" data-preview="${esc(t.preview)}">
                <span class="app-tab__icon">${icon(t.icon)}</span>
                <span class="app-tab__body">
                  <strong>${esc(t.title)}</strong>
                  <span>${esc(t.text)}</span>
                </span>
              </button>`).join('')}
          </div>
        </div>
      </div>`,

    programs: (p) => `
      <div class="container">
        ${head(p, 'programs-title')}
        <ol class="programs-map" role="list">
          ${p.items.map((item, i) => `
            <li class="programs-map__stop reveal" style="--i:${i}">
              <span class="programs-map__dot programs-map__dot--${item.color}"></span>
              <span class="programs-map__age">${esc(item.age)}</span>
              <span class="programs-map__name">${esc(item.name)}</span>
            </li>`).join('')}
        </ol>
      </div>

      <ol class="programs-journey" role="list">
        ${p.items.map((item, i) => `
          <li class="program-stage${i % 2 ? ' program-stage--reverse' : ''}" id="program-${item.id}">
            <div class="container program-stage__grid">
              <div class="program-stage__visual program-stage__visual--${item.color} reveal" aria-hidden="true">
                <span class="program-stage__index">0${i + 1}</span>
                ${icon(item.icon)}
              </div>
              <div class="program-stage__copy reveal">
                <p class="program-stage__age">${esc(item.age)}</p>
                <h3 class="program-stage__name">${esc(item.name)}</h3>
                <p class="program-stage__intro">${esc(item.intro)}</p>
                <p class="program-stage__text">${esc(item.copy)}</p>
                <dl class="program-stage__meta">
                  <div><dt>Daily session</dt><dd>${esc(item.time)}</dd></div>
                  <div><dt>Teacher&ndash;child ratio</dt><dd>${esc(item.ratio)}</dd></div>
                </dl>
                <ul class="program-stage__points" role="list">
                  ${item.points.map((pt) => `<li>${icon('check')} ${esc(pt)}</li>`).join('')}
                </ul>
                <button class="btn btn--outline" type="button" data-action="signup" data-program="${esc(item.id)}">Enquire for ${esc(item.name)}</button>
              </div>
            </div>
          </li>`).join('')}
      </ol>`,

    pricing: (p) => `
      <div class="container">
        ${head(p, 'pricing-title')}
        <div class="pricing-panel reveal">
          ${p.plans.map((plan, i) => `
            <div class="pricing-plan${plan.popular ? ' pricing-plan--popular' : ''}" style="--i:${i}">
              <div class="pricing-plan__head">
                <span class="pricing-plan__icon">${icon(plan.icon)}</span>
                <h3 class="pricing-plan__name">${esc(plan.name)}</h3>
                ${plan.popular ? '<span class="pricing-plan__flag">Recommended</span>' : ''}
              </div>
              <p class="pricing-plan__blurb">${esc(plan.blurb)}</p>
              <p class="pricing-plan__price">
                <span class="pricing-plan__amount">${money(plan.price)}</span>
                <span class="pricing-plan__period">/ ${esc(p.period)}</span>
              </p>
              <p class="pricing-plan__time">${icon('clock')} ${esc(plan.time)}</p>
              <ul class="pricing-plan__features" role="list">
                ${plan.features.map((f) => `<li>${icon('check')} ${esc(f)}</li>`).join('')}
              </ul>
              <button class="btn ${plan.popular ? 'btn--primary' : 'btn--outline'} btn--block" type="button" data-action="signup" data-plan="${esc(plan.id)}">Choose ${esc(plan.name)}</button>
            </div>`).join('')}
        </div>
        <ul class="pricing-fees reveal" role="list">
          ${p.fees.map((f) => `
            <li class="pricing-fees__item">
              <span class="pricing-fees__value">${esc(f.value)}</span>
              <span class="pricing-fees__label">${esc(f.label)}</span>
              <span class="pricing-fees__note">${esc(f.note)}</span>
            </li>`).join('')}
        </ul>
      </div>`,

    contact: (c) => {
      const s = site.school;
      return `
      <div class="container contact">
        <div class="contact__info">
          ${head(c, 'contact-title')}
          <ul class="contact__list" role="list">
            <li class="reveal" style="--i:0"><span class="icon-bubble icon-bubble--pink">${icon('pin')}</span><div><strong>Visit us</strong><span>${esc(s.address)}</span></div></li>
            <li class="reveal" style="--i:1"><span class="icon-bubble icon-bubble--purple">${icon('clock')}</span><div><strong>Office hours</strong><span>${esc(s.hours)}</span></div></li>
            <li class="reveal contact__list-action" style="--i:2">
              <button type="button" data-action="open-message">
                <span class="icon-bubble icon-bubble--blue">${icon('chat')}</span>
                <div><strong>Message us</strong><span>For anything our assistant can&rsquo;t answer &mdash; send a note and our team will get back to you.</span></div>
              </button>
            </li>
          </ul>
          <div class="contact__pills reveal" style="--i:3">
            <a class="chip chip--pink contact__pill" href="tel:${esc(s.phone.replace(/\s/g, ''))}">${icon('phone')} Call</a>
            <a class="chip chip--pink contact__pill" href="mailto:${esc(s.email)}">${icon('mail')} Mail</a>
          </div>
        </div>
        <div class="contact__form card reveal">
          <div class="chatbox">
            <div class="chatbox__head">
              <span class="icon-bubble icon-bubble--pink chatbox__avatar">${icon('chat')}</span>
              <div>
                <h3 class="card__title">Ask LittleBloom</h3>
                <p class="chatbox__subtitle">Quick answers about programs, fees, timings and more.</p>
              </div>
            </div>
            <div class="chatbox__messages" id="chatbox-messages" role="log" aria-live="polite" aria-label="Chat with the LittleBloom assistant"></div>
            <div class="chatbox__suggestions">
              <button type="button" class="chip chip--pink" data-chat-suggest="What are your fees?">Fees</button>
              <button type="button" class="chip chip--blue" data-chat-suggest="What are your timings?">Timings</button>
              <button type="button" class="chip chip--green" data-chat-suggest="What programs do you offer?">Programs</button>
              <button type="button" class="chip chip--purple" data-chat-suggest="Where are you located?">Visit us</button>
            </div>
            <form class="chatbox__input" id="chatbox-form" autocomplete="off">
              <label for="chatbox-text" class="visually-hidden">Ask a question</label>
              <input id="chatbox-text" name="message" type="text" placeholder="Ask about fees, timings, programs…" required>
              <button type="submit" class="btn btn--primary" aria-label="Send">${icon('arrow')}</button>
            </form>
          </div>
        </div>
      </div>`;
    },

    footer: (f) => {
      const s = site.school;
      return `
      <div class="container footer">
        <div class="footer__brand">
          <div class="footer__brand-mark">
            <span class="footer__brand-star" data-brand-star aria-hidden="true"></span>
            <span class="footer__brand-name">Little<em>Bloom</em><small>Preschool</small></span>
          </div>
          <p>${esc(f.tagline)}</p>
        </div>
        <nav class="footer__nav" aria-label="Footer">
          <p class="footer__heading">Explore</p>
          <a href="#about">About</a><a href="#features">Features</a><a href="#programs">Our Program</a><a href="#pricing">Pricing</a><a href="#contact">Contact</a>
        </nav>
        <div class="footer__contact">
          <p class="footer__heading">Reach us</p>
          <a href="tel:${esc(s.phone.replace(/\s/g, ''))}">${icon('phone')} ${esc(s.phone)}</a>
          <a href="mailto:${esc(s.email)}">${icon('mail')} ${esc(s.email)}</a>
        </div>
      </div>
      <p class="footer__legal container">© ${new Date().getFullYear()} ${esc(s.name)}.</p>`;
    }
  };

  $$('[data-section]').forEach((el) => {
    const key = el.dataset.section;
    if (renderers[key]) el.innerHTML = renderers[key](site[key]);
  });

  /* ---------- Brand logo: the exact logo region of the hero image ---------- */

  const LOGO = { x: 80, y: 22, w: 275, h: 74 };
  const STAR = { x: 84, y: 28, w: 66, h: 66 };
  const img = window.HERO_IMAGE ?? { src: './assets/images/school.png', width: 1536, height: 1024 };
  const cropTo = (el, box) => Object.assign(el.style, {
    backgroundImage: `url("${img.src}")`,
    backgroundSize: `${(img.width / box.w) * 100}% ${(img.height / box.h) * 100}%`,
    backgroundPosition: `${(box.x / (img.width - box.w)) * 100}% ${(box.y / (img.height - box.h)) * 100}%`,
    aspectRatio: `${box.w} / ${box.h}`
  });
  $$('[data-brand-logo]').forEach((el) => cropTo(el, LOGO));
  $$('[data-brand-star]').forEach((el) => cropTo(el, STAR));

  /* ---------- Select options from content ---------- */

  const options = {
    programs: site.programs.items.map((p) => [p.id, `${p.name} (${p.age})`]),
    plans: site.pricing.plans.map((p) => [p.id, `${p.name} – ${money(p.price)}/${site.pricing.period}`])
  };
  $$('select[data-options]').forEach((select) => {
    (options[select.dataset.options] ?? []).forEach(([value, label]) => select.add(new Option(label, value)));
  });

  const today = new Date();
  const iso = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().slice(0, 10);
  $$('[data-min-today]').forEach((input) => { input.min = iso; });

  /* ---------- Toasts ---------- */

  const toastRegion = $('[data-toasts]');
  const toast = (message) => {
    const el = document.createElement('div');
    el.className = 'toast';
    el.textContent = message;
    toastRegion.appendChild(el);
    requestAnimationFrame(() => el.classList.add('is-in'));
    setTimeout(() => {
      el.classList.remove('is-in');
      setTimeout(() => el.remove(), 400);
    }, 3200);
  };

  /* ---------- Dialogs ---------- */

  const dialogs = {
    signup: $('#signup-dialog'),
    login: $('#login-dialog'),
    video: $('#video-dialog'),
    store: $('#store-dialog'),
    message: $('#message-dialog'),
    search: $('#search-dialog'),
    menu: $('#menu-dialog')
  };

  const openDialog = (name) => {
    const dialog = dialogs[name];
    if (!dialog) return;
    Object.values(dialogs).forEach((d) => d !== dialog && d.open && d.close());
    if (!dialog.open) dialog.showModal();
    document.documentElement.classList.add('has-modal');
  };

  Object.values(dialogs).forEach((dialog) => {
    dialog.addEventListener('close', () => {
      if (!Object.values(dialogs).some((d) => d.open)) document.documentElement.classList.remove('has-modal');
      const form = $('form', dialog);
      if (form && $('[data-view="success"]', dialog) && !$('[data-view="success"]', dialog).hidden) resetForm(form);
    });
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) dialog.close();
    });
  });

  /* ---------- Actions (hotspots, header, cards) ---------- */

  const actions = {
    signup: (trigger) => {
      const form = $('[data-form="signup"]');
      if (trigger.dataset.program) form.elements.program.value = trigger.dataset.program;
      if (trigger.dataset.plan) form.elements.plan.value = trigger.dataset.plan;
      openDialog('signup');
    },
    login: () => openDialog('login'),
    video: () => openDialog('video'),
    menu: () => openDialog('menu'),
    search: () => {
      openDialog('search');
      const input = $('[data-search-input]');
      input.value = '';
      runSearch('');
      input.focus();
    },
    store: (trigger) => {
      $('[data-store-text]').textContent = `The LittleBloom app is coming soon to ${trigger.dataset.store}. Soon, you'll be able to stay connected with your little one's day, wherever you are.`;
      openDialog('store');
    },
    'open-message': () => openDialog('message')
  };

  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-action]');
    if (trigger && actions[trigger.dataset.action]) {
      event.preventDefault();
      actions[trigger.dataset.action](trigger);
      return;
    }
    const closer = event.target.closest('[data-close]');
    if (closer) closer.closest('dialog')?.close();

    const navLink = event.target.closest('dialog a[href^="#"]');
    if (navLink) navLink.closest('dialog').close();
  });

  /* ---------- Parent app feature explorer ---------- */

  const appTabs = $$('[data-app-tab]');
  if (appTabs.length) {
    const phoneIcon = $('[data-app-icon]');
    const phoneText = $('[data-app-text]');
    const phoneCard = phoneIcon?.closest('.app-phone__card');
    const dots = $$('[data-app-dots] span');

    appTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        if (tab.classList.contains('is-active')) return;

        appTabs.forEach((t) => {
          t.classList.toggle('is-active', t === tab);
          t.setAttribute('aria-pressed', t === tab ? 'true' : 'false');
        });
        dots.forEach((d, i) => d.classList.toggle('is-active', i === Number(tab.dataset.appTab)));

        const swap = () => {
          phoneIcon.className = `app-phone__icon icon-bubble icon-bubble--${tab.dataset.color}`;
          phoneIcon.innerHTML = icon(tab.dataset.icon);
          phoneText.textContent = tab.dataset.preview;
        };

        if (reducedMotion.matches || !phoneCard) {
          swap();
        } else {
          phoneCard.classList.add('is-swapping');
          setTimeout(() => {
            swap();
            phoneCard.classList.remove('is-swapping');
          }, 180);
        }
      });
    });
  }

  /* ---------- Forms ---------- */

  const validators = {
    phone: (v) => /^(\+?\d[\d\s-]{8,14}\d)$/.test(v) && v.replace(/\D/g, '').length >= 10 ? '' : 'Enter a 10-digit phone number.',
    user: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || v.replace(/\D/g, '').length >= 10 ? '' : 'Enter a valid email or 10-digit phone number.'
  };

  const fieldError = (input) => {
    const v = input.value.trim();
    const label = $(`label[for="${input.id}"]`)?.childNodes[0]?.textContent.trim() ?? 'This field';
    if (input.required && !v) return `${label} is required.`;
    if (!v) return '';
    if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Enter a valid email address.';
    if (input.minLength > 0 && v.length < input.minLength) return `Please enter at least ${input.minLength} characters.`;
    const rule = validators[input.dataset.validate];
    return rule ? rule(v) : '';
  };

  const showError = (input, message) => {
    const holder = document.getElementById(`${input.id}-error`);
    input.setAttribute('aria-invalid', message ? 'true' : 'false');
    if (holder) {
      holder.textContent = message;
      if (message) input.setAttribute('aria-describedby', holder.id);
    }
    input.closest('.field')?.classList.toggle('is-invalid', Boolean(message));
    input.closest('.field')?.classList.toggle('is-valid', !message && input.value.trim() !== '');
  };

  const resetForm = (form) => {
    form.reset();
    $$('input, select, textarea', form).forEach((el) => {
      el.removeAttribute('aria-invalid');
      el.closest('.field')?.classList.remove('is-invalid', 'is-valid');
      const holder = document.getElementById(`${el.id}-error`);
      if (holder) holder.textContent = '';
    });
    const scope = form.closest('.modal__panel, .contact__form');
    $('[data-view="form"]', scope).hidden = false;
    $('[data-view="success"]', scope).hidden = true;
    $('[data-forgot-note]', scope)?.setAttribute('hidden', '');
  };

  const successCopy = {
    signup: (data) => ({
      title: `Thank you, ${data.parent.split(' ')[0]}!`,
      text: `We’d love to meet ${data.child}. Once this form is connected, our admissions team will call ${data.phone} to plan your visit.`
    }),
    login: () => ({
      title: 'Parent portal coming soon',
      text: 'Your details look good. The parent portal will open here when it launches.'
    }),
    contact: (data) => ({
      title: `Thanks, ${data.name.split(' ')[0]}!`,
      text: 'Your message is ready. Once this form is connected, we’ll reply within one working day.'
    }),
    message: (data) => ({
      title: 'Message sent!',
      text: `Once this form is connected, our team will reply to ${data.email || data.phone} within one working day.`
    })
  };

  $$('form[data-form]').forEach((form) => {
    const fields = $$('input:not([type="checkbox"]), select, textarea', form);

    fields.forEach((input) => {
      input.addEventListener('blur', () => {
        if (input.value.trim() || input.closest('.field')?.classList.contains('is-invalid')) showError(input, fieldError(input));
      });
      input.addEventListener('input', () => {
        if (input.closest('.field')?.classList.contains('is-invalid')) showError(input, fieldError(input));
      });
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const invalid = fields.map((input) => {
        const message = fieldError(input);
        showError(input, message);
        return message ? input : null;
      }).filter(Boolean);

      if (invalid.length) {
        invalid[0].focus();
        return;
      }

      const submit = $('button[type="submit"]', form);
      submit.disabled = true;
      submit.classList.add('is-loading');

      // Prototype only: no network request is made.
      setTimeout(() => {
        submit.disabled = false;
        submit.classList.remove('is-loading');
        const data = Object.fromEntries(new FormData(form));
        const copy = successCopy[form.dataset.form](data);
        const scope = form.closest('.modal__panel, .contact__form');
        $('[data-view="form"]', scope).hidden = true;
        const success = $('[data-view="success"]', scope);
        success.hidden = false;
        $('[data-success-title]', success).textContent = copy.title;
        $('[data-success-text]', success).textContent = copy.text;
        $('[data-success-title]', success).focus();
      }, 700);
    });
  });

  document.addEventListener('click', (event) => {
    if (event.target.closest('[data-reset-form]')) {
      const form = $('[data-form="contact"]');
      resetForm(form);
      form.elements.name.focus();
    }
    if (event.target.closest('[data-forgot]')) {
      $('[data-forgot-note]').hidden = false;
    }
    const toggle = event.target.closest('[data-toggle-password]');
    if (toggle) {
      const input = toggle.previousElementSibling;
      const show = input.type === 'password';
      input.type = show ? 'text' : 'password';
      toggle.setAttribute('aria-pressed', String(show));
      toggle.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
    }
  });

  /* ---------- Search: a curated, visitor-friendly FAQ, not a page-title index ---------- */

  const secure = site.features.pillars.find((p) => p.id === 'secure');
  const holistic = site.features.pillars.find((p) => p.id === 'holistic');
  const [admissionFee, siblingFee] = site.pricing.fees;

  const SEARCH_CATEGORIES = {
    programs: { label: 'Programs', icon: 'book' },
    fees: { label: 'Fees & Admissions', icon: 'calendar-check' },
    care: { label: 'Daily Care', icon: 'heart' },
    about: { label: 'About LittleBloom', icon: 'sparkle' }
  };

  const searchIndex = [
    { category: 'programs', title: 'What programs do you offer?', hint: site.programs.items.map((p) => p.name).join(' · '), href: '#programs', keywords: 'program programs offer curriculum classes course playgroup nursery kg', popular: true },
    { category: 'programs', title: 'Which age group is right for my child?', hint: site.programs.items.map((p) => `${p.name}: ${p.age}`).join(' · '), href: '#programs', keywords: 'age group right child years old toddler' },
    { category: 'programs', title: 'What will my child learn?', hint: site.programs.items.map((p) => p.points[0]).join(' · '), href: '#programs', keywords: 'learn learning curriculum experiences skills' },
    { category: 'programs', title: 'What are the school timings?', hint: site.programs.items.map((p) => `${p.name}: ${p.time}`).join(' · '), href: '#programs', keywords: 'timing timings hours schedule session daily drop off pick up', popular: true },

    { category: 'fees', title: 'What are the school fees?', hint: site.pricing.plans.map((p) => `${p.name} ${money(p.price)}/${site.pricing.period}`).join(' · '), href: '#pricing', keywords: 'fee fees price pricing cost plan plans money how much', popular: true },
    { category: 'fees', title: 'How do I enrol my child?', hint: 'Choose a plan and enquire — we’ll be in touch to plan a visit.', href: '#pricing', keywords: 'enrol enroll enrolment admission apply register join signup sign up' },
    { category: 'fees', title: 'Is there an admission fee?', hint: `${admissionFee.value} — ${admissionFee.label.toLowerCase()}`, href: '#pricing', keywords: 'admission fee one-time onetime registration' },
    { category: 'fees', title: 'Are sibling discounts available?', hint: `${siblingFee.value} ${siblingFee.label.toLowerCase()}`, href: '#pricing', keywords: 'sibling discount second child family' },

    { category: 'care', title: 'How do you keep children safe?', hint: secure.tags.join(' · '), href: '#feature-secure', keywords: 'safe safety security cctv pickup secure', popular: true },
    { category: 'care', title: 'How can I check attendance?', hint: 'The parent app shows check-in and pick-up updates the moment they happen.', href: '#features', keywords: 'attendance check in checkin pickup pick up' },
    { category: 'care', title: 'What meals and activities are provided?', hint: 'Daily meal and activity updates are shared through the parent app.', href: '#features', keywords: 'meals food menu activities activity lunch snack' },
    { category: 'care', title: 'How can I receive updates about my child?', hint: 'Messages and daily updates arrive through the parent app, not a group chat.', href: '#features', keywords: 'updates messages notify communication message teacher' },

    { category: 'about', title: 'What makes LittleBloom special?', hint: site.about.different.items.map((i) => i.title).join(' · '), href: '#about-different-title', keywords: 'special different unique why choose littlebloom' },
    { category: 'about', title: 'What is your approach to early learning?', hint: site.about.philosophy.quote, href: '#about-philosophy-title', keywords: 'approach philosophy montessori method teaching child-led', popular: true },
    { category: 'about', title: 'How do you support children’s development?', hint: holistic.text, href: '#feature-holistic', keywords: 'development growth holistic support social emotional academic' }
  ];

  const results = $('[data-search-results]');
  const empty = $('[data-search-empty]');
  let activeIndex = -1;

  const highlight = (text, terms) => {
    if (!terms.length) return esc(text);
    const pattern = new RegExp(`(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'ig');
    return esc(text).replace(pattern, '<mark>$1</mark>');
  };

  const renderResults = (items, terms) => {
    results.innerHTML = items.map((m, i) => `
      <li>
        <a class="search__result" href="${m.href}" data-result-index="${i}">
          <span class="search__result-icon">${icon(SEARCH_CATEGORIES[m.category].icon)}</span>
          <span class="search__result-body">
            <strong>${highlight(m.title, terms)}</strong>
            <span>${esc(m.hint)}</span>
          </span>
          <span class="search__result-category">${esc(SEARCH_CATEGORIES[m.category].label)}</span>
        </a>
      </li>`).join('');
    activeIndex = -1;
  };

  const runSearch = (query) => {
    const terms = query.toLowerCase().split(/\s+/).filter(Boolean);

    if (!terms.length) {
      const popular = searchIndex.filter((item) => item.popular);
      results.previousElementSibling?.remove();
      results.insertAdjacentHTML('beforebegin', '<p class="search__group-label">Popular searches</p>');
      renderResults(popular, []);
      empty.hidden = true;
      return;
    }

    results.previousElementSibling?.remove();
    const matches = searchIndex.filter((item) => {
      const hay = `${item.title} ${item.hint} ${item.keywords} ${SEARCH_CATEGORIES[item.category].label}`.toLowerCase();
      return terms.every((t) => hay.includes(t));
    });
    renderResults(matches.slice(0, 8), terms);
    empty.hidden = matches.length > 0;
  };

  const searchInput = $('[data-search-input]');
  searchInput.addEventListener('input', (event) => runSearch(event.target.value));

  searchInput.addEventListener('keydown', (event) => {
    const items = $$('.search__result', results);
    if (!items.length) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      activeIndex = Math.min(activeIndex + 1, items.length - 1);
      items[activeIndex].focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
      items[activeIndex].focus();
    }
  });

  results.addEventListener('keydown', (event) => {
    const items = $$('.search__result', results);
    const i = items.indexOf(document.activeElement);
    if (i === -1) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      (items[i + 1] ?? items[0]).focus();
    } else if (event.key === 'ArrowUp') {
      event.preventDefault();
      (items[i - 1] ?? searchInput).focus();
    }
  });

  /* ---------- Feature hotspots: highlight the matching card ---------- */

  window.addEventListener('hashchange', () => {
    const target = document.getElementById(location.hash.slice(1));
    if (target?.classList.contains('pillar')) {
      target.classList.remove('is-highlighted');
      void target.offsetWidth;
      target.classList.add('is-highlighted');
      target.focus({ preventScroll: true });
    }
  });

  /* ---------- Header: show after the hero, mark the current section ---------- */

  const header = $('[data-site-header]');
  const hero = $('.hero');
  const updateHeader = () => {
    const past = window.scrollY > hero.offsetHeight * 0.55;
    header.classList.toggle('is-visible', past);
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  const navLinks = $$('.site-nav a');
  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const id = entry.target.id;
      navLinks.forEach((a) => {
        const active = a.dataset.nav === id;
        a.classList.toggle('is-active', active);
        if (active) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  ['top', 'about', 'features', 'programs', 'pricing', 'contact'].forEach((id) => {
    const el = document.getElementById(id);
    if (el) sectionObserver.observe(el);
  });

  /* ---------- Scroll reveal (once per element) ---------- */

  const reveals = $$('.reveal');
  if (reducedMotion.matches || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('is-in'));
  } else {
    // A position sweep rather than IntersectionObserver alone: a fast flick can
    // jump past an element without it ever intersecting, leaving it hidden.
    let pending = reveals.slice();
    let frame = null;
    const sweep = () => {
      frame = null;
      const line = innerHeight * 0.92;
      pending = pending.filter((el) => {
        if (el.getBoundingClientRect().top >= line) return true;
        el.classList.add('is-in');
        return false;
      });
      if (!pending.length) {
        window.removeEventListener('scroll', schedule);
        window.removeEventListener('resize', schedule);
      }
    };
    const schedule = () => {
      if (frame === null) frame = requestAnimationFrame(sweep);
    };
    window.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    schedule();
  }
})();
