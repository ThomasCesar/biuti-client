
import type { SelectRootChangeEventDetails } from "@base-ui/react/select";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "./ui/select";

export default function SelectFieldRow({ placeHolder, value, options, onValueChange }: { placeHolder: string, value?: any, options: readonly string[], onValueChange: (v: any, eventDetails: SelectRootChangeEventDetails) => void }) {
  return (
    <Select onValueChange={onValueChange} value={value} >
      <SelectTrigger className="w-full">
        <SelectValue placeholder={placeHolder} />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((option) => (
            <SelectItem key={option} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  )
}