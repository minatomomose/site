
document.addEventListener("DOMContentLoaded", () => {

    const backgroundMusic = document.getElementById("background-music");

    if (backgroundMusic) {
        function startBackgroundMusic() {
            backgroundMusic.play().catch(error => {
                if (error.name === "NotAllowedError") {
                    function startOnInteraction() {
                        document.removeEventListener("pointerdown", startOnInteraction);
                        document.removeEventListener("keydown", startOnInteraction);
                        backgroundMusic.play().catch(playError => {
                            console.error("Unable to play background music:", playError);
                        });
                    }

                    document.addEventListener("pointerdown", startOnInteraction);
                    document.addEventListener("keydown", startOnInteraction);
                    return;
                }

                console.error("Unable to play background music:", error);
            });
        }

        startBackgroundMusic();
    }

    /* =========================
       01. 開場動畫
    ========================== */

    const intro = document.getElementById("intro-screen");
    const skipButton = document.getElementById("skip-intro");

    if (intro) {
        const prefersReducedMotion =
            window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const previousOverflow = document.body.style.overflow;

        if (!prefersReducedMotion) {
            document.body.style.overflow = "hidden";
        }

        let introFinished = false;
        let introTimer;

        function finishIntro() {

            if (introFinished) return;

            introFinished = true;

            intro.classList.add("intro-hide");

            setTimeout(() => {
                intro.remove();
                document.body.style.overflow = previousOverflow;
            }, prefersReducedMotion ? 0 : 1200);
        }

        if (prefersReducedMotion) {
            finishIntro();
        } else {
            introTimer = setTimeout(() => {
                finishIntro();
            }, 5000);
        }

        if (skipButton) {
            skipButton.addEventListener("click", () => {
                clearTimeout(introTimer);
                finishIntro();
            });
        }
    }


    /* =========================
       02. 星空粒子
    ========================== */

    const starsContainer = document.querySelector(".stars");

    if (starsContainer) {

        for (let i = 0; i < 60; i++) {

            const star = document.createElement("span");

            star.style.position = "absolute";
            star.style.left = Math.random() * 100 + "%";
            star.style.top = Math.random() * 100 + "%";

            star.style.width = Math.random() * 3 + 1 + "px";
            star.style.height = star.style.width;

            star.style.background = "white";
            star.style.borderRadius = "50%";

            star.style.opacity = Math.random();

            star.style.boxShadow = "0 0 8px #8efaff";

            star.style.animation =
                `twinkle ${Math.random() * 3 + 2}s infinite alternate`;

            starsContainer.appendChild(star);
        }
    }

    const particlesContainer = document.getElementById("floating-particles");

    if (particlesContainer &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        const particleTypes = ["diamond", "shard", "orb"];

        for (let i = 0; i < 28; i++) {
            const particle = document.createElement("span");
            const type = particleTypes[i % particleTypes.length];

            particle.classList.add("crystal-particle", `crystal-particle--${type}`);
            particle.style.setProperty("--particle-left", `${Math.random() * 100}%`);
            particle.style.setProperty("--particle-top", `${Math.random() * 100}%`);
            particle.style.setProperty("--particle-size", `${Math.random() * 7 + 4}px`);
            particle.style.setProperty("--particle-duration", `${Math.random() * 14 + 12}s`);
            particle.style.setProperty("--particle-delay", `${-Math.random() * 24}s`);
            particle.style.setProperty("--particle-drift", `${Math.random() * 100 - 50}px`);

            particlesContainer.appendChild(particle);
        }
    }


    /* =========================
       03. 導覽列滾動效果
    ========================== */

    const navbar = document.querySelector("header");

    window.addEventListener("scroll", () => {

        if (!navbar) return;

        if (window.scrollY > 50) {
            navbar.style.background = "rgba(5, 9, 30, 0.95)";
        } else {
            navbar.style.background = "rgba(8, 13, 43, 0.7)";
        }
    });


    /* =========================
       04. 區塊淡入效果
    ========================== */

    const sections = document.querySelectorAll(".section");

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");

            }

        });

    }, {
        threshold: 0.15
    });

    sections.forEach(section => {
        observer.observe(section);
    });


    /* =========================
       05. FAVORITE 卡片效果
    ========================== */

    const favoriteCards =
        document.querySelectorAll(".favorite-card");

    favoriteCards.forEach(card => {

        card.addEventListener("click", () => {

            card.style.transform = "scale(1.05)";

            setTimeout(() => {
                card.style.transform = "";
            }, 300);

        });

    });


    /* =========================
       06. GALLERY 點擊效果
    ========================== */

    const galleryItems =
        document.querySelectorAll(".gallery-item");

    galleryItems.forEach(item => {

        item.addEventListener("click", () => {

            item.classList.toggle("gallery-active");

        });

    });


    /* =========================
       07. 首頁文字打字動畫
    ========================== */

    const heroSubtitle =
        document.querySelector(".hero-subtitle");

    if (heroSubtitle) {

        const originalText = "WELCOME TO MY WORLD";

        heroSubtitle.textContent = "";

        let index = 0;

        function typeText() {

            if (index < originalText.length) {

                heroSubtitle.textContent += originalText[index];

                index++;

                setTimeout(typeText, 80);

            }

        }

        setTimeout(typeText, 1500);
    }


    /* =========================
       08. LOGO 回到首頁
    ========================== */

    const logo = document.querySelector(".logo");

    if (logo) {

        logo.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =========================
       09. 頁尾自動年份
    ========================== */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }

});


/* =========================
   10. 星空閃爍動畫
========================== */

const style = document.createElement("style");

style.textContent = `
@keyframes twinkle {
    from {
        opacity: 0.2;
        transform: scale(0.7);
    }

    to {
        opacity: 1;
        transform: scale(1.3);
    }
}

.section {
    opacity: 0;
    transform: translateY(40px);
    transition: opacity 1s ease, transform 1s ease;
}

.section.show {
    opacity: 1;
    transform: translateY(0);
}

.gallery-active {
    filter: brightness(1.3);
}
`;

document.head.appendChild(style);
