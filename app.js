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
