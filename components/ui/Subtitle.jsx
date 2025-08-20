"use client";
import { cn } from "@/utils/cn";
import { MotionInView, variants } from "@/utils/motion";
import { motion } from "motion/react";
import React from "react";

/**
 * @typedef {'light'|'dark'} Tone
 * @typedef {Object} TitleProps
 * @property {import('react').ReactNode} children
 * @property {Tone} [tone='dark']
 */

/** @param {TitleProps} props */
const Subtitle = ({ children, tone = "dark", className }) => {
  const tones = {
    dark: {
      text: "text-dark",
      before: "before:bg-dark",
    },
    light: {
      text: "text-light",
      before: "before:bg-light",
    },
  };
  const t = tones[tone] || tones.light;
  return (
    <MotionInView
      as={motion.h3}
      v={variants.fadeRise}
      viewport={{ once: true }}
      className={cn(
        "text-lg font-normal leading-[1.2em] font-lora italic pl-[15px] inline-block relative",
        "before:absolute before:top-1/2 before:-translate-y-1/2 before:left-0 before:rounded-full before:size-1.5",
        t.text,
        t.before,
        className
      )}
    >
      {children}
    </MotionInView>
  );
};

export default Subtitle;
