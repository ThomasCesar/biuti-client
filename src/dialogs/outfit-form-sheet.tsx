import { ClothingItemGridWithFilter } from "@/components/clothing-item";
import FieldRow from "@/components/field-row";
import SelectFieldRow from "@/components/select-field-row";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SheetContentBody, SheetFooter, SheetFooterWithClose, SheetHeader, SheetHeaderWithClose } from "@/components/ui/sheet";
import { Table, TableBody } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { UploadImageZone } from "@/components/upload-zone";
import { ItemsSelectContext } from "@/contexts/items-select-context";
import { useSheet } from "@/hooks/use-sheet";
import type { Item } from "@/lib/items";
import { allOutfitCategories, type Outfit } from "@/lib/outfits";
import { ArrowLeft, ArrowRight, Check, CheckCircle, Shirt } from "lucide-react";
import { Activity, useCallback, useState } from "react";

type OutfitStep = 'ITEMS' | 'PHOTO' | 'INFO';

export default function OutfitFormSheet() {

  const [outfitStep, setOutfitStep] = useState<OutfitStep>("ITEMS");
  const [selectedItems, setSelectedItems] = useState<Item["id"][]>([])
  const [outfitPhoto, setOutfitPhoto] = useState<Outfit['image']>("");
  const [outfitName, setOutfitName] = useState<Outfit['name']>("");
  const [outfitDescription, setOutfitDescription] = useState<Outfit['description']>("");
  const [outfitCategory, setOutfitCategory] = useState<Outfit['category']>("Business");

  const sheet = useSheet();

  const handleImageLoad = useCallback(async (imageUrl: string) => {
    setOutfitPhoto(imageUrl);
    await new Promise(res => setTimeout(res, 3000));
  }, []);

  const handleSelectItem = (item: Item) => {
    selectedItems.includes(item.id) ?
      setSelectedItems(selectedItems.filter(itemId => itemId !== item.id)) :
      setSelectedItems([...selectedItems, ...[item.id]])
  }

  const handleSaveOutfit = () => {
    console.log(selectedItems);
    sheet.closeSheet();
  }

  return (
    <>
      <SheetHeader>
        <span className="text-2xl">New outfit</span>
      </SheetHeader>

      <SheetContentBody>

        {/* -- STEP 1 : SELECT ALL THE CLOTHING ITEMS  -- */}

        <Activity mode={outfitStep == "ITEMS" ? "visible" : "hidden"}>
          <ItemsSelectContext.Provider value={{ selectedIds: selectedItems, action: handleSelectItem }}>
            <div className="space-y-5 px-6">
              <p>First, select som clothes from your wardrobe :</p>
              <ClothingItemGridWithFilter />
            </div>
          </ItemsSelectContext.Provider>
        </Activity>

        {/* -- STEP 2 : CATEGORY & PHOTO  -- */}

        <Activity mode={outfitStep == "PHOTO" ? "visible" : "hidden"}>
          <div className="flex flex-col gap-5 justify-start px-6">
            <p>Now, let's see what it looks like !</p>
            <UploadImageZone initialImageUrl={outfitPhoto} onImageLoad={handleImageLoad} />
          </div>
        </Activity>

        {/* -- STEP 3 : NAME IT, GENERATE, SAVE  -- */}

        <Activity mode={outfitStep == "INFO" ? "visible" : "hidden"}>
          <div className="flex flex-col gap-5 justify-start px-6">
            <p>Fill in some info and save your outfit.</p>
            <Table>
              <TableBody>
                <FieldRow title="Clothes">
                  {
                    false ?
                      <></> :
                      <Button variant={"outline"} onClick={() => setOutfitStep("INFO")}>
                        Select clothes
                        <Shirt />
                      </Button>
                  }
                </FieldRow>
                <FieldRow title="Title">
                  <Input placeholder="Title of item" value={outfitName} onChange={e => setOutfitName(e.target.value)} />
                </FieldRow>
                <FieldRow title="Description">
                  <Textarea placeholder="Type your message here." value={outfitDescription} onChange={e => setOutfitDescription(e.target.value)} />
                </FieldRow>
                <FieldRow title="Type">
                  <SelectFieldRow placeHolder="Select type" value={outfitCategory} options={allOutfitCategories} onValueChange={setOutfitCategory} />
                </FieldRow>
              </TableBody>
            </Table>
          </div>
        </Activity>

      </SheetContentBody>
      <SheetFooter className="flex-row">
        <Button variant={"outline"} className="flex-1" onClick={() => outfitStep == "ITEMS" ? sheet.closeSheet() : setOutfitStep(outfitStep == "PHOTO" ? "ITEMS" : "PHOTO")} >
          {outfitStep == "ITEMS" ? <>CANCEL</> : <><ArrowLeft /> BACK </>}
        </Button>
        {
          outfitStep !== "INFO" ?
            <Button variant={"outline"} className="flex-1" onClick={() => setOutfitStep(outfitStep === "ITEMS" ? "PHOTO" : "INFO")} >NEXT<ArrowRight /></Button> :
            <Button variant={"default"} className="flex-1" onClick={handleSaveOutfit}>SAVE<CheckCircle /></Button>
        }
      </SheetFooter>
    </>
  )

}