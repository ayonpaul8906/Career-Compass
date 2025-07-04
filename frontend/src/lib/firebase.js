// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCJBK74OudT6SlngQjGPUdG-Y0LPph1TPM",
  authDomain: "career-compass-4a13f.firebaseapp.com",
  projectId: "career-compass-4a13f",
  storageBucket: "career-compass-4a13f.firebasestorage.app",
  messagingSenderId: "409540092577",
  appId: "1:409540092577:web:10dcc253e0cf6b469d46e0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
