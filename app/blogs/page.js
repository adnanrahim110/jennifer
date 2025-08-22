import Hero from "@/components/ui/Hero";
import Img from "@/components/ui/Img";
import Link from "next/link";
import React from "react";
import { FiArrowUpRight } from "react-icons/fi";

const BlogsPage = () => {
  return (
    <>
      <Hero title="Blogs" />
      <div className="py-[100px]">
        <div className="px-[15px] mx-auto max-w-[1300px] w-full">
          <div className="flex flex-wrap -mx-[15px] *:px-[15px] *:w-full *:grow-0 *:shrink-0 *:basis-auto">
            {[...Array(6)].map((_, idx) => (
              <div key={idx} className="md:w-1/2 lg:w-4/12">
                <div className="h-[calc(100%_-_30px)] mb-[30px] group">
                  <div>
                    <Link
                      href="/"
                      className="block rounded-3lg overflow-hidden mb-5"
                    >
                      <Img
                        outerClassName="rounded-3lg w-full"
                        src="/images/blogs/1.jpg"
                        width={800}
                        height={449}
                        className="w-full object-cover aspect-[1/0.871] group-hover:scale-[115%] transition-all duration-[400ms] ease-in-out"
                      />
                    </Link>
                  </div>
                  <div>
                    <div className="mb-5">
                      <h3 className="text-dark text-xl leading-[1.4em] [word-break:break-word]">
                        <Link href="/">
                          Lorem ipsum dolor sit amet consectetur adipisicing elit.
                          Mollitia sit beatae
                        </Link>
                      </h3>
                    </div>
                    <div className="relative font-bold leading-normal capitalize transition-all duration-[400ms] ease-in-out">
                      <Link
                        href="/"
                        className="align-bottom text-primary-600 group/link hover:text-dark transition-all duration-[400ms] ease-in-out"
                      >
                        Read more
                        <FiArrowUpRight className="text-2xl ml-1 transition-all duration-[400ms] group-hover/link:rotate-45 ease-in-out inline-block" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogsPage;
