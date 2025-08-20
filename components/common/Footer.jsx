"use client";
import { NAVIGATION_LINKS } from "@/constants";
import Link from "next/link";
import React from "react";
import { GoMail } from "react-icons/go";

const Footer = () => {
  return (
    <footer className="px-5 mb-5">
      <div className="rounded-3lg bg-[url('/images/hero-bg.png')] bg-center bg-cover bg-no-repeat px-2.5">
        <div className="flex flex-col gap-y-10 pt-[100px]">
          <div className="flex w-full">
            <div className="p-2.5 flex flex-col gap-[30px] md:w-1/2 pr-20">
              <div>Jennifer</div>
              <p className="text-light">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minus
                hic nulla maiores quos error perferendis?
              </p>
              <div className="flex w-full gap-x-10 gap-y-[30px]">
                <Link href="/" className="inline-block w-auto">
                  <div className="flex items-center">
                    <div className="grow-0 shrink-0 basis-auto relative">
                      <div className="inline-flex mr-[15px] size-[50px] text-2xl leading-12 justify-center items-center bg-primary-600 text-light rounded-full">
                        <GoMail />
                      </div>
                    </div>
                    <div>
                      <h3 className="mb-[5px] text-light text-xl">E-Mail Me</h3>
                      <p className="text-light">info@jennifer.com</p>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
            <div className="md:w-1/2 p-2.5 flex flex-col gap-[15px]">
              <h3 className="text-light text-xl">Subscribe My Newsletter</h3>
              <p className="text-light">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Alias,
                unde. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Aut, culpa.
              </p>
              <div className="mt-[15px]">
                <form>
                  <div className="flex rounded-2md has-focus-within:border-white/50 transition-all duration-300 ease-in-out border border-[#F7F3ED1A]">
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="rounded-r-none border-0 h-[50px] focus:border-white text-white placeholder:text-white/50"
                    />
                    <button
                      type="submit"
                      className="rounded-r-2md font-bold bg-primary-600 leading-none py-3 px-[17px] w-[124px] h-[50px] text-light hover:bg-dark"
                    >
                      Subscribe
                    </button>
                  </div>
                </form>
              </div>
              <div className="mt-[25px] flex gap-[15px] items-center justify-start flex-wrap"></div>
            </div>
          </div>
          <div className="py-5 flex items-center border-t border-t-[#F7F3ED1A]">
            <div className="md:w-1/2 flex p-2.5 items-start">
              <ul className="flex flex-wrap items-center gap-5">
                {NAVIGATION_LINKS.map((link, idx) => (
                  <li key={idx} className="relative">
                    <Link
                      href={link.path}
                      className="leading-normal text-light hover:text-white"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2 flex justify-end text-end">
              <p className="text-light">
                Copyright &copy; {new Date().getFullYear()}. All rights reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
