import React from "react";

// components
import MaxWidthWrapper from "./MaxWidthWrapper";

const Footer = () => {
  const date = new Date();
  const currentYear = date.getFullYear();
  return (
    <footer>
      <div className="bg-neutral-100">
        <MaxWidthWrapper>
          <p className="text-center text-base leading-tight ">
            © {String(currentYear)} Maha Pharmaceuticals. All rights reserved.
          </p>
        </MaxWidthWrapper>
      </div>
    </footer>
  );
};

export default Footer;
