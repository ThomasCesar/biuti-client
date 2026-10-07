import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { UploadZone } from "@/components/upload-zone";
import { createItem } from "@/services/items";
import { allItemMaterials, allItemTypes, type Item, type ItemMaterial, type ItemType } from "@/types/items";
import { defaultBrandId, defaultUser } from "@/types/main";
import type { SelectRootChangeEventDetails } from "@base-ui/react/select";
import { CheckCircle } from "lucide-react";
import { useCallback, useState } from "react";
import { Link } from "react-router";


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

export default function WardRobAddPage() {

  const item: Item | null = null;

  const [itemPhoto, setItemPhoto] = useState<string | null>(null);
  const [itemName, setItemName] = useState('');
  const [itemDescription, setItemDescription] = useState('');
  const [itemType, setItemType] = useState<ItemType>("Accessory");
  const [itemMaterial, setItemMaterial] = useState<ItemMaterial>("Cotton");

  const handleFile = useCallback(async (file: File) => {
    const url = URL.createObjectURL(file);
    setItemPhoto(url);
    await new Promise(res => setTimeout(res, 3000));
  }, []);

  const handleSaveItem = async () => {
    await createItem({
      name: itemName,
      description: itemDescription,
      image: itemPhoto ?? '',
      material: itemMaterial,
      type: itemType,
      userId: defaultUser.id,
      brandId: defaultBrandId,
    })
  }

  return (
    <div className="flex flex-col justify-between h-screen p-5">

      {/* TOP */}

      <div className="flex flex-col gap-10 justify-start flex-1 overflow-auto">
        <p className="text-2xl font-light mt-5">Add to your wardrobe</p>
        <UploadZone onFile={handleFile} />
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

      {/* BOTTOM */}

      <div className="flex flex-col gap-3 pt-5">
        <Link to="/wardrobe">
          <Button className="uppercase w-full" variant={"outline"} size={"lg"}>
            Cancel
          </Button>
        </Link>
        <Button size={"lg"} variant={"default"} className="uppercase" onClick={handleSaveItem}>
          Save Item
          <CheckCircle />
        </Button>
      </div>

    </div>
  )
}