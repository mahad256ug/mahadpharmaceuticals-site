// app/api/products/[slug]/route.ts
import { db } from "@/store/firebase";
// import { revalidateSec } from "@/lib/constants";
import { NextRequest, NextResponse } from "next/server";
import { collection, query, where, getDocs, limit } from "firebase/firestore";
import { safeCompare } from "@/lib/utils";
import { getCookie } from "@/lib/Cookie";

const SECRET_CODE = process.env.SECRET_CODE ?? "";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const slug = (await params).slug;
    const secret_code = (await getCookie("auth")) ?? "";

    let snapshot;
    const productsRef = collection(db, "products");
    // Check auth
    if (safeCompare(secret_code, SECRET_CODE)) {
      const q = query(productsRef, where("slug", "==", slug), limit(1));
      snapshot = await getDocs(q);
    } else {
      const q = query(
        productsRef,
        where("slug", "==", slug),
        where("is_publish", "==", true),
        limit(1)
      );
      snapshot = await getDocs(q);
    }

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

    // Unauthenticated: cache 6 hours, vary on cookie
    return NextResponse.json({ success: true, product }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: `Internal server error, ${String(error)}` },
      {
        status: 500,
      }
    );
  }
}
