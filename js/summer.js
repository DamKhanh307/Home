// ============================================
// SUMMER THEME — June through August
// Blue sky · Sun · Ocean · Rain · Breeze
// ============================================

(function () {
  'use strict';

  const month = new Date().getMonth();
  const isSummer = month >= 5 && month <= 7;
  if (!isSummer) return;

  document.documentElement.classList.add('summer');
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = './css/summer.css';
  document.head.appendChild(link);

  const tagline = document.querySelector('.profile-tagline');
  if (tagline) tagline.textContent = 'Developer · Creator · ☀️ Summer Vibes';

  const statusBadge = document.getElementById('status-badge');
  if (statusBadge) statusBadge.querySelector('span:last-child').textContent = 'Summer Mode';

  // ============================================
  // 1. SUN with rays
  // ============================================
  function createSun() {
    const sun = document.createElement('div');
    sun.className = 'summer-sun';
    sun.setAttribute('aria-hidden', 'true');

    const rayCount = 14;
    for (let i = 0; i < rayCount; i++) {
      const ray = document.createElement('div');
      ray.className = 'sun-ray';
      ray.style.height = (30 + Math.random() * 40) + 'px';
      ray.style.transform = `rotate(${(360 / rayCount) * i}deg)`;
      ray.style.opacity = 0.15 + Math.random() * 0.25;
      sun.appendChild(ray);
    }
    document.body.appendChild(sun);
  }

  // ============================================
  // 2. OCEAN — canvas with real wave physics
  // ============================================
  function createOcean() {
    const canvas = document.createElement('canvas');
    canvas.id = 'summer-ocean-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let W, H;

    function resize() {
      W = canvas.width = window.innerWidth;
      H = canvas.height = window.innerWidth < 600 ? 100 : 160;
    }
    resize();
    window.addEventListener('resize', resize);

    // Multiple wave layers
    const waves = [
      { amp: 12, len: 300, speed: 0.015, y: 0.20, color: 'rgba(10, 80, 160, 0.7)' },
      { amp: 8,  len: 200, speed: 0.022, y: 0.30, color: 'rgba(20, 110, 190, 0.6)' },
      { amp: 10, len: 250, speed: 0.018, y: 0.25, color: 'rgba(15, 95, 175, 0.5)' },
      { amp: 6,  len: 180, speed: 0.028, y: 0.38, color: 'rgba(30, 130, 210, 0.45)' },
      { amp: 4,  len: 150, speed: 0.035, y: 0.45, color: 'rgba(50, 160, 230, 0.35)' },
    ];

    let time = 0;

    // Foam particles
    const foams = [];
    class Foam {
      constructor() { this.reset(true); }
      reset(init) {
        this.x = init ? Math.random() * W : -5;
        this.y = H * 0.15 + Math.random() * H * 0.15;
        this.r = 1 + Math.random() * 2.5;
        this.speed = 0.3 + Math.random() * 0.6;
        this.alpha = 0.3 + Math.random() * 0.4;
        this.life = 80 + Math.random() * 120;
        this.maxLife = this.life;
      }
      update() {
        this.x += this.speed;
        this.y += Math.sin(time * 0.05 + this.x * 0.01) * 0.3;
        this.life--;
        if (this.x > W + 10 || this.life <= 0) this.reset(false);
      }
      draw(ctx) {
        const a = this.alpha * Math.min(this.life / this.maxLife, 1);
        ctx.fillStyle = `rgba(220, 240, 255, ${a})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const foamCount = W < 600 ? 15 : 35;
    for (let i = 0; i < foamCount; i++) foams.push(new Foam());

    function drawOcean() {
      ctx.clearRect(0, 0, W, H);
      time++;

      // Deep water base
      const baseGrad = ctx.createLinearGradient(0, 0, 0, H);
      baseGrad.addColorStop(0, 'rgba(5, 60, 130, 0.0)');
      baseGrad.addColorStop(0.3, 'rgba(5, 60, 130, 0.4)');
      baseGrad.addColorStop(0.6, 'rgba(8, 50, 110, 0.7)');
      baseGrad.addColorStop(1, 'rgba(5, 30, 70, 0.9)');
      ctx.fillStyle = baseGrad;
      ctx.fillRect(0, 0, W, H);

      // Draw wave layers back to front
      waves.forEach((wave, idx) => {
        ctx.beginPath();
        const baseY = H * wave.y;

        ctx.moveTo(-10, H);
        for (let x = -10; x <= W + 10; x += 3) {
          const y = baseY +
            Math.sin(x / wave.len * Math.PI * 2 + time * wave.speed) * wave.amp +
            Math.sin(x / (wave.len * 0.6) * Math.PI * 2 + time * wave.speed * 1.3 + idx) * wave.amp * 0.4;
          if (x === -10) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.lineTo(W + 10, H);
        ctx.lineTo(-10, H);
        ctx.closePath();
        ctx.fillStyle = wave.color;
        ctx.fill();
      });

      // White foam crests on first wave
      ctx.save();
      ctx.globalAlpha = 0.25;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.6)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      const fw = waves[0];
      const fBaseY = H * fw.y;
      for (let x = 0; x <= W; x += 2) {
        const y = fBaseY +
          Math.sin(x / fw.len * Math.PI * 2 + time * fw.speed) * fw.amp +
          Math.sin(x / (fw.len * 0.6) * Math.PI * 2 + time * fw.speed * 1.3) * fw.amp * 0.4;
        if (x === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
      ctx.stroke();
      ctx.restore();

      // Foam particles
      foams.forEach(f => { f.update(); f.draw(ctx); });

      // Light reflection on water
      ctx.save();
      ctx.globalAlpha = 0.06;
      const refX = W * 0.65;
      const refGrad = ctx.createRadialGradient(refX, 10, 5, refX, 10, 150);
      refGrad.addColorStop(0, 'rgba(255, 230, 150, 0.8)');
      refGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = refGrad;
      ctx.fillRect(0, 0, W, H);
      ctx.restore();

      requestAnimationFrame(drawOcean);
    }
    drawOcean();
  }

  // ============================================
  // 3. RAIN — big visible tropical rain
  // ============================================
  function createRainSystem() {
    const canvas = document.createElement('canvas');
    canvas.className = 'summer-rain-canvas';
    canvas.setAttribute('aria-hidden', 'true');
    document.body.appendChild(canvas);

    const stormOverlay = document.createElement('div');
    stormOverlay.className = 'storm-overlay';
    document.body.appendChild(stormOverlay);

    const lightningEl = document.createElement('div');
    lightningEl.className = 'lightning-flash';
    document.body.appendChild(lightningEl);

    const ctx = canvas.getContext('2d');
    let isRaining = false;
    let rainIntensity = 0;
    let windAngle = 0.2;

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Drop {
      constructor() { this.reset(); }
      reset() {
        this.x = Math.random() * (canvas.width + 300) - 150;
        this.y = -20 - Math.random() * canvas.height * 0.4;
        this.len = 25 + Math.random() * 35;
        this.speed = 16 + Math.random() * 14;
        this.alpha = 0.2 + Math.random() * 0.35;
        this.width = 1.2 + Math.random() * 1;
      }
      update() {
        this.x += windAngle * this.speed * 0.5;
        this.y += this.speed;
        if (this.y > canvas.height + 30) this.reset();
      }
      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha * rainIntensity;
        ctx.strokeStyle = 'rgba(180, 210, 240, 0.8)';
        ctx.lineWidth = this.width;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.x + windAngle * this.len, this.y + this.len);
        ctx.stroke();
        ctx.restore();
      }
    }

    // Splash rings
    const splashes = [];
    class Splash {
      constructor(x, y) {
        this.x = x; this.y = y;
        this.radius = 1; this.maxR = 5 + Math.random() * 6;
        this.alpha = 0.5; this.speed = 0.4 + Math.random() * 0.4;
      }
      update() {
        this.radius += this.speed;
        this.alpha -= 0.025;
      }
      draw(ctx) {
        if (this.alpha <= 0) return;
        ctx.save();
        ctx.globalAlpha = this.alpha * rainIntensity;
        ctx.strokeStyle = 'rgba(200, 225, 255, 0.6)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.ellipse(this.x, this.y, this.radius * 1.5, this.radius * 0.5, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
      get dead() { return this.alpha <= 0; }
    }

    const dropCount = window.innerWidth < 600 ? 120 : 250;
    const drops = [];
    for (let i = 0; i < dropCount; i++) drops.push(new Drop());

    function animateRain() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (rainIntensity > 0.01) {
        windAngle += (Math.random() - 0.5) * 0.003;
        windAngle = Math.max(-0.35, Math.min(0.5, windAngle));

        // Mist/fog effect during heavy rain
        if (rainIntensity > 0.5) {
          ctx.save();
          ctx.fillStyle = `rgba(180, 200, 220, ${rainIntensity * 0.04})`;
          ctx.fillRect(0, canvas.height * 0.7, canvas.width, canvas.height * 0.3);
          ctx.restore();
        }

        drops.forEach(d => {
          d.update();
          d.draw(ctx);
          if (d.y >= canvas.height - 10 && Math.random() < 0.05) {
            splashes.push(new Splash(d.x + windAngle * 5, canvas.height - 3));
          }
        });

        for (let i = splashes.length - 1; i >= 0; i--) {
          splashes[i].update();
          splashes[i].draw(ctx);
          if (splashes[i].dead) splashes.splice(i, 1);
        }
      }

      requestAnimationFrame(animateRain);
    }
    animateRain();

    // Rain scheduling
    function startRain() {
      isRaining = true;
      canvas.classList.add('raining');
      stormOverlay.classList.add('active');
      const fadeIn = setInterval(() => {
        rainIntensity = Math.min(rainIntensity + 0.025, 1);
        if (rainIntensity >= 1) clearInterval(fadeIn);
      }, 50);
      scheduleLightning();
    }

    function stopRain() {
      isRaining = false;
      const fadeOut = setInterval(() => {
        rainIntensity = Math.max(rainIntensity - 0.015, 0);
        if (rainIntensity <= 0) {
          clearInterval(fadeOut);
          canvas.classList.remove('raining');
          stormOverlay.classList.remove('active');
        }
      }, 50);
    }

    function scheduleLightning() {
      if (!isRaining) return;
      setTimeout(() => {
        if (!isRaining) return;
        // Double flash
        lightningEl.style.opacity = '0.15';
        setTimeout(() => { lightningEl.style.opacity = '0'; }, 70);
        setTimeout(() => {
          lightningEl.style.opacity = '0.08';
          setTimeout(() => { lightningEl.style.opacity = '0'; }, 50);
        }, 130);
        scheduleLightning();
      }, 4000 + Math.random() * 8000);
    }

    // First rain after 10-20s, then every 40-100s
    setTimeout(() => {
      startRain();
      setTimeout(stopRain, 12000 + Math.random() * 12000);

      (function loop() {
        setTimeout(() => {
          startRain();
          setTimeout(() => { stopRain(); loop(); }, 12000 + Math.random() * 15000);
        }, 40000 + Math.random() * 60000);
      })();
    }, 10000 + Math.random() * 10000);
  }

  // ============================================
  // 4. PARTICLES — fireflies + sea breeze
  // ============================================
  function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resize();
    window.addEventListener('resize', resize);

    class Firefly {
      constructor() { this.reset(true); }
      reset(init) {
        this.x = Math.random() * canvas.width;
        this.y = init ? Math.random() * canvas.height : canvas.height + 10;
        this.speed = 0.15 + Math.random() * 0.25;
        this.angle = Math.random() * Math.PI * 2;
        this.aSpeed = (Math.random() - 0.5) * 0.007;
        this.wobble = Math.random() * Math.PI * 2;
        this.wSpeed = 0.01 + Math.random() * 0.015;
        this.r = 1.2 + Math.random() * 1.5;
        this.glow = 8 + Math.random() * 12;
        this.phase = Math.random() * Math.PI * 2;
        this.pSpeed = 0.012 + Math.random() * 0.018;
        this.maxA = 0.2 + Math.random() * 0.3;

        const w = Math.random();
        this.cr = w < 0.6 ? 255 : 180 + Math.random() * 40;
        this.cg = w < 0.6 ? 200 + Math.random() * 40 : 255;
        this.cb = w < 0.6 ? 60 + Math.random() * 60 : 100 + Math.random() * 80;
      }
      update() {
        this.angle += this.aSpeed;
        this.wobble += this.wSpeed;
        this.x += Math.cos(this.angle) * this.speed + Math.sin(this.wobble) * 0.15;
        this.y += Math.sin(this.angle) * this.speed - 0.06;
        this.phase += this.pSpeed;
        this.alpha = 0.02 + (this.maxA - 0.02) * (0.5 + 0.5 * Math.sin(this.phase));
        if (Math.random() < 0.003) this.aSpeed = (Math.random() - 0.5) * 0.01;
        const m = 30;
        if (this.x < -m) this.x = canvas.width + m;
        if (this.x > canvas.width + m) this.x = -m;
        if (this.y < -m) this.y = canvas.height + m;
        if (this.y > canvas.height + m) this.y = -m;
      }
      draw(ctx) {
        if (this.alpha < 0.03) return;
        const g = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.glow);
        g.addColorStop(0, `rgba(${this.cr},${this.cg},${this.cb},${this.alpha * 0.3})`);
        g.addColorStop(1, `rgba(${this.cr},${this.cg},${this.cb},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.glow, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = `rgba(${this.cr},${this.cg},${this.cb},${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Wind/breeze streaks
    class Breeze {
      constructor() { this.reset(true); }
      reset(init) {
        this.x = init ? Math.random() * canvas.width : -60;
        this.y = Math.random() * canvas.height * 0.8;
        this.len = 40 + Math.random() * 80;
        this.speed = 1.5 + Math.random() * 2;
        this.alpha = 0.015 + Math.random() * 0.025;
        this.curve = (Math.random() - 0.5) * 0.2;
      }
      update() {
        this.x += this.speed;
        this.y += this.curve;
        if (this.x > canvas.width + 100) this.reset(false);
      }
      draw(ctx) {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.quadraticCurveTo(
          this.x + this.len * 0.5, this.y + this.curve * 12,
          this.x + this.len, this.y + this.curve * 6
        );
        ctx.stroke();
        ctx.restore();
      }
    }

    const mobile = window.innerWidth < 600;
    const fireflies = Array.from({ length: mobile ? 12 : 24 }, () => new Firefly());
    const breezes = Array.from({ length: mobile ? 3 : 7 }, () => new Breeze());

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      breezes.forEach(b => { b.update(); b.draw(ctx); });
      fireflies.forEach(f => { f.update(); f.draw(ctx); });
      requestAnimationFrame(animate);
    }
    animate();
  }

  // ============================================
  // INIT
  // ============================================
  function init() {
    createSun();
    createOcean();
    createRainSystem();
    requestAnimationFrame(() => setTimeout(initParticles, 200));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
