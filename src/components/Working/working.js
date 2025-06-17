const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate");
      }
    });
  },
  {
    threshold: 0.3,
  }
);

const textContainer = document.querySelector(".working-text-container");
if (textContainer) {
  observer.observe(textContainer);
}
