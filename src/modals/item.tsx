import { useContext } from "react";
import type { Item } from "@/lib/items";
import { useSheet } from "@/hooks/use-sheet";
import { Button } from "@/components/ui/button";
import { SheetClose, SheetFooter } from "@/components/ui/sheet";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ItemsContext } from "@/contexts/items-context";

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

export default function ItemModal({ item }: { item: Item }) {

  const context = useContext(ItemsContext);
  const sheet = useSheet();

  const handleDeleteItem = (itemId: string) => {
    sheet.closeSheet();
    context?.dispatch({ action: "DELETE", id: itemId });
  }

  return (
    <>
      <div className="flex-1 overflow-auto">
        <img className="w-full h-[40vh] object-cover" src={item.image} />
        <div className="p-5">
          <p className="text-2xl mb-5">{item.name}</p>
          <Table>
            <TableBody>
              <ItemFormRow title="Type"> {item.type} </ItemFormRow>
              <ItemFormRow title="Material"> {item.material} </ItemFormRow>
              <ItemFormRow title="Description"> {item.description} </ItemFormRow>
              <ItemFormRow title="Brand"> {item.brand?.name} </ItemFormRow>
              <ItemFormRow title="Created"> {new Date(item.createdAt).toLocaleDateString()} </ItemFormRow>
            </TableBody>
          </Table>
        </div>
      </div>
      <SheetFooter>
        {context && <Button variant={"destructive"} onClick={() => handleDeleteItem(item.id)}>DELETE</Button>}
        <SheetClose render={<Button variant="outline">Close</Button>} />
      </SheetFooter>
    </>
  )
}