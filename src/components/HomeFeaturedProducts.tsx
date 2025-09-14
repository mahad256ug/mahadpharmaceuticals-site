"use Effect";
import React, { useEffect, useState } from "react";

// components
import { CarouselItem } from "./ui/carousel";
import GenericCarousel from "./GenericCarousel";
import FeaturedProducts from "./FeaturedProducts";
import { productType } from "@/lib/types";
import Spinner from "./Spinner";

const HomeFeaturedProducts = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [productsItems, setProductsItems] = useState<productType[]>([]);

  async function fetchProducts() {
    let endPoint = `/api/products/?home_featured_products=${true}`;

    const res = await fetch(`${endPoint}`, {
      method: "GET",
    });

    if (res.ok) {
      const { products, _, _: any } = await res.json();
      setProductsItems(products);
      setLoading(false);
    } else {
      setLoading(false);

      return (
        <div className="text-center w-full py-24">
          <p>Something went wrong contact Maha</p>
        </div>
      );
    }
  }

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <div>
      {loading ? (
        <div className="py-20 w-full flex items-center justify-center">
          <div className="h-10 w-10 flex items-center justify-center">
            <Spinner className="fill-green-500 text-green-50" />
          </div>
        </div>
      ) : (
        <>
          {productsItems.length > 0 && (
            <GenericCarousel contentClassName="w-full">
              {productsItems.map((item, idx) => (
                <CarouselItem
                  key={idx}
                  className="aspect-video lg:basis-1/2 sm:pl-10"
                >
                  <FeaturedProducts {...item} />
                </CarouselItem>
              ))}
            </GenericCarousel>
          )}
        </>
      )}
    </div>
  );
};

export default HomeFeaturedProducts;
