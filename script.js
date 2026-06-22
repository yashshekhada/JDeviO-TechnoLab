// ============================================
// JDevio TechnoLab — Premium Interactions
// ============================================

// ===== Preloader =====
window.addEventListener('load', () => {
  setTimeout(() => {
    document.querySelector('.preloader').classList.add('hidden');
  }, 1800);
});

// ===== Custom Cursor =====
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

if (window.innerWidth > 768) {
  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Hover effect on interactive elements
  const hoverTargets = document.querySelectorAll('a, button, .bento-card, .work-card, .value-chip, input, textarea, select');
  hoverTargets.forEach(el => {
    el.addEventListener('mouseenter', () => follower.classList.add('hover'));
    el.addEventListener('mouseleave', () => follower.classList.remove('hover'));
  });
}

function updateCursor() {
  cursorX += (mouseX - cursorX) * 0.3;
  cursorY += (mouseY - cursorY) * 0.3;
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;

  cursor.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px)`;
  follower.style.transform = `translate(${followerX - 16}px, ${followerY - 16}px)`;

  requestAnimationFrame(updateCursor);
}
if (window.innerWidth > 768) updateCursor();

// ===== Particle Web Background =====
const canvas = document.getElementById('bg-canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

class Particle {
  constructor() {
    this.reset();
  }
  reset() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.vx = (Math.random() - 0.5) * 0.3;
    this.vy = (Math.random() - 0.5) * 0.3;
    this.size = Math.random() * 1.5 + 0.5;
    this.alpha = Math.random() * 0.4 + 0.1;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
    if (this.y < 0 || this.y > canvas.height) this.vy *= -1;

    // Mouse interaction
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist < 150 && mouseX !== 0) {
      const force = (150 - dist) / 150;
      this.x -= dx * force * 0.015;
      this.y -= dy * force * 0.015;
    }
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(108, 92, 231, ${this.alpha})`;
    ctx.fill();
  }
}

const particleCount = Math.min(
  100,
  Math.floor((canvas.width * canvas.height) / 12000)
);
for (let i = 0; i < particleCount; i++) {
  particles.push(new Particle());
}

function drawConnections() {
  for (let i = 0; i < particles.length; i++) {
    for (let j = i + 1; j < particles.length; j++) {
      const dx = particles[i].x - particles[j].x;
      const dy = particles[i].y - particles[j].y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 140) {
        const alpha = (1 - dist / 140) * 0.1;
        ctx.beginPath();
        ctx.moveTo(particles[i].x, particles[i].y);
        ctx.lineTo(particles[j].x, particles[j].y);
        ctx.strokeStyle = `rgba(108, 92, 231, ${alpha})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      }
    }
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(p => { p.update(); p.draw(); });
  drawConnections();
  requestAnimationFrame(animateParticles);
}
animateParticles();

// ===== Navbar Scroll =====
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 30);
});

// ===== Scroll Reveal =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('visible');
      }, delay);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('.reveal-up').forEach(el => revealObserver.observe(el));

// ===== Bento Card Glow Tracking =====
document.querySelectorAll('.bento-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mx', `${x}%`);
    card.style.setProperty('--my', `${y}%`);
  });
});

// ===== Counter Animation =====
const statNumbers = document.querySelectorAll('.stat-num');
let statsAnimated = false;

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !statsAnimated) {
      statsAnimated = true;
      animateNumbers();
    }
  });
}, { threshold: 0.5 });

function animateNumbers() {
  document.querySelectorAll('[data-target]').forEach(el => {
    if (!el.dataset.target) return;
    const target = parseInt(el.dataset.target);
    const suffix = el.dataset.suffix || '+';
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.floor(target * eased);
      el.textContent = current + suffix;
      if (progress < 1) requestAnimationFrame(update);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(update);
  });
}

const heroStats = document.querySelector('.hero-stats');
if (heroStats) statsObserver.observe(heroStats);

// ===== CTA Button Interaction =====
const ctaBtn = document.getElementById('cta-button');
if (ctaBtn) {
  ctaBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  });
}

// ===== Tech Duplicate for Marquee (strip) =====
document.querySelectorAll('.strip-items').forEach(strip => {
  if (!strip.hasAttribute('aria-hidden')) {
    strip.innerHTML += strip.innerHTML;
  }
});

// ===== Console Easter Egg =====
console.log(`
╔════════════════════════════════════╗
║   ⚡ JDevio TechnoLab            ║
║   We Engineer the Future.        ║
║                                  ║
║   🦞 OpenClaw  🤖 AI/ML         ║
║   📱 Mobile    🌐 Web           ║
║   🔌 Embedded  ⚙️ DevOps       ║
╚════════════════════════════════════╝
`);
