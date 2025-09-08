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
        subtitle="Step Into a World of Calm & Care"
        italic="elaxation and expert attention"
        title="Experience the ultimate escape into relaxation and expert attention"
        text={`Every visit is an invitation to pause, breathe, and let go of life’s stresses. From therapeutic massages to holistic facials, our services are designed to leave you renewed, centered, and cared for. <br/> Whether you need deep relaxation, skin restoration, or a peaceful reset, you’ll find a service that meets your needs with warmth and professionalism.`}
      />
      <section className="px-2.5">
        <div className="flex flex-col gap-y-[60px] gap-x-5 items-center justify-center py-[100px]">
          <div className="w-full md:max-w-[850px] flex flex-col items-center gap-2.5 p-2.5 text-center">
            <Subtitle>About me</Subtitle>
            <div className="mb-3">
              <Title as="h2" italic="Intention and Heart">
                Jennifer Richards – Baking with Intention and Heart
              </Title>
              <p>
                Trained in food and nutrition, Jennifer Richards grew up with
                flour-dusted hands and a love for the kitchen. Her journey spans
                many roles, but her true home has always been with seasonal
                ingredients, simple tools, and the joy of sharing food that
                comforts, nourishes, and connects.
              </p>
            </div>
            <div>
              <Button href="/about">Discover More</Button>
            </div>
          </div>
          <div className="p-2.5 flex gap-[30px] flex-wrap w-full">
            {[
              {
                image: "/images/s1.jpg",
                mask: "flower.svg",
                title: "Helpful Tools",
                text: "A pastry cutter, mixing bowls, sharp knife, and a baking sheet lined with parchment are all you need. A cooling rack and grater make finishing touches easier.",
              },
              {
                image: "/images/s2.jpg",
                mask: "flower2.svg",
                title: "Technique Matters",
                text: "Cold ingredients give scones their signature flakiness. Mix gently, cut cleanly, and chill the dough before baking. These small steps create tall, golden scones.",
              },
              {
                image: "/images/s3.jpg",
                mask: "brush_stroke.svg",
                title: "Tips for Success",
                text: "Keep butter and milk chilled. Avoid overmixing to prevent toughness. Use sharp cuts for a clean rise. Freeze shaped dough for later bakes. Add glazes or sugar sprinkles for a finishing touch.",
              },
            ].map((moveItem, idx) => (
              <MotionInView
                as={motion.div}
                v={variants.fadeRise}
                duration={1}
                viewport={{ once: true, amount: 0.5 }}
                key={idx}
                delay={idx * 0.15}
                className="md:w-[calc(33.33%_-_20px)] bg-light flex flex-col grow-0 shrink basis-auto px-8 py-6 rounded-3lg"
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
                  <p className="leading-[1.7em] text-[15px]">{moveItem.text}</p>
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
