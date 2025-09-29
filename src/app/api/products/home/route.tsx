import { NextResponse } from "next/server";
import {
  where,
  query,
  limit,
  orderBy,
  getDocs,
  collection,
} from "firebase/firestore";
import { db } from "@/store/firebase";
// import { revalidateSec } from "@/lib/constants";

// export const dynamic = "force-static";
// export const revalidate = revalidateSec ?? 3600;

export async function GET() {
  try {
    const productsRef = collection(db, "products");

    const baseQuery = query(
      productsRef,
      where("is_publish", "==", true),
      orderBy("title")
    );

    const snapshot = await getDocs(
      query(baseQuery, where("is_featured", "==", false), limit(4))
    );

    const products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    // console.error(error);
    return NextResponse.json(
      { error: `Failed to fetch products ${String(error)}` },
      { status: 500 }
    );
  }
}
