
import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import Logo from "@/components/logo";
import { Button } from "@/components/ui/button";

export default function WelcomePage() {
  return (
    <div className="flex flex-col justify-between h-screen p-5">

      {/* TOP */}

      <div className="flex flex-col gap-10 justify-start flex-1 w-full">
        <div className="flex justify-between">
          <Logo />
        </div>
        <img
          src="/fashion-2.jpg"
          alt="Image"
          className="rounded-md object-cover object-top h-[40vh] shadow-xl/20 shadow-pink-500/50"
        />
        <p className="text-2xl font-light">Cupcake icing candy canes</p>
        <p className="text-muted-foreground">Pudding cupcake soufflssé chocolate bar gummi bears. Cupcake icing candy canes toffee marzipan. Tiramisu sweet roll toffee biscuit chocolate.</p>
      </div>

      {/* BOTTOM */}

      <div className="w-full flex flex-col gap-3">
        <Link to="/">
          <Button className="uppercase w-full" variant={"outline"} size={"lg"}>
            Skip this step
          </Button>
        </Link>
        <Link to="/colorimetry">
          <Button className="uppercase w-full" variant={"default"} size={"lg"}>
            FIND MY COLORS !
            <ArrowRight />
          </Button>
        </Link>
      </div>

    </div>
  )
}