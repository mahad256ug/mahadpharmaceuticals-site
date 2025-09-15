import {
  doc,
  limit,
  query,
  addDoc,
  getDoc,
  orderBy,
  getDocs,
  deleteDoc,
  updateDoc,
  collection,
} from "firebase/firestore";
import { productType } from "@/lib/types";
import { db } from "./firebase";

export const addProduct = async (
  data: productType
): Promise<{
  success: boolean;
  product?: productType & { id: string };
  error?: string;
}> => {
  try {
    // Add new document to "products" collection
    const docRef = await addDoc(collection(db, "products"), data);

    // Fetch the newly created document
    const snap = await getDoc(docRef);

    if (snap.exists()) {
      const newProduct = { id: snap.id, ...snap.data() } as productType & {
        id: string;
      };
      return { success: true, product: newProduct };
    } else {
      return {
        success: false,
        product: undefined,
        error: "Failed to fetch new product",
      };
    }
  } catch (error: unknown) {
    // Narrow the error to a string if possible
    const message = error instanceof Error ? error.message : String(error);
    return { success: false, error: message };
  }
};

export async function delProduct(id: string) {
  const productRef = doc(db, "products", id);
  await deleteDoc(productRef);
}

export async function getProducts(pageSize: number = 10) {
  const q = query(
    collection(db, "products"),
    orderBy("title"),
    limit(pageSize)
  );

  const snapshot = await getDocs(q);
  const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  const lastDoc = snapshot.docs[snapshot.docs.length - 1]; // for next page

  return { products, lastDoc };
}

export async function updateProduct(id: string, data: Partial<productType>) {
  try {
    const productRef = doc(db, "products", id);

    // Update
    await updateDoc(productRef, data);

    // Fetch the updated document
    const updatedSnap = await getDoc(productRef);

    if (updatedSnap.exists()) {
      const updatedProduct = { id: updatedSnap.id, ...updatedSnap.data() };
      return { success: true, product: updatedProduct };
    } else {
      return { success: false, error: "Product not found" };
    }
  } catch (err) {
    // console.error("Error updating product:", err); // TODO
    return { success: false, error: err };
  }
}
