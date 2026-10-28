import { wait } from "./utils";
import type { Item } from "./items";
import { apiGETRequest, apiPOSTRequest, buildFormData } from "./api";
import type { User } from "./users";

/**
 * Types and stuff
 */
export const allOutfitCategories = ['Casual', 'Business', 'Business Casual', 'Sports', 'Other'] as const;
export type OutfitCategory = typeof allOutfitCategories[number];

export type Outfit = {
  id: string;
  name: string;
  image: string,
  description: string;
  category: OutfitCategory;
  items: Item[];
  user?: User;
  userId?: string;
  createdAt: string;
}

export type OutfitForCreate = Omit<Outfit, "id" | "image" | "items" | "user" | "createdAt"> & { itemsIds: Item["id"][] } & { image: File }

/**
 * Get all outfits
 */
export async function getOutfits(): Promise<Outfit[]> {
  await wait();
  return await apiGETRequest(`outfits`)
}
/**
 * Create a new outfit
 */
export async function createOutfit(newOutfit: OutfitForCreate): Promise<Outfit> {
  await wait();
  return await apiPOSTRequest<Outfit>('outfits', buildFormData(newOutfit));
}
