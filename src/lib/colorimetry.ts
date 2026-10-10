import type { AnalysisResult, ColorSample, Season, SeasonPalette } from "@/types/colorimetry";
import { FlowerIcon, Leaf, Snowflake, Sun } from "lucide-react";
/**
 * -----------------------------------
 * All the colorimetry types / seasons
 */
export const SEASONS: Record<Season, SeasonPalette> = {
  Spring: {
    season: "Spring",
    subSeason: "True Spring",
    icon: FlowerIcon,
    description: "Warm, clear, and light — your colors are fresh and luminous like spring blossoms.",
    description_short: "Warm & bright",
    skinToneDescription: "Warm peachy-golden skin with golden or strawberry-blonde hair.",
    bestColors: [
      { name: "Peach Coral", hex: "#F4845F" },
      { name: "Warm Ivory", hex: "#F5ECD7" },
      { name: "Coral Red", hex: "#E05C4B" },
      { name: "Golden Yellow", hex: "#F2C46D" },
      { name: "Warm Teal", hex: "#4EADAA" },
      { name: "Lime Green", hex: "#8DC26F" },
      { name: "Warm Camel", hex: "#C99055" },
      { name: "Warm Pink", hex: "#E88C93" },
    ],
    avoidColors: [
      { name: "Navy Blue", hex: "#1B2A4A" },
      { name: "Pure Black", hex: "#111111" },
      { name: "Burgundy", hex: "#7B1D35" },
      { name: "Cool Gray", hex: "#8A929A" },
    ],
    neutrals: [
      { name: "Warm White", hex: "#FAF3E8" },
      { name: "Camel", hex: "#C9956B" },
      { name: "Light Tan", hex: "#E5C9A0" },
    ],
    characteristics: ["Warm undertone", "High clarity", "Light to medium depth", "Best in golden, peachy, and warm tones"],
  },
  Summer: {
    season: "Summer",
    subSeason: "True Summer",
    icon: Sun,
    description: "Cool, soft, and muted — your colors have a dusty, watercolor quality like summer haze.",
    description_short: "Cool & muted",
    skinToneDescription: "Cool pinkish or beige skin with ash blonde or light brown hair.",
    bestColors: [
      { name: "Dusty Rose", hex: "#C5859A" },
      { name: "Powder Blue", hex: "#8EB4D0" },
      { name: "Soft Lavender", hex: "#B8A9C9" },
      { name: "Mauve", hex: "#9B6E80" },
      { name: "Soft Teal", hex: "#6BA3A7" },
      { name: "Rose Pink", hex: "#D4859A" },
      { name: "Soft Navy", hex: "#4A6487" },
      { name: "Muted Sage", hex: "#8A9E8C" },
    ],
    avoidColors: [
      { name: "Bright Orange", hex: "#F05A22" },
      { name: "Pure White", hex: "#FFFFFF" },
      { name: "Rust", hex: "#A8432A" },
      { name: "Gold", hex: "#D4A017" },
    ],
    neutrals: [
      { name: "Soft White", hex: "#F5F0F0" },
      { name: "Greige", hex: "#C8BDB5" },
      { name: "Soft Charcoal", hex: "#5C6068" },
    ],
    characteristics: ["Cool undertone", "Low saturation", "Light to medium depth", "Best in muted, dusty, and cool tones"],
  },
  Autumn: {
    season: "Autumn",
    subSeason: "True Autumn",
    icon: Leaf,
    description: "Warm, rich, and muted — your colors are earthy and opulent like autumn foliage.",
    description_short: "Warm & deep",
    skinToneDescription: "Warm golden or olive skin with rich brown or auburn hair.",
    bestColors: [
      { name: "Burnt Sienna", hex: "#A0522D" },
      { name: "Forest Green", hex: "#3D6B4F" },
      { name: "Warm Rust", hex: "#B85C38" },
      { name: "Olive", hex: "#7A7833" },
      { name: "Deep Teal", hex: "#2E7D72" },
      { name: "Copper", hex: "#C67D4D" },
      { name: "Dark Gold", hex: "#B8902A" },
      { name: "Terracotta", hex: "#C4633A" },
    ],
    avoidColors: [
      { name: "Bright Pink", hex: "#E8559A" },
      { name: "Icy Blue", hex: "#A8C8E8" },
      { name: "Pure White", hex: "#FFFFFF" },
      { name: "Cool Gray", hex: "#8A929A" },
    ],
    neutrals: [
      { name: "Warm Cream", hex: "#F5E8C8" },
      { name: "Chocolate", hex: "#5C3A1E" },
      { name: "Caramel", hex: "#C08848" },
    ],
    characteristics: ["Warm undertone", "Low to medium saturation", "Medium to deep", "Best in earthy, spiced, and golden tones"],
  },
  Winter: {
    season: "Winter",
    subSeason: "True Winter",
    icon: Snowflake,
    description: "Cool, clear, and high contrast — your colors are vivid and dramatic like winter frost.",
    description_short: "Cool & vivid",
    skinToneDescription: "Cool porcelain, olive, or deep skin with dark or highly contrasting features.",
    bestColors: [
      { name: "True Red", hex: "#CC2222" },
      { name: "Royal Blue", hex: "#1A45A8" },
      { name: "Emerald", hex: "#1B6B45" },
      { name: "Fuchsia", hex: "#C42B8C" },
      { name: "Pure White", hex: "#F8F8F8" },
      { name: "Black", hex: "#1A1A1A" },
      { name: "Icy Pink", hex: "#E8A8C0" },
      { name: "Deep Purple", hex: "#4A1A7A" },
    ],
    avoidColors: [
      { name: "Orange", hex: "#E87020" },
      { name: "Warm Beige", hex: "#D4B896" },
      { name: "Gold", hex: "#D4A017" },
      { name: "Muted Olive", hex: "#6B6B20" },
    ],
    neutrals: [
      { name: "Pure White", hex: "#F8F8F8" },
      { name: "Charcoal", hex: "#3A3A3A" },
      { name: "Icy Gray", hex: "#C0C4CC" },
    ],
    characteristics: ["Cool undertone", "High saturation", "Deep or light with high contrast", "Best in clear, vivid, and contrasting tones"],
  },
};
/**
 * -----------------------------------
 * Convert color codes from RGB to HEX
 */
function rgbToHex(r: number, g: number, b: number): string {
  return `#${[r, g, b].map(v => v.toString(16).padStart(2, "0")).join("")}`;
}
/**
 * -----------------------------------
 * Extract skin tones
 */
function extractSkinTone(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D): ColorSample {
  const w = canvas.width;
  const h = canvas.height;
  // Sample from center region where face is most likely
  const startX = Math.floor(w * 0.3);
  const endX = Math.floor(w * 0.7);
  const startY = Math.floor(h * 0.15);
  const endY = Math.floor(h * 0.55);

  const imageData = ctx.getImageData(startX, startY, endX - startX, endY - startY);
  const data = imageData.data;

  let rSum = 0, gSum = 0, bSum = 0, count = 0;

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i], g = data[i + 1], b = data[i + 2];
    // Filter for skin-like pixels: reddish/brownish tones
    if (r > 60 && r > g && r > b && (r - g) > 5 && (r - b) > 5) {
      rSum += r; gSum += g; bSum += b; count++;
    }
  }

  if (count === 0) {
    // Fallback: average center region
    for (let i = 0; i < data.length; i += 4) {
      rSum += data[i]; gSum += data[i + 1]; bSum += data[i + 2]; count++;
    }
  }

  return {
    r: Math.round(rSum / count),
    g: Math.round(gSum / count),
    b: Math.round(bSum / count),
  };
}
/**
 * -----------------------------------
 * Classify undertones
 */
function classifyUndertone(skin: ColorSample): "Warm" | "Cool" | "Neutral" {
  // Warm: more red/yellow (r > b, and yellow tones)
  // Cool: more blue/pink (b relatively higher)
  const warmScore = skin.r - skin.b;
  const yellowScore = skin.g - skin.b;
  if (warmScore > 30 && yellowScore > 10) return "Warm";
  if (warmScore < 15 || skin.b > skin.g - 5) return "Cool";
  return "Neutral";
}
/**
 * -----------------------------------
 * Classify lightness
 */
function classifyLightness(skin: ColorSample): "Light" | "Medium" | "Deep" {
  const luminance = 0.299 * skin.r + 0.587 * skin.g + 0.114 * skin.b;
  if (luminance > 170) return "Light";
  if (luminance > 100) return "Medium";
  return "Deep";
}
/**
 * -----------------------------------
 * Find season output
 */
function determineSeason(undertone: "Warm" | "Cool" | "Neutral", lightness: "Light" | "Medium" | "Deep"): Season {
  if (undertone === "Warm") return lightness === "Deep" ? "Autumn" : "Spring";
  if (undertone === "Cool") return lightness === "Light" ? "Summer" : "Winter";
  return lightness === "Light" ? "Summer" : "Autumn";
}
/**
 * -----------------------------------
 * Main usable method to launch colorimetry 
 * analysis
 */
export async function analyzePhoto(photoUrl: string): Promise<AnalysisResult> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const maxSize = 400;
      const scale = Math.min(maxSize / img.width, maxSize / img.height, 1);
      canvas.width = img.width * scale;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const skin = extractSkinTone(canvas, ctx);
      const undertone = classifyUndertone(skin);
      const lightness = classifyLightness(skin);
      const contrast = skin.r - skin.b > 60 || (255 - (0.299 * skin.r + 0.587 * skin.g + 0.114 * skin.b)) > 140
        ? "High" : skin.r - skin.b > 25 ? "Medium" : "Low";
      const season = determineSeason(undertone, lightness);

      URL.revokeObjectURL(photoUrl);
      resolve({
        dominantSkinTone: skin,
        skinHex: rgbToHex(skin.r, skin.g, skin.b),
        palette: SEASONS[season],
        undertone,
        lightness,
        contrast,
      });
    };

    img.onerror = () => reject(new Error("Failed to load image"));
    img.src = photoUrl;
  });
}
