// ============================================
// JDevio TechnoLab — Scroll Reveals & Interactions
// ============================================

// ===== Scroll Reveal Observer =====
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

revealElements.forEach(el => observer.observe(el));

// ===== Navbar Scroll Effect =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 30) {
    nav.style.background = 'rgba(14, 17, 54, 0.95)';
    nav.style.backdropFilter = 'blur(20px)';
  } else {
    nav.style.background = 'rgba(14, 17, 54, 0.9)';
    nav.style.backdropFilter = 'blur(10px)';
  }
});

// ===== Mobile Nav Toggle =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');
if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
  });
}

// ===== Card Hover Scale Effect =====
document.querySelectorAll('.service-card, .process-card, .utility-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-6px)';
  });
  card.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
  });
});

// ===== Console Easter Egg =====
console.log(`
╔════════════════════════════════════╗
║   ⚡ JDevio TechnoLab             ║
║   AI • Software • Hardware       ║
║   we engineer the future         ║
╚════════════════════════════════════╝
`);
