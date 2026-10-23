import type { User } from "./users";
import type { Brand } from "./brands";
import { apiDELETERequest, apiGETRequest, apiPOSTRequest, apiPUTRequest } from "./api";
import { wait } from "./utils";

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

export async function createItem(newItem: Omit<Item, 'id' | 'createdAt'>): Promise<Item> {
  return await apiPOSTRequest<Item>('items', newItem);
}

export async function getItems(type?: string): Promise<Item[]> {
  await wait();
  return await apiGETRequest(`items${type ? `?type=${type}` : ``}`)
}

export async function updateItem(itemId: Item["id"], partialItem: Partial<Omit<Item, 'id'>>): Promise<Item> {
  return await apiPUTRequest<Item>(`items/${itemId}`, partialItem);
}

export async function deleteItem(itemId: string): Promise<boolean> {
  await wait();
  return await apiDELETERequest(`items/${itemId}`);
}
