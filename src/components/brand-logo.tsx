import type { Brand } from "@/lib/brands";

export default function BrandLogo({ brand }: { brand: Brand }) {

  if (brand.logo) {
    return <div className="bg-white p-1 inline-block w-auto h-auto max-h-10 rounded-sm"><img src={brand.logo} className="max-w-30" /></div>
  }
  return <>{brand.name}</>
}