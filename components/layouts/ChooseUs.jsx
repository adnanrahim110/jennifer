"use client";
import { MotionInView, variants } from "@/utils/motion";
import { motion } from "motion/react";
import Image from "next/image";
import React from "react";
import Subtitle from "../ui/Subtitle";
import Title from "../ui/Title";
import SVG from "../ui/svg";

const ChooseUs = () => {
  return (
    <section className="px-2.5">
      <div className="flex w-full items-center flex-wrap pb-[100px]">
        <div className="p-2.5 flex flex-col gap-2.5 items-start md:w-1/2">
          <Subtitle>Trust Seasonal Scones</Subtitle>
          <div className="mb-2.5">
            <Title italic="wellness and care">
              baking with heart and intention
            </Title>
          </div>
          <div>
            <MotionInView
              as={motion.p}
              v={variants.fadeRise}
              viewport={{ once: true, amount: 0.5 }}
            >
              From seasonal flavors to allergy-friendly swaps, Jennifer Richards
              brings warmth, clarity, and tradition to every page. Readers know
              they’ll find recipes that are both approachable and deeply
              meaningful.
            </MotionInView>
          </div>
          <div className="flex w-full flex-col pt-10 mt-[30px] gap-y-10 border-t border-[#5A50441A]">
            {[
              {
                title: "Rooted in the Seasons",
                text: "Each chapter reflects spring, summer, autumn, and winter, offering flavors that match the rhythm of nature.",
                icon: "dice",
              },
              {
                title: "Inclusive & Adaptable",
                text: "Gluten-free, dairy-free, and egg-free options ensure every baker can share in the joy.",
                icon: "diamond",
              },
            ].map((item, idx) => (
              <MotionInView
                as={motion.div}
                v={variants.fadeRise}
                viewport={{ once: true, amount: 0.5 }}
                key={idx}
                delay={idx * 0.15}
                className="flex"
              >
                <div className="md:w-[35%] max-w-full relative">
                  <div className="flex items-center pr-5">
                    <div className="grow-0 shrink-0 basis-auto">
                      <div className="mr-5 flex size-[50px] text-2xl rounded-full bg-primary-600 text-light items-center justify-center">
                        <SVG svg={item.icon} className="size-[1em]" />
                      </div>
                    </div>
                    <h3 className="text-xl leading-[1.3em]">{item.title}</h3>
                  </div>
                </div>
                <div className="md:w-[65%] max-w-full relative pl-5 border-l border-[#5A50441A]">
                  {item.text}
                </div>
              </MotionInView>
            ))}
          </div>
        </div>
        <div className="p-2.5 md:w-1/2 pl-5">
          <div className="flex px-[85px] pb-[50px] flex-col relative">
            <MotionInView
              as={motion.div}
              v={variants.fadeInRight}
              viewport={{ once: true, amount: 0.5 }}
              className="text-center border border-transparent rounded-[999px]"
            >
              <Image
                width={454}
                height={640}
                src="/images/why-choose.png"
                alt="Why Choose Us"
                className="size-full rounded-[999px] object-cover aspect-[1/1.43]"
              />
            </MotionInView>
            <MotionInView
              as={motion.div}
              v={variants.fadeRise}
              viewport={{ once: true, amount: 0.2 }}
              delay={0.2}
              className="md:size-[180px] left-1/2 absolute flex items-center bottom-0 z-[1] -translate-x-1/2"
            >
              <div className="max-w-full bg-primary-600 bg-[url('/images/elements/arrow.svg')] p-[22px] bg-center bg-no-repeat [background-size:14%_auto] border-[3px] border-white rounded-full size-[180px] font-lora text-[32px] font-medium leading-[1.2em] tracking-[4.1px] animate-spin [animation-duration:25s] relative">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="250.5"
                    height="250.5"
                    viewBox="0 0 250.5 250.5"
                    className="h-auto max-w-full overflow-visible w-[180px] [word-spacing:4px] align-middle"
                  >
                    <path
                      className="[vector-effect:non-scaling-stroke] fill-transparent stroke-transparent"
                      d="M.25,125.25a125,125,0,1,1,125,125,125,125,0,0,1-125-125"
                      id="e-path-25dec2a"
                    ></path>
                    <text className="fill-white [direction:ltr]">
                      <textPath
                        id="e-text-path-25dec2a"
                        href="#e-path-25dec2a"
                        startOffset="0%"
                      >
                        Contact Us * Contact Us * Contact Us *{" "}
                      </textPath>
                    </text>
                  </svg>
                </div>
              </div>
            </MotionInView>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChooseUs;
