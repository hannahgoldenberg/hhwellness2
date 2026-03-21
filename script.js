// H&H Wellness — script.js

document.addEventListener('DOMContentLoaded', () => {

    // ── Stagger in nav links ──
    const navLinks = document.querySelectorAll('.nav-links li');
    navLinks.forEach((li, i) => {
      li.style.opacity = '0';
      li.style.transform = 'translateY(-8px)';
      li.style.transition = `opacity 0.5s ${0.2 + i * 0.1}s ease, transform 0.5s ${0.2 + i * 0.1}s ease`;
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
          const factor = (i + 1) * 6;
          ring.style.transform = `translate(calc(-50% + ${dx * factor}px), calc(-50% + ${dy * factor}px)) rotate(${Date.now() / (1000 * (40 + i * 20))}turn)`;
        });
  
        if (centerSymbol) {
          centerSymbol.style.transform = `translate(calc(-50% + ${dx * 12}px), calc(-50% + ${dy * 12}px))`;
        }
      });
    }
  
    // ── Subtle parallax on orbs via scroll (about page) ──
    const orbs = document.querySelectorAll('.orb');
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      orbs.forEach((orb, i) => {
        const speed = i % 2 === 0 ? 0.08 : -0.06;
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
        card.style.transform = `perspective(800px) rotateX(${-y * 6}deg) rotateY(${x * 6}deg)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(800px) rotateX(0) rotateY(0)';
      });
    }
  
    // ── Animate pillar items in on scroll (about page) ──
    const pillars = document.querySelectorAll('.pillar');
    if (pillars.length && 'IntersectionObserver' in window) {
      pillars.forEach((p, i) => {
        p.style.opacity = '0';
        p.style.transform = 'translateY(16px)';
      });
      const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const els = entry.target.querySelectorAll('.pillar');
            els.forEach((p, i) => {
              setTimeout(() => {
                p.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
                p.style.opacity = '1';
                p.style.transform = 'translateY(0)';
              }, i * 120);
            });
            obs.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
  
      const pillarsParent = document.querySelector('.pillars');
      if (pillarsParent) obs.observe(pillarsParent);
    }
  
  });