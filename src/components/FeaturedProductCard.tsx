"use client";

import React from "react";
import Link from "next/link";

// thirdpatry
import { motion } from "framer-motion";

// component
import { productType } from "@/lib/types";

const FeaturedProductCard = ({ ...product }: productType) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.05 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ backgroundImage: `url(${product.thumbnail ?? "/default.jpg"})` }}
      className="w-full h-full aspect-video bg-no-repeat bg-center bg-cover overflow-visible"
    >
      <div className="h-full w-full bg-gradient-to-t from-black/50 via-black/20 to-transparent flex flex-col px-5 sm:px-10 justify-end text-white relative">
        {!product.is_publish && (
          <div className="absolute top-0 w-full bg-green-500 p-2 px-6 tex-center left-0">
            <p className="text-current text-sm font-semibold">
              Not yet Published
            </p>
          </div>
        )}

        <Link href={`/products/${product.slug}`} className="block">
          <div className="p-3 pl-4 bg-black/90 ">
            <motion.h3
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-2xl text-green-500 line-clamp-1"
            >
              {product.title}
            </motion.h3>
          </div>

          <div className="bg-black/80 p-4 py-5">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="text-white/70 line-clamp-2 sm:line-clamp-3 "
            >
              {product.description}
            </motion.p>
          </div>
        </Link>
      </div>
    </motion.div>
  );
};

export default FeaturedProductCard;
