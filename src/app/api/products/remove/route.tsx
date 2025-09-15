import { getCookie } from "@/lib/Cookie";
import { safeCompare } from "@/lib/utils";
import { NextResponse } from "next/server";

const SECRET_CODE = process.env.SECRET_CODE ?? "";

export async function DELETE(req: Request) {
  try {
    const { id } = await req.json();
    const secret_code = (await getCookie("auth")) ?? "";

    if (!id) {
      return NextResponse.json(
        { success: false, message: "Product ID is required." },
        { status: 400 }
      );
    }

    // Check secret code
    if (safeCompare(secret_code, SECRET_CODE)) {
      // await delProduct(id); TODO
      console.log("deleting the product");

      return NextResponse.json(
        { success: true, message: `Product ${id} was deleted.` },
        { status: 200 }
      );
    }

    return NextResponse.json(
      { success: false, message: "Authentication failure." },
      { status: 401 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { error: "Internal server error. Please try again later." },
      { status: 500 }
    );
  }
}
