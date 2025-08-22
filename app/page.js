"use client";
import ChooseUs from "@/components/layouts/ChooseUs";
import Feature from "@/components/layouts/Feature";
import Form from "@/components/layouts/Form";
import Reviews from "@/components/layouts/Reviews";
import ServicesSec from "@/components/layouts/ServicesSec";
import WhatWeDo from "@/components/layouts/WhatWeDo";
import Button from "@/components/ui/Button";
import Hero from "@/components/ui/Hero";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { MotionInView, variants } from "@/utils/motion";
import { motion } from "motion/react";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Hero
        withImg
        subtitle="Step into a world of calm and care"
        italic="relaxation and expert care"
        title="Experience the ultimate escape into relaxation and expert care"
        text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus facilis sunt facere dicta exercitationem eum, quibusdam molestiae velit, sed iste ducimus cum deserunt! Ipsum ullam eligendi nulla optio rerum culpa dolores quaerat doloremque ex vel, iure quod minus voluptate sint quasi cumque? Quam blanditiis enim laboriosam illum non dolorum ut."
      />
      <section className="px-2.5">
        <div className="flex flex-col gap-y-[60px] gap-x-5 items-center justify-center py-[100px]">
          <div className="w-full md:max-w-[1060px] flex flex-col items-center gap-2.5 p-2.5 text-center">
            <Subtitle>About me</Subtitle>
            <div className="mb-[50px]">
              <Title as="h2" italic="placeat, quo consectetur suscipit!">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Mollitia sit beatae Lorem ipsum dolor sit. placeat, quo
                consectetur suscipit!
              </Title>
            </div>
            <div>
              <Button>Discover More</Button>
            </div>
          </div>
          <div className="p-2.5 flex gap-[30px] flex-wrap w-full">
            {[
              {
                image: "/images/s1.jpg",
                mask: "flower.svg",
                title: "Personalized Holistic Care",
              },
              {
                image: "/images/s2.jpg",
                mask: "flower2.svg",
                title: "Comprehensive Wellness Plans",
              },
              {
                image: "/images/s3.jpg",
                mask: "brush_stroke.svg",
                title: "Expert Health Guidance",
              },
            ].map((moveItem, idx) => (
              <MotionInView
                as={motion.div}
                v={variants.fadeRise}
                duration={1}
                viewport={{ once: true, amount: 0.5 }}
                key={idx}
                delay={idx * 0.15}
                className="md:w-[calc(33.33%_-_20px)] bg-light flex flex-col grow-0 shrink basis-auto p-10 rounded-3lg"
              >
                <div className="text-center">
                  <figure className="w-[180px] mb-10 inline-block">
                    <Image
                      width={180}
                      height={180}
                      src={moveItem.image}
                      alt={moveItem.title}
                      className="mask-center mask-contain mask-no-repeat"
                      style={{
                        maskImage: `url(/images/elements/${moveItem.mask})`,
                      }}
                    />
                  </figure>
                  <h3 className="mb-[15px] text-xl">{moveItem.title}</h3>
                  <p className="leading-[1.7em]">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Eum, distinctio.
                  </p>
                </div>
              </MotionInView>
            ))}
          </div>
        </div>
      </section>
      <ServicesSec />
      <Feature />
      <WhatWeDo />
      <ChooseUs />
      <Reviews />
      <Form />
    </>
  );
}
