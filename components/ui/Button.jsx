"use client";

import { cn } from "@/utils/cn";
import { MotionInView, variants, viewportOnce20 } from "@/utils/motion";
import { motion } from "motion/react";
import Link from "next/link";
import React from "react";
import { FiArrowUpRight } from "react-icons/fi";

/**
 * @typedef {'button'| 'submit'} ButtonType
 * @typedef {'solid' | 'outline'} ButtonVariant
 * @typedef {'light' | 'dark'} ButtonTone
 * @typedef {Object} ButtonProps
 * @property {import('react').ReactNode} children
 * @property {ButtonType} [type='button']
 * @property {ButtonVariant} [variant='solid']
 * @property {ButtonTone} [tone='light']
 */

/**
 * @param {ButtonProps} props
 */

const Button = ({
  children,
  href,
  onClick,
  type = "button",
  disabled = false,
  icon = FiArrowUpRight,
  className,
  iconClassName,
  target,
  variant = "solid",
  tone = "light",
  small = false,
}) => {
  const Tag = href ? Link : "button";
  const Icon = icon;
  const isDisabled = !!disabled;

  const base =
    "font-bold leading-none rounded-[10px] overflow-hidden inline-flex items-center relative z-[1] cursor-pointer group";
  const beforeCommon =
    "before:absolute before:top-0 before:left-0 before:w-[150%] before:h-full before:-z-[1] " +
    "before:[transform:_rotate3d(0,0,1,-45deg)_translate3d(0,-3em,0)] before:origin-[0%_100%] " +
    "hover:before:[transform:rotate3d(0,0,1,0deg)] before:transition-all before:duration-300 before:ease-linear";

  const beforeBg =
    variant === "outline" ? "before:bg-primary-600" : "before:bg-light";

  const size = small
    ? "py-2.5 px-4 text-sm"
    : "py-3.5 pl-7 pr-[26px] text-base";

  const styles = {
    light: {
      solid: "bg-primary-600 text-white hover:text-neutral-800",
      outline: "bg-transparent border border-white text-white hover:text-light",
    },
    dark: {
      solid: "bg-neutral-900 text-white hover:text-neutral-800",
      outline:
        "bg-transparent border border-neutral-900 text-neutral-900 hover:text-light",
    },
  };

  const toneKey = styles[tone] ? tone : "light";
  const variantKey = styles[toneKey][variant] ? variant : "solid";

  return (
    <MotionInView
      as={motion.span}
      v={variants.fadeRise}
      viewport={viewportOnce20}
      className="inline-block"
    >
      <Tag
        {...(href
          ? { href, target, "aria-disabled": isDisabled }
          : { onClick, type, disabled: isDisabled })}
        className={cn(
          base,
          beforeCommon,
          beforeBg,
          size,
          styles[toneKey][variantKey],
          isDisabled && "opacity-50 pointer-events-none",
          className
        )}
      >
        <span className="relative z-[10] leading-none">{children}</span>
        <Icon
          className={cn(
            "ml-3.5 group-hover:rotate-45 transition-all duration-300 ease-linear",
            small ? "text-lg" : "text-2xl",
            iconClassName
          )}
        />
      </Tag>
    </MotionInView>
  );
};

export default Button;
