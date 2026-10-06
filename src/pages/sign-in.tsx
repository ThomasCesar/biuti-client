
import { useState } from "react"
import { Link } from "react-router"
import { Loader } from "lucide-react"
import { useAuth } from "@/hooks/use-auth"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Logo from "@/components/logo"
import { defaultUser } from "@/types/main"

export default function SignInPage() {

  const [isLoading, setIsLoading] = useState(false);

  const { login } = useAuth();

  const handleSignIn = async () => {
    setIsLoading(true);
    await login(defaultUser, false)
  }

  return (
    <div className="flex flex-col justify-between h-screen p-5">

      {/* TOP */}

      <div className="flex flex-col gap-10 pt-10">
        <Logo />
        <p className="text-xl font-bold">Login to your account</p>
        <p className="text-muted-foreground">Enter your email below to login to your account</p>
        <div>
          <p className="mb-2">Email</p>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div>
          <div className="flex items-center">
            <p className="mb-2" >Password</p>
            <a href="#" className="ml-auto inline-block text-sm text-muted-foreground" > Forgot your password? </a>
          </div>
          <Input id="password" type="password" required />
        </div>
      </div>

      {/* BOTTOM */}

      <div className="flex flex-col gap-6">
        <Button size={"lg"} disabled={isLoading} type="submit" className="uppercase" onClick={handleSignIn} >{isLoading ? <>Loading <Loader className="animate-spin" /></> : <>Sign in</>}</Button>
        <Button size={"lg"} disabled={isLoading} variant="outline" type="button" className="uppercase"> Sign in with Google </Button>
        <p className="text-center text-sm text-muted-foreground"> Don&apos;t have an account? <Link to={`/sign-up`}>Sign up</Link> </p>
      </div>

    </div>

  )
}