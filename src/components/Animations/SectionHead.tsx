"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { motion, Variants } from "framer-motion";

const SectionHead = ({
  title = "Our Networks",
  subtitle = "Discover the platforms shaping Uganda’s digital future.",
  className,
  subtitleClass,
}: {
  title?: string;
  subtitle?: string;
  className?: string;
  subtitleClass?: string;
}) => {
  // extract last word
  const words = title.trim().split(" ");
  const lastTitleWord = words.pop() || "";
  const firstTitleWords = words.join(" ");

  // Animation Variants
  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.25,
      },
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className={cn("text-center mb-20", className)}
    >
      {/* Title */}
      <motion.h3 variants={fadeUp} className="text-3xl uppercase mb-3">
        {firstTitleWords}{" "}
        <span className="text-green-500">{lastTitleWord}</span>
      </motion.h3>

      {/* Subtitle */}
      <motion.div
        variants={fadeUp}
        className={cn("max-w-md mx-auto", subtitleClass)}
      >
        <p className="text-muted-foreground">{subtitle}</p>
      </motion.div>
    </motion.div>
  );
};

export default SectionHead;
