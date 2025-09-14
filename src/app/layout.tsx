import type { Metadata } from "next";
import { Urbanist, Geist_Mono } from "next/font/google";
import "./globals.css";

// components
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { StoreProvider } from "@/store/context";
import LoginForm from "@/components/forms/LoginForm";
import DeleteAlert from "@/components/DeleteAlert";
import { ToastContainer } from "react-toastify";

const urbanist = Urbanist({
  variable: "--font-urbanist",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Maha pharmaceuticals",
    template: "%s | Maha pharmaceuticals",
    absolute: "",
  },
  description:
    "Maha Pharmaceuticals is a trusted online pharmacy in the UAE, offering prescription and over-the-counter medicines with fast, secure delivery and convenient Cash on Delivery options.",
  icons: "/logo.svg",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${urbanist.variable} ${geistMono.variable} antialiased flex-1 text-foreground/80 text-lg`}
      >
        <StoreProvider>
          <Navbar />
          <LoginForm />
          <DeleteAlert />
          <ToastContainer />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
