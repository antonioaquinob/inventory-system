// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { Firestore, getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAvCMxet_jARO7vNv1zf8OEOmgsHI1g4uU",
  authDomain: "inventory-system-1a1e0.firebaseapp.com",
  projectId: "inventory-system-1a1e0",
  storageBucket: "inventory-system-1a1e0.firebasestorage.app",
  messagingSenderId: "806084781261",
  appId: "1:806084781261:web:f31fade1298df2a8897584",
  measurementId: "G-YGVZZ13GD6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app)
export const auth = getAuth(app)