import { AlertCircleIcon } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "./ui/alert"

export default function ErrorAlert({ error, ...props }: React.ComponentProps<"div"> & { error?: string | null }) {
  if (!error || error == '') {
    return <></>
  }
  return (
    <Alert variant={"destructive"} {...props}>
      <AlertCircleIcon />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        {error}
      </AlertDescription>
    </Alert>
  )
}