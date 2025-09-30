import React, { Suspense } from "react";
import ProductForm from "@/components/forms/ProductForm";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";

const Page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;

  console.log(slug, "this print");

  return (
    <Suspense fallback={<div></div>}>
      <MaxWidthWrapper>
        <ProductForm slug={slug} />
      </MaxWidthWrapper>
    </Suspense>
  );
};

export default Page;
