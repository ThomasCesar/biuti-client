import type { LucideIcon } from "lucide-react";

export interface ColorSample {
  r: number;
  g: number;
  b: number;
}

export type Color = { name: string; hex: string };

export type Season = "Spring" | "Summer" | "Autumn" | "Winter";
export type SubSeason =
  | "Light Spring" | "True Spring" | "Warm Spring"
  | "Light Summer" | "True Summer" | "Soft Summer"
  | "Soft Autumn" | "True Autumn" | "Dark Autumn"
  | "Dark Winter" | "True Winter" | "Bright Winter";

export interface SeasonPalette {
  season: Season;
  subSeason: SubSeason;
  icon: LucideIcon;
  description: string;
  description_short: string;
  skinToneDescription: string;
  bestColors: Color[];
  avoidColors: Color[];
  neutrals: Color[];
  characteristics: string[];
}

export interface AnalysisResult {
  dominantSkinTone: ColorSample;
  skinHex: string;
  palette: SeasonPalette;
  undertone: "Warm" | "Cool" | "Neutral";
  lightness: "Light" | "Medium" | "Deep";
  contrast: "Low" | "Medium" | "High";
}