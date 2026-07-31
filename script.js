/* =========================================================
   ABDULLAHI MUHAMMAD TUKUR — PORTFOLIO
   Vanilla JS — no dependencies
   ========================================================= */

/* ---------- EmailJS configuration ---------- */
const EMAILJS_PUBLIC_KEY = '8z-Z7IsaqiTyqJH-P';
const EMAILJS_SERVICE_ID = 'service_lb7vw47';
const EMAILJS_TEMPLATE_ID = 'template_y4ye74m';

if (typeof emailjs !== 'undefined') {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Loader ---------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('is-hidden'), 500);
  });
  // Fallback in case 'load' already fired
  setTimeout(() => loader && loader.classList.add('is-hidden'), 2500);

  /* ---------- Footer year ---------- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Theme toggle (persists for this session only) ---------- */
  const themeToggle = document.getElementById('themeToggle');
  const body = document.body;
  let currentTheme = 'dark';
  themeToggle.addEventListener('click', () => {
    currentTheme = currentTheme === 'dark' ? 'light' : 'dark';
    body.setAttribute('data-theme', currentTheme);
    themeToggle.setAttribute('aria-pressed', currentTheme === 'light');
  });

  /* ---------- Sticky navbar + scroll progress + back-to-top ---------- */
  const navbar = document.getElementById('navbar');
  const scrollProgress = document.getElementById('scrollProgress');
  const backToTop = document.getElementById('backToTop');

  const onScroll = () => {
    const y = window.scrollY;
    navbar.classList.toggle('is-scrolled', y > 40);
    backToTop.classList.toggle('is-visible', y > 600);

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (y / docHeight) * 100 : 0;
    scrollProgress.style.width = pct + '%';
  };
  document.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- Mobile nav ---------- */
  const navBurger = document.getElementById('navBurger');
  const navLinks = document.getElementById('navLinks');
  navBurger.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('is-open');
    navBurger.setAttribute('aria-expanded', isOpen);
    navBurger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('is-open');
      navBurger.setAttribute('aria-expanded', false);
    });
  });

  /* ---------- Custom cursor ---------- */
  const cursorDot = document.getElementById('cursorDot');
  const cursorRing = document.getElementById('cursorRing');
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX; mouseY = e.clientY;
    cursorDot.style.left = mouseX + 'px';
    cursorDot.style.top = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    cursorRing.style.left = ringX + 'px';
    cursorRing.style.top = ringY + 'px';
    requestAnimationFrame(animateRing);
  }
  animateRing();

  document.querySelectorAll('a, button, input, textarea, .project-card, .service-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursorRing.classList.add('is-active'));
    el.addEventListener('mouseleave', () => cursorRing.classList.remove('is-active'));
  });

  /* ---------- Typing animation (hero role) ---------- */
  const typedEl = document.getElementById('typedRole');
  const roles = [
    'responsive websites.',
    'clean front-end code.',
    'AI-assisted workflows.',
    'brand visuals in Canva.',
    'reliable prompt systems.'
  ];
  let roleIndex = 0, charIndex = 0, isDeleting = false;

  function typeLoop() {
    const current = roles[roleIndex];
    if (!isDeleting) {
      charIndex++;
      typedEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length) {
        isDeleting = true;
        setTimeout(typeLoop, 1400);
        return;
      }
    } else {
      charIndex--;
      typedEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }
    setTimeout(typeLoop, isDeleting ? 35 : 55);
  }
  typeLoop();

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll('[data-reveal]');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------- Skill bar fill on scroll ---------- */
  const skillBars = document.querySelectorAll('.skill-bar');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fill = entry.target.querySelector('.skill-fill');
        const percent = entry.target.getAttribute('data-percent');
        fill.style.width = percent + '%';
        skillObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  skillBars.forEach(el => skillObserver.observe(el));

  /* ---------- Counter animation (stats) ---------- */
  const counters = document.querySelectorAll('.stat-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-count'), 10);
        const duration = 1400;
        const startTime = performance.now();
        function tick(now) {
          const progress = Math.min((now - startTime) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target);
          if (progress < 1) requestAnimationFrame(tick);
          else el.textContent = target;
        }
        requestAnimationFrame(tick);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObserver.observe(el));

  /* ---------- Project filtering ---------- */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const filter = btn.getAttribute('data-filter');
      projectCards.forEach(card => {
        const match = filter === 'all' || card.getAttribute('data-category') === filter;
        card.classList.toggle('is-hidden', !match);
      });
    });
  });

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const isOpen = btn.getAttribute('aria-expanded') === 'true';

      document.querySelectorAll('.faq-question').forEach(other => {
        other.setAttribute('aria-expanded', 'false');
        other.nextElementSibling.style.maxHeight = null;
      });

      if (!isOpen) {
        btn.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  /* ---------- Contact form (sends via EmailJS) ---------- */
  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (typeof emailjs === 'undefined') {
      formStatus.textContent = 'Email sending isn\u2019t connected yet — please reach out directly at abdullahimt200@gmail.com for now.';
      return;
    }

    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const subject = document.getElementById('cf-subject').value.trim();
    const message = document.getElementById('cf-message').value.trim();

    const templateParams = {
      from_name: name,
      from_email: email,
      subject: subject,
      message: message
    };

    formStatus.textContent = 'Sending...';
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then(() => {
        formStatus.textContent = 'Message sent — thank you! I will reply soon.';
        contactForm.reset();
      })
      .catch(() => {
        formStatus.textContent = 'Something went wrong sending that. Please try again or email me directly.';
      })
      .finally(() => {
        submitBtn.disabled = false;
      });
  });

  /* ---------- Order a Service: modal + form ---------- */
  const orderCards = document.querySelectorAll('.order-card');
  const orderModal = document.getElementById('orderModal');
  const orderModalBackdrop = document.getElementById('orderModalBackdrop');
  const orderModalClose = document.getElementById('orderModalClose');
  const orderModalTitle = document.getElementById('orderModalTitle');
  const orderServiceInput = document.getElementById('order-service');
  const orderForm = document.getElementById('orderForm');
  const orderFormStatus = document.getElementById('orderFormStatus');
  let lastFocusedEl = null;

  function openOrderModal(serviceName) {
    lastFocusedEl = document.activeElement;
    orderModalTitle.textContent = serviceName;
    orderServiceInput.value = serviceName;
    orderModal.classList.add('is-open');
    orderModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    document.getElementById('order-name').focus();
  }

  function closeOrderModal() {
    orderModal.classList.remove('is-open');
    orderModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    orderFormStatus.textContent = '';
    orderForm.reset();
    if (lastFocusedEl) lastFocusedEl.focus();
  }

  orderCards.forEach(card => {
    card.addEventListener('click', () => openOrderModal(card.getAttribute('data-service')));
  });
  orderModalBackdrop.addEventListener('click', closeOrderModal);
  orderModalClose.addEventListener('click', closeOrderModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && orderModal.classList.contains('is-open')) closeOrderModal();
  });

  orderForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (typeof emailjs === 'undefined') {
      orderFormStatus.textContent = 'Email sending isn\u2019t connected yet — please email abdullahimt200@gmail.com directly.';
      return;
    }

    const service = orderServiceInput.value;
    const name = document.getElementById('order-name').value.trim();
    const email = document.getElementById('order-email').value.trim();
    const details = document.getElementById('order-details').value.trim();

    const templateParams = {
      from_name: name,
      from_email: email,
      subject: 'Order Request — ' + service,
      message: 'Service requested: ' + service + '\n\n' + details
    };

    orderFormStatus.textContent = 'Sending...';
    const submitBtn = orderForm.querySelector('button[type="submit"]');
    submitBtn.disabled = true;

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams)
      .then(() => {
        orderFormStatus.textContent = 'Request sent — thank you! I will reply to your email soon.';
        orderForm.reset();
      })
      .catch(() => {
        orderFormStatus.textContent = 'Something went wrong sending that. Please try again or email me directly.';
      })
      .finally(() => {
        submitBtn.disabled = false;
      });
  });

  /* ---------- Hero particle canvas ---------- */
  const canvas = document.getElementById('particles');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animFrame;

  function resizeCanvas() {
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
  }

  function initParticles() {
    const count = Math.min(70, Math.floor((canvas.width * canvas.height) / 18000));
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 1.6 + 0.4,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      alpha: Math.random() * 0.5 + 0.2
    }));
  }

  function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(99,164,255,${p.alpha})`;
      ctx.fill();
    });
    animFrame = requestAnimationFrame(drawParticles);
  }

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!prefersReducedMotion) {
    resizeCanvas();
    initParticles();
    drawParticles();
    window.addEventListener('resize', () => {
      cancelAnimationFrame(animFrame);
      resizeCanvas();
      initParticles();
      drawParticles();
    });
  }

});
