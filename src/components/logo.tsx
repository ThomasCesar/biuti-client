import { Star } from "lucide-react";


export default function Logo() {
  return (
    <div>
      <div className="inline-block w-auto relative">
        <span className="text-6xl font-display bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">Velune</span>
        <Star className="absolute top-0 -right-3 fill-pink-600 stroke-pink-600" size={20} />
      </div>
    </div>
  )
}