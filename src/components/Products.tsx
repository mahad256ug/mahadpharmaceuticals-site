"use client";

import React, { useEffect, useState } from "react";
// components
import ProductCard from "./ProductCard";
import MaxWidthWrapper from "./MaxWidthWrapper";
import ListAnimationContainer from "./Animations/ListAnimationContainer";
import PaginationBtns from "./PaginationBtns";
import { productType } from "@/lib/types";
import Spinner from "./Spinner";
import { useRouter, useSearchParams } from "next/navigation";

const Products = () => {
  const router = useRouter();

  const searchParams = useSearchParams();
  const pageParam = searchParams.get("page") ?? 1;
  const qsParam = searchParams.get("search") ?? undefined;

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

  async function fetchProducts(pageNum: number) {
    const res = await fetch(`/api/products/?page=${pageNum}`, {
      method: "GET",
    });

    if (res.ok) {
      const { products, totalPages, page, loading } = await res.json();

      setProducts(products);
      setPaginator({
        page: page,
        totalPages: totalPages,
        loading: loading,
      });
    } else {
      console.log("failed to loadin products");
    }
  }

  useEffect(() => {
    fetchProducts(1);
  }, [searchParams]);

  const handleNext = () => {
    if (paginator.page < paginator.totalPages) {
      const nextPage = paginator.page + 1;
      router.push(`/products?page=${nextPage}`);
    }
  };

  const handlePrev = () => {
    if (paginator.page > 1) {
      const previousPage = paginator.page - 1;
      router.push(`/products?page=${previousPage}`);
    }
  };

  return (
    <MaxWidthWrapper className="py-20">
      {paginator.loading ? (
        <div className="w-full h-[65vh] flex items-center justify-center">
          <div className="h-10 w-10 flex items-center justify-center">
            <Spinner className="fill-green-500 text-green-50" />
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-10 mb-20">
            {products.map((product, idx) => (
              <ListAnimationContainer idx={idx} key={idx}>
                <ProductCard {...product} />
              </ListAnimationContainer>
            ))}
          </div>

          <div>
            <button onClick={handlePrev} disabled={paginator.page === 1}>
              Previous
            </button>
            <span>
              Page {paginator.page} of {paginator.totalPages}
            </span>
            <button
              onClick={handleNext}
              disabled={paginator.page === paginator.totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}

      {/* <PaginationBtns /> */}
    </MaxWidthWrapper>
  );
};

export default Products;
