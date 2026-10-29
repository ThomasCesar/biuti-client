import { Skeleton } from "./ui/skeleton";
import EmptyState from "./empty-state";
import type { Outfit } from "@/lib/outfits";
import { BASE_URL_UPLOADS } from "@/lib/api";
import { useOutfits } from "@/hooks/use-outfits";

function OutfitCard({ outfit }: { outfit: Outfit }) {
  return (
    <div className="min-w-35 max-w-35 snap-end">
      <div className="relative w-full h-50 rounded-sm overflow-clip">
        <img src={`${BASE_URL_UPLOADS}${outfit.image}`} className="w-full h-full object-cover" />
        <div className="absolute bottom-0 w-full flex items-center justify-end gap-1 p-1">
          {outfit.items.slice(0, 2).map((i, idx) => <img src={`${BASE_URL_UPLOADS}${i.image}`} key={idx} className="w-8 h-8 rounded-sm" />)}
          {outfit.items.length > 2 && <span className="w-8 h-8 rounded-sm bg-background text-center leading-8 text-sm text-muted-foreground">+{outfit.items.length - 2}</span>}
        </div>
      </div>
      <div className="space-y-0 py-1">
        <p className="text-sm">{outfit.name}</p>
      </div>
    </div>
  )
}

function OutfitCategoryRow({ categoryTitle, outfits }: { categoryTitle: string, outfits: Outfit[] }) {
  return (
    <div className="space-y-2">
      <p className="">
        {categoryTitle}
        <span className="text-muted-foreground"> ({outfits.length})</span>
      </p>
      <div className="flex items-top gap-3 flex-nowrap overflow-auto snap-x snap-mandatory scrollbar-none">
        {outfits.map(outfit => <OutfitCard key={outfit.id} outfit={outfit} />)}
      </div>
    </div>
  )
}

export function OutfitsCategoryRowsSkeleton() {
  return (
    <div className="flex items-top gap-3 flex-nowrap overflow-auto snap-x snap-mandatory scrollbar-none">
      {Array.from(Array(3).keys()).map(i => <Skeleton key={i} className="h-50 w-35" />)}
    </div>
  )
}

export function OutfitsCategoryRows() {
  const outfits = useOutfits();
  if (!outfits.loaded || !outfits.outfits.length) {
    return <EmptyState title="No outfit" message="You have no outfit. create some." />
  }
  return Array.from(new Set(outfits.outfits.map(o => o.category))).map(cat => <OutfitCategoryRow categoryTitle={cat} key={cat} outfits={outfits.outfits.filter(o => o.category == cat)} />);
}

