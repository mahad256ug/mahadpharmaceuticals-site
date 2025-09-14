// app/api/products/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  startAfter,
} from "firebase/firestore";
import { db } from "@/store/firebase";

const PAGE_SIZE = 10;

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const pageParam = url.searchParams.get("page");
    const page = pageParam ? parseInt(pageParam) : 1;

    const productsRef = collection(db, "products");
    const q = query(productsRef, orderBy("title"), limit(PAGE_SIZE * page));

    const snapshot = await getDocs(q);
    const allDocs = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

    // Slice the results for the current page
    const startIndex = (page - 1) * PAGE_SIZE;
    const paginatedProducts = allDocs.slice(startIndex, startIndex + PAGE_SIZE);

    const totalPages = Math.ceil(allDocs.length / PAGE_SIZE);

    return NextResponse.json({
      products: paginatedProducts,
      page,
      totalPages,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
