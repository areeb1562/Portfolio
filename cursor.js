const cursor = document.querySelector(".cursor-light");

let mouseX = 0;
let mouseY = 0;
let currentX = 0;
let currentY = 0;

function animate() {
  currentX += (mouseX - currentX) * 0.1;
  currentY += (mouseY - currentY) * 0.1;

  cursor.style.transform = `translate(${currentX - 50}px, ${currentY - 50}px)`;

  requestAnimationFrame(animate);
}

window.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
});

animate();
