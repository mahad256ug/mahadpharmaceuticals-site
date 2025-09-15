"use client";
import React from "react";
import Image from "next/image";

// compoennts
import { X } from "lucide-react";
import { productType } from "@/lib/types";
import { useStoreContext } from "@/store/context";

const ProductCartCard = (product: productType) => {
  const { removeProductFromCart } = useStoreContext();
  return (
    <div className="p-4 md:p-6 bg-accent">
      <div className="space-y-4 md:flex md:items-center md:justify-between md:gap-6 md:space-y-0">
        <a href="#" className="w-20 shrink-0 md:order-1">
          <Image
            className="h-20 w-20 dark:hidden"
            src={product.thumbnail ?? ""}
            alt={product.title}
            width={300}
            height={300}
          />
        </a>

        <div className="w-full min-w-0 flex-1 space-y-4 md:order-2 md:max-w-m ">
          <h3 className="text-base font-medium text-gray-900 hover:underline mb-2">
            {product.title}
          </h3>

          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => removeProductFromCart(product)}
              className="inline-flex items-center text-sm font-medium text-red-600 hover:underline dark:text-red-500 gap-1"
            >
              <X className="size-5" />
              <p className="text-current text-base">Remove</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCartCard;
