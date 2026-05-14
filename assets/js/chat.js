/* Floating chat widget — submits inquiries to FormSubmit AJAX
   Endpoint: https://formsubmit.co/ajax/keylee.to801@yahoo.com
   First submission triggers an activation email to keylee.to801@yahoo.com.
   Keylee clicks "Activate" once, then all subsequent submissions deliver. */

(function () {
  'use strict';

  const FORMSUBMIT_ENDPOINT = 'https://formsubmit.co/ajax/keylee.to801@yahoo.com';

  const fab = document.querySelector('.chat-fab');
  const panel = document.querySelector('.chat-panel');
  const closeBtn = document.querySelector('.chat-panel__close');
  const form = document.querySelector('.chat-form');

  if (!fab || !panel || !form) return;

  function openPanel() {
    panel.setAttribute('data-open', 'true');
    fab.setAttribute('data-open', 'true');
    fab.setAttribute('aria-expanded', 'true');
    const first = form.querySelector('input, select, textarea');
    if (first) setTimeout(() => first.focus(), 320);
  }

  function closePanel() {
    panel.setAttribute('data-open', 'false');
    fab.setAttribute('data-open', 'false');
    fab.setAttribute('aria-expanded', 'false');
  }

  fab.addEventListener('click', openPanel);
  closeBtn?.addEventListener('click', closePanel);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && panel.getAttribute('data-open') === 'true') closePanel();
  });

  function buildSuccessMessage(firstName) {
    const wrap = document.createElement('div');
    wrap.className = 'chat-bubble';
    wrap.style.background = 'var(--sage)';
    wrap.style.color = 'var(--surface)';
    wrap.style.maxWidth = '100%';

    const head = document.createElement('strong');
    head.style.color = 'var(--surface)';
    head.textContent = 'Got it, ' + (firstName || 'friend') + '! ✓';
    wrap.appendChild(head);

    wrap.appendChild(document.createElement('br'));

    const body = document.createTextNode(
      "I'll email you back today. If it's after 9pm, expect a reply first thing in the morning."
    );
    wrap.appendChild(body);

    wrap.appendChild(document.createElement('br'));
    wrap.appendChild(document.createElement('br'));

    const sig = document.createElement('em');
    sig.style.opacity = '0.9';
    sig.textContent = '— Keylee';
    wrap.appendChild(sig);

    return wrap;
  }

  function buildErrorMessage() {
    const error = document.createElement('p');
    error.style.color = 'var(--accent)';
    error.style.fontSize = '0.85rem';
    error.style.marginTop = '0.5rem';
    error.textContent =
      'Sorry — something went wrong. Please email me directly at keylee.to801@yahoo.com.';
    return error;
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submit = form.querySelector('.chat-form__submit');
    const original = submit.textContent;
    submit.disabled = true;
    submit.textContent = 'Sending…';

    const data = {
      name: form.querySelector('[name="name"]').value.trim(),
      email: form.querySelector('[name="email"]').value.trim(),
      service: form.querySelector('[name="service"]').value,
      message: form.querySelector('[name="message"]').value.trim(),
      _subject: "New cleaning inquiry — Keylee's site",
      _template: 'table',
      _captcha: 'false'
    };

    try {
      const res = await fetch(FORMSUBMIT_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!res.ok) throw new Error('Network response was not ok');

      const firstName = (data.name.split(' ')[0] || '').slice(0, 40);
      form.replaceWith(buildSuccessMessage(firstName));
    } catch (err) {
      submit.disabled = false;
      submit.textContent = original;
      form.appendChild(buildErrorMessage());
    }
  });
})();
