import { wait } from "./utils";
import type { Item } from "./items";
import { apiGETRequest, apiPOSTRequest } from "./api";

export const allOutfitCategories = ['Casual', 'Business', 'Business Casual', 'Sports', 'Other'] as const;
export type OutfitCategory = typeof allOutfitCategories[number];

export type Outfit = {
  id: string;
  name: string;
  image: string,
  description: string;
  category: OutfitCategory;
  items: Item[];
  createdAt: string;
}

export async function createOutfit(newOutfit: Omit<Outfit, 'id' | 'createdAt'>): Promise<Outfit> {
  return await apiPOSTRequest<Outfit>('outfits', newOutfit);
}

export async function getOutfits(): Promise<Outfit[]> {
  await wait();
  return await apiGETRequest(`outfits`)
}