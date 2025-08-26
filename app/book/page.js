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
                <Title>Delicious Sweet & Savory Scones for Every Season</Title>
                <p className="mt-4 mb-8 text-neutral-600 text-lg">
                  Seasonal Scones is more than a recipe collection, it’s a story
                  of comfort and craft, weaving together history, tradition, and
                  modern tastes. With chapters dedicated to spring, summer,
                  autumn, and winter, the book captures the essence of each
                  season through thoughtfully designed scones, both sweet and
                  savory. Allergy-friendly swaps, pantry guides, and timeless
                  techniques ensure every baker, from novice to expert, can
                  create golden, tender results. Beyond recipes, it’s a guide to
                  savoring life’s small rituals, tea by the window, gatherings
                  with loved ones, or quiet mornings at home.
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
