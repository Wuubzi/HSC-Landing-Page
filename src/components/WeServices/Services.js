import Swiper from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

document.addEventListener("DOMContentLoaded", () => {
  const swiperContainer = document.querySelector(".mySwiper");

  if (swiperContainer) {
    const swiper = new Swiper(".mySwiper", {
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
