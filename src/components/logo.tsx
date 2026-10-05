
import { Shirt } from 'lucide-react';

export default function Logo() {
  return <div className="flex gap-2 items-center">
    <Shirt className="stroke-pink-600" size={30} />
    <span className="text-3xl font-black tracking-widest text-shadow-md text-shadow-pink-600/50">BIUTI</span>
  </div>
}