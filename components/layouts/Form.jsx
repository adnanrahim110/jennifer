import React from "react";
import Button from "../ui/Button";
import Subtitle from "../ui/Subtitle";
import Title from "../ui/Title";

const Form = () => {
  return (
    <section className="px-2.5">
      <div className="flex flex-col items-center gap-y-[60px] gap-x-5 w-full py-[100px]">
        <div className="p-2.5 md:w-[850px] flex flex-col items-center text-center gap-2.5">
          <Subtitle>Book An Appointment</Subtitle>
          <Title italic="rejuvenation">
            Book an appointment now for wellness, peace and rejuvenation
          </Title>
        </div>
        <div className="p-2.5 flex gap-[30px] mb-2.5 w-full">
          <div className="md:w-[calc(50%_-_15px)] bg-cover bg-no-repeat bg-center bg-[url('/images/contact_form.jpg')] rounded-3lg flex p-[30px]"></div>
          <div className="md:w-[calc(50%_-_15px)] bg-light rounded-3lg p-[30px]">
            <form>
              <div className="flex flex-wrap -mx-[15px] *:px-[15px] *:w-full *:relative *:grow-0 *:shrink-0 *:basis-auto *:not-last:mb-6">
                <div className="md:w-1/2">
                  <input type="text" name="fname" placeholder="First Name" />
                </div>
                <div className="md:w-1/2">
                  <input type="text" name="lname" placeholder="Last Name" />
                </div>
                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                  />
                </div>
                <div>
                  <input type="tel" name="phone" placeholder="Phone Number" />
                </div>
                <div>
                  <textarea name="message" placeholder="Message" rows="5" />
                </div>
                <div>
                  <button
                    type="submit"
                    className="bg-primary-600 text-light text-center inline-block w-full rounded-2md p-[18px] cursor-pointer font-bold hover:bg-dark leading-none mt-6"
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Form;
