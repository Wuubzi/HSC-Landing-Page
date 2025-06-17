import type { APIRoute } from "astro";
import { getEntry } from "astro:content";
import { marked } from "marked";
import { useTranslations } from "../../../../i18n/util";
import { languages } from "../../../../i18n/ui";

export const GET: APIRoute = async ({ params }) => {
  const { lang, slug } = params;
  if (!lang || !slug) {
    return new Response(JSON.stringify({ error: "Lang and slug required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (!(lang in languages)) {
    return new Response(JSON.stringify({ error: "Invalid Language" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  const translateLabels = useTranslations(lang as keyof typeof languages);

  try {
    const blogSlug = `${lang}/${slug}`;
    const blog = await getEntry("blogs", blogSlug);

    if (!blog) {
      return new Response(
        JSON.stringify({
          error: translateLabels("error.blogNotFound"),
        }),
        {
          status: 404,
          headers: { "Content-Type": "application/json" },
        }
      );
    }
    const htmlContent = marked(blog.body);

    const html = `
      <div class="blog-header">
        <h1>${blog.data.title}</h1>
        <div class="blog-meta-modal">
          <p><strong>${translateLabels("blog.modal.author")}</strong> ${
      blog.data.author
    }</p>
          <p><strong>${translateLabels(
            "blog.modal.date"
          )}</strong> ${blog.data.date.toLocaleDateString(
      lang === "es" ? "es-ES" : "en-US"
    )}</p>
          ${
            blog.data.tags
              ? `
            <div class="modal-tags">
              <strong>${translateLabels("blog.tags")}</strong>
              ${blog.data.tags
                .map((tag) => `<span class="modal-tag">${tag} </span>`)
                .join("")}
            </div>
          `
              : ""
          }
        </div>
      </div>
      <div class="blog-content-modal">
        ${htmlContent}
      </div>
    `;
    return new Response(JSON.stringify({ html }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({ error: translateLabels("error.loadingError") }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
};
