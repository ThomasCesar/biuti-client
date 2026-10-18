import { useState } from "react";
import useItems from "@/hooks/use-items";
import { useSheet } from "@/hooks/use-sheet";
import ItemFormSheet from "./item-form-sheet";
import { Badge } from "@/components/ui/badge";
import BrandLogo from "@/components/brand-logo";
import { Button } from "@/components/ui/button";
import { Edit, Loader, Trash } from "lucide-react";
import { deleteItem, type Item } from "@/lib/items";
import SheetContainer from "@/components/sheet-container";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
/**
 * ------------------------------------------------------------------
 * A single row of the table
 */
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
    <SheetContainer
      content={
        <>
          <img className="w-full h-[40vh] object-cover -z-10 relative" src={item.image} />
          <div className="p-5 bg-popover z-10 -mt-6 relative rounded-t-4xl">
            <div className="flex justify-between items-center mb-5">
              <p className="text-2xl ">{item.name}</p>
              <Button variant={"outline"} onClick={() => sheet.openSheet(<ItemFormSheet item={item} />)}>EDIT ITEM<Edit /></Button>
            </div>
            <Table>
              <TableBody>
                <ItemFormRow title="Type"> {item.type} </ItemFormRow>
                <ItemFormRow title="Material"><Badge variant={"outline"}>{item.material}</Badge></ItemFormRow>
                <ItemFormRow title="Description"><p className="text-wrap">{item.description}</p></ItemFormRow>
                {item.brand && <ItemFormRow title="Brand"><BrandLogo brand={item.brand} /></ItemFormRow>}
                <ItemFormRow title="Created"> {new Date(item.createdAt).toLocaleDateString()} </ItemFormRow>
              </TableBody>
            </Table>
          </div>
        </>
      }
      footerButton={
        <>
          <Button
            variant={"destructive"}
            onClick={handleDeleteItem}
            disabled={isLoading}
          >
            {isLoading ? <>LOADING <Loader className="animate-spin" /></> : <>DELETE ITEM<Trash /></>}
          </Button>
        </>
      }
    />
  )

}