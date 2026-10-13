import type { Item } from "@/types/items";
import { apiDELETERequest, apiGETRequest, apiPOSTRequest } from "./api";

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
