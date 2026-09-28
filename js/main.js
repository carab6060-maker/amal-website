// ============================================================
// AMAL ENGINEERING — MAIN JAVASCRIPT
// ============================================================

(function () {
  'use strict';

  // ── Sticky Header ────────────────────────────────────────
  const header = document.getElementById('site-header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ── Mobile Navigation ────────────────────────────────────
  const navToggle = document.getElementById('navToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('open');
      navToggle.classList.toggle('open', isOpen);
      navToggle.setAttribute('aria-expanded', isOpen.toString());
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
    // close on link click
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('open');
        navToggle.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // ── Active Nav Link ──────────────────────────────────────
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  // ── Scroll Fade-Up ────────────────────────────────────────
  const fadeEls = document.querySelectorAll('.fade-up');
  if (fadeEls.length && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    fadeEls.forEach(el => observer.observe(el));
  } else {
    fadeEls.forEach(el => el.classList.add('visible'));
  }

  // ── Counter Animation ─────────────────────────────────────
  const counters = document.querySelectorAll('.counter');
  if (counters.length && 'IntersectionObserver' in window) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const duration = 1400;
        const step = target / (duration / 16);
        let current = 0;
        const timer = setInterval(() => {
          current += step;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.textContent = Math.floor(current);
        }, 16);
        counterObserver.unobserve(el);
      });
    }, { threshold: 0.5 });
    counters.forEach(c => counterObserver.observe(c));
  }

  // ── Contact Form Validation ───────────────────────────────
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name    = document.getElementById('name');
      const email   = document.getElementById('email');
      const message = document.getElementById('message');
      let valid = true;

      [name, email, message].forEach(field => {
        field.style.borderColor = '';
      });

      if (!name.value.trim()) {
        name.style.borderColor = '#e05555';
        valid = false;
      }
      if (!email.value.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value)) {
        email.style.borderColor = '#e05555';
        valid = false;
      }
      if (!message.value.trim()) {
        message.style.borderColor = '#e05555';
        valid = false;
      }

      if (valid) {
        const successMsg = document.getElementById('formSuccess');
        if (successMsg) {
          successMsg.style.display = 'block';
          contactForm.reset();
          setTimeout(() => { successMsg.style.display = 'none'; }, 6000);
        }
      }
    });
  }

  // ── Process Steps Interaction ─────────────────────────────
  const processSteps = document.querySelectorAll('.process-step');
  processSteps.forEach((step, i) => {
    if (i === 0) step.classList.add('active');
    step.addEventListener('click', () => {
      processSteps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');
    });
  });

  // ── Smooth Scrolling for anchor links ────────────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 90;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

})();
