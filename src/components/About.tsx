import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import SectionHead from "./Animations/SectionHead";
import Image from "next/image";
import { productImg } from "@/assets";

const About = () => {
  return (
    <MaxWidthWrapper>
      <section>
        <div className="gap-16 items-center lg:grid lg:grid-cols-2">
          <div className="font-light  sm:text-lg">
            <SectionHead
              title=" About Maha Pharmaceuticals"
              subtitle="At Maha Pharmaceuticals, we provide a reliable online platform for purchasing a wide range of medicines and healthcare products. Our mission is to make essential drugs accessible to everyone, offering a seamless and safe shopping experience from the comfort of your home.."
              className="text-left mb-4"
              subtitleClass="mx-0 max-w-none"
            />
            <p className="mb-4">
              We deliver throughout the <b className="font-bold">UAE</b>,
              ensuring that your medicines reach you quickly and securely.
              Whether you have questions about our products or need assistance
              with your order, our team is always ready to help —{" "}
              <b className="font-bold">just click “Talk to Us”</b> for more
              information and support..
            </p>
            <p></p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <Image
              className="w-full rounded-lg bg-neutral-100"
              src={productImg}
              width={500}
              height={750}
              alt="Drug"
            />
            <Image
              className="mt-4 w-full lg:mt-10 rounded-lg bg-neutral-100"
              width={500}
              height={750}
              src={productImg}
              alt="office content 2"
            />
          </div>
        </div>
      </section>
    </MaxWidthWrapper>
  );
};

export default About;
