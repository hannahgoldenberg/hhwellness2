// H&H Wellness — script.js

document.addEventListener('DOMContentLoaded', () => {

  // ── Stagger in nav links ──
  const navLinks = document.querySelectorAll('.nav-links li');
  navLinks.forEach((li, i) => {
    li.style.opacity = '0';
    li.style.transform = 'translateY(-8px)';
    li.style.transition = `opacity 0.5s ${0.15 + i * 0.08}s ease, transform 0.5s ${0.15 + i * 0.08}s ease`;
    requestAnimationFrame(() => {
      li.style.opacity = '1';
      li.style.transform = 'translateY(0)';
    });
  });

  // ── Parallax rings on mouse move (hero only) ──
  const rings = document.querySelectorAll('.ring');
  const centerSymbol = document.querySelector('.center-symbol');
  if (rings.length) {
    document.addEventListener('mousemove', (e) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;

      rings.forEach((ring, i) => {
        const factor = (i + 1) * 5;
        ring.style.transform = `translate(calc(-50% + ${dx * factor}px), calc(-50% + ${dy * factor}px)) rotate(${Date.now() / (1000 * (40 + i * 20))}turn)`;
      });

      if (centerSymbol) {
        centerSymbol.style.transform = `translate(calc(-50% + ${dx * 10}px), calc(-50% + ${dy * 10}px))`;
      }
    });
  }

  // ── Subtle parallax on orbs via scroll ──
  const orbs = document.querySelectorAll('.orb');
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    orbs.forEach((orb, i) => {
      const speed = i % 2 === 0 ? 0.07 : -0.05;
      orb.style.transform = `translateY(${scrollY * speed}px)`;
    });
  }, { passive: true });

  // ── Founders card subtle hover tilt ──
  const card = document.querySelector('.founders-card');
  if (card) {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(800px) rotateX(${-y * 5}deg) rotateY(${x * 5}deg)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
    });
  }

  // ── Animate product cards on scroll ──
  const productCards = document.querySelectorAll('.product-card');
  if (productCards.length && 'IntersectionObserver' in window) {
    productCards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
    });
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const idx = [...productCards].indexOf(el);
          setTimeout(() => {
            el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, idx * 150);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.15 });
    productCards.forEach(c => obs.observe(c));
  }

  // ── Animate mission blocks on scroll ──
  const missionBlocks = document.querySelectorAll('.mission-block, .stat-card');
  if (missionBlocks.length && 'IntersectionObserver' in window) {
    missionBlocks.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(16px)';
    });
    const obs2 = new IntersectionObserver((entries) => {
      entries.forEach((entry, idx) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
          }, idx * 100);
          obs2.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });
    missionBlocks.forEach(el => obs2.observe(el));
  }

  // ── Animate pillars on scroll (about page) ──
  const pillars = document.querySelectorAll('.pillar');
  if (pillars.length && 'IntersectionObserver' in window) {
    pillars.forEach(p => {
      p.style.opacity = '0';
      p.style.transform = 'translateY(16px)';
    });
    const obs3 = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.pillar').forEach((p, i) => {
            setTimeout(() => {
              p.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
              p.style.opacity = '1';
              p.style.transform = 'translateY(0)';
            }, i * 120);
          });
          obs3.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    const pillarsParent = document.querySelector('.pillars');
    if (pillarsParent) obs3.observe(pillarsParent);
  }

});
