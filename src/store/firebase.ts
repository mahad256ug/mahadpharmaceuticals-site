import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;
const FIREBASE_APP_ID = process.env.FIREBASE_APP_ID;

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: FIREBASE_API_KEY,
  authDomain: "maha-pharmaceuticals-7abdb.firebaseapp.com",
  projectId: "maha-pharmaceuticals-7abdb",
  storageBucket: "maha-pharmaceuticals-7abdb.firebasestorage.app",
  messagingSenderId: "36966607443",
  appId: FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
