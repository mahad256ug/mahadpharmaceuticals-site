import React from "react";
import Link from "next/link";

// component
import ServiceCard from "./ServiceCard";
import { services } from "@/lib/constants";
import MaxWidthWrapper from "./MaxWidthWrapper";
import ListAnimationContainer from "./Animations/ListAnimationContainer";

const Hero = () => {
  return (
    <div className="mb-24">
      <div className="bg-[url('/hero.jpg')] bg-center bg-no-repeat py-20 md:py-28 w-screen bg-cover flex items-center justify-center">
        <MaxWidthWrapper>
          <div className="flex flex-col items-center max-w-md text-center mx-auto">
            <p className="text-white bg-black px-2 text-sm py-1">
              Effective Medicine, New Medicine Everyday
            </p>

            <h2 className="text-4xl md:text-5xl text-white leading-tight my-5">
              Welcome to Mahad Pharmaceuticals
            </h2>
            <p className="text-white/80">
              Trusted online pharmacy in the UAE, offering prescription and
              over-the-counter medicines with fast, secure delivery and
              convenient Cash on Delivery options.
            </p>

            <Link
              href="/products/"
              className="border border-green-500 py-3 px-5 text-green-500 hover:bg-green-500 hover:text-white duration-300 transition-all ease-in-out mt-10"
            >
              <span className="text-current">Find More</span>
            </Link>
          </div>
        </MaxWidthWrapper>
      </div>

      {/* services */}
      <div className="max-w-[85%] -mt-16 lg:max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-10">
          {services.map((item, idx) => (
            <ListAnimationContainer idx={idx} key={idx}>
              <ServiceCard {...item} />
            </ListAnimationContainer>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
