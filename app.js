/* sanjayshukla.ai — Robo-Claude showcase. Vanilla JS, no dependencies. */
(function () {
  'use strict';

  // ---- Demo video ---------------------------------------------------------
  // Self-hosted clip is the default (local-first — no third-party embed).
  // To use YouTube/Vimeo instead, clear VIDEO_FILE and set VIDEO_ID/VIDEO_HOST.
  //   Self-host: VIDEO_FILE = '/media/robo-claude-demo.mp4'
  //   YouTube:   VIDEO_ID = 'dQw4w9WgXcQ',  VIDEO_HOST = 'youtube'
  //   Vimeo:     VIDEO_ID = '76979871',     VIDEO_HOST = 'vimeo'
  var VIDEO_FILE = '/media/robo-claude-demo.mp4';
  var VIDEO_POSTER = '/media/robo-claude-demo-poster.jpg';
  var VIDEO_SQUARE = true;   // the demo clip is 1:1; give the modal a square frame
  var VIDEO_ID = '';
  var VIDEO_HOST = 'youtube';

  var $ = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  // ---- Rail drawer (mobile) ----------------------------------------------
  var toggle = $('.rail-toggle');
  var rail = $('#rail');
  var scrim = $('#railScrim');
  function closeRail() {
    if (rail) rail.classList.remove('open');
    if (scrim) scrim.classList.remove('show');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  }
  if (toggle && rail) {
    toggle.addEventListener('click', function () {
      var open = rail.classList.toggle('open');
      if (scrim) scrim.classList.toggle('show', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
  }
  if (scrim) scrim.addEventListener('click', closeRail);
  $$('#rail a').forEach(function (a) { a.addEventListener('click', closeRail); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeRail(); });

  // ---- Active section in nav ---------------------------------------------
  var navMap = {};
  $$('.rail__sections a').forEach(function (a) {
    var id = a.getAttribute('href');
    if (id && id.charAt(0) === '#') navMap[id.slice(1)] = a;
  });
  var sections = $$('section[id]');
  if ('IntersectionObserver' in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var link = navMap[e.target.id];
          if (link) {
            Object.keys(navMap).forEach(function (k) { navMap[k].classList.remove('active'); });
            link.classList.add('active');
          }
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(function (s) { spy.observe(s); });
  }

  // ---- Scroll reveal ------------------------------------------------------
  var reveals = $$('[data-reveal]');
  if ('IntersectionObserver' in window && reveals.length) {
    var ro = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.06 });
    reveals.forEach(function (el) { ro.observe(el); });
  } else {
    reveals.forEach(function (el) { el.classList.add('in'); });
  }

  // ---- Video modal --------------------------------------------------------
  var modal = $('#videoModal');
  var mount = $('#videoMount');
  function embedSrc() {
    if (!VIDEO_ID) return null;
    return VIDEO_HOST === 'vimeo'
      ? 'https://player.vimeo.com/video/' + VIDEO_ID + '?autoplay=1&title=0&byline=0'
      : 'https://www.youtube-nocookie.com/embed/' + VIDEO_ID + '?autoplay=1&rel=0';
  }
  function openModal() {
    if (!modal) return;
    var box = $('.modal__box', modal);
    if (VIDEO_FILE) {
      if (box && VIDEO_SQUARE) box.classList.add('modal__box--square');
      mount.innerHTML =
        '<video controls autoplay playsinline preload="metadata" poster="' + VIDEO_POSTER + '">' +
        '<source src="' + VIDEO_FILE + '" type="video/mp4">' +
        'Your browser can’t play this clip. <a href="' + VIDEO_FILE + '">Download it</a>.' +
        '</video>';
    } else {
      var src = embedSrc();
      if (src) {
        mount.innerHTML = '<iframe src="' + src + '" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>';
      }
    }
    modal.hidden = false;
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    if (!modal) return;
    modal.hidden = true;
    document.body.style.overflow = '';
    var v = $('video', mount);
    if (v) { try { v.pause(); } catch (e) {} }
    mount.innerHTML = ''; // stop playback (iframe or video)
    var box = $('.modal__box', modal);
    if (box) box.classList.remove('modal__box--square');
  }
  $$('[data-video]').forEach(function (b) { b.addEventListener('click', openModal); });
  if (modal) {
    $$('[data-close]', modal).forEach(function (b) { b.addEventListener('click', closeModal); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) closeModal(); });
  }

  // ---- Year (if referenced anywhere) -------------------------------------
  var y = $('[data-year]');
  if (y) y.textContent = new Date().getFullYear();
})();
