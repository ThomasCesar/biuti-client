import EmptyState from "./empty-state";
import type { Item, ItemType } from "@/lib/items";
import { Skeleton } from "./ui/skeleton";
import { useSheet } from "@/hooks/use-sheet";
import ItemDetailsSheet from "@/dialogs/item-sheet";
import { useState } from "react";
import { Badge } from "./ui/badge";
import useItems from "@/hooks/use-items";
import useItemsSelect from "@/hooks/use-items-select";
/**
 * -------------------------------------------------
 * Single item component
 */
function ClothingItem({ item, selected, action }: { item: Item, selected?: boolean, action: (item: Item) => void }) {
  return (
    <div
      className="overflow-clip flex flex-col justify-between"
      onClick={() => action(item)}
    >
      <img
        src={item.image.length ? item.image : undefined}
        alt={item.name}
        className={selected ? "w-full h-32 object-cover rounded-sm border-primary border-4" : "w-full h-32 object-cover rounded-sm"}
      />
      <div className="flex flex-col py-2 gap-0 flex-1">
        <p className={selected ? "text-primary font-bold" : ""} >{item.name}</p>
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

  const sheet = useSheet();
  const itemsSelect = useItemsSelect();

  if (!items.length) {
    return <EmptyState title="No item" message="You have no item in your wardrobe. Add some." />
  }
  return (
    <>
      {title && <p className="">{items.length} clothing item(s)</p>}
      <div className="grid grid-cols-3 gap-2">
        {
          items.map(item => (
            <ClothingItem
              selected={itemsSelect?.selectedIds.includes(item.id)}
              key={item.id}
              item={item}
              action={itemsSelect ? () => itemsSelect.action(item) : () => sheet.openSheet(<ItemDetailsSheet item={item} />)}
            />
          ))
        }
      </div>
    </>
  )
}
/**
 * -------------------------------------------------
 * The grid plus filters on top
 */
export function ClothingItemGridWithFilter() {
  const items = useItems();
  const [fitlerItemType, setFilterItemType] = useState<ItemType | null>(null)
  const allItemsTypes = Array.from(new Set(items.items.map(i => i.type)));
  return (
    <>
      <div className="flex gap-2 items-center flex-nowrap w-full overflow-auto scrollbar-none">
        <Badge className="uppercase p-4" key={null} variant={!fitlerItemType ? 'default' : 'outline'} onClick={() => setFilterItemType(null)}>All</Badge>
        {allItemsTypes.map(type => <Badge className="uppercase p-4" key={type} variant={fitlerItemType === type ? 'default' : 'outline'} onClick={() => setFilterItemType(type)}>{type}</Badge>)}
      </div>
      <ClothingItemsGrid items={items.items.filter(i => !fitlerItemType || fitlerItemType == i.type)} title={true} />
    </>
  )
}
/**
 * --------------------------------------------------
 * Just the skeleton
 */
export function ClothingItemGridSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-2">
      {Array.from(Array(10).keys()).map(i => <Skeleton key={i} className="h-40" />)}
    </div>
  )
}