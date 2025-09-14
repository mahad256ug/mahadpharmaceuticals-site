import {
  collection,
  addDoc,
  getDoc,
  query,
  onSnapshot,
  deleteDoc,
  doc,
  where,
  orderBy,
  limit,
  getDocs,
} from "firebase/firestore";
import { productType } from "@/lib/types";
import { db } from "./firebase";

export const addProduct = async (data: productType): Promise<boolean> => {
  try {
    await addDoc(collection(db, "products"), data);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export async function delProduct(id: string) {
  const productRef = doc(db, "products", id);
  await deleteDoc(productRef);
}

export async function getProducts(pageSize: number = 10) {
  const q = query(
    collection(db, "products"),
    orderBy("title"), // or "price", any field
    limit(pageSize)
  );

  const snapshot = await getDocs(q);
  const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const lastDoc = snapshot.docs[snapshot.docs.length - 1]; // for next page

  return { products, lastDoc };
}
