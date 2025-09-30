// ===================== DOM CONTENT LOADED =====================
document.addEventListener('DOMContentLoaded', () => {

  // ===================== SELECTORS =====================
  const intro = document.querySelector('.intro-screen');
  const cue = document.querySelector('.scroll-cue');
  const content = document.querySelector('.content');
  const header = document.querySelector('.header');
  const headerLinks = document.querySelectorAll('.header-nav a');
  const sections = document.querySelectorAll('main section');
  const cardWrapper = document.querySelector('.pc-card-wrapper');
  const card = document.querySelector('.pc-card');
  const cursorLight = document.querySelector('.cursor-light');

  // ===================== AGE CALCULATION =====================
  const dob = new Date(2002, 11, 20); // Replace with your DOB: year, month (0-11), day
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  const dayDiff = today.getDate() - dob.getDate();
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) age--;
  const ageSpan = document.getElementById('age');
  if (ageSpan) ageSpan.textContent = age;

  // ===================== HIDE INTRO SCREEN =====================
  function hideIntro() {
    if (!intro.classList.contains("hide")) {
      intro.classList.add("hide");
      setTimeout(() => {
        intro.style.display = "none";
      }, 800);
    }
  }

  // ===================== SHOW/HIDE HEADER =====================
  function toggleHeader() {
    if (window.scrollY > 100) header.classList.add("visible");
    else header.classList.remove("visible");
  }

  // ===================== SCROLL EVENTS =====================
  window.addEventListener("scroll", () => {
    hideIntro();
    toggleHeader();
  });

  // ===================== SCROLL CUE CLICK =====================
  if (cue) {
    cue.addEventListener("click", () => {
      const firstSection = sections[0];
      if (firstSection) {
        gsap.set(firstSection, { opacity: 1, y: 0 }); // fix blank
        firstSection.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      hideIntro();
      toggleHeader();
    });
  }

  // ===================== HEADER NAV CLICK =====================
  headerLinks.forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        gsap.set(target, { opacity: 1, y: 0 });
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  });

  // ===================== GSAP SECTION FADE-IN =====================
  sections.forEach(section => {
    gsap.fromTo(section,
      { opacity: 0, y: 40 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top 85%",
          toggleActions: "play none none none",
        }
      }
    );
  });

  // ===================== CURSOR TRAIL =====================
  const trailLength = window.innerWidth < 768 ? 5 : 10;
  const trail = [];

  for (let i = 0; i < trailLength; i++) {
    const dot = document.createElement("div");
    dot.className = "trail-dot";
    document.body.appendChild(dot);
    trail.push({ el: dot, x: 0, y: 0 });
  }

  let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

  document.addEventListener("mousemove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    if (cursorLight) cursorLight.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`;
  });

  document.addEventListener("touchmove", e => {
    if (e.touches.length > 0) {
      mouse.x = e.touches[0].clientX;
      mouse.y = e.touches[0].clientY;
      if (cursorLight) cursorLight.style.transform = `translate(${mouse.x}px, ${mouse.y}px)`;
    }
  });

  function animateTrail() {
    trail.forEach((point, i) => {
      const next = trail[i - 1] || mouse;
      point.x += (next.x - point.x) * 0.3;
      point.y += (next.y - point.y) * 0.3;

      point.el.style.left = `${point.x}px`;
      point.el.style.top = `${point.y}px`;
      point.el.style.opacity = (1 - i / trail.length) * 0.9;
    });
    requestAnimationFrame(animateTrail);
  }

  animateTrail();

  // ===================== PROFILE CARD 3D TILT =====================
  if (cardWrapper && card) {
    cardWrapper.addEventListener('mousemove', (e) => {
      const rect = cardWrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * 10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `rotateX(${-rotateX}deg) rotateY(${rotateY}deg)`;
      cardWrapper.style.setProperty('--rotate-x', `${rotateY}deg`);
      cardWrapper.style.setProperty('--rotate-y', `${-rotateX}deg`);
    });

    cardWrapper.addEventListener('mouseleave', () => {
      card.style.transform = `rotateX(0deg) rotateY(0deg)`;
    });
  }

  // ===================== MIST CANVAS =====================
  const mistCanvas = document.getElementById('mistCanvas');
  const ctx = mistCanvas.getContext('2d');

  function resizeCanvas() {
    mistCanvas.width = window.innerWidth;
    mistCanvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);

  class MistParticle {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * mistCanvas.width;
      this.y = Math.random() * mistCanvas.height;
      this.radius = 150 + Math.random() * 150;
      this.speedX = (Math.random() - 0.5) * 0.2;
      this.speedY = (Math.random() - 0.5) * 0.2;
      this.opacity = 0.2 + Math.random() * 0.3;
    }
    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      if (this.x < -this.radius || this.x > mistCanvas.width + this.radius ||
          this.y < -this.radius || this.y > mistCanvas.height + this.radius) this.reset();
    }
    draw() {
      const gradient = ctx.createRadialGradient(this.x, this.y, this.radius * 0.2, this.x, this.y, this.radius);
      gradient.addColorStop(0, `rgba(255,255,255,${this.opacity})`);
      gradient.addColorStop(0.5, `rgba(255,255,255,${this.opacity * 0.4})`);
      gradient.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const mistParticles = Array.from({ length: 20 }, () => new MistParticle());

  function animateMist() {
    ctx.clearRect(0, 0, mistCanvas.width, mistCanvas.height);
    mistParticles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animateMist);
  }
  animateMist();

}); // end DOMContentLoaded

// ===================== MUSIC PLAYER =====================
const tracks = [
  { src: "assets/music/Realise_Flowing_into_darkness.mp3", title: "Realise - Flowing Into Darkness" },
  { src: "assets/music/Sappheiros_Falling.mp3", title: "Sappheiros - Falling" },
  { src: "assets/music/Scott_buckley_Ephemera.mp3", title: "Scott Buckley - Ephemera" },
  { src: "assets/music/Scott_buckley_Snowfall.mp3", title: "Scott Buckley - Snowfall" }
];

let current = 0;
const music = document.getElementById("bg-music");
const title = document.getElementById("song-title");
const nextBtn = document.getElementById("next-btn");

music.volume = 0.1;

function playTrack(index) {
  music.src = tracks[index].src;
  title.textContent = tracks[index].title;
  music.muted = false;
  music.play().catch(err => {
    console.log("Autoplay blocked", err);
    title.textContent = "Tap Screen for music";
  });
}

window.addEventListener("load", () => playTrack(current));

function enableMusic() {
  playTrack(current);
  document.removeEventListener("click", enableMusic);
  document.removeEventListener("scroll", enableMusic);
  document.removeEventListener("touchstart", enableMusic);
}
document.addEventListener("click", enableMusic);
document.addEventListener("scroll", enableMusic);
document.addEventListener("touchstart", enableMusic);

nextBtn.addEventListener("click", () => {
  current = (current + 1) % tracks.length;
  playTrack(current);
});

music.addEventListener("timeupdate", () => {
  if (music.duration && music.currentTime >= music.duration - 0.5) {
    current = (current + 1) % tracks.length;
    playTrack(current);
  }
});

music.addEventListener("pause", () => title.textContent = "Tap Screen for music");
music.addEventListener("play", () => title.textContent = tracks[current].title);
  
// ===================== FADE IN ALL SECTIONS ON HEADER CLICK =====================
function fadeInAllSections() {
  sections.forEach(section => {
    section.style.transition = "opacity 0.6s ease, transform 0.6s ease, filter 0.6s ease";
    section.style.opacity = "1";
    section.style.transform = "translateY(0)";
    section.style.filter = "blur(0)";
  });
}

// Apply fade in all sections when a header link is clicked
headerLinks.forEach(link => {
  link.addEventListener("click", () => {
    fadeInAllSections();
  });
});
