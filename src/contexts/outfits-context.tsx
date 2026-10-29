import type { Outfit } from "@/lib/outfits";
import { createContext } from "react";

export type OutfitsReducerProps = {
  action: 'ADD' | 'LOAD',
  outfits: Outfit[]
} |
{
  action: 'UPDATE',
  id: Outfit['id'],
  outfit: Partial<Outfit>
} |
{
  action: 'DELETE',
  id: Outfit["id"]
}

type OutfitsContextProps = {
  loaded: boolean,
  outfits: Outfit[],
  dispatch: React.ActionDispatch<[payload: OutfitsReducerProps]>
}

export const OutfitsContext = createContext<OutfitsContextProps | null>(null);