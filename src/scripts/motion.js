import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

// Shared Lenis instance (null when reduced motion is on).
let lenis = null;

function scrollToHash(hash) {
  const el = document.querySelector(hash);
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { offset: -60 });
  else el.scrollIntoView({ behavior: 'smooth' });
}

/* ------------------------------------------------------------------ *
 *  Smooth scroll (Lenis) synced with ScrollTrigger
 * ------------------------------------------------------------------ */
function initSmoothScroll() {
  if (prefersReduced) return;

  lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
  });

  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);

  // anchor links → lenis (links inside the mobile menu are handled there)
  document.querySelectorAll('a[href^="#"]').forEach((a) => {
    if (a.closest('#mobile-menu')) return;
    a.addEventListener('click', (e) => {
      const target = a.getAttribute('href');
      if (target && target.length > 1) {
        e.preventDefault();
        scrollToHash(target);
      }
    });
  });
}

/* ------------------------------------------------------------------ *
 *  Mobile menu
 * ------------------------------------------------------------------ */
function initMobileMenu() {
  const toggle = document.getElementById('menu-toggle');
  const menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  const setOpen = (open) => {
    menu.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
    if (lenis) open ? lenis.stop() : lenis.start();
  };

  toggle.addEventListener('click', () =>
    setOpen(!menu.classList.contains('is-open'))
  );

  // in-page links: close, then scroll to the section
  menu.querySelectorAll('a[href^="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const target = a.getAttribute('href');
      setOpen(false);
      if (target && target.length > 1) {
        window.setTimeout(() => scrollToHash(target), 60);
      }
    });
  });

  // external links (socials, WhatsApp, email): just close
  menu.querySelectorAll('a:not([href^="#"])').forEach((a) => {
    a.addEventListener('click', () => setOpen(false));
  });

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && menu.classList.contains('is-open')) setOpen(false);
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

    // point the rocket toward the direction of travel (artwork points up-right)
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

/* Typewriter word in the hero: types a word, holds, deletes, types the next. */
function initTypewriter() {
  const el = document.querySelector('[data-typewriter]');
  if (!el) return;

  const words = JSON.parse(el.getAttribute('data-typewriter') || '[]');
  if (!words.length) return;

  // Reduced motion: just show the first word, no animation.
  if (prefersReduced) {
    el.textContent = words[0];
    return;
  }

  const TYPE_MS = 95; // per character while typing
  const DELETE_MS = 45; // per character while deleting
  const HOLD_MS = 1500; // pause once a word is fully typed
  const BETWEEN_MS = 350; // pause before typing the next word
  const START_MS = 650; // delay after the hero intro settles

  let wordIndex = 0;
  let charIndex = 0;
  let deleting = false;

  function tick() {
    const word = words[wordIndex];

    if (!deleting) {
      charIndex += 1;
      el.textContent = word.slice(0, charIndex);
      if (charIndex === word.length) {
        deleting = true;
        return window.setTimeout(tick, HOLD_MS);
      }
      return window.setTimeout(tick, TYPE_MS);
    }

    charIndex -= 1;
    el.textContent = word.slice(0, charIndex);
    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      return window.setTimeout(tick, BETWEEN_MS);
    }
    return window.setTimeout(tick, DELETE_MS);
  }

  el.textContent = '';
  window.setTimeout(tick, START_MS);
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
  initTypewriter();
  initReveals();
  initNav();
  initMobileMenu();
  ScrollTrigger.refresh();
}

if (document.readyState !== 'loading') boot();
else document.addEventListener('DOMContentLoaded', boot);
