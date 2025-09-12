import type { Metadata } from "next";
// components
import About from "@/components/About";
import ContactUs from "@/components/ContactUs";
import Hero from "@/components/Hero";
import HomeProducts from "@/components/HomeProducts";

export const metadata: Metadata = {
  title: "Home",
  description: "Message, React out or Contact Maha Pharmaceuticals",
};

export default function Home() {
  return (
    <>
      <Hero />
      <HomeProducts />
      <About />
      <ContactUs />
    </>
  );
}
