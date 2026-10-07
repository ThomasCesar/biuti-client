import type { User } from "./main";


export const allItemTypes = ["Accessory", "Hat", "Jacket", "Pants", "Shirt", "Shoes"] as const;
export type ItemType = typeof allItemTypes[number];


export const allItemMaterials = ["Cotton", "Leather", "Linen", "Mixed", "Synthetic", "Wool"] as const;
export type ItemMaterial = typeof allItemMaterials[number];

export type Item = {
  id: string,
  name: string,
  image: string,
  description: string,
  material: ItemMaterial,
  type: ItemType,
  user?: User
  userId?: string,
  brand?: Brand
  brandId?: string,
  createdAt: string
}

export type Brand = {
  id: number,
  name: string,
  description: string,
  logo?: string,
  website?: string,
  createdAt: string
}

