import { SheetContext } from "@/contexts/sheet-context";
import { useContext } from "react";

export function useSheet() {
  const sheet = useContext(SheetContext);
  if (!sheet) {
    throw new Error('Error');
  }
  return sheet;
}