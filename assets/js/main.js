// RTistic Pictures — small site scripts. No tracking, no dependencies.
(function () {
  // Mobile navigation toggle
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }

  // Footer year
  var year = document.querySelector('[data-year]');
  if (year) { year.textContent = new Date().getFullYear(); }

  // Request a tool: compose a structured email in the visitor's own mail app.
  // GitHub Pages is a static host and cannot store form posts, so the request
  // travels as an email the visitor sends themselves. Nothing is sent by this
  // page, and the address is shown on the page as a plain fallback.
  var form = document.getElementById('tool-request-form');
  if (form) {
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var name = form.elements['name'].value.trim();
      var email = form.elements['email'].value.trim();
      var doesWhat = form.elements['does'].value.trim();
      var instead = form.elements['instead'].value.trim();
      var subject = 'Tool request from ' + (name || 'a filmmaker');
      var body =
        'Name: ' + name + '\n' +
        'Email: ' + email + '\n\n' +
        'What the tool should do:\n' + doesWhat + '\n\n' +
        'What I do today instead:\n' + instead + '\n';
      window.location.href =
        'mailto:rtisticpictures@gmail.com?subject=' +
        encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
      var note = document.getElementById('tool-request-note');
      if (note) {
        note.textContent =
          'Your email app should now be open with the request written out. ' +
          'Press send there and it reaches the studio. If nothing opened, ' +
          'write to rtisticpictures@gmail.com directly.';
      }
    });
  }

  // Contact form: posts to the studio's contact endpoint, which emails the
  // message to the studio inbox. On any failure the note under the form
  // points the visitor at the studio's email address instead, so a message
  // is never lost to a form error.
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var note = document.getElementById('contact-note');
      var button = contactForm.querySelector('button[type="submit"]');
      if (button) { button.disabled = true; }
      if (note) { note.textContent = 'Sending...'; }
      fetch('https://rtistic-contact.fly.dev/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactForm.elements['name'].value.trim(),
          email: contactForm.elements['email'].value.trim(),
          kind: contactForm.elements['kind'].value,
          message: contactForm.elements['message'].value.trim(),
          company: contactForm.elements['company'].value
        })
      }).then(function (resp) {
        if (!resp.ok) { throw new Error('send failed'); }
        contactForm.hidden = true;
        var thanks = document.getElementById('contact-thanks');
        if (thanks) { thanks.hidden = false; }
      }).catch(function () {
        if (button) { button.disabled = false; }
        if (note) {
          note.textContent =
            'The form could not send just now. Please write to ' +
            'rtisticpictures@gmail.com directly and we will get it just the same.';
        }
      });
    });
  }
})();
