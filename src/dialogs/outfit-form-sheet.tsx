import type { Item } from "@/lib/items";
import useItems from "@/hooks/use-items";
import { defaultUser } from "@/lib/users";
import { useSheet } from "@/hooks/use-sheet";
import FieldRow from "@/components/field-row";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Activity, useCallback, useState } from "react";
import { Table, TableBody } from "@/components/ui/table";
import { UploadImageZone } from "@/components/upload-zone";
import { ItemsSelectContext } from "@/contexts/items-select-context";
import { ClothingItemGridWithFilter } from "@/components/clothing-item";
import { allOutfitCategories, createOutfit, type Outfit } from "@/lib/outfits";
import { ArrowLeft, ArrowRight, CheckCircle, Loader, Sparkle } from "lucide-react";
import { SheetContentBody, SheetFooter, SheetHeader } from "@/components/ui/sheet";

type OutfitStep = 'ITEMS' | 'PHOTO' | 'INFO';

function OutfitItemsList({ OutfitItemsIds }: { OutfitItemsIds: Item["id"][] }) {
  const items = useItems();
  return (
    <div className="flex items-center justify-end flex-nowrap overflow-auto scrollbar-none gap-2">
      {items.items.filter(i => OutfitItemsIds.includes(i.id)).map(i => <img src={i.image} key={i.id} className="w-10 h-10 rounded-sm object-cover" />)}
    </div>
  )
}

export default function OutfitFormSheet() {

  const [outfitStep, setOutfitStep] = useState<OutfitStep>("ITEMS");
  const [outfitName, setOutfitName] = useState<Outfit['name']>("");
  const [outfitDescription, setOutfitDescription] = useState<Outfit['description']>("");
  const [outfitPhoto, setOutfitPhoto] = useState<Outfit['image']>("");
  const [outfitCategory, setOutfitCategory] = useState<Outfit['category']>("Other");
  const [OutfitItemsIds, setOutfitItemsIds] = useState<Item["id"][]>([])
  const [isLoading, setIsLoading] = useState(false);

  const sheet = useSheet();

  const handleImageLoad = useCallback(async (imageUrl: string) => {
    setOutfitPhoto(imageUrl);
  }, []);

  const handleSelectItem = (item: Item) => {
    OutfitItemsIds.includes(item.id) ?
      setOutfitItemsIds(OutfitItemsIds.filter(itemId => itemId !== item.id)) :
      setOutfitItemsIds([...OutfitItemsIds, ...[item.id]])
  }

  const handleSaveOutfit = async () => {
    setIsLoading(true);
    console.log(OutfitItemsIds);
    await createOutfit({
      name: outfitName,
      image: "outfit-5.jpg",
      description: outfitDescription,
      category: outfitCategory,
      itemsIds: OutfitItemsIds,
      userId: defaultUser.id
    })
    sheet.closeSheet();
  }

  return (
    <>

      {/* HEADER */}

      <SheetHeader>
        <span className="text-2xl">New outfit</span>
      </SheetHeader>

      <SheetContentBody>

        {/* -- STEP 1 : SELECT ALL THE CLOTHING ITEMS  -- */}

        <Activity mode={outfitStep == "ITEMS" ? "visible" : "hidden"}>
          <ItemsSelectContext.Provider value={{ selectedIds: OutfitItemsIds, action: handleSelectItem }}>
            <div className="space-y-5 px-6">
              <ClothingItemGridWithFilter />
            </div>
          </ItemsSelectContext.Provider>
        </Activity>

        {/* -- STEP 2 : PHOTO & CATEGORY   -- */}

        <Activity mode={outfitStep == "PHOTO" ? "visible" : "hidden"}>
          <div className="flex flex-col gap-6 justify-start px-6">
            <p>Upload a photo :</p>
            <div className="flex flex-col gap-2">
              <UploadImageZone initialImageUrl={outfitPhoto} onImageLoad={handleImageLoad} />
              <OutfitItemsList OutfitItemsIds={OutfitItemsIds} />
            </div>
            <p>Specify category :</p>
            <div className="flex items-center flex-wrap gap-2">
              {allOutfitCategories.map(cat => <Badge variant={outfitCategory === cat ? "default" : "outline"} className="p-5 uppercase" key={cat} onClick={() => setOutfitCategory(cat)}>{cat}</Badge>)}
            </div>
            <p>Generate your outfit with AI :</p>
            <Button variant={"default"} size={"lg"} className="w-full">GENERATE <Sparkle /></Button>
          </div>
        </Activity>

        {/* -- STEP 3 : NAME IT, GENERATE, SAVE  -- */}

        <Activity mode={outfitStep == "INFO" ? "visible" : "hidden"}>
          <div className="flex flex-col gap-5 justify-start px-6">
            <div className="flex flex-col gap-2 w-full">
              <img src="outfit-5.jpg" className="w-full h-[45vh] object-cover rounded-sm" />
              <OutfitItemsList OutfitItemsIds={OutfitItemsIds} />
            </div>
            <Table>
              <TableBody>
                <FieldRow title="Title">
                  <Input placeholder="Title of item" value={outfitName} onChange={e => setOutfitName(e.target.value)} />
                </FieldRow>
                <FieldRow title="Description">
                  <Textarea placeholder="Type your message here." value={outfitDescription} onChange={e => setOutfitDescription(e.target.value)} />
                </FieldRow>
                <FieldRow title="Category">
                  <Badge variant={"outline"} className="p-4 uppercase">{outfitCategory}</Badge>
                </FieldRow>
              </TableBody>
            </Table>
          </div>
        </Activity>

      </SheetContentBody>

      {/* FOOTER */}

      <SheetFooter className="flex-row">
        <Button variant={"outline"} className="flex-1" onClick={() => outfitStep == "ITEMS" ? sheet.closeSheet() : setOutfitStep(outfitStep == "PHOTO" ? "ITEMS" : "PHOTO")} >
          {outfitStep == "ITEMS" ? <>CANCEL</> : <><ArrowLeft /> BACK </>}
        </Button>
        {
          outfitStep !== "INFO" ?
            <Button variant={"outline"} className="flex-1" onClick={() => setOutfitStep(outfitStep === "ITEMS" ? "PHOTO" : "INFO")} >
              NEXT<ArrowRight />
            </Button> :
            <Button
              variant={"default"}
              className="flex-1"
              onClick={handleSaveOutfit}
              disabled={isLoading}
            >
              {isLoading ? <>LOADING <Loader className="animate-spin" /></> : <>SAVE OUTFIT<CheckCircle /></>}
            </Button>
        }
      </SheetFooter>
    </>
  )

}