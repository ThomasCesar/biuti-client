import { useContext } from "react";
import { ItemsContext } from "@/contexts/items-context";

export default function useItems() {
  const items = useContext(ItemsContext);
  if (!items) {
    throw new Error("Item context not available");
  }
  return items;
}