(() => {
  "use strict";

  document.querySelectorAll("[data-encoded-space-slideshow]").forEach((slideshow) => {
    const slides = [...slideshow.querySelectorAll("img")];
    if (slides.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let active = 0;
    const showNext = () => {
      slides[active].classList.remove("is-active");
      active = (active + 1) % slides.length;
      slides[active].classList.add("is-active");
    };

    window.setInterval(showNext, 3000);
  });
})();
