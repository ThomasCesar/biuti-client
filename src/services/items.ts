import type { Item } from "@/types/items";
import { apiDELETERequest, apiGETRequest, apiPOSTRequest } from "./api";

export async function getItems(): Promise<Item[]> {
  return await apiGETRequest('items')
}

export async function createItem(newItem: Omit<Item, 'id'>): Promise<Item> {
  return await apiPOSTRequest<Item>('items', newItem);
}

export async function deleteItem(itemId: string): Promise<boolean> {
  return await apiDELETERequest(`items/${itemId}`);
}
