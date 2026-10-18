import { PlusIcon } from "lucide-react";
import Header from "@/components/header";
import { useSheet } from "@/hooks/use-sheet";
import { Button } from "@/components/ui/button";
import { outfits, type Outfit } from "@/lib/outfits";
import OutfitFormSheet from "@/dialogs/outfit-form-sheet";

function OutfitCard({ outfit }: { outfit: Outfit }) {
  return (
    <div className="min-w-35 snap-end">
      <img src={outfit.image} className="w-full h-50 object-cover  rounded-sm" />
      <div className="space-y-0 py-1">
        <p>{outfit.name}</p>
        <p className="text-muted-foreground text-sm">{outfit.category}</p>
      </div>
    </div>
  )
}

function OutfitCategoryRow({ categoryTitle, outfits }: { categoryTitle: string, outfits: Outfit[] }) {
  return (
    <div className="space-y-2">
      <p>{categoryTitle}</p>
      <div className="flex items-top gap-3 flex-nowrap overflow-auto snap-x snap-mandatory">
        {outfits.map(outfit => <OutfitCard key={outfit.id} outfit={outfit} />)}
      </div>
    </div>
  )
}


export default function OutfitsPage() {

  const sheet = useSheet();

  return (
    <div className="space-y-5 pb-8">
      <Header text="Your outfits !" />
      <OutfitCategoryRow categoryTitle="Casual" outfits={outfits.filter(o => o.category == "Casual")} />
      <OutfitCategoryRow categoryTitle="Business Casual" outfits={outfits.filter(o => o.category == "Business Casual")} />
      <OutfitCategoryRow categoryTitle="Business" outfits={outfits.filter(o => o.category == "Business")} />
      <OutfitCategoryRow categoryTitle="Other" outfits={outfits.filter(o => o.category == "Other")} />
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
  );
}