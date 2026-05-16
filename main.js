document.addEventListener('DOMContentLoaded', function () {
  // ============================================
  // TYPING EFFECT
  // ============================================
  const el = document.getElementById("typing");
  const text = "Đàm Khánh";
  let idx = 0;
  let deleting = false;

  function typeLoop() {
    const speed = deleting ? 60 : 100;

    if (!deleting) {
      el.textContent = text.slice(0, idx + 1);
      idx++;
      if (idx === text.length) {
        setTimeout(() => { deleting = true; }, 2000);
      }
    } else {
      el.textContent = text.slice(0, idx - 1);
      idx--;
      if (idx === 0) {
        deleting = false;
      }
    }
    setTimeout(typeLoop, speed);
  }
  typeLoop();

  // ============================================
  // AVATAR EASTER EGG (preserved)
  // ============================================
  const avatarImg = document.getElementById('avatar-img');
  let clickCount = 0;
  const devices = window.screen;

  avatarImg.addEventListener('click', function () {
    clickCount++;
    if (clickCount === 3) {
      const inputPass = prompt('Input Password To Continue:');
      clickCount = 0;
      if (inputPass != null) {
        const userInput = inputPass.toLowerCase();
        if (userInput === 'damkhanh') {
          window.location.href = 'https://damkhanh307.github.io/Home/IMG/';
        } else {
          if (devices.width >= 900) {
            window.location.href = 'https://damkhanh307.github.io/Home/404-not-found/';
          } else {
            window.location.href = 'https://damkhanh307.github.io/Home/404';
          }
        }
      }
    }
  });

  // ============================================
  // RIPPLE EFFECT ON BUTTONS
  // ============================================
  document.querySelectorAll(".link-btn, .social-btn").forEach(btn => {
    btn.addEventListener("click", function (e) {
      const circle = document.createElement("span");
      const d = Math.max(this.clientWidth, this.clientHeight);
      circle.style.width = circle.style.height = `${d}px`;

      const rect = this.getBoundingClientRect();
      circle.style.left = (e.clientX - rect.left - d / 2) + "px";
      circle.style.top = (e.clientY - rect.top - d / 2) + "px";

      circle.classList.add("ripple-effect");
      this.appendChild(circle);
      setTimeout(() => circle.remove(), 600);
    });
  });

  // ============================================
  // FLOATING PARTICLES (replacing sakura)
  // ============================================
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  const PARTICLE_COUNT = 40;

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
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.3;
      this.speedY = (Math.random() - 0.5) * 0.3;
      this.opacity = Math.random() * 0.4 + 0.1;
      this.fadeDir = Math.random() > 0.5 ? 1 : -1;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.opacity += this.fadeDir * 0.002;

      if (this.opacity <= 0.05 || this.opacity >= 0.5) {
        this.fadeDir *= -1;
      }

      if (this.x < 0 || this.x > canvas.width ||
        this.y < 0 || this.y > canvas.height) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`;
      ctx.fill();
    }
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    particles.push(new Particle());
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(255, 255, 255, ${0.03 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => {
      p.update();
      p.draw();
    });

    requestAnimationFrame(animateParticles);
  }
  animateParticles();

  // ============================================
  // SUBTLE CARD TILT ON MOUSE (desktop only)
  // ============================================
  if (window.innerWidth > 768) {
    const cards = document.querySelectorAll('.glass-card');
    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width - 0.5) * 6;
        const y = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
        card.style.transform = `translateY(-2px) perspective(800px) rotateY(${x}deg) rotateX(${y}deg)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) perspective(800px) rotateY(0deg) rotateX(0deg)';
        card.style.transition = 'transform 0.5s ease';
        setTimeout(() => { card.style.transition = ''; }, 500);
      });
    });
  }

  // ============================================
  // INTERSECTION OBSERVER FOR SCROLL ANIMATIONS
  // ============================================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.link-btn').forEach((btn, i) => {
    btn.style.opacity = '0';
    btn.style.transform = 'translateY(15px)';
    btn.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`;
    observer.observe(btn);
  });
});
