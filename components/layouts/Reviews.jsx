"use client";

import { REVIEWS } from "@/constants";
import { FaStar } from "react-icons/fa";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Img from "../ui/Img";
import Subtitle from "../ui/Subtitle";
import Title from "../ui/Title";

const Reviews = () => {
  return (
    <section>
      <div>
        <div className="px-2.5 bg-[#556B2F] bg-cover bg-no-repeat bg-center bg-[url('/images/reviews-bg.png')] rounded-3lg">
          <div className="flex flex-col w-full flex-wrap gap-y-[60px] gap-x-5 py-[100px]">
            <div className="flex w-full items-center p-2.5">
              <div className="md:w-1/2 flex flex-col items-start gap-2.5">
                <Subtitle tone="light">Testimonials</Subtitle>
                <Title tone="light" italic="talking about">
                  The wellness experiences they can't stop talking about
                </Title>
              </div>
              <div className="md:w-1/2 flex pl-[30px] items-center flex-wrap gap-2.5 justify-end">
                <div className="flex pr-2.5">
                  {[...Array(5)].map((_, idx) => (
                    <Img
                      key={idx}
                      outerClassName={`border border-light rounded-full relative overflow-hidden text-center ${
                        idx !== 0 ? "-ml-[25px]" : ""
                      }`}
                      className="w-full max-w-[62px] h-[61px]"
                      src={`/images/reviews/${idx + 1}.jpeg`}
                      width={60}
                      height={61}
                    />
                  ))}
                </div>
                <div className="flex flex-col gap-0.2">
                  <div className="flex justify-start">
                    {[...Array(5)].map((_, idx) => (
                      <div key={idx} className="text-light text-xl relative">
                        <FaStar />
                      </div>
                    ))}
                  </div>
                  <div className="leading-[1.7em] text-light">
                    4.9 (29K Reviews)
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full items-center justify-start">
              <div className="md:w-2/5 p-2.5 flex items-center justify-center">
                <Img
                  width={524}
                  height={384}
                  src="/images/reviews.jpg"
                  outerClassName="rounded-3lg w-full"
                  className="object-cover"
                />
              </div>
              <div className="md:w-3/5 p-2.5 pl-10">
                <div className="w-full relative">
                  <Swiper
                    modules={[Autoplay, Navigation]}
                    autoplay={{ delay: 5000 }}
                    loop
                    navigation
                    slidesPerView={1}
                    spaceBetween={30}
                    className="reviews_slider"
                  >
                    {REVIEWS.map((review, idx) => (
                      <SwiperSlide key={idx}>
                        <div>
                          <div className="inline-block mb-[30px] relative">
                            <img
                              src={review.avatar}
                              alt={review.name}
                              className="rounded-full"
                            />
                          </div>
                          <p className="leading-[1.7em] text-light mb-[30px] pb-[30px]">
                            {review.comment}
                          </p>
                          <div>
                            <strong className="text-left block text-xl font-bold text-light leading-[1.2em] mb-[5px]">
                              {review.name}
                            </strong>
                            <span className="text-light">{review.title}</span>
                          </div>
                        </div>
                      </SwiperSlide>
                    ))}
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
