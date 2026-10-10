import { Link } from "react-router";
import { PlusIcon } from "lucide-react";
import Header from "@/components/header";
import { useEffect, useState } from "react";
import { getItems } from "@/services/items";
import { Badge } from "@/components/ui/badge";
import AppLayout from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import type { Item, ItemType } from "@/types/items";
import ClothingItemsGrid from "@/components/clothing-item";


export default function WardrobePage() {

  const [items, setItems] = useState<Item[] | null>(null);
  const [itemsTypes, setItemsTypes] = useState<ItemType[] | null>(null);

  useEffect(() => {
    const getAllItems = async () => {

      const items = await getItems();

      const allItemsTypes = Array.from(new Set(items.map(i => i.type)));
      setItemsTypes(allItemsTypes);

      items.sort((i1, i2) => new Date(i2.createdAt).getTime() - new Date(i1.createdAt).getTime())
      setItems(items);

    }
    getAllItems();
    return () => { }
  }, [])

  return (
    <AppLayout>
      <div className="space-y-5 pb-8">
        <Header text="Wardrobe" />
        <div className="flex gap-2 items-center flex-nowrap w-full overflow-x-scroll scrollbar-none">
          {itemsTypes && itemsTypes.map(t => <Badge className="uppercase" key={t}>{t}</Badge>)}
        </div>
        <ClothingItemsGrid items={items} />
        <Link to="add">
          <Button variant={"default"} size={"lg"} className="fixed bottom-25 right-5 uppercase">
            Add
            <PlusIcon />
          </Button>
        </Link>
      </div>
    </AppLayout>
  );
}