
import { useState } from "react"
import { Link } from "react-router"
import { useAuth } from "@/hooks/use-auth"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"
import { defaultUser } from "@/types/main"

export default function SignUpPage() {

  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();

  const handleSignUp = async () => {
    setIsLoading(true);
    await login(defaultUser, true)
  }

  return (
    <div className="flex flex-col justify-between h-screen p-5">

      {/* TOP */}

      <div className="flex flex-col gap-10 pt-10">
        <Link to={'/sign-in'}>
          <Button variant={"outline"}>
            <ArrowLeft />
            Cancel, Back to Sign In
          </Button>
        </Link>
        <p className="text-xl font-bold">Create your account</p>
        <div>
          <p className="mb-2">Your email</p>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div>
          <p className="mb-2" >Choose a password</p>
          <Input id="password" type="password" required />
        </div>
        <div className="flex border gap-4 rounded-md p-4">
          <Checkbox className="mt-2" />
          <div className="space-y-1">
            <p className="">Accept stuff and shit</p>
            <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita, quasi?</p>
          </div>
        </div>
      </div>

      {/* BOTTOM */}

      <div className="flex flex-col gap-6">
        <Button size={"lg"} disabled={isLoading} type="submit" className="uppercase" onClick={handleSignUp} >{isLoading ? <>Loading <Loader className="animate-spin" /></> : <>Sign up</>}</Button>
        <Button size={"lg"} disabled={isLoading} variant="outline" type="button" className="uppercase"> Sign up with Google </Button>
      </div>

    </div>

  )
}