import { HeartPulse, LucideIcon, LucideProps, Pill, Wallet } from "lucide-react";

export const navLink: {label:string; href: string;}[] = [
    {
        label: "Home",
        href: "/"
    },
    {
        label: "Products",
        href: "/products"
    },
    {
        label: "About Us",
        href: "/about-us"
    },
    {
        label: "Contact Us",
        href: "/contact-us"
    },
    
]

export const services: {icon: LucideIcon, title:string; description:string;}[] = [
  {
    icon: Pill,
    title: "Pharmaceuticals",
    description:
      "Providing a reliable selection of pharmaceuticals, from essential prescription medicines to over-the-counter drugs, sourced from certified suppliers."
  },

  {
    icon: HeartPulse,
    title: "Health",
    description:
      "Promoting wellness with a range of healthcare products and services, including supplements, personal care, and patient support."
  },

   {
    icon: Wallet,
    title: "Cash on Deliver",
    description:
      "Have your medicines delivered safely and conveniently right to your doorstep with our reliable Cash on Delivery service, paying only when they arrive."
  },
  
];
