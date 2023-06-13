// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXRGlC70viAlvZvPUfJJmrdmPzYvw1f5k",
  authDomain: "mayte-no-react-ecommerce.firebaseapp.com",
  projectId: "mayte-no-react-ecommerce",
  storageBucket: "mayte-no-react-ecommerce.appspot.com",
  messagingSenderId: "574331563903",
  appId: "1:574331563903:web:eb8b1856361cf08324344a",
  measurementId: "G-SNXGXHJ7NZ",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const database = getFirestore(app);






