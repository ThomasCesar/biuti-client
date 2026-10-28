import { wait } from "./utils";
import type { User } from "./users";
import type { Brand } from "./brands";
import { apiDELETERequest, apiGETRequest, apiPATCHRequest, apiPOSTRequest, buildFormData } from "./api";
/**
 * types and stuff
 */
export const allItemTypes = ["Accessory", "Hat", "Jacket", "Pants", "Shirt", "Shoes"] as const;
export type ItemType = typeof allItemTypes[number];

export const allItemMaterials = ["Cotton", "Leather", "Linen", "Mixed", "Synthetic", "Wool"] as const;
export type ItemMaterial = typeof allItemMaterials[number];

export type Item = {
  id: string,
  name: string,
  image: string,
  description: string,
  material: ItemMaterial,
  type: ItemType,
  user?: User,
  userId?: string,
  brand?: Brand,
  brandId?: string,
  createdAt: string
}

export const defaultItemType: ItemType = "Shirt";
export const defaultItemMaterial: ItemMaterial = "Cotton";

export type ItemForCreate = Omit<Required<Item>, 'id' | 'image' | 'brand' | 'user' | 'createdAt'> & { image: File }
export type ItemForUpdate = Partial<ItemForCreate>;

/**
 * Creating an Item
 */
export async function createItem(newItem: ItemForCreate): Promise<Item> {
  await wait();
  return await apiPOSTRequest(`items`, buildFormData(newItem));
}
/**
 * Get some/all items
 */
export async function getItems(type?: string): Promise<Item[]> {
  await wait();
  return await apiGETRequest(`items${type ? `?type=${type}` : ``}`)
}
/**
 * Partial update of an item
 */
export async function updateItem(itemId: Item["id"], partialItem: ItemForUpdate): Promise<Item> {
  return await apiPATCHRequest<Item>(`items/${itemId}`, buildFormData(partialItem));
}
/**
 * Delete an item
 */
export async function deleteItem(itemId: string): Promise<boolean> {
  await wait();
  return await apiDELETERequest(`items/${itemId}`);
}
