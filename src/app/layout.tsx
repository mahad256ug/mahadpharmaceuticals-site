import { Suspense } from "react";
import type { Metadata } from "next";
import { Urbanist, Roboto_Mono } from "next/font/google";

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

const robotoMono = Roboto_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Mahad pharmaceuticals",
    template: "%s | Mahad pharmaceuticals",
    absolute: "",
  },
  description:
    "Mahad Pharmaceuticals is a trusted online pharmacy in the UAE, offering prescription and over-the-counter medicines with fast, secure delivery and convenient Cash on Delivery options.",
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
        className={`${urbanist.variable} ${robotoMono.variable} antialiased flex-1 text-foreground/80 text-lg`}
      >
        <StoreProvider>
          <Suspense fallback={<div></div>}>
            <Navbar />
          </Suspense>
          <Suspense fallback={<div></div>}>
            <LoginForm />
          </Suspense>
          <DeleteAlert />
          <ToastContainer />
          {children}
          <Footer />
        </StoreProvider>
      </body>
    </html>
  );
}
