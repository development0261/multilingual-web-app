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

// const firebaseConfig = {
//   apiKey: "AIzaSyBGdj6DxVqttCxQh23QigTuJXFe-ewp-A0",
//   authDomain: "test-521df.firebaseapp.com",
//   projectId: "test-521df",
//   storageBucket: "test-521df.appspot.com",
//   messagingSenderId: "872389065623",
//   appId: "1:872389065623:web:733424b18a7a82652aa2d2"
// };

const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
const auth = getAuth(app);

export { db, auth };
