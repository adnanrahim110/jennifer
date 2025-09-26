import React from "react";

export default function RadioGroup({ name, value, onChange, options = [] }) {
  return (
    <div className="flex flex-wrap items-center gap-4">
      {options.map((opt) => (
        <label key={opt} className="flex items-center gap-2 text-sm">
          <input
            type="radio"
            name={name}
            value={opt}
            checked={value === opt}
            onChange={(e) => onChange(e.target.value)}
            className="h-4 w-4 border-zinc-300 text-zinc-900 focus:ring-zinc-900/30"
          />
          <span>{opt}</span>
        </label>
      ))}
    </div>
  );
}
