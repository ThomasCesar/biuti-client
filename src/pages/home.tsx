import { Link } from "react-router";
import Logo from "@/components/logo";
import useItems from "@/hooks/use-items";
import { ArrowRight } from "lucide-react";
import { SEASONS } from "@/lib/colorimetry";
import { Button } from "@/components/ui/button";
import ClothingItemsGrid from "@/components/clothing-item";

export default function HomePage() {

  const items = useItems();

  return (

    <div className="flex flex-col gap-5">

      <Logo />

      <div className="space-y-4">

        {/* ---- TITLE */}

        <div className="flex items-center justify-between">
          <p className="text-2xl">Hello Giorgio !</p>
          <p className="text-xs uppercase text-muted-foreground">{new Date().toLocaleDateString()}</p>
        </div>

        {/* ---- YOUR COLORS */}

        <div className="rounded-xl relative bg-linear-to-b from-primary to-secondary p-0.5  ">
          <div className="flex gap-5 bg-background p-8 rounded-xl">
            <img src="https://github.com/shadcn.png" className="rounded-full h-20 shadow-2xl shadow-primary" />
            <div className="space-y-3 flex-1">
              <p className="uppercase text-muted-foreground text-xs">your colors</p>
              <p className="text-xl uppercase" >true Spring</p>
              <div className="flex justify-between w-full">
                {SEASONS.Spring.bestColors.map(color => <span className="h-3 w-3 rounded-full" key={color.hex} style={{ background: color.hex }}></span>)}
              </div>
              <Link to={`/colorimetry`} className="flex items-center gap-1 justify-end text-primary-foreground">
                my colors <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>

        {/* ---- COLORIMETRY LINK */}

        <p className="">Find your colors !</p>
        <div className="bg-radial from-primary/30 to-secondary/10 rounded-xl p-5 border-2 border-primary/50 ">
          <div className="space-y-3">
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

        {/* ---- LINK TO Outfits */}

        <p className="" >Make your outfits !</p>
        <div className="rounded-xl p-5 border border-secondary bg-radial from-secondary/20 to-primary/10">
          <div className="space-y-3 ">
            <p className="text-balance opacity-65"> Customize and try on your favourite outfits ! </p>
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

        <div className="flex justify-between items-center">
          <p className="">Last items</p>
          <Link to={`/wardrobe`} className="" >
            <Button size={"sm"} variant={"link"}>
              go to wardrobe
              <ArrowRight />
            </Button>
          </Link>
        </div>
        <ClothingItemsGrid items={items.items.slice(0, 3)} />
      </div>
    </div>

  )
}