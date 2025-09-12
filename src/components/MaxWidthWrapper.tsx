"use client";
import { cn } from "@/lib/utils";
import React, { PropsWithChildren, HTMLAttributes } from "react";

type Props = PropsWithChildren &
  HTMLAttributes<HTMLElement> & {
    className?: string;
  };

const MaxWidthWrapper = ({ className, children, ...props }: Props) => {
  return (
    <section
      className={cn(
        "max-w-7xl mx-auto py-10 px-5 sm:px-10 w-full overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
};

export default MaxWidthWrapper;
