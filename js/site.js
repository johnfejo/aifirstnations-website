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
  };
  window.AIFN_SITE = SITE;

  var NAV = [
    { href: 'schools.html', label: 'Schools' },
    { href: 'rangers.html', label: 'Ranger Groups' },
    { href: 'capability-statement.html', label: 'Government & Industry' },
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
          '</div>' +
          '<div><h2>Work with us</h2><ul>' +
            '<li><a href="schools.html">Schools</a></li>' +
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
