const directionButtons = [...document.querySelectorAll('[data-direction]')];
const concepts = [...document.querySelectorAll('[data-concept]')];
const projectStages = [...document.querySelectorAll('[data-project-stage]')];

function showDirection(direction, options = {}) {
  const { updateHash = true, resetScroll = true } = options;
  concepts.forEach((concept) => {
    concept.hidden = concept.dataset.concept !== direction;
  });
  directionButtons.forEach((button) => {
    button.setAttribute('aria-pressed', String(button.dataset.direction === direction));
  });
  document.body.dataset.scheme = direction;
  if (updateHash) history.replaceState(null, '', `#${direction}`);
  if (resetScroll) window.scrollTo({ top: 0, behavior: 'instant' });
}

directionButtons.forEach((button) => {
  button.addEventListener('click', () => showDirection(button.dataset.direction));
});

let currentStage = projectStages[0] ?? null;
const setCurrentStage = (stage) => {
  if (!stage || stage === currentStage) return;
  currentStage = stage;
  projectStages.forEach((item) => item.classList.toggle('is-current', item === stage));
};

if (projectStages.length) {
  document.documentElement.classList.add("motion-ready");
  projectStages.forEach((stage) => stage.addEventListener("focusin", () => setCurrentStage(stage)));

  const projectObserver = new IntersectionObserver((entries) => {
    const visibleStage = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visibleStage) setCurrentStage(visibleStage.target);
  }, {
    rootMargin: '-20% 0px -20% 0px',
    threshold: [0, 0.25, 0.5, 0.75, 1],
  });

  projectStages.forEach((stage) => projectObserver.observe(stage));
}

const projectData = {
  cat: {
    image: './assets/df2026-model.webp',
    alt: 'Physical narrative model at the DigitalFUTURES exhibition',
    label: '01 · Hybrid narrative',
    title: 'A Cat, Inflatable',
    description: 'An interactive website, physical model, and film reconstruct a worker’s memory inside a near-future Shanghai.',
    tags: ['Web', 'Model', 'Film', 'Independent'],
  },
  cap: {
    image: './assets/cap-table.webp',
    alt: 'Table mode interface for the Public Opinion party game',
    label: '02 · Participatory rules',
    title: '群眾意見',
    description: 'A tabletop game and forum prototype examine how a group turns one person’s sentence into an identity label.',
    tags: ['Tabletop', 'Forum', 'UI', 'Independent'],
  },
  thu: {
    image: './assets/thu-attic.webp',
    alt: 'Attic scene from the Encoded Space narrative game',
    label: '03 · Spatial interaction',
    title: 'Encoded Space',
    description: 'A 3D exploration prototype uses rooms, clue objects, dialogue, and minigames to release a family story.',
    tags: ['Godot', 'UI', '3D scene', 'Team'],
  },
  df: {
    image: './assets/df2025-board-1.jpg',
    alt: 'Generative urban massing and environmental optimization board',
    label: '04 · Computational design',
    title: 'AI Green Nexus City',
    description: 'Generative massing and AI-assisted translation test how a new program can sit within a historic Shanghai block.',
    tags: ['EvoMass', 'Grasshopper', 'AI', 'Team'],
  },
};

const mapNodes = [...document.querySelectorAll('[data-project]')];
const mapImage = document.querySelector('#c-project-image');
const mapLabel = document.querySelector('#c-project-label');
const mapTitle = document.querySelector('#c-project-title');
const mapDescription = document.querySelector('#c-project-description');
const mapTags = document.querySelector('#c-project-tags');

mapNodes.forEach((node) => {
  node.addEventListener('click', () => {
    const project = projectData[node.dataset.project];
    mapNodes.forEach((item) => item.classList.toggle('active', item === node));
    mapImage.classList.toggle('df2025-map-image', node.dataset.project === 'df');
    mapImage.src = project.image;
    mapImage.alt = project.alt;
    mapLabel.textContent = project.label;
    mapTitle.textContent = project.title;
    mapDescription.textContent = project.description;
    mapTags.replaceChildren(...project.tags.map((tag) => {
      const item = document.createElement('span');
      item.textContent = tag;
      return item;
    }));
  });
});

const initialHash = location.hash.slice(1);
const isSectionLink = initialHash.startsWith('a-');
showDirection('a', { updateHash: false, resetScroll: false });

const entry = document.querySelector('#portfolio-entry');
const entryButton = entry?.querySelector('[data-enter-portfolio]');
const onEntryKeyDown = (event) => {
  if (event.key !== 'Enter' && event.key !== ' ') return;
  event.preventDefault();
  dismissEntry();
};

const dismissEntry = () => {
  if (!entry || entry.classList.contains('is-leaving')) return;
  entry.classList.add('is-leaving');
  document.body.classList.remove('entry-open');
  document.removeEventListener('keydown', onEntryKeyDown);
  window.setTimeout(() => entry.remove(), 600);
};

if (entry && entryButton) {
  entryButton.addEventListener('click', dismissEntry);
  document.addEventListener('keydown', onEntryKeyDown);
}

const revealSectionFromHash = () => {
  if (!location.hash.startsWith('#a-')) return;
  if (entry?.isConnected) {
    entry.remove();
    document.body.classList.remove('entry-open');
    document.removeEventListener('keydown', onEntryKeyDown);
  }
  window.requestAnimationFrame(() => {
    const target = document.querySelector(location.hash);
    if (!target) return;
    if (target.matches('[data-project-stage]')) setCurrentStage(target);
    target.scrollIntoView({ block: 'start', behavior: 'auto' });
  });
};

if (isSectionLink) {
  revealSectionFromHash();
} else if (entry && entryButton) {
  entryButton.focus({ preventScroll: true });
}

window.addEventListener('hashchange', revealSectionFromHash);

// One deliberate wheel gesture advances one stage, then briefly holds it.
if (projectStages.length) {
  let wheelLockUntil = 0;
  let lastWheelAt = 0;
  let wheelTotal = 0;
  let wheelDirection = 0;
  let scrollFrame = 0;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const stageTop = (stage) => Math.max(0, stage.getBoundingClientRect().top + window.scrollY - 76);
  const stopStageScroll = () => {
    cancelAnimationFrame(scrollFrame);
    scrollFrame = 0;
    document.documentElement.classList.remove('stage-stepping');
    wheelLockUntil = 0;
  };
  window.addEventListener('wheel', (event) => {
    if (event.ctrlKey || document.body.classList.contains('entry-open') ||
        !matchMedia('(min-width: 701px) and (pointer: fine)').matches || reducedMotion.matches ||
        Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
    if (event.target.closest('input, textarea, select, [contenteditable="true"]')) return;
    const now = performance.now();
    const quiet = now - lastWheelAt > 180;
    lastWheelAt = now;
    if (now < wheelLockUntil || (!quiet && wheelLockUntil)) {
      event.preventDefault();
      return;
    }
    wheelLockUntil = 0;
    const direction = Math.sign(event.deltaY);
    if (!direction) return;
    const nearest = projectStages.reduce((best, stage, index) =>
      Math.abs(stageTop(stage) - window.scrollY) < Math.abs(stageTop(projectStages[best]) - window.scrollY) ? index : best, 0);
    const active = projectStages[nearest];
    const top = stageTop(active);
    const bottom = top + active.offsetHeight - (window.innerHeight - 76);
    // Let tall stages remain readable before advancing to the next stop.
    if ((direction > 0 && window.scrollY < bottom - 12) ||
        (direction < 0 && window.scrollY > top + 12)) return;
    const next = nearest + direction;
    if (next < 0 || next >= projectStages.length) return;
    event.preventDefault();
    if (quiet || direction !== wheelDirection) wheelTotal = 0;
    wheelDirection = direction;
    wheelTotal += Math.abs(event.deltaY) * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? innerHeight : 1);
    if (wheelTotal < 18) return;
    wheelTotal = 0;
    const target = projectStages[next];
    const startY = window.scrollY;
    const endY = stageTop(target);
    const started = performance.now();
    wheelLockUntil = started + 760;
    document.documentElement.classList.add('stage-stepping');
    setCurrentStage(target);
    const step = (time) => {
      const progress = Math.min(1, (time - started) / 360);
      const eased = 1 - Math.pow(1 - progress, 3);
      window.scrollTo({ top:startY + (endY - startY) * eased, behavior:'instant' });
      if (progress < 1) scrollFrame = requestAnimationFrame(step);
      else { scrollFrame = 0; document.documentElement.classList.remove('stage-stepping'); setCurrentStage(target); }
    };
    scrollFrame = requestAnimationFrame(step);
  }, { passive:false });
  window.addEventListener('keydown', stopStageScroll);
  window.addEventListener('pointerdown', stopStageScroll);
  window.addEventListener('resize', stopStageScroll);
}
