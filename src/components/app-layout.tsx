import { CircleUserRound, Home, MirrorRound, Shirt, type LucideIcon } from "lucide-react"
import { NavLink } from "react-router";

type App = {
  label: string,
  icon: LucideIcon,
  page: string
}
const apps: App[] = [
  { label: "Home", icon: Home, page: '' },
  { label: "Wardrobe", icon: Shirt, page: 'wardrobe' },
  { label: "Try on", icon: MirrorRound, page: 'tryon' },
  { label: "Account", icon: CircleUserRound, page: 'account' }
]

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col justify-between h-screen">

      {/* To & content */}

      <div className="flex-1 overflow-auto px-3 py-5">
        {children}
      </div>

      {/* Footer buttons */}

      <div className="bg-accent/50 border-t px-2 py-5">
        <div className="flex gap-2 justify-between">
          {apps.map(app => (
            <NavLink
              key={app.label}
              to={`/${app.page}`}
              className={({ isActive }) => isActive ? "flex-1 flex flex-col items-center gap-1" : "flex-1 flex flex-col items-center gap-1 opacity-45"}
            >
              <app.icon className="h-6 w-6 stroke-muted-foreground" />
              <p className="text-xs">{app.label}</p>
            </NavLink>
          ))}
        </div>
      </div>

    </div>
  );

}