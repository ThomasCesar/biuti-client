
import useItems from "@/hooks/use-items";
import { defaultUser } from "@/lib/users";
import { useSheet } from "@/hooks/use-sheet";
import { useCallback, useState } from "react";
import { Input } from "@/components/ui/input";
import { defaultBrandId } from "@/lib/brands";
import FieldRow from "@/components/field-row";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Table, TableBody } from "@/components/ui/table";
import { UploadImageZone } from "@/components/upload-zone";
import SelectFieldRow from "@/components/select-field-row";
import { SheetContentBody, SheetFooterWithClose, SheetHeaderWithClose } from "@/components/ui/sheet";
import { allItemMaterials, allItemTypes, createItem, defaultItemMaterial, defaultItemType, updateItem, type Item, type ItemMaterial, type ItemType } from "@/lib/items";

export default function ItemFormSheet({ item }: { item?: Item }) {

  const [itemPhoto, setItemPhoto] = useState<string | undefined>(item ? item.image : undefined);
  const [itemName, setItemName] = useState(item?.name || '');
  const [itemDescription, setItemDescription] = useState(item?.description || '');
  const [itemType, setItemType] = useState<ItemType>(item?.type || defaultItemType);
  const [itemMaterial, setItemMaterial] = useState<ItemMaterial>(item?.material || defaultItemMaterial);
  const [isLoading, setIsLoading] = useState(false);

  const items = useItems();
  const sheet = useSheet();

  const handleImageLoad = useCallback(async (imageUrl: string) => {
    setItemPhoto(imageUrl);
    await new Promise(res => setTimeout(res, 3000));
  }, []);

  const handleSaveItem = async () => {
    setIsLoading(true);
    if (item) {
      const partialItem = {
        name: itemName,
        description: itemDescription,
        material: itemMaterial,
        type: itemType
      };
      await updateItem(item.id, partialItem);
      items.dispatch({
        action: "UPDATE",
        id: item.id,
        item: partialItem
      })
    }
    else {
      const newItem = await createItem({
        name: itemName,
        description: itemDescription,
        image: 't-shirt-2.webp',
        material: itemMaterial,
        type: itemType,
        userId: defaultUser.id,
        brandId: defaultBrandId,
      })
      items.dispatch({
        action: "ADD",
        items: [newItem]
      })
    }
    sheet.closeSheet();
  }

  return (
    <>
      <SheetHeaderWithClose title={item ? `Edit item` : `Add item`} />
      <SheetContentBody>
        <div className="flex flex-col gap-5 justify-start px-6">
          <UploadImageZone initialImageUrl={itemPhoto} onImageLoad={handleImageLoad} />
          <Table>
            <TableBody>
              <FieldRow title="Title">
                <Input placeholder="Title of item" value={itemName} onChange={e => setItemName(e.target.value)} />
              </FieldRow>
              <FieldRow title="Description">
                <Textarea placeholder="Type your message here." value={itemDescription} onChange={e => setItemDescription(e.target.value)} />
              </FieldRow>
              <FieldRow title="Type">
                <SelectFieldRow placeHolder="Select type" value={itemType} options={allItemTypes} onValueChange={setItemType} />
              </FieldRow>
              <FieldRow title="Material">
                <SelectFieldRow placeHolder="Select material" value={itemMaterial} options={allItemMaterials} onValueChange={setItemMaterial} />
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