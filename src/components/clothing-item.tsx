import EmptyState from "./empty-state";
import type { Item, ItemType } from "@/lib/items";
import { Skeleton } from "./ui/skeleton";
import { useSheet } from "@/hooks/use-sheet";
import ItemDetailsSheet from "@/dialogs/item-sheet";
import { useState } from "react";
import { Badge } from "./ui/badge";
import useItems from "@/hooks/use-items";
import useItemsSelect from "@/hooks/use-items-select";
import { CheckCircle2 } from "lucide-react";
/**
 * -------------------------------------------------
 * Single item component
 */
function ClothingItem({ item, selected, action }: { item: Item, selected?: boolean, action: (item: Item) => void }) {
  return (
    <div
      className="overflow-clip flex flex-col justify-between relative"
      onClick={() => action(item)}
    >
      {selected && <CheckCircle2 className="absolute top-1 right-1 fill-primary stroke-primary-foreground " />}
      <img
        src={item.image.length ? item.image : undefined}
        alt={item.name}
        className={selected ? "w-full h-32 object-cover rounded-sm" : "w-full h-32 object-cover rounded-sm"}
      />
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
export default function ClothingItemsGrid({ items }: { items: Item[] }) {

  const sheet = useSheet();
  const itemsSelect = useItemsSelect();

  if (!items.length) {
    return <EmptyState title="No item" message="You have no item in your wardrobe. Add some." />
  }
  return (
    <>
      <p className="">{items.length} clothing item(s)</p>
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
  const itemsSelect = useItemsSelect();
  const [fitlerItemType, setFilterItemType] = useState<ItemType | null>(null)
  const allItemsTypes = Array.from(new Set(items.items.map(i => i.type)));

  return (
    <>
      <div className="flex justify-between">
        <p>Select som clothes :</p>
        {itemsSelect && <p className="text-muted-foreground">{itemsSelect.selectedIds.length} selected</p>}
      </div>
      <div className="flex gap-2 items-center flex-nowrap w-full overflow-auto scrollbar-none">
        <Badge className="uppercase p-4" key={null} variant={!fitlerItemType ? 'default' : 'outline'} onClick={() => setFilterItemType(null)}>All</Badge>
        {allItemsTypes.map(type => <Badge className="uppercase p-4" key={type} variant={fitlerItemType === type ? 'default' : 'outline'} onClick={() => setFilterItemType(type)}>{type}</Badge>)}
      </div>

      <ClothingItemsGrid items={items.items.filter(i => !fitlerItemType || fitlerItemType == i.type)} />
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