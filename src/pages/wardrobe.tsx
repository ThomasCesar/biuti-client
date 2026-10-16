import { PlusIcon } from "lucide-react";
import Header from "@/components/header";
import { useSheet } from "@/hooks/use-sheet";
import { Button } from "@/components/ui/button";
import { ClothingItemsList } from "@/components/clothing-item";
import ItemNewSheet from "@/dialogs/item-new-sheet";

export default function WardrobePage() {

  const sheet = useSheet();

  return (
    <div className="space-y-5 pb-8">
      <Header text="Wardrobe" />
      <div className="flex gap-2 items-center flex-nowrap w-full overflow-x-scroll scrollbar-none">
      </div>
      <ClothingItemsList />
      <Button
        variant={"default"}
        size={"lg"}
        className="absolute bottom-25 right-5 uppercase"
        onClick={() => sheet.openSheet(<ItemNewSheet />)}
      >
        Add
        <PlusIcon />
      </Button>
    </div>
  );
}