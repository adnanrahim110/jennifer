"use client";

import { NAVIGATION_LINKS } from "@/constants";
import { cn } from "@/utils/cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Button from "../ui/Button";

const Header = () => {
  const path = usePathname();

  const isActive = (href) => {
    const normalize = (p) => (p && p !== "/" ? p.replace(/\/+$/, "") : "/");
    const cur = normalize(path);
    const link = normalize(href);

    if (link === "/") return cur === "/";

    const blogBases = ["/blog", "/blogs"];
    if (blogBases.includes(link)) {
      if (cur === link) return true;
      return blogBases.some((b) => cur.startsWith(`${b}/`));
    }

    return cur === link || cur.startsWith(`${link}/`);
  };
  return (
    <header className="px-5 absolute left-0 z-[100] top-auto w-full">
      <div className="flex border-b border-b-[#F7F3ED1A] py-1 relative w-full flex-wrap items-center *:p-2.5 mx-auto md:max-w-[1480px]">
        <div className="md:w-[15%] pb-1!">
          <Link href="/">
            <img src="/images/logo-w.png" alt="" />
          </Link>
        </div>
        <div className="md:w-[64%]">
          <ul className="flex justify-center flex-wrap gap-1">
            {NAVIGATION_LINKS.map((link, idx) => (
              <li key={idx} className="relative">
                <Link
                  href={link.path}
                  className={cn(
                    "px-5 py-2.5 font-semibold leading-[1.2em] text-base text-white rounded-2md",
                    isActive(link.path)
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
          <Button href="https://amazon.com/dp/B0FKZ6PQKJ" target="_blank">
            Buy The Book Now
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
