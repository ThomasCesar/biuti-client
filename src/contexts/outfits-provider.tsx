import { useEffect, useReducer, useState } from "react";
import { getOutfits, type Outfit } from "@/lib/outfits";
import { OutfitsContext, type OutfitsReducerProps } from "./outfits-context";


function outfitsReducer(outfits: Outfit[], payload: OutfitsReducerProps): Outfit[] {
  switch (payload.action) {
    case "ADD":
      return [...outfits, ...payload.outfits];
    case "LOAD":
      return payload.outfits;
    case 'UPDATE':
      const outfitToUpdateIndex = outfits.findIndex(o => o.id == payload.id);
      outfits[outfitToUpdateIndex] = { ...outfits[outfitToUpdateIndex], ...payload.outfit };
      return outfits;
    case "DELETE":
      return outfits.filter(o => o.id !== payload.id);
  }
}

export default function OutfitsProvider({ children }: { children: React.ReactNode }) {

  const [outfits, dispatch] = useReducer(outfitsReducer, []);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const loadOutfits = async () => {
      const allOutfits = await getOutfits();
      dispatch({ action: "LOAD", outfits: allOutfits });
      setLoaded(true);
    };
    loadOutfits();
  }, [])

  return (
    <OutfitsContext.Provider value={{ loaded, dispatch, outfits }}>
      {children}
    </OutfitsContext.Provider>
  )
}