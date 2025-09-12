import {
  collection,
  addDoc,
  getDoc,
  query,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "./firebase";
import { productType } from "@/lib/types";

export const addProduct = async (data: productType): Promise<boolean> => {
  try {
    await addDoc(collection(db, "products"), { ...data });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const delProduct = async (id: string): Promise<boolean> => {
  try {
    await deleteDoc(doc(db, "items", id));
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
