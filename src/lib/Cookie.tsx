// utils/cookie.ts
"use server";

import { cookies } from "next/headers";

type CookieOptions = {
  httpOnly?: boolean;
  secure?: boolean;
  path?: string;
  maxAge?: number; // in seconds
  sameSite?: "strict" | "lax" | "none";
};

// Create or update a cookie
export async function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {}
): Promise<void> {
  const cookieStore = await cookies();

  cookieStore.set({
    name,
    value,
    httpOnly: options.httpOnly ?? true,
    secure: options.secure ?? true,
    path: options.path ?? "/",
    maxAge: options.maxAge ?? 60 * 60 * 1, // default: 1 hour
    sameSite: options.sameSite ?? "lax",
  });
}

// Get a cookie
export async function getCookie(name: string): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(name)?.value;
}

// Delete a cookie
export async function deleteCookie(name: string): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete(name);
}
