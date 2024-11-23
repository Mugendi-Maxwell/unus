// src/firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore"; // Firestore imports

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBfvYydjdvYc9VzxJxuG32UU8flOxAAFY8",
  authDomain: "unus-8273d.firebaseapp.com",
  projectId: "unus-8273d",
  storageBucket: "unus-8273d.firebasestorage.app",
  messagingSenderId: "172833176634",
  appId: "1:172833176634:web:0bf619df1a0282eb57c903",
  measurementId: "G-CLWJSVCRYJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Exporting Firestore functions
export { db, collection, addDoc, getDocs };
