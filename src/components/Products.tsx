"use client";

import React, { Suspense, useEffect, useState } from "react";
import Spinner from "./Spinner";

import { useRouter, useSearchParams } from "next/navigation";

// components
import ProductCard from "./ProductCard";
import { productType } from "@/lib/types";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { ChevronLeft, ChevronRight, TicketMinus } from "lucide-react";
import ListAnimationContainer from "./Animations/ListAnimationContainer";

export default function Products() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-[65vh] flex items-center justify-center">
          <div className="h-10 w-10">
            <Spinner className="fill-green-500 text-green-50" />
          </div>
        </div>
      }
    >
      <ProductsContent />
    </Suspense>
  );
}

const ProductsContent = () => {
  const router = useRouter();

  // state
  const searchParams = useSearchParams();
  const pageNum: number = searchParams.get("page")
    ? Number(searchParams.get("page"))
    : 1;
  const searchQ = searchParams.get("search") ?? undefined;

  const [products, setProducts] = useState<productType[]>([]);
  const [paginator, setPaginator] = useState<{
    page: number;
    totalPages: number;
    loading: boolean;
  }>({
    page: 1,
    totalPages: 1,
    loading: true,
  });

  useEffect(() => {
    async function fetchProducts(pgNum: number, searchQs: string | undefined) {
      let endPoint = `/api/products/?page=${pgNum}`;
      setPaginator((prevData) => ({ ...prevData, loading: true }));

      if (searchQs) endPoint += `&search=${encodeURIComponent(searchQs)}`;

      const res = await fetch(`${endPoint}`, { method: "GET" });

      if (res.ok) {
        const resData = await res.json();
        setProducts(resData.products);
        setPaginator({
          page: resData.pageNum,
          totalPages: resData.totalPages,
          loading: false,
        });
      } else {
        setPaginator((prevData) => ({ ...prevData, loading: false }));
      }
    }

    const params = new URLSearchParams(searchParams.toString());

    if (!params.get("page")) {
      params.set("page", "1");
      router.replace(`?${params.toString()}`);
      setTimeout(() => fetchProducts(pageNum, searchQ), 1000);
    } else {
      fetchProducts(pageNum, searchQ);
    }
  }, [searchParams, pageNum, router, searchQ]);

  const hasNext = paginator.page < paginator.totalPages;
  const hasPrevious = paginator.page > 1;

  const handleNext = () => {
    if (!hasNext) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(paginator.page + 1));
    router.push(`/products?${params.toString()}`);
  };

  const handlePrev = () => {
    if (!hasPrevious) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(paginator.page - 1));
    router.push(`/products?${params.toString()}`);
  };

  return (
    <MaxWidthWrapper className="pb-20">
      {searchQ && (
        <div className="text-lg pb-8 pt-0 flex items-center gap-2">
          <b className="font-bold">SEARCH:</b>
          <p>{searchQ}</p>
        </div>
      )}

      {paginator.loading ? (
        <div className="w-full h-[65vh] flex items-center justify-center">
          <Spinner className="fill-green-500 text-green-50" />
        </div>
      ) : products.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-10 mb-20">
            {products.map((product, idx) => (
              <ListAnimationContainer idx={idx} key={idx}>
                <ProductCard {...product} />
              </ListAnimationContainer>
            ))}
          </div>
          <div className="h-12 flex items-center gap-10">
            {hasPrevious && (
              <button
                className="flex items-center justify-center px-2 h-full leading-tight gap-2 rounded-md border bg-neutral-100 hover:border-green-500 hover:text-black/80 duration-300 transition-all"
                onClick={handlePrev}
              >
                <ChevronLeft className="size-4" />
                <span className="text-current text-sm">Previous</span>
              </button>
            )}
            <p className="text-sm">
              {paginator.page} of {paginator.totalPages}
            </p>
            {hasNext && (
              <button
                onClick={handleNext}
                className="flex items-center justify-center gap-2 px-2 h-full leading-tight rounded-md border bg-neutral-100 hover:border-green-500 hover:text-black/80 duration-300 transition-all"
              >
                <span className="text-current text-sm">Next</span>
                <ChevronRight className="size-4" />
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="py-10 flex items-center flex-col gap-2 justify-center text-center h-[65vh]">
          <TicketMinus className="size-7" />
          <p>No Products at the moment</p>
        </div>
      )}
    </MaxWidthWrapper>
  );
};
