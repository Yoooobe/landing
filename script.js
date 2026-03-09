// ═══════════ 4unik by Yoobe — Interactions ═══════════

document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS (se o CDN carregar)
  if (typeof AOS !== 'undefined') {
    AOS.init({ duration: 700, once: true, offset: 80 });
  }

  // ── Mobile Menu ──
  const toggle = document.getElementById('mobileToggle');
  const menu = document.getElementById('navMenu');
  const ctas = document.querySelector('.nav-ctas');
  if (toggle) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('active');
      if (ctas) ctas.classList.toggle('active');
    });
    // Close on link click
    menu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        menu.classList.remove('active');
        if (ctas) ctas.classList.remove('active');
      });
    });
  }

  // ── Animated Counters ──
  const counters = document.querySelectorAll('.stat-number[data-target]');
  const formatNum = n => {
    if (n >= 1000000) return (n / 1000000).toFixed(0) + 'M';
    if (n >= 1000) return (n / 1000).toFixed(0).replace(/\.0$/, '') + (n >= 1000 ? '' : '');
    return n.toString();
  };

  const animateCounter = el => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 2000;
    const start = performance.now();
    const tick = now => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const current = Math.floor(eased * target);
      if (target >= 1000000) el.textContent = (current / 1000000).toFixed(1).replace('.0', '') + 'M';
      else if (target >= 1000) el.textContent = current.toLocaleString('pt-BR');
      else el.textContent = current;
      if (progress < 1) requestAnimationFrame(tick);
      else {
        if (target >= 1000000) el.textContent = '1M';
        else el.textContent = target.toLocaleString('pt-BR');
      }
    };
    requestAnimationFrame(tick);
  };

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  // ── Smooth Scroll for anchor links ──
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ── Header shrink on scroll ──
  const header = document.querySelector('.header');
  if (header) {
    window.addEventListener('scroll', () => {
      const current = window.scrollY;
      if (header.classList.contains('header-pill')) {
        header.classList.toggle('scrolled', current > 80);
      } else if (current > 100) {
        header.style.boxShadow = '0 4px 20px rgba(0,0,0,0.1)';
      } else {
        header.style.boxShadow = '';
      }
    }, { passive: true });
  }

  // ── Platform preview tabs ──
  document.querySelectorAll('.preview-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      const targetId = tab.getAttribute('data-target');
      if (!targetId) return;
      const panel = document.getElementById(targetId);
      const container = tab.closest('.platform-preview-redesign');
      if (!container || !panel) return;
      container.querySelectorAll('.preview-tab').forEach(t => t.classList.remove('active'));
      container.querySelectorAll('.preview-panel').forEach(p => p.classList.remove('active'));
      tab.classList.add('active');
      panel.classList.add('active');
    });
  });
});
