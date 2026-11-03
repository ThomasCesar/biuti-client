
import { useState } from "react"
import { signUp } from "@/lib/auth"
import Logo from "@/components/logo"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Link, useNavigate } from "react-router"
import { Checkbox } from "@/components/ui/checkbox"
import { AlertCircleIcon, ArrowLeft, Loader } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function SignUpPage() {

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async () => {
    setError(null);
    setIsLoading(true);
    const { error } = await signUp.email({ name, email, password })
    setIsLoading(false);
    if (error) {
      setError(error?.message || "Error creating your account.");
    }
    else {
      navigate('/welcome')
    }
  }

  return (
    <div className="flex flex-col justify-between h-full p-5">

      {/* TOP */}
      <div className="flex flex-col gap-6 pt-10">
        <Logo />
        <Link to={'/sign-in'}>
          <Button variant={"outline"}>
            <ArrowLeft />
            Cancel, Back to Sign In
          </Button>
        </Link>
        <p className="text-xl font-bold">Create your account</p>
        <div>
          <p className="mb-2">Your name</p>
          <Input type="name" placeholder="Your name" required onChange={e => setName(e.target.value)} />
        </div>
        <div>
          <p className="mb-2">Your email</p>
          <Input type="email" placeholder="m@example.com" required onChange={e => setEmail(e.target.value)} />
        </div>
        <div>
          <p className="mb-2" >Choose a password</p>
          <Input id="password" type="password" required onChange={e => setPassword(e.target.value)} />
        </div>
        <div className="flex border gap-4 rounded-md p-4">
          <Checkbox className="mt-2" />
          <div className="space-y-1">
            <p className="">Accept stuff and shit</p>
            <p className="text-sm text-muted-foreground">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Expedita, quasi?</p>
          </div>
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
        <Button size={"lg"} disabled={isLoading} type="submit" className="uppercase" onClick={handleSignUp} >{isLoading ? <>Loading <Loader className="animate-spin" /></> : <>Sign up</>}</Button>
        <Button size={"lg"} disabled={isLoading} variant="outline" type="button" className="uppercase"> Sign up with Google </Button>
      </div>

    </div>
  )
}