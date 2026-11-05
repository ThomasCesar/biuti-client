import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export type SelectorOption = {
  value: string | null,
  label: string
}

type SelectorProps = {
  options: SelectorOption[],
  value: string | null,
  onValueChange: (v: string | null) => void
}

export default function Selector({ options, value, onValueChange }: SelectorProps) {
  return (
    <Select items={options} defaultValue={value} onValueChange={onValueChange}>
      <SelectTrigger className="w-full max-w-48" >
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option.value} value={option.value} >
              {option.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>)
};