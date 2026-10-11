import AppLayout from "@/components/app-layout";
import ClothingItemsGrid from "@/components/clothing-item";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";
import { SEASONS } from "@/lib/colorimetry";
import { getItems } from "@/services/items";
import type { Item } from "@/types/items";
import { ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

export default function HomePage() {

  const [items, setItems] = useState<Item[] | null>(null);

  useEffect(() => {
    const getAllItems = async () => {
      const items = await getItems();
      items.sort((i1, i2) => new Date(i2.createdAt).getTime() - new Date(i1.createdAt).getTime())
      setItems(items);
    }
    getAllItems();
    return () => { }
  }, [])

  return (
    <AppLayout>
      <div className="flex flex-col gap-10">
        <div className="flex justify-between">
          <Logo />
        </div>
        <div className="space-y-5">

          {/* ---- TITLE */}

          <div className="flex items-center justify-between">
            <p className="text-2xl">Hello Giorgio !</p>
            <p className="text-xs uppercase text-muted-foreground">{new Date().toLocaleDateString()}</p>
          </div>

          {/* ---- YOUR COLORS */}

          <div className="rounded-xl relative bg-linear-to-b from-primary to-primary-foreground/80  p-0.5">
            <div className="flex gap-5 bg-background p-8 rounded-xl">
              <img src="https://github.com/shadcn.png" className="rounded-full h-20 shadow-2xl shadow-primary" />
              <div className="space-y-3 flex-1">
                <p className="uppercase text-muted-foreground text-xs">your colors</p>
                <p className="text-xl uppercase" >true Spring</p>
                <div className="flex justify-between w-full">
                  {SEASONS.Spring.bestColors.map(color => <span className="h-3 w-3 rounded-full" style={{ background: color.hex }}></span>)}
                </div>
                <Link to={`/colorimetry`} className="flex items-center gap-1 justify-end text-primary-foreground">
                  my colors <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          </div>

          {/* ---- COLORIMETRY LINK */}

          <div className="bg-linear-to-b from-primary/20 to-secondary/10 rounded-xl p-5 border border-primary/50">
            <div className="space-y-3">
              <p className="text-xl" >Find your colors !</p>
              <p className="opacity-65 text-balance"> You have not defined your preferences yet, just do it bitch. </p>
              <div className="text-right">
                <Link to={`/colorimetry`}>
                  <Button variant={"default"} className="uppercase" >
                    Go somewhere
                    <ArrowRight />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* ---- LINK TO TRYON */}

          <div className="rounded-xl p-5 border border-secondary relative">
            <div className="absolute inset-0 bg-[url(/public/fashion-2.jpg)] bg-cover opacity-25 z-[-1]"></div>
            <div className="space-y-3 z-10">
              <p className="text-xl" >Make your outfits !</p>
              <p className="opacity-65 text-balance"> Customize and try on your favourite outfits ! </p>
              <div className="text-right">
                <Link to={`/colorimetry`}>
                  <Button variant={"outline"} className="uppercase" >
                    Start making my outfits
                    <ArrowRight className="stroke-primary" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* ---- LINK TO WARDROBE */}

          <div className="space-y-3 w-full">
            <div className="flex justify-between items-center">
              <p className="text-xl"><b className="text-primary">15</b> items in your wardrobe</p>
              <Link to={`/wardrobe`} className="text-primary" >
                View all
              </Link>
            </div>
            <ClothingItemsGrid items={items?.slice(0, 3) || []} />
          </div>

        </div>
      </div>
    </AppLayout>




  )
}