"use server";

import { deleteCookie } from "@/lib/Cookie";

export async function Logout() {
  await deleteCookie("auth");
}
