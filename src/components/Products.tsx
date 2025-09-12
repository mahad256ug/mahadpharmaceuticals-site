import React from "react";
// components
import ProductCard from "./ProductCard";
import MaxWidthWrapper from "./MaxWidthWrapper";
import ListAnimationContainer from "./Animations/ListAnimationContainer";
import PaginationBtns from "./PaginationBtns";

const Products = () => {
  return (
    <MaxWidthWrapper className="py-20">
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-10 mb-20">
        {Array.from({ length: 14 }).map((_, idx) => (
          <ListAnimationContainer idx={idx} key={idx}>
            <ProductCard />
          </ListAnimationContainer>
        ))}
      </div>

      <PaginationBtns />
    </MaxWidthWrapper>
  );
};

export default Products;
