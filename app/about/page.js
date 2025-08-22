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
                <Title italic="healthier tomorrow">
                  Inspiring wellness, shaping a healthier tomorrow
                </Title>
              </div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel ea
                incidunt suscipit nihil delectus doloremque ut modi dolor
                aliquid deserunt. Lorem ipsum dolor sit amet consectetur
                adipisicing elit.
              </p>
              <div className="flex flex-col grow-0 shrink basis-auto mt-[30px] w-full">
                <Img
                  outerClassName="rounded-3lg w-full"
                  width={635}
                  height={437}
                  src="/images/approach-img-1.jpg"
                />
              </div>
            </div>
            <div className="md:w-1/2 flex flex-col p-2.5 gap-y-10 gap-x-5 grow-0 shrink basis-auto pl-[35px]">
              <Img
                outerClassName="rounded-3lg w-full"
                src="/images/approach-img-2.jpg"
                width={605}
                height={340}
              />
              <div className="flex flex-col gap-[30px]">
                <div className="w-full flex items-start">
                  <div className="grow-0 shrink-0 basis-auto relative">
                    <div className="mr-5 flex items-center justify-center size-[50px] text-2xl rounded-full bg-primary-600 text-light">
                      <SVG svg="stack" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-dark text-xl mb-2.5">Lorem ipsum</h3>
                    <p className="leading-[1.7em]">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Veritatis dicta eum minima ipsa at ipsam suscipit
                      expedita.
                    </p>
                  </div>
                </div>
                <div className="w-full flex items-start">
                  <div className="grow-0 shrink-0 basis-auto relative">
                    <div className="mr-5 flex items-center justify-center size-[50px] text-2xl rounded-full bg-primary-600 text-light">
                      <SVG svg="trippleCircle" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-dark text-xl mb-2.5">Lorem ipsum</h3>
                    <p className="leading-[1.7em]">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Veritatis dicta eum minima ipsa at ipsam suscipit
                      expedita.
                    </p>
                  </div>
                </div>
                <div className="w-full flex items-start">
                  <div className="grow-0 shrink-0 basis-auto relative">
                    <div className="mr-5 flex items-center justify-center size-[50px] text-2xl rounded-full bg-primary-600 text-light">
                      <SVG svg="cube" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-dark text-xl mb-2.5">Lorem ipsum</h3>
                    <p className="leading-[1.7em]">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Veritatis dicta eum minima ipsa at ipsam suscipit
                      expedita.
                    </p>
                  </div>
                </div>
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
