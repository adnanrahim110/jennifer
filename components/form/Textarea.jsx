import React from "react";

export default function Textarea({
  invalid = false,
  className = "",
  ...props
}) {
  const base =
    "w-full min-h-[110px] rounded-2xl bg-white/80 px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,.6)] outline-none transition placeholder:text-zinc-400 ";
  const ok =
    "border border-zinc-200 focus:border-zinc-300 focus:ring-4 focus:ring-zinc-900/5";
  const bad = "border border-red-500 focus:ring-4 focus:ring-red-100";
  return (
    <textarea
      {...props}
      className={base + (invalid ? bad : ok) + " " + className}
    />
  );
}
