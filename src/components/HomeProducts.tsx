"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

// component
import ProductCard from "./ProductCard";
import MaxWidthWrapper from "./MaxWidthWrapper";
import SectionHead from "./Animations/SectionHead";
import HomeFeaturedProducts from "./HomeFeaturedProducts";
import ListAnimationContainer from "./Animations/ListAnimationContainer";
import { productType } from "@/lib/types";
import Spinner from "./Spinner";

const HomeProducts = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [productsItems, setProductsItems] = useState<productType[]>([]);

  async function fetchProducts() {
    let endPoint = `/api/products/?home_products=${true}`;

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
      <MaxWidthWrapper>
        <SectionHead
          title="Our Products"
          subtitle="we offer safe, affordable, and high-quality medicines and healthcare products — from prescription drugs to everyday wellness essentials."
        />

        <HomeFeaturedProducts />

        {loading ? (
          <div className="py-20 flex items-center justify-center">
            <div className="h-10 w-10 flex items-center justify-center">
              <Spinner className="fill-green-500 text-green-50" />
            </div>
          </div>
        ) : productsItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 space-y-10 space-x-5  sm:space-x-0 sm:gap-10 mt-24 mb-14">
            {productsItems.map((item, idx) => (
              <ListAnimationContainer idx={idx} key={idx}>
                <ProductCard {...item} />
              </ListAnimationContainer>
            ))}
          </div>
        ) : (
          <div className="flex items-center justify-center py-8">
            <p className="text-center">
              There are no Products / drugs at the moment.
            </p>
          </div>
        )}

        <div className="text-center mt-12">
          <Link
            href="/products"
            className="border border-green-500 py-3 px-5 text-green-500 hover:bg-green-500 hover:text-white duration-300 transition-all ease-in-out"
          >
            More Products
          </Link>
        </div>
      </MaxWidthWrapper>
    </div>
  );
};

export default HomeProducts;
