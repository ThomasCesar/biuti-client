import { Skeleton } from "./ui/skeleton";
import ItemModal from "@/modals/item";
import { useContext } from "react";
import { ItemsContext } from "./items-provider";
import { useSheet } from "@/hooks/use-sheet";
import type { Item } from "@/lib/items";


// ----------------------------- BASE COMPONENT

function ClothingItem({ item }: { item: Item }) {

  const sheet = useSheet();

  return (
    <div className="overflow-clip flex flex-col justify-between" onClick={() => sheet.openSheet(<ItemModal item={item} />)}>
      <img src={item.image.length ? item.image : undefined} alt={item.name} className="w-full h-32 object-cover" />
      <div className="flex flex-col py-2 space-y-1 flex-1">
        <p>{item.name}</p>
        <p className="text-sm text-muted-foreground">{item.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <span></span>
          <span className="text-xs text-muted-foreground uppercase">{item?.brand?.name || ''}</span>
        </div>
      </div>
    </div>
  );
}

// ----------------------------- GRID COMPONENT

export default function ClothingItemsGrid({ items }: { items: Item[] }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {items.map(item => <ClothingItem key={item.id} item={item} />)}
    </div>
  )
}

// ----------------------------- GRID COMPONENT SKELETON

function ClothingItemGridSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {Array.from(Array(10).keys()).map(i => <Skeleton key={i} className="h-40" />)}
    </div>
  )
}

// ----------------------------- CONTEXT + LOADING + GRID

export function ClothingItemsList() {
  const context = useContext(ItemsContext);
  if (!context || !context.loaded) return <ClothingItemGridSkeleton />
  return <ClothingItemsGrid items={context.items} />
}
