import Header from "../header";
import { Link } from "react-router";
import { Button } from "../ui/button";
import { getItems } from "@/lib/items";
import AppLayout from "../app-layout";
import { PlusIcon } from "lucide-react";
import type { Item } from "@/types/items";
import { useEffect, useState } from "react";
import ClothingItemsGrid from "../clothing-item";

export default function WardrobePage() {

  const [items, setItems] = useState<Item[] | null>(null);

  useEffect(() => {
    const getAllItems = async () => {
      const items = await getItems();
      setItems(items);
    }
    getAllItems();
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