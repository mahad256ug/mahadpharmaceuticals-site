import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import SectionHead from "./Animations/SectionHead";

const About = () => {
  return (
    <MaxWidthWrapper>
      <section>
        <div className="gap-16 items-center lg:grid lg:grid-cols-2">
          <div className="font-light  sm:text-lg">
            <SectionHead
              title=" About Maha Pharmaceuticals"
              subtitle="We are strategists, designers and developers. Innovators and
              problem solvers. Small enough to be simple and quick."
              className="text-left mb-4"
              subtitleClass="mx-0"
            />
            <p className="mb-4">
              We are strategists, designers and developers. Innovators and
              problem solvers. Small enough to be simple and quick, but big
              enough to deliver the scope you want at the pace you need. Small
              enough to be simple and quick, but big enough to deliver the scope
              you want at the pace you need.
            </p>
            <p></p>
          </div>
          <div className="grid grid-cols-2 gap-4 mt-8">
            <img
              className="w-full rounded-lg bg-neutral-100"
              src="/product.png"
              alt="Drug"
            />
            <img
              className="mt-4 w-full lg:mt-10 rounded-lg"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-1.png"
              alt="office content 2"
            />
          </div>
        </div>
      </section>
    </MaxWidthWrapper>
  );
};

export default About;
