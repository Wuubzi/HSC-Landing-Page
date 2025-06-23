import type { projectsData } from "../types/project";

export const getProjectsData = (
  translateLabels: ReturnType<typeof import("../i18n/util")["useTranslations"]>
): projectsData => {
  return {
    project1: {
      client: "Ternium Colombia SAS",
      title: translateLabels("project1-title"),
      description: translateLabels("project1-description"),
      location: "Barranquilla, Atlántico",
      duration: "8" + translateLabels("project1-duration"),
      type: translateLabels("project1-type"),
      personnel: "45" + translateLabels("project1-personnel"),
      images: [
        {
          src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
          alt: translateLabels("project1-image1-alt"),
        },
        {
          src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
          alt: translateLabels("project1-image2-alt"),
        },
        {
          src: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600&h=400&fit=crop",
          alt: translateLabels("project1-image3-alt"),
        },
        {
          src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop",
          alt: translateLabels("project1-image4-alt"),
        },
        {
          src: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop",
          alt: translateLabels("project1-image5-alt"),
        },
        {
          src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
          alt: translateLabels("project1-image6-alt"),
        },
        {
          src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop",
          alt: translateLabels("project1-image7-alt"),
        },
      ],
    },
    project2: {
      client: "Ternium Colombia SAS",
      title: translateLabels("project2-title"),
      description: translateLabels("project2-description"),
      location: "Manizales, Caldas",
      duration: "4" + translateLabels("project2-duration"),
      type: translateLabels("project2-type"),
      personnel: "25" + translateLabels("project2-personnel"),
      images: [
        {
          src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
          alt: translateLabels("project2-image1-alt"),
        },
        {
          src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
          alt: translateLabels("project2-image2-alt"),
        },
        {
          src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
          alt: translateLabels("project2-image3-alt"),
        },
        {
          src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop",
          alt: translateLabels("project2-image4-alt"),
        },
      ],
    },
    project3: {
      client: "Ternium del Atlántico SAS",
      title: translateLabels("project3-title"),
      description: translateLabels("project3-description"),
      location: "Barranquilla, Atlántico",
      duration: "6" + translateLabels("project3-duration"),
      type: translateLabels("project3-type"),
      personnel: "35" + translateLabels("project3-personnel"),
      images: [
        {
          src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop",
          alt: translateLabels("project3-image1-alt"),
        },
        {
          src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
          alt: translateLabels("project3-image2-alt"),
        },
        {
          src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
          alt: translateLabels("project3-image3-alt"),
        },
        {
          src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
          alt: translateLabels("project3-image4-alt"),
        },
        {
          src: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop",
          alt: translateLabels("project3-image5-alt"),
        },
      ],
    },
    project4: {
      client: "Tenaris Tubocaribe Ltda",
      title: translateLabels("project4-title"),
      description: translateLabels("project4-description"),
      location: "Cartagena, Bolívar",
      duration: translateLabels("project4-duration"),
      type: translateLabels("project4-type"),
      personnel: "60" + translateLabels("project4-personnel"),
      images: [
        {
          src: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600&h=400&fit=crop",
          alt: translateLabels("project4-image1-alt"),
        },
        {
          src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
          alt: translateLabels("project4-image2-alt"),
        },
        {
          src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
          alt: translateLabels("project4-image3-alt"),
        },
      ],
    },
    project5: {
      client: "Baterías Willard SA",
      title: translateLabels("project5-title"),
      description: translateLabels("project5-description"),
      location: "Bogotá, Cundinamarca",
      duration: "5" + translateLabels("project5-duration"),
      type: translateLabels("project5-type"),
      personnel: "30" + translateLabels("project5-personnel"),
      images: [
        {
          src: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop",
          alt: translateLabels("project5-image1-alt"),
        },
        {
          src: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop",
          alt: translateLabels("project5-image2-alt"),
        },
        {
          src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
          alt: translateLabels("project5-image3-alt"),
        },
        {
          src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop",
          alt: translateLabels("project5-image4-alt"),
        },
        {
          src: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600&h=400&fit=crop",
          alt: translateLabels("project5-image5-alt"),
        },
        {
          src: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop",
          alt: translateLabels("project5-image6-alt"),
        },
      ],
    },
    project6: {
      client: "Colegio Alemán Deutsche Schule",
      title: translateLabels("project6-title"),
      description: translateLabels("project6-description"),
      location: "Barranquilla, Atlántico",
      duration: "3" + translateLabels("project6-duration"),
      type: translateLabels("project6-type"),
      personnel: "20" + translateLabels("project6-personnel"),
      images: [
        {
          src: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=600&h=400&fit=crop",
          alt: translateLabels("project6-image1-alt"),
        },
        {
          src: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop",
          alt: translateLabels("project6-image2-alt"),
        },
        {
          src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=400&fit=crop",
          alt: translateLabels("project6-image3-alt"),
        },
        {
          src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=600&h=400&fit=crop",
          alt: translateLabels("project6-image4-alt"),
        },
      ],
    },
  };
};
