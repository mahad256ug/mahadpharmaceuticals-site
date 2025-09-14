import { getCookie } from "@/lib/Cookie";
import { safeCompare } from "@/lib/utils";
import { addProduct } from "@/store/fbUtils";
import { NextResponse } from "next/server";

const SECRET_CODE = process.env.SECRET_CODE ?? "";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const secret_code = (await getCookie("auth")) ?? "";

    // Check secret code
    if (safeCompare(secret_code, SECRET_CODE)) {
      const product = await addProduct(data);

      return NextResponse.json(
        { success: true, message: `Product was added.` },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Authentication failure." },
      { status: 400 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
