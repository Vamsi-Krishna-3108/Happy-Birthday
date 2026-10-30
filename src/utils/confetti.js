/**
 * High-performance pastel confetti engine
 * Supports burst explosions, continuous floaters, hearts, and stars.
 */

class ConfettiEngine {
  constructor() {
    this.canvas = null;
    this.ctx = null;
    this.particles = [];
    this.animId = null;
    this.isContinuous = false;
    this.initCanvas();
  }

  initCanvas() {
    if (typeof document === 'undefined') return;
    let existing = document.getElementById('confetti-canvas');
    if (existing) {
      this.canvas = existing;
      this.ctx = this.canvas.getContext('2d');
      return;
    }

    this.canvas = document.createElement('canvas');
    this.canvas.id = 'confetti-canvas';
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100vw';
    this.canvas.style.height = '100vh';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '99999';
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');

    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  colors = [
    '#FF8F9C', // Coral Pink
    '#FFD6E7', // Soft Pink
    '#CDEBFF', // Baby Blue
    '#E5D8FF', // Lavender
    '#FFF0AD', // Butter Yellow
    '#B5EAD7', // Mint
    '#FFDAC1'  // Peach
  ];

  burst(originX = window.innerWidth / 2, originY = window.innerHeight / 2, count = 70) {
    this.initCanvas();
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 9;
      const type = Math.random() > 0.4 ? 'rect' : (Math.random() > 0.5 ? 'heart' : 'circle');
      this.particles.push({
        x: originX,
        y: originY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        size: 7 + Math.random() * 8,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10,
        gravity: 0.22,
        drag: 0.96,
        type: type,
        opacity: 1,
        decay: 0.007 + Math.random() * 0.009
      });
    }

    if (!this.animId) {
      this.animate();
    }
  }

  startContinuous() {
    this.isContinuous = true;
    if (!this.animId) {
      this.animate();
    }
  }

  stopContinuous() {
    this.isContinuous = false;
  }

  animate() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Add continuous gentle falling confetti
    if (this.isContinuous && Math.random() < 0.25) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: -15,
        vx: (Math.random() - 0.5) * 1.5,
        vy: 1 + Math.random() * 2,
        size: 6 + Math.random() * 6,
        color: this.colors[Math.floor(Math.random() * this.colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 4,
        gravity: 0.02,
        drag: 0.99,
        type: Math.random() > 0.5 ? 'rect' : 'heart',
        opacity: 0.9,
        decay: 0.002
      });
    }

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.vx *= p.drag;
      p.vy = p.vy * p.drag + p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;
      p.opacity -= p.decay;

      if (p.opacity <= 0 || p.y > this.canvas.height + 30) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.opacity);
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.fillStyle = p.color;

      if (p.type === 'rect') {
        this.ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.6);
      } else if (p.type === 'circle') {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        this.ctx.fill();
      } else if (p.type === 'heart') {
        this.drawHeart(this.ctx, 0, 0, p.size);
      }

      this.ctx.restore();
    }

    if (this.particles.length > 0 || this.isContinuous) {
      this.animId = requestAnimationFrame(() => this.animate());
    } else {
      this.animId = null;
    }
  }

  drawHeart(ctx, x, y, size) {
    const s = size / 16;
    ctx.beginPath();
    ctx.moveTo(x, y - 2 * s);
    ctx.bezierCurveTo(x, y - 7 * s, x - 8 * s, y - 7 * s, x - 8 * s, y - 2 * s);
    ctx.bezierCurveTo(x - 8 * s, y + 3 * s, x, y + 8 * s, x, y + 10 * s);
    ctx.bezierCurveTo(x, y + 8 * s, x + 8 * s, y + 3 * s, x + 8 * s, y - 2 * s);
    ctx.bezierCurveTo(x + 8 * s, y - 7 * s, x, y - 7 * s, x, y - 2 * s);
    ctx.fill();
  }
}

export const confetti = new ConfettiEngine();
