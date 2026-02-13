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

    audio.volume = 0.1;
    volumeBar.value = 0.1;
    volumeBar.max = 0.1;

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

