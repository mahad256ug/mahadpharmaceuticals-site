// components
import Hero from "@/components/Hero";
import About from "@/components/About";
import ContactUs from "@/components/ContactUs";
import HomeProducts from "@/components/HomeProducts";
import DeleteAlert from "@/components/DeleteAlert";

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
