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
import Link from "next/link";

function ProductsPreview() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-10">
      <div className="flex flex-col items-center">
        <Image
          className="h-auto max-w-full rounded-lg border"
          src={aboutImg3}
          alt="about-img-3"
          width={380}
          height={450}
        />

        <div className="bg-accent p-2 -mt-5">
          <Link href="/products/hiv-test-kit">
            <p className="text-black/80">HIV Testing Kit</p>
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <Image
          className="h-auto max-w-full rounded-lg border"
          src={aboutImg4}
          alt="about-img-4"
          width={450}
          height={450}
        />

        <div className="bg-accent p-2 -mt-5 z-10">
          <Link href="/products/lydia">
            <p className="text-black/80">Lydia</p>
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <Image
          className="h-auto max-w-full rounded-lg border"
          src={aboutImg5}
          alt="about-img-5"
          width={450}
          height={450}
        />
        <div className="bg-accent p-2 -mt-5 z-10">
          <Link href="/products/cefixime-taxim">
            <p className="text-black/80">Celfixime Taxim</p>
          </Link>
        </div>
      </div>
      <div className="flex flex-col items-center">
        <Image
          className="h-auto max-w-full rounded-lg border"
          src={aboutImg1}
          alt="about-img-6"
          width={450}
          height={450}
        />
        <div className="bg-accent p-2 -mt-5 z-10">
          <Link href="/products/lusera-pid-master">
            <p className="text-black/80">Lusera Pid Master</p>
          </Link>
        </div>
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
              title=" About Mahad Pharmaceuticals"
              subtitle=" Mahad Pharmaceuticals is your trusted online pharmacy in the UAE,
              offering a secure and convenient way to buy medicines and
              healthcare products from home. Our goal is to make essential and
              over-the-counter drugs easily accessible to everyone through a
              fast, user-friendly, and safe online shopping experience."
              className="text-left mb-4"
              subtitleClass="mx-0 max-w-none"
            />

            <p className="mb-2">
              We provide nationwide delivery across the UAE, ensuring that your
              medications arrive quickly, safely, and discreetly. From
              prescription medicines to wellness and personal care products, we
              make ordering healthcare essentials simple and reliable.
            </p>

            <p>
              Need help or have a question about a product or order? Our support
              team is always available — just click <b>“Talk to Us”</b> for
              instant assistance and guidance.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <Image
              className="w-full rounded-lg bg-neutral-100"
              src={aboutImg6}
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
