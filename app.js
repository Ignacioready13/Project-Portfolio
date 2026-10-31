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

  function svgExpand() {
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
    p.setAttribute('d', 'M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7');
    s.appendChild(p);
    return s;
  }

  function svgClose() {
    var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', '0 0 24 24');
    s.setAttribute('width', '22');
    s.setAttribute('height', '22');
    s.setAttribute('aria-hidden', 'true');
    var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttribute('fill', 'none');
    p.setAttribute('stroke', 'currentColor');
    p.setAttribute('stroke-width', '2');
    p.setAttribute('stroke-linecap', 'round');
    p.setAttribute('stroke-linejoin', 'round');
    p.setAttribute('d', 'M18 6L6 18M6 6l12 12');
    s.appendChild(p);
    return s;
  }

  function svgDownload() {
    var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', '0 0 24 24');
    s.setAttribute('width', '16');
    s.setAttribute('height', '16');
    s.setAttribute('aria-hidden', 'true');
    var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttribute('fill', 'none');
    p.setAttribute('stroke', 'currentColor');
    p.setAttribute('stroke-width', '2');
    p.setAttribute('stroke-linecap', 'round');
    p.setAttribute('stroke-linejoin', 'round');
    p.setAttribute('d', 'M12 3v12M7 11l5 5 5-5M4 20h16');
    s.appendChild(p);
    return s;
  }

  function svgHome() {
    var s = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    s.setAttribute('viewBox', '0 0 24 24');
    s.setAttribute('width', '16');
    s.setAttribute('height', '16');
    s.setAttribute('aria-hidden', 'true');
    var p = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    p.setAttribute('fill', 'none');
    p.setAttribute('stroke', 'currentColor');
    p.setAttribute('stroke-width', '2');
    p.setAttribute('stroke-linecap', 'round');
    p.setAttribute('stroke-linejoin', 'round');
    p.setAttribute('d', 'M3 10.5L12 3l9 7.5M5 9.5V21h14V9.5');
    s.appendChild(p);
    return s;
  }

  function prefersReducedMotion() {
    return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  }

  /* ---------------------------- thumbnails --------------------------- */
  /* A thumbnail is a still image or a muted, looping, control-less video
     that fills its (square) tile. `thumb` is { type, src, position? }. */
  function buildThumb(thumb) {
    var wrap = make('span', 'thumb');
    if (!thumb || !thumb.src) {
      wrap.className = 'thumb thumb-empty';
      return wrap;
    }
    var position = thumb.position || 'center';
    if (thumb.type === 'video') {
      var v = document.createElement('video');
      v.className = 'thumb-video';
      v.muted = true;
      v.defaultMuted = true;
      v.loop = true;
      v.playsInline = true;
      v.setAttribute('muted', '');
      v.setAttribute('loop', '');
      v.setAttribute('playsinline', '');
      v.setAttribute('preload', 'auto');
      v.setAttribute('disablepictureinpicture', '');
      v.setAttribute('controlslist', 'nodownload noplaybackrate noremoteplayback');
      v.setAttribute('aria-hidden', 'true');
      v.tabIndex = -1;
      v.style.objectPosition = position;
      v.src = thumb.src;
      if (!prefersReducedMotion()) {
        v.autoplay = true;
        v.setAttribute('autoplay', '');
      }
      wrap.appendChild(v);
    } else {
      var img = document.createElement('img');
      img.src = thumb.src;
      img.alt = '';
      img.loading = 'lazy';
      img.style.objectPosition = position;
      wrap.appendChild(img);
    }
    return wrap;
  }

  function thumbForProject(proj) {
    // An explicit `thumb: null` means "no media"; otherwise fall back to the
    // first gallery item so older projects need no extra configuration.
    if ('thumb' in proj) return proj.thumb;
    if (proj.gallery && proj.gallery.length) return proj.gallery[0];
    return null;
  }

  function thumbForItem(item) {
    if (Array.isArray(item.media) && item.media.length) return item.media[0];
    if (item.video) return { type: 'video', src: item.video, position: item.position };
    if (item.image) return { type: 'image', src: item.image, position: item.position };
    return null;
  }

  /* All media for a mini-project card. `media` (an array) wins; the older
     single `image` / `video` fields still work. */
  function mediaForItem(item) {
    if (Array.isArray(item.media) && item.media.length) {
      return item.media.filter(function (m) { return m && m.src; });
    }
    var thumb = thumbForItem(item);
    return thumb ? [thumb] : [];
  }

  function initials(name) {
    var words = String(name || '').trim().split(/\s+/).filter(Boolean);
    if (!words.length) return '?';
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return (words[0][0] + words[1][0]).toUpperCase();
  }

  /* ------------------------------ tabs ------------------------------ */
  function buildTabs() {
    projects.forEach(function (proj, i) {
      var isHome = proj.type === 'home';
      var btn = make('button', 'tab' + (isHome ? ' tab-home' : ''), proj.tab || ('Project ' + (i + 1)));
      if (isHome) {
        btn.textContent = '';
        btn.appendChild(svgHome());
        btn.appendChild(make('span', null, proj.tab || 'Homepage'));
      }
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
        media.addEventListener('click', function () {
          lightbox.open(item, root);
        });
      }

      var expand = make('button', 'media-expand');
      expand.type = 'button';
      expand.setAttribute('aria-label', 'Enlarge');
      expand.appendChild(svgExpand());
      expand.addEventListener('click', function (e) {
        e.stopPropagation();
        lightbox.open(item, root);
      });
      media.appendChild(expand);

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

  /* ---------------------------- lightbox ---------------------------- */
  function buildLightbox() {
    var overlay = make('div', 'lightbox');
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Media viewer');
    overlay.hidden = true;

    var closeBtn = make('button', 'lightbox-close');
    closeBtn.type = 'button';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.appendChild(svgClose());

    var media = make('div', 'lightbox-media');
    var caption = make('p', 'lightbox-caption');
    caption.hidden = true;

    overlay.appendChild(closeBtn);
    overlay.appendChild(media);
    overlay.appendChild(caption);

    document.body.appendChild(overlay);

    var resumeCarousel = null;
    var lastFocus = null;

    function clear() {
      var v = media.querySelector('video');
      if (v) { v.pause(); v.removeAttribute('src'); v.load(); }
      media.textContent = '';
      caption.textContent = '';
      caption.hidden = true;
    }

    function open(item, sourceCarousel) {
      clear();
      resumeCarousel = sourceCarousel || null;
      if (sourceCarousel && sourceCarousel.pause) sourceCarousel.pause();

      if (item && item.type === 'video') {
        var v = document.createElement('video');
        v.setAttribute('controls', '');
        v.setAttribute('autoplay', '');
        v.setAttribute('loop', '');
        v.setAttribute('playsinline', '');
        v.setAttribute('muted', '');
        v.src = item.src;
        media.appendChild(v);
      } else if (item) {
        var img = document.createElement('img');
        img.src = item.src;
        img.alt = item.caption || item.title || '';
        media.appendChild(img);
      }

      if (item && (item.caption || item.title)) {
        caption.textContent = item.caption || item.title;
        caption.hidden = false;
      }

      lastFocus = document.activeElement;
      overlay.hidden = false;
      document.body.style.overflow = 'hidden';
      closeBtn.focus();
    }

    function close() {
      if (overlay.hidden) return;
      overlay.hidden = true;
      document.body.style.overflow = '';
      clear();
      if (resumeCarousel && resumeCarousel.play) resumeCarousel.play();
      resumeCarousel = null;
      if (lastFocus && lastFocus.focus) lastFocus.focus();
      lastFocus = null;
    }

    closeBtn.addEventListener('click', close);

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });

    document.addEventListener('keydown', function (e) {
      if (overlay.hidden) return;
      if (e.key === 'Escape') { e.preventDefault(); close(); }
    });

    return { open: open, close: close };
  }

  /* --------------------------- focus view --------------------------- */
  /* A mini-project card opens into a larger copy of itself: same media,
     title, text and chips, just bigger, over a dimmed backdrop. The gallery
     arrows stay available. Closes on the ✕, a backdrop click or Escape. */
  function buildFocusView() {
    var overlay = make('div', 'focus-view');
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-modal', 'true');
    overlay.setAttribute('aria-label', 'Mini-project details');
    overlay.hidden = true;

    var panel = make('div', 'focus-card');
    panel.setAttribute('tabindex', '-1');

    var closeBtn = make('button', 'focus-close');
    closeBtn.type = 'button';
    closeBtn.setAttribute('aria-label', 'Close');
    closeBtn.appendChild(svgClose());

    var mediaWrap = make('div', 'focus-media');

    var prev = make('button', 'focus-gallery-btn prev');
    prev.type = 'button';
    prev.setAttribute('aria-label', 'Previous media');
    prev.appendChild(svgChevron('left'));

    var next = make('button', 'focus-gallery-btn next');
    next.type = 'button';
    next.setAttribute('aria-label', 'Next media');
    next.appendChild(svgChevron('right'));

    var count = make('span', 'focus-count');
    count.setAttribute('aria-hidden', 'true');

    var caption = make('p', 'focus-caption');
    caption.hidden = true;

    var body = make('div', 'focus-body');
    var title = make('h3', 'focus-title');
    var text = make('p', 'focus-text');
    var footer = make('div', 'focus-footer');

    body.appendChild(title);
    body.appendChild(text);
    body.appendChild(footer);

    mediaWrap.appendChild(prev);
    mediaWrap.appendChild(next);
    mediaWrap.appendChild(count);

    panel.appendChild(closeBtn);
    panel.appendChild(mediaWrap);
    panel.appendChild(caption);
    panel.appendChild(body);
    overlay.appendChild(panel);
    document.body.appendChild(overlay);

    var media = [];
    var frames = [];
    var index = 0;
    var lastFocus = null;
    var resume = [];

    function buildFrame(item) {
      var frame = make('div', 'focus-frame');
      if (item.type === 'video') {
        var v = document.createElement('video');
        v.setAttribute('controls', '');
        v.setAttribute('loop', '');
        v.setAttribute('playsinline', '');
        v.setAttribute('muted', '');
        v.setAttribute('preload', 'metadata');
        v.muted = true;
        v.defaultMuted = true;
        v.src = item.src;
        frame.appendChild(v);
      } else {
        var img = document.createElement('img');
        img.src = item.src;
        img.alt = item.caption || '';
        frame.appendChild(img);
      }
      return frame;
    }

    function playIn(frame) {
      var v = frame.querySelector('video');
      if (!v) return;
      var p = v.play();
      if (p && p.catch) p.catch(function () {});
    }

    function go(i) {
      if (!media.length) return;
      index = (i + media.length) % media.length;
      frames.forEach(function (f, n) {
        var active = n === index;
        f.classList.toggle('active', active);
        var v = f.querySelector('video');
        if (v) {
          if (active) playIn(f); else v.pause();
        }
      });
      var item = media[index] || {};
      caption.textContent = item.caption || '';
      caption.hidden = !item.caption;
      count.textContent = (index + 1) + ' / ' + media.length;
      var multi = media.length > 1;
      prev.hidden = !multi;
      next.hidden = !multi;
      count.hidden = !multi;
    }

    function clear() {
      frames.forEach(function (f) {
        var v = f.querySelector('video');
        if (v) { v.pause(); v.removeAttribute('src'); v.load(); }
        f.remove();
      });
      frames = [];
      media = [];
    }

    function open(item, list, startIndex, card) {
      clear();
      lastFocus = document.activeElement;
      media = (list || []).slice();

      frames = media.map(function (m) {
        var f = buildFrame(m);
        mediaWrap.appendChild(f);
        return f;
      });

      title.textContent = item.title || '';
      text.textContent = item.text || '';
      text.hidden = !item.text;

      footer.textContent = '';
      if (item.skills && item.skills.length) {
        var skillsWrap = make('div', 'card-skills');
        item.skills.forEach(function (s) { skillsWrap.appendChild(make('span', 'chip', s)); });
        footer.appendChild(skillsWrap);
      }
      if (item.github) {
        var link = make('a', 'card-link', 'View on GitHub');
        link.href = item.github;
        link.target = '_blank';
        link.rel = 'noopener';
        footer.appendChild(link);
      }
      footer.hidden = footer.childNodes.length === 0;

      // Pause whatever was playing in the tile behind the overlay.
      resume = [];
      if (card) {
        Array.prototype.slice.call(card.querySelectorAll('video')).forEach(function (v) {
          if (!v.paused) { resume.push(v); v.pause(); }
        });
      }

      overlay.hidden = false;
      document.body.style.overflow = 'hidden';
      panel.scrollTop = 0;
      go(typeof startIndex === 'number' ? startIndex : 0);
      panel.focus();
    }

    function close() {
      if (overlay.hidden) return;
      overlay.hidden = true;
      document.body.style.overflow = '';
      clear();
      resume.forEach(function (v) {
        if (prefersReducedMotion()) return;
        var p = v.play();
        if (p && p.catch) p.catch(function () {});
      });
      resume = [];
      if (lastFocus && lastFocus.focus) lastFocus.focus();
      lastFocus = null;
    }

    prev.addEventListener('click', function () { go(index - 1); });
    next.addEventListener('click', function () { go(index + 1); });
    closeBtn.addEventListener('click', close);

    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) close();
    });

    document.addEventListener('keydown', function (e) {
      if (overlay.hidden) return;
      if (e.key === 'Escape') { e.preventDefault(); close(); }
      else if (e.key === 'ArrowLeft' && media.length > 1) { e.preventDefault(); go(index - 1); }
      else if (e.key === 'ArrowRight' && media.length > 1) { e.preventDefault(); go(index + 1); }
    });

    return { open: open, close: close };
  }

  /* --------------------------- card grid ---------------------------- */
  function buildGrid(proj, panelIndex) {
    var grid = make('div', 'card-grid');
    (proj.items || []).forEach(function (item, itemIndex) {
      var media = mediaForItem(item);
      var current = 0;

      var card = make('article', 'card');
      card.id = 'card-' + panelIndex + '-' + itemIndex;

      // The whole card opens the focused view; only the gallery arrows and
      // links inside the card keep their own behavior.
      card.addEventListener('click', function (e) {
        if (e.target.closest('a, button')) return;
        openFocused();
      });

      var mediaBox = make('div', 'card-media-box');

      var mediaWrap = make('div', 'card-media');
      mediaWrap.setAttribute('role', 'button');
      mediaWrap.setAttribute('tabindex', '0');
      mediaWrap.setAttribute('aria-label', 'Open ' + (item.title || 'project'));
      mediaBox.appendChild(mediaWrap);

      var frames = media.map(function (m) {
        var frame = make('div', 'card-frame');
        frame.appendChild(buildThumb(m));
        mediaWrap.appendChild(frame);
        return frame;
      });

      var countEl = null;

      function go(i) {
        if (!media.length) return;
        current = (i + media.length) % media.length;
        frames.forEach(function (frame, n) {
          var active = n === current;
          frame.classList.toggle('active', active);
          var v = frame.querySelector('video');
          if (!v) return;
          if (active && !prefersReducedMotion()) {
            var p = v.play();
            if (p && p.catch) p.catch(function () {});
          } else {
            v.pause();
          }
        });
        if (countEl) countEl.textContent = (current + 1) + ' / ' + media.length;
      }

      if (media.length > 1) {
        var prev = make('button', 'card-gallery-btn prev');
        prev.type = 'button';
        prev.setAttribute('aria-label', 'Previous media');
        prev.appendChild(svgChevron('left'));
        prev.addEventListener('click', function (e) {
          e.stopPropagation();
          go(current - 1);
        });

        var next = make('button', 'card-gallery-btn next');
        next.type = 'button';
        next.setAttribute('aria-label', 'Next media');
        next.appendChild(svgChevron('right'));
        next.addEventListener('click', function (e) {
          e.stopPropagation();
          go(current + 1);
        });

        countEl = make('span', 'card-count');
        countEl.setAttribute('aria-hidden', 'true');
        mediaBox.appendChild(prev);
        mediaBox.appendChild(next);
        mediaBox.appendChild(countEl);
      }

      var icon = make('span', 'card-media-icon');
      icon.setAttribute('aria-hidden', 'true');
      icon.appendChild(svgExpand());
      mediaWrap.appendChild(icon);

      function openFocused() {
        if (!media.length) return;
        focusView.open(item, media, current, card);
      }

      mediaWrap.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openFocused();
        } else if (media.length > 1 && e.key === 'ArrowLeft') {
          e.preventDefault();
          go(current - 1);
        } else if (media.length > 1 && e.key === 'ArrowRight') {
          e.preventDefault();
          go(current + 1);
        }
      });

      card.appendChild(mediaBox);
      go(0);

      var body = make('div', 'card-body');
      body.appendChild(make('h3', 'card-title', item.title || ''));

      if (item.text) {
        var p = make('p', 'card-text');
        p.textContent = item.text;
        body.appendChild(p);
      }

      if ((item.skills && item.skills.length) || item.github) {
        var footer = make('div', 'card-footer');
        if (item.skills && item.skills.length) {
          var skillsWrap = make('div', 'card-skills');
          item.skills.forEach(function (s) { skillsWrap.appendChild(make('span', 'chip', s)); });
          footer.appendChild(skillsWrap);
        }
        if (item.github) {
          var link = make('a', 'card-link', 'View on GitHub');
          link.href = item.github;
          link.target = '_blank';
          link.rel = 'noopener';
          footer.appendChild(link);
        }
        body.appendChild(footer);
      }

      card.appendChild(body);
      grid.appendChild(card);
    });
    return grid;
  }

  /* --------------------------- downloads ---------------------------- */
  /* A downloadable file rendered as a card with a small preview image. */
  function buildDownloads(list) {
    var wrap = make('div', 'downloads');
    list.forEach(function (d) {
      var link = make('a', 'download-card');
      link.href = d.href;
      link.setAttribute('download', '');
      link.setAttribute('aria-label', 'Download ' + (d.label || d.href));

      var preview = make('div', 'download-preview');
      if (d.preview) {
        var img = document.createElement('img');
        img.src = d.preview;
        img.alt = '';
        img.loading = 'lazy';
        preview.appendChild(img);
      }
      link.appendChild(preview);

      var body = make('div', 'download-body');
      body.appendChild(make('span', 'download-title', d.label || 'Download'));
      if (d.meta) body.appendChild(make('span', 'download-meta', d.meta));
      var cta = make('span', 'download-cta');
      cta.appendChild(svgDownload());
      cta.appendChild(make('span', null, d.cta || 'Download'));
      body.appendChild(cta);
      link.appendChild(body);

      wrap.appendChild(link);
    });
    return wrap;
  }

  /* ---------------------------- homepage ---------------------------- */
  function buildHomeTile(entry) {
    var btn = make('button', 'home-tile');
    btn.type = 'button';
    var thumb = buildThumb(entry.thumb);
    if (!entry.thumb) {
      var badge = make('span', 'thumb-initials', initials(entry.title));
      badge.setAttribute('aria-hidden', 'true');
      thumb.appendChild(badge);
    }
    btn.appendChild(thumb);
    btn.appendChild(make('span', 'home-tile-caption', entry.title));
    btn.addEventListener('click', function () {
      if (typeof entry.itemIndex === 'number') {
        switchTab(entry.projectIndex, { highlight: entry.itemIndex });
      } else {
        switchTab(entry.projectIndex);
      }
    });
    return btn;
  }

  function buildHomeSection(label, entries) {
    var section = make('section', 'home-section');
    section.appendChild(make('h3', 'section-label', label));
    var grid = make('div', 'home-grid');
    entries.forEach(function (entry) { grid.appendChild(buildHomeTile(entry)); });
    section.appendChild(grid);
    return section;
  }

  function buildHomePanel(proj, panelIndex) {
    var panel = make('section', 'panel' + (panelIndex === 0 ? ' active' : ''));
    panel.id = 'panel-' + panelIndex;
    panel.setAttribute('role', 'tabpanel');
    panel.setAttribute('aria-labelledby', 'tab-' + panelIndex);

    var mainEntries = [];
    var miniEntries = [];

    projects.forEach(function (p, i) {
      if (i === panelIndex || p.type === 'home') return;

      if (p.type === 'grid') {
        (p.items || []).forEach(function (item, itemIndex) {
          miniEntries.push({
            title: item.title || 'Mini-project',
            thumb: thumbForItem(item),
            projectIndex: i,
            itemIndex: itemIndex
          });
        });
        return;
      }

      mainEntries.push({
        title: p.tab || p.title || ('Project ' + (i + 1)),
        thumb: thumbForProject(p),
        projectIndex: i
      });
    });

    if (mainEntries.length) panel.appendChild(buildHomeSection('Projects', mainEntries));
    if (miniEntries.length) panel.appendChild(buildHomeSection('Mini-projects', miniEntries));
    return panel;
  }

  /* ---------------------------- panels ------------------------------ */
  function renderSummaryBlocks(blocks) {
    var wrap = make('div', 'summary');
    blocks.forEach(function (block) {
      var b = make('div', 'summary-block');
      if (block.heading) {
        var h = make('h3', 'summary-heading');
        h.innerHTML = block.heading;
        b.appendChild(h);
      }
      b.insertAdjacentHTML('beforeend', (block.paragraphs || []).join(''));
      wrap.appendChild(b);
    });
    return wrap;
  }

  function buildPanels() {
    projects.forEach(function (proj, i) {
      if (proj.type === 'home') {
        panelsEl.appendChild(buildHomePanel(proj, i));
        return;
      }

      var panel = make('section', 'panel' + (i === 0 ? ' active' : ''));
      panel.id = 'panel-' + i;
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', 'tab-' + i);

      panel.appendChild(make('h2', 'project-title', proj.title || proj.tab));
      if (proj.subtitle) panel.appendChild(make('p', 'project-subtitle', proj.subtitle));

      if (proj.type === 'grid') {
        panel.appendChild(buildGrid(proj, i));
        panelsEl.appendChild(panel);
        return;
      }

      var summary = projectText[slugify(proj.tab)] || [];
      var rest = summary.slice();
      var intro = [];
      // Text written before the first heading leads the page, above the
      // carousel; everything from the first heading on comes after it.
      if (rest.length && !rest[0].heading) intro = rest.splice(0, 1);

      if (intro.length) panel.appendChild(renderSummaryBlocks(intro));

      if (proj.gallery && proj.gallery.length) {
        panel.appendChild(buildCarousel(proj.gallery));
      }

      if (rest.length) panel.appendChild(renderSummaryBlocks(rest));

      if (proj.skills && proj.skills.length) {
        panel.appendChild(make('div', 'section-label', 'Skills'));
        var skillsWrap = make('div', 'skills');
        proj.skills.forEach(function (s) {
          skillsWrap.appendChild(make('span', 'chip', s));
        });
        panel.appendChild(skillsWrap);
      }

      if (proj.downloads && proj.downloads.length) {
        panel.appendChild(make('div', 'section-label', 'Download'));
        panel.appendChild(buildDownloads(proj.downloads));
      }

      panelsEl.appendChild(panel);
    });
  }

  /* --------------------------- switching ---------------------------- */
  function switchTab(i, opts) {
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
      p.querySelectorAll('.thumb-video').forEach(function (v) {
        // Only the frame that is showing should play in a card gallery.
        var frame = v.closest('.card-frame');
        if (frame && !frame.classList.contains('active')) return;
        if (active && !prefersReducedMotion()) {
          var playing = v.play();
          if (playing && playing.catch) playing.catch(function () {});
        } else {
          v.pause();
        }
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

    var highlight = (opts && typeof opts.highlight === 'number') ? opts.highlight : -1;
    if (highlight >= 0) {
      var cards = panels[i].querySelectorAll('.card');
      var card = cards[highlight];
      if (card) {
        card.classList.remove('card-highlight');
        void card.offsetWidth;
        card.classList.add('card-highlight');
        window.setTimeout(function () { card.classList.remove('card-highlight'); }, 3200);
        requestAnimationFrame(function () {
          card.scrollIntoView({ behavior: 'smooth', block: 'center' });
        });
        return;
      }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /* ----------------------------- init ------------------------------- */
  var lightbox = buildLightbox();
  var focusView = buildFocusView();
  buildTabs();
  buildPanels();
  switchTab(0);
})();

