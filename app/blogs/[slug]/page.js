import Form from "@/components/layouts/Form";
import Hero from "@/components/ui/Hero";
import Img from "@/components/ui/Img";
import React from "react";
import { FaFacebookF, FaInstagram, FaShareNodes } from "react-icons/fa6";

const BlogDetailPage = () => {
  return (
    <>
      <Hero
        title="Blog Title"
        breadcrumbs={false}
        date={"2023-01-01"}
        category={"Category"}
      />

      <div className="pt-[100px] px-2.5">
        <div className="px-[15px] max-w-[1300px] mx-auto w-full">
          <div className="flex flex-wrap -mx-[15px] *:w-full *:grow-0 *:shrink-0 *:basis-auto *:px-[15px] *:relative">
            <div>
              <div className="mb-[30px] w-full overflow-hidden">
                <Img
                  outerClassName="w-full aspect-[1/0.50] object-cover rounded-3lg"
                  className="w-full object-cover aspect-[1/0.50] rounded-3lg"
                  src="/images/blogs/1.jpg"
                  width={800}
                  height={449}
                  alt=""
                />
              </div>
            </div>
            <div>
              <div className="w-full max-w-[1100px] mx-auto">
                <div className="border-b border-b-[#5A50441A] mb-[30px] pb-[30px]">
                  <p className="mb-5">
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Accusantium perferendis sunt, exercitationem voluptatum id
                    necessitatibus! Aut modi, beatae numquam tempora temporibus
                    nulla neque reprehenderit corrupti id est ipsam architecto
                    voluptatibus laboriosam nemo quidem veritatis voluptas cum
                    autem minus sunt molestias velit? Voluptatem sunt temporibus
                    laudantium aperiam sapiente delectus fugit praesentium
                    repellat velit architecto laborum quia consectetur, tenetur
                    assumenda ut consequatur, inventore quas voluptates libero
                    possimus dolor corporis quod! Autem non provident fugit sint
                    dignissimos rerum tempore quis, eligendi totam neque
                    nesciunt optio dolores recusandae soluta, aut quos vitae
                    cumque eius! Molestiae vero molestias dolorum numquam fugiat
                    mollitia? Voluptate, vero. Vero?
                  </p>
                  <p className="mb-5">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Molestias veniam necessitatibus ipsum maiores dignissimos
                    recusandae at? Rem asperiores quis itaque iste deleniti
                    animi delectus sunt autem officia magni eaque ea minus
                    explicabo, commodi sapiente harum quo consequatur sequi
                    minima ipsam quae repellat molestias cum repellendus.
                    Voluptates corrupti porro, minus maxime aut unde laboriosam!
                    Quisquam expedita perferendis beatae repellendus alias
                    adipisci.
                  </p>
                  <blockquote
                    className="bg-primary-600 bg-no-repeat rounded-3lg border border-[#5A50441A] p-[30px] pl-[90px] mb-[30px] break-words"
                    style={{
                      backgroundImage: "url('/images/blockquote.svg')",
                      backgroundPosition: "30px 30px",
                      backgroundSize: "45px",
                    }}
                  >
                    <p className="text-xl text-light font-bold leading-[1.5em]">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Incidunt neque repellendus odit, rerum ut repellat velit
                      mollitia ad voluptatum ea reprehenderit. Explicabo
                      perspiciatis officia reprehenderit, natus, recusandae odit
                      alias quo unde error labore asperiores optio officiis
                      numquam ad omnis tempore!
                    </p>
                  </blockquote>
                  <p className="mb-5">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Omnis consequuntur magni delectus? Iste iusto consequatur
                    obcaecati eum in itaque unde perferendis vero doloremque
                    laborum veniam fuga cupiditate quae explicabo commodi
                    recusandae pariatur, quas omnis adipisci ut iure? Facere
                    magni debitis voluptatibus quas rerum alias? Nam pariatur
                    facilis sequi veritatis eum!
                  </p>
                  <h2 className="text-dark text-4xl my-[1em_0.7em]">
                    Lorem ipsum dolor sit amet consectetur.
                  </h2>
                  <p className="mb-5">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Atque incidunt molestiae repellat laborum architecto at, non
                    nostrum distinctio, maiores odio iusto mollitia voluptatem
                    optio praesentium quo facilis a esse dicta.
                  </p>
                  <ul className="my-5 pl-5">
                    {[...Array(5)].map((_, idx) => (
                      <li
                        key={idx}
                        className="mb-[15px] font-medium leading-normal list-disc"
                      >
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Qui molestiae voluptatibus quaerat, recusandae quia
                        porro tempora accusantium
                      </li>
                    ))}
                  </ul>
                  <p className="mb-5">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Magnam modi expedita iste soluta aut quo itaque, unde, illo
                    quod impedit maiores ipsa necessitatibus sunt dolores dolore
                    animi, esse quia iusto optio aperiam! Obcaecati, minima
                    dicta.
                  </p>
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
                          >
                            <FaFacebookF />
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="flex items-center justify-center text-center bg-primary-600 hover:bg-dark text-light rounded-full text-xl size-10 transition-all duration-[400ms] ease-in-out"
                          >
                            <FaInstagram />
                          </a>
                        </li>
                        <li>
                          <a
                            href="#"
                            className="flex items-center justify-center text-center bg-primary-600 hover:bg-dark text-light rounded-full text-xl size-10 transition-all duration-[400ms] ease-in-out"
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
