import type { Item } from "@/lib/items";
import { createContext } from "react";

export type ItemsReducerProps = {
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
  dispatch: React.ActionDispatch<[payload: ItemsReducerProps]>
}

export const ItemsContext = createContext<ItemsContextProps | null>(null);