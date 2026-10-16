
import { defaultUser } from "@/lib/users";
import { useCallback, useState } from "react";
import { Input } from "@/components/ui/input";
import { defaultBrandId } from "@/lib/brands";
import { Textarea } from "@/components/ui/textarea";
import SheetContainer from "@/components/sheet-container";
import { UploadImageZone } from "@/components/upload-zone";
import type { SelectRootChangeEventDetails } from "@base-ui/react/select";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { allItemMaterials, allItemTypes, createItem, type Item, type ItemMaterial, type ItemType } from "@/lib/items";
import { Button } from "@/components/ui/button";
import { CheckCircle, Loader } from "lucide-react";
import useItems from "@/hooks/use-items";
import { useSheet } from "@/hooks/use-sheet";


function ItemFormRow({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <TableRow>
      <TableCell className="text-muted-foreground">{title}</TableCell>
      <TableCell className="text-right">
        {children}
      </TableCell>
    </TableRow>
  )
}

function ItemFormSelect({ placeHolder, options, onValueChange }: { placeHolder: string, options: readonly string[], onValueChange: (v: any, eventDetails: SelectRootChangeEventDetails) => void }) {
  return (
    <Select onValueChange={onValueChange}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeHolder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}

export default function ItemNewSheet() {

  const [, setItemPhoto] = useState<string | null>(null);
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemType, setItemType] = useState<ItemType>("Accessory");
  const [itemMaterial, setItemMaterial] = useState<ItemMaterial>("Cotton");
  const [isSaving, setIsSaving] = useState(false);

  const items = useItems();
  const sheet = useSheet();

  const handleImageLoad = useCallback(async (imageUrl: string) => {
    setItemPhoto(imageUrl);
    await new Promise(res => setTimeout(res, 3000));
  }, []);

  const handleSaveItem = async () => {
    setIsSaving(true);
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
    sheet.closeSheet();
  }

  return (
    <SheetContainer
      headerTitle="Add Item"
      content={
        <div className="flex flex-col gap-5 justify-start p-5">
          <UploadImageZone onImageLoad={handleImageLoad} />
          <Table>
            <TableBody>
              <ItemFormRow title="Title">
                <Input placeholder="Title of item" value={itemName} onChange={e => setItemName(e.target.value)} />
              </ItemFormRow>
              <ItemFormRow title="Description">
                <Textarea placeholder="Type your message here." value={itemDescription} onChange={e => setItemDescription(e.target.value)} />
              </ItemFormRow>
              <ItemFormRow title="Type">
                <ItemFormSelect placeHolder="Select type" options={allItemTypes} onValueChange={setItemType} />
              </ItemFormRow>
              <ItemFormRow title="Material">
                <ItemFormSelect placeHolder="Select material" options={allItemMaterials} onValueChange={setItemMaterial} />
              </ItemFormRow>
            </TableBody>
          </Table>
        </div>
      }
      footerButton={
        <Button
          variant={"default"}
          onClick={handleSaveItem}
          disabled={isSaving}
        >
          {isSaving ? <>Loading <Loader className="animate-spin" /></> : <>Save item<CheckCircle /></>}

        </Button>
      }
    />
  )
}