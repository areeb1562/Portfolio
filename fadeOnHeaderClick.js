// ===================== FADE ALL SECTIONS ON HEADER CLICK =====================
document.addEventListener('DOMContentLoaded', () => {
  const headerLinks = document.querySelectorAll(".header-nav a[href^='#']");
  const sections = document.querySelectorAll("section");

  // Function to fade in all sections
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
});
