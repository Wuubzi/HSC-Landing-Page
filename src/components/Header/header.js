const burguer = document.querySelector(".header-hamburguer-container");
const close = document.querySelector(".header-close-container");
const nav = document.querySelector(".header-nav");

burguer.addEventListener("click", () => {
 nav.classList.toggle("active");
});

close.addEventListener("click", () => {
 nav.classList.remove("active");
});

