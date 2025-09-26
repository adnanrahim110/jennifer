import { cn } from "@/utils/cn";
import React from "react";

/**
 * @typedef {'light'|'warning'} Type
 * @typedef {Object} TitleProps
 * @property {import('react').ReactNode} children
 * @property {Type} [type='light']
 */

/** @param {TitleProps} props */
export default function SectionCard({
  title,
  children,
  className,
  type = "light",
}) {
  const types = {
    light: {
      bg: "bg-white/70",
      border: "border-zinc-200/70",
      title: "text-dark",
    },
    warning: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      title: "text-amber-900",
    },
  };

  const ty = types[type] || types.light;

  return (
    <div
      className={cn(
        "w-full md:w-[1024px] rounded-3xl border p-5 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,.04)] backdrop-blur",
        ty.bg,
        ty.border,
        className
      )}
    >
      {title && (
        <h3
          className={cn(
            "mb-4 text-xl md:text-2xl font-semibold tracking-tight",
            ty.title
          )}
        >
          {title}
        </h3>
      )}
      {children}
    </div>
  );
}
