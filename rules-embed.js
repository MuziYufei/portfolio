(() => {
  const frames = Array.from(document.querySelectorAll("[data-rules-embed]"));
  if (!frames.length) return;

  window.addEventListener("message", (event) => {
    if (!event.data || event.data.type !== "public-opinion-rules-height") return;
    const frame = frames.find((candidate) => candidate.contentWindow === event.source);
    if (!frame) return;

    const reportedHeight = Number(event.data.height);
    if (!Number.isFinite(reportedHeight)) return;
    frame.style.height = `${Math.max(460, Math.min(940, Math.ceil(reportedHeight)))}px`;
  });
})();
