import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCAnS2TK5iF6fWwY3oZwMpH_DjAJ9PMh5Y",
  authDomain: "laundry-app-2f660.firebaseapp.com",
  projectId: "laundry-app-2f660",
  storageBucket: "laundry-app-2f660.appspot.com",
  messagingSenderId: "945677275124",
  appId: "1:945677275124:web:39a752ef25d52b09b333a1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore();

export { auth, db };
