// Scrollable coloring animation for animequote section (reference style, improved for normal scroll)
document.addEventListener('DOMContentLoaded', function () {

    // --- GSAP/ScrollTrigger Implementation (CodePen style, no scroll lock) ---
    const text = `We are a passionate team in Calicut helping businesses grow through creative,result-driven digital marketing and storytelling!`;
    const sentenceEl = document.getElementById("scroll-anim-sentence");
    if (!sentenceEl) return;
    // Wrap each character in span
    text.split("").forEach(char => {
      const span = document.createElement("span");
      span.textContent = char;
      span.classList.add("letter");
      if (char === " ") span.classList.add("space");
      sentenceEl.appendChild(span);
    });
    const letters = sentenceEl.querySelectorAll(".letter");

    gsap.registerPlugin(ScrollTrigger);
    gsap.set(letters, { color: '#aaa' }); // initial color

    gsap.to(letters, {
      color: '#00b894',
      stagger: {
        each: 0.01,
        ease: "none"
      },
      scrollTrigger: {
        trigger: ".animequote",
        start: "top center",
        end: "bottom center",
        scrub: true,
        onLeave: () => {
          gsap.set(letters, { color: '#aaa' });
        },
        onEnterBack: () => {
          // nothing needed, animation will sync with scroll
        }
      }
    });
});
// Hamburger menu functionality for mobile and video carousel
document.addEventListener('DOMContentLoaded', function () {
    // Hamburger menu
    const hamburger = document.getElementById('hamburger');
    const nav = document.getElementById('mainNav');
    if (hamburger && nav) {
        hamburger.addEventListener('click', function () {
            nav.classList.toggle('show');
        });
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                nav.classList.remove('show');
            });
        });
    }

    // Video carousel
    const videos = [
        "src/videos/video1.mp4",
        "src/videos/video2.mp4",
        "src/videos/video3.mp4",
        "src/videos/video4.mp4"
    ];
    let current = 0;
    const videoElement = document.getElementById('heroVideo');
    const nextBtn = document.getElementById('nextVideoBtn');

    if (!videoElement) {
        console.error('Video element not found');
        return;
    }

    // Remove all <source> children to avoid browser confusion
    while (videoElement.firstChild) {
        videoElement.removeChild(videoElement.firstChild);
    }

    function showVideo(idx) {
        current = idx % videos.length;
        if (current < 0) current = videos.length - 1;
        videoElement.src = videos[current];
        videoElement.load();
        // Handle play() promise to avoid unhandled rejection
        const playPromise = videoElement.play();
        if (playPromise !== undefined) {
            playPromise.catch((err) => {
                // Optionally log or ignore the error
                // console.warn('Video play interrupted:', err);
            });
        }
    }

    showVideo(current);

    setInterval(() => {
        showVideo(current + 1);
    }, 20000);

    if (nextBtn) {
        nextBtn.addEventListener('click', function () {
            showVideo(current + 1);
        });
    } else {
        console.warn('Next video button not found');
    }
});

 const text = `At Wydex Media, we are a passionate team of digital marketing professionals based in Calicut, committed to helping businesses grow online. As the best digital marketing agency in Calicut, Kerala we believe that every brand has a unique story — and our mission is to bring that story to life through creative and result-driven marketing strategies.`;
    const sentenceEl = document.getElementById("sentence");

    // Wrap each character in span
    text.split("").forEach(char => {
      const span = document.createElement("span");
      span.textContent = char;
      span.classList.add("letter");
      if (char === " ") span.classList.add("space");
      sentenceEl.appendChild(span);
    });

    const letters = document.querySelectorAll(".letter");
    let coloredCount = 0;
    let scrollUnlocked = false;

    function updateLetters() {
      letters.forEach((letter, i) => {
        if (i < coloredCount) {
          letter.classList.add("active");
        } else {
          letter.classList.remove("active");
        }
      });
    }

    function handleManualScroll(e) {
      e.preventDefault();
      const delta = e.deltaY || -e.wheelDelta || e.detail;

      if (delta > 0 && coloredCount < letters.length) {
        coloredCount++;
        updateLetters();
      } else if (delta < 0 && coloredCount > 0) {
        coloredCount--;
        updateLetters();
      }

      // Unlock scroll after full color
      if (coloredCount >= letters.length && !scrollUnlocked) {
        document.body.style.overflow = "auto";
        scrollUnlocked = true;
      }

      // Re-lock scroll if user scrolls back up
      if (scrollUnlocked && coloredCount < letters.length) {
        document.body.style.overflow = "hidden";
        scrollUnlocked = false;
      }
    }

    function addScrollListeners() {
      window.addEventListener("wheel", handleManualScroll, { passive: false });
      window.addEventListener("touchmove", handleManualScroll, { passive: false });
    }

    addScrollListeners();

