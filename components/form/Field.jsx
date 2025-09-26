import React from "react";

export default function Field({
  label,
  htmlFor,
  hint,
  error,
  children,
  required,
}) {
  return (
    <div className="space-y-2">
      {label && (
        <label
          htmlFor={htmlFor}
          className="block text-sm font-semibold tracking-tight text-zinc-900"
        >
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      {children}
      {hint && <p className="text-xs text-zinc-500">{hint}</p>}
      {error && <p className="text-xs text-red-600">{error}</p>}
    </div>
  );
}
