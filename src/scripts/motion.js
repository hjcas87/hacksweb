import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

/* ------------------------------------------------------------------ *
 *  Smooth scroll (Lenis) synced with ScrollTrigger
 * ------------------------------------------------------------------ */
function initSmoothScroll() {
  if (prefersReduced) return;

  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // anchor links → lenis
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const target = a.getAttribute('href');
      if (target && target.length > 1) {
        e.preventDefault();
        lenis.scrollTo(target, { offset: -60 });
      }
    });
  });
}

/* ------------------------------------------------------------------ *
 *  Rocket cursor + magnetic elements
 * ------------------------------------------------------------------ */
function initRocketCursor() {
  if (!finePointer || prefersReduced) return;

  const rocket = document.getElementById('rocket');
  const ring = document.getElementById('rocket-ring');
  if (!rocket || !ring) return;

  document.body.classList.add('has-rocket');

  const xTo = gsap.quickTo(rocket, 'x', { duration: 0.18, ease: 'power3' });
  const yTo = gsap.quickTo(rocket, 'y', { duration: 0.18, ease: 'power3' });
  const rxTo = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3' });
  const ryTo = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3' });
  const rotTo = gsap.quickTo(rocket, 'rotation', { duration: 0.25, ease: 'power2' });

  let lastX = 0;
  let lastY = 0;

  window.addEventListener('mousemove', (e) => {
    xTo(e.clientX);
    yTo(e.clientY);
    rxTo(e.clientX);
    ryTo(e.clientY);

    // point the rocket toward the direction of travel (🚀 base points up-right)
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;
    if (Math.abs(dx) + Math.abs(dy) > 1) {
      const angle = Math.atan2(dy, dx) * (180 / Math.PI);
      rotTo(angle + 45);
    }
    lastX = e.clientX;
    lastY = e.clientY;
  });

  const hoverTargets = document.querySelectorAll(
    'a, button, [data-cursor], input, textarea'
  );
  hoverTargets.forEach((el) => {
    el.addEventListener('mouseenter', () => {
      rocket.classList.add('is-hovering');
      ring.classList.add('is-hovering');
    });
    el.addEventListener('mouseleave', () => {
      rocket.classList.remove('is-hovering');
      ring.classList.remove('is-hovering');
    });
  });

  // launch: hide native, animate rocket in
  gsap.fromTo(rocket, { scale: 0 }, { scale: 1, duration: 0.6, ease: 'back.out(2)' });
}

function initMagnetic() {
  if (!finePointer || prefersReduced) return;

  document.querySelectorAll('[data-magnetic]').forEach((el) => {
    const strength = parseFloat(el.getAttribute('data-magnetic') || '0.35');
    const xTo = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' });
    const yTo = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3' });

    el.addEventListener('mousemove', (e) => {
      const r = el.getBoundingClientRect();
      xTo((e.clientX - (r.left + r.width / 2)) * strength);
      yTo((e.clientY - (r.top + r.height / 2)) * strength);
    });
    el.addEventListener('mouseleave', () => {
      xTo(0);
      yTo(0);
    });
  });
}

/* ------------------------------------------------------------------ *
 *  Hero intro (split words rising)
 * ------------------------------------------------------------------ */
function initHero() {
  const spans = document.querySelectorAll('.word-mask > span');
  if (!spans.length || prefersReduced) return;

  gsap.to(spans, {
    y: 0,
    duration: 1.1,
    ease: 'power4.out',
    stagger: 0.06,
    delay: 0.15,
  });
}

/* Rotating word in the hero */
function initRotator() {
  const rotator = document.querySelector('[data-rotator]');
  if (!rotator) return;

  const words = JSON.parse(rotator.getAttribute('data-rotator') || '[]');
  if (words.length < 2) return;

  let i = 0;
  const el = rotator.querySelector('span');
  if (!el) return;

  if (prefersReduced) return;

  setInterval(() => {
    i = (i + 1) % words.length;
    gsap
      .timeline()
      .to(el, { yPercent: -110, opacity: 0, duration: 0.35, ease: 'power2.in' })
      .add(() => {
        el.textContent = words[i];
      })
      .fromTo(
        el,
        { yPercent: 110, opacity: 0 },
        { yPercent: 0, opacity: 1, duration: 0.45, ease: 'power3.out' }
      );
  }, 2200);
}

/* ------------------------------------------------------------------ *
 *  Scroll reveals + counters + parallax
 * ------------------------------------------------------------------ */
function initReveals() {
  if (prefersReduced) {
    document.querySelectorAll('.reveal').forEach((el) => el.classList.add('is-in'));
    return;
  }

  ScrollTrigger.batch('.reveal', {
    start: 'top 88%',
    onEnter: (batch) =>
      gsap.to(batch, {
        onStart: () => batch.forEach((el) => el.classList.add('is-in')),
        stagger: 0.08,
      }),
    once: true,
  });

  // parallax on any [data-parallax] element
  document.querySelectorAll('[data-parallax]').forEach((el) => {
    const amount = parseFloat(el.getAttribute('data-parallax') || '80');
    gsap.to(el, {
      yPercent: -amount / 10,
      ease: 'none',
      scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });
  });

  // counters
  document.querySelectorAll('[data-count]').forEach((el) => {
    const target = parseFloat(el.getAttribute('data-count') || '0');
    const obj = { v: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: 'top 90%',
      once: true,
      onEnter: () =>
        gsap.to(obj, {
          v: target,
          duration: 1.6,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = Math.round(obj.v).toString();
          },
        }),
    });
  });
}

/* ------------------------------------------------------------------ *
 *  Nav state on scroll
 * ------------------------------------------------------------------ */
function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;
  ScrollTrigger.create({
    start: 'top -80',
    end: 99999,
    onUpdate: (self) => {
      nav.classList.toggle('is-scrolled', self.scroll() > 80);
    },
  });
}

/* ------------------------------------------------------------------ */
function boot() {
  initSmoothScroll();
  initRocketCursor();
  initMagnetic();
  initHero();
  initRotator();
  initReveals();
  initNav();
  ScrollTrigger.refresh();
}

if (document.readyState !== 'loading') boot();
else document.addEventListener('DOMContentLoaded', boot);
