import type { membersData } from "../types/members";
export const getMembersData = (
  translateLabels: ReturnType<typeof import("../i18n/util")["useTranslations"]>
): membersData => {
  return {
    member1: {
      image: "/assets/members/members-first-card-image.webp",
      imageAlt: translateLabels("mebers.first.card.imageAlt"),
      name: "Richard Abraham",
      occupation: translateLabels("members.first.card.ocupation"),
    },
    member2: {
      image: "/assets/members/members-second-card-image.webp",
      imageAlt: translateLabels("mebers.second.card.imageAlt"),
      name: "Lucas Andrew",
      occupation: translateLabels("members.second.card.ocupation"),
    },
    member3: {
      image: "/assets/members/members-third-card-image.webp",
      imageAlt: translateLabels("mebers.third.card.imageAlt"),
      name: "Sarah Alexon",
      occupation: translateLabels("members.third.card.ocupation"),
    },
  };
};
