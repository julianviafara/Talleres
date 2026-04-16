import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDWlUYqjCafBQ5FBWqf-_CiLo30kX-Q2G8",
  authDomain: "segundoparcial-75eef.firebaseapp.com",
  projectId: "segundoparcial-75eef",
  storageBucket: "segundoparcial-75eef.firebasestorage.app",
  messagingSenderId: "647909161370",
  appId: "1:647909161370:web:80352cce0b05f1d43be223",
  measurementId: "G-2FQ7FDRRZJ",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);