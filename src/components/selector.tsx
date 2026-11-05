import React from "react";

interface SelectorProps<T> {
  enumType: T; // The TypeScript enum
  onChange: (selectedKey: T[keyof T]) => void; // Callback when an option is selected
  value?: T[keyof T]; // Selected value, based on the enum type
  placeholder?: string; // Optional placeholder text
}

const Selector = <T extends Record<string, string>>({
  enumType,
  onChange,
  value,
  placeholder = "Select an option",
}: SelectorProps<T>) => {

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as T[keyof T]); // Pass the selected value to the parent
  };

  return (
    <select value={value} onChange={handleChange} className="select-class">
      <option value="">{placeholder}</option>
      {
        Object.entries(enumType)
          .map(([value, label]) => ({ value, label }))
          .map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
    </select>
  );
};

export default Selector;