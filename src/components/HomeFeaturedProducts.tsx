"use Effect";
import React, { Suspense, useEffect, useState } from "react";

// components
import Spinner from "./Spinner";
import { productType } from "@/lib/types";
import { CarouselItem } from "./ui/carousel";
import GenericCarousel from "./GenericCarousel";
import FeaturedProductCard from "./FeaturedProductCard";

const HomeFeaturedProducts = () => {
  const [productsItems, setProductsItems] = useState<productType[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      const endPoint = `/api/products/?home_featured_products=${true}`;

      const res = await fetch(`${endPoint}`, {
        method: "GET",
      });

      if (res.ok) {
        const { products } = await res.json();
        setProductsItems(products);
      } else {
        return (
          <div className="text-center w-full py-24">
            <p>Something went wrong contact Maha</p>
          </div>
        );
      }
    }

    fetchProducts();
  }, []);
  return (
    <div>
      <Suspense
        fallback={
          <div className="py-20 w-full flex items-center justify-center">
            <div className="h-10 w-10 flex items-center justify-center">
              <Spinner className="fill-green-500 text-green-50" />
            </div>
          </div>
        }
      >
        {productsItems.length > 0 && (
          <GenericCarousel contentClassName="w-full">
            {productsItems.map((item, idx) => {
              // Set basis: full width if only one item, else 1/2
              const basisClass =
                productsItems.length === 1 ? "basis-full" : "lg:basis-1/2";

              return (
                <CarouselItem
                  key={idx}
                  className={`${basisClass} sm:pl-10 aspect-video`}
                >
                  <FeaturedProductCard {...item} />
                </CarouselItem>
              );
            })}
          </GenericCarousel>
        )}
      </Suspense>
    </div>
  );
};

export default HomeFeaturedProducts;
