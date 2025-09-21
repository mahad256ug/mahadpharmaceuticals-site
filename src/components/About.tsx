import React from "react";
import Image from "next/image";

// components
import MaxWidthWrapper from "./MaxWidthWrapper";
import SectionHead from "./Animations/SectionHead";
import {
  aboutImg1,
  aboutImg2,
  aboutImg3,
  aboutImg4,
  aboutImg5,
  aboutImg6,
} from "@/assets";

function ProductsPreview() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-10">
      <div className="">
        <Image
          className="h-auto max-w-full rounded-lg"
          src={aboutImg3}
          alt="about-img-3"
          width={380}
          height={450}
        />
      </div>
      <div className="">
        <Image
          className="h-auto max-w-full rounded-lg"
          src={aboutImg4}
          alt="about-img-4"
          width={450}
          height={450}
        />
      </div>
      <div>
        <Image
          className="h-auto max-w-full rounded-lg"
          src={aboutImg5}
          alt="about-img-5"
          width={450}
          height={450}
        />
      </div>
      <div>
        <Image
          className="h-auto max-w-full rounded-lg"
          src={aboutImg6}
          alt="about-img-6"
          width={450}
          height={450}
        />
      </div>
    </div>
  );
}

const About = () => {
  return (
    <MaxWidthWrapper>
      <section>
        <div className="gap-16 items-center lg:grid lg:grid-cols-2 ">
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
              src={aboutImg1}
              width={500}
              height={750}
              alt="Lusera pid master"
            />
            <Image
              className="mt-4 w-full lg:mt-10 rounded-lg bg-neutral-100"
              width={500}
              height={750}
              src={aboutImg2}
              alt="Lusera pid master"
            />
          </div>
        </div>

        <div className="mt-20">
          <ProductsPreview />
        </div>
      </section>
    </MaxWidthWrapper>
  );
};

export default About;
