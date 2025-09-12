"use client";

import { productImg } from "@/assets";
import { useStoreContext } from "@/store/context";
import { Check, ClipboardEdit, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = () => {
  const { isAuthenticated } = useStoreContext();

  return (
    <div className="flex flex-col items-start">
      <div className="bg-accent/80 relative">
        <Image src={productImg} alt="image" width={300} height={520} />

        <div className="absolute top-2 left-0 bg-green-500 px-3 text-base  -rotate-90">
          <span className="x block text-white text-sm">In Stock</span>
        </div>

        {!isAuthenticated && (
          <div className="absolute top-2 right-2 text-base">
            <Link
              href={`/dashboard/`}
              className="w-10 h-10 flex items-center border justify-center bg-white hover:bg-transparent duration-300 transition-all"
            >
              <ClipboardEdit className="stroke-1 " />
            </Link>
          </div>
        )}
      </div>
      <div className="flex items-center justify-between w-full my-2">
        <p className="block font-semibold">Bioderma</p>

        <button
          type="button"
          className="h-10 w-fit px-2  gap-2 duration-300 transition-all text-green-500 hover:text-black/70 flex items-center "
        >
          {false ? (
            <>
              <span className="text-sm text-current hidden sm:block">Cart</span>
              <ShoppingBag className="size-4 stroke-1" />
            </>
          ) : (
            <>
              <span className="text-current">In</span>
              <Check className="size-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
