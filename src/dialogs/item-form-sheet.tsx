
import { useState } from "react";
import useItems from "@/hooks/use-items";
import { type Brand } from "@/lib/brands";
import useBrands from "@/hooks/use-brands";
import Selector from "@/components/selector";
import { BASE_URL_UPLOADS } from "@/lib/api";
import { useSheet } from "@/hooks/use-sheet";
import { Input } from "@/components/ui/input";
import FieldRow from "@/components/field-row";
import { Button } from "@/components/ui/button";
import ErrorAlert from "@/components/error-alert";
import { CheckCircle, Loader } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import SelectBadges from "@/components/select-badges";
import { Table, TableBody } from "@/components/ui/table";
import { UploadImageZone } from "@/components/upload-zone";
import { SheetContentBody, SheetFooterWithClose, SheetHeaderWithClose } from "@/components/ui/sheet";
import { allItemTypes, createItem, defaultItemType, updateItem, type Item, type ItemForUpdate, type ItemMaterial, type ItemType, type ItemForCreate } from "@/lib/items";

export default function ItemFormSheet({ item }: { item?: Item }) {

  // --- states
  const [itemName, setItemName] = useState(item?.name || '');
  const [itemDescription, setItemDescription] = useState(item?.description || '');
  const [itemImage, setItemImage] = useState<File | undefined>(undefined);
  const [itemType, setItemType] = useState<ItemType>(item?.type || defaultItemType);
  const [itemMaterial, setItemMaterial] = useState<ItemMaterial | undefined>(item?.material || undefined);
  const [itemBrandId, setItemBrandId] = useState<Brand['id'] | undefined>(item?.brandId || undefined)
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- hooks
  const items = useItems();
  const brands = useBrands();
  const sheet = useSheet();

  // --- selector items
  const allItemMaterialsForSelect: Record<ItemMaterial, ItemMaterial> = {
    Cotton: "Cotton",
    Leather: "Leather",
    Linen: "Linen",
    Synthetic: "Synthetic",
    Wool: "Wool",
    Mixed: "Mixed"
  }
  let allBrandsForSelect: Record<Brand['id'], Brand['name']> = {}
  brands.brands.forEach((b) => allBrandsForSelect[b.id] = b.name);

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
        material: itemMaterial,
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
        material: itemMaterial,
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
                <SelectBadges values={allItemTypes} valueSelected={itemType} onSelect={setItemType} />
              </FieldRow>
              <FieldRow title="Material">
                <Selector enumType={allItemMaterialsForSelect} value={itemMaterial} placeholder="Select material" onChange={(selectedMaterial) => setItemMaterial(selectedMaterial)} />
              </FieldRow>
              <FieldRow title="Brand">
                <Selector enumType={allBrandsForSelect} value={itemBrandId} placeholder="Select brand" onChange={(selectedBrandId) => setItemBrandId(selectedBrandId)} />
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