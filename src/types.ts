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
  id: number;
  common_name: string;
  slug: string;
  scientific_name: string;
  year: number;
  bibliography: string;
  author: string;
  status: string;
  rank: string;
  family_common_name: string | null;
  genus_id: number;
  image_url: string;
  synonyms: string[];
  genus: string;
  family: string;
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
} 

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
  _id : string ;
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

export interface Review {
  _id: string;
  review: string;
  user: { name: string };
}