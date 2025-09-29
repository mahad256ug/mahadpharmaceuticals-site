// components
import Hero from "@/components/Hero";
import About from "@/components/About";
import ContactUs from "@/components/ContactUs";
import HomeProductsWrapper from "@/components/HomeProductsWrapper";

export default function Home() {
  return (
    <>
      <Hero />
      <HomeProductsWrapper />
      <About />
      <ContactUs />
    </>
  );
}
