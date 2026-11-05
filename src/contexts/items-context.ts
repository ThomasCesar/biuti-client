import { createContext } from "react";
import type { Item } from "@/lib/items";

export type ItemsDispatcherProps = {
  action: 'ADD' | 'LOAD',
  items: Item[]
} |
{
  action: 'DELETE',
  id: Item["id"]
} |
{
  action: 'UPDATE',
  id: Item["id"],
  item: Partial<Item>
}

type ItemsContextProps = {
  loaded: boolean,
  items: Item[],
  dispatch: React.ActionDispatch<[payload: ItemsDispatcherProps]>
}

export const ItemsContext = createContext<ItemsContextProps | null>(null);