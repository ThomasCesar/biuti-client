import { apiGETRequest } from "./api";
import { wait } from "./utils";
/**
 * Types n shit
 */
export type Brand = {
  id: string,
  name: string,
  description: string,
  logo?: string,
  website?: string,
  createdAt: string
}
/**
 * Get all brands
 */
export async function getBrands() {
  await wait();
  return await apiGETRequest<Brand[]>(`brands`)
}
