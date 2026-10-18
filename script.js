/**
 * Ankur Pal - AI/ML Software Engineer & Cloud Architect Portfolio
 * Interactive Script
 * Zero external dependencies. Zero emojis.
 */

document.addEventListener('DOMContentLoaded', () => {
  initTypingEffect();
  initProjectFilters();
  initMobileNav();
  initCounterAnimation();
  initCopyEmail();
  initCardSpotlights();
  initScrollSpy();
});

/**
 * 1. Smooth Dynamic Role Rotator
 */
function initTypingEffect() {
  const roleEl = document.getElementById('typing-role');
  if (!roleEl) return;

  const roles = [
    'Production Hybrid RAG (ChromaDB + BM25 + RRF)',
    'Autonomous ReAct Reasoning Agents',
    'Computer Vision & Real-Time Video (30 FPS)',
    'High-Throughput FastAPI Microservices',
    'Cloud Deployments on AWS & GCP with Docker',
    'MLOps Model Benchmarking & Fine-Tuning'
  ];

  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 80;

  function type() {
    const currentRole = roles[roleIndex];

    if (isDeleting) {
      charIndex--;
      roleEl.textContent = currentRole.substring(0, charIndex);
      typingDelay = 40;
    } else {
      charIndex++;
      roleEl.textContent = currentRole.substring(0, charIndex);
      typingDelay = 75;
    }

    if (!isDeleting && charIndex === currentRole.length) {
      isDeleting = true;
      typingDelay = 2200; // Pause at full word
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
      // Toggle active state
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

  if (!toggleBtn || !navMenu) return;

  toggleBtn.addEventListener('click', () => {
    toggleBtn.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      toggleBtn.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
}

/**
 * 4. Animated Metric Counters
 */
function initCounterAnimation() {
  const statNumbers = document.querySelectorAll('.stat-number');
  if (!statNumbers.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.getAttribute('data-target'), 10);
        const originalText = el.textContent;
        const suffix = originalText.includes('%') ? '%' : (originalText.includes('+') ? '+' : '');

        let current = 0;
        const duration = 1500;
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
  }, { threshold: 0.5 });

  statNumbers.forEach(stat => observer.observe(stat));
}

/**
 * 5. Copy Email to Clipboard
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
      copyBtn.querySelector('.copy-text').textContent = 'Copied!';

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
 * 6. Mouse Spotlight Effect on Interactive Cards
 */
function initCardSpotlights() {
  const cards = document.querySelectorAll('.project-card, .skill-card, .feature-card, .channel-card');

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
 * 7. Active Navigation Link on Scroll
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
