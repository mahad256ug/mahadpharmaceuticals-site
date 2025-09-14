import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

import crypto from "crypto";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);

  if (bufA.length !== bufB.length) {
    return false;
  }

  return crypto.timingSafeEqual(bufA, bufB);
}


export function slugify(text: string) {
  return text
    .toLowerCase() // lowercase
    .trim() // remove leading/trailing spaces
    .replace(/[^\w\s-]/g, "") // remove special chars
    .replace(/\s+/g, "-"); // replace spaces with hyphens
}