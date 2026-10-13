import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import MobileLayout from "@/components/mobile-layout";

export default function NotFoundPage() {
  return (
    <MobileLayout>
      <div className="flex flex-col gap-5 items-center justify-center h-full">
        <p>NOT FOUND MATE</p>
        <p className="text-muted-foreground">Nothing here</p>
        <Link to={''}>
          <Button size={"lg"} variant={"outline"}>
            <ArrowLeft />
            Go back
          </Button>
        </Link>
      </div>
    </MobileLayout>
  )
}