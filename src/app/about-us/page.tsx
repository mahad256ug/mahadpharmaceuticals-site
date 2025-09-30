import React from "react";
import type { Metadata } from "next";

// compnents
import About from "@/components/About";
import Services from "@/components/Services";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn more about Mahad Pharmaceuticals, a trusted online pharmacy in the UAE. We provide safe, high-quality medicines, prescription and over-the-counter drugs, and wellness products with fast, reliable delivery. Our mission is to make healthcare accessible and convenient for everyone.",
};

const page = () => {
  return (
    <div>
      <About />
      <Services />
    </div>
  );
};

export default page;
