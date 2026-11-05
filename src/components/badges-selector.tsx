import { Badge } from "./ui/badge";

type BadgesSelectorProps<T> = {
  values: readonly T[],
  valueSelected?: T,
  onSelect: React.Dispatch<React.SetStateAction<T>>
}

export default function BadgesSelector<T extends string>({ values, valueSelected, onSelect }: BadgesSelectorProps<T>) {
  return (
    <div className="flex items-center justify-end flex-wrap gap-1">
      {values.map(v => <Badge variant={valueSelected === v ? "default" : "outline"} className="p-3 uppercase" key={v} onClick={() => onSelect(v)}>{v}</Badge>)}
    </div>
  )
}