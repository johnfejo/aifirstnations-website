// ── AI FIRST NATIONS · SHARED HEADER & FOOTER ──
// Every public page has <div id="site-header"></div> and <div id="site-footer"></div>.
// This file fills them in, so the menu, contact details and licences are
// edited in ONE place. Change the SITE values below and every page updates.

(function () {
  var SITE = {
    email: 'john@aifirstnations.org.au', // TODO John: confirm which email to use (see site-refresh notes)
    phone: '0429 042 774',
    phoneHref: '+61429042774',
    location: "From Darwin, Larrakia Country · working across FNQ, Torres Strait, NT and Sydney's Northern Beaches",
    reoc: 'CASA.ReOC.8979',
    arn: '1252905',
    abn: '80 732 478 065',
    icn: '9873',
    // Social links — change a link here and every page's footer updates.
    socials: [
      { name: 'LinkedIn', url: 'https://www.linkedin.com/in/john-fejo-690434255',
        icon: '<path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z"/>' },
      { name: 'Facebook', url: 'https://www.facebook.com/share/1CCcq71ohR/',
        icon: '<path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.23 2.68.23v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z"/>' },
      { name: 'Instagram', url: 'https://www.instagram.com/aifirstnations/',
        icon: '<path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.72 3.72 0 0 1-1.38-.9 3.72 3.72 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63c-.79.3-1.46.72-2.12 1.38A5.86 5.86 0 0 0 .63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.56 2.91.3.79.72 1.46 1.38 2.12a5.86 5.86 0 0 0 2.13 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.86 5.86 0 0 0 2.12-1.38 5.86 5.86 0 0 0 1.38-2.12c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.86 5.86 0 0 0-1.38-2.13A5.86 5.86 0 0 0 19.86.63c-.76-.3-1.64-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.4-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z"/>' },
    ],
  };
  window.AIFN_SITE = SITE;

  var NAV = [
    { href: 'schools.html', label: 'Schools' },
    { href: 'rangers.html', label: 'Ranger Groups' },
    { href: 'capability-statement.html', label: 'Government & Industry' },
    { href: 'fieldwork.html', label: 'Field Work' },
    { href: 'research.html', label: 'Research' },
    { href: 'data-sovereignty.html', label: 'Data Sovereignty' },
    { href: 'about.html', label: 'About' },
  ];

  // "Our partners" strip: fills <div id="site-partners"></div>, in this order.
  // Logos live in images/partners/. If a file is missing, the box shows the name instead.
  var PARTNERS = [
    { name: 'KJR', file: 'kjr.png' },
    { name: 'Port of Townsville', file: 'port-of-townsville.png' },
    { name: 'Goondoi Rangers', file: 'goondoi-rangers.png' },
    { name: 'RMIT University', file: 'rmit.png' },
    { name: 'Salty Monkeys', file: 'salty-monkeys.png' },
    { name: 'Kushai', file: 'kushai.png' },
  ];

  var page = (location.pathname.split('/').pop() || 'index.html').replace(/\.html$/, '') || 'index';

  function isCurrent(href) { return href.replace(/\.html$/, '') === page; }

  function header() {
    var links = NAV.map(function (n) {
      return '<li><a href="' + n.href + '"' + (isCurrent(n.href) ? ' aria-current="page"' : '') + '>' + n.label + '</a></li>';
    }).join('');
    return '' +
      '<a class="aifn-skip" href="#main">Skip to main content</a>' +
      '<header class="aifn-header">' +
        '<div class="aifn-header__inner">' +
          '<a class="aifn-brand" href="index.html" aria-label="AI First Nations home">' +
            '<picture><source srcset="images/logo-mark-96.webp" type="image/webp">' +
            '<img src="images/logo-mark-96.png" alt="" width="44" height="52"></picture>' +
            '<span class="aifn-brand__name">AI First Nations<span class="aifn-brand__tag">Drones · AI · Ranger knowledge</span></span>' +
          '</a>' +
          '<nav class="aifn-nav" aria-label="Main">' +
            '<button class="aifn-menu-btn" type="button" aria-expanded="false" aria-controls="aifn-menu">Menu</button>' +
            '<ul id="aifn-menu">' + links +
              '<li><a class="aifn-nav__cta" href="contact.html"' + (isCurrent('contact.html') ? ' aria-current="page"' : '') + '>Contact</a></li>' +
            '</ul>' +
          '</nav>' +
        '</div>' +
      '</header>';
  }

  function socials() {
    return '<ul class="aifn-footer__socials" aria-label="Follow AI First Nations">' +
      SITE.socials.map(function (x) {
        return '<li><a href="' + x.url + '" target="_blank" rel="noopener" aria-label="' + x.name + ' (opens in a new tab)" title="' + x.name + '">' +
          '<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor" aria-hidden="true">' + x.icon + '</svg></a></li>';
      }).join('') + '</ul>';
  }

  function footer() {
    var year = new Date().getFullYear();
    return '' +
      '<footer class="aifn-footer">' +
        '<p class="aifn-footer__location">' + SITE.location + '</p>' +
        '<div class="aifn-footer__inner">' +
          '<div>' +
            '<h2>AI First Nations</h2>' +
            '<p>Indigenous-led drone, AI and ranger services, caring for Country.</p>' +
            '<p class="aifn-footer__creds">CASA ReOC ' + SITE.reoc + ' · ARN ' + SITE.arn + '</p>' +
            '<p class="aifn-footer__creds">AI First Nations (ABN ' + SITE.abn + ') for commercial drone services · ' +
              'AIFN Aboriginal Corporation (ICN ' + SITE.icn + ') for community programs &amp; grants</p>' +
            socials() +
          '</div>' +
          '<div><h2>Work with us</h2><ul>' +
            '<li><a href="schools.html">Schools</a></li>' +
            '<li><a href="ngarrakan-ngardiji/">Ngarrakan Ngardiji lessons</a></li>' +
            '<li><a href="rangers.html">Ranger Groups</a></li>' +
            '<li><a href="capability-statement.html">Government &amp; Industry</a></li>' +
            '<li><a href="services.html">Services</a></li>' +
            '<li><a href="request-quote.html">Request a quote</a></li>' +
          '</ul></div>' +
          '<div><h2>Learn more</h2><ul>' +
            '<li><a href="research.html">Research</a></li>' +
            '<li><a href="data-sovereignty.html">Data sovereignty</a></li>' +
            '<li><a href="afnos.html">AFNOS</a></li>' +
            '<li><a href="projects.html">Projects</a></li>' +
            '<li><a href="advisory.html">Advisory board</a></li>' +
            '<li><a href="about.html">About John</a></li>' +
          '</ul></div>' +
          '<div><h2>Contact</h2><ul>' +
            '<li><a href="tel:' + SITE.phoneHref + '">' + SITE.phone + '</a></li>' +
            '<li><a href="mailto:' + SITE.email + '">' + SITE.email + '</a></li>' +
            '<li><a href="client-portal.html">Client data portal</a></li>' +
            '<li><a href="#" data-aifn-team-portal>Team portal</a></li>' +
            '<li><a href="privacy.html">Privacy policy</a></li>' +
          '</ul></div>' +
        '</div>' +
        '<div class="aifn-footer__bottom">© ' + year + ' AI First Nations. We acknowledge the Traditional Owners of the lands, waters and skies where we work, and pay our respects to Elders past and present.</div>' +
      '</footer>' +
      '<dialog class="aifn-dialog" id="aifn-team-dialog" aria-labelledby="aifn-team-title">' +
        '<h2 id="aifn-team-title">Team portal</h2>' +
        '<p>Enter your access code to continue.</p>' +
        '<label for="aifn-team-code">Access code</label>' +
        '<input id="aifn-team-code" type="password" autocomplete="off">' +
        '<p class="aifn-dialog__err" id="aifn-team-err" hidden>Incorrect access code. Please try again.</p>' +
        '<div class="aifn-dialog__row"><button type="button" class="aifn-dialog__cancel" data-close>Cancel</button>' +
        '<button type="button" class="aifn-dialog__go">Enter portal</button></div>' +
      '</dialog>';
  }

  // Same check as the old home-page pop-up, so the existing team code keeps working.
  var TEAM_HASH = '45e5eabb0f6d4be465ef31e4c22886cd2f4f88fa4c43b8084a5a1dee4dd9c71a';
  function partners() {
    var section = document.createElement('section');
    section.className = 'aifn-partners';
    section.setAttribute('aria-labelledby', 'aifn-partners-title');
    section.innerHTML = '<div class="aifn-partners__inner"><h2 id="aifn-partners-title">Our partners</h2><ul class="aifn-partners__list"></ul></div>';
    var list = section.querySelector('ul');
    PARTNERS.forEach(function (p) {
      var li = document.createElement('li');
      li.className = 'aifn-partner';
      var name = document.createElement('span');
      name.className = 'aifn-partner__name';
      name.textContent = p.name;
      var img = document.createElement('img');
      img.alt = p.name + ' logo';
      // Listener goes on before src, so a missing file can't fail unnoticed.
      img.addEventListener('error', function () { li.classList.add('is-missing'); img.remove(); });
      img.src = 'images/partners/' + p.file;
      li.append(img, name);
      list.appendChild(li);
    });
    return section;
  }

  async function checkTeamCode(code) {
    var buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(code));
    return Array.from(new Uint8Array(buf)).map(function (b) { return b.toString(16).padStart(2, '0'); }).join('') === TEAM_HASH;
  }

  function wire() {
    var btn = document.querySelector('.aifn-menu-btn');
    var menu = document.getElementById('aifn-menu');
    if (btn && menu) {
      btn.addEventListener('click', function () {
        var open = menu.classList.toggle('is-open');
        btn.setAttribute('aria-expanded', open ? 'true' : 'false');
        btn.textContent = open ? 'Close' : 'Menu';
      });
      document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && menu.classList.contains('is-open')) { menu.classList.remove('is-open'); btn.setAttribute('aria-expanded', 'false'); btn.textContent = 'Menu'; btn.focus(); }
      });
    }

    var dlg = document.getElementById('aifn-team-dialog');
    if (dlg && dlg.showModal) {
      var input = document.getElementById('aifn-team-code');
      var err = document.getElementById('aifn-team-err');
      var go = async function () {
        if (await checkTeamCode(input.value)) { sessionStorage.setItem('aifn_portal', 'granted'); location.href = 'portal.html'; }
        else { err.hidden = false; input.value = ''; input.focus(); }
      };
      document.querySelectorAll('[data-aifn-team-portal]').forEach(function (a) {
        a.addEventListener('click', function (e) { e.preventDefault(); err.hidden = true; input.value = ''; dlg.showModal(); input.focus(); });
      });
      dlg.querySelector('.aifn-dialog__go').addEventListener('click', go);
      dlg.querySelector('[data-close]').addEventListener('click', function () { dlg.close(); });
      input.addEventListener('keydown', function (e) { if (e.key === 'Enter') go(); });
    }

    // Any element with data-aifn="phone|email|location" shows the shared value.
    document.querySelectorAll('[data-aifn]').forEach(function (el) {
      var k = el.getAttribute('data-aifn');
      if (k === 'phone') { el.textContent = SITE.phone; if (el.tagName === 'A') el.href = 'tel:' + SITE.phoneHref; }
      else if (k === 'email') { el.textContent = SITE.email; if (el.tagName === 'A') el.href = 'mailto:' + SITE.email; }
      else if (SITE[k]) el.textContent = SITE[k];
    });
  }

  function render() {
    var h = document.getElementById('site-header');
    var f = document.getElementById('site-footer');
    var pt = document.getElementById('site-partners');
    if (pt) pt.replaceWith(partners());
    if (h) h.outerHTML = header();
    if (f) f.outerHTML = footer();
    wire();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', render);
  else render();
})();
