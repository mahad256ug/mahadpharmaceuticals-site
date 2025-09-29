import { db } from "@/store/firebase";
import { getCookie } from "@/lib/Cookie";
import { safeCompare } from "@/lib/utils";
import { NextResponse } from "next/server";
// import { revalidateSec } from "@/lib/constants";
import { collection, query, orderBy, getDocs, where } from "firebase/firestore";

const SECRET_CODE = process.env.SECRET_CODE ?? "";

// export const dynamic = "force-static";
// export const revalidate = revalidateSec ?? 3600;

// product_un_published;
export async function GET() {
  try {
    const secret_code = (await getCookie("auth")) ?? "";
    const auth = safeCompare(secret_code, SECRET_CODE);

    if (auth) {
      const productsRef = collection(db, "products");

      const baseQuery = query(
        productsRef,
        where("is_publish", "==", false),
        orderBy("title")
      );

      const snapshot = await getDocs(query(baseQuery));

      const products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      return NextResponse.json({ products }, { status: 200 });
    } else {
      return NextResponse.json(
        {},
        {
          status: 200,
        }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: `Failed to fetch products ${String(error)}` },
      { status: 500 }
    );
  }
}
