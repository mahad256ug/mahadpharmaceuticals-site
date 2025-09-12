import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

const PaginationBtns = () => {
  return (
    <div>
      <nav aria-label="Page navigation example">
        <ul className="flex items-center h-12 gap-3 text-base">
          <li className="h-full block">
            <Link
              href="#"
              className="flex items-center justify-center px-4 h-full leading-tight gap-4 rounded-md border bg-neutral-100 hover:border-green-500 hover:text-black/80 duration-300 transition-all"
            >
              <span className="sr-only">Previous</span>
              <ChevronLeft className="size-4" />
              <span className="text-current">Previous</span>
            </Link>
          </li>

          {Array.from({ length: 3 }).map((_, idx) => (
            <li className="h-full block" key={idx}>
              <Link
                href="#"
                className="flex items-center justify-center px-4 h-full leading-tight rounded-md border bg-neutral-100 hover:border-green-500 hover:text-black/80 duration-300 transition-all"
              >
                {idx + 1}
              </Link>
            </li>
          ))}

          <li className="h-full block">
            <Link
              href="#"
              className="flex items-center justify-center gap-3 px-4 h-full leading-tight rounded-md border bg-neutral-100 hover:border-green-500 hover:text-black/80 duration-300 transition-all"
            >
              <span className="sr-only">Next</span>
              <span className="text-current">Next</span>

              <ChevronRight className="size-4" />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default PaginationBtns;
