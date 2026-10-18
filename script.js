/**
 * Ankur Pal - Precision AI/ML Software Engineer & Cloud Architect
 * Haute Horlogerie / Audemars Piguet Inspired Interactive Controller
 * Pure Engineering. Zero Emojis.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTypingEffect();
  initProjectFilters();
  initMobileNav();
  initCounterAnimation();
  initBarChartAnimation();
  initCopyEmail();
  initCardSpotlights();
  initScrollSpy();
});

/**
 * 1. Precision Calibre Role Rotator
 */
function initTypingEffect() {
  const roleEl = document.getElementById('typing-role');
  if (!roleEl) return;

  const roles = [
    'Production Hybrid RAG & Reciprocal Rank Fusion',
    'Autonomous ReAct Reasoning Agents',
    'Computer Vision & Real-Time Video (30 FPS)',
    'High-Throughput FastAPI Microservices',
    'Cloud Clusters on AWS & GCP with Docker',
    'MLOps Model Benchmarking & Fine-Tuning'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 70;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      charIndex--;
      roleEl.textContent = currentRole.substring(0, charIndex);
      typingDelay = 35;
    } else {
      charIndex++;
      roleEl.textContent = currentRole.substring(0, charIndex);
      typingDelay = 65;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingDelay = 2400; // Pause at full word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      typingDelay = 400; // Pause before typing next
    }

    setTimeout(type, typingDelay);
  }

  type();
}

/**
 * 2. Interactive Project Filtering
 */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 10);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(10px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 250);
        }
      });
    });
  });
}

/**
 * 3. Mobile Navigation Drawer
 */
function initMobileNav() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.getElementById('navbar');

  if (!toggleBtn || !navMenu) return;

  function closeMenu() {
    toggleBtn.classList.remove('active');
    navMenu.classList.remove('active');
    toggleBtn.setAttribute('aria-expanded', 'false');
  }

  function toggleMenu(e) {
    e.stopPropagation();
    const isActive = navMenu.classList.toggle('active');
    toggleBtn.classList.toggle('active', isActive);
    toggleBtn.setAttribute('aria-expanded', String(isActive));
  }

  toggleBtn.addEventListener('click', toggleMenu);

  navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close when clicking outside of navbar
  document.addEventListener('click', (e) => {
    if (navbar && !navbar.contains(e.target)) {
      closeMenu();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMenu();
    }
  });
}

/**
 * 4. Chronometer Animated Counters
 */
function initCounterAnimation() {
  const dialValues = document.querySelectorAll('.dial-value');
  if (!dialValues.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetAttr = el.getAttribute('data-target');
        const target = parseInt(targetAttr, 10);
        if (isNaN(target) || target <= 0) return;
        const originalText = el.textContent;
        const suffix = originalText.includes('%') ? '%' : 
                       (originalText.includes('FPS') ? ' FPS' : 
                       (originalText.includes('+') ? '+' : ''));

        let current = 0;
        const duration = 1400;
        const stepTime = Math.max(Math.floor(duration / target), 30);

        const timer = setInterval(() => {
          current += Math.ceil(target / (duration / stepTime));
          if (current >= target) {
            el.textContent = `${target}${suffix}`;
            clearInterval(timer);
          } else {
            el.textContent = `${current}${suffix}`;
          }
        }, stepTime);

        obs.unobserve(el);
      }
    });
  }, { threshold: 0.4 });

  dialValues.forEach(dial => observer.observe(dial));
}

/**
 * 5. Animated Benchmark Comparison Bar Tracks
 */
function initBarChartAnimation() {
  const barTracks = document.querySelectorAll('.bar-track');
  if (!barTracks.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.bar-fill');
        fills.forEach(fill => {
          const currentWidth = fill.style.width;
          fill.style.width = '0%';
          setTimeout(() => {
            fill.style.width = currentWidth;
          }, 100);
        });
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  barTracks.forEach(track => observer.observe(track));
}

/**
 * 6. Copy Email to Clipboard
 */
function initCopyEmail() {
  const copyBtn = document.getElementById('copy-email-btn');
  const toast = document.getElementById('toast');
  const emailValue = document.getElementById('email-value');

  if (!copyBtn || !toast || !emailValue) return;

  copyBtn.addEventListener('click', async () => {
    const textToCopy = emailValue.textContent.trim();
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(textToCopy);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = textToCopy;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }

      toast.classList.add('show');
      copyBtn.querySelector('.copy-text').textContent = 'Dispatched';

      setTimeout(() => {
        toast.classList.remove('show');
        copyBtn.querySelector('.copy-text').textContent = 'Copy';
      }, 2500);
    } catch (err) {
      console.error('Failed to copy email:', err);
    }
  });
}

/**
 * 7. Mouse Spotlight on Precision Cards
 */
function initCardSpotlights() {
  const cards = document.querySelectorAll('.project-card, .skill-card, .luxury-card, .channel-card, .chrono-dial');

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });
}

/**
 * 8. Active Navigation Link on Scroll
 */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPosition = window.pageYOffset + 120;

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });
}
