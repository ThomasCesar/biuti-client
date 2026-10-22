import { ItemsSelectContext } from "@/contexts/items-select-context";
import { useContext } from "react";

export default function useItemsSelect() {
  const itemsSelect = useContext(ItemsSelectContext);
  return itemsSelect;
}