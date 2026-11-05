import { BrandsContext } from "@/contexts/brands-context";
import { useContext } from "react";

export default function useBrands() {
  const brandsContext = useContext(BrandsContext);
  if (!brandsContext) {
    throw new Error("Brands unavailable !");
  }
  return brandsContext;
}