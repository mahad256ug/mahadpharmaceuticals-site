import React, { Suspense } from "react";
import type { Metadata } from "next";

// components
import ProductForm from "@/components/forms/ProductForm";
import UnpublishedProducts from "@/components/UnpublishedProducts";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

export const metadata: Metadata = {
  title: {
    absolute: "Dashboard",
  },
  description: "?",
};

const Dashboard = () => {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center">
          <p>Loading...</p>
        </div>
      }
    >
      <MaxWidthWrapper className="flex items-start flex-col xl:flex-row gap-10 max-w-[100rem] mx-auto my-10 p-0 justify-between">
        <div className="basis-full xl:basis-8/12">
          <ProductForm />;
        </div>
        <div className="basis-full xl:basis-4/12 ">
          <UnpublishedProducts />
        </div>
      </MaxWidthWrapper>
    </Suspense>
  );
};

export default Dashboard;
