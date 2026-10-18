import type { User } from "./users";
import { apiDELETERequest, apiGETRequest, apiPOSTRequest } from "./api";

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

export type Brand = {
  id: number,
  name: string,
  description: string,
  logo?: string,
  website?: string,
  createdAt: string
}

export async function getItems(type?: string): Promise<Item[]> {
  await new Promise(resolve => setTimeout(resolve, 3000));
  return await apiGETRequest(`items${type ? `?type=${type}` : ``}`)
}

export async function createItem(newItem: Omit<Item, 'id' | 'createdAt'>): Promise<Item> {
  return await apiPOSTRequest<Item>('items', newItem);
}

export async function deleteItem(itemId: string): Promise<boolean> {
  await new Promise(resolve => setTimeout(resolve, 3000));
  return await apiDELETERequest(`items/${itemId}`);
}
