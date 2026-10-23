import { PlusIcon } from "lucide-react";
import Header from "@/components/header";
import { useSheet } from "@/hooks/use-sheet";
import { Button } from "@/components/ui/button";
import { getOutfits, type Outfit, type OutfitCategory } from "@/lib/outfits";
import OutfitFormSheet from "@/dialogs/outfit-form-sheet";
import { useEffect, useState } from "react";
import EmptyState from "@/components/empty-state";
import { Skeleton } from "@/components/ui/skeleton";

function OutfitCard({ outfit }: { outfit: Outfit }) {
  return (
    <div className="min-w-35 snap-end">
      <div className="relative w-full h-50 rounded-sm overflow-clip">
        <img src={outfit.image} className="w-full h-50 object-cover" />
        <div className="absolute bottom-0 w-full flex items-center justify-end gap-1 p-1">
          {outfit.items.slice(0, 2).map((i, idx) => <img src={i.image} key={idx} className="w-8 h-8 rounded-sm" />)}
          {outfit.items.length > 2 && <span className="w-8 h-8 rounded-sm bg-background text-center leading-8 text-sm text-muted-foreground">+{outfit.items.length - 2}</span>}
        </div>
      </div>
      <div className="space-y-0 py-1">
        <p className="text-sm">{outfit.name}</p>
      </div>
    </div>
  )
}

function OutfitCategoryRow({ categoryTitle, outfits }: { categoryTitle: string, outfits: Outfit[] }) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between">
        <p>{categoryTitle}</p>
        <p className="text-sm text-muted-foreground">{outfits.length} outfit(s)</p>
      </div>
      <div className="flex items-top gap-3 flex-nowrap overflow-auto snap-x snap-mandatory scrollbar-none">
        {outfits.map(outfit => <OutfitCard key={outfit.id} outfit={outfit} />)}
      </div>
    </div>
  )
}

export default function OutfitsPage() {

  const [loading, setLoading] = useState<boolean>(true);
  const [outfits, setOutfits] = useState<Outfit[]>([]);
  const [outfitCategories, setOutfitCategories] = useState<OutfitCategory[]>([]);

  const sheet = useSheet();

  useEffect(() => {
    const fetchOutfits = async () => {
      const outfits = await getOutfits();
      setOutfits(outfits);
      setOutfitCategories(Array.from(new Set(outfits.map(o => o.category))));
      setLoading(false);
    }
    fetchOutfits();
  }, [])


  return (
    <div className="space-y-8 pb-8">
      <Header text="Your outfits !" />
      {
        loading ?
          <div className="flex items-top gap-3 flex-nowrap overflow-auto snap-x snap-mandatory scrollbar-none">
            {Array.from(Array(3).keys()).map(i => <Skeleton key={i} className="h-50 w-35" />)}
          </div> :
          (
            outfits.length ?
              outfitCategories.map(cat => <OutfitCategoryRow categoryTitle={cat} outfits={outfits.filter(o => o.category == cat)} />) :
              <EmptyState title="No outfit" message="You have no outfit. create some." />
          )
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