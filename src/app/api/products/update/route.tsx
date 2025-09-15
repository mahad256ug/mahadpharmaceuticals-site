import { getCookie } from "@/lib/Cookie";
import { safeCompare } from "@/lib/utils";
import { updateProduct } from "@/store/fbUtils";
import { NextResponse } from "next/server";

const SECRET_CODE = process.env.SECRET_CODE ?? "";

export async function PUT(req: Request) {
  try {
    const { id, ...updateData } = await req.json();
    const secret_code = (await getCookie("auth")) ?? "";

    // Check secret code
    if (safeCompare(secret_code, SECRET_CODE)) {
      if (!id) {
        return NextResponse.json(
          { success: false, message: "Missing slug for update." },
          { status: 400 }
        );
      }

      const newProd = await updateProduct(id, updateData);
      return NextResponse.json(
        {
          success: true,
          message: `Product "${id}" was updated.`,
          product: newProd.product,
        },
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
