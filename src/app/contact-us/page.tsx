import React, { Suspense } from "react";
import type { Metadata } from "next";

// components
import ContactUs from "@/components/ContactUs";

export const metadata: Metadata = {
  title: "Contact Maha Pharmaceuticals",
  description:
    "Have questions or need assistance with your medicines? Contact Maha Pharmaceuticals for fast, reliable support. Our team is here to help with orders, delivery inquiries, and any health-related questions. Reach out via phone, email, or our online chat for a smooth and convenient experience.",
};

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ContactUs />;
    </Suspense>
  );
};

export default page;
