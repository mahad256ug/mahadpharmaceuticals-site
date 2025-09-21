// app/api/products/[slug]/route.ts
import { db } from "@/store/firebase";
import { getCookie } from "@/lib/Cookie";
import { safeCompare } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { collection, query, where, getDocs, limit } from "firebase/firestore";

const SECRET_CODE = process.env.SECRET_CODE ?? "";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const slug = (await params).slug;

    // Check auth
    const secret_code = (await getCookie("auth")) ?? "";
    const auth = safeCompare(secret_code, SECRET_CODE);

    const productsRef = collection(db, "products");
    const q = query(productsRef, where("slug", "==", slug), limit(1));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }

    const product = {
      id: snapshot.docs[0].id,
      ...snapshot.docs[0].data(),
    };

    if (auth) {
      // Authenticated: always fresh
      return NextResponse.json(
        { success: true, product },
        {
          status: 200,
          headers: {
            "Cache-Control": "private, no-store, must-revalidate",
          },
        }
      );
    }

    // Unauthenticated: cache 6 hours, vary on cookie
    return NextResponse.json(
      { success: true, product },
      {
        status: 200,
        headers: {
          "Cache-Control":
            "public, max-age=21600, s-maxage=21600, stale-while-revalidate=59",
          Vary: "Cookie",
        },
      }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Internal server error, ${String(error)}` },
      {
        status: 500,
      }
    );
  }
}
