"use client";

import React from "react";

// thirdpatry
import { motion } from "framer-motion";

// component
import { productType } from "@/lib/types";

const FeaturedProducts = ({ ...product }: productType) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.05 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ backgroundImage: `url(${product.thumbnail ?? "/drugs.jpeg"})` }}
      className="w-full h-full aspect-video bg-no-repeat bg-center bg-cover overflow-hidden"
    >
      <div className="h-full w-full bg-gradient-to-t from-black/50 via-black/20 to-transparent flex flex-col p-5 sm:p-10 justify-end text-white">
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="text-2xl sm:text-3xl text-green-500 mb-4 line-clamp-1 uppercase"
        >
          {product.title}
        </motion.h3>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="text-white/70 line-clamp-2 sm:line-clamp-3"
        >
          {product.description}
        </motion.p>
      </div>
    </motion.div>
  );
};

export default FeaturedProducts;
