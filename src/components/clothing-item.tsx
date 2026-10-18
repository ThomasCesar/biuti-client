import EmptyState from "./empty-state";
import type { Item } from "@/lib/items";
import { Skeleton } from "./ui/skeleton";
import { useSheet } from "@/hooks/use-sheet";
import ItemDetailsSheet from "@/dialogs/item-sheet";
/**
 * -------------------------------------------------
 * Single item component
 */
function ClothingItem({ item }: { item: Item }) {
  const sheet = useSheet();
  return (
    <div className="overflow-clip flex flex-col justify-between" onClick={() => sheet.openSheet(<ItemDetailsSheet item={item} />)}>
      <img src={item.image.length ? item.image : undefined} alt={item.name} className="w-full h-32 object-cover rounded-sm" />
      <div className="flex flex-col py-2 gap-0 flex-1">
        <p>{item.name}</p>
        <p className="text-xs text-muted-foreground">{item?.brand?.name || ''}</p>
      </div>
    </div>
  );
}
/**
 * -----------------------------------------------
 * The full grid
 */
export default function ClothingItemsGrid({ items, title }: { items: Item[], title?: boolean }) {

  if (!items.length) {
    return <EmptyState title="No item" message="You have no item in your wardrobe. Add some." />
  }
  return (
    <>
      {title && <p className="">{items.length} clothing item(s)</p>}
      <div className="grid grid-cols-3 gap-2">
        {items.map(item => <ClothingItem key={item.id} item={item} />)}
      </div>
    </>
  )
}

export function ClothingItemGridSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {Array.from(Array(10).keys()).map(i => <Skeleton key={i} className="h-40" />)}
    </div>
  )
}