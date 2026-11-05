export { cn } from "cn"

/**
 * Just wait
 */
export function wait(milliseconds: number = 1) {
  return new Promise(resolve => setTimeout(resolve, milliseconds < 100 ? milliseconds * 1000 : milliseconds));
}
/**
 * Random item from array
 */
export function getRandomElementInArray<T>(theArray: T[]): T {
  return theArray[Math.floor(Math.random() * theArray.length)];
}