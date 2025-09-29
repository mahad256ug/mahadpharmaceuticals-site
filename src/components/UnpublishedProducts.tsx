"use client";
import React, { useEffect, useState } from "react";

// components
import SectionHead from "./Animations/SectionHead";
import { productType } from "@/lib/types";
import ProductCard from "./ProductCard";
import { CakeSlice } from "lucide-react";
import Loader from "./Loader";
import { fetchUnpublishedProducts } from "@/fetchers/products";

const UnpublishedProducts = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [productsItems, setProductsItems] = useState<productType[]>([]);

  useEffect(() => {
    async function fetch() {
      const data = await fetchUnpublishedProducts();
      if (data) {
        setProductsItems(data);
      }
    }

    fetch();
    setLoading(false);
  }, []);
  return loading ? (
    <Loader />
  ) : (
    <div>
      <div>
        <SectionHead
          title="Unpublished Products"
          subtitle="Items that have been created in the system but are not yet visible to
          customers. They remain hidden from the storefront until you choose to
          publish them."
          className="text-start max-w-3xl"
          subtitleClass="max-w-2xl"
        />
      </div>

      <div className="grid grid-cols-2">
        {productsItems.length > 0 ? (
          productsItems.map((item, idx) => <ProductCard key={idx} {...item} />)
        ) : (
          <div className="w-full flex items-center gap-4 justify-center text-center mb-10 col-span-2">
            <div className="flex flex-col gap-4 justify-center items-center">
              <CakeSlice />
              <p>
                No Published Products yet, are you authenticated or authorized.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UnpublishedProducts;
