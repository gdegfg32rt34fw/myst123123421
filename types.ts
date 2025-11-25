
export enum ProductCategory {
  CLASSICS = 'Classics',
  HOUSE_SPECIALS = 'House Specials',
  MOST_WANTED = 'Most Wanted',
  DRINKS = 'Drinks',
}

export interface ProductFeature {
  label: string;
  icon?: string; // Icon name reference
}

export interface MenuItem {
  id: string;
  name: string;
  category: ProductCategory;
  description: string;
  price?: string; // Optional if not provided in prompt
  image: string;
  heaviness?: number; // 1-5 scale
  features: string[];
  ingredients?: string[];
}

export interface Review {
  id: string;
  author: string;
  content: string;
  rating: number;
  role?: string; // e.g., Local Guide
}

export interface BusinessInfo {
  name: string;
  address: string;
  phone: string;
  links: {
    instagram: string;
    facebook: string;
    tiktok: string;
    maps: string;
  };
  hours: {
    [key: string]: string;
  };
}
