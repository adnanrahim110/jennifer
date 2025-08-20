"use client";
import { MotionInView, variants } from "@/utils/motion";
import { motion } from "motion/react";
import React from "react";
import Button from "../ui/Button";
import Subtitle from "../ui/Subtitle";
import Title from "../ui/Title";
import SVG from "../ui/svg";

const WhatWeDo = () => {
  return (
    <section>
      <div className="px-2.5 bg-light rounded-3lg">
        <div className="flex py-[100px] w-full">
          <div className="md:w-1/2 p-2.5 pr-[35px] flex">
            <div className="flex flex-col gap-2.5 items-start">
              <Subtitle>What we do</Subtitle>
              <div className="mb-2.5">
                <Title italic="ultimate comfort">
                  Thoughtfully designed for your ultimate comfort
                </Title>
              </div>
              <div className="mb-[30px]">
                <MotionInView
                  as={motion.p}
                  v={variants.fadeRise}
                  viewport={{ once: true, amount: 0.5 }}
                >
                  Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                  Facere nisi nesciunt unde? Odio, consectetur cumque!
                </MotionInView>
              </div>
              <div>
                <Button>Contact now</Button>
              </div>
            </div>
          </div>
          <div className="md:w-1/2 p-2.5 flex flex-wrap gap-[50px_30px]">
            {[
              {
                title: "Tranquil Ambience",
                text: "Clean, sanitized spaces that meet the highest standards of spa hygiene.",
                icon: "note",
              },
              {
                title: "Tranquil Ambience",
                text: "Clean, sanitized spaces that meet the highest standards of spa hygiene.",
                icon: "clock",
              },
              {
                title: "Tranquil Ambience",
                text: "Clean, sanitized spaces that meet the highest standards of spa hygiene.",
                icon: "stack",
              },
              {
                title: "Tranquil Ambience",
                text: "Clean, sanitized spaces that meet the highest standards of spa hygiene.",
                icon: "cube",
              },
              {
                title: "Tranquil Ambience",
                text: "Clean, sanitized spaces that meet the highest standards of spa hygiene.",
                icon: "target",
              },
              {
                title: "Tranquil Ambience",
                text: "Clean, sanitized spaces that meet the highest standards of spa hygiene.",
                icon: "focus",
              },
            ].map((item, idx) => (
              <MotionInView
                as={motion.div}
                v={variants.fadeRise}
                viewport={{ once: true, amount: 0.5 }}
                delay={idx * 0.15}
                key={idx}
                className="flex items-start relative overflow-hidden max-w-full w-[calc(50%_-_15px)] group"
              >
                <div className="grow-0 shrink-0 basis-auto relative z-[2]">
                  <div className="mr-5 text-2xl size-[50px] inline-flex items-center justify-center text-light bg-primary-600 rounded-full group-hover:bg-dark transition-colors duration-300 ease-in-out">
                    <SVG svg={item.icon} className="size-[1em]" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl mb-2.5">{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </MotionInView>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
