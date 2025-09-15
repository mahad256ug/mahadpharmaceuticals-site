// app/api/products/[slug]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { db } from "@/store/firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const slug = (await params).slug;

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

    return NextResponse.json({ success: true, product }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
