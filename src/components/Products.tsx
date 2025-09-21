"use client";

import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

// components
import Loader from "./Loader";
import ProductCard from "./ProductCard";
import { productType } from "@/lib/types";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { ChevronLeft, ChevronRight, TicketMinus } from "lucide-react";
import ListAnimationContainer from "./Animations/ListAnimationContainer";

export default function Products() {
  return <ProductsContent />;
}

const ProductsContent = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const pageNum = searchParams.get("page")
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
    async function fetchProducts(pgNum: number, searchQs?: string) {
      let endPoint = `/api/products/?page=${pgNum}`;
      if (searchQs) endPoint += `&search=${encodeURIComponent(searchQs)}`;

      setPaginator((prev) => ({ ...prev, loading: true }));

      try {
        const res = await fetch(endPoint);
        if (res.ok) {
          const resData = await res.json();
          setProducts(resData.products);
          setPaginator({
            page: resData.pageNum,
            totalPages: resData.totalPages,
            loading: false,
          });
        } else {
          setProducts([]);
          setPaginator((prev) => ({ ...prev, loading: false }));
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setProducts([]);
        setPaginator((prev) => ({ ...prev, loading: false }));
      }
    }

    // Ensure we always have page param in URL
    const params = new URLSearchParams(searchParams.toString());
    if (!params.get("page")) {
      params.set("page", "1");
      router.replace(`?${params.toString()}`);
      fetchProducts(1, searchQ);
    } else {
      fetchProducts(pageNum, searchQ);
    }
  }, [pageNum, searchQ, searchParams, router]);

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
        <div className="text-lg pb-8 flex items-center gap-2">
          <b className="font-bold">SEARCH:</b>
          <p>{searchQ}</p>
        </div>
      )}

      {paginator.loading ? (
        <Loader />
      ) : products.length > 0 ? (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-10 mb-20">
            {products.map((product, idx) => (
              <ListAnimationContainer idx={idx} key={product.id ?? idx}>
                <ProductCard {...product} />
              </ListAnimationContainer>
            ))}
          </div>
          <div className="h-12 flex items-center gap-10">
            {hasPrevious && (
              <button
                onClick={handlePrev}
                className="flex items-center justify-center px-2 h-full gap-2 rounded-md border bg-neutral-100 hover:border-green-500 hover:text-black/80 transition-all"
              >
                <ChevronLeft className="size-4" />
                <span className="text-sm">Previous</span>
              </button>
            )}
            <p className="text-sm">
              {paginator.page} of {paginator.totalPages}
            </p>
            {hasNext && (
              <button
                onClick={handleNext}
                className="flex items-center justify-center gap-2 px-2 h-full rounded-md border bg-neutral-100 hover:border-green-500 hover:text-black/80 transition-all"
              >
                <span className="text-sm">Next</span>
                <ChevronRight className="size-4" />
              </button>
            )}
          </div>
        </>
      ) : (
        <div className="py-10 flex flex-col items-center gap-2 justify-center text-center h-[65vh]">
          <TicketMinus className="size-7" />
          <p>No Products at the moment</p>
        </div>
      )}
    </MaxWidthWrapper>
  );
};
