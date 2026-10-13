import { Link } from "react-router";
import { PlusIcon } from "lucide-react";
import Header from "@/components/header";
import AppLayout from "@/components/app-layout";
import { Button } from "@/components/ui/button";
import { ClothingItemsList } from "@/components/clothing-item";

export default function WardrobePage() {

  return (
    <AppLayout>
      <div className="space-y-5 pb-8">
        <Header text="Wardrobe" />
        <div className="flex gap-2 items-center flex-nowrap w-full overflow-x-scroll scrollbar-none">
        </div>
        <ClothingItemsList />
        <Link to="add">
          <Button variant={"default"} size={"lg"} className="absolute bottom-25 right-5 uppercase">
            Add
            <PlusIcon />
          </Button>
        </Link>
      </div>
    </AppLayout>
  );
}