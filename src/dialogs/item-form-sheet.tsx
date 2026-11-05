
import { useState } from "react";
import useItems from "@/hooks/use-items";
import useBrands from "@/hooks/use-brands";
import { BASE_URL_UPLOADS } from "@/lib/api";
import { useSheet } from "@/hooks/use-sheet";
import { Input } from "@/components/ui/input";
import FieldRow from "@/components/field-row";
import { Button } from "@/components/ui/button";
import ErrorAlert from "@/components/error-alert";
import { CheckCircle, Loader } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody } from "@/components/ui/table";
import BadgesSelector from "@/components/badges-selector";
import { UploadImageZone } from "@/components/upload-zone";
import Selector, { type SelectorOption } from "@/components/selector";
import { SheetContentBody, SheetFooterWithClose, SheetHeaderWithClose } from "@/components/ui/sheet";
import { allItemTypes, createItem, defaultItemType, updateItem, type Item, type ItemForUpdate, type ItemMaterial, type ItemType, type ItemForCreate } from "@/lib/items";

export default function ItemFormSheet({ item }: { item?: Item }) {

  // --- states
  const [itemName, setItemName] = useState(item?.name || '');
  const [itemDescription, setItemDescription] = useState(item?.description || '');
  const [itemImage, setItemImage] = useState<File | undefined>(undefined);
  const [itemType, setItemType] = useState<ItemType>(item?.type || defaultItemType);
  const [itemMaterial, setItemMaterial] = useState<string | null>(item?.material || null);
  const [itemBrandId, setItemBrandId] = useState<string | null>(item?.brandId || null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- hooks
  const items = useItems();
  const brands = useBrands();
  const sheet = useSheet();

  // --- selector items
  const allItemMaterialsForSelector: SelectorOption[] = [
    { value: "Cotton", label: "Cotton" },
    { value: "Leather", label: "Leather" },
    { value: "Linen", label: "Linen" },
    { value: "Mixed", label: "Mixed" },
    { value: "Synthetic", label: "Synthetic" },
    { value: "Wool", label: "Wool" }
  ]
  const allBrandsForSelect: SelectorOption[] = brands.brands.map((b) => { return { value: b.id, label: b.name } });

  // --- save action
  const handleSaveItem = async () => {

    setIsLoading(true);

    // --> verification

    if (!itemMaterial || !itemBrandId) {
      setError('Missing info !');
      setIsLoading(false);
      return;
    }

    // --> update the item (PATCH) if it exists

    if (item) {
      let partialItem: ItemForUpdate = {
        name: itemName,
        description: itemDescription,
        material: itemMaterial as ItemMaterial,
        type: itemType
      };
      if (itemImage) {
        partialItem.image = itemImage;
      }
      const result = await updateItem(item.id, partialItem);
      setIsLoading(false);
      if (!result.success) {
        setError(result.error)
      }
      else {
        items.dispatch({
          action: "UPDATE",
          id: item.id,
          item: result.result
        })
      }
    }

    // --> or create a new item (POST)

    else {
      if (!itemImage) {
        setIsLoading(false);
        setError("Missing stuff image !")
        return;
      }
      const newItem: ItemForCreate = {
        name: itemName,
        description: itemDescription,
        material: itemMaterial as ItemMaterial,
        type: itemType,
        brandId: itemBrandId,
        image: itemImage
      }
      const result = await createItem(newItem);
      setIsLoading(false);
      if (!result.success) {
        setError(result.error);
      }
      else {
        items.dispatch({
          action: "ADD",
          items: [result.result]
        })
      }
    }
    sheet.closeSheet();
  }

  // --- component

  return (
    <>
      <SheetHeaderWithClose title={item ? `Edit item` : `Add item`} />
      <SheetContentBody>
        <div className="flex flex-col gap-5 justify-start px-6">
          <ErrorAlert error={error} />
          <UploadImageZone initialImageUrl={item?.image ? `${BASE_URL_UPLOADS}${item.image}` : undefined} onLoadFile={setItemImage} />
          <Table>
            <TableBody>
              <FieldRow title="Title">
                <Input placeholder="Title of item" value={itemName} onChange={e => setItemName(e.target.value)} />
              </FieldRow>
              <FieldRow title="Description">
                <Textarea placeholder="Type your message here." value={itemDescription} onChange={e => setItemDescription(e.target.value)} />
              </FieldRow>
              <FieldRow title="Type">
                <BadgesSelector values={allItemTypes} valueSelected={itemType} onSelect={setItemType} />
              </FieldRow>
              <FieldRow title="Material"  >
                <div className="flex justify-end">
                  <Selector options={allItemMaterialsForSelector} onValueChange={setItemMaterial} value={itemMaterial} />
                </div>
              </FieldRow>
              <FieldRow title="Brand">
                <div className="flex justify-end">
                  <Selector options={allBrandsForSelect} onValueChange={setItemBrandId} value={itemBrandId} />
                </div>
              </FieldRow>
            </TableBody>
          </Table>
        </div>
      </SheetContentBody>
      <SheetFooterWithClose closeText="CANCEL">
        <Button
          variant={"default"}
          onClick={handleSaveItem}
          disabled={isLoading}
        >
          {isLoading ? <>LOADING <Loader className="animate-spin" /></> : <>SAVE ITEM<CheckCircle /></>}
        </Button>
      </SheetFooterWithClose>
    </>
  )
}