let footerAnimated = false;

function initFooterAnimation() {
  if (footerAnimated) return;

  const elements = document.querySelectorAll("footer .animate-scroll");

  if (elements.length === 0) {
    console.warn(
      "No elements found for footer animation with selector 'footer .animate-scroll'. Check your HTML structure or selector."
    );
    footerAnimated = true;
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });

      const allVisible = Array.from(elements).every((el) =>
        el.classList.contains("visible")
      );
      if (allVisible) {
        footerAnimated = true;
        observer.disconnect();
      }
    },
    {
      threshold: 0.1,
      rootMargin: "0px 0px -20px 0px",
    }
  );

  elements.forEach((element) => {
    observer.observe(element);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initFooterAnimation);
} else {
  initFooterAnimation();
}

document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("blog-modal");
  const closeBtn = document.getElementById("close-modal");
  const modalBody = document.getElementById("modal-body");

  const facebookLink = document.getElementById("facebook");
  const twitterLink = document.getElementById("twitter");
  const linkedinLink = document.getElementById("linkeind");
  const instagramLink = document.getElementById("instagram");

  const disableBodyScroll = () => {
    document.body.style.overflow = "hidden";
  };

  const enableBodyScroll = () => {
    document.body.style.overflow = "";
  };

  closeBtn?.addEventListener("click", () => {
    modal?.classList.remove("active");
    enableBodyScroll();
  });

  modal?.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
      enableBodyScroll();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal?.classList.contains("active")) {
      modal.classList.remove("active");
      enableBodyScroll();
    }
  });

  document.addEventListener("click", async (e) => {
    const blogItem = e.target.closest(".blog-item");

    if (blogItem) {
      const slug = blogItem.getAttribute("data-slug");
      console.log("Blog item clicked, slug:", slug);

      if (slug) {
        try {
          const response = await fetch(`/api/blog/${slug}`);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = await response.json();

          if (modalBody) {
            modalBody.innerHTML = data.html;
          }

          modal?.classList.add("active");
          disableBodyScroll();
        } catch (error) {
          console.error("Error loading blog content:", error);
          if (modalBody) {
            modalBody.innerHTML =
              "<p>Error al cargar el contenido del blog. Por favor, inténtalo de nuevo más tarde.</p>";
          }
          modal?.classList.add("active");
          disableBodyScroll();
        }
      }
    }
  });

  const redirectTo = (url) => {
    window.open(url, "_blank", "noopener noreferrer");
    console.log(`Redirecting to: ${url}`);
  };

  if (facebookLink) {
    facebookLink.style.cursor = "pointer";
    facebookLink.addEventListener("click", () => {
      redirectTo("https://www.facebook.com/your-facebook-page");
    });
  }

  if (twitterLink) {
    twitterLink.style.cursor = "pointer";
    twitterLink.addEventListener("click", () => {
      redirectTo("https://twitter.com/your-twitter-page");
    });
  }

  if (linkedinLink) {
    linkedinLink.style.cursor = "pointer";
    linkedinLink.addEventListener("click", () => {
      redirectTo("https://www.linkedin.com/in/your-linkedin-page");
    });
  }

  if (instagramLink) {
    instagramLink.style.cursor = "pointer";
    instagramLink.addEventListener("click", () => {
      redirectTo("https://www.instagram.com/your-instagram-page");
    });
  }
});
