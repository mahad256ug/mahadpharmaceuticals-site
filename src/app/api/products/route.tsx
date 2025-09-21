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
  startAt,
  endAt,
} from "firebase/firestore";
import { db } from "@/store/firebase";
import { getCookie } from "@/lib/Cookie";
import { PAGE_SIZE } from "@/lib/constants";
import { safeCompare, shuffleArray } from "@/lib/utils";

const SECRET_CODE = process.env.SECRET_CODE ?? "";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const pageParam = url.searchParams.get("page");
    const searchParam = url.searchParams.get("search")?.trim().toLowerCase(); // sanitize
    const pageNum = pageParam ? parseInt(pageParam) : 1;

    const hProds = url.searchParams.get("home_products");
    const hFeat = url.searchParams.get("home_featured_products");

    const productsRef = collection(db, "products");

    const secret_code = (await getCookie("auth")) ?? "";
    const auth = safeCompare(secret_code, SECRET_CODE);

    let baseQuery;

    if (searchParam) {
      if (auth) {
        // Authenticated: no is_publish filter
        baseQuery = query(
          productsRef,
          orderBy("title"),
          startAt(searchParam),
          endAt(searchParam + "\uf8ff")
        );
      } else {
        // Not authenticated: only published
        baseQuery = query(
          productsRef,
          where("is_publish", "==", true),
          orderBy("title"),
          startAt(searchParam),
          endAt(searchParam + "\uf8ff")
        );
      }
    } else {
      if (auth) {
        // Authenticated: no is_publish filter
        baseQuery = query(productsRef, orderBy("title"));
      } else {
        // Not authenticated: only published
        baseQuery = query(
          productsRef,
          where("is_publish", "==", true),
          orderBy("title")
        );
      }
    }

    // Get total count for pagination (respecting is_publish)
    const countSnapshot = await getCountFromServer(baseQuery);
    const totalCount = countSnapshot.data().count;
    const totalPages = Math.ceil(totalCount / PAGE_SIZE);

    let snapshot;

    if (hProds) {
      // Just grab 4 published products
      snapshot = await getDocs(
        query(baseQuery, where("is_featured", "==", false), limit(4))
      );
    } else if (hFeat) {
      // Grab 4 published + featured products
      snapshot = await getDocs(
        query(baseQuery, where("is_featured", "==", true), limit(4))
      );
    } else {
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
    }

    let products = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    if (hFeat || hProds) {
      products = shuffleArray(products);
    }

    if (auth) {
      console.log("wokring please");
      return NextResponse.json(
        { products, pageNum, totalPages },
        {
          status: 200,
          headers: {
            "Cache-Control": "private, no-store, must-revalidate",
          },
        }
      );
    }

    return NextResponse.json(
      { products, pageNum, totalPages },
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
    // console.error(error);
    return NextResponse.json(
      { error: `Failed to fetch products ${String(error)}` },
      { status: 500 }
    );
  }
}
