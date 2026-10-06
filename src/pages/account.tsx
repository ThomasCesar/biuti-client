import { Link } from "react-router";
import React, { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { Loader, LogOut, SquarePen } from "lucide-react";
import Header from "@/components/header";
import { Card, CardContent } from "@/components/ui/card";
import AppLayout from "@/components/app-layout";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";


function SettingsCard({ children }: { children: React.ReactNode }) {
  return (
    <Card>
      <CardContent className="flex justify-between gap-5 items-center">
        {children}
      </CardContent>
    </Card>
  )
}


export default function AccountPage() {

  const [isLoading, setIsLoading] = useState(false);

  const { user, logout } = useAuth();

  const handleLogout = async () => {
    setIsLoading(true);
    await logout();
  }

  return (
    <AppLayout>
      <div className="space-y-5">
        <Header text="Account" />
        <div className="space-y-5 pb-5">
          {/* ------- */}
          <SettingsCard>
            <div className="flex gap-3 min-w-0 ">
              <Avatar size="lg">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="space-y-0 flex-1 overflow-hidden">
                <p className="w-full overflow-hidden text-ellipsis text-nowrap">{user?.name}</p>
                <p className="text-muted-foreground w-full overflow-hidden text-ellipsis text-nowrap">{user?.mail}</p>
              </div>
            </div>
            <Link to={'/'}>
              <Button variant={"outline"} >
                Edit
                <SquarePen />
              </Button>
            </Link>
          </SettingsCard>
          {/* ------- */}
          <SettingsCard>
            <div className="space-y-1">
              <p>Dark mode</p>
              <p className="text-muted-foreground">What do you prefer ?</p>
            </div>
            <ThemeToggle />
          </SettingsCard>
          {/* ------- */}
          <SettingsCard>
            <div className="space-y-1">
              <p>Log out</p>
              <p className="text-muted-foreground">Log out from this shit.</p>
            </div>
            <Button variant={"outline"} onClick={handleLogout}>
              {
                isLoading ?
                  <Loader className="animate-spin" /> :
                  <>Log out<LogOut /></>
              }
            </Button>
          </SettingsCard>
        </div>
      </div>
    </AppLayout>
  );
}