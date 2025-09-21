"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

// compoenent
import { courrptImg } from "@/assets";
import { productType } from "@/lib/types";
import { useStoreContext } from "@/store/context";
import { Bookmark, ClipboardEdit, Trash } from "lucide-react";

const ProductCard = ({ ...props }: productType) => {
  const {
    isAuthenticated,
    productsCart,
    addProductToCart,
    removeProductFromCart,
    setDeleteAlertState,
  } = useStoreContext();

  const exists = productsCart.some((p) => p.id === props.id);

  return (
    <div className="flex flex-col items-start">
      <div className="bg-accent/80 relative h-full max-h-[18rem] flex items-center justify-center min-h-[18rem]">
        <Link
          href={`/products/${props.slug}`}
          className="w-full h-full flex items-center justify-center"
        >
          <Image
            src={props.thumbnail ?? courrptImg}
            alt="image"
            width={300}
            height={520}
          />
        </Link>

        {!props.is_publish && (
          <div className="absolute top-0 left-1/2 -translate-1/2 text-white font-semibold bg-green-500 p-2">
            <p className="text-xs text-current">Not published</p>
          </div>
        )}
      </div>
      <div className="flex flex-col gap-2 text-center w-full my-4 relative">
        <Link
          href={`/products/${props.slug}`}
          className="block font-semibold capitalize line-clamp-3 sm:line-clamp-2"
        >
          {props.title ?? "Product"}
        </Link>

        {props.view_price && <p className="block">AED {props.price}</p>}

        <div className="absolute flex items-center gap-2 justify-center  w-full bottom-[135%]">
          {isAuthenticated && (
            <>
              {/* delete */}
              <button
                type="button"
                onClick={() =>
                  setDeleteAlertState({
                    product: props,
                    isVisible: true,
                    title: "",
                  })
                }
                className="h-10 w-fit px-2 gap-2 duration-300 transition-all hover:text-black/70 flex items-center z-10 bg-accent border"
              >
                <Trash className="stroke-1" />
              </button>

              {/* edit */}
              <Link
                href={`/dashboard/edit/${props.slug}`}
                className="h-10 w-fit px-2 gap-2 duration-300 transition-all hover:text-black/70 flex items-center z-10 bg-accent border"
              >
                <ClipboardEdit className="stroke-1" />
              </Link>
            </>
          )}

          {/* add to cart */}
          {exists ? (
            <button
              type="button"
              onClick={() => removeProductFromCart(props)}
              className="h-10 w-fit px-2 gap-2 duration-300 transition-all hover:text-black/70 flex items-center z-10 bg-accent border text-black/60"
            >
              <Bookmark className="fill-current stroke-black/10" />
            </button>
          ) : (
            <button
              type="button"
              onClick={() => addProductToCart(props)}
              className="h-10 w-fit px-2 gap-2 duration-300 transition-all hover:text-black/70 flex items-center z-10 bg-accent border"
            >
              <Bookmark className="stroke-1" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
