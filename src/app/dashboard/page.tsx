import React from "react";
import type { Metadata } from "next";

// components
import ProductForm from "@/components/forms/ProductForm";

export const metadata: Metadata = {
  title: {
    absolute: "Dashboard",
  },
  description: "?",
};

const Dashboard = () => {
  return <ProductForm />;
};

export default Dashboard;
