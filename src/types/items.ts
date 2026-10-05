import type { User } from "./main";

export type ItemCategory = 'Top' | 'Bottom' | 'Outerwear' | 'Footwear' | 'Accessory';

export type ItemType = 'T-shirt' | 'Pants' | 'Jacket' | 'Shirt' | 'Shoes' | 'Hat';

export type ItemMaterial = 'Cotton' | 'Wool' | 'Leather' | 'Synthetic';

export type Brand = {
  id: number,
  name: string,
  description: string,
  logo?: string,
  website?: string
}

export type Item = {
  id: number,
  name: string,
  image: string,
  description: string,
  userId?: string,
  user?: User
  brandId?: string,
  brand?: Brand
}