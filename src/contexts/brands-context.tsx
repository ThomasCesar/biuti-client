import { createContext } from "react";
import type { Brand } from "@/lib/brands";

export type BrandsDispatcherProps = {
  action: 'LOAD',
  brands: Brand[]
} | {
  action: 'DELETE',
  id: Brand['id']
}

type BrandsContextProps = {
  loaded: boolean,
  brands: Brand[],
  dispatch: React.ActionDispatch<[payload: BrandsDispatcherProps]>
}

export const BrandsContext = createContext<BrandsContextProps | null>(null)