import { wait } from "./utils";
import type { User } from "./users";
import type { Brand } from "./brands";
import { apiDELETERequest, apiGETRequest, apiPATCHRequest, apiPOSTRequest } from "./api";

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
/**
 * Export stuff
 */
export const defaultItemType: ItemType = "Shirt";
export const defaultItemMaterial: ItemMaterial = "Cotton";
export type ItemFieldsForCreate = Omit<Required<Item>, 'id' | 'image' | 'brand' | 'user' | 'createdAt'> & { image: File }
export type ItemFieldsForUpdate = Partial<ItemFieldsForCreate>;
/**
 * Creating an Item
 */
export async function createItem(newItem: ItemFieldsForCreate): Promise<Item> {
  const formData = new FormData();
  for (const [key, value] of Object.entries(newItem)) {
    formData.append(key, value);
  }
  await wait();
  return await apiPOSTRequest(`items`, formData);
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
export async function updateItem(itemId: Item["id"], partialItem: ItemFieldsForUpdate): Promise<Item> {
  const formData = new FormData();
  for (const [key, value] of Object.entries(partialItem)) {
    formData.append(key, value);
  }
  return await apiPATCHRequest<Item>(`items/${itemId}`, formData);
}
/**
 * Delete an item
 */
export async function deleteItem(itemId: string): Promise<boolean> {
  await wait();
  return await apiDELETERequest(`items/${itemId}`);
}
