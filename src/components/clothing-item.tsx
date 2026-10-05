import type { Item } from "@/types/items";
import { Skeleton } from "./ui/skeleton";

function ClothingItem({ item }: { item: Item }) {
  return (
    <div className="border rounded-md overflow-clip flex flex-col justify-between bg-accent">
      <img src={item.image} alt={item.name} className="w-full h-32 object-cover" />
      <div className="flex flex-col p-2 space-y-1 flex-1">
        <p>{item.name}</p>
        <p className="text-sm text-muted-foreground">{item.description}</p>
        <p className="text-right text-xs text-muted-foreground uppercase mt-auto">{item?.brand?.name || ''}</p>
      </div>
    </div>
  );
}

export default function ClothingItemsGrid({ items }: { items: Item[] | null }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {
        !items ?
          Array.from(Array(10).keys()).map(i => <Skeleton key={i} className="h-40" />) :
          items.map(item => <ClothingItem key={item.id} item={item} />)
      }
    </div>
  )
}

