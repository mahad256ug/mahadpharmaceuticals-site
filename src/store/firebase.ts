import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY
const FIREBASE_APP_ID = process.env.FIREBASE_APP_ID

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "maha-pharm.firebaseapp.com",
  projectId: "maha-pharm",
  storageBucket: "maha-pharm.firebasestorage.app",
  messagingSenderId: "17682546152",
  appId: FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);