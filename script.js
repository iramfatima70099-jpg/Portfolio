document.addEventListener('DOMContentLoaded', () => {

  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  const navbar = document.getElementById('navbar');
  const scrollProgressBar = document.getElementById('scrollProgressBar');
  const backToTop = document.getElementById('backToTop');

  function onScroll() {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    navbar.classList.toggle('scrolled', scrollY > 40);
    backToTop.classList.toggle('show', scrollY > 500);
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;
    scrollProgressBar.style.width = progress + '%';
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('mobile-open');
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  const sections = document.querySelectorAll('main section[id]');
  const navLinkEls = document.querySelectorAll('.nav-link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinkEls.forEach(link => {
          link.classList.toggle('active', link.dataset.section === id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -50% 0px', threshold: 0 });

  sections.forEach(section => navObserver.observe(section));

  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        const bar = entry.target.querySelector('.skill-bar span');
        if (bar) bar.classList.add('filled');
        const counter = entry.target.querySelector('[data-count]');
        if (counter) animateCounter(counter);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealEls.forEach(el => revealObserver.observe(el));

  function animateCounter(el) {
    const target = parseFloat(el.dataset.count);
    const isDecimal = target % 1 !== 0;
    const duration = 1400;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = target * eased;
      el.textContent = isDecimal ? value.toFixed(2) : Math.round(value);
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = isDecimal ? target.toFixed(2) : target;
    }
    requestAnimationFrame(tick);
  }

  const aboutStats = document.querySelectorAll('.about-stats [data-count]');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        aboutStats.forEach(animateCounter);
        statsObserver.disconnect();
      }
    });
  }, { threshold: 0.4 });
  const aboutStatsList = document.querySelector('.about-stats');
  if (aboutStatsList) statsObserver.observe(aboutStatsList);

  const typedTextEl = document.getElementById('typedText');
  const roles = [
    'Frontend Developer',
    'MCA Student',
    'Aspiring Full Stack Developer'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeLoop() {
    const currentRole = roles[roleIndex];

    if (!isDeleting) {
      charIndex++;
      typedTextEl.textContent = currentRole.slice(0, charIndex);
      if (charIndex === currentRole.length) {
        isDeleting = true;
        setTimeout(typeLoop, 1600);
        return;
      }
    } else {
      charIndex--;
      typedTextEl.textContent = currentRole.slice(0, charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
      }
    }

    const speed = isDeleting ? 40 : 85;
    setTimeout(typeLoop, speed);
  }
  if (typedTextEl) typeLoop();

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length < 2) return;
      const target = document.querySelector(targetId);
      if (!target) return;
      e.preventDefault();
      const navHeight = navbar.offsetHeight;
      const top = target.getBoundingClientRect().top + window.pageYOffset - navHeight + 1;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  document.querySelectorAll('.ripple').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect = this.getBoundingClientRect();
      const circle = document.createElement('span');
      const size = Math.max(rect.width, rect.height);
      circle.className = 'ripple-circle';
      circle.style.width = circle.style.height = size + 'px';
      circle.style.left = (e.clientX - rect.left - size / 2) + 'px';
      circle.style.top = (e.clientY - rect.top - size / 2) + 'px';
      this.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  });

  const cursorGlow = document.querySelector('.cursor-glow');
  const floatShapes = document.querySelectorAll('.float-shape');
  const heroSection = document.querySelector('.hero');
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  const isTouchDevice = window.matchMedia('(hover: none)').matches;

  if (!isTouchDevice) {
    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorGlow.style.left = mouseX + 'px';
      cursorGlow.style.top = mouseY + 'px';
      cursorGlow.classList.add('active');
    });

    document.addEventListener('mouseleave', () => cursorGlow.classList.remove('active'));

    if (heroSection) {
      heroSection.addEventListener('mousemove', (e) => {
        const rect = heroSection.getBoundingClientRect();
        const relX = (e.clientX - rect.left) / rect.width - 0.5;
        const relY = (e.clientY - rect.top) / rect.height - 0.5;

        floatShapes.forEach((shape, i) => {
          const depth = (i + 1) * 8;
          shape.style.transform = `translate(${relX * depth}px, ${relY * depth}px)`;
        });
      });

      heroSection.addEventListener('mouseleave', () => {
        floatShapes.forEach(shape => { shape.style.transform = ''; });
      });
    }
  }

  const contactForm = document.getElementById('contactForm');
  const formStatus = document.getElementById('formStatus');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();

      if (!name || !email) {
        formStatus.textContent = 'Please fill in all required fields.';
        return;
      }

      formStatus.textContent = 'Sending...';
      setTimeout(() => {
        formStatus.textContent = `Thanks, ${name.split(' ')[0]}! Your message has been noted — I'll get back to you soon.`;
        contactForm.reset();
      }, 900);
    });
  }

  requestAnimationFrame(() => {
    document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('in-view'));
  });

});
