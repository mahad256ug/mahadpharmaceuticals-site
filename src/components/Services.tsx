import React from "react";
import ServiceCard from "./ServiceCard";
import MaxWidthWrapper from "./MaxWidthWrapper";
import SectionHead from "./Animations/SectionHead";
import ListAnimationContainer from "./Animations/ListAnimationContainer";

// utils
import { services } from "@/lib/constants";

const Services = () => {
  return (
    <div>
      <MaxWidthWrapper className="my-20">
        <div>
          <SectionHead
            title="Maha Services"
            subtitle="We provide a wide range of pharmaceutical services tailored to our community’s needs, with expert care and guidance to support your health and wellness"
            subtitleClass="max-w-xl"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 max-sm:divide-y gap-10">
          {services.map((item, idx) => (
            <ListAnimationContainer idx={idx} key={idx}>
              <ServiceCard {...item} />
            </ListAnimationContainer>
          ))}
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default Services;
