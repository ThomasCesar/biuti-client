import { useState } from "react";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { SheetContext } from "./sheet-context";

type SheetProviderProps = {
  children: React.ReactNode
}

export function SheetProvider({ children }: SheetProviderProps) {

  const [sheetIsOpen, setSheetIsOpen] = useState(false);
  const [sheetContent, setSheetContent] = useState<React.ReactNode>(<></>);

  return (
    <SheetContext.Provider value={{
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
        <SheetContent side="right" className="min-w-full sm:min-w-auto">
          {sheetContent}
        </SheetContent>
      </Sheet>
    </SheetContext.Provider>
  );
}