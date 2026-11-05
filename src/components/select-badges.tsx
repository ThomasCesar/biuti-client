import { Badge } from "./ui/badge";

export default function SelectBadges<T extends string>({ values, valueSelected, onSelect }: { values: readonly T[], valueSelected?: T, onSelect: React.Dispatch<React.SetStateAction<T>> }) {
  return (
    <div className="flex items-center justify-end flex-wrap gap-1">
      {values.map(v => <Badge variant={valueSelected === v ? "default" : "outline"} className="p-3 uppercase" key={v} onClick={() => onSelect(v)}>{v}</Badge>)}
    </div>
  )
}