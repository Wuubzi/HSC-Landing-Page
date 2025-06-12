import Swiper from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("blog-modal");
  const closeBtn = document.getElementById("close-modal");
  const modalBody = document.getElementById("modal-body");

  // Cerrar modal
  closeBtn?.addEventListener("click", () => {
    modal?.classList.remove("active");
  });

  // Cerrar modal al hacer clic fuera
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });

  // Cerrar modal con Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal?.classList.contains("active")) {
      modal.classList.remove("active");
    }
  });

  // EVENT DELEGATION - Escuchar clicks en el documento
  // Esto funciona incluso si las cards se cargan dinámicamente
  document.addEventListener("click", async (e) => {
    // Verificar si el click fue en una blog-card o dentro de una
    const blogCard = e.target.closest(".blog-card");
    
    if (blogCard) {
      const slug = blogCard.getAttribute("data-blog-slug");
      console.log("Card clicked via delegation, slug:", slug);
      
      if (slug) {
        try {
          const response = await fetch(`/api/blog/${slug}`);
          const data = await response.json();

          if (modalBody) {
            modalBody.innerHTML = data.html;
          }

          modal?.classList.add("active");
        } catch (error) {
          console.error("Error loading blog content:", error);
        }
      }
    }
  });

  // SWIPER INITIALIZATION
  const swiperContainer = document.querySelector(".SwiperBlog");

  if (swiperContainer) {
    // Usar MutationObserver para detectar cuando se agreguen las slides
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
          // Se agregaron nodos, verificar si son slides
          const slides = swiperContainer.querySelectorAll('.swiper-slide');
          if (slides.length > 0) {
            console.log("Slides detectados:", slides.length);
            initializeSwiper();
            observer.disconnect(); // Dejar de observar una vez inicializado
          }
        }
      });
    });

    // Observar cambios en el swiper-wrapper
    const swiperWrapper = swiperContainer.querySelector('.swiper-wrapper');
    if (swiperWrapper) {
      observer.observe(swiperWrapper, { childList: true, subtree: true });
    }

    // También intentar inicializar inmediatamente por si ya están las slides
    setTimeout(() => {
      const slides = swiperContainer.querySelectorAll('.swiper-slide');
      if (slides.length > 0) {
        console.log("Slides ya presentes:", slides.length);
        initializeSwiper();
        observer.disconnect();
      }
    }, 100);
  }

  function initializeSwiper() {
    const swiper = new Swiper(".SwiperBlog", {
      modules: [Navigation, Pagination, Autoplay],
      slidesPerView: 1,
      spaceBetween: 30,
      loop: true,
      allowTouchMove: true,
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

       breakpoints: {
        1024: {
          slidesPerView: 3,
        },
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