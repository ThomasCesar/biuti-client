import { createContext } from "react"

export type Theme = "dark" | "light" | "system"

type ThemeContextProps = {
  theme: Theme
  setTheme: (theme: Theme) => void
}

const initialState: ThemeContextProps = {
  theme: "system",
  setTheme: () => null,
}

export const ThemeContext = createContext<ThemeContextProps>(initialState)
