import { db } from "@/store/firebase";
// import { revalidateSec } from "@/lib/constants";
import { sanitizeSearchParam } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import { collection, query, orderBy, getDocs, where } from "firebase/firestore";

type ProductType = {
  id: string;
  title: string;
};

// export const dynamic = "force-static";
// export const revalidate = revalidateSec ?? 3600;

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const searchValue_ = url.searchParams
      .get("search_query")
      ?.trim()
      .toLowerCase();
    const searchValue = sanitizeSearchParam(searchValue_);

    if (!searchValue) {
      return NextResponse.json(
        { error: "Please Provide a correct search Param." },
        { status: 404 }
      );
    }

    const productsRef = collection(db, "products");

    const snapshot = await getDocs(
      query(productsRef, where("is_publish", "==", true), orderBy("title"))
    );

    let products: ProductType[] = snapshot.docs.map((doc) => ({
      ...(doc.data() as ProductType),
      id: doc.id,
    }));

    products = products.filter((p) =>
      p.title.toLowerCase().includes(String(searchValue).toLowerCase())
    );

    return NextResponse.json({ products }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: String(error) }, { status: 500 });
  }
}
