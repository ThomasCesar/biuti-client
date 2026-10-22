import type { Item } from "./items";

export const allOutfitCategories = ['Casual', 'Business', 'Business Casual', 'Sports', 'Other'] as const;
export type OutfitCategory = typeof allOutfitCategories[number];

export type Outfit = {
  id: string;
  name: string;
  image: string,
  description: string;
  category: OutfitCategory;
  items: Item[]
}

const randomItem: Item = {
  id: "cmvdqqzwq000afotheduipahn",
  name: "Hat",
  image: "hat-1.webp",
  description: "A very nice Hat",
  material: "Synthetic",
  type: "Hat",
  userId: "cmutxu74v00008othj7vrtd1g",
  brandId: "cmutxukxo00018othbltzmnbk",
  createdAt: "2026-10-18T11:27:32.426Z"
}

export const outfits: Outfit[] = [
  {
    id: "a",
    name: "Monday morning",
    image: "outfit-1.jpg",
    description: "",
    category: "Business Casual",
    items: [randomItem, randomItem, randomItem]
  },
  {
    id: "b",
    name: "Date night",
    image: "outfit-2.jpg",
    description: "",
    category: "Business Casual",
    items: [randomItem, randomItem, randomItem]
  },
  {
    id: "c",
    name: "Date night",
    image: "outfit-3.jpg",
    description: "",
    category: "Business Casual",
    items: [randomItem, randomItem, randomItem]
  },
  {
    id: "d",
    name: "Date night",
    image: "outfit-4.jpg",
    description: "",
    category: "Casual",
    items: [randomItem, randomItem, randomItem]
  },
  {
    id: "e",
    name: "Date night",
    image: "outfit-5.jpg",
    description: "",
    category: "Casual",
    items: [randomItem, randomItem, randomItem]
  },
  {
    id: "f",
    name: "Date night",
    image: "outfit-6.jpg",
    description: "",
    category: "Casual",
    items: [randomItem, randomItem, randomItem]
  },
  {
    id: "g",
    name: "Date night",
    image: "outfit-7.jpg",
    description: "",
    category: "Business",
    items: [randomItem, randomItem, randomItem]
  },
  {
    id: "h",
    name: "Date night",
    image: "outfit-8.jpg",
    description: "",
    category: "Business",
    items: [randomItem, randomItem, randomItem]
  },
  {
    id: "i",
    name: "Date night",
    image: "outfit-9.jpg",
    description: "",
    category: "Business",
    items: [randomItem, randomItem, randomItem]
  },
  {
    id: "j",
    name: "Date night",
    image: "outfit-10.jpg",
    description: "",
    category: "Other",
    items: [randomItem, randomItem, randomItem]
  },
  {
    id: "k",
    name: "Date night",
    image: "outfit-11.jpg",
    description: "",
    category: "Other",
    items: [randomItem, randomItem, randomItem]
  },
];