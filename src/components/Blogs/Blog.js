import Swiper from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

document.addEventListener("DOMContentLoaded", function () {
  const modal = document.getElementById("blog-modal");
  const closeBtn = document.getElementById("close-modal");
  const modalBody = document.getElementById("modal-body");

  closeBtn?.addEventListener("click", () => {
    modal?.classList.remove("active");
  });

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

  document.addEventListener("click", async (e) => {
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
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.type === "childList" && mutation.addedNodes.length > 0) {
          const slides = swiperContainer.querySelectorAll(".swiper-slide");
          if (slides.length > 0) {
            console.log("Slides detectados:", slides.length);
            initializeSwiper();
            observer.disconnect();
          }
        }
      });
    });

    const swiperWrapper = swiperContainer.querySelector(".swiper-wrapper");
    if (swiperWrapper) {
      observer.observe(swiperWrapper, { childList: true, subtree: true });
    }

    setTimeout(() => {
      const slides = swiperContainer.querySelectorAll(".swiper-slide");
      if (slides.length > 0) {
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

let blogAnimated = false;

function initBlogAnimation() {
  if (blogAnimated) return;

  const elements = document.querySelectorAll("#blogs .animate-scroll");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !blogAnimated) {
          entry.target.classList.add("visible");
        }
      });

      const allVisible = Array.from(elements).every((el) =>
        el.classList.contains("visible")
      );
      if (allVisible) {
        blogAnimated = true;
        observer.disconnect();
      }
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -40px 0px",
    }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initBlogAnimation);
} else {
  initBlogAnimation();
}
