const IMAGE_DWELL_MS = 3500;
const START_STAGGER_MS = 1200;
const ACTIVE_CLASS = 'is-active';

function initSlideshow(root, index) {
  const slides = [...root.querySelectorAll('[data-slide]')];
  const dots = [...root.querySelectorAll('[data-slide-dot]')];
  if (slides.length === 0) return;

  let current = 0;
  let timer = null;
  let visible = false;

  const isVideo = (slide) => slide instanceof HTMLVideoElement;

  function schedule() {
    clearTimeout(timer);
    if (!visible) return;
    const slide = slides[current];
    if (isVideo(slide)) {
      slide.currentTime = 0;
      slide.play().catch(next);
      return;
    }
    timer = setTimeout(next, IMAGE_DWELL_MS);
  }

  function show(nextIndex) {
    const previous = slides[current];
    previous.classList.remove(ACTIVE_CLASS);
    dots[current]?.classList.remove(ACTIVE_CLASS);
    if (isVideo(previous)) previous.pause();

    current = nextIndex;
    slides[current].classList.add(ACTIVE_CLASS);
    dots[current]?.classList.add(ACTIVE_CLASS);
    schedule();
  }

  function next() {
    show((current + 1) % slides.length);
  }

  slides.filter(isVideo).forEach((video) => video.addEventListener('ended', next));
  show(0);

  // Only advance while on screen, and offset each card so they don't all change in sync.
  new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting;
    if (!visible) {
      clearTimeout(timer);
      const slide = slides[current];
      if (isVideo(slide)) slide.pause();
      return;
    }
    timer = setTimeout(schedule, index * START_STAGGER_MS);
  }).observe(root);
}

document.querySelectorAll('[data-slideshow]').forEach(initSlideshow);
