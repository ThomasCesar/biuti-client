import { wait } from "./utils";
import type { Item } from "./items";
import { apiDELETERequest, apiGETRequest, apiPATCHRequest, apiPOSTRequest, buildFormData } from "./api";
import type { User } from "./users";

/**
 * Types and stuff
 */
export const allOutfitCategories = ['Casual', 'Business', 'BusinessCasual', 'Sports', 'Other'] as const;
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

export type OutfitForCreate = Omit<Outfit, "id" | "image" | "items" | "userId" | "user" | "createdAt"> & { itemsIds: Item["id"][] } & { image: File }
export type OutfitForUpdate = Partial<OutfitForCreate>

/**
 * Get all outfits
 */
export async function getOutfits() {
  await wait();
  return await apiGETRequest<Outfit[]>(`outfits`)
}
/**
 * Create a new outfit
 */
export async function createOutfit(newOutfit: OutfitForCreate) {
  await wait();
  return await apiPOSTRequest<Outfit>('outfits', buildFormData(newOutfit));
}
/**
 * Partial update of an outfit
 */
export async function updateOutfit(outfitId: Outfit['id'], partialOutfit: OutfitForUpdate) {
  await wait();
  return await apiPATCHRequest<Outfit>(`outfits/${outfitId}`, buildFormData(partialOutfit))
}
/**
 * Delete an outfit
 */
export async function deleteOutfit(outfitId: Outfit["id"]) {
  await wait();
  return await apiDELETERequest(`outfits/${outfitId}`);
}
