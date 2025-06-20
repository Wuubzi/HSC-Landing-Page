import Swiper from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

document.addEventListener("DOMContentLoaded", () => {
  const swiperContainer = document.querySelector(".SwiperService");

  if (swiperContainer) {
    const swiper = new Swiper(".SwiperService", {
      modules: [Navigation, Pagination, Autoplay],
      slidesPerView: 1,
      spaceBetween: 30,
      centeredSlides: true,
      loop: true,
      allowTouchMove: false,

      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },

      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },
    });

    const handleResize = () => {
      const nextBtn = document.querySelector(".swiper-button-next");
      const prevBtn = document.querySelector(".swiper-button-prev");
      const pagination = document.querySelector(".swiper-pagination");

      if (window.innerWidth >= 1024) {
        if (nextBtn) nextBtn.style.display = "none";
        if (prevBtn) prevBtn.style.display = "none";
        if (pagination) pagination.style.display = "block";
      } else {
        if (nextBtn) nextBtn.style.display = "flex";
        if (prevBtn) prevBtn.style.display = "flex";
        if (pagination) pagination.style.display = "none";
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
  }
});

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
    ".fade-in-up, .fade-in-left, .fade-in-right, .slide-in-up, .bounce-in, .fade-in"
  );
  animatedElements.forEach((el) => observer.observe(el));
});

document.addEventListener("DOMContentLoaded", () => {
  const blueCard = document.querySelector(".blue-card");
  if (blueCard) {
    let rotation = 0;
    const rotateBlueCard = () => {
      rotation += 0.5;
      blueCard.style.transform = `rotate(${rotation}deg)`;
      requestAnimationFrame(rotateBlueCard);
    };

    const blueCardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          rotateBlueCard();
          blueCardObserver.unobserve(entry.target);
        }
      });
    });

    blueCardObserver.observe(blueCard);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)";
    });
  });
});
