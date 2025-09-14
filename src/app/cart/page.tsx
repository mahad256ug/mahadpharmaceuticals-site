import React from "react";
import type { Metadata } from "next";

// components
import ShoppingCart from "@/components/ShoppingCart";

export const metadata: Metadata = {
  title: "My Drugs",
  description:
    "Keep track of your selected medicines with My Drugs, your personal shopping cart for all healthcare needs. Review, manage, and update your prescription and over-the-counter medicines before checkout. Our easy-to-use cart ensures a smooth ordering process, helping you quickly access essential drugs and wellness products. Enjoy secure online ordering, fast delivery across the UAE, and convenient Cash on Delivery options for all your medications.",
};

const page = () => {
  return <ShoppingCart />;
};

export default page;
