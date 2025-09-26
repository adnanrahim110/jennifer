"use client";
import React, { useEffect, useRef, useState } from "react";

export default function Select({
  value = "",
  onChange,
  options = [],
  placeholder = "Select",
  invalid = false,
  inputRef, // optional: focus/scroll target
  className = "",
}) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const btnRef = useRef(null);
  const listRef = useRef(null);
  const controlRef = inputRef || btnRef; // expose to parent if provided

  useEffect(() => {
    const onDocClick = (e) => {
      if (!controlRef.current || !listRef.current) return;
      if (controlRef.current.contains(e.target)) return;
      if (listRef.current.contains(e.target)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [controlRef]);

  const onKeyDown = (e) => {
    if (
      !open &&
      (e.key === "Enter" || e.key === " " || e.key === "ArrowDown")
    ) {
      e.preventDefault();
      setOpen(true);
      setActive(
        Math.max(
          0,
          options.findIndex((o) => o === value)
        )
      );
      return;
    }
    if (!open) return;

    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((a) => (a + 1) % options.length);
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => (a - 1 + options.length) % options.length);
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const opt = options[active] ?? options[0];
      if (opt) {
        onChange(opt);
        setOpen(false);
      }
    }
  };

  const borderOk =
    "border border-zinc-200 focus:border-zinc-300 focus:ring-4 focus:ring-zinc-900/5";
  const borderBad = "border border-red-500 focus:ring-4 focus:ring-red-100";

  return (
    <div className={"relative " + className} onKeyDown={onKeyDown}>
      <button
        type="button"
        ref={controlRef}
        onClick={() => setOpen((v) => !v)}
        className={
          "flex w-full items-center justify-between rounded-2xl bg-white/80 px-3 py-2 shadow-[inset_0_1px_0_rgba(255,255,255,.6)] outline-none transition " +
          (invalid ? borderBad : borderOk)
        }
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={value ? "text-zinc-900" : "text-zinc-400"}>
          {value || placeholder}
        </span>
        <svg width="18" height="18" viewBox="0 0 24 24" className="opacity-70">
          <path
            d="M7 10l5 5 5-5"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
          />
        </svg>
      </button>

      {open && (
        <ul
          ref={listRef}
          role="listbox"
          tabIndex={-1}
          className="absolute z-50 mt-2 max-h-60 w-full overflow-auto rounded-2xl border border-zinc-200 bg-white/95 p-1 shadow-xl backdrop-blur"
        >
          {options.map((opt, i) => {
            const selected = value === opt;
            const activeRow = i === active;
            return (
              <li
                key={opt}
                role="option"
                aria-selected={selected}
                onMouseEnter={() => setActive(i)}
                onMouseDown={(e) => {
                  e.preventDefault();
                  onChange(opt);
                  setOpen(false);
                }}
                className={
                  "cursor-pointer rounded-xl px-3 py-2 text-sm " +
                  (activeRow ? "bg-zinc-100 " : "") +
                  (selected
                    ? "font-semibold text-zinc-900 "
                    : "text-zinc-700 hover:bg-zinc-50")
                }
              >
                {opt}
              </li>
            );
          })}
          {options.length === 0 && (
            <li className="px-3 py-2 text-sm text-zinc-500">No options</li>
          )}
        </ul>
      )}
    </div>
  );
}
