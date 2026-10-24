
/*
 * Asa's Future Tutoring Centre
 * Part 3: Client-side form validation, service search, voice search,
 * responsive YouTube video, South African date/countdown,
 * and accessible image lightbox.
 */

'use strict';

document.addEventListener('DOMContentLoaded', () => {

    // =========================================================
    // 1. FORM VALIDATION AND EMAIL PREPARATION
    // =========================================================

    document.querySelectorAll('.js-email-form').forEach((form) => {

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            const status = form.querySelector('.form-status');
            const fields = [
                ...form.querySelectorAll('input, select, textarea')
            ];

            let firstInvalid = null;
            const errors = [];

            // Basic email format validation.
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            fields.forEach((field) => {
                field.removeAttribute('aria-invalid');

                const value = field.value.trim();
                let message = '';

                // Required field validation.
                if (field.required && !value) {
                    message = 'This field is required.';
                }

                // Email validation.
                else if (
                    field.type === 'email' &&
                    value &&
                    !emailPattern.test(value)
                ) {
                    message =
                        'Enter a valid email address, for example name@example.com.';
                }

                // Telephone number validation.
                else if (
                    field.type === 'tel' &&
                    value &&
                    !/^[+()\d\s.-]{7,20}$/.test(value)
                ) {
                    message = 'Enter a valid telephone number.';
                }

                // Message must contain at least 10 characters.
                else if (
                    field.tagName === 'TEXTAREA' &&
                    value &&
                    value.length < 10
                ) {
                    message =
                        'Please enter at least 10 characters.';
                }

                // Message must not exceed 350 words.
                else if (
                    field.tagName === 'TEXTAREA' &&
                    value &&
                    value.split(/\s+/).filter(Boolean).length > 350
                ) {
                    message =
                        'Your message must not exceed 350 words.';
                }

                // Name fields must contain at least two characters.
                else if (
                    field.type === 'text' &&
                    value &&
                    (
                        field.id.toLowerCase().includes('name') ||
                        field.id === 'first' ||
                        field.id === 'surname'
                    ) &&
                    value.length < 2
                ) {
                    message =
                        'Please enter at least 2 characters.';
                }

                // Record validation errors.
                if (message) {
                    field.setAttribute('aria-invalid', 'true');

                    const label =
                        field.labels?.[0]?.textContent
                            ?.replace(':', '')
                            .trim() || field.name || 'Field';

                    errors.push(`${label}: ${message}`);

                    if (!firstInvalid) {
                        firstInvalid = field;
                    }
                }
            });

            // Display validation errors.
            if (errors.length > 0) {
                if (status) {
                    status.textContent =
                        'Please correct the following errors: ' +
                        errors.join(' ');

                    status.classList.add('is-error');
                    status.classList.remove('is-success');
                }

                firstInvalid?.focus();
                return;
            }

            // Prepare the email using all submitted form fields.
            const type =
                form.dataset.formType === 'enquiry'
                    ? 'Tutoring Enquiry'
                    : 'General Contact Message';

            const data = new FormData(form);

            const entries = [...data.entries()].map(
                ([key, value]) =>
                    `${key}: ${String(value).trim()}`
            );

            const body = [
                type,
                '',
                ...entries,
                '',
                "Sent from Asa's Future Tutoring Centre website."
            ].join('\n');

            const subject =
                form.dataset.formType === 'enquiry'
                    ? `Tutoring enquiry: ${
                        data.get('enquiryType') ||
                        data.get('subject') ||
                        'New enquiry'
                    } - ${
                        data.get('first') || ''
                    } ${
                        data.get('surname') || ''
                    }`.trim()
                    : `Website contact: ${
                        data.get('subject') || 'General message'
                    }`;

            // A static website cannot send email directly.
            // Open the visitor's configured email application.
            const mailtoURL =
                'mailto:info@asafuturetutoring.co.za' +
                `?subject=${encodeURIComponent(subject)}` +
                `&body=${encodeURIComponent(body)}`;

            if (status) {
                status.classList.remove('is-error');
                status.classList.add('is-success');

                status.textContent =
                    'Your form has passed validation. ' +
                    'Your email application will open with your ' +
                    'details. Review the email and select Send to deliver it.';
            }

            window.location.href = mailtoURL;
        });
    });


    // =========================================================
    // 2. LIVE MESSAGE COUNTS AND WORD LIMIT
    // =========================================================

    document.querySelectorAll('textarea[maxlength]').forEach(
        (textarea) => {

            const descriptionIds =
                textarea.getAttribute('aria-describedby') || '';

            const countId = descriptionIds
                .split(/\s+/)
                .find((id) => id.endsWith('count'));

            const count = countId
                ? document.getElementById(countId)
                : null;

            const updateCount = () => {
                const characters = textarea.value.length;

                const words = textarea.value.trim()
                    ? textarea.value.trim().split(/\s+/).length
                    : 0;

                const maxCharacters =
                    Number(textarea.getAttribute('maxlength')) || 0;

                if (count) {
                    count.textContent =
                        `${characters}/${maxCharacters} characters · ` +
                        `${words}/350 words`;
                }

                if (words > 350) {
                    textarea.setCustomValidity(
                        'Your message must not exceed 350 words.'
                    );
                } else {
                    textarea.setCustomValidity('');
                }
            };

            textarea.addEventListener('input', updateCount);
            updateCount();
        }
    );


    // =========================================================
    // 3. SERVICE SEARCH
    // =========================================================

    const search = document.querySelector('#service-search');

    if (search) {
        const cards = [
            ...document.querySelectorAll('.service-grid > .card')
        ];

        const result =
            document.querySelector('#service-search-status');

        const filterServices = () => {
            const term = search.value.trim().toLocaleLowerCase();

            let shown = 0;

            cards.forEach((card) => {
                const matches = card.textContent
                    .toLocaleLowerCase()
                    .includes(term);

                card.hidden = !matches;

                if (matches) {
                    shown++;
                }
            });

            if (result) {
                result.textContent =
                    `${shown} service${shown === 1 ? '' : 's'} shown.`;
            }
        };

        search.addEventListener('input', filterServices);

        // Display the initial results.
        filterServices();
    }


    // =========================================================
    // 4. OPTIONAL VOICE SEARCH
    // =========================================================

    const voiceButton =
        document.querySelector('#voice-search-button');

    const searchInput =
        document.querySelector('#service-search');

    if (voiceButton && searchInput) {

        const result =
            document.querySelector('#service-search-status');

        const SpeechRecognition =
            window.SpeechRecognition ||
            window.webkitSpeechRecognition;

        if (!SpeechRecognition) {

            voiceButton.addEventListener('click', () => {
                if (result) {
                    result.textContent =
                        'Voice search is not supported in this browser. ' +
                        'Please type your search instead.';
                }
            });

        } else {

            voiceButton.addEventListener('click', () => {
                const recognition = new SpeechRecognition();

                recognition.lang = 'en-ZA';
                recognition.interimResults = false;
                recognition.maxAlternatives = 1;

                voiceButton.disabled = true;
                voiceButton.textContent = 'Listening...';

                recognition.onresult = (event) => {
                    const transcript =
                        event.results[0][0].transcript;

                    searchInput.value = transcript;

                    // Trigger the service filter.
                    searchInput.dispatchEvent(
                        new Event('input', { bubbles: true })
                    );

                    if (result) {
                        result.textContent =
                            `Voice search: ${transcript}`;
                    }
                };

                recognition.onerror = () => {
                    if (result) {
                        result.textContent =
                            'Voice search could not start. ' +
                            'Check microphone permissions or type your search.';
                    }
                };

                recognition.onend = () => {
                    voiceButton.disabled = false;
                    voiceButton.textContent = '🎙 Search by voice';
                };

                try {
                    recognition.start();
                } catch (error) {
                    voiceButton.disabled = false;
                    voiceButton.textContent = '🎙 Search by voice';

                    if (result) {
                        result.textContent =
                            'Unable to start voice search. Please try again.';
                    }
                }
            });
        }
    }


    // =========================================================
    // 5. RESPONSIVE, CLICK-TO-PLAY YOUTUBE VIDEO
    // =========================================================

    document.querySelectorAll(
        '.video-preview[data-video-id]'
    ).forEach((preview) => {

        const playButton =
            preview.querySelector('.video-play-button');

        if (!playButton) {
            return;
        }

        playButton.addEventListener('click', () => {

            const videoId = preview.dataset.videoId;

            // Standard YouTube video IDs contain 11 characters.
            if (!/^[A-Za-z0-9_-]{11}$/.test(videoId || '')) {
                const result =
                    document.querySelector('#video-status');

                if (result) {
                    result.textContent =
                        'The YouTube video ID is missing or invalid.';
                }

                return;
            }

            const player = document.createElement('iframe');

            // Correct embed URL: do not use Markdown link syntax here.
            player.src =
                `https://www.youtube-nocookie.com/embed/${videoId}` +
                '?autoplay=1&rel=0';

            player.title =
                'Sample mathematics lesson: factoring quadratic expressions';

            player.loading = 'eager';

            player.allow =
                'accelerometer; autoplay; clipboard-write; ' +
                'encrypted-media; gyroscope; picture-in-picture; web-share';

            player.referrerPolicy =
                'strict-origin-when-cross-origin';

            player.allowFullscreen = true;

            player.setAttribute('allowfullscreen', '');

            // The CSS aspect ratio makes the iframe responsive.
            preview.replaceChildren(player);

        }, { once: true });
    });


    // =========================================================
    // 6. SOUTH AFRICAN DATE AND MIDNIGHT COUNTDOWN
    // =========================================================

    const dateDisplay =
        document.getElementById('current-date');

    const countdownDisplay =
        document.getElementById('midnight-countdown');

    if (dateDisplay && countdownDisplay) {

        const timeZone = 'Africa/Johannesburg';

        const dateFormatter = new Intl.DateTimeFormat('en-ZA', {
            timeZone: timeZone,
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const clockFormatter = new Intl.DateTimeFormat('en-GB', {
            timeZone: timeZone,
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hourCycle: 'h23'
        });

        const updateDailyInfo = () => {

            const now = new Date();

            // Show the current date in South Africa.
            dateDisplay.textContent = dateFormatter.format(now);

            // Extract South African clock values.
            const parts = Object.fromEntries(
                clockFormatter.formatToParts(now).map(
                    (part) => [part.type, part.value]
                )
            );

            const hour = Number(parts.hour);
            const minute = Number(parts.minute);
            const second = Number(parts.second);

            // Calculate seconds remaining until midnight.
            const elapsed =
                hour * 3600 + minute * 60 + second;

            const remaining = Math.max(
                0,
                86399 - elapsed
            );

            const hours = String(
                Math.floor(remaining / 3600)
            ).padStart(2, '0');

            const minutes = String(
                Math.floor((remaining % 3600) / 60)
            ).padStart(2, '0');

            const seconds = String(
                remaining % 60
            ).padStart(2, '0');

            countdownDisplay.textContent =
                `${hours}:${minutes}:${seconds}`;
        };

        // Update immediately and then every second.
        updateDailyInfo();

        window.setInterval(updateDailyInfo, 1000);
    }


    // =========================================================
    // 7. ACCESSIBLE IMAGE LIGHTBOX
    // =========================================================

    const lightboxLinks = [
        ...document.querySelectorAll('a[data-lightbox]')
    ];

    if (lightboxLinks.length) {

        const dialog = document.createElement('dialog');

        dialog.className = 'image-lightbox';

        dialog.setAttribute(
            'aria-label',
            'Enlarged image viewer'
        );

        dialog.innerHTML = `
            <button
                type="button"
                class="lightbox-close"
                aria-label="Close enlarged image"
            >×</button>

            <img alt="">

            <p class="lightbox-caption"></p>
        `;

        document.body.append(dialog);

        const image = dialog.querySelector('img');

        const caption =
            dialog.querySelector('.lightbox-caption');

        const closeButton =
            dialog.querySelector('.lightbox-close');

        const closeLightbox = () => {
            if (dialog.open) {
                dialog.close();
            }
        };

        closeButton.addEventListener(
            'click',
            closeLightbox
        );

        // Close when the backdrop is clicked.
        dialog.addEventListener('click', (event) => {
            if (event.target === dialog) {
                closeLightbox();
            }
        });

        // Clear the image after closing.
        dialog.addEventListener('close', () => {
            image.removeAttribute('src');
            image.alt = '';
            caption.textContent = '';
        });

        lightboxLinks.forEach((link) => {

            link.addEventListener('click', (event) => {

                // Preserve the original link if dialogs are unsupported.
                if (typeof dialog.showModal !== 'function') {
                    return;
                }

                event.preventDefault();

                const thumbnail = link.querySelector('img');

                image.src = link.href;

                image.alt =
                    thumbnail?.alt ||
                    link.getAttribute('aria-label') ||
                    'Enlarged website image';

                caption.textContent =
                    thumbnail?.alt || '';

                dialog.showModal();
            });
        });

        // The native dialog also supports Escape to close.
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && dialog.open) {
                closeLightbox();
            }
        });
    }

});

