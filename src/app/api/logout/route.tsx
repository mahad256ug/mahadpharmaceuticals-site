import { deleteCookie } from "@/lib/Cookie";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    try {
      deleteCookie("auth");
    } catch (err) {
      return NextResponse.json({ success: false, key: null }, { status: 400 });
    }

    return NextResponse.json({ success: true, key: null }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { error: `Internal server error.  ${err}` },
      { status: 500 }
    );
  }
}
