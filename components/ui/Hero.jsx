"use client";

import { MotionInView, variants } from "@/utils/motion";
import { motion } from "motion/react";
import Image from "next/image";
import React from "react";
import Breadcrumbs from "../Breadcrumbs";
import Button from "./Button";
import Subtitle from "./Subtitle";
import Title from "./Title";

const Hero = ({ title, italic, text, subtitle, withImg = false }) => {
  return (
    <section className="relative mt-5">
      <div className="px-2.5 rounded-3lg bg-cover bg-center bg-[url('/images/hero-bg.png')]">
        <div
          className={`flex w-full ${
            !withImg
              ? "justify-center text-center py-[180px_120px]"
              : "py-[180px_75px]"
          }`}
        >
          <div className="lg:w-1/2 flex flex-col p-2.5 gap-2.5">
            {subtitle && <Subtitle tone="light">{subtitle}</Subtitle>}
            <Title as="h1" tone="light" italic={italic}>
              {title}
            </Title>
            {!withImg && (
              <div className="flex w-full justify-center">
                <Breadcrumbs light />
              </div>
            )}
            {withImg && (
              <>
                <MotionInView
                  as={motion.p}
                  v={variants.fadeRise}
                  viewport={{ once: true, amount: 0.1 }}
                  className="text-light"
                >
                  {text}
                </MotionInView>
                <MotionInView
                  as={motion.div}
                  v={variants.fadeRise}
                  viewport={{ once: true, amount: 0.2 }}
                  className="mt-[30px] flex flex-wrap gap-y-5 gap-x-[30px]"
                >
                  <Button>Contact Now</Button>
                  <Button variant="outline">My Services</Button>
                </MotionInView>
              </>
            )}
          </div>
          {withImg && (
            <div
              className="md:w-1/2 py-2.5 px-[100px_100px] flex bg-contain bg-no-repeat bg-[url('/images/hero_right.png')] relative"
              style={{ backgroundPosition: "top center" }}
            >
              <div
                className="absolute z-[1] inset-0 bg-contain bg-no-repeat bg-[url('/images/hero_right.png')]"
                style={{ backgroundPosition: "top center" }}
              />
              <div
                className="absolute z-[1] inset-0 bg-contain bg-no-repeat bg-[url('/images/hero_right.png')]"
                style={{ backgroundPosition: "top center" }}
              />
              <div className="text-center -mb-[85px] w-full relative z-[2]">
                <Image
                  width={500}
                  height={806}
                  src="/images/hero-img.png"
                  alt=""
                  className="w-full max-w-full object-cover aspect-[1/1.61]"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Hero;
