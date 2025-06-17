import Swiper from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

document.addEventListener("DOMContentLoaded", () => {
  const swiperContainer = document.querySelector(".SwiperProject");

  if (swiperContainer) {
    if (swiperContainer.swiper) {
      swiperContainer.swiper.destroy(true, true);
    }

    const swiper = new Swiper(".SwiperProject", {
      modules: [Navigation, Pagination, Autoplay],
      // Default for mobile (viewport width < 1024px)
      slidesPerView: 1,
      spaceBetween: 20,
      centeredSlides: true,
      loop: true,
      allowTouchMove: false,

      autoplay: {
        delay: 3000,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      },

      navigation: {
        nextEl: ".custom-next",
        prevEl: ".custom-prev",
      },

      pagination: {
        el: ".swiper-pagination",
        clickable: true,
        dynamicBullets: true,
      },

      // Breakpoints for responsive behavior
      breakpoints: {
        // When window width is >= 768px (for tablets, optional)
        768: {
          slidesPerView: 2,
          spaceBetween: 30,
          centeredSlides: false,
        },
        // When window width is >= 1024px (for desktops/laptops)
        1024: {
          slidesPerView: 3,
          centeredSlides: false,
          allowTouchMove: true,
        },
      },
    });

    // Store the swiper instance on the DOM element for potential later access
    swiperContainer.swiper = swiper;

    // Your existing handleResize function to manage navigation button display
    const handleResize = () => {
      // Use your custom class names for the buttons
      const nextBtn = document.querySelector(".custom-next");
      const prevBtn = document.querySelector(".custom-prev");
      const pagination = document.querySelector(".swiper-pagination"); // Ensure this is present in HTML if used

      if (window.innerWidth >= 1024) {
        if (nextBtn) nextBtn.style.display = "none";
        if (prevBtn) prevBtn.style.display = "none";
        // On desktop, you have custom-navigation buttons that you hide.
        // If you want default Swiper pagination dots to show, ensure the element exists.
        if (pagination) pagination.style.display = "block"; // Show pagination dots on desktop
      } else {
        if (nextBtn) nextBtn.style.display = "flex"; // Show buttons on mobile/tablet
        if (prevBtn) prevBtn.style.display = "flex";
        if (pagination) pagination.style.display = "none"; // Hide dots on mobile/tablet
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
    ".fade-in-up, .fade-in-left, .fade-in-right, .slide-in-up, .bounce-in, .zoom-in, .rotate-in"
  );
  animatedElements.forEach((el) => observer.observe(el));
});

// Animación continua para el shape flotante
document.addEventListener("DOMContentLoaded", () => {
  const shape = document.querySelector(".shape");
  if (shape) {
    const shapeObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("start-floating");
          shapeObserver.unobserve(entry.target);
        }
      });
    });
    shapeObserver.observe(shape);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const projectCards = document.querySelectorAll(".card-wrapper");

  projectCards.forEach((card) => {
    card.addEventListener("mouseenter", () => {
      if (card instanceof HTMLElement) {
        card.style.transform = "translateY(-10px) scale(1.02)";
      }

      const projectImage = card.querySelector("img");
      if (projectImage instanceof HTMLElement) {
        projectImage.style.transform = "scale(1.05)";
      }
    });

    card.addEventListener("mouseleave", () => {
      if (card instanceof HTMLElement) {
        card.style.transform = "translateY(0) scale(1)";
      }

      const projectImage = card.querySelector("img");
      if (projectImage instanceof HTMLElement) {
        projectImage.style.transform = "scale(1)";
      }
    });
  });
});

// Example: Button hover/click animation (if you have buttons to animate)
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".your-button-class"); // Replace with your actual button class
  buttons.forEach((button) => {
    button.addEventListener("mouseenter", () => {
      if (button instanceof HTMLElement) {
        button.style.transform = "scale(1.1)";
        button.style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.2)";
      }
    });

    button.addEventListener("mouseleave", () => {
      if (button instanceof HTMLElement) {
        button.style.transform = "scale(1)";
        button.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.1)";
      }
    });

    button.addEventListener("click", () => {
      button.classList.add("click-effect");
      setTimeout(() => {
        button.classList.remove("click-effect");
      }, 200);
    });
  });
});

// Example: Parallax effect for title (if you have a title element)
document.addEventListener("DOMContentLoaded", () => {
  const title = document.querySelector(".your-title-class"); // Replace with your actual title class
  if (title) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset;
      const section = document.querySelector("#projects");
      if (!section) return;
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;

      if (
        scrolled >= sectionTop - window.innerHeight &&
        scrolled <= sectionTop + sectionHeight
      ) {
        const parallaxValue = (scrolled - sectionTop) * 0.3;
        title.style.transform = `translateY(${parallaxValue}px)`;
      }
    });
  }
});

// Example: Swiper slide change animation (if you want to animate cards on slide change)
document.addEventListener("DOMContentLoaded", () => {
  const swiper = document.querySelector(".SwiperProject")?.swiper;
  if (swiper) {
    swiper.on("slideChange", function () {
      const activeSlides = document.querySelectorAll(
        ".swiper-slide-active .card-wrapper, .swiper-slide-next .card-wrapper, .swiper-slide-prev .card-wrapper"
      );

      activeSlides.forEach((slide, index) => {
        if (slide instanceof HTMLElement) {
          slide.style.animation = `slideInFromBottom 0.6s ease-out ${
            index * 0.1
          }s both`;
        }
      });
    });
  }
});
