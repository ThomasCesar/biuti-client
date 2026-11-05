import type React from "react";
import { BrandsContext, type BrandsDispatcherProps } from "./brands-context";
import { useEffect, useReducer, useState } from "react";
import { getBrands, type Brand } from "@/lib/brands";

function brandsReducer(brands: Brand[], payload: BrandsDispatcherProps): Brand[] {
  switch (payload.action) {
    case "LOAD":
      return payload.brands;
    case "DELETE":
      return brands.filter(b => b.id !== payload.id);
  }
}

export default function BrandsProvider({ children }: { children: React.ReactNode }) {
  const [brands, dispatch] = useReducer(brandsReducer, [])
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    const fetchBrands = async () => {
      const results = await getBrands();
      const brands = (results.success ? results.result : []);
      dispatch({ action: "LOAD", brands: brands });
      setIsLoaded(true);
    }
    fetchBrands();
  }, [])
  return (
    <BrandsContext.Provider value={{ loaded: isLoaded, brands, dispatch }} >{children}</BrandsContext.Provider>
  )
}