import { useState } from "react";
import { PlusIcon } from "lucide-react";
import Header from "@/components/header";
import useItems from "@/hooks/use-items";
import type { ItemType } from "@/lib/items";
import { useSheet } from "@/hooks/use-sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ItemNewSheet from "@/dialogs/item-new-sheet";
import ClothingItemsGrid, { ClothingItemGridSkeleton } from "@/components/clothing-item";

export default function WardrobePage() {

  const [fitlerItemType, setFilterItemType] = useState<ItemType | null>(null)
  const sheet = useSheet();
  const items = useItems();
  const allItemsTypes = Array.from(new Set(items.items.map(i => i.type)));

  return (
    <div className="space-y-5 pb-8">
      <Header text="Wardrobe" />
      {
        !items.loaded ?
          <ClothingItemGridSkeleton /> :
          <>
            <div className="flex gap-2 items-center flex-nowrap w-full overflow-auto scrollbar-none">
              <Badge className="uppercase p-4" key={null} variant={!fitlerItemType ? 'default' : 'outline'} onClick={() => setFilterItemType(null)}>All</Badge>
              {allItemsTypes.map(type => <Badge className="uppercase p-4" key={type} variant={fitlerItemType === type ? 'default' : 'outline'} onClick={() => setFilterItemType(type)}>{type}</Badge>)}
            </div>
            <ClothingItemsGrid items={items.items.filter(i => !fitlerItemType || fitlerItemType == i.type)} title={true} />
          </>
      }
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