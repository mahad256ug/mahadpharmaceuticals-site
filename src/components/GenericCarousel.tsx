"use client";

import React from "react";
import {
  Carousel,
  CarouselNext,
  CarouselContent,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { cn } from "@/lib/utils";

const GenericCarousel = ({
  children,
  contentClassName,
  className = "",
  autoplayDelay = 5000,
}: {
  children: React.ReactNode;
  className?: string;
  autoplayDelay?: number;
  contentClassName?: string;
}) => {
  return (
    <Carousel
      className={cn("relative", className)}
      opts={{ align: "start", loop: true }}
      plugins={[Autoplay({ delay: autoplayDelay })]}
    >
      <CarouselContent className={cn("max-h-[28rem]", contentClassName)}>
        {children}
      </CarouselContent>

      <CarouselNext className="mr-10 sm:mr-5 md:mr-12 rounded-md bg-background w-12 h-12 aspect-square" />
      <CarouselPrevious className="ml-12 sm:ml-4 md:ml-12 rounded-md bg-background w-12 h-12 aspect-square" />
    </Carousel>
  );
};

export default GenericCarousel;
