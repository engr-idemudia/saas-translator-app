// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-5au7ff76afp8fM4g9cFbCH7jZcrBQPc",
  authDomain: "saas-translator-app-5523d.firebaseapp.com",
  projectId: "saas-translator-app-5523d",
  storageBucket: "saas-translator-app-5523d.firebasestorage.app",
  messagingSenderId: "977165359661",
  appId: "1:977165359661:web:7d5e559f232110ca6d76a4",
};

// Initialize Firebase
const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const functions = getFunctions(app);

export { db, auth, functions };
