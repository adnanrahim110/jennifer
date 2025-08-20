"use client";
import { cn } from "@/utils/cn";
import { motion, useInView, useReducedMotion } from "motion/react";
import React from "react";

/**
 * @typedef {'h1'|'h2'|'h3'|'h4'|'h5'|'h6'} HeadingTag
 * @typedef {'light'|'dark'} Tone
 * @typedef {{ word: number, src: string, alt?: string, width?: number, height?: number, className?: string, ml?: string }} AfterMarker
 * @typedef {Object} TitleProps
 * @property {import('react').ReactNode} children
 * @property {HeadingTag} [as='h2']
 * @property {string} [italic='']
 * @property {string} [className='']
 * @property {Tone} [tone='dark']
 * @property {number} [stagger=0.02]
 * @property {number} [delay=0]
 * @property {number} [distance=12]
 * @property {number} [duration=0.9]
 * @property {AfterMarker[]} [after]
 * @property {(wordIndex:number, token:string) => import('react').ReactNode} [afterRender]
 */

const sizes = {
  h1: "text-6xl",
  h2: "text-[46px]",
  h3: "text-3xl",
  h4: "text-2xl",
  h5: "text-xl",
  h6: "text-lg",
};

const allowed = new Set(["h1", "h2", "h3", "h4", "h5", "h6"]);

function escapeRegExp(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function italicIndexSet(text, italic) {
  if (!italic) return new Set();
  const set = new Set();
  const re = new RegExp(escapeRegExp(italic), "g");
  let m;
  while ((m = re.exec(text)) !== null) {
    const start = m.index;
    const end = start + italic.length;
    for (let i = start; i < end; i++) set.add(i);
  }
  return set;
}

/** @param {TitleProps} props */
const Title = ({
  children,
  as = "h2",
  italic = "",
  className = "",
  tone = "dark",
  stagger = 0.02,
  delay = 0,
  distance = 12,
  duration = 0.9,
  after = [],
  afterRender,
}) => {
  const Tag = allowed.has(as) ? as : "h2";
  const text = typeof children === "string" ? children : String(children ?? "");
  const italics = italicIndexSet(text, italic);
  const reduce = useReducedMotion();

  const afterMap = React.useMemo(() => {
    const map = new Map();
    for (const m of after) {
      if (typeof m?.word !== "number") continue;
      const arr = map.get(m.word) || [];
      arr.push(m);
      map.set(m.word, arr);
    }
    return map;
  }, [after]);

  let absIndex = 0;
  let animIndex = 0;
  let wordIndex = 0;

  const easeOut = [0.22, 1, 0.36, 1];
  const tones = { dark: "text-dark", light: "text-light" };

  const ref = React.useRef(null);
  const inView = useInView(ref, {
    once: true,
    amount: 0.3,
    margin: "0px 0px -10% 0px",
  });

  const visible = { opacity: 1, x: 0 };
  const hidden = { opacity: 0, x: distance };

  const initialPose = reduce ? visible : hidden;
  const animatePose = reduce ? visible : inView ? visible : undefined;

  const getTransition = () =>
    reduce
      ? { duration: 0 }
      : { delay: delay + animIndex++ * stagger, duration, ease: easeOut };

  const renderAfter = (idx, token) => {
    const custom =
      typeof afterRender === "function" ? afterRender(idx, token) : null;
    const markers = afterMap.get(idx) || [];
    return (
      <>
        {custom}
        {markers.map((m, i) => (
          <motion.img
            key={`img-${idx}-${i}`}
            src={m.src}
            alt={m.alt ?? ""}
            width={m.width}
            height={m.height}
            initial={initialPose}
            animate={animatePose}
            transition={inView ? getTransition() : undefined}
            className={cn(
              "inline-block w-full max-w-[110px] rounded-[100px] border-2 shadow-[0_0_10px_0_#505B3533] transform-gpu will-change-transform",
              tone === "dark" ? "border-light" : "border-primary-600",
              m.ml ?? "ml-2",
              m.className
            )}
            loading="lazy"
            decoding="async"
          />
        ))}
      </>
    );
  };

  return (
    <Tag
      ref={ref}
      aria-label={text}
      className={cn(
        sizes[Tag],
        "font-semibold leading-[1.2em] tracking-[-0.02em]",
        tones[tone],
        className
      )}
    >
      {text.split(/(\s+)/).map((token, tIdx) => {
        const isSpace = /^\s+$/.test(token);
        if (isSpace) {
          absIndex += token.length;
          return token;
        }

        const wordKey = wordIndex;

        const wordNode = (
          <span key={`w-${tIdx}`} className="inline-block whitespace-nowrap">
            {Array.from(token).map((ch, cIdx) => {
              const isItalic = italics.has(absIndex);
              const node = (
                <motion.span
                  key={`c-${tIdx}-${cIdx}`}
                  initial={initialPose}
                  animate={animatePose}
                  transition={inView ? getTransition() : undefined}
                  className={cn(
                    "inline-block will-change-transform transform-gpu",
                    isItalic && "font-lora italic font-normal",
                    isItalic && tone === "dark" && "text-primary-700"
                  )}
                >
                  {ch}
                </motion.span>
              );
              absIndex += 1;
              return node;
            })}
          </span>
        );

        wordIndex += 1;

        return (
          <React.Fragment key={`wf-${tIdx}`}>
            {wordNode}
            {renderAfter(wordKey, token)}
          </React.Fragment>
        );
      })}
    </Tag>
  );
};

export default Title;
