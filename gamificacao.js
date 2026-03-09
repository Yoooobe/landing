// ═══════════ 4unik by Yoobe — Gamificação Page Interactions ═══════════

document.addEventListener('DOMContentLoaded', () => {

  // ── Case Study Tabs ──
  const caseTabs = document.querySelectorAll('.case-tab');
  const casePanels = document.querySelectorAll('.case-panel');

  caseTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const caseId = tab.dataset.case;

      // Remove active from all tabs & panels
      caseTabs.forEach(t => t.classList.remove('active'));
      casePanels.forEach(p => p.classList.remove('active'));

      // Activate selected
      tab.classList.add('active');
      const panel = document.getElementById(`case-${caseId}`);
      if (panel) panel.classList.add('active');
    });
  });

  // ── FAQ Accordion ──
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      // Close all
      faqItems.forEach(i => i.classList.remove('open'));
      // Toggle current
      if (!isOpen) item.classList.add('open');
    });
  });

  // ── Animated Counters (hero stats, impact numbers) ──
  const counterEls = document.querySelectorAll('.hero-stat-value[data-target], .impact-number[data-target]');

  const animateCounter = el => {
    const target = parseInt(el.dataset.target, 10);
    const duration = 2000;
    const start = performance.now();
    const tick = now => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(eased * target);
      el.textContent = current;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target;
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

  counterEls.forEach(c => counterObserver.observe(c));
});
