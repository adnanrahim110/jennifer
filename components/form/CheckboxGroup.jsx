import React from "react";
import Checkbox from "./Checkbox";

export default function CheckboxGroup({ value = [], onChange, options = [] }) {
  const toggle = (opt) => {
    const set = new Set(value);
    set.has(opt) ? set.delete(opt) : set.add(opt);
    onChange(Array.from(set));
  };

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((opt) => {
        const selected = value.includes(opt);
        return (
          <Checkbox
            key={opt}
            checked={selected}
            onChange={() => toggle(opt)}
            className={"transition " + (selected ? "scale-[.99]" : "")}
            label={
              <span
                className={
                  "inline-flex items-center rounded-full border px-3 py-1 text-xs transition " +
                  (selected
                    ? "border-zinc-900 bg-zinc-900 text-white shadow-sm"
                    : "border-zinc-300 bg-white/60 text-zinc-800 hover:bg-zinc-50")
                }
              >
                {opt}
              </span>
            }
          />
        );
      })}
    </div>
  );
}
