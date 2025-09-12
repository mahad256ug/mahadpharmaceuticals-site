import { setCookie } from "@/lib/Cookie";
import { safeCompare } from "@/lib/utils";
import { NextResponse } from "next/server";

const SECRET_CODE: string = process.env.APP_SECRET ?? "";

export async function POST(req: Request) {
  try {
    const { secret_code } = await req.json();

    if (safeCompare(secret_code, SECRET_CODE)) {
      setCookie("auth", secret_code);
      return NextResponse.json(
        {
          success: true,
          key: secret_code,
        },
        { status: 200 }
      );
    }
    return NextResponse.json(
      { success: false, key: secret_code },
      { status: 400 }
    );
  } catch (err) {
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
