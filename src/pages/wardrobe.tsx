import { Link } from "react-router";
import { PlusIcon } from "lucide-react";
import Header from "@/components/header";
import type { Item } from "@/types/items";
import { useEffect, useState } from "react";
import { getItems } from "@/services/items";
import AppLayout from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import ClothingItemsGrid from "@/components/clothing-item";

export default function WardrobePage() {

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
      <div className="space-y-5 pb-8">
        <Header text="Wardrobe" />
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