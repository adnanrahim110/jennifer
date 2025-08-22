"use client";

import { MotionInView, variants } from "@/utils/motion";
import { motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const toTitle = (str) =>
  decodeURIComponent(str)
    .replace(/-/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());

export default function Breadcrumbs({ light = false }) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  if (segments.length === 0) return null;

  const baseClasses = light
    ? "text-light/80 hover:text-light"
    : "text-neutral-600 hover:text-neutral-900";
  const sepClasses = light ? "text-light/60" : "text-neutral-400";

  return (
    <MotionInView
      as={motion.nav}
      v={variants.fadeRise}
      viewport={{ once: true, amount: 0.5 }}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center text-lg gap-2">
        <li>
          <Link href="/" className={`${baseClasses} transition-colors`}>
            Home
          </Link>
        </li>
        {segments.map((seg, i) => {
          const href = "/" + segments.slice(0, i + 1).join("/");
          const isLast = i === segments.length - 1;
          return (
            <React.Fragment key={href}>
              <li className={sepClasses}>/</li>
              <li>
                {isLast ? (
                  <span className={light ? "text-light" : "text-neutral-800"}>
                    {toTitle(seg)}
                  </span>
                ) : (
                  <Link
                    href={href}
                    className={`${baseClasses} transition-colors`}
                  >
                    {toTitle(seg)}
                  </Link>
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </MotionInView>
  );
}
