import { useState } from "react";
import useItems from "@/hooks/use-items";
import { useSheet } from "@/hooks/use-sheet";
import ItemFormSheet from "./item-form-sheet";
import { Badge } from "@/components/ui/badge";
import BrandLogo from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { deleteItem, type Item } from "@/lib/items";
import { ChevronLeft, Edit, Loader, Trash } from "lucide-react";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { SheetClose, SheetContentBody, SheetFooterWithClose } from "@/components/ui/sheet";
import { BASE_URL_UPLOADS } from "@/lib/api";
/**
 * ------------------------------------------------------------------
 * A single row of the table
 */
function FieldRow({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <TableRow>
      <TableCell className="text-muted-foreground">{title}</TableCell>
      <TableCell className="text-right">
        {children}
      </TableCell>
    </TableRow>
  )
}
/**
 * ------------------------------------------------------------------
 * The dialog content
 */
export default function ItemDetailsSheet({ item }: { item: Item }) {

  const [isLoading, setIsLoading] = useState(false);

  const items = useItems();
  const sheet = useSheet();

  const handleDeleteItem = async () => {
    setIsLoading(true);
    await deleteItem(item.id);
    items.dispatch({ action: "DELETE", id: item.id });
    sheet.closeSheet();
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
        <div className="p-6 bg-popover z-10 -mt-6 relative rounded-t-4xl">
          <div className="flex justify-between items-center mb-5">
            <p className="text-2xl ">{item.name}</p>
            <Button className="z-10" variant={"outline"} onClick={() => sheet.openSheet(<ItemFormSheet item={item} />)}>EDIT ITEM<Edit /></Button>
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
        </div>
      </SheetContentBody>
      <SheetFooterWithClose>
        <Button
          variant={"destructive"}
          onClick={handleDeleteItem}
          disabled={isLoading}
        >
          {isLoading ? <>LOADING <Loader className="animate-spin" /></> : <>DELETE ITEM<Trash /></>}
        </Button>
      </SheetFooterWithClose>
    </>
  )

}