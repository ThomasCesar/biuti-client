import type { Item } from "@/lib/items";
import { createContext } from "react";

type ItemsSelectContextProps = {
  selectedIds: Item["id"][],
  action: (item: Item) => void
}

export const ItemsSelectContext = createContext<ItemsSelectContextProps | null>(null) 