"use client";

import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import MaxWidthWrapper from "./MaxWidthWrapper";
import React, { useEffect, useState } from "react";

// components
import Link from "next/link";
import { Logo } from "@/assets";
import SearchBox from "./SearchBox";
import { navLink } from "@/lib/constants";
import { LucideShoppingBag, PlusIcon, Search, X } from "lucide-react";

// motion
import { AnimatePresence, motion } from "framer-motion";
import { useStoreContext } from "@/store/context";

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { isAuthenticated, productsCart } = useStoreContext();

  const [searchBox, setSearchBox] = useState<boolean>(false);
  const [toggleSidebar, setToggleSidebar] = useState<boolean>(false);
  const productsCartCount = productsCart.length;

  useEffect(() => {
    setToggleSidebar(false);
  }, [pathname]);

  return (
    <div className="sticky top-0 z-50 bg-white">
      <MaxWidthWrapper className="py-2 px-5 relative overflow-visible">
        <div className="w-full flex justify-between items-center h-14">
          <div>
            <Link href={"/"} className="block">
              <Image
                src={Logo}
                alt="logo"
                width={45}
                height={45}
                className=""
              />
            </Link>
          </div>

          {/* navbar */}
          <div className="h-full hidden md:block text-xl">
            <nav className="flex h-full w-full">
              <ul className="w-full flex items-center gap-2 h-full ">
                {navLink.map((item, idx) => {
                  const isActive = pathname === item.href;

                  return (
                    <li className="h-full flex items-center" key={idx}>
                      <Link
                        href={item.href}
                        className={`relative z-10 uppercase px-3 py-2 transition-colors whitespace-nowrap sm:text-base md:text-lg xl:text-xl ${
                          isActive
                            ? "text-green-500 font-bold"
                            : "text-black/80 hover:text-green-500"
                        }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>

          {/* sidebar */}
          <AnimatePresence>
            {toggleSidebar && (
              <motion.div
                initial={{ clipPath: "inset(0% 0% 100% 0%)", opacity: 0 }}
                animate={{ clipPath: "inset(0% 0% 0% 0%)", opacity: 1 }}
                exit={{ clipPath: "inset(0% 0% 100% 0%)", opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="absolute top-full left-0 w-full bg-white z-40 px-4 py-4 overflow-hidden border-b pb-8 font-semibold"
              >
                <ul className="w-full flex flex-col items-center gap-2">
                  {navLink.map((item, idx) => {
                    const isActive = pathname === item.href;

                    return (
                      <li className="h-full flex items-center" key={idx}>
                        <Link
                          href={item.href}
                          className={`relative z-10 uppercase px-3 py-2 transition-colors ${
                            isActive
                              ? "text-green-500 font-bold"
                              : "text-black/80 hover:text-green-500"
                          }`}
                        >
                          {item.label}
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex items-center h-12 ">
            <button
              type="button"
              onClick={() => setSearchBox(!searchBox)}
              className="w-10 h-10 flex items-center justify-center"
            >
              <Search className="size-5" />
            </button>

            <button
              onClick={() => {
                router.push("/cart");
              }}
              type="button"
              className={`w-10 h-10 flex items-center justify-center relative ${productsCartCount ? "bounce-ani" : ""}`}
            >
              <div>
                <LucideShoppingBag className="size-5" />
              </div>
              {productsCartCount > 0 && (
                <div className="absolute bg-green-500 h-6 w-6 -top-1 -right-1 flex items-center justify-center max-sm:text-sm">
                  <span className="text-xs font-semibold text-white">
                    {productsCartCount}
                  </span>
                </div>
              )}
            </button>

            {isAuthenticated ? (
              <button
                type="button"
                onClick={() => router.push("/dashboard?add_product=true")}
                className="w-fit px-3 h-12 flex items-center gap-2 bg-green-500 text-white ml-3"
              >
                <PlusIcon className="size-5" />
                <span className="text-sm text-current whitespace-nowrap hidden sm:block">
                  Add Product
                </span>
              </button>
            ) : (
              <button
                type="button"
                onClick={() => router.push("?login=true")}
                className="w-fit px-5 h-full bg-green-500 text-white ml-3"
              >
                Login
              </button>
            )}

            <button
              type="button"
              onClick={() => setToggleSidebar(!toggleSidebar)}
              className="w-7 h-9 flex items-center  justify-between flex-col py-2 px-1 ml-3 md:hidden"
            >
              <span
                className={`h-[2.5px] w-full bg-black/70 rounded-full`}
              ></span>

              <span
                className={`h-[2.5px] transition-all duration-300 bg-black/70 rounded-full ${
                  toggleSidebar ? "w-0" : "w-full"
                }`}
              ></span>
              <span className="h-[2.5px] w-full bg-black/70 rounded-full"></span>
            </button>
          </div>
        </div>

        {/* search box */}
        <AnimatePresence>
          {searchBox && (
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              exit={{ width: 0 }}
              className="w-full absolute top-0 left-1/2 -translate-x-1/2 h-full p-2 bg-white flex items-center px-4 gap-2 border-b overflow-hidden z-10"
            >
              <button
                type="button"
                onClick={() => setSearchBox(false)}
                className="p-3"
              >
                <X className="size-5" />
              </button>
              <SearchBox />
            </motion.div>
          )}
        </AnimatePresence>
      </MaxWidthWrapper>
    </div>
  );
};

export default Navbar;
