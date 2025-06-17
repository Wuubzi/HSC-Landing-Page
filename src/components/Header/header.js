document.addEventListener("DOMContentLoaded", function () {
  // --- Mobile Navigation Elements ---
  const burguer = document.querySelector(".header-hamburguer-container");
  const close = document.querySelector(".header-close-container");
  const nav = document.querySelector(".header-nav");
  const navItems = document.querySelectorAll(".header-nav a"); // Select only 'a' tags for navigation links

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
  // --- Mobile Navigation Event Listeners ---
  burguer?.addEventListener("click", () => {
    nav?.classList.toggle("active");
    document.body.classList.toggle("no-scroll"); // Prevent body scroll when mobile nav is open
  });

  close?.addEventListener("click", () => {
    nav?.classList.remove("active");
    document.body.classList.remove("no-scroll"); // Restore body scroll
  });

  // Close mobile nav when a link is clicked
  navItems.forEach((item) => {
    item.addEventListener("click", () => {
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
});
