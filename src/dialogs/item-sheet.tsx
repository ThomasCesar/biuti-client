import { useState } from "react";
import useItems from "@/hooks/use-items";
import { BASE_URL_UPLOADS } from "@/lib/api";
import { useSheet } from "@/hooks/use-sheet";
import ItemFormSheet from "./item-form-sheet";
import { Badge } from "@/components/ui/badge";
import FieldRow from "@/components/field-row";
import BrandLogo from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import ErrorAlert from "@/components/error-alert";
import { deleteItem, type Item } from "@/lib/items";
import { Table, TableBody } from "@/components/ui/table";
import { ChevronLeft, Edit, Heart, Loader, Trash } from "lucide-react";
import { SheetClose, SheetContentBody, SheetFooterWithClose } from "@/components/ui/sheet";

export default function ItemSheet({ item }: { item: Item }) {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const items = useItems();
  const sheet = useSheet();

  const handleDeleteItem = async () => {
    setIsLoading(true);
    const result = await deleteItem(item.id);
    setIsLoading(false);
    if (!result.success) {
      setError(result.error);
    }
    else {
      items.dispatch({ action: "DELETE", id: item.id });
      sheet.closeSheet();
    }
  }

  const handleEditItem = () => {
    sheet.openSheet(<ItemFormSheet item={item} />)
  }

  return (
    <>
      <SheetContentBody>
        <SheetClose
          render={
            <Button className="absolute top-3 left-3 bg-black z-10" variant={"outline"} size={"icon-lg"}>
              <ChevronLeft />
            </Button>
          }
        />
        <img className="w-full h-[40vh] object-cover -z-10 relative" src={`${BASE_URL_UPLOADS}${item.image}`} />
        <div className="p-6 bg-popover z-10 -mt-6 relative rounded-t-4xl flex flex-col gap-3">
          <div className="flex justify-between items-center mb-5">
            <p className="text-2xl ">{item.name}</p>
            <Button size={"icon"} variant={"ghost"}>
              <Heart />
            </Button>
          </div>
          <Table>
            <TableBody>
              <FieldRow title="Type"> {item.type} </FieldRow>
              <FieldRow title="Material"><Badge variant={"outline"}>{item.material}</Badge></FieldRow>
              <FieldRow title="Description"><p className="text-wrap">{item.description}</p></FieldRow>
              {item.brand && <FieldRow title="Brand"><BrandLogo brand={item.brand} /></FieldRow>}
              <FieldRow title="Created"> {new Date(item.createdAt).toLocaleDateString()} </FieldRow>
            </TableBody>
          </Table>
          <div className="flex justify-end gap-1">
            <Button variant={"outline"} onClick={handleEditItem} >EDIT<Edit /></Button>
            <Button variant={"destructive"} onClick={handleDeleteItem} disabled={isLoading} > {isLoading ? <Loader className="animate-spin" /> : <>DELETE<Trash /></>}</Button>
          </div>
          <ErrorAlert error={error} />
        </div>
      </SheetContentBody>
      <SheetFooterWithClose />
    </>
  )

}