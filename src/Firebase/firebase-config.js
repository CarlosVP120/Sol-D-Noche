// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyArScF9bA2hJr3Ln9Jz_cO8o8tmWHvNNxo",
  authDomain: "soldnochewebsite.firebaseapp.com",
  projectId: "soldnochewebsite",
  storageBucket: "soldnochewebsite.appspot.com",
  messagingSenderId: "129207180134",
  appId: "1:129207180134:web:d1c32a780afd03e790c6a7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const provider = new GoogleAuthProvider();
