// app/api/products/[slug]/route.ts
import { NextResponse } from "next/server";
import { db } from "@/store/firebase";
import { collection, query, where, getDocs, limit } from "firebase/firestore";

interface RouteParams {
  params: { slug: string };
}

export async function GET(_: Request, { params }: RouteParams) {
  try {
    const { slug } = await params;
    const productSlug = slug[0];

    const productsRef = collection(db, "products");
    const q = query(productsRef, where("slug", "==", productSlug), limit(1));
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
