"use client";
import React, { useEffect, useState } from "react";

// components
import { productType } from "@/lib/types";
import MaxWidthWrapper from "./MaxWidthWrapper";
import Image from "next/image";
import { drugImg } from "@/assets";
import { useStoreContext } from "@/store/context";
import { Bookmark, ClipboardEdit, Trash } from "lucide-react";
import Spinner from "./Spinner";
import { NO_NUMBER } from "@/lib/constants";
import Link from "next/link";

const ProductDetail = ({ slug }: { slug: string }) => {
  const {
    isAuthenticated,
    productsCart,
    addProductToCart,
    removeProductFromCart,
    setDeleteAlertState,
  } = useStoreContext();

  const [loading, setLoading] = useState<boolean>(true);
  const [product, setProduct] = useState<productType>();

  const exists = productsCart.some((p) => p.id === product?.id);

  async function fetchProduct() {
    if (!loading) setLoading(true);

    if (slug) {
      const getProduct = await fetch(`/api/products/${slug}/`, {
        method: "GET",
      });

      if (getProduct.ok) {
        const productData = await getProduct.json();
        setProduct(productData.product);
      } else {
        const error = getProduct.json();
        console.log(error);
      }

      setLoading(false);
    }
  }

  useEffect(() => {
    fetchProduct();
  }, [slug]);

  const message = encodeURIComponent(
    `Hello Maha Pharmaceuticals, I want to buy: ${product?.title}`
  );
  const whatsappLink = `https://wa.me/${NO_NUMBER}?text=${message}`;

  return (
    <MaxWidthWrapper>
      {loading ? (
        <div className="w-full h-[65vh] flex items-center justify-center">
          <div className="h-10 w-10 flex items-center justify-center">
            <Spinner className="fill-green-500 text-green-50" />
          </div>
        </div>
      ) : product ? (
        <div className="flex flex-col gap-5">
          <div className="max-w-lg px-4">
            <div className="flex items-start gap-4 justify-between flex-wrap relative  mb-5">
              <h3 className="text-3xl ">{product.title}</h3>
              <div className="flex items-center gap-2 w-fit">
                {isAuthenticated && (
                  <>
                    {/* delete */}
                    <button
                      type="button"
                      onClick={() =>
                        setDeleteAlertState({
                          product: product,
                          isVisible: true,
                          title: "",
                        })
                      }
                      className="h-10 w-fit px-2 gap-2 duration-300  transition-all hover:text-black/70 flex items-center z-10 bg-accent border"
                    >
                      <Trash className="stroke-1" />
                    </button>

                    {/* edit */}
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

            {!product.view_price && (
              <p className="my-4 font-bold text-xl">AED {product.price}</p>
            )}
          </div>

          <div className="mt-5 max-w-lg p-4 w-full">
            <Image
              src={product.thumbnail ?? drugImg}
              width={500}
              height={500}
              alt={"ukasha"}
              className="w-full h-full object-cover"
            />
          </div>

          {/* plase order btn */}
          <div className="flex items-center max-w-lg mt-10 w-full max-md:mx-auto">
            <Link
              href={whatsappLink}
              target={"_blank"}
              className="h-12 w-full border flex items-center justify-center border-green-500 text-green-500 hover:bg-green-500 hover:text-white duration-400 transition-all"
            >
              <p className="text-current">Place Order Now</p>
            </Link>
          </div>
        </div>
      ) : (
        <div className="flex items-center h-[65vh] py-8 justify-center">
          <div className="text-center flex flex-col gap-2">
            <h3 className="text-4xl mb-6">404</h3>
            <div className="max-w-md sm:max-w-xs mx-auto p-10">
              <h5 className="text-xl mb-6 uppercase">Product Not Found</h5>
              <p>The product was not found, or you have an invalid URL.</p>
            </div>
          </div>
        </div>
      )}
    </MaxWidthWrapper>
  );
};

export default ProductDetail;
