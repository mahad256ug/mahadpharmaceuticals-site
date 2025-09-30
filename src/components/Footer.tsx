"use client";
import React, { useEffect, useState } from "react";

// components
import MaxWidthWrapper from "./MaxWidthWrapper";

const Footer = () => {
  const [currentYear, setCurrentYear] = useState<number>(2025);

  useEffect(() => {
    const date = new Date();
    const currentYear_ = date.getFullYear();
    setCurrentYear(currentYear_);
  }, [currentYear]);

  return (
    <footer>
      <div className="bg-neutral-100">
        <MaxWidthWrapper>
          <p className="text-center text-base leading-tight ">
            © {String(currentYear)} Mahad Pharmaceuticals. All rights reserved.
          </p>
        </MaxWidthWrapper>
      </div>
    </footer>
  );
};

export default Footer;
