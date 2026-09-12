(() => {
  'use strict';
  const states = new WeakMap();
  const chinese = document.documentElement.lang.toLowerCase().startsWith('zh');
  const label = chinese ? '\u5716\u7247\u8f09\u5165\u4e2d\u2026' : 'Loading image...';
  const failedLabel = chinese ? '\u5716\u7247\u8f09\u5165\u5931\u6557\uff0c\u9ede\u64ca\u91cd\u8a66' : 'Image failed to load. Retry';

  function init(img) {
    if (states.has(img)) return states.get(img);
    const parent = img.parentElement;
    if (getComputedStyle(img).aspectRatio.startsWith('auto') && img.hasAttribute('width') && img.hasAttribute('height')) {
      img.style.aspectRatio = `${img.getAttribute('width')} / ${img.getAttribute('height')}`;
    }
    if (getComputedStyle(parent).position === 'static') parent.style.position = 'relative';
    // Cloned storyboard cards may already include a status element.
    const old = img.nextElementSibling;
    if (old?.classList.contains('image-status')) old.remove();
    const overlay = document.createElement('span');
    overlay.className = 'image-status';
    overlay.style.backgroundImage = `url("${img.dataset.imagePreview}")`;
    const text = document.createElement('span');
    text.textContent = label;
    overlay.append(text);
    img.after(overlay);
    const state = { overlay, failed: false, ready: false };
    states.set(img, state);
    function place() {
      overlay.style.left = `${img.offsetLeft}px`;
      overlay.style.top = `${img.offsetTop}px`;
      overlay.style.width = `${img.offsetWidth}px`;
      overlay.style.height = `${img.offsetHeight}px`;
    }
    new ResizeObserver(place).observe(img);
    function loaded() {
      if (!img.naturalWidth) return;
      state.ready = true;
      state.failed = false;
      overlay.hidden = true;
    }
    function failure() {
      state.failed = true;
      overlay.hidden = false;
      const retry = document.createElement('button');
      retry.type = 'button';
      retry.textContent = failedLabel;
      retry.addEventListener('click', () => {
        state.failed = false;
        overlay.replaceChildren(text);
        const src = img.getAttribute('src');
        const srcset = img.getAttribute('srcset');
        img.removeAttribute('srcset');
        img.removeAttribute('src');
        if (srcset) img.setAttribute('srcset', srcset);
        if (src) img.src = src;
      });
      overlay.replaceChildren(retry);
    }
    img.addEventListener('load', loaded);
    img.addEventListener('error', failure);
    place();
    if (img.complete && img.getAttribute('src')) {
      if (img.naturalWidth) loaded(); else failure();
    }
    return state;
  }

  function prepare(img) {
    const state = init(img);
    img.loading = 'eager';
    if (img.dataset.slideSrc) {
      if (img.dataset.slideSrcset) img.srcset = img.dataset.slideSrcset;
      img.src = img.dataset.slideSrc;
      delete img.dataset.slideSrc;
      delete img.dataset.slideSrcset;
    }
    return state;
  }

  function visible(el) {
    const r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && r.bottom > -300 && r.top < innerHeight + 300;
  }

  function startSlideshow(root) {
    const slides = [...root.querySelectorAll('img')];
    if (slides.length < 2) return;
    let active = Math.max(0, slides.findIndex(img => img.classList.contains('is-active')));
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = setInterval(() => {
      if (!root.isConnected) { clearInterval(timer); return; }
      if (document.hidden || !visible(root)) return;
      prepare(slides[active]);
      if (reduced) return;
      const next = (active + 1) % slides.length;
      const upcoming = prepare(slides[next]);
      if (!upcoming.ready) return;
      slides[active].classList.remove('is-active');
      slides[next].classList.add('is-active');
      active = next;
      prepare(slides[(active + 1) % slides.length]);
    }, 3000);
  }

  document.querySelectorAll('img[data-image-preview]').forEach(init);
  new MutationObserver(records => {
    records.forEach(record => record.addedNodes.forEach(node => {
      if (node.nodeType !== 1) return;
      if (node.matches('img[data-image-preview]')) init(node);
      node.querySelectorAll('img[data-image-preview]').forEach(init);
    }));
  }).observe(document.body, { childList: true, subtree: true });
  window.portfolioMedia = { startSlideshow };
})();
