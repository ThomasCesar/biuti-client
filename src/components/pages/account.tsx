import Header from "../header";
import { Link } from "react-router";
import AppLayout from "../app-layout";
import { Button } from "../ui/button";
import React, { useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { ThemeToggle } from "../theme-toggle";
import { Card, CardContent } from "../ui/card";
import { Loader, LogOut, SquarePen } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";


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

  const { logout } = useAuth();

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
            <div className="flex gap-3">
              <Avatar size="lg">
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="space-y-0">
                <p className="">Johnny john smith the 2nd</p>
                <p className="text-muted-foreground">jjsmith@gmail.com</p>
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