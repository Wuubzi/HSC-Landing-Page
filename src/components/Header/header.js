const burguer = document.querySelector(".header-hamburguer-container");
const close = document.querySelector(".header-close-container");
const nav = document.querySelector(".header-nav");
const trigger = document.querySelector(".language-trigger");
const dropdown = document.getElementById("language-dropdown");
const arrow = document.getElementById("dropdown-arrow");
let isDropdownOpen = false;

burguer.addEventListener("click", () => {
  nav.classList.toggle("active");
  document.body.classList.toggle("no-scroll");
});

close.addEventListener("click", () => {
  nav.classList.remove("active");
  document.body.classList.remove("no-scroll");
});

trigger.addEventListener("click", () => {
  isDropdownOpen = !isDropdownOpen;

  if (isDropdownOpen) {
    dropdown.classList.add("open");
    arrow.classList.add("open");
    trigger.classList.add("active");
  } else {
    dropdown.classList.remove("open");
    arrow.classList.remove("open");
    trigger.classList.remove("active");
  }
});
