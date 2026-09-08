(() => {
  document.querySelectorAll("[data-df2025-rotator]").forEach((rotator) => {
    const slides = Array.from(rotator.querySelectorAll("img"));
    if (slides.length < 2) return;

    let activeIndex = 0;
    window.setInterval(() => {
      slides[activeIndex].classList.remove("is-active");
      activeIndex = (activeIndex + 1) % slides.length;
      slides[activeIndex].classList.add("is-active");
    }, 3000);
  });

  document.querySelectorAll("[data-df2025-drag-strip]").forEach((strip) => {
    let pointerDown = false;
    let startX = 0;
    let startScroll = 0;

    strip.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      pointerDown = true;
      startX = event.clientX;
      startScroll = strip.scrollLeft;
      strip.classList.add("is-dragging");
      strip.setPointerCapture?.(event.pointerId);
    });

    strip.addEventListener("pointermove", (event) => {
      if (!pointerDown) return;
      strip.scrollLeft = startScroll - (event.clientX - startX);
    });

    const endDrag = () => {
      pointerDown = false;
      strip.classList.remove("is-dragging");
    };

    strip.addEventListener("pointerup", endDrag);
    strip.addEventListener("pointercancel", endDrag);
    strip.addEventListener("lostpointercapture", endDrag);

    strip.addEventListener("wheel", (event) => {
      if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
      event.preventDefault();
      strip.scrollLeft += event.deltaY;
    }, { passive: false });

    strip.addEventListener("keydown", (event) => {
      const pageAmount = Math.max(strip.clientWidth * 0.78, 260);
      let amount = 0;
      if (event.key === "ArrowLeft") amount = -pageAmount;
      if (event.key === "ArrowRight") amount = pageAmount;
      if (event.key === "Home") amount = -strip.scrollLeft;
      if (event.key === "End") amount = strip.scrollWidth - strip.clientWidth - strip.scrollLeft;
      if (!amount) return;
      event.preventDefault();
      strip.scrollBy({ left: amount, behavior: "smooth" });
    });
  });
})();
