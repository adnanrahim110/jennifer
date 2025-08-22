import Form from "@/components/layouts/Form";
import Reviews from "@/components/layouts/Reviews";
import Button from "@/components/ui/Button";
import Hero from "@/components/ui/Hero";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import React from "react";

const BookPage = () => {
  return (
    <>
      <Hero title="Book" />
      <section>
        <div className="px-2.5">
          <div className="flex flex-wrap items-center justify-between py-[100px]">
            <div className="md:w-3/12">
              <div className="h-[480px] bg-neutral-400 text-center flex items-center justify-center">
                <span className="text-black font-bold text-4xl">
                  Book Cover
                </span>
              </div>
            </div>
            <div className="md:w-8/12">
              <div className="flex flex-col items-start gap-2.5 lg: pr-10">
                <Subtitle>About Book</Subtitle>
                <Title>Lorem ipsum dolor sit amet.</Title>
                <p className="mt-4 mb-8 text-neutral-600 text-lg">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Praesentium, perspiciatis repellat officia iusto distinctio
                  labore tempora a nemo ut adipisci sed assumenda sint fugiat
                  eveniet, quis nobis quam ratione, optio vitae dolore? Eveniet,
                  dolorum voluptate temporibus nam perspiciatis enim possimus
                  magnam vel! Repudiandae molestiae accusamus animi consectetur.
                  Hic deserunt, nesciunt quae, voluptates necessitatibus quas
                  magni itaque eligendi ducimus ab totam officiis enim aliquid,
                  nemo dicta placeat. Alias iste asperiores quibusdam error
                  voluptatum odit reiciendis ut? Quo porro voluptatibus
                  exercitationem praesentium tenetur quis eius vel, dolore vitae
                  assumenda sint, sit, ullam ad impedit maiores facere est
                  voluptate perferendis laborum aut iusto.
                </p>
                <div>
                  <Button>Buy Now</Button>
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

export default BookPage;
