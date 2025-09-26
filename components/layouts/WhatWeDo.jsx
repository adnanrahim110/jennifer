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
          <div className="md:w-2/5 p-2.5 pr-5 flex">
            <div className="flex flex-col gap-2.5 items-start">
              <Subtitle>What We Offer</Subtitle>
              <div className="mb-2.5">
                <Title italic="ultimate comfort">
                  Thoughtfully designed for your ultimate comfort
                </Title>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <Button href="/contact" small tone="dark">
                  Contact now
                </Button>
                <Button href="/holistic-nutrition-evaluation" small>
                  Start your Evaluation
                </Button>
              </div>
            </div>
          </div>
          <div className="md:w-3/5 p-2.5 flex flex-wrap gap-[50px_30px]">
            {[
              {
                title: "Tranquil Ambience",
                text: "A calm environment where you can truly unwind. Feel the stress fade the moment you step inside.",
                icon: "note",
              },
              {
                title: "Clean & Safe Spaces",
                text: "Strict hygiene and safety standards for peace of mind. Every detail is cared for so you can relax fully.",
                icon: "clock",
              },
              {
                title: "Skilled Professionals",
                text: "Certified experts offering years of hands-on experience. You’re always in trusted, capable hands.",
                icon: "stack",
              },
              {
                title: "Premium Products",
                text: "Natural, high-quality ingredients that care for your skin and body. Only the best goes into every treatment.",
                icon: "cube",
              },
              {
                title: "Holistic Balance",
                text: "Treatments that nurture both physical and emotional wellbeing. Supporting harmony in your body and mind.",
                icon: "target",
              },
              {
                title: "Personalized Care",
                text: "Each service designed around your unique needs. No two sessions are ever the same.",
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
