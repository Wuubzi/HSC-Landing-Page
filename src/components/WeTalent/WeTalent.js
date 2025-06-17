function togglePlay() {
  const video = document.querySelector("#we-talent video");
  const playOverlay = document.querySelector(".play-overlay");

  if (video.paused) {
    video.play();
    playOverlay.style.opacity = "0";
    playOverlay.style.pointerEvents = "none";
  } else {
    video.pause();
    playOverlay.style.opacity = "1";
    playOverlay.style.pointerEvents = "auto";
  }
}

const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -30px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const element = entry.target;
      const delay = element.getAttribute("data-delay") || 0;

      setTimeout(() => {
        element.classList.add("visible");
      }, parseInt(String(delay)));

      observer.unobserve(element);
    }
  });
}, observerOptions);

document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".fade-in-up, .fade-in-left, .fade-in-right, .slide-in-up, .bounce-in, .zoom-in, .rotate-in, .pulse-animation"
  );
  animatedElements.forEach((el) => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
  const talentCards = document.querySelectorAll(".wetalent-card");

  talentCards.forEach((card, index) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-15px) scale(1.03)";

      const bgImg = card.querySelector(".bg-card img");
      if (bgImg && bgImg.style) {
        bgImg.style.transform = "scale(1.1)";
      }

      const icon = card.querySelector(".content-container figure");
      if (icon && icon.style) {
        icon.style.transform = "scale(1.2) rotate(5deg)";
      }
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";

      const bgImg = card.querySelector(".bg-card img");
      if (bgImg && bgImg.style) {
        bgImg.style.transform = "scale(1)";
      }

      const icon = card.querySelector(".content-container figure");
      if (icon && icon.style) {
        icon.style.transform = "scale(1) rotate(0deg)";
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const startRippleAnimation = () => {
    const ripples = document.querySelectorAll(".ripple-effect");
    ripples.forEach((ripple, index) => {
      setTimeout(() => {
        ripple.classList.add("animate");
        setTimeout(() => {
          ripple.classList.remove("animate");
        }, 2000);
      }, index * 500);
    });
  };

  const playOverlay = document.querySelector(".play-overlay");
  if (playOverlay) {
    const rippleObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            startRippleAnimation();
            setInterval(startRippleAnimation, 3000);
          }, 1800);
          rippleObserver.unobserve(entry.target);
        }
      });
    });

    rippleObserver.observe(playOverlay);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const importantSpan = document.querySelector(".right-section h1 span");
  if (importantSpan) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add("typewriter-effect");
          }, 200);
          observer.unobserve(entry.target);
        }
      });
    });
    observer.observe(importantSpan);
  }
});
