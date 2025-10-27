// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIz...OjQ",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "lightcoin-6c964.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "lightcoin-6c964",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "lightcoin-6c964.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "898925376380",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:898925376380:web:9fe98988aa9f912bbc2af9",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-DDCXZX767P"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export default app;
