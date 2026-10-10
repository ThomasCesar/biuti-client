import { createContext, useContext, useState } from "react";
import { Sheet, SheetClose, SheetContent, SheetFooter } from "@/components/ui/sheet";
import { Button } from "./ui/button";
import Logo from "./logo";

type sheetContextProps = {
  openSheet: (content: React.ReactNode) => void,
  closeSheet: () => void,
}

export const sheetContext = createContext<sheetContextProps | null>(null);


type SheetProviderProps = {
  children: React.ReactNode
}

export function SheetProvider({ children }: SheetProviderProps) {

  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  const [sheetContent, setSheetContent] = useState<React.ReactNode>(<></>);

  return (
    <sheetContext.Provider value={{
      openSheet: (content) => {
        setSheetContent(content);
        setSheetIsOpen(true);
      },
      closeSheet: () => setSheetIsOpen(false)
    }}>
      {children}
      <Sheet
        defaultOpen={false}
        open={sheetIsOpen}
        onOpenChange={setSheetIsOpen}
      >
        <SheetContent side="bottom" className="min-h-[95vh] max-h-[95vh] rounded-t-2xl overflow-clip">
          {sheetContent}
        </SheetContent>
      </Sheet>
    </sheetContext.Provider>
  );
}

export function useSheet() {
  const sheet = useContext(sheetContext);
  if (!sheet) {
    throw new Error('Error');
  }
  return sheet;
}