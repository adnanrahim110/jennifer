"use client";
import { cn } from "@/utils/cn";
import { MotionInView, variants } from "@/utils/motion";
import { motion } from "motion/react";
import Link from "next/link";
import React, { useState } from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import Subtitle from "../ui/Subtitle";
import Title from "../ui/Title";
import SVG from "../ui/svg";

const ServicesSec = () => {
  const [isActive, setIsActive] = useState(0);
  return (
    <section>
      <div>
        <div className="px-2.5 bg-cover bg-center bg-no-repeat bg-[url('/images/hero-bg.png')] rounded-3lg">
          <div className="flex flex-col items-center flex-wrap gap-y-10 gap-x-5 py-[100px]">
            <div className="flex flex-col items-center md:w-[850px] p-2.5 gap-2.5 mb-5 text-center">
              <Subtitle tone="light">treatments</Subtitle>
              <Title
                tone="light"
                as="h2"
                italic="Jennifer Richards’s kitchen to yours."
              >
                A curated collection of treatments to refresh your body and mind
              </Title>
            </div>
            <div className="p-2.5 flex flex-wrap gap-[30px] w-full">
              {[
                {
                  title: "Signature Facials",
                  text: "This treatment deeply cleanses, exfoliates, and hydrates the skin, leaving you with a radiant complexion.",
                  points: ["Skin Glow Renewal", "Brighter, healthier skin"],
                  svg: "trippleCircle",
                },
                {
                  title: "Therapeutic Massage",
                  text: "A relaxing massage that improves circulation, eases tension, and restores balance to the body.",
                  points: ["Stress relief", "Improved mobility"],
                  svg: "dice",
                },
                {
                  title: "Body Scrubs",
                  text: "Gentle exfoliation treatments that smooth the skin and lock in deep hydration.",
                  points: ["Smooth, glowing skin", "Lasting hydration"],
                  svg: "diamond",
                },
                {
                  title: "Reflexology",
                  text: "Targeted pressure therapy designed to encourage relaxation and overall wellbeing.",
                  points: ["Energy balance", "Holistic care"],
                  svg: "target",
                },
              ].map((item, idx) => (
                <MotionInView
                  as={motion.div}
                  v={variants.fadeRise}
                  duration={1}
                  key={idx}
                  viewport={{ once: true, amount: 0.5 }}
                  delay={idx * 0.15}
                  onMouseEnter={() => setIsActive(idx)}
                  className={cn(
                    "bg-light md:w-[calc(25%_-_22.5px)] flex flex-col relative overflow-hidden p-7 rounded-3lg gap-[30px]",
                    "before:absolute before:bg-primary-600 before:left-0 before:right-0 before:w-full before:transition-all before:duration-[450ms] before:ease-in-out",
                    isActive === idx
                      ? "before:top-0 before:h-full before:rounded-none"
                      : "before:top-full before:h-0 before:rounded-[999px_999px_0_0]"
                  )}
                >
                  <div className="relative z-[2]">
                    <div
                      className={cn(
                        "mb-6 size-[60px] text-[28px] inline-flex items-center justify-center rounded-full transition-all duration-[400ms] ease-in-out",
                        isActive === idx
                          ? "bg-light text-primary-600"
                          : "text-light bg-primary-600"
                      )}
                    >
                      <SVG className="size-[1em]" svg={item.svg} />
                    </div>
                  </div>
                  <div className="relative z-[2]">
                    <h3
                      className={cn(
                        "mb-[15px] text-lg transition-all duration-[400ms] ease-in-out",
                        isActive === idx ? "text-light" : "text-dark"
                      )}
                    >
                      {item.title}
                    </h3>
                    <p
                      className={cn(
                        "leading-[1.7em] transition-all duration-[400ms] ease-in-out",
                        isActive === idx && "text-light"
                      )}
                    >
                      {item.text}
                    </p>
                  </div>
                  <div className="relative z-[2]">
                    <ul>
                      {item.points.map((point, pointIdx) => (
                        <li
                          key={pointIdx}
                          className={cn(
                            "flex items-start first:mb-[15px] gap-1.5"
                          )}
                        >
                          <span
                            className={cn(
                              "transition-all duration-[400ms] ease-in-out flex relative top-1 text-lg",
                              isActive === idx
                                ? "text-light"
                                : "text-primary-600"
                            )}
                          >
                            <FaCheckCircle />
                          </span>
                          <span
                            className={cn(
                              "leading-normal transition-all duration-[400ms] ease-in-out",
                              isActive === idx && "text-light"
                            )}
                          >
                            {point}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="relative z-[2]">
                    <Link
                      href="/holistic-nutrition-evaluation"
                      className={cn(
                        "inline-flex items-center select-none font-bold leading-[1em] cursor-pointer relative z-[1] group",
                        isActive === idx ? "text-light" : "text-primary-700"
                      )}
                    >
                      <span>Start your Evaluation</span>
                      <span>
                        <FiArrowUpRight className="text-2xl ml-3.5 group-hover:rotate-45 transition-transform duration-[400ms]" />
                      </span>
                    </Link>
                  </div>
                </MotionInView>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSec;
