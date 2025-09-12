import React from "react";
import type { Metadata } from "next";

// components
import ContactUs from "@/components/ContactUs";

export const metadata: Metadata = {
  title: "Contact Maha Pharmaceuticals",
  description: "Message, React out or Contact Maha Pharmaceuticals",
};

const page = () => {
  return <ContactUs />;
};

export default page;
