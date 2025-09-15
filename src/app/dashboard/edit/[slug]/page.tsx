import React from "react";

// components
import ProductForm from "@/components/forms/ProductForm";

const page = async ({ params }: { params: Promise<{ slug: string }> }) => {
  const { slug } = await params;
  return <ProductForm slug={slug} />;
};

export default page;
