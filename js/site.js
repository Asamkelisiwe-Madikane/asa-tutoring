/* Part 3: client-side validation, service search, and accessible image lightbox. */
'use strict';

document.addEventListener('DOMContentLoaded', () => {
  // Validate each form, trim whitespace, and prepare an email containing every submitted field.
  document.querySelectorAll('.js-email-form').forEach((form) => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const status = form.querySelector('.form-status');
      const fields = [...form.querySelectorAll('input, select, textarea')];
      let firstInvalid = null;
      const errors = [];
      const emailPattern = /^[\w.!#$%&'*+/=?^`{|}~-]+@[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?(?:\.[a-z\d](?:[a-z\d-]{0,61}[a-z\d])?)*$/i;

      fields.forEach((field) => {
        field.removeAttribute('aria-invalid');
        const value = field.value.trim();
        let message = '';
        if (field.required && !value) message = 'This field is required.';
        else if (field.type === 'email' && value && !emailPattern.test(value)) message = 'Enter a valid email address, for example name@example.com.';
        else if (field.type === 'tel' && value && !/^[+()\d\s.-]{7,20}$/.test(value)) message = 'Enter a valid telephone number.';
        else if (field.tagName === 'TEXTAREA' && value.length < 10) message = 'Please enter at least 10 characters.';
        else if (field.tagName === 'TEXTAREA' && value.split(/\s+/).filter(Boolean).length > 350) message = 'Your message must not exceed 350 words.';
        else if (field.type === 'text' && value && (field.id.toLowerCase().includes('name') || field.id === 'first' || field.id === 'surname') && value.length < 2) message = 'Please enter at least 2 characters.';
        if (message) {
          field.setAttribute('aria-invalid', 'true');
          errors.push(`${field.labels?.[0]?.textContent?.replace(':', '').trim() || field.name}: ${message}`);
          if (!firstInvalid) firstInvalid = field;
        }
      });

      if (errors.length) {
        status.textContent = `Please correct the following errors: ${errors.join(' ')}`;
        status.classList.add('is-error');
        status.classList.remove('is-success');
        firstInvalid?.focus();
        return;
      }

      const type = form.dataset.formType === 'enquiry' ? 'Tutoring Enquiry' : 'General Contact Message';
      const data = new FormData(form);
      const entries = [...data.entries()].map(([key, value]) => `${key}: ${String(value).trim()}`);
      const body = [`${type}`, '', ...entries, '', "Sent from Asa's Future Tutoring Centre website."].join('\n');
      const subject = form.dataset.formType === 'enquiry'
        ? `Tutoring enquiry: ${data.get('enquiryType') || data.get('subject') || 'New enquiry'} - ${data.get('first') || ''} ${data.get('surname') || ''}`.trim()
        : `Website contact: ${data.get('subject') || 'General message'}`;
      status.classList.remove('is-error');
      status.classList.add('is-success');
      status.textContent = 'Form submitted successfully: your details passed validation. Your email application will open with the information you entered, including your message. Review it and select Send to deliver it.';
      // A static website cannot send mail itself; mailto opens the user's configured email application.
      window.location.href = `mailto:info@asafuturetutoring.co.za?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    });
  });

  // Update live message character and word counts and explain the limits.
  document.querySelectorAll('textarea[maxlength="350"]').forEach((textarea) => {
    const count = document.getElementById(textarea.getAttribute('aria-describedby')?.split(' ').find((id) => id.endsWith('count')) || '');
    const updateCount = () => {
      const chars = textarea.value.length;
      const words = textarea.value.trim() ? textarea.value.trim().split(/\s+/).length : 0;
      if (count) count.textContent = `${chars}/350 characters · ${words}/350 words`;
      if (words > 350) textarea.setCustomValidity('Your message must not exceed 350 words.');
      else textarea.setCustomValidity('');
    };
    textarea.addEventListener('input', updateCount);
    updateCount();
  });

  // Filter the service cards as the visitor types.
  const search = document.querySelector('#service-search');
  if (search) {
    const cards = [...document.querySelectorAll('.service-grid > .card')];
    const result = document.querySelector('#service-search-status');
    search.addEventListener('input', () => {
      const term = search.value.trim().toLocaleLowerCase();
      let shown = 0;
      cards.forEach((card) => {
        const matches = card.textContent.toLocaleLowerCase().includes(term);
        card.hidden = !matches;
        if (matches) shown += 1;
      });
      result.textContent = `${shown} service${shown === 1 ? '' : 's'} shown.`;
    });
  }

  // Optional voice search using the Web Speech API where supported by the browser.
  const voiceButton = document.querySelector('#voice-search-button');
  const searchInput = document.querySelector('#service-search');
  if (voiceButton && searchInput) {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      voiceButton.addEventListener('click', () => {
        const result = document.querySelector('#service-search-status');
        if (result) result.textContent = 'Voice search is not supported in this browser. Please type your search instead.';
      });
    } else {
      voiceButton.addEventListener('click', () => {
        const recognition = new SpeechRecognition();
        recognition.lang = 'en-ZA';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        voiceButton.textContent = 'Listening…';
        recognition.onresult = (event) => {
          searchInput.value = event.results[0][0].transcript;
          searchInput.dispatchEvent(new Event('input', { bubbles: true }));
        };
        recognition.onerror = () => {
          const result = document.querySelector('#service-search-status');
          if (result) result.textContent = 'Voice search could not start. Check microphone permission or type your search.';
        };
        recognition.onend = () => { voiceButton.textContent = '🎙 Search by voice'; };
        recognition.start();
      });
    }
  }

  // Load the YouTube player only when the visitor chooses to play it, improving initial page speed.
  document.querySelectorAll('.video-preview[data-video-id]').forEach((preview) => {
    const playButton = preview.querySelector('.video-play-button');
    if (!playButton) return;
    playButton.addEventListener('click', () => {
      const videoId = preview.dataset.videoId;
      if (!/^[A-Za-z0-9_-]+$/.test(videoId || '')) return;
      const player = document.createElement('iframe');
      player.src = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;
      player.title = 'Sample mathematics lesson: factoring quadratic expressions';
      player.loading = 'eager';
      player.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';
      player.referrerPolicy = 'strict-origin-when-cross-origin';
      player.allowFullscreen = true;
      player.setAttribute('allowfullscreen', '');
      preview.replaceChildren(player);
    }, { once: true });
  });

  // Display the current South African date and a live countdown to midnight.
  const dateDisplay = document.getElementById('current-date');
  const countdownDisplay = document.getElementById('midnight-countdown');
  if (dateDisplay && countdownDisplay) {
    const southAfricanClock = new Intl.DateTimeFormat('en-ZA', {
      timeZone: 'Africa/Johannesburg', hour: '2-digit', minute: '2-digit', second: '2-digit', hourCycle: 'h23'
    });
    const southAfricanDate = new Intl.DateTimeFormat('en-ZA', {
      timeZone: 'Africa/Johannesburg', weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
    const updateDailyInfo = () => {
      const now = new Date();
      dateDisplay.textContent = southAfricanDate.format(now);
      const parts = Object.fromEntries(southAfricanClock.formatToParts(now).map((part) => [part.type, part.value]));
      const hour = Number(parts.hour);
      const minute = Number(parts.minute);
      const second = Number(parts.second);
      let remaining = (23 - hour) * 3600 + (59 - minute) * 60 + (59 - second);
      if (remaining < 0) remaining = 0;
      const hours = String(Math.floor(remaining / 3600)).padStart(2, '0');
      const minutes = String(Math.floor((remaining % 3600) / 60)).padStart(2, '0');
      const seconds = String(remaining % 60).padStart(2, '0');
      countdownDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    };
    updateDailyInfo();
    window.setInterval(updateDailyInfo, 1000);
  }

  // Turn linked content images into a keyboard-accessible lightbox modal.
  const lightboxLinks = [...document.querySelectorAll('a[data-lightbox]')];
  if (lightboxLinks.length) {
    const dialog = document.createElement('dialog');
    dialog.className = 'image-lightbox';
    dialog.setAttribute('aria-label', 'Enlarged image viewer');
    dialog.innerHTML = '<button type="button" class="lightbox-close" aria-label="Close enlarged image">×</button><img alt=""><p class="lightbox-caption"></p>';
    document.body.append(dialog);
    const image = dialog.querySelector('img');
    const caption = dialog.querySelector('.lightbox-caption');
    const close = () => dialog.close();
    dialog.querySelector('.lightbox-close').addEventListener('click', close);
    dialog.addEventListener('click', (event) => { if (event.target === dialog) close(); });
    dialog.addEventListener('close', () => { image.removeAttribute('src'); });
    lightboxLinks.forEach((link) => {
      link.addEventListener('click', (event) => {
        if (typeof dialog.showModal !== 'function') return; // Keep the original link as a fallback.
        event.preventDefault();
        const thumb = link.querySelector('img');
        image.src = link.href;
        image.alt = thumb?.alt || link.getAttribute('aria-label') || 'Enlarged website image';
        caption.textContent = thumb?.alt || '';
        dialog.showModal();
      });
    });
    document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && dialog.open) close(); });
  }
});
