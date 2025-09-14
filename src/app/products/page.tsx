import Products from "@/components/Products";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Our Products",
  description: "Explore Maha Pharmaceuticals’ wide range of high-quality medicines and healthcare products. From prescription drugs to over-the-counter remedies, vitamins, and personal care items, we provide safe and effective solutions for all your health needs. Enjoy convenient online ordering and fast delivery across the UAE.",
};

const page = () => {
  return (
    <div>
      <Products />
    </div>
  );
};

export default page;
