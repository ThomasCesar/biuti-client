import Logo from "../logo";
import AppLayout from "../app-layout";
import { Card, CardContent } from "../ui/card"

export default function HomePage() {

  return (
    <AppLayout>
      <div className="flex flex-col gap-10">
        <div className="flex justify-between">
          <Logo />
        </div>
        <div className="space-y-5">
          <Card>
            <CardContent>
              <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt, eum.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </AppLayout>




  )
}