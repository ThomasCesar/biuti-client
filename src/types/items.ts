import type { User } from "./main";


export type ItemMaterial = 'Cotton' | 'Wool' | 'Linen' | 'Leather' | 'Synthetic' | 'Mixed';

export type ItemType = 'Hat' | 'Jacket' | 'Shirt' | 'Pants' | 'Shoes' | 'Accessory';

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

