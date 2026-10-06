import AppLayout from "@/components/app-layout";
import ClothingItemsGrid from "@/components/clothing-item";
import Header from "@/components/header";
import { getItems } from "@/services/items";
import type { Item } from "@/types/items";
import { useEffect, useState } from "react";

export default function ShoppingPage() {

  const [items, setItems] = useState<Item[] | null>(null);

  useEffect(() => {
    const getAllItems = async () => {
      const items = await getItems();
      setItems(items);
    }
    getAllItems();
    return () => { }
  }, [])

  return (
    <AppLayout>
      <div className="space-y-5">
        <Header text="Go shopping !" />
        <ClothingItemsGrid items={items} />
      </div>
    </AppLayout>
  );
}