import firebase from "@firebase/app";
import "firebase/firestore";
import "firebase/firebase-auth";
import "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
var firebaseConfig = {
  apiKey: "AIzaSyCypn6ZyiTvxoCC43kblxuDHx20WwxCMTE",
  authDomain: "dalat-accessible-website.firebaseapp.com",
  projectId: "dalat-accessible-website",
  storageBucket: "dalat-accessible-website.appspot.com",
  messagingSenderId: "597566404405",
  appId: "1:597566404405:web:46629ecefb8f16217f3e7c",
  measurementId: "G-5V6T9W51WR"
};
// Initialize Firebase
const fb = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export { fb, db };
