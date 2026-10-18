import type { Item } from "./items";

const allOutfitCategories = ['Casual', 'Business', 'Business Casual', 'Sports', 'Other'] as const;
export type OutfitCategory = typeof allOutfitCategories[number];

export type Outfit = {
  id: string;
  name: string;
  image: string,
  description: string;
  category: OutfitCategory;
  items: Item[]
}

export const outfits: Outfit[] = [
  {
    id: "a",
    name: "Monday morning",
    image: "outfit-1.jpg",
    description: "",
    category: "Business Casual",
    items: []
  },
  {
    id: "b",
    name: "Date night",
    image: "outfit-2.jpg",
    description: "",
    category: "Business Casual",
    items: []
  },
  {
    id: "c",
    name: "Date night",
    image: "outfit-3.jpg",
    description: "",
    category: "Business Casual",
    items: []
  },
  {
    id: "d",
    name: "Date night",
    image: "outfit-4.jpg",
    description: "",
    category: "Casual",
    items: []
  },
  {
    id: "e",
    name: "Date night",
    image: "outfit-5.jpg",
    description: "",
    category: "Casual",
    items: []
  },
  {
    id: "f",
    name: "Date night",
    image: "outfit-6.jpg",
    description: "",
    category: "Casual",
    items: []
  },
  {
    id: "g",
    name: "Date night",
    image: "outfit-7.jpg",
    description: "",
    category: "Business",
    items: []
  },
  {
    id: "h",
    name: "Date night",
    image: "outfit-8.jpg",
    description: "",
    category: "Business",
    items: []
  },
  {
    id: "i",
    name: "Date night",
    image: "outfit-9.jpg",
    description: "",
    category: "Business",
    items: []
  },
  {
    id: "j",
    name: "Date night",
    image: "outfit-10.jpg",
    description: "",
    category: "Other",
    items: []
  },
  {
    id: "k",
    name: "Date night",
    image: "outfit-11.jpg",
    description: "",
    category: "Other",
    items: []
  },
];