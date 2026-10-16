import { createContext } from "react";

type SheetContextProps = {
  openSheet: (content: React.ReactNode) => void,
  closeSheet: () => void,
}

export const SheetContext = createContext<SheetContextProps | null>(null);