    // mist.js

    // Select the canvas
    const canvas = document.getElementById('mistCanvas');
    const ctx = canvas.getContext('2d');

    // Resize canvas to fit window
    function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Mist Particle Class
    class MistParticle {
    constructor() {
        this.reset();
    }
    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.radius = 150 + Math.random() * 100; // bigger mist blobs
        this.speedX = (Math.random() - 0.5) * 0.2;
        this.speedY = (Math.random() - 0.5) * 0.2;
        this.opacity = 0.15 + Math.random() * 0.2;
    }
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (
        this.x < -this.radius ||
        this.x > canvas.width + this.radius ||
        this.y < -this.radius ||
        this.y > canvas.height + this.radius
        ) {
        this.reset();
        }
    }
    draw() {
        const gradient = ctx.createRadialGradient(
        this.x, this.y, this.radius * 0.2,
        this.x, this.y, this.radius
        );
        gradient.addColorStop(0, `rgba(255,255,255,${this.opacity})`);
        gradient.addColorStop(0.5, `rgba(255,255,255,${this.opacity * 0.4})`);
        gradient.addColorStop(1, "rgba(0,0,0,0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
    }
    }

    // Create particles
    const particles = [];
    for (let i = 0; i < 15; i++) { // adjust number for density
    particles.push(new MistParticle());
    }

    // Animation loop
    function animateMist() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.update();
        p.draw();
    });
    requestAnimationFrame(animateMist);
    }
    animateMist();
