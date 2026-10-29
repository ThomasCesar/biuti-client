import { useSheet } from "@/hooks/use-sheet";
import { BASE_URL_UPLOADS } from "@/lib/api";
import { toast } from "@/components/ui/toast";
import FieldRow from "@/components/field-row";
import { Button } from "@/components/ui/button";
import { useOutfits } from "@/hooks/use-outfits";
import { Table, TableBody } from "@/components/ui/table";
import { deleteOutfit, type Outfit } from "@/lib/outfits";
import { ChevronLeft, Edit, Loader, Trash } from "lucide-react";
import { SheetClose, SheetContentBody, SheetFooterWithClose } from "@/components/ui/sheet";
import { useState } from "react";

export default function OutfitSheet({ outfit }: { outfit: Outfit }) {

  const [isLoading, setIsLoading] = useState(false);

  const outfits = useOutfits();
  const sheet = useSheet();

  const handleDeleteOutfit = async () => {
    setIsLoading(true);
    const result = await deleteOutfit(outfit.id);
    setIsLoading(false);
    if (!result.success) {
      toast.add({
        type: "error",
        description: result.error
      })
    }
    else {
      outfits.dispatch({ action: "DELETE", id: outfit.id })
      toast.add({
        type: "success",
        description: "Outfit deleted"
      })
      sheet.closeSheet();
    }
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
        <img className="w-full h-[50vh] object-cover -z-10 relative" src={`${BASE_URL_UPLOADS}${outfit.image}`} />
        <div className="p-6 bg-popover z-10 -mt-6 relative rounded-t-4xl">
          <div className="flex justify-between items-center mb-5">
            <p className="text-2xl ">{outfit.name}</p>
            <Button className="z-10" variant={"outline"}>EDIT OUTFIT<Edit /></Button>
          </div>
          <Table>
            <TableBody>
              <FieldRow title="Type"> {outfit.category} </FieldRow>
              <FieldRow title="Description"><p className="text-wrap">{outfit.description}</p></FieldRow>
              <FieldRow title="Created"> {new Date(outfit.createdAt).toLocaleDateString()} </FieldRow>
            </TableBody>
          </Table>
        </div>
      </SheetContentBody>
      <SheetFooterWithClose>
        <Button
          variant={"destructive"}
          onClick={handleDeleteOutfit}
          disabled={isLoading}
        >
          {isLoading ? <>LOADING <Loader className="animate-spin" /></> : <>DELETE OUTFIT<Trash /></>}
        </Button>
      </SheetFooterWithClose>
    </>
  );
}