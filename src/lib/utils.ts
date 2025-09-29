import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import crypto from "crypto";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
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
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export function shuffleArray<T>(array: T[]): T[] {
  return array
    .map((item) => ({ item, sort: Math.random() }))
    .sort((a, b) => a.sort - b.sort)
    .map(({ item }) => item);
}

export function sanitizeSearchParam(
  input: string | null | undefined
): string | null {
  if (!input) return null;

  let sanitized = input.trim();

  sanitized = sanitized.toLowerCase();

  sanitized = sanitized.replace(/\s+/g, " ");

  return sanitized || null;
}

export function formatPhoneNumber(
  input: string,
  defaultCountryCode?: string
): string {
  // Remove everything except digits
  let digits = input.replace(/\D/g, "");

  // If a default country code is provided and the number starts with 0
  if (defaultCountryCode && digits.startsWith("0")) {
    digits = defaultCountryCode + digits.slice(1);
  }

  // Example formatting rules:
  // Feel free to switch based on digit length or country
  if (digits.length === 12) {
    // e.g. 256774123456 → +256 774 123 456
    return `+${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(
      6,
      9
    )} ${digits.slice(9)}`;
  }

  if (digits.length === 10) {
    // e.g. 1234567890 → 123-456-7890
    return `${digits.slice(0, 3)}-${digits.slice(3, 6)}-${digits.slice(6)}`;
  }

  if (digits.length === 9) {
    // e.g. 774123456 → 774 123 456
    return `${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6)}`;
  }

  // Fallback: return as-is
  return digits;
}
