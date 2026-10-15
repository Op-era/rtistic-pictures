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
})();
