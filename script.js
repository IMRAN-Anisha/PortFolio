// Static typewriter text that types once and stays
const staticPhrase = "Hi, I'm Anisha Imran";
const staticTextEl = document.getElementById("static-text");

function typeStaticText(index = 0) {
  if (index < staticPhrase.length) {
    staticTextEl.textContent += staticPhrase.charAt(index);
    setTimeout(() => typeStaticText(index + 1), 100);
  } else {
    // After static text finishes, start cycling animated phrases
    setTimeout(typeDynamic, 500);
  }
}

// Dynamic cycling phrases below static text
const phrases = ["Year 12 Student.","Aspiring Software Engineer.", "IBM · Meta · Microsoft credentials."];
let currentPhrase = 0;
let currentChar = 0;
const typewriterText = document.getElementById("typewriter-text");

function typeDynamic() {
  if (currentChar < phrases[currentPhrase].length) {
    typewriterText.textContent += phrases[currentPhrase].charAt(currentChar);
    currentChar++;
    setTimeout(typeDynamic, 100);
  } else {
    setTimeout(eraseDynamic, 2000);
  }
}

function eraseDynamic() {
  if (currentChar > 0) {
    typewriterText.textContent = phrases[currentPhrase].substring(0, currentChar - 1);
    currentChar--;
    setTimeout(eraseDynamic, 50);
  } else {
    currentPhrase = (currentPhrase + 1) % phrases.length;
    setTimeout(typeDynamic, 500);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  typeStaticText();
});

// Fade-in on scroll (same as before)
const sections = document.querySelectorAll("section");
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
});

sections.forEach(section => {
  observer.observe(section);
});

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let width, height;

  // Resize canvas to fill screen
  function resize() {
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }
  resize();
  window.addEventListener('resize', resize);

  // Particle class
  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = 1 + Math.random() * 2; // small sizes 1-3 px
      this.baseX = this.x;
      this.baseY = this.y;
      this.speedX = (Math.random() - 0.5) * 0.2; // slow horizontal drift
      this.speedY = (Math.random() - 0.5) * 0.2; // slow vertical drift
      this.alpha = 0.1 + Math.random() * 0.3; // subtle glow opacity
      this.color = '255,102,196'; // pink RGB
    }
    update(mouseXPercent, mouseYPercent) {
      this.x += this.speedX;
      this.y += this.speedY;

      // Keep particles inside bounds - wrap around edges
      if (this.x > width) this.x = 0;
      else if (this.x < 0) this.x = width;
      if (this.y > height) this.y = 0;
      else if (this.y < 0) this.y = height;

      // Parallax effect relative to mouse position
      const parallaxRange = 20; // max px movement
      const targetX = this.baseX + (mouseXPercent - 0.5) * parallaxRange;
      const targetY = this.baseY + (mouseYPercent - 0.5) * parallaxRange;

      // Smoothly move towards target position for parallax
      this.x += (targetX - this.x) * 0.05;
      this.y += (targetY - this.y) * 0.05;
    }
    draw(ctx) {
      const gradient = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 5);
      gradient.addColorStop(0, `rgba(${this.color},${this.alpha})`);
      gradient.addColorStop(1, 'rgba(255,102,196,0)');
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Create particles
  const particlesCount = 100;
  const particles = [];
  for (let i = 0; i < particlesCount; i++) {
    particles.push(new Particle());
  }

  // Track mouse position normalized to [0,1]
  let mouseXPercent = 0.5;
  let mouseYPercent = 0.5;

  window.addEventListener('mousemove', (e) => {
    mouseXPercent = e.clientX / width;
    mouseYPercent = e.clientY / height;
  });

  // Animation loop
  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.update(mouseXPercent, mouseYPercent);
      p.draw(ctx);
    });

    requestAnimationFrame(animate);
  }
  animate();
});
