export interface Project {
  client: string;
  title: string;
  description: string;
  location: string;
  duration: string;
  type: string;
  personnel: string;
  images: { src: string; alt: string }[];
}

export interface projectsData {
  [key: string]: Project; 
}