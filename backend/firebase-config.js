// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDrga_s55IpL-MGj13NonYLO9OwBp-THHU",
  authDomain: "sol-d-noche.firebaseapp.com",
  projectId: "sol-d-noche",
  storageBucket: "sol-d-noche.appspot.com",
  messagingSenderId: "420274311900",
  appId: "1:420274311900:web:fb54641e7b6799c121da19",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
