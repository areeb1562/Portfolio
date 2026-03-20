  // Always force scroll to top on load
  window.onload = function () {
    window.scrollTo(0, 0);
  };

window.addEventListener("load", () => {
    window.scrollTo(0, 0);
});


document.addEventListener("DOMContentLoaded", function () {

    const menuBtn = document.getElementById("menuBtn");
    const mobileMenu = document.getElementById("mobileMenu");
    const menuOverlay = document.getElementById("menuOverlay");
    const mobileLinks = document.querySelectorAll("#mobileMenu a");

    function openMenu() {
        mobileMenu.classList.add("active");
        menuOverlay.classList.add("active");
        document.body.style.overflow = "hidden"; // prevent background scroll
    }

    function closeMenu() {
        mobileMenu.classList.remove("active");
        menuOverlay.classList.remove("active");
        document.body.style.overflow = ""; // restore scroll
    }

    if (menuBtn) {
        menuBtn.addEventListener("click", function () {
            if (mobileMenu.classList.contains("active")) {
                closeMenu();
            } else {
                openMenu();
            }
        });
    }

    if (menuOverlay) {
        menuOverlay.addEventListener("click", closeMenu);
    }

    // 🔥 Close menu when clicking a link
    mobileLinks.forEach(link => {
        link.addEventListener("click", closeMenu);
    });

});

window.addEventListener("load", () => {

    const preloader = document.querySelector(".preloader");
    const percent = document.querySelector(".percent");
    const dots = document.querySelector(".dots");

    let count = 0;

    // Measure how many dots fit in the available space
    function getMaxDots() {
        const testDot = document.createElement("span");
        testDot.textContent = ".";
        dots.appendChild(testDot);

        const dotWidth = testDot.offsetWidth;
        dots.removeChild(testDot);

        return Math.floor(dots.offsetWidth / dotWidth);
    }

    let maxDots = getMaxDots();

    const interval = setInterval(() => {

        count++;

        percent.textContent = count + "%";

        const filled = Math.floor((count / 100) * maxDots);
        dots.textContent = ".".repeat(filled);

        if (count >= 100) {
            clearInterval(interval);

            setTimeout(() => {
                preloader.style.transition = "opacity 0.4s ease";
                preloader.style.opacity = "0";
            }, 200);

            setTimeout(() => {
                preloader.remove();
            }, 900);
        }

    }, 13);

});


/* ============================= */
/*             MUSIC             */
/* ============================= */

document.addEventListener("DOMContentLoaded", function () {

    const audio = document.getElementById("audioPlayer");

    const trackTitle = document.getElementById("trackTitle");
    const timeDisplay = document.getElementById("timeDisplay");
    const progressBar = document.getElementById("progressBar");
    const volumeBar = document.getElementById("volumeBar");

    const playBtn = document.getElementById("playBtn");
    const pauseBtn = document.getElementById("pauseBtn");
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");

    const playlist = [
        "assets/music/Realise_Flowing_into_darkness.mp3",
        "assets/music/Sappheiros_Falling.mp3",
        "assets/music/Scott_buckley_Ephemera.mp3",
        "assets/music/Scott_buckley_Snowfall.mp3"
    ];

    let currentIndex = 0;

    /* ============================= */
    /*         FORMAT TIME           */
    /* ============================= */

    function formatTime(time) {
        if (isNaN(time)) return "00:00";
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return mins + ":" + (secs < 10 ? "0" : "") + secs;
    }

    /* ============================= */
    /*          LOAD TRACK           */
    /* ============================= */

    function loadTrack(index, autoPlay = false) {

        audio.pause();
        audio.currentTime = 0;

        audio.src = playlist[index];
        audio.load();

        const fileName = playlist[index].split("/").pop();
        trackTitle.textContent = fileName.replace(".mp3", "");

        progressBar.value = 0;
        timeDisplay.textContent = "00:00 / 00:00";

        /* Wait for metadata (IMPORTANT FIX) */
        audio.addEventListener("loadedmetadata", function onMeta() {

            timeDisplay.textContent =
                "00:00 / " + formatTime(audio.duration);

            audio.removeEventListener("loadedmetadata", onMeta);

            if (autoPlay) {
                audio.play();
            }

        });

    }

    /* ============================= */
    /*         PLAY / PAUSE          */
    /* ============================= */

    playPauseBtn.addEventListener("click", () => {
        if (audio.paused) {
            audio.play();
            playPauseBtn.textContent = "⏸";
        } else {
            audio.pause();
            playPauseBtn.textContent = "▶";
        }
    });
    /* ============================= */
    /*           NEXT                */
    /* ============================= */

    nextBtn.addEventListener("click", function () {
        currentIndex++;
        if (currentIndex >= playlist.length) currentIndex = 0;

        loadTrack(currentIndex, true); // autoplay TRUE
    });

    /* ============================= */
    /*           PREVIOUS            */
    /* ============================= */

    prevBtn.addEventListener("click", function () {
        currentIndex--;
        if (currentIndex < 0) currentIndex = playlist.length - 1;

        loadTrack(currentIndex, true); // autoplay TRUE
    });

    /* ============================= */
    /*        UPDATE PROGRESS        */
    /* ============================= */

    audio.addEventListener("timeupdate", function () {

        if (!audio.duration) return;

        progressBar.value =
            (audio.currentTime / audio.duration) * 100;

        timeDisplay.textContent =
            formatTime(audio.currentTime) +
            " / " +
            formatTime(audio.duration);
    });

    /* ============================= */
    /*           SEEK                */
    /* ============================= */

    progressBar.addEventListener("input", function () {
        if (!audio.duration) return;

        audio.currentTime =
            (progressBar.value / 100) * audio.duration;
    });

    /* ============================= */
    /*          VOLUME (70%)         */
    /* ============================= */

    audio.volume = 0.2;
    volumeBar.value = 0.2;
    volumeBar.max = 0.2;

    volumeBar.addEventListener("input", function () {
        audio.volume = volumeBar.value;
    });

    /* ============================= */
    /*        AUTO NEXT END          */
    /* ============================= */

    audio.addEventListener("ended", function () {
        currentIndex++;
        if (currentIndex >= playlist.length) currentIndex = 0;

        loadTrack(currentIndex, true);
    });

    /* INIT */
    loadTrack(currentIndex);

});

/* ============================= */
/*       SCROLL REVEAL           */
/* ============================= */

const observer = new IntersectionObserver((entries)=>{

  entries.forEach(entry=>{

    if(entry.isIntersecting){

      entry.target.classList.add("show");

    }

  });

},{
  threshold:0.15
});


document.querySelectorAll(".reveal, .reveal-box").forEach(el=>{
  observer.observe(el);
});








let map;
let markers = [];
let activeIndex = null;

const locations = [
  {
    coords: [10.9143, 75.9212],
    title: "DATA SCIENTIST — LYSEIBUG",
    desc: `
    • Developed an intelligent chatbot to automate company-specific query resolution <br>
    • Leveraged organizational data to significantly reduce response time and manual effort <br>
    • Designed and deployed responsive, production-ready web applications
    `
  },
  {
    coords: [25.1340, 55.2375],
    title: "DATA ANALYST — GRAND HYPERMARKETS",
    desc: `
    • Analyzed sales data, market trends, and consumer behavior to optimize business decisions <br>
    • Conducted audits across 16 stores managing inventory worth up to 24M AED <br>
    • Built predictive forecasting models to support strategic planning and operations
    `
  },
  {
    coords: [11.2588, 75.7804],
    title: "DATA SCIENCE INTERN — TECHOLAS",
    desc: `
    • Developed and evaluated predictive models using real-world datasets <br>
    • Performed exploratory data analysis to uncover actionable insights <br>
    • Delivered data-driven recommendations to support business strategy
    `
  }
];

function initNeoMap() {

  map = L.map('neo-map', {
    zoomControl: false,
    dragging: false,
    scrollWheelZoom: false,
    doubleClickZoom: false,
    boxZoom: false,
    keyboard: false,
    attributionControl: false
  }).setView([20, 65], 4);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
    attribution: ''
  }).addTo(map);

  const items = document.querySelectorAll(".neo-item");
  const isTouch = window.matchMedia("(pointer: coarse)").matches;

  function activate(index) {

    // already active → do nothing
    if (activeIndex === index) return;

    activeIndex = index;

    const { coords, title, desc } = locations[index];

    map.flyTo(coords, 10, { duration: 1.2 });

    // reset dots
    markers.forEach(m => m.getElement().classList.remove("active"));

    // activate dot
    markers[index].getElement().classList.add("active");

    // update left
    items.forEach(i => i.classList.remove("active"));
    items[index].classList.add("active");

    // update text
    document.getElementById("neo-title").textContent = title;
    document.getElementById("neo-desc").innerHTML = desc;
  }

  // CREATE DOTS
  locations.forEach(loc => {
    const marker = L.marker(loc.coords, {
      icon: L.divIcon({
        className: "neo-dot",
        iconSize: [14, 14],
        iconAnchor: [7, 7]
      })
    }).addTo(map);

    markers.push(marker);
  });

  // EVENTS
  items.forEach((item, index) => {

    // 🖥️ hover
    item.addEventListener("mouseenter", () => {
      if (!isTouch) activate(index);
    });

    // 📱 tap → ALWAYS SWITCH
    item.addEventListener("click", () => {
      activate(index);
    });

  });

  // RESET only for desktop
  document.querySelector(".neo-left").addEventListener("mouseleave", () => {
    if (isTouch) return;

    activeIndex = null;

    map.flyTo([20, 65], 4, { duration: 1.2 });

    markers.forEach(m => m.getElement().classList.remove("active"));
    items.forEach(i => i.classList.remove("active"));

    document.getElementById("neo-title").textContent = "HOVER A LOCATION";
    document.getElementById("neo-desc").textContent = "Details will appear here.";
  });

}

window.addEventListener("load", initNeoMap);