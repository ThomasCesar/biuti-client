import { wait } from "./utils";
import type { Item } from "./items";
import { apiGETRequest, apiPOSTRequest } from "./api";
import type { User } from "./users";

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

export type NewOutfit = Omit<Outfit, "id" | "items" | "createdAt"> & { itemsIds: Item["id"][] }

export async function createOutfit(newOutfit: NewOutfit): Promise<Outfit> {
  return await apiPOSTRequest<Outfit>('outfits', newOutfit);
}

export async function getOutfits(): Promise<Outfit[]> {
  await wait();
  return await apiGETRequest(`outfits`)
}