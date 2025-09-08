import Form from "@/components/layouts/Form";
import Reviews from "@/components/layouts/Reviews";
import Button from "@/components/ui/Button";
import Hero from "@/components/ui/Hero";
import Img from "@/components/ui/Img";
import Subtitle from "@/components/ui/Subtitle";
import Title from "@/components/ui/Title";
import { BOOK_REVIEWS } from "@/constants";
import React from "react";

const BookPage = () => {
  return (
    <>
      <Hero title="Book" />
      <section>
        <div className="px-2.5">
          <div className="flex flex-wrap items-center justify-between py-[100px]">
            <div className="md:w-[38%]">
              <Img src="/images/book-mockup.png" width={467} height={472} />
            </div>
            <div className="md:w-[58%]">
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
                  <Button target="_blank" href="https://amazon.com/dp/B0FKZ6PQKJ">Buy Now</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Reviews reviews={BOOK_REVIEWS} />
      <Form />
    </>
  );
};

export default BookPage;
