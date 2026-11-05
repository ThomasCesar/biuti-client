import type { Item } from "@/lib/items";
import useItems from "@/hooks/use-items";
import { Activity, useState } from "react";
import Selector from "@/components/selector";
import { useSheet } from "@/hooks/use-sheet";
import { BASE_URL_UPLOADS } from "@/lib/api";
import FieldRow from "@/components/field-row";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useOutfits } from "@/hooks/use-outfits";
import ErrorAlert from "@/components/error-alert";
import { OutfitItems } from "@/components/outfit";
import { Textarea } from "@/components/ui/textarea";
import { ItemsGridWithFilter } from "@/components/item";
import { Table, TableBody } from "@/components/ui/table";
import { UploadImageZone } from "@/components/upload-zone";
import { ItemsSelectContext } from "@/contexts/items-select-context";
import { ArrowRight, CheckCircle, Loader, Sparkle } from "lucide-react";
import { SheetContentBody, SheetFooter, SheetHeader } from "@/components/ui/sheet";
import { createOutfit, updateOutfit, type Outfit, type OutfitCategory, type OutfitForCreate, type OutfitForUpdate } from "@/lib/outfits";

export default function OutfitFormSheet({ outfit, openItemsSelection }: { outfit?: Outfit, openItemsSelection?: boolean }) {

  // --- states
  const [selectingItems, setSelectingItems] = useState(openItemsSelection ? true : (!outfit ? true : false));
  const [outfitName, setOutfitName] = useState<Outfit['name']>(outfit?.name || '');
  const [outfitDescription, setOutfitDescription] = useState<Outfit['description']>(outfit?.description || '');
  const [outfitCategory, setOutfitCategory] = useState<string | null>(outfit?.category || null);
  const [OutfitItemsIds, setOutfitItemsIds] = useState<Item["id"][]>(outfit ? outfit.items.map(o => o.id) : [])
  const [outfitImage, setOutfitImage] = useState<File | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  // --- hooks
  const items = useItems();
  const outfits = useOutfits();
  const sheet = useSheet();

  // --- selector data
  const allOutfitCategoriesForSelector: { value: OutfitCategory, label: string }[] = [
    { value: "BusinessCasual", label: "Business Casual" },
    { value: "Business", label: "Business" },
    { value: "Casual", label: "Casual" },
    { value: "Sports", label: "Sports" },
    { value: "Other", label: "Other" }
  ];

  // --- actions
  const handleSelectItem = (item: Item) => {
    OutfitItemsIds.includes(item.id) ?
      setOutfitItemsIds(OutfitItemsIds.filter(itemId => itemId !== item.id)) :
      setOutfitItemsIds([...OutfitItemsIds, ...[item.id]])
  }
  const handleSaveOutfit = async () => {
    setIsLoading(true);

    // edit existing outfit

    if (outfit) {
      let partialOutfit: OutfitForUpdate = {
        name: outfitName,
        description: outfitDescription,
        category: outfitCategory as OutfitCategory,
        itemsIds: OutfitItemsIds
      }
      if (outfitImage) {
        partialOutfit.image = outfitImage;
      }
      const result = await updateOutfit(outfit.id, partialOutfit);
      if (!result.success) {
        setError(result.error)
        setIsLoading(false);
        return;
      }
      outfits.dispatch({
        action: "UPDATE",
        id: outfit.id,
        outfit: result.result
      });
      setIsLoading(false);
      sheet.closeSheet();
    }

    // add new outfit

    else {
      if (!outfitImage) {
        setError("Choose an image bitch");
        setIsLoading(false);
        return;
      }
      const newItem: OutfitForCreate = {
        name: outfitName,
        description: outfitDescription,
        category: outfitCategory as OutfitCategory,
        itemsIds: OutfitItemsIds,
        image: outfitImage
      }
      const result = await createOutfit(newItem);
      setIsLoading(false);
      if (!result.success) {
        setError(result.error);
      }
      else {
        outfits.dispatch({
          action: "ADD",
          outfits: [result.result]
        })
        sheet.closeSheet();
      }
    }
  }

  // --- component
  return (
    <>

      {/* HEADER */}

      <SheetHeader>
        <span className="text-2xl">{outfit ? <>Edit outfit</> : <>New outfit</>}</span>
      </SheetHeader>

      <SheetContentBody>

        {/* -- STEP 1 : SELECT ALL THE CLOTHING ITEMS  -- */}

        <Activity mode={selectingItems ? "visible" : "hidden"}>
          <ItemsSelectContext.Provider value={{ selectedIds: OutfitItemsIds, action: handleSelectItem }}>
            <div className="space-y-5 px-6">
              <ItemsGridWithFilter />
            </div>
          </ItemsSelectContext.Provider>
        </Activity>

        {/* -- STEP 2 : PHOTO, CATEGORY, SAVE -- */}

        <Activity mode={!selectingItems ? "visible" : "hidden"}>

          <div className="flex flex-col gap-6 justify-start px-6">
            <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <OutfitItems items={items.items.filter(i => OutfitItemsIds.includes(i.id))} onClick={() => setSelectingItems(true)} />
                <Button variant={"default"} size={"sm"}>Generate<Sparkle /></Button>
              </div>
              <UploadImageZone initialImageUrl={outfit?.image ? `${BASE_URL_UPLOADS}${outfit.image}` : undefined} onLoadFile={setOutfitImage} />
            </div>
            <Table>
              <TableBody>
                <FieldRow title="Title">
                  <Input placeholder="Title of item" value={outfitName} onChange={e => setOutfitName(e.target.value)} />
                </FieldRow>
                <FieldRow title="Category">
                  <div className="flex justify-end">
                    <Selector options={allOutfitCategoriesForSelector} onValueChange={setOutfitCategory} value={outfitCategory} />
                  </div>
                </FieldRow>
                <FieldRow title="Description">
                  <Textarea placeholder="Type your message here." value={outfitDescription} onChange={e => setOutfitDescription(e.target.value)} />
                </FieldRow>
              </TableBody>
            </Table>
            <ErrorAlert error={error} />
          </div>
        </Activity>

      </SheetContentBody>

      {/* FOOTER */}

      <SheetFooter>
        {
          selectingItems ?
            <>
              <Button variant={"outline"} onClick={() => sheet.closeSheet()} >
                CANCEL
              </Button>
              <Button variant={"default"} onClick={() => setSelectingItems(false)} >
                NEXT<ArrowRight />
              </Button>
            </>
            :
            <>
              <Button variant={"outline"} onClick={() => sheet.closeSheet()} >
                CANCEL
              </Button>
              <Button
                variant={"default"}
                onClick={handleSaveOutfit}
                disabled={isLoading}
              >
                {isLoading ? <>LOADING <Loader className="animate-spin" /></> : <>SAVE OUTFIT<CheckCircle /></>}
              </Button>
            </>
        }
      </SheetFooter>
    </>
  )

}