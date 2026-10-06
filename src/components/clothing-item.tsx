import type { Item } from "@/types/items";
import { Skeleton } from "./ui/skeleton";

function ClothingItem({ item, price = null }: { item: Item, price: number | null }) {
  return (
    <div className="border rounded-md overflow-clip flex flex-col justify-between bg-accent">
      <img src={item.image} alt={item.name} className="w-full h-32 object-cover" />
      <div className="flex flex-col p-2 space-y-1 flex-1">
        <p>{item.name}</p>
        <p className="text-sm text-muted-foreground">{item.description}</p>
        <div className="flex justify-between items-center mt-auto">
          <span>{price && <span className="text-xs uppercase text-primary">{price}€</span>}</span>
          <span className="text-xs text-muted-foreground uppercase">{item?.brand?.name || ''}</span>
        </div>
      </div>
    </div>
  );
}

export default function ClothingItemsGrid({ items, withPrices = false }: { items: Item[] | null, withPrices: boolean }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {
        !items ?
          Array.from(Array(10).keys()).map(i => <Skeleton key={i} className="h-40" />) :
          items.map(item => <ClothingItem key={item.id} item={item} price={withPrices ? 100 : null} />)
      }
    </div>
  )
}

