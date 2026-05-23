// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAFDpOTGUgA7qqnjZZE4CSkeidt_CucwQE",
  authDomain: "saas-translator-app-44644.firebaseapp.com",
  projectId: "saas-translator-app-44644",
  storageBucket: "saas-translator-app-44644.firebasestorage.app",
  messagingSenderId: "895782946554",
  appId: "1:895782946554:web:a28de01b9fa5e349ca2b43",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const functions = getFunctions(app);

export { db, auth, functions };
