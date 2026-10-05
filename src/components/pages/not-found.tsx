import { Link } from "react-router";
import { Button } from "../ui/button";
import { ArrowLeft } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="flex flex-col gap-5 items-center justify-center h-screen">
      <p>NOT FOUND MATE</p>
      <p className="text-muted-foreground">Nothing here</p>
      <Link to={''}>
        <Button size={"lg"} variant={"outline"}>
          <ArrowLeft />
          Go back
        </Button>
      </Link>
    </div>
  )
}