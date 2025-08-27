"use client";

import React, { useEffect, useMemo } from "react";
import { FaFacebookF, FaInstagram, FaShareNodes } from "react-icons/fa6";

import Form from "@/components/layouts/Form";
import Hero from "@/components/ui/Hero";
import Img from "@/components/ui/Img";

import { BLOGS } from "@/constants";
import { useParams, useRouter } from "next/navigation";

const RenderBlock = ({ block }) => {
  if (!block) return null;

  if (block.type === "p") {
    return <p className="mb-5">{block.text}</p>;
  }

  if (block.type === "h2") {
    return <h2 className="text-dark text-4xl my-[1em_0.7em]">{block.text}</h2>;
  }

  if (block.type === "ul") {
    return (
      <ul className="my-5 pl-5">
        {block.items?.map((item, idx) => (
          <li
            key={idx}
            className="mb-[15px] font-medium leading-normal list-disc"
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }

  if (block.type === "quote") {
    const quoteText = block.cite ? `${block.text} — ${block.cite}` : block.text;
    return (
      <blockquote
        className="bg-primary-600 bg-no-repeat rounded-3lg border border-[#5A50441A] p-[30px] pl-[90px] mb-[30px] break-words"
        style={{
          backgroundImage: "url('/images/blockquote.svg')",
          backgroundPosition: "30px 30px",
          backgroundSize: "45px",
        }}
      >
        <p className="text-xl text-light font-bold leading-[1.5em]">
          {quoteText}
        </p>
      </blockquote>
    );
  }

  // fallback to paragraph
  return <p className="mb-5">{block.text}</p>;
};

const BlogDetailPage = () => {
  const params = useParams();
  const router = useRouter();

  const slug = typeof params?.slug === "string" ? params.slug : "";
  const blog = useMemo(
    () => BLOGS.find((b) => b.slug === slug),
    [slug]
  );

  useEffect(() => {
    if (!blog) {
      router.replace("/not-found");
    }
  }, [blog, router]);

  if (!blog) return null;

  return (
    <>
      <Hero
        title={blog.title}
        breadcrumbs={false}
        date={blog.date}
        category={blog.category}
      />

      <div className="pt-[100px] px-2.5">
        <div className="px-[15px] max-w-[1300px] mx-auto w-full">
          <div className="flex flex-wrap -mx-[15px] *:w-full *:grow-0 *:shrink-0 *:basis-auto *:px-[15px] *:relative">
            <div>
              <div className="mb-[30px] w-full overflow-hidden">
                <Img
                  outerClassName="w-full aspect-[1/0.50] object-cover rounded-3lg"
                  className="w-full object-cover aspect-[1/0.50] rounded-3lg"
                  src={blog.coverImage || "/images/blogs/1.jpg"}
                  width={800}
                  height={449}
                  alt={blog.title}
                />
              </div>
            </div>

            <div>
              <div className="w-full max-w-[1100px] mx-auto">
                <div className="border-b border-b-[#5A50441A] mb-[30px] pb-[30px]">
                  {Array.isArray(blog.content) &&
                    blog.content.map((block, idx) => (
                      <RenderBlock key={idx} block={block} />
                    ))}
                </div>

                <div className="flex flex-wrap -mx-[15px] *:w-full *:grow-0 *:shrink-0 *:basis-auto *:px-[15px] *:relative">
                  <div className="lg:w-4/12">
                    <div className="text-xl font-semibold text-dark inline-flex items-center gap-[15px]">
                      Share:
                      <ul className="*:inline-block *:not-last:mr-3">
                        <li>
                          <a
                            href="#"
                            className="flex items-center justify-center text-center bg-primary-600 hover:bg-dark text-light rounded-full text-xl size-10 transition-all duration-[400ms] ease-in-out"
                            aria-label="Share on Facebook"
                          >
                            <FaFacebookF />
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="flex items-center justify-center text-center bg-primary-600 hover:bg-dark text-light rounded-full text-xl size-10 transition-all duration-[400ms] ease-in-out"
                            aria-label="Share on Instagram"
                          >
                            <FaInstagram />
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="flex items-center justify-center text-center bg-primary-600 hover:bg-dark text-light rounded-full text-xl size-10 transition-all duration-[400ms] ease-in-out"
                            aria-label="More share options"
                          >
                            <FaShareNodes />
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </div>

      <Form />
    </>
  );
};

export default BlogDetailPage;
