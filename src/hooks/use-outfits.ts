import { OutfitsContext } from "@/contexts/outfits-context";
import { useContext } from "react";

export function useOutfits() {
  const outfits = useContext(OutfitsContext);
  if (!outfits) {
    throw new Error("Outfits not available");
  }
  return outfits;
}