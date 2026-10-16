/*
 * A small FAQ-style assistant for the Contact section. It has no server or
 * model behind it — it just matches keywords against the real content
 * already defined in site-content.js (fees, timings, programs, address…)
 * and replies with a plain-language summary built from that data.
 */
(() => {
  const site = window.SITE;
  if (!site) return;

  const $ = (sel, root = document) => root.querySelector(sel);

  const messages = $('#chatbox-messages');
  const form = $('#chatbox-form');
  if (!messages || !form) return;

  const input = $('#chatbox-text', form);
  const money = (n) => `${site.pricing.currency}${n.toLocaleString('en-IN')}`;

  const addMessage = (text, who) => {
    const row = document.createElement('p');
    row.className = `chat-msg chat-msg--${who}`;
    row.textContent = text;
    messages.appendChild(row);
    messages.scrollTop = messages.scrollHeight;
  };

  const answer = (raw) => {
    const q = raw.toLowerCase();
    const s = site.school;

    if (/\b(hi|hello|hey)\b/.test(q)) {
      return `Hello! I can help with programs, fees, timings or how to visit ${s.name}. What would you like to know?`;
    }
    if (/\b(fee|fees|price|pricing|cost|plan|plans)\b/.test(q)) {
      const plans = site.pricing.plans.map((p) => `${p.name} at ${money(p.price)}/${site.pricing.period}`).join(', ');
      const fees = site.pricing.fees.map((f) => `${f.label}: ${f.value}`).join(', ');
      return `Our plans are: ${plans}. Also: ${fees}.`;
    }
    if (/\b(time|timing|timings|hour|hours|open|close)\b/.test(q)) {
      return `We're open ${s.hours}.`;
    }
    if (/\b(address|location|where|visit|direction|reach)\b/.test(q)) {
      return `You'll find us at ${s.address}. Come by any time during office hours!`;
    }
    if (/\b(call|phone|number)\b/.test(q)) {
      return `You can call us at ${s.phone}.`;
    }
    if (/\b(email|mail)\b/.test(q)) {
      return `Reach us by email at ${s.email}.`;
    }
    if (/\b(program|programs|age|class|classes|toddler|nursery|kg|kindergarten)\b/.test(q)) {
      const items = site.programs.items.map((p) => `${p.name} (${p.age})`).join(', ');
      return `Our programs are: ${items}.`;
    }
    if (/\b(app|feature|features|parent app)\b/.test(q)) {
      const pillars = site.features.pillars.map((p) => p.title).join(', ');
      return `The LittleBloom parent app covers: ${pillars}.`;
    }
    if (/\b(about|philosophy|approach|montessori|method)\b/.test(q)) {
      return site.about.lead;
    }
    if (/\b(thank|thanks)\b/.test(q)) {
      return "You're welcome! Anything else you'd like to know?";
    }
    return null;
  };

  const addFallback = () => {
    const row = document.createElement('div');
    row.className = 'chat-msg chat-msg--bot chat-msg--fallback';
    row.innerHTML = `
      <p>I'm not totally sure about that one — but our team can help directly.</p>
      <button type="button" class="btn btn--primary btn--sm" data-action="open-message">Message us</button>
    `;
    messages.appendChild(row);
    messages.scrollTop = messages.scrollHeight;
  };

  const reply = (text) => {
    addMessage(text, 'user');
    setTimeout(() => {
      const result = answer(text);
      if (result) addMessage(result, 'bot');
      else addFallback();
    }, 350);
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    input.value = '';
    reply(text);
  });

  document.addEventListener('click', (event) => {
    const chip = event.target.closest('[data-chat-suggest]');
    if (chip) reply(chip.dataset.chatSuggest);
  });

  addMessage("Hi, I'm the LittleBloom assistant! Ask me about programs, fees, timings or how to visit us.", 'bot');
})();
