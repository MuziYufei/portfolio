(() => {
  "use strict";

  const scrollAmount = (viewport) => Math.max(viewport.clientWidth * 0.78, 260);

  document.querySelectorAll("[data-drag-strip]").forEach((strip) => {
    const viewport = strip.querySelector(".cat-asset-viewport");
    if (!viewport) return;

    let dragging = false;
    let startX = 0;
    let startScrollLeft = 0;

    const stopDragging = () => {
      dragging = false;
      viewport.classList.remove("is-dragging");
    };

    viewport.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      dragging = true;
      startX = event.clientX;
      startScrollLeft = viewport.scrollLeft;
      viewport.classList.add("is-dragging");
      viewport.setPointerCapture?.(event.pointerId);
    });

    viewport.addEventListener("pointermove", (event) => {
      if (!dragging) return;
      viewport.scrollLeft = startScrollLeft - (event.clientX - startX);
    });

    viewport.addEventListener("pointerup", stopDragging);
    viewport.addEventListener("pointercancel", stopDragging);
    viewport.addEventListener("lostpointercapture", stopDragging);

    viewport.addEventListener("wheel", (event) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      event.preventDefault();
      viewport.scrollLeft += event.deltaY;
    }, { passive: false });

    viewport.addEventListener("keydown", (event) => {
      let amount = 0;
      if (event.key === "ArrowLeft") amount = -scrollAmount(viewport);
      if (event.key === "ArrowRight") amount = scrollAmount(viewport);
      if (event.key === "Home") amount = -viewport.scrollLeft;
      if (event.key === "End") amount = viewport.scrollWidth - viewport.clientWidth - viewport.scrollLeft;
      if (!amount) return;
      event.preventDefault();
      viewport.scrollBy({ left: amount, behavior: "smooth" });
    });

    strip.querySelector("[data-strip-prev]")?.addEventListener("click", () => {
      viewport.scrollBy({ left: -scrollAmount(viewport), behavior: "smooth" });
    });
    strip.querySelector("[data-strip-next]")?.addEventListener("click", () => {
      viewport.scrollBy({ left: scrollAmount(viewport), behavior: "smooth" });
    });
  });

  document.querySelectorAll("[data-auto-strip]").forEach((strip) => {
    const track = strip.querySelector(".cat-asset-track");
    if (!track || track.dataset.looped === "true") return;

    [...track.children].forEach((card) => {
      const clone = card.cloneNode(true);
      clone.setAttribute("aria-hidden", "true");
      track.appendChild(clone);
    });
    track.dataset.looped = "true";
  });
})();
