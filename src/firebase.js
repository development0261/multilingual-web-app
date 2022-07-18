import "firebase/compat/firestore";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getAuth } from "firebase/auth";
import "firebase/compat/firestore";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyCwgMQEWZbYCS6Y5xAFgJ14LXu_J2wlm5M",
  authDomain: "multilingual-web-app.firebaseapp.com",
  projectId: "multilingual-web-app",
  storageBucket: "multilingual-web-app.appspot.com",
  messagingSenderId: "210149959990",
  appId: "1:210149959990:web:505970ae057e0c66592b97",
};

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = getAuth(app);

export { db, auth };
