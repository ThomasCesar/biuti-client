export { cn } from "cn"


export function wait(milliseconds: number = 1) {
  return new Promise(resolve => setTimeout(resolve, milliseconds < 100 ? milliseconds * 1000 : milliseconds));
}