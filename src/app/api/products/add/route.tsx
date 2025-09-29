import { NextResponse } from "next/server";

// mine
import { getCookie } from "@/lib/Cookie";
import { safeCompare } from "@/lib/utils";
import { addProduct } from "@/store/fbUtils";
import { revalidateTag } from "next/cache";

const SECRET_CODE = process.env.SECRET_CODE ?? "";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const secret_code = (await getCookie("auth")) ?? "";

    // Check secret code
    if (safeCompare(secret_code, SECRET_CODE)) {
      const newProd = await addProduct(data);

      revalidateTag("fetch_home_featured_products");
      revalidateTag("fetch_home_products");
      revalidateTag("fetch_products");
      revalidateTag("fetch_product");
      revalidateTag("fetch_unpublished_products");

      return NextResponse.json(
        {
          success: true,
          message: `Product was added.`,
          product: newProd.product,
        },
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
