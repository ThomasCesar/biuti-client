import { Link } from "react-router";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getRandomElementInArray } from "@/lib/utils";

export default function NotFoundPage() {

  const errorGif = getRandomElementInArray(['broken-1.webp', 'broken-2.webp', 'broken-3.webp']);

  return (
    <div className="flex flex-col gap-5 items-center justify-center h-screen p-10">
      <img src={errorGif} className="w-full " />
      <p>ERROR !</p>
      <p className="text-muted-foreground">What the fuck is this shit ?</p>
      <Link to={''}>
        <Button size={"lg"} variant={"outline"}>
          <ArrowLeft />
          Go back
        </Button>
      </Link>
    </div>
  )
}