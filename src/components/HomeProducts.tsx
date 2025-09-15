"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";

// components
import Spinner from "./Spinner";
import ProductCard from "./ProductCard";
import { productType } from "@/lib/types";
import MaxWidthWrapper from "./MaxWidthWrapper";
import SectionHead from "./Animations/SectionHead";
import HomeFeaturedProducts from "./HomeFeaturedProducts";
import ListAnimationContainer from "./Animations/ListAnimationContainer";

const HomeProductsWrapper = () => {
  return (
    <Suspense
      fallback={
        <div className="py-20 flex items-center justify-center">
          <div className="h-10 w-10">
            <Spinner className="fill-green-500 text-green-50" />
          </div>
        </div>
      }
    >
      <HomeProductsContent />
    </Suspense>
  );
};

const HomeProductsContent = () => {
  const [productsItems, setProductsItems] = useState<productType[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(`/api/products/?home_products=true`);
        if (res.ok) {
          const { products } = await res.json();
          setProductsItems(products);
        } else {
          console.error("Failed to fetch products");
        }
      } catch (err) {
        console.error(err);
      } finally {
      }
    }

    fetchProducts();
  }, []);

  return (
    <MaxWidthWrapper>
      <SectionHead
        title="Our Products"
        subtitle="we offer safe, affordable, and high-quality medicines and healthcare products — from prescription drugs to everyday wellness essentials."
      />

      <HomeFeaturedProducts />

      <Suspense
        fallback={
          <div className="py-20 flex items-center justify-center">
            <div className="h-10 w-10">
              <Spinner className="fill-green-500 text-green-50" />
            </div>
          </div>
        }
      >
        {productsItems.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-10 mt-24 mb-14">
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
      </Suspense>

      <div className="text-center mt-12">
        <Link
          href="/products"
          className="border border-green-500 py-3 px-5 text-green-500 hover:bg-green-500 hover:text-white duration-300 transition-all ease-in-out"
        >
          More Products
        </Link>
      </div>
    </MaxWidthWrapper>
  );
};

export default HomeProductsWrapper;
