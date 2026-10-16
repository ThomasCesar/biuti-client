import { getItems, type Item } from "@/lib/items";
import { createContext, useEffect, useReducer, useState } from "react";


type ItemsReducerProps = {
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

// ----------------------------- CREATING GLOBAL CONTEXT

export const ItemsContext = createContext<ItemsContextProps | null>(null);

// ----------------------------- REDUCER FUNCTION

function itemsReducer(items: Item[], payload: ItemsReducerProps) {
  switch (payload.action) {
    case 'LOAD':
      return payload.items;
    case 'ADD':
      return [...items, ...payload.items];
    case "UPDATE":
      const itemToUpdateIndex = items.findIndex(item => item.id == payload.id);
      items[itemToUpdateIndex] = { ...items[itemToUpdateIndex], ...payload.item };
      return items;
    case "DELETE":
      return items.filter(item => item.id !== payload.id);
  }
}

// ----------------------------- PROVIDER OF EVERYTHING

export function ItemsProvider({ children }: { children: React.ReactNode }) {

  const [items, dispatchItems] = useReducer(itemsReducer, []);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const getAllItems = async () => {
      const items = await getItems();
      items.sort((i1, i2) => new Date(i2.createdAt).getTime() - new Date(i1.createdAt).getTime());
      dispatchItems({ action: "LOAD", items: items });
      setIsLoaded(true);
    }
    getAllItems();
    return () => { }
  }, [])

  return (
    <ItemsContext.Provider value={{ loaded: isLoaded, items: items, dispatch: dispatchItems }}>
      {children}
    </ItemsContext.Provider>
  )
}


