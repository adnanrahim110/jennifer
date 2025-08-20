"use client";

import { NAVIGATION_LINKS } from "@/constants";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Button from "../ui/Button";

const Header = () => {
  const path = usePathname();
  return (
    <header className="px-5 absolute left-0 z-[100] top-auto w-full">
      <div className="flex border-b border-b-[#F7F3ED1A] py-5 relative w-full flex-wrap items-center *:p-2.5">
        <div className="md:w-[15%]">
          <Link href="/">Jennifer</Link>
        </div>
        <div className="md:w-[64%]">
          <ul className="flex justify-center flex-wrap gap-1">
            {NAVIGATION_LINKS.map((link, idx) => (
              <li key={idx} className="relative">
                <Link
                  href={link.path}
                  className={cn(
                    "px-5 py-2.5 font-semibold leading-[1.2em] text-base text-white rounded-2md",
                    path === link.path
                      ? "bg-primary-600"
                      : "hover:bg-primary-600/40"
                  )}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="md:w-[21%] flex justify-end items-center">
          <Button>Buy The Book Now</Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
