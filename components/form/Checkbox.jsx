import React from "react";

export default function Checkbox({ label, className = "", ...props }) {
  return (
    <label className={"inline-flex items-center gap-2 text-sm " + className}>
      <input
        type="checkbox"
        {...props}
        className="h-4 w-4 rounded border-zinc-300 text-zinc-900 outline-none focus:ring-4 focus:ring-zinc-900/15"
      />
      <span className="select-none">{label}</span>
    </label>
  );
}
