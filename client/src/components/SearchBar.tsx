// src/components/SearchBar.tsx
import { ChangeEvent } from "react";
import clsx from "clsx";

type Props = {
  value: string;
  onChange: (val: string) => void;
  placeholder?: string;
  className?: string;
};

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search by name...",
  className,
}: Props) {
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    onChange(e.target.value);
  }

  return (
    <div className={clsx("relative", className)}>
      <input
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        className="input pl-9"
      />
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
        🔎
      </span>
    </div>
  );
}
