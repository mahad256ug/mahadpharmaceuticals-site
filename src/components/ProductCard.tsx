"use client";

import { productImg } from "@/assets";
import { productType } from "@/lib/types";
import { useStoreContext } from "@/store/context";
import { ClipboardEdit, Minus, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductCard = ({ ...props }: productType) => {
  const { isAuthenticated } = useStoreContext();

  return (
    <div className="flex flex-col items-start">
      <div className="bg-accent/80 relative">
        <Image
          src={props.thumbnail ?? productImg}
          alt="image"
          width={300}
          height={520}
        />

        {isAuthenticated && (
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
        <p className="block font-semibold capitalize">{props.title}</p>

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
              <span className="text-current">Del</span>
              <Minus className="size-4" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
