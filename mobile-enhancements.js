(() => {
  "use strict";

  const isMobile = window.matchMedia("(max-width: 820px)");
  const pageIsChinese = document.documentElement.lang.toLowerCase().startsWith("zh");

  const lockPage = (className) => {
    const y = window.scrollY;
    document.body.dataset.lockScrollY = String(y);
    document.body.classList.add(className);
    document.body.style.top = `-${y}px`;
    document.body.style.position = "fixed";
    document.body.style.width = "100%";
  };

  const unlockPage = (className) => {
    const y = Number(document.body.dataset.lockScrollY || 0);
    document.body.classList.remove(className);
    document.body.style.top = "";
    document.body.style.position = "";
    document.body.style.width = "";
    delete document.body.dataset.lockScrollY;
    window.scrollTo(0, y);
  };

  const header = document.querySelector(".a-header, .case-nav");
  const nav = header?.querySelector("nav");
  if (header && nav) {
    const projectLink = [...nav.querySelectorAll("a")].find((link) => (link.getAttribute("href") || "").includes("#a-projects"));
    const hasWritingLink = [...nav.querySelectorAll("a")].some((link) => (link.getAttribute("href") || "").includes("#a-writing"));
    if (projectLink && !hasWritingLink) {
      const writingLink = document.createElement("a");
      writingLink.href = projectLink.getAttribute("href").replace("#a-projects", "#a-writing");
      writingLink.textContent = pageIsChinese ? "寫作" : "Writing";
      projectLink.after(writingLink);
    }
    const cv = [...nav.querySelectorAll("a")].find((link) => /\.pdf(?:$|\?)/i.test(link.getAttribute("href") || ""));
    if (cv) {
      const clone = cv.cloneNode(true);
      clone.className = "mobile-header-cv";
      clone.removeAttribute("aria-current");
      header.appendChild(clone);
    }
    const button = document.createElement("button");
    button.type = "button";
    button.className = "mobile-menu-button";
    button.setAttribute("aria-label", pageIsChinese ? "打開導覽選單" : "Open navigation menu");
    button.setAttribute("aria-expanded", "false");
    button.innerHTML = "<span></span><span></span>";
    header.appendChild(button);

    const closeMenu = ({ restoreFocus = false } = {}) => {
      if (!document.body.classList.contains("mobile-menu-open")) return;
      unlockPage("mobile-menu-open");
      button.setAttribute("aria-expanded", "false");
      button.setAttribute("aria-label", pageIsChinese ? "打開導覽選單" : "Open navigation menu");
      if (restoreFocus) button.focus();
    };
    const openMenu = () => {
      lockPage("mobile-menu-open");
      button.setAttribute("aria-expanded", "true");
      button.setAttribute("aria-label", pageIsChinese ? "關閉導覽選單" : "Close navigation menu");
      nav.querySelector("a")?.focus();
    };
    button.addEventListener("click", () => document.body.classList.contains("mobile-menu-open") ? closeMenu() : openMenu());
    nav.addEventListener("click", (event) => { if (event.target.closest("a")) closeMenu(); });
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeMenu({ restoreFocus: true });
      if (event.key !== "Tab" || !document.body.classList.contains("mobile-menu-open")) return;
      const focusables = [...nav.querySelectorAll("a"), button];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    });
    isMobile.addEventListener("change", (event) => { if (!event.matches) closeMenu(); });
  }

  document.querySelectorAll(".scene-strip[data-auto-strip]").forEach((strip) => {
    if (!isMobile.matches) return;
    const viewport = strip.querySelector(".cat-asset-viewport");
    const track = strip.querySelector(".cat-asset-track");
    if (!viewport || !track) return;
    track.querySelectorAll('[aria-hidden="true"]').forEach((item) => item.remove());
    const slides = [...track.children];
    if (slides.length < 2) return;
    const controls = document.createElement("div");
    controls.className = "storyboard-mobile-controls";
    controls.innerHTML = `<button type="button" data-story-prev aria-label="${pageIsChinese ? "上一張" : "Previous slide"}">←</button><span class="storyboard-mobile-count" aria-live="polite">1 / ${slides.length}</span><button type="button" data-story-next aria-label="${pageIsChinese ? "下一張" : "Next slide"}">→</button>`;
    strip.appendChild(controls);
    const count = controls.querySelector(".storyboard-mobile-count");
    const current = () => Math.max(0, Math.min(slides.length - 1, Math.round(viewport.scrollLeft / (slides[0].getBoundingClientRect().width + 12))));
    const go = (delta) => slides[Math.max(0, Math.min(slides.length - 1, current() + delta))]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
    controls.querySelector("[data-story-prev]").addEventListener("click", () => go(-1));
    controls.querySelector("[data-story-next]").addEventListener("click", () => go(1));
    let frame = 0;
    viewport.addEventListener("scroll", () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => { count.textContent = `${current() + 1} / ${slides.length}`; });
    }, { passive: true });
  });

  const lightbox = document.createElement("div");
  lightbox.className = "media-lightbox";
  lightbox.hidden = true;
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-label", pageIsChinese ? "圖片放大檢視" : "Enlarged image");
  lightbox.innerHTML = `<button class="media-lightbox-close" type="button" aria-label="${pageIsChinese ? "關閉" : "Close"}">×</button><img alt="" />`;
  document.body.appendChild(lightbox);
  let lightboxTrigger = null;
  const closeLightbox = () => {
    if (lightbox.hidden) return;
    lightbox.hidden = true;
    unlockPage("media-lightbox-open");
    lightboxTrigger?.focus();
  };
  document.querySelectorAll(".case-nav ~ main figure img").forEach((img) => {
    img.tabIndex = 0;
    img.setAttribute("role", "button");
    img.setAttribute("aria-label", `${img.alt || (pageIsChinese ? "圖片" : "Image")} · ${pageIsChinese ? "點擊放大" : "Open enlarged view"}`);
    const open = () => {
      lightboxTrigger = img;
      const target = lightbox.querySelector("img");
      target.src = img.currentSrc || img.src || img.dataset.slideSrc;
      target.alt = img.alt;
      lightbox.hidden = false;
      lockPage("media-lightbox-open");
      lightbox.querySelector("button").focus();
    };
    img.addEventListener("click", open);
    img.addEventListener("keydown", (event) => { if (event.key === "Enter" || event.key === " ") { event.preventDefault(); open(); } });
  });
  lightbox.addEventListener("click", (event) => { if (event.target === lightbox || event.target.closest("button")) closeLightbox(); });
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") closeLightbox(); });

  const hydrateVideo = (video) => {
    video.querySelectorAll("source[data-src]").forEach((source) => { source.src = source.dataset.src; source.removeAttribute("data-src"); });
    video.load();
    video.closest(".project-video")?.classList.add("is-ready");
  };
  document.querySelectorAll(".project-video video").forEach((video) => {
    if (!video.querySelector("source[data-src]")) return;
    if (!isMobile.matches) { hydrateVideo(video); return; }
    const action = document.createElement("button");
    action.type = "button";
    action.className = "mobile-media-action";
    action.textContent = pageIsChinese ? "播放" : "Play";
    video.closest(".project-video")?.appendChild(action);
    action.addEventListener("click", async () => { hydrateVideo(video); try { await video.play(); } catch (_) {} });
  });

  document.querySelectorAll(".online-platform-frame[data-desktop-src]").forEach((frame) => {
    if (!isMobile.matches) { frame.src = frame.dataset.desktopSrc; return; }
    const panel = frame.closest(".online-platform-panel");
    const link = panel?.querySelector(".online-platform-link");
    const preview = document.createElement("div");
    preview.className = "mobile-embed-preview";
    const title = frame.title || (pageIsChinese ? "互動網頁原型" : "Interactive web prototype");
    const src = frame.dataset.desktopSrc;
    const prefix = src.startsWith("../../") ? "../../" : "../";
    const isDraw = /draw\.html/i.test(src);
    const imageSrc = isDraw
      ? `${prefix}assets/public-opinion/questions/q-01.jpg`
      : `${prefix}demos/public-opinion-online/${pageIsChinese ? "zh-Hant" : "en"}/brand/community-opinions-title.png`;
    preview.innerHTML = `<img src="${imageSrc}" alt="" loading="lazy"><div><strong>${title}</strong>${link ? `<a href="${link.href}" target="_blank" rel="noopener">${pageIsChinese ? "打開獨立頁面" : "Open standalone page"} ↗</a>` : ""}</div>`;
    frame.before(preview);
  });

  document.querySelectorAll(".rules-embed[data-click-src]").forEach((frame) => {
    if (!isMobile.matches) { frame.src = frame.dataset.clickSrc; return; }
    const wrapper = frame.closest(".rules-embed-frame");
    wrapper?.classList.add("is-deferred");
    const button = document.createElement("button");
    button.type = "button";
    button.className = "mobile-media-action";
    button.textContent = pageIsChinese ? "載入互動規則" : "Load interactive guide";
    wrapper?.appendChild(button);
    button.addEventListener("click", () => {
      frame.src = frame.dataset.clickSrc;
      wrapper?.classList.remove("is-deferred");
      button.remove();
    });
  });
})();
