"use client";
import React, { ReactNode } from "react";

// components
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ListAnimationContainer = ({
  children,
  idx,
  className,
}: {
  children: ReactNode;
  idx: number;
  className?: string;
}) => {
  return (
    <motion.div
      key={idx}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: idx * 0.15 }}
      className={cn("", className)}
    >
      {children}
    </motion.div>
  );
};

export default ListAnimationContainer;
