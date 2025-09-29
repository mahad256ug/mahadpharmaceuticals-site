import { NextRequest, NextResponse } from "next/server";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  startAfter,
  getCountFromServer,
  where,
} from "firebase/firestore";
import { db } from "@/store/firebase";
import { PAGE_SIZE } from "@/lib/constants";

// export const dynamic = "force-static";
// export const revalidate = revalidateSec ?? 3600;

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const pageParam = url.searchParams.get("page");
    const pageNum = pageParam ? parseInt(pageParam) : 1;

    const productsRef = collection(db, "products");

    const baseQuery = query(
      productsRef,
      where("is_publish", "==", true),
      orderBy("title")
    );

    // Get total count for pagination (respecting is_publish)
    const countSnapshot = await getCountFromServer(baseQuery);
    const totalCount = countSnapshot.data().count;
    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

    let snapshot;

    if (pageNum <= 1) {
      snapshot = await getDocs(query(baseQuery, limit(PAGE_SIZE)));
    } else {
      const prevSnapshot = await getDocs(
        query(baseQuery, limit(PAGE_SIZE * (pageNum - 1)))
      );
      const lastDoc = prevSnapshot.docs[prevSnapshot.docs.length - 1];

      snapshot = await getDocs(
        query(baseQuery, startAfter(lastDoc), limit(PAGE_SIZE))
      );
    }

    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json(
      { products, pageNum, totalPages },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch products ${String(error)}` },
      { status: 500 }
    );
  }
}
