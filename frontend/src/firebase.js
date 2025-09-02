// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQzvFocH7mbJh7xHCWLENWVmtemvEGMpE",
  authDomain: "pe-inquiry.firebaseapp.com",
  projectId: "pe-inquiry",
  storageBucket: "pe-inquiry.appspot.com",
  messagingSenderId: "760436437006",
  appId: "1:760436437006:web:8694d613b486267f328c5f",
  measurementId: "G-E9PH717XBV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };
