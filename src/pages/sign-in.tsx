
import { useState } from "react"
import { signIn } from "@/lib/auth"
import Logo from "@/components/logo"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router"
import { AlertCircleIcon, Loader } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function SignInPage() {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSignIn = async () => {
    setError(null);
    setIsLoading(true);
    const { error } = await signIn.email({ email, password })
    setIsLoading(false);
    if (error) {
      setError(error?.message || "Error signing in.");
    }
    else {
      navigate('/')
    }
  }

  return (
    <div className="flex flex-col justify-between h-full p-5">

      {/* TOP */}

      <div className="flex flex-col gap-10 pt-10">

        <Logo />

        <p className="text-xl font-bold">Sign in to your account</p>
        <p className="text-muted-foreground">Enter your email below to sign in to your account</p>
        <div>
          <p className="mb-2">Email</p>
          <Input id="email" type="email" placeholder="m@example.com" required onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <div className="flex items-center">
            <p className="mb-2" >Password</p>
            <a href="#" className="ml-auto inline-block text-sm text-muted-foreground" > Forgot your password? </a>
          </div>
          <Input id="password" type="password" required onChange={e => setPassword(e.target.value)} />
        </div>
        {
          error &&
          <Alert variant={"destructive"}>
            <AlertCircleIcon />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error}
            </AlertDescription>
          </Alert>
        }
      </div>

      {/* BOTTOM */}

      <div className="flex flex-col gap-6">
        <Button size={"lg"} disabled={isLoading} type="submit" className="uppercase" onClick={handleSignIn} >
          {isLoading ? <>Loading <Loader className="animate-spin" /></> : <>Sign in</>}
        </Button>
        <Button size={"lg"} disabled={isLoading} variant="outline" type="button" className="uppercase">
          Sign in with Google
        </Button>
        <p className="text-center text-sm text-muted-foreground"> Don&apos;t have an account? <Link to={`/sign-up`}>Sign up</Link> </p>
      </div>

    </div>
  )
}