// pages/api/check-auth.ts
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const authCookie =  cookieStore.get("auth")


  if (authCookie) {
    return NextResponse.json({ authenticated: true }, {status: 200});
  }
  return NextResponse.json({ authenticated: false }, {status: 400});
}