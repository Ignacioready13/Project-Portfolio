/* =========================================================================
   app.js — rendering + tab/carousel behavior.
   You do NOT need to edit this file. Content lives in content.js.
   ========================================================================= */
(function () {
  'use strict';

  var projects = (typeof PROJECTS !== 'undefined' && Array.isArray(PROJECTS)) ? PROJECTS : [];

  var tabsEl = document.getElementById('tabs');
  var toolbarEl = document.getElementById('toolbar');
  var githubBtn = document.getElementById('githubBtn');
  var panelsEl = document.getElementById('panels');

  var projectText = (typeof PROJECT_TEXT !== 'undefined') ? PROJECT_TEXT : {};

  /* ----------------------------- helpers ----------------------------- */
  function make(tag, className, text) {
    var n = document.createElement(tag);
    if (className) n.className = className;
    if (text != null) n.textContent = text;
    return n;
  }

  function slugify(name) {
    return String(name).trim().toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  function svgChevron(dir) {
    var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', '0 0 24 24');
    s.setAttribute('width', '18');
    s.setAttribute('height', '18');
    s.setAttribute('aria-hidden', 'true');
    var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttribute('fill', 'none');
    p.setAttribute('stroke', 'currentColor');
    p.setAttribute('stroke-width', '2');
    p.setAttribute('stroke-linecap', 'round');
    p.setAttribute('stroke-linejoin', 'round');
    p.setAttribute('d', dir === 'left' ? 'M15 18l-6-6 6-6' : 'M9 6l6 6-6 6');
    s.appendChild(p);
    return s;
  }

  /* ------------------------------ tabs ------------------------------ */
  function buildTabs() {
    projects.forEach(function (proj, i) {
      var btn = make('button', 'tab', proj.tab || ('Project ' + (i + 1)));
      btn.id = 'tab-' + i;
      btn.type = 'button';
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', i === 0 ? 'true' : 'false');
      btn.setAttribute('aria-controls', 'panel-' + i);
      btn.addEventListener('click', function () { switchTab(i); });
      tabsEl.appendChild(btn);
    });

    tabsEl.addEventListener('keydown', function (e) {
      var tabs = Array.prototype.slice.call(tabsEl.querySelectorAll('.tab'));
      var idx = tabs.indexOf(document.activeElement);
      if (idx === -1) return;
      var next = null;
      if (e.key === 'ArrowRight') next = (idx + 1) % tabs.length;
      else if (e.key === 'ArrowLeft') next = (idx - 1 + tabs.length) % tabs.length;
      else if (e.key === 'Home') next = 0;
      else if (e.key === 'End') next = tabs.length - 1;
      if (next !== null) { e.preventDefault(); tabs[next].focus(); switchTab(next); }
    });
  }

  /* --------------------------- carousel ----------------------------- */
  function buildCarousel(items) {
    var root = make('div', 'carousel');
    var viewport = make('div', 'viewport');
    viewport.setAttribute('tabindex', '0');
    viewport.setAttribute('role', 'group');
    viewport.setAttribute('aria-roledescription', 'carousel');

    var track = make('div', 'track');
    var current = 0;

    items.forEach(function (item) {
      var slide = make('figure', 'slide');
      var media = make('div', 'slide-media');
      if (item.type === 'video') {
        var v = document.createElement('video');
        v.setAttribute('muted', '');
        v.setAttribute('loop', '');
        v.setAttribute('playsinline', '');
        v.setAttribute('preload', 'metadata');
        v.setAttribute('controls', '');
        v.setAttribute('autoplay', '');
        v.src = item.src;
        media.appendChild(v);
      } else {
        var img = document.createElement('img');
        img.src = item.src;
        img.alt = item.caption || '';
        img.loading = 'lazy';
        media.appendChild(img);
      }
      slide.appendChild(media);
      track.appendChild(slide);
    });

    viewport.appendChild(track);

    var prev = make('button', 'carousel-btn prev');
    prev.type = 'button';
    prev.setAttribute('aria-label', 'Previous slide');
    prev.appendChild(svgChevron('left'));
    var next = make('button', 'carousel-btn next');
    next.type = 'button';
    next.setAttribute('aria-label', 'Next slide');
    next.appendChild(svgChevron('right'));
    viewport.appendChild(prev);
    viewport.appendChild(next);

    var ui = make('div', 'carousel-ui');
    var dots = make('div', 'dots');
    var counter = make('span', 'counter');
    ui.appendChild(dots);
    ui.appendChild(counter);

    var caption = make('figcaption', 'caption');

    items.forEach(function (_, i) {
      var d = make('button', 'dot');
      d.type = 'button';
      d.setAttribute('aria-label', 'Go to slide ' + (i + 1));
      d.addEventListener('click', function () { go(i); });
      dots.appendChild(d);
    });

    root.appendChild(viewport);
    root.appendChild(ui);
    root.appendChild(caption);

    var videos = Array.prototype.slice.call(root.querySelectorAll('video'));
    var slides = Array.prototype.slice.call(root.querySelectorAll('.slide'));

    function go(i) {
      current = (i + items.length) % items.length;
      track.style.transform = 'translateX(' + (-current * 100) + '%)';
      var dotEls = dots.children;
      for (var d = 0; d < dotEls.length; d++) {
        dotEls[d].classList.toggle('active', d === current);
      }
      counter.textContent = (current + 1) + ' / ' + items.length;
      var item = items[current];
      caption.textContent = (item && item.caption) ? item.caption : '';
      videos.forEach(function (v) { v.pause(); });
      var currentVideo = slides[current].querySelector('video');
      if (currentVideo) {
        var playing = currentVideo.play();
        if (playing && playing.catch) playing.catch(function () {});
      }
    }

    prev.addEventListener('click', function () { go(current - 1); });
    next.addEventListener('click', function () { go(current + 1); });

    viewport.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { e.preventDefault(); go(current - 1); }
      else if (e.key === 'ArrowRight') { e.preventDefault(); go(current + 1); }
    });

    if (items.length <= 1) {
      prev.hidden = true;
      next.hidden = true;
      ui.hidden = true;
    }

    root.play = function () {
      var cv = slides[current].querySelector('video');
      if (cv) {
        var p = cv.play();
        if (p && p.catch) p.catch(function () {});
      }
    };
    root.pause = function () {
      videos.forEach(function (v) { v.pause(); });
    };

    go(0);
    return root;
  }

  /* ---------------------------- panels ------------------------------ */
  function buildPanels() {
    projects.forEach(function (proj, i) {
      var panel = make('section', 'panel' + (i === 0 ? ' active' : ''));
      panel.id = 'panel-' + i;
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', 'tab-' + i);

      panel.appendChild(make('h2', 'project-title', proj.title || proj.tab));

      if (proj.subtitle) panel.appendChild(make('p', 'project-subtitle', proj.subtitle));

      var summary = projectText[slugify(proj.tab)] || [];
      if (summary.length) {
        var sumWrap = make('div', 'summary');
        summary.forEach(function (block) {
          var b = make('div', 'summary-block');
          if (block.heading) {
            var h = make('h3', 'summary-heading');
            h.innerHTML = block.heading;
            b.appendChild(h);
          }
          b.insertAdjacentHTML('beforeend', (block.paragraphs || []).join(''));
          sumWrap.appendChild(b);
        });
        panel.appendChild(sumWrap);
      }

      if (proj.gallery && proj.gallery.length) {
        panel.appendChild(make('div', 'section-label', 'Gallery'));
        panel.appendChild(buildCarousel(proj.gallery));
      }

      if (proj.skills && proj.skills.length) {
        panel.appendChild(make('div', 'section-label', 'Skills'));
        var skillsWrap = make('div', 'skills');
        proj.skills.forEach(function (s) {
          skillsWrap.appendChild(make('span', 'chip', s));
        });
        panel.appendChild(skillsWrap);
      }

      panelsEl.appendChild(panel);
    });
  }

  /* --------------------------- switching ---------------------------- */
  function switchTab(i) {
    var tabs = tabsEl.querySelectorAll('.tab');
    tabs.forEach(function (t, idx) {
      t.setAttribute('aria-selected', idx === i ? 'true' : 'false');
    });
    var panels = panelsEl.querySelectorAll('.panel');
    panels.forEach(function (p, idx) {
      var active = idx === i;
      p.classList.toggle('active', active);
      p.querySelectorAll('.carousel').forEach(function (c) {
        if (active && c.play) c.play();
        else if (c.pause) c.pause();
      });
    });

    var proj = projects[i];
    if (proj && proj.github) {
      githubBtn.href = proj.github;
      githubBtn.hidden = false;
      toolbarEl.hidden = false;
    } else {
      githubBtn.hidden = true;
      toolbarEl.hidden = true;
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ----------------------------- init ------------------------------- */
  buildTabs();
  buildPanels();
  switchTab(0);
})();

