const intro = document.querySelector('.intro-screen');
const cue = document.querySelector('.scroll-cue');
const content = document.querySelector('.content');
const header = document.querySelector('.main-header');

// Hide intro
function hideIntro() {
  if (!intro.classList.contains("hide")) {
    intro.classList.add("hide");
    setTimeout(() => {
      intro.style.display = "none";
    }, 800);
  }
}


// On scroll
window.addEventListener("scroll", () => {
  hideIntro();         // remove intro if not already
  toggleHeader();      // show header when scrolling down
});

// On scroll cue click
cue.addEventListener("click", () => {
  content.scrollIntoView({ behavior: "smooth" });
  hideIntro();
  toggleHeader();
});

// GSAP animations
gsap.utils.toArray("main section").forEach((section) => {
  gsap.from(section, {
    scrollTrigger: {
      trigger: section,
      start: "top 85%",
    },
    opacity: 0,
    y: 40,
    duration: 1,
    ease: "power2.out"
  });
});

