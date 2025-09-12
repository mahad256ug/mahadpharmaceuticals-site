import { HeartPulse, LucideIcon, LucideProps, Pill } from "lucide-react";

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
      "High-quality prescription and over-the-counter medicines manufactured under strict international standards to ensure safety and efficacy."
  },

  {
    icon: HeartPulse,
    title: "Health",
    description:
      "Comprehensive health solutions, including diagnostic tools and patient support services, designed to improve treatment outcomes."
  },
  
];
