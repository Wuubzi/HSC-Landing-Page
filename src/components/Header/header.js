document.addEventListener("DOMContentLoaded", function () {
  // --- Mobile Navigation Elements ---
  const burguer = document.querySelector(".header-hamburguer-container");
  const close = document.querySelector(".header-close-container");
  const nav = document.querySelector(".header-nav");
  const navItems = document.querySelectorAll(".header-nav a"); // Select only 'a' tags for navigation links

  // --- Desktop Navigation Elements ---
  const desktopNavItems = document.querySelectorAll(
    ".header-desktop-nav-item a"
  );

  // --- Desktop Language Dropdown Elements ---
  const trigger = document.querySelector(".language-trigger");
  const dropdown = document.getElementById("language-dropdown");
  const arrow = document.getElementById("dropdown-arrow");
  let isDropdownOpen = false; // State for desktop language dropdown

  // --- Contact Button Elements ---
  const desktopContactButton = document.querySelector(
    ".desktop-contact-button"
  );
  const mobileContactButton = document.querySelector(".contact-button");

  // --- Email Configuration ---
  const emailAddress = "ssspv@hotmail.com"; // Your email address
  const emailSubject = "Consulta desde el sitio web HSC"; // Optional default subject

  // --- Helper Function for Email ---
  const openEmailClient = () => {
    console.log("Abriendo cliente de email");
    const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(
      emailSubject
    )}`;
    window.open(mailtoLink);
  };

  // --- Smooth Scroll Function ---
  const smoothScrollToSection = (targetId) => {
    const targetElement = document.querySelector(targetId);

    if (targetElement) {
      // Ajustar la altura del header según el dispositivo
      const isMobile = window.innerWidth < 1024;
      const headerHeight = isMobile ? 100 : 120; // Ajusta estos valores según tu header
      const targetPosition = targetElement.offsetTop - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  // --- Handle Navigation Click with Smooth Scroll ---
  const handleNavClick = (event) => {
    const href = event.target.getAttribute("href");

    // Solo procesar si es un enlace a una sección (comienza con #)
    if (href && href.startsWith("#")) {
      event.preventDefault();
      smoothScrollToSection(href);
    }
  };

  const initActiveNavHighlight = () => {
    const allNavLinks = [...navItems, ...desktopNavItems];
    const sections = document.querySelectorAll("section[id]");

    if (sections.length === 0) return;

    const observerOptions = {
      rootMargin: "-20% 0px -80% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          allNavLinks.forEach((link) => {
            link.classList.remove("active-nav");
            const parentItem = link.closest(".header-desktop-nav-item");
            if (parentItem) {
              parentItem.classList.remove("active-nav");
            }
          });
        }
      });
    }, observerOptions);

    // Observar todas las secciones
    sections.forEach((section) => {
      observer.observe(section);
    });
  };

  // --- Mobile Navigation Event Listeners ---
  burguer?.addEventListener("click", () => {
    nav?.classList.toggle("active");
    document.body.classList.toggle("no-scroll"); // Prevent body scroll when mobile nav is open
  });

  close?.addEventListener("click", () => {
    nav?.classList.remove("active");
    document.body.classList.remove("no-scroll"); // Restore body scroll
  });

  // Close mobile nav when a link is clicked and handle smooth scroll
  navItems.forEach((item) => {
    item.addEventListener("click", (event) => {
      // Handle smooth scroll
      handleNavClick(event);

      // Close mobile navigation
      nav?.classList.remove("active");
      document.body.classList.remove("no-scroll"); // Restore body scroll

      // If desktop dropdown is open, close it when a mobile nav item is clicked
      if (isDropdownOpen) {
        dropdown?.classList.remove("open");
        arrow?.classList.remove("open");
        trigger?.classList.remove("active");
        isDropdownOpen = false;
      }
    });
  });

  // --- Desktop Navigation Event Listeners ---
  desktopNavItems.forEach((item) => {
    item.addEventListener("click", handleNavClick);
  });

  // --- Desktop Language Dropdown Event Listeners ---
  trigger?.addEventListener("click", (event) => {
    event.stopPropagation(); // Prevent document click listener from immediately closing it
    isDropdownOpen = !isDropdownOpen;

    if (isDropdownOpen) {
      dropdown?.classList.add("open");
      arrow?.classList.add("open");
      trigger?.classList.add("active");
    } else {
      dropdown?.classList.remove("open");
      arrow?.classList.remove("open");
      trigger?.classList.remove("active");
    }
  });

  // Close desktop dropdown when clicking outside
  document.addEventListener("click", (event) => {
    if (
      dropdown &&
      !dropdown.contains(event.target) &&
      trigger &&
      !trigger.contains(event.target) &&
      isDropdownOpen
    ) {
      dropdown.classList.remove("open");
      arrow?.classList.remove("open");
      trigger.classList.remove("active");
      isDropdownOpen = false;
    }
  });

  // --- Contact Button Event Listeners ---
  desktopContactButton?.addEventListener("click", openEmailClient);
  mobileContactButton?.addEventListener("click", openEmailClient);

  // --- Initialize Active Navigation Highlight ---
  initActiveNavHighlight();

  // --- Handle Window Resize ---
  window.addEventListener("resize", () => {
    // Cerrar menú móvil si se cambia a desktop
    if (window.innerWidth >= 1024 && nav?.classList.contains("active")) {
      nav.classList.remove("active");
      document.body.classList.remove("no-scroll");
    }

    // Cerrar dropdown de idiomas si se cambia a móvil
    if (window.innerWidth < 1024 && isDropdownOpen) {
      dropdown?.classList.remove("open");
      arrow?.classList.remove("open");
      trigger?.classList.remove("active");
      isDropdownOpen = false;
    }
  });
});
