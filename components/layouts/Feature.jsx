"use client";
import { cn } from "@/utils/cn";
import { MotionInView, variants, viewportOnce20 } from "@/utils/motion";
import { motion } from "motion/react";
import React, { useState } from "react";
import Subtitle from "../ui/Subtitle";
import Title from "../ui/Title";

const Feature = () => {
  const [isActive, setisActive] = useState(null);
  return (
    <section className="px-2.5">
      <div className="py-[100px] flex flex-col items-center w-full gap-y-10 gap-x-5">
        <div className="p-2.5 md:w-[850px] flex items-center flex-col gap-2.5 mb-5 text-center">
          <Subtitle>Secrets to Success</Subtitle>
          <Title
            as="h2"
            italic="Seasonal Scones more than just a cookbook"
            after={[{ word: 3, src: "/images/feature-title-img.jpg" }]}
          >
            Discover the unique touches that make Seasonal Scones more than just
            a cookbook
          </Title>
        </div>
        <div className="p-2.5 flex gap-[30px] w-full">
          {[
            {
              span: "Seasonal Inspiration",
              text: "Organized by spring, summer, autumn, and winter, every recipe captures the flavors, colors, and moods of the season.",
              title: "",
              bg: "icon-feature-1.svg",
            },
            {
              span: "Inclusive Baking",
              text: "Each recipe includes easy swaps for gluten-free, dairy-free, and egg-free baking so everyone can enjoy.",
              title: "",
              bg: "icon-feature-2.svg",
            },
            {
              span: "Step-by-Step Confidence",
              text: "Clear methods, practical pantry tips, and pro techniques guide you toward tender, golden scones every time.",
              title: "",
              bg: "icon-feature-3.svg",
            },
            {
              span: "Stories & Tradition",
              text: "Beyond recipes, Jennifer shares the history, pairings, and personal stories that make baking a ritual, not just a task.",
              title: "",
              bg: "icon-feature-4.svg",
            },
          ].map((itm, idx) => {
            const active = isActive === idx;
            return (
              <MotionInView
                as={motion.div}
                v={variants.fadeRise}
                viewport={{ once: true, amount: 0.5 }}
                key={idx}
                delay={idx * 0.15}
                className="md:w-[calc(25%_-_22.5px)]"
              >
                <div
                  onMouseEnter={() => setisActive(idx)}
                  className={cn(
                    "h-full bg-light bg-no-repeat p-8 2xl:p-10 pt-[135px] 2xl:pt-[130px] rounded-3lg relative overflow-hidden cursor-pointer",
                    "before:bg-primary-600 before:absolute before:left-0 before:w-full before:transition-all before:duration-[450ms] before:ease-in-out before:[background-size:101%_101%]",
                    active
                      ? "before:top-0 before:h-full before:rounded-none"
                      : "before:top-full before:h-0 before:rounded-[500px_500px_0_0]"
                  )}
                  style={{
                    backgroundImage: `url(/images/elements/${itm.bg})`,
                    backgroundSize: "100px auto",
                    backgroundPosition: "right -20px top -20px",
                  }}
                >
                  <div className="relative z-[2]">
                    <p
                      className={cn(
                        "mb-5 transition-all duration-[400ms] ease-in-out",
                        active && "text-light"
                      )}
                    >
                      {itm.text}
                    </p>
                    {/* <h3
                      className={cn(
                        "text-xl font-semibold transition-all duration-[400ms] ease-in-out",
                        active && "text-light"
                      )}
                    >
                      {itm.title}
                    </h3> */}
                  </div>
                  <div className="absolute z-[2] top-10 left-10">
                    <span className="bg-light text-dark py-2 px-[15px] text-sm leading-[1.2em] border border-[#5A50441A] rounded-[100px]">
                      {itm.span}
                    </span>
                  </div>
                </div>
              </MotionInView>
            );
          })}
        </div>
        <div className="p-2.5 md:w-[1050px] justify-center flex flex-wrap gap-y-10 gap-x-[30px]">
          {[
            "10+ year of holistic spa",
            "5000+ happy clients",
            "98% satisfition rate",
            "30+ treatment tailored",
            "7 Days a week open",
            "500+ customized wellness plan",
          ].map((item, idx) => (
            <MotionInView
              as={motion.div}
              v={variants.fadeRise}
              duration={1}
              key={idx}
              viewport={viewportOnce20}
              delay={idx * 0.15}
              className="relative w-auto"
            >
              <div className="py-2.5 px-6 border border-[#5A50441A] rounded-[100px] leading-[1em]">
                {item}
              </div>
            </MotionInView>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Feature;
