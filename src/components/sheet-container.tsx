import { ChevronLeft } from "lucide-react";
import { SheetClose, SheetFooter } from "./ui/sheet";
import { Button } from "./ui/button";

export default function SheetContainer({ content, headerTitle, footerButton }: { content: React.ReactNode, headerTitle?: string | undefined, footerButton?: React.ReactNode | undefined }) {
  return (
    <>
      {
        headerTitle &&
        <div className="flex gap-5 items-center p-3">
          <SheetClose render={<Button variant={"outline"} size={"icon-lg"}>
            <ChevronLeft />
          </Button>} />
          <span className="text-2xl">{headerTitle}</span>
        </div>
      }
      <div className="flex-1 overflow-auto relative">
        {
          !headerTitle &&
          <SheetClose
            render={
              <Button className="absolute top-3 left-3 bg-black" variant={"outline"} size={"icon-lg"}>
                <ChevronLeft />
              </Button>
            }
          />
        }
        {content}
      </div>
      <SheetFooter>
        {footerButton || <></>}
        <SheetClose render={<Button variant="outline">CLOSE</Button>} />
      </SheetFooter>
    </>
  )
}