import Form from "@/components/layouts/Form";
import Reviews from "@/components/layouts/Reviews";
import Hero from "@/components/ui/Hero";
import Img from "@/components/ui/Img";
import Subtitle from "@/components/ui/Subtitle";
import SVG from "@/components/ui/svg";
import Title from "@/components/ui/Title";
import React from "react";

const AboutPage = () => {
  return (
    <>
      <Hero title="About me" italic="me" />
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
          </div>
        </div>
      </section>

      <section>
        <div className="px-2.5 bg-light rounded-3lg mb-5">
          <div className="py-[100px] flex flex-wrap">
            <div className="md:w-1/2 flex p-2.5 flex-col gap-2.5 items-start">
              <Subtitle>My approach</Subtitle>
              <div className="mb-2.5">
                <Title italic="About Jennifer Richards">
                  Flour, Family, and Flavor: About Jennifer Richards
                </Title>
              </div>
              <p>
                Jennifer Richards’ passion for baking was sparked under the
                guidance of her mentor, Mrs. Sheila Gray, who taught her that
                food is both sustenance and story. Over the years, she explored
                many paths, writer, caregiver, and wellness practitioner, but
                the rhythm of the kitchen always called her back. For Jennifer,
                baking is an act of intention: a way to honor the seasons,
                embrace simplicity, and share something meaningful. Seasonal
                Scones is her way of inviting readers into that tradition,
                offering recipes that are as adaptable as they are heartfelt.
              </p>
              <div className="flex flex-col grow-0 shrink basis-auto mt-16 w-full">
                <Img
                  outerClassName="rounded-3lg w-full"
                  width={635}
                  height={437}
                  src="/images/approach-img-2.jpg"
                />
              </div>
            </div>
            <div className="md:w-1/2 flex flex-col p-2.5 gap-y-10 gap-x-5 grow-0 shrink basis-auto pl-7">
              <Img
                outerClassName="rounded-3lg w-full"
                src="/images/approach-img-1.jpg"
                width={605}
                height={340}
              />
              <div className="flex flex-col gap-5">
                {[
                  {
                    title: "Rooted in the Kitchen",
                    icon: "stack",
                    text: "Jennifer Richards grew up with her hands in flour and her heart in the kitchen, where she discovered that cooking is more than a chore—it’s a craft and a comfort.",
                  },
                  {
                    title: "A Life of Many Hats",
                    icon: "trippleCircle",
                    text: "She’s been a food writer, worked in animal welfare, bookkeeping, and massage therapy, yet always returned to the joy of creating meals with simple tools and seasonal flavors.",
                  },
                  {
                    title: "Baking with Intention",
                    icon: "cube",
                    text: "This cookbook is her way of sharing those roots, celebrating the seasons, savoring each bake, and offering readers the warmth of something homemade.",
                  },
                ].map((item, index) => (
                  <div key={index} className="w-full flex items-start">
                    <div className="grow-0 shrink-0 basis-auto relative">
                      <div className="mr-5 flex items-center justify-center size-[50px] text-2xl rounded-full bg-primary-600 text-light">
                        <SVG svg={item.icon} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-dark text-xl mb-1">{item.title}</h3>
                      <p className="leading-[1.7em] text-sm">{item.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Reviews />
      <Form />
    </>
  );
};

export default AboutPage;
