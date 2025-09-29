"use client";

import {
  fetchHomeFeaturedProducts,
  fetchHomeProducts,
} from "@/fetchers/products";
import Link from "next/link";
import ProductCard from "./ProductCard";
import ListAnimationContainer from "./Animations/ListAnimationContainer";
import MaxWidthWrapper from "./MaxWidthWrapper";
import SectionHead from "./Animations/SectionHead";

import { CarouselItem } from "./ui/carousel";
import GenericCarousel from "./GenericCarousel";
import FeaturedProductCard from "./FeaturedProductCard";
import { useEffect, useState } from "react";
import { productType } from "@/lib/types";
import Loader from "./Loader";

export default function HomeProductsWrapper() {
  const [loading, setLoading] = useState<boolean>(true);
  const [products, setProducts] = useState<productType[]>([]);
  const [productsFt, setProductsFt] = useState<productType[]>([]);

  useEffect(() => {
    if (!loading) setLoading(true);
    async function fetchPdt() {
      const pdt = await fetchHomeProducts();
      const pdtFt = await fetchHomeFeaturedProducts();

      setProducts(pdt);
      setProductsFt(pdtFt);

      setLoading(false);
    }

    fetchPdt();
  }, []);

  return (
    <MaxWidthWrapper>
      <SectionHead
        title="Our Products"
        subtitle="we offer safe, affordable, and high-quality medicines and healthcare products — from prescription drugs to everyday wellness essentials."
      />

      {loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div className="flex flex-col gap-10">
          <div>
            {productsFt.length && (
              <GenericCarousel contentClassName="w-full overflow-visible">
                {productsFt.map((item, idx) => {
                  // Set basis: full width if only one item, else 1/2
                  const basisClass =
                    productsFt.length === 1 ? "basis-full" : "lg:basis-1/2";

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
          </div>
          <div>
            {products.length > 0 && (
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-10 mt-24 mb-14">
                {products.map((item, idx) => (
                  <ListAnimationContainer idx={idx} key={idx}>
                    <ProductCard {...item} />
                  </ListAnimationContainer>
                ))}
              </div>
            )}
          </div>
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
  );
}
