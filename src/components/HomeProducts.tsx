import React from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import ProductCard from "./ProductCard";
import ListAnimationContainer from "./Animations/ListAnimationContainer";
import SectionHead from "./Animations/SectionHead";
import HomeFeaturedProducts from "./HomeFeaturedProducts";

const HomeProducts = () => {
  return (
    <div>
      <MaxWidthWrapper>
        <SectionHead
          title="Our Products"
          subtitle="we offer safe, affordable, and high-quality medicines and healthcare products — from prescription drugs to everyday wellness essentials."
        />

        <HomeFeaturedProducts />

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 space-y-10 space-x-5  sm:space-x-0 sm:gap-10 mt-24 mb-14">
          {Array.from({ length: 5 }).map((_, idx) => (
            <ListAnimationContainer idx={idx} key={idx}>
              <ProductCard />
            </ListAnimationContainer>
          ))}
        </div>

        <div className="text-center mt-12">
          <button
            type="button"
            className="border border-green-500 py-3 px-5 text-green-500 hover:bg-green-500 hover:text-white duration-300 transition-all ease-in-out"
          >
            More Products
          </button>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default HomeProducts;
