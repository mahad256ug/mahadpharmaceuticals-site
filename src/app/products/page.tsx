import Products from "@/components/Products";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Our Products",
  description: "Message, React out or Contact Maha Pharmaceuticals",
};

const page = () => {
  return (
    <div>
      <Products />
    </div>
  );
};

export default page;
