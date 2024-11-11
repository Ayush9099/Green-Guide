export interface FormData {
  generalInfo: {
    plantName: string;
    taxonomicName: string;
    description: string;
    category: string;
    icon: string | File;
    img: string | File;
  };
  quickInfo: {
    slideBarOption: string;
    plantingDepth: string;
    waterPerWeek: string;
    sunRequirement: string;
    growingSeason: string;
    frostTolerance: string;
    germinationTime: {
      duration: number;
      unit: string;
    };
    maxHeight: {
      height: number;
      unit: string;
    };
    maturityTime: {
      duration: number;
      unit: string;
    };
    soilPH: string;
    transplantingNotes: string;
    springFrost: string;
    fallFrost: string;
  };
  plantingTimes: {
    springStartIndoors: string;
    springTransplant: string;
    springSowOutdoors: string;
    fallStartIndoors: string;
    fallTransplant: string;
    fallSowOutdoors: string;
  };
  detailedInfo: {
    growingFromSeed: string;
    plantingConsiderations: string;
    feeding: string;
    harvesting: string;
    storage: string;
    pruning: string;
    herbal: string;
  };
}

export interface Post {
  _id: string;
  title: string;
  summary: string;
  image: string;
  user: { name: string; email: string };
  comments: Comment[];
  createdAt: string;
}

export interface Blogs {
  _id: string;
  title: string;
  summary: string;
  imageUrl: string;
  user : string;
}

export interface TrefleData {
  id: number; // Unique identifier for the plant
  common_name: string; // Common name of the plant
  scientific_name: string; // Scientific (taxonomic) name
  family: string; // Family to which the plant belongs
  genus: string; // Genus of the plant
  image_url: string; // URL of an image representing the plant
  description: string; // Description of the plant
  light_requirements: string; // Light requirements (e.g., full sun, partial shade)
  water_requirements: string; // Watering needs (e.g., low, moderate)
  soil_type: string; // Preferred soil type (e.g., sandy, loamy)
  growth_habit: string; // Growth habit (e.g., annual, perennial)
  height: {
    min: number; // Minimum height in cm
    max: number; // Maximum height in cm
  };
  bloom_time: string; // Blooming period (e.g., spring, summer)
}

export interface User {
  _id: string;
  name: string;
  email: string;
}

export interface Comment {
  _id: string;
  content: string;
  user: User;
  post: string;
  createdAt: string;
}

export interface Plants {
  _id: string;
  generalInfo: {
    plantName: string;
  };
} // for garden

export interface Garden {
  _id: string;
  name: string;
  plants: string[];
  last_watered: string;
  fertilized_schedule: string;
  growth_notes: string;
  growth_images: File[];
}

export interface PlantSchedule {
  startInside: number[];
  transplant: number[];
  sowOutside: number[];
  beginHarvest: number[];
}

export interface Plant {
  _id: string;
  generalInfo: {
    plantName: string;
    img: string;
  };
  plantingTimes: {
    springStartIndoors: string;
    springTransplant: string;
    springSowOutdoors: string;
    fallStartIndoors: string;
    fallTransplant: string;
    fallSowOutdoors: string;
  };
}  // for calendar