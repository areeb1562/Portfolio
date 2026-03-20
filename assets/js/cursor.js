const cursor = document.querySelector(".retro-cursor");

let mouseX = 0;
let mouseY = 0;

/* MOVE CURSOR */
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  cursor.style.left = mouseX + "px";
  cursor.style.top = mouseY + "px";
});

/* ALL CLICKABLE ELEMENTS */
const clickable = document.querySelectorAll(
  "a, button, .skill-card, .neo-item"
);

/* HOVER EFFECT */
clickable.forEach(el => {
  el.addEventListener("mouseenter", () => {
    cursor.classList.add("hover");
  });

  el.addEventListener("mouseleave", () => {
    cursor.classList.remove("hover");
  });
});

/* CLICK EFFECT */
document.addEventListener("mousedown", () => {
  cursor.classList.add("click");
});

document.addEventListener("mouseup", () => {
  cursor.classList.remove("click");
});






