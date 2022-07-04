import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyA44Pl9xSEHjiiGvldSD-GShJguga2PhOc",
  authDomain: "react-demo-form.firebaseapp.com",
  projectId: "react-demo-form",
  storageBucket: "react-demo-form.appspot.com",
  messagingSenderId: "565475589286",
  appId: "1:565475589286:web:192e1bd54cdb6501178867",
};


const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = getAuth(app);

export { db, auth };
