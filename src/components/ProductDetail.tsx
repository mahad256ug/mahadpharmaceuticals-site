"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

// components
import Loader from "./Loader";
import { courrptImg } from "@/assets";
import { productType } from "@/lib/types";
import { PHONE_NO } from "@/lib/constants";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { useStoreContext } from "@/store/context";
import { Bookmark, ClipboardEdit, Trash } from "lucide-react";
import { fetchProduct } from "@/fetchers/products";

interface Props {
  slug: string;
}

const ProductDetailWrapper = ({ slug }: Props) => {
  return <ProductDetailContent slug={slug} />;
};

const ProductDetailContent = ({ slug }: Props) => {
  const {
    isAuthenticated,
    productsCart,
    addProductToCart,
    removeProductFromCart,
    setDeleteAlertState,
  } = useStoreContext();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState<productType | null>(null);

  const exists = productsCart.some((p) => p.id === product?.id);

  useEffect(() => {
    setLoading(true);
    async function fetch() {
      const data = await fetchProduct(slug);
      setProduct(data);
      setLoading(false);
    }

    fetch();
  }, [slug]);

  const message = encodeURIComponent(
    `Hello Maha Pharmaceuticals, I want to buy: ${product?.title}`
  );
  const whatsappLink = `https://wa.me/${PHONE_NO}?text=${message}`;

  return loading ? (
    <div className="py-32">
      <div className="flex items-center justify-center">
        <Loader />
      </div>
    </div>
  ) : (
    <>
      {!product ? (
        <div className="flex items-center h-[65vh] py-8 justify-center">
          <div className="text-center flex flex-col gap-2">
            <h3 className="text-4xl mb-6">404</h3>
            <div className="max-w-md sm:max-w-xs mx-auto p-10">
              <h5 className="text-xl mb-6 uppercase">Product Not Found</h5>
              <p>The product was not found, or you have an invalid URL.</p>
            </div>
          </div>
        </div>
      ) : (
        <MaxWidthWrapper>
          <div className="flex flex-col gap-5 max-w-3xl ">
            <div className="px-4">
              <div className="flex items-start gap-4 justify-between flex-wrap relative mb-5">
                <h3 className="text-3xl uppercase">{product.title}</h3>
                <div className="flex items-center gap-2 w-fit">
                  {isAuthenticated && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setDeleteAlertState({
                            product: product,
                            isVisible: true,
                            title: "",
                          })
                        }
                        className="h-10 w-fit px-2 gap-2 duration-300 transition-all hover:text-black/70 flex items-center z-10 bg-accent border"
                      >
                        <Trash className="stroke-1" />
                      </button>

                      <Link
                        href={`/dashboard/edit/${product.slug}`}
                        className="h-10 w-fit px-2 gap-2 duration-300 transition-all hover:text-black/70 flex items-center z-10 bg-accent border"
                      >
                        <ClipboardEdit className="stroke-1" />
                      </Link>
                    </>
                  )}
                  {exists ? (
                    <button
                      type="button"
                      onClick={() => product && removeProductFromCart(product)}
                      className="h-10 w-fit px-2 gap-2 duration-300 transition-all hover:text-black/70 flex items-center z-10 bg-accent border text-black/60"
                    >
                      <Bookmark className="fill-current stroke-black/10" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => product && addProductToCart(product)}
                      className="h-10 w-fit px-2 gap-2 duration-300 transition-all hover:text-black/70 flex items-center z-10 bg-accent border"
                    >
                      <Bookmark className="stroke-1" />
                    </button>
                  )}
                </div>
              </div>
              <p>{product.description}</p>

              {product.view_price && (
                <p className="my-4 font-bold text-xl">AED {product.price}</p>
              )}
            </div>

            <div className="mt-5 p-4 w-full max-w-72">
              <Image
                src={product.thumbnail ?? courrptImg}
                width={500}
                height={500}
                alt={product.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="flex items-center mt-10 w-full max-md:mx-auto">
              <Link
                href={whatsappLink}
                target="_blank"
                className="h-12 w-full border flex items-center justify-center border-green-500 text-green-500 hover:bg-green-500 hover:text-white duration-400 transition-all"
              >
                <p className="text-current">Place Order Now</p>
              </Link>
            </div>
          </div>
        </MaxWidthWrapper>
      )}
    </>
  );
};

export default ProductDetailWrapper;
