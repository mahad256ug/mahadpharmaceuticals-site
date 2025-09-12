import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import FeaturedProducts from "./FeaturedProducts";
import GenericCarousel from "./GenericCarousel";
import { CarouselItem } from "./ui/carousel";

const HomeFeaturedProducts = () => {
  return (
    <div>
      <GenericCarousel contentClassName="w-full">
        {Array.from({ length: 4 }).map((_, idx) => (
          <CarouselItem
            key={idx}
            className="aspect-video lg:basis-1/2 sm:pl-10"
          >
            <FeaturedProducts />
          </CarouselItem>
        ))}
      </GenericCarousel>
    </div>
  );
};

export default HomeFeaturedProducts;
