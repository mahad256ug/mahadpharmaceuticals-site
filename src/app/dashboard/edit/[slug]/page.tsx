import React, { Suspense } from "react";

// components
import ProductForm from "@/components/forms/ProductForm";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductForm slug={slug} />;
    </Suspense>
  );
};

export default page;
