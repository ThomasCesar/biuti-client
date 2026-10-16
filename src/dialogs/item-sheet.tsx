import type { Item } from "@/lib/items";
import useItems from "@/hooks/use-items";
import { useSheet } from "@/hooks/use-sheet";
import { Button } from "@/components/ui/button";
import SheetContainer from "@/components/sheet-container";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

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

export default function ItemDetailsSheet({ item }: { item: Item }) {

  const items = useItems();
  const sheet = useSheet();

  const handleDeleteItem = (itemId: string) => {
    sheet.closeSheet();
    items.dispatch({ action: "DELETE", id: itemId });
  }

  return (
    <SheetContainer
      content={
        <>
          <img className="w-full h-[40vh] object-cover -z-10 relative" src={item.image} />
          <div className="p-5 bg-popover z-10 -mt-5 relative rounded-t-4xl">
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
        </>
      }
      footerButton={<Button variant={"destructive"} onClick={() => handleDeleteItem(item.id)}>DELETE</Button>}
    />
  )

}