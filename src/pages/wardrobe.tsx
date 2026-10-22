import { PlusIcon } from "lucide-react";
import Header from "@/components/header";
import useItems from "@/hooks/use-items";
import { useSheet } from "@/hooks/use-sheet";
import { Button } from "@/components/ui/button";
import ItemFormSheet from "@/dialogs/item-form-sheet";
import { ClothingItemGridSkeleton, ClothingItemGridWithFilter } from "@/components/clothing-item";

export default function WardrobePage() {

  const sheet = useSheet();
  const items = useItems();

  return (
    <div className="space-y-5 pb-8">
      <Header text="Wardrobe" />
      {
        !items.loaded ?
          <ClothingItemGridSkeleton /> :
          <ClothingItemGridWithFilter />
      }
      <Button
        variant={"default"}
        size={"lg"}
        className="absolute bottom-25 right-5 uppercase"
        onClick={() => sheet.openSheet(<ItemFormSheet />)}
      >
        Add
        <PlusIcon />
      </Button>
    </div>
  );
}