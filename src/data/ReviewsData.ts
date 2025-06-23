import type { reviewsData } from "./../types/reviews";
export const getReviewsData = (
  translateLabels: ReturnType<typeof import("../i18n/util")["useTranslations"]>
): reviewsData => {
  return {
    review1: {
      image: "/assets/reviews/review-first-image.webp",
      imageAlt: translateLabels("reviews.card.first.imageAlt"),
      name: "Angeline Treny",
      occupation: "CEO Lomford",
      review: translateLabels("reviews.card.first.review"),
    },
    review2: {
      image: "/assets/reviews/reviews-card-second-image.webp",
      imageAlt: translateLabels("reviews.card.second.imageAlt"),
      name: "Daniel Castro",
      occupation: "Operations Manager",
      review: translateLabels("reviews.card.second.review"),
    },
    review3: {
      image: "/assets/reviews/reviews-card-third-image.webp",
      imageAlt: translateLabels("reviews.card.third.imageAlt"),
      name: " Ricardo Gómez",
      occupation: "Commercial Director",
      review: translateLabels("reviews.card.third.review"),
    },
  };
};
