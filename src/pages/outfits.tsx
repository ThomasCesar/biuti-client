import { PlusIcon } from "lucide-react";
import Header from "@/components/header";
import { useSheet } from "@/hooks/use-sheet";
import { Button } from "@/components/ui/button";
import { useOutfits } from "@/hooks/use-outfits";
import OutfitFormSheet from "@/dialogs/outfit-form-sheet";
import { OutfitsCategoryRows, OutfitsCategoryRowsSkeleton } from "@/components/outfit";

export default function OutfitsPage() {

  const sheet = useSheet();
  const outfits = useOutfits();

  return (
    <div className="space-y-8 pb-8">
      <Header text="Your outfits !" />
      {
        !outfits.loaded ?
          <OutfitsCategoryRowsSkeleton /> :
          <OutfitsCategoryRows />
      }
      <Button
        variant={"default"}
        size={"lg"}
        className="absolute bottom-25 right-5 uppercase"
        onClick={() => sheet.openSheet(<OutfitFormSheet />)}
      >
        New outfit
        <PlusIcon />
      </Button>
    </div>
  )

}