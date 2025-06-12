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

  // Abrir modal al hacer clic en las cards
  document.querySelectorAll(".blog-card").forEach((card) => {
    card.addEventListener("click", async () => {
      const slug = card.getAttribute("data-blog-slug");
      if (slug) {
        try {
          // Cargar el contenido del blog
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
    });
  });
});
